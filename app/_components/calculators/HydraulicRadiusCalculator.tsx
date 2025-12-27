'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface HydraulicRadiusCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Unit conversion factors (all relative to base units: m, m², m)
const lengthUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 },
  'yd': { name: 'yd (Yards)', factor: 0.9144 },
  'mi': { name: 'mi (Miles)', factor: 1609.34 }
};

const areaUnits = {
  'm²': { name: 'm² (Square meters)', factor: 1 },
  'cm²': { name: 'cm² (Square centimeters)', factor: 0.0001 },
  'mm²': { name: 'mm² (Square millimeters)', factor: 0.000001 },
  'km²': { name: 'km² (Square kilometers)', factor: 1000000 },
  'ft²': { name: 'ft² (Square feet)', factor: 0.092903 },
  'in²': { name: 'in² (Square inches)', factor: 0.00064516 },
  'yd²': { name: 'yd² (Square yards)', factor: 0.836127 },
  'ac': { name: 'ac (Acres)', factor: 4046.86 }
};

export default function HydraulicRadiusCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: HydraulicRadiusCalculatorProps) {
  const [hydraulicRadius, setHydraulicRadius] = useState('');
  const [area, setArea] = useState('');
  const [wettedPerimeter, setWettedPerimeter] = useState('');
  const [radiusUnit, setRadiusUnit] = useState('m');
  const [areaUnit, setAreaUnit] = useState('m²');
  const [perimeterUnit, setPerimeterUnit] = useState('m');
  const [result, setResult] = useState<{
    value: number;
    unit: string;
    type: 'radius' | 'area' | 'perimeter';
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

  const convertLengthToBase = (value: number, unit: string) => {
    return value * lengthUnits[unit as keyof typeof lengthUnits].factor;
  };

  const convertLengthFromBase = (value: number, unit: string) => {
    return value / lengthUnits[unit as keyof typeof lengthUnits].factor;
  };

  const convertAreaToBase = (value: number, unit: string) => {
    return value * areaUnits[unit as keyof typeof areaUnits].factor;
  };

  const convertAreaFromBase = (value: number, unit: string) => {
    return value / areaUnits[unit as keyof typeof areaUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const r = hydraulicRadius ? parseFloat(hydraulicRadius) : NaN;
    const a = area ? parseFloat(area) : NaN;
    const p = wettedPerimeter ? parseFloat(wettedPerimeter) : NaN;

    const filledCount = [hydraulicRadius, area, wettedPerimeter].filter(val => val !== '').length;

    if (filledCount !== 2) {
      setError('Please enter exactly two values to calculate the third');
      return;
    }

    // Validate that filled values are valid positive numbers
    if (hydraulicRadius && (isNaN(r) || r < 0)) {
      setError('Hydraulic radius must be a valid non-negative number');
      return;
    }
    if (area && (isNaN(a) || a <= 0)) {
      setError('Cross-sectional area must be a valid positive number');
      return;
    }
    if (wettedPerimeter && (isNaN(p) || p <= 0)) {
      setError('Wetted perimeter must be a valid positive number');
      return;
    }

    // Convert to base units
    if (!hydraulicRadius) {
      // Calculate hydraulic radius: R = A / P
      const aBase = convertAreaToBase(a, areaUnit);
      const pBase = convertLengthToBase(p, perimeterUnit);
      
      if (pBase === 0) {
        setError('Wetted perimeter cannot be zero when calculating hydraulic radius');
        return;
      }
      
      const rBase = aBase / pBase;
      const rResult = convertLengthFromBase(rBase, radiusUnit);
      
      setResult({ value: rResult, unit: radiusUnit, type: 'radius' });
      
      const steps = [
        `Given:`,
        `  Cross-sectional Area (A) = ${formatValue(a)} ${areaUnit} = ${formatValue(aBase)} m²`,
        `  Wetted Perimeter (P) = ${formatValue(p)} ${perimeterUnit} = ${formatValue(pBase)} m`,
        ``,
        `Calculate hydraulic radius using hydraulic radius formula:`,
        `  R = A / P`,
        `  R = ${formatValue(aBase)} / ${formatValue(pBase)}`,
        `  R = ${formatValue(rBase)} m = ${formatValue(rResult)} ${lengthUnits[radiusUnit as keyof typeof lengthUnits]?.name || radiusUnit}`
      ];
      setCalculation(steps.join('\n'));
    } else if (!area) {
      // Calculate area: A = R × P
      const rBase = convertLengthToBase(r, radiusUnit);
      const pBase = convertLengthToBase(p, perimeterUnit);
      const aBase = rBase * pBase;
      const aResult = convertAreaFromBase(aBase, areaUnit);
      
      setResult({ value: aResult, unit: areaUnit, type: 'area' });
      
      const steps = [
        `Given:`,
        `  Hydraulic Radius (R) = ${formatValue(r)} ${radiusUnit} = ${formatValue(rBase)} m`,
        `  Wetted Perimeter (P) = ${formatValue(p)} ${perimeterUnit} = ${formatValue(pBase)} m`,
        ``,
        `Calculate cross-sectional area using hydraulic radius formula:`,
        `  A = R × P`,
        `  A = ${formatValue(rBase)} × ${formatValue(pBase)}`,
        `  A = ${formatValue(aBase)} m² = ${formatValue(aResult)} ${areaUnits[areaUnit as keyof typeof areaUnits]?.name || areaUnit}`
      ];
      setCalculation(steps.join('\n'));
    } else if (!wettedPerimeter) {
      // Calculate wetted perimeter: P = A / R
      const aBase = convertAreaToBase(a, areaUnit);
      const rBase = convertLengthToBase(r, radiusUnit);
      
      if (rBase === 0) {
        setError('Hydraulic radius cannot be zero when calculating wetted perimeter');
        return;
      }
      
      const pBase = aBase / rBase;
      const pResult = convertLengthFromBase(pBase, perimeterUnit);
      
      setResult({ value: pResult, unit: perimeterUnit, type: 'perimeter' });
      
      const steps = [
        `Given:`,
        `  Cross-sectional Area (A) = ${formatValue(a)} ${areaUnit} = ${formatValue(aBase)} m²`,
        `  Hydraulic Radius (R) = ${formatValue(r)} ${radiusUnit} = ${formatValue(rBase)} m`,
        ``,
        `Calculate wetted perimeter using hydraulic radius formula:`,
        `  P = A / R`,
        `  P = ${formatValue(aBase)} / ${formatValue(rBase)}`,
        `  P = ${formatValue(pBase)} m = ${formatValue(pResult)} ${lengthUnits[perimeterUnit as keyof typeof lengthUnits]?.name || perimeterUnit}`
      ];
      setCalculation(steps.join('\n'));
    }
  };

  const clearAll = () => {
    setHydraulicRadius('');
    setArea('');
    setWettedPerimeter('');
    setRadiusUnit('m');
    setAreaUnit('m²');
    setPerimeterUnit('m');
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hydraulic Radius Calculator</h2>
          <p className="text-gray-600">Calculate hydraulic radius, cross-sectional area, or wetted perimeter using R = A / P</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Hydraulic Radius Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">R = A / P</p>
          <p className="text-sm text-gray-600 mt-1">Where: R = Hydraulic Radius, A = Cross-sectional Area, P = Wetted Perimeter</p>
        </div>

        {/* Hydraulic Radius Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Hydraulic Radius (R)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter hydraulic radius (leave empty to calculate)"
                value={hydraulicRadius}
                onChange={(e) => setHydraulicRadius(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={radiusUnit}
                onChange={(e) => setRadiusUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(lengthUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Cross-sectional Area Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Cross-sectional Area (A)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter cross-sectional area (leave empty to calculate)"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
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

        {/* Wetted Perimeter Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Wetted Perimeter (P)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter wetted perimeter (leave empty to calculate)"
                value={wettedPerimeter}
                onChange={(e) => setWettedPerimeter(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={perimeterUnit}
                onChange={(e) => setPerimeterUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(lengthUnits).map(([key, unit]) => (
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
                  {result.type === 'radius' && 'Hydraulic Radius (R)'}
                  {result.type === 'area' && 'Cross-sectional Area (A)'}
                  {result.type === 'perimeter' && 'Wetted Perimeter (P)'}
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
            <li>• Enter any two values to calculate the third (Hydraulic Radius, Area, or Wetted Perimeter)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: R = A / P (Hydraulic Radius Formula)</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• Area and wetted perimeter must be positive; hydraulic radius must be non-negative</li>
            <li>• Hydraulic radius is used in open channel flow calculations and Manning equation</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

