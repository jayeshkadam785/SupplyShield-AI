"use client";

import { useState } from "react";

export default function ScenariosPage() {
  const [scenario, setScenario] = useState("normal");

  const scenarios = {
    normal: {
      risk: 25,
      eta: "5.5 hrs",
      shortage: "LOW",
      action: "Continue planned logistics operation.",
    },

    "heavy-rain": {
      risk: 78,
      eta: "7.6 hrs",
      shortage: "MEDIUM",
      action: "Use alternate route and dispatch additional reserve.",
    },

    "route-blocked": {
      risk: 88,
      eta: "8.4 hrs",
      shortage: "HIGH",
      action: "Switch to alternate route immediately.",
    },

    "demand-20": {
      risk: 65,
      eta: "5.8 hrs",
      shortage: "HIGH",
      action: "Increase supply dispatch by approximately 20%.",
    },

    "vehicle-breakdown": {
      risk: 72,
      eta: "9.1 hrs",
      shortage: "MEDIUM",
      action: "Assign replacement vehicle.",
    },
  };

  const result =
    scenarios[scenario as keyof typeof scenarios];

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">
        What-If Scenario Simulation
      </h1>

      <p className="mt-2 text-gray-500">
        Simulate disruptions and evaluate their impact on
        logistics operations.
      </p>

      <div className="rounded-xl border p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Select Scenario
        </h2>

        <select
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
          className="w-full md:w-96 rounded-lg border p-3"
        >
          <option value="normal">
            Normal Operation
          </option>

          <option value="heavy-rain">
            Heavy Rain
          </option>

          <option value="route-blocked">
            Route A Blocked
          </option>

          <option value="demand-20">
            Demand +20%
          </option>

          <option value="vehicle-breakdown">
            Vehicle Breakdown
          </option>
        </select>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-5">
        Simulation Result
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border p-6">
          <p className="text-gray-500">
            Logistics Risk
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {result.risk}%
          </h2>
        </div>

        <div className="rounded-xl border p-6">
          <p className="text-gray-500">
            Estimated Delivery Time
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {result.eta}
          </h2>
        </div>

        <div className="rounded-xl border p-6">
          <p className="text-gray-500">
            Shortage Risk
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {result.shortage}
          </h2>
        </div>
      </div>

      <div className="rounded-xl border p-6 mt-8">
        <h2 className="text-xl font-semibold">
          🤖 AI Recommended Action
        </h2>

        <p className="text-lg mt-4">
          {result.action}
        </p>
      </div>

      <div className="rounded-xl border p-6 mt-8">
        <h2 className="text-xl font-semibold mb-5">
          Decision Flow
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="rounded-lg border p-4 text-center">
            Monitor
          </div>

          <div className="rounded-lg border p-4 text-center">
            Predict
          </div>

          <div className="rounded-lg border p-4 text-center">
            Simulate
          </div>

          <div className="rounded-lg border p-4 text-center">
            Optimize
          </div>

          <div className="rounded-lg border p-4 text-center">
            Recommend
          </div>
        </div>
      </div>
    </main>
  );
}
