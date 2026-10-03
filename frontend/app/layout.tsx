import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <aside className="sidebar">
            <div className="brand">SIH26251<br/>Predictive Logistics</div>
            <nav className="nav">
              <Link href="/dashboard">🏠 Command Dashboard</Link>
              <Link href="/inventory">📦 Inventory & Forecast</Link>
              <Link href="/logistics-map">🗺️ Logistics & GIS</Link>
              <Link href="/alerts">🚨 Alerts & Decision</Link>
              <Link href="/scenarios">🔄 What-if Scenarios</Link>
              <Link href="/analytics">📊 Analytics</Link>
            </nav>
          </aside>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
