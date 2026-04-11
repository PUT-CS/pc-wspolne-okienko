use axum::http::StatusCode;
use axum::Json;

use crate::lobby::{CalendarsConfig, Lobby, User};

#[derive(Debug, serde::Deserialize)]
pub struct JoinLobbyRequest {
    lobby_id: String,
    lobby_name: String,
    user: User,
}

#[tracing::instrument]
pub async fn handle_join_lobby(
    Json(payload): Json<JoinLobbyRequest>,
) -> Result<StatusCode, StatusCode> {
    if payload.lobby_id.trim().is_empty()
        || payload.lobby_name.trim().is_empty()
        || payload.user.id.trim().is_empty()
        || payload.user.name.trim().is_empty()
    {
        return Err(StatusCode::BAD_REQUEST);
    }

    let mut lobby = Lobby::empty(payload.lobby_id, payload.lobby_name);
    lobby
        .users
        .insert(payload.user, CalendarsConfig::new(Vec::new()));

    Ok(StatusCode::OK)
}
