from sqlalchemy import Column, Integer, Text, String
from src.database import Base
from src.models import TimestampMixin


class Teams(TimestampMixin, Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=False)