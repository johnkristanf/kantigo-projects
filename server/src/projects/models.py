from sqlalchemy import Column, Integer, String, Text
from datetime import datetime
from src.database import Base
from src.models import TimelineDateMixin, TimestampMixin


class Projects(TimelineDateMixin, TimestampMixin, Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    status = Column(String(50), default="pending")
