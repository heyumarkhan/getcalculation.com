'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: m, m/s, Hz)
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

const distanceUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 },
  'mi': { name: 'mi (Miles)', factor: 1609.34 }
};

const timeUnits = {
  's': { name: 's (Seconds)', factor: 1 },
  'ms': { name: 'ms (Milliseconds)', factor: 0.001 },
  'μs': { name: 'μs (Microseconds)', factor: 1e-6 },
  'ns': { name: 'ns (Nanoseconds)', factor: 1e-9 },
  'min': { name: 'min (Minutes)', factor: 60 },
  'h': { name: 'h (Hours)', factor: 3600 }
};

type CalculationMode = 'frequency-wavelength' | 'distance-time';

export default function WaveSpeedCalculator() {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('frequency-wavelength');
  const [velocity, setVelocity] = useState('');
  const [frequency, setFrequency] = useState('');
  const [wavelength, setWavelength] = useState('');
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [frequencyUnit, setFrequencyUnit] = useState('Hz');
  const [wavelengthUnit, setWavelengthUnit] = useState('m');
  const [distanceUnit, setDistanceUnit] = useState('m');
  const [timeUnit, setTimeUnit] = useState('s');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'velocity' | 'frequency' | 'wavelength' | 'distance' | 'time' } | null>(null);
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
    return value.toLocaleString('en-US', { maximumFractionDigits: 6, useGrouping: true });
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

  const convertWavelengthToBase = (value: number, unit: string) => {
    return value * wavelengthUnits[unit as keyof typeof wavelengthUnits].factor;
  };

  const convertDistanceToBase = (value: number, unit: string) => {
    return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertTimeToBase = (value: number, unit: string) => {
    return value * timeUnits[unit as keyof typeof timeUnits].factor;
  };

  const calculate = () => {
    if (calculationMode === 'frequency-wavelength') {
      const v = velocity ? parseFloat(velocity) : NaN;
      const f = frequency ? parseFloat(frequency) : NaN;
      const λ = wavelength ? parseFloat(wavelength) : NaN;

      const filledCount = [velocity, frequency, wavelength].filter(val => val !== '').length;

      if (filledCount !== 2) {
        setResult(null);
        setCalculation('');
        return;
      }

      // Validate that filled values are valid numbers
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
      if (wavelength && (isNaN(λ) || λ <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for wavelength');
        return;
      }

      if (!velocity) {
        // Calculate velocity: v = f × λ
        const fBase = convertFrequencyToBase(f, frequencyUnit);
        const λBase = convertWavelengthToBase(λ, wavelengthUnit);
        const vBase = fBase * λBase;
        const vResult = convertVelocityFromBase(vBase, velocityUnit);
        
        setResult({ value: vResult, unit: velocityUnit, type: 'velocity' });
        setCalculation(`v = f × λ\nv = ${formatValue(f)} ${frequencyUnit} × ${formatValue(λ)} ${wavelengthUnit}\nv = ${formatValue(vResult)} ${velocityUnit}`);
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
        const fResult = fBase / frequencyUnits[frequencyUnit as keyof typeof frequencyUnits].factor;
        
        setResult({ value: fResult, unit: frequencyUnit, type: 'frequency' });
        setCalculation(`f = v / λ\nf = ${formatValue(v)} ${velocityUnit} / ${formatValue(λ)} ${wavelengthUnit}\nf = ${formatValue(fResult)} ${frequencyUnit}`);
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
        const λResult = λBase / wavelengthUnits[wavelengthUnit as keyof typeof wavelengthUnits].factor;
        
        setResult({ value: λResult, unit: wavelengthUnit, type: 'wavelength' });
        setCalculation(`λ = v / f\nλ = ${formatValue(v)} ${velocityUnit} / ${formatValue(f)} ${frequencyUnit}\nλ = ${formatValue(λResult)} ${wavelengthUnit}`);
      } else {
        setResult(null);
        setCalculation('');
      }
    } else {
      // distance-time mode
      const v = velocity ? parseFloat(velocity) : NaN;
      const d = distance ? parseFloat(distance) : NaN;
      const t = time ? parseFloat(time) : NaN;

      const filledCount = [velocity, distance, time].filter(val => val !== '').length;

      if (filledCount !== 2) {
        setResult(null);
        setCalculation('');
        return;
      }

      // Validate that filled values are valid numbers
      if (velocity && (isNaN(v) || v <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for velocity');
        return;
      }
      if (distance && (isNaN(d) || d < 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid non-negative number for distance');
        return;
      }
      if (time && (isNaN(t) || t <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for time');
        return;
      }

      if (!velocity) {
        // Calculate velocity: v = d / t
        const dBase = convertDistanceToBase(d, distanceUnit);
        const tBase = convertTimeToBase(t, timeUnit);
        
        if (tBase === 0) {
          setResult(null);
          setCalculation('Error: Time cannot be zero');
          return;
        }
        
        const vBase = dBase / tBase;
        const vResult = convertVelocityFromBase(vBase, velocityUnit);
        
        setResult({ value: vResult, unit: velocityUnit, type: 'velocity' });
        setCalculation(`v = d / t\nv = ${formatValue(d)} ${distanceUnit} / ${formatValue(t)} ${timeUnit}\nv = ${formatValue(vResult)} ${velocityUnit}`);
      } else if (!distance) {
        // Calculate distance: d = v × t
        const vBase = convertVelocityToBase(v, velocityUnit);
        const tBase = convertTimeToBase(t, timeUnit);
        const dBase = vBase * tBase;
        const dResult = dBase / distanceUnits[distanceUnit as keyof typeof distanceUnits].factor;
        
        setResult({ value: dResult, unit: distanceUnit, type: 'distance' });
        setCalculation(`d = v × t\nd = ${formatValue(v)} ${velocityUnit} × ${formatValue(t)} ${timeUnit}\nd = ${formatValue(dResult)} ${distanceUnit}`);
      } else if (!time) {
        // Calculate time: t = d / v
        const dBase = convertDistanceToBase(d, distanceUnit);
        const vBase = convertVelocityToBase(v, velocityUnit);
        
        if (vBase === 0) {
          setResult(null);
          setCalculation('Error: Velocity cannot be zero');
          return;
        }
        
        const tBase = dBase / vBase;
        const tResult = tBase / timeUnits[timeUnit as keyof typeof timeUnits].factor;
        
        setResult({ value: tResult, unit: timeUnit, type: 'time' });
        setCalculation(`t = d / v\nt = ${formatValue(d)} ${distanceUnit} / ${formatValue(v)} ${velocityUnit}\nt = ${formatValue(tResult)} ${timeUnit}`);
      } else {
        setResult(null);
        setCalculation('');
      }
    }
  };

  const clearAll = () => {
    setVelocity('');
    setFrequency('');
    setWavelength('');
    setDistance('');
    setTime('');
    setVelocityUnit('m/s');
    setFrequencyUnit('Hz');
    setWavelengthUnit('m');
    setDistanceUnit('m');
    setTimeUnit('s');
    setResult(null);
    setCalculation('');
  };

  const handleModeChange = (mode: CalculationMode) => {
    setCalculationMode(mode);
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Wave Speed Calculator</h2>
        <p className="text-gray-600">Calculate wave speed using v = f × λ or v = d / t</p>
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
            <option value="frequency-wavelength">Frequency & Wavelength (v = f × λ)</option>
            <option value="distance-time">Distance & Time (v = d / t)</option>
          </select>
        </div>

        {calculationMode === 'frequency-wavelength' ? (
          <>
            {/* Velocity Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Wave Speed (v)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter wave speed (leave empty to calculate)"
                    value={velocity}
                    onChange={(e) => setVelocity(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-48">
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
          </>
        ) : (
          <>
            {/* Velocity Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Wave Speed (v)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter wave speed (leave empty to calculate)"
                    value={velocity}
                    onChange={(e) => setVelocity(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-48">
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

            {/* Distance Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Distance (d)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter distance (leave empty to calculate)"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
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

            {/* Time Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Time (t)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter time (leave empty to calculate)"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={timeUnit}
                    onChange={(e) => setTimeUnit(e.target.value)}
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
              <div className="mt-3 p-3 bg-white rounded border border-[#820ECC]/20">
                <p className="text-sm text-gray-700 font-mono whitespace-pre-line">
                  {calculation}
                </p>
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
            {calculationMode === 'frequency-wavelength' ? (
              <>
                <li>• Enter any two values to calculate the third (v, f, or λ)</li>
                <li>• Leave the value you want to calculate empty</li>
                <li>• Formula: v = f × λ (Wave Speed = Frequency × Wavelength)</li>
                <li>• Select your preferred units for each measurement</li>
                <li>• The calculator automatically converts between different units</li>
              </>
            ) : (
              <>
                <li>• Enter any two values to calculate the third (v, d, or t)</li>
                <li>• Leave the value you want to calculate empty</li>
                <li>• Formula: v = d / t (Wave Speed = Distance / Time)</li>
                <li>• Select your preferred units for each measurement</li>
                <li>• The calculator automatically converts between different units</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </Card>
  );
}

