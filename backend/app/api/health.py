"""
Health Check Endpoints

Provides system health monitoring endpoints including database connectivity
"""

from fastapi import APIRouter, Depends

from app.core.database import get_db

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


@router.get("/db")
async def database_health_check(db=Depends(get_db)):
    """
    Database health check endpoint
    
    Verifies database connectivity by executing a simple query.
    Returns connection status for monitoring and diagnostics.
    """
    try:
        # Execute simple query to verify database connectivity
        result = await db.fetchval("SELECT 1")
        
        if result == 1:
            return {"database": "connected"}
        else:
            return {"database": "error"}
    except Exception:
        return {"database": "error"}

