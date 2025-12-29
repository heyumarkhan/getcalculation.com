'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors
const pressureUnits = {
  'Pa': { name: 'Pascal (Pa)', factor: 1 },
  'kPa': { name: 'Kilopascal (kPa)', factor: 1000 },
  'MPa': { name: 'Megapascal (MPa)', factor: 1e6 },
  'bar': { name: 'Bar', factor: 100000 },
  'psi': { name: 'PSI (lb/in²)', factor: 6894.76 },
  'atm': { name: 'Atmosphere (atm)', factor: 101325 },
  'torr': { name: 'Torr', factor: 133.322 },
  'mmHg': { name: 'mmHg', factor: 133.322 }
};

const forceUnits = {
  'N': { name: 'Newtons (N)', factor: 1 },
  'kN': { name: 'Kilonewtons (kN)', factor: 1000 },
  'lbf': { name: 'Pounds-force (lbf)', factor: 4.44822 },
  'kgf': { name: 'Kilogram-force (kgf)', factor: 9.80665 }
};

const areaUnits = {
  'm²': { name: 'Square Meters (m²)', factor: 1 },
  'cm²': { name: 'Square Centimeters (cm²)', factor: 0.0001 },
  'mm²': { name: 'Square Millimeters (mm²)', factor: 0.000001 },
  'in²': { name: 'Square Inches (in²)', factor: 0.00064516 },
  'ft²': { name: 'Square Feet (ft²)', factor: 0.092903 },
  'km²': { name: 'Square Kilometers (km²)', factor: 1000000 }
};

