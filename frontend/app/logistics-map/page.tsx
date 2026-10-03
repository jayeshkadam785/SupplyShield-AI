export default function LogisticsMapPage() {
  const routes = [
    {
      route: "Route A",
      from: "Central Depot",
      destination: "Forward Base A",
      distance: "145 km",
      eta: "5.5 hrs",
      risk: "MEDIUM",
    },
    {
      route: "Route B",
      from: "Central Depot",
      destination: "Forward Base C",
      distance: "182 km",
      eta: "6.8 hrs",
      risk: "LOW",
    },
    {
      route: "Route C",
      from: "Depot North",
      destination: "Forward Base D",
      distance: "210 km",
      eta: "8.2 hrs",
      risk: "HIGH",
    },
  ];

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">
        Logistics & GIS
      </h1>

      <p className="mt-2 text-gray-500">
        Monitor bases, routes, vehicles and transportation risks.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="rounded-xl border p-5">
          <p className="text-gray-500">Active Routes</p>
          <h2 className="text-3xl font-bold mt-2">14</h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-gray-500">Active Vehicles</p>
          <h2 className="text-3xl font-bold mt-2">18</h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-gray-500">Route Risks</p>
          <h2 className="text-3xl font-bold mt-2">4</h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-gray-500">Deliveries Today</p>
          <h2 className="text-3xl font-bold mt-2">23</h2>
        </div>
      </div>

      <div className="mt-8 h-[400px] rounded-xl border bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl">🗺️</div>

          <h2 className="text-xl font-semibold mt-4">
            Logistics GIS Map
          </h2>

          <p className="text-gray-500 mt-2">
            Leaflet + OpenStreetMap
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Bases • Depots • Routes • Vehicles • Risk Zones
          </p>
        </div>
      </div>

      <div className="rounded-xl border p-6 mt-8">
        <h2 className="text-xl font-semibold mb-5">
          Active Logistics Routes
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Route</th>
                <th className="p-3">From</th>
                <th className="p-3">Destination</th>
                <th className="p-3">Distance</th>
                <th className="p-3">ETA</th>
                <th className="p-3">Risk</th>
              </tr>
            </thead>

            <tbody>
              {routes.map((route) => (
                <tr key={route.route} className="border-b">
                  <td className="p-3 font-medium">
                    {route.route}
                  </td>
                  <td className="p-3">{route.from}</td>
                  <td className="p-3">{route.destination}</td>
                  <td className="p-3">{route.distance}</td>
                  <td className="p-3">{route.eta}</td>
                  <td className="p-3 font-semibold">
                    {route.risk}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border p-6 mt-8">
        <h2 className="text-xl font-semibold">
          🤖 AI Route Recommendation
        </h2>

        <p className="mt-4">
          Route B is recommended for Forward Base C.
        </p>

        <div className="mt-3 text-gray-600 space-y-2">
          <p>• Lower weather risk</p>
          <p>• Suitable vehicle capacity available</p>
          <p>• Estimated delivery time: 6.8 hours</p>
          <p>• Route A currently has higher weather risk</p>
        </div>
      </div>
    </main>
  );
}
