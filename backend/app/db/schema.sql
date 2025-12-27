-- ========================================
-- NeuroNet Database Schema - STEP 2
-- Core User and Role Management Schema
-- ========================================
-- 
-- Purpose: Minimal production-ready schema for user authentication
--          and role-based access control (RBAC)
--
-- Supported Roles:
--   - user: Regular users seeking mental health support
--   - therapist: Licensed professionals providing therapy
--   - buddy: Peer supporters offering community support
--
-- Drizzle-compatible: Pure SQL, no ORM abstractions
-- PostgreSQL 14+ required for pgcrypto extension
-- ========================================

-- Enable UUID generation using PostgreSQL's cryptographic functions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- ========================================
-- TABLE: users
-- ========================================
-- Core authentication table storing user credentials and role information.
-- This table is the foundation for all user-related operations.
--
-- Design decisions:
--   - UUID primary keys for security and distributed systems compatibility
--   - Role-based access control with CHECK constraint for data integrity
--   - Email uniqueness enforced at database level
--   - Soft delete capability via is_active flag
--   - Automatic timestamp tracking for audit trails
-- ========================================

CREATE TABLE IF NOT EXISTS users (
    -- Primary identifier using UUID for security
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Authentication fields
    email TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    
    -- Role-based access control
    -- Constrains role to one of three valid types
    role TEXT NOT NULL CHECK (role IN ('user', 'therapist', 'buddy')),
    
    -- Account status management
    is_active BOOLEAN NOT NULL DEFAULT true,
    
    -- Audit timestamps
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Index for fast email lookups during authentication
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Index for role-based queries (e.g., "find all therapists")
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Index for filtering active users
CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active);


-- ========================================
-- TABLE: user_profiles
-- ========================================
-- Extended user information for personalization and matching.
-- Maintains 1-to-1 relationship with users table.
--
-- Design decisions:
--   - Separate from users table for clean separation of auth vs profile data
--   - PostgreSQL arrays for multi-value fields (languages, interests)
--   - Cascade delete to maintain referential integrity
--   - Flexible schema allows NULL values for optional fields
-- ========================================

CREATE TABLE IF NOT EXISTS user_profiles (
    -- Primary identifier
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign key relationship (1-to-1 with users)
    -- UNIQUE constraint ensures one profile per user
    -- CASCADE delete ensures profile is removed when user is deleted
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Personal information
    full_name TEXT,
    age INTEGER,
    gender TEXT,
    
    -- Multi-value fields using PostgreSQL arrays
    -- Enables efficient matching and filtering
    languages TEXT[],     -- e.g., ['English', 'Spanish', 'Hindi']
    interests TEXT[],     -- e.g., ['meditation', 'yoga', 'journaling']
    
    -- Audit timestamp
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Index for fast user_id lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);


-- ========================================
-- VERIFICATION QUERIES
-- ========================================
-- Uncomment these queries to verify schema and inspect data
-- ========================================

-- View all users
-- SELECT * FROM users;

-- View all user profiles
-- SELECT * FROM user_profiles;

-- View users with their profiles (JOIN example)
-- SELECT 
--     u.id,
--     u.email,
--     u.role,
--     u.is_active,
--     p.full_name,
--     p.age,
--     p.languages,
--     p.interests
-- FROM users u
-- LEFT JOIN user_profiles p ON u.user_id = p.user_id;

-- Count users by role
-- SELECT role, COUNT(*) as user_count
-- FROM users
-- GROUP BY role;

-- Find active therapists
-- SELECT * FROM users
-- WHERE role = 'therapist' AND is_active = true;
