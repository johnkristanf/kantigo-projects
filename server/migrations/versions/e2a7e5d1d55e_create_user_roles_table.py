"""create_user_roles_table

Revision ID: e2a7e5d1d55e
Revises: 640d77dec597
Create Date: 2026-01-24 04:09:17.895503

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'e2a7e5d1d55e'
down_revision: Union[str, Sequence[str], None] = '640d77dec597'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create user_roles table."""
    op.create_table(
        'user_roles',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False),
        sa.Column('role_id', sa.Integer(), sa.ForeignKey('roles.id', ondelete='CASCADE'), nullable=False),
    )


def downgrade() -> None:
    """Drop user_roles table."""
    op.drop_table('user_roles')

