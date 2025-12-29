'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Wien's displacement constant (m·K)
const WIEN_CONSTANT = 2.897771955e-3;

// Preset objects with temperature (K) and peak wavelength (m)
const presetObjects = {
  'sun': { name: 'Sun', temperature: 5778, peakWavelength: 5.01e-7 },
  'incandescent': { name: 'Incandescent Bulb', temperature: 2800, peakWavelength: 1.03e-6 },
  'candle': { name: 'Candle Flame', temperature: 1800, peakWavelength: 1.61e-6 },
  'red_hot': { name: 'Red Hot Iron', temperature: 1000, peakWavelength: 2.90e-6 },
  'room_temp': { name: 'Room Temperature (20°C)', temperature: 293.15, peakWavelength: 9.88e-6 },
  'cosmic_microwave': { name: 'Cosmic Microwave Background', temperature: 2.725, peakWavelength: 1.06e-3 }
};

// Unit conversion factors
const wavelengthUnits = {
  'm': { name: 'Meters (m)', factor: 1 },
  'cm': { name: 'Centimeters (cm)', factor: 0.01 },
  'mm': { name: 'Millimeters (mm)', factor: 0.001 },
  'μm': { name: 'Micrometers (μm)', factor: 1e-6 },
  'nm': { name: 'Nanometers (nm)', factor: 1e-9 },
  'Å': { name: 'Angstroms (Å)', factor: 1e-10 }
};

const temperatureUnits = {
  'K': { name: 'Kelvin (K)', factor: 1 },
  'C': { name: 'Celsius (°C)', factor: 1, offset: 273.15, toKelvin: (t: number) => t + 273.15 },
  'F': { name: 'Fahrenheit (°F)', factor: 1, offset: 0, toKelvin: (t: number) => (t - 32) * 5/9 + 273.15 }
};

