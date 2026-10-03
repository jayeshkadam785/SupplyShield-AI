from fastapi import APIRouter
import json
from pathlib import Path

router = APIRouter()

DATA = (
    Path(__file__).resolve().parents[1]
    / "data"
    / "synthetic"
    / "inventory.json"
)


@router.get("/")
def inventory():
    with open(DATA, "r", encoding="utf-8") as f:
        return json.load(f)
