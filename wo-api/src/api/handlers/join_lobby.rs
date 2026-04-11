use axum::http::StatusCode;
use axum::Json;

use crate::lobby::{Lobby, User};
use crate::validate::Validate;

#[derive(Debug, serde::Deserialize)]
pub struct JoinLobbyRequest {
    lobby_id: String,
    lobby_name: String,
    user: User,
}

impl Validate for JoinLobbyRequest {
    fn validate(&self) -> Result<(), crate::validate::ValidateError> {
        if self.lobby_id.trim().is_empty() {
            return Err(crate::validate::ValidateError::Invalid("Lobby ID cannot be empty".into()));
        }
        if self.lobby_id.len() != Lobby::ID_LENGTH {
            return Err(crate::validate::ValidateError::Invalid(format!("Lobby ID must be {} characters long", Lobby::ID_LENGTH)));
        }
        if self.lobby_name.trim().is_empty() {
            return Err(crate::validate::ValidateError::Invalid("Lobby name cannot be empty".into()));
        }
        if self.user.id.trim().is_empty() {
            return Err(crate::validate::ValidateError::Invalid("User ID cannot be empty".into()));
        }
        if self.user.name.trim().is_empty() {
            return Err(crate::validate::ValidateError::Invalid("User name cannot be empty".into()));
        }
        Ok(())
    }
}

#[tracing::instrument]
pub async fn handle_join_lobby(
    Json(payload): Json<JoinLobbyRequest>,
) -> Result<StatusCode, StatusCode> {
    if let Err(e) = payload.validate() {
        tracing::error!("Validation error: {}", e);
        return Err(StatusCode::BAD_REQUEST);
    }

    let mut lobby = Lobby::new(payload.lobby_name);

    lobby.add_user(payload.user);

    Ok(StatusCode::OK)
}
