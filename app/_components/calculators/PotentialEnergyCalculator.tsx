'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Standard gravitational acceleration on Earth: 9.80665 m/s²
const g_EARTH = 9.80665;

// Unit conversion factors (all relative to base units: J, kg, m/s², m)
const energyUnits = {
  'J': { name: 'J (Joules)', factor: 1 },
  'kJ': { name: 'kJ (Kilojoules)', factor: 1000 },
  'cal': { name: 'cal (Calories)', factor: 4.184 },
  'kcal': { name: 'kcal (Kilocalories)', factor: 4184 },
  'BTU': { name: 'BTU', factor: 1055.06 },
  'eV': { name: 'eV (Electron-volts)', factor: 1.602176634e-19 },
  'Wh': { name: 'Wh (Watt-hours)', factor: 3600 }
};

const massUnits = {
  'kg': { name: 'kg (Kilograms)', factor: 1 },
  'g': { name: 'g (Grams)', factor: 0.001 },
  'mg': { name: 'mg (Milligrams)', factor: 0.000001 },
  'lb': { name: 'lb (Pounds)', factor: 0.453592 },
  'oz': { name: 'oz (Ounces)', factor: 0.0283495 },
  'ton': { name: 'ton (Metric tons)', factor: 1000 },
  'ton_us': { name: 'ton (US tons)', factor: 907.185 }
};

const accelerationUnits = {
  'm/s²': { name: 'm/s² (Meters per second squared)', factor: 1 },
  'ft/s²': { name: 'ft/s² (Feet per second squared)', factor: 0.3048 },
  'cm/s²': { name: 'cm/s² (Centimeters per second squared)', factor: 0.01 }
};

const distanceUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 },
  'mi': { name: 'mi (Miles)', factor: 1609.34 },
  'yd': { name: 'yd (Yards)', factor: 0.9144 }
};

