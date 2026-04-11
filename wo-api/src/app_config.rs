use anyhow::Result;
use std::net::{IpAddr, SocketAddr};
use tracing::info;

static DEFAULT_ADDRESS: &str = "0.0.0.0";
static DEFAULT_PORT: &str = "3000";
static DEFAULT_DATABASE_URL: &str = "postgres://wo_user:wo_password@localhost:5432/wo";
static DEFAULT_DB_MAX_CONNECTIONS: &str = "10";

pub struct AppConfig {
    address: IpAddr,
    port: u16,
    database_url: String,
    db_max_connections: u32,
}

impl AppConfig {
    pub fn from_env() -> Result<Self> {
        let address = std::env::var("ADDRESS")
            .unwrap_or(DEFAULT_ADDRESS.to_string())
            .parse::<IpAddr>()
            .map_err(|e| anyhow::anyhow!("Failed to parse ADDRESS: {}", e))?;

        let port = std::env::var("PORT")
            .unwrap_or(DEFAULT_PORT.to_string())
            .parse::<u16>()
            .map_err(|e| anyhow::anyhow!("Failed to parse PORT: {}", e))?;

        let database_url = std::env::var("DATABASE_URL").unwrap_or(DEFAULT_DATABASE_URL.to_string());

        let db_max_connections = std::env::var("DB_MAX_CONNECTIONS")
            .unwrap_or(DEFAULT_DB_MAX_CONNECTIONS.to_string())
            .parse::<u32>()
            .map_err(|e| anyhow::anyhow!("Failed to parse DB_MAX_CONNECTIONS: {}", e))?;

        info!(?address, ?port, db_max_connections, "AppConfig loaded");

        Ok(AppConfig {
            address,
            port,
            database_url,
            db_max_connections,
        })
    }

    pub fn socket_addr(&self) -> SocketAddr {
        SocketAddr::new(self.address, self.port)
    }

    pub fn database_url(&self) -> &str {
        &self.database_url
    }

    pub fn db_max_connections(&self) -> u32 {
        self.db_max_connections
    }
}
