# from fastapi import APIRouter, Depends, HTTPException, status
# from src.auth import schemas, service

# auth_router = APIRouter()

# @auth_router.post("/login", response_model=schemas.Token)
# def login(data: schemas.LoginRequest):
#     user = service.authenticate_user(data.username, data.password)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     access_token = service.create_access_token(user)
#     return {"access_token": access_token, "token_type": "bearer"}

# @auth_router.post("/register", response_model=schemas.UserOut)
# def register(data: schemas.RegisterRequest):
#     user = service.create_user(data)
#     return user
