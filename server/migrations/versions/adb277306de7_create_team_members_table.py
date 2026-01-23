"""create_team_members_table

Revision ID: adb277306de7
Revises: e2a7e5d1d55e
Create Date: 2026-01-24 05:05:56.929381

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'adb277306de7'
down_revision: Union[str, Sequence[str], None] = 'e2a7e5d1d55e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema: create team_members table."""
    op.create_table(
        'team_members',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
        sa.Column('team_id', sa.Integer(), sa.ForeignKey('teams.id', ondelete='CASCADE'), nullable=False),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False),
    )


def downgrade() -> None:
    """Downgrade schema: drop team_members table."""
    op.drop_table('team_members')
