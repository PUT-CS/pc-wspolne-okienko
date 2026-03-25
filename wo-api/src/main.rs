mod api;
mod calendar;

use crate::api::handlers::fallback::handle_fallback;
use api::handlers::get_calendar::handle_get_calendar;
use axum::routing::get;
use axum::Router;
use tracing::{info, Level};

#[tokio::main]
async fn main() {
    let subscriber = tracing_subscriber::fmt()
        .with_file(true)
        .with_line_number(true)
        .with_target(true)
        .with_max_level(Level::DEBUG)
        .finish();
    tracing::subscriber::set_global_default(subscriber)
        .expect("setting default subscriber should work");

    let app = Router::new()
        .route("/calendar", get(handle_get_calendar))
        .fallback(handle_fallback);

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();

    info!("Server running on {}", listener.local_addr().unwrap());

    axum::serve(listener, app).await.unwrap();
}
