from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class ProjectBase(BaseModel):
    name: str
    description: str
    status: str = "pending"
    start_date: datetime
    end_date: datetime


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: str = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None


class ProjectResponse(ProjectBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class AddTeamsToProject(BaseModel):
    team_ids: list[int]