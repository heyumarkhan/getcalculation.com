'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors
const wavelengthUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'μm': { name: 'μm (Micrometers)', factor: 0.000001 },
  'nm': { name: 'nm (Nanometers)', factor: 0.000000001 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'Å': { name: 'Å (Angstroms)', factor: 0.0000000001 }
};

const frequencyUnits = {
  'Hz': { name: 'Hz (Hertz)', factor: 1 },
  'kHz': { name: 'kHz (Kilohertz)', factor: 1000 },
  'MHz': { name: 'MHz (Megahertz)', factor: 1000000 },
  'GHz': { name: 'GHz (Gigahertz)', factor: 1000000000 },
  'THz': { name: 'THz (Terahertz)', factor: 1000000000000 }
};

const velocityUnits = {
  'm/s': { name: 'm/s (Meters per second)', factor: 1 },
  'km/s': { name: 'km/s (Kilometers per second)', factor: 1000 },
  'km/h': { name: 'km/h (Kilometers per hour)', factor: 0.277778 },
  'mph': { name: 'mph (Miles per hour)', factor: 0.44704 },
  'ft/s': { name: 'ft/s (Feet per second)', factor: 0.3048 },
  'c': { name: 'c (Speed of light)', factor: 299792458 }
};

type WaveType = 'electromagnetic' | 'general';

export default function WavelengthToFrequencyCalculator() {
  const [waveType, setWaveType] = useState<WaveType>('electromagnetic');
  const [wavelength, setWavelength] = useState('');
  const [frequency, setFrequency] = useState('');
  const [velocity, setVelocity] = useState('');
  const [wavelengthUnit, setWavelengthUnit] = useState('m');
  const [frequencyUnit, setFrequencyUnit] = useState('Hz');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'wavelength' | 'frequency' } | null>(null);
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

  const convertFrequencyToBase = (value: number, unit: string) => {
    return value * frequencyUnits[unit as keyof typeof frequencyUnits].factor;
  };

  const convertFrequencyFromBase = (value: number, unit: string) => {
    return value / frequencyUnits[unit as keyof typeof frequencyUnits].factor;
  };

  const convertVelocityToBase = (value: number, unit: string) => {
    return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const calculate = () => {
    const λ = wavelength ? parseFloat(wavelength) : NaN;
    const f = frequency ? parseFloat(frequency) : NaN;
    const v = velocity ? parseFloat(velocity) : NaN;

    const filledCount = [wavelength, frequency].filter(val => val !== '').length;

    if (filledCount !== 1) {
      setResult(null);
      setCalculation('');
      return;
    }

    // Validate inputs
    if (wavelength && (isNaN(λ) || λ <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for wavelength');
      return;
    }
    if (frequency && (isNaN(f) || f <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for frequency');
      return;
    }
    if (waveType === 'general' && (!velocity || isNaN(v) || v <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for velocity');
      return;
    }

    if (waveType === 'electromagnetic') {
      // For electromagnetic waves: f = c / λ or λ = c / f
      const c = 299792458; // Speed of light in m/s

      if (!frequency) {
        // Calculate frequency: f = c / λ
        const λBase = convertWavelengthToBase(λ, wavelengthUnit);

        if (λBase === 0) {
          setResult(null);
          setCalculation('Error: Wavelength cannot be zero');
          return;
        }

        const fBase = c / λBase;
        const fResult = convertFrequencyFromBase(fBase, frequencyUnit);

        setResult({ value: fResult, unit: frequencyUnit, type: 'frequency' });
        setCalculation(`f = c / λ = 299,792,458 m/s / ${formatValue(λ)} ${wavelengthUnit} = ${formatValue(fResult)} ${frequencyUnit}`);
      } else if (!wavelength) {
        // Calculate wavelength: λ = c / f
        const fBase = convertFrequencyToBase(f, frequencyUnit);

        if (fBase === 0) {
          setResult(null);
          setCalculation('Error: Frequency cannot be zero');
          return;
        }

        const λBase = c / fBase;
        const λResult = convertWavelengthFromBase(λBase, wavelengthUnit);

        setResult({ value: λResult, unit: wavelengthUnit, type: 'wavelength' });
        setCalculation(`λ = c / f = 299,792,458 m/s / ${formatValue(f)} ${frequencyUnit} = ${formatValue(λResult)} ${wavelengthUnit}`);
      }
    } else {
      // For general waves: f = v / λ or λ = v / f
      const vBase = convertVelocityToBase(v, velocityUnit);

      if (!frequency) {
        // Calculate frequency: f = v / λ
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
      } else if (!wavelength) {
        // Calculate wavelength: λ = v / f
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
      }
    }
  };

  const clearAll = () => {
    setWavelength('');
    setFrequency('');
    setVelocity('');
    setWavelengthUnit('m');
    setFrequencyUnit('Hz');
    setVelocityUnit('m/s');
    setResult(null);
    setCalculation('');
  };

  const handleWaveTypeChange = (type: WaveType) => {
    setWaveType(type);
    if (type === 'electromagnetic') {
      setVelocity('');
    }
    clearAll();
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Wavelength to Frequency Calculator</h2>
        <p className="text-gray-600">Convert between wavelength and frequency using f = c/λ or f = v/λ</p>
      </div>

      <div className="space-y-6">
        {/* Wave Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Wave Type
          </label>
          <select
            value={waveType}
            onChange={(e) => handleWaveTypeChange(e.target.value as WaveType)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="electromagnetic">Electromagnetic Waves (f = c/λ)</option>
            <option value="general">General Waves (f = v/λ)</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">
            {waveType === 'electromagnetic' ? 'f = c / λ' : 'f = v / λ'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Where: f = Frequency, {waveType === 'electromagnetic' ? 'c = Speed of light' : 'v = Velocity'}, λ = Wavelength
          </p>
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
                placeholder="Enter wavelength (leave empty to calculate)"
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

        {/* Velocity Input (only for general waves) */}
        {waveType === 'general' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Velocity (v)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter velocity"
                  value={velocity}
                  onChange={(e) => setVelocity(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-40">
                <select
                  value={velocityUnit}
                  onChange={(e) => setVelocityUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(velocityUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Frequency Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Frequency (f)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter frequency (leave empty to calculate)"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={frequencyUnit}
                onChange={(e) => setFrequencyUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        {waveType === 'electromagnetic' && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Using speed of light c = 299,792,458 m/s
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
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">Result</h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <p className="text-sm text-[#820ECC]/80 mt-2 font-mono break-words">
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
            <li>• Enter either wavelength or frequency to calculate the other</li>
            {waveType === 'electromagnetic' ? (
              <>
                <li>• Formula: f = c / λ (Frequency = Speed of Light / Wavelength)</li>
                <li>• Speed of light: c = 299,792,458 m/s</li>
                <li>• Perfect for radio waves, microwaves, infrared, visible light, UV, X-rays, and gamma rays</li>
              </>
            ) : (
              <>
                <li>• Formula: f = v / λ (Frequency = Velocity / Wavelength)</li>
                <li>• Enter the wave velocity in your preferred units</li>
                <li>• Suitable for sound waves, water waves, and other mechanical waves</li>
              </>
            )}
            <li>• Select your preferred units for wavelength and frequency</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• All values should be positive numbers</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