interface PressureCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function PressureCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: PressureCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'pressure' | 'force' | 'area'>('pressure');
  const [pressure, setPressure] = useState('');
  const [force, setForce] = useState('');
  const [area, setArea] = useState('');
  const [pressureUnit, setPressureUnit] = useState('Pa');
  const [forceUnit, setForceUnit] = useState('N');
  const [areaUnit, setAreaUnit] = useState('m²');
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

  const convertToBaseUnits = (value: number, unit: string, type: 'pressure' | 'force' | 'area') => {
    if (type === 'pressure') {
      return value * pressureUnits[unit as keyof typeof pressureUnits].factor;
    } else if (type === 'force') {
      return value * forceUnits[unit as keyof typeof forceUnits].factor;
    } else {
      return value * areaUnits[unit as keyof typeof areaUnits].factor;
    }
  };

  const convertFromBaseUnits = (value: number, unit: string, type: 'pressure' | 'force' | 'area') => {
    if (type === 'pressure') {
      return value / pressureUnits[unit as keyof typeof pressureUnits].factor;
    } else if (type === 'force') {
      return value / forceUnits[unit as keyof typeof forceUnits].factor;
    } else {
      return value / areaUnits[unit as keyof typeof areaUnits].factor;
    }
  };

  const calculatePressure = () => {
    const f = parseFloat(force);
    const a = parseFloat(area);

    if (isNaN(f) || isNaN(a) || f <= 0 || a <= 0) {
      setResult(null);
      setCalculation('Please enter valid positive numerical values for force and area.');
      return;
    }

    // Convert to base units (N, m²)
    const forceInN = convertToBaseUnits(f, forceUnit, 'force');
    const areaInM2 = convertToBaseUnits(a, areaUnit, 'area');

    // Calculate pressure: P = F/A
    const pressureInPa = forceInN / areaInM2;
    const pressureInUnit = convertFromBaseUnits(pressureInPa, pressureUnit, 'pressure');

    setResult({
      value: pressureInUnit,
      unit: pressureUnit,
      variable: 'Pressure'
    });

    // Build calculation string
    let calcStr = `P = F / A\n`;
    calcStr += `P = ${formatValue(forceInN)} N / ${formatValue(areaInM2)} m²\n`;
    calcStr += `P = ${formatValue(pressureInPa)} Pa = ${formatValue(pressureInUnit)} ${pressureUnit}`;

    setCalculation(calcStr);
  };

  const calculateForce = () => {
    const p = parseFloat(pressure);
    const a = parseFloat(area);

    if (isNaN(p) || isNaN(a) || p <= 0 || a <= 0) {
      setResult(null);
      setCalculation('Please enter valid positive numerical values for pressure and area.');
      return;
    }

    // Convert to base units (Pa, m²)
    const pressureInPa = convertToBaseUnits(p, pressureUnit, 'pressure');
    const areaInM2 = convertToBaseUnits(a, areaUnit, 'area');

    // Calculate force: F = P × A
    const forceInN = pressureInPa * areaInM2;
    const forceInUnit = convertFromBaseUnits(forceInN, forceUnit, 'force');

    setResult({
      value: forceInUnit,
      unit: forceUnit,
      variable: 'Force'
    });

    // Build calculation string
    let calcStr = `F = P × A\n`;
    calcStr += `F = ${formatValue(pressureInPa)} Pa × ${formatValue(areaInM2)} m²\n`;
    calcStr += `F = ${formatValue(forceInN)} N = ${formatValue(forceInUnit)} ${forceUnit}`;

    setCalculation(calcStr);
  };

  const calculateArea = () => {
    const p = parseFloat(pressure);
    const f = parseFloat(force);

    if (isNaN(p) || isNaN(f) || p <= 0 || f <= 0) {
      setResult(null);
      setCalculation('Please enter valid positive numerical values for pressure and force.');
      return;
    }

    // Convert to base units (Pa, N)
    const pressureInPa = convertToBaseUnits(p, pressureUnit, 'pressure');
    const forceInN = convertToBaseUnits(f, forceUnit, 'force');

    // Calculate area: A = F/P
    const areaInM2 = forceInN / pressureInPa;
    const areaInUnit = convertFromBaseUnits(areaInM2, areaUnit, 'area');

    setResult({
      value: areaInUnit,
      unit: areaUnit,
      variable: 'Area'
    });

    // Build calculation string
    let calcStr = `A = F / P\n`;
    calcStr += `A = ${formatValue(forceInN)} N / ${formatValue(pressureInPa)} Pa\n`;
    calcStr += `A = ${formatValue(areaInM2)} m² = ${formatValue(areaInUnit)} ${areaUnit}`;

    setCalculation(calcStr);
  };

  const calculate = () => {
    switch (calculationType) {
      case 'pressure':
        calculatePressure();
        break;
      case 'force':
        calculateForce();
        break;
      case 'area':
        calculateArea();
        break;
    }
  };

  const clearAll = () => {
    setCalculationType('pressure');
    setPressure('');
    setForce('');
    setArea('');
    setPressureUnit('Pa');
    setForceUnit('N');
    setAreaUnit('m²');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Pressure Calculator</h2>
            <p className="text-gray-600">Calculate pressure, force, or area using P = F/A</p>
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
              onChange={(e) => setCalculationType(e.target.value as 'pressure' | 'force' | 'area')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="pressure">Pressure (P)</option>
              <option value="force">Force (F)</option>
              <option value="area">Area (A)</option>
            </select>
          </div>

          {calculationType === 'pressure' && (
            <>
              <div>
                <label htmlFor="force" className="block text-sm font-medium text-gray-700 mb-3">
                  Force (F)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="force"
                      type="number"
                      placeholder="Enter force"
                      value={force}
                      onChange={(e) => setForce(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={forceUnit}
                      onChange={(e) => setForceUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(forceUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-3">
                  Area (A)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="area"
                      type="number"
                      placeholder="Enter area"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={areaUnit}
                      onChange={(e) => setAreaUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(areaUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
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

          {calculationType === 'force' && (
            <>
              <div>
                <label htmlFor="pressure" className="block text-sm font-medium text-gray-700 mb-3">
                  Pressure (P)
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
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-3">
                  Area (A)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="area"
                      type="number"
                      placeholder="Enter area"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={areaUnit}
                      onChange={(e) => setAreaUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(areaUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="forceUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Result Force Unit
                </label>
                <select
                  id="forceUnit"
                  value={forceUnit}
                  onChange={(e) => setForceUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(forceUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {calculationType === 'area' && (
            <>
              <div>
                <label htmlFor="force" className="block text-sm font-medium text-gray-700 mb-3">
                  Force (F)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="force"
                      type="number"
                      placeholder="Enter force"
                      value={force}
                      onChange={(e) => setForce(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={forceUnit}
                      onChange={(e) => setForceUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(forceUnits).map(([key, unit]) => (
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
                  Pressure (P)
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
                <label htmlFor="areaUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Result Area Unit
                </label>
                <select
                  id="areaUnit"
                  value={areaUnit}
                  onChange={(e) => setAreaUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(areaUnits).map(([key, unit]) => (
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
              <li>• Select what you want to calculate: Pressure, Force, or Area</li>
              <li>• Enter the required values based on your selection</li>
              <li>• Select appropriate units for each parameter</li>
              <li>• Click &quot;Calculate&quot; to get the result with step-by-step calculations</li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}

