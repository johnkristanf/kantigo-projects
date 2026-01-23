from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy.future import select

from src.teams.schemas import TeamCreate, TeamResponse
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


@teams_router.get("/", response_model=list[TeamResponse], status_code=status.HTTP_200_OK)
async def get_all(session: AsyncSession = Depends(Database.get_async_session)):
    result = await session.execute(select(Teams))
    teams = result.scalars().all()
    return teams