"use client";

import { useState } from "react";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

const chargeUnits = [
  { label: "C", factor: 1 },
  { label: "mC", factor: 1e-3 },
  { label: "µC", factor: 1e-6 },
  { label: "nC", factor: 1e-9 }
];

const voltageUnits = [
  { label: "V", factor: 1 },
  { label: "mV", factor: 1e-3 },
  { label: "kV", factor: 1e3 }
];

const capacitanceUnits = [
  { label: "F", factor: 1 },
  { label: "mF", factor: 1e-3 },
  { label: "µF", factor: 1e-6 },
  { label: "nF", factor: 1e-9 },
  { label: "pF", factor: 1e-12 }
];

type Mode = "capacitance" | "charge" | "voltage";

type Result = {
  value: number;
  unit: string;
  steps: string;
};

export default function CapacitorCalculator() {
  const primaryColor = "#820ECC";
  const [mode, setMode] = useState<Mode>("capacitance");
  const [charge, setCharge] = useState<string>("10");
  const [chargeUnit, setChargeUnit] = useState<string>("µC");
  const [voltage, setVoltage] = useState<string>("5");
  const [voltageUnit, setVoltageUnit] = useState<string>("V");
  const [capacitance, setCapacitance] = useState<string>("100");
  const [capacitanceUnit, setCapacitanceUnit] = useState<string>("µF");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string>("");

  const format = (val: number) => {
    if (!isFinite(val)) return "—";
    if (Math.abs(val) >= 1_000_000 || Math.abs(val) < 0.001) return val.toExponential(4);
    return val.toFixed(6).replace(/\.0+$/, "").replace(/(\.\d*?[1-9])0+$/, "$1");
  };

  const toSI = (val: string, unitList: { label: string; factor: number }[], unit: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) return NaN;
    const factor = unitList.find((u) => u.label === unit)?.factor ?? 1;
    return num * factor;
  };

  const fromSI = (value: number, unitList: { label: string; factor: number }[], unit: string) => {
    const factor = unitList.find((u) => u.label === unit)?.factor ?? 1;
    return value / factor;
  };

  const calculate = () => {
    setError("");
    setResult(null);

    if (mode === "capacitance") {
      const q = toSI(charge, chargeUnits, chargeUnit);
      const v = toSI(voltage, voltageUnits, voltageUnit);
      if (!isFinite(q) || !isFinite(v) || v === 0) {
        setError("Enter valid charge and nonzero voltage.");
        return;
      }
      const cF = q / v;
      const cOut = fromSI(cF, capacitanceUnits, capacitanceUnit);
      const steps = [
        "C = Q / V",
        `Q = ${format(q)} C, V = ${format(v)} V`,
        `C = ${format(q)} / ${format(v)} = ${format(cF)} F = ${format(cOut)} ${capacitanceUnit}`
      ].join("\n");
      setResult({ value: cOut, unit: capacitanceUnit, steps });
      return;
    }

    if (mode === "charge") {
      const c = toSI(capacitance, capacitanceUnits, capacitanceUnit);
      const v = toSI(voltage, voltageUnits, voltageUnit);
      if (!isFinite(c) || !isFinite(v)) {
        setError("Enter valid capacitance and voltage.");
        return;
      }
      const qC = c * v;
      const qOut = fromSI(qC, chargeUnits, chargeUnit);
      const steps = [
        "Q = C × V",
        `C = ${format(c)} F, V = ${format(v)} V`,
        `Q = ${format(c)} × ${format(v)} = ${format(qC)} C = ${format(qOut)} ${chargeUnit}`
      ].join("\n");
      setResult({ value: qOut, unit: chargeUnit, steps });
      return;
    }

    if (mode === "voltage") {
      const q = toSI(charge, chargeUnits, chargeUnit);
      const c = toSI(capacitance, capacitanceUnits, capacitanceUnit);
      if (!isFinite(q) || !isFinite(c) || c === 0) {
        setError("Enter valid charge and nonzero capacitance.");
        return;
      }
      const vV = q / c;
      const vOut = fromSI(vV, voltageUnits, voltageUnit);
      const steps = [
        "V = Q / C",
        `Q = ${format(q)} C, C = ${format(c)} F`,
        `V = ${format(q)} / ${format(c)} = ${format(vV)} V = ${format(vOut)} ${voltageUnit}`
      ].join("\n");
      setResult({ value: vOut, unit: voltageUnit, steps });
    }
  };

  const reset = () => {
    setMode("capacitance");
    setCharge("10");
    setChargeUnit("µC");
    setVoltage("5");
    setVoltageUnit("V");
    setCapacitance("100");
    setCapacitanceUnit("µF");
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Capacitor Calculator</h2>
          <p className="text-gray-700">Solve for capacitance, charge, or voltage with unit conversions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
          >
            <option value="capacitance">Find Capacitance (C)</option>
            <option value="charge">Find Charge (Q)</option>
            <option value="voltage">Find Voltage (V)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {(mode === "capacitance" || mode === "charge" || mode === "voltage") && (
          <div>
            <Input
              label="Charge (Q)"
              type="number"
              value={charge}
              onChange={(e) => setCharge(e.target.value)}
              placeholder="e.g., 10"
            />
            <div className="mt-2">
              <select
                value={chargeUnit}
                onChange={(e) => setChargeUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {chargeUnits.map((u) => (
                  <option key={u.label} value={u.label}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {(mode === "capacitance" || mode === "charge" || mode === "voltage") && (
          <div>
            <Input
              label="Voltage (V)"
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              placeholder="e.g., 5"
            />
            <div className="mt-2">
              <select
                value={voltageUnit}
                onChange={(e) => setVoltageUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {voltageUnits.map((u) => (
                  <option key={u.label} value={u.label}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {(mode === "charge" || mode === "voltage") && (
          <div>
            <Input
              label="Capacitance (C)"
              type="number"
              value={capacitance}
              onChange={(e) => setCapacitance(e.target.value)}
              placeholder="e.g., 100"
            />
            <div className="mt-2">
              <select
                value={capacitanceUnit}
                onChange={(e) => setCapacitanceUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {capacitanceUnits.map((u) => (
                  <option key={u.label} value={u.label}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
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
          <p className="text-2xl font-bold text-gray-900">{format(result.value)} {result.unit}</p>
          <p className="text-sm text-gray-700 whitespace-pre-wrap mt-2">{result.steps}</p>
        </div>
      )}
    </Card>
  );
}
