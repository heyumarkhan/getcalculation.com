'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Gas constant for air (J/(kg·K))
const R_AIR = 287;
// Adiabatic index (ratio of specific heats) for air
const GAMMA_AIR = 1.4;

// Unit conversion factors
const velocityUnits = {
  'm/s': { name: 'm/s (Meters per Second)', factor: 1 },
  'km/h': { name: 'km/h (Kilometers per Hour)', factor: 0.277778 },
  'mph': { name: 'mph (Miles per Hour)', factor: 0.44704 },
  'ft/s': { name: 'ft/s (Feet per Second)', factor: 0.3048 },
  'knots': { name: 'knots', factor: 0.514444 }
};

const wavelengthUnits = {
  'm': { name: 'Meters (m)', factor: 1 },
  'cm': { name: 'Centimeters (cm)', factor: 0.01 },
  'mm': { name: 'Millimeters (mm)', factor: 0.001 },
  'ft': { name: 'Feet (ft)', factor: 0.3048 },
  'in': { name: 'Inches (in)', factor: 0.0254 },
  'km': { name: 'Kilometers (km)', factor: 1000 }
};

const frequencyUnits = {
  'Hz': { name: 'Hertz (Hz)', factor: 1 },
  'kHz': { name: 'Kilohertz (kHz)', factor: 1000 },
  'MHz': { name: 'Megahertz (MHz)', factor: 1e6 },
  'GHz': { name: 'Gigahertz (GHz)', factor: 1e9 }
};

const temperatureUnits = {
  'K': { name: 'Kelvin (K)', factor: 1 },
  'C': { name: 'Celsius (°C)', factor: 1, offset: 273.15, toKelvin: (t: number) => t + 273.15 },
  'F': { name: 'Fahrenheit (°F)', factor: 1, offset: 0, toKelvin: (t: number) => (t - 32) * 5/9 + 273.15 }
};

