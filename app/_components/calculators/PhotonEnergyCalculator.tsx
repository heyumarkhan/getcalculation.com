'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Constants
const PLANCK_CONSTANT = 6.62607015e-34; // J·s
const SPEED_OF_LIGHT = 2.99792458e8; // m/s
const PLANCK_CONSTANT_EV = 4.135667696e-15; // eV·s
const SPEED_OF_LIGHT_NM = 2.99792458e17; // nm/s (for wavelength in nm)

// Unit conversion factors
const energyUnits = {
  'J': { name: 'J (Joules)', factor: 1 },
  'eV': { name: 'eV (Electron volts)', factor: 1.602176634e-19 },
  'kJ': { name: 'kJ (Kilojoules)', factor: 1000 },
  'meV': { name: 'meV (Millielectron volts)', factor: 1.602176634e-22 },
  'keV': { name: 'keV (Kiloelectron volts)', factor: 1.602176634e-16 },
  'MeV': { name: 'MeV (Megaelectron volts)', factor: 1.602176634e-13 }
};

const frequencyUnits = {
  'Hz': { name: 'Hz (Hertz)', factor: 1 },
  'kHz': { name: 'kHz (Kilohertz)', factor: 1000 },
  'MHz': { name: 'MHz (Megahertz)', factor: 1000000 },
  'GHz': { name: 'GHz (Gigahertz)', factor: 1000000000 },
  'THz': { name: 'THz (Terahertz)', factor: 1000000000000 }
};

const wavelengthUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'μm': { name: 'μm (Micrometers)', factor: 0.000001 },
  'nm': { name: 'nm (Nanometers)', factor: 0.000000001 },
  'Å': { name: 'Å (Angstroms)', factor: 0.0000000001 }
};

type CalculationMode = 'frequency' | 'wavelength';

