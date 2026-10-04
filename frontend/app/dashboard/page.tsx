"use client";

import { useMemo, useState } from "react";

type Role = "admin" | "commander" | "captain";

type InventoryItem = {
  id: number;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  unit: string;
  location: string;
};

type RouteItem = {
  id: number;
  name: string;
  from: string;
  to: string;
  status: "Active" | "Delayed" | "At Risk" | "Completed";
  eta: string;
};

type AlertItem = {
  id: number;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  location: string;
  status: "Open" | "Resolved";
};

type BaseItem = {
  id: number;
  name: string;
  location: string;
  readiness: number;
  stock: number;
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
    name: "Fuel",
    category: "Energy",
    quantity: 780,
    minStock: 300,
    unit: "L",
    location: "Northern Base",
  },
  {
    id: 2,
    name: "Food Supplies",
    category: "Food",
    quantity: 860,
    minStock: 400,
    unit: "Units",
    location: "Western Base",
  },
  {
    id: 3,
    name: "Medical Supplies",
    category: "Medical",
    quantity: 520,
    minStock: 350,
    unit: "Units",
    location: "Eastern Base",
  },
  {
    id: 4,
    name: "Spare Parts",
    category: "Equipment",
    quantity: 390,
    minStock: 450,
    unit: "Units",
    location: "Central Base",
  },
  {
    id: 5,
    name: "Water",
    category: "Essential",
    quantity: 920,
    minStock: 500,
    unit: "L",
    location: "Northern Base",
  },
];

const initialRoutes: RouteItem[] = [
  {
    id: 1,
    name: "Route Alpha",
    from: "Central Base",
    to: "Northern Base",
    status: "Active",
    eta: "2h 15m",
  },
  {
    id: 2,
    name: "Route Bravo",
    from: "Western Base",
    to: "Central Base",
    status: "Delayed",
    eta: "5h 30m",
  },
  {
    id: 3,
    name: "Route Charlie",
    from: "Eastern Base",
    to: "Northern Base",
    status: "Active",
    eta: "3h 10m",
  },
  {
    id: 4,
    name: "Route Delta",
    from: "Central Base",
    to: "Eastern Base",
    status: "At Risk",
    eta: "7h 20m",
  },
];

const initialAlerts: AlertItem[] = [
  {
    id: 1,
    title: "Fuel shortage predicted",
    severity: "High",
    location: "Northern Base",
    status: "Open",
  },
  {
    id: 2,
    title: "Route obstruction detected",
    severity: "Critical",
    location: "Route Delta",
    status: "Open",
  },
  {
    id: 3,
    title: "Medical stock below threshold",
    severity: "Medium",
    location: "Eastern Base",
    status: "Open",
  },
  {
    id: 4,
    title: "Demand spike expected",
    severity: "High",
    location: "Western Base",
    status: "Resolved",
  },
];

const initialBases: BaseItem[] = [
  {
    id: 1,
    name: "Northern Base",
    location: "Sector N-01",
    readiness: 82,
    stock: 78,
  },
  {
    id: 2,
    name: "Western Base",
    location: "Sector W-04",
    readiness: 64,
    stock: 64,
  },
  {
    id: 3,
    name: "Eastern Base",
    location: "Sector E-02",
    readiness: 91,
    stock: 91,
  },
  {
    id: 4,
    name: "Central Base",
    location: "Sector C-01",
    readiness: 47,
    stock: 47,
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
    name: "Operations Commander",
    email: "commander@supplyshield.ai",
    role: "commander",
    status: "Active",
  },
  {
    id: 3,
    name: "Field Captain",
    email: "captain@supplyshield.ai",
    role: "captain",
    status: "Active",
  },
];

const forecastData = [
  { day: "Day 1", demand: 420 },
  { day: "Day 2", demand: 455 },
  { day: "Day 3", demand: 480 },
  { day: "Day 4", demand: 510 },
  { day: "Day 5", demand: 535 },
  { day: "Day 6", demand: 560 },
  { day: "Day 7", demand: 590 },
];

