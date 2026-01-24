"use client";

import React, { useState } from "react";

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function radToDeg(rad: number) {
  return (rad * 180) / Math.PI;
}

function normalizeHeading(deg: number) {
  const normalized = deg % 360;
  return normalized < 0 ? normalized + 360 : normalized;
}

export default function WindCorrectionAngleCalculator({ showTitle = true }: { showTitle?: boolean }) {
  const [course, setCourse] = useState<number | "">(0);
  const [windDirection, setWindDirection] = useState<number | "">(0);
  const [windSpeed, setWindSpeed] = useState<number | "">(0);
  const [trueAirspeed, setTrueAirspeed] = useState<number | "">(0);
  const [speedUnit, setSpeedUnit] = useState("kt");

  const [wca, setWca] = useState<number | null>(null);
  const [headingToFly, setHeadingToFly] = useState<number | null>(null);
  const [groundSpeed, setGroundSpeed] = useState<number | null>(null);
  const [crosswind, setCrosswind] = useState<number | null>(null);
  const [headwind, setHeadwind] = useState<number | null>(null);

  const speedMultipliers: Record<string, number> = {
    kt: 1,
    "mph": 0.868976,
    "km/h": 0.539957,
    "m/s": 1.94384
  };

  const formatNumber = (value: number | null, fractionDigits = 1) =>
    value === null ? "--" : value.toFixed(fractionDigits);

  const calculate = () => {
    if (course === "" || windDirection === "" || windSpeed === "" || trueAirspeed === "") {
      alert("Please enter all values");
      return;
    }

    if (trueAirspeed <= 0) {
      alert("True airspeed must be greater than zero");
      return;
    }

    const tasKnots = (trueAirspeed as number) * speedMultipliers[speedUnit];
    const windKnots = (windSpeed as number) * speedMultipliers[speedUnit];

    const courseRad = degToRad(course as number);
    const windRad = degToRad(windDirection as number);
    const relativeWind = windRad - courseRad;

    const cross = windKnots * Math.sin(relativeWind);
    const head = windKnots * Math.cos(relativeWind);

    // Clamp ratio to valid asin domain to avoid NaN from floating point drift
    const ratio = Math.max(-1, Math.min(1, cross / tasKnots));
    const wcaRad = Math.asin(ratio);
    const wcaDeg = radToDeg(wcaRad);

    const heading = normalizeHeading((course as number) + wcaDeg);
    const gs = Math.max(0, tasKnots * Math.cos(wcaRad) - head);

    setWca(wcaDeg);
    setHeadingToFly(heading);
    setGroundSpeed(gs / speedMultipliers[speedUnit]);
    setCrosswind(cross);
    setHeadwind(head);
  };

  const reset = () => {
    setCourse(0);
    setWindDirection(0);
    setWindSpeed(0);
    setTrueAirspeed(0);
    setWca(null);
    setHeadingToFly(null);
    setGroundSpeed(null);
    setCrosswind(null);
    setHeadwind(null);
  };

  const wcaDirection = wca === null ? "--" : wca > 0 ? "Steer Left" : wca < 0 ? "Steer Right" : "On Course";

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {showTitle && <h1 className="text-3xl font-bold mb-6 text-gray-800">Wind Correction Angle Calculator</h1>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Desired Course (°)</label>
          <input
            type="number"
            value={course}
            onChange={(e) => setCourse(e.target.value === "" ? "" : parseFloat(e.target.value))}
            min={0}
            max={360}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., 090"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Wind Direction (from, °)</label>
          <input
            type="number"
            value={windDirection}
            onChange={(e) => setWindDirection(e.target.value === "" ? "" : parseFloat(e.target.value))}
            min={0}
            max={360}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., 230"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Wind Speed</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={windSpeed}
              onChange={(e) => setWindSpeed(e.target.value === "" ? "" : parseFloat(e.target.value))}
              min={0}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., 20"
            />
            <select
              value={speedUnit}
              onChange={(e) => setSpeedUnit(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="kt">kt</option>
              <option value="mph">mph</option>
              <option value="km/h">km/h</option>
              <option value="m/s">m/s</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">True Airspeed</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={trueAirspeed}
              onChange={(e) => setTrueAirspeed(e.target.value === "" ? "" : parseFloat(e.target.value))}
              min={0}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., 120"
            />
            <div className="px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 flex items-center">
              {speedUnit}
            </div>
          </div>
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

      {wca !== null && headingToFly !== null && groundSpeed !== null && (
        <div className="space-y-4 bg-purple-50 p-4 rounded-lg border border-purple-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600">Wind Correction Angle</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(wca, 1)}°</p>
              <p className="text-sm text-purple-700 font-semibold mt-1">{wcaDirection}</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600">Heading to Fly</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(headingToFly, 1)}°</p>
              <p className="text-sm text-gray-600 mt-1">Normalized to 0° - 360°</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600">Ground Speed</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(groundSpeed, 1)} {speedUnit}</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600">Crosswind Component</p>
              <p className="text-xl font-bold text-gray-900">{formatNumber(crosswind, 1)} kt</p>
              <p className="text-sm text-gray-600 mt-1">Positive = from left</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600">Head/Tailwind Component</p>
              <p className="text-xl font-bold text-gray-900">{formatNumber(headwind, 1)} kt</p>
              <p className="text-sm text-gray-600 mt-1">Positive = headwind</p>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-100 text-sm text-gray-700">
            <p><strong>Formula:</strong> WCA = asin( (Vw × sin(Δθ)) / TAS ), where Δθ = windDir − course.</p>
            <p className="mt-1"><strong>Heading:</strong> Course + WCA (normalized 0–360). Ground Speed = TAS × cos(WCA) − headwind.</p>
          </div>
        </div>
      )}
    </div>
  );
}
