from fastapi import FastAPI

from routes.inventory import router as inventory_router
from routes.forecast import router as forecast_router
from routes.logistics import router as logistics_router
from routes.alerts import router as alerts_router
from routes.scenarios import router as scenarios_router

app = FastAPI(
    title="SupplyShield AI",
    version="1.0.0"
)

app.include_router(
    inventory_router,
    prefix="/api/inventory",
    tags=["Inventory"]
)

app.include_router(
    forecast_router,
    prefix="/api/forecast",
    tags=["Forecast"]
)

app.include_router(
    logistics_router,
    prefix="/api/logistics",
    tags=["Logistics"]
)

app.include_router(
    alerts_router,
    prefix="/api/alerts",
    tags=["Alerts"]
)

app.include_router(
    scenarios_router,
    prefix="/api/scenarios",
    tags=["Scenarios"]
)


@app.get("/")
def root():
    return {
        "project": "SupplyShield AI",
        "status": "online"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
