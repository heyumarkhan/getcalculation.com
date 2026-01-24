"use client";

import { useMemo, useState } from "react";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

const R_UNIVERSAL = 8.314462618; // J/(mol·K)

const gasPresets = [
  { key: "air", name: "Dry Air (28.97 g/mol)", molarMass: 28.97 },
  { key: "nitrogen", name: "Nitrogen (28.01 g/mol)", molarMass: 28.0134 },
  { key: "oxygen", name: "Oxygen (31.998 g/mol)", molarMass: 31.998 },
  { key: "co2", name: "Carbon Dioxide (44.01 g/mol)", molarMass: 44.01 },
  { key: "helium", name: "Helium (4.00 g/mol)", molarMass: 4.0026 },
  { key: "hydrogen", name: "Hydrogen (2.02 g/mol)", molarMass: 2.01588 },
  { key: "custom", name: "Custom (enter molar mass)", molarMass: 28.97 }
];

const pressureUnits = {
  Pa: { name: "Pa (Pascals)", toPa: (v: number) => v, fromPa: (v: number) => v },
  kPa: { name: "kPa (Kilopascals)", toPa: (v: number) => v * 1000, fromPa: (v: number) => v / 1000 },
  bar: { name: "bar", toPa: (v: number) => v * 100000, fromPa: (v: number) => v / 100000 },
  atm: { name: "atm (Atmospheres)", toPa: (v: number) => v * 101325, fromPa: (v: number) => v / 101325 },
  psi: { name: "psi (Pounds per square inch)", toPa: (v: number) => v * 6894.75729, fromPa: (v: number) => v / 6894.75729 }
};

const temperatureUnits = {
  "°C": {
    name: "°C (Celsius)",
    toK: (v: number) => v + 273.15,
    fromK: (v: number) => v - 273.15
  },
  "°F": {
    name: "°F (Fahrenheit)",
    toK: (v: number) => (v - 32) * (5 / 9) + 273.15,
    fromK: (v: number) => (v - 273.15) * (9 / 5) + 32
  },
  K: { name: "K (Kelvin)", toK: (v: number) => v, fromK: (v: number) => v }
};

const densityUnits = {
  "kg/m³": {
    name: "kg/m³ (Kilograms per cubic meter)",
    toBase: (v: number) => v,
    fromBase: (v: number) => v
  },
  "g/L": {
    name: "g/L (Grams per liter)",
    toBase: (v: number) => v,
    fromBase: (v: number) => v
  },
  "lb/ft³": {
    name: "lb/ft³ (Pounds per cubic foot)",
    toBase: (v: number) => v * 16.01846337,
    fromBase: (v: number) => v / 16.01846337
  }
};

type CalculationType = "density" | "pressure" | "temperature";

type GasDensityCalculatorProps = {
  showTitle?: boolean;
};

