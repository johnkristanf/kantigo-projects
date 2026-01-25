from sqlalchemy import Column, DateTime, ForeignKey, Integer, Table, func
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime

from src.database import Base


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )


class TimelineDateMixin:
    start_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    end_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )


# ASSOCIATION TABLES
team_members = Table(
    "team_members",
    Base.metadata,
    Column("id", Integer, primary_key=True, autoincrement=True, nullable=False),
    Column(
        "team_id", Integer, ForeignKey("teams.id", ondelete="CASCADE"), nullable=False
    ),
    Column(
        "user_id", Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    ),
)


project_teams = Table(
    "project_teams",
    Base.metadata,
    Column("id", Integer, primary_key=True, autoincrement=True, nullable=False),
    Column(
        "project_id",
        Integer,
        ForeignKey("projects.id", ondelete="CASCADE"),
        nullable=False,
    ),
    Column(
        "team_id", Integer, ForeignKey("teams.id", ondelete="CASCADE"), nullable=False
    ),
)
