
from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime

class TaskStatus:
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"

    ALL = {PENDING, IN_PROGRESS, COMPLETED}
    
class TaskBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    status: str = Field(default=TaskStatus.PENDING)

    project_id: int
    weight_id: Optional[int] = None
    assignee_id: Optional[int] = None

    @field_validator("status")
    @classmethod
    def validate_status(cls, v: str):
        if v not in TaskStatus.ALL:
            raise ValueError(f"Invalid status: {v}")
        return v

class TaskCreate(TaskBase):
    pass    


class TaskResponse(TaskBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True  # important for SQLAlchemy
    }


