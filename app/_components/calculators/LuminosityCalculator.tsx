'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Stefan-Boltzmann constant (W/(m²·K⁴))
const STEFAN_BOLTZMANN = 5.670374419e-8;

// Preset stars with luminosity (W), radius (m), and temperature (K)
const presetStars = {
  'sun': { name: 'Sun', luminosity: 3.828e26, radius: 6.957e8, temperature: 5778 },
  'sirius': { name: 'Sirius A', luminosity: 9.8e27, radius: 1.19e9, temperature: 9940 },
  'vega': { name: 'Vega', luminosity: 3.7e27, radius: 1.6e9, temperature: 9602 },
  'betelgeuse': { name: 'Betelgeuse', luminosity: 1.26e31, radius: 6.17e11, temperature: 3600 },
  'rigel': { name: 'Rigel', luminosity: 1.2e32, radius: 7.8e10, temperature: 12100 },
  'proxima': { name: 'Proxima Centauri', luminosity: 1.7e23, radius: 1.07e8, temperature: 3042 }
};

// Unit conversion factors
const luminosityUnits = {
  'W': { name: 'Watts (W)', factor: 1 },
  'kW': { name: 'Kilowatts (kW)', factor: 1000 },
  'MW': { name: 'Megawatts (MW)', factor: 1e6 },
  'GW': { name: 'Gigawatts (GW)', factor: 1e9 },
  'TW': { name: 'Terawatts (TW)', factor: 1e12 },
  'L_sun': { name: 'Solar Luminosities (L☉)', factor: 3.828e26 }
};

const radiusUnits = {
  'm': { name: 'Meters (m)', factor: 1 },
  'km': { name: 'Kilometers (km)', factor: 1000 },
  'R_sun': { name: 'Solar Radii (R☉)', factor: 6.957e8 },
  'AU': { name: 'Astronomical Units (AU)', factor: 1.496e11 },
  'ly': { name: 'Light-years (ly)', factor: 9.461e15 }
};

const temperatureUnits = {
  'K': { name: 'Kelvin (K)', factor: 1 },
  'C': { name: 'Celsius (°C)', factor: 1, offset: 273.15, toKelvin: (t: number) => t + 273.15 },
  'F': { name: 'Fahrenheit (°F)', factor: 1, offset: 0, toKelvin: (t: number) => (t - 32) * 5/9 + 273.15 }
};

