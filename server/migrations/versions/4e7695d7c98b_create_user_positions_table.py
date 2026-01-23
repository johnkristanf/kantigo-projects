"""create_user_positions_table

Revision ID: 4e7695d7c98b
Revises: da7a60816d83
Create Date: 2026-01-23 16:28:03.463125

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '4e7695d7c98b'
down_revision: Union[str, Sequence[str], None] = 'da7a60816d83'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema: Add user_positions pivot table."""
    op.create_table(
        'user_positions',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False),
        sa.Column('position_id', sa.Integer(), sa.ForeignKey('positions.id', ondelete='CASCADE'), nullable=False),
    )
    # Optionally, you might want to add a unique constraint so user_id + position_id cannot repeat
    op.create_unique_constraint(
        'uq_user_positions_user_id_position_id', 
        'user_positions', 
        ['user_id', 'position_id']
    )

def downgrade() -> None:
    """Downgrade schema: Remove user_positions pivot table."""
    op.drop_constraint('uq_user_positions_user_id_position_id', 'user_positions', type_='unique')
    op.drop_table('user_positions')
