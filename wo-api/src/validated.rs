use thiserror::Error;

#[derive(Error, Debug)]
pub enum ValidateError {
    #[error("{0}")]
    Invalid(String),
}

pub trait Validated {
    fn validate(&self) -> Result<(), ValidateError>;
}