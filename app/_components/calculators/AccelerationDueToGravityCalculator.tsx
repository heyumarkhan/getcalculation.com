'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Gravitational constant (m³/kg·s²)
const G = 6.67430e-11;

// Preset celestial bodies with mass (kg) and radius (m)
const celestialBodies = {
  'earth': { name: 'Earth', mass: 5.972e24, radius: 6.371e6, g: 9.80665 },
  'moon': { name: 'Moon', mass: 7.342e22, radius: 1.737e6, g: 1.62 },
  'mars': { name: 'Mars', mass: 6.39e23, radius: 3.3895e6, g: 3.71 },
  'jupiter': { name: 'Jupiter', mass: 1.898e27, radius: 6.9911e7, g: 24.79 },
  'saturn': { name: 'Saturn', mass: 5.683e26, radius: 5.8232e7, g: 10.44 },
  'venus': { name: 'Venus', mass: 4.867e24, radius: 6.0518e6, g: 8.87 },
  'mercury': { name: 'Mercury', mass: 3.301e23, radius: 2.4397e6, g: 3.7 },
  'sun': { name: 'Sun', mass: 1.989e30, radius: 6.957e8, g: 274.0 },
  'neptune': { name: 'Neptune', mass: 1.024e26, radius: 2.4622e7, g: 11.15 },
  'uranus': { name: 'Uranus', mass: 8.681e25, radius: 2.5362e7, g: 8.87 }
};

// Unit conversion factors
const massUnits = {
  'kg': { name: 'Kilograms (kg)', factor: 1 },
  'g': { name: 'Grams (g)', factor: 0.001 },
  't': { name: 'Metric Tons (t)', factor: 1000 },
  'lb': { name: 'Pounds (lb)', factor: 0.453592 },
  'M_earth': { name: 'Earth Masses', factor: 5.972e24 }
};

const distanceUnits = {
  'm': { name: 'Meters (m)', factor: 1 },
  'km': { name: 'Kilometers (km)', factor: 1000 },
  'cm': { name: 'Centimeters (cm)', factor: 0.01 },
  'ft': { name: 'Feet (ft)', factor: 0.3048 },
  'mi': { name: 'Miles (mi)', factor: 1609.34 },
  'R_earth': { name: 'Earth Radii', factor: 6.371e6 }
};

const accelerationUnits = {
  'm/s²': { name: 'm/s²', factor: 1 },
  'ft/s²': { name: 'ft/s²', factor: 0.3048 },
  'g': { name: 'g (Earth gravities)', factor: 9.80665 }
};

