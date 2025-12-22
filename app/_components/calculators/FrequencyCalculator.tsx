'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors
const timeUnits = {
  's': { name: 's (Seconds)', factor: 1 },
  'ms': { name: 'ms (Milliseconds)', factor: 0.001 },
  'μs': { name: 'μs (Microseconds)', factor: 0.000001 },
  'ns': { name: 'ns (Nanoseconds)', factor: 0.000000001 },
  'min': { name: 'min (Minutes)', factor: 60 },
  'h': { name: 'h (Hours)', factor: 3600 }
};

const wavelengthUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'μm': { name: 'μm (Micrometers)', factor: 0.000001 },
  'nm': { name: 'nm (Nanometers)', factor: 0.000000001 },
  'km': { name: 'km (Kilometers)', factor: 1000 }
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

type CalculationMode = 'period' | 'wavelength' | 'electromagnetic';

export default function FrequencyCalculator() {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('period');
  const [period, setPeriod] = useState('');
  const [wavelength, setWavelength] = useState('');
  const [velocity, setVelocity] = useState('');
  const [frequency, setFrequency] = useState('');
  const [periodUnit, setPeriodUnit] = useState('s');
  const [wavelengthUnit, setWavelengthUnit] = useState('m');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [frequencyUnit, setFrequencyUnit] = useState('Hz');
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
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

  const convertTimeToBase = (value: number, unit: string) => {
    return value * timeUnits[unit as keyof typeof timeUnits].factor;
  };

  const convertTimeFromBase = (value: number, unit: string) => {
    return value / timeUnits[unit as keyof typeof timeUnits].factor;
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
    if (calculationMode === 'period') {
      // f = 1/T
      const t = period ? parseFloat(period) : NaN;
      const f = frequency ? parseFloat(frequency) : NaN;

      if (period && frequency) {
        setResult(null);
        setCalculation('Error: Please enter only one value (period or frequency)');
        return;
      }

      if (!period && !frequency) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (period) {
        if (isNaN(t) || t <= 0) {
          setResult(null);
          setCalculation('Error: Please enter a valid positive number for period');
          return;
        }

        const tBase = convertTimeToBase(t, periodUnit);
        const fBase = 1 / tBase;
        const fResult = convertFrequencyFromBase(fBase, frequencyUnit);

        setResult({ value: fResult, unit: frequencyUnit });
        setCalculation(`f = 1 / T = 1 / ${formatValue(t)} ${periodUnit} = ${formatValue(fResult)} ${frequencyUnit}`);
      } else if (frequency) {
        if (isNaN(f) || f <= 0) {
          setResult(null);
          setCalculation('Error: Please enter a valid positive number for frequency');
          return;
        }

        const fBase = convertFrequencyToBase(f, frequencyUnit);
        const tBase = 1 / fBase;
        const tResult = convertTimeFromBase(tBase, periodUnit);

        setResult({ value: tResult, unit: periodUnit });
        setCalculation(`T = 1 / f = 1 / ${formatValue(f)} ${frequencyUnit} = ${formatValue(tResult)} ${periodUnit}`);
      }
    } else if (calculationMode === 'wavelength') {
      // f = v / λ
      const λ = wavelength ? parseFloat(wavelength) : NaN;
      const v = velocity ? parseFloat(velocity) : NaN;
      const f = frequency ? parseFloat(frequency) : NaN;

      const filledCount = [wavelength, velocity, frequency].filter(val => val !== '').length;

      if (filledCount !== 2) {
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

      if (!frequency) {
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

        setResult({ value: fResult, unit: frequencyUnit });
        setCalculation(`f = v / λ = ${formatValue(v)} ${velocityUnit} / ${formatValue(λ)} ${wavelengthUnit} = ${formatValue(fResult)} ${frequencyUnit}`);
      } else if (!wavelength) {
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

        setResult({ value: λResult, unit: wavelengthUnit });
        setCalculation(`λ = v / f = ${formatValue(v)} ${velocityUnit} / ${formatValue(f)} ${frequencyUnit} = ${formatValue(λResult)} ${wavelengthUnit}`);
      } else if (!velocity) {
        // Calculate velocity: v = λ × f
        const λBase = convertWavelengthToBase(λ, wavelengthUnit);
        const fBase = convertFrequencyToBase(f, frequencyUnit);
        const vBase = λBase * fBase;
        const vResult = convertVelocityFromBase(vBase, velocityUnit);

        setResult({ value: vResult, unit: velocityUnit });
        setCalculation(`v = λ × f = ${formatValue(λ)} ${wavelengthUnit} × ${formatValue(f)} ${frequencyUnit} = ${formatValue(vResult)} ${velocityUnit}`);
      }
    } else if (calculationMode === 'electromagnetic') {
      // f = c / λ (for electromagnetic waves)
      const λ = wavelength ? parseFloat(wavelength) : NaN;
      const f = frequency ? parseFloat(frequency) : NaN;

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

        setResult({ value: fResult, unit: frequencyUnit });
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

        setResult({ value: λResult, unit: wavelengthUnit });
        setCalculation(`λ = c / f = 299,792,458 m/s / ${formatValue(f)} ${frequencyUnit} = ${formatValue(λResult)} ${wavelengthUnit}`);
      }
    }
  };

  const clearAll = () => {
    setPeriod('');
    setWavelength('');
    setVelocity('');
    setFrequency('');
    setPeriodUnit('s');
    setWavelengthUnit('m');
    setVelocityUnit('m/s');
    setFrequencyUnit('Hz');
    setResult(null);
    setCalculation('');
  };

  const handleModeChange = (mode: CalculationMode) => {
    setCalculationMode(mode);
    if (mode === 'electromagnetic') {
      setVelocity('1');
      setVelocityUnit('c');
    }
    clearAll();
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequency Calculator</h2>
        <p className="text-gray-600">Calculate frequency using f = 1/T, f = v/λ, or f = c/λ</p>
      </div>

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Mode
          </label>
          <select
            value={calculationMode}
            onChange={(e) => handleModeChange(e.target.value as CalculationMode)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="period">From Period: f = 1/T</option>
            <option value="wavelength">From Wavelength: f = v/λ</option>
            <option value="electromagnetic">Electromagnetic Waves: f = c/λ</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">
            {calculationMode === 'period' && 'f = 1 / T'}
            {calculationMode === 'wavelength' && 'f = v / λ'}
            {calculationMode === 'electromagnetic' && 'f = c / λ'}
          </p>
        </div>

        {/* Period Mode Inputs */}
        {calculationMode === 'period' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Period (T)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter period (leave empty to calculate)"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-40">
                  <select
                    value={periodUnit}
                    onChange={(e) => setPeriodUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(timeUnits).map(([key, unit]) => (
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
          </>
        )}

        {/* Wavelength Mode Inputs */}
        {calculationMode === 'wavelength' && (
          <>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Velocity (v)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter velocity (leave empty to calculate)"
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
          </>
        )}

        {/* Electromagnetic Mode Inputs */}
        {calculationMode === 'electromagnetic' && (
          <>
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
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Using speed of light c = 299,792,458 m/s
              </p>
            </div>
          </>
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
            {calculationMode === 'period' && (
              <>
                <li>• Enter either period or frequency to calculate the other</li>
                <li>• Formula: f = 1 / T (Frequency = 1 / Period)</li>
              </>
            )}
            {calculationMode === 'wavelength' && (
              <>
                <li>• Enter any two values to calculate the third (wavelength, velocity, or frequency)</li>
                <li>• Formula: f = v / λ (Frequency = Velocity / Wavelength)</li>
              </>
            )}
            {calculationMode === 'electromagnetic' && (
              <>
                <li>• Enter either wavelength or frequency to calculate the other</li>
                <li>• Formula: f = c / λ (Frequency = Speed of Light / Wavelength)</li>
                <li>• Speed of light: c = 299,792,458 m/s</li>
              </>
            )}
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

