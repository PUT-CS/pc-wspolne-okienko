use axum::http::StatusCode;

pub async fn handle_health() -> StatusCode {
    StatusCode::OK
}

