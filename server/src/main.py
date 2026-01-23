from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.tasks.router import tasks_router
from src.projects.router import projects_router
from src.database import Database
from src.utils import group


@asynccontextmanager
async def lifespan(app: FastAPI):
    Database.connect_async_session()
    yield
    await Database.close()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:10000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_v1_router = group(
    "/api/v1",
    (projects_router, "/projects", ["Projects"]),
    (tasks_router, "/tasks", ["Tasks"]),
)

app.include_router(api_v1_router)


@app.get("/health")
def check_server_health():
    return {"message": "Server is Healthy"}
