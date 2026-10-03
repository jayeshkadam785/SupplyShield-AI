export default function AnalyticsPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Logistics Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border p-5">
          <p className="text-sm text-gray-500">Average Delivery Time</p>
          <h2 className="text-2xl font-bold mt-2">8.4 hrs</h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-gray-500">Route Risk</p>
          <h2 className="text-2xl font-bold mt-2">Medium</h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-gray-500">Forecast Accuracy</p>
          <h2 className="text-2xl font-bold mt-2">91%</h2>
        </div>
      </div>
    </main>
  );
}
