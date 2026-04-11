use axum::extract::State;
use axum::http::StatusCode;
use axum::Json;
use serde::Deserialize;

use crate::db::DbPool;
use crate::lobby::Lobby;
use crate::validated::{ValidateError, Validated};

#[derive(Debug, Deserialize)]
pub struct CreateLobbyRequest {
    name: String,
}

impl Validated for CreateLobbyRequest {
    fn validate(&self) -> Result<(), ValidateError> {
        if self.name.trim().is_empty() {
            return Err(ValidateError::Invalid("Lobby name cannot be empty".into()));
        }
        Ok(())
    }
}

#[tracing::instrument(skip(pool))]
pub async fn handle_create_lobby(
    State(pool): State<DbPool>,
    Json(payload): Json<CreateLobbyRequest>,
) -> Result<(StatusCode, Json<Lobby>), StatusCode> {
    if let Err(e) = payload.validate() {
        tracing::error!(error = %e, "Validation error");
        return Err(StatusCode::BAD_REQUEST);
    }

    let lobby = Lobby::new(payload.name);

    if let Err(e) = sqlx::query("INSERT INTO lobbies (id, name) VALUES ($1, $2)")
        .bind(&lobby.id)
        .bind(&lobby.name)
        .execute(&pool)
        .await
    {
        tracing::error!(error = %e, lobby_id = %lobby.id, "Failed to persist lobby");
        return Err(StatusCode::INTERNAL_SERVER_ERROR);
    }

    Ok((StatusCode::CREATED, Json(lobby)))
}
