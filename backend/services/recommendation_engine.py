def logistics_recommendation():
    return {
        "destination": "Forward Base C",
        "supply": "2500 L Water",
        "vehicle": "Truck T-04",
        "route": "Route B",
        "dispatch_window": "Within 12 hours",
        "reason": [
            "Shortage predicted in 3 days",
            "Route A has higher weather risk",
            "Truck T-04 has sufficient capacity"
        ]
    }

def alerts():
    return [
        {"priority": "CRITICAL", "location": "Base C", "message": "Water shortage predicted in 3 days"},
        {"priority": "HIGH", "location": "Route A", "message": "Heavy rainfall may increase route risk"},
        {"priority": "MEDIUM", "location": "Fuel", "message": "Consumption spike detected"}
    ]
