'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: N, kg, m/s², degrees)
const forceUnits = {
  'N': { name: 'N (Newtons)', factor: 1 },
  'kN': { name: 'kN (Kilonewtons)', factor: 1000 },
  'mN': { name: 'mN (Millinewtons)', factor: 0.001 },
  'lb': { name: 'lb (Pounds-force)', factor: 4.44822 },
  'oz': { name: 'oz (Ounce-force)', factor: 0.278014 },
  'dyn': { name: 'dyn (Dynes)', factor: 0.00001 }
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
  'cm/s²': { name: 'cm/s² (Centimeters per second squared)', factor: 0.01 },
  'ft/s²': { name: 'ft/s² (Feet per second squared)', factor: 0.3048 },
  'g': { name: 'g (Standard gravity)', factor: 9.80665 },
  'km/h²': { name: 'km/h²', factor: 0.00007716 }
};

export default function NormalForceCalculator() {
  const [normalForce, setNormalForce] = useState('');
  const [mass, setMass] = useState('');
  const [gravity, setGravity] = useState('');
  const [angle, setAngle] = useState('');
  const [useInclined, setUseInclined] = useState(false);
  const [forceUnit, setForceUnit] = useState('N');
  const [massUnit, setMassUnit] = useState('kg');
  const [accelerationUnit, setAccelerationUnit] = useState('m/s²');
  const [angleUnit, setAngleUnit] = useState('deg');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'force' | 'mass' | 'gravity' | 'angle' } | null>(null);
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
    return value.toLocaleString('en-US', { maximumFractionDigits: 6, useGrouping: true });
  };

  const convertForceToBase = (value: number, unit: string) => {
    return value * forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertForceFromBase = (value: number, unit: string) => {
    return value / forceUnits[unit as keyof typeof forceUnits].factor;
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

  const convertAngleToRadians = (value: number, unit: string) => {
    if (unit === 'rad') return value;
    return (value * Math.PI) / 180;
  };

  const convertAngleFromRadians = (value: number, unit: string) => {
    if (unit === 'rad') return value;
    return (value * 180) / Math.PI;
  };

  const calculate = () => {
    const N = normalForce ? parseFloat(normalForce) : NaN;
    const m = mass ? parseFloat(mass) : NaN;
    const g = gravity ? parseFloat(gravity) : NaN;
    const θ = angle ? parseFloat(angle) : NaN;

    // For horizontal surface, we need: N, m, g (3 values, enter 2 to find 1)
    // For inclined plane, we need: N, m, g, θ (4 values, enter 3 to find 1)
    
    if (!useInclined) {
      // Horizontal surface: N = m × g
      const filledCount = [normalForce, mass, gravity].filter(val => val !== '').length;
      
      if (filledCount !== 2) {
        setResult(null);
        setCalculation('');
        return;
      }

      // Validate inputs
      if (normalForce && (isNaN(N) || N < 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid non-negative number for normal force');
        return;
      }
      if (mass && (isNaN(m) || m <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for mass');
        return;
      }
      if (gravity && (isNaN(g) || g <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for gravity');
        return;
      }

      if (!normalForce && mass && gravity) {
        // Calculate normal force: N = m × g
        const mBase = convertMassToBase(m, massUnit);
        const gBase = convertAccelerationToBase(g, accelerationUnit);
        const NBase = mBase * gBase;
        const NResult = convertForceFromBase(NBase, forceUnit);
        
        setResult({ value: NResult, unit: forceUnit, type: 'force' });
        setCalculation(`N = m × g\nN = ${formatValue(m)} ${massUnit} × ${formatValue(g)} ${accelerationUnit}\nN = ${formatValue(mBase)} kg × ${formatValue(gBase)} m/s²\nN = ${formatValue(NBase)} N = ${formatValue(NResult)} ${forceUnit}`);
      } else if (!mass && normalForce && gravity) {
        // Calculate mass: m = N / g
        const NBase = convertForceToBase(N, forceUnit);
        const gBase = convertAccelerationToBase(g, accelerationUnit);
        
        if (gBase === 0) {
          setResult(null);
          setCalculation('Error: Gravity cannot be zero');
          return;
        }
        
        const mBase = NBase / gBase;
        const mResult = convertMassFromBase(mBase, massUnit);
        
        setResult({ value: mResult, unit: massUnit, type: 'mass' });
        setCalculation(`m = N / g\nm = ${formatValue(N)} ${forceUnit} / ${formatValue(g)} ${accelerationUnit}\nm = ${formatValue(NBase)} N / ${formatValue(gBase)} m/s²\nm = ${formatValue(mBase)} kg = ${formatValue(mResult)} ${massUnit}`);
      } else if (!gravity && normalForce && mass) {
        // Calculate gravity: g = N / m
        const NBase = convertForceToBase(N, forceUnit);
        const mBase = convertMassToBase(m, massUnit);
        
        if (mBase === 0) {
          setResult(null);
          setCalculation('Error: Mass cannot be zero');
          return;
        }
        
        const gBase = NBase / mBase;
        const gResult = convertAccelerationFromBase(gBase, accelerationUnit);
        
        setResult({ value: gResult, unit: accelerationUnit, type: 'gravity' });
        setCalculation(`g = N / m\ng = ${formatValue(N)} ${forceUnit} / ${formatValue(m)} ${massUnit}\ng = ${formatValue(NBase)} N / ${formatValue(mBase)} kg\ng = ${formatValue(gBase)} m/s² = ${formatValue(gResult)} ${accelerationUnit}`);
      }
    } else {
      // Inclined plane: N = m × g × cos(θ)
      const filledCount = [normalForce, mass, gravity, angle].filter(val => val !== '').length;
      
      if (filledCount !== 3) {
        setResult(null);
        setCalculation('');
        return;
      }

      // Validate inputs
      if (normalForce && (isNaN(N) || N < 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid non-negative number for normal force');
        return;
      }
      if (mass && (isNaN(m) || m <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for mass');
        return;
      }
      if (gravity && (isNaN(g) || g <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for gravity');
        return;
      }
      if (angle && (isNaN(θ) || θ < 0 || θ > 90)) {
        setResult(null);
        setCalculation('Error: Please enter a valid angle between 0° and 90°');
        return;
      }

      if (!normalForce && mass && gravity && angle) {
        // Calculate normal force: N = m × g × cos(θ)
        const mBase = convertMassToBase(m, massUnit);
        const gBase = convertAccelerationToBase(g, accelerationUnit);
        const θRad = convertAngleToRadians(θ, angleUnit);
        const NBase = mBase * gBase * Math.cos(θRad);
        const NResult = convertForceFromBase(NBase, forceUnit);
        
        setResult({ value: NResult, unit: forceUnit, type: 'force' });
        setCalculation(`N = m × g × cos(θ)\nN = ${formatValue(m)} ${massUnit} × ${formatValue(g)} ${accelerationUnit} × cos(${formatValue(θ)}°)\nN = ${formatValue(mBase)} kg × ${formatValue(gBase)} m/s² × cos(${formatValue(θRad)} rad)\nN = ${formatValue(NBase)} N = ${formatValue(NResult)} ${forceUnit}`);
      } else if (!mass && normalForce && gravity && angle) {
        // Calculate mass: m = N / (g × cos(θ))
        const NBase = convertForceToBase(N, forceUnit);
        const gBase = convertAccelerationToBase(g, accelerationUnit);
        const θRad = convertAngleToRadians(θ, angleUnit);
        const cosθ = Math.cos(θRad);
        
        if (gBase === 0 || cosθ === 0) {
          setResult(null);
          setCalculation('Error: Gravity and cos(θ) cannot be zero');
          return;
        }
        
        const mBase = NBase / (gBase * cosθ);
        const mResult = convertMassFromBase(mBase, massUnit);
        
        setResult({ value: mResult, unit: massUnit, type: 'mass' });
        setCalculation(`m = N / (g × cos(θ))\nm = ${formatValue(N)} ${forceUnit} / (${formatValue(g)} ${accelerationUnit} × cos(${formatValue(θ)}°))\nm = ${formatValue(NBase)} N / (${formatValue(gBase)} m/s² × ${formatValue(cosθ)})\nm = ${formatValue(mBase)} kg = ${formatValue(mResult)} ${massUnit}`);
      } else if (!gravity && normalForce && mass && angle) {
        // Calculate gravity: g = N / (m × cos(θ))
        const NBase = convertForceToBase(N, forceUnit);
        const mBase = convertMassToBase(m, massUnit);
        const θRad = convertAngleToRadians(θ, angleUnit);
        const cosθ = Math.cos(θRad);
        
        if (mBase === 0 || cosθ === 0) {
          setResult(null);
          setCalculation('Error: Mass and cos(θ) cannot be zero');
          return;
        }
        
        const gBase = NBase / (mBase * cosθ);
        const gResult = convertAccelerationFromBase(gBase, accelerationUnit);
        
        setResult({ value: gResult, unit: accelerationUnit, type: 'gravity' });
        setCalculation(`g = N / (m × cos(θ))\ng = ${formatValue(N)} ${forceUnit} / (${formatValue(m)} ${massUnit} × cos(${formatValue(θ)}°))\ng = ${formatValue(NBase)} N / (${formatValue(mBase)} kg × ${formatValue(cosθ)})\ng = ${formatValue(gBase)} m/s² = ${formatValue(gResult)} ${accelerationUnit}`);
      } else if (!angle && normalForce && mass && gravity) {
        // Calculate angle: θ = arccos(N / (m × g))
        const NBase = convertForceToBase(N, forceUnit);
        const mBase = convertMassToBase(m, massUnit);
        const gBase = convertAccelerationToBase(g, accelerationUnit);
        
        if (mBase === 0 || gBase === 0) {
          setResult(null);
          setCalculation('Error: Mass and gravity cannot be zero');
          return;
        }
        
        const ratio = NBase / (mBase * gBase);
        if (ratio < 0 || ratio > 1) {
          setResult(null);
          setCalculation('Error: Invalid ratio. N must be between 0 and m×g');
          return;
        }
        
        const θRad = Math.acos(ratio);
        const θResult = convertAngleFromRadians(θRad, angleUnit);
        
        setResult({ value: θResult, unit: angleUnit === 'deg' ? '°' : 'rad', type: 'angle' });
        setCalculation(`θ = arccos(N / (m × g))\nθ = arccos(${formatValue(N)} ${forceUnit} / (${formatValue(m)} ${massUnit} × ${formatValue(g)} ${accelerationUnit}))\nθ = arccos(${formatValue(ratio)})\nθ = ${formatValue(θRad)} rad = ${formatValue(θResult)}${angleUnit === 'deg' ? '°' : ' rad'}`);
      }
    }
  };

  const clearAll = () => {
    setNormalForce('');
    setMass('');
    setGravity('');
    setAngle('');
    setUseInclined(false);
    setForceUnit('N');
    setMassUnit('kg');
    setAccelerationUnit('m/s²');
    setAngleUnit('deg');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Normal Force Calculator</h2>
        <p className="text-gray-600">Calculate normal force using N = m × g or N = m × g × cos(θ)</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">
            {useInclined ? 'N = m × g × cos(θ)' : 'N = m × g'}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {useInclined ? 'Normal Force = Mass × Gravity × cos(Angle)' : 'Normal Force = Mass × Gravity'}
          </p>
        </div>

        {/* Surface Type Toggle */}
        <div className="flex items-center justify-center gap-4 p-4 bg-gray-50 rounded-lg">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="surface"
              checked={!useInclined}
              onChange={() => {
                setUseInclined(false);
                setAngle('');
                setResult(null);
                setCalculation('');
              }}
              className="w-4 h-4 text-[#820ECC] focus:ring-[#820ECC]"
            />
            <span className="text-sm font-medium text-gray-700">Horizontal Surface</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="surface"
              checked={useInclined}
              onChange={() => {
                setUseInclined(true);
                setResult(null);
                setCalculation('');
              }}
              className="w-4 h-4 text-[#820ECC] focus:ring-[#820ECC]"
            />
            <span className="text-sm font-medium text-gray-700">Inclined Plane</span>
          </label>
        </div>

        {/* Normal Force Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Normal Force (N)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter normal force (leave empty to calculate)"
                value={normalForce}
                onChange={(e) => setNormalForce(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={forceUnit}
                onChange={(e) => setForceUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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

        {/* Mass Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Mass (m)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter mass (leave empty to calculate)"
                value={mass}
                onChange={(e) => setMass(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={massUnit}
                onChange={(e) => setMassUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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

        {/* Gravity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Gravity (g)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder={useInclined ? "Enter gravity (leave empty to calculate)" : "Enter gravity (default: 9.80665 m/s²)"}
                value={gravity}
                onChange={(e) => setGravity(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={accelerationUnit}
                onChange={(e) => setAccelerationUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(accelerationUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {!gravity && !useInclined && (
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to use standard gravity (9.80665 m/s²)
            </p>
          )}
        </div>

        {/* Angle Input (only for inclined plane) */}
        {useInclined && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Angle (θ)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter angle (leave empty to calculate)"
                  value={angle}
                  onChange={(e) => setAngle(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-40">
                <select
                  value={angleUnit}
                  onChange={(e) => setAngleUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                >
                  <option value="deg">° (Degrees)</option>
                  <option value="rad">rad (Radians)</option>
                </select>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Angle should be between 0° and 90° (0° = horizontal, 90° = vertical)
            </p>
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

        {result && (
          <div className="mt-6 p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg">
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">
              {result.type === 'force' ? 'Normal Force' : result.type === 'mass' ? 'Mass' : result.type === 'gravity' ? 'Gravity' : 'Angle'}
            </h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <div className="mt-3 p-3 bg-white rounded border border-[#820ECC]/20">
                <p className="text-sm text-gray-700 font-mono whitespace-pre-line">
                  {calculation}
                </p>
              </div>
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
            <li>• Select surface type: Horizontal or Inclined Plane</li>
            <li>• For horizontal: Enter any 2 of 3 values (Normal Force, Mass, Gravity)</li>
            <li>• For inclined plane: Enter any 3 of 4 values (Normal Force, Mass, Gravity, Angle)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: N = m × g (horizontal) or N = m × g × cos(θ) (inclined)</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• All force and mass values should be positive</li>
            <li>• Angle should be between 0° and 90° for inclined planes</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

