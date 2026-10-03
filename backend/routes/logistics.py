from fastapi import APIRouter
from services.recommendation_engine import logistics_recommendation

router = APIRouter()

@router.get("/recommendation")
def recommendation():
    return logistics_recommendation()