export default function GasDensityCalculator({
  showTitle = true
}: GasDensityCalculatorProps) {
  const primaryColor = "#820ECC";
  const [calculationType, setCalculationType] = useState<CalculationType>("density");
  const [selectedGas, setSelectedGas] = useState<string>("air");
  const [molarMass, setMolarMass] = useState<string>("28.97");
  const [pressure, setPressure] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("");
  const [density, setDensity] = useState<string>("");
  const [pressureUnit, setPressureUnit] = useState<string>("kPa");
  const [temperatureUnit, setTemperatureUnit] = useState<string>("°C");
  const [densityUnit, setDensityUnit] = useState<string>("kg/m³");
  const [result, setResult] = useState<{ value: number; unit: string; type: CalculationType; steps: string } | null>(null);
  const [error, setError] = useState<string>("");

  const presetOptions = useMemo(() => gasPresets, []);

  const formatNumber = (value: number) => {
    if (!isFinite(value)) return "—";
    if (Math.abs(value) >= 1_000_000 || Math.abs(value) < 0.001) {
      return value.toExponential(4);
    }
    return value.toFixed(6).replace(/\.0+$/, "").replace(/(\.\d*?[1-9])0+$/, "$1");
  };

  const handleGasChange = (gasKey: string) => {
    setSelectedGas(gasKey);
    const preset = presetOptions.find((g) => g.key === gasKey);
    if (preset) {
      setMolarMass(preset.molarMass.toString());
    }
  };

  const reset = () => {
    setCalculationType("density");
    setSelectedGas("air");
    setMolarMass("28.97");
    setPressure("");
    setTemperature("");
    setDensity("");
    setPressureUnit("kPa");
    setTemperatureUnit("°C");
    setDensityUnit("kg/m³");
    setResult(null);
    setError("");
  };

  const calculate = () => {
    setError("");
    setResult(null);

    const molarMassValue = parseFloat(molarMass);
    if (isNaN(molarMassValue) || molarMassValue <= 0) {
      setError("Enter a valid molar mass (g/mol)");
      return;
    }

    const molarMassKg = molarMassValue / 1000; // convert g/mol to kg/mol

    if (calculationType === "density") {
      if (!pressure || !temperature) {
        setError("Enter both pressure and temperature to calculate density");
        return;
      }

      const pressureValue = parseFloat(pressure);
      const temperatureValue = parseFloat(temperature);

      if (isNaN(pressureValue) || isNaN(temperatureValue)) {
        setError("Please enter valid numeric values");
        return;
      }

      const pressurePa = pressureUnits[pressureUnit as keyof typeof pressureUnits].toPa(pressureValue);
      const tempK = temperatureUnits[temperatureUnit as keyof typeof temperatureUnits].toK(temperatureValue);

      if (pressurePa <= 0) {
        setError("Pressure must be positive");
        return;
      }

      if (tempK <= 0) {
        setError("Temperature must be above absolute zero");
        return;
      }

      const densityBase = (pressurePa * molarMassKg) / (R_UNIVERSAL * tempK);
      const densityResult = densityUnits[densityUnit as keyof typeof densityUnits].fromBase(densityBase);

      setResult({
        value: densityResult,
        unit: densityUnit,
        type: "density",
        steps: `ρ = (P × M) / (R × T)
ρ = (${formatNumber(pressurePa)} Pa × ${formatNumber(molarMassKg)} kg/mol) / (${R_UNIVERSAL} J/(mol·K) × ${formatNumber(tempK)} K)
ρ = ${formatNumber(densityBase)} kg/m³ = ${formatNumber(densityResult)} ${densityUnit}`
      });
    }

    if (calculationType === "pressure") {
      if (!density || !temperature) {
        setError("Enter both density and temperature to calculate pressure");
        return;
      }

      const densityValue = parseFloat(density);
      const temperatureValue = parseFloat(temperature);

      if (isNaN(densityValue) || isNaN(temperatureValue)) {
        setError("Please enter valid numeric values");
        return;
      }

      const densityBase = densityUnits[densityUnit as keyof typeof densityUnits].toBase(densityValue);
      const tempK = temperatureUnits[temperatureUnit as keyof typeof temperatureUnits].toK(temperatureValue);

      if (densityBase <= 0) {
        setError("Density must be positive");
        return;
      }

      if (tempK <= 0) {
        setError("Temperature must be above absolute zero");
        return;
      }

      const pressurePa = (densityBase * R_UNIVERSAL * tempK) / molarMassKg;
      const pressureResult = pressureUnits[pressureUnit as keyof typeof pressureUnits].fromPa(pressurePa);

      setResult({
        value: pressureResult,
        unit: pressureUnit,
        type: "pressure",
        steps: `P = (ρ × R × T) / M
P = (${formatNumber(densityBase)} kg/m³ × ${R_UNIVERSAL} J/(mol·K) × ${formatNumber(tempK)} K) / ${formatNumber(molarMassKg)} kg/mol
P = ${formatNumber(pressurePa)} Pa = ${formatNumber(pressureResult)} ${pressureUnit}`
      });
    }

    if (calculationType === "temperature") {
      if (!pressure || !density) {
        setError("Enter both pressure and density to calculate temperature");
        return;
      }

      const pressureValue = parseFloat(pressure);
      const densityValue = parseFloat(density);

      if (isNaN(pressureValue) || isNaN(densityValue)) {
        setError("Please enter valid numeric values");
        return;
      }

      const pressurePa = pressureUnits[pressureUnit as keyof typeof pressureUnits].toPa(pressureValue);
      const densityBase = densityUnits[densityUnit as keyof typeof densityUnits].toBase(densityValue);

      if (pressurePa <= 0) {
        setError("Pressure must be positive");
        return;
      }

      if (densityBase <= 0) {
        setError("Density must be positive");
        return;
      }

      const tempK = (pressurePa * molarMassKg) / (densityBase * R_UNIVERSAL);
      const tempResult = temperatureUnits[temperatureUnit as keyof typeof temperatureUnits].fromK(tempK);

      if (tempK <= 0) {
        setError("Calculated temperature is below absolute zero");
        return;
      }

      setResult({
        value: tempResult,
        unit: temperatureUnit,
        type: "temperature",
        steps: `T = (P × M) / (ρ × R)
T = (${formatNumber(pressurePa)} Pa × ${formatNumber(molarMassKg)} kg/mol) / (${formatNumber(densityBase)} kg/m³ × ${R_UNIVERSAL} J/(mol·K))
T = ${formatNumber(tempK)} K = ${formatNumber(tempResult)} ${temperatureUnit}`
      });
    }
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="mb-6">
          <div
            className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4"
            style={{ borderColor: primaryColor }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Gas Density Calculator</h2>
            <p className="text-gray-700">Calculate gas density, pressure, or temperature using the ideal gas law and molar mass.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Mode</label>
          <select
            value={calculationType}
            onChange={(e) => setCalculationType(e.target.value as CalculationType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
          >
            <option value="density">Calculate Density (ρ)</option>
            <option value="pressure">Calculate Pressure (P)</option>
            <option value="temperature">Calculate Temperature (T)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gas Selection</label>
          <select
            value={selectedGas}
            onChange={(e) => handleGasChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
          >
            {presetOptions.map((gas) => (
              <option key={gas.key} value={gas.key}>
                {gas.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input
          label="Molar Mass (g/mol)"
          type="number"
          value={molarMass}
          onChange={(e) => setMolarMass(e.target.value)}
          helperText="Typical air = 28.97 g/mol"
        />

        {(calculationType === "density" || calculationType === "temperature") && (
          <div>
            <Input
              label="Pressure"
              type="number"
              value={pressure}
              onChange={(e) => setPressure(e.target.value)}
              placeholder="e.g., 101.325"
            />
            <div className="mt-2">
              <select
                value={pressureUnit}
                onChange={(e) => setPressureUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(pressureUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {(calculationType === "density" || calculationType === "pressure") && (
          <div>
            <Input
              label="Temperature"
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              placeholder="e.g., 25"
            />
            <div className="mt-2">
              <select
                value={temperatureUnit}
                onChange={(e) => setTemperatureUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(temperatureUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {(calculationType === "pressure" || calculationType === "temperature") && (
          <div>
            <Input
              label="Density"
              type="number"
              value={density}
              onChange={(e) => setDensity(e.target.value)}
              placeholder="e.g., 1.2"
            />
            <div className="mt-2">
              <select
                value={densityUnit}
                onChange={(e) => setDensityUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(densityUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {calculationType === "density" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Output Density Unit</label>
            <select
              value={densityUnit}
              onChange={(e) => setDensityUnit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
            >
              {Object.entries(densityUnits).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-2">Results use the ideal gas law with your chosen molar mass.</p>
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
          <p className="text-2xl font-bold text-gray-900">
            {formatNumber(result.value)} {result.unit}
          </p>
          <p className="text-sm text-gray-700 whitespace-pre-wrap mt-2">{result.steps}</p>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4" style={{ borderColor: primaryColor }}>
          <p className="text-sm font-semibold text-purple-900">Core Formula</p>
          <p className="text-sm text-gray-700">ρ = (P × M) / (R × T)</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4" style={{ borderColor: primaryColor }}>
          <p className="text-sm font-semibold text-purple-900">Rearranged</p>
          <p className="text-sm text-gray-700">P = (ρ × R × T) / M</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4" style={{ borderColor: primaryColor }}>
          <p className="text-sm font-semibold text-purple-900">Temperature</p>
          <p className="text-sm text-gray-700">T = (P × M) / (ρ × R)</p>
        </div>
      </div>
    </Card>
  );
}
