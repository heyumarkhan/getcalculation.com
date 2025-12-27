'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface DewPointCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Temperature units with conversion to Celsius
const temperatureUnits = {
  '°C': { name: '°C (Celsius)', factor: 1, offset: 0 },
  '°F': { name: '°F (Fahrenheit)', factor: 5/9, offset: -32 },
  'K': { name: 'K (Kelvin)', factor: 1, offset: -273.15 }
};

export default function DewPointCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: DewPointCalculatorProps) {
  const [temperature, setTemperature] = useState('');
  const [relativeHumidity, setRelativeHumidity] = useState('');
  const [tempUnit, setTempUnit] = useState('°C');
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
  const [calculation, setCalculation] = useState('');
  const [error, setError] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    return value.toFixed(2);
  };

  const convertTempToCelsius = (value: number, unit: string): number => {
    const unitData = temperatureUnits[unit as keyof typeof temperatureUnits];
    return (value + unitData.offset) * unitData.factor;
  };

  const convertTempFromCelsius = (value: number, unit: string): number => {
    const unitData = temperatureUnits[unit as keyof typeof temperatureUnits];
    return value / unitData.factor - unitData.offset;
  };

  // Calculate saturation vapor pressure using Magnus formula
  const calculateSaturationVaporPressure = (tempC: number): number => {
    // Magnus formula: es = 6.112 × exp((17.67 × T) / (T + 243.5))
    // Where T is in Celsius
    return 6.112 * Math.exp((17.67 * tempC) / (tempC + 243.5));
  };

  // Calculate dew point from temperature and relative humidity
  const calculateDewPoint = (tempC: number, rh: number): number => {
    // Clamp relative humidity to valid range
    const clampedRH = Math.max(0, Math.min(100, rh));
    
    // Calculate saturation vapor pressure at dry bulb temperature
    const es = calculateSaturationVaporPressure(tempC);
    
    // Calculate actual vapor pressure
    const e = (clampedRH / 100) * es;
    
    // Inverse Magnus formula to find dew point
    // Td = (243.5 × ln(e/6.112)) / (17.67 - ln(e/6.112))
    const lnTerm = Math.log(e / 6.112);
    return (243.5 * lnTerm) / (17.67 - lnTerm);
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    if (!temperature || !relativeHumidity) {
      setError('Please enter both temperature and relative humidity');
      return;
    }

    const temp = parseFloat(temperature);
    const rh = parseFloat(relativeHumidity);

    if (isNaN(temp) || isNaN(rh)) {
      setError('Please enter valid numbers');
      return;
    }

    if (rh < 0 || rh > 100) {
      setError('Relative humidity must be between 0% and 100%');
      return;
    }

    // Convert to Celsius for calculation
    const tempC = convertTempToCelsius(temp, tempUnit);
    
    // Calculate dew point
    const dewPointC = calculateDewPoint(tempC, rh);
    
    // Ensure dew point is valid (must be <= dry bulb temperature)
    if (isNaN(dewPointC) || dewPointC > tempC) {
      setError('Invalid calculation: dew point cannot exceed dry bulb temperature');
      return;
    }
    
    // Convert back to selected unit
    const dewPointResult = convertTempFromCelsius(dewPointC, tempUnit);
    
    setResult({ value: dewPointResult, unit: tempUnit });
    
    // Create detailed calculation steps
    const es = calculateSaturationVaporPressure(tempC);
    const e = (rh / 100) * es;
    const steps = [
      `Step 1: Calculate saturation vapor pressure at ${formatValue(temp)} ${tempUnit} using Magnus formula`,
      `   es = 6.112 × exp((17.67 × ${formatValue(tempC)}°C) / (${formatValue(tempC)}°C + 243.5)) = ${formatValue(es)} hPa`,
      `Step 2: Calculate actual vapor pressure`,
      `   e = (RH/100) × es = (${rh}% / 100) × ${formatValue(es)} = ${formatValue(e)} hPa`,
      `Step 3: Calculate dew point using inverse Magnus formula`,
      `   Td = (243.5 × ln(${formatValue(e)}/6.112)) / (17.67 - ln(${formatValue(e)}/6.112)) = ${formatValue(dewPointC)}°C`
    ];
    
    setCalculation(`Dew Point = ${formatValue(dewPointResult)} ${tempUnit}\n\n${steps.join('\n')}`);
  };

  const clearAll = () => {
    setTemperature('');
    setRelativeHumidity('');
    setTempUnit('°C');
    setResult(null);
    setCalculation('');
    setError('');
  };

  const getResultColor = () => {
    return 'bg-[#820ECC]/10 border-[#820ECC]/30';
  };

  const getResultTextColor = () => {
    return 'text-[#820ECC]';
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dew Point Calculator</h2>
          <p className="text-gray-600">Calculate dew point temperature from air temperature and relative humidity</p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Air Temperature (Dry Bulb)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter temperature"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-32">
              <select
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Relative Humidity (%)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter relative humidity (0-100)"
                value={relativeHumidity}
                onChange={(e) => setRelativeHumidity(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-32">
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 text-sm flex items-center">
                %
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button 
            onClick={calculate} 
            className="flex-1"
            style={{ backgroundColor: primaryColor }}
          >
            Calculate Dew Point
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-mono">{error}</p>
          </div>
        )}

        {result && (
          <div className={`mt-6 p-4 ${getResultColor()} border rounded-lg`}>
            <h3 className={`text-lg font-semibold ${getResultTextColor()} mb-2`}>Dew Point Temperature</h3>
            <p className={`text-2xl font-bold ${getResultTextColor()}`}>
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && (
              <div className={`text-sm ${getResultTextColor()}/80 mt-3 font-mono whitespace-pre-line`}>
                {calculation}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">How It Works</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Enter the air temperature (dry bulb temperature) in your preferred unit</li>
            <li>• Enter the relative humidity as a percentage (0-100%)</li>
            <li>• The calculator uses the Magnus formula to calculate dew point</li>
            <li>• Dew point is the temperature at which condensation begins</li>
            <li>• Formula: Td = (243.5 × ln(e/6.112)) / (17.67 - ln(e/6.112))</li>
            <li>• Where e = (RH/100) × es, and es is saturation vapor pressure</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

