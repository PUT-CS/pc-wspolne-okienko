use axum::extract::State;
use axum::http::StatusCode;
use axum::Json;

use crate::db::DbPool;
use crate::lobby::{Lobby, User};
use crate::validated::Validated;

#[derive(Debug, serde::Deserialize)]
pub struct JoinLobbyRequest {
    lobby_id: String,
    lobby_name: String,
    user: User,
}

impl Validated for JoinLobbyRequest {
    fn validate(&self) -> Result<(), crate::validated::ValidateError> {
        if self.lobby_id.trim().is_empty() {
            return Err(crate::validated::ValidateError::Invalid("Lobby ID cannot be empty".into()));
        }
        if self.lobby_id.len() != Lobby::ID_LENGTH {
            return Err(crate::validated::ValidateError::Invalid(format!("Lobby ID must be {} characters long", Lobby::ID_LENGTH)));
        }
        if self.lobby_name.trim().is_empty() {
            return Err(crate::validated::ValidateError::Invalid("Lobby name cannot be empty".into()));
        }
        if self.user.id.trim().is_empty() {
            return Err(crate::validated::ValidateError::Invalid("User ID cannot be empty".into()));
        }
        if self.user.name.trim().is_empty() {
            return Err(crate::validated::ValidateError::Invalid("User name cannot be empty".into()));
        }
        Ok(())
    }
}

#[tracing::instrument(skip(pool))]
pub async fn handle_join_lobby(
    State(pool): State<DbPool>,
    Json(payload): Json<JoinLobbyRequest>,
) -> Result<StatusCode, StatusCode> {
    if let Err(e) = payload.validate() {
        tracing::error!(error = %e, "Validation error");
        return Err(StatusCode::BAD_REQUEST);
    }

    let lobby_exists = match sqlx::query_scalar::<_, i32>(
        "SELECT 1 FROM lobbies WHERE id = $1 AND name = $2",
    )
    .bind(&payload.lobby_id)
    .bind(&payload.lobby_name)
    .fetch_optional(&pool)
    .await
    {
        Ok(value) => value.is_some(),
        Err(e) => {
            tracing::error!(error = %e, lobby_id = %payload.lobby_id, "Failed to check lobby existence");
            return Err(StatusCode::INTERNAL_SERVER_ERROR);
        }
    };

    if !lobby_exists {
        return Err(StatusCode::NOT_FOUND);
    }

    if let Err(e) = sqlx::query(
        "INSERT INTO lobby_users (lobby_id, user_id, name, picture_data) VALUES ($1, $2, $3, $4)",
    )
    .bind(&payload.lobby_id)
    .bind(&payload.user.id)
    .bind(&payload.user.name)
    .bind(&payload.user.picture_data)
    .execute(&pool)
    .await
    {
        tracing::error!(
            error = %e,
            lobby_id = %payload.lobby_id,
            user_id = %payload.user.id,
            "Failed to persist lobby member"
        );
        return Err(StatusCode::INTERNAL_SERVER_ERROR);
    }

    Ok(StatusCode::CREATED)
}
