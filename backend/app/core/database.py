"""
Database Connection Management

STEP 1: Neon PostgreSQL Connection Layer
- Async connection pooling with asyncpg
- Drizzle-compatible (uses raw SQL, no ORM)
- Safe for concurrent requests
"""

import logging
from typing import AsyncGenerator, Optional

import asyncpg

from app.core.config import settings

# Global connection pool instance
_pool: Optional[asyncpg.Pool] = None

logger = logging.getLogger(__name__)


async def connect_to_db() -> None:
    """
    Initialize async PostgreSQL connection pool for Neon database.
    
    Called on application startup to establish a connection pool.
    Uses asyncpg for async operations and connection pooling.
    
    Connection pool configuration:
    - min_size=1: Maintain at least 1 connection
    - max_size=5: Allow up to 5 concurrent connections (safe for serverless)
    
    Note: This layer is Drizzle-compatible as it uses raw SQL only.
    No ORM abstractions are used. Drizzle will handle schema & migrations.
    """
    global _pool
    
    try:
        _pool = await asyncpg.create_pool(
            settings.DATABASE_URL,
            min_size=1,
            max_size=5,
            command_timeout=60
        )
        logger.info("✅ Connected to Neon PostgreSQL")
    except Exception as e:
        logger.error(f"❌ Failed to connect to database: {e}")
        raise


async def close_db_connection() -> None:
    """
    Close the database connection pool.
    
    Called on application shutdown to properly clean up connections.
    Ensures all connections are gracefully closed.
    """
    global _pool
    
    if _pool:
        await _pool.close()
        logger.info("Database connection pool closed")


async def get_db() -> AsyncGenerator[asyncpg.Connection, None]:
    """
    Database dependency for FastAPI routes.
    
    Yields a connection from the pool for the duration of the request.
    Automatically returns the connection to the pool when done.
    
    Usage in routes:
        @router.get("/example")
        async def example(db = Depends(get_db)):
            result = await db.fetch("SELECT * FROM users")
            return result
    
    Note: Uses raw SQL queries only - Drizzle-compatible.
    """
    if not _pool:
        raise RuntimeError("Database pool not initialized. Call connect_to_db() first.")
    
    # Acquire connection from pool
    connection = await _pool.acquire()
    try:
        yield connection
    finally:
        # Always return connection to pool
        await _pool.release(connection)


async def get_db_pool() -> asyncpg.Pool:
    """
    Get the database connection pool directly.
    
    Use this when you need to acquire connections manually
    or run operations outside of FastAPI dependency injection.
    
    Returns:
        asyncpg.Pool: The active connection pool
        
    Raises:
        RuntimeError: If the pool hasn't been initialized
    """
    if not _pool:
        raise RuntimeError("Database pool not initialized. Call connect_to_db() first.")
    return _pool

