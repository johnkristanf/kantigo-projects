"""create_project_teams_table

Revision ID: 550af80d8855
Revises: adb277306de7
Create Date: 2026-01-25 15:52:35.770318

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '550af80d8855'
down_revision: Union[str, Sequence[str], None] = 'adb277306de7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'project_teams',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
        sa.Column('project_id', sa.Integer(), sa.ForeignKey('projects.id', ondelete='CASCADE'), nullable=False),
        sa.Column('team_id', sa.Integer(), sa.ForeignKey('teams.id', ondelete='CASCADE'), nullable=False),
        sa.UniqueConstraint('project_id', 'team_id', name='uq_project_teams_project_id_team_id')
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('project_teams')
