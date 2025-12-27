# Database Schema - STEP 2

This directory contains the core SQL schema for NeuroNet's user and role management.

## Files

- **schema.sql** - Production-ready PostgreSQL schema defining users and user_profiles tables

## Schema Overview

### Tables Created

1. **users**
   - Core authentication table
   - Supports 3 roles: `user`, `therapist`, `buddy`
   - UUID primary keys
   - Email uniqueness enforced
   - Soft delete via `is_active` flag

2. **user_profiles**
   - 1-to-1 relationship with users
   - Extended user information
   - PostgreSQL arrays for `languages` and `interests`
   - Cascade delete on user removal

## Features

✅ PostgreSQL-specific (pgcrypto, arrays, timezone-aware timestamps)  
✅ Drizzle-compatible (pure SQL, no ORM)  
✅ Production-ready indexes for performance  
✅ Idempotent (safe to run multiple times)  
✅ Role-based access control with CHECK constraints  
✅ Audit timestamps on all tables  

## Usage

### Manual Execution

```bash
psql $DATABASE_URL < app/db/schema.sql
```

### Programmatic Verification

```bash
python verify_schema.py
```

This script:
- Executes the schema against your Neon database
- Verifies all tables were created
- Shows table structure
- Confirms idempotency

## Design Decisions

- **UUID vs Integer IDs**: UUIDs chosen for security and distributed systems compatibility
- **Separate profiles table**: Clean separation between auth data and user information
- **PostgreSQL arrays**: Native support for multi-value fields without junction tables
- **CHECK constraints**: Database-level validation for role values
- **Timezone-aware timestamps**: Essential for global application

## Next Steps

STEP 3 will add authentication APIs that use this schema.
