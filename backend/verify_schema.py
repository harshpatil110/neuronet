"""
Schema Verification Script

Tests the schema.sql file against the Neon PostgreSQL database.
This is for VERIFICATION ONLY - not part of the application runtime.
"""

import asyncio
import asyncpg
from pathlib import Path

from app.core.config import settings


async def verify_schema():
    """Execute schema.sql and verify it runs without errors"""
    
    print("🔍 Connecting to Neon PostgreSQL...")
    conn = await asyncpg.connect(settings.DATABASE_URL)
    
    try:
        # Read schema file
        schema_path = Path(__file__).parent / "app" / "db" / "schema.sql"
        schema_sql = schema_path.read_text()
        
        print("📄 Executing schema.sql...")
        await conn.execute(schema_sql)
        
        print("✅ Schema executed successfully!")
        
        # Verify tables exist
        print("\n🔍 Verifying tables...")
        tables = await conn.fetch("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('users', 'user_profiles')
            ORDER BY table_name
        """)
        
        for table in tables:
            print(f"   ✓ {table['table_name']}")
        
        # Check users table structure
        print("\n📊 Users table columns:")
        columns = await conn.fetch("""
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'users'
            ORDER BY ordinal_position
        """)
        
        for col in columns:
            nullable = "NULL" if col['is_nullable'] == 'YES' else "NOT NULL"
            print(f"   - {col['column_name']}: {col['data_type']} ({nullable})")
        
        # Check user_profiles table structure
        print("\n📊 User_profiles table columns:")
        columns = await conn.fetch("""
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'user_profiles'
            ORDER BY ordinal_position
        """)
        
        for col in columns:
            nullable = "NULL" if col['is_nullable'] == 'YES' else "NOT NULL"
            print(f"   - {col['column_name']}: {col['data_type']} ({nullable})")
        
        print("\n✅ Schema verification complete!")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        raise
    finally:
        await conn.close()
        print("\n🔌 Connection closed")


if __name__ == "__main__":
    asyncio.run(verify_schema())
