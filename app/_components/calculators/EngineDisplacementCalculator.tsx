'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface EngineDisplacementCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Unit conversion factors (all relative to base unit: meters)
const lengthUnits = {
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'm': { name: 'm (Meters)', factor: 1 },
  'in': { name: 'in (Inches)', factor: 0.0254 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 }
};

// Volume units for displacement (in cubic meters)
const volumeUnits = {
  'cc': { name: 'cc (Cubic Centimeters)', factor: 0.000001 },
  'L': { name: 'L (Liters)', factor: 0.001 },
  'm³': { name: 'm³ (Cubic Meters)', factor: 1 },
  'in³': { name: 'in³ (Cubic Inches)', factor: 0.000016387064 },
  'ft³': { name: 'ft³ (Cubic Feet)', factor: 0.028316846592 }
};

export default function EngineDisplacementCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: EngineDisplacementCalculatorProps) {
  const [bore, setBore] = useState('');
  const [stroke, setStroke] = useState('');
  const [cylinders, setCylinders] = useState('');
  const [lengthUnit, setLengthUnit] = useState('mm');
  const [volumeUnit, setVolumeUnit] = useState('cc');
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
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
      return value.toExponential(2);
    }
    return value.toFixed(2).replace(/\.?0+$/, '');
  };

  const convertLengthToBase = (value: number, unit: string): number => {
    return value * lengthUnits[unit as keyof typeof lengthUnits].factor;
  };

  const convertVolumeFromBase = (value: number, unit: string): number => {
    return value / volumeUnits[unit as keyof typeof volumeUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    if (!bore || !stroke || !cylinders) {
      setError('Please enter bore, stroke, and number of cylinders');
      return;
    }

    const boreValue = parseFloat(bore);
    const strokeValue = parseFloat(stroke);
    const cylindersValue = parseFloat(cylinders);

    if (isNaN(boreValue) || isNaN(strokeValue) || isNaN(cylindersValue)) {
      setError('All values must be valid numbers');
      return;
    }

    if (boreValue <= 0 || strokeValue <= 0 || cylindersValue <= 0) {
      setError('Bore, stroke, and number of cylinders must be positive numbers');
      return;
    }

    if (!Number.isInteger(cylindersValue)) {
      setError('Number of cylinders must be a whole number');
      return;
    }

    // Convert to base units (meters)
    const boreBase = convertLengthToBase(boreValue, lengthUnit);
    const strokeBase = convertLengthToBase(strokeValue, lengthUnit);
    
    // Calculate displacement: V = π × (Bore/2)² × Stroke × Cylinders
    // First calculate the radius in meters
    const radius = boreBase / 2;
    const cylinderVolumeBase = Math.PI * radius * radius * strokeBase;
    const totalDisplacementBase = cylinderVolumeBase * cylindersValue;
    
    // Convert to selected volume unit
    const displacementResult = convertVolumeFromBase(totalDisplacementBase, volumeUnit);

    setResult({ value: displacementResult, unit: volumeUnit });
    
    // Generate detailed calculation
    const radiusInOriginalUnit = boreValue / 2;
    const strokeInOriginalUnit = strokeValue;
    const singleCylinderVolumeBase = Math.PI * (boreBase / 2) * (boreBase / 2) * strokeBase;
    const singleCylinderVolumeResult = convertVolumeFromBase(singleCylinderVolumeBase, volumeUnit);
    
    setCalculation(
      `Displacement = π × (Bore/2)² × Stroke × Number of Cylinders\n\n` +
      `Bore = ${formatValue(boreValue)} ${lengthUnits[lengthUnit as keyof typeof lengthUnits].name} = ${formatValue(boreBase)} m\n` +
      `Stroke = ${formatValue(strokeValue)} ${lengthUnits[lengthUnit as keyof typeof lengthUnits].name} = ${formatValue(strokeBase)} m\n` +
      `Number of Cylinders = ${cylindersValue}\n\n` +
      `Radius (r) = Bore / 2 = ${formatValue(boreBase)} / 2 = ${formatValue(radius)} m\n` +
      `Single Cylinder Volume = π × r² × Stroke\n` +
      `Single Cylinder Volume = π × (${formatValue(radius)})² × ${formatValue(strokeBase)}\n` +
      `Single Cylinder Volume = π × ${formatValue(radius * radius)} × ${formatValue(strokeBase)}\n` +
      `Single Cylinder Volume = ${formatValue(singleCylinderVolumeBase)} m³ = ${formatValue(singleCylinderVolumeResult)} ${volumeUnits[volumeUnit as keyof typeof volumeUnits].name}\n\n` +
      `Total Displacement = Single Cylinder Volume × Number of Cylinders\n` +
      `Total Displacement = ${formatValue(singleCylinderVolumeResult)} × ${cylindersValue}\n` +
      `Total Displacement = ${formatValue(displacementResult)} ${volumeUnits[volumeUnit as keyof typeof volumeUnits].name}`
    );
  };

  const clearAll = () => {
    setBore('');
    setStroke('');
    setCylinders('');
    setLengthUnit('mm');
    setVolumeUnit('cc');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Engine Displacement Calculator</h2>
          <p className="text-gray-600">Calculate engine displacement from bore, stroke, and number of cylinders</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Bore Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Bore (Cylinder Diameter)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter bore"
                value={bore}
                onChange={(e) => setBore(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={lengthUnit}
                onChange={(e) => setLengthUnit(e.target.value)}
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

        {/* Stroke Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Stroke (Piston Travel Distance)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter stroke"
                value={stroke}
                onChange={(e) => setStroke(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={lengthUnit}
                onChange={(e) => setLengthUnit(e.target.value)}
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

        {/* Number of Cylinders Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Number of Cylinders
          </label>
          <Input
            type="text"
            placeholder="Enter number of cylinders"
            value={cylinders}
            onChange={(e) => setCylinders(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Volume Unit Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Output Unit
          </label>
          <select
            value={volumeUnit}
            onChange={(e) => setVolumeUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            {Object.entries(volumeUnits).map(([key, unit]) => (
              <option key={key} value={key}>
                {unit.name}
              </option>
            ))}
          </select>
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

        {result && (
          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}10`, borderColor: `${primaryColor}30`, borderWidth: '1px', borderStyle: 'solid' }}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>Engine Displacement</h3>
            <p className="text-2xl font-bold" style={{ color: primaryColor }}>
              {formatValue(result.value)} {volumeUnits[result.unit as keyof typeof volumeUnits].name}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <div className="text-sm mt-3 font-mono whitespace-pre-line text-gray-700">
                {calculation}
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-mono">{error}</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Enter the bore (cylinder diameter) in your preferred length unit</li>
            <li>• Enter the stroke (piston travel distance) in the same length unit</li>
            <li>• Enter the number of cylinders (must be a whole number)</li>
            <li>• Select your preferred output volume unit (cc, liters, cubic inches, etc.)</li>
            <li>• Formula: Displacement = π × (Bore/2)² × Stroke × Number of Cylinders</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

