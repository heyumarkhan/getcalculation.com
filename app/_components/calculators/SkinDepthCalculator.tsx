"use client";

import React, { useState } from "react";

export default function SkinDepthCalculator({ showTitle = true }: { showTitle?: boolean }) {
  const [frequency, setFrequency] = useState<number | "">(1000000);
  const [frequencyUnit, setFrequencyUnit] = useState("Hz");
  const [conductivity, setConductivity] = useState<number | "">(5.96e7);
  const [relativePermeability, setRelativePermeability] = useState<number | "">(1);

  const [skinDepth, setSkinDepth] = useState<number | null>(null);
  const [resistivity, setResistivity] = useState<number | null>(null);

  const frequencyMultipliers: Record<string, number> = {
    Hz: 1,
    kHz: 1000,
    MHz: 1000000,
    GHz: 1000000000
  };

  const MU_0 = 4 * Math.PI * 1e-7; // H/m - permeability of free space

  const format = (value: number | null, digits = 4) => {
    if (value === null) return "--";
    if (value === 0) return "0";
    if (Math.abs(value) < 1e-6) return value.toExponential(2);
    if (Math.abs(value) > 1e6) return value.toExponential(2);
    return value.toFixed(digits);
  };

  const calculate = () => {
    if (
      frequency === "" ||
      conductivity === "" ||
      relativePermeability === "" ||
      (frequency as number) <= 0 ||
      (conductivity as number) <= 0 ||
      (relativePermeability as number) <= 0
    ) {
      alert("Please enter valid positive values for all inputs");
      return;
    }

    const f = (frequency as number) * frequencyMultipliers[frequencyUnit];
    const sigma = conductivity as number;
    const mu_r = relativePermeability as number;
    const mu = MU_0 * mu_r;

    // Skin depth formula: δ = 1 / sqrt(π × f × μ × σ)
    const denominator = Math.sqrt(Math.PI * f * mu * sigma);
    const delta = 1 / denominator;

    // Resistivity (rho) = 1 / σ
    const rho = 1 / sigma;

    setSkinDepth(delta);
    setResistivity(rho);
  };

  const reset = () => {
    setFrequency(1000000);
    setFrequencyUnit("Hz");
    setConductivity(5.96e7);
    setRelativePermeability(1);
    setSkinDepth(null);
    setResistivity(null);
  };

  const getMaterialInfo = (conductivity_val: number | "") => {
    if (conductivity_val === "") return "";
    const cond = conductivity_val as number;
    if (cond > 1e7) return "Good conductor (e.g., copper, aluminum)";
    if (cond > 1e3) return "Fair conductor";
    if (cond > 1) return "Poor conductor";
    return "Insulator or poor conductor";
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {showTitle && <h1 className="text-3xl font-bold mb-6 text-gray-800">Skin Depth Calculator</h1>}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value === "" ? "" : parseFloat(e.target.value))}
              min={0}
              step={100000}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., 1000000"
            />
            <select
              value={frequencyUnit}
              onChange={(e) => setFrequencyUnit(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="Hz">Hz</option>
              <option value="kHz">kHz</option>
              <option value="MHz">MHz</option>
              <option value="GHz">GHz</option>
            </select>
          </div>
          <p className="text-xs text-gray-500 mt-1">Electromagnetic wave frequency.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Conductivity (σ)</label>
          <input
            type="number"
            value={conductivity}
            onChange={(e) => setConductivity(e.target.value === "" ? "" : parseFloat(e.target.value))}
            min={0}
            step={1e6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., 5.96e7 (copper)"
          />
          <p className="text-xs text-gray-500 mt-1">Electrical conductivity in Siemens/meter (S/m). Copper: 5.96×10⁷.</p>
          {conductivity !== "" && <p className="text-xs text-purple-700 mt-1 font-medium">{getMaterialInfo(conductivity)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Relative Permeability (μᵣ)</label>
          <input
            type="number"
            value={relativePermeability}
            onChange={(e) => setRelativePermeability(e.target.value === "" ? "" : parseFloat(e.target.value))}
            min={0}
            step={0.1}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="1 (most conductors)"
          />
          <p className="text-xs text-gray-500 mt-1">Non-magnetic: μᵣ = 1. Iron/Nickel: μᵣ much greater than 1.</p>
        </div>

        <div className="flex gap-3">
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

        {skinDepth !== null && resistivity !== null && (
          <div className="space-y-4 bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600">Skin Depth (δ)</p>
                <p className="text-2xl font-bold text-gray-900">{format(skinDepth)} m</p>
                <p className="text-xs text-gray-500 mt-1">EM wave penetration depth</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600">Resistivity (ρ)</p>
                <p className="text-2xl font-bold text-gray-900">{format(resistivity)} Ω·m</p>
                <p className="text-xs text-gray-500 mt-1">1 / conductivity</p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-gray-100 text-sm text-gray-700">
              <p><strong>Formula:</strong> δ = 1 / √(π × f × μ × σ)</p>
              <p className="mt-1 text-xs">Where f = frequency (Hz), μ = μ₀μᵣ (H/m), σ = conductivity (S/m).</p>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-sm text-blue-800">
              <p className="font-semibold mb-1">Interpretation:</p>
              <p>
                At {format(frequency === "" ? 0 : frequency, 0)} {frequencyUnit}, the EM wave penetrates approximately {format(skinDepth, 2)} meters into the conductor before attenuating to 1/e ~37% of surface amplitude.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
