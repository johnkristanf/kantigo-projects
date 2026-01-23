"""seed positions data

Revision ID: da7a60816d83
Revises: 19fb6bde20b5
Create Date: 2026-01-23 14:50:49.612580

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'da7a60816d83'
down_revision: Union[str, Sequence[str], None] = '19fb6bde20b5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


import json
import os

from alembic import op
import sqlalchemy as sa

def upgrade() -> None:
    """Seed data for positions table in an idempotent way."""

    positions_json_path = os.path.join(
        os.path.dirname(__file__), "..", "..", "seeds", "positions.json"
    )
    with open(positions_json_path, "r", encoding="utf-8") as f:
        positions_data = json.load(f)

    conn = op.get_bind()
    tags = [p['tag'] for p in positions_data]
    # Get tags that already exist
    existing = conn.execute(
        sa.text("SELECT tag FROM positions WHERE tag = ANY(:tags)"),
        {"tags": tags},
    ).fetchall()
    existing_tags = {row[0] for row in existing}

    # Only insert new positions (id, tag, name) that don't exist yet
    new_positions = [dict(tag=pos["tag"], name=pos["name"]) for pos in positions_data if pos["tag"] not in existing_tags]

    if new_positions:
        op.bulk_insert(
            sa.table(
                "positions",
                sa.column("tag", sa.String),
                sa.column("name", sa.String),
            ),
            new_positions,
        )

def downgrade() -> None:
    """Remove seeded data from positions table."""
    positions_json_path = os.path.join(
        os.path.dirname(__file__), "..", "..", "seeds", "positions.json"
    )
    with open(positions_json_path, "r", encoding="utf-8") as f:
        positions_data = json.load(f)

    conn = op.get_bind()
    tags = tuple([pos["tag"] for pos in positions_data])
    if tags:
        conn.execute(
            sa.text("DELETE FROM positions WHERE tag IN :tags"),
            {"tags": tags},
        )
