mod api;
mod app_config;
mod calendar;
mod db;
mod lobby;
mod validated;

use crate::api::handlers::fallback::handle_fallback;
use crate::app_config::AppConfig;
use crate::db::connect;
use api::handlers::create_lobby::handle_create_lobby;
use api::handlers::get_calendar::handle_get_calendar;
use api::handlers::join_lobby::handle_join_lobby;
use axum::routing::{get, post};
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

    let db_pool = connect(config.database_url(), config.db_max_connections())
        .await
        .expect("Failed to connect to PostgreSQL");

    let app = Router::new()
        .route("/calendar", get(handle_get_calendar))
        .route("/lobby", post(handle_create_lobby))
        .route("/join", post(handle_join_lobby))
        .fallback(handle_fallback)
        .with_state(db_pool);

    let listener = tokio::net::TcpListener::bind(config.socket_addr())
        .await
        .unwrap();

    info!(
        socket_addr = listener.local_addr().unwrap().to_string(),
        "Server starting..."
    );

    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await
        .unwrap();
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
