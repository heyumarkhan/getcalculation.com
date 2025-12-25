'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'energy' | 'wavelength';

interface WavelengthToEnergyCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Physical constants
const h = 6.62607015e-34; // Planck's constant in J·s
const c = 299792458; // Speed of light in m/s
const eV_to_J = 1.602176634e-19; // 1 eV = 1.602176634 × 10⁻¹⁹ J

// Unit conversion factors
const wavelengthUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'nm': { name: 'nm (Nanometers)', factor: 1e-9 },
  'μm': { name: 'μm (Micrometers)', factor: 1e-6 },
  'mm': { name: 'mm (Millimeters)', factor: 1e-3 },
  'cm': { name: 'cm (Centimeters)', factor: 1e-2 },
  'Å': { name: 'Å (Angstroms)', factor: 1e-10 }
};

const energyUnits = {
  'J': { name: 'J (Joules)', factor: 1 },
  'eV': { name: 'eV (Electronvolts)', factor: eV_to_J },
  'meV': { name: 'meV (Millielectronvolts)', factor: eV_to_J * 1e-3 },
  'keV': { name: 'keV (Kiloelectronvolts)', factor: eV_to_J * 1e3 },
  'MeV': { name: 'MeV (Megaelectronvolts)', factor: eV_to_J * 1e6 },
  'kJ/mol': { name: 'kJ/mol (Kilojoules per mole)', factor: 1 },
  'kcal/mol': { name: 'kcal/mol (Kilocalories per mole)', factor: 4184 },
  'cm⁻¹': { name: 'cm⁻¹ (Wavenumber)', factor: h * c * 100 } // E = hcν̃, where ν̃ is in cm⁻¹
};

