export default function ForecastPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        AI Demand Forecast
      </h1>

      <div className="rounded-xl border p-6">
        <h2 className="text-xl font-semibold mb-4">
          7-Day Demand Prediction
        </h2>

        <div className="space-y-3">
          <p>💧 Water: 2,500 L</p>
          <p>⛽ Fuel: 1,800 L</p>
          <p>🍚 Food: 950 kg</p>
          <p>💊 Medicine: 320 units</p>
        </div>
      </div>
    </main>
  );
}
