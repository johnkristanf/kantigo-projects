"""create_project_tasks_table

Revision ID: a3a3d038cd85
Revises: 550af80d8855
Create Date: 2026-01-26 05:00:35.300256

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'a3a3d038cd85'
down_revision: Union[str, Sequence[str], None] = '550af80d8855'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema: create project_tasks pivot table."""
    op.create_table(
        'project_tasks',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
        sa.Column('project_id', sa.Integer(), sa.ForeignKey('projects.id', ondelete='CASCADE'), nullable=False),
        sa.Column('task_id', sa.Integer(), sa.ForeignKey('tasks.id', ondelete='CASCADE'), nullable=False),
        sa.UniqueConstraint('project_id', 'task_id', name='uq_project_tasks_project_id_task_id'),
    )


def downgrade() -> None:
    """Downgrade schema: drop project_tasks pivot table."""
    op.drop_table('project_tasks')
