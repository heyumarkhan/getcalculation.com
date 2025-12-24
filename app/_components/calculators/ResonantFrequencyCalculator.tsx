'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors
const frequencyUnits = {
  'Hz': { name: 'Hz (Hertz)', factor: 1 },
  'kHz': { name: 'kHz (Kilohertz)', factor: 1000 },
  'MHz': { name: 'MHz (Megahertz)', factor: 1000000 },
  'GHz': { name: 'GHz (Gigahertz)', factor: 1000000000 }
};

const capacitanceUnits = {
  'F': { name: 'F (Farads)', factor: 1 },
  'mF': { name: 'mF (Millifarads)', factor: 0.001 },
  'μF': { name: 'μF (Microfarads)', factor: 0.000001 },
  'nF': { name: 'nF (Nanofarads)', factor: 0.000000001 },
  'pF': { name: 'pF (Picofarads)', factor: 0.000000000001 }
};

const inductanceUnits = {
  'H': { name: 'H (Henries)', factor: 1 },
  'mH': { name: 'mH (Millihenries)', factor: 0.001 },
  'μH': { name: 'μH (Microhenries)', factor: 0.000001 },
  'nH': { name: 'nH (Nanohenries)', factor: 0.000000001 }
};

const springConstantUnits = {
  'N/m': { name: 'N/m (Newtons per meter)', factor: 1 },
  'N/cm': { name: 'N/cm', factor: 100 },
  'N/mm': { name: 'N/mm', factor: 1000 },
  'lb/in': { name: 'lb/in (Pounds per inch)', factor: 175.127 },
  'lb/ft': { name: 'lb/ft', factor: 14.5939 }
};

const massUnits = {
  'kg': { name: 'kg (Kilograms)', factor: 1 },
  'g': { name: 'g (Grams)', factor: 0.001 },
  'mg': { name: 'mg (Milligrams)', factor: 0.000001 },
  'lb': { name: 'lb (Pounds)', factor: 0.453592 },
  'oz': { name: 'oz (Ounces)', factor: 0.0283495 }
};

type CalculationMode = 'lc-circuit' | 'mechanical';

