from pydantic import BaseModel, Field


from datetime import datetime

class TeamBase(BaseModel):
    name: str = Field(..., description="Name of the team")
    description: str = Field(..., description="Description of the team")


class TeamCreate(TeamBase):
    pass


class TeamResponse(TeamBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
