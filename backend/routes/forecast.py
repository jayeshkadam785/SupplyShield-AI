from fastapi import APIRouter
from ml.forecasting import forecast_demand

router = APIRouter()

@router.get("/")
def forecast():
    return forecast_demand()