export default function ResonantFrequencyCalculator() {
  const [mode, setMode] = useState<CalculationMode>('lc-circuit');
  
  // LC Circuit mode
  const [inductance, setInductance] = useState('');
  const [capacitance, setCapacitance] = useState('');
  const [inductanceUnit, setInductanceUnit] = useState('μH');
  const [capacitanceUnit, setCapacitanceUnit] = useState('μF');
  
  // Mechanical mode
  const [springConstant, setSpringConstant] = useState('');
  const [mass, setMass] = useState('');
  const [springConstantUnit, setSpringConstantUnit] = useState('N/m');
  const [massUnit, setMassUnit] = useState('kg');
  
  const [frequencyUnit, setFrequencyUnit] = useState('Hz');
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

  const convertInductanceToBase = (value: number, unit: string) => {
    return value * inductanceUnits[unit as keyof typeof inductanceUnits].factor;
  };

  const convertCapacitanceToBase = (value: number, unit: string) => {
    return value * capacitanceUnits[unit as keyof typeof capacitanceUnits].factor;
  };

  const convertSpringConstantToBase = (value: number, unit: string) => {
    return value * springConstantUnits[unit as keyof typeof springConstantUnits].factor;
  };

  const convertMassToBase = (value: number, unit: string) => {
    return value * massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertFrequencyFromBase = (value: number, unit: string) => {
    return value / frequencyUnits[unit as keyof typeof frequencyUnits].factor;
  };

  const calculate = () => {
    if (mode === 'lc-circuit') {
      const L = inductance ? parseFloat(inductance) : NaN;
      const C = capacitance ? parseFloat(capacitance) : NaN;

      if (!inductance || !capacitance) {
        setResult(null);
        setCalculation('Error: Both inductance and capacitance are required');
        return;
      }

      if (isNaN(L) || L <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for inductance');
        return;
      }

      if (isNaN(C) || C <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for capacitance');
        return;
      }

      // Calculate resonant frequency: f = 1/(2π√(LC))
      const LInHenries = convertInductanceToBase(L, inductanceUnit);
      const CInFarads = convertCapacitanceToBase(C, capacitanceUnit);
      const product = LInHenries * CInFarads;
      
      if (product === 0) {
        setResult(null);
        setCalculation('Error: Product of inductance and capacitance cannot be zero');
        return;
      }
      
      const fInHz = 1 / (2 * Math.PI * Math.sqrt(product));
      const frequency = convertFrequencyFromBase(fInHz, frequencyUnit);
      
      setResult({ value: frequency, unit: frequencyUnit });
      setCalculation(`f = 1/(2π√(LC)) = 1/(2π√(${formatValue(L)} ${inductanceUnit} × ${formatValue(C)} ${capacitanceUnit})) = ${formatValue(frequency)} ${frequencyUnit}`);
    } else if (mode === 'mechanical') {
      const k = springConstant ? parseFloat(springConstant) : NaN;
      const m = mass ? parseFloat(mass) : NaN;

      if (!springConstant || !mass) {
        setResult(null);
        setCalculation('Error: Both spring constant and mass are required');
        return;
      }

      if (isNaN(k) || k <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for spring constant');
        return;
      }

      if (isNaN(m) || m <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for mass');
        return;
      }

      // Calculate resonant frequency: f = (1/(2π))√(k/m)
      const kInNm = convertSpringConstantToBase(k, springConstantUnit);
      const mInKg = convertMassToBase(m, massUnit);
      
      if (mInKg === 0) {
        setResult(null);
        setCalculation('Error: Mass cannot be zero');
        return;
      }
      
      const fInHz = (1 / (2 * Math.PI)) * Math.sqrt(kInNm / mInKg);
      const frequency = convertFrequencyFromBase(fInHz, frequencyUnit);
      
      setResult({ value: frequency, unit: frequencyUnit });
      setCalculation(`f = (1/(2π))√(k/m) = (1/(2π))√(${formatValue(k)} ${springConstantUnit} / ${formatValue(m)} ${massUnit}) = ${formatValue(frequency)} ${frequencyUnit}`);
    }
  };

  const clearAll = () => {
    setInductance('');
    setCapacitance('');
    setSpringConstant('');
    setMass('');
    setFrequencyUnit('Hz');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Resonant Frequency Calculator</h2>
        <p className="text-gray-600">Calculate resonant frequency for LC circuits or mechanical systems</p>
      </div>

      <div className="space-y-6">
        {/* Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Calculation Mode
          </label>
          <select
            value={mode}
            onChange={(e) => {
              setMode(e.target.value as CalculationMode);
              clearAll();
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="lc-circuit">LC Circuit: f = 1/(2π√(LC))</option>
            <option value="mechanical">Mechanical System: f = (1/(2π))√(k/m)</option>
          </select>
        </div>

        {/* LC Circuit Mode */}
        {mode === 'lc-circuit' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Inductance (L)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter inductance"
                    value={inductance}
                    onChange={(e) => setInductance(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-40">
                  <select
                    value={inductanceUnit}
                    onChange={(e) => setInductanceUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(inductanceUnits).map(([key, unit]) => (
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
                Capacitance (C)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter capacitance"
                    value={capacitance}
                    onChange={(e) => setCapacitance(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={capacitanceUnit}
                    onChange={(e) => setCapacitanceUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(capacitanceUnits).map(([key, unit]) => (
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

        {/* Mechanical Mode */}
        {mode === 'mechanical' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Spring Constant (k)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter spring constant"
                    value={springConstant}
                    onChange={(e) => setSpringConstant(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-48">
                  <select
                    value={springConstantUnit}
                    onChange={(e) => setSpringConstantUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                  >
                    {Object.entries(springConstantUnits).map(([key, unit]) => (
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
                Mass (m)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter mass"
                    value={mass}
                    onChange={(e) => setMass(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-32">
                  <select
                    value={massUnit}
                    onChange={(e) => setMassUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(massUnits).map(([key, unit]) => (
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

        {/* Frequency Unit Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Frequency Unit (Result)
          </label>
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
            {calculation && !calculation.startsWith('Error:') && (
              <p className={`text-sm ${getResultTextColor()}/80 mt-2 font-mono break-words`}>
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
            {mode === 'lc-circuit' && (
              <>
                <li>• Enter inductance (L) and capacitance (C)</li>
                <li>• Formula: f = 1/(2π√(LC))</li>
                <li>• This calculates the resonant frequency of an LC circuit</li>
              </>
            )}
            {mode === 'mechanical' && (
              <>
                <li>• Enter spring constant (k) and mass (m)</li>
                <li>• Formula: f = (1/(2π))√(k/m)</li>
                <li>• This calculates the natural/resonant frequency of a spring-mass system</li>
              </>
            )}
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• All values must be positive numbers</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

