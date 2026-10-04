"use client";

import { useState } from "react";

type Role = "admin" | "commander" | "captain";

type InventoryItem = {
  id: number;
  item: string;
  category: string;
  stock: number;
  min: number;
  location: string;
  status: "Healthy" | "Low" | "Critical";
};

type RouteItem = {
  id: number;
  name: string;
  origin: string;
  destination: string;
  distance: string;
  eta: string;
  risk: "Low" | "Medium" | "High";
  status: "Active" | "Delayed" | "Blocked";
};

type AlertItem = {
  id: number;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  location: string;
  time: string;
  resolved: boolean;
};

type UserItem = {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: "Active" | "Inactive";
};

const initialInventory: InventoryItem[] = [
  {
    id: 1,
    item: "Rice",
    category: "Food",
    stock: 820,
    min: 500,
    location: "Base Alpha",
    status: "Healthy",
  },
  {
    id: 2,
    item: "Medical Kits",
    category: "Medical",
    stock: 140,
    min: 200,
    location: "Base Alpha",
    status: "Low",
  },
  {
    id: 3,
    item: "Diesel",
    category: "Fuel",
    stock: 92,
    min: 150,
    location: "Base Bravo",
    status: "Critical",
  },
  {
    id: 4,
    item: "Water",
    category: "Essential",
    stock: 670,
    min: 400,
    location: "Base Charlie",
    status: "Healthy",
  },
  {
    id: 5,
    item: "Ammunition",
    category: "Defence",
    stock: 340,
    min: 250,
    location: "Base Bravo",
    status: "Healthy",
  },
  {
    id: 6,
    item: "Blankets",
    category: "Relief",
    stock: 180,
    min: 300,
    location: "Base Charlie",
    status: "Low",
  },
];

const initialRoutes: RouteItem[] = [
  {
    id: 1,
    name: "Route Alpha-01",
    origin: "Central Depot",
    destination: "Base Alpha",
    distance: "84 km",
    eta: "2h 15m",
    risk: "Low",
    status: "Active",
  },
  {
    id: 2,
    name: "Route Bravo-07",
    origin: "Central Depot",
    destination: "Base Bravo",
    distance: "126 km",
    eta: "4h 10m",
    risk: "High",
    status: "Delayed",
  },
  {
    id: 3,
    name: "Route Charlie-03",
    origin: "Base Alpha",
    destination: "Base Charlie",
    distance: "61 km",
    eta: "1h 35m",
    risk: "Medium",
    status: "Active",
  },
  {
    id: 4,
    name: "Route Delta-09",
    origin: "Central Depot",
    destination: "Forward Post",
    distance: "178 km",
    eta: "5h 40m",
    risk: "High",
    status: "Blocked",
  },
];

const initialAlerts: AlertItem[] = [
  {
    id: 1,
    title: "Critical diesel shortage",
    description: "Fuel inventory below minimum threshold.",
    severity: "Critical",
    location: "Base Bravo",
    time: "8 min ago",
    resolved: false,
  },
  {
    id: 2,
    title: "Route delay detected",
    description: "Heavy traffic and weather affecting delivery.",
    severity: "High",
    location: "Route Bravo-07",
    time: "22 min ago",
    resolved: false,
  },
  {
    id: 3,
    title: "Medical stock low",
    description: "Medical kits require replenishment.",
    severity: "Medium",
    location: "Base Alpha",
    time: "41 min ago",
    resolved: false,
  },
  {
    id: 4,
    title: "Weather warning",
    description: "Heavy rainfall expected in the northern sector.",
    severity: "High",
    location: "Northern Sector",
    time: "1 hr ago",
    resolved: false,
  },
  {
    id: 5,
    title: "Water supply stable",
    description: "Inventory is above operational threshold.",
    severity: "Low",
    location: "Base Charlie",
    time: "2 hrs ago",
    resolved: true,
  },
];

const initialUsers: UserItem[] = [
  {
    id: 1,
    name: "System Administrator",
    email: "admin@supplyshield.ai",
    role: "admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Northern Commander",
    email: "commander@supplyshield.ai",
    role: "commander",
    status: "Active",
  },
  {
    id: 3,
    name: "Captain Arjun",
    email: "captain1@supplyshield.ai",
    role: "captain",
    status: "Active",
  },
  {
    id: 4,
    name: "Captain Vikram",
    email: "captain2@supplyshield.ai",
    role: "captain",
    status: "Inactive",
  },
];

const roleMeta = {
  admin: {
    title: "System Administrator",
    subtitle: "Complete supply network control",
  },
  commander: {
    title: "Regional Commander",
    subtitle: "Operational logistics command center",
  },
  captain: {
    title: "Field Captain",
    subtitle: "Field-level supply operations",
  },
};

const navItems = [
  { id: "overview", label: "Overview", icon: "⌂" },
  { id: "supply", label: "Supply Chain", icon: "⇄" },
  { id: "inventory", label: "Inventory", icon: "▣" },
  { id: "routes", label: "Routes", icon: "⌁" },
  { id: "alerts", label: "Risk Alerts", icon: "!" },
  { id: "analytics", label: "Analytics", icon: "◫" },
  { id: "forecast", label: "Forecast", icon: "◒" },
  { id: "scenarios", label: "Scenarios", icon: "◇" },
  { id: "reports", label: "Reports", icon: "▤" },
];

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  overview: {
    title: "Operational Overview",
    subtitle: "Real-time synthetic logistics intelligence",
  },
  supply: {
    title: "Supply Chain",
    subtitle: "Monitor the complete supply movement network",
  },
  inventory: {
    title: "Inventory Management",
    subtitle: "Track stock levels and replenishment requirements",
  },
  routes: {
    title: "Route Intelligence",
    subtitle: "Monitor routes, delays and transportation risks",
  },
  alerts: {
    title: "Risk Alerts",
    subtitle: "Prioritized operational warnings and incidents",
  },
  analytics: {
    title: "Analytics",
    subtitle: "Operational performance and logistics KPIs",
  },
  forecast: {
    title: "Demand Forecast",
    subtitle: "AI-style synthetic demand predictions",
  },
  scenarios: {
    title: "Scenario Simulation",
    subtitle: "Test possible logistics disruptions",
  },
  reports: {
    title: "Reports",
    subtitle: "Generate operational intelligence reports",
  },
  manage: {
    title: "Manage System",
    subtitle: "Configure synthetic logistics operations",
  },
  users: {
    title: "User Management",
    subtitle: "Manage commanders, captains and administrators",
  },
  requests: {
    title: "Supply Requests",
    subtitle: "Manage field-level supply requirements",
  },
};

