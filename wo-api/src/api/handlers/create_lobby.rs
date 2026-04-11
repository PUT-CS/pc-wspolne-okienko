use axum::http::StatusCode;

#[tracing::instrument]
pub async fn handle_create_lobby() -> Result<StatusCode, StatusCode> {
    Ok(StatusCode::OK)
}
