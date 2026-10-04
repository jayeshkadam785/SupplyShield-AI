"use client";

import { useMemo, useState } from "react";

type Role = "admin" | "commander" | "captain";

const roleInfo = {
  admin: {
    title: "Admin Command Center",
    subtitle: "System-wide defence logistics control",
    badge: "SYSTEM ADMIN",
    initials: "AD",
  },
  commander: {
    title: "Commander Operations",
    subtitle: "Strategic supply-chain command overview",
    badge: "COMMANDER",
    initials: "CM",
  },
  captain: {
    title: "Captain Field Dashboard",
    subtitle: "Forward-base logistics and field operations",
    badge: "CAPTAIN",
    initials: "CP",
  },
};

const commonNav = [
  ["⌂", "Overview"],
  ["▣", "Supply Chain"],
  ["□", "Inventory"],
  ["↗", "Routes"],
  ["!", "Risk Alerts"],
  ["◫", "Analytics"],
  ["▤", "Reports"],
];

export default function DashboardPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState<Role>("admin");
  const [active, setActive] = useState("Overview");

  const info = roleInfo[role];

  const metrics = useMemo(() => {
    if (role === "admin") {
      return [
        ["Total Inventory", "12,450", "units", "↑ 8.4%"],
        ["Forward Locations", "18", "active", "↑ 2"],
        ["Active Routes", "12", "routes", "Operational"],
        ["Risk Alerts", "5", "locations", "2 Critical"],
      ];
    }

    if (role === "commander") {
      return [
        ["Command Inventory", "8,920", "units", "↑ 6.2%"],
        ["Active Units", "9", "units", "All reporting"],
        ["Mission Routes", "12", "routes", "10 optimal"],
        ["High Risk", "3", "alerts", "1 Critical"],
      ];
    }

    return [
      ["Base Inventory", "2,840", "units", "82% ready"],
      ["Today's Demand", "740", "units", "Forecast"],
      ["Active Deliveries", "4", "vehicles", "En route"],
      ["Local Alerts", "2", "alerts", "1 High"],
    ];
  }, [role]);

  /* ---------------- LOGIN ---------------- */

  if (!loggedIn) {
    return (
      <div className="login-screen">
        <div className="login-panel">

          <div className="login-brand">
            <div className="shield-mark">S</div>

            <div>
              <div className="brand-title">
                SUPPLYSHIELD <span>AI</span>
              </div>

              <div className="brand-subtitle">
                DEFENCE LOGISTICS INTELLIGENCE
              </div>
            </div>
          </div>

          <div className="login-heading">
            <div className="eyebrow">
              SECURE OPERATIONS PORTAL
            </div>

            <h1>Command Login</h1>

            <p>
              Select your operational role to open the appropriate dashboard.
            </p>
          </div>

          <div className="role-grid">

            {(["admin", "commander", "captain"] as Role[]).map((r) => (
              <button
                key={r}
                className={`role-card ${
                  role === r ? "selected" : ""
                }`}
                onClick={() => setRole(r)}
              >
                <div className="role-icon">
                  {r === "admin"
                    ? "◆"
                    : r === "commander"
                    ? "★"
                    : "●"}
                </div>

                <strong>{roleInfo[r].badge}</strong>

                <span>
                  {r === "admin"
                    ? "Full system control"
                    : r === "commander"
                    ? "Strategic command"
                    : "Field operations"}
                </span>
              </button>
            ))}

          </div>

          <button
            className="login-button"
            onClick={() => setLoggedIn(true)}
          >
            ENTER {info.badge} DASHBOARD
            <span>→</span>
          </button>

          <div className="demo-note">
            Demo mode • Synthetic operational data • No live military data
          </div>

        </div>
      </div>
    );
  }

  /* ---------------- DASHBOARD ---------------- */

  return (
    <div className="dashboard-shell">

      {/* SIDEBAR */}

      <aside className="dashboard-sidebar">

        <div className="sidebar-brand">

          <div className="shield-mark small">
            S
          </div>

          <div>
            <div className="brand-title">
              SUPPLYSHIELD <span>AI</span>
            </div>

            <div className="side-version">
              SIH26251
            </div>
          </div>

        </div>

        <div className="role-pill">

          <div className="avatar">
            {info.initials}
          </div>

          <div>
            <b>{info.badge}</b>
            <small>Authenticated</small>
          </div>

        </div>

        <nav className="dashboard-nav">

          {commonNav.map(([icon, label]) => (
            <button
              key={label}
              className={active === label ? "active" : ""}
              onClick={() => setActive(label)}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}

          {role === "admin" && (
            <button
              className={active === "Users" ? "active" : ""}
              onClick={() => setActive("Users")}
            >
              <span>♙</span>
              User Management
            </button>
          )}

          {role === "captain" && (
            <button
              className={active === "Requests" ? "active" : ""}
              onClick={() => setActive("Requests")}
            >
              <span>+</span>
              Supply Requests
            </button>
          )}

        </nav>

        <div className="sidebar-bottom">

          <button onClick={() => setLoggedIn(false)}>
            <span>↪</span>
            Sign out
          </button>

        </div>

      </aside>

      {/* MAIN */}

      <main className="dashboard-main">

        <header className="topbar">

          <div>

            <div className="breadcrumb">
              OPERATIONS / {info.badge}
            </div>

            <h1>
              {active === "Overview"
                ? info.title
                : active}
            </h1>

            <p>
              {info.subtitle}
            </p>

          </div>

          <div className="top-actions">

            <button className="icon-button">
              ⌕
            </button>

            <button className="icon-button alert-dot">
              ◉
            </button>

            <div className="user-chip">

              <div className="avatar">
                {info.initials}
              </div>

              <div>
                <b>{info.badge}</b>
                <small>Online • Secure</small>
              </div>

            </div>

          </div>

        </header>

        {active === "Overview" ? (
          <>

            {/* KPI CARDS */}

            <section className="metric-grid">

              {metrics.map(
                ([label, value, unit, trend]) => (
                  <div
                    className="metric-card"
                    key={label}
                  >

                    <div className="metric-top">
                      <span>{label}</span>
                      <i>↗</i>
                    </div>

                    <strong>{value}</strong>

                    <div>
                      <span className="metric-unit">
                        {unit}
                      </span>

                      <span className="trend">
                        {trend}
                      </span>
                    </div>

                  </div>
                )
              )}

            </section>

            {/* MAP + ALERTS */}

            <section className="content-grid">

              <div className="panel">

                <div className="panel-header">

                  <div>

                    <h2>
                      {role === "captain"
                        ? "Live Base Supply Route"
                        : "Supply Chain Overview"}
                    </h2>

                    <p>
                      Monitor movement, weather and route status
                    </p>

                  </div>

                  <button className="small-button">
                    LIVE ●
                  </button>

                </div>

                <div className="map">

                  <div className="terrain terrain-one" />
                  <div className="terrain terrain-two" />

                  <div className="route route-yellow" />
                  <div className="route route-blue" />
                  <div className="route route-red" />

                  <div className="map-node node-green">
                    ●
                    <small>
                      {role === "captain"
                        ? "Forward Base"
                        : "Supply Depot"}
                    </small>
                  </div>

                  <div className="map-node node-blue">
                    ●
                    <small>
                      Transit
                    </small>
                  </div>

                  <div className="map-node node-red">
                    ●
                    <small>
                      Risk Zone
                    </small>
                  </div>

                  <div className="vehicle">
                    ▰
                  </div>

                  <div className="map-label">
                    LIVE LOGISTICS NETWORK
                  </div>

                  <div className="map-controls">
                    <button>+</button>
                    <button>−</button>
                  </div>

                </div>

              </div>

              {/* ALERTS */}

              <div className="panel">

                <div className="panel-header">

                  <div>
                    <h2>
                      AI Risk Alerts
                    </h2>

                    <p>
                      Priority actions recommended
                    </p>
                  </div>

                  <span className="count-badge">
                    5
                  </span>

                </div>

                <div className="alert-list">

                  <div className="risk-item critical">

                    <span>!</span>

                    <div>
                      <b>Critical</b>

                      <p>
                        Water shortage predicted in 3 days
                      </p>

                      <small>
                        Forward Base C • AI forecast
                      </small>
                    </div>

                  </div>

                  <div className="risk-item warning">

                    <span>!</span>

                    <div>
                      <b>High Risk</b>

                      <p>
                        Route weather deterioration
                      </p>

                      <small>
                        Route A • Rain probability 72%
                      </small>
                    </div>

                  </div>

                  <div className="risk-item info">

                    <span>i</span>

                    <div>
                      <b>Action</b>

                      <p>
                        Emergency dispatch recommended
                      </p>

                      <small>
                        2,500 L • within 12 hours
                      </small>
                    </div>

                  </div>

                </div>

                <button
                  className="outline-button"
                  onClick={() =>
                    setActive("Risk Alerts")
                  }
                >
                  View all alerts →
                </button>

              </div>

            </section>

            {/* FORECAST + READINESS */}

            <section className="bottom-grid">

              <div className="panel">

                <div className="panel-header">

                  <div>

                    <h2>
                      AI Demand Forecast
                    </h2>

                    <p>
                      Next 7 days • predicted supply requirement
                    </p>

                  </div>

                </div>

                <div className="chart">

                  {[48, 58, 52, 72, 65, 82, 74].map(
                    (height, index) => (

                      <div
                        className="bar-wrap"
                        key={index}
                      >

                        <div
                          className="bar"
                          style={{
                            height: `${height}%`,
                          }}
                        />

                        <small>
                          D{index + 1}
                        </small>

                      </div>

                    )
                  )}

                </div>

              </div>

              <div className="panel">

                <div className="panel-header">

                  <div>

                    <h2>
                      Operational Readiness
                    </h2>

                    <p>
                      Current command status
                    </p>

                  </div>

                </div>

                <div className="readiness-score">

                  <strong>
                    {role === "captain"
                      ? "87"
                      : role === "commander"
                      ? "91"
                      : "94"}
                    %
                  </strong>

                  <span>
                    System Ready
                  </span>

                </div>

                <div className="progress">

                  <span
                    style={{
                      width:
                        role === "captain"
                          ? "87%"
                          : role === "commander"
                          ? "91%"
                          : "94%",
                    }}
                  />

                </div>

                <div className="status-row">
                  <span>
                    Routes operational
                  </span>

                  <b>
                    12 / 12
                  </b>
                </div>

                <div className="status-row">
                  <span>
                    Inventory availability
                  </span>

                  <b>
                    96%
                  </b>
                </div>

              </div>

            </section>

          </>
        ) : (

          <section className="panel page-placeholder">

            <div className="placeholder-icon">
              ▣
            </div>

            <h2>
              {active}
            </h2>

            <p>
              {active} module is ready for integration
              with your existing synthetic logistics
              data and FastAPI services.
            </p>

            <button
              className="login-button compact"
              onClick={() => setActive("Overview")}
            >
              ← Back to Overview
            </button>

          </section>

        )}

      </main>

    </div>
  );
}
