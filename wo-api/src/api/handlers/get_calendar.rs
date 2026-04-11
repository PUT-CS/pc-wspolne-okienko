use crate::calendar::{Calendar, Calendars};
use crate::validated::Validated;
use axum::extract::Query;
use axum::http::StatusCode;
use axum::Json;
use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub struct GetCalendarQueryParams {
    url: String,
}

impl Validated for GetCalendarQueryParams {
    fn validate(&self) -> Result<(), crate::validated::ValidateError> {
        if self.url.trim().is_empty() {
            return Err(crate::validated::ValidateError::Invalid("URL cannot be empty".into()));
        }
        if url::Url::parse(&self.url).is_err() {
            return Err(crate::validated::ValidateError::Invalid("Invalid URL format".into()));
        }
        Ok(())
    }
}

#[tracing::instrument]
pub async fn handle_get_calendar(
    Query(params): Query<GetCalendarQueryParams>,
) -> Result<Json<Calendars>, StatusCode> {
    if let Err(e) = params.validate() {
        tracing::error!("Validation error: {}", e);
        return Err(StatusCode::BAD_REQUEST);
    }

    match Calendars::from_url(&params.url).await {
        Ok(calendars) => Ok(Json(calendars)),
        Err(e) => {
            tracing::error!("Failed to fetch calendar: {}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}
