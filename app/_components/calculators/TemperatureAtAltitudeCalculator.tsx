'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const temperatureUnits = {
  'C': { name: '°C (Celsius)', factor: 1, offset: 0 },
  'F': { name: '°F (Fahrenheit)', factor: 1.8, offset: 32 },
  'K': { name: 'K (Kelvin)', factor: 1, offset: 273.15 }
};

const altitudeUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 }
};

type CalculationMode = 'icao' | 'lapse-rate';

export default function TemperatureAtAltitudeCalculator() {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('icao');
  
  // ICAO Mode inputs
  const [altitude, setAltitude] = useState('');
  const [altitudeUnit, setAltitudeUnit] = useState<keyof typeof altitudeUnits>('m');
  const [temperatureUnit, setTemperatureUnit] = useState<keyof typeof temperatureUnits>('C');
  
  // Lapse Rate Mode inputs
  const [seaLevelTemp, setSeaLevelTemp] = useState('');
  const [lapseRate, setLapseRate] = useState('');
  const [lapseAltitude, setLapseAltitude] = useState('');
  const [lapseAltitudeUnit, setLapseAltitudeUnit] = useState<keyof typeof altitudeUnits>('m');
  const [lapseTemperatureUnit, setLapseTemperatureUnit] = useState<keyof typeof temperatureUnits>('C');
  
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
  const [calculation, setCalculation] = useState('');

  // ICAO Standard Atmosphere parameters
  // Temperature lapse rates for different altitude layers (°C/meter)
  const icaoLayers = [
    { baseAltitude: 0, topAltitude: 11000, lapseRate: -0.0065, baseTemp: 288.15 }, // Troposphere
    { baseAltitude: 11000, topAltitude: 20000, lapseRate: 0, baseTemp: 216.65 }, // Tropopause
    { baseAltitude: 20000, topAltitude: 32000, lapseRate: 0.001, baseTemp: 216.65 }, // Stratosphere
    { baseAltitude: 32000, topAltitude: 47000, lapseRate: 0.0028, baseTemp: 228.65 }, // Stratosphere
  ];

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 0.01 && value !== 0) {
      return value.toExponential(4);
    }
    return value.toFixed(2).replace(/\.?0+$/, '');
  };

  const convertAltitudeToBase = (value: number, unit: keyof typeof altitudeUnits) => {
    return value * altitudeUnits[unit].factor;
  };

  const convertTemperatureCelsius = (value: number, fromUnit: keyof typeof temperatureUnits, toUnit: keyof typeof temperatureUnits) => {
    if (fromUnit === toUnit) return value;
    
    // Convert to Celsius first
    let celsius = value;
    if (fromUnit === 'F') {
      celsius = (value - 32) / 1.8;
    } else if (fromUnit === 'K') {
      celsius = value - 273.15;
    }
    
    // Convert from Celsius to target unit
    if (toUnit === 'F') {
      return celsius * 1.8 + 32;
    } else if (toUnit === 'K') {
      return celsius + 273.15;
    }
    return celsius;
  };

  const calculateICOO = () => {
    const alt = altitude ? parseFloat(altitude) : NaN;
    
    if (isNaN(alt) || alt < 0) {
      setResult(null);
      setCalculation('Error: Please enter a valid non-negative altitude');
      return;
    }

    const altBase = convertAltitudeToBase(alt, altitudeUnit);

    // Ensure altitude is within reasonable bounds
    if (altBase > 50000) {
      setResult(null);
      setCalculation('Error: Altitude exceeds calculator range (max 50,000 m)');
      return;
    }

    // Find the appropriate layer
    let tempKelvin = 0;
    let layerInfo = '';

    for (const layer of icaoLayers) {
      if (altBase >= layer.baseAltitude && altBase < layer.topAltitude) {
        const altDiff = altBase - layer.baseAltitude;
        tempKelvin = layer.baseTemp + (layer.lapseRate * altDiff);
        
        if (layer.lapseRate === 0) {
          layerInfo = `Temperature layer: Tropopause/Stratosphere (constant at ${formatValue(layer.baseTemp - 273.15)}°C)`;
        } else {
          layerInfo = `Temperature layer: Altitude ${layer.baseAltitude}m - ${layer.topAltitude}m (lapse rate: ${layer.lapseRate * 1000} °C/km)`;
        }
        break;
      }
    }

    // If altitude exceeds defined layers
    if (tempKelvin === 0) {
      setResult(null);
      setCalculation('Error: Altitude exceeds calculator range');
      return;
    }

    // Convert to target temperature unit
    let tempResult = tempKelvin - 273.15; // Start with Celsius
    if (temperatureUnit === 'F') {
      tempResult = tempResult * 1.8 + 32;
    } else if (temperatureUnit === 'K') {
      tempResult = tempKelvin;
    }

    setResult({ value: tempResult, unit: temperatureUnit });
    setCalculation(`ICAO Standard Atmosphere: At ${formatValue(alt)} ${altitudeUnit}, T = ${formatValue(tempResult)}°${temperatureUnit} | ${layerInfo}`);
  };

  const calculateLapseRate = () => {
    const t0 = seaLevelTemp ? parseFloat(seaLevelTemp) : NaN;
    const l = lapseRate ? parseFloat(lapseRate) : NaN;
    const h = lapseAltitude ? parseFloat(lapseAltitude) : NaN;

    if (isNaN(t0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid sea level temperature');
      return;
    }

    if (isNaN(l)) {
      setResult(null);
      setCalculation('Error: Please enter a valid lapse rate');
      return;
    }

    if (isNaN(h) || h < 0) {
      setResult(null);
      setCalculation('Error: Please enter a valid non-negative altitude');
      return;
    }

    // Convert altitude to meters
    const altBase = convertAltitudeToBase(h, lapseAltitudeUnit);

    // Convert temperature to Celsius
    const t0Celsius = convertTemperatureCelsius(t0, lapseTemperatureUnit, 'C');

    // Calculate temperature at altitude: T = T0 - (L × h)
    // where L is lapse rate in °C/meter
    const lapseRatePerMeter = l / 1000; // Assuming input is in °C/km
    const tempCelsius = t0Celsius - (lapseRatePerMeter * altBase);

    // Convert to target temperature unit
    let tempResult = tempCelsius;
    if (lapseTemperatureUnit === 'F') {
      tempResult = tempCelsius * 1.8 + 32;
    } else if (lapseTemperatureUnit === 'K') {
      tempResult = tempCelsius + 273.15;
    }

    setResult({ value: tempResult, unit: lapseTemperatureUnit });
    setCalculation(`T = T₀ - (L × h) = ${formatValue(t0)}°${lapseTemperatureUnit} - (${formatValue(l)} °C/km × ${formatValue(h)} ${lapseAltitudeUnit}) = ${formatValue(tempResult)}°${lapseTemperatureUnit}`);
  };

  const handleCalculate = () => {
    if (calculationMode === 'icao') {
      calculateICOO();
    } else {
      calculateLapseRate();
    }
  };

  const clearAll = () => {
    setAltitude('');
    setSeaLevelTemp('');
    setLapseRate('');
    setLapseAltitude('');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Temperature at Altitude Calculator</h2>
        <p className="text-gray-600">Calculate temperature at any altitude using atmospheric models</p>
      </div>

      <div className="space-y-6">
        {/* Calculation Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Calculation Method
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mode"
                value="icao"
                checked={calculationMode === 'icao'}
                onChange={(e) => setCalculationMode(e.target.value as CalculationMode)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">ICAO Standard Atmosphere</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mode"
                value="lapse-rate"
                checked={calculationMode === 'lapse-rate'}
                onChange={(e) => setCalculationMode(e.target.value as CalculationMode)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Lapse Rate Method</span>
            </label>
          </div>
        </div>

        {calculationMode === 'icao' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Altitude
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter altitude"
                    value={altitude}
                    onChange={(e) => setAltitude(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-40">
                  <select
                    value={altitudeUnit}
                    onChange={(e) => setAltitudeUnit(e.target.value as keyof typeof altitudeUnits)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                  >
                    {Object.entries(altitudeUnits).map(([key, unit]) => (
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
                Temperature Unit
              </label>
              <select
                value={temperatureUnit}
                onChange={(e) => setTemperatureUnit(e.target.value as keyof typeof temperatureUnits)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(temperatureUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {calculationMode === 'lapse-rate' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Sea Level Temperature
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter temperature at sea level"
                    value={seaLevelTemp}
                    onChange={(e) => setSeaLevelTemp(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-40">
                  <select
                    value={lapseTemperatureUnit}
                    onChange={(e) => setLapseTemperatureUnit(e.target.value as keyof typeof temperatureUnits)}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Lapse Rate (°C per km)
              </label>
              <Input
                type="text"
                placeholder="Enter lapse rate (typically 6.5 °C/km)"
                value={lapseRate}
                onChange={(e) => setLapseRate(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Standard: 6.5 °C/km, Dry adiabatic: 9.8 °C/km, Moist: ~6 °C/km</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Altitude
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter altitude"
                    value={lapseAltitude}
                    onChange={(e) => setLapseAltitude(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={lapseAltitudeUnit}
                    onChange={(e) => setLapseAltitudeUnit(e.target.value as keyof typeof altitudeUnits)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                  >
                    {Object.entries(altitudeUnits).map(([key, unit]) => (
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
          <Button onClick={handleCalculate} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg">
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">Result</h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)}°{result.unit}
            </p>
            {calculation && (
              <p className="text-sm text-[#820ECC]/80 mt-2 font-mono">
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
            <li>• <strong>ICAO Method:</strong> Based on the International Civil Aviation Organization standard atmosphere model</li>
            <li>• <strong>Lapse Rate Method:</strong> Uses a constant temperature decrease rate with altitude</li>
            <li>• Enter altitude in your preferred unit (meters, kilometers, or feet)</li>
            <li>• Select temperature unit (Celsius, Fahrenheit, or Kelvin)</li>
            <li>• Results are calculated instantly with step-by-step formulas</li>
            <li>• ICAO model valid up to 47 km altitude</li>
            <li>• Lapse rate method works for any altitude, but accuracy depends on conditions</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
