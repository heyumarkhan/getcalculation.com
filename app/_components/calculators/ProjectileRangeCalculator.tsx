"use client";

import React, { useState } from "react";

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export default function ProjectileRangeCalculator({ showTitle = true }: { showTitle?: boolean }) {
  const [launchSpeed, setLaunchSpeed] = useState<number | "">(0);
  const [angle, setAngle] = useState<number | "">(45);
  const [height, setHeight] = useState<number | "">(0);
  const [gravity, setGravity] = useState<number | "">(9.81);
  const [speedUnit, setSpeedUnit] = useState("m/s");

  const [range, setRange] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  const speedMultipliers: Record<string, number> = {
    "m/s": 1,
    "km/h": 1 / 3.6,
    "mph": 0.44704,
    "ft/s": 0.3048
  };

  const format = (value: number | null, digits = 2) =>
    value === null ? "--" : value.toFixed(digits);

  const calculate = () => {
    if (launchSpeed === "" || angle === "" || gravity === "" || height === "") {
      alert("Please fill in all inputs");
      return;
    }
    if ((launchSpeed as number) <= 0 || (gravity as number) <= 0) {
      alert("Launch speed and gravity must be greater than zero");
      return;
    }

    const v = (launchSpeed as number) * speedMultipliers[speedUnit];
    const g = gravity as number;
    const theta = degToRad(angle as number);
    const vX = v * Math.cos(theta);
    const vY = v * Math.sin(theta);

    const discriminant = vY * vY + 2 * g * (height as number);
    const tFlight = (vY + Math.sqrt(discriminant)) / g;
    const r = vX * tFlight;
    const hMax = (height as number) + (vY * vY) / (2 * g);

    setRange(r);
    setTime(tFlight);
    setMaxHeight(hMax);
  };

  const reset = () => {
    setLaunchSpeed(0);
    setAngle(45);
    setHeight(0);
    setGravity(9.81);
    setRange(null);
    setTime(null);
    setMaxHeight(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {showTitle && <h1 className="text-3xl font-bold mb-6 text-gray-800">Projectile Range Calculator</h1>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Launch Speed</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={launchSpeed}
              onChange={(e) => setLaunchSpeed(e.target.value === "" ? "" : parseFloat(e.target.value))}
              min={0}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., 30"
            />
            <select
              value={speedUnit}
              onChange={(e) => setSpeedUnit(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="m/s">m/s</option>
              <option value="km/h">km/h</option>
              <option value="mph">mph</option>
              <option value="ft/s">ft/s</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Launch Angle (°)</label>
          <input
            type="number"
            value={angle}
            onChange={(e) => setAngle(e.target.value === "" ? "" : parseFloat(e.target.value))}
            min={0}
            max={90}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., 45"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Launch Height</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value === "" ? "" : parseFloat(e.target.value))}
            min={0}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., 0 (ground)"
          />
          <p className="text-xs text-gray-500 mt-1">Height above landing level (meters).</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gravity (m/s²)</label>
          <input
            type="number"
            value={gravity}
            onChange={(e) => setGravity(e.target.value === "" ? "" : parseFloat(e.target.value))}
            min={0}
            step={0.01}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="9.81"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6 mb-6">
        <button
          onClick={calculate}
          className="flex-1 px-4 py-2 text-white font-medium rounded-lg transition"
          style={{ backgroundColor: "#820ECC" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#6a0b9e")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#820ECC")}
        >
          Calculate
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition"
        >
          Reset
        </button>
      </div>

      {range !== null && time !== null && maxHeight !== null && (
        <div className="space-y-4 bg-purple-50 p-4 rounded-lg border border-purple-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600">Range</p>
              <p className="text-2xl font-bold text-gray-900">{format(range)} m</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600">Time of Flight</p>
              <p className="text-2xl font-bold text-gray-900">{format(time)} s</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600">Maximum Height</p>
              <p className="text-2xl font-bold text-gray-900">{format(maxHeight)} m</p>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-100 text-sm text-gray-700">
            <p><strong>Range:</strong> R = v cos(θ) × t_flight, where t_flight = (v sin(θ) + √(v² sin²(θ) + 2gh)) / g.</p>
            <p className="mt-1"><strong>Max height:</strong> h_max = h0 + (v² sin²(θ)) / (2g).</p>
          </div>
        </div>
      )}
    </div>
  );
}
