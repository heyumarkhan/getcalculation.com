'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const densityUnits = {
  'kg/m³': { name: 'kg/m³', factor: 1 },
  'g/cm³': { name: 'g/cm³', factor: 1000 },
  'g/mL': { name: 'g/mL', factor: 1000 },
  'lb/ft³': { name: 'lb/ft³', factor: 16.0185 },
  'lb/in³': { name: 'lb/in³', factor: 27679.9 }
};

const massUnits = {
  'kg': { name: 'kg', factor: 1 },
  'g': { name: 'g', factor: 0.001 },
  'lb': { name: 'lb', factor: 0.453592 },
  'oz': { name: 'oz', factor: 0.0283495 }
};

const radiusUnits = {
  'm': { name: 'm', factor: 1 },
  'cm': { name: 'cm', factor: 0.01 },
  'mm': { name: 'mm', factor: 0.001 },
  'in': { name: 'in', factor: 0.0254 },
  'ft': { name: 'ft', factor: 0.3048 }
};

interface CalculationResult {
  density: number | null;
  densityUnit: string;
  mass: number | null;
  massUnit: string;
  radius: number | null;
  radiusUnit: string;
  volume: number | null;
  steps: string[];
}

export default function SphereDensityCalculator({
  primaryColor = '#820ECC'
}: {
  primaryColor?: string;
}) {
  const [density, setDensity] = useState('');
  const [mass, setMass] = useState('');
  const [radius, setRadius] = useState('');

  const [densityUnit, setDensityUnit] = useState('kg/m³');
  const [massUnit, setMassUnit] = useState('kg');
  const [radiusUnit, setRadiusUnit] = useState('m');

  const [result, setResult] = useState<CalculationResult | null>(null);

  const formatValue = (value: number): string => {
    if (!isFinite(value)) return 'Invalid';
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    return value.toFixed(6);
  };

  const calculate = () => {
    const densityVal = density ? parseFloat(density) : null;
    const massVal = mass ? parseFloat(mass) : null;
    const radiusVal = radius ? parseFloat(radius) : null;

    const steps: string[] = [];
    let filledCount = 0;

    if (densityVal !== null && !isNaN(densityVal) && densityVal > 0) filledCount++;
    if (massVal !== null && !isNaN(massVal) && massVal > 0) filledCount++;
    if (radiusVal !== null && !isNaN(radiusVal) && radiusVal > 0) filledCount++;

    if (filledCount < 2) {
      alert('Please enter at least 2 valid positive values');
      return;
    }

    try {
      // Convert all to base units
      const densityBase = densityVal !== null && !isNaN(densityVal) ? densityVal * densityUnits[densityUnit as keyof typeof densityUnits].factor : null;
      const massBase = massVal !== null && !isNaN(massVal) ? massVal * massUnits[massUnit as keyof typeof massUnits].factor : null;
      const radiusBase = radiusVal !== null && !isNaN(radiusVal) ? radiusVal * radiusUnits[radiusUnit as keyof typeof radiusUnits].factor : null;

      let resultDensity: number | null = null;
      let resultMass: number | null = null;
      let resultRadius: number | null = null;
      let resultVolume: number | null = null;

      // Calculate volume from radius
      if (radiusBase !== null) {
        resultVolume = (4 / 3) * Math.PI * radiusBase ** 3;
        steps.push(`Volume of sphere = (4/3)πr³`);
        steps.push(`V = (4/3)π × ${radiusBase}³`);
        steps.push(`V = ${formatValue(resultVolume)} m³`);
      }

      // Calculate density
      if (densityBase !== null && massBase !== null && resultVolume === null) {
        // We have density and mass, calculate volume
        resultVolume = massBase / densityBase;
        // From volume, calculate radius
        resultRadius = Math.cbrt((3 * resultVolume) / (4 * Math.PI));
        steps.push(`From ρ = m/V:`);
        steps.push(`V = m / ρ = ${formatValue(massBase)} / ${formatValue(densityBase)}`);
        steps.push(`V = ${formatValue(resultVolume)} m³`);
        steps.push(`From V = (4/3)πr³:`);
        steps.push(`r = ∛(3V/4π) = ${formatValue(resultRadius)} m`);
        resultDensity = densityBase;
        resultMass = massBase;
      } else if (densityBase !== null && radiusBase !== null && resultVolume !== null) {
        // We have density and radius (volume calculated above)
        resultMass = densityBase * resultVolume;
        steps.push(`Mass = ρ × V = ${formatValue(densityBase)} × ${formatValue(resultVolume)}`);
        steps.push(`m = ${formatValue(resultMass)} kg`);
        resultDensity = densityBase;
        resultRadius = radiusBase;
      } else if (massBase !== null && radiusBase !== null && resultVolume !== null) {
        // We have mass and radius (volume calculated above)
        resultDensity = massBase / resultVolume;
        steps.push(`Density = m / V = ${formatValue(massBase)} / ${formatValue(resultVolume)}`);
        steps.push(`ρ = ${formatValue(resultDensity)} kg/m³`);
        resultMass = massBase;
        resultRadius = radiusBase;
      }

      setResult({
        density: resultDensity,
        densityUnit,
        mass: resultMass,
        massUnit,
        radius: resultRadius,
        radiusUnit,
        volume: resultVolume,
        steps
      });
    } catch (error) {
      alert('Invalid input. Please check your values.');
      setResult(null);
    }
  };

  const clearAll = () => {
    setDensity('');
    setMass('');
    setRadius('');
    setResult(null);
  };

  const resultDensity = result?.density ? result.density / densityUnits[densityUnit as keyof typeof densityUnits].factor : null;
  const resultMass = result?.mass ? result.mass / massUnits[massUnit as keyof typeof massUnits].factor : null;
  const resultRadius = result?.radius ? result.radius / radiusUnits[radiusUnit as keyof typeof radiusUnits].factor : null;

  return (
    <div className="w-full space-y-6">
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-btn:hover {
            background-color: ${primaryColor}dd !important;
          }
          .custom-btn:focus {
            box-shadow: 0 0 0 3px ${primaryColor}40 !important;
          }
        `
      }} />

      <Card>
        <h2 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
          Sphere Density Calculator
        </h2>

        <div className="space-y-4">
          {/* Density Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Density (ρ)"
              value={density}
              onChange={(e) => setDensity(e.target.value)}
              placeholder="Enter density"
              type="number"
              inputMode="decimal"
            />
            <select
              value={densityUnit}
              onChange={(e) => setDensityUnit(e.target.value)}
              className="border border-gray-300 rounded p-2 bg-white"
            >
              {Object.entries(densityUnits).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.name}
                </option>
              ))}
            </select>
          </div>

          {/* Mass Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Mass (m)"
              value={mass}
              onChange={(e) => setMass(e.target.value)}
              placeholder="Enter mass"
              type="number"
              inputMode="decimal"
            />
            <select
              value={massUnit}
              onChange={(e) => setMassUnit(e.target.value)}
              className="border border-gray-300 rounded p-2 bg-white"
            >
              {Object.entries(massUnits).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.name}
                </option>
              ))}
            </select>
          </div>

          {/* Radius Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Radius (r)"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              placeholder="Enter radius"
              type="number"
              inputMode="decimal"
            />
            <select
              value={radiusUnit}
              onChange={(e) => setRadiusUnit(e.target.value)}
              className="border border-gray-300 rounded p-2 bg-white"
            >
              {Object.entries(radiusUnits).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              onClick={calculate}
              className="custom-btn flex-1"
              style={{ backgroundColor: primaryColor }}
            >
              Calculate
            </Button>
            <Button onClick={clearAll} variant="secondary" className="flex-1">
              Clear
            </Button>
          </div>
        </div>
      </Card>

      {result && (
        <div className="space-y-4">
          {/* Results */}
          <Card>
            <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
              Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resultDensity !== null && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, borderWidth: '1px' }}>
                  <p className="text-sm text-gray-600 mb-1">Density</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                    {formatValue(resultDensity)} {densityUnit}
                  </p>
                </div>
              )}
              {resultMass !== null && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, borderWidth: '1px' }}>
                  <p className="text-sm text-gray-600 mb-1">Mass</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                    {formatValue(resultMass)} {massUnit}
                  </p>
                </div>
              )}
              {resultRadius !== null && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, borderWidth: '1px' }}>
                  <p className="text-sm text-gray-600 mb-1">Radius</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                    {formatValue(resultRadius)} {radiusUnit}
                  </p>
                </div>
              )}
              {result.volume !== null && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, borderWidth: '1px' }}>
                  <p className="text-sm text-gray-600 mb-1">Volume</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                    {formatValue(result.volume)} m³
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Calculation Steps */}
          <Card>
            <h3 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>
              Calculation Steps
            </h3>
            <ol className="space-y-2 list-decimal list-inside">
              {result.steps.map((step, idx) => (
                <li key={idx} className="text-gray-700">
                  {step}
                </li>
              ))}
            </ol>
          </Card>
        </div>
      )}
    </div>
  );
}
