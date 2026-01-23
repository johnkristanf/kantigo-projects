"""create_roles_table

Revision ID: c43a1b0d0e78
Revises: 4e7695d7c98b
Create Date: 2026-01-24 03:51:51.973442

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'c43a1b0d0e78'
down_revision: Union[str, Sequence[str], None] = '4e7695d7c98b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema: Create roles table."""
    op.create_table(
        'roles',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('tag', sa.String(length=50), unique=True, index=True, nullable=False),
        sa.Column('name', sa.String(length=150), nullable=False),
        sa.Column('created_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column('updated_at', sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.func.now(), onupdate=sa.func.now())
    )


def downgrade() -> None:
    """Downgrade schema: Drop roles table."""
    op.drop_table('roles')
