'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Temperature units with conversion to Celsius
const temperatureUnits = {
  '°C': { name: '°C (Celsius)', factor: 1, offset: 0 },
  '°F': { name: '°F (Fahrenheit)', factor: 5/9, offset: -32 },
  'K': { name: 'K (Kelvin)', factor: 1, offset: -273.15 }
};

export default function RelativeHumidityCalculator() {
  const [dryBulbTemp, setDryBulbTemp] = useState('');
  const [dewPointTemp, setDewPointTemp] = useState('');
  const [relativeHumidity, setRelativeHumidity] = useState('');
  const [tempUnit, setTempUnit] = useState('°C');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'humidity' | 'dryBulb' | 'dewPoint' } | null>(null);
  const [calculation, setCalculation] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (value < 0) {
      return '0';
    }
    if (value > 100 && result?.type === 'humidity') {
      return '100';
    }
    return value.toFixed(2).replace(/\.?0+$/, '');
  };

  const convertTempToCelsius = (value: number, unit: string) => {
    const tempData = temperatureUnits[unit as keyof typeof temperatureUnits];
    return value * tempData.factor + tempData.offset;
  };

  const convertTempFromCelsius = (value: number, unit: string) => {
    const tempData = temperatureUnits[unit as keyof typeof temperatureUnits];
    return (value - tempData.offset) / tempData.factor;
  };

  // Calculate saturation vapor pressure using Magnus formula
  const calculateSaturationVaporPressure = (tempC: number): number => {
    // Magnus formula: e = 6.112 × exp((17.67 × T) / (T + 243.5))
    // Where T is in Celsius
    return 6.112 * Math.exp((17.67 * tempC) / (tempC + 243.5));
  };

  // Calculate relative humidity from dry bulb and dew point
  const calculateRH = (dryBulbC: number, dewPointC: number): number => {
    const es = calculateSaturationVaporPressure(dryBulbC);
    const e = calculateSaturationVaporPressure(dewPointC);
    return (e / es) * 100;
  };

  // Calculate dew point from dry bulb and relative humidity
  const calculateDewPoint = (dryBulbC: number, rh: number): number => {
    const es = calculateSaturationVaporPressure(dryBulbC);
    const e = (rh / 100) * es;
    
    // Inverse Magnus formula to find dew point
    // Td = (243.5 × ln(e/6.112)) / (17.67 - ln(e/6.112))
    const lnTerm = Math.log(e / 6.112);
    return (243.5 * lnTerm) / (17.67 - lnTerm);
  };

  // Calculate dry bulb from dew point and relative humidity
  const calculateDryBulb = (dewPointC: number, rh: number): number => {
    // Using the inverse relationship: es = e / (RH/100)
    // We know e from dew point, and we need to find T where es = e / (RH/100)
    const e = calculateSaturationVaporPressure(dewPointC);
    const targetEs = e / (rh / 100);
    
    // Use iterative approach to find dry bulb temperature
    // Start from dew point and increase
    let dryBulbC = dewPointC;
    const maxIterations = 200;
    const tolerance = 0.01;
    
    for (let i = 0; i < maxIterations; i++) {
      const es = calculateSaturationVaporPressure(dryBulbC);
      const error = Math.abs(es - targetEs);
      
      if (error < tolerance) {
        return dryBulbC;
      }
      
      // Adjust dry bulb temperature using Newton-like approach
      if (es < targetEs) {
        dryBulbC += 0.5;
      } else {
        dryBulbC -= 0.1;
      }
      
      // Safety checks
      if (dryBulbC < dewPointC) {
        return NaN; // Invalid - dry bulb must be >= dew point
      }
      if (dryBulbC > 100) {
        return NaN; // Unrealistic temperature
      }
    }
    
    return dryBulbC;
  };

  const calculate = () => {
    const t = dryBulbTemp ? parseFloat(dryBulbTemp) : NaN;
    const td = dewPointTemp ? parseFloat(dewPointTemp) : NaN;
    const rh = relativeHumidity ? parseFloat(relativeHumidity) : NaN;

    const filledCount = [dryBulbTemp, dewPointTemp, relativeHumidity].filter(val => val !== '').length;

    if (filledCount !== 2) {
      setResult(null);
      setCalculation('');
      return;
    }

    // Validate that filled values are valid numbers
    if (dryBulbTemp && isNaN(t)) {
      setResult(null);
      setCalculation('Error: Please enter a valid number for dry bulb temperature');
      return;
    }
    if (dewPointTemp && isNaN(td)) {
      setResult(null);
      setCalculation('Error: Please enter a valid number for dew point temperature');
      return;
    }
    if (relativeHumidity && (isNaN(rh) || rh < 0 || rh > 100)) {
      setResult(null);
      setCalculation('Error: Please enter a valid relative humidity between 0 and 100%');
      return;
    }

    if (!relativeHumidity) {
      // Calculate relative humidity: RH = (e/es) × 100
      const tC = convertTempToCelsius(t, tempUnit);
      const tdC = convertTempToCelsius(td, tempUnit);
      
      if (tdC > tC) {
        setResult(null);
        setCalculation('Error: Dew point cannot be higher than dry bulb temperature');
        return;
      }
      
      const rhResult = calculateRH(tC, tdC);
      const clampedRH = Math.max(0, Math.min(100, rhResult));
      
      setResult({ value: clampedRH, unit: '%', type: 'humidity' });
      setCalculation(`RH = (e/es) × 100 = ${formatValue(clampedRH)}%`);
    } else if (!dewPointTemp) {
      // Calculate dew point from dry bulb and relative humidity
      const tC = convertTempToCelsius(t, tempUnit);
      const tdC = calculateDewPoint(tC, rh);
      
      if (isNaN(tdC) || tdC > tC) {
        setResult(null);
        setCalculation('Error: Cannot calculate valid dew point with given values');
        return;
      }
      
      const tdResult = convertTempFromCelsius(tdC, tempUnit);
      
      setResult({ value: tdResult, unit: tempUnit, type: 'dewPoint' });
      setCalculation(`Dew Point = ${formatValue(tdResult)} ${tempUnit} (from RH = ${formatValue(rh)}% and Dry Bulb = ${formatValue(t)} ${tempUnit})`);
    } else if (!dryBulbTemp) {
      // Calculate dry bulb from dew point and relative humidity
      const tdC = convertTempToCelsius(td, tempUnit);
      const tC = calculateDryBulb(tdC, rh);
      
      if (isNaN(tC) || tC < tdC) {
        setResult(null);
        setCalculation('Error: Cannot calculate valid dry bulb temperature with given values');
        return;
      }
      
      const tResult = convertTempFromCelsius(tC, tempUnit);
      
      setResult({ value: tResult, unit: tempUnit, type: 'dryBulb' });
      setCalculation(`Dry Bulb = ${formatValue(tResult)} ${tempUnit} (from RH = ${formatValue(rh)}% and Dew Point = ${formatValue(td)} ${tempUnit})`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setDryBulbTemp('');
    setDewPointTemp('');
    setRelativeHumidity('');
    setTempUnit('°C');
    setResult(null);
    setCalculation('');
  };

  const getResultColor = () => {
    return 'bg-[#820ECC]/10 border-[#820ECC]/30';
  };

  const getResultTextColor = () => {
    return 'text-[#820ECC]';
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Relative Humidity Calculator</h2>
        <p className="text-gray-600">Calculate relative humidity, dry bulb temperature, or dew point temperature</p>
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
                placeholder="Enter dry bulb temperature"
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
            Dew Point Temperature
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter dew point temperature"
                value={dewPointTemp}
                onChange={(e) => setDewPointTemp(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-32">
              <select
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                disabled
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
            Relative Humidity (RH)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter relative humidity (%)"
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
          <Button onClick={calculate} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className={`mt-6 p-4 ${getResultColor()} border rounded-lg`}>
            <h3 className={`text-lg font-semibold ${getResultTextColor()} mb-2`}>Result</h3>
            <p className={`text-2xl font-bold ${getResultTextColor()}`}>
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && (
              <p className={`text-sm ${getResultTextColor()}/80 mt-2 font-mono`}>
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
            <li>• Enter any two values to calculate the third (Dry Bulb, Dew Point, or RH)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Select your preferred temperature unit (°C, °F, or K)</li>
            <li>• Relative humidity is always in percentage (%)</li>
            <li>• Formula: RH = (e/es) × 100, where e is vapor pressure and es is saturation vapor pressure</li>
            <li>• Dew point cannot be higher than dry bulb temperature</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

