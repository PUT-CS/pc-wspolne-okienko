use axum::http::StatusCode;

pub async fn handle_fallback() -> StatusCode {
    StatusCode::NOT_FOUND
}