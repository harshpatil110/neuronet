"""
Configuration Management

Uses pydantic-settings to load environment variables from .env file
"""

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration settings"""
    
    # Project Information
    PROJECT_NAME: str = "NeuroNet"
    API_VERSION: str = "v1"
    
    # Database Configuration - Neon PostgreSQL (REQUIRED)
    # Must be a valid PostgreSQL connection string
    # Format: postgresql://user:password@host:port/database?sslmode=require
    DATABASE_URL: str = Field(
        ...,
        description="Neon PostgreSQL connection string (required)"
    )
    
    # Security Configuration - JWT Authentication
    # IMPORTANT: Change JWT_SECRET_KEY in production!
    JWT_SECRET_KEY: str = Field(
        default="changeme",
        description="Secret key for JWT token signing (MUST be changed in production)"
    )
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    @field_validator("JWT_SECRET_KEY")
    @classmethod
    def validate_jwt_secret(cls, v: str) -> str:
        """
        Warn if using default JWT secret key.
        
        In production, this should be a strong, random string.
        """
        if v == "changeme":
            import warnings
            warnings.warn(
                "⚠️  Using default JWT_SECRET_KEY. Change this in production!",
                stacklevel=2
            )
        
        if len(v) < 32:
            import warnings
            warnings.warn(
                "⚠️  JWT_SECRET_KEY should be at least 32 characters for security.",
                stacklevel=2
            )
        
        return v
    
    @field_validator("DATABASE_URL")
    @classmethod
    def validate_database_url(cls, v: str) -> str:
        """
        Validate DATABASE_URL is provided and properly formatted.
        
        Raises:
            ValueError: If DATABASE_URL is missing or invalid
        """
        if not v or v == "postgresql://username:password@host/dbname":
            raise ValueError(
                "DATABASE_URL is required. Please set it in your .env file.\n"
                "Expected format: postgresql://<user>:<password>@<host>/<db>?sslmode=require\n"
                "For Neon PostgreSQL, get your connection string from the Neon console."
            )
        
        if not v.startswith("postgresql://") and not v.startswith("postgres://"):
            raise ValueError(
                "DATABASE_URL must be a valid PostgreSQL connection string.\n"
                "It should start with 'postgresql://' or 'postgres://'"
            )
        
        return v
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True
    )


# Global settings instance
settings = Settings()
