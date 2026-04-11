use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use crate::calendar::Calendar;

#[derive(Debug, Serialize)]
pub struct Lobby {
    pub id: String,
    pub name: String,
    pub users: HashMap<User, CalendarsConfig>,
}

#[derive(Debug, Eq, PartialEq, Hash, Serialize, Deserialize)]
pub struct User {
    pub id: String,
    pub name: String,
    pub picture_data: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct CalendarsConfig {
    pub calendars: Vec<Calendar>,
}

impl Lobby {
    pub fn empty(id: String, name: String) -> Lobby {
        Lobby { id, name, users: HashMap::new() }
    }
}

impl User {
    pub fn new(id: &str, name: &str, picture_data: Option<String>) -> Self {
        Self { id: id.into(), name: name.into(), picture_data}
    }
}

impl CalendarsConfig {
    pub fn new(calendars: Vec<Calendar>) -> Self {
        Self { calendars }
    }
}