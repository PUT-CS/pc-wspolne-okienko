use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::Json;
use serde::Serialize;

use crate::db::DbPool;
use crate::lobby::User;

#[derive(Debug, Serialize)]
pub struct GetLobbyUsersResponse {
    pub users: Vec<User>,
}

#[tracing::instrument(skip(pool))]
pub async fn handle_get_lobby_users(
    State(pool): State<DbPool>,
    Path(lobby_id): Path<String>,
) -> Result<Json<GetLobbyUsersResponse>, StatusCode> {
    if lobby_id.trim().is_empty() {
        return Err(StatusCode::BAD_REQUEST);
    }

    match sqlx::query_as::<_, (String, String, Option<String>)>(
        "SELECT user_id, name, picture_data FROM lobby_users WHERE lobby_id = $1 ORDER BY created_at",
    )
    .bind(&lobby_id)
    .fetch_all(&pool)
    .await
    {
        Ok(rows) => {
            let users = rows
                .into_iter()
                .map(|(id, name, picture_data)| User::new(&id, &name, picture_data))
                .collect();
            Ok(Json(GetLobbyUsersResponse { users }))
        }
        Err(e) => {
            tracing::error!(error = %e, lobby_id = %lobby_id, "Failed to fetch lobby users");
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}
