mod api;
mod calendar;
mod app_config;

use crate::api::handlers::fallback::handle_fallback;
use crate::app_config::AppConfig;
use api::handlers::get_calendar::handle_get_calendar;
use axum::routing::get;
use axum::Router;
use tokio::signal;
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

    let config = AppConfig::from_env().expect("Failed to load configuration");

    let app = Router::new()
        .route("/calendar", get(handle_get_calendar))
        .fallback(handle_fallback);

    let listener = tokio::net::TcpListener::bind(config.socket_addr())
        .await
        .unwrap();

    info!(
        socket_addr = listener.local_addr().unwrap().to_string(),
        "Server starting..."
    );

    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await.unwrap();
}

async fn shutdown_signal() {
    let ctrl_c = async {
        signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .expect("failed to install signal handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }
}