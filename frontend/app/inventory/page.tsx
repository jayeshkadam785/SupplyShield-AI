export default function InventoryPage() {
  const inventory = [
    {
      item: "Water",
      stock: "8,500 L",
      consumption: "2,500 L/day",
      remaining: "3.4 Days",
      status: "CRITICAL",
    },
    {
      item: "Fuel",
      stock: "7,200 L",
      consumption: "1,800 L/day",
      remaining: "4 Days",
      status: "LOW",
    },
    {
      item: "Food",
      stock: "4,800 kg",
      consumption: "950 kg/day",
      remaining: "5.1 Days",
      status: "NORMAL",
    },
    {
      item: "Medicine",
      stock: "1,250 Units",
      consumption: "320 Units/day",
      remaining: "3.9 Days",
      status: "LOW",
    },
  ];

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">
        Inventory & Forecast
      </h1>

      <p className="mt-2 text-gray-500">
        Monitor inventory levels and predicted supply requirements.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="rounded-xl border p-5">
          <p className="text-gray-500">Total Items</p>
          <h2 className="text-3xl font-bold mt-2">24</h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-gray-500">Low Stock</p>
          <h2 className="text-3xl font-bold mt-2">5</h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-gray-500">Critical Items</p>
          <h2 className="text-3xl font-bold mt-2">2</h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-gray-500">Forecast Horizon</p>
          <h2 className="text-3xl font-bold mt-2">7 Days</h2>
        </div>
      </div>

      <div className="rounded-xl border p-6 mt-8">
        <h2 className="text-xl font-semibold mb-5">
          Current Inventory Status
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Supply</th>
                <th className="p-3">Current Stock</th>
                <th className="p-3">Daily Consumption</th>
                <th className="p-3">Remaining</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {inventory.map((item) => (
                <tr key={item.item} className="border-b">
                  <td className="p-3 font-medium">{item.item}</td>
                  <td className="p-3">{item.stock}</td>
                  <td className="p-3">{item.consumption}</td>
                  <td className="p-3">{item.remaining}</td>
                  <td className="p-3 font-semibold">
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border p-6 mt-8">
        <h2 className="text-xl font-semibold">
          AI Demand Forecast
        </h2>

        <div className="mt-4 space-y-3">
          <p>💧 Water: 17,500 L expected demand</p>
          <p>⛽ Fuel: 12,600 L expected demand</p>
          <p>🍚 Food: 6,650 kg expected demand</p>
          <p>💊 Medicine: 2,240 units expected demand</p>
        </div>
      </div>
    </main>
  );
}
