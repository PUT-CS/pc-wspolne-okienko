use axum::http::StatusCode;
use axum::Json;
use serde::Deserialize;

use crate::lobby::Lobby;
use crate::validate::{Validate, ValidateError};

#[derive(Debug, Deserialize)]
pub struct CreateLobbyRequest {
    name: String,
}

impl Validate for CreateLobbyRequest {
    fn validate(&self) -> Result<(), ValidateError> {
        if self.name.trim().is_empty() {
            return Err(ValidateError::Invalid("Lobby name cannot be empty".into()));
        }
        Ok(())
    }
}

#[tracing::instrument]
pub async fn handle_create_lobby(
    Json(payload): Json<CreateLobbyRequest>,
) -> Result<(StatusCode, Json<Lobby>), StatusCode> {
    if let Err(e) = payload.validate() {
        tracing::error!("Validation error: {}", e);
        return Err(StatusCode::BAD_REQUEST);
    }


    let lobby = Lobby::new(payload.name);

    Ok((StatusCode::CREATED, Json(lobby)))
}
