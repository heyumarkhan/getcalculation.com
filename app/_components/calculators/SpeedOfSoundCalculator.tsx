'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const speedUnits = {
  'm/s': { name: 'm/s', factor: 1 },
  'km/h': { name: 'km/h', factor: 3.6 },
  'mph': { name: 'mph', factor: 2.237 },
  'ft/s': { name: 'ft/s', factor: 3.281 },
  'knots': { name: 'knots', factor: 1.944 }
};

const temperatureUnits = {
  'celsius': { name: '°C', factor: (c: number) => c },
  'fahrenheit': { name: '°F', factor: (f: number) => (f - 32) * 5/9 }
};

interface CalculationResult {
  speedOfSound: number | null;
  speedUnit: string;
  temperature: number | null;
  temperatureUnit: string;
  machNumber: number | null;
  velocity: number | null;
  frequency: number | null;
  wavelength: number | null;
  medium: string;
  steps: string[];
}

const mediums: Record<string, { name: string; speedAt15C: number; description: string }> = {
  'air-15c': { name: 'Air (15°C / 59°F)', speedAt15C: 340, description: 'Standard temperature' },
  'air-0c': { name: 'Air (0°C / 32°F)', speedAt15C: 331, description: 'Freezing point' },
  'air-20c': { name: 'Air (20°C / 68°F)', speedAt15C: 343, description: 'Room temperature' },
  'water': { name: 'Water (20°C)', speedAt15C: 1482, description: 'Fresh water' },
  'seawater': { name: 'Seawater (20°C)', speedAt15C: 1521, description: 'Salt water' },
  'steel': { name: 'Steel', speedAt15C: 5000, description: 'Carbon steel' },
  'glass': { name: 'Glass', speedAt15C: 5960, description: 'Typical glass' },
  'aluminum': { name: 'Aluminum', speedAt15C: 6420, description: 'Aluminum alloy' }
};

