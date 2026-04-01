use crate::calendar::{Calendar, Calendars};
use axum::extract::Query;
use axum::http::StatusCode;
use axum::Json;
use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub struct GetCalendarQueryParams {
    url: String,
}

#[tracing::instrument]
pub async fn handle_get_calendar(
    Query(params): Query<GetCalendarQueryParams>,
) -> Result<Json<Calendars>, StatusCode> {
    match Calendars::from_url(&params.url).await {
        Ok(calendars) => Ok(Json(calendars)),
        Err(e) => {
            tracing::error!("Failed to fetch calendar: {}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}
