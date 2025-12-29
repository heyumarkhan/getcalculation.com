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

const speedOfSoundUnits = {
  'm/s': { name: 'm/s (Meters per Second)', factor: 1 },
  'km/h': { name: 'km/h (Kilometers per Hour)', factor: 0.277778 },
  'mph': { name: 'mph (Miles per Hour)', factor: 0.44704 },
  'ft/s': { name: 'ft/s (Feet per Second)', factor: 0.3048 },
  'knots': { name: 'knots', factor: 0.514444 }
};

const temperatureUnits = {
  'K': { name: 'Kelvin (K)', factor: 1 },
  'C': { name: 'Celsius (°C)', factor: 1, offset: 273.15, toKelvin: (t: number) => t + 273.15 },
  'F': { name: 'Fahrenheit (°F)', factor: 1, offset: 0, toKelvin: (t: number) => (t - 32) * 5/9 + 273.15 }
};

interface MachNumberCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function MachNumberCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: MachNumberCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'mach' | 'velocity' | 'speedOfSound'>('mach');
  const [machNumber, setMachNumber] = useState('');
  const [velocity, setVelocity] = useState('');
  const [speedOfSound, setSpeedOfSound] = useState('');
  const [temperature, setTemperature] = useState('');
  const [useTemperature, setUseTemperature] = useState(false);
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [speedOfSoundUnit, setSpeedOfSoundUnit] = useState('m/s');
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

  const convertToBaseUnits = (value: number, unit: string, type: 'velocity' | 'speedOfSound' | 'temperature') => {
    if (type === 'velocity' || type === 'speedOfSound') {
      return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
    } else {
      const unitData = temperatureUnits[unit as keyof typeof temperatureUnits];
      if ('toKelvin' in unitData) {
        return unitData.toKelvin(value);
      }
      return value * unitData.factor;
    }
  };

  const convertFromBaseUnits = (value: number, unit: string, type: 'velocity' | 'speedOfSound') => {
    return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const calculateSpeedOfSoundFromTemperature = (tempInK: number): number => {
    // c = √(γ × R × T)
    return Math.sqrt(GAMMA_AIR * R_AIR * tempInK);
  };

  const calculateMachNumber = () => {
    const v = parseFloat(velocity);
    let c: number;

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
      c = calculateSpeedOfSoundFromTemperature(tempInK);
      setSpeedOfSound(c.toString());
    } else {
      c = parseFloat(speedOfSound);
      if (isNaN(c) || c <= 0) {
        setResult(null);
        setCalculation('Please enter a valid positive speed of sound value.');
        return;
      }
    }

    if (isNaN(v) || v <= 0) {
      setResult(null);
      setCalculation('Please enter a valid positive velocity value.');
      return;
    }

    // Convert to base units (m/s)
    const velocityInMps = convertToBaseUnits(v, velocityUnit, 'velocity');
    const speedOfSoundInMps = useTemperature ? c : convertToBaseUnits(c, speedOfSoundUnit, 'speedOfSound');

    // Calculate Mach number: M = v/c
    const mach = velocityInMps / speedOfSoundInMps;

    setResult({
      value: mach,
      unit: '',
      variable: 'Mach Number'
    });

    // Build calculation string
    let calcStr = `M = v / c\n`;
    if (useTemperature) {
      const tempInK = convertToBaseUnits(parseFloat(temperature), temperatureUnit, 'temperature');
      calcStr += `c = √(γ × R × T) = √(${GAMMA_AIR} × ${R_AIR} J/(kg·K) × ${formatValue(tempInK)} K)\n`;
      calcStr += `c = ${formatValue(speedOfSoundInMps)} m/s\n`;
    } else {
      calcStr += `c = ${formatValue(speedOfSoundInMps)} m/s\n`;
    }
    calcStr += `M = ${formatValue(velocityInMps)} m/s / ${formatValue(speedOfSoundInMps)} m/s\n`;
    calcStr += `M = ${formatValue(mach)}`;

    setCalculation(calcStr);
  };

  const calculateVelocity = () => {
    const m = parseFloat(machNumber);
    let c: number;

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
      c = calculateSpeedOfSoundFromTemperature(tempInK);
      setSpeedOfSound(c.toString());
    } else {
      c = parseFloat(speedOfSound);
      if (isNaN(c) || c <= 0) {
        setResult(null);
        setCalculation('Please enter a valid positive speed of sound value.');
        return;
      }
    }

    if (isNaN(m) || m <= 0) {
      setResult(null);
      setCalculation('Please enter a valid positive Mach number.');
      return;
    }

    // Convert to base units (m/s)
    const speedOfSoundInMps = useTemperature ? c : convertToBaseUnits(c, speedOfSoundUnit, 'speedOfSound');

    // Calculate velocity: v = M × c
    const velocityInMps = m * speedOfSoundInMps;
    const velocityInUnit = convertFromBaseUnits(velocityInMps, velocityUnit, 'velocity');

    setResult({
      value: velocityInUnit,
      unit: velocityUnit,
      variable: 'Velocity'
    });

    // Build calculation string
    let calcStr = `v = M × c\n`;
    if (useTemperature) {
      const tempInK = convertToBaseUnits(parseFloat(temperature), temperatureUnit, 'temperature');
      calcStr += `c = √(γ × R × T) = √(${GAMMA_AIR} × ${R_AIR} J/(kg·K) × ${formatValue(tempInK)} K)\n`;
      calcStr += `c = ${formatValue(speedOfSoundInMps)} m/s\n`;
    } else {
      calcStr += `c = ${formatValue(speedOfSoundInMps)} m/s\n`;
    }
    calcStr += `v = ${formatValue(m)} × ${formatValue(speedOfSoundInMps)} m/s\n`;
    calcStr += `v = ${formatValue(velocityInMps)} m/s = ${formatValue(velocityInUnit)} ${velocityUnit}`;

    setCalculation(calcStr);
  };

  const calculateSpeedOfSound = () => {
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

    // Calculate speed of sound: c = √(γ × R × T)
    const speedOfSoundInMps = calculateSpeedOfSoundFromTemperature(tempInK);
    const speedOfSoundInUnit = convertFromBaseUnits(speedOfSoundInMps, speedOfSoundUnit, 'speedOfSound');

    setResult({
      value: speedOfSoundInUnit,
      unit: speedOfSoundUnit,
      variable: 'Speed of Sound'
    });

    // Build calculation string
    let calcStr = `c = √(γ × R × T)\n`;
    calcStr += `c = √(${GAMMA_AIR} × ${R_AIR} J/(kg·K) × ${formatValue(tempInK)} K)\n`;
    calcStr += `c = √(${formatValue(GAMMA_AIR * R_AIR * tempInK)})\n`;
    calcStr += `c = ${formatValue(speedOfSoundInMps)} m/s = ${formatValue(speedOfSoundInUnit)} ${speedOfSoundUnit}`;

    setCalculation(calcStr);
  };

  const calculate = () => {
    switch (calculationType) {
      case 'mach':
        calculateMachNumber();
        break;
      case 'velocity':
        calculateVelocity();
        break;
      case 'speedOfSound':
        calculateSpeedOfSound();
        break;
    }
  };

  const clearAll = () => {
    setCalculationType('mach');
    setMachNumber('');
    setVelocity('');
    setSpeedOfSound('');
    setTemperature('');
    setUseTemperature(false);
    setVelocityUnit('m/s');
    setSpeedOfSoundUnit('m/s');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Mach Number Calculator</h2>
            <p className="text-gray-600">Calculate Mach number, velocity, or speed of sound using M = v/c</p>
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
                setCalculationType(e.target.value as 'mach' | 'velocity' | 'speedOfSound');
                if (e.target.value === 'speedOfSound') {
                  setUseTemperature(true);
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="mach">Mach Number (M)</option>
              <option value="velocity">Velocity (v)</option>
              <option value="speedOfSound">Speed of Sound (c)</option>
            </select>
          </div>

          {calculationType === 'mach' && (
            <>
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

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="useTempForMach"
                  checked={useTemperature}
                  onChange={(e) => setUseTemperature(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="useTempForMach" className="text-sm font-medium text-gray-700">
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
                  <label htmlFor="speedOfSound" className="block text-sm font-medium text-gray-700 mb-3">
                    Speed of Sound (c)
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        id="speedOfSound"
                        type="number"
                        placeholder="Enter speed of sound"
                        value={speedOfSound}
                        onChange={(e) => setSpeedOfSound(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="w-40">
                      <select
                        value={speedOfSoundUnit}
                        onChange={(e) => setSpeedOfSoundUnit(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {Object.entries(speedOfSoundUnits).map(([key, unit]) => (
                          <option key={key} value={key}>
                            {unit.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {calculationType === 'velocity' && (
            <>
              <div>
                <label htmlFor="machNumber" className="block text-sm font-medium text-gray-700 mb-3">
                  Mach Number (M)
                </label>
                <Input
                  id="machNumber"
                  type="number"
                  placeholder="Enter Mach number"
                  value={machNumber}
                  onChange={(e) => setMachNumber(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="useTempForVelocity"
                  checked={useTemperature}
                  onChange={(e) => setUseTemperature(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="useTempForVelocity" className="text-sm font-medium text-gray-700">
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
                  <label htmlFor="speedOfSound" className="block text-sm font-medium text-gray-700 mb-3">
                    Speed of Sound (c)
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        id="speedOfSound"
                        type="number"
                        placeholder="Enter speed of sound"
                        value={speedOfSound}
                        onChange={(e) => setSpeedOfSound(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="w-40">
                      <select
                        value={speedOfSoundUnit}
                        onChange={(e) => setSpeedOfSoundUnit(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {Object.entries(speedOfSoundUnits).map(([key, unit]) => (
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

          {calculationType === 'speedOfSound' && (
            <>
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

              <div>
                <label htmlFor="speedOfSoundUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Result Speed of Sound Unit
                </label>
                <select
                  id="speedOfSoundUnit"
                  value={speedOfSoundUnit}
                  onChange={(e) => setSpeedOfSoundUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(speedOfSoundUnits).map(([key, unit]) => (
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
              <li>• Select what you want to calculate: Mach Number, Velocity, or Speed of Sound</li>
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

