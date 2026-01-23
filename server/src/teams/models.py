from sqlalchemy import Column, Integer, Text, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from src.database import Base
from src.models import TimestampMixin, team_members

# Association table for Team-User many-to-many relationship


class Teams(TimestampMixin, Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=False)

    users = relationship(
        "Users",
        secondary=team_members,
        back_populates="teams",
        lazy="selectin",
    )