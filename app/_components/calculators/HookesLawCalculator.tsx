'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface HookesLawCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Unit conversion factors (all relative to base units: N, N/m, m)
const forceUnits = {
  'N': { name: 'N (Newtons)', factor: 1 },
  'kN': { name: 'kN (Kilonewtons)', factor: 1000 },
  'mN': { name: 'mN (Millinewtons)', factor: 0.001 },
  'lb': { name: 'lb (Pounds-force)', factor: 4.44822 },
  'oz': { name: 'oz (Ounce-force)', factor: 0.278014 },
  'dyn': { name: 'dyn (Dynes)', factor: 0.00001 }
};

const springConstantUnits = {
  'N/m': { name: 'N/m (Newtons per meter)', factor: 1 },
  'N/cm': { name: 'N/cm (Newtons per centimeter)', factor: 100 },
  'N/mm': { name: 'N/mm (Newtons per millimeter)', factor: 1000 },
  'kN/m': { name: 'kN/m (Kilonewtons per meter)', factor: 1000 },
  'lb/in': { name: 'lb/in (Pounds-force per inch)', factor: 175.127 },
  'lb/ft': { name: 'lb/ft (Pounds-force per foot)', factor: 14.5939 }
};

const displacementUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'in': { name: 'in (Inches)', factor: 0.0254 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 }
};

