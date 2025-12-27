"""
NeuroNet Backend API - Main Application Entry Point

STEP 3: Authentication Integration
FastAPI application with JWT authentication and role-based access control
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, health
from app.core.database import connect_to_db, close_db_connection

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s:     %(message)s"
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager for startup and shutdown events.
    
    Startup: Initialize database connection pool
    Shutdown: Close database connection pool
    """
    # Startup
    await connect_to_db()
    yield
    # Shutdown
    await close_db_connection()


# Initialize FastAPI application
app = FastAPI(
    title="NeuroNet Backend API",
    version="0.1.0",
    description="Backend API for NeuroNet - A mental health support platform",
    lifespan=lifespan
)

# Configure CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router)
app.include_router(auth.router)


@app.get("/")
async def root():
    """Root endpoint - confirms backend is running"""
    return {
        "status": "NeuroNet backend running"
    }

