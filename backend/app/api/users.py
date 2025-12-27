"""
User Profile APIs

STEP 4: User Profile Management
Allows authenticated users to fetch and update their profile information
"""

from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field, field_validator

from app.api.auth import get_current_user
from app.core.database import get_db


router = APIRouter(tags=["users"])


# Pydantic models for request/response
class ProfileData(BaseModel):
    """Profile data nested in user response"""
    full_name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    languages: Optional[List[str]] = None
    interests: Optional[List[str]] = None


class UserProfileResponse(BaseModel):
    """Complete user profile response"""
    id: str
    email: str
    role: str
    profile: ProfileData


class UpdateProfileRequest(BaseModel):
    """Request body for profile updates"""
    full_name: Optional[str] = Field(None, min_length=1, max_length=100)
    age: Optional[int] = Field(None, gt=0, le=120)
    gender: Optional[str] = Field(None, min_length=1, max_length=20)
    languages: Optional[List[str]] = Field(None, min_length=1)
    interests: Optional[List[str]] = Field(None, min_length=1)

    @field_validator('languages', 'interests')
    @classmethod
    def validate_string_arrays(cls, v: Optional[List[str]]) -> Optional[List[str]]:
        """Ensure array items are non-empty strings"""
        if v is not None:
            if not all(isinstance(item, str) and item.strip() for item in v):
                raise ValueError("Array items must be non-empty strings")
        return v

    def has_updates(self) -> bool:
        """Check if any field is provided for update"""
        return any([
            self.full_name is not None,
            self.age is not None,
            self.gender is not None,
            self.languages is not None,
            self.interests is not None
        ])


@router.get("/profile", response_model=UserProfileResponse)
async def get_profile(
    current_user: dict = Depends(get_current_user),
    db=Depends(get_db)
):
    """
    Fetch the authenticated user's profile.
    
    Joins users and user_profiles tables to return complete profile information.
    """
    user_id = current_user["id"]
    
    # Query to join users and user_profiles
    query = """
        SELECT 
            u.id,
            u.email,
            u.role,
            p.full_name,
            p.age,
            p.gender,
            p.languages,
            p.interests
        FROM users u
        LEFT JOIN user_profiles p ON u.id = p.user_id
        WHERE u.id = $1
    """
    
    row = await db.fetchrow(query, UUID(user_id))
    
    if not row:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Build response with profile data
    return UserProfileResponse(
        id=str(row["id"]),
        email=row["email"],
        role=row["role"],
        profile=ProfileData(
            full_name=row["full_name"],
            age=row["age"],
            gender=row["gender"],
            languages=row["languages"] or [],
            interests=row["interests"] or []
        )
    )


@router.put("/profile", response_model=UserProfileResponse)
async def update_profile(
    profile_update: UpdateProfileRequest,
    current_user: dict = Depends(get_current_user),
    db=Depends(get_db)
):
    """
    Update the authenticated user's profile.
    
    Only provided fields will be updated. Email and role cannot be changed.
    """
    # Validate that at least one field is provided
    if not profile_update.has_updates():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No fields provided for update"
        )
    
    user_id = current_user["id"]
    
    # Build dynamic UPDATE query
    update_fields = []
    params = [UUID(user_id)]
    param_index = 2
    
    if profile_update.full_name is not None:
        update_fields.append(f"full_name = ${param_index}")
        params.append(profile_update.full_name)
        param_index += 1
    
    if profile_update.age is not None:
        update_fields.append(f"age = ${param_index}")
        params.append(profile_update.age)
        param_index += 1
    
    if profile_update.gender is not None:
        update_fields.append(f"gender = ${param_index}")
        params.append(profile_update.gender)
        param_index += 1
    
    if profile_update.languages is not None:
        update_fields.append(f"languages = ${param_index}")
        params.append(profile_update.languages)
        param_index += 1
    
    if profile_update.interests is not None:
        update_fields.append(f"interests = ${param_index}")
        params.append(profile_update.interests)
        param_index += 1
    
    # Always update the updated_at timestamp
    update_fields.append("updated_at = CURRENT_TIMESTAMP")
    
    # Execute update
    update_query = f"""
        UPDATE user_profiles
        SET {', '.join(update_fields)}
        WHERE user_id = $1
        RETURNING user_id
    """
    
    result = await db.fetchval(update_query, *params)
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found. Please contact support."
        )
    
    # Fetch and return updated profile
    fetch_query = """
        SELECT 
            u.id,
            u.email,
            u.role,
            p.full_name,
            p.age,
            p.gender,
            p.languages,
            p.interests
        FROM users u
        LEFT JOIN user_profiles p ON u.id = p.user_id
        WHERE u.id = $1
    """
    
    row = await db.fetchrow(fetch_query, UUID(user_id))
    
    return UserProfileResponse(
        id=str(row["id"]),
        email=row["email"],
        role=row["role"],
        profile=ProfileData(
            full_name=row["full_name"],
            age=row["age"],
            gender=row["gender"],
            languages=row["languages"] or [],
            interests=row["interests"] or []
        )
    )
