from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import status
from sqlalchemy.future import select
from src.user.schemas import UserCreate
from src.database import Database
from src.user.models import Positions, Users
from passlib.hash import bcrypt

users_router = APIRouter()

@users_router.get("/positions", response_model=list[dict], status_code=status.HTTP_200_OK)
async def get_all_positions(
    session: AsyncSession = Depends(Database.get_async_session),
):
    result = await session.execute(select(Positions))
    positions = result.scalars().all()
    return [{"id": pos.id, "name": pos.name} for pos in positions]


@users_router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user_with_positions(
    data: UserCreate,
    session: AsyncSession = Depends(Database.get_async_session),
):
    password_hashed = bcrypt.hash(data.password)

    # Query all Positions in one batch, let ORM handle relationship assignment
    positions = []
    if data.positions:
        q = await session.execute(
            select(Positions).where(Positions.id.in_(data.positions))
        )
        positions = list(q.scalars().all())
        
    user = Users(
        name=data.name,
        username=data.username,
        password=password_hashed,
        positions=positions 
    )
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return {
        "id": user.id,
        "name": user.name,
        "username": user.username,
        "positions": [{"id": p.id, "name": p.name} for p in user.positions],
    }