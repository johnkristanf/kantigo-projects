from fastapi import APIRouter, Depends, status
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio.session import AsyncSession

from src.tasks.models import Weights, Priority
from src.tasks.schemas import TaskCreate, TaskResponse
from src.tasks.models import Tasks
from src.database import Database

tasks_router = APIRouter()


@tasks_router.post(
    "/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED
)
async def create(
    data: TaskCreate, session: AsyncSession = Depends(Database.get_async_session)
):
    project = Tasks(**data.model_dump())
    session.add(project)
    await session.commit()
    await session.refresh(project)
    return project


@tasks_router.get("/weights", status_code=status.HTTP_200_OK)
async def get_weights(session: AsyncSession = Depends(Database.get_async_session)):
    stmt = select(Weights.id, Weights.tag, Weights.name, Weights.points)
    result = await session.execute(stmt)
    weights = result.mappings().all()
    return weights


@tasks_router.get("/priorities", status_code=status.HTTP_200_OK)
async def get_priorities(session: AsyncSession = Depends(Database.get_async_session)):
    stmt = select(Priority.id, Priority.tag, Priority.name)
    result = await session.execute(stmt)
    priorities = result.mappings().all()
    return priorities