export default function WavelengthToEnergyCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: WavelengthToEnergyCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('energy');
  const [wavelength, setWavelength] = useState('');
  const [energy, setEnergy] = useState('');
  const [wavelengthUnit, setWavelengthUnit] = useState('nm');
  const [energyUnit, setEnergyUnit] = useState('eV');
  const [result, setResult] = useState<{ value: number; unit: string; label: string } | null>(null);
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
    return value.toFixed(4).replace(/\.?0+$/, '');
  };

  const convertWavelengthToBase = (value: number, unit: string): number => {
    return value * wavelengthUnits[unit as keyof typeof wavelengthUnits].factor;
  };

  const convertWavelengthFromBase = (value: number, unit: string): number => {
    return value / wavelengthUnits[unit as keyof typeof wavelengthUnits].factor;
  };

  const convertEnergyToBase = (value: number, unit: string): number => {
    if (unit === 'kJ/mol') {
      // Convert kJ/mol to J/photon: (kJ/mol) * 1000 (J/kJ) / N_A (photons/mol) = J/photon
      const Na = 6.02214076e23; // Avogadro's number
      return (value * 1000) / Na;
    }
    if (unit === 'kcal/mol') {
      // Convert kcal/mol to J/photon: (kcal/mol) * 4184 (J/kcal) / N_A (photons/mol) = J/photon
      const Na = 6.02214076e23; // Avogadro's number
      return (value * 4184) / Na;
    }
    if (unit === 'cm⁻¹') {
      // Wavenumber: E = hcν̃, where ν̃ is in cm⁻¹
      return value * h * c * 100; // Convert cm⁻¹ to J
    }
    return value * energyUnits[unit as keyof typeof energyUnits].factor;
  };

  const convertEnergyFromBase = (value: number, unit: string): number => {
    if (unit === 'kJ/mol') {
      // Convert J/photon to kJ/mol: (J/photon) * N_A (photons/mol) / 1000 (J/kJ) = kJ/mol
      const Na = 6.02214076e23; // Avogadro's number
      return (value * Na) / 1000;
    }
    if (unit === 'kcal/mol') {
      // Convert J/photon to kcal/mol: (J/photon) * N_A (photons/mol) / 4184 (J/kcal) = kcal/mol
      const Na = 6.02214076e23; // Avogadro's number
      return (value * Na) / 4184;
    }
    if (unit === 'cm⁻¹') {
      // Wavenumber: E = hcν̃, so ν̃ = E/(hc)
      return value / (h * c * 100); // Convert J to cm⁻¹
    }
    return value / energyUnits[unit as keyof typeof energyUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const lambda = wavelength ? parseFloat(wavelength) : NaN;
    const E = energy ? parseFloat(energy) : NaN;

    if (calculationMode === 'energy') {
      // Calculate energy from wavelength: E = hc/λ
      if (!wavelength) {
        setError('Please enter wavelength');
        return;
      }

      if (isNaN(lambda) || lambda <= 0) {
        setError('Wavelength must be a valid positive number');
        return;
      }

      const lambdaBase = convertWavelengthToBase(lambda, wavelengthUnit); // in meters
      const EBase = (h * c) / lambdaBase; // Energy in Joules
      const EResult = convertEnergyFromBase(EBase, energyUnit);

      setResult({ value: EResult, unit: energyUnit, label: 'Energy' });
      setCalculation(`Energy (E) = (Planck's constant × Speed of light) / Wavelength\nE = hc / λ\nh = ${h.toExponential(4)} J·s\nc = ${c.toExponential(4)} m/s\nλ = ${formatValue(lambda)} ${wavelengthUnit} = ${formatValue(lambdaBase)} m\nE = (${h.toExponential(4)} J·s × ${c.toExponential(4)} m/s) / ${formatValue(lambdaBase)} m\nE = ${formatValue(EBase)} J = ${formatValue(EResult)} ${energyUnit}`);
    } else if (calculationMode === 'wavelength') {
      // Calculate wavelength from energy: λ = hc/E
      if (!energy) {
        setError('Please enter energy');
        return;
      }

      if (isNaN(E) || E <= 0) {
        setError('Energy must be a valid positive number');
        return;
      }

      const EBase = convertEnergyToBase(E, energyUnit); // in Joules
      const lambdaBase = (h * c) / EBase; // Wavelength in meters
      const lambdaResult = convertWavelengthFromBase(lambdaBase, wavelengthUnit);

      setResult({ value: lambdaResult, unit: wavelengthUnit, label: 'Wavelength' });
      setCalculation(`Wavelength (λ) = (Planck's constant × Speed of light) / Energy\nλ = hc / E\nh = ${h.toExponential(4)} J·s\nc = ${c.toExponential(4)} m/s\nE = ${formatValue(E)} ${energyUnit} = ${formatValue(EBase)} J\nλ = (${h.toExponential(4)} J·s × ${c.toExponential(4)} m/s) / ${formatValue(EBase)} J\nλ = ${formatValue(lambdaBase)} m = ${formatValue(lambdaResult)} ${wavelengthUnit}`);
    }
  };

  const clearAll = () => {
    setWavelength('');
    setEnergy('');
    setWavelengthUnit('nm');
    setEnergyUnit('eV');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Wavelength to Energy Calculator</h2>
          <p className="text-gray-600">Convert between photon wavelength and energy using E = hc/λ</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculate
          </label>
          <select
            value={calculationMode}
            onChange={(e) => {
              setCalculationMode(e.target.value as CalculationMode);
              clearAll();
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="energy">Energy from Wavelength</option>
            <option value="wavelength">Wavelength from Energy</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            E = hc / λ
          </p>
          <p className="text-xs text-gray-600 mt-1">Where: E = Energy, h = Planck's constant (6.62607015 × 10⁻³⁴ J·s), c = Speed of light (299,792,458 m/s), λ = Wavelength</p>
        </div>

        {/* Wavelength Input */}
        {calculationMode === 'energy' && (
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
              <div className="w-32">
                <select
                  value={wavelengthUnit}
                  onChange={(e) => setWavelengthUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        {/* Energy Input */}
        {calculationMode === 'wavelength' && (
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(energyUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Note: kJ/mol and kcal/mol are per-mole units; the calculator converts to per-photon values for calculation.
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
            {calculationMode === 'energy' && (
              <>
                <li>• Enter the wavelength of the photon</li>
                <li>• Select the appropriate wavelength unit (nm is common for visible light)</li>
                <li>• Select the desired energy unit (eV is common for photon energies)</li>
                <li>• Calculator will determine the photon energy</li>
              </>
            )}
            {calculationMode === 'wavelength' && (
              <>
                <li>• Enter the photon energy</li>
                <li>• Select the appropriate energy unit</li>
                <li>• Select the desired wavelength unit</li>
                <li>• Calculator will determine the photon wavelength</li>
              </>
            )}
            <li>• Formula: E = hc/λ, where h is Planck's constant and c is the speed of light</li>
            <li>• This relationship applies to photons (electromagnetic radiation)</li>
            <li>• Common units: Wavelength in nm, Energy in eV</li>
            <li>• For per-mole units (kJ/mol, kcal/mol), the calculator converts to per-photon values</li>
            <li>• Wavenumber (cm⁻¹) can also be used for energy representation</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