interface WiensLawCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function WiensLawCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: WiensLawCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'wavelength' | 'temperature'>('wavelength');
  const [temperature, setTemperature] = useState('');
  const [peakWavelength, setPeakWavelength] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState('K');
  const [wavelengthUnit, setWavelengthUnit] = useState('nm');
  const [selectedObject, setSelectedObject] = useState<string>('');
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

  const convertToBaseUnits = (value: number, unit: string, type: 'wavelength' | 'temperature') => {
    if (type === 'wavelength') {
      return value * wavelengthUnits[unit as keyof typeof wavelengthUnits].factor;
    } else {
      const unitData = temperatureUnits[unit as keyof typeof temperatureUnits];
      if ('toKelvin' in unitData) {
        return unitData.toKelvin(value);
      }
      return value * unitData.factor;
    }
  };

  const convertFromBaseUnits = (value: number, unit: string, type: 'wavelength' | 'temperature') => {
    if (type === 'wavelength') {
      return value / wavelengthUnits[unit as keyof typeof wavelengthUnits].factor;
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

  const calculateWavelength = () => {
    const t = parseFloat(temperature);

    if (isNaN(t) || t <= 0) {
      setResult(null);
      setCalculation('Please enter a valid positive temperature value.');
      return;
    }

    // Convert to base units (K)
    const tempInK = convertToBaseUnits(t, temperatureUnit, 'temperature');

    // Calculate peak wavelength: λ_max = b / T
    const wavelengthInM = WIEN_CONSTANT / tempInK;
    const wavelengthInUnit = convertFromBaseUnits(wavelengthInM, wavelengthUnit, 'wavelength');

    setResult({
      value: wavelengthInUnit,
      unit: wavelengthUnit,
      variable: 'Peak Wavelength'
    });

    // Build calculation string
    let calcStr = `λ_max = b / T\n`;
    calcStr += `λ_max = ${WIEN_CONSTANT.toExponential()} m·K / ${formatValue(tempInK)} K\n`;
    calcStr += `λ_max = ${formatValue(wavelengthInM)} m = ${formatValue(wavelengthInUnit)} ${wavelengthUnit}`;

    setCalculation(calcStr);
  };

  const calculateTemperature = () => {
    const lambda = parseFloat(peakWavelength);

    if (isNaN(lambda) || lambda <= 0) {
      setResult(null);
      setCalculation('Please enter a valid positive wavelength value.');
      return;
    }

    // Convert to base units (m)
    const wavelengthInM = convertToBaseUnits(lambda, wavelengthUnit, 'wavelength');

    // Calculate temperature: T = b / λ_max
    const tempInK = WIEN_CONSTANT / wavelengthInM;
    const tempInUnit = convertFromBaseUnits(tempInK, temperatureUnit, 'temperature');

    setResult({
      value: tempInUnit,
      unit: temperatureUnit,
      variable: 'Temperature'
    });

    // Build calculation string
    let calcStr = `T = b / λ_max\n`;
    calcStr += `T = ${WIEN_CONSTANT.toExponential()} m·K / ${formatValue(wavelengthInM)} m\n`;
    calcStr += `T = ${formatValue(tempInK)} K = ${formatValue(tempInUnit)} ${temperatureUnit}`;

    setCalculation(calcStr);
  };

  const handlePresetSelect = (objectKey: string) => {
    const obj = presetObjects[objectKey as keyof typeof presetObjects];
    if (obj) {
      setSelectedObject(objectKey);
      setTemperature(obj.temperature.toString());
      setPeakWavelength(obj.peakWavelength.toString());
      setTemperatureUnit('K');
      setWavelengthUnit('m');
    }
  };

  const calculate = () => {
    switch (calculationType) {
      case 'wavelength':
        calculateWavelength();
        break;
      case 'temperature':
        calculateTemperature();
        break;
    }
  };

  const clearAll = () => {
    setCalculationType('wavelength');
    setTemperature('');
    setPeakWavelength('');
    setTemperatureUnit('K');
    setWavelengthUnit('nm');
    setSelectedObject('');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Wien&apos;s Law Calculator</h2>
            <p className="text-gray-600">Calculate peak wavelength or temperature using λ_max × T = b</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="presetObject" className="block text-sm font-medium text-gray-700 mb-3">
              Preset Objects (Optional)
            </label>
            <select
              id="presetObject"
              value={selectedObject}
              onChange={(e) => {
                if (e.target.value) {
                  handlePresetSelect(e.target.value);
                } else {
                  setSelectedObject('');
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select an object...</option>
              {Object.entries(presetObjects).map(([key, obj]) => (
                <option key={key} value={key}>
                  {obj.name}
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
              onChange={(e) => setCalculationType(e.target.value as 'wavelength' | 'temperature')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="wavelength">Peak Wavelength (λ_max)</option>
              <option value="temperature">Temperature (T)</option>
            </select>
          </div>

          {calculationType === 'wavelength' && (
            <>
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

              <div>
                <label htmlFor="wavelengthUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Result Wavelength Unit
                </label>
                <select
                  id="wavelengthUnit"
                  value={wavelengthUnit}
                  onChange={(e) => setWavelengthUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(wavelengthUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {calculationType === 'temperature' && (
            <>
              <div>
                <label htmlFor="peakWavelength" className="block text-sm font-medium text-gray-700 mb-3">
                  Peak Wavelength (λ_max)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="peakWavelength"
                      type="number"
                      placeholder="Enter peak wavelength"
                      value={peakWavelength}
                      onChange={(e) => setPeakWavelength(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={wavelengthUnit}
                      onChange={(e) => setWavelengthUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(wavelengthUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="temperatureUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Result Temperature Unit
                </label>
                <select
                  id="temperatureUnit"
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
              <li>• Select a preset object (optional) or enter values manually</li>
              <li>• Choose what to calculate: Peak Wavelength or Temperature</li>
              <li>• Enter the required value based on your selection</li>
              <li>• Select appropriate units for temperature and wavelength</li>
              <li>• Click &quot;Calculate&quot; to get the result with step-by-step calculations</li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}

