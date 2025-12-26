'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'distanceFromTime' | 'timeFromDistance' | 'frequencyFromWavelength' | 'wavelengthFromFrequency';

interface SpeedOfLightCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Speed of light constant
const c = 299792458; // Speed of light in m/s

// Unit conversion factors
const distanceUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 },
  'mi': { name: 'mi (Miles)', factor: 1609.34 },
  'ly': { name: 'ly (Light-years)', factor: 9.461e15 }, // 1 light-year = 9.461 × 10¹⁵ m
  'AU': { name: 'AU (Astronomical Units)', factor: 1.496e11 }, // 1 AU = 1.496 × 10¹¹ m
  'ls': { name: 'ls (Light-seconds)', factor: c }, // 1 light-second = c × 1 s = c m
  'lm': { name: 'lm (Light-minutes)', factor: c * 60 }, // 1 light-minute = c × 60 s
  'lh': { name: 'lh (Light-hours)', factor: c * 3600 } // 1 light-hour = c × 3600 s
};

const timeUnits = {
  's': { name: 's (Seconds)', factor: 1 },
  'ms': { name: 'ms (Milliseconds)', factor: 0.001 },
  'μs': { name: 'μs (Microseconds)', factor: 1e-6 },
  'ns': { name: 'ns (Nanoseconds)', factor: 1e-9 },
  'min': { name: 'min (Minutes)', factor: 60 },
  'h': { name: 'h (Hours)', factor: 3600 },
  'd': { name: 'd (Days)', factor: 86400 },
  'yr': { name: 'yr (Years)', factor: 31557600 } // 1 year ≈ 365.25 days
};

const wavelengthUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'nm': { name: 'nm (Nanometers)', factor: 1e-9 },
  'μm': { name: 'μm (Micrometers)', factor: 1e-6 },
  'mm': { name: 'mm (Millimeters)', factor: 1e-3 },
  'cm': { name: 'cm (Centimeters)', factor: 1e-2 },
  'Å': { name: 'Å (Angstroms)', factor: 1e-10 }
};

const frequencyUnits = {
  'Hz': { name: 'Hz (Hertz)', factor: 1 },
  'kHz': { name: 'kHz (Kilohertz)', factor: 1e3 },
  'MHz': { name: 'MHz (Megahertz)', factor: 1e6 },
  'GHz': { name: 'GHz (Gigahertz)', factor: 1e9 },
  'THz': { name: 'THz (Terahertz)', factor: 1e12 }
};

