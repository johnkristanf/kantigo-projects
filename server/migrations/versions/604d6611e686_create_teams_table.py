"""create_teams_table

Revision ID: 604d6611e686
Revises: d72daccc1354
Create Date: 2026-01-23 11:01:24.484623

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "604d6611e686"
down_revision: Union[str, Sequence[str], None] = "d72daccc1354"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema to create teams table."""
    op.create_table(
        "teams",
        sa.Column("id", sa.Integer(), primary_key=True, index=True, nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column(
            "created_at",
            postgresql.TIMESTAMP(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            postgresql.TIMESTAMP(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )


def downgrade() -> None:
    """Downgrade schema by dropping teams table."""
    op.drop_index(op.f("ix_teams_id"), table_name="teams")
    # ### end Alembic commands ###
