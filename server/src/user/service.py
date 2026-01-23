from typing import List

from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy.future import select

from src.user.models import Positions, Roles


class UserService:
    async def get_positions_by_ids(
        self, session: AsyncSession, positions_ids: List[int]
    ):
        positions = []
        if positions_ids:
            q = await session.execute(
                select(Positions).where(Positions.id.in_(positions_ids))
            )
            positions = list(q.scalars().all())

        return positions

    async def get_role_by_tag(
        self,
        session: AsyncSession,
        tag: str,
    ):
        role = await session.execute(select(Roles).where(Roles.tag == tag))

        role = role.scalar_one_or_none()
        if not role:
            raise RuntimeError("Role not found in roles table")

        return role
