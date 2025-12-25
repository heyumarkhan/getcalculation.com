'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'contactPower' | 'spectaclePower' | 'vertexDistance';

export default function ContactLensVertexCalculator() {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('contactPower');
  const [spectaclePower, setSpectaclePower] = useState('');
  const [contactPower, setContactPower] = useState('');
  const [vertexDistance, setVertexDistance] = useState('12');
  const [vertexUnit, setVertexUnit] = useState<'mm' | 'cm' | 'm'>('mm');
  const [result, setResult] = useState<{ value: number; unit: string; label: string } | null>(null);
  const [calculation, setCalculation] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    if (Math.abs(value) >= 1000) {
      return value.toExponential(4);
    }
    return value.toFixed(2).replace(/\.?0+$/, '');
  };

  const convertVertexToMeters = (value: number, unit: string): number => {
    switch (unit) {
      case 'mm':
        return value / 1000;
      case 'cm':
        return value / 100;
      case 'm':
        return value;
      default:
        return value / 1000;
    }
  };

  const convertVertexFromMeters = (value: number, unit: string): number => {
    switch (unit) {
      case 'mm':
        return value * 1000;
      case 'cm':
        return value * 100;
      case 'm':
        return value;
      default:
        return value * 1000;
    }
  };

  const calculate = () => {
    const fs = spectaclePower ? parseFloat(spectaclePower) : NaN;
    const fc = contactPower ? parseFloat(contactPower) : NaN;
    const vd = vertexDistance ? parseFloat(vertexDistance) : NaN;

    if (calculationMode === 'contactPower') {
      // Calculate contact lens power from spectacle power and vertex distance
      if (!spectaclePower || !vertexDistance) {
        setResult(null);
        setCalculation('Error: Please enter both spectacle power and vertex distance');
        return;
      }

      if (isNaN(fs)) {
        setResult(null);
        setCalculation('Error: Please enter a valid number for spectacle power');
        return;
      }
      if (isNaN(vd) || vd <= 0) {
        setResult(null);
        setCalculation('Error: Vertex distance must be a valid positive number');
        return;
      }

      const vdMeters = convertVertexToMeters(vd, vertexUnit);
      const denominator = 1 - (vdMeters * fs);
      
      if (Math.abs(denominator) < 0.0001) {
        setResult(null);
        setCalculation('Error: Invalid calculation (denominator too small). Please check your inputs.');
        return;
      }

      const calculatedContactPower = fs / denominator;
      setResult({ value: calculatedContactPower, unit: 'D', label: 'Contact Lens Power' });
      setCalculation(`Contact Power = Spectacle Power / (1 - Vertex Distance × Spectacle Power)\nFc = Fs / (1 - d × Fs)\nFc = ${formatValue(fs)} D / (1 - ${formatValue(vdMeters)} m × ${formatValue(fs)} D)\nFc = ${formatValue(fs)} D / (1 - ${formatValue(vdMeters * fs)})\nFc = ${formatValue(fs)} D / ${formatValue(denominator)}\nFc = ${formatValue(calculatedContactPower)} D`);
    } else if (calculationMode === 'spectaclePower') {
      // Calculate spectacle power from contact power and vertex distance
      if (!contactPower || !vertexDistance) {
        setResult(null);
        setCalculation('Error: Please enter both contact power and vertex distance');
        return;
      }

      if (isNaN(fc)) {
        setResult(null);
        setCalculation('Error: Please enter a valid number for contact lens power');
        return;
      }
      if (isNaN(vd) || vd <= 0) {
        setResult(null);
        setCalculation('Error: Vertex distance must be a valid positive number');
        return;
      }

      const vdMeters = convertVertexToMeters(vd, vertexUnit);
      const denominator = 1 + (vdMeters * fc);
      
      if (Math.abs(denominator) < 0.0001) {
        setResult(null);
        setCalculation('Error: Invalid calculation (denominator too small). Please check your inputs.');
        return;
      }

      const calculatedSpectaclePower = fc / denominator;
      setResult({ value: calculatedSpectaclePower, unit: 'D', label: 'Spectacle Lens Power' });
      setCalculation(`Spectacle Power = Contact Power / (1 + Vertex Distance × Contact Power)\nFs = Fc / (1 + d × Fc)\nFs = ${formatValue(fc)} D / (1 + ${formatValue(vdMeters)} m × ${formatValue(fc)} D)\nFs = ${formatValue(fc)} D / (1 + ${formatValue(vdMeters * fc)})\nFs = ${formatValue(fc)} D / ${formatValue(denominator)}\nFs = ${formatValue(calculatedSpectaclePower)} D`);
    } else if (calculationMode === 'vertexDistance') {
      // Calculate vertex distance from spectacle and contact powers
      if (!spectaclePower || !contactPower) {
        setResult(null);
        setCalculation('Error: Please enter both spectacle power and contact power');
        return;
      }

      if (isNaN(fs) || isNaN(fc)) {
        setResult(null);
        setCalculation('Error: Please enter valid numbers for both powers');
        return;
      }

      if (Math.abs(fs - fc) < 0.0001) {
        setResult(null);
        setCalculation('Error: When spectacle and contact powers are equal, vertex distance is effectively zero');
        return;
      }

      const calculatedVertexMeters = (fc - fs) / (fs * fc);
      const calculatedVertex = convertVertexFromMeters(calculatedVertexMeters, vertexUnit);
      
      if (calculatedVertexMeters <= 0) {
        setResult(null);
        setCalculation('Error: Calculated vertex distance must be positive. Please check your power values.');
        return;
      }

      setResult({ value: calculatedVertex, unit: vertexUnit, label: 'Vertex Distance' });
      setCalculation(`Vertex Distance = (Contact Power - Spectacle Power) / (Spectacle Power × Contact Power)\nd = (Fc - Fs) / (Fs × Fc)\nd = (${formatValue(fc)} D - ${formatValue(fs)} D) / (${formatValue(fs)} D × ${formatValue(fc)} D)\nd = ${formatValue(fc - fs)} D / ${formatValue(fs * fc)} D²\nd = ${formatValue(calculatedVertexMeters)} m = ${formatValue(calculatedVertex)} ${vertexUnit}`);
    }
  };

  const clearAll = () => {
    setSpectaclePower('');
    setContactPower('');
    setVertexDistance('12');
    setVertexUnit('mm');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Lens Vertex Calculator</h2>
        <p className="text-gray-600">Calculate contact lens power, spectacle power, or vertex distance using vertex distance formulas</p>
      </div>

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Mode
          </label>
          <select
            value={calculationMode}
            onChange={(e) => {
              setCalculationMode(e.target.value as CalculationMode);
              clearAll();
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="contactPower">Calculate Contact Lens Power</option>
            <option value="spectaclePower">Calculate Spectacle Power</option>
            <option value="vertexDistance">Calculate Vertex Distance</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            {calculationMode === 'contactPower' && 'Fc = Fs / (1 - d × Fs)'}
            {calculationMode === 'spectaclePower' && 'Fs = Fc / (1 + d × Fc)'}
            {calculationMode === 'vertexDistance' && 'd = (Fc - Fs) / (Fs × Fc)'}
          </p>
        </div>

        {/* Spectacle Power Input */}
        {(calculationMode === 'contactPower' || calculationMode === 'vertexDistance') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Spectacle Lens Power (Fs)
            </label>
            <Input
              type="text"
              placeholder="Enter spectacle power in diopters (D)"
              value={spectaclePower}
              onChange={(e) => setSpectaclePower(e.target.value)}
              className="w-full"
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter positive values for plus power, negative values for minus power (e.g., -4.50, +2.00)
            </p>
          </div>
        )}

        {/* Contact Power Input */}
        {(calculationMode === 'spectaclePower' || calculationMode === 'vertexDistance') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Contact Lens Power (Fc)
            </label>
            <Input
              type="text"
              placeholder="Enter contact power in diopters (D)"
              value={contactPower}
              onChange={(e) => setContactPower(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter positive values for plus power, negative values for minus power (e.g., -4.50, +2.00)
            </p>
          </div>
        )}

        {/* Vertex Distance Input */}
        {(calculationMode === 'contactPower' || calculationMode === 'spectaclePower') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Vertex Distance (d)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter vertex distance"
                  value={vertexDistance}
                  onChange={(e) => setVertexDistance(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
                <select
                  value={vertexUnit}
                  onChange={(e) => setVertexUnit(e.target.value as 'mm' | 'cm' | 'm')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                >
                  <option value="mm">mm</option>
                  <option value="cm">cm</option>
                  <option value="m">m</option>
                </select>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Typical vertex distance: 12-14 mm (0.012-0.014 m). Standard default: 12 mm
            </p>
          </div>
        )}

        {/* Vertex Distance Output Unit (when calculating vertex distance) */}
        {calculationMode === 'vertexDistance' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Output Unit
            </label>
            <select
              value={vertexUnit}
              onChange={(e) => setVertexUnit(e.target.value as 'mm' | 'cm' | 'm')}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
            >
              <option value="mm">Millimeters (mm)</option>
              <option value="cm">Centimeters (cm)</option>
              <option value="m">Meters (m)</option>
            </select>
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
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">Result</h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            <p className="text-sm text-[#820ECC]/80 mt-1">
              {result.label}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <div className="text-sm text-[#820ECC]/80 mt-3 font-mono whitespace-pre-line">
                {calculation}
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
            {calculationMode === 'contactPower' && (
              <>
                <li>• Enter spectacle lens power (in diopters) and vertex distance</li>
                <li>• Calculator will determine the equivalent contact lens power</li>
                <li>• Formula: Fc = Fs / (1 - d × Fs)</li>
                <li>• Vertex distance is typically 12-14 mm (default: 12 mm)</li>
              </>
            )}
            {calculationMode === 'spectaclePower' && (
              <>
                <li>• Enter contact lens power (in diopters) and vertex distance</li>
                <li>• Calculator will determine the equivalent spectacle lens power</li>
                <li>• Formula: Fs = Fc / (1 + d × Fc)</li>
                <li>• Vertex distance is typically 12-14 mm (default: 12 mm)</li>
              </>
            )}
            {calculationMode === 'vertexDistance' && (
              <>
                <li>• Enter both spectacle and contact lens powers (in diopters)</li>
                <li>• Calculator will determine the vertex distance between them</li>
                <li>• Formula: d = (Fc - Fs) / (Fs × Fc)</li>
              </>
            )}
            <li>• Power values: Use positive for plus power, negative for minus power (e.g., -4.50 D, +2.00 D)</li>
            <li>• Vertex distance: The distance from the back surface of the spectacle lens to the cornea</li>
            <li>• Important for accurate lens power conversion between spectacles and contact lenses</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