export default function AccelerationDueToGravityCalculator() {
  const [mass, setMass] = useState('');
  const [radius, setRadius] = useState('');
  const [massUnit, setMassUnit] = useState('kg');
  const [radiusUnit, setRadiusUnit] = useState('m');
  const [accelerationUnit, setAccelerationUnit] = useState('m/s²');
  const [selectedBody, setSelectedBody] = useState<string>('');
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
  const [calculation, setCalculation] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    return value.toFixed(4);
  };

  const convertToBaseUnits = (value: number, unit: string, type: 'mass' | 'distance') => {
    if (type === 'mass') {
      return value * massUnits[unit as keyof typeof massUnits].factor;
    } else {
      return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
    }
  };

  const convertFromBaseUnits = (value: number, unit: string) => {
    return value / accelerationUnits[unit as keyof typeof accelerationUnits].factor;
  };

  const calculateGravity = () => {
    // If a celestial body is selected, use its preset values
    if (selectedBody && celestialBodies[selectedBody as keyof typeof celestialBodies]) {
      const body = celestialBodies[selectedBody as keyof typeof celestialBodies];
      const gInBaseUnits = body.g;
      const gInSelectedUnit = convertFromBaseUnits(gInBaseUnits, accelerationUnit);
      
      setResult({ value: gInSelectedUnit, unit: accelerationUnit });
      setCalculation(`g = ${body.g.toFixed(4)} m/s² (${body.name})`);
      return;
    }

    // Otherwise, calculate from mass and radius
    const m = parseFloat(mass);
    const r = parseFloat(radius);

    if (!mass || !radius || isNaN(m) || isNaN(r) || m <= 0 || r <= 0) {
      setResult(null);
      setCalculation('');
      return;
    }

    // Convert to base units
    const massInKg = convertToBaseUnits(m, massUnit, 'mass');
    const radiusInM = convertToBaseUnits(r, radiusUnit, 'distance');

    // Calculate: g = GM/r²
    const gInBaseUnits = (G * massInKg) / (radiusInM * radiusInM);
    const gInSelectedUnit = convertFromBaseUnits(gInBaseUnits, accelerationUnit);

    setResult({ value: gInSelectedUnit, unit: accelerationUnit });
    setCalculation(`g = GM/r² = (6.67430 × 10⁻¹¹ × ${formatValue(massInKg)} kg) / (${formatValue(radiusInM)} m)² = ${gInBaseUnits.toFixed(4)} m/s²`);
  };

  const clearAll = () => {
    setMass('');
    setRadius('');
    setMassUnit('kg');
    setRadiusUnit('m');
    setAccelerationUnit('m/s²');
    setSelectedBody('');
    setResult(null);
    setCalculation('');
  };

  const handleBodySelect = (bodyKey: string) => {
    setSelectedBody(bodyKey);
    if (bodyKey) {
      const body = celestialBodies[bodyKey as keyof typeof celestialBodies];
      setMass((body.mass / massUnits[massUnit as keyof typeof massUnits].factor).toString());
      setRadius((body.radius / distanceUnits[radiusUnit as keyof typeof distanceUnits].factor).toString());
    } else {
      setMass('');
      setRadius('');
    }
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceleration due to Gravity Calculator</h2>
        <p className="text-gray-600">Calculate gravitational acceleration using g = GM/r²</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Celestial Body (Optional)
          </label>
          <select
            value={selectedBody}
            onChange={(e) => handleBodySelect(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white"
          >
            <option value="">Custom (Enter mass and radius)</option>
            {Object.entries(celestialBodies).map(([key, body]) => (
              <option key={key} value={key}>
                {body.name} (g = {body.g.toFixed(2)} m/s²)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Mass
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter mass"
                value={mass}
                onChange={(e) => {
                  setMass(e.target.value);
                  setSelectedBody('');
                }}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={massUnit}
                onChange={(e) => setMassUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Radius
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter radius"
                value={radius}
                onChange={(e) => {
                  setRadius(e.target.value);
                  setSelectedBody('');
                }}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={radiusUnit}
                onChange={(e) => setRadiusUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white"
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
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Acceleration Unit
          </label>
          <select
            value={accelerationUnit}
            onChange={(e) => setAccelerationUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white"
          >
            {Object.entries(accelerationUnits).map(([key, unit]) => (
              <option key={key} value={key}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <Button onClick={calculateGravity} className="flex-1" style={{ backgroundColor: '#820ECC' }}>
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 rounded-lg border" style={{ backgroundColor: '#820ECC15', borderColor: '#820ECC40' }}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#820ECC' }}>
              Acceleration due to Gravity
            </h3>
            <p className="text-2xl font-bold" style={{ color: '#820ECC' }}>
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && (
              <p className="text-sm mt-2 font-mono opacity-80" style={{ color: '#820ECC' }}>
                {calculation}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Select a celestial body from the dropdown, or enter custom mass and radius</li>
            <li>• Mass and radius must be positive numbers</li>
            <li>• The calculator uses the formula: <strong>g = GM/r²</strong></li>
            <li>• G = 6.67430 × 10⁻¹¹ m³/kg·s² (gravitational constant)</li>
            <li>• You can use different units for mass and radius</li>
            <li>• Result can be displayed in m/s², ft/s², or Earth gravities (g)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

