'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Constants for water viscosity calculation
const A = 2.414e-5; // Pa·s
const B = 247.8; // K
const C = 140; // K

// Water density function (approximate, in kg/m³)
const getWaterDensity = (tempCelsius: number): number => {
  // Simplified density formula for water (valid for 0-100°C)
  // More accurate: ρ ≈ 999.84 - 0.0674*T - 0.00889*T² where T is in Celsius
  // Using a simplified version for common temperatures
  if (tempCelsius <= 4) {
    return 1000 + (tempCelsius - 4) * 0.02;
  } else {
    return 999.972 - 0.0054 * tempCelsius - 0.00008 * tempCelsius * tempCelsius;
  }
};

// Unit conversion factors
const temperatureUnits = {
  '°C': { name: '°C (Celsius)', factor: 1, offset: 0, toKelvin: (val: number) => val + 273.15 },
  '°F': { name: '°F (Fahrenheit)', factor: 5/9, offset: -32, toKelvin: (val: number) => (val - 32) * 5/9 + 273.15 },
  'K': { name: 'K (Kelvin)', factor: 1, offset: 0, toKelvin: (val: number) => val }
};

const viscosityUnits = {
  'Pa·s': { name: 'Pa·s (Pascal-seconds)', factor: 1 },
  'cP': { name: 'cP (Centipoise)', factor: 0.001 },
  'P': { name: 'P (Poise)', factor: 0.1 },
  'mPa·s': { name: 'mPa·s (Millipascal-seconds)', factor: 0.001 },
  'N·s/m²': { name: 'N·s/m²', factor: 1 }
};

const kinematicViscosityUnits = {
  'm²/s': { name: 'm²/s', factor: 1 },
  'St': { name: 'St (Stokes)', factor: 1e-4 },
  'cSt': { name: 'cSt (Centistokes)', factor: 1e-6 },
  'ft²/s': { name: 'ft²/s', factor: 0.092903 },
  'in²/s': { name: 'in²/s', factor: 0.00064516 }
};