export default function PotentialEnergyCalculator() {
  const [potentialEnergy, setPotentialEnergy] = useState('');
  const [mass, setMass] = useState('');
  const [gravity, setGravity] = useState('');
  const [height, setHeight] = useState('');
  const [energyUnit, setEnergyUnit] = useState('J');
  const [massUnit, setMassUnit] = useState('kg');
  const [accelerationUnit, setAccelerationUnit] = useState('m/s²');
  const [distanceUnit, setDistanceUnit] = useState('m');
  const [useStandardG, setUseStandardG] = useState(true);
  const [result, setResult] = useState<{ value: number; unit: string; type: 'energy' | 'mass' | 'gravity' | 'height' } | null>(null);
  const [calculation, setCalculation] = useState('');

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

  const convertEnergyToBase = (value: number, unit: string) => {
    return value * energyUnits[unit as keyof typeof energyUnits].factor;
  };

  const convertEnergyFromBase = (value: number, unit: string) => {
    return value / energyUnits[unit as keyof typeof energyUnits].factor;
  };

  const convertMassToBase = (value: number, unit: string) => {
    return value * massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertMassFromBase = (value: number, unit: string) => {
    return value / massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertAccelerationToBase = (value: number, unit: string) => {
    return value * accelerationUnits[unit as keyof typeof accelerationUnits].factor;
  };

  const convertAccelerationFromBase = (value: number, unit: string) => {
    return value / accelerationUnits[unit as keyof typeof accelerationUnits].factor;
  };

  const convertDistanceToBase = (value: number, unit: string) => {
    return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertDistanceFromBase = (value: number, unit: string) => {
    return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const calculate = () => {
    const pe = potentialEnergy ? parseFloat(potentialEnergy) : NaN;
    const m = mass ? parseFloat(mass) : NaN;
    const g = useStandardG ? g_EARTH : (gravity ? parseFloat(gravity) : NaN);
    const h = height ? parseFloat(height) : NaN;

    // Count how many values are filled (including standard g)
    const filledCount = [potentialEnergy, mass, height, useStandardG ? 'g' : gravity].filter(val => val !== '').length;

    if (filledCount < 3) {
      setResult(null);
      setCalculation('');
      return;
    }

    if (filledCount > 3) {
      setResult(null);
      setCalculation('Error: Please enter exactly 3 values (leave one empty to calculate it)');
      return;
    }

    // Validate that filled values are valid numbers
    if (potentialEnergy && (isNaN(pe) || pe < 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid non-negative number for potential energy');
      return;
    }
    if (mass && (isNaN(m) || m <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for mass');
      return;
    }
    if (!useStandardG && gravity && (isNaN(g) || g <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for gravitational acceleration');
      return;
    }
    if (height && (isNaN(h) || h < 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid non-negative number for height');
      return;
    }

    // Convert to base units for calculation
    const peBase = potentialEnergy ? convertEnergyToBase(pe, energyUnit) : NaN;
    const mBase = mass ? convertMassToBase(m, massUnit) : NaN;
    const gBase = g ? convertAccelerationToBase(g, accelerationUnit) : NaN;
    const hBase = height ? convertDistanceToBase(h, distanceUnit) : NaN;

    // Potential Energy formula: PE = m × g × h
    // Rearrange to solve for the missing variable

    if (!potentialEnergy) {
      // Calculate PE: PE = m × g × h
      const peBaseResult = mBase * gBase * hBase;
      if (peBaseResult < 0) {
        setResult(null);
        setCalculation('Error: Calculated potential energy must be non-negative');
        return;
      }
      const peResult = convertEnergyFromBase(peBaseResult, energyUnit);
      
      const gDisplay = useStandardG ? `${formatValue(g_EARTH)}` : formatValue(g);
      setResult({ value: peResult, unit: energyUnit, type: 'energy' });
      setCalculation(`Potential Energy = Mass × Gravity × Height = ${formatValue(m)} ${massUnit} × ${gDisplay} ${accelerationUnit} × ${formatValue(h)} ${distanceUnit} = ${formatValue(peResult)} ${energyUnit}`);
    } else if (!mass) {
      // Calculate m: m = PE / (g × h)
      if (gBase * hBase === 0) {
        setResult(null);
        setCalculation('Error: Gravity and height cannot both be zero');
        return;
      }
      const mBaseResult = peBase / (gBase * hBase);
      if (mBaseResult <= 0) {
        setResult(null);
        setCalculation('Error: Calculated mass must be positive');
        return;
      }
      const mResult = convertMassFromBase(mBaseResult, massUnit);
      
      const gDisplay = useStandardG ? `${formatValue(g_EARTH)}` : formatValue(g);
      setResult({ value: mResult, unit: massUnit, type: 'mass' });
      setCalculation(`Mass = Potential Energy / (Gravity × Height) = ${formatValue(pe)} ${energyUnit} / (${gDisplay} ${accelerationUnit} × ${formatValue(h)} ${distanceUnit}) = ${formatValue(mResult)} ${massUnit}`);
    } else if (!height) {
      // Calculate h: h = PE / (m × g)
      if (mBase * gBase === 0) {
        setResult(null);
        setCalculation('Error: Mass and gravity cannot both be zero');
        return;
      }
      const hBaseResult = peBase / (mBase * gBase);
      if (hBaseResult < 0) {
        setResult(null);
        setCalculation('Error: Calculated height must be non-negative');
        return;
      }
      const hResult = convertDistanceFromBase(hBaseResult, distanceUnit);
      
      const gDisplay = useStandardG ? `${formatValue(g_EARTH)}` : formatValue(g);
      setResult({ value: hResult, unit: distanceUnit, type: 'height' });
      setCalculation(`Height = Potential Energy / (Mass × Gravity) = ${formatValue(pe)} ${energyUnit} / (${formatValue(m)} ${massUnit} × ${gDisplay} ${accelerationUnit}) = ${formatValue(hResult)} ${distanceUnit}`);
    } else if (!useStandardG && !gravity) {
      // Calculate g: g = PE / (m × h)
      if (mBase * hBase === 0) {
        setResult(null);
        setCalculation('Error: Mass and height cannot both be zero');
        return;
      }
      const gBaseResult = peBase / (mBase * hBase);
      if (gBaseResult <= 0) {
        setResult(null);
        setCalculation('Error: Calculated gravitational acceleration must be positive');
        return;
      }
      const gResult = convertAccelerationFromBase(gBaseResult, accelerationUnit);
      
      setResult({ value: gResult, unit: accelerationUnit, type: 'gravity' });
      setCalculation(`Gravitational Acceleration = Potential Energy / (Mass × Height) = ${formatValue(pe)} ${energyUnit} / (${formatValue(m)} ${massUnit} × ${formatValue(h)} ${distanceUnit}) = ${formatValue(gResult)} ${accelerationUnit}`);
    }
  };

  const clearAll = () => {
    setPotentialEnergy('');
    setMass('');
    setGravity('');
    setHeight('');
    setEnergyUnit('J');
    setMassUnit('kg');
    setAccelerationUnit('m/s²');
    setDistanceUnit('m');
    setUseStandardG(true);
    setResult(null);
    setCalculation('');
  };

  const getResultColor = () => {
    return 'bg-[#820ECC]/10 border-[#820ECC]/30';
  };

  const getResultTextColor = () => {
    return 'text-[#820ECC]';
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Potential Energy Calculator</h2>
        <p className="text-gray-600">Calculate potential energy using PE = m × g × h</p>
      </div>

      <div className="space-y-6">
        {/* Standard Gravity Toggle */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <input
            type="checkbox"
            id="useStandardG"
            checked={useStandardG}
            onChange={(e) => {
              setUseStandardG(e.target.checked);
              if (e.target.checked) {
                setGravity('');
              }
            }}
            className="w-4 h-4 text-[#820ECC] border-gray-300 rounded focus:ring-[#820ECC]"
          />
          <label htmlFor="useStandardG" className="text-sm font-medium text-gray-700 cursor-pointer">
            Use standard Earth gravity (g = {g_EARTH} m/s²)
          </label>
        </div>

        {/* Potential Energy Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Potential Energy (PE)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter potential energy"
                value={potentialEnergy}
                onChange={(e) => setPotentialEnergy(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={energyUnit}
                onChange={(e) => setEnergyUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        {/* Mass Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Mass (m)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter mass"
                value={mass}
                onChange={(e) => setMass(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={massUnit}
                onChange={(e) => setMassUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(massUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Gravity Input (only shown if not using standard g) */}
        {!useStandardG && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Gravitational Acceleration (g)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter gravitational acceleration"
                  value={gravity}
                  onChange={(e) => setGravity(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-40">
                <select
                  value={accelerationUnit}
                  onChange={(e) => setAccelerationUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(accelerationUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Height Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Height (h)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={distanceUnit}
                onChange={(e) => setDistanceUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        <div className="flex gap-3 pt-2">
          <Button onClick={calculate} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className={`mt-6 p-4 ${getResultColor()} border rounded-lg`}>
            <h3 className={`text-lg font-semibold ${getResultTextColor()} mb-2`}>Result</h3>
            <p className={`text-2xl font-bold ${getResultTextColor()}`}>
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && (
              <p className={`text-sm ${getResultTextColor()}/80 mt-2 font-mono break-words`}>
                {calculation}
              </p>
            )}
          </div>
        )}

        {calculation && calculation.startsWith('Error:') && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-mono">{calculation}</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Enter any three values to calculate the fourth (Potential Energy, Mass, Gravity, or Height)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: PE = m × g × h (Potential Energy = Mass × Gravity × Height)</li>
            <li>• By default, uses standard Earth gravity (g = 9.80665 m/s²)</li>
            <li>• Uncheck the box to use a custom gravitational acceleration value</li>
            <li>• Mass and gravity must be positive, height must be non-negative</li>
            <li>• Potential energy is relative to the reference point (height = 0)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

