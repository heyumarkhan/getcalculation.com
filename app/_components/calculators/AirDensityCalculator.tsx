'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Constants
const R_DRY_AIR = 287.05; // Specific gas constant for dry air in J/(kg·K)
const STANDARD_PRESSURE = 101325; // Standard atmospheric pressure in Pa (1013.25 hPa)
const STANDARD_TEMP_C = 15; // Standard temperature in Celsius
const STANDARD_DENSITY = 1.225; // Standard air density in kg/m³ at sea level

// Temperature units with conversion to Kelvin
const temperatureUnits = {
  '°C': { name: '°C (Celsius)', factor: 1, offset: 273.15, toKelvin: (val: number) => val + 273.15 },
  '°F': { name: '°F (Fahrenheit)', factor: 5/9, offset: 255.37, toKelvin: (val: number) => (val - 32) * 5/9 + 273.15 },
  'K': { name: 'K (Kelvin)', factor: 1, offset: 0, toKelvin: (val: number) => val }
};

// Pressure units (relative to Pascals)
const pressureUnits = {
  'Pa': { name: 'Pa (Pascals)', factor: 1 },
  'hPa': { name: 'hPa (Hectopascals)', factor: 100 },
  'kPa': { name: 'kPa (Kilopascals)', factor: 1000 },
  'bar': { name: 'bar', factor: 100000 },
  'mbar': { name: 'mbar (Millibars)', factor: 100 },
  'atm': { name: 'atm (Atmospheres)', factor: 101325 },
  'psi': { name: 'psi (Pounds per square inch)', factor: 6894.76 },
  'inHg': { name: 'inHg (Inches of mercury)', factor: 3386.39 },
  'mmHg': { name: 'mmHg (Millimeters of mercury)', factor: 133.322 }
};

// Density units (relative to kg/m³)
const densityUnits = {
  'kg/m³': { name: 'kg/m³ (Kilograms per cubic meter)', factor: 1 },
  'g/cm³': { name: 'g/cm³ (Grams per cubic centimeter)', factor: 1000 },
  'g/L': { name: 'g/L (Grams per liter)', factor: 1 },
  'lb/ft³': { name: 'lb/ft³ (Pounds per cubic foot)', factor: 16.0185 },
  'lb/in³': { name: 'lb/in³ (Pounds per cubic inch)', factor: 27679.9 },
  'oz/in³': { name: 'oz/in³ (Ounces per cubic inch)', factor: 1730.0 },
  'slug/ft³': { name: 'slug/ft³ (Slugs per cubic foot)', factor: 515.379 }
};