interface SoundWavelengthCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function SoundWavelengthCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: SoundWavelengthCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'wavelength' | 'velocity' | 'frequency'>('wavelength');
  const [wavelength, setWavelength] = useState('');
  const [velocity, setVelocity] = useState('');
  const [frequency, setFrequency] = useState('');
  const [temperature, setTemperature] = useState('');
  const [useTemperature, setUseTemperature] = useState(false);
  const [wavelengthUnit, setWavelengthUnit] = useState('m');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [frequencyUnit, setFrequencyUnit] = useState('Hz');
  const [temperatureUnit, setTemperatureUnit] = useState('C');
  const [result, setResult] = useState<{ value: number; unit: string; variable: string } | null>(null);
  const [calculation, setCalculation] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    if (Math.abs(value) >= 1e12) {
      return value.toExponential(4);
    }
    return value.toFixed(4);
  };

  const convertToBaseUnits = (value: number, unit: string, type: 'velocity' | 'wavelength' | 'frequency' | 'temperature') => {
    if (type === 'velocity') {
      return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
    } else if (type === 'wavelength') {
      return value * wavelengthUnits[unit as keyof typeof wavelengthUnits].factor;
    } else if (type === 'frequency') {
      return value * frequencyUnits[unit as keyof typeof frequencyUnits].factor;
    } else {
      const unitData = temperatureUnits[unit as keyof typeof temperatureUnits];
      if ('toKelvin' in unitData) {
        return unitData.toKelvin(value);
      }
      return value * unitData.factor;
    }
  };

  const convertFromBaseUnits = (value: number, unit: string, type: 'velocity' | 'wavelength' | 'frequency') => {
    if (type === 'velocity') {
      return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
    } else if (type === 'wavelength') {
      return value / wavelengthUnits[unit as keyof typeof wavelengthUnits].factor;
    } else {
      return value / frequencyUnits[unit as keyof typeof frequencyUnits].factor;
    }
  };

  const calculateSpeedOfSoundFromTemperature = (tempInK: number): number => {
    // c = √(γ × R × T)
    return Math.sqrt(GAMMA_AIR * R_AIR * tempInK);
  };

  const calculateWavelength = () => {
    const f = parseFloat(frequency);
    let v: number;

    if (useTemperature) {
      const t = parseFloat(temperature);
      if (isNaN(t)) {
        setResult(null);
        setCalculation('Please enter a valid temperature value.');
        return;
      }
      const tempInK = convertToBaseUnits(t, temperatureUnit, 'temperature');
      if (tempInK <= 0) {
        setResult(null);
        setCalculation('Temperature must be greater than absolute zero.');
        return;
      }
      v = calculateSpeedOfSoundFromTemperature(tempInK);
      setVelocity(v.toString());
    } else {
      v = parseFloat(velocity);
      if (isNaN(v) || v <= 0) {
        setResult(null);
        setCalculation('Please enter a valid positive velocity value.');
        return;
      }
    }

    if (isNaN(f) || f <= 0) {
      setResult(null);
      setCalculation('Please enter a valid positive frequency value.');
      return;
    }

    // Convert to base units (m/s, Hz)
    const frequencyInHz = convertToBaseUnits(f, frequencyUnit, 'frequency');
    const velocityInMps = useTemperature ? v : convertToBaseUnits(v, velocityUnit, 'velocity');

    // Calculate wavelength: λ = v/f
    const wavelengthInM = velocityInMps / frequencyInHz;
    const wavelengthInUnit = convertFromBaseUnits(wavelengthInM, wavelengthUnit, 'wavelength');

    setResult({
      value: wavelengthInUnit,
      unit: wavelengthUnit,
      variable: 'Wavelength'
    });

    // Build calculation string
    let calcStr = `λ = v / f\n`;
    if (useTemperature) {
      const tempInK = convertToBaseUnits(parseFloat(temperature), temperatureUnit, 'temperature');
      calcStr += `v = √(γ × R × T) = √(${GAMMA_AIR} × ${R_AIR} J/(kg·K) × ${formatValue(tempInK)} K)\n`;
      calcStr += `v = ${formatValue(velocityInMps)} m/s\n`;
    } else {
      calcStr += `v = ${formatValue(velocityInMps)} m/s\n`;
    }
    calcStr += `λ = ${formatValue(velocityInMps)} m/s / ${formatValue(frequencyInHz)} Hz\n`;
    calcStr += `λ = ${formatValue(wavelengthInM)} m = ${formatValue(wavelengthInUnit)} ${wavelengthUnit}`;

    setCalculation(calcStr);
  };

  const calculateVelocity = () => {
    const lambda = parseFloat(wavelength);
    const f = parseFloat(frequency);

    if (isNaN(lambda) || isNaN(f) || lambda <= 0 || f <= 0) {
      setResult(null);
      setCalculation('Please enter valid positive numerical values for wavelength and frequency.');
      return;
    }

    // Convert to base units (m, Hz)
    const wavelengthInM = convertToBaseUnits(lambda, wavelengthUnit, 'wavelength');
    const frequencyInHz = convertToBaseUnits(f, frequencyUnit, 'frequency');

    // Calculate velocity: v = λ × f
    const velocityInMps = wavelengthInM * frequencyInHz;
    const velocityInUnit = convertFromBaseUnits(velocityInMps, velocityUnit, 'velocity');

    setResult({
      value: velocityInUnit,
      unit: velocityUnit,
      variable: 'Velocity'
    });

    // Build calculation string
    let calcStr = `v = λ × f\n`;
    calcStr += `v = ${formatValue(wavelengthInM)} m × ${formatValue(frequencyInHz)} Hz\n`;
    calcStr += `v = ${formatValue(velocityInMps)} m/s = ${formatValue(velocityInUnit)} ${velocityUnit}`;

    setCalculation(calcStr);
  };

  const calculateFrequency = () => {
    const lambda = parseFloat(wavelength);
    let v: number;

    if (useTemperature) {
      const t = parseFloat(temperature);
      if (isNaN(t)) {
        setResult(null);
        setCalculation('Please enter a valid temperature value.');
        return;
      }
      const tempInK = convertToBaseUnits(t, temperatureUnit, 'temperature');
      if (tempInK <= 0) {
        setResult(null);
        setCalculation('Temperature must be greater than absolute zero.');
        return;
      }
      v = calculateSpeedOfSoundFromTemperature(tempInK);
      setVelocity(v.toString());
    } else {
      v = parseFloat(velocity);
      if (isNaN(v) || v <= 0) {
        setResult(null);
        setCalculation('Please enter a valid positive velocity value.');
        return;
      }
    }

    if (isNaN(lambda) || lambda <= 0) {
      setResult(null);
      setCalculation('Please enter a valid positive wavelength value.');
      return;
    }

    // Convert to base units (m, m/s)
    const wavelengthInM = convertToBaseUnits(lambda, wavelengthUnit, 'wavelength');
    const velocityInMps = useTemperature ? v : convertToBaseUnits(v, velocityUnit, 'velocity');

    // Calculate frequency: f = v/λ
    const frequencyInHz = velocityInMps / wavelengthInM;
    const frequencyInUnit = convertFromBaseUnits(frequencyInHz, frequencyUnit, 'frequency');

    setResult({
      value: frequencyInUnit,
      unit: frequencyUnit,
      variable: 'Frequency'
    });

    // Build calculation string
    let calcStr = `f = v / λ\n`;
    if (useTemperature) {
      const tempInK = convertToBaseUnits(parseFloat(temperature), temperatureUnit, 'temperature');
      calcStr += `v = √(γ × R × T) = √(${GAMMA_AIR} × ${R_AIR} J/(kg·K) × ${formatValue(tempInK)} K)\n`;
      calcStr += `v = ${formatValue(velocityInMps)} m/s\n`;
    } else {
      calcStr += `v = ${formatValue(velocityInMps)} m/s\n`;
    }
    calcStr += `f = ${formatValue(velocityInMps)} m/s / ${formatValue(wavelengthInM)} m\n`;
    calcStr += `f = ${formatValue(frequencyInHz)} Hz = ${formatValue(frequencyInUnit)} ${frequencyUnit}`;

    setCalculation(calcStr);
  };

  const calculate = () => {
    switch (calculationType) {
      case 'wavelength':
        calculateWavelength();
        break;
      case 'velocity':
        calculateVelocity();
        break;
      case 'frequency':
        calculateFrequency();
        break;
    }
  };

  const clearAll = () => {
    setCalculationType('wavelength');
    setWavelength('');
    setVelocity('');
    setFrequency('');
    setTemperature('');
    setUseTemperature(false);
    setWavelengthUnit('m');
    setVelocityUnit('m/s');
    setFrequencyUnit('Hz');
    setTemperatureUnit('C');
    setResult(null);
    setCalculation('');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-color-button {
            background-color: ${primaryColor};
          }
          .custom-color-button:hover {
            background-color: ${primaryColor}dd !important;
          }
          .custom-color-button:focus {
            box-shadow: 0 0 0 3px ${primaryColor}40 !important;
          }
          .custom-outline-button {
            color: ${primaryColor};
            border-color: ${primaryColor};
          }
          .custom-outline-button:hover {
            background-color: ${primaryColor}10 !important;
          }
          .custom-outline-button:focus {
            box-shadow: 0 0 0 3px ${primaryColor}40 !important;
          }
        `
      }} />
      <Card className="p-6 max-w-xl mx-auto">
        {showTitle && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sound Wavelength Calculator</h2>
            <p className="text-gray-600">Calculate wavelength, velocity, or frequency using λ = v/f</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="calculationType" className="block text-sm font-medium text-gray-700 mb-3">
              Calculate
            </label>
            <select
              id="calculationType"
              value={calculationType}
              onChange={(e) => {
                setCalculationType(e.target.value as 'wavelength' | 'velocity' | 'frequency');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="wavelength">Wavelength (λ)</option>
              <option value="velocity">Velocity (v)</option>
              <option value="frequency">Frequency (f)</option>
            </select>
          </div>

          {calculationType === 'wavelength' && (
            <>
              <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-3">
                  Frequency (f)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="frequency"
                      type="number"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="useTempForWavelength"
                  checked={useTemperature}
                  onChange={(e) => setUseTemperature(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="useTempForWavelength" className="text-sm font-medium text-gray-700">
                  Calculate speed of sound from temperature
                </label>
              </div>

              {useTemperature ? (
                <div>
                  <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-3">
                    Temperature
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        id="temperature"
                        type="number"
                        placeholder="Enter temperature"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="w-40">
                      <select
                        value={temperatureUnit}
                        onChange={(e) => setTemperatureUnit(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {Object.entries(temperatureUnits).map(([key, unit]) => (
                          <option key={key} value={key}>
                            {unit.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor="velocity" className="block text-sm font-medium text-gray-700 mb-3">
                    Velocity (v)
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        id="velocity"
                        type="number"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

              <div>
                <label htmlFor="wavelengthUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Result Wavelength Unit
                </label>
                <select
                  id="wavelengthUnit"
                  value={wavelengthUnit}
                  onChange={(e) => setWavelengthUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(wavelengthUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {calculationType === 'velocity' && (
            <>
              <div>
                <label htmlFor="wavelength" className="block text-sm font-medium text-gray-700 mb-3">
                  Wavelength (λ)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="wavelength"
                      type="number"
                      placeholder="Enter wavelength"
                      value={wavelength}
                      onChange={(e) => setWavelength(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={wavelengthUnit}
                      onChange={(e) => setWavelengthUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-3">
                  Frequency (f)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="frequency"
                      type="number"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

              <div>
                <label htmlFor="velocityUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Result Velocity Unit
                </label>
                <select
                  id="velocityUnit"
                  value={velocityUnit}
                  onChange={(e) => setVelocityUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(velocityUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {calculationType === 'frequency' && (
            <>
              <div>
                <label htmlFor="wavelength" className="block text-sm font-medium text-gray-700 mb-3">
                  Wavelength (λ)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="wavelength"
                      type="number"
                      placeholder="Enter wavelength"
                      value={wavelength}
                      onChange={(e) => setWavelength(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={wavelengthUnit}
                      onChange={(e) => setWavelengthUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="useTempForFrequency"
                  checked={useTemperature}
                  onChange={(e) => setUseTemperature(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="useTempForFrequency" className="text-sm font-medium text-gray-700">
                  Calculate speed of sound from temperature
                </label>
              </div>

              {useTemperature ? (
                <div>
                  <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-3">
                    Temperature
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        id="temperature"
                        type="number"
                        placeholder="Enter temperature"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="w-40">
                      <select
                        value={temperatureUnit}
                        onChange={(e) => setTemperatureUnit(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {Object.entries(temperatureUnits).map(([key, unit]) => (
                          <option key={key} value={key}>
                            {unit.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor="velocity" className="block text-sm font-medium text-gray-700 mb-3">
                    Velocity (v)
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        id="velocity"
                        type="number"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

              <div>
                <label htmlFor="frequencyUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Result Frequency Unit
                </label>
                <select
                  id="frequencyUnit"
                  value={frequencyUnit}
                  onChange={(e) => setFrequencyUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(frequencyUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="flex gap-3 pt-2">
            <Button onClick={calculate} className="flex-1 custom-color-button">
              Calculate
            </Button>
            <Button onClick={clearAll} variant="outline" className="flex-1 custom-outline-button">
              Clear
            </Button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-fadeIn">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Result</h3>
              <p className="text-2xl font-bold text-blue-700">
                {result.variable}: {formatValue(result.value)} {result.unit}
              </p>
              {calculation && (
                <div className="text-sm text-blue-600 mt-2 font-mono whitespace-pre-line">
                  {calculation}
                </div>
              )}
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Select what you want to calculate: Wavelength, Velocity, or Frequency</li>
              <li>• Enter the required values based on your selection</li>
              <li>• Optionally use temperature to calculate speed of sound in air (c = √(γ × R × T))</li>
              <li>• Select appropriate units for each parameter</li>
              <li>• Click &quot;Calculate&quot; to get the result with step-by-step calculations</li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}

