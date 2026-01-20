"""initialized projects table

Revision ID: 3965ac092e25
Revises: 307d32dadd8f
Create Date: 2026-01-21 04:03:41.562488
"""

from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "3965ac092e25"
down_revision: Union[str, Sequence[str], None] = "307d32dadd8f"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "projects",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(length=50), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),

        # Status enum
        sa.Column(
            "status",
            sa.Enum(
                "PENDING",
                "IN_PROGRESS",
                "COMPLETED",
                name="status_enum",
            ),
            nullable=False,
            server_default="PENDING",
        ),

        # TimelineDateMixin
        sa.Column("start_date", sa.DateTime(timezone=True), nullable=False),
        sa.Column("end_date", sa.DateTime(timezone=True), nullable=False),

        # TimestampMixin
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
    )

    op.create_index("ix_projects_id", "projects", ["id"])


def downgrade() -> None:
    op.drop_index("ix_projects_id", table_name="projects")
    op.drop_table("projects")

    # Drop enum explicitly (PostgreSQL)
    op.execute("DROP TYPE IF EXISTS status_enum")
