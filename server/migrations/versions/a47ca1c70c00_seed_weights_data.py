"""seed weights data

Revision ID: a47ca1c70c00
Revises: a3629e4e100b
Create Date: 2026-01-23 08:06:56.017943

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
import json
import os

# revision identifiers, used by Alembic.
revision: str = "a47ca1c70c00"
down_revision: Union[str, Sequence[str], None] = "a3629e4e100b"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Seed data for weights table in an idempotent way."""

    weights_json_path = os.path.join(
        os.path.dirname(__file__), "..", "..", "seeds", "weights.json"
    )
    with open(weights_json_path, "r") as f:
        weights_data = json.load(f)

    conn = op.get_bind()
    # Check which tags already exist
    tags = [w['tag'] for w in weights_data]
    existing = conn.execute(
        sa.text("SELECT tag FROM weights WHERE tag = ANY(:tags)"),
        {"tags": tags},
    ).fetchall()
    existing_tags = {row[0] for row in existing}

    # Only insert weights that don't exist yet
    new_weights = [w for w in weights_data if w["tag"] not in existing_tags]

    if new_weights:
        op.bulk_insert(
            sa.table(
                "weights",
                sa.column("tag", sa.String),
                sa.column("name", sa.String),
                sa.column("points", sa.Integer),
            ),
            new_weights,
        )


def downgrade() -> None:
    """Remove seeded data from weights table."""
    # Remove all the seeded weights rows matching the tags defined above.
    conn = op.get_bind()
    conn.execute(
        sa.text("DELETE FROM weights WHERE tag IN :tags"),
        {"tags": tuple(["XS", "S", "M", "L", "XL"])},
    )
