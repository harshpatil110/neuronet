"""
Clinical Assessments API
Endpoints for PHQ-9 and GAD-7 mental health assessments
"""

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from typing import List, Dict, Any
import json
from datetime import datetime

from app.api.auth import get_current_user
from app.core.database import get_db_pool

router = APIRouter()


# ==================== PYDANTIC MODELS ====================

class AssessmentType(BaseModel):
    type: str
    title: str
    duration: str


class QuestionOption(BaseModel):
    value: int
    label: str


class Question(BaseModel):
    id: int
    text: str
    options: List[QuestionOption]


class QuestionResponse(BaseModel):
    question_id: int
    score: int = Field(ge=0, le=3)


class SubmitAssessmentRequest(BaseModel):
    type: str = Field(pattern="^(PHQ-9|GAD-7)$")
    responses: List[QuestionResponse]


class AssessmentResult(BaseModel):
    id: str
    type: str
    total_score: int
    risk_level: str
    created_at: datetime


class SubmitAssessmentResponse(BaseModel):
    total_score: int
    risk_level: str


# ==================== HARDCODED QUESTIONS ====================

PHQ9_QUESTIONS = [
    {
        "id": 1,
        "text": "Little interest or pleasure in doing things",
        "options": [
            {"value": 0, "label": "Not at all"},
            {"value": 1, "label": "Several days"},
            {"value": 2, "label": "More than half the days"},
            {"value": 3, "label": "Nearly every day"}
        ]
    },
    {
        "id": 2,
        "text": "Feeling down, depressed, or hopeless",
        "options": [
            {"value": 0, "label": "Not at all"},
            {"value": 1, "label": "Several days"},
            {"value": 2, "label": "More than half the days"},
            {"value": 3, "label": "Nearly every day"}
        ]
    },
    {
        "id": 3,
        "text": "Trouble falling or staying asleep, or sleeping too much",
        "options": [
            {"value": 0, "label": "Not at all"},
            {"value": 1, "label": "Several days"},
            {"value": 2, "label": "More than half the days"},
            {"value": 3, "label": "Nearly every day"}
        ]
    },
    {
        "id": 4,
        "text": "Feeling tired or having little energy",
        "options": [
            {"value": 0, "label": "Not at all"},
            {"value": 1, "label": "Several days"},
            {"value": 2, "label": "More than half the days"},
            {"value": 3, "label": "Nearly every day"}
        ]
    },
    {
        "id": 5,
        "text": "Poor appetite or overeating",
        "options": [
            {"value": 0, "label": "Not at all"},
            {"value": 1, "label": "Several days"},
            {"value": 2, "label": "More than half the days"},
            {"value": 3, "label": "Nearly every day"}
        ]
    },
    {
        "id": 6,
        "text": "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
        "options": [
            {"value": 0, "label": "Not at all"},
            {"value": 1, "label": "Several days"},
            {"value": 2, "label": "More than half the days"},
            {"value": 3, "label": "Nearly every day"}
        ]
    },
    {
        "id": 7,
        "text": "Trouble concentrating on things, such as reading the newspaper or watching television",
        "options": [
            {"value": 0, "label": "Not at all"},
            {"value": 1, "label": "Several days"},
            {"value": 2, "label": "More than half the days"},
            {"value": 3, "label": "Nearly every day"}
        ]
    },
    {
        "id": 8,
        "text": "Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
        "options": [
            {"value": 0, "label": "Not at all"},
            {"value": 1, "label": "Several days"},
            {"value": 2, "label": "More than half the days"},
            {"value": 3, "label": "Nearly every day"}
        ]
    },
    {
        "id": 9,
        "text": "Thoughts that you would be better off dead, or of hurting yourself in some way",
        "options": [
            {"value": 0, "label": "Not at all"},
            {"value": 1, "label": "Several days"},
            {"value": 2, "label": "More than half the days"},
            {"value": 3, "label": "Nearly every day"}
        ]
    }
]

GAD7_QUESTIONS = [
    {
        "id": 1,
        "text": "Feeling nervous, anxious, or on edge",
        "options": [
            {"value": 0, "label": "Not at all"},
            {"value": 1, "label": "Several days"},
            {"value": 2, "label": "More than half the days"},
            {"value": 3, "label": "Nearly every day"}
        ]
    },
    {
        "id": 2,
        "text": "Not being able to stop or control worrying",
        "options": [
            {"value": 0, "label": "Not at all"},
            {"value": 1, "label": "Several days"},
            {"value": 2, "label": "More than half the days"},
            {"value": 3, "label": "Nearly every day"}
        ]
    },
    {
        "id": 3,
        "text": "Worrying too much about different things",
        "options": [
            {"value": 0, "label": "Not at all"},
            {"value": 1, "label": "Several days"},
            {"value": 2, "label": "More than half the days"},
            {"value": 3, "label": "Nearly every day"}
        ]
    },
    {
        "id": 4,
        "text": "Trouble relaxing",
        "options": [
            {"value": 0, "label": "Not at all"},
            {"value": 1, "label": "Several days"},
            {"value": 2, "label": "More than half the days"},
            {"value": 3, "label": "Nearly every day"}
        ]
    },
    {
        "id": 5,
        "text": "Being so restless that it is hard to sit still",
        "options": [
            {"value": 0, "label": "Not at all"},
            {"value": 1, "label": "Several days"},
            {"value": 2, "label": "More than half the days"},
            {"value": 3, "label": "Nearly every day"}
        ]
    },
    {
        "id": 6,
        "text": "Becoming easily annoyed or irritable",
        "options": [
            {"value": 0, "label": "Not at all"},
            {"value": 1, "label": "Several days"},
            {"value": 2, "label": "More than half the days"},
            {"value": 3, "label": "Nearly every day"}
        ]
    },
    {
        "id": 7,
        "text": "Feeling afraid, as if something awful might happen",
        "options": [
            {"value": 0, "label": "Not at all"},
            {"value": 1, "label": "Several days"},
            {"value": 2, "label": "More than half the days"},
            {"value": 3, "label": "Nearly every day"}
        ]
    }
]


