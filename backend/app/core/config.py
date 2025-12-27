"""
Configuration Management

Uses pydantic-settings to load environment variables from .env file
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration settings"""
    
    # Project Information
    PROJECT_NAME: str = "NeuroNet"
    API_VERSION: str = "v1"
    
    # Database Configuration
    # Note: Neon PostgreSQL connection will be configured in STEP 1
    DATABASE_URL: str = "postgresql://username:password@host/dbname"
    
    # Security Configuration
    # Note: JWT authentication will be implemented in later steps
    JWT_SECRET_KEY: str = "changeme"
    JWT_ALGORITHM: str = "HS256"
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True
    )


# Global settings instance
settings = Settings()
