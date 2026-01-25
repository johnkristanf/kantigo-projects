from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import status
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from src.teams.models import Teams
from src.user.dependencies import get_user_service
from src.user.service import UserService
from src.user.schemas import UserCreate
from src.database import Database
from src.user.models import Positions, Roles, Users
from passlib.hash import bcrypt

users_router = APIRouter()


@users_router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user_with_positions(
    data: UserCreate,
    session: AsyncSession = Depends(Database.get_async_session),
    user_service: UserService = Depends(get_user_service),
):
    password_hashed = bcrypt.hash(data.password)

    positions = await user_service.get_positions_by_ids(session, data.positions)

    member_role = await user_service.get_role_by_tag(session, "member")

    user = Users(
        name=data.name,
        username=data.username,
        password=password_hashed,
        positions=positions,
        roles=[member_role],
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



@users_router.get("/all/members", status_code=status.HTTP_200_OK)
async def get_all_members(
    session: AsyncSession = Depends(Database.get_async_session),
):
    result = await session.execute(select(Users).options(selectinload(Users.positions)))
    users = result.scalars().all()
    return [
        {
            "id": user.id,
            "name": user.name,
            "username": user.username,
            "positions": [{"id": pos.id, "name": pos.name} for pos in user.positions],
            "created_at": user.created_at if hasattr(user, "created_at") else None,
        }
        for user in users
    ]


@users_router.get("/members/{team_id}", status_code=status.HTTP_200_OK)
async def get_members_within_team(
    team_id: int,
    session: AsyncSession = Depends(Database.get_async_session),
):
    stmt = select(Users).join(Users.teams).where(Teams.id == team_id)

    result = await session.execute(stmt)
    users = result.scalars().all()
    return [
        {
            "id": user.id,
            "name": user.name,
            "username": user.username,
            "positions": [{"id": pos.id, "name": pos.name} for pos in user.positions],
        }
        for user in users
    ]


@users_router.get(
    "/positions", response_model=list[dict], status_code=status.HTTP_200_OK
)
async def get_all_positions(
    session: AsyncSession = Depends(Database.get_async_session),
):
    result = await session.execute(select(Positions))
    positions = result.scalars().all()
    return [{"id": pos.id, "name": pos.name} for pos in positions]
