from fastapi import APIRouter

router = APIRouter()

@router.get("/{scenario}")
def scenario(scenario: str):
    results = {
        "normal": {"risk": 25, "eta_hours": 5.5, "shortage_risk": "LOW"},
        "heavy-rain": {"risk": 78, "eta_hours": 7.6, "shortage_risk": "MEDIUM"},
        "route-blocked": {"risk": 88, "eta_hours": 8.4, "shortage_risk": "HIGH"},
        "demand-20": {"risk": 65, "eta_hours": 5.8, "shortage_risk": "HIGH"}
    }
    return results.get(scenario, {"error": "Scenario not found"})