export default function DashboardPage() {
  const [role, setRole] = useState<Role>("admin");
  const [activePage, setActivePage] = useState("overview");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const [inventory, setInventory] =
    useState<InventoryItem[]>(initialInventory);

  const [routes, setRoutes] =
    useState<RouteItem[]>(initialRoutes);

  const [alerts, setAlerts] =
    useState<AlertItem[]>(initialAlerts);

  const [users, setUsers] =
    useState<UserItem[]>(initialUsers);

  const [message, setMessage] = useState("");

  const meta =
    pageMeta[activePage] ?? roleMeta[role];

  const activeAlerts =
    alerts.filter((a) => !a.resolved).length;

  const criticalInventory =
    inventory.filter(
      (item) => item.status === "Critical"
    ).length;

  const delayedRoutes =
    routes.filter(
      (route) => route.status !== "Active"
    ).length;

  function showMessage(text: string) {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  function resolveAlert(id: number) {
    setAlerts((current) =>
      current.map((alert) =>
        alert.id === id
          ? { ...alert, resolved: true }
          : alert
      )
    );

    showMessage("Alert resolved successfully.");
  }

  function toggleUser(id: number) {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : user
      )
    );

    showMessage("User status updated.");
  }

  function changeRole(nextRole: Role) {
    setRole(nextRole);
    setActivePage("overview");

    showMessage(
      `Switched to ${nextRole} dashboard.`
    );
  }

  return (
    <main
      className={`dashboard-shell ${
        theme === "light" ? "light-theme" : ""
      }`}
    >
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">S</div>

          <div>
            <strong>SupplyShield AI</strong>
            <span>Logistics Intelligence</span>
          </div>
        </div>

        <div className="role-switcher">
          <label>ACTIVE ROLE</label>

          <select
            value={role}
            onChange={(e) =>
              changeRole(
                e.target.value as Role
              )
            }
          >
            <option value="admin">
              Administrator
            </option>

            <option value="commander">
              Commander
            </option>

            <option value="captain">
              Captain
            </option>
          </select>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">
            MAIN
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-button ${
                activePage === item.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActivePage(item.id)
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}

          {role === "admin" && (
            <>
              <div className="nav-section-title">
                ADMINISTRATION
              </div>

              <button
                className={`nav-button ${
                  activePage === "manage"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActivePage("manage")
                }
              >
                <span>⚙</span>
                Manage System
              </button>

              <button
                className={`nav-button ${
                  activePage === "users"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActivePage("users")
                }
              >
                <span>◉</span>
                User Management
              </button>
            </>
          )}

          {role === "captain" && (
            <>
              <div className="nav-section-title">
                FIELD OPERATIONS
              </div>

              <button
                className={`nav-button ${
                  activePage === "requests"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActivePage("requests")
                }
              >
                <span>+</span>
                Supply Requests
              </button>
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <button
            className="theme-toggle"
            onClick={() =>
              setTheme(
                theme === "dark"
                  ? "light"
                  : "dark"
              )
            }
          >
            {theme === "dark"
              ? "☀ Light Mode"
              : "☾ Dark Mode"}
          </button>

          <div className="system-status">
            <span className="status-dot" />
            System Operational
          </div>
        </div>
      </aside>

      <section className="main-content">
        <header className="topbar">
          <div>
            <h1>{meta.title}</h1>
            <p>{meta.subtitle}</p>
          </div>

          <div className="topbar-right">
            <div className="role-badge">
              {roleMeta[role].title}
            </div>

            <div className="live-indicator">
              <span />
              LIVE
            </div>
          </div>
        </header>

        {message && (
          <div className="toast-message">
            {message}
          </div>
        )}

        <div className="page-content">
          {activePage === "overview" && (
            <Overview
              inventory={inventory}
              routes={routes}
              alerts={alerts}
              role={role}
              onNavigate={setActivePage}
            />
          )}

          {activePage === "supply" && (
            <SupplyChain
              inventory={inventory}
              routes={routes}
            />
          )}

          {activePage === "inventory" && (
            <InventoryPage
              inventory={inventory}
              setInventory={setInventory}
              showMessage={showMessage}
            />
          )}

          {activePage === "routes" && (
            <RoutesPage
              routes={routes}
              setRoutes={setRoutes}
              showMessage={showMessage}
            />
          )}

          {activePage === "alerts" && (
            <AlertsPage
              alerts={alerts}
              resolveAlert={resolveAlert}
            />
          )}

          {activePage === "analytics" && (
            <AnalyticsPage
              inventory={inventory}
              routes={routes}
            />
          )}

          {activePage === "forecast" && (
            <ForecastPage />
          )}

          {activePage === "scenarios" && (
            <ScenarioPage
              showMessage={showMessage}
            />
          )}

          {activePage === "reports" && (
            <ReportsPage
              showMessage={showMessage}
            />
          )}

          {activePage === "manage" &&
            role === "admin" && (
              <ManageSystem
                inventory={inventory}
                routes={routes}
                alerts={alerts}
                setInventory={setInventory}
                setRoutes={setRoutes}
                setAlerts={setAlerts}
                showMessage={showMessage}
              />
            )}

          {activePage === "users" &&
            role === "admin" && (
              <UserManagement
                users={users}
                toggleUser={toggleUser}
              />
            )}

          {activePage === "requests" &&
            role === "captain" && (
              <SupplyRequests
                showMessage={showMessage}
              />
            )}
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   ROLE BASED OVERVIEW
   ========================================================= */

function Overview({
  inventory,
  routes,
  alerts,
  role,
  onNavigate,
}: {
  inventory: InventoryItem[];
  routes: RouteItem[];
  alerts: AlertItem[];
  role: Role;
  onNavigate: (page: string) => void;
}) {
  const activeAlerts =
    alerts.filter((a) => !a.resolved);

  const criticalAlerts =
    activeAlerts.filter(
      (a) => a.severity === "Critical"
    );

  const highAlerts =
    activeAlerts.filter(
      (a) => a.severity === "High"
    );

  const activeRoutes =
    routes.filter(
      (r) => r.status === "Active"
    );

  const delayedRoutes =
    routes.filter(
      (r) => r.status === "Delayed"
    );

  const blockedRoutes =
    routes.filter(
      (r) => r.status === "Blocked"
    );

  const criticalInventory =
    inventory.filter(
      (i) => i.status === "Critical"
    );

  const lowInventory =
    inventory.filter(
      (i) => i.status === "Low"
    );

  const healthyInventory =
    inventory.filter(
      (i) => i.status === "Healthy"
    );

  /* =====================================================
     ADMIN
     ===================================================== */

  if (role === "admin") {
    const totalStock =
      inventory.reduce(
        (sum, item) =>
          sum + item.stock,
        0
      );

    return (
      <>
        <div className="kpi-grid">
          <KPI
            label="Total Operations"
            value="24"
            change="+8.4%"
            positive
            icon="◉"
          />

          <KPI
            label="Network Inventory"
            value={totalStock.toLocaleString()}
            change="+6.2%"
            positive
            icon="▣"
          />

          <KPI
            label="Active Routes"
            value={String(
              activeRoutes.length
            )}
            change="+2"
            positive
            icon="⌁"
          />

          <KPI
            label="Critical Alerts"
            value={String(
              criticalAlerts.length
            )}
            change={
              criticalAlerts.length > 0
                ? "Action needed"
                : "Stable"
            }
            positive={
              criticalAlerts.length === 0
            }
            icon="!"
          />
        </div>

        <div className="dashboard-grid two-column">
          <Panel
            title="System Command Center"
            subtitle="Complete supply network control"
          >
            <div className="network-map">
              <div className="map-grid" />

              <div className="map-node node-a">
                <strong>HQ</strong>
                <span>
                  Central Command
                </span>
              </div>

              <div className="map-node node-b">
                <strong>Alpha</strong>
                <span>
                  Operational
                </span>
              </div>

              <div className="map-node node-c">
                <strong>Bravo</strong>
                <span>Fuel Risk</span>
              </div>

              <div className="map-node node-d">
                <strong>Charlie</strong>
                <span>Stable</span>
              </div>

              <div className="route-line line-1" />
              <div className="route-line line-2" />
              <div className="route-line line-3" />
            </div>

            <button
              className="secondary-button compact"
              onClick={() =>
                onNavigate("supply")
              }
            >
              Open Supply Network →
            </button>
          </Panel>

          <Panel
            title="Global Risk Monitor"
            subtitle="System-wide operational risks"
          >
            <div className="alert-list">
              {activeAlerts
                .slice(0, 4)
                .map((alert) => (
                  <div
                    className="alert-row"
                    key={alert.id}
                  >
                    <div
                      className={`severity-dot ${alert.severity.toLowerCase()}`}
                    />

                    <div className="alert-content">
                      <strong>
                        {alert.title}
                      </strong>

                      <span>
                        {alert.location} •{" "}
                        {alert.time}
                      </span>
                    </div>

                    <span className="status-pill">
                      {alert.severity}
                    </span>
                  </div>
                ))}
            </div>

            <button
              className="secondary-button compact"
              onClick={() =>
                onNavigate("alerts")
              }
            >
              Manage All Risks →
            </button>
          </Panel>
        </div>

        <div className="dashboard-grid two-column">
          <Panel
            title="Network Readiness"
            subtitle="Current system-wide inventory status"
          >
            <div className="readiness-list">
              {inventory
                .slice(0, 5)
                .map((item) => {
                  const percentage =
                    Math.min(
                      100,
                      Math.round(
                        (item.stock /
                          item.min) *
                          100
                      )
                    );

                  return (
                    <div
                      className="readiness-item"
                      key={item.id}
                    >
                      <div className="readiness-header">
                        <strong>
                          {item.item}
                        </strong>

                        <span>
                          {item.stock} /{" "}
                          {item.min}
                        </span>
                      </div>

                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>

            <button
              className="secondary-button compact"
              onClick={() =>
                onNavigate("inventory")
              }
            >
              Open System Inventory →
            </button>
          </Panel>

          <Panel
            title="System Performance"
            subtitle="Synthetic 7-day logistics performance"
          >
            <TrendChart />

            <div className="route-meta">
              <span>
                Healthy:{" "}
                <strong>
                  {healthyInventory.length}
                </strong>
              </span>

              <span>
                Low:{" "}
                <strong>
                  {lowInventory.length}
                </strong>
              </span>

              <span>
                Critical:{" "}
                <strong>
                  {criticalInventory.length}
                </strong>
              </span>
            </div>
          </Panel>
        </div>

        <Panel
          title="Administrator Quick Actions"
          subtitle="System-wide management controls"
        >
          <div className="quick-actions">
            <button
              onClick={() =>
                onNavigate("inventory")
              }
            >
              ▣ Manage Inventory
            </button>

            <button
              onClick={() =>
                onNavigate("users")
              }
            >
              ◉ Manage Users
            </button>

            <button
              onClick={() =>
                onNavigate("analytics")
              }
            >
              ◫ View Analytics
            </button>

            <button
              onClick={() =>
                onNavigate("reports")
              }
            >
              ▤ Generate Report
            </button>
          </div>
        </Panel>
      </>
    );
  }

  /* =====================================================
     COMMANDER
     ===================================================== */

  if (role === "commander") {
    const regionalInventory =
      inventory.filter(
        (item) =>
          item.location ===
            "Base Alpha" ||
          item.location ===
            "Base Bravo"
      );

    const regionalCritical =
      regionalInventory.filter(
        (item) =>
          item.status === "Critical"
      );

    const regionalHealth =
      regionalInventory.length > 0
        ? Math.round(
            (regionalInventory.filter(
              (item) =>
                item.status ===
                "Healthy"
            ).length /
              regionalInventory.length) *
              100
          )
        : 0;

    return (
      <>
        <div className="kpi-grid">
          <KPI
            label="Regional Missions"
            value="14"
            change="+5.8%"
            positive
            icon="◉"
          />

          <KPI
            label="Regional Readiness"
            value={`${regionalHealth}%`}
            change="+3.4%"
            positive
            icon="▣"
          />

          <KPI
            label="Active Routes"
            value={String(
              activeRoutes.length
            )}
            change="+1"
            positive
            icon="⌁"
          />

          <KPI
            label="Regional Alerts"
            value={String(
              activeAlerts.length
            )}
            change={
              highAlerts.length > 0
                ? "Review required"
                : "Stable"
            }
            positive={
              highAlerts.length === 0
            }
            icon="!"
          />
        </div>

        <div className="dashboard-grid two-column">
          <Panel
            title="Regional Operations Map"
            subtitle="Current commander-area logistics movement"
          >
            <div className="network-map">
              <div className="map-grid" />

              <div className="map-node node-a">
                <strong>HQ</strong>
                <span>Command</span>
              </div>

              <div className="map-node node-b">
                <strong>Alpha</strong>
                <span>Active</span>
              </div>

              <div className="map-node node-c">
                <strong>Bravo</strong>
                <span>Delayed</span>
              </div>

              <div className="map-node node-d">
                <strong>Charlie</strong>
                <span>Support</span>
              </div>

              <div className="route-line line-1" />
              <div className="route-line line-2" />
              <div className="route-line line-3" />
            </div>

            <button
              className="secondary-button compact"
              onClick={() =>
                onNavigate("routes")
              }
            >
              Monitor Regional Routes →
            </button>
          </Panel>

          <Panel
            title="Command Alerts"
            subtitle="Alerts requiring commander attention"
          >
            <div className="alert-list">
              {activeAlerts
                .slice(0, 4)
                .map((alert) => (
                  <div
                    className="alert-row"
                    key={alert.id}
                  >
                    <div
                      className={`severity-dot ${alert.severity.toLowerCase()}`}
                    />

                    <div className="alert-content">
                      <strong>
                        {alert.title}
                      </strong>

                      <span>
                        {alert.location} •{" "}
                        {alert.time}
                      </span>
                    </div>

                    <span className="status-pill">
                      {alert.severity}
                    </span>
                  </div>
                ))}
            </div>

            <button
              className="secondary-button compact"
              onClick={() =>
                onNavigate("alerts")
              }
            >
              Open Command Alerts →
            </button>
          </Panel>
        </div>

        <div className="dashboard-grid two-column">
          <Panel
            title="Regional Inventory"
            subtitle="Priority supplies across assigned bases"
          >
            <div className="readiness-list">
              {regionalInventory.map(
                (item) => {
                  const percentage =
                    Math.min(
                      100,
                      Math.round(
                        (item.stock /
                          item.min) *
                          100
                      )
                    );

                  return (
                    <div
                      className="readiness-item"
                      key={item.id}
                    >
                      <div className="readiness-header">
                        <strong>
                          {item.item}
                        </strong>

                        <span>
                          {item.location}
                        </span>
                      </div>

                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            {regionalCritical.length >
              0 && (
              <div className="route-meta">
                <span>
                  ⚠{" "}
                  {
                    regionalCritical.length
                  } critical supply item
                  {regionalCritical.length >
                  1
                    ? "s"
                    : ""}
                </span>
              </div>
            )}

            <button
              className="secondary-button compact"
              onClick={() =>
                onNavigate("inventory")
              }
            >
              Review Regional Inventory →
            </button>
          </Panel>

          <Panel
            title="Mission Performance"
            subtitle="Regional logistics performance"
          >
            <TrendChart />

            <div className="route-meta">
              <span>
                Active:{" "}
                <strong>
                  {activeRoutes.length}
                </strong>
              </span>

              <span>
                Delayed:{" "}
                <strong>
                  {delayedRoutes.length}
                </strong>
              </span>

              <span>
                Blocked:{" "}
                <strong>
                  {blockedRoutes.length}
                </strong>
              </span>
            </div>
          </Panel>
        </div>

        <Panel
          title="Commander Actions"
          subtitle="Regional command and coordination controls"
        >
          <div className="quick-actions">
            <button
              onClick={() =>
                onNavigate("routes")
              }
            >
              ⌁ Monitor Routes
            </button>

            <button
              onClick={() =>
                onNavigate("alerts")
              }
            >
              ! Review Risks
            </button>

            <button
              onClick={() =>
                onNavigate("forecast")
              }
            >
              ◒ Check Forecast
            </button>

            <button
              onClick={() =>
                onNavigate("reports")
              }
            >
              ▤ Command Report
            </button>
          </div>
        </Panel>
      </>
    );
  }

  /* =====================================================
     CAPTAIN
     ===================================================== */

  const fieldInventory =
    inventory.filter(
      (item) =>
        item.location ===
        "Base Alpha"
    );

  const fieldRoutes =
    routes.filter(
      (route) =>
        route.destination ===
          "Base Alpha" ||
        route.origin ===
          "Base Alpha"
    );

  const fieldAlerts =
    alerts.filter(
      (alert) =>
        alert.location ===
          "Base Alpha" ||
        alert.location ===
          "Route Alpha-01"
    );

  const fieldHealthy =
    fieldInventory.filter(
      (item) =>
        item.status ===
        "Healthy"
    );

  const fieldLow =
    fieldInventory.filter(
      (item) =>
        item.status === "Low"
    );

  const fieldCritical =
    fieldInventory.filter(
      (item) =>
        item.status ===
        "Critical"
    );

  const fieldActiveAlerts =
    fieldAlerts.filter(
      (alert) =>
        !alert.resolved
    );

  return (
    <>
      <div className="kpi-grid">
        <KPI
          label="Assigned Supplies"
          value={String(
            fieldInventory.length
          )}
          change="+2"
          positive
          icon="▣"
        />

        <KPI
          label="Field Stock Health"
          value={`${Math.round(
            (fieldHealthy.length /
              Math.max(
                fieldInventory.length,
                1
              )) *
              100
          )}%`}
          change="+4.1%"
          positive
          icon="◉"
        />

        <KPI
          label="Assigned Routes"
          value={String(
            fieldRoutes.length
          )}
          change={
            fieldRoutes.some(
              (r) =>
                r.status !==
                "Active"
            )
              ? "Attention"
              : "Stable"
          }
          positive={
            !fieldRoutes.some(
              (r) =>
                r.status !==
                "Active"
            )
          }
          icon="⌁"
        />

        <KPI
          label="Field Alerts"
          value={String(
            fieldActiveAlerts.length
          )}
          change={
            fieldCritical.length >
            0
              ? "Supply action needed"
              : "Monitor"
          }
          positive={
            fieldCritical.length === 0
          }
          icon="!"
        />
      </div>

      <div className="dashboard-grid two-column">
        <Panel
          title="Field Supply Status"
          subtitle="Your assigned field inventory"
        >
          <div className="readiness-list">
            {fieldInventory.map(
              (item) => {
                const percentage =
                  Math.min(
                    100,
                    Math.round(
                      (item.stock /
                        item.min) *
                        100
                    )
                  );

                return (
                  <div
                    className="readiness-item"
                    key={item.id}
                  >
                    <div className="readiness-header">
                      <strong>
                        {item.item}
                      </strong>

                      <span>
                        {item.status}
                      </span>
                    </div>

                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>

          <div className="route-meta">
            <span>
              Healthy:{" "}
              <strong>
                {fieldHealthy.length}
              </strong>
            </span>

            <span>
              Low:{" "}
              <strong>
                {fieldLow.length}
              </strong>
            </span>

            <span>
              Critical:{" "}
              <strong>
                {fieldCritical.length}
              </strong>
            </span>
          </div>

          <button
            className="secondary-button compact"
            onClick={() =>
              onNavigate("inventory")
            }
          >
            Open Field Inventory →
          </button>
        </Panel>

        <Panel
          title="My Assigned Routes"
          subtitle="Current field transportation tasks"
        >
          <div className="alert-list">
            {fieldRoutes.map(
              (route) => (
                <div
                  className="alert-row"
                  key={route.id}
                >
                  <div
                    className={`severity-dot ${
                      route.risk ===
                      "High"
                        ? "critical"
                        : route.risk ===
                          "Medium"
                        ? "high"
                        : "low"
                    }`}
                  />

                  <div className="alert-content">
                    <strong>
                      {route.name}
                    </strong>

                    <span>
                      {route.origin} →{" "}
                      {
                        route.destination
                      }
                    </span>
                  </div>

                  <span className="status-pill">
                    {route.status}
                  </span>
                </div>
              )
            )}
          </div>

          <button
            className="secondary-button compact"
            onClick={() =>
              onNavigate("routes")
            }
          >
            Open Field Routes →
          </button>
        </Panel>
      </div>

      <div className="dashboard-grid two-column">
        <Panel
          title="Field Alerts"
          subtitle="Issues affecting your assigned area"
        >
          <div className="alert-list">
            {fieldActiveAlerts.length ===
            0 ? (
              <div className="alert-row">
                <div className="alert-content">
                  <strong>
                    No active field alerts
                  </strong>

                  <span>
                    Current field operations
                    are stable.
                  </span>
                </div>
              </div>
            ) : (
              fieldActiveAlerts
                .slice(0, 4)
                .map((alert) => (
                  <div
                    className="alert-row"
                    key={alert.id}
                  >
                    <div
                      className={`severity-dot ${alert.severity.toLowerCase()}`}
                    />

                    <div className="alert-content">
                      <strong>
                        {alert.title}
                      </strong>

                      <span>
                        {alert.location} •{" "}
                        {alert.time}
                      </span>
                    </div>

                    <span className="status-pill">
                      {alert.severity}
                    </span>
                  </div>
                ))
            )}
          </div>

          <button
            className="secondary-button compact"
            onClick={() =>
              onNavigate("alerts")
            }
          >
            View Field Alerts →
          </button>
        </Panel>

        <Panel
          title="Field Operations Trend"
          subtitle="Recent synthetic delivery performance"
        >
          <TrendChart />

          <div className="route-meta">
            <span>
              Field Routes:{" "}
              <strong>
                {fieldRoutes.length}
              </strong>
            </span>

            <span>
              Active Alerts:{" "}
              <strong>
                {fieldActiveAlerts.length}
              </strong>
            </span>
          </div>
        </Panel>
      </div>

      <Panel
        title="Captain Quick Actions"
        subtitle="Field-level operational controls"
      >
        <div className="quick-actions">
          <button
            onClick={() =>
              onNavigate("requests")
            }
          >
            + Create Supply Request
          </button>

          <button
            onClick={() =>
              onNavigate("inventory")
            }
          >
            ▣ Check My Inventory
          </button>

          <button
            onClick={() =>
              onNavigate("routes")
            }
          >
            ⌁ Check My Routes
          </button>

          <button
            onClick={() =>
              onNavigate("alerts")
            }
          >
            ! Report / View Alert
          </button>
        </div>
      </Panel>
    </>
  );
}

/* =========================================================
   COMMON COMPONENTS
   ========================================================= */

function KPI({
  label,
  value,
  change,
  positive,
  icon,
}: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
}) {
  return (
    <div className="kpi-card">
      <div className="kpi-top">
        <span>{label}</span>
        <strong>{icon}</strong>
      </div>

      <div className="kpi-value">
        {value}
      </div>

      <div
        className={`kpi-change ${
          positive
            ? "positive"
            : "negative"
        }`}
      >
        {change}
      </div>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="dashboard-panel">
      <div className="panel-header">
        <div>
          <h2>{title}</h2>

          {subtitle && (
            <p>{subtitle}</p>
          )}
        </div>
      </div>

      <div className="panel-body">
        {children}
      </div>
    </section>
  );
}

/* =========================================================
   SUPPLY CHAIN
   ========================================================= */

function SupplyChain({
  inventory,
  routes,
}: {
  inventory: InventoryItem[];
  routes: RouteItem[];
}) {
  return (
    <div className="dashboard-grid">
      <Panel
        title="Supply Chain Pipeline"
        subtitle="Synthetic end-to-end supply movement"
      >
        <div className="quick-actions">
          <FlowBox
            title="Central Depot"
            value={`${inventory.length} items`}
          />

          <FlowBox
            title="In Transit"
            value={`${routes.length} routes`}
          />

          <FlowBox
            title="Field Bases"
            value="3 Bases"
          />

          <FlowBox
            title="Delivered"
            value="92%"
          />
        </div>
      </Panel>

      <Panel
        title="Supply Movement"
        subtitle="Current logistics flow"
      >
        <div className="alert-list">
          {routes.map((route) => (
            <div
              className="alert-row"
              key={route.id}
            >
              <div className="alert-content">
                <strong>
                  {route.name}
                </strong>

                <span>
                  {route.origin} →{" "}
                  {route.destination}
                </span>
              </div>

              <span className="status-pill">
                {route.status}
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function FlowBox({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="dashboard-panel">
      <div className="panel-body">
        <strong>{title}</strong>
        <p>{value}</p>
      </div>
    </div>
  );
}

/* =========================================================
   INVENTORY
   ========================================================= */

function InventoryPage({
  inventory,
  setInventory,
  showMessage,
}: {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<
    React.SetStateAction<InventoryItem[]>
  >;
  showMessage: (text: string) => void;
}) {
  const healthy = inventory.filter(
    (i) => i.status === "Healthy"
  ).length;

  const low = inventory.filter(
    (i) => i.status === "Low"
  ).length;

  const critical = inventory.filter(
    (i) => i.status === "Critical"
  ).length;

  function refreshInventory() {
    setInventory((current) =>
      current.map((item) => ({
        ...item,
        stock:
          item.stock +
          Math.floor(
            Math.random() * 20
          ),
      }))
    );

    showMessage(
      "Inventory refreshed successfully."
    );
  }

  return (
    <>
      <div className="kpi-grid">
        <KPI
          label="Total Items"
          value={String(
            inventory.length
          )}
          change="Stable"
          positive
          icon="▣"
        />

        <KPI
          label="Healthy"
          value={String(healthy)}
          change="Good"
          positive
          icon="✓"
        />

        <KPI
          label="Low Stock"
          value={String(low)}
          change={
            low > 0
              ? "Attention"
              : "Stable"
          }
          positive={low === 0}
          icon="!"
        />

        <KPI
          label="Critical"
          value={String(critical)}
          change={
            critical > 0
              ? "Urgent"
              : "Stable"
          }
          positive={critical === 0}
          icon="⚠"
        />
      </div>

      <Panel
        title="Inventory Table"
        subtitle="Synthetic stock data"
      >
        <div className="alert-list">
          {inventory.map((item) => (
            <div
              className="alert-row"
              key={item.id}
            >
              <div className="alert-content">
                <strong>
                  {item.item}
                </strong>

                <span>
                  {item.category} •{" "}
                  {item.location} •{" "}
                  Stock: {item.stock}
                </span>
              </div>

              <span className="status-pill">
                {item.status}
              </span>
            </div>
          ))}
        </div>

        <button
          className="primary-button compact"
          onClick={refreshInventory}
        >
          Refresh Inventory
        </button>
      </Panel>
    </>
  );
}

/* =========================================================
   ROUTES
   ========================================================= */

function RoutesPage({
  routes,
  setRoutes,
  showMessage,
}: {
  routes: RouteItem[];
  setRoutes: React.Dispatch<
    React.SetStateAction<RouteItem[]>
  >;
  showMessage: (text: string) => void;
}) {
  const active = routes.filter(
    (r) => r.status === "Active"
  ).length;

  const delayed = routes.filter(
    (r) => r.status === "Delayed"
  ).length;

  const blocked = routes.filter(
    (r) => r.status === "Blocked"
  ).length;

  function simulateTraffic() {
    setRoutes((current) =>
      current.map((route) =>
        route.id === 2
          ? {
              ...route,
              status: "Delayed",
              risk: "High",
            }
          : route
      )
    );

    showMessage(
      "Traffic simulation applied."
    );
  }

  return (
    <>
      <div className="kpi-grid">
        <KPI
          label="Total Routes"
          value={String(routes.length)}
          change="+1"
          positive
          icon="⌁"
        />

        <KPI
          label="Active"
          value={String(active)}
          change="Stable"
          positive
          icon="✓"
        />

        <KPI
          label="Delayed"
          value={String(delayed)}
          change={
            delayed > 0
              ? "Attention"
              : "Stable"
          }
          positive={delayed === 0}
          icon="!"
        />

        <KPI
          label="Blocked"
          value={String(blocked)}
          change={
            blocked > 0
              ? "Critical"
              : "Stable"
          }
          positive={blocked === 0}
          icon="⚠"
        />
      </div>

      <Panel
        title="Route Intelligence"
        subtitle="Synthetic transportation network"
      >
        <div className="network-map large-map">
          <div className="map-grid" />

          <div className="map-node node-a">
            <strong>Depot</strong>
            <span>Origin</span>
          </div>

          <div className="map-node node-b">
            <strong>Alpha</strong>
            <span>84 km</span>
          </div>

          <div className="map-node node-c">
            <strong>Bravo</strong>
            <span>126 km</span>
          </div>

          <div className="map-node node-d">
            <strong>Charlie</strong>
            <span>61 km</span>
          </div>

          <div className="route-line line-1" />
          <div className="route-line line-2" />
          <div className="route-line line-3" />
        </div>

        <div className="alert-list">
          {routes.map((route) => (
            <div
              className="alert-row"
              key={route.id}
            >
              <div
                className={`severity-dot ${
                  route.risk === "High"
                    ? "critical"
                    : route.risk ===
                      "Medium"
                    ? "high"
                    : "low"
                }`}
              />

              <div className="alert-content">
                <strong>
                  {route.name}
                </strong>

                <span>
                  {route.origin} →{" "}
                  {route.destination} •{" "}
                  {route.distance} • ETA{" "}
                  {route.eta}
                </span>
              </div>

              <span className="status-pill">
                {route.status}
              </span>
            </div>
          ))}
        </div>

        <button
          className="primary-button compact"
          onClick={simulateTraffic}
        >
          Simulate Traffic Risk
        </button>
      </Panel>
    </>
  );
}

/* =========================================================
   ALERTS
   ========================================================= */

function AlertsPage({
  alerts,
  resolveAlert,
}: {
  alerts: AlertItem[];
  resolveAlert: (id: number) => void;
}) {
  const critical = alerts.filter(
    (a) =>
      a.severity === "Critical" &&
      !a.resolved
  ).length;

  const high = alerts.filter(
    (a) =>
      a.severity === "High" &&
      !a.resolved
  ).length;

  const medium = alerts.filter(
    (a) =>
      a.severity === "Medium" &&
      !a.resolved
  ).length;

  const resolved = alerts.filter(
    (a) => a.resolved
  ).length;

  return (
    <>
      <div className="kpi-grid">
        <KPI
          label="Critical"
          value={String(critical)}
          change={
            critical > 0
              ? "Urgent"
              : "Clear"
          }
          positive={critical === 0}
          icon="⚠"
        />

        <KPI
          label="High"
          value={String(high)}
          change={
            high > 0
              ? "Review"
              : "Clear"
          }
          positive={high === 0}
          icon="!"
        />

        <KPI
          label="Medium"
          value={String(medium)}
          change="Monitor"
          positive
          icon="◉"
        />

        <KPI
          label="Resolved"
          value={String(resolved)}
          change="+2"
          positive
          icon="✓"
        />
      </div>

      <Panel
        title="Risk Alert Center"
        subtitle="Prioritized operational warnings"
      >
        <div className="alert-list full-alert-list">
          {alerts.map((alert) => (
            <div
              className="alert-row"
              key={alert.id}
            >
              <div
                className={`severity-dot ${alert.severity.toLowerCase()}`}
              />

              <div className="alert-content">
                <strong>
                  {alert.title}
                </strong>

                <span>
                  {alert.description} •{" "}
                  {alert.location} •{" "}
                  {alert.time}
                </span>
              </div>

              <span className="status-pill">
                {alert.resolved
                  ? "Resolved"
                  : alert.severity}
              </span>

              {!alert.resolved && (
                <button
                  className="secondary-button compact"
                  onClick={() =>
                    resolveAlert(
                      alert.id
                    )
                  }
                >
                  Resolve
                </button>
              )}
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

/* =========================================================
   ANALYTICS
   ========================================================= */

function AnalyticsPage({
  inventory,
  routes,
}: {
  inventory: InventoryItem[];
  routes: RouteItem[];
}) {
  const healthyInventory =
    inventory.filter(
      (i) => i.status === "Healthy"
    ).length;

  const inventoryScore = Math.round(
    (healthyInventory /
      Math.max(inventory.length, 1)) *
      100
  );

  const activeRoutes =
    routes.filter(
      (r) => r.status === "Active"
    ).length;

  const routeReliability = Math.round(
    (activeRoutes /
      Math.max(routes.length, 1)) *
      100
  );

  return (
    <>
      <div className="kpi-grid">
        <KPI
          label="Operational Score"
          value="89%"
          change="+5.2%"
          positive
          icon="◉"
        />

        <KPI
          label="Delivery Efficiency"
          value="92%"
          change="+3.8%"
          positive
          icon="⇄"
        />

        <KPI
          label="Inventory Score"
          value={`${inventoryScore}%`}
          change="+4.1%"
          positive
          icon="▣"
        />

        <KPI
          label="Route Reliability"
          value={`${routeReliability}%`}
          change="+2.6%"
          positive
          icon="⌁"
        />
      </div>

      <div className="dashboard-grid two-column">
        <Panel
          title="Performance Trend"
          subtitle="Synthetic operational trend"
        >
          <TrendChart />
        </Panel>

        <Panel
          title="AI Insights"
          subtitle="Synthetic intelligence recommendations"
        >
          <div className="alert-list">
            <div className="alert-row">
              <div className="alert-content">
                <strong>
                  Fuel replenishment recommended
                </strong>

                <span>
                  Diesel stock at Base Bravo
                  is below threshold.
                </span>
              </div>
            </div>

            <div className="alert-row">
              <div className="alert-content">
                <strong>
                  Medical demand increasing
                </strong>

                <span>
                  Forecast suggests
                  additional medical kits.
                </span>
              </div>
            </div>

            <div className="alert-row">
              <div className="alert-content">
                <strong>
                  Route Bravo requires monitoring
                </strong>

                <span>
                  High-risk delayed route
                  detected.
                </span>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}

/* =========================================================
   FORECAST
   ========================================================= */

function ForecastPage() {
  const forecast = [
    {
      item: "Rice",
      current: 820,
      forecast: 760,
      recommendation: "Maintain",
    },
    {
      item: "Medical Kits",
      current: 140,
      forecast: 230,
      recommendation: "Increase",
    },
    {
      item: "Diesel",
      current: 92,
      forecast: 180,
      recommendation: "Urgent",
    },
    {
      item: "Water",
      current: 670,
      forecast: 620,
      recommendation: "Maintain",
    },
    {
      item: "Blankets",
      current: 180,
      forecast: 310,
      recommendation: "Increase",
    },
  ];

  return (
    <Panel
      title="AI Demand Forecast"
      subtitle="Synthetic 7-day demand prediction"
    >
      <div className="alert-list">
        {forecast.map((item) => (
          <div
            className="alert-row"
            key={item.item}
          >
            <div className="alert-content">
              <strong>
                {item.item}
              </strong>

              <span>
                Current: {item.current} •
                Forecast: {item.forecast}
              </span>
            </div>

            <span className="status-pill">
              {item.recommendation}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* =========================================================
   SCENARIOS
   ========================================================= */

function ScenarioPage({
  showMessage,
}: {
  showMessage: (text: string) => void;
}) {
  const scenarios = [
    {
      name: "Fuel Shortage",
      impact: "High",
      effect:
        "Routes may experience 20% delay.",
    },
    {
      name: "Heavy Rainfall",
      impact: "Medium",
      effect:
        "Northern routes may become risky.",
    },
    {
      name: "Demand Surge",
      impact: "High",
      effect:
        "Medical and food stock may decrease rapidly.",
    },
  ];

  return (
    <Panel
      title="Scenario Simulation"
      subtitle="Test possible logistics disruptions"
    >
      <div className="alert-list">
        {scenarios.map((scenario) => (
          <div
            className="alert-row"
            key={scenario.name}
          >
            <div className="alert-content">
              <strong>
                {scenario.name}
              </strong>

              <span>
                {scenario.effect}
              </span>
            </div>

            <span className="status-pill">
              {scenario.impact}
            </span>

            <button
              className="secondary-button compact"
              onClick={() =>
                showMessage(
                  `${scenario.name} simulation completed.`
                )
              }
            >
              Simulate
            </button>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* =========================================================
   REPORTS
   ========================================================= */

function ReportsPage({
  showMessage,
}: {
  showMessage: (text: string) => void;
}) {
  const reports = [
    "Daily Logistics Report",
    "Inventory Health Report",
    "Route Risk Report",
    "Weekly Command Summary",
  ];

  return (
    <Panel
      title="Reports"
      subtitle="Generate operational intelligence reports"
    >
      <div className="quick-actions">
        {reports.map((report) => (
          <button
            key={report}
            onClick={() =>
              showMessage(
                `${report} generated successfully.`
              )
            }
          >
            ▤ {report}
          </button>
        ))}
      </div>
    </Panel>
  );
}

/* =========================================================
   MANAGE SYSTEM
   ========================================================= */

function ManageSystem({
  inventory,
  routes,
  alerts,
  setInventory,
  setRoutes,
  setAlerts,
  showMessage,
}: {
  inventory: InventoryItem[];
  routes: RouteItem[];
  alerts: AlertItem[];
  setInventory: React.Dispatch<
    React.SetStateAction<InventoryItem[]>
  >;
  setRoutes: React.Dispatch<
    React.SetStateAction<RouteItem[]>
  >;
  setAlerts: React.Dispatch<
    React.SetStateAction<AlertItem[]>
  >;
  showMessage: (text: string) => void;
}) {
  function resetDemo() {
    setInventory(initialInventory);
    setRoutes(initialRoutes);
    setAlerts(initialAlerts);

    showMessage(
      "Demo system data reset successfully."
    );
  }

  return (
    <>
      <div className="kpi-grid">
        <KPI
          label="Inventory Records"
          value={String(
            inventory.length
          )}
          change="Live"
          positive
          icon="▣"
        />

        <KPI
          label="Routes"
          value={String(
            routes.length
          )}
          change="Live"
          positive
          icon="⌁"
        />

        <KPI
          label="Alerts"
          value={String(
            alerts.length
          )}
          change="Live"
          positive
          icon="!"
        />

        <KPI
          label="System"
          value="Online"
          change="Healthy"
          positive
          icon="◉"
        />
      </div>

      <Panel
        title="System Management"
        subtitle="Administrator controls"
      >
        <div className="quick-actions">
          <button
            onClick={resetDemo}
          >
            ↻ Reset Demo Data
          </button>

          <button
            onClick={() =>
              showMessage(
                "Backup created successfully."
              )
            }
          >
            ⬇ Create Backup
          </button>

          <button
            onClick={() =>
              showMessage(
                "System health check completed."
              )
            }
          >
            ✓ Run Health Check
          </button>

          <button
            onClick={() =>
              showMessage(
                "Configuration saved."
              )
            }
          >
            ⚙ Save Configuration
          </button>
        </div>
      </Panel>
    </>
  );
}

/* =========================================================
   USER MANAGEMENT
   ========================================================= */

function UserManagement({
  users,
  toggleUser,
}: {
  users: UserItem[];
  toggleUser: (id: number) => void;
}) {
  return (
    <Panel
      title="User Management"
      subtitle="Manage commanders, captains and administrators"
    >
      <div className="alert-list">
        {users.map((user) => (
          <div
            className="alert-row"
            key={user.id}
          >
            <div className="alert-content">
              <strong>
                {user.name}
              </strong>

              <span>
                {user.email} •{" "}
                {user.role}
              </span>
            </div>

            <span className="status-pill">
              {user.status}
            </span>

            <button
              className="secondary-button compact"
              onClick={() =>
                toggleUser(user.id)
              }
            >
              Toggle
            </button>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* =========================================================
   SUPPLY REQUESTS
   ========================================================= */

function SupplyRequests({
  showMessage,
}: {
  showMessage: (text: string) => void;
}) {
  const requests = [
    {
      id: "REQ-001",
      item: "Medical Kits",
      quantity: "80",
      priority: "High",
      status: "Pending",
    },
    {
      id: "REQ-002",
      item: "Diesel",
      quantity: "120 L",
      priority: "Critical",
      status: "Approved",
    },
    {
      id: "REQ-003",
      item: "Blankets",
      quantity: "100",
      priority: "Medium",
      status: "Pending",
    },
  ];

  return (
    <Panel
      title="Supply Requests"
      subtitle="Manage field-level supply requirements"
    >
      <div className="alert-list">
        {requests.map((request) => (
          <div
            className="alert-row"
            key={request.id}
          >
            <div className="alert-content">
              <strong>
                {request.id} •{" "}
                {request.item}
              </strong>

              <span>
                Quantity:{" "}
                {request.quantity} •
                Priority:{" "}
                {request.priority}
              </span>
            </div>

            <span className="status-pill">
              {request.status}
            </span>
          </div>
        ))}
      </div>

      <button
        className="primary-button compact"
        onClick={() =>
          showMessage(
            "New supply request created."
          )
        }
      >
        + Create Supply Request
      </button>
    </Panel>
  );
}

/* =========================================================
   TREND CHART
   ========================================================= */

function TrendChart() {
  const values = [
    58, 64, 61, 72, 69, 81, 87,
  ];

  return (
    <div className="trend-chart">
      {values.map(
        (value, index) => (
          <div
            className="trend-column"
            key={index}
          >
            <div
              className="trend-bar"
              style={{
                height: `${value}%`,
              }}
            />

            <span>
              D{index + 1}
            </span>
          </div>
        )
      )}
    </div>
  );
}
