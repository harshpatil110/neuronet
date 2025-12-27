"""
NeuroNet Backend API - Main Application Entry Point

STEP 0: Backend Foundation
This file initializes the FastAPI application with basic health checks.
Business logic will be added in subsequent steps.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import health

# Initialize FastAPI application
app = FastAPI(
    title="NeuroNet Backend API",
    version="0.1.0",
    description="Backend API for NeuroNet - A mental health support platform"
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


@app.get("/")
async def root():
    """Root endpoint - confirms backend is running"""
    return {
        "status": "NeuroNet backend running"
    }