export default function SpeedOfSoundCalculator({
  primaryColor = '#820ECC'
}: {
  primaryColor?: string;
}) {
  const [selectedMedium, setSelectedMedium] = useState('air-15c');
  const [temperature, setTemperature] = useState('15');
  const [temperatureUnit, setTemperatureUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [speedOfSound, setSpeedOfSound] = useState('');
  const [machNumber, setMachNumber] = useState('');
  const [velocity, setVelocity] = useState('');
  const [frequency, setFrequency] = useState('');
  const [wavelength, setWavelength] = useState('');
  const [speedUnit, setSpeedUnit] = useState('m/s');

  const [result, setResult] = useState<CalculationResult | null>(null);

  const formatValue = (value: number): string => {
    if (!isFinite(value)) return 'Invalid';
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    return value.toFixed(6);
  };

  const calculateSpeedOfSoundInAir = (tempC: number): number => {
    // Using the formula: v = 331.3 + 0.606 × T (T in Celsius)
    return 331.3 + 0.606 * tempC;
  };

  const calculate = () => {
    const tempC = temperature ? parseFloat(temperature) : null;
    const speedVal = speedOfSound ? parseFloat(speedOfSound) : null;
    const machVal = machNumber ? parseFloat(machNumber) : null;
    const velocityVal = velocity ? parseFloat(velocity) : null;
    const freqVal = frequency ? parseFloat(frequency) : null;
    const waveVal = wavelength ? parseFloat(wavelength) : null;

    const steps: string[] = [];
    let filledCount = 0;

    if (tempC !== null && !isNaN(tempC)) filledCount++;
    if (speedVal !== null && !isNaN(speedVal) && speedVal > 0) filledCount++;
    if (machVal !== null && !isNaN(machVal) && machVal > 0) filledCount++;
    if (velocityVal !== null && !isNaN(velocityVal) && velocityVal > 0) filledCount++;
    if (freqVal !== null && !isNaN(freqVal) && freqVal > 0) filledCount++;
    if (waveVal !== null && !isNaN(waveVal) && waveVal > 0) filledCount++;

    if (filledCount < 1) {
      alert('Please enter at least one valid value');
      return;
    }

    try {
      let resultSpeed: number | null = null;
      let resultTemp: number | null = null;
      let resultMach: number | null = null;
      let resultVelocity: number | null = null;
      let resultFreq: number | null = null;
      let resultWave: number | null = null;

      // For non-air mediums, use fixed speed
      if (selectedMedium !== 'air-15c' && selectedMedium !== 'air-0c' && selectedMedium !== 'air-20c') {
        resultSpeed = mediums[selectedMedium].speedAt15C;
        steps.push(`Medium: ${mediums[selectedMedium].name}`);
        steps.push(`Speed of Sound = ${formatValue(resultSpeed)} m/s (standard)`);
      } else if (tempC !== null && !isNaN(tempC)) {
        // Calculate speed for air at given temperature
        resultTemp = tempC;
        resultSpeed = calculateSpeedOfSoundInAir(tempC);
        steps.push(`Temperature = ${formatValue(resultTemp)}°C`);
        steps.push(`Speed of Sound in Air: v = 331.3 + 0.606 × T`);
        steps.push(`v = 331.3 + 0.606 × ${formatValue(resultTemp)}`);
        steps.push(`v = ${formatValue(resultSpeed)} m/s`);
      } else {
        // Use medium's default speed
        resultSpeed = mediums[selectedMedium].speedAt15C;
        steps.push(`Medium: ${mediums[selectedMedium].name}`);
        steps.push(`Speed of Sound = ${formatValue(resultSpeed)} m/s`);
      }

      // Convert speed to selected unit
      const speedBase = resultSpeed; // in m/s
      if (speedBase) {
        const speedFactor = speedUnits[speedUnit as keyof typeof speedUnits].factor;
        const speedInUnit = speedBase * speedFactor;

        // Calculate Mach number if we have speed
        if (machVal !== null && !isNaN(machVal) && machVal > 0) {
          resultMach = machVal;
          resultVelocity = resultMach * speedBase;
          steps.push(`Mach Number = ${formatValue(resultMach)}`);
          steps.push(`Velocity = Mach × Speed of Sound`);
          steps.push(`v = ${formatValue(resultMach)} × ${formatValue(speedBase)}`);
          steps.push(`v = ${formatValue(resultVelocity)} m/s`);
        } else if (velocityVal !== null && !isNaN(velocityVal) && velocityVal > 0) {
          resultVelocity = velocityVal;
          resultMach = resultVelocity / speedBase;
          steps.push(`Velocity = ${formatValue(resultVelocity)} m/s`);
          steps.push(`Mach Number = Velocity / Speed of Sound`);
          steps.push(`M = ${formatValue(resultVelocity)} / ${formatValue(speedBase)}`);
          steps.push(`M = ${formatValue(resultMach)}`);
        }

        // Calculate wavelength and frequency
        if (freqVal !== null && !isNaN(freqVal) && freqVal > 0) {
          resultFreq = freqVal;
          resultWave = speedBase / freqVal;
          steps.push(`Frequency = ${formatValue(resultFreq)} Hz`);
          steps.push(`Wavelength = Speed / Frequency`);
          steps.push(`λ = ${formatValue(speedBase)} / ${formatValue(resultFreq)}`);
          steps.push(`λ = ${formatValue(resultWave)} m`);
        } else if (waveVal !== null && !isNaN(waveVal) && waveVal > 0) {
          resultWave = waveVal;
          resultFreq = speedBase / waveVal;
          steps.push(`Wavelength = ${formatValue(resultWave)} m`);
          steps.push(`Frequency = Speed / Wavelength`);
          steps.push(`f = ${formatValue(speedBase)} / ${formatValue(resultWave)}`);
          steps.push(`f = ${formatValue(resultFreq)} Hz`);
        }
      }

      setResult({
        speedOfSound: resultSpeed,
        speedUnit: 'm/s',
        temperature: resultTemp,
        temperatureUnit: 'celsius',
        machNumber: resultMach,
        velocity: resultVelocity,
        frequency: resultFreq,
        wavelength: resultWave,
        medium: selectedMedium,
        steps
      });
    } catch (error) {
      alert('Invalid input. Please check your values.');
      setResult(null);
    }
  };

  const clearAll = () => {
    setTemperature('15');
    setSpeedOfSound('');
    setMachNumber('');
    setVelocity('');
    setFrequency('');
    setWavelength('');
    setResult(null);
  };

  const speedFactor = speedUnits[speedUnit as keyof typeof speedUnits].factor;
  const resultSpeedInUnit = result?.speedOfSound ? result.speedOfSound * speedFactor : null;
  const resultVelocityInUnit = result?.velocity ? result.velocity * speedFactor : null;

  return (
    <div className="w-full space-y-6">
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-btn:hover {
            background-color: ${primaryColor}dd !important;
          }
          .custom-btn:focus {
            box-shadow: 0 0 0 3px ${primaryColor}40 !important;
          }
        `
      }} />

      <Card>
        <h2 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
          Speed of Sound Calculator
        </h2>

        <div className="space-y-4">
          {/* Medium Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Medium</label>
            <select
              value={selectedMedium}
              onChange={(e) => setSelectedMedium(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 bg-white"
            >
              {Object.entries(mediums).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.name} - {val.speedAt15C} m/s
                </option>
              ))}
            </select>
          </div>

          {/* Temperature Input (for air only) */}
          {(selectedMedium === 'air-15c' || selectedMedium === 'air-0c' || selectedMedium === 'air-20c') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Temperature"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                placeholder="Enter temperature"
                type="number"
                inputMode="decimal"
              />
              <select
                value={temperatureUnit}
                onChange={(e) => setTemperatureUnit(e.target.value as 'celsius' | 'fahrenheit')}
                className="border border-gray-300 rounded p-2 bg-white"
              >
                <option value="celsius">°C</option>
                <option value="fahrenheit">°F</option>
              </select>
            </div>
          )}

          {/* Speed of Sound */}
          <Input
            label="Speed of Sound (m/s)"
            value={speedOfSound}
            onChange={(e) => setSpeedOfSound(e.target.value)}
            placeholder="Speed of sound value"
            type="number"
            inputMode="decimal"
          />

          {/* Mach Number */}
          <Input
            label="Mach Number (M)"
            value={machNumber}
            onChange={(e) => setMachNumber(e.target.value)}
            placeholder="Enter Mach number"
            type="number"
            inputMode="decimal"
          />

          {/* Velocity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Velocity"
              value={velocity}
              onChange={(e) => setVelocity(e.target.value)}
              placeholder="Enter velocity (m/s)"
              type="number"
              inputMode="decimal"
            />
            <select
              value={speedUnit}
              onChange={(e) => setSpeedUnit(e.target.value)}
              className="border border-gray-300 rounded p-2 bg-white"
            >
              {Object.entries(speedUnits).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.name}
                </option>
              ))}
            </select>
          </div>

          {/* Frequency */}
          <Input
            label="Frequency (Hz)"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            placeholder="Enter frequency"
            type="number"
            inputMode="decimal"
          />

          {/* Wavelength */}
          <Input
            label="Wavelength (m)"
            value={wavelength}
            onChange={(e) => setWavelength(e.target.value)}
            placeholder="Enter wavelength"
            type="number"
            inputMode="decimal"
          />

          <div className="flex gap-2 pt-2">
            <Button
              onClick={calculate}
              className="custom-btn flex-1"
              style={{ backgroundColor: primaryColor }}
            >
              Calculate
            </Button>
            <Button onClick={clearAll} variant="secondary" className="flex-1">
              Clear
            </Button>
          </div>
        </div>
      </Card>

      {result && (
        <div className="space-y-4">
          {/* Results */}
          <Card>
            <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
              Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.speedOfSound !== null && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, borderWidth: '1px' }}>
                  <p className="text-sm text-gray-600 mb-1">Speed of Sound</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                    {resultSpeedInUnit !== null ? formatValue(resultSpeedInUnit) : 'N/A'} {speedUnit}
                  </p>
                </div>
              )}
              {result.machNumber !== null && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, borderWidth: '1px' }}>
                  <p className="text-sm text-gray-600 mb-1">Mach Number</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                    M {formatValue(result.machNumber)}
                  </p>
                </div>
              )}
              {result.velocity !== null && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, borderWidth: '1px' }}>
                  <p className="text-sm text-gray-600 mb-1">Velocity</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                    {resultVelocityInUnit !== null ? formatValue(resultVelocityInUnit) : 'N/A'} {speedUnit}
                  </p>
                </div>
              )}
              {result.frequency !== null && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, borderWidth: '1px' }}>
                  <p className="text-sm text-gray-600 mb-1">Frequency</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                    {formatValue(result.frequency)} Hz
                  </p>
                </div>
              )}
              {result.wavelength !== null && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, borderWidth: '1px' }}>
                  <p className="text-sm text-gray-600 mb-1">Wavelength</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                    {formatValue(result.wavelength)} m
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Calculation Steps */}
          <Card>
            <h3 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>
              Calculation Steps
            </h3>
            <ol className="space-y-2 list-decimal list-inside">
              {result.steps.map((step, idx) => (
                <li key={idx} className="text-gray-700">
                  {step}
                </li>
              ))}
            </ol>
          </Card>
        </div>
      )}
    </div>
  );
}
