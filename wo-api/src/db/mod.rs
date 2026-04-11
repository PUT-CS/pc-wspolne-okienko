use anyhow::{Context, Result};
use sqlx::postgres::PgPoolOptions;

pub type DbPool = sqlx::PgPool;

pub async fn connect(database_url: &str, max_connections: u32) -> Result<DbPool> {
    let pool = PgPoolOptions::new()
        .max_connections(max_connections)
        .connect(database_url)
        .await
        .with_context(|| "Failed to connect to PostgreSQL")?;

    // Verify connectivity early so the app fails fast on invalid DB config.
    sqlx::query_scalar::<_, i32>("SELECT 1")
        .fetch_one(&pool)
        .await
        .with_context(|| "PostgreSQL health check query failed")?;

    Ok(pool)
}

