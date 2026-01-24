from typing import List
from pydantic import BaseModel, Field


from datetime import datetime
from src.user.schemas import UserResponse
from src.user.models import Users


class TeamBase(BaseModel):
    name: str = Field(..., description="Name of the team")
    description: str = Field(..., description="Description of the team")


class TeamCreate(TeamBase):
    pass


class CreateTeamMembers(BaseModel):
    team_id: int = Field(..., description="ID of the team to add members to")
    user_ids: list[int] = Field(..., description="List of user IDs to add to the team")


class TeamResponse(TeamBase):
    id: int
    members: List[UserResponse] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
