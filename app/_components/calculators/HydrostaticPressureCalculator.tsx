'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors for density
const densityUnits = {
  'kg/m³': { name: 'kg/m³', factor: 1 },
  'g/cm³': { name: 'g/cm³', factor: 1000 },
  'lb/ft³': { name: 'lb/ft³', factor: 16.0185 },
  'lb/gal': { name: 'lb/gal (US)', factor: 119.83 }
};

// Unit conversion factors for depth
const depthUnits = {
  'm': { name: 'Meters (m)', factor: 1 },
  'cm': { name: 'Centimeters (cm)', factor: 0.01 },
  'mm': { name: 'Millimeters (mm)', factor: 0.001 },
  'ft': { name: 'Feet (ft)', factor: 0.3048 },
  'in': { name: 'Inches (in)', factor: 0.0254 },
  'km': { name: 'Kilometers (km)', factor: 1000 }
};

// Unit conversion factors for pressure
const pressureUnits = {
  'Pa': { name: 'Pascal (Pa)', factor: 1 },
  'kPa': { name: 'Kilopascal (kPa)', factor: 1000 },
  'MPa': { name: 'Megapascal (MPa)', factor: 1e6 },
  'bar': { name: 'Bar', factor: 100000 },
  'psi': { name: 'PSI (lb/in²)', factor: 6894.76 },
  'atm': { name: 'Atmosphere (atm)', factor: 101325 },
  'mmHg': { name: 'mmHg', factor: 133.322 }
};

