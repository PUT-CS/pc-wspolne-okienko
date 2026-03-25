mod api;

use crate::api::handlers::fallback::handle_fallback;
use api::handlers::get_calendar::handle_get_calendar;
use axum::routing::get;
use axum::Router;

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/calendar", get(handle_get_calendar))
        .fallback(handle_fallback);

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();

    println!("listening on {}", listener.local_addr().unwrap());

    axum::serve(listener, app).await.unwrap();
}
