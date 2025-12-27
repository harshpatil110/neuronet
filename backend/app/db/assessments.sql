-- Clinical Assessments Table
-- Stores PHQ-9 and GAD-7 assessment responses and scores

CREATE TABLE IF NOT EXISTS assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('PHQ-9', 'GAD-7')),
    responses JSONB NOT NULL,
    total_score INTEGER NOT NULL,
    risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'moderate', 'high')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries by user
CREATE INDEX IF NOT EXISTS idx_assessments_user_id ON assessments(user_id);

-- Index for faster queries by type
CREATE INDEX IF NOT EXISTS idx_assessments_type ON assessments(type);

-- Index for sorting by date
CREATE INDEX IF NOT EXISTS idx_assessments_created_at ON assessments(created_at DESC);