export default function PhotonEnergyCalculator() {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('frequency');
  const [photonEnergy, setPhotonEnergy] = useState('');
  const [frequency, setFrequency] = useState('');
  const [wavelength, setWavelength] = useState('');
  const [energyUnit, setEnergyUnit] = useState('eV');
  const [frequencyUnit, setFrequencyUnit] = useState('Hz');
  const [wavelengthUnit, setWavelengthUnit] = useState('nm');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'energy' | 'frequency' | 'wavelength' } | null>(null);
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

  const convertToBase = (value: number, unit: string, type: 'energy' | 'frequency' | 'wavelength') => {
    if (type === 'energy') return value * energyUnits[unit as keyof typeof energyUnits].factor;
    if (type === 'frequency') return value * frequencyUnits[unit as keyof typeof frequencyUnits].factor;
    if (type === 'wavelength') return value * wavelengthUnits[unit as keyof typeof wavelengthUnits].factor;
    return value;
  };

  const convertFromBase = (value: number, unit: string, type: 'energy' | 'frequency' | 'wavelength') => {
    if (type === 'energy') return value / energyUnits[unit as keyof typeof energyUnits].factor;
    if (type === 'frequency') return value / frequencyUnits[unit as keyof typeof frequencyUnits].factor;
    if (type === 'wavelength') return value / wavelengthUnits[unit as keyof typeof wavelengthUnits].factor;
    return value;
  };

  const calculate = () => {
    if (calculationMode === 'frequency') {
      const E = photonEnergy ? parseFloat(photonEnergy) : NaN;
      const f = frequency ? parseFloat(frequency) : NaN;

      const filledCount = [photonEnergy, frequency].filter(val => val !== '').length;

      if (filledCount !== 1) {
        setResult(null);
        setCalculation('Error: Please enter either photon energy or frequency (leave one empty to calculate)');
        return;
      }

      if (photonEnergy && (isNaN(E) || E <= 0)) {
        setResult(null);
        setCalculation('Error: Photon energy must be a positive number');
        return;
      }
      if (frequency && (isNaN(f) || f <= 0)) {
        setResult(null);
        setCalculation('Error: Frequency must be a positive number');
        return;
      }

      // Convert to base units
      const EBase = photonEnergy ? convertToBase(E, energyUnit, 'energy') : 0;
      const fBase = frequency ? convertToBase(f, frequencyUnit, 'frequency') : 0;

      if (!photonEnergy) {
        // Calculate energy: E = hf
        const ECalculated = PLANCK_CONSTANT * fBase;
        const EResult = convertFromBase(ECalculated, energyUnit, 'energy');
        setResult({ value: EResult, unit: energyUnit, type: 'energy' });
        setCalculation(`E = hf = (6.626 × 10⁻³⁴ J·s) × ${formatValue(f)} ${frequencyUnit} = ${formatValue(EResult)} ${energyUnit}`);
      } else if (!frequency) {
        // Calculate frequency: f = E/h
        const fCalculated = EBase / PLANCK_CONSTANT;
        const fResult = convertFromBase(fCalculated, frequencyUnit, 'frequency');
        setResult({ value: fResult, unit: frequencyUnit, type: 'frequency' });
        setCalculation(`f = E/h = ${formatValue(E)} ${energyUnit} / (6.626 × 10⁻³⁴ J·s) = ${formatValue(fResult)} ${frequencyUnit}`);
      }
    } else if (calculationMode === 'wavelength') {
      const E = photonEnergy ? parseFloat(photonEnergy) : NaN;
      const λ = wavelength ? parseFloat(wavelength) : NaN;

      const filledCount = [photonEnergy, wavelength].filter(val => val !== '').length;

      if (filledCount !== 1) {
        setResult(null);
        setCalculation('Error: Please enter either photon energy or wavelength (leave one empty to calculate)');
        return;
      }

      if (photonEnergy && (isNaN(E) || E <= 0)) {
        setResult(null);
        setCalculation('Error: Photon energy must be a positive number');
        return;
      }
      if (wavelength && (isNaN(λ) || λ <= 0)) {
        setResult(null);
        setCalculation('Error: Wavelength must be a positive number');
        return;
      }

      // Convert to base units
      const EBase = photonEnergy ? convertToBase(E, energyUnit, 'energy') : 0;
      const λBase = wavelength ? convertToBase(λ, wavelengthUnit, 'wavelength') : 0;

      if (!photonEnergy) {
        // Calculate energy: E = hc/λ
        if (λBase === 0) {
          setResult(null);
          setCalculation('Error: Wavelength cannot be zero');
          return;
        }
        const ECalculated = (PLANCK_CONSTANT * SPEED_OF_LIGHT) / λBase;
        const EResult = convertFromBase(ECalculated, energyUnit, 'energy');
        setResult({ value: EResult, unit: energyUnit, type: 'energy' });
        setCalculation(`E = hc/λ = (6.626 × 10⁻³⁴ J·s × 2.998 × 10⁸ m/s) / ${formatValue(λ)} ${wavelengthUnit} = ${formatValue(EResult)} ${energyUnit}`);
      } else if (!wavelength) {
        // Calculate wavelength: λ = hc/E
        if (EBase === 0) {
          setResult(null);
          setCalculation('Error: Photon energy cannot be zero');
          return;
        }
        const λCalculated = (PLANCK_CONSTANT * SPEED_OF_LIGHT) / EBase;
        const λResult = convertFromBase(λCalculated, wavelengthUnit, 'wavelength');
        setResult({ value: λResult, unit: wavelengthUnit, type: 'wavelength' });
        setCalculation(`λ = hc/E = (6.626 × 10⁻³⁴ J·s × 2.998 × 10⁸ m/s) / ${formatValue(E)} ${energyUnit} = ${formatValue(λResult)} ${wavelengthUnit}`);
      }
    }
  };

  const clearAll = () => {
    setPhotonEnergy('');
    setFrequency('');
    setWavelength('');
    setEnergyUnit('eV');
    setFrequencyUnit('Hz');
    setWavelengthUnit('nm');
    setResult(null);
    setCalculation('');
  };

  const handleModeChange = (mode: CalculationMode) => {
    setCalculationMode(mode);
    clearAll();
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Photon Energy Calculator</h2>
        <p className="text-gray-600">Calculate photon energy from frequency or wavelength using E = hf or E = hc/λ</p>
      </div>

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Mode
          </label>
          <select
            value={calculationMode}
            onChange={(e) => handleModeChange(e.target.value as CalculationMode)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="frequency">From Frequency (E = hf)</option>
            <option value="wavelength">From Wavelength (E = hc/λ)</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">
            {calculationMode === 'frequency' && 'E = hf'}
            {calculationMode === 'wavelength' && 'E = hc / λ'}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Where: E = photon energy, h = Planck&apos;s constant (6.626 × 10⁻³⁴ J·s), 
            {calculationMode === 'frequency' ? ' f = frequency' : ' c = speed of light (2.998 × 10⁸ m/s), λ = wavelength'}
          </p>
        </div>

        {/* Frequency Mode Inputs */}
        {calculationMode === 'frequency' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Photon Energy (E)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter photon energy (leave empty to calculate)"
                    value={photonEnergy}
                    onChange={(e) => setPhotonEnergy(e.target.value)}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Frequency (f)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter frequency (leave empty to calculate)"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full"
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
          </>
        )}

        {/* Wavelength Mode Inputs */}
        {calculationMode === 'wavelength' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Photon Energy (E)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter photon energy (leave empty to calculate)"
                    value={photonEnergy}
                    onChange={(e) => setPhotonEnergy(e.target.value)}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Wavelength (λ)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter wavelength (leave empty to calculate)"
                    value={wavelength}
                    onChange={(e) => setWavelength(e.target.value)}
                    className="w-full"
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
          </>
        )}

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
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">Result</h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <p className="text-sm text-[#820ECC]/80 mt-2 font-mono break-words">
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
            {calculationMode === 'frequency' ? (
              <>
                <li>• Enter either photon energy or frequency to calculate the other</li>
                <li>• Formula: E = hf (Photon Energy = Planck&apos;s Constant × Frequency)</li>
                <li>• Leave the value you want to calculate empty</li>
              </>
            ) : (
              <>
                <li>• Enter either photon energy or wavelength to calculate the other</li>
                <li>• Formula: E = hc/λ (Photon Energy = (Planck&apos;s Constant × Speed of Light) / Wavelength)</li>
                <li>• Leave the value you want to calculate empty</li>
              </>
            )}
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• All input values should be valid positive numbers</li>
            <li>• Common values: Visible light (400-700 nm), UV (10-400 nm), X-rays (0.01-10 nm), Gamma rays (&lt;0.01 nm)</li>
            <li>• Planck&apos;s constant: h = 6.626 × 10⁻³⁴ J·s</li>
            <li>• Speed of light: c = 2.998 × 10⁸ m/s</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

