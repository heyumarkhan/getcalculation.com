'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Temperature units
const temperatureUnits = {
  '°C': { name: '°C (Celsius)', factor: 1, offset: 0 },
  '°F': { name: '°F (Fahrenheit)', factor: 5/9, offset: -32 },
  'K': { name: 'K (Kelvin)', factor: 1, offset: -273.15 }
};

export default function WetBulbCalculator() {
  const [dryBulbTemp, setDryBulbTemp] = useState('');
  const [relativeHumidity, setRelativeHumidity] = useState('');
  const [tempUnit, setTempUnit] = useState('°C');
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
  const [calculation, setCalculation] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    return value.toFixed(2);
  };

  const convertToCelsius = (value: number, unit: string): number => {
    const unitData = temperatureUnits[unit as keyof typeof temperatureUnits];
    return (value + unitData.offset) * unitData.factor;
  };

  const convertFromCelsius = (value: number, unit: string): number => {
    const unitData = temperatureUnits[unit as keyof typeof temperatureUnits];
    return value / unitData.factor - unitData.offset;
  };

  // Calculate wet bulb temperature using Stull's formula
  // This is an approximation that works well for most practical purposes
  const calculateWetBulb = (dryBulbC: number, rh: number): number => {
    // Clamp relative humidity to valid range
    const clampedRH = Math.max(0, Math.min(100, rh));
    
    // Stull's formula: Tw ≈ T × arctan(0.151977 × √(RH + 8.313659)) + arctan(T + RH) - arctan(RH - 1.676331) + 0.00391838 × RH^(3/2) × arctan(0.023101 × RH) - 4.686035
    const sqrtTerm = Math.sqrt(clampedRH + 8.313659);
    const term1 = dryBulbC * Math.atan(0.151977 * sqrtTerm);
    const term2 = Math.atan(dryBulbC + clampedRH);
    const term3 = Math.atan(clampedRH - 1.676331);
    const term4 = 0.00391838 * Math.pow(clampedRH, 1.5) * Math.atan(0.023101 * clampedRH);
    
    const wetBulbC = term1 + term2 - term3 + term4 - 4.686035;
    
    return wetBulbC;
  };

  const calculate = () => {
    const temp = parseFloat(dryBulbTemp);
    const rh = parseFloat(relativeHumidity);

    if (!dryBulbTemp || !relativeHumidity) {
      setResult(null);
      setCalculation('Please enter both dry bulb temperature and relative humidity');
      return;
    }

    if (isNaN(temp) || isNaN(rh)) {
      setResult(null);
      setCalculation('Please enter valid numbers');
      return;
    }

    if (rh < 0 || rh > 100) {
      setResult(null);
      setCalculation('Relative humidity must be between 0% and 100%');
      return;
    }

    // Convert to Celsius for calculation
    const tempC = convertToCelsius(temp, tempUnit);
    
    // Calculate wet bulb temperature
    const wetBulbC = calculateWetBulb(tempC, rh);
    
    // Convert back to selected unit
    const wetBulbResult = convertFromCelsius(wetBulbC, tempUnit);
    
    setResult({ value: wetBulbResult, unit: tempUnit });
    setCalculation(`Wet Bulb Temperature = ${formatValue(wetBulbResult)} ${tempUnit} (from Dry Bulb: ${formatValue(temp)} ${tempUnit}, RH: ${rh}%)`);
  };

  const clearAll = () => {
    setDryBulbTemp('');
    setRelativeHumidity('');
    setTempUnit('°C');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Wet Bulb Calculator</h2>
        <p className="text-gray-600">Calculate wet bulb temperature from dry bulb temperature and relative humidity</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Dry Bulb Temperature
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter temperature"
                value={dryBulbTemp}
                onChange={(e) => setDryBulbTemp(e.target.value)}
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
          <Input
            type="text"
            placeholder="Enter relative humidity (0-100)"
            value={relativeHumidity}
            onChange={(e) => setRelativeHumidity(e.target.value)}
            className="w-full"
          />
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
          <div className="mt-6 p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg">
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">Wet Bulb Temperature</h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && (
              <p className="text-sm text-gray-700 mt-2">
                {calculation}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Enter the dry bulb temperature (ambient air temperature)</li>
            <li>• Enter the relative humidity as a percentage (0-100%)</li>
            <li>• Select your preferred temperature unit (°C, °F, or K)</li>
            <li>• Click Calculate to get the wet bulb temperature</li>
            <li>• The wet bulb temperature is the lowest temperature that can be reached by evaporating water into the air</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