export default function WaterViscosityCalculator() {
  const [temperature, setTemperature] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState('°C');
  const [dynamicViscosityUnit, setDynamicViscosityUnit] = useState('Pa·s');
  const [kinematicViscosityUnit, setKinematicViscosityUnit] = useState('m²/s');
  const [dynamicViscosity, setDynamicViscosity] = useState<number | null>(null);
  const [kinematicViscosity, setKinematicViscosity] = useState<number | null>(null);
  const [density, setDensity] = useState<number | null>(null);
  const [calculation, setCalculation] = useState('');
  const [error, setError] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 0.000001 && value !== 0) {
      return value.toExponential(4);
    }
    if (Math.abs(value) >= 1000000) {
      return value.toExponential(4);
    }
    if (value < 0.001) {
      return value.toExponential(4);
    }
    return value.toFixed(6).replace(/\.?0+$/, '');
  };

  const calculateViscosity = () => {
    setError('');
    setDynamicViscosity(null);
    setKinematicViscosity(null);
    setDensity(null);
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

    // Convert temperature to Kelvin
    const unit = temperatureUnits[temperatureUnit as keyof typeof temperatureUnits];
    const tempKelvin = unit.toKelvin(tempValue);

    // Validate temperature range (water is liquid roughly from 0°C to 100°C at standard pressure)
    const tempCelsius = tempKelvin - 273.15;
    if (tempCelsius < -20 || tempCelsius > 150) {
      setError('Temperature should be between -20°C and 150°C for accurate calculations');
      // Continue calculation but warn user
    }

    // Calculate dynamic viscosity using the formula: μ = A × 10^(B/(T - C))
    // where T is in Kelvin
    if (tempKelvin <= C) {
      setError('Temperature too close to or below 140 K. Calculation may be inaccurate.');
      return;
    }

    const dynamicViscosityPaS = A * Math.pow(10, B / (tempKelvin - C));
    
    // Calculate water density
    const waterDensity = getWaterDensity(tempCelsius);
    
    // Calculate kinematic viscosity: ν = μ / ρ
    const kinematicViscosityM2S = dynamicViscosityPaS / waterDensity;

    // Convert to selected units
    const viscosityUnitFactor = viscosityUnits[dynamicViscosityUnit as keyof typeof viscosityUnits].factor;
    const dynamicViscosityResult = dynamicViscosityPaS / viscosityUnitFactor;
    
    const kinematicViscosityUnitFactor = kinematicViscosityUnits[kinematicViscosityUnit as keyof typeof kinematicViscosityUnits].factor;
    const kinematicViscosityResult = kinematicViscosityM2S / kinematicViscosityUnitFactor;

    setDynamicViscosity(dynamicViscosityResult);
    setKinematicViscosity(kinematicViscosityResult);
    setDensity(waterDensity);

    // Format calculation string
    const calcString = `μ = A × 10^(B/(T - C)) = ${A.toExponential()} × 10^(247.8/(${formatValue(tempKelvin)} - 140)) = ${formatValue(dynamicViscosityPaS)} Pa·s\nν = μ / ρ = ${formatValue(dynamicViscosityPaS)} / ${formatValue(waterDensity)} = ${formatValue(kinematicViscosityM2S)} m²/s`;
    setCalculation(calcString);
  };

  const clearAll = () => {
    setTemperature('');
    setTemperatureUnit('°C');
    setDynamicViscosityUnit('Pa·s');
    setKinematicViscosityUnit('m²/s');
    setDynamicViscosity(null);
    setKinematicViscosity(null);
    setDensity(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Water Viscosity Calculator</h2>
        <p className="text-gray-600">Calculate dynamic and kinematic viscosity of water based on temperature</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formulas:</p>
          <p className="font-mono text-lg font-bold text-gray-800">μ = A × 10^(B/(T - C))</p>
          <p className="font-mono text-sm font-bold text-gray-800 mt-1">ν = μ / ρ</p>
          <p className="text-xs text-gray-500 mt-1">
            Where: μ = dynamic viscosity, ν = kinematic viscosity, T = temperature (K), ρ = density, A = 2.414×10⁻⁵, B = 247.8 K, C = 140 K
          </p>
        </div>

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

        {/* Dynamic Viscosity Unit Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Dynamic Viscosity Unit
          </label>
          <select
            value={dynamicViscosityUnit}
            onChange={(e) => setDynamicViscosityUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
          >
            {Object.entries(viscosityUnits).map(([key, unit]) => (
              <option key={key} value={key}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>

        {/* Kinematic Viscosity Unit Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Kinematic Viscosity Unit
          </label>
          <select
            value={kinematicViscosityUnit}
            onChange={(e) => setKinematicViscosityUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
          >
            {Object.entries(kinematicViscosityUnits).map(([key, unit]) => (
              <option key={key} value={key}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <Button onClick={calculateViscosity} className="flex-1">
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

        {(dynamicViscosity !== null || kinematicViscosity !== null) && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg">
              <h3 className="text-lg font-semibold text-[#820ECC] mb-3">Results</h3>
              
              {density !== null && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Water Density</p>
                  <p className="text-xl font-bold text-[#820ECC]">
                    {formatValue(density)} kg/m³
                  </p>
                </div>
              )}

              {dynamicViscosity !== null && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Dynamic Viscosity (μ)</p>
                  <p className="text-xl font-bold text-[#820ECC]">
                    {formatValue(dynamicViscosity)} {dynamicViscosityUnit}
                  </p>
                </div>
              )}

              {kinematicViscosity !== null && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Kinematic Viscosity (ν)</p>
                  <p className="text-xl font-bold text-[#820ECC]">
                    {formatValue(kinematicViscosity)} {kinematicViscosityUnit}
                  </p>
                </div>
              )}

              {calculation && (
                <div className="mt-4 pt-4 border-t border-[#820ECC]/30">
                  <p className="text-xs text-gray-600 mb-2 font-semibold">Calculation Steps:</p>
                  <p className="text-sm text-[#820ECC]/80 font-mono whitespace-pre-line break-words">
                    {calculation}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Enter the temperature of water</li>
            <li>• Select your preferred temperature unit (°C, °F, or K)</li>
            <li>• Choose output units for dynamic and kinematic viscosity</li>
            <li>• Click Calculate to get viscosity values</li>
            <li>• Formula: μ = 2.414×10⁻⁵ × 10^(247.8/(T - 140)) where T is in Kelvin</li>
            <li>• Kinematic viscosity: ν = μ / ρ where ρ is water density</li>
            <li>• Accurate for temperatures between 0°C and 100°C</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

