"use client";

import { useMemo, useState } from "react";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

// Constants
const G = 9.80665; // m/s^2
const MOLAR_MASS_AIR = 0.0289644; // kg/mol
const R_UNIVERSAL = 8.314462618; // J/(mol·K)
const STANDARD_P0 = 101325; // Pa
const STANDARD_T0 = 288.15; // K (15°C)

const pressureUnits = {
  Pa: { label: "Pa", toPa: (v: number) => v, fromPa: (v: number) => v },
  kPa: { label: "kPa", toPa: (v: number) => v * 1000, fromPa: (v: number) => v / 1000 },
  hPa: { label: "hPa", toPa: (v: number) => v * 100, fromPa: (v: number) => v / 100 },
  bar: { label: "bar", toPa: (v: number) => v * 100000, fromPa: (v: number) => v / 100000 },
  atm: { label: "atm", toPa: (v: number) => v * 101325, fromPa: (v: number) => v / 101325 },
  psi: { label: "psi", toPa: (v: number) => v * 6894.75729, fromPa: (v: number) => v / 6894.75729 }
} as const;

const temperatureUnits = {
  "°C": { toK: (v: number) => v + 273.15, fromK: (v: number) => v - 273.15, label: "°C" },
  K: { toK: (v: number) => v, fromK: (v: number) => v, label: "K" }
} as const;

type PressureUnit = keyof typeof pressureUnits;
type TemperatureUnit = keyof typeof temperatureUnits;

type CalculationResult = {
  pressure: number;
  unit: PressureUnit;
  steps: string;
};

export default function AirPressureAtAltitudeCalculator() {
  const [altitude, setAltitude] = useState<string>("");
  const [basePressure, setBasePressure] = useState<string>("101.325");
  const [basePressureUnit, setBasePressureUnit] = useState<PressureUnit>("kPa");
  const [temperature, setTemperature] = useState<string>("15");
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>("°C");
  const [outputUnit, setOutputUnit] = useState<PressureUnit>("kPa");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string>("");

  const primaryColor = "#820ECC";

  const format = (value: number) => {
    if (!isFinite(value)) return "—";
    if (Math.abs(value) >= 1_000_000 || Math.abs(value) < 0.001) return value.toExponential(4);
    return value.toFixed(6).replace(/\.0+$/, "").replace(/(\.\d*?[1-9])0+$/, "$1");
  };

  const computePressure = () => {
    setError("");
    setResult(null);

    const h = parseFloat(altitude);
    const p0Input = parseFloat(basePressure);
    const tInput = parseFloat(temperature);

    if (isNaN(h) || isNaN(p0Input) || isNaN(tInput)) {
      setError("Enter numeric values for altitude, pressure, and temperature.");
      return;
    }
    if (h < -500 || h > 30000) {
      setError("Enter altitude between -500 m and 30000 m.");
      return;
    }

    const p0Pa = pressureUnits[basePressureUnit].toPa(p0Input);
    const tempK = temperatureUnits[temperatureUnit].toK(tInput);
    if (p0Pa <= 0) {
      setError("Base pressure must be positive.");
      return;
    }
    if (tempK <= 0) {
      setError("Temperature must be above absolute zero.");
      return;
    }

    // Barometric formula (isothermal layer approximation): P = P0 * exp(-M g h / (R T))
    const exponent = -(MOLAR_MASS_AIR * G * h) / (R_UNIVERSAL * tempK);
    const pressurePa = p0Pa * Math.exp(exponent);
    const pressureOut = pressureUnits[outputUnit].fromPa(pressurePa);

    const steps = [
      `Using barometric formula: P = P0 × exp(-M g h / (R T))`,
      `P0 = ${format(p0Pa)} Pa, h = ${format(h)} m, T = ${format(tempK)} K, M = ${MOLAR_MASS_AIR} kg/mol, g = ${G} m/s²`,
      `Exponent = -(M × g × h) / (R × T) = ${format(exponent)}`,
      `P = ${format(p0Pa)} Pa × exp(${format(exponent)}) = ${format(pressurePa)} Pa = ${format(pressureOut)} ${outputUnit}`
    ].join("\n");

    setResult({ pressure: pressureOut, unit: outputUnit, steps });
  };

  const clear = () => {
    setAltitude("");
    setBasePressure("101.325");
    setBasePressureUnit("kPa");
    setTemperature("15");
    setTemperatureUnit("°C");
    setOutputUnit("kPa");
    setResult(null);
    setError("");
  };

  const presets = useMemo(
    () => [
      { label: "Standard sea level (101.325 kPa, 15°C)", p: "101.325", pUnit: "kPa" as PressureUnit, t: "15", tUnit: "°C" as TemperatureUnit },
      { label: "High altitude airport (85 kPa, 5°C)", p: "85", pUnit: "kPa" as PressureUnit, t: "5", tUnit: "°C" as TemperatureUnit },
      { label: "Custom", p: basePressure, pUnit: basePressureUnit, t: temperature, tUnit: temperatureUnit }
    ],
    [basePressure, basePressureUnit, temperature, temperatureUnit]
  );

  const applyPreset = (index: number) => {
    const preset = presets[index];
    setBasePressure(preset.p);
    setBasePressureUnit(preset.pUnit);
    setTemperature(preset.t);
    setTemperatureUnit(preset.tUnit);
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4" style={{ borderColor: primaryColor }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Air Pressure at Altitude Calculator</h2>
          <p className="text-gray-700">Estimate air pressure at altitude using the barometric formula with adjustable base conditions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input
          label="Altitude (m)"
          type="number"
          value={altitude}
          onChange={(e) => setAltitude(e.target.value)}
          placeholder="e.g., 1500"
        />

        <div>
          <Input
            label="Base Pressure"
            type="number"
            value={basePressure}
            onChange={(e) => setBasePressure(e.target.value)}
            placeholder="e.g., 101.325"
          />
          <div className="mt-2">
            <select
              value={basePressureUnit}
              onChange={(e) => setBasePressureUnit(e.target.value as PressureUnit)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
            >
              {Object.entries(pressureUnits).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <Input
            label="Temperature at base"
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="e.g., 15"
          />
          <div className="mt-2">
            <select
              value={temperatureUnit}
              onChange={(e) => setTemperatureUnit(e.target.value as TemperatureUnit)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
            >
              {Object.entries(temperatureUnits).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Output Unit</label>
          <select
            value={outputUnit}
            onChange={(e) => setOutputUnit(e.target.value as PressureUnit)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
          >
            {Object.entries(pressureUnits).map(([key, unit]) => (
              <option key={key} value={key}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Quick Presets</label>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset, idx) => (
            <Button key={preset.label} variant="outline" size="sm" onClick={() => applyPreset(idx)}>
              {preset.label}
            </Button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-6">
        <Button onClick={computePressure}>Calculate</Button>
        <Button variant="outline" onClick={clear}>Reset</Button>
      </div>

      {result && (
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4" style={{ borderColor: primaryColor }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Result</h3>
          <p className="text-2xl font-bold text-gray-900">{format(result.pressure)} {result.unit}</p>
          <p className="text-sm text-gray-700 whitespace-pre-wrap mt-2">{result.steps}</p>
        </div>
      )}
    </Card>
  );
}
