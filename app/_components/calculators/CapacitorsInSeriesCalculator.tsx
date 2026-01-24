"use client";

import { useState } from "react";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

const unitOptions = [
  { label: "µF", factor: 1e-6 },
  { label: "nF", factor: 1e-9 },
  { label: "pF", factor: 1e-12 }
];

type CapacitorEntry = { value: string; unit: string };

type Result = {
  ceq: number;
  unit: string;
  steps: string;
};

export default function CapacitorsInSeriesCalculator() {
  const primaryColor = "#820ECC";
  const [capacitors, setCapacitors] = useState<CapacitorEntry[]>([
    { value: "10", unit: "µF" },
    { value: "22", unit: "µF" }
  ]);
  const [outputUnit, setOutputUnit] = useState<string>("µF");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string>("");

  const addCapacitor = () => {
    setCapacitors((prev) => [...prev, { value: "", unit: "µF" }]);
  };

  const updateCapacitor = (index: number, key: keyof CapacitorEntry, value: string) => {
    setCapacitors((prev) => prev.map((cap, i) => (i === index ? { ...cap, [key]: value } : cap)));
  };

  const removeCapacitor = (index: number) => {
    setCapacitors((prev) => prev.filter((_, i) => i !== index));
  };

  const format = (val: number) => {
    if (!isFinite(val)) return "—";
    if (Math.abs(val) >= 1_000_000 || Math.abs(val) < 0.001) return val.toExponential(4);
    return val.toFixed(6).replace(/\.0+$/, "").replace(/(\.\d*?[1-9])0+$/, "$1");
  };

  const calculate = () => {
    setError("");
    setResult(null);

    if (capacitors.length === 0) {
      setError("Add at least one capacitor.");
      return;
    }

    let reciprocalSum = 0;
    const lines: string[] = [];

    for (let i = 0; i < capacitors.length; i++) {
      const { value, unit } = capacitors[i];
      const num = parseFloat(value);
      if (isNaN(num) || num <= 0) {
        setError("Enter positive numeric values for all capacitors.");
        return;
      }
      const factor = unitOptions.find((u) => u.label === unit)?.factor || 1;
      const farads = num * factor;
      reciprocalSum += 1 / farads;
      lines.push(`C${i + 1} = ${format(num)} ${unit} = ${format(farads)} F; 1/C${i + 1} = ${format(1 / farads)} 1/F`);
    }

    if (reciprocalSum === 0) {
      setError("Calculation error: reciprocal sum is zero.");
      return;
    }

    const ceqF = 1 / reciprocalSum;
    const outFactor = unitOptions.find((u) => u.label === outputUnit)?.factor || 1;
    const ceqOut = ceqF / outFactor;

    const steps = [
      "Series formula: 1/Ceq = Σ (1/Ci)",
      ...lines,
      `Σ(1/Ci) = ${format(reciprocalSum)} 1/F`,
      `Ceq = 1 / ${format(reciprocalSum)} = ${format(ceqF)} F = ${format(ceqOut)} ${outputUnit}`
    ].join("\n");

    setResult({ ceq: ceqOut, unit: outputUnit, steps });
  };

  const reset = () => {
    setCapacitors([
      { value: "10", unit: "µF" },
      { value: "22", unit: "µF" }
    ]);
    setOutputUnit("µF");
    setResult(null);
    setError("");
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div
          className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4"
          style={{ borderColor: primaryColor }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Capacitors in Series Calculator</h2>
          <p className="text-gray-700">Find equivalent capacitance for capacitors in series with unit conversions.</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {capacitors.map((cap, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <Input
              label={`Capacitor C${idx + 1}`}
              type="number"
              value={cap.value}
              onChange={(e) => updateCapacitor(idx, "value", e.target.value)}
              placeholder="e.g., 10"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
              <select
                value={cap.unit}
                onChange={(e) => updateCapacitor(idx, "unit", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {unitOptions.map((u) => (
                  <option key={u.label} value={u.label}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 md:justify-end">
              <Button variant="outline" size="sm" onClick={() => removeCapacitor(idx)} disabled={capacitors.length <= 1}>
                Remove
              </Button>
            </div>
          </div>
        ))}
        <div>
          <Button variant="outline" onClick={addCapacitor} size="sm">
            Add Capacitor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Output Unit</label>
          <select
            value={outputUnit}
            onChange={(e) => setOutputUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
          >
            {unitOptions.map((u) => (
              <option key={u.label} value={u.label}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-6">
        <Button onClick={calculate}>Calculate</Button>
        <Button variant="outline" onClick={reset}>Reset</Button>
      </div>

      {result && (
        <div
          className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4"
          style={{ borderColor: primaryColor }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Result</h3>
          <p className="text-2xl font-bold text-gray-900">{format(result.ceq)} {result.unit}</p>
          <p className="text-sm text-gray-700 whitespace-pre-wrap mt-2">{result.steps}</p>
        </div>
      )}
    </Card>
  );
}
