export default function AlertsPage() {
  const alerts = [
    {
      priority: "CRITICAL",
      message: "Water shortage predicted at Forward Base C.",
    },
    {
      priority: "HIGH",
      message: "Route A has high weather risk.",
    },
    {
      priority: "MEDIUM",
      message: "Fuel inventory below recommended level.",
    },
  ];

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Alerts & Decisions
      </h1>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className="rounded-xl border p-5">
            <p className="font-bold">{alert.priority}</p>
            <p className="mt-2">{alert.message}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