interface LuminosityCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function LuminosityCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: LuminosityCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'luminosity' | 'radius' | 'temperature'>('luminosity');
  const [luminosity, setLuminosity] = useState('');
  const [radius, setRadius] = useState('');
  const [temperature, setTemperature] = useState('');
  const [luminosityUnit, setLuminosityUnit] = useState('W');
  const [radiusUnit, setRadiusUnit] = useState('m');
  const [temperatureUnit, setTemperatureUnit] = useState('K');
  const [selectedStar, setSelectedStar] = useState<string>('');
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

  const convertToBaseUnits = (value: number, unit: string, type: 'luminosity' | 'radius' | 'temperature') => {
    if (type === 'luminosity') {
      return value * luminosityUnits[unit as keyof typeof luminosityUnits].factor;
    } else if (type === 'radius') {
      return value * radiusUnits[unit as keyof typeof radiusUnits].factor;
    } else {
      const unitData = temperatureUnits[unit as keyof typeof temperatureUnits];
      if ('toKelvin' in unitData) {
        return unitData.toKelvin(value);
      }
      return value * unitData.factor;
    }
  };

  const convertFromBaseUnits = (value: number, unit: string, type: 'luminosity' | 'radius' | 'temperature') => {
    if (type === 'luminosity') {
      return value / luminosityUnits[unit as keyof typeof luminosityUnits].factor;
    } else if (type === 'radius') {
      return value / radiusUnits[unit as keyof typeof radiusUnits].factor;
    } else {
      const unitData = temperatureUnits[unit as keyof typeof temperatureUnits];
      if (unit === 'C') {
        return value - 273.15;
      } else if (unit === 'F') {
        return (value - 273.15) * 9/5 + 32;
      }
      return value / unitData.factor;
    }
  };

  const calculateLuminosity = () => {
    const r = parseFloat(radius);
    const t = parseFloat(temperature);

    if (isNaN(r) || isNaN(t) || r <= 0 || t <= 0) {
      setResult(null);
      setCalculation('Please enter valid positive numerical values for radius and temperature.');
      return;
    }

    // Convert to base units (m, K)
    const radiusInM = convertToBaseUnits(r, radiusUnit, 'radius');
    const tempInK = convertToBaseUnits(t, temperatureUnit, 'temperature');

    // Calculate luminosity: L = 4πR²σT⁴
    const surfaceArea = 4 * Math.PI * Math.pow(radiusInM, 2);
    const luminosityInW = surfaceArea * STEFAN_BOLTZMANN * Math.pow(tempInK, 4);
    const luminosityInUnit = convertFromBaseUnits(luminosityInW, luminosityUnit, 'luminosity');

    setResult({
      value: luminosityInUnit,
      unit: luminosityUnit,
      variable: 'Luminosity'
    });

    // Build calculation string
    let calcStr = `L = 4πR²σT⁴\n`;
    calcStr += `L = 4π × (${formatValue(radiusInM)} m)² × ${STEFAN_BOLTZMANN.toExponential()} W/(m²·K⁴) × (${formatValue(tempInK)} K)⁴\n`;
    calcStr += `L = 4π × ${formatValue(Math.pow(radiusInM, 2))} m² × ${STEFAN_BOLTZMANN.toExponential()} W/(m²·K⁴) × ${formatValue(Math.pow(tempInK, 4))} K⁴\n`;
    calcStr += `L = ${formatValue(surfaceArea)} m² × ${STEFAN_BOLTZMANN.toExponential()} W/(m²·K⁴) × ${formatValue(Math.pow(tempInK, 4))} K⁴\n`;
    calcStr += `L = ${formatValue(luminosityInW)} W = ${formatValue(luminosityInUnit)} ${luminosityUnit}`;

    setCalculation(calcStr);
  };

  const calculateRadius = () => {
    const l = parseFloat(luminosity);
    const t = parseFloat(temperature);

    if (isNaN(l) || isNaN(t) || l <= 0 || t <= 0) {
      setResult(null);
      setCalculation('Please enter valid positive numerical values for luminosity and temperature.');
      return;
    }

    // Convert to base units (W, K)
    const luminosityInW = convertToBaseUnits(l, luminosityUnit, 'luminosity');
    const tempInK = convertToBaseUnits(t, temperatureUnit, 'temperature');

    // Calculate radius: R = √(L / (4πσT⁴))
    const denominator = 4 * Math.PI * STEFAN_BOLTZMANN * Math.pow(tempInK, 4);
    const radiusInM = Math.sqrt(luminosityInW / denominator);
    const radiusInUnit = convertFromBaseUnits(radiusInM, radiusUnit, 'radius');

    setResult({
      value: radiusInUnit,
      unit: radiusUnit,
      variable: 'Radius'
    });

    // Build calculation string
    let calcStr = `R = √(L / (4πσT⁴))\n`;
    calcStr += `R = √(${formatValue(luminosityInW)} W / (4π × ${STEFAN_BOLTZMANN.toExponential()} W/(m²·K⁴) × (${formatValue(tempInK)} K)⁴))\n`;
    calcStr += `R = √(${formatValue(luminosityInW)} W / (4π × ${STEFAN_BOLTZMANN.toExponential()} W/(m²·K⁴) × ${formatValue(Math.pow(tempInK, 4))} K⁴))\n`;
    calcStr += `R = √(${formatValue(luminosityInW)} W / ${formatValue(denominator)} W/m²)\n`;
    calcStr += `R = ${formatValue(radiusInM)} m = ${formatValue(radiusInUnit)} ${radiusUnit}`;

    setCalculation(calcStr);
  };

  const calculateTemperature = () => {
    const l = parseFloat(luminosity);
    const r = parseFloat(radius);

    if (isNaN(l) || isNaN(r) || l <= 0 || r <= 0) {
      setResult(null);
      setCalculation('Please enter valid positive numerical values for luminosity and radius.');
      return;
    }

    // Convert to base units (W, m)
    const luminosityInW = convertToBaseUnits(l, luminosityUnit, 'luminosity');
    const radiusInM = convertToBaseUnits(r, radiusUnit, 'radius');

    // Calculate temperature: T = ⁴√(L / (4πR²σ))
    const surfaceArea = 4 * Math.PI * Math.pow(radiusInM, 2);
    const denominator = surfaceArea * STEFAN_BOLTZMANN;
    const tempInK = Math.pow(luminosityInW / denominator, 0.25);
    const tempInUnit = convertFromBaseUnits(tempInK, temperatureUnit, 'temperature');

    setResult({
      value: tempInUnit,
      unit: temperatureUnit,
      variable: 'Temperature'
    });

    // Build calculation string
    let calcStr = `T = ⁴√(L / (4πR²σ))\n`;
    calcStr += `T = ⁴√(${formatValue(luminosityInW)} W / (4π × (${formatValue(radiusInM)} m)² × ${STEFAN_BOLTZMANN.toExponential()} W/(m²·K⁴)))\n`;
    calcStr += `T = ⁴√(${formatValue(luminosityInW)} W / (4π × ${formatValue(Math.pow(radiusInM, 2))} m² × ${STEFAN_BOLTZMANN.toExponential()} W/(m²·K⁴)))\n`;
    calcStr += `T = ⁴√(${formatValue(luminosityInW)} W / ${formatValue(denominator)} W/K⁴)\n`;
    calcStr += `T = ${formatValue(tempInK)} K = ${formatValue(tempInUnit)} ${temperatureUnit}`;

    setCalculation(calcStr);
  };

  const handlePresetSelect = (starKey: string) => {
    const star = presetStars[starKey as keyof typeof presetStars];
    if (star) {
      setSelectedStar(starKey);
      setLuminosity(star.luminosity.toString());
      setRadius(star.radius.toString());
      setTemperature(star.temperature.toString());
      setLuminosityUnit('W');
      setRadiusUnit('m');
      setTemperatureUnit('K');
    }
  };

  const calculate = () => {
    switch (calculationType) {
      case 'luminosity':
        calculateLuminosity();
        break;
      case 'radius':
        calculateRadius();
        break;
      case 'temperature':
        calculateTemperature();
        break;
    }
  };

  const clearAll = () => {
    setCalculationType('luminosity');
    setLuminosity('');
    setRadius('');
    setTemperature('');
    setLuminosityUnit('W');
    setRadiusUnit('m');
    setTemperatureUnit('K');
    setSelectedStar('');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Luminosity Calculator</h2>
            <p className="text-gray-600">Calculate stellar luminosity using L = 4πR²σT⁴</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="presetStar" className="block text-sm font-medium text-gray-700 mb-3">
              Preset Stars (Optional)
            </label>
            <select
              id="presetStar"
              value={selectedStar}
              onChange={(e) => {
                if (e.target.value) {
                  handlePresetSelect(e.target.value);
                } else {
                  setSelectedStar('');
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select a star...</option>
              {Object.entries(presetStars).map(([key, star]) => (
                <option key={key} value={key}>
                  {star.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="calculationType" className="block text-sm font-medium text-gray-700 mb-3">
              Calculate
            </label>
            <select
              id="calculationType"
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value as 'luminosity' | 'radius' | 'temperature')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="luminosity">Luminosity (L)</option>
              <option value="radius">Radius (R)</option>
              <option value="temperature">Temperature (T)</option>
            </select>
          </div>

          {calculationType === 'luminosity' && (
            <>
              <div>
                <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-3">
                  Radius (R)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="radius"
                      type="number"
                      placeholder="Enter radius"
                      value={radius}
                      onChange={(e) => setRadius(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={radiusUnit}
                      onChange={(e) => setRadiusUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(radiusUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-3">
                  Temperature (T)
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
            </>
          )}

          {calculationType === 'radius' && (
            <>
              <div>
                <label htmlFor="luminosity" className="block text-sm font-medium text-gray-700 mb-3">
                  Luminosity (L)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="luminosity"
                      type="number"
                      placeholder="Enter luminosity"
                      value={luminosity}
                      onChange={(e) => setLuminosity(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={luminosityUnit}
                      onChange={(e) => setLuminosityUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(luminosityUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-3">
                  Temperature (T)
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
            </>
          )}

          {calculationType === 'temperature' && (
            <>
              <div>
                <label htmlFor="luminosity" className="block text-sm font-medium text-gray-700 mb-3">
                  Luminosity (L)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="luminosity"
                      type="number"
                      placeholder="Enter luminosity"
                      value={luminosity}
                      onChange={(e) => setLuminosity(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={luminosityUnit}
                      onChange={(e) => setLuminosityUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(luminosityUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-3">
                  Radius (R)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="radius"
                      type="number"
                      placeholder="Enter radius"
                      value={radius}
                      onChange={(e) => setRadius(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={radiusUnit}
                      onChange={(e) => setRadiusUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(radiusUnits).map(([key, unit]) => (
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
              <li>• Select a preset star (optional) or enter values manually</li>
              <li>• Choose what to calculate: Luminosity, Radius, or Temperature</li>
              <li>• Enter the required values based on your selection</li>
              <li>• Select appropriate units for each parameter</li>
              <li>• Click &quot;Calculate&quot; to get the result with step-by-step calculations</li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}

