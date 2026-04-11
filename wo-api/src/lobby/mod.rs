use crate::calendar::Calendar;
use rand::distr::Alphanumeric;
use rand::RngExt;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

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
    pub const ID_LENGTH: usize = 6;

    pub fn new(name: String) -> Lobby {
        let id: String = rand::rng()
            .sample_iter(Alphanumeric)
            .take(Self::ID_LENGTH)
            .map(char::from)
            .collect();

        Lobby { id, name, users: HashMap::new() }
    }

    pub fn add_user(&mut self, user: User) {
        let config = CalendarsConfig { calendars: Vec::new() };
        self.users.insert(user, config);
    }
}

impl User {
    pub fn new(id: &str, name: &str, picture_data: Option<String>) -> Self {
        Self { id: id.into(), name: name.into(), picture_data }
    }
}

impl CalendarsConfig {
    pub fn new(calendars: Vec<Calendar>) -> Self {
        Self { calendars }
    }
}