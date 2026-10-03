from fastapi import APIRouter
from services.recommendation_engine import alerts

router = APIRouter()

@router.get("/")
def get_alerts():
    return alerts()
