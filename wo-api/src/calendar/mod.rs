use anyhow::Result;
use chrono_tz::Tz;
use ical::parser::ical::component::{IcalCalendar, IcalEvent};
use ical::parser::Component;
use serde::Serialize;
use tracing::{debug, warn};

#[derive(Serialize)]
pub struct Calendars {
    calendars: Vec<Calendar>,
}

#[derive(Serialize)]
pub struct Calendar {
    name: String,
    timezone: String,
    events: Vec<Event>,
}

#[derive(Serialize)]
pub struct Event {
    id: String,
    summary: String,
    description: String,
    location: String,
    start_time: chrono::DateTime<chrono::Utc>,
    end_time: chrono::DateTime<chrono::Utc>,
}

impl Calendars {
    pub async fn from_url(url: &str) -> Result<Self> {
        Calendar::from_url(url).await
    }
    pub fn from_text(ical_content: &str) -> Result<Self> {
        Calendar::from_text(ical_content)
    }
}

impl Calendar {
    async fn from_url(url: &str) -> Result<Calendars> {
        debug!("Fetching calendar from URL: {}", url);

        let ical_content = reqwest::get(url).await?.text().await?;

        let calendars = ical::IcalParser::new(ical_content.as_bytes())
            .filter_map(|parsed_ical| parsed_ical.ok())
            .map(Self::from_ical)
            .collect();

        Ok(Calendars { calendars })
    }

    fn from_text(ical_content: &str) -> Result<Calendars> {
        debug!("Parsing calendar from text content");

        let calendars = ical::IcalParser::new(ical_content.as_bytes())
            .filter_map(|parsed_ical| parsed_ical.ok())
            .map(Self::from_ical)
            .collect();

        Ok(Calendars { calendars })
    }

    fn from_ical(ical: IcalCalendar) -> Self {
        let events = ical.events.iter().map(Event::from_ical_event).collect();
        let timezone_name = ical.get_value("X-WR-TIMEZONE", "UTC");

        let name = ical
            .get_property("NAME")
            .or_else(|| ical.get_property("X-WR-CALNAME"))
            .and_then(|p| p.value.clone())
            .unwrap_or_else(|| "Unnamed Calendar".to_string());

        Calendar {
            name,
            timezone: parse_timezone_name(&timezone_name).to_string(),
            events,
        }
    }
}

trait PropertyExt {
    fn get_value(&self, key: &str, default: &str) -> String;
}

impl PropertyExt for IcalCalendar {
    fn get_value(&self, key: &str, default: &str) -> String {
        self.get_property(key)
            .and_then(|p| p.value.clone())
            .unwrap_or_else(|| default.to_string())
    }
}

impl PropertyExt for IcalEvent {
    fn get_value(&self, key: &str, default: &str) -> String {
        self.get_property(key)
            .and_then(|p| p.value.clone())
            .unwrap_or_else(|| default.to_string())
    }
}

fn parse_timezone_name(timezone_name: &str) -> Tz {
    timezone_name.parse::<Tz>().unwrap_or_else(|error| {
        warn!(
            timezone_name,
            error = %error,
            "Invalid timezone value, falling back to UTC"
        );
        chrono_tz::UTC
    })
}

impl Event {
    fn from_ical_event(ical_event: &IcalEvent) -> Self {
        let start_time_str = ical_event.get_value("DTSTART", "Unknown Start Time");
        let end_time_str = ical_event.get_value("DTEND", "Unknown End Time");

        warn!("Start Time: {}", start_time_str);
        warn!("End Time: {}", end_time_str);

        Self {
            id: ical_event.get_value("UID", "Unknown ID"),
            summary: ical_event.get_value("SUMMARY", "No Summary"),
            description: ical_event.get_value("DESCRIPTION", "No Description"),
            location: ical_event.get_value("LOCATION", "No Location"),
            start_time: chrono::Utc::now(), // TODO: Parse actual start time
            end_time: chrono::Utc::now(),   // TODO: Parse actual end time
        }
    }
}
