from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from src.teams.models import Teams
from src.database import Database
from src.projects.schemas import (
    AddTeamsToProject,
    ProjectResponse,
    ProjectCreate,
    ProjectUpdate,
)
from src.projects.models import Projects

projects_router = APIRouter()


@projects_router.post(
    "/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED
)
async def create(
    data: ProjectCreate, session: AsyncSession = Depends(Database.get_async_session)
):
    project = Projects(**data.model_dump())
    session.add(project)
    await session.commit()
    await session.refresh(project)
    return project


@projects_router.post(
    "/assign/teams/{project_id}",
    response_model=ProjectResponse,
    status_code=status.HTTP_200_OK,
)
async def assign_teams_to_project(
    project_id: int,
    data: AddTeamsToProject,
    session: AsyncSession = Depends(Database.get_async_session),
):
    # Fetch the Project
    result = await session.execute(select(Projects).where(Projects.id == project_id))
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Fetch Teams by their IDs
    teams_result = await session.execute(
        select(Teams).where(Teams.id.in_(data.team_ids))
    )
    teams = teams_result.scalars().all()
    if not teams or len(teams) != len(set(data.team_ids)):
        raise HTTPException(status_code=404, detail="One or more teams not found")

    # Add teams to project (avoid duplicates)
    project.teams.extend([team for team in teams if team not in project.teams])

    await session.commit()
    await session.refresh(project)
    return project




@projects_router.get("/", response_model=list[ProjectResponse])
async def get_all(session: AsyncSession = Depends(Database.get_async_session)):
    result = await session.execute(select(Projects))
    projects = result.scalars().all()
    return projects


@projects_router.get("/{project_id}", response_model=ProjectResponse)
async def get_by_id(
    project_id: int, session: AsyncSession = Depends(Database.get_async_session)
):
    result = await session.execute(select(Projects).where(Projects.id == project_id))
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@projects_router.put("/{project_id}", response_model=ProjectResponse)
async def update(
    project_id: int,
    data: ProjectUpdate,
    session: AsyncSession = Depends(Database.get_async_session),
):
    result = await session.execute(select(Projects).where(Projects.id == project_id))
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(project, key, value)

    await session.commit()
    await session.refresh(project)
    return project


@projects_router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete(
    project_id: int, session: AsyncSession = Depends(Database.get_async_session)
):
    result = await session.execute(select(Projects).where(Projects.id == project_id))
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    await session.delete(project)
    await session.commit()
    return None
