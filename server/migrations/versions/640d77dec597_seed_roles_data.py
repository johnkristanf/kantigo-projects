"""seed roles data

Revision ID: 640d77dec597
Revises: c43a1b0d0e78
Create Date: 2026-01-24 04:03:37.583460

"""
import os
import json
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '640d77dec597'
down_revision: Union[str, Sequence[str], None] = 'c43a1b0d0e78'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None




def upgrade() -> None:
    """Seed data for roles table in an idempotent way."""

    # Determine the path to the roles.json data file
    roles_json_path = os.path.join(
        os.path.dirname(__file__), "..", "..", "seeds", "roles.json"
    )
    with open(roles_json_path, "r") as f:
        roles_data = json.load(f)

    conn = op.get_bind()
    tags = [r["tag"] for r in roles_data]
    # Get all tags that already exist in the roles table
    existing = conn.execute(
        sa.text("SELECT tag FROM roles WHERE tag = ANY(:tags)"),
        {"tags": tags},
    ).fetchall()
    existing_tags = {row[0] for row in existing}

    # Only insert roles that don't exist yet
    new_roles = [
        {k: v for k, v in role.items() if k in ("tag", "name")}
        for role in roles_data if role["tag"] not in existing_tags
    ]

    if new_roles:
        op.bulk_insert(
            sa.table(
                "roles",
                sa.column("tag", sa.String),
                sa.column("name", sa.String),
            ),
            new_roles,
        )


def downgrade() -> None:
    """Remove seeded data from roles table."""
    # Remove the seeded roles by their tag.
    conn = op.get_bind()
    tags_to_remove = []
    roles_json_path = os.path.join(
        os.path.dirname(__file__), "..", "..", "seeds", "roles.json"
    )
    if os.path.exists(roles_json_path):
        with open(roles_json_path, "r") as f:
            roles_data = json.load(f)
            tags_to_remove = [role["tag"] for role in roles_data]

    if tags_to_remove:
        conn.execute(
            sa.text("DELETE FROM roles WHERE tag = ANY(:tags)"),
            {"tags": tags_to_remove},
        )
