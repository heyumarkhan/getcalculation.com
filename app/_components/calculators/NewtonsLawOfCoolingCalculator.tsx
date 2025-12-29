'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors
const temperatureUnits = {
  'K': { name: 'Kelvin (K)', factor: 1 },
  'C': { name: 'Celsius (°C)', factor: 1, offset: 273.15, toKelvin: (t: number) => t + 273.15 },
  'F': { name: 'Fahrenheit (°F)', factor: 1, offset: 0, toKelvin: (t: number) => (t - 32) * 5/9 + 273.15 }
};

const timeUnits = {
  's': { name: 'Seconds (s)', factor: 1 },
  'min': { name: 'Minutes (min)', factor: 60 },
  'h': { name: 'Hours (h)', factor: 3600 },
  'ms': { name: 'Milliseconds (ms)', factor: 0.001 }
};

interface NewtonsLawOfCoolingCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function NewtonsLawOfCoolingCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: NewtonsLawOfCoolingCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'temperature' | 'time' | 'coolingConstant'>('temperature');
  const [initialTemp, setInitialTemp] = useState('');
  const [surroundingTemp, setSurroundingTemp] = useState('');
  const [currentTemp, setCurrentTemp] = useState('');
  const [time, setTime] = useState('');
  const [coolingConstant, setCoolingConstant] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState('C');
  const [timeUnit, setTimeUnit] = useState('min');
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

  const convertToBaseUnits = (value: number, unit: string, type: 'temperature' | 'time') => {
    if (type === 'temperature') {
      const unitData = temperatureUnits[unit as keyof typeof temperatureUnits];
      if ('toKelvin' in unitData) {
        return unitData.toKelvin(value);
      }
      return value * unitData.factor;
    } else {
      return value * timeUnits[unit as keyof typeof timeUnits].factor;
    }
  };

  const convertFromBaseUnits = (value: number, unit: string, type: 'temperature' | 'time') => {
    if (type === 'temperature') {
      const unitData = temperatureUnits[unit as keyof typeof temperatureUnits];
      if (unit === 'C') {
        return value - 273.15;
      } else if (unit === 'F') {
        return (value - 273.15) * 9/5 + 32;
      }
      return value / unitData.factor;
    } else {
      return value / timeUnits[unit as keyof typeof timeUnits].factor;
    }
  };

  const calculateTemperature = () => {
    const t0 = parseFloat(initialTemp);
    const ts = parseFloat(surroundingTemp);
    const k = parseFloat(coolingConstant);
    const t = parseFloat(time);

    if (isNaN(t0) || isNaN(ts) || isNaN(k) || isNaN(t) || k <= 0 || t < 0) {
      setResult(null);
      setCalculation('Please enter valid numerical values. Cooling constant must be positive, and time must be non-negative.');
      return;
    }

    // Convert to base units (K, s)
    const t0InK = convertToBaseUnits(t0, temperatureUnit, 'temperature');
    const tsInK = convertToBaseUnits(ts, temperatureUnit, 'temperature');
    const timeInS = convertToBaseUnits(t, timeUnit, 'time');

    // Calculate temperature: T(t) = T_s + (T_0 - T_s) × e^(-kt)
    const tempDiff = t0InK - tsInK;
    const exponent = -k * timeInS;
    const tempInK = tsInK + tempDiff * Math.exp(exponent);
    const tempInUnit = convertFromBaseUnits(tempInK, temperatureUnit, 'temperature');

    setResult({
      value: tempInUnit,
      unit: temperatureUnit,
      variable: 'Temperature'
    });

    // Build calculation string
    let calcStr = `T(t) = T_s + (T₀ - T_s) × e^(-kt)\n`;
    calcStr += `T(${formatValue(timeInS)} s) = ${formatValue(tsInK)} K + (${formatValue(t0InK)} K - ${formatValue(tsInK)} K) × e^(-${formatValue(k)} × ${formatValue(timeInS)} s)\n`;
    calcStr += `T(${formatValue(timeInS)} s) = ${formatValue(tsInK)} K + ${formatValue(tempDiff)} K × e^${formatValue(exponent)}\n`;
    calcStr += `T(${formatValue(timeInS)} s) = ${formatValue(tsInK)} K + ${formatValue(tempDiff)} K × ${formatValue(Math.exp(exponent))}\n`;
    calcStr += `T(${formatValue(timeInS)} s) = ${formatValue(tempInK)} K = ${formatValue(tempInUnit)} ${temperatureUnit}`;

    setCalculation(calcStr);
  };

  const calculateTime = () => {
    const t0 = parseFloat(initialTemp);
    const ts = parseFloat(surroundingTemp);
    const tCurrent = parseFloat(currentTemp);
    const k = parseFloat(coolingConstant);

    if (isNaN(t0) || isNaN(ts) || isNaN(tCurrent) || isNaN(k) || k <= 0) {
      setResult(null);
      setCalculation('Please enter valid numerical values. Cooling constant must be positive.');
      return;
    }

    // Convert to base units (K)
    const t0InK = convertToBaseUnits(t0, temperatureUnit, 'temperature');
    const tsInK = convertToBaseUnits(ts, temperatureUnit, 'temperature');
    const tCurrentInK = convertToBaseUnits(tCurrent, temperatureUnit, 'temperature');

    // Check if temperature has reached equilibrium
    if (Math.abs(tCurrentInK - tsInK) < 1e-10) {
      setResult(null);
      setCalculation('Temperature has reached equilibrium with surroundings. Time approaches infinity.');
      return;
    }

    // Check if temperature is between initial and surrounding
    if ((tCurrentInK > t0InK && t0InK > tsInK) || (tCurrentInK < t0InK && t0InK < tsInK)) {
      setResult(null);
      setCalculation('Current temperature must be between initial and surrounding temperatures for cooling/heating to occur.');
      return;
    }

    // Calculate time: t = -ln((T(t) - T_s) / (T_0 - T_s)) / k
    const numerator = tCurrentInK - tsInK;
    const denominator = t0InK - tsInK;
    
    if (numerator / denominator <= 0) {
      setResult(null);
      setCalculation('Invalid temperature values. The ratio (T(t) - T_s) / (T_0 - T_s) must be positive.');
      return;
    }

    const timeInS = -Math.log(numerator / denominator) / k;
    const timeInUnit = convertFromBaseUnits(timeInS, timeUnit, 'time');

    setResult({
      value: timeInUnit,
      unit: timeUnit,
      variable: 'Time'
    });

    // Build calculation string
    let calcStr = `t = -ln((T(t) - T_s) / (T₀ - T_s)) / k\n`;
    calcStr += `t = -ln((${formatValue(tCurrentInK)} K - ${formatValue(tsInK)} K) / (${formatValue(t0InK)} K - ${formatValue(tsInK)} K)) / ${formatValue(k)}\n`;
    calcStr += `t = -ln(${formatValue(numerator)} K / ${formatValue(denominator)} K) / ${formatValue(k)}\n`;
    calcStr += `t = -ln(${formatValue(numerator / denominator)}) / ${formatValue(k)}\n`;
    calcStr += `t = ${formatValue(-Math.log(numerator / denominator))} / ${formatValue(k)}\n`;
    calcStr += `t = ${formatValue(timeInS)} s = ${formatValue(timeInUnit)} ${timeUnit}`;

    setCalculation(calcStr);
  };

  const calculateCoolingConstant = () => {
    const t0 = parseFloat(initialTemp);
    const ts = parseFloat(surroundingTemp);
    const tCurrent = parseFloat(currentTemp);
    const t = parseFloat(time);

    if (isNaN(t0) || isNaN(ts) || isNaN(tCurrent) || isNaN(t) || t <= 0) {
      setResult(null);
      setCalculation('Please enter valid numerical values. Time must be positive.');
      return;
    }

    // Convert to base units (K, s)
    const t0InK = convertToBaseUnits(t0, temperatureUnit, 'temperature');
    const tsInK = convertToBaseUnits(ts, temperatureUnit, 'temperature');
    const tCurrentInK = convertToBaseUnits(tCurrent, temperatureUnit, 'temperature');
    const timeInS = convertToBaseUnits(t, timeUnit, 'time');

    // Check if temperature has reached equilibrium
    if (Math.abs(tCurrentInK - tsInK) < 1e-10) {
      setResult(null);
      setCalculation('Temperature has reached equilibrium. Cooling constant cannot be determined.');
      return;
    }

    // Check if temperature is between initial and surrounding
    if ((tCurrentInK > t0InK && t0InK > tsInK) || (tCurrentInK < t0InK && t0InK < tsInK)) {
      setResult(null);
      setCalculation('Current temperature must be between initial and surrounding temperatures.');
      return;
    }

    // Calculate cooling constant: k = -ln((T(t) - T_s) / (T_0 - T_s)) / t
    const numerator = tCurrentInK - tsInK;
    const denominator = t0InK - tsInK;
    
    if (numerator / denominator <= 0) {
      setResult(null);
      setCalculation('Invalid temperature values. The ratio (T(t) - T_s) / (T_0 - T_s) must be positive.');
      return;
    }

    const k = -Math.log(numerator / denominator) / timeInS;

    if (k <= 0) {
      setResult(null);
      setCalculation('Calculated cooling constant is invalid. Please check your input values.');
      return;
    }

    setResult({
      value: k,
      unit: 's⁻¹',
      variable: 'Cooling Constant'
    });

    // Build calculation string
    let calcStr = `k = -ln((T(t) - T_s) / (T₀ - T_s)) / t\n`;
    calcStr += `k = -ln((${formatValue(tCurrentInK)} K - ${formatValue(tsInK)} K) / (${formatValue(t0InK)} K - ${formatValue(tsInK)} K)) / ${formatValue(timeInS)} s\n`;
    calcStr += `k = -ln(${formatValue(numerator)} K / ${formatValue(denominator)} K) / ${formatValue(timeInS)} s\n`;
    calcStr += `k = -ln(${formatValue(numerator / denominator)}) / ${formatValue(timeInS)} s\n`;
    calcStr += `k = ${formatValue(-Math.log(numerator / denominator))} / ${formatValue(timeInS)} s\n`;
    calcStr += `k = ${formatValue(k)} s⁻¹`;

    setCalculation(calcStr);
  };

  const calculate = () => {
    switch (calculationType) {
      case 'temperature':
        calculateTemperature();
        break;
      case 'time':
        calculateTime();
        break;
      case 'coolingConstant':
        calculateCoolingConstant();
        break;
    }
  };

  const clearAll = () => {
    setCalculationType('temperature');
    setInitialTemp('');
    setSurroundingTemp('');
    setCurrentTemp('');
    setTime('');
    setCoolingConstant('');
    setTemperatureUnit('C');
    setTimeUnit('min');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Newton&apos;s Law of Cooling Calculator</h2>
            <p className="text-gray-600">Calculate temperature, time, or cooling constant using T(t) = T_s + (T₀ - T_s) × e^(-kt)</p>
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
              onChange={(e) => setCalculationType(e.target.value as 'temperature' | 'time' | 'coolingConstant')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="temperature">Temperature at Time t</option>
              <option value="time">Time to Reach Temperature</option>
              <option value="coolingConstant">Cooling Constant (k)</option>
            </select>
          </div>

          <div>
            <label htmlFor="initialTemp" className="block text-sm font-medium text-gray-700 mb-3">
              Initial Temperature (T₀)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  id="initialTemp"
                  type="number"
                  placeholder="Enter initial temperature"
                  value={initialTemp}
                  onChange={(e) => setInitialTemp(e.target.value)}
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
            <label htmlFor="surroundingTemp" className="block text-sm font-medium text-gray-700 mb-3">
              Surrounding Temperature (T_s)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  id="surroundingTemp"
                  type="number"
                  placeholder="Enter surrounding temperature"
                  value={surroundingTemp}
                  onChange={(e) => setSurroundingTemp(e.target.value)}
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

          {calculationType === 'temperature' && (
            <>
              <div>
                <label htmlFor="coolingConstant" className="block text-sm font-medium text-gray-700 mb-3">
                  Cooling Constant (k)
                </label>
                <Input
                  id="coolingConstant"
                  type="number"
                  placeholder="Enter cooling constant (s⁻¹)"
                  value={coolingConstant}
                  onChange={(e) => setCoolingConstant(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-3">
                  Time (t)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="time"
                      type="number"
                      placeholder="Enter time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={timeUnit}
                      onChange={(e) => setTimeUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

          {calculationType === 'time' && (
            <>
              <div>
                <label htmlFor="currentTemp" className="block text-sm font-medium text-gray-700 mb-3">
                  Current Temperature (T(t))
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="currentTemp"
                      type="number"
                      placeholder="Enter current temperature"
                      value={currentTemp}
                      onChange={(e) => setCurrentTemp(e.target.value)}
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
                <label htmlFor="coolingConstant" className="block text-sm font-medium text-gray-700 mb-3">
                  Cooling Constant (k)
                </label>
                <Input
                  id="coolingConstant"
                  type="number"
                  placeholder="Enter cooling constant (s⁻¹)"
                  value={coolingConstant}
                  onChange={(e) => setCoolingConstant(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="timeUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Result Time Unit
                </label>
                <select
                  id="timeUnit"
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(timeUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {calculationType === 'coolingConstant' && (
            <>
              <div>
                <label htmlFor="currentTemp" className="block text-sm font-medium text-gray-700 mb-3">
                  Current Temperature (T(t))
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="currentTemp"
                      type="number"
                      placeholder="Enter current temperature"
                      value={currentTemp}
                      onChange={(e) => setCurrentTemp(e.target.value)}
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
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-3">
                  Time (t)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="time"
                      type="number"
                      placeholder="Enter time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={timeUnit}
                      onChange={(e) => setTimeUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              <li>• Select what you want to calculate: Temperature at time t, Time to reach temperature, or Cooling constant</li>
              <li>• Enter the initial temperature and surrounding temperature</li>
              <li>• Enter the required values based on your calculation type</li>
              <li>• Select appropriate units for temperature and time</li>
              <li>• Click &quot;Calculate&quot; to get the result with step-by-step calculations</li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}