export default function HookesLawCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: HookesLawCalculatorProps) {
  const [force, setForce] = useState('');
  const [springConstant, setSpringConstant] = useState('');
  const [displacement, setDisplacement] = useState('');
  const [forceUnit, setForceUnit] = useState('N');
  const [springConstantUnit, setSpringConstantUnit] = useState('N/m');
  const [displacementUnit, setDisplacementUnit] = useState('m');
  const [result, setResult] = useState<{
    value: number;
    unit: string;
    type: 'force' | 'springConstant' | 'displacement';
  } | null>(null);
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

  const convertForceToBase = (value: number, unit: string) => {
    return value * forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertForceFromBase = (value: number, unit: string) => {
    return value / forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertSpringConstantToBase = (value: number, unit: string) => {
    return value * springConstantUnits[unit as keyof typeof springConstantUnits].factor;
  };

  const convertSpringConstantFromBase = (value: number, unit: string) => {
    return value / springConstantUnits[unit as keyof typeof springConstantUnits].factor;
  };

  const convertDisplacementToBase = (value: number, unit: string) => {
    return value * displacementUnits[unit as keyof typeof displacementUnits].factor;
  };

  const convertDisplacementFromBase = (value: number, unit: string) => {
    return value / displacementUnits[unit as keyof typeof displacementUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const f = force ? parseFloat(force) : NaN;
    const k = springConstant ? parseFloat(springConstant) : NaN;
    const x = displacement ? parseFloat(displacement) : NaN;

    const filledCount = [force, springConstant, displacement].filter(val => val !== '').length;

    if (filledCount !== 2) {
      setError('Please enter exactly two values to calculate the third');
      return;
    }

    // Validate that filled values are valid positive numbers
    if (force && (isNaN(f) || f < 0)) {
      setError('Force must be a valid non-negative number');
      return;
    }
    if (springConstant && (isNaN(k) || k <= 0)) {
      setError('Spring constant must be a valid positive number');
      return;
    }
    if (displacement && (isNaN(x) || x < 0)) {
      setError('Displacement must be a valid non-negative number');
      return;
    }

    // Convert to base units
    if (!force) {
      // Calculate force: F = k × x
      const kBase = convertSpringConstantToBase(k, springConstantUnit);
      const xBase = convertDisplacementToBase(x, displacementUnit);
      const fBase = kBase * xBase;
      const fResult = convertForceFromBase(fBase, forceUnit);
      
      setResult({ value: fResult, unit: forceUnit, type: 'force' });
      
      const steps = [
        `Given:`,
        `  Spring constant (k) = ${formatValue(k)} ${springConstantUnit} = ${formatValue(kBase)} N/m`,
        `  Displacement (x) = ${formatValue(x)} ${displacementUnit} = ${formatValue(xBase)} m`,
        ``,
        `Calculate force using Hooke's Law:`,
        `  F = k × x`,
        `  F = ${formatValue(kBase)} × ${formatValue(xBase)}`,
        `  F = ${formatValue(fBase)} N = ${formatValue(fResult)} ${forceUnits[forceUnit as keyof typeof forceUnits]?.name || forceUnit}`
      ];
      setCalculation(steps.join('\n'));
    } else if (!springConstant) {
      // Calculate spring constant: k = F / x
      const fBase = convertForceToBase(f, forceUnit);
      const xBase = convertDisplacementToBase(x, displacementUnit);
      
      if (xBase === 0) {
        setError('Displacement cannot be zero when calculating spring constant');
        return;
      }
      
      const kBase = fBase / xBase;
      const kResult = convertSpringConstantFromBase(kBase, springConstantUnit);
      
      setResult({ value: kResult, unit: springConstantUnit, type: 'springConstant' });
      
      const steps = [
        `Given:`,
        `  Force (F) = ${formatValue(f)} ${forceUnit} = ${formatValue(fBase)} N`,
        `  Displacement (x) = ${formatValue(x)} ${displacementUnit} = ${formatValue(xBase)} m`,
        ``,
        `Calculate spring constant using Hooke's Law:`,
        `  k = F / x`,
        `  k = ${formatValue(fBase)} / ${formatValue(xBase)}`,
        `  k = ${formatValue(kBase)} N/m = ${formatValue(kResult)} ${springConstantUnits[springConstantUnit as keyof typeof springConstantUnits]?.name || springConstantUnit}`
      ];
      setCalculation(steps.join('\n'));
    } else if (!displacement) {
      // Calculate displacement: x = F / k
      const fBase = convertForceToBase(f, forceUnit);
      const kBase = convertSpringConstantToBase(k, springConstantUnit);
      
      if (kBase === 0) {
        setError('Spring constant cannot be zero when calculating displacement');
        return;
      }
      
      const xBase = fBase / kBase;
      const xResult = convertDisplacementFromBase(xBase, displacementUnit);
      
      setResult({ value: xResult, unit: displacementUnit, type: 'displacement' });
      
      const steps = [
        `Given:`,
        `  Force (F) = ${formatValue(f)} ${forceUnit} = ${formatValue(fBase)} N`,
        `  Spring constant (k) = ${formatValue(k)} ${springConstantUnit} = ${formatValue(kBase)} N/m`,
        ``,
        `Calculate displacement using Hooke's Law:`,
        `  x = F / k`,
        `  x = ${formatValue(fBase)} / ${formatValue(kBase)}`,
        `  x = ${formatValue(xBase)} m = ${formatValue(xResult)} ${displacementUnits[displacementUnit as keyof typeof displacementUnits]?.name || displacementUnit}`
      ];
      setCalculation(steps.join('\n'));
    }
  };

  const clearAll = () => {
    setForce('');
    setSpringConstant('');
    setDisplacement('');
    setForceUnit('N');
    setSpringConstantUnit('N/m');
    setDisplacementUnit('m');
    setResult(null);
    setCalculation('');
    setError('');
  };

  const getResultColor = () => {
    return 'bg-[#820ECC]/10 border-[#820ECC]/30';
  };

  const getResultTextColor = () => {
    return 'text-[#820ECC]';
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hooke&apos;s Law Calculator</h2>
          <p className="text-gray-600">Calculate force, spring constant, or displacement using F = k × x</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Hooke&apos;s Law Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">F = k × x</p>
          <p className="text-sm text-gray-600 mt-1">Where: F = Force, k = Spring constant, x = Displacement</p>
        </div>

        {/* Force Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Force (F)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter force (leave empty to calculate)"
                value={force}
                onChange={(e) => setForce(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={forceUnit}
                onChange={(e) => setForceUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        {/* Spring Constant Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Spring Constant (k)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter spring constant (leave empty to calculate)"
                value={springConstant}
                onChange={(e) => setSpringConstant(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={springConstantUnit}
                onChange={(e) => setSpringConstantUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(springConstantUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Displacement Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Displacement (x)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter displacement (leave empty to calculate)"
                value={displacement}
                onChange={(e) => setDisplacement(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={displacementUnit}
                onChange={(e) => setDisplacementUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(displacementUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button 
            onClick={calculate} 
            className="flex-1"
            style={{ backgroundColor: primaryColor }}
          >
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-mono">{error}</p>
          </div>
        )}

        {result && (
          <div className={`mt-6 p-4 ${getResultColor()} border rounded-lg`}>
            <h3 className={`text-lg font-semibold ${getResultTextColor()} mb-3`}>Result</h3>
            <div className="space-y-2">
              <div>
                <p className={`text-sm ${getResultTextColor()}/80`}>
                  {result.type === 'force' && 'Force (F)'}
                  {result.type === 'springConstant' && 'Spring Constant (k)'}
                  {result.type === 'displacement' && 'Displacement (x)'}
                </p>
                <p className={`text-xl font-bold ${getResultTextColor()}`}>
                  {formatValue(result.value)} {result.unit}
                </p>
              </div>
            </div>
            {calculation && (
              <div className={`text-sm ${getResultTextColor()}/80 mt-4 font-mono whitespace-pre-line border-t ${getResultTextColor()}/20 pt-3`}>
                {calculation}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">How It Works</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Enter any two values to calculate the third (Force, Spring Constant, or Displacement)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: F = k × x (Hooke&apos;s Law)</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• Force and displacement can be zero or positive; spring constant must be positive</li>
            <li>• Hooke&apos;s Law applies to elastic materials within their elastic limit</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

