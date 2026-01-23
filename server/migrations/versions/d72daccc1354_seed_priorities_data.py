"""seed priorities data

Revision ID: d72daccc1354
Revises: 6839c2febd4e
Create Date: 2026-01-23 09:05:03.193173

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
import json
import os

# revision identifiers, used by Alembic.
revision: str = 'd72daccc1354'
down_revision: Union[str, Sequence[str], None] = '6839c2febd4e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Seed data for priority table in an idempotent way using priorities.json."""
    priorities_json_path = os.path.join(
        os.path.dirname(__file__), "..", "..", "seeds", "priorities.json"
    )
    with open(priorities_json_path, "r") as f:
        priorities_data = json.load(f)

    conn = op.get_bind()
    tags = [p["tag"] for p in priorities_data]
    existing = conn.execute(
        sa.text("SELECT tag FROM priority WHERE tag = ANY(:tags)"),
        {"tags": tags},
    ).fetchall()
    existing_tags = {row[0] for row in existing}

    # Only insert new priorities not already present
    new_priorities = [p for p in priorities_data if p["tag"] not in existing_tags]
    if new_priorities:
        op.bulk_insert(
            sa.table(
                "priority",
                sa.column("tag", sa.String),
                sa.column("name", sa.String),
            ),
            new_priorities,
        )

def downgrade() -> None:
    """Remove seeded data from priority table based on priorities.json content."""
    conn = op.get_bind()
    priorities_json_path = os.path.join(
        os.path.dirname(__file__), "..", "..", "seeds", "priorities.json"
    )
    with open(priorities_json_path, "r") as f:
        priorities_data = json.load(f)
    tags = [item["tag"] for item in priorities_data]
    conn.execute(
        sa.text("DELETE FROM priority WHERE tag IN :tags"),
        {"tags": tuple(tags)},
    )
