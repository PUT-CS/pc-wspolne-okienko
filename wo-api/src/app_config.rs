use anyhow::Result;
use std::net::{IpAddr, SocketAddr};
use tracing::info;

static DEFAULT_ADDRESS: &str = "0.0.0.0";
static DEFAULT_PORT: &str = "3000";

pub struct AppConfig {
    address: IpAddr,
    port: u16,
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

        info!(?address, ?port, "AppConfig loaded");

        Ok(AppConfig {
            address,
            port,
        })
    }

    pub fn socket_addr(&self) -> SocketAddr {
        SocketAddr::new(self.address, self.port)
    }
}