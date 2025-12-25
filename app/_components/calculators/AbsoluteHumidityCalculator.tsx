'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'absoluteHumidity' | 'temperature' | 'relativeHumidity';

interface AbsoluteHumidityCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function AbsoluteHumidityCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: AbsoluteHumidityCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('absoluteHumidity');
  const [absoluteHumidity, setAbsoluteHumidity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [relativeHumidity, setRelativeHumidity] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState('°C');
  const [humidityUnit, setHumidityUnit] = useState('g/m³');
  const [result, setResult] = useState<{ value: number; unit: string; label: string } | null>(null);
  const [calculation, setCalculation] = useState('');
  const [error, setError] = useState('');

  // Gas constant and molar mass of water
  const R = 8.314462618; // J/(mol·K)
  const Mw = 18.01528; // g/mol (molar mass of water)

  // Calculate saturation vapor pressure using Magnus formula (in Pa)
  const calculateSaturationVaporPressure = (tempCelsius: number): number => {
    // Magnus formula: e_s = 611.2 * exp((17.67 * T) / (T + 243.5))
    // where T is in Celsius, result in Pascals
    return 611.2 * Math.exp((17.67 * tempCelsius) / (tempCelsius + 243.5));
  };

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

  const convertTemperatureToKelvin = (value: number, unit: string): number => {
    if (unit === '°C') return value + 273.15;
    if (unit === '°F') return (value - 32) * 5/9 + 273.15;
    if (unit === 'K') return value;
    return value;
  };

  const convertTemperatureFromKelvin = (value: number, unit: string): number => {
    if (unit === '°C') return value - 273.15;
    if (unit === '°F') return (value - 273.15) * 9/5 + 32;
    if (unit === 'K') return value;
    return value;
  };

  const convertToCelsius = (value: number, unit: string): number => {
    if (unit === '°C') return value;
    if (unit === '°F') return (value - 32) * 5/9;
    if (unit === 'K') return value - 273.15;
    return value;
  };

  const convertHumidityFromBase = (value: number, unit: string): number => {
    if (unit === 'g/m³') return value;
    if (unit === 'kg/m³') return value / 1000;
    if (unit === 'g/kg') {
      // For dry air at sea level: 1 m³ ≈ 1.225 kg
      // This is an approximation; actual conversion depends on temperature and pressure
      return value * 1.225; // Approximate conversion
    }
    return value;
  };

  const convertHumidityToBase = (value: number, unit: string): number => {
    if (unit === 'g/m³') return value;
    if (unit === 'kg/m³') return value * 1000;
    if (unit === 'g/kg') {
      return value / 1.225; // Approximate conversion
    }
    return value;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const ah = absoluteHumidity ? parseFloat(absoluteHumidity) : NaN;
    const t = temperature ? parseFloat(temperature) : NaN;
    const rh = relativeHumidity ? parseFloat(relativeHumidity) : NaN;

    if (calculationMode === 'absoluteHumidity') {
      // Calculate absolute humidity: AH = (RH/100) * (e_s * M_w) / (R * T)
      if (!temperature || !relativeHumidity) {
        setError('Please enter both temperature and relative humidity');
        return;
      }

      if (isNaN(t)) {
        setError('Temperature must be a valid number');
        return;
      }
      if (isNaN(rh) || rh < 0 || rh > 100) {
        setError('Relative humidity must be between 0 and 100');
        return;
      }

      const tempC = convertToCelsius(t, temperatureUnit);
      const tempK = convertTemperatureToKelvin(t, temperatureUnit);
      const e_s = calculateSaturationVaporPressure(tempC); // in Pa
      const e = (rh / 100) * e_s; // Partial pressure of water vapor in Pa
      const ahBase = (e * Mw) / (R * tempK); // in g/m³
      const ahResult = convertHumidityFromBase(ahBase, humidityUnit);

      setResult({ value: ahResult, unit: humidityUnit, label: 'Absolute Humidity' });
      setCalculation(`Absolute Humidity = (Relative Humidity / 100) × (Saturation Vapor Pressure × Molar Mass) / (Gas Constant × Temperature)\nAH = (RH/100) × (e_s × M_w) / (R × T)\nAt ${formatValue(t)} ${temperatureUnit} (${formatValue(tempC)}°C), e_s = ${formatValue(e_s)} Pa\nPartial pressure e = (${formatValue(rh)}% / 100) × ${formatValue(e_s)} Pa = ${formatValue(e)} Pa\nAH = (${formatValue(e)} Pa × ${formatValue(Mw)} g/mol) / (${formatValue(R)} J/(mol·K) × ${formatValue(tempK)} K)\nAH = ${formatValue(ahBase)} g/m³ = ${formatValue(ahResult)} ${humidityUnit}`);
    } else if (calculationMode === 'temperature') {
      // Calculate temperature from absolute humidity and relative humidity
      // This requires solving the equation iteratively
      if (!absoluteHumidity || !relativeHumidity) {
        setError('Please enter both absolute humidity and relative humidity');
        return;
      }

      if (isNaN(ah) || ah <= 0) {
        setError('Absolute humidity must be a valid positive number');
        return;
      }
      if (isNaN(rh) || rh <= 0 || rh > 100) {
        setError('Relative humidity must be between 0 and 100');
        return;
      }

      const ahBase = convertHumidityToBase(ah, humidityUnit);

      // Use iterative approach to find temperature
      // Start with a reasonable guess
      let tempC = 20; // Start with 20°C
      let found = false;
      let iterations = 0;
      const maxIterations = 100;
      const tolerance = 0.001;

      while (!found && iterations < maxIterations) {
        const tempK = tempC + 273.15;
        const e_s = calculateSaturationVaporPressure(tempC);
        const e = (rh / 100) * e_s;
        const calculatedAH = (e * Mw) / (R * tempK);
        const error = Math.abs(calculatedAH - ahBase);

        if (error < tolerance) {
          found = true;
        } else {
          // Adjust temperature (simplified Newton-like approach)
          const deltaT = (calculatedAH - ahBase) / (calculatedAH * 0.05); // Approximate derivative
          tempC -= deltaT;
          if (tempC < -50) tempC = -50;
          if (tempC > 100) tempC = 100;
        }
        iterations++;
      }

      if (!found) {
        setError('Could not find a valid temperature. Please check your inputs.');
        return;
      }

      const tempResult = convertTemperatureFromKelvin(tempC + 273.15, temperatureUnit);

      setResult({ value: tempResult, unit: temperatureUnit, label: 'Temperature' });
      setCalculation(`Temperature calculation from Absolute Humidity and Relative Humidity\nUsing iterative method to solve: AH = (RH/100) × (e_s × M_w) / (R × T)\nAH = ${formatValue(ah)} ${humidityUnit} = ${formatValue(ahBase)} g/m³, RH = ${formatValue(rh)}%\nFound temperature: ${formatValue(tempC)}°C = ${formatValue(tempResult)} ${temperatureUnit}`);
    } else if (calculationMode === 'relativeHumidity') {
      // Calculate relative humidity: RH = (AH × R × T) / (e_s × M_w) × 100
      if (!absoluteHumidity || !temperature) {
        setError('Please enter both absolute humidity and temperature');
        return;
      }

      if (isNaN(ah) || ah <= 0) {
        setError('Absolute humidity must be a valid positive number');
        return;
      }
      if (isNaN(t)) {
        setError('Temperature must be a valid number');
        return;
      }

      const tempC = convertToCelsius(t, temperatureUnit);
      const tempK = convertTemperatureToKelvin(t, temperatureUnit);
      const e_s = calculateSaturationVaporPressure(tempC);
      const ahBase = convertHumidityToBase(ah, humidityUnit);
      const rhResult = ((ahBase * R * tempK) / (e_s * Mw)) * 100;

      if (rhResult > 100) {
        setError('Calculated relative humidity exceeds 100%. Please check your inputs.');
        return;
      }
      if (rhResult < 0) {
        setError('Calculated relative humidity is negative. Please check your inputs.');
        return;
      }

      setResult({ value: rhResult, unit: '%', label: 'Relative Humidity' });
      setCalculation(`Relative Humidity = (Absolute Humidity × Gas Constant × Temperature) / (Saturation Vapor Pressure × Molar Mass) × 100\nRH = (AH × R × T) / (e_s × M_w) × 100\nAt ${formatValue(t)} ${temperatureUnit} (${formatValue(tempC)}°C), e_s = ${formatValue(e_s)} Pa\nAH = ${formatValue(ah)} ${humidityUnit} = ${formatValue(ahBase)} g/m³\nRH = (${formatValue(ahBase)} g/m³ × ${formatValue(R)} J/(mol·K) × ${formatValue(tempK)} K) / (${formatValue(e_s)} Pa × ${formatValue(Mw)} g/mol) × 100\nRH = ${formatValue(rhResult)}%`);
    }
  };

  const clearAll = () => {
    setAbsoluteHumidity('');
    setTemperature('');
    setRelativeHumidity('');
    setTemperatureUnit('°C');
    setHumidityUnit('g/m³');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Absolute Humidity Calculator</h2>
          <p className="text-gray-600">Calculate absolute humidity, temperature, or relative humidity using psychrometric formulas</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Mode
          </label>
          <select
            value={calculationMode}
            onChange={(e) => {
              setCalculationMode(e.target.value as CalculationMode);
              clearAll();
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="absoluteHumidity">Calculate Absolute Humidity</option>
            <option value="temperature">Calculate Temperature</option>
            <option value="relativeHumidity">Calculate Relative Humidity</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            AH = (RH/100) × (e_s × M_w) / (R × T)
          </p>
          <p className="text-xs text-gray-600 mt-1">Where: AH = Absolute Humidity, RH = Relative Humidity (%), e_s = Saturation Vapor Pressure, M_w = Molar Mass of Water, R = Gas Constant, T = Temperature</p>
        </div>

        {/* Absolute Humidity Input */}
        {(calculationMode === 'temperature' || calculationMode === 'relativeHumidity') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Absolute Humidity (AH)
            </label>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter absolute humidity"
                value={absoluteHumidity}
                onChange={(e) => setAbsoluteHumidity(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <select
                value={humidityUnit}
                onChange={(e) => setHumidityUnit(e.target.value)}
                className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                <option value="g/m³">g/m³</option>
                <option value="kg/m³">kg/m³</option>
                <option value="g/kg">g/kg</option>
              </select>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Typical range: 0-30 g/m³ (varies with temperature)
            </p>
          </div>
        )}

        {/* Temperature Input */}
        {(calculationMode === 'absoluteHumidity' || calculationMode === 'relativeHumidity') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Temperature (T)
            </label>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter temperature"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="flex-1"
              />
              <select
                value={temperatureUnit}
                onChange={(e) => setTemperatureUnit(e.target.value)}
                className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                <option value="°C">°C</option>
                <option value="°F">°F</option>
                <option value="K">K</option>
              </select>
            </div>
          </div>
        )}

        {/* Relative Humidity Input */}
        {(calculationMode === 'absoluteHumidity' || calculationMode === 'temperature') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Relative Humidity (RH)
            </label>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter relative humidity"
                value={relativeHumidity}
                onChange={(e) => setRelativeHumidity(e.target.value)}
                className="flex-1"
              />
              <div className="flex items-center text-sm text-gray-600 w-16">%</div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Range: 0-100% (0% = completely dry, 100% = saturated)
            </p>
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
            {calculationMode === 'absoluteHumidity' && (
              <>
                <li>• Enter temperature and relative humidity</li>
                <li>• Calculator will determine the absolute humidity</li>
                <li>• Formula: AH = (RH/100) × (e_s × M_w) / (R × T)</li>
                <li>• Uses Magnus formula for saturation vapor pressure</li>
              </>
            )}
            {calculationMode === 'temperature' && (
              <>
                <li>• Enter absolute humidity and relative humidity</li>
                <li>• Calculator will determine the temperature (iterative method)</li>
                <li>• Temperature range: -50°C to 100°C</li>
              </>
            )}
            {calculationMode === 'relativeHumidity' && (
              <>
                <li>• Enter absolute humidity and temperature</li>
                <li>• Calculator will determine the relative humidity</li>
                <li>• Formula: RH = (AH × R × T) / (e_s × M_w) × 100</li>
              </>
            )}
            <li>• Absolute humidity is the actual mass of water vapor per unit volume of air</li>
            <li>• Typical absolute humidity values: 0-5 g/m³ (cold), 5-15 g/m³ (moderate), 15-30 g/m³ (warm/humid)</li>
            <li>• Saturation vapor pressure calculated using Magnus formula</li>
            <li>• Results are accurate for standard atmospheric pressure (sea level)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