const roleMeta = {
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

export default function DashboardPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState<Role>("admin");

  const [activePage, setActivePage] = useState("Overview");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const [inventory, setInventory] =
    useState<InventoryItem[]>(initialInventory);

  const [routes, setRoutes] = useState<RouteItem[]>(initialRoutes);

  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);

  const [bases, setBases] = useState<BaseItem[]>(initialBases);

  const [users, setUsers] = useState<UserItem[]>(initialUsers);

  const [search, setSearch] = useState("");

  const [modal, setModal] = useState<
    | "inventory"
    | "route"
    | "alert"
    | "base"
    | "user"
    | "scenario"
    | null
  >(null);

  const [editingInventory, setEditingInventory] =
    useState<InventoryItem | null>(null);

  const [editingRoute, setEditingRoute] =
    useState<RouteItem | null>(null);

  const [message, setMessage] = useState("");

  const meta = roleMeta[role];

  const totalInventory = inventory.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const openAlerts = alerts.filter((a) => a.status === "Open").length;

  const activeRoutes = routes.filter(
    (r) => r.status === "Active"
  ).length;

  const averageReadiness = Math.round(
    bases.reduce((sum, base) => sum + base.readiness, 0) /
      bases.length
  );

  const filteredInventory = useMemo(() => {
    const query = search.toLowerCase();

    return inventory.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)
    );
  }, [inventory, search]);

  function showMessage(text: string) {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  function deleteInventory(id: number) {
    setInventory((items) => items.filter((item) => item.id !== id));
    showMessage("Inventory item deleted");
  }

  function deleteRoute(id: number) {
    setRoutes((items) => items.filter((item) => item.id !== id));
    showMessage("Route deleted");
  }

  function resolveAlert(id: number) {
    setAlerts((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, status: "Resolved" }
          : item
      )
    );

    showMessage("Alert resolved");
  }

  function deleteBase(id: number) {
    setBases((items) => items.filter((item) => item.id !== id));
    showMessage("Base removed");
  }

  function toggleUser(id: number) {
    setUsers((items) =>
      items.map((user) =>
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

    showMessage("User status updated");
  }

  if (!loggedIn) {
    return (
      <main className="ss-login">
        <div className="ss-login-card">
          <div className="ss-logo">
            <div className="ss-logo-icon">S</div>
            <div>
              <h1>SupplyShield AI</h1>
              <span>Defence Logistics Intelligence</span>
            </div>
          </div>

          <div className="ss-demo-label">
            SYNTHETIC DEMO ENVIRONMENT
          </div>

          <h2>Choose your command role</h2>

          <div className="ss-role-grid">
            {(Object.keys(roleMeta) as Role[]).map((item) => (
              <button
                key={item}
                className={`ss-role-card ${
                  role === item ? "selected" : ""
                }`}
                onClick={() => setRole(item)}
              >
                <div className="ss-role-avatar">
                  {roleMeta[item].initials}
                </div>

                <strong>{roleMeta[item].badge}</strong>

                <span>{roleMeta[item].title}</span>
              </button>
            ))}
          </div>

          <button
            className="ss-primary-btn ss-login-btn"
            onClick={() => setLoggedIn(true)}
          >
            Enter Dashboard →
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`ss-app ${
        theme === "light" ? "ss-light" : "ss-dark"
      }`}
    >
      <aside className="ss-sidebar">
        <div className="ss-brand">
          <div className="ss-logo-icon">S</div>
          <div>
            <strong>SupplyShield</strong>
            <small>AI Logistics</small>
          </div>
        </div>

        <div className="ss-user-mini">
          <div className="ss-avatar">{meta.initials}</div>

          <div>
            <strong>{meta.badge}</strong>
            <small>Online</small>
          </div>
        </div>

        <nav className="ss-nav">
          <NavButton
            label="Overview"
            active={activePage === "Overview"}
            onClick={() => setActivePage("Overview")}
            icon="⌂"
          />

          <NavButton
            label="Supply Chain"
            active={activePage === "Supply Chain"}
            onClick={() => setActivePage("Supply Chain")}
            icon="⇄"
          />

          <NavButton
            label="Inventory"
            active={activePage === "Inventory"}
            onClick={() => setActivePage("Inventory")}
            icon="▣"
          />

          <NavButton
            label="Routes"
            active={activePage === "Routes"}
            onClick={() => setActivePage("Routes")}
            icon="⌁"
          />

          <NavButton
            label="Risk Alerts"
            active={activePage === "Risk Alerts"}
            onClick={() => setActivePage("Risk Alerts")}
            icon="⚠"
            count={openAlerts}
          />

          <NavButton
            label="Analytics"
            active={activePage === "Analytics"}
            onClick={() => setActivePage("Analytics")}
            icon="▥"
          />

          <NavButton
            label="Forecast"
            active={activePage === "Forecast"}
            onClick={() => setActivePage("Forecast")}
            icon="◔"
          />

          <NavButton
            label="Scenarios"
            active={activePage === "Scenarios"}
            onClick={() => setActivePage("Scenarios")}
            icon="◇"
          />

          <NavButton
            label="Reports"
            active={activePage === "Reports"}
            onClick={() => setActivePage("Reports")}
            icon="▤"
          />

          {role === "admin" && (
            <>
              <div className="ss-nav-title">
                ADMIN CONTROLS
              </div>

              <NavButton
                label="Manage System"
                active={activePage === "Manage System"}
                onClick={() =>
                  setActivePage("Manage System")
                }
                icon="⚙"
              />

              <NavButton
                label="User Management"
                active={activePage === "User Management"}
                onClick={() =>
                  setActivePage("User Management")
                }
                icon="♙"
              />
            </>
          )}

          {role === "captain" && (
            <NavButton
              label="Supply Requests"
              active={activePage === "Supply Requests"}
              onClick={() =>
                setActivePage("Supply Requests")
              }
              icon="＋"
            />
          )}
        </nav>

        <div className="ss-sidebar-bottom">
          <button
            className="ss-theme-btn"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          >
            {theme === "dark" ? "☀ Light Mode" : "☾ Dark Mode"}
          </button>

          <button
            className="ss-signout"
            onClick={() => setLoggedIn(false)}
          >
            ⇥ Sign out
          </button>
        </div>
      </aside>

      <section className="ss-content">
        <header className="ss-header">
          <div>
            <h1>{meta.title}</h1>
            <p>{meta.subtitle}</p>
          </div>

          <div className="ss-header-actions">
            <span className="ss-live">
              <i />
              LIVE DEMO DATA
            </span>

            <div className="ss-header-avatar">
              {meta.initials}
            </div>
          </div>
        </header>

        {message && (
          <div className="ss-toast">
            ✓ {message}
          </div>
        )}

        {activePage === "Overview" && (
          <Overview
            role={role}
            inventory={inventory}
            routes={routes}
            alerts={alerts}
            bases={bases}
            totalInventory={totalInventory}
            activeRoutes={activeRoutes}
            openAlerts={openAlerts}
            averageReadiness={averageReadiness}
            onNavigate={setActivePage}
          />
        )}

        {activePage === "Inventory" && (
          <InventoryPage
            inventory={filteredInventory}
            search={search}
            setSearch={setSearch}
            isAdmin={role === "admin"}
            onAdd={() => {
              setEditingInventory(null);
              setModal("inventory");
            }}
            onEdit={(item) => {
              setEditingInventory(item);
              setModal("inventory");
            }}
            onDelete={deleteInventory}
          />
        )}

        {activePage === "Routes" && (
          <RoutesPage
            routes={routes}
            isAdmin={role === "admin"}
            onAdd={() => {
              setEditingRoute(null);
              setModal("route");
            }}
            onEdit={(route) => {
              setEditingRoute(route);
              setModal("route");
            }}
            onDelete={deleteRoute}
          />
        )}

        {activePage === "Risk Alerts" && (
          <AlertsPage
            alerts={alerts}
            isAdmin={role === "admin"}
            onResolve={resolveAlert}
            onAdd={() => setModal("alert")}
          />
        )}

        {activePage === "Analytics" && (
          <AnalyticsPage
            inventory={inventory}
            routes={routes}
            bases={bases}
          />
        )}

        {activePage === "Forecast" && (
          <ForecastPage />
        )}

        {activePage === "Scenarios" && (
          <ScenarioPage
            onRun={() => setModal("scenario")}
          />
        )}

        {activePage === "Reports" && (
          <ReportsPage
            inventory={inventory}
            routes={routes}
            alerts={alerts}
            bases={bases}
          />
        )}

        {activePage === "Supply Chain" && (
          <SupplyChainPage
            inventory={inventory}
            routes={routes}
            bases={bases}
          />
        )}

        {activePage === "Manage System" &&
          role === "admin" && (
            <ManageSystem
              inventory={inventory}
              routes={routes}
              alerts={alerts}
              bases={bases}
              onInventory={() => {
                setEditingInventory(null);
                setModal("inventory");
              }}
              onRoute={() => {
                setEditingRoute(null);
                setModal("route");
              }}
              onAlert={() => setModal("alert")}
              onBase={() => setModal("base")}
              onNavigate={setActivePage}
            />
          )}

        {activePage === "User Management" &&
          role === "admin" && (
            <UserManagement
              users={users}
              onAdd={() => setModal("user")}
              onToggle={toggleUser}
            />
          )}

        {activePage === "Supply Requests" &&
          role === "captain" && (
            <SupplyRequests
              onMessage={showMessage}
            />
          )}
      </section>

      {modal === "inventory" && (
        <InventoryModal
          item={editingInventory}
          onClose={() => setModal(null)}
          onSave={(item) => {
            if (editingInventory) {
              setInventory((items) =>
                items.map((x) =>
                  x.id === item.id ? item : x
                )
              );
              showMessage("Inventory updated");
            } else {
              setInventory((items) => [
                ...items,
                {
                  ...item,
                  id: Date.now(),
                },
              ]);
              showMessage("Inventory added");
            }

            setModal(null);
          }}
        />
      )}

      {modal === "route" && (
        <RouteModal
          route={editingRoute}
          onClose={() => setModal(null)}
          onSave={(route) => {
            if (editingRoute) {
              setRoutes((items) =>
                items.map((x) =>
                  x.id === route.id ? route : x
                )
              );
              showMessage("Route updated");
            } else {
              setRoutes((items) => [
                ...items,
                {
                  ...route,
                  id: Date.now(),
                },
              ]);
              showMessage("Route added");
            }

            setModal(null);
          }}
        />
      )}

      {modal === "alert" && (
        <AlertModal
          onClose={() => setModal(null)}
          onSave={(alert) => {
            setAlerts((items) => [
              ...items,
              {
                ...alert,
                id: Date.now(),
              },
            ]);

            setModal(null);
            showMessage("Risk alert created");
          }}
        />
      )}

      {modal === "base" && (
        <BaseModal
          onClose={() => setModal(null)}
          onSave={(base) => {
            setBases((items) => [
              ...items,
              {
                ...base,
                id: Date.now(),
              },
            ]);

            setModal(null);
            showMessage("Base added");
          }}
        />
      )}

      {modal === "user" && (
        <UserModal
          onClose={() => setModal(null)}
          onSave={(user) => {
            setUsers((items) => [
              ...items,
              {
                ...user,
                id: Date.now(),
              },
            ]);

            setModal(null);
            showMessage("User added");
          }}
        />
      )}

      {modal === "scenario" && (
        <ScenarioResult
          onClose={() => setModal(null)}
        />
      )}
    </main>
  );
}

function NavButton({
  label,
  active,
  onClick,
  icon,
  count,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: string;
  count?: number;
}) {
  return (
    <button
      className={`ss-nav-btn ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="ss-nav-icon">{icon}</span>
      <span>{label}</span>

      {count !== undefined && count > 0 && (
        <b>{count}</b>
      )}
    </button>
  );
}

function Overview({
  role,
  inventory,
  routes,
  alerts,
  bases,
  totalInventory,
  activeRoutes,
  openAlerts,
  averageReadiness,
  onNavigate,
}: {
  role: Role;
  inventory: InventoryItem[];
  routes: RouteItem[];
  alerts: AlertItem[];
  bases: BaseItem[];
  totalInventory: number;
  activeRoutes: number;
  openAlerts: number;
  averageReadiness: number;
  onNavigate: (page: string) => void;
}) {
  return (
    <div className="ss-page">
      <div className="ss-kpi-grid">
        <KPI
          title="Total Inventory"
          value={totalInventory.toLocaleString()}
          unit="units"
          change="+8.4%"
          icon="▣"
        />

        <KPI
          title="Active Routes"
          value={String(activeRoutes)}
          unit={`/ ${routes.length}`}
          change="+12%"
          icon="⇄"
        />

        <KPI
          title="Open Risk Alerts"
          value={String(openAlerts)}
          unit="alerts"
          change="-14%"
          icon="⚠"
          danger
        />

        <KPI
          title="Operational Readiness"
          value={`${averageReadiness}%`}
          unit=""
          change="+5.2%"
          icon="◉"
        />
      </div>

      <div className="ss-main-grid">
        <Panel
          title="Synthetic Logistics Map"
          subtitle="Demo operational network"
          action={
            <button
              className="ss-small-btn"
              onClick={() => onNavigate("Routes")}
            >
              View Routes
            </button>
          }
        >
          <div className="ss-map">
            <div className="ss-map-grid" />

            {bases.map((base, index) => (
              <div
                className={`ss-map-base base-${index}`}
                key={base.id}
              >
                <span />
                <strong>{base.name}</strong>
                <small>{base.readiness}% ready</small>
              </div>
            ))}

            <div className="ss-map-route route-1" />
            <div className="ss-map-route route-2" />
            <div className="ss-map-route route-3" />
          </div>
        </Panel>

        <Panel
          title="AI Risk Alerts"
          subtitle="Synthetic intelligence alerts"
          action={
            <button
              className="ss-small-btn"
              onClick={() => onNavigate("Risk Alerts")}
            >
              View All
            </button>
          }
        >
          <div className="ss-alert-list">
            {alerts.slice(0, 4).map((alert) => (
              <div
                className="ss-alert-row"
                key={alert.id}
              >
                <div
                  className={`ss-severity ${alert.severity.toLowerCase()}`}
                >
                  !
                </div>

                <div className="ss-alert-info">
                  <strong>{alert.title}</strong>
                  <span>{alert.location}</span>
                </div>

                <em>{alert.status}</em>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="ss-main-grid">
        <Panel
          title="AI Demand Forecast"
          subtitle="Next 7 days • Synthetic prediction"
          action={
            <button
              className="ss-small-btn"
              onClick={() => onNavigate("Forecast")}
            >
              Details
            </button>
          }
        >
          <div className="ss-chart">
            {forecastData.map((item) => (
              <div className="ss-bar-wrap" key={item.day}>
                <div
                  className="ss-bar"
                  style={{
                    height: `${item.demand / 7}px`,
                  }}
                />
                <small>{item.day.replace("Day ", "D")}</small>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Operational Readiness"
          subtitle={`${roleMeta[role].badge} view`}
        >
          <div className="ss-readiness-list">
            {bases.map((base) => (
              <div key={base.id}>
                <div className="ss-progress-head">
                  <span>{base.name}</span>
                  <strong>{base.readiness}%</strong>
                </div>

                <div className="ss-progress">
                  <span
                    style={{
                      width: `${base.readiness}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="ss-info-banner">
        <strong>Demo Mode</strong>
        <span>
          All information shown in this dashboard is
          synthetic demo data for prototype/SIH
          presentation purposes.
        </span>
      </div>
    </div>
  );
}

function KPI({
  title,
  value,
  unit,
  change,
  icon,
  danger,
}: {
  title: string;
  value: string;
  unit: string;
  change: string;
  icon: string;
  danger?: boolean;
}) {
  return (
    <div className="ss-kpi">
      <div className="ss-kpi-top">
        <span>{title}</span>
        <div className={`ss-kpi-icon ${danger ? "danger" : ""}`}>
          {icon}
        </div>
      </div>

      <div className="ss-kpi-value">
        {value}
        <small>{unit}</small>
      </div>

      <div className="ss-kpi-change">
        {change} <span>vs previous period</span>
      </div>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="ss-panel">
      <div className="ss-panel-head">
        <div>
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>

        {action}
      </div>

      {children}
    </section>
  );
}

function InventoryPage({
  inventory,
  search,
  setSearch,
  isAdmin,
  onAdd,
  onEdit,
  onDelete,
}: {
  inventory: InventoryItem[];
  search: string;
  setSearch: (value: string) => void;
  isAdmin: boolean;
  onAdd: () => void;
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="ss-page">
      <div className="ss-page-title">
        <div>
          <h2>Inventory Management</h2>
          <p>
            Synthetic inventory data and stock monitoring.
          </p>
        </div>

        {isAdmin && (
          <button
            className="ss-primary-btn"
            onClick={onAdd}
          >
            + Add Inventory
          </button>
        )}
      </div>

      <div className="ss-toolbar">
        <input
          className="ss-input"
          placeholder="Search inventory..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="ss-table-wrap">
        <table className="ss-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Minimum</th>
              <th>Location</th>
              <th>Status</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {inventory.map((item) => {
              const low = item.quantity < item.minStock;

              return (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>
                  </td>
                  <td>{item.category}</td>
                  <td>
                    {item.quantity.toLocaleString()} {item.unit}
                  </td>
                  <td>
                    {item.minStock.toLocaleString()} {item.unit}
                  </td>
                  <td>{item.location}</td>
                  <td>
                    <span
                      className={`ss-status ${
                        low ? "danger" : "success"
                      }`}
                    >
                      {low ? "LOW STOCK" : "HEALTHY"}
                    </span>
                  </td>

                  {isAdmin && (
                    <td>
                      <button
                        className="ss-action-btn"
                        onClick={() => onEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="ss-action-btn danger-text"
                        onClick={() => onDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RoutesPage({
  routes,
  isAdmin,
  onAdd,
  onEdit,
  onDelete,
}: {
  routes: RouteItem[];
  isAdmin: boolean;
  onAdd: () => void;
  onEdit: (route: RouteItem) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="ss-page">
      <div className="ss-page-title">
        <div>
          <h2>Logistics Routes</h2>
          <p>Monitor synthetic supply movement.</p>
        </div>

        {isAdmin && (
          <button
            className="ss-primary-btn"
            onClick={onAdd}
          >
            + Add Route
          </button>
        )}
      </div>

      <div className="ss-route-grid">
        {routes.map((route) => (
          <div className="ss-route-card" key={route.id}>
            <div className="ss-route-top">
              <strong>{route.name}</strong>

              <span
                className={`ss-status ${route.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {route.status}
              </span>
            </div>

            <div className="ss-route-path">
              <span>{route.from}</span>
              <b>→</b>
              <span>{route.to}</span>
            </div>

            <div className="ss-route-bottom">
              <span>ETA</span>
              <strong>{route.eta}</strong>
            </div>

            {isAdmin && (
              <div className="ss-route-actions">
                <button
                  className="ss-action-btn"
                  onClick={() => onEdit(route)}
                >
                  Edit
                </button>

                <button
                  className="ss-action-btn danger-text"
                  onClick={() => onDelete(route.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertsPage({
  alerts,
  isAdmin,
  onResolve,
  onAdd,
}: {
  alerts: AlertItem[];
  isAdmin: boolean;
  onResolve: (id: number) => void;
  onAdd: () => void;
}) {
  return (
    <div className="ss-page">
      <div className="ss-page-title">
        <div>
          <h2>Risk Alerts</h2>
          <p>AI-generated synthetic logistics alerts.</p>
        </div>

        {isAdmin && (
          <button
            className="ss-primary-btn"
            onClick={onAdd}
          >
            + Create Alert
          </button>
        )}
      </div>

      <div className="ss-alert-page">
        {alerts.map((alert) => (
          <div className="ss-alert-card" key={alert.id}>
            <div
              className={`ss-severity ${alert.severity.toLowerCase()}`}
            >
              !
            </div>

            <div>
              <strong>{alert.title}</strong>
              <span>{alert.location}</span>
            </div>

            <span
              className={`ss-status ${alert.severity.toLowerCase()}`}
            >
              {alert.severity}
            </span>

            <span className="ss-status">
              {alert.status}
            </span>

            {alert.status === "Open" && (
              <button
                className="ss-action-btn"
                onClick={() => onResolve(alert.id)}
              >
                Resolve
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsPage({
  inventory,
  routes,
  bases,
}: {
  inventory: InventoryItem[];
  routes: RouteItem[];
  bases: BaseItem[];
}) {
  const maxStock = Math.max(
    ...inventory.map((item) => item.quantity)
  );

  return (
    <div className="ss-page">
      <div className="ss-page-title">
        <div>
          <h2>Analytics</h2>
          <p>Synthetic operational analytics.</p>
        </div>
      </div>

      <div className="ss-main-grid">
        <Panel
          title="Inventory Distribution"
          subtitle="Current synthetic stock"
        >
          <div className="ss-horizontal-bars">
            {inventory.map((item) => (
              <div key={item.id}>
                <div className="ss-progress-head">
                  <span>{item.name}</span>
                  <strong>{item.quantity}</strong>
                </div>

                <div className="ss-progress">
                  <span
                    style={{
                      width: `${
                        (item.quantity / maxStock) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Base Readiness"
          subtitle="Synthetic readiness score"
        >
          <div className="ss-horizontal-bars">
            {bases.map((base) => (
              <div key={base.id}>
                <div className="ss-progress-head">
                  <span>{base.name}</span>
                  <strong>{base.readiness}%</strong>
                </div>

                <div className="ss-progress">
                  <span
                    style={{
                      width: `${base.readiness}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="ss-stat-grid">
        <div className="ss-stat">
          <strong>{routes.length}</strong>
          <span>Total Routes</span>
        </div>

        <div className="ss-stat">
          <strong>
            {routes.filter((r) => r.status === "Delayed").length}
          </strong>
          <span>Delayed Routes</span>
        </div>

        <div className="ss-stat">
          <strong>{inventory.length}</strong>
          <span>Inventory Items</span>
        </div>

        <div className="ss-stat">
          <strong>{bases.length}</strong>
          <span>Active Bases</span>
        </div>
      </div>
    </div>
  );
}

function ForecastPage() {
  const max = Math.max(
    ...forecastData.map((item) => item.demand)
  );

  return (
    <div className="ss-page">
      <div className="ss-page-title">
        <div>
          <h2>AI Demand Forecast</h2>
          <p>
            Synthetic 7-day demand prediction for prototype
            demonstration.
          </p>
        </div>
      </div>

      <div className="ss-panel">
        <div className="ss-panel-head">
          <div>
            <h3>Predicted Demand</h3>
            <p>Units required per day</p>
          </div>

          <span className="ss-ai-badge">
            AI PREDICTION
          </span>
        </div>

        <div className="ss-big-chart">
          {forecastData.map((item) => (
            <div className="ss-forecast-column" key={item.day}>
              <strong>{item.demand}</strong>

              <div className="ss-forecast-track">
                <span
                  style={{
                    height: `${(item.demand / max) * 100}%`,
                  }}
                />
              </div>

              <small>{item.day}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScenarioPage({
  onRun,
}: {
  onRun: () => void;
}) {
  return (
    <div className="ss-page">
      <div className="ss-page-title">
        <div>
          <h2>Scenario Simulation</h2>
          <p>Run synthetic what-if logistics scenarios.</p>
        </div>

        <button
          className="ss-primary-btn"
          onClick={onRun}
        >
          Run Simulation
        </button>
      </div>

      <div className="ss-scenario-grid">
        <ScenarioCard
          title="Route Blockage"
          description="Simulate closure of a critical supply route."
          impact="High"
        />

        <ScenarioCard
          title="Demand Spike"
          description="Simulate sudden 25% increase in demand."
          impact="Medium"
        />

        <ScenarioCard
          title="Fuel Shortage"
          description="Simulate reduction in fuel availability."
          impact="Critical"
        />
      </div>
    </div>
  );
}

function ScenarioCard({
  title,
  description,
  impact,
}: {
  title: string;
  description: string;
  impact: string;
}) {
  return (
    <div className="ss-scenario-card">
      <div className="ss-scenario-icon">◇</div>
      <h3>{title}</h3>
      <p>{description}</p>

      <span className={`ss-status ${impact.toLowerCase()}`}>
        {impact} Impact
      </span>
    </div>
  );
}

function ReportsPage({
  inventory,
  routes,
  alerts,
  bases,
}: {
  inventory: InventoryItem[];
  routes: RouteItem[];
  alerts: AlertItem[];
  bases: BaseItem[];
}) {
  function downloadReport() {
    const report = `
SUPPLYSHIELD AI
SYNTHETIC LOGISTICS REPORT
--------------------------------

Inventory Items: ${inventory.length}
Routes: ${routes.length}
Risk Alerts: ${alerts.length}
Bases: ${bases.length}

Generated for prototype demonstration.
All information is synthetic demo data.
`;

    const blob = new Blob([report], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "supplyshield-demo-report.txt";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="ss-page">
      <div className="ss-page-title">
        <div>
          <h2>Reports</h2>
          <p>Generate synthetic logistics reports.</p>
        </div>

        <button
          className="ss-primary-btn"
          onClick={downloadReport}
        >
          ↓ Download Report
        </button>
      </div>

      <div className="ss-stat-grid">
        <div className="ss-stat">
          <strong>{inventory.length}</strong>
          <span>Inventory Records</span>
        </div>

        <div className="ss-stat">
          <strong>{routes.length}</strong>
          <span>Route Records</span>
        </div>

        <div className="ss-stat">
          <strong>{alerts.length}</strong>
          <span>Alert Records</span>
        </div>

        <div className="ss-stat">
          <strong>{bases.length}</strong>
          <span>Base Records</span>
        </div>
      </div>
    </div>
  );
}

function SupplyChainPage({
  inventory,
  routes,
  bases,
}: {
  inventory: InventoryItem[];
  routes: RouteItem[];
  bases: BaseItem[];
}) {
  return (
    <div className="ss-page">
      <div className="ss-page-title">
        <div>
          <h2>Supply Chain</h2>
          <p>End-to-end synthetic logistics flow.</p>
        </div>
      </div>

      <div className="ss-flow">
        <FlowBox
          title="Central Depot"
          value={`${inventory.length} items`}
        />

        <div className="ss-flow-arrow">→</div>

        <FlowBox
          title="Transport Network"
          value={`${routes.length} routes`}
        />

        <div className="ss-flow-arrow">→</div>

        <FlowBox
          title="Forward Bases"
          value={`${bases.length} bases`}
        />
      </div>
    </div>
  );
}

function ManageSystem({
  inventory,
  routes,
  alerts,
  bases,
  onInventory,
  onRoute,
  onAlert,
  onBase,
  onNavigate,
}: {
  inventory: InventoryItem[];
  routes: RouteItem[];
  alerts: AlertItem[];
  bases: BaseItem[];
  onInventory: () => void;
  onRoute: () => void;
  onAlert: () => void;
  onBase: () => void;
  onNavigate: (page: string) => void;
}) {
  return (
    <div className="ss-page">
      <div className="ss-page-title">
        <div>
          <h2>Manage System</h2>
          <p>
            Admin-only controls for synthetic dashboard
            data.
          </p>
        </div>
      </div>

      <div className="ss-admin-grid">
        <AdminCard
          title="Inventory"
          count={inventory.length}
          description="Add and modify stock records."
          onAdd={onInventory}
          onView={() => onNavigate("Inventory")}
        />

        <AdminCard
          title="Routes"
          count={routes.length}
          description="Create and update logistics routes."
          onAdd={onRoute}
          onView={() => onNavigate("Routes")}
        />

        <AdminCard
          title="Risk Alerts"
          count={alerts.length}
          description="Create synthetic risk alerts."
          onAdd={onAlert}
          onView={() => onNavigate("Risk Alerts")}
        />

        <AdminCard
          title="Bases"
          count={bases.length}
          description="Add new operational bases."
          onAdd={onBase}
          onView={() => onNavigate("Overview")}
        />

        <AdminCard
          title="Users"
          count={3}
          description="Manage dashboard users and roles."
          onAdd={() => onNavigate("User Management")}
          onView={() => onNavigate("User Management")}
        />
      </div>

      <div className="ss-info-banner">
        <strong>Admin Access</strong>
        <span>
          Changes are stored in the current browser session
          only. Supabase persistence can be connected later.
        </span>
      </div>
    </div>
  );
}

function AdminCard({
  title,
  count,
  description,
  onAdd,
  onView,
}: {
  title: string;
  count: number;
  description: string;
  onAdd: () => void;
  onView: () => void;
}) {
  return (
    <div className="ss-admin-card">
      <div className="ss-admin-card-top">
        <div className="ss-admin-icon">⚙</div>

        <strong>{count}</strong>
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <div className="ss-card-actions">
        <button
          className="ss-primary-btn"
          onClick={onAdd}
        >
          + Add
        </button>

        <button
          className="ss-small-btn"
          onClick={onView}
        >
          Manage
        </button>
      </div>
    </div>
  );
}

function UserManagement({
  users,
  onAdd,
  onToggle,
}: {
  users: UserItem[];
  onAdd: () => void;
  onToggle: (id: number) => void;
}) {
  return (
    <div className="ss-page">
      <div className="ss-page-title">
        <div>
          <h2>User Management</h2>
          <p>Admin-only role management.</p>
        </div>

        <button
          className="ss-primary-btn"
          onClick={onAdd}
        >
          + Add User
        </button>
      </div>

      <div className="ss-table-wrap">
        <table className="ss-table">
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
                  <span className="ss-role-tag">
                    {user.role.toUpperCase()}
                  </span>
                </td>

                <td>
                  <span
                    className={`ss-status ${
                      user.status === "Active"
                        ? "success"
                        : "danger"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td>
                  <button
                    className="ss-action-btn"
                    onClick={() => onToggle(user.id)}
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SupplyRequests({
  onMessage,
}: {
  onMessage: (message: string) => void;
}) {
  const requests = [
    {
      item: "Fuel",
      quantity: "250 L",
      priority: "High",
      status: "Pending",
    },
    {
      item: "Medical Supplies",
      quantity: "120 Units",
      priority: "Critical",
      status: "Approved",
    },
    {
      item: "Food Supplies",
      quantity: "300 Units",
      priority: "Medium",
      status: "Pending",
    },
  ];

  return (
    <div className="ss-page">
      <div className="ss-page-title">
        <div>
          <h2>Supply Requests</h2>
          <p>Captain field supply requests.</p>
        </div>

        <button
          className="ss-primary-btn"
          onClick={() =>
            onMessage("New supply request created")
          }
        >
          + New Request
        </button>
      </div>

      <div className="ss-alert-page">
        {requests.map((request, index) => (
          <div className="ss-alert-card" key={index}>
            <div className="ss-severity high">
              +
            </div>

            <div>
              <strong>{request.item}</strong>
              <span>{request.quantity}</span>
            </div>

            <span
              className={`ss-status ${request.priority.toLowerCase()}`}
            >
              {request.priority}
            </span>

            <span className="ss-status">
              {request.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InventoryModal({
  item,
  onClose,
  onSave,
}: {
  item: InventoryItem | null;
  onClose: () => void;
  onSave: (item: InventoryItem) => void;
}) {
  const [name, setName] = useState(item?.name || "");
  const [category, setCategory] = useState(
    item?.category || "General"
  );
  const [quantity, setQuantity] = useState(
    String(item?.quantity || "")
  );
  const [minStock, setMinStock] = useState(
    String(item?.minStock || "")
  );
  const [unit, setUnit] = useState(item?.unit || "Units");
  const [location, setLocation] = useState(
    item?.location || "Central Base"
  );

  return (
    <Modal
      title={item ? "Edit Inventory" : "Add Inventory"}
      onClose={onClose}
    >
      <Field
        label="Item Name"
        value={name}
        onChange={setName}
      />

      <Field
        label="Category"
        value={category}
        onChange={setCategory}
      />

      <Field
        label="Quantity"
        value={quantity}
        onChange={setQuantity}
        type="number"
      />

      <Field
        label="Minimum Stock"
        value={minStock}
        onChange={setMinStock}
        type="number"
      />

      <Field
        label="Unit"
        value={unit}
        onChange={setUnit}
      />

      <Field
        label="Location"
        value={location}
        onChange={setLocation}
      />

      <ModalActions
        onClose={onClose}
        onSave={() =>
          onSave({
            id: item?.id || 0,
            name,
            category,
            quantity: Number(quantity),
            minStock: Number(minStock),
            unit,
            location,
          })
        }
      />
    </Modal>
  );
}

function RouteModal({
  route,
  onClose,
  onSave,
}: {
  route: RouteItem | null;
  onClose: () => void;
  onSave: (route: RouteItem) => void;
}) {
  const [name, setName] = useState(
    route?.name || "Route Echo"
  );

  const [from, setFrom] = useState(
    route?.from || "Central Base"
  );

  const [to, setTo] = useState(
    route?.to || "Northern Base"
  );

  const [status, setStatus] =
    useState<RouteItem["status"]>(
      route?.status || "Active"
    );

  const [eta, setEta] = useState(
    route?.eta || "4h 00m"
  );

  return (
    <Modal
      title={route ? "Edit Route" : "Add Route"}
      onClose={onClose}
    >
      <Field
        label="Route Name"
        value={name}
        onChange={setName}
      />

      <Field
        label="Origin"
        value={from}
        onChange={setFrom}
      />

      <Field
        label="Destination"
        value={to}
        onChange={setTo}
      />

      <label className="ss-field">
        <span>Status</span>

        <select
          className="ss-input"
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as RouteItem["status"]
            )
          }
        >
          <option>Active</option>
          <option>Delayed</option>
          <option>At Risk</option>
          <option>Completed</option>
        </select>
      </label>

      <Field
        label="ETA"
        value={eta}
        onChange={setEta}
      />

      <ModalActions
        onClose={onClose}
        onSave={() =>
          onSave({
            id: route?.id || 0,
            name,
            from,
            to,
            status,
            eta,
          })
        }
      />
    </Modal>
  );
}

function AlertModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (alert: Omit<AlertItem, "id">) => void;
}) {
  const [title, setTitle] = useState("");
  const [severity, setSeverity] =
    useState<AlertItem["severity"]>("High");

  const [location, setLocation] =
    useState("Central Base");

  return (
    <Modal title="Create Risk Alert" onClose={onClose}>
      <Field
        label="Alert Title"
        value={title}
        onChange={setTitle}
      />

      <label className="ss-field">
        <span>Severity</span>

        <select
          className="ss-input"
          value={severity}
          onChange={(e) =>
            setSeverity(
              e.target.value as AlertItem["severity"]
            )
          }
        >
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </label>

      <Field
        label="Location"
        value={location}
        onChange={setLocation}
      />

      <ModalActions
        onClose={onClose}
        onSave={() =>
          onSave({
            title: title || "New synthetic risk alert",
            severity,
            location,
            status: "Open",
          })
        }
      />
    </Modal>
  );
}

function BaseModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (base: Omit<BaseItem, "id">) => void;
}) {
  const [name, setName] = useState("Southern Base");
  const [location, setLocation] =
    useState("Sector S-05");

  const [readiness, setReadiness] = useState("70");
  const [stock, setStock] = useState("70");

  return (
    <Modal title="Add Operational Base" onClose={onClose}>
      <Field
        label="Base Name"
        value={name}
        onChange={setName}
      />

      <Field
        label="Location"
        value={location}
        onChange={setLocation}
      />

      <Field
        label="Readiness %"
        value={readiness}
        onChange={setReadiness}
        type="number"
      />

      <Field
        label="Stock %"
        value={stock}
        onChange={setStock}
        type="number"
      />

      <ModalActions
        onClose={onClose}
        onSave={() =>
          onSave({
            name,
            location,
            readiness: Number(readiness),
            stock: Number(stock),
          })
        }
      />
    </Modal>
  );
}

function UserModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (user: Omit<UserItem, "id">) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [role, setRole] = useState<Role>("captain");

  return (
    <Modal title="Add User" onClose={onClose}>
      <Field
        label="Full Name"
        value={name}
        onChange={setName}
      />

      <Field
        label="Email"
        value={email}
        onChange={setEmail}
      />

      <label className="ss-field">
        <span>Role</span>

        <select
          className="ss-input"
          value={role}
          onChange={(e) =>
            setRole(e.target.value as Role)
          }
        >
          <option value="admin">Admin</option>
          <option value="commander">Commander</option>
          <option value="captain">Captain</option>
        </select>
      </label>

      <ModalActions
        onClose={onClose}
        onSave={() =>
          onSave({
            name: name || "New User",
            email: email || "user@supplyshield.ai",
            role,
            status: "Active",
          })
        }
      />
    </Modal>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="ss-modal-overlay">
      <div className="ss-modal">
        <div className="ss-modal-head">
          <h2>{title}</h2>

          <button
            className="ss-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="ss-modal-body">{children}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="ss-field">
      <span>{label}</span>

      <input
        className="ss-input"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function ModalActions({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: () => void;
}) {
  return (
    <div className="ss-modal-actions">
      <button
        className="ss-small-btn"
        onClick={onClose}
      >
        Cancel
      </button>

      <button
        className="ss-primary-btn"
        onClick={onSave}
      >
        Save Changes
      </button>
    </div>
  );
}

function ScenarioResult({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <Modal
      title="Simulation Result"
      onClose={onClose}
    >
      <div className="ss-simulation">
        <div className="ss-simulation-step">
          <strong>1</strong>
          <span>Route Delta blocked</span>
        </div>

        <div className="ss-simulation-step">
          <strong>2</strong>
          <span>2 bases affected</span>
        </div>

        <div className="ss-simulation-step">
          <strong>3</strong>
          <span>Estimated delay: 4.5 hours</span>
        </div>

        <div className="ss-simulation-step">
          <strong>4</strong>
          <span>Alternative Route Alpha recommended</span>
        </div>
      </div>

      <div className="ss-modal-actions">
        <button
          className="ss-primary-btn"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
