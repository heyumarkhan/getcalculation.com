'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors for force
const forceUnits = {
  'lbf': { name: 'Pound-force (lbf)', factor: 1 },
  'N': { name: 'Newton (N)', factor: 0.224809 },
  'kN': { name: 'Kilonewton (kN)', factor: 0.000224809 },
  'kgf': { name: 'Kilogram-force (kgf)', factor: 0.101972 }
};

// Unit conversion factors for distance
const distanceUnits = {
  'ft': { name: 'Foot (ft)', factor: 1 },
  'in': { name: 'Inch (in)', factor: 0.083333 },
  'm': { name: 'Meter (m)', factor: 3.28084 },
  'cm': { name: 'Centimeter (cm)', factor: 0.0328084 },
  'yd': { name: 'Yard (yd)', factor: 3 },
  'mi': { name: 'Mile (mi)', factor: 5280 }
};

// Unit conversion factors for energy (FPE as base unit)
const energyUnits = {
  'ft·lbf': { name: 'Foot-pound (ft·lbf)', factor: 1 },
  'J': { name: 'Joule (J)', factor: 1.35582 },
  'kJ': { name: 'Kilojoule (kJ)', factor: 1355.82 },
  'cal': { name: 'Calorie (cal)', factor: 0.323831 },
  'kcal': { name: 'Kilocalorie (kcal)', factor: 323.831 },
  'BTU': { name: 'BTU (BTU)', factor: 1254.85 },
  'Wh': { name: 'Watt-hour (Wh)', factor: 376.616 },
  'kWh': { name: 'Kilowatt-hour (kWh)', factor: 376616 }
};

interface FPECalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function FPECalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: FPECalculatorProps) {
  const [calculationType, setCalculationType] = useState<'energy' | 'force' | 'distance' | 'convert'>('energy');
  const [force, setForce] = useState('');
  const [distance, setDistance] = useState('');
  const [energy, setEnergy] = useState('');
  const [forceUnit, setForceUnit] = useState('lbf');
  const [distanceUnit, setDistanceUnit] = useState('ft');
  const [energyUnit, setEnergyUnit] = useState('ft·lbf');
  const [convertFromUnit, setConvertFromUnit] = useState('ft·lbf');
  const [convertToUnit, setConvertToUnit] = useState('J');
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

