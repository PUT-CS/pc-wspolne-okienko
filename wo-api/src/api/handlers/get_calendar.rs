use axum::extract::Query;
use serde::Deserialize;

#[derive(Deserialize)]
pub struct GetCalendarQueryParams {
    url: String,
}

pub async fn handle_get_calendar(Query(params): Query<GetCalendarQueryParams>) -> String {
    format!("You requested the calendar at URL: {}", params.url)
}