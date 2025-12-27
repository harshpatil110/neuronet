"""
Health Check Endpoints

Provides system health monitoring endpoints
"""

from fastapi import APIRouter

router = APIRouter(
    prefix="/health",
    tags=["Health"]
)


@router.get("")
async def health_check():
    """
    Health check endpoint
    
    Returns the operational status of the NeuroNet backend service.
    Use this endpoint for monitoring and load balancer health checks.
    """
    return {
        "status": "ok",
        "service": "NeuroNet Backend"
    }
