from sqlalchemy import Column, ForeignKey, Integer, String, Table
from src.models import TimestampMixin, team_members
from src.database import Base
from sqlalchemy.orm import relationship

# Association table for User-Position many-to-many relationship
user_positions = Table(
    "user_positions",
    Base.metadata,
    Column(
        "user_id", Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    ),
    Column(
        "position_id",
        Integer,
        ForeignKey("positions.id", ondelete="CASCADE"),
        primary_key=True,
    ),
)

# Association table for User-Role many-to-many relationship
user_roles = Table(
    "user_roles",
    Base.metadata,
    Column(
        "user_id", Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    ),
    Column(
        "role_id", Integer, ForeignKey("roles.id", ondelete="CASCADE"), primary_key=True
    ),
)


class Users(TimestampMixin, Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    username = Column(String(50), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    
    positions = relationship(
        "Positions",
        secondary=user_positions,
        back_populates="users",
        lazy="selectin",
    )
    
    roles = relationship(
        "Roles",
        secondary=user_roles,
        back_populates="users",
        lazy="selectin",
    )

    teams = relationship(
        "Teams",
        secondary=team_members,
        back_populates="users",
        lazy="selectin",
    )


class Roles(TimestampMixin, Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True, index=True)
    tag = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(150), nullable=False)
    # Reverse relationship to users through user_roles
    users = relationship(
        "Users",
        secondary=user_roles,
        back_populates="roles",
        lazy="selectin",
    )


class Positions(TimestampMixin, Base):
    __tablename__ = "positions"
    id = Column(Integer, primary_key=True, index=True)
    tag = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(150), nullable=False)
    users = relationship(
        "Users",
        secondary=user_positions,
        back_populates="positions",
        lazy="selectin",
    )
