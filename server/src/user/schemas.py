from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    """Common fields shared between create, update, and response."""
    name: str = Field(..., min_length=1, max_length=150, description="Full name")
    username: str = Field(..., min_length=3, max_length=50, description="Unique username")

    class Config:
        from_attributes = True 


class UserCreate(UserBase):
    """Schema for creating a new user (includes password & positions)."""
    password: str = Field(..., min_length=8, description="Plaintext password (will be hashed)")
    positions: List[int] = Field(
        default=[],
        description="List of position IDs to assign to the user"
    )

    @field_validator("positions", mode="before")
    @classmethod
    def convert_positions_to_int(cls, v):
        """Convert incoming position IDs (might be strings from JSON) to integers."""
        if isinstance(v, list):
            try:
                return [int(x) for x in v if x is not None and str(x).strip()]
            except (ValueError, TypeError):
                raise ValueError("All position IDs must be valid integers")
        return v


class PositionOut(BaseModel):
    """Minimal representation of a Position in responses."""
    id: int
    tag: str
    name: str

    class Config:
        from_attributes = True


class UserResponse(UserBase):
    """Response schema returned to the client."""
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    positions: List[PositionOut] = []

    class Config:
        from_attributes = True