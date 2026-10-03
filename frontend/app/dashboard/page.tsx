export default function DashboardPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        SupplyShield AI
      </h1>

      <p className="text-gray-500 mb-6">
        Predictive Logistics & Forward Supply Chain Dashboard
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl border p-5">
          <p className="text-sm text-gray-500">Forward Bases</p>
          <h2 className="text-3xl font-bold mt-2">12</h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-gray-500">Critical Alerts</p>
          <h2 className="text-3xl font-bold mt-2">3</h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-gray-500">Active Vehicles</p>
          <h2 className="text-3xl font-bold mt-2">18</h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-gray-500">Predicted Shortages</p>
          <h2 className="text-3xl font-bold mt-2">5</h2>
        </div>
      </div>

      <div className="mt-8 rounded-xl border p-6">
        <h2 className="text-xl font-semibold mb-4">
          AI Priority Actions
        </h2>

        <ul className="space-y-3">
          <li>🚨 Forward Base C — Water shortage predicted in 3 days.</li>
          <li>🚚 Truck T-04 recommended for emergency supply.</li>
          <li>🌧️ Route A has elevated weather risk.</li>
          <li>📦 2,500 L water dispatch recommended within 12 hours.</li>
        </ul>
      </div>
    </main>
  );
}
