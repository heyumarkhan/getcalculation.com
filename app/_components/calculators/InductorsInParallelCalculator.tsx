"use client";

import { useState } from "react";

interface InductorInput {
  value: number | "";
  unit: "H" | "mH" | "uH";
}

interface InductorResult {
  totalHenries: number;
  totalMilliHenries: number;
  totalMicroHenries: number;
  branchReactance?: number;
  totalReactance?: number;
}

const UNIT_TO_HENRY: Record<InductorInput["unit"], number> = {
  H: 1,
  mH: 1e-3,
  uH: 1e-6
};

export default function InductorsInParallelCalculator({ showTitle = true }: { showTitle?: boolean }) {
  const [inductors, setInductors] = useState<InductorInput[]>([
    { value: "", unit: "mH" },
    { value: "", unit: "mH" }
  ]);
  const [frequency, setFrequency] = useState<number | "">(50);
  const [results, setResults] = useState<InductorResult | null>(null);

  const addInductor = () => {
    if (inductors.length >= 6) return;
    setInductors([...inductors, { value: "", unit: "mH" }]);
  };

  const removeInductor = (index: number) => {
    if (inductors.length <= 2) return;
    setInductors(inductors.filter((_, i) => i !== index));
  };

  const updateInductor = (index: number, field: keyof InductorInput, newValue: number | "" | InductorInput["unit"]) => {
    const next = [...inductors];
    (next[index] as any)[field] = newValue;
    setInductors(next);
  };

  const convertToHenries = (input: InductorInput): number => {
    if (input.value === "") return 0;
    return (input.value as number) * UNIT_TO_HENRY[input.unit];
  };

  const formatNumber = (num: number, decimals: number = 6) => {
    if (!isFinite(num)) return "";
    if (num === 0) return "0";
    if (Math.abs(num) < 0.000001 || Math.abs(num) > 1e6) return num.toExponential(4);
    return num.toFixed(decimals).replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
  };

  const calculate = () => {
    const validValues = inductors.map(convertToHenries).filter((v) => v > 0);

    if (validValues.length !== inductors.length) {
      alert("Enter a positive inductance for each inductor (H, mH, or uH).");
      return;
    }

    const reciprocalSum = validValues.reduce((sum, L) => sum + 1 / L, 0);

    if (reciprocalSum === 0) {
      alert("Total inductance cannot be zero. Check your inputs.");
      return;
    }

    const totalHenries = 1 / reciprocalSum;
    const totalMilliHenries = totalHenries * 1e3;
    const totalMicroHenries = totalHenries * 1e6;

    let branchReactance: number | undefined;
    let totalReactance: number | undefined;

    if (frequency !== "" && frequency > 0) {
      const omega = 2 * Math.PI * (frequency as number);
      totalReactance = omega * totalHenries;
      // For identical inductors, branch reactance equals individual reactance; for varied values we show total only
      branchReactance = omega * (validValues[0]);
    }

    setResults({
      totalHenries,
      totalMilliHenries,
      totalMicroHenries,
      branchReactance,
      totalReactance
    });
  };

  const reset = () => {
    setInductors([
      { value: "", unit: "mH" },
      { value: "", unit: "mH" }
    ]);
    setFrequency(50);
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-lg">
      {showTitle && <h1 className="text-3xl font-bold mb-6 text-gray-800">Inductors in Parallel Calculator</h1>}

      <div className="space-y-6">
        <div className="bg-white rounded-lg p-4 shadow space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Inductors</h2>
            <div className="flex gap-2">
              <button
                onClick={addInductor}
                className="px-3 py-1 text-sm font-medium bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={inductors.length >= 6}
              >
                Add
              </button>
              <button
                onClick={() => removeInductor(inductors.length - 1)}
                className="px-3 py-1 text-sm font-medium bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={inductors.length <= 2}
              >
                Remove
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {inductors.map((ind, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inductor {idx + 1} Value
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={ind.value}
                    onChange={(e) => updateInductor(idx, "value", e.target.value === "" ? "" : parseFloat(e.target.value))}
                    placeholder="e.g., 4.7"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <select
                    value={ind.unit}
                    onChange={(e) => updateInductor(idx, "unit", e.target.value as InductorInput["unit"])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="H">H</option>
                    <option value="mH">mH</option>
                    <option value="uH">μH</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Frequency (Hz) for reactance (optional)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value === "" ? "" : parseFloat(e.target.value))}
            placeholder="e.g., 50"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={calculate}
            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105"
          >
            Calculate
          </button>
          <button
            onClick={reset}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition"
          >
            Reset
          </button>
        </div>

        {results && (
          <div className="bg-white rounded-lg p-4 shadow space-y-4">
            <h2 className="text-lg font-bold text-gray-800">Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Total Inductance</p>
                <p className="text-xl font-bold text-purple-700">{formatNumber(results.totalHenries, 6)} H</p>
                <p className="text-sm text-gray-600">{formatNumber(results.totalMilliHenries, 4)} mH</p>
                <p className="text-sm text-gray-600">{formatNumber(results.totalMicroHenries, 2)} μH</p>
              </div>
              {results.totalReactance !== undefined && (
                <div className="bg-purple-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Total Reactance (X<sub>L</sub>)</p>
                  <p className="text-xl font-bold text-purple-700">{formatNumber(results.totalReactance, 4)} Ω</p>
                  <p className="text-xs text-gray-600">Computed at {frequency} Hz</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-700">
              <p className="font-semibold">Formulas used</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Parallel inductance: 1 / L<sub>total</sub> = Σ(1 / L<sub>i</sub>)</li>
                <li>Reactance: X<sub>L</sub> = 2π f L</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
