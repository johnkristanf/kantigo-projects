from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy.future import select

from src.user.models import Users
from src.teams.schemas import CreateTeamMembers, TeamCreate, TeamResponse
from src.teams.models import Teams
from src.database import Database

teams_router = APIRouter()


@teams_router.post(
    "/", response_model=TeamResponse, status_code=status.HTTP_201_CREATED
)
async def create(
    data: TeamCreate, session: AsyncSession = Depends(Database.get_async_session)
):
    team = Teams(**data.model_dump())
    session.add(team)
    await session.commit()
    await session.refresh(team)
    return team


@teams_router.post(
    "/add/members", response_model=TeamResponse, status_code=status.HTTP_201_CREATED
)
async def add_members(
    data: CreateTeamMembers, session: AsyncSession = Depends(Database.get_async_session)
):
    # Fetch the Team
    result = await session.execute(select(Teams).where(Teams.id == data.team_id))
    team = result.scalars().first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    # Fetch Users by their IDs
    users_result = await session.execute(
        select(Users).where(Users.id.in_(data.user_ids))
    )

    users = users_result.scalars().all()
    if not users or len(users) != len(data.user_ids):
        raise HTTPException(status_code=404, detail="One or more users not found")

    # Add users to team (avoid duplicates)
    team.users.extend([user for user in users if user not in team.users])

    await session.commit()
    await session.refresh(team)
    return team


@teams_router.get(
    "/", response_model=list[TeamResponse], status_code=status.HTTP_200_OK
)
async def get_all(session: AsyncSession = Depends(Database.get_async_session)):
    result = await session.execute(select(Teams))
    teams = result.scalars().all()
    return teams


@teams_router.get(
    "/by_project/{project_id}",
    response_model=list[TeamResponse],
    status_code=status.HTTP_200_OK,
)
async def get_teams_by_project(
    project_id: int,
    session: AsyncSession = Depends(Database.get_async_session),
):
    result = await session.execute(select(Teams).where(Teams.project_id == project_id))
    teams = result.scalars().all()
    return teams
