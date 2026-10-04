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

  const meta = pageMeta[activePage] ?? roleMeta[role];

  const activeAlerts = alerts.filter((a) => !a.resolved).length;

  const criticalInventory = inventory.filter(
    (item) => item.status === "Critical"
  ).length;

  const delayedRoutes = routes.filter(
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
    showMessage(`Switched to ${nextRole} dashboard.`);
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
            <strong>SupplyShield</strong>
            <span>AI Logistics</span>
          </div>
        </div>

        <div className="role-box">
          <span className="small-label">ACTIVE ROLE</span>

          <select
            value={role}
            onChange={(e) =>
              changeRole(e.target.value as Role)
            }
          >
            <option value="admin">Administrator</option>
            <option value="commander">Commander</option>
            <option value="captain">Captain</option>
          </select>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">
            COMMAND CENTER
          </div>

          {navItems.map((item) => (
            <NavButton
              key={item.id}
              active={activePage === item.id}
              label={item.label}
              icon={item.icon}
              onClick={() => setActivePage(item.id)}
              badge={
                item.id === "alerts"
                  ? activeAlerts
                  : undefined
              }
            />
          ))}

          {role === "admin" && (
            <>
              <div className="nav-section-title admin-title">
                ADMINISTRATION
              </div>

              <NavButton
                active={activePage === "manage"}
                label="Manage System"
                icon="⚙"
                onClick={() => setActivePage("manage")}
              />

              <NavButton
                active={activePage === "users"}
                label="User Management"
                icon="♙"
                onClick={() => setActivePage("users")}
              />
            </>
          )}

          {role === "captain" && (
            <>
              <div className="nav-section-title admin-title">
                FIELD OPERATIONS
              </div>

              <NavButton
                active={activePage === "requests"}
                label="Supply Requests"
                icon="＋"
                onClick={() => setActivePage("requests")}
              />
            </>
          )}
        </nav>

        <div className="sidebar-bottom">
          <button
            className="theme-btn"
            onClick={() =>
              setTheme((current) =>
                current === "dark" ? "light" : "dark"
              )
            }
          >
            {theme === "dark" ? "☀ Light Mode" : "☾ Dark Mode"}
          </button>

          <div className="system-status">
            <span className="status-dot" />
            All systems operational
          </div>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="topbar">
          <div>
            <div className="breadcrumb">
              SUPPLYSHIELD AI / {role.toUpperCase()}
            </div>

            <h1>{meta.title}</h1>

            <p>{meta.subtitle}</p>
          </div>

          <div className="topbar-right">
            <div className="live-status">
              <span className="status-dot" />
              LIVE
            </div>

            <div className="user-avatar">
              {role === "admin"
                ? "A"
                : role === "commander"
                ? "C"
                : "F"}
            </div>
          </div>
        </header>

        {message && (
          <div className="toast-message">
            ✓ {message}
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
              alerts={alerts}
            />
          )}

          {activePage === "inventory" && (
            <InventoryPage
              inventory={inventory}
              onRefresh={() => {
                setInventory([...inventory]);
                showMessage("Inventory refreshed.");
              }}
            />
          )}

          {activePage === "routes" && (
            <RoutesPage routes={routes} />
          )}

          {activePage === "alerts" && (
            <AlertsPage
              alerts={alerts}
              onResolve={resolveAlert}
            />
          )}

          {activePage === "analytics" && (
            <AnalyticsPage
              inventory={inventory}
              routes={routes}
              alerts={alerts}
            />
          )}

          {activePage === "forecast" && (
            <ForecastPage />
          )}

          {activePage === "scenarios" && (
            <ScenarioPage showMessage={showMessage} />
          )}

          {activePage === "reports" && (
            <ReportsPage showMessage={showMessage} />
          )}

          {activePage === "manage" && role === "admin" && (
            <ManageSystem
              inventory={inventory}
              routes={routes}
              alerts={alerts}
              criticalInventory={criticalInventory}
              delayedRoutes={delayedRoutes}
              onReset={() => {
                setInventory(initialInventory);
                setRoutes(initialRoutes);
                setAlerts(initialAlerts);
                showMessage("Synthetic system data reset.");
              }}
            />
          )}

          {activePage === "users" && role === "admin" && (
            <UserManagement
              users={users}
              onToggle={toggleUser}
              showMessage={showMessage}
            />
          )}

          {activePage === "requests" && role === "captain" && (
            <SupplyRequests showMessage={showMessage} />
          )}
        </div>
      </section>
    </main>
  );
}

