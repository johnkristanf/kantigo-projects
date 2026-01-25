from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from src.models import TimelineDateMixin, TimestampMixin, project_tasks
from src.database import Base


class Tasks(TimelineDateMixin, TimestampMixin, Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    status = Column(String(50), nullable=False, default="pending")
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    weight_id = Column(Integer, ForeignKey("weights.id"), nullable=True)
    assignee_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    projects = relationship(
        "Projects",
        secondary=project_tasks,
        back_populates="tasks",
        lazy="selectin",
    )


class Weights(TimestampMixin, Base):
    __tablename__ = "weights"

    id = Column(Integer, primary_key=True, index=True)
    tag = Column(String, nullable=False)
    name = Column(String, nullable=False)
    points = Column(Integer, nullable=False)


class Priority(TimestampMixin, Base):
    __tablename__ = "priority"

    id = Column(Integer, primary_key=True, index=True)
    tag = Column(String, nullable=False)
    name = Column(String, nullable=False)
