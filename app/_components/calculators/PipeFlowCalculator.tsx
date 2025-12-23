'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: m³/s, m/s, m, m²)
const flowRateUnits = {
  'm³/s': { name: 'm³/s (Cubic meters per second)', factor: 1 },
  'L/s': { name: 'L/s (Liters per second)', factor: 0.001 },
  'L/min': { name: 'L/min (Liters per minute)', factor: 0.0000166667 },
  'L/h': { name: 'L/h (Liters per hour)', factor: 0.000000277778 },
  'mL/s': { name: 'mL/s (Milliliters per second)', factor: 0.000001 },
  'gal/min': { name: 'gal/min (US GPM)', factor: 0.0000630902 },
  'gal/h': { name: 'gal/h (US)', factor: 0.0000010515 },
  'ft³/s': { name: 'ft³/s (Cubic feet per second)', factor: 0.0283168 },
  'ft³/min': { name: 'ft³/min (CFM)', factor: 0.000471947 },
  'in³/s': { name: 'in³/s (Cubic inches per second)', factor: 0.0000163871 }
};

const velocityUnits = {
  'm/s': { name: 'm/s (Meters per second)', factor: 1 },
  'cm/s': { name: 'cm/s (Centimeters per second)', factor: 0.01 },
  'mm/s': { name: 'mm/s (Millimeters per second)', factor: 0.001 },
  'km/h': { name: 'km/h (Kilometers per hour)', factor: 0.277778 },
  'ft/s': { name: 'ft/s (Feet per second)', factor: 0.3048 },
  'in/s': { name: 'in/s (Inches per second)', factor: 0.0254 },
  'mph': { name: 'mph (Miles per hour)', factor: 0.44704 }
};

const diameterUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 }
};

const areaUnits = {
  'm²': { name: 'm² (Square meters)', factor: 1 },
  'cm²': { name: 'cm² (Square centimeters)', factor: 0.0001 },
  'mm²': { name: 'mm² (Square millimeters)', factor: 0.000001 },
  'ft²': { name: 'ft² (Square feet)', factor: 0.092903 },
  'in²': { name: 'in² (Square inches)', factor: 0.00064516 }
};

