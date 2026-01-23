from sqlalchemy import Column, ForeignKey, Integer, String, Table
from src.models import TimestampMixin
from src.database import Base

from sqlalchemy.orm import relationship

user_positions = Table(
    "user_positions",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("position_id", Integer, ForeignKey("positions.id"), primary_key=True),
)

class Users(TimestampMixin, Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    username = Column(String(50), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    # Cleaner way: use the declared association/pivot model in relationships
    positions = relationship(
        "Positions",
        secondary=user_positions,  # just use table name
        back_populates="users",
        lazy="selectin",
    )


class Roles(TimestampMixin, Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True, index=True)
    tag = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(150), nullable=False)


class Positions(TimestampMixin, Base):
    __tablename__ = "positions"
    id = Column(Integer, primary_key=True, index=True)
    tag = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(150), nullable=False)
    users = relationship(
        "Users",
        secondary=user_positions,  # just use table name
        back_populates="positions",
        lazy="selectin",
    )
