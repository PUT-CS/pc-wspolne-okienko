use axum::http::StatusCode;
use axum::Json;
use rand::{RngExt, distr::Alphanumeric};
use serde::Deserialize;

use crate::lobby::Lobby;

#[derive(Debug, Deserialize)]
pub struct CreateLobbyRequest {
    name: String,
}

#[tracing::instrument]
pub async fn handle_create_lobby(
    Json(payload): Json<CreateLobbyRequest>,
) -> Result<(StatusCode, Json<Lobby>), StatusCode> {
    let lobby_id: String = rand::rng()
        .sample_iter(Alphanumeric)
        .take(6)
        .map(char::from)
        .collect();

    let lobby = Lobby::empty(lobby_id, payload.name);

    Ok((StatusCode::CREATED, Json(lobby)))
}