export default function PipeFlowCalculator() {
  const [calculationType, setCalculationType] = useState<'flowRate' | 'velocity' | 'diameter' | 'area'>('flowRate');
  const [flowRate, setFlowRate] = useState('');
  const [velocity, setVelocity] = useState('');
  const [diameter, setDiameter] = useState('');
  const [area, setArea] = useState('');
  const [flowRateUnit, setFlowRateUnit] = useState('L/s');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [diameterUnit, setDiameterUnit] = useState('mm');
  const [areaUnit, setAreaUnit] = useState('cm²');
  const [result, setResult] = useState<{ value: number; unit: string; type: string } | null>(null);
  const [calculation, setCalculation] = useState('');
  const [error, setError] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    if (Math.abs(value) >= 1000000) {
      return value.toExponential(4);
    }
    return value.toFixed(4).replace(/\.?0+$/, '');
  };

  const convertFlowRateToBase = (value: number, unit: string): number => {
    return value * flowRateUnits[unit as keyof typeof flowRateUnits].factor;
  };

  const convertFlowRateFromBase = (value: number, unit: string): number => {
    return value / flowRateUnits[unit as keyof typeof flowRateUnits].factor;
  };

  const convertVelocityToBase = (value: number, unit: string): number => {
    return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertVelocityFromBase = (value: number, unit: string): number => {
    return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertDiameterToBase = (value: number, unit: string): number => {
    return value * diameterUnits[unit as keyof typeof diameterUnits].factor;
  };

  const convertDiameterFromBase = (value: number, unit: string): number => {
    return value / diameterUnits[unit as keyof typeof diameterUnits].factor;
  };

  const convertAreaToBase = (value: number, unit: string): number => {
    return value * areaUnits[unit as keyof typeof areaUnits].factor;
  };

  const convertAreaFromBase = (value: number, unit: string): number => {
    return value / areaUnits[unit as keyof typeof areaUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    if (calculationType === 'flowRate') {
      // Calculate flow rate: Q = A × v or Q = π × (D/2)² × v
      if (!velocity || (!area && !diameter)) {
        setError('Please enter velocity and either area or diameter');
        return;
      }

      const v = parseFloat(velocity);
      const a = area ? parseFloat(area) : NaN;
      const d = diameter ? parseFloat(diameter) : NaN;

      if (isNaN(v) || v <= 0) {
        setError('Please enter a valid positive number for velocity');
        return;
      }

      const velocityBase = convertVelocityToBase(v, velocityUnit);
      let areaBase: number;

      if (a && !isNaN(a) && a > 0) {
        areaBase = convertAreaToBase(a, areaUnit);
      } else if (d && !isNaN(d) && d > 0) {
        const diameterBase = convertDiameterToBase(d, diameterUnit);
        areaBase = Math.PI * Math.pow(diameterBase / 2, 2);
      } else {
        setError('Please enter either area or diameter');
        return;
      }

      const flowRateBase = areaBase * velocityBase;
      const flowRateResult = convertFlowRateFromBase(flowRateBase, flowRateUnit);

      setResult({ value: flowRateResult, unit: flowRateUnit, type: 'flowRate' });

      if (d && !isNaN(d) && d > 0) {
        const diameterBase = convertDiameterToBase(d, diameterUnit);
        setCalculation(`Q = A × v = π × (D/2)² × v\nQ = π × (${formatValue(diameterBase)} m / 2)² × ${formatValue(velocityBase)} m/s\nQ = π × ${formatValue(Math.pow(diameterBase / 2, 2))} m² × ${formatValue(velocityBase)} m/s\nQ = ${formatValue(flowRateBase)} m³/s = ${formatValue(flowRateResult)} ${flowRateUnit}`);
      } else {
        setCalculation(`Q = A × v\nQ = ${formatValue(areaBase)} m² × ${formatValue(velocityBase)} m/s\nQ = ${formatValue(flowRateBase)} m³/s = ${formatValue(flowRateResult)} ${flowRateUnit}`);
      }
    } else if (calculationType === 'velocity') {
      // Calculate velocity: v = Q / A or v = Q / (π × (D/2)²)
      if (!flowRate || (!area && !diameter)) {
        setError('Please enter flow rate and either area or diameter');
        return;
      }

      const q = parseFloat(flowRate);
      const a = area ? parseFloat(area) : NaN;
      const d = diameter ? parseFloat(diameter) : NaN;

      if (isNaN(q) || q <= 0) {
        setError('Please enter a valid positive number for flow rate');
        return;
      }

      const flowRateBase = convertFlowRateToBase(q, flowRateUnit);
      let areaBase: number;

      if (a && !isNaN(a) && a > 0) {
        areaBase = convertAreaToBase(a, areaUnit);
      } else if (d && !isNaN(d) && d > 0) {
        const diameterBase = convertDiameterToBase(d, diameterUnit);
        areaBase = Math.PI * Math.pow(diameterBase / 2, 2);
      } else {
        setError('Please enter either area or diameter');
        return;
      }

      if (areaBase === 0) {
        setError('Area cannot be zero');
        return;
      }

      const velocityBase = flowRateBase / areaBase;
      const velocityResult = convertVelocityFromBase(velocityBase, velocityUnit);

      setResult({ value: velocityResult, unit: velocityUnit, type: 'velocity' });

      if (d && !isNaN(d) && d > 0) {
        const diameterBase = convertDiameterToBase(d, diameterUnit);
        setCalculation(`v = Q / A = Q / (π × (D/2)²)\nv = ${formatValue(flowRateBase)} m³/s / (π × (${formatValue(diameterBase)} m / 2)²)\nv = ${formatValue(flowRateBase)} m³/s / ${formatValue(areaBase)} m²\nv = ${formatValue(velocityBase)} m/s = ${formatValue(velocityResult)} ${velocityUnit}`);
      } else {
        setCalculation(`v = Q / A\nv = ${formatValue(flowRateBase)} m³/s / ${formatValue(areaBase)} m²\nv = ${formatValue(velocityBase)} m/s = ${formatValue(velocityResult)} ${velocityUnit}`);
      }
    } else if (calculationType === 'diameter') {
      // Calculate diameter: D = 2 × √(Q / (π × v))
      if (!flowRate || !velocity) {
        setError('Please enter flow rate and velocity');
        return;
      }

      const q = parseFloat(flowRate);
      const v = parseFloat(velocity);

      if (isNaN(q) || q <= 0) {
        setError('Please enter a valid positive number for flow rate');
        return;
      }
      if (isNaN(v) || v <= 0) {
        setError('Please enter a valid positive number for velocity');
        return;
      }

      const flowRateBase = convertFlowRateToBase(q, flowRateUnit);
      const velocityBase = convertVelocityToBase(v, velocityUnit);

      if (velocityBase === 0) {
        setError('Velocity cannot be zero');
        return;
      }

      const diameterBase = 2 * Math.sqrt(flowRateBase / (Math.PI * velocityBase));
      const diameterResult = convertDiameterFromBase(diameterBase, diameterUnit);

      setResult({ value: diameterResult, unit: diameterUnit, type: 'diameter' });

      setCalculation(`D = 2 × √(Q / (π × v))\nD = 2 × √(${formatValue(flowRateBase)} m³/s / (π × ${formatValue(velocityBase)} m/s))\nD = 2 × √(${formatValue(flowRateBase / (Math.PI * velocityBase))})\nD = 2 × ${formatValue(Math.sqrt(flowRateBase / (Math.PI * velocityBase)))}\nD = ${formatValue(diameterBase)} m = ${formatValue(diameterResult)} ${diameterUnit}`);
    } else if (calculationType === 'area') {
      // Calculate area: A = Q / v
      if (!flowRate || !velocity) {
        setError('Please enter flow rate and velocity');
        return;
      }

      const q = parseFloat(flowRate);
      const v = parseFloat(velocity);

      if (isNaN(q) || q <= 0) {
        setError('Please enter a valid positive number for flow rate');
        return;
      }
      if (isNaN(v) || v <= 0) {
        setError('Please enter a valid positive number for velocity');
        return;
      }

      const flowRateBase = convertFlowRateToBase(q, flowRateUnit);
      const velocityBase = convertVelocityToBase(v, velocityUnit);

      if (velocityBase === 0) {
        setError('Velocity cannot be zero');
        return;
      }

      const areaBase = flowRateBase / velocityBase;
      const areaResult = convertAreaFromBase(areaBase, areaUnit);

      setResult({ value: areaResult, unit: areaUnit, type: 'area' });

      setCalculation(`A = Q / v\nA = ${formatValue(flowRateBase)} m³/s / ${formatValue(velocityBase)} m/s\nA = ${formatValue(areaBase)} m² = ${formatValue(areaResult)} ${areaUnit}`);
    }
  };

  const clearAll = () => {
    setCalculationType('flowRate');
    setFlowRate('');
    setVelocity('');
    setDiameter('');
    setArea('');
    setFlowRateUnit('L/s');
    setVelocityUnit('m/s');
    setDiameterUnit('mm');
    setAreaUnit('cm²');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pipe Flow Calculator</h2>
        <p className="text-gray-600">Calculate flow rate, velocity, diameter, or area in pipes</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Calculation Type:</p>
          <select
            value={calculationType}
            onChange={(e) => setCalculationType(e.target.value as 'flowRate' | 'velocity' | 'diameter' | 'area')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm font-medium"
          >
            <option value="flowRate">Calculate Flow Rate (Q)</option>
            <option value="velocity">Calculate Velocity (v)</option>
            <option value="diameter">Calculate Pipe Diameter (D)</option>
            <option value="area">Calculate Cross-Sectional Area (A)</option>
          </select>
          <p className="text-xs text-gray-500 mt-2">
            Formula: Q = A × v = π × (D/2)² × v
          </p>
        </div>

        {/* Flow Rate Input */}
        {(calculationType === 'velocity' || calculationType === 'diameter' || calculationType === 'area') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Flow Rate (Q)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter flow rate"
                  value={flowRate}
                  onChange={(e) => setFlowRate(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="w-40">
                <select
                  value={flowRateUnit}
                  onChange={(e) => setFlowRateUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(flowRateUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Velocity Input */}
        {(calculationType === 'flowRate' || calculationType === 'diameter' || calculationType === 'area') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Velocity (v)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter velocity"
                  value={velocity}
                  onChange={(e) => setVelocity(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
                <select
                  value={velocityUnit}
                  onChange={(e) => setVelocityUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(velocityUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Diameter Input (for flowRate and velocity calculations) */}
        {(calculationType === 'flowRate' || calculationType === 'velocity') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Pipe Diameter (D) <span className="text-gray-500 text-xs">(optional if area is provided)</span>
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter diameter"
                  value={diameter}
                  onChange={(e) => setDiameter(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
                <select
                  value={diameterUnit}
                  onChange={(e) => setDiameterUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(diameterUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Area Input (alternative to diameter) */}
        {(calculationType === 'flowRate' || calculationType === 'velocity') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Cross-Sectional Area (A) <span className="text-gray-500 text-xs">(optional if diameter is provided)</span>
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
                <select
                  value={areaUnit}
                  onChange={(e) => setAreaUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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
        )}

        <div className="flex gap-3 pt-2">
          <Button onClick={calculate} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg">
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">Result</h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && (
              <div className="mt-4 pt-4 border-t border-[#820ECC]/30">
                <p className="text-xs text-gray-600 mb-2 font-semibold">Calculation Steps:</p>
                <p className="text-sm text-[#820ECC]/80 font-mono whitespace-pre-line break-words">
                  {calculation}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {calculationType === 'flowRate' && (
              <>
                <li>• Enter velocity and either diameter or area</li>
                <li>• Formula: Q = A × v = π × (D/2)² × v</li>
                <li>• For circular pipes: Q = π × (D/2)² × v</li>
              </>
            )}
            {calculationType === 'velocity' && (
              <>
                <li>• Enter flow rate and either diameter or area</li>
                <li>• Formula: v = Q / A = Q / (π × (D/2)²)</li>
                <li>• For circular pipes: v = Q / (π × (D/2)²)</li>
              </>
            )}
            {calculationType === 'diameter' && (
              <>
                <li>• Enter flow rate and velocity</li>
                <li>• Formula: D = 2 × √(Q / (π × v))</li>
                <li>• Calculates required pipe diameter for given flow rate and velocity</li>
              </>
            )}
            {calculationType === 'area' && (
              <>
                <li>• Enter flow rate and velocity</li>
                <li>• Formula: A = Q / v</li>
                <li>• Calculates required cross-sectional area</li>
              </>
            )}
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• All values should be positive numbers</li>
            <li>• For circular pipes, use diameter; for other shapes, use area</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

