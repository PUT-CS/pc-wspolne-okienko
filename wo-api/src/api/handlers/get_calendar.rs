use crate::calendar::Calendar;
use axum::extract::Query;
use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub struct GetCalendarQueryParams {
    url: String,
}

#[tracing::instrument]
pub async fn handle_get_calendar(Query(params): Query<GetCalendarQueryParams>) -> String {
    Calendar::from_url(&params.url).await
}
