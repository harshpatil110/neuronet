"""
Authentication API Endpoints

STEP 3: User Registration, Login, and JWT Authentication
Implements role-based access control for NeuroNet platform
"""

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError
from pydantic import BaseModel, EmailStr, Field

from app.core.database import get_db
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    decode_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

# Security scheme for JWT Bearer tokens
security = HTTPBearer()


# ========================================
# REQUEST/RESPONSE MODELS
# ========================================

class RegisterRequest(BaseModel):
    """User registration request"""
    email: EmailStr
    password: str = Field(min_length=8, description="Password must be at least 8 characters")
    role: str = Field(pattern="^(user|therapist|buddy)$", description="Role must be: user, therapist, or buddy")


class LoginRequest(BaseModel):
    """User login request"""
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    """JWT token response"""
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    """User information response"""
    id: str
    email: str
    role: str
    is_active: bool


# ========================================
# AUTHENTICATION DEPENDENCIES
# ========================================

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db=Depends(get_db)
) -> dict:
    """
    Dependency to get current authenticated user from JWT token.
    
    Validates JWT token and retrieves user from database.
    
    Raises:
        HTTPException 401: If token is invalid or user not found
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Decode JWT token
        token = credentials.credentials
        payload = decode_access_token(token)
        user_id: str = payload.get("sub")
        
        if user_id is None:
            raise credentials_exception
            
    except JWTError:
        raise credentials_exception
    
    # Fetch user from database
    user = await db.fetchrow(
        "SELECT id, email, role, is_active FROM users WHERE id = $1",
        user_id
    )
    
    if user is None:
        raise credentials_exception
    
    if not user["is_active"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive"
        )
    
    return dict(user)


def require_role(allowed_roles: List[str]):
    """
    Dependency factory for role-based access control.
    
    Args:
        allowed_roles: List of roles allowed to access the endpoint
        
    Returns:
        Dependency function that validates user role
        
    Example:
        @router.get("/admin", dependencies=[Depends(require_role(["therapist"]))])
    """
    async def role_checker(current_user: dict = Depends(get_current_user)) -> dict:
        if current_user["role"] not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required role: {', '.join(allowed_roles)}"
            )
        return current_user
    
    return role_checker


# ========================================
# ENDPOINTS
# ========================================

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(
    request: RegisterRequest,
    db=Depends(get_db)
):
    """
    Register a new user.
    
    Creates a new user account with hashed password and empty profile.
    
    - **email**: Valid email address (must be unique)
    - **password**: Minimum 8 characters
    - **role**: Must be one of: user, therapist, buddy
    """
    # Check if email already exists
    existing_user = await db.fetchrow(
        "SELECT id FROM users WHERE email = $1",
        request.email
    )
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Hash password
    hashed_password = hash_password(request.password)
    
    # Insert user into database
    user_id = await db.fetchval(
        """
        INSERT INTO users (email, hashed_password, role, is_active)
        VALUES ($1, $2, $3, $4)
        RETURNING id
        """,
        request.email,
        hashed_password,
        request.role,
        True
    )
    
    # Create empty user profile
    await db.execute(
        """
        INSERT INTO user_profiles (user_id)
        VALUES ($1)
        """,
        user_id
    )
    
    return {
        "message": "User registered successfully",
        "user_id": str(user_id)
    }


@router.post("/login", response_model=TokenResponse)
async def login(
    request: LoginRequest,
    db=Depends(get_db)
):
    """
    Authenticate user and return JWT token.
    
    Validates credentials and returns an access token for API authentication.
    
    - **email**: Registered email address
    - **password**: User's password
    """
    # Fetch user from database
    user = await db.fetchrow(
        """
        SELECT id, email, hashed_password, role, is_active
        FROM users
        WHERE email = $1
        """,
        request.email
    )
    
    # Validate user exists and password is correct
    if not user or not verify_password(request.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check if user is active
    if not user["is_active"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive"
        )
    
    # Create JWT token
    access_token = create_access_token(
        data={
            "sub": str(user["id"]),
            "email": user["email"],
            "role": user["role"]
        }
    )
    
    return TokenResponse(access_token=access_token)


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: dict = Depends(get_current_user)
):
    """
    Get current authenticated user information.
    
    Requires valid JWT token in Authorization header.
    
    Returns user's ID, email, role, and account status.
    """
    return UserResponse(
        id=str(current_user["id"]),
        email=current_user["email"],
        role=current_user["role"],
        is_active=current_user["is_active"]
    )
