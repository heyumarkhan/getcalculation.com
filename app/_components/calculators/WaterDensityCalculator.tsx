'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface WaterDensityCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Temperature units with conversion to Celsius
const temperatureUnits = {
  '°C': { name: '°C (Celsius)', factor: 1, offset: 0, toCelsius: (val: number) => val },
  '°F': { name: '°F (Fahrenheit)', factor: 5/9, offset: -32, toCelsius: (val: number) => (val - 32) * 5/9 },
  'K': { name: 'K (Kelvin)', factor: 1, offset: -273.15, toCelsius: (val: number) => val - 273.15 }
};

// Density units (conversion factor TO base unit: kg/m³)
const densityUnits = {
  'kg/m³': { name: 'kg/m³ (Kilograms per cubic meter)', factor: 1 },
  'g/cm³': { name: 'g/cm³ (Grams per cubic centimeter)', factor: 1000 },
  'g/L': { name: 'g/L (Grams per liter)', factor: 1 },
  'g/mL': { name: 'g/mL (Grams per milliliter)', factor: 1000 },
  'lb/ft³': { name: 'lb/ft³ (Pounds per cubic foot)', factor: 16.0185 },
  'lb/gal': { name: 'lb/gal (Pounds per US gallon)', factor: 119.826 }
};

/**
 * Calculate water density at a given temperature using polynomial approximation
 * Formula valid for 0-100°C at standard atmospheric pressure
 * Based on IAPWS-95 formulation (simplified polynomial)
 */
const calculateWaterDensity = (tempCelsius: number): number => {
  // Water density formula (polynomial approximation, valid 0-100°C)
  // More accurate than simple linear approximation
  // ρ(T) ≈ a + b*T + c*T² + d*T³ + e*T⁴
  
  const T = tempCelsius;
  
  // Polynomial coefficients for water density (kg/m³)
  // Valid for 0-100°C at standard atmospheric pressure
  const a = 999.83952;
  const b = 16.945176;
  const c = -7.9870401e-3;
  const d = -46.170461e-6;
  const e = 105.56302e-9;
  const f = -280.54253e-12;
  
  const density = a + 
                  b * T + 
                  c * T * T + 
                  d * T * T * T + 
                  e * T * T * T * T + 
                  f * T * T * T * T * T;
  
  return density;
};

export default function WaterDensityCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: WaterDensityCalculatorProps) {
  const [temperature, setTemperature] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState('°C');
  const [densityUnit, setDensityUnit] = useState('kg/m³');
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
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
      return value.toExponential(2);
    }
    return value.toFixed(6).replace(/\.?0+$/, '');
  };

  const convertTemperatureToCelsius = (value: number, unit: string): number => {
    const unitData = temperatureUnits[unit as keyof typeof temperatureUnits];
    return unitData.toCelsius(value);
  };

  const convertDensityFromBase = (value: number, unit: string): number => {
    return value / densityUnits[unit as keyof typeof densityUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    if (!temperature || temperature.trim() === '') {
      setError('Please enter a temperature');
      return;
    }

    const tempValue = parseFloat(temperature);
    if (isNaN(tempValue)) {
      setError('Please enter a valid number for temperature');
      return;
    }

    // Convert temperature to Celsius
    const tempCelsius = convertTemperatureToCelsius(tempValue, temperatureUnit);

    // Validate temperature range
    // Water is liquid from approximately 0°C to 100°C at standard pressure
    // Extended range for calculations: -20°C to 150°C (some supercooling/superheating)
    if (tempCelsius < -20 || tempCelsius > 150) {
      setError('Temperature should be between -20°C and 150°C for accurate water density calculations. Water is typically liquid between 0°C and 100°C at standard pressure.');
      // Continue calculation but warn user
    }

    // Calculate water density
    const densityKgM3 = calculateWaterDensity(tempCelsius);
    
    if (isNaN(densityKgM3) || densityKgM3 <= 0) {
      setError('Invalid density calculation. Please check temperature value.');
      return;
    }

    // Convert to selected unit
    const densityResult = convertDensityFromBase(densityKgM3, densityUnit);

    setResult({ value: densityResult, unit: densityUnit });

    // Generate calculation steps
    const calcSteps = 
      `Water Density Calculation\n\n` +
      `Temperature: ${formatValue(tempValue)} ${temperatureUnits[temperatureUnit as keyof typeof temperatureUnits].name}\n` +
      `Temperature in Celsius: ${formatValue(tempCelsius)}°C\n\n` +
      `Using polynomial formula:\n` +
      `ρ(T) = 999.83952 + 16.945176×T - 7.9870401×10⁻³×T² - 46.170461×10⁻⁶×T³ + 105.56302×10⁻⁹×T⁴ - 280.54253×10⁻¹²×T⁵\n\n` +
      `Where T = ${formatValue(tempCelsius)}°C\n\n` +
      `Calculated density: ${formatValue(densityKgM3)} kg/m³\n` +
      `Converted to ${densityUnits[densityUnit as keyof typeof densityUnits].name}: ${formatValue(densityResult)} ${densityUnit}\n\n` +
      `Note: Maximum density of water occurs at approximately 4°C (999.972 kg/m³).`;

    setCalculation(calcSteps);
  };

  const clearAll = () => {
    setTemperature('');
    setTemperatureUnit('°C');
    setDensityUnit('kg/m³');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Water Density Calculator</h2>
          <p className="text-gray-600">Calculate water density at any temperature</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Temperature Input */}
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
            <div className="w-40">
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

        {/* Density Unit Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Output Unit
          </label>
          <select
            value={densityUnit}
            onChange={(e) => setDensityUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            {Object.entries(densityUnits).map(([key, unit]) => (
              <option key={key} value={key}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>

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
            <h3 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>Water Density</h3>
            <p className="text-2xl font-bold" style={{ color: primaryColor }}>
              {formatValue(result.value)} {densityUnits[result.unit as keyof typeof densityUnits].name}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <div className="text-sm mt-3 font-mono whitespace-pre-line text-gray-700">
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
            <li>• Enter the temperature of water in your preferred unit (°C, °F, or K)</li>
            <li>• Select your preferred output density unit (kg/m³, g/cm³, g/L, lb/ft³, etc.)</li>
            <li>• Water density varies with temperature - maximum density occurs at approximately 4°C</li>
            <li>• Standard conditions: Water density at 4°C = 999.972 kg/m³ ≈ 1000 kg/m³</li>
            <li>• Formula uses polynomial approximation valid for 0-100°C at standard atmospheric pressure</li>
            <li>• For accurate results, ensure temperature is within the liquid water range (0-100°C at standard pressure)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