interface HydrostaticPressureCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function HydrostaticPressureCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: HydrostaticPressureCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'pressure' | 'depth' | 'density'>('pressure');
  const [density, setDensity] = useState('1000');
  const [depth, setDepth] = useState('');
  const [gravity, setGravity] = useState('9.81');
  const [pressure, setPressure] = useState('');
  const [densityUnit, setDensityUnit] = useState('kg/m³');
  const [depthUnit, setDepthUnit] = useState('m');
  const [pressureUnit, setPressureUnit] = useState('Pa');
  const [result, setResult] = useState<{ value: number; unit: string; variable: string } | null>(null);
  const [calculation, setCalculation] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    if (Math.abs(value) >= 1e12) {
      return value.toExponential(4);
    }
    return value.toFixed(4);
  };

  const convertDensityToBaseUnits = (value: number, unit: string): number => {
    return value * densityUnits[unit as keyof typeof densityUnits].factor;
  };

  const convertDepthToBaseUnits = (value: number, unit: string): number => {
    return value * depthUnits[unit as keyof typeof depthUnits].factor;
  };

  const convertPressureFromBaseUnits = (value: number, unit: string): number => {
    return value / pressureUnits[unit as keyof typeof pressureUnits].factor;
  };

  const convertPressureToBaseUnits = (value: number, unit: string): number => {
    return value * pressureUnits[unit as keyof typeof pressureUnits].factor;
  };

  const convertDepthFromBaseUnits = (value: number, unit: string): number => {
    return value / depthUnits[unit as keyof typeof depthUnits].factor;
  };

  const convertDensityFromBaseUnits = (value: number, unit: string): number => {
    return value / densityUnits[unit as keyof typeof densityUnits].factor;
  };

  const calculatePressure = () => {
    const d = parseFloat(density);
    const dep = parseFloat(depth);
    const g = parseFloat(gravity);

    if (isNaN(d) || isNaN(dep) || isNaN(g) || d <= 0 || dep <= 0 || g <= 0) {
      setResult(null);
      setCalculation('Please enter valid positive numerical values for density, depth, and gravity.');
      return;
    }

    // Convert to base units (kg/m³, m, m/s²)
    const densityInBase = convertDensityToBaseUnits(d, densityUnit);
    const depthInM = convertDepthToBaseUnits(dep, depthUnit);

    // Calculate pressure: P = ρ × g × h
    const pressureInPa = densityInBase * g * depthInM;
    const pressureInUnit = convertPressureFromBaseUnits(pressureInPa, pressureUnit);

    setResult({
      value: pressureInUnit,
      unit: pressureUnit,
      variable: 'Hydrostatic Pressure'
    });

    // Build calculation string
    let calcStr = `P = ρ × g × h\n`;
    calcStr += `P = ${formatValue(densityInBase)} kg/m³ × ${formatValue(g)} m/s² × ${formatValue(depthInM)} m\n`;
    calcStr += `P = ${formatValue(pressureInPa)} Pa = ${formatValue(pressureInUnit)} ${pressureUnit}`;

    setCalculation(calcStr);
  };

  const calculateDepth = () => {
    const d = parseFloat(density);
    const p = parseFloat(pressure);
    const g = parseFloat(gravity);

    if (isNaN(d) || isNaN(p) || isNaN(g) || d <= 0 || p <= 0 || g <= 0) {
      setResult(null);
      setCalculation('Please enter valid positive numerical values for density, pressure, and gravity.');
      return;
    }

    // Convert to base units
    const densityInBase = convertDensityToBaseUnits(d, densityUnit);
    const pressureInPa = convertPressureToBaseUnits(p, pressureUnit);

    // Calculate depth: h = P / (ρ × g)
    const depthInM = pressureInPa / (densityInBase * g);
    const depthInUnit = convertDepthFromBaseUnits(depthInM, depthUnit);

    setResult({
      value: depthInUnit,
      unit: depthUnit,
      variable: 'Depth'
    });

    // Build calculation string
    let calcStr = `h = P / (ρ × g)\n`;
    calcStr += `h = ${formatValue(pressureInPa)} Pa / (${formatValue(densityInBase)} kg/m³ × ${formatValue(g)} m/s²)\n`;
    calcStr += `h = ${formatValue(depthInM)} m = ${formatValue(depthInUnit)} ${depthUnit}`;

    setCalculation(calcStr);
  };

  const calculateDensity = () => {
    const p = parseFloat(pressure);
    const dep = parseFloat(depth);
    const g = parseFloat(gravity);

    if (isNaN(p) || isNaN(dep) || isNaN(g) || p <= 0 || dep <= 0 || g <= 0) {
      setResult(null);
      setCalculation('Please enter valid positive numerical values for pressure, depth, and gravity.');
      return;
    }

    // Convert to base units
    const pressureInPa = convertPressureToBaseUnits(p, pressureUnit);
    const depthInM = convertDepthToBaseUnits(dep, depthUnit);

    // Calculate density: ρ = P / (g × h)
    const densityInBase = pressureInPa / (g * depthInM);
    const densityInUnit = convertDensityFromBaseUnits(densityInBase, densityUnit);

    setResult({
      value: densityInUnit,
      unit: densityUnit,
      variable: 'Fluid Density'
    });

    // Build calculation string
    let calcStr = `ρ = P / (g × h)\n`;
    calcStr += `ρ = ${formatValue(pressureInPa)} Pa / (${formatValue(g)} m/s² × ${formatValue(depthInM)} m)\n`;
    calcStr += `ρ = ${formatValue(densityInBase)} kg/m³ = ${formatValue(densityInUnit)} ${densityUnit}`;

    setCalculation(calcStr);
  };

  const calculate = () => {
    switch (calculationType) {
      case 'pressure':
        calculatePressure();
        break;
      case 'depth':
        calculateDepth();
        break;
      case 'density':
        calculateDensity();
        break;
    }
  };

  const clearAll = () => {
    setCalculationType('pressure');
    setDensity('1000');
    setDepth('');
    setGravity('9.81');
    setPressure('');
    setDensityUnit('kg/m³');
    setDepthUnit('m');
    setPressureUnit('Pa');
    setResult(null);
    setCalculation('');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-color-button {
            background-color: ${primaryColor};
          }
          .custom-color-button:hover {
            background-color: ${primaryColor}dd !important;
          }
          .custom-color-button:focus {
            box-shadow: 0 0 0 3px ${primaryColor}40 !important;
          }
          .custom-outline-button {
            color: ${primaryColor};
            border-color: ${primaryColor};
          }
          .custom-outline-button:hover {
            background-color: ${primaryColor}10 !important;
          }
          .custom-outline-button:focus {
            box-shadow: 0 0 0 3px ${primaryColor}40 !important;
          }
        `
      }} />
      <Card className="p-6 max-w-xl mx-auto">
        {showTitle && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Hydrostatic Pressure Calculator</h2>
            <p className="text-gray-600">Calculate hydrostatic pressure, depth, or fluid density using P = ρ × g × h</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="calculationType" className="block text-sm font-medium text-gray-700 mb-3">
              Calculate
            </label>
            <select
              id="calculationType"
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value as 'pressure' | 'depth' | 'density')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="pressure">Hydrostatic Pressure (P)</option>
              <option value="depth">Depth (h)</option>
              <option value="density">Fluid Density (ρ)</option>
            </select>
          </div>

          {calculationType === 'pressure' && (
            <>
              <div>
                <label htmlFor="density" className="block text-sm font-medium text-gray-700 mb-3">
                  Fluid Density (ρ)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="density"
                      type="number"
                      placeholder="Enter fluid density"
                      value={density}
                      onChange={(e) => setDensity(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={densityUnit}
                      onChange={(e) => setDensityUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(densityUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="depth" className="block text-sm font-medium text-gray-700 mb-3">
                  Depth (h)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="depth"
                      type="number"
                      placeholder="Enter depth"
                      value={depth}
                      onChange={(e) => setDepth(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={depthUnit}
                      onChange={(e) => setDepthUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(depthUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="gravity" className="block text-sm font-medium text-gray-700 mb-3">
                  Gravity (g) - m/s²
                </label>
                <Input
                  id="gravity"
                  type="number"
                  placeholder="Enter gravity acceleration"
                  value={gravity}
                  onChange={(e) => setGravity(e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Default: 9.81 m/s² (Earth)</p>
              </div>

              <div>
                <label htmlFor="pressureUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Result Pressure Unit
                </label>
                <select
                  id="pressureUnit"
                  value={pressureUnit}
                  onChange={(e) => setPressureUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(pressureUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {calculationType === 'depth' && (
            <>
              <div>
                <label htmlFor="density" className="block text-sm font-medium text-gray-700 mb-3">
                  Fluid Density (ρ)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="density"
                      type="number"
                      placeholder="Enter fluid density"
                      value={density}
                      onChange={(e) => setDensity(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={densityUnit}
                      onChange={(e) => setDensityUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(densityUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="pressure" className="block text-sm font-medium text-gray-700 mb-3">
                  Hydrostatic Pressure (P)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="pressure"
                      type="number"
                      placeholder="Enter pressure"
                      value={pressure}
                      onChange={(e) => setPressure(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={pressureUnit}
                      onChange={(e) => setPressureUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(pressureUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="gravity" className="block text-sm font-medium text-gray-700 mb-3">
                  Gravity (g) - m/s²
                </label>
                <Input
                  id="gravity"
                  type="number"
                  placeholder="Enter gravity acceleration"
                  value={gravity}
                  onChange={(e) => setGravity(e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Default: 9.81 m/s² (Earth)</p>
              </div>

              <div>
                <label htmlFor="depthUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Result Depth Unit
                </label>
                <select
                  id="depthUnit"
                  value={depthUnit}
                  onChange={(e) => setDepthUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(depthUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {calculationType === 'density' && (
            <>
              <div>
                <label htmlFor="pressure" className="block text-sm font-medium text-gray-700 mb-3">
                  Hydrostatic Pressure (P)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="pressure"
                      type="number"
                      placeholder="Enter pressure"
                      value={pressure}
                      onChange={(e) => setPressure(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={pressureUnit}
                      onChange={(e) => setPressureUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(pressureUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="depth" className="block text-sm font-medium text-gray-700 mb-3">
                  Depth (h)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="depth"
                      type="number"
                      placeholder="Enter depth"
                      value={depth}
                      onChange={(e) => setDepth(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={depthUnit}
                      onChange={(e) => setDepthUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(depthUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="gravity" className="block text-sm font-medium text-gray-700 mb-3">
                  Gravity (g) - m/s²
                </label>
                <Input
                  id="gravity"
                  type="number"
                  placeholder="Enter gravity acceleration"
                  value={gravity}
                  onChange={(e) => setGravity(e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Default: 9.81 m/s² (Earth)</p>
              </div>

              <div>
                <label htmlFor="densityUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Result Density Unit
                </label>
                <select
                  id="densityUnit"
                  value={densityUnit}
                  onChange={(e) => setDensityUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(densityUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="flex gap-3 pt-2">
            <Button onClick={calculate} className="flex-1 custom-color-button">
              Calculate
            </Button>
            <Button onClick={clearAll} variant="outline" className="flex-1 custom-outline-button">
              Clear
            </Button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-fadeIn">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Result</h3>
              <p className="text-2xl font-bold text-blue-700">
                {result.variable}: {formatValue(result.value)} {result.unit}
              </p>
              {calculation && (
                <div className="text-sm text-blue-600 mt-2 font-mono whitespace-pre-line">
                  {calculation}
                </div>
              )}
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Select what you want to calculate: Pressure, Depth, or Density</li>
              <li>• Enter the required values based on your selection</li>
              <li>• Select appropriate units for each parameter</li>
              <li>• Adjust gravity value if needed (default: 9.81 m/s²)</li>
              <li>• Click &quot;Calculate&quot; to get the result with step-by-step calculations</li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}