  const convertForceToBaseUnits = (value: number, unit: string): number => {
    return value * forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertDistanceToBaseUnits = (value: number, unit: string): number => {
    return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertEnergyToBaseUnits = (value: number, unit: string): number => {
    return value * energyUnits[unit as keyof typeof energyUnits].factor;
  };

  const convertForceFromBaseUnits = (value: number, unit: string): number => {
    return value / forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertDistanceFromBaseUnits = (value: number, unit: string): number => {
    return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertEnergyFromBaseUnits = (value: number, unit: string): number => {
    return value / energyUnits[unit as keyof typeof energyUnits].factor;
  };

  const calculateEnergy = () => {
    const f = parseFloat(force);
    const d = parseFloat(distance);

    if (isNaN(f) || isNaN(d) || f < 0 || d < 0) {
      setResult(null);
      setCalculation('Please enter valid non-negative numerical values for force and distance.');
      return;
    }

    // Convert to base units (lbf, ft)
    const fInLbf = convertForceToBaseUnits(f, forceUnit);
    const dInFt = convertDistanceToBaseUnits(d, distanceUnit);

    // Calculate energy: FPE = Force × Distance
    const fpeInFtLbf = fInLbf * dInFt;
    const fpeInUnit = convertEnergyFromBaseUnits(fpeInFtLbf, energyUnit);

    setResult({
      value: fpeInUnit,
      unit: energyUnit,
      variable: 'Foot-pounds of Energy'
    });

    let calcStr = `FPE = Force × Distance\n`;
    calcStr += `FPE = ${formatValue(fInLbf)} lbf × ${formatValue(dInFt)} ft\n`;
    calcStr += `FPE = ${formatValue(fpeInFtLbf)} ft·lbf = ${formatValue(fpeInUnit)} ${energyUnit}`;

    setCalculation(calcStr);
  };

  const calculateForce = () => {
    const fpe = parseFloat(energy);
    const d = parseFloat(distance);

    if (isNaN(fpe) || isNaN(d) || fpe < 0 || d <= 0) {
      setResult(null);
      setCalculation('Please enter valid values (non-negative energy, positive distance).');
      return;
    }

    // Convert to base units (ft·lbf, ft)
    const fpeInFtLbf = convertEnergyToBaseUnits(fpe, energyUnit);
    const dInFt = convertDistanceToBaseUnits(d, distanceUnit);

    // Calculate force: F = FPE / Distance
    const fInLbf = fpeInFtLbf / dInFt;
    const fInUnit = convertForceFromBaseUnits(fInLbf, forceUnit);

    setResult({
      value: fInUnit,
      unit: forceUnit,
      variable: 'Force'
    });

    let calcStr = `Force = FPE / Distance\n`;
    calcStr += `Force = ${formatValue(fpeInFtLbf)} ft·lbf / ${formatValue(dInFt)} ft\n`;
    calcStr += `Force = ${formatValue(fInLbf)} lbf = ${formatValue(fInUnit)} ${forceUnit}`;

    setCalculation(calcStr);
  };

  const calculateDistance = () => {
    const fpe = parseFloat(energy);
    const f = parseFloat(force);

    if (isNaN(fpe) || isNaN(f) || fpe < 0 || f <= 0) {
      setResult(null);
      setCalculation('Please enter valid values (non-negative energy, positive force).');
      return;
    }

    // Convert to base units (ft·lbf, lbf)
    const fpeInFtLbf = convertEnergyToBaseUnits(fpe, energyUnit);
    const fInLbf = convertForceToBaseUnits(f, forceUnit);

    // Calculate distance: D = FPE / Force
    const dInFt = fpeInFtLbf / fInLbf;
    const dInUnit = convertDistanceFromBaseUnits(dInFt, distanceUnit);

    setResult({
      value: dInUnit,
      unit: distanceUnit,
      variable: 'Distance'
    });

    let calcStr = `Distance = FPE / Force\n`;
    calcStr += `Distance = ${formatValue(fpeInFtLbf)} ft·lbf / ${formatValue(fInLbf)} lbf\n`;
    calcStr += `Distance = ${formatValue(dInFt)} ft = ${formatValue(dInUnit)} ${distanceUnit}`;

    setCalculation(calcStr);
  };

  const convertEnergy = () => {
    const val = parseFloat(energy);

    if (isNaN(val) || val < 0) {
      setResult(null);
      setCalculation('Please enter a valid non-negative energy value.');
      return;
    }

    // Convert from source unit to base (ft·lbf)
    const fpeInFtLbf = convertEnergyToBaseUnits(val, convertFromUnit);
    // Convert from base to target unit
    const convertedValue = convertEnergyFromBaseUnits(fpeInFtLbf, convertToUnit);

    setResult({
      value: convertedValue,
      unit: convertToUnit,
      variable: `Energy Conversion (${convertFromUnit} to ${convertToUnit})`
    });

    let calcStr = `${val} ${convertFromUnit} = ${formatValue(fpeInFtLbf)} ft·lbf\n`;
    calcStr += `${formatValue(fpeInFtLbf)} ft·lbf = ${formatValue(convertedValue)} ${convertToUnit}`;

    setCalculation(calcStr);
  };

  const calculate = () => {
    switch (calculationType) {
      case 'energy':
        calculateEnergy();
        break;
      case 'force':
        calculateForce();
        break;
      case 'distance':
        calculateDistance();
        break;
      case 'convert':
        convertEnergy();
        break;
    }
  };

  const clearAll = () => {
    setCalculationType('energy');
    setForce('');
    setDistance('');
    setEnergy('');
    setForceUnit('lbf');
    setDistanceUnit('ft');
    setEnergyUnit('ft·lbf');
    setConvertFromUnit('ft·lbf');
    setConvertToUnit('J');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">FPE Calculator (Foot-pounds of Energy)</h2>
            <p className="text-gray-600">Calculate foot-pounds of energy, force, or distance using FPE = Force × Distance</p>
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
              onChange={(e) => setCalculationType(e.target.value as 'energy' | 'force' | 'distance' | 'convert')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="energy">Foot-pounds of Energy (FPE)</option>
              <option value="force">Force</option>
              <option value="distance">Distance</option>
              <option value="convert">Convert Energy Units</option>
            </select>
          </div>

          {calculationType === 'energy' && (
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
                <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-3">
                  Distance (D)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="distance"
                      type="number"
                      placeholder="Enter distance"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={distanceUnit}
                      onChange={(e) => setDistanceUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(distanceUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="energyUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Result Energy Unit
                </label>
                <select
                  id="energyUnit"
                  value={energyUnit}
                  onChange={(e) => setEnergyUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(energyUnits).map(([key, unit]) => (
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
                <label htmlFor="energy" className="block text-sm font-medium text-gray-700 mb-3">
                  Foot-pounds of Energy (FPE)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="energy"
                      type="number"
                      placeholder="Enter energy"
                      value={energy}
                      onChange={(e) => setEnergy(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={energyUnit}
                      onChange={(e) => setEnergyUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(energyUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-3">
                  Distance (D)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="distance"
                      type="number"
                      placeholder="Enter distance"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={distanceUnit}
                      onChange={(e) => setDistanceUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(distanceUnits).map(([key, unit]) => (
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

          {calculationType === 'distance' && (
            <>
              <div>
                <label htmlFor="energy" className="block text-sm font-medium text-gray-700 mb-3">
                  Foot-pounds of Energy (FPE)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="energy"
                      type="number"
                      placeholder="Enter energy"
                      value={energy}
                      onChange={(e) => setEnergy(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={energyUnit}
                      onChange={(e) => setEnergyUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(energyUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

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
                <label htmlFor="distanceUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Result Distance Unit
                </label>
                <select
                  id="distanceUnit"
                  value={distanceUnit}
                  onChange={(e) => setDistanceUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(distanceUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {calculationType === 'convert' && (
            <>
              <div>
                <label htmlFor="energy" className="block text-sm font-medium text-gray-700 mb-3">
                  Energy Value to Convert
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="energy"
                      type="number"
                      placeholder="Enter energy value"
                      value={energy}
                      onChange={(e) => setEnergy(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={convertFromUnit}
                      onChange={(e) => setConvertFromUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(energyUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="convertToUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Convert To
                </label>
                <select
                  id="convertToUnit"
                  value={convertToUnit}
                  onChange={(e) => setConvertToUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(energyUnits).map(([key, unit]) => (
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
              <li>• Select what you want to calculate: FPE, Force, Distance, or Convert Units</li>
              <li>• Enter the required values based on your selection</li>
              <li>• Select appropriate units for each parameter</li>
              <li>• Click &quot;Calculate&quot; to get the result with step-by-step calculations</li>
              <li>• Foot-pounds is the Imperial unit of energy or work</li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}