export default function AirDensityCalculator() {
  const [calculationType, setCalculationType] = useState<'density' | 'pressure' | 'temperature'>('density');
  const [temperature, setTemperature] = useState('');
  const [pressure, setPressure] = useState('');
  const [density, setDensity] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState('°C');
  const [pressureUnit, setPressureUnit] = useState('hPa');
  const [densityUnit, setDensityUnit] = useState('kg/m³');
  const [result, setResult] = useState<{ value: number; unit: string; type: string } | null>(null);
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
    return value.toFixed(6).replace(/\.?0+$/, '');
  };

  const convertTemperatureToKelvin = (value: number, unit: string): number => {
    const unitData = temperatureUnits[unit as keyof typeof temperatureUnits];
    return unitData.toKelvin(value);
  };

  const convertTemperatureFromKelvin = (value: number, unit: string): number => {
    const unitData = temperatureUnits[unit as keyof typeof temperatureUnits];
    return (value - unitData.offset) / unitData.factor;
  };

  const convertPressureToPa = (value: number, unit: string): number => {
    return value * pressureUnits[unit as keyof typeof pressureUnits].factor;
  };

  const convertPressureFromPa = (value: number, unit: string): number => {
    return value / pressureUnits[unit as keyof typeof pressureUnits].factor;
  };

  const convertDensityToBase = (value: number, unit: string): number => {
    return value * densityUnits[unit as keyof typeof densityUnits].factor;
  };

  const convertDensityFromBase = (value: number, unit: string): number => {
    return value / densityUnits[unit as keyof typeof densityUnits].factor;
  };

  // Calculate air density using ideal gas law: ρ = P / (R × T)
  const calculateDensity = (pressurePa: number, tempK: number): number => {
    if (tempK <= 0) return NaN;
    return pressurePa / (R_DRY_AIR * tempK);
  };

  // Calculate pressure from density and temperature: P = ρ × R × T
  const calculatePressure = (densityKgM3: number, tempK: number): number => {
    if (tempK <= 0) return NaN;
    return densityKgM3 * R_DRY_AIR * tempK;
  };

  // Calculate temperature from density and pressure: T = P / (ρ × R)
  const calculateTemperature = (densityKgM3: number, pressurePa: number): number => {
    if (densityKgM3 <= 0) return NaN;
    return pressurePa / (densityKgM3 * R_DRY_AIR);
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    if (calculationType === 'density') {
      if (!temperature || !pressure) {
        setError('Please enter both temperature and pressure to calculate density');
        return;
      }

      const tempValue = parseFloat(temperature);
      const pressValue = parseFloat(pressure);

      if (isNaN(tempValue) || isNaN(pressValue)) {
        setError('Please enter valid numbers');
        return;
      }

      const tempK = convertTemperatureToKelvin(tempValue, temperatureUnit);
      const pressurePa = convertPressureToPa(pressValue, pressureUnit);

      if (tempK <= 0) {
        setError('Temperature must be above absolute zero');
        return;
      }

      if (pressurePa <= 0) {
        setError('Pressure must be positive');
        return;
      }

      const densityKgM3 = calculateDensity(pressurePa, tempK);
      const densityResult = convertDensityFromBase(densityKgM3, densityUnit);

      setResult({ value: densityResult, unit: densityUnit, type: 'density' });

      setCalculation(`Ideal Gas Law: ρ = P / (R × T)\nρ = ${formatValue(pressurePa)} Pa / (287.05 J/(kg·K) × ${formatValue(tempK)} K)\nρ = ${formatValue(pressurePa)} / ${formatValue(R_DRY_AIR * tempK)}\nρ = ${formatValue(densityKgM3)} kg/m³ = ${formatValue(densityResult)} ${densityUnit}`);
    } else if (calculationType === 'pressure') {
      if (!temperature || !density) {
        setError('Please enter both temperature and density to calculate pressure');
        return;
      }

      const tempValue = parseFloat(temperature);
      const densValue = parseFloat(density);

      if (isNaN(tempValue) || isNaN(densValue)) {
        setError('Please enter valid numbers');
        return;
      }

      const tempK = convertTemperatureToKelvin(tempValue, temperatureUnit);
      const densityKgM3 = convertDensityToBase(densValue, densityUnit);

      if (tempK <= 0) {
        setError('Temperature must be above absolute zero');
        return;
      }

      if (densityKgM3 <= 0) {
        setError('Density must be positive');
        return;
      }

      const pressurePa = calculatePressure(densityKgM3, tempK);
      const pressureResult = convertPressureFromPa(pressurePa, pressureUnit);

      setResult({ value: pressureResult, unit: pressureUnit, type: 'pressure' });

      setCalculation(`Ideal Gas Law: P = ρ × R × T\nP = ${formatValue(densityKgM3)} kg/m³ × 287.05 J/(kg·K) × ${formatValue(tempK)} K\nP = ${formatValue(densityKgM3)} × ${formatValue(R_DRY_AIR * tempK)}\nP = ${formatValue(pressurePa)} Pa = ${formatValue(pressureResult)} ${pressureUnit}`);
    } else if (calculationType === 'temperature') {
      if (!pressure || !density) {
        setError('Please enter both pressure and density to calculate temperature');
        return;
      }

      const pressValue = parseFloat(pressure);
      const densValue = parseFloat(density);

      if (isNaN(pressValue) || isNaN(densValue)) {
        setError('Please enter valid numbers');
        return;
      }

      const pressurePa = convertPressureToPa(pressValue, pressureUnit);
      const densityKgM3 = convertDensityToBase(densValue, densityUnit);

      if (pressurePa <= 0) {
        setError('Pressure must be positive');
        return;
      }

      if (densityKgM3 <= 0) {
        setError('Density must be positive');
        return;
      }

      const tempK = calculateTemperature(densityKgM3, pressurePa);
      const tempResult = convertTemperatureFromKelvin(tempK, temperatureUnit);

      if (tempK <= 0) {
        setError('Calculated temperature is below absolute zero - check your inputs');
        return;
      }

      setResult({ value: tempResult, unit: temperatureUnit, type: 'temperature' });

      setCalculation(`Ideal Gas Law: T = P / (ρ × R)\nT = ${formatValue(pressurePa)} Pa / (${formatValue(densityKgM3)} kg/m³ × 287.05 J/(kg·K))\nT = ${formatValue(pressurePa)} / ${formatValue(densityKgM3 * R_DRY_AIR)}\nT = ${formatValue(tempK)} K = ${formatValue(tempResult)} ${temperatureUnit}`);
    }
  };

  const clearAll = () => {
    setCalculationType('density');
    setTemperature('');
    setPressure('');
    setDensity('');
    setTemperatureUnit('°C');
    setPressureUnit('hPa');
    setDensityUnit('kg/m³');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Air Density Calculator</h2>
        <p className="text-gray-600">Calculate air density, pressure, or temperature using the ideal gas law</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Calculation Type:</p>
          <select
            value={calculationType}
            onChange={(e) => setCalculationType(e.target.value as 'density' | 'pressure' | 'temperature')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm font-medium"
          >
            <option value="density">Calculate Air Density</option>
            <option value="pressure">Calculate Pressure</option>
            <option value="temperature">Calculate Temperature</option>
          </select>
          <p className="text-xs text-gray-500 mt-2">
            Formula: ρ = P / (R × T) where R = 287.05 J/(kg·K)
          </p>
        </div>

        {/* Temperature Input */}
        {(calculationType === 'density' || calculationType === 'pressure') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Temperature
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
                  value={temperatureUnit}
                  onChange={(e) => setTemperatureUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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
        )}

        {/* Pressure Input */}
        {(calculationType === 'density' || calculationType === 'temperature') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Pressure
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter pressure"
                  value={pressure}
                  onChange={(e) => setPressure(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-40">
                <select
                  value={pressureUnit}
                  onChange={(e) => setPressureUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(pressureUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Density Input */}
        {(calculationType === 'pressure' || calculationType === 'temperature') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Air Density
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter air density"
                  value={density}
                  onChange={(e) => setDensity(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-40">
                <select
                  value={densityUnit}
                  onChange={(e) => setDensityUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(densityUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button onClick={calculate} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg">
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">Result</h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && (
              <div className="mt-4 pt-4 border-t border-[#820ECC]/30">
                <p className="text-xs text-gray-600 mb-2 font-semibold">Calculation Steps:</p>
                <p className="text-sm text-[#820ECC]/80 font-mono whitespace-pre-line break-words">
                  {calculation}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {calculationType === 'density' && (
              <>
                <li>• Enter temperature and pressure</li>
                <li>• Formula: ρ = P / (R × T) where R = 287.05 J/(kg·K)</li>
                <li>• Standard conditions: 15°C, 1013.25 hPa → ρ ≈ 1.225 kg/m³</li>
              </>
            )}
            {calculationType === 'pressure' && (
              <>
                <li>• Enter temperature and air density</li>
                <li>• Formula: P = ρ × R × T where R = 287.05 J/(kg·K)</li>
                <li>• Calculates pressure required for given density at temperature</li>
              </>
            )}
            {calculationType === 'temperature' && (
              <>
                <li>• Enter pressure and air density</li>
                <li>• Formula: T = P / (ρ × R) where R = 287.05 J/(kg·K)</li>
                <li>• Calculates temperature required for given density at pressure</li>
              </>
            )}
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• Uses ideal gas law for dry air (assumes dry air conditions)</li>
            <li>• Temperature must be above absolute zero</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

