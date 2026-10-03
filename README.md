# SIH26251 – Predictive Logistics & Forward Supply Chain

AI-powered predictive logistics decision-support prototype for SIH 2026 Problem Statement 26251.

## Final Prototype Scope

### 4 Main Dashboards
1. Command Dashboard
2. Inventory & Forecast
3. Logistics & GIS
4. Alerts & Decision

### Core MVP
- Inventory monitoring
- AI demand forecasting
- Shortage prediction
- Predictive alerts
- GIS logistics map
- Route planning
- Weather intelligence
- Route risk
- Vehicle capacity
- AI logistics recommendation
- What-if simulation

### Updated Prototype
- Demand heatmap
- Risk heatmap
- Advanced route optimization
- Fleet management
- AI Logistics Copilot
- Multi-base optimization
- Inventory redistribution
- Explainable AI
- Advanced analytics

## Architecture

GitHub → Next.js → Vercel

FastAPI → AI/ML + synthetic JSON data

Supabase is intentionally NOT included in Phase 1. It can be added later.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend API: `http://127.0.0.1:8000`

## Deployment

- Frontend: Vercel
- Backend: Render/Railway
- Source: GitHub

## Data

The prototype uses synthetic JSON data in `data/synthetic/`. Replace it with real authorized data only when available.

## Important

Do not commit API keys, passwords, `.env` files, or private credentials.
