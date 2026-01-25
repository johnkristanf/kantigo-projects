from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from src.database import Base
from src.models import TimelineDateMixin, TimestampMixin, project_tasks, project_teams


class Projects(TimelineDateMixin, TimestampMixin, Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    status = Column(String(50), default="pending")

    teams = relationship(
        "Teams",
        secondary=project_teams,
        back_populates="projects",
        lazy="selectin",
    )
    
    tasks = relationship(
        "Tasks",
        secondary=project_tasks,
        back_populates="projects",
        lazy="selectin",
    )
