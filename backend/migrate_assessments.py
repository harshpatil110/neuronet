"""
Database Migration Script - Create Assessments Table

Run this script to create the assessments table in your Neon PostgreSQL database
"""

import asyncio
import asyncpg
from app.core.config import settings


async def run_migration():
    """Execute the assessments table creation SQL"""
    
    print("Connecting to database...")
    conn = await asyncpg.connect(settings.DATABASE_URL)
    
    try:
        print("Creating assessments table...")
        
        # Read SQL file
        with open('app/db/assessments.sql', 'r') as f:
            sql = f.read()
        
        # Execute SQL
        await conn.execute(sql)
        
        print("✅ Successfully created assessments table!")
        
        # Verify table exists
        result = await conn.fetchval(
            """
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'assessments'
            )
            """
        )
        
        if result:
            print("✅ Verified: assessments table exists")
        else:
            print("❌ Warning: Could not verify assessments table")
    
    except Exception as e:
        print(f"❌ Error creating assessments table: {e}")
        raise
    
    finally:
        await conn.close()
        print("Database connection closed")


if __name__ == "__main__":
    asyncio.run(run_migration())