export default function SpeedOfLightCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: SpeedOfLightCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('distanceFromTime');
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [wavelength, setWavelength] = useState('');
  const [frequency, setFrequency] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('m');
  const [timeUnit, setTimeUnit] = useState('s');
  const [wavelengthUnit, setWavelengthUnit] = useState('nm');
  const [frequencyUnit, setFrequencyUnit] = useState('Hz');
  const [result, setResult] = useState<{ value: number; unit: string; label: string } | null>(null);
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

  const convertDistanceToBase = (value: number, unit: string): number => {
    return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertDistanceFromBase = (value: number, unit: string): number => {
    return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertTimeToBase = (value: number, unit: string): number => {
    return value * timeUnits[unit as keyof typeof timeUnits].factor;
  };

  const convertTimeFromBase = (value: number, unit: string): number => {
    return value / timeUnits[unit as keyof typeof timeUnits].factor;
  };

  const convertWavelengthToBase = (value: number, unit: string): number => {
    return value * wavelengthUnits[unit as keyof typeof wavelengthUnits].factor;
  };

  const convertWavelengthFromBase = (value: number, unit: string): number => {
    return value / wavelengthUnits[unit as keyof typeof wavelengthUnits].factor;
  };

  const convertFrequencyToBase = (value: number, unit: string): number => {
    return value * frequencyUnits[unit as keyof typeof frequencyUnits].factor;
  };

  const convertFrequencyFromBase = (value: number, unit: string): number => {
    return value / frequencyUnits[unit as keyof typeof frequencyUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const d = distance ? parseFloat(distance) : NaN;
    const t = time ? parseFloat(time) : NaN;
    const lambda = wavelength ? parseFloat(wavelength) : NaN;
    const f = frequency ? parseFloat(frequency) : NaN;

    if (calculationMode === 'distanceFromTime') {
      // Calculate distance: d = c × t
      if (!time) {
        setError('Please enter time');
        return;
      }

      if (isNaN(t) || t <= 0) {
        setError('Time must be a valid positive number');
        return;
      }

      const tBase = convertTimeToBase(t, timeUnit);
      const dBase = c * tBase;
      const dResult = convertDistanceFromBase(dBase, distanceUnit);

      setResult({ value: dResult, unit: distanceUnit, label: 'Distance' });
      setCalculation(`Distance (d) = Speed of Light (c) × Time (t)\nd = c × t\nc = ${c.toExponential(4)} m/s = ${formatValue(c)} m/s\nt = ${formatValue(t)} ${timeUnits[timeUnit as keyof typeof timeUnits].name} = ${formatValue(tBase)} s\nd = ${formatValue(c)} m/s × ${formatValue(tBase)} s\nd = ${formatValue(dBase)} m = ${formatValue(dResult)} ${distanceUnits[distanceUnit as keyof typeof distanceUnits].name}`);
    } else if (calculationMode === 'timeFromDistance') {
      // Calculate time: t = d / c
      if (!distance) {
        setError('Please enter distance');
        return;
      }

      if (isNaN(d) || d <= 0) {
        setError('Distance must be a valid positive number');
        return;
      }

      const dBase = convertDistanceToBase(d, distanceUnit);
      const tBase = dBase / c;
      const tResult = convertTimeFromBase(tBase, timeUnit);

      setResult({ value: tResult, unit: timeUnit, label: 'Time' });
      setCalculation(`Time (t) = Distance (d) / Speed of Light (c)\nt = d / c\nc = ${c.toExponential(4)} m/s = ${formatValue(c)} m/s\nd = ${formatValue(d)} ${distanceUnits[distanceUnit as keyof typeof distanceUnits].name} = ${formatValue(dBase)} m\nt = ${formatValue(dBase)} m / ${formatValue(c)} m/s\nt = ${formatValue(tBase)} s = ${formatValue(tResult)} ${timeUnits[timeUnit as keyof typeof timeUnits].name}`);
    } else if (calculationMode === 'frequencyFromWavelength') {
      // Calculate frequency: f = c / λ
      if (!wavelength) {
        setError('Please enter wavelength');
        return;
      }

      if (isNaN(lambda) || lambda <= 0) {
        setError('Wavelength must be a valid positive number');
        return;
      }

      const lambdaBase = convertWavelengthToBase(lambda, wavelengthUnit);
      const fBase = c / lambdaBase;
      const fResult = convertFrequencyFromBase(fBase, frequencyUnit);

      setResult({ value: fResult, unit: frequencyUnit, label: 'Frequency' });
      setCalculation(`Frequency (f) = Speed of Light (c) / Wavelength (λ)\nf = c / λ\nc = ${c.toExponential(4)} m/s = ${formatValue(c)} m/s\nλ = ${formatValue(lambda)} ${wavelengthUnits[wavelengthUnit as keyof typeof wavelengthUnits].name} = ${formatValue(lambdaBase)} m\nf = ${formatValue(c)} m/s / ${formatValue(lambdaBase)} m\nf = ${formatValue(fBase)} Hz = ${formatValue(fResult)} ${frequencyUnits[frequencyUnit as keyof typeof frequencyUnits].name}`);
    } else if (calculationMode === 'wavelengthFromFrequency') {
      // Calculate wavelength: λ = c / f
      if (!frequency) {
        setError('Please enter frequency');
        return;
      }

      if (isNaN(f) || f <= 0) {
        setError('Frequency must be a valid positive number');
        return;
      }

      const fBase = convertFrequencyToBase(f, frequencyUnit);
      const lambdaBase = c / fBase;
      const lambdaResult = convertWavelengthFromBase(lambdaBase, wavelengthUnit);

      setResult({ value: lambdaResult, unit: wavelengthUnit, label: 'Wavelength' });
      setCalculation(`Wavelength (λ) = Speed of Light (c) / Frequency (f)\nλ = c / f\nc = ${c.toExponential(4)} m/s = ${formatValue(c)} m/s\nf = ${formatValue(f)} ${frequencyUnits[frequencyUnit as keyof typeof frequencyUnits].name} = ${formatValue(fBase)} Hz\nλ = ${formatValue(c)} m/s / ${formatValue(fBase)} Hz\nλ = ${formatValue(lambdaBase)} m = ${formatValue(lambdaResult)} ${wavelengthUnits[wavelengthUnit as keyof typeof wavelengthUnits].name}`);
    }
  };

  const clearAll = () => {
    setDistance('');
    setTime('');
    setWavelength('');
    setFrequency('');
    setDistanceUnit('m');
    setTimeUnit('s');
    setWavelengthUnit('nm');
    setFrequencyUnit('Hz');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Speed of Light Calculator</h2>
          <p className="text-gray-600">Calculate distance, time, frequency, and wavelength using the speed of light (c = 299,792,458 m/s)</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Method
          </label>
          <select
            value={calculationMode}
            onChange={(e) => {
              setCalculationMode(e.target.value as CalculationMode);
              clearAll();
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="distanceFromTime">Calculate Distance from Time</option>
            <option value="timeFromDistance">Calculate Time from Distance</option>
            <option value="frequencyFromWavelength">Calculate Frequency from Wavelength</option>
            <option value="wavelengthFromFrequency">Calculate Wavelength from Frequency</option>
          </select>
        </div>

        {/* Input Fields */}
        {calculationMode === 'distanceFromTime' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Time (t)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="w-32">
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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
        )}

        {calculationMode === 'timeFromDistance' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Distance (d)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter distance"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="w-32">
                <select
                  value={distanceUnit}
                  onChange={(e) => setDistanceUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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
        )}

        {calculationMode === 'frequencyFromWavelength' && (
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
              <div className="w-32">
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
        )}

        {calculationMode === 'wavelengthFromFrequency' && (
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
                  autoFocus
                />
              </div>
              <div className="w-32">
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
        )}

        {/* Result Unit Selector */}
        {(calculationMode === 'distanceFromTime' || calculationMode === 'timeFromDistance' || calculationMode === 'frequencyFromWavelength' || calculationMode === 'wavelengthFromFrequency') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Result Unit
            </label>
            <select
              value={
                calculationMode === 'distanceFromTime' || calculationMode === 'timeFromDistance'
                  ? calculationMode === 'distanceFromTime'
                    ? distanceUnit
                    : timeUnit
                  : calculationMode === 'frequencyFromWavelength'
                    ? frequencyUnit
                    : wavelengthUnit
              }
              onChange={(e) => {
                if (calculationMode === 'distanceFromTime') {
                  setDistanceUnit(e.target.value);
                } else if (calculationMode === 'timeFromDistance') {
                  setTimeUnit(e.target.value);
                } else if (calculationMode === 'frequencyFromWavelength') {
                  setFrequencyUnit(e.target.value);
                } else {
                  setWavelengthUnit(e.target.value);
                }
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
            >
              {Object.entries(
                calculationMode === 'distanceFromTime'
                  ? distanceUnits
                  : calculationMode === 'timeFromDistance'
                    ? timeUnits
                    : calculationMode === 'frequencyFromWavelength'
                      ? frequencyUnits
                      : wavelengthUnits
              ).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        )}

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
            <h3 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>Result</h3>
            <p className="text-2xl font-bold" style={{ color: primaryColor }}>
              {formatValue(result.value)} {result.unit}
            </p>
            <p className="text-sm mt-1" style={{ color: `${primaryColor}CC` }}>
              {result.label}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <div className="text-sm mt-3 font-mono whitespace-pre-line" style={{ color: `${primaryColor}CC` }}>
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
            <li>• Select the calculation method based on what you want to calculate.</li>
            <li>• Enter the required value in the input field.</li>
            <li>• Ensure all inputs are valid positive numbers.</li>
            <li>• Select appropriate units for accurate calculations.</li>
            <li>• Formulas: d = c × t, t = d / c, f = c / λ, λ = c / f</li>
            <li>• Speed of light: c = 299,792,458 m/s</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