function NavButton({
  active,
  label,
  icon,
  onClick,
  badge,
}: {
  active: boolean;
  label: string;
  icon: string;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      type="button"
      className={`nav-button ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="nav-icon">{icon}</span>

      <span>{label}</span>

      {badge !== undefined && badge > 0 && (
        <span className="nav-badge">{badge}</span>
      )}
    </button>
  );
}

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
  const activeAlerts = alerts.filter(
    (a) => !a.resolved
  );

  const critical = inventory.filter(
    (i) => i.status === "Critical"
  );

  return (
    <>
      <div className="kpi-grid">
        <KPI
          label="Active Operations"
          value="24"
          change="+8.4%"
          positive
          icon="◉"
        />

        <KPI
          label="Inventory Health"
          value="87%"
          change="+4.2%"
          positive
          icon="▣"
        />

        <KPI
          label="Active Routes"
          value={String(
            routes.filter((r) => r.status === "Active").length
          )}
          change="+2"
          positive
          icon="⌁"
        />

        <KPI
          label="Risk Alerts"
          value={String(activeAlerts.length)}
          change={
            critical.length > 0
              ? "Action needed"
              : "Stable"
          }
          positive={critical.length === 0}
          icon="!"
        />
      </div>

      <div className="dashboard-grid two-column">
        <Panel
          title="Operational Network"
          subtitle="Current synthetic network status"
        >
          <div className="network-map">
            <div className="map-grid" />

            <div className="map-node node-a">
              <span />
              Base Alpha
            </div>

            <div className="map-node node-b">
              <span />
              Base Bravo
            </div>

            <div className="map-node node-c">
              <span />
              Base Charlie
            </div>

            <div className="map-node node-d">
              <span />
              Central Depot
            </div>

            <div className="route-line line-1" />
            <div className="route-line line-2" />
            <div className="route-line line-3" />
          </div>

          <button
            type="button"
            className="secondary-button"
            onClick={() => onNavigate("routes")}
          >
            Open Route Intelligence →
          </button>
        </Panel>

        <Panel
          title="Priority Alerts"
          subtitle="Issues requiring attention"
        >
          <div className="alert-list">
            {activeAlerts.slice(0, 4).map((alert) => (
              <div className="alert-row" key={alert.id}>
                <div
                  className={`severity-dot ${alert.severity.toLowerCase()}`}
                />

                <div className="alert-content">
                  <strong>{alert.title}</strong>
                  <span>
                    {alert.location} · {alert.time}
                  </span>
                </div>

                <span
                  className={`status-pill ${alert.severity.toLowerCase()}`}
                >
                  {alert.severity}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="secondary-button"
            onClick={() => onNavigate("alerts")}
          >
            View All Alerts →
          </button>
        </Panel>
      </div>

      <div className="dashboard-grid two-column">
        <Panel
          title="7-Day Logistics Trend"
          subtitle="Synthetic shipment performance"
        >
          <TrendChart />
        </Panel>

        <Panel
          title="Inventory Readiness"
          subtitle="Current stock availability"
        >
          <div className="readiness-list">
            {inventory.slice(0, 5).map((item) => {
              const percentage = Math.min(
                100,
                Math.round((item.stock / item.min) * 100)
              );

              return (
                <div
                  className="readiness-item"
                  key={item.id}
                >
                  <div className="readiness-header">
                    <span>{item.item}</span>
                    <strong>{percentage}%</strong>
                  </div>

                  <div className="progress">
                    <div
                      className={`progress-bar ${item.status.toLowerCase()}`}
                      style={{
                        width: `${Math.min(
                          100,
                          percentage
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="secondary-button"
            onClick={() => onNavigate("inventory")}
          >
            Open Inventory →
          </button>
        </Panel>
      </div>

      <Panel
        title={`${roleMeta[role].title} Quick Actions`}
        subtitle="Frequently used operational controls"
      >
        <div className="quick-actions">
          <button
            type="button"
            onClick={() => onNavigate("inventory")}
          >
            <span>▣</span>
            Check Inventory
          </button>

          <button
            type="button"
            onClick={() => onNavigate("routes")}
          >
            <span>⌁</span>
            Monitor Routes
          </button>

          <button
            type="button"
            onClick={() => onNavigate("forecast")}
          >
            <span>◒</span>
            Demand Forecast
          </button>

          <button
            type="button"
            onClick={() => onNavigate("reports")}
          >
            <span>▤</span>
            Generate Report
          </button>
        </div>
      </Panel>
    </>
  );
}

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
        <div className="kpi-icon">{icon}</div>
      </div>

      <strong>{value}</strong>

      <div
        className={`kpi-change ${
          positive ? "positive" : "negative"
        }`}
      >
        {positive ? "↑" : "↓"} {change}
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
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>

      <div className="panel-body">{children}</div>
    </section>
  );
}

function SupplyChain({
  inventory,
  routes,
  alerts,
}: {
  inventory: InventoryItem[];
  routes: RouteItem[];
  alerts: AlertItem[];
}) {
  const healthyInventory = inventory.filter(
    (i) => i.status === "Healthy"
  ).length;

  const activeRoutes = routes.filter(
    (r) => r.status === "Active"
  ).length;

  const unresolvedAlerts = alerts.filter(
    (a) => !a.resolved
  ).length;

  return (
    <>
      <div className="kpi-grid">
        <KPI
          label="Supply Availability"
          value="91%"
          change="+5.1%"
          positive
          icon="◉"
        />

        <KPI
          label="Healthy Inventory"
          value={`${healthyInventory}/${inventory.length}`}
          change="+2 items"
          positive
          icon="▣"
        />

        <KPI
          label="Active Shipments"
          value="18"
          change="+12%"
          positive
          icon="⇄"
        />

        <KPI
          label="Network Risks"
          value={String(unresolvedAlerts)}
          change="Monitor"
          positive={unresolvedAlerts < 3}
          icon="!"
        />
      </div>

      <Panel
        title="End-to-End Supply Flow"
        subtitle="Synthetic movement of supplies"
      >
        <div className="supply-flow">
          <FlowBox
            title="Central Depot"
            value="1,840 units"
          />

          <div className="flow-arrow">→</div>

          <FlowBox
            title="Regional Hub"
            value="1,520 units"
          />

          <div className="flow-arrow">→</div>

          <FlowBox
            title="Field Bases"
            value="1,240 units"
          />

          <div className="flow-arrow">→</div>

          <FlowBox
            title="Field Units"
            value="920 units"
          />
        </div>
      </Panel>

      <div className="dashboard-grid two-column">
        <Panel
          title="Supply Performance"
          subtitle="Category-wise status"
        >
          <div className="metric-list">
            <MetricRow
              label="Food"
              value="94%"
              percentage={94}
            />
            <MetricRow
              label="Medical"
              value="71%"
              percentage={71}
            />
            <MetricRow
              label="Fuel"
              value="62%"
              percentage={62}
            />
            <MetricRow
              label="Water"
              value="98%"
              percentage={98}
            />
            <MetricRow
              label="Relief"
              value="79%"
              percentage={79}
            />
          </div>
        </Panel>

        <Panel
          title="Logistics Pipeline"
          subtitle={`${activeRoutes} routes currently active`}
        >
          <div className="pipeline">
            <PipelineItem
              title="Orders Received"
              value="42"
              status="Complete"
            />
            <PipelineItem
              title="Orders Processing"
              value="17"
              status="Active"
            />
            <PipelineItem
              title="In Transit"
              value="12"
              status="Active"
            />
            <PipelineItem
              title="Delivered Today"
              value="28"
              status="Complete"
            />
          </div>
        </Panel>
      </div>
    </>
  );
}

/*
  FIX FOR VERCEL ERROR:
  FlowBox was being used without being defined.
*/
function FlowBox({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flow-step">
      <span className="flow-number">●</span>
      <strong>{title}</strong>
      <span>Supply movement</span>
      <b>{value}</b>
    </div>
  );
}

function FlowStep({
  number,
  title,
  text,
  value,
}: {
  number: string;
  title: string;
  text: string;
  value: string;
}) {
  return (
    <div className="flow-step">
      <span className="flow-number">{number}</span>
      <strong>{title}</strong>
      <span>{text}</span>
      <b>{value}</b>
    </div>
  );
}

function PipelineItem({
  title,
  value,
  status,
}: {
  title: string;
  value: string;
  status: string;
}) {
  return (
    <div className="pipeline-item">
      <div>
        <strong>{title}</strong>
        <span>{status}</span>
      </div>

      <b>{value}</b>
    </div>
  );
}

function MetricRow({
  label,
  value,
  percentage,
}: {
  label: string;
  value: string;
  percentage: number;
}) {
  return (
    <div className="metric-row">
      <div className="metric-header">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function InventoryPage({
  inventory,
  onRefresh,
}: {
  inventory: InventoryItem[];
  onRefresh: () => void;
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

  return (
    <>
      <div className="kpi-grid">
        <KPI
          label="Total Items"
          value={String(inventory.length)}
          change="Tracked"
          positive
          icon="▣"
        />

        <KPI
          label="Healthy"
          value={String(healthy)}
          change="Stable"
          positive
          icon="✓"
        />

        <KPI
          label="Low Stock"
          value={String(low)}
          change="Replenish"
          positive={false}
          icon="!"
        />

        <KPI
          label="Critical"
          value={String(critical)}
          change="Immediate action"
          positive={false}
          icon="⚠"
        />
      </div>

      <Panel
        title="Inventory Control Center"
        subtitle="Synthetic inventory dataset"
      >
        <div className="table-toolbar">
          <span>{inventory.length} tracked items</span>

          <button
            type="button"
            className="secondary-button compact"
            onClick={onRefresh}
          >
            ↻ Refresh
          </button>
        </div>

        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Minimum</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.item}</strong>
                  </td>
                  <td>{item.category}</td>
                  <td>{item.stock}</td>
                  <td>{item.min}</td>
                  <td>{item.location}</td>
                  <td>
                    <span
                      className={`status-pill ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

function RoutesPage({
  routes,
}: {
  routes: RouteItem[];
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

  return (
    <>
      <div className="kpi-grid">
        <KPI
          label="Total Routes"
          value={String(routes.length)}
          change="Monitored"
          positive
          icon="⌁"
        />

        <KPI
          label="Active"
          value={String(active)}
          change="Running"
          positive
          icon="✓"
        />

        <KPI
          label="Delayed"
          value={String(delayed)}
          change="Attention"
          positive={false}
          icon="!"
        />

        <KPI
          label="Blocked"
          value={String(blocked)}
          change="Critical"
          positive={false}
          icon="⚠"
        />
      </div>

      <div className="dashboard-grid two-column">
        <Panel
          title="Route Network"
          subtitle="Synthetic logistics map"
        >
          <div className="network-map large-map">
            <div className="map-grid" />

            <div className="map-node node-a">
              <span />
              Central Depot
            </div>

            <div className="map-node node-b">
              <span />
              Base Alpha
            </div>

            <div className="map-node node-c">
              <span />
              Base Bravo
            </div>

            <div className="map-node node-d">
              <span />
              Base Charlie
            </div>

            <div className="route-line line-1" />
            <div className="route-line line-2" />
            <div className="route-line line-3" />
          </div>
        </Panel>

        <Panel
          title="Route Risk"
          subtitle="Current transportation conditions"
        >
          <div className="route-list">
            {routes.map((route) => (
              <div className="route-card" key={route.id}>
                <div>
                  <strong>{route.name}</strong>
                  <span>
                    {route.origin} → {route.destination}
                  </span>
                </div>

                <div className="route-meta">
                  <span>{route.distance}</span>
                  <span>{route.eta}</span>

                  <span
                    className={`status-pill ${route.risk.toLowerCase()}`}
                  >
                    {route.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

function AlertsPage({
  alerts,
  onResolve,
}: {
  alerts: AlertItem[];
  onResolve: (id: number) => void;
}) {
  const critical = alerts.filter(
    (a) => a.severity === "Critical" && !a.resolved
  ).length;

  const high = alerts.filter(
    (a) => a.severity === "High" && !a.resolved
  ).length;

  const medium = alerts.filter(
    (a) => a.severity === "Medium" && !a.resolved
  ).length;

  return (
    <>
      <div className="kpi-grid">
        <KPI
          label="Critical"
          value={String(critical)}
          change="Immediate"
          positive={false}
          icon="⚠"
        />

        <KPI
          label="High"
          value={String(high)}
          change="Action required"
          positive={false}
          icon="!"
        />

        <KPI
          label="Medium"
          value={String(medium)}
          change="Monitor"
          positive
          icon="◐"
        />

        <KPI
          label="Resolved"
          value={String(
            alerts.filter((a) => a.resolved).length
          )}
          change="Completed"
          positive
          icon="✓"
        />
      </div>

      <Panel
        title="Risk Alert Center"
        subtitle="Prioritized synthetic incidents"
      >
        <div className="alert-list full-alert-list">
          {alerts.map((alert) => (
            <div
              className={`alert-row ${
                alert.resolved ? "resolved-row" : ""
              }`}
              key={alert.id}
            >
              <div
                className={`severity-dot ${alert.severity.toLowerCase()}`}
              />

              <div className="alert-content">
                <strong>{alert.title}</strong>
                <span>{alert.description}</span>
                <small>
                  {alert.location} · {alert.time}
                </small>
              </div>

              <span
                className={`status-pill ${alert.severity.toLowerCase()}`}
              >
                {alert.resolved
                  ? "Resolved"
                  : alert.severity}
              </span>

              {!alert.resolved && (
                <button
                  type="button"
                  className="secondary-button compact"
                  onClick={() => onResolve(alert.id)}
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

function AnalyticsPage({
  inventory,
  routes,
  alerts,
}: {
  inventory: InventoryItem[];
  routes: RouteItem[];
  alerts: AlertItem[];
}) {
  const deliveryScore = 92;

  const inventoryScore = Math.round(
    (inventory.filter((i) => i.status === "Healthy").length /
      inventory.length) *
      100
  );

  const routeScore = Math.round(
    (routes.filter((r) => r.status === "Active").length /
      routes.length) *
      100
  );

  const alertScore = Math.max(
    0,
    100 -
      alerts.filter((a) => !a.resolved).length * 10
  );

  return (
    <>
      <div className="kpi-grid">
        <KPI
          label="Operational Score"
          value="89"
          change="+6.8%"
          positive
          icon="◫"
        />

        <KPI
          label="Delivery Efficiency"
          value={`${deliveryScore}%`}
          change="+4.1%"
          positive
          icon="⇄"
        />

        <KPI
          label="Inventory Score"
          value={`${inventoryScore}%`}
          change="+3.5%"
          positive
          icon="▣"
        />

        <KPI
          label="Route Reliability"
          value={`${routeScore}%`}
          change="+2.9%"
          positive
          icon="⌁"
        />
      </div>

      <div className="dashboard-grid two-column">
        <Panel
          title="Performance Analytics"
          subtitle="Seven-day operational performance"
        >
          <div className="bar-chart">
            {[72, 78, 74, 84, 82, 91, 89].map(
              (value, index) => (
                <div className="bar-column" key={index}>
                  <div
                    className="bar"
                    style={{ height: `${value}%` }}
                  />

                  <span>
                    {["M", "T", "W", "T", "F", "S", "S"][
                      index
                    ]}
                  </span>
                </div>
              )
            )}
          </div>
        </Panel>

        <Panel
          title="KPI Breakdown"
          subtitle="Current operational health"
        >
          <MetricRow
            label="Delivery Efficiency"
            value="92%"
            percentage={92}
          />

          <MetricRow
            label="Inventory Readiness"
            value={`${inventoryScore}%`}
            percentage={inventoryScore}
          />

          <MetricRow
            label="Route Reliability"
            value={`${routeScore}%`}
            percentage={routeScore}
          />

          <MetricRow
            label="Alert Resolution"
            value={`${alertScore}%`}
            percentage={alertScore}
          />
        </Panel>
      </div>

      <Panel
        title="AI Insights"
        subtitle="Synthetic intelligence-generated observations"
      >
        <div className="insight-grid">
          <Insight
            icon="↗"
            title="Delivery improving"
            text="Average delivery efficiency increased over the last seven days."
          />

          <Insight
            icon="!"
            title="Fuel requires attention"
            text="Fuel inventory is below the preferred operational threshold."
          />

          <Insight
            icon="⌁"
            title="Route Bravo risk"
            text="Weather and congestion may increase travel time."
          />
        </div>
      </Panel>
    </>
  );
}

function Insight({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="insight-card">
      <div className="insight-icon">{icon}</div>

      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

function ForecastPage() {
  const forecast = [
    {
      item: "Rice",
      current: 820,
      predicted: 620,
      confidence: 94,
    },
    {
      item: "Medical Kits",
      current: 140,
      predicted: 240,
      confidence: 91,
    },
    {
      item: "Diesel",
      current: 92,
      predicted: 210,
      confidence: 96,
    },
    {
      item: "Water",
      current: 670,
      predicted: 540,
      confidence: 89,
    },
    {
      item: "Blankets",
      current: 180,
      predicted: 360,
      confidence: 86,
    },
  ];

  return (
    <>
      <div className="kpi-grid">
        <KPI
          label="Forecast Accuracy"
          value="94.2%"
          change="+2.8%"
          positive
          icon="◒"
        />

        <KPI
          label="7-Day Demand"
          value="4,820"
          change="+11.4%"
          positive
          icon="↗"
        />

        <KPI
          label="Replenishment"
          value="8"
          change="Items required"
          positive={false}
          icon="!"
        />

        <KPI
          label="Confidence"
          value="91%"
          change="High"
          positive
          icon="✓"
        />
      </div>

      <Panel
        title="Demand Forecast"
        subtitle="Synthetic AI-style predictions"
      >
        <div className="forecast-list">
          {forecast.map((item) => (
            <div
              className="forecast-row"
              key={item.item}
            >
              <div className="forecast-name">
                <strong>{item.item}</strong>
                <span>
                  Current {item.current} → Forecast{" "}
                  {item.predicted}
                </span>
              </div>

              <div className="forecast-bar">
                <div
                  className="forecast-current"
                  style={{
                    width: `${Math.min(
                      100,
                      (item.current / 900) * 100
                    )}%`,
                  }}
                />

                <div
                  className="forecast-predicted"
                  style={{
                    width: `${Math.min(
                      100,
                      (item.predicted / 900) * 100
                    )}%`,
                  }}
                />
              </div>

              <span className="confidence">
                {item.confidence}%
              </span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel
        title="Forecast Recommendation"
        subtitle="Suggested operational action"
      >
        <div className="recommendation">
          <div className="recommendation-icon">AI</div>

          <div>
            <strong>
              Increase fuel and medical stock before
              next operational cycle.
            </strong>

            <p>
              The synthetic demand model predicts a
              significant increase in consumption.
            </p>
          </div>
        </div>
      </Panel>
    </>
  );
}

function ScenarioPage({
  showMessage,
}: {
  showMessage: (message: string) => void;
}) {
  const [result, setResult] = useState("");

  const scenarios = [
    {
      id: 1,
      title: "Fuel Shortage",
      description:
        "Simulate a 35% reduction in available fuel.",
      impact: "High",
      effect: "-18% route capacity",
    },
    {
      id: 2,
      title: "Heavy Rainfall",
      description:
        "Simulate major weather disruption.",
      impact: "Medium",
      effect: "+42 min average ETA",
    },
    {
      id: 3,
      title: "Demand Surge",
      description:
        "Simulate 40% increase in field demand.",
      impact: "High",
      effect: "+31% inventory consumption",
    },
  ];

  function simulate(title: string) {
    setResult(
      `${title}: synthetic simulation completed.`
    );

    showMessage("Scenario simulation completed.");
  }

  return (
    <>
      <div className="kpi-grid">
        <KPI
          label="Scenarios Available"
          value="12"
          change="Synthetic"
          positive
          icon="◇"
        />

        <KPI
          label="High Impact"
          value="4"
          change="Review"
          positive={false}
          icon="!"
        />

        <KPI
          label="Simulations Today"
          value="18"
          change="+6"
          positive
          icon="↗"
        />

        <KPI
          label="Preparedness"
          value="86%"
          change="+5%"
          positive
          icon="✓"
        />
      </div>

      <div className="scenario-grid">
        {scenarios.map((scenario) => (
          <div
            className="scenario-card"
            key={scenario.id}
          >
            <div className="scenario-icon">◇</div>

            <span
              className={`status-pill ${scenario.impact.toLowerCase()}`}
            >
              {scenario.impact} impact
            </span>

            <h3>{scenario.title}</h3>

            <p>{scenario.description}</p>

            <div className="scenario-effect">
              <span>Expected effect</span>
              <strong>{scenario.effect}</strong>
            </div>

            <button
              type="button"
              className="primary-button"
              onClick={() =>
                simulate(scenario.title)
              }
            >
              Run Simulation
            </button>
          </div>
        ))}
      </div>

      {result && (
        <Panel
          title="Simulation Result"
          subtitle="Latest synthetic simulation"
        >
          <div className="simulation-result">
            ✓ {result}
          </div>
        </Panel>
      )}
    </>
  );
}

function ReportsPage({
  showMessage,
}: {
  showMessage: (message: string) => void;
}) {
  const reports = [
    {
      title: "Daily Logistics Report",
      type: "Operations",
      date: "04 Oct 2026",
    },
    {
      title: "Inventory Health Report",
      type: "Inventory",
      date: "04 Oct 2026",
    },
    {
      title: "Route Risk Report",
      type: "Transportation",
      date: "03 Oct 2026",
    },
    {
      title: "Weekly Command Summary",
      type: "Executive",
      date: "02 Oct 2026",
    },
  ];

  return (
    <>
      <div className="kpi-grid">
        <KPI
          label="Reports Available"
          value="24"
          change="This month"
          positive
          icon="▤"
        />

        <KPI
          label="Generated Today"
          value="6"
          change="+2"
          positive
          icon="↗"
        />

        <KPI
          label="Scheduled"
          value="4"
          change="Upcoming"
          positive
          icon="◷"
        />

        <KPI
          label="Data Freshness"
          value="98%"
          change="Excellent"
          positive
          icon="✓"
        />
      </div>

      <Panel
        title="Operational Reports"
        subtitle="Synthetic report center"
      >
        <div className="report-list">
          {reports.map((report) => (
            <div
              className="report-row"
              key={report.title}
            >
              <div className="report-icon">▤</div>

              <div className="report-info">
                <strong>{report.title}</strong>

                <span>
                  {report.type} · {report.date}
                </span>
              </div>

              <button
                type="button"
                className="secondary-button compact"
                onClick={() =>
                  showMessage(
                    `${report.title} generated successfully.`
                  )
                }
              >
                Generate
              </button>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function ManageSystem({
  inventory,
  routes,
  alerts,
  criticalInventory,
  delayedRoutes,
  onReset,
}: {
  inventory: InventoryItem[];
  routes: RouteItem[];
  alerts: AlertItem[];
  criticalInventory: number;
  delayedRoutes: number;
  onReset: () => void;
}) {
  const openAlerts = alerts.filter(
    (a) => !a.resolved
  ).length;

  return (
    <>
      <div className="kpi-grid">
        <KPI
          label="Tracked Inventory"
          value={String(inventory.length)}
          change="Items"
          positive
          icon="▣"
        />

        <KPI
          label="Routes"
          value={String(routes.length)}
          change="Configured"
          positive
          icon="⌁"
        />

        <KPI
          label="Critical Items"
          value={String(criticalInventory)}
          change="Attention"
          positive={criticalInventory === 0}
          icon="⚠"
        />

        <KPI
          label="Open Alerts"
          value={String(openAlerts)}
          change={`${delayedRoutes} route issues`}
          positive={openAlerts < 3}
          icon="!"
        />
      </div>

      <div className="admin-grid">
        <AdminCard
          icon="▣"
          title="Inventory Configuration"
          text="Configure synthetic stock thresholds and supply categories."
          action="Manage Inventory"
        />

        <AdminCard
          icon="⌁"
          title="Route Configuration"
          text="Configure operational routes and transportation priorities."
          action="Manage Routes"
        />

        <AdminCard
          icon="!"
          title="Alert Rules"
          text="Configure threshold-based synthetic risk detection."
          action="Configure Alerts"
        />

        <AdminCard
          icon="⚙"
          title="System Settings"
          text="Manage dashboard preferences and operational parameters."
          action="Open Settings"
        />
      </div>

      <Panel
        title="Synthetic Data Controls"
        subtitle="No production database is connected"
      >
        <div className="system-control">
          <div>
            <strong>Reset Demo Environment</strong>
            <p>
              Restore inventory, routes and alerts to
              their original synthetic values.
            </p>
          </div>

          <button
            type="button"
            className="danger-button"
            onClick={onReset}
          >
            Reset Demo Data
          </button>
        </div>
      </Panel>
    </>
  );
}

function AdminCard({
  icon,
  title,
  text,
  action,
}: {
  icon: string;
  title: string;
  text: string;
  action: string;
}) {
  return (
    <div className="admin-card">
      <div className="admin-card-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{text}</p>

      <button
        type="button"
        className="secondary-button"
        onClick={() =>
          alert(`${action} is available in demo mode.`)
        }
      >
        {action} →
      </button>
    </div>
  );
}

function UserManagement({
  users,
  onToggle,
  showMessage,
}: {
  users: UserItem[];
  onToggle: (id: number) => void;
  showMessage: (message: string) => void;
}) {
  return (
    <>
      <div className="kpi-grid">
        <KPI
          label="Total Users"
          value={String(users.length)}
          change="Registered"
          positive
          icon="♙"
        />

        <KPI
          label="Active Users"
          value={String(
            users.filter(
              (u) => u.status === "Active"
            ).length
          )}
          change="Online access"
          positive
          icon="✓"
        />

        <KPI
          label="Commanders"
          value={String(
            users.filter(
              (u) => u.role === "commander"
            ).length
          )}
          change="Regional"
          positive
          icon="C"
        />

        <KPI
          label="Captains"
          value={String(
            users.filter(
              (u) => u.role === "captain"
            ).length
          )}
          change="Field"
          positive
          icon="F"
        />
      </div>

      <Panel
        title="User Access Management"
        subtitle="Synthetic user accounts"
      >
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <strong>{user.name}</strong>
                  </td>

                  <td>{user.email}</td>

                  <td>
                    <span className="role-tag">
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`status-pill ${
                        user.status === "Active"
                          ? "healthy"
                          : "critical"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="secondary-button compact"
                      onClick={() => {
                        onToggle(user.id);
                        showMessage(
                          `${user.name} status updated.`
                        );
                      }}
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

function SupplyRequests({
  showMessage,
}: {
  showMessage: (message: string) => void;
}) {
  const requests = [
    {
      id: "REQ-1042",
      item: "Medical Kits",
      quantity: 80,
      priority: "High",
      location: "Forward Post A",
      status: "Pending",
    },
    {
      id: "REQ-1043",
      item: "Diesel",
      quantity: 400,
      priority: "Critical",
      location: "Base Bravo",
      status: "Approved",
    },
    {
      id: "REQ-1044",
      item: "Water",
      quantity: 250,
      priority: "Medium",
      location: "Base Charlie",
      status: "In Transit",
    },
  ];

  return (
    <>
      <div className="kpi-grid">
        <KPI
          label="Open Requests"
          value="7"
          change="+2 today"
          positive={false}
          icon="＋"
        />

        <KPI
          label="Critical Requests"
          value="2"
          change="Priority"
          positive={false}
          icon="⚠"
        />

        <KPI
          label="Approved"
          value="12"
          change="+4 this week"
          positive
          icon="✓"
        />

        <KPI
          label="In Transit"
          value="5"
          change="Moving"
          positive
          icon="⇄"
        />
      </div>

      <Panel
        title="Field Supply Requests"
        subtitle="Synthetic captain requests"
      >
        <div className="request-list">
          {requests.map((request) => (
            <div
              className="request-row"
              key={request.id}
            >
              <div className="request-id">
                {request.id}
              </div>

              <div className="request-info">
                <strong>{request.item}</strong>
                <span>
                  {request.quantity} units ·{" "}
                  {request.location}
                </span>
              </div>

              <span
                className={`status-pill ${request.priority.toLowerCase()}`}
              >
                {request.priority}
              </span>

              <span className="request-status">
                {request.status}
              </span>

              <button
                type="button"
                className="secondary-button compact"
                onClick={() =>
                  showMessage(
                    `${request.id} reviewed successfully.`
                  )
                }
              >
                Review
              </button>
            </div>
          ))}
        </div>
      </Panel>

      <Panel
        title="Create New Request"
        subtitle="Demo request action"
      >
        <div className="request-create">
          <p>
            Need additional supplies for your field
            unit? Create a synthetic request.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              showMessage(
                "New supply request created in demo mode."
              )
            }
          >
            + Create Supply Request
          </button>
        </div>
      </Panel>
    </>
  );
}

function TrendChart() {
  const values = [52, 61, 58, 72, 68, 84, 79];

  return (
    <div className="trend-chart">
      {values.map((value, index) => (
        <div
          className="trend-column"
          key={index}
        >
          <div
            className="trend-bar"
            style={{ height: `${value}%` }}
          />

          <span>
            {["M", "T", "W", "T", "F", "S", "S"][index]}
          </span>
        </div>
      ))}
    </div>
  );
}
