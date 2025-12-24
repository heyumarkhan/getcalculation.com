'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: meters)
const distanceUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'in': { name: 'in (Inches)', factor: 0.0254 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 }
};

type InputType = 'diameter' | 'radius';

export default function BeltLengthCalculator() {
  const [inputType, setInputType] = useState<InputType>('diameter');
  const [centerDistance, setCenterDistance] = useState('');
  const [pulley1Size, setPulley1Size] = useState('');
  const [pulley2Size, setPulley2Size] = useState('');
  const [centerDistanceUnit, setCenterDistanceUnit] = useState('m');
  const [pulleySizeUnit, setPulleySizeUnit] = useState('m');
  const [beltLengthUnit, setBeltLengthUnit] = useState('m');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'beltLength' } | null>(null);
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

  const convertToBase = (value: number, unit: string) => {
    return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertFromBase = (value: number, unit: string) => {
    return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const calculate = () => {
    const C = centerDistance ? parseFloat(centerDistance) : NaN;
    const D1 = pulley1Size ? parseFloat(pulley1Size) : NaN;
    const D2 = pulley2Size ? parseFloat(pulley2Size) : NaN;

    // For belt length calculation, we need center distance and both pulley sizes
    if (!centerDistance || !pulley1Size || !pulley2Size) {
      setResult(null);
      setCalculation('Error: Please provide center distance and both pulley sizes to calculate belt length');
      return;
    }

    // Validate inputs
    if (isNaN(C) || C <= 0) {
      setResult(null);
      setCalculation('Error: Center distance must be a positive number');
      return;
    }
    if (isNaN(D1) || D1 <= 0) {
      setResult(null);
      setCalculation('Error: Pulley 1 size must be a positive number');
      return;
    }
    if (isNaN(D2) || D2 <= 0) {
      setResult(null);
      setCalculation('Error: Pulley 2 size must be a positive number');
      return;
    }

    // Convert to base units (meters)
    const CBase = convertToBase(C, centerDistanceUnit);
    const D1Base = convertToBase(D1, pulleySizeUnit);
    const D2Base = convertToBase(D2, pulleySizeUnit);

    // Convert to radii
    const R1 = inputType === 'diameter' ? D1Base / 2 : D1Base;
    const R2 = inputType === 'diameter' ? D2Base / 2 : D2Base;

    // Calculate belt length: L = 2C + π(R1 + R2) + (R1 - R2)²/C
    const LCalculated = 2 * CBase + Math.PI * (R1 + R2) + Math.pow(R1 - R2, 2) / CBase;
    const LResult = convertFromBase(LCalculated, beltLengthUnit);
    
    setResult({ value: LResult, unit: beltLengthUnit, type: 'beltLength' });
    
    const R1Display = inputType === 'diameter' ? `${formatValue(D1)}/2` : formatValue(D1);
    const R2Display = inputType === 'diameter' ? `${formatValue(D2)}/2` : formatValue(D2);
    const R1Value = inputType === 'diameter' ? D1Base / 2 : D1Base;
    const R2Value = inputType === 'diameter' ? D2Base / 2 : D2Base;
    
    setCalculation(`L = 2C + π(R₁ + R₂) + (R₁ - R₂)²/C\n= 2 × ${formatValue(C)} ${centerDistanceUnit} + π(${R1Display} + ${R2Display}) ${pulleySizeUnit} + (${R1Display} - ${R2Display})² ${pulleySizeUnit} / ${formatValue(C)} ${centerDistanceUnit}\n= ${formatValue(LResult)} ${beltLengthUnit}`);
  };

  const clearAll = () => {
    setCenterDistance('');
    setPulley1Size('');
    setPulley2Size('');
    setCenterDistanceUnit('m');
    setPulleySizeUnit('m');
    setBeltLengthUnit('m');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Belt Length Calculator</h2>
        <p className="text-gray-600">Calculate belt length for open belt drive systems using center distance and pulley sizes</p>
      </div>

      <div className="space-y-6">
        {/* Input Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Pulley Size Input Type
          </label>
          <select
            value={inputType}
            onChange={(e) => {
              setInputType(e.target.value as InputType);
              clearAll();
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="diameter">Diameter</option>
            <option value="radius">Radius</option>
          </select>
        </div>

        {/* Center Distance Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Center Distance (C)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter center distance (leave empty to calculate)"
                value={centerDistance}
                onChange={(e) => setCenterDistance(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-32">
              <select
                value={centerDistanceUnit}
                onChange={(e) => setCenterDistanceUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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

        {/* Pulley 1 Size Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Pulley 1 {inputType === 'diameter' ? 'Diameter' : 'Radius'} (D₁ or R₁)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder={`Enter pulley 1 ${inputType === 'diameter' ? 'diameter' : 'radius'}`}
                value={pulley1Size}
                onChange={(e) => setPulley1Size(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-32">
              <select
                value={pulleySizeUnit}
                onChange={(e) => setPulleySizeUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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

        {/* Pulley 2 Size Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Pulley 2 {inputType === 'diameter' ? 'Diameter' : 'Radius'} (D₂ or R₂)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder={`Enter pulley 2 ${inputType === 'diameter' ? 'diameter' : 'radius'}`}
                value={pulley2Size}
                onChange={(e) => setPulley2Size(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-32">
              <select
                value={pulleySizeUnit}
                onChange={(e) => setPulleySizeUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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

        {/* Belt Length Unit Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Belt Length Unit (Result)
          </label>
          <select
            value={beltLengthUnit}
            onChange={(e) => setBeltLengthUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            {Object.entries(distanceUnits).map(([key, unit]) => (
              <option key={key} value={key}>
                {unit.name}
              </option>
            ))}
          </select>
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
            {calculation && !calculation.startsWith('Error:') && (
              <p className={`text-sm ${getResultTextColor()}/80 mt-2 font-mono break-words whitespace-pre-line`}>
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
            <li>• Enter center distance and both pulley sizes</li>
            <li>• Select whether pulley sizes are diameters or radii</li>
            <li>• Formula: L = 2C + π(R₁ + R₂) + (R₁ - R₂)²/C</li>
            <li>• Where: L = belt length, C = center distance, R₁ and R₂ = pulley radii</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• This formula is for open belt configuration (most common)</li>
            <li>• All values must be positive numbers</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

