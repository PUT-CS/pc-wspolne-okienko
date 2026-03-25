use tracing::{debug, warn};

pub struct Calendar {
    name: String,
    timezone: String,
    events: Vec<Event>,
}

pub struct Event {
    id: String,
    summary: String,
    description: String,
    location: String,
    start_time: chrono::DateTime<chrono::Utc>,
    end_time: chrono::DateTime<chrono::Utc>,
}

impl Calendar {
    pub async fn from_url(url: &str) -> String {
        debug!("Fetching calendar from URL: {}", url);
        let ical_content = reqwest::get(url).await.unwrap().text().await.unwrap();

        let icals: Vec<_> = ical::IcalParser::new(ical_content.as_bytes()).collect();

        for ical in icals {
            match ical {
                Ok(ical) => {
                    debug!("Parsed iCal with {} events", ical.events.len());
                }
                Err(e) => {
                    warn!("Failed to parse iCal: {}", e);
                }
            }
        }

        ical_content
        // Calendar {
        //     name: "Sample Calendar".to_string(),
        //     timezone: chrono::Utc.to_string(),
        //     events: vec![],
        // }
    }

    pub fn from_ical(ical_content: &str) -> Self {
        Calendar {
            name: "Sample Calendar".to_string(),
            timezone: chrono::Utc.to_string(),
            events: vec![],
        }
    }
}