# ==================== SCORING FUNCTIONS ====================

def calculate_phq9_score(responses: List[QuestionResponse]) -> tuple[int, str]:
    """
    Calculate PHQ-9 score and risk level
    Total range: 0-27
    Scoring: 0-9 low, 10-14 moderate, 15+ high
    """
    if len(responses) != 9:
        raise ValueError("PHQ-9 requires exactly 9 responses")
    
    total_score = sum(r.score for r in responses)
    
    if total_score <= 9:
        risk_level = "low"
    elif total_score <= 14:
        risk_level = "moderate"
    else:
        risk_level = "high"
    
    return total_score, risk_level


def calculate_gad7_score(responses: List[QuestionResponse]) -> tuple[int, str]:
    """
    Calculate GAD-7 score and risk level
    Total range: 0-21
    Scoring: 0-9 low, 10-14 moderate, 15+ high
    """
    if len(responses) != 7:
        raise ValueError("GAD-7 requires exactly 7 responses")
    
    total_score = sum(r.score for r in responses)
    
    if total_score <= 9:
        risk_level = "low"
    elif total_score <= 14:
        risk_level = "moderate"
    else:
        risk_level = "high"
    
    return total_score, risk_level


def validate_responses(assessment_type: str, responses: List[QuestionResponse]) -> None:
    """Validate response format and values"""
    expected_count = 9 if assessment_type == "PHQ-9" else 7
    
    if len(responses) != expected_count:
        raise ValueError(f"{assessment_type} requires exactly {expected_count} responses")
    
    # Check for duplicate question IDs
    question_ids = [r.question_id for r in responses]
    if len(question_ids) != len(set(question_ids)):
        raise ValueError("Duplicate question IDs found")
    
    # Check question IDs are in valid range
    for r in responses:
        if r.question_id < 1 or r.question_id > expected_count:
            raise ValueError(f"Invalid question_id: {r.question_id}")
        if r.score < 0 or r.score > 3:
            raise ValueError(f"Invalid score: {r.score}. Must be 0-3")


# ==================== ENDPOINTS ====================

@router.get("/types", response_model=List[AssessmentType])
async def get_assessment_types(current_user: dict = Depends(get_current_user)):
    """
    Get list of available assessment types
    Protected endpoint - requires JWT
    """
    return [
        {
            "type": "PHQ-9",
            "title": "Mental Wellness Check",
            "duration": "5 min"
        },
        {
            "type": "GAD-7",
            "title": "Anxiety & Stress Assessment",
            "duration": "10 min"
        }
    ]


@router.get("/{assessment_type}/questions", response_model=List[Question])
async def get_assessment_questions(
    assessment_type: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get questions for a specific assessment type
    Protected endpoint - requires JWT
    """
    if assessment_type == "PHQ-9":
        return PHQ9_QUESTIONS
    elif assessment_type == "GAD-7":
        return GAD7_QUESTIONS
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Assessment type '{assessment_type}' not found"
        )


@router.post("/submit", response_model=SubmitAssessmentResponse)
async def submit_assessment(
    request: SubmitAssessmentRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Submit assessment responses
    Validates, calculates score, determines risk level, and persists to database
    """
    try:
        # Validate responses
        validate_responses(request.type, request.responses)
        
        # Calculate score and risk level
        if request.type == "PHQ-9":
            total_score, risk_level = calculate_phq9_score(request.responses)
        elif request.type == "GAD-7":
            total_score, risk_level = calculate_gad7_score(request.responses)
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid assessment type: {request.type}"
            )
        
        # Convert responses to JSON for storage
        responses_json = json.dumps([r.dict() for r in request.responses])
        
        # Insert into database
        pool = await get_db_pool()
        async with pool.acquire() as conn:
            await conn.execute(
                """
                INSERT INTO assessments (user_id, type, responses, total_score, risk_level)
                VALUES ($1, $2, $3, $4, $5)
                """,
                current_user["id"],
                request.type,
                responses_json,
                total_score,
                risk_level
            )
        
        return {
            "total_score": total_score,
            "risk_level": risk_level
        }
    
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to submit assessment: {str(e)}"
        )


@router.get("/history", response_model=List[AssessmentResult])
async def get_assessment_history(current_user: dict = Depends(get_current_user)):
    """
    Get assessment history for the current user
    Returns all past assessments ordered by most recent first
    """
    try:
        pool = await get_db_pool()
        async with pool.acquire() as conn:
            rows = await conn.fetch(
                """
                SELECT id, type, total_score, risk_level, created_at
                FROM assessments
                WHERE user_id = $1
                ORDER BY created_at DESC
                """,
                current_user["id"]
            )
        
        return [
            {
                "id": str(row["id"]),
                "type": row["type"],
                "total_score": row["total_score"],
                "risk_level": row["risk_level"],
                "created_at": row["created_at"]
            }
            for row in rows
        ]
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch assessment history: {str(e)}"
        )
