use axum::http::StatusCode;

#[tracing::instrument]
pub async fn handle_join_lobby() -> Result<StatusCode, StatusCode> {
    Ok(StatusCode::OK)
}
