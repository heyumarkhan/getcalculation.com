'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors for mass
const massUnits = {
  'kg': { name: 'Kilogram (kg)', factor: 1 },
  'g': { name: 'Gram (g)', factor: 0.001 },
  'lb': { name: 'Pound (lb)', factor: 0.453592 },
  'oz': { name: 'Ounce (oz)', factor: 0.0283495 },
  'stone': { name: 'Stone', factor: 6.35029 }
};

// Unit conversion factors for weight/force
const weightUnits = {
  'N': { name: 'Newton (N)', factor: 1 },
  'kN': { name: 'Kilonewton (kN)', factor: 1000 },
  'lbf': { name: 'Pound-force (lbf)', factor: 4.44822 },
  'kgf': { name: 'Kilogram-force (kgf)', factor: 9.80665 }
};

// Gravity values for different celestial bodies (m/s²)
const celestialBodies = {
  'mercury': { name: 'Mercury', gravity: 3.71 },
  'venus': { name: 'Venus', gravity: 8.87 },
  'earth': { name: 'Earth', gravity: 9.81 },
  'moon': { name: 'Moon', gravity: 1.62 },
  'mars': { name: 'Mars', gravity: 3.71 },
  'jupiter': { name: 'Jupiter', gravity: 24.79 },
  'saturn': { name: 'Saturn', gravity: 10.44 },
  'uranus': { name: 'Uranus', gravity: 8.87 },
  'neptune': { name: 'Neptune', gravity: 11.15 },
  'pluto': { name: 'Pluto', gravity: 0.62 },
  'sun': { name: 'Sun', gravity: 274 }
};

interface WeightOnOtherPlanetsCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function WeightOnOtherPlanetsCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: WeightOnOtherPlanetsCalculatorProps) {
  const [mass, setMass] = useState('');
  const [massUnit, setMassUnit] = useState('kg');
  const [selectedPlanet, setSelectedPlanet] = useState('earth');
  const [weightUnit, setWeightUnit] = useState('N');
  const [results, setResults] = useState<{ [key: string]: { value: number; unit: string } } | null>(null);
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

  const convertMassToBaseUnits = (value: number, unit: string): number => {
    return value * massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertWeightFromBaseUnits = (value: number, unit: string): number => {
    return value / weightUnits[unit as keyof typeof weightUnits].factor;
  };

  const calculate = () => {
    const m = parseFloat(mass);

    if (isNaN(m) || m <= 0) {
      setResults(null);
      setCalculation('Please enter a valid positive numerical value for mass.');
      return;
    }

    // Convert mass to base units (kg)
    const mInKg = convertMassToBaseUnits(m, massUnit);

    // Calculate weight on all celestial bodies
    const allResults: { [key: string]: { value: number; unit: string } } = {};
    let calcStr = `Weight = Mass × Gravity\nW = m × g\n\n`;
    calcStr += `Input Mass: ${formatValue(m)} ${massUnit} = ${formatValue(mInKg)} kg\n\n`;

    Object.entries(celestialBodies).forEach(([key, body]) => {
      const weightInN = mInKg * body.gravity;
      const weightInUnit = convertWeightFromBaseUnits(weightInN, weightUnit);
      allResults[key] = {
        value: weightInUnit,
        unit: weightUnit
      };

      calcStr += `${body.name}: W = ${formatValue(mInKg)} kg × ${body.gravity} m/s² = ${formatValue(weightInN)} N = ${formatValue(weightInUnit)} ${weightUnit}\n`;
    });

    setResults(allResults);
    setCalculation(calcStr);
  };

  const clearAll = () => {
    setMass('');
    setMassUnit('kg');
    setSelectedPlanet('earth');
    setWeightUnit('N');
    setResults(null);
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
      <Card className="p-6 max-w-2xl mx-auto">
        {showTitle && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Weight on Other Planets Calculator</h2>
            <p className="text-gray-600">Calculate your weight on different planets and moons</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="mass" className="block text-sm font-medium text-gray-700 mb-3">
              Your Mass
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  id="mass"
                  type="number"
                  placeholder="Enter your mass"
                  value={mass}
                  onChange={(e) => setMass(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-40">
                <select
                  value={massUnit}
                  onChange={(e) => setMassUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
            <label htmlFor="weightUnit" className="block text-sm font-medium text-gray-700 mb-3">
              Weight Unit for Results
            </label>
            <select
              id="weightUnit"
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {Object.entries(weightUnits).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={calculate} className="flex-1 custom-color-button">
              Calculate Weight on All Planets
            </Button>
            <Button onClick={clearAll} variant="outline" className="flex-1 custom-outline-button">
              Clear
            </Button>
          </div>

          {results && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-fadeIn">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Your Weight on Different Celestial Bodies</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(celestialBodies).map(([key, body]) => (
                  <div key={key} className="bg-white p-3 rounded border border-blue-100">
                    <p className="text-sm font-medium text-gray-700">{body.name}</p>
                    <p className="text-lg font-bold text-blue-700">
                      {formatValue(results[key].value)} {results[key].unit}
                    </p>
                    <p className="text-xs text-gray-500">g = {body.gravity} m/s²</p>
                  </div>
                ))}
              </div>
              {calculation && (
                <div className="text-sm text-blue-600 mt-4 font-mono whitespace-pre-line bg-white p-3 rounded border border-blue-100 max-h-40 overflow-y-auto">
                  {calculation}
                </div>
              )}
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How It Works</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Enter your mass in kilograms, pounds, or other units</li>
              <li>• Select the unit for weight results (Newtons, pound-force, etc.)</li>
              <li>• Click &quot;Calculate Weight on All Planets&quot; to see your weight everywhere</li>
              <li>• Weight is calculated using the formula: W = m × g</li>
              <li>• Results show how gravity affects your weight across the solar system</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Gravity Information</h3>
            <p className="text-sm text-gray-600">
              Gravity varies across the solar system. The Sun has the strongest gravity at 274 m/s², while Pluto has the weakest at 0.62 m/s². Earth&apos;s gravity of 9.81 m/s² is the standard reference. Lower gravity means lighter weight, but your mass remains constant everywhere.
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
