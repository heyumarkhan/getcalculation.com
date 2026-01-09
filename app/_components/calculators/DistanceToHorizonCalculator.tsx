'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors for height (base unit: meters)
const heightUnits = {
  'm': { name: 'Meter (m)', factor: 1 },
  'km': { name: 'Kilometer (km)', factor: 1000 },
  'cm': { name: 'Centimeter (cm)', factor: 0.01 },
  'ft': { name: 'Foot (ft)', factor: 0.3048 },
  'mi': { name: 'Mile (mi)', factor: 1609.34 },
  'nm': { name: 'Nautical Mile (nm)', factor: 1852 }
};

// Unit conversion factors for distance (base unit: kilometers)
const distanceUnits = {
  'km': { name: 'Kilometer (km)', factor: 1 },
  'm': { name: 'Meter (m)', factor: 0.001 },
  'mi': { name: 'Mile (mi)', factor: 0.621371 },
  'ft': { name: 'Foot (ft)', factor: 3280.84 },
  'nm': { name: 'Nautical Mile (nm)', factor: 0.539957 }
};

// Earth's radius in kilometers (mean radius)
const EARTH_RADIUS_KM = 6371;

interface DistanceToHorizonCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function DistanceToHorizonCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: DistanceToHorizonCalculatorProps) {
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('m');
  const [distanceUnit, setDistanceUnit] = useState('km');
  const [viewAngle, setViewAngle] = useState('');
  const [showViewAngle, setShowViewAngle] = useState(false);
  const [result, setResult] = useState<{ distance: number; angle: number } | null>(null);
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

  const convertHeightToBaseUnits = (value: number, unit: string): number => {
    return value * heightUnits[unit as keyof typeof heightUnits].factor;
  };

  const convertDistanceFromBaseUnits = (value: number, unit: string): number => {
    return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const calculate = () => {
    const h = parseFloat(height);

    if (isNaN(h) || h < 0) {
      setResult(null);
      setCalculation('Please enter a valid non-negative height value.');
      return;
    }

    // Convert height to meters
    const hInMeters = convertHeightToBaseUnits(h, heightUnit);
    const hInKm = hInMeters / 1000;

    // Calculate distance to horizon using formula: d = sqrt(2 * R * h + h^2)
    // Simplified for small h: d ≈ sqrt(2 * R * h)
    const distanceInKm = Math.sqrt(2 * EARTH_RADIUS_KM * hInKm + hInKm * hInKm);
    const distanceInUnit = convertDistanceFromBaseUnits(distanceInKm, distanceUnit);

    // Calculate viewing angle in degrees: angle = arccos(R / (R + h))
    const angleInRadians = Math.acos(EARTH_RADIUS_KM / (EARTH_RADIUS_KM + hInKm));
    const angleInDegrees = (angleInRadians * 180) / Math.PI;

    setResult({
      distance: distanceInUnit,
      angle: angleInDegrees
    });

    let calcStr = `d = √(2 × R × h + h²)\n`;
    calcStr += `d = √(2 × ${formatValue(EARTH_RADIUS_KM)} km × ${formatValue(hInKm)} km + ${formatValue(hInKm)}² km²)\n`;
    calcStr += `d = √(${formatValue(2 * EARTH_RADIUS_KM * hInKm + hInKm * hInKm)})\n`;
    calcStr += `d = ${formatValue(distanceInKm)} km = ${formatValue(distanceInUnit)} ${distanceUnit}\n\n`;
    calcStr += `Viewing Angle:\n`;
    calcStr += `θ = arccos(R / (R + h))\n`;
    calcStr += `θ = arccos(${formatValue(EARTH_RADIUS_KM)} / ${formatValue(EARTH_RADIUS_KM + hInKm)})\n`;
    calcStr += `θ = ${formatValue(angleInDegrees)}°`;

    setCalculation(calcStr);
  };

  const clearAll = () => {
    setHeight('');
    setHeightUnit('m');
    setDistanceUnit('km');
    setViewAngle('');
    setShowViewAngle(false);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Distance to Horizon Calculator</h2>
            <p className="text-gray-600">Calculate how far you can see to the horizon based on your height using d = √(2Rh + h²)</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-3">
              Height Above Sea Level
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-40">
                <select
                  value={heightUnit}
                  onChange={(e) => setHeightUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(heightUnits).map(([key, unit]) => (
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

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="showViewAngle"
              checked={showViewAngle}
              onChange={(e) => setShowViewAngle(e.target.checked)}
              className="w-4 h-4 text-purple-600 rounded"
            />
            <label htmlFor="showViewAngle" className="text-sm font-medium text-gray-700">
              Also calculate viewing angle
            </label>
          </div>

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
              <p className="text-2xl font-bold text-blue-700 mb-3">
                Distance to Horizon: {formatValue(result.distance)} {distanceUnit}
              </p>
              {showViewAngle && (
                <p className="text-lg font-semibold text-blue-700 mb-3">
                  Viewing Angle: {formatValue(result.angle)}°
                </p>
              )}
              {calculation && (
                <div className="text-sm text-blue-600 mt-4 font-mono whitespace-pre-line bg-white p-3 rounded border border-blue-100">
                  {calculation}
                </div>
              )}
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Enter your height above sea level (on a mountain, building, airplane, etc.)</li>
              <li>• Select the unit for your height (meters, feet, miles, etc.)</li>
              <li>• Choose the unit for the result distance</li>
              <li>• Optionally enable viewing angle calculation</li>
              <li>• Click &quot;Calculate&quot; to see how far you can see to the horizon</li>
              <li>• Higher altitude = greater distance to horizon</li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}
