'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: m, m/s, Hz)
const wavelengthUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'μm': { name: 'μm (Micrometers)', factor: 0.000001 },
  'nm': { name: 'nm (Nanometers)', factor: 0.000000001 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 }
};

const velocityUnits = {
  'm/s': { name: 'm/s (Meters per second)', factor: 1 },
  'km/s': { name: 'km/s (Kilometers per second)', factor: 1000 },
  'km/h': { name: 'km/h (Kilometers per hour)', factor: 0.277778 },
  'mph': { name: 'mph (Miles per hour)', factor: 0.44704 },
  'ft/s': { name: 'ft/s (Feet per second)', factor: 0.3048 },
  'c': { name: 'c (Speed of light)', factor: 299792458 }
};

const frequencyUnits = {
  'Hz': { name: 'Hz (Hertz)', factor: 1 },
  'kHz': { name: 'kHz (Kilohertz)', factor: 1000 },
  'MHz': { name: 'MHz (Megahertz)', factor: 1000000 },
  'GHz': { name: 'GHz (Gigahertz)', factor: 1000000000 },
  'THz': { name: 'THz (Terahertz)', factor: 1000000000000 }
};

type CalculationMode = 'general' | 'electromagnetic';

export default function WavelengthCalculator() {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('general');
  const [wavelength, setWavelength] = useState('');
  const [velocity, setVelocity] = useState('');
  const [frequency, setFrequency] = useState('');
  const [wavelengthUnit, setWavelengthUnit] = useState('m');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [frequencyUnit, setFrequencyUnit] = useState('Hz');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'wavelength' | 'velocity' | 'frequency' } | null>(null);
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

  const convertWavelengthToBase = (value: number, unit: string) => {
    return value * wavelengthUnits[unit as keyof typeof wavelengthUnits].factor;
  };

  const convertWavelengthFromBase = (value: number, unit: string) => {
    return value / wavelengthUnits[unit as keyof typeof wavelengthUnits].factor;
  };

  const convertVelocityToBase = (value: number, unit: string) => {
    return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertVelocityFromBase = (value: number, unit: string) => {
    return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertFrequencyToBase = (value: number, unit: string) => {
    return value * frequencyUnits[unit as keyof typeof frequencyUnits].factor;
  };

  const convertFrequencyFromBase = (value: number, unit: string) => {
    return value / frequencyUnits[unit as keyof typeof frequencyUnits].factor;
  };

  const calculate = () => {
    const λ = wavelength ? parseFloat(wavelength) : NaN;
    let v = velocity ? parseFloat(velocity) : NaN;
    const f = frequency ? parseFloat(frequency) : NaN;
    
    // For electromagnetic mode, use speed of light
    if (calculationMode === 'electromagnetic') {
      v = 1; // Will be converted using 'c' unit factor
      // Count velocity as filled for electromagnetic mode
    }

    const filledCount = calculationMode === 'electromagnetic' 
      ? [wavelength, frequency].filter(val => val !== '').length + 1 // +1 for automatic velocity
      : [wavelength, velocity, frequency].filter(val => val !== '').length;

    if (filledCount !== 2) {
      setResult(null);
      setCalculation('');
      return;
    }

    // Validate that filled values are valid numbers
    if (wavelength && (isNaN(λ) || λ <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for wavelength');
      return;
    }
    if (velocity && (isNaN(v) || v <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for velocity');
      return;
    }
    if (frequency && (isNaN(f) || f <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for frequency');
      return;
    }

    if (!wavelength) {
      // Calculate wavelength: λ = v / f
      const vBase = convertVelocityToBase(v, velocityUnit);
      const fBase = convertFrequencyToBase(f, frequencyUnit);
      
      if (fBase === 0) {
        setResult(null);
        setCalculation('Error: Frequency cannot be zero');
        return;
      }
      
      const λBase = vBase / fBase;
      const λResult = convertWavelengthFromBase(λBase, wavelengthUnit);
      
      setResult({ value: λResult, unit: wavelengthUnit, type: 'wavelength' });
      setCalculation(`λ = v / f = ${formatValue(v)} ${velocityUnit} / ${formatValue(f)} ${frequencyUnit} = ${formatValue(λResult)} ${wavelengthUnit}`);
    } else if (!velocity) {
      // Calculate velocity: v = λ × f
      const λBase = convertWavelengthToBase(λ, wavelengthUnit);
      const fBase = convertFrequencyToBase(f, frequencyUnit);
      const vBase = λBase * fBase;
      const vResult = convertVelocityFromBase(vBase, velocityUnit);
      
      setResult({ value: vResult, unit: velocityUnit, type: 'velocity' });
      setCalculation(`v = λ × f = ${formatValue(λ)} ${wavelengthUnit} × ${formatValue(f)} ${frequencyUnit} = ${formatValue(vResult)} ${velocityUnit}`);
    } else if (!frequency) {
      // Calculate frequency: f = v / λ
      const vBase = convertVelocityToBase(v, velocityUnit);
      const λBase = convertWavelengthToBase(λ, wavelengthUnit);
      
      if (λBase === 0) {
        setResult(null);
        setCalculation('Error: Wavelength cannot be zero');
        return;
      }
      
      const fBase = vBase / λBase;
      const fResult = convertFrequencyFromBase(fBase, frequencyUnit);
      
      setResult({ value: fResult, unit: frequencyUnit, type: 'frequency' });
      setCalculation(`f = v / λ = ${formatValue(v)} ${velocityUnit} / ${formatValue(λ)} ${wavelengthUnit} = ${formatValue(fResult)} ${frequencyUnit}`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setWavelength('');
    setVelocity('');
    setFrequency('');
    setWavelengthUnit('m');
    setVelocityUnit('m/s');
    setFrequencyUnit('Hz');
    setResult(null);
    setCalculation('');
  };

  const getResultColor = () => {
    return 'bg-[#820ECC]/10 border-[#820ECC]/30';
  };

  const getResultTextColor = () => {
    return 'text-[#820ECC]';
  };

  // Set default velocity to speed of light for electromagnetic mode
  const handleModeChange = (mode: CalculationMode) => {
    setCalculationMode(mode);
    if (mode === 'electromagnetic') {
      setVelocity('1');
      setVelocityUnit('c');
    }
    // Don't clear all, just update velocity
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Wavelength Calculator</h2>
        <p className="text-gray-600">Calculate wavelength, velocity, or frequency using λ = v/f</p>
      </div>

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Calculation Mode
          </label>
          <select
            value={calculationMode}
            onChange={(e) => handleModeChange(e.target.value as CalculationMode)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="general">General Waves (λ = v/f)</option>
            <option value="electromagnetic">Electromagnetic Waves (λ = c/f)</option>
          </select>
          {calculationMode === 'electromagnetic' && (
            <p className="text-sm text-gray-600 mt-2">
              Using speed of light (c = 299,792,458 m/s) as velocity
            </p>
          )}
        </div>

        {/* Wavelength Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Wavelength (λ)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter wavelength"
                value={wavelength}
                onChange={(e) => setWavelength(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={wavelengthUnit}
                onChange={(e) => setWavelengthUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(wavelengthUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Velocity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {calculationMode === 'electromagnetic' ? 'Speed of Light (c)' : 'Velocity (v)'}
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder={calculationMode === 'electromagnetic' ? "Enter speed of light (usually 1 for 'c')" : "Enter velocity"}
                value={velocity}
                onChange={(e) => setVelocity(e.target.value)}
                className="w-full"
                disabled={calculationMode === 'electromagnetic'}
              />
            </div>
            <div className="w-48">
              <select
                value={velocityUnit}
                onChange={(e) => setVelocityUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                disabled={calculationMode === 'electromagnetic'}
              >
                {Object.entries(velocityUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {calculationMode === 'electromagnetic' && (
            <p className="text-xs text-gray-500 mt-1">
              Speed of light is automatically set to c = 299,792,458 m/s
            </p>
          )}
        </div>

        {/* Frequency Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Frequency (f)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={frequencyUnit}
                onChange={(e) => setFrequencyUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(frequencyUnits).map(([key, unit]) => (
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
              <p className={`text-sm ${getResultTextColor()}/80 mt-2 font-mono`}>
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
            <li>• Enter any two values to calculate the third (λ, v, or f)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• Formula: λ = v / f (Wavelength = Velocity / Frequency)</li>
            {calculationMode === 'electromagnetic' && (
              <li>• For electromagnetic waves, speed of light (c) is automatically used</li>
            )}
          </ul>
        </div>
      </div>
    </Card>
  );
}

