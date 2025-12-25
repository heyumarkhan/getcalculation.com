'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type AntennaType = 'halfWaveDipole' | 'quarterWaveMonopole' | 'fullWave';
type CalculationMode = 'antennaLength' | 'frequency';

interface AntennaLengthCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Speed of light in m/s
const C = 299792458; // m/s

// Unit conversion factors
const frequencyUnits = {
  'Hz': { name: 'Hz (Hertz)', factor: 1 },
  'kHz': { name: 'kHz (Kilohertz)', factor: 1000 },
  'MHz': { name: 'MHz (Megahertz)', factor: 1000000 },
  'GHz': { name: 'GHz (Gigahertz)', factor: 1000000000 }
};

const lengthUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 }
};

export default function AntennaLengthCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: AntennaLengthCalculatorProps) {
  const [antennaType, setAntennaType] = useState<AntennaType>('halfWaveDipole');
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('antennaLength');
  const [frequency, setFrequency] = useState('');
  const [antennaLength, setAntennaLength] = useState('');
  const [velocityFactor, setVelocityFactor] = useState('0.95'); // Typical velocity factor for wire antennas
  const [frequencyUnit, setFrequencyUnit] = useState('MHz');
  const [lengthUnit, setLengthUnit] = useState('m');
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

  const convertFrequencyToBase = (value: number, unit: string): number => {
    return value * frequencyUnits[unit as keyof typeof frequencyUnits].factor;
  };

  const convertFrequencyFromBase = (value: number, unit: string): number => {
    return value / frequencyUnits[unit as keyof typeof frequencyUnits].factor;
  };

  const convertLengthToBase = (value: number, unit: string): number => {
    return value * lengthUnits[unit as keyof typeof lengthUnits].factor;
  };

  const convertLengthFromBase = (value: number, unit: string): number => {
    return value / lengthUnits[unit as keyof typeof lengthUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const f = frequency ? parseFloat(frequency) : NaN;
    const L = antennaLength ? parseFloat(antennaLength) : NaN;
    const vf = velocityFactor ? parseFloat(velocityFactor) : 0.95;

    if (vf <= 0 || vf > 1) {
      setError('Velocity factor must be between 0 and 1 (typically 0.95 for wire antennas)');
      return;
    }

    if (calculationMode === 'antennaLength') {
      // Calculate antenna length from frequency
      if (!frequency) {
        setError('Please enter frequency');
        return;
      }

      if (isNaN(f) || f <= 0) {
        setError('Frequency must be a valid positive number');
        return;
      }

      const fBase = convertFrequencyToBase(f, frequencyUnit); // in Hz
      let wavelengthBase: number;
      let lengthBase: number;
      let formulaDescription: string;

      if (antennaType === 'halfWaveDipole') {
        // Half-wave dipole: L = (λ/2) × vf = (c/(2×f)) × vf
        wavelengthBase = C / fBase;
        lengthBase = (wavelengthBase / 2) * vf;
        formulaDescription = 'Half-Wave Dipole: L = (λ/2) × vf = (c/(2×f)) × vf';
      } else if (antennaType === 'quarterWaveMonopole') {
        // Quarter-wave monopole: L = (λ/4) × vf = (c/(4×f)) × vf
        wavelengthBase = C / fBase;
        lengthBase = (wavelengthBase / 4) * vf;
        formulaDescription = 'Quarter-Wave Monopole: L = (λ/4) × vf = (c/(4×f)) × vf';
      } else {
        // Full-wave: L = λ × vf = (c/f) × vf
        wavelengthBase = C / fBase;
        lengthBase = wavelengthBase * vf;
        formulaDescription = 'Full-Wave: L = λ × vf = (c/f) × vf';
      }

      const lengthResult = convertLengthFromBase(lengthBase, lengthUnit);

      setResult({ value: lengthResult, unit: lengthUnit, label: 'Antenna Length' });
      setCalculation(`${formulaDescription}\nf = ${formatValue(f)} ${frequencyUnit} = ${formatValue(fBase)} Hz\nλ = c / f = ${formatValue(C)} m/s / ${formatValue(fBase)} Hz = ${formatValue(wavelengthBase)} m\nL = ${antennaType === 'halfWaveDipole' ? '(λ/2)' : antennaType === 'quarterWaveMonopole' ? '(λ/4)' : 'λ'} × vf = ${formatValue(antennaType === 'halfWaveDipole' ? wavelengthBase / 2 : antennaType === 'quarterWaveMonopole' ? wavelengthBase / 4 : wavelengthBase)} m × ${formatValue(vf)} = ${formatValue(lengthBase)} m = ${formatValue(lengthResult)} ${lengthUnit}`);
    } else if (calculationMode === 'frequency') {
      // Calculate frequency from antenna length
      if (!antennaLength) {
        setError('Please enter antenna length');
        return;
      }

      if (isNaN(L) || L <= 0) {
        setError('Antenna length must be a valid positive number');
        return;
      }

      const LBase = convertLengthToBase(L, lengthUnit); // in meters
      let wavelengthBase: number;
      let fBase: number;
      let formulaDescription: string;

      if (antennaType === 'halfWaveDipole') {
        // Half-wave dipole: L = (λ/2) × vf, so λ = 2L/vf, f = c/λ
        wavelengthBase = (2 * LBase) / vf;
        fBase = C / wavelengthBase;
        formulaDescription = 'Half-Wave Dipole: f = c / (2L/vf)';
      } else if (antennaType === 'quarterWaveMonopole') {
        // Quarter-wave monopole: L = (λ/4) × vf, so λ = 4L/vf, f = c/λ
        wavelengthBase = (4 * LBase) / vf;
        fBase = C / wavelengthBase;
        formulaDescription = 'Quarter-Wave Monopole: f = c / (4L/vf)';
      } else {
        // Full-wave: L = λ × vf, so λ = L/vf, f = c/λ
        wavelengthBase = LBase / vf;
        fBase = C / wavelengthBase;
        formulaDescription = 'Full-Wave: f = c / (L/vf)';
      }

      const frequencyResult = convertFrequencyFromBase(fBase, frequencyUnit);

      setResult({ value: frequencyResult, unit: frequencyUnit, label: 'Frequency' });
      setCalculation(`${formulaDescription}\nL = ${formatValue(L)} ${lengthUnit} = ${formatValue(LBase)} m\nλ = ${antennaType === 'halfWaveDipole' ? '2L/vf' : antennaType === 'quarterWaveMonopole' ? '4L/vf' : 'L/vf'} = ${formatValue(wavelengthBase)} m\nf = c / λ = ${formatValue(C)} m/s / ${formatValue(wavelengthBase)} m = ${formatValue(fBase)} Hz = ${formatValue(frequencyResult)} ${frequencyUnit}`);
    }
  };

  const clearAll = () => {
    setFrequency('');
    setAntennaLength('');
    setVelocityFactor('0.95');
    setFrequencyUnit('MHz');
    setLengthUnit('m');
    setResult(null);
    setCalculation('');
    setError('');
  };

  const getAntennaTypeDescription = () => {
    switch (antennaType) {
      case 'halfWaveDipole':
        return 'Half-Wave Dipole: Most common antenna type, resonant at λ/2';
      case 'quarterWaveMonopole':
        return 'Quarter-Wave Monopole: Requires ground plane, resonant at λ/4';
      case 'fullWave':
        return 'Full-Wave: Resonant at one full wavelength';
      default:
        return '';
    }
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Antenna Length Calculator</h2>
          <p className="text-gray-600">Calculate antenna length from frequency or frequency from antenna length</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Antenna Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Antenna Type
          </label>
          <select
            value={antennaType}
            onChange={(e) => {
              setAntennaType(e.target.value as AntennaType);
              clearAll();
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="halfWaveDipole">Half-Wave Dipole</option>
            <option value="quarterWaveMonopole">Quarter-Wave Monopole</option>
            <option value="fullWave">Full-Wave</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">{getAntennaTypeDescription()}</p>
        </div>

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
            <option value="antennaLength">Antenna Length from Frequency</option>
            <option value="frequency">Frequency from Antenna Length</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            {antennaType === 'halfWaveDipole' && 'L = (c/(2×f)) × vf'}
            {antennaType === 'quarterWaveMonopole' && 'L = (c/(4×f)) × vf'}
            {antennaType === 'fullWave' && 'L = (c/f) × vf'}
          </p>
          <p className="text-xs text-gray-600 mt-1">Where: L = Length, c = Speed of light (299,792,458 m/s), f = Frequency, vf = Velocity factor</p>
        </div>

        {/* Frequency Input */}
        {calculationMode === 'antennaLength' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Frequency (f)
            </label>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <div className="w-32">
                <select
                  value={frequencyUnit}
                  onChange={(e) => setFrequencyUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        {/* Antenna Length Input */}
        {calculationMode === 'frequency' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Antenna Length (L)
            </label>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter antenna length"
                value={antennaLength}
                onChange={(e) => setAntennaLength(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <div className="w-32">
                <select
                  value={lengthUnit}
                  onChange={(e) => setLengthUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(lengthUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Velocity Factor Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Velocity Factor (vf)
          </label>
          <Input
            type="text"
            placeholder="Enter velocity factor (default: 0.95)"
            value={velocityFactor}
            onChange={(e) => setVelocityFactor(e.target.value)}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            Typical values: 0.95-0.98 for wire antennas, 0.66-0.85 for coaxial cable, 1.0 for free space (theoretical)
          </p>
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
            {calculationMode === 'antennaLength' && (
              <>
                <li>• Enter the operating frequency</li>
                <li>• Select the antenna type (half-wave dipole, quarter-wave monopole, or full-wave)</li>
                <li>• Adjust velocity factor if needed (default: 0.95 for wire antennas)</li>
                <li>• Calculator will determine the antenna length</li>
              </>
            )}
            {calculationMode === 'frequency' && (
              <>
                <li>• Enter the antenna length</li>
                <li>• Select the antenna type (half-wave dipole, quarter-wave monopole, or full-wave)</li>
                <li>• Adjust velocity factor if needed (default: 0.95 for wire antennas)</li>
                <li>• Calculator will determine the resonant frequency</li>
              </>
            )}
            <li>• Half-wave dipole: Most common, two equal-length elements</li>
            <li>• Quarter-wave monopole: Requires ground plane (effective length = λ/4)</li>
            <li>• Full-wave: One complete wavelength long</li>
            <li>• Velocity factor accounts for propagation speed in the antenna material (typically 0.95-0.98 for wires)</li>
            <li>• Results are theoretical; actual tuning may require adjustment</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

