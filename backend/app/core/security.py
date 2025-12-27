"""
Security Utilities

STEP 0: Placeholder for security functions
JWT authentication and password hashing will be implemented in later steps
"""


def hash_password(password: str) -> str:
    """
    Hash a plain text password
    
    This is a placeholder function.
    Will implement bcrypt/passlib password hashing in later steps.
    
    Args:
        password: Plain text password
        
    Returns:
        Hashed password string
    """
    raise NotImplementedError("Password hashing will be implemented in authentication step")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain text password against its hash
    
    This is a placeholder function.
    Will implement password verification in later steps.
    
    Args:
        plain_password: Plain text password to verify
        hashed_password: Hashed password to compare against
        
    Returns:
        True if password matches, False otherwise
    """
    raise NotImplementedError("Password verification will be implemented in authentication step")


# JWT Token Functions
# Will be implemented in authentication step:
# - create_access_token()
# - decode_access_token()
# - get_current_user()
