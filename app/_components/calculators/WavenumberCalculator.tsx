'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors
const wavenumberUnits = {
  'm⁻¹': { name: 'm⁻¹ (per meter)', factor: 1 },
  'cm⁻¹': { name: 'cm⁻¹ (per centimeter)', factor: 100 },
  'nm⁻¹': { name: 'nm⁻¹ (per nanometer)', factor: 1e9 },
  'μm⁻¹': { name: 'μm⁻¹ (per micrometer)', factor: 1e6 }
};

const wavelengthUnits = {
  'm': { name: 'm (meters)', factor: 1 },
  'cm': { name: 'cm (centimeters)', factor: 0.01 },
  'mm': { name: 'mm (millimeters)', factor: 0.001 },
  'μm': { name: 'μm (micrometers)', factor: 1e-6 },
  'nm': { name: 'nm (nanometers)', factor: 1e-9 },
  'Å': { name: 'Å (angstroms)', factor: 1e-10 }
};

const frequencyUnits = {
  'Hz': { name: 'Hz (Hertz)', factor: 1 },
  'kHz': { name: 'kHz (Kilohertz)', factor: 1e3 },
  'MHz': { name: 'MHz (Megahertz)', factor: 1e6 },
  'GHz': { name: 'GHz (Gigahertz)', factor: 1e9 },
  'THz': { name: 'THz (Terahertz)', factor: 1e12 }
};

const energyUnits = {
  'J': { name: 'J (Joules)', factor: 1 },
  'eV': { name: 'eV (Electron volts)', factor: 1.602176634e-19 },
  'meV': { name: 'meV (Millielectron volts)', factor: 1.602176634e-22 },
  'keV': { name: 'keV (Kiloelectron volts)', factor: 1.602176634e-16 },
  'kcal/mol': { name: 'kcal/mol', factor: 6.947e-21 }
};

type CalculationMethod = 'wavelength' | 'frequency' | 'energy';

const SPEED_OF_LIGHT = 299792458; // m/s
const PLANCK_CONSTANT = 6.62607015e-34; // J·s

export default function WavenumberCalculator() {
  const [method, setMethod] = useState<CalculationMethod>('wavelength');
  
  // Wavelength method
  const [wavelength, setWavelength] = useState('');
  const [wavelengthUnit, setWavelengthUnit] = useState('nm');
  
  // Frequency method
  const [frequency, setFrequency] = useState('');
  const [frequencyUnit, setFrequencyUnit] = useState('THz');
  
  // Energy method
  const [energy, setEnergy] = useState('');
  const [energyUnit, setEnergyUnit] = useState('eV');
  
  const [wavenumberUnit, setWavenumberUnit] = useState('cm⁻¹');
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
  const [calculation, setCalculation] = useState('');

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

  const convertWavelengthToMeters = (value: number, unit: string) => {
    return value * wavelengthUnits[unit as keyof typeof wavelengthUnits].factor;
  };

  const convertFrequencyToHz = (value: number, unit: string) => {
    return value * frequencyUnits[unit as keyof typeof frequencyUnits].factor;
  };

  const convertEnergyToJoules = (value: number, unit: string) => {
    return value * energyUnits[unit as keyof typeof energyUnits].factor;
  };

  const convertWavenumberFromPerMeter = (value: number, unit: string) => {
    return value / wavenumberUnits[unit as keyof typeof wavenumberUnits].factor;
  };

  const calculate = () => {
    if (method === 'wavelength') {
      const λ = wavelength ? parseFloat(wavelength) : NaN;

      if (!wavelength) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(λ) || λ <= 0) {
        setResult(null);
        setCalculation('Error: Wavelength must be a positive number.');
        return;
      }

      // Calculate wavenumber: ν̃ = 1/λ
      const wavelengthInMeters = convertWavelengthToMeters(λ, wavelengthUnit);
      const wavenumberInPerMeter = 1 / wavelengthInMeters;
      const wavenumber = convertWavenumberFromPerMeter(wavenumberInPerMeter, wavenumberUnit);
      
      setResult({ value: wavenumber, unit: wavenumberUnit });
      setCalculation(`ν̃ = 1/λ = 1/${formatValue(λ)} ${wavelengthUnit} = ${formatValue(wavenumber)} ${wavenumberUnit}`);
    } else if (method === 'frequency') {
      const f = frequency ? parseFloat(frequency) : NaN;

      if (!frequency) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(f) || f <= 0) {
        setResult(null);
        setCalculation('Error: Frequency must be a positive number.');
        return;
      }

      // Calculate wavenumber: ν̃ = f/c
      const frequencyInHz = convertFrequencyToHz(f, frequencyUnit);
      const wavenumberInPerMeter = frequencyInHz / SPEED_OF_LIGHT;
      const wavenumber = convertWavenumberFromPerMeter(wavenumberInPerMeter, wavenumberUnit);
      
      setResult({ value: wavenumber, unit: wavenumberUnit });
      setCalculation(`ν̃ = f/c = ${formatValue(f)} ${frequencyUnit} / c = ${formatValue(wavenumber)} ${wavenumberUnit}`);
    } else if (method === 'energy') {
      const E = energy ? parseFloat(energy) : NaN;

      if (!energy) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(E) || E <= 0) {
        setResult(null);
        setCalculation('Error: Energy must be a positive number.');
        return;
      }

      // Calculate wavenumber: ν̃ = E/(hc)
      const energyInJoules = convertEnergyToJoules(E, energyUnit);
      const wavenumberInPerMeter = energyInJoules / (PLANCK_CONSTANT * SPEED_OF_LIGHT);
      const wavenumber = convertWavenumberFromPerMeter(wavenumberInPerMeter, wavenumberUnit);
      
      setResult({ value: wavenumber, unit: wavenumberUnit });
      setCalculation(`ν̃ = E/(hc) = ${formatValue(E)} ${energyUnit} / (hc) = ${formatValue(wavenumber)} ${wavenumberUnit}`);
    }
  };

  const clearAll = () => {
    setWavelength('');
    setFrequency('');
    setEnergy('');
    setWavenumberUnit('cm⁻¹');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Wavenumber Calculator</h2>
        <p className="text-gray-600">Calculate wavenumber from wavelength, frequency, or energy</p>
      </div>

      <div className="space-y-6">
        {/* Method Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Calculation Method
          </label>
          <select
            value={method}
            onChange={(e) => {
              setMethod(e.target.value as CalculationMethod);
              clearAll();
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="wavelength">From Wavelength (ν̃ = 1/λ)</option>
            <option value="frequency">From Frequency (ν̃ = f/c)</option>
            <option value="energy">From Energy (ν̃ = E/hc)</option>
          </select>
        </div>

        {/* Wavelength Method */}
        {method === 'wavelength' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Wavelength (λ)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter wavelength"
                  value={wavelength}
                  onChange={(e) => setWavelength(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="w-40">
                <select
                  value={wavelengthUnit}
                  onChange={(e) => setWavelengthUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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
        )}

        {/* Frequency Method */}
        {method === 'frequency' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Frequency (f)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="w-40">
                <select
                  value={frequencyUnit}
                  onChange={(e) => setFrequencyUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                >
                  {Object.entries(frequencyUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Energy Method */}
        {method === 'energy' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Energy (E)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter energy"
                  value={energy}
                  onChange={(e) => setEnergy(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="w-40">
                <select
                  value={energyUnit}
                  onChange={(e) => setEnergyUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                >
                  {Object.entries(energyUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Wavenumber Unit Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Wavenumber Unit (Result)
          </label>
          <select
            value={wavenumberUnit}
            onChange={(e) => setWavenumberUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            {Object.entries(wavenumberUnits).map(([key, unit]) => (
              <option key={key} value={key}>
                {unit.name}
              </option>
            ))}
          </select>
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
            {method === 'wavelength' && (
              <>
                <li>• Enter the wavelength of the electromagnetic radiation or wave</li>
                <li>• Formula: ν̃ = 1/λ (wavenumber is the reciprocal of wavelength)</li>
                <li>• Commonly used in spectroscopy and quantum mechanics</li>
              </>
            )}
            {method === 'frequency' && (
              <>
                <li>• Enter the frequency of the electromagnetic radiation</li>
                <li>• Formula: ν̃ = f/c (where c is the speed of light)</li>
                <li>• Useful for converting between frequency and wavenumber</li>
              </>
            )}
            {method === 'energy' && (
              <>
                <li>• Enter the photon energy of the electromagnetic radiation</li>
                <li>• Formula: ν̃ = E/(hc) (where h is Planck&apos;s constant, c is speed of light)</li>
                <li>• Common in spectroscopy and photochemistry</li>
              </>
            )}
            <li>• Select your preferred unit for wavenumber result</li>
            <li>• cm⁻¹ is the most common unit used in spectroscopy</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
