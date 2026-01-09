'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors for inductance
const inductanceUnits = {
  'H': { name: 'Henry (H)', factor: 1 },
  'mH': { name: 'Millihenry (mH)', factor: 0.001 },
  'μH': { name: 'Microhenry (μH)', factor: 1e-6 },
  'nH': { name: 'Nanohenry (nH)', factor: 1e-9 }
};

// Unit conversion factors for capacitance
const capacitanceUnits = {
  'F': { name: 'Farad (F)', factor: 1 },
  'mF': { name: 'Millifarad (mF)', factor: 0.001 },
  'μF': { name: 'Microfarad (μF)', factor: 1e-6 },
  'nF': { name: 'Nanofarad (nF)', factor: 1e-9 },
  'pF': { name: 'Picofarad (pF)', factor: 1e-12 }
};

// Unit conversion factors for frequency
const frequencyUnits = {
  'Hz': { name: 'Hertz (Hz)', factor: 1 },
  'kHz': { name: 'Kilohertz (kHz)', factor: 1000 },
  'MHz': { name: 'Megahertz (MHz)', factor: 1e6 },
  'GHz': { name: 'Gigahertz (GHz)', factor: 1e9 }
};

// Unit conversion factors for impedance
const impedanceUnits = {
  'Ω': { name: 'Ohm (Ω)', factor: 1 },
  'kΩ': { name: 'Kilohm (kΩ)', factor: 1000 },
  'MΩ': { name: 'Megaohm (MΩ)', factor: 1e6 }
};

interface LCFilterCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function LCFilterCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: LCFilterCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'frequency' | 'inductance' | 'capacitance' | 'impedance'>('frequency');
  const [inductance, setInductance] = useState('');
  const [capacitance, setCapacitance] = useState('');
  const [frequency, setFrequency] = useState('');
  const [characteristicImpedance, setCharacteristicImpedance] = useState('');
  const [inductanceUnit, setInductanceUnit] = useState('mH');
  const [capacitanceUnit, setCapacitanceUnit] = useState('μF');
  const [frequencyUnit, setFrequencyUnit] = useState('kHz');
  const [impedanceUnit, setImpedanceUnit] = useState('Ω');
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

  const convertInductanceToBaseUnits = (value: number, unit: string): number => {
    return value * inductanceUnits[unit as keyof typeof inductanceUnits].factor;
  };

  const convertCapacitanceToBaseUnits = (value: number, unit: string): number => {
    return value * capacitanceUnits[unit as keyof typeof capacitanceUnits].factor;
  };

  const convertFrequencyToBaseUnits = (value: number, unit: string): number => {
    return value * frequencyUnits[unit as keyof typeof frequencyUnits].factor;
  };

  const convertImpedanceToBaseUnits = (value: number, unit: string): number => {
    return value * impedanceUnits[unit as keyof typeof impedanceUnits].factor;
  };

  const convertFrequencyFromBaseUnits = (value: number, unit: string): number => {
    return value / frequencyUnits[unit as keyof typeof frequencyUnits].factor;
  };

  const convertInductanceFromBaseUnits = (value: number, unit: string): number => {
    return value / inductanceUnits[unit as keyof typeof inductanceUnits].factor;
  };

  const convertCapacitanceFromBaseUnits = (value: number, unit: string): number => {
    return value / capacitanceUnits[unit as keyof typeof capacitanceUnits].factor;
  };

  const convertImpedanceFromBaseUnits = (value: number, unit: string): number => {
    return value / impedanceUnits[unit as keyof typeof impedanceUnits].factor;
  };

  const calculateResonantFrequency = () => {
    const L = parseFloat(inductance);
    const C = parseFloat(capacitance);

    if (isNaN(L) || isNaN(C) || L <= 0 || C <= 0) {
      setResult(null);
      setCalculation('Please enter valid positive numerical values for inductance and capacitance.');
      return;
    }

    // Convert to base units (H, F)
    const LInH = convertInductanceToBaseUnits(L, inductanceUnit);
    const CInF = convertCapacitanceToBaseUnits(C, capacitanceUnit);

    // Calculate resonant frequency: f = 1 / (2π√(LC))
    const frequencyInHz = 1 / (2 * Math.PI * Math.sqrt(LInH * CInF));
    const frequencyInUnit = convertFrequencyFromBaseUnits(frequencyInHz, frequencyUnit);

    setResult({
      value: frequencyInUnit,
      unit: frequencyUnit,
      variable: 'Resonant Frequency'
    });

    let calcStr = `f = 1 / (2π√(LC))\n`;
    calcStr += `f = 1 / (2π√(${formatValue(LInH)} H × ${formatValue(CInF)} F))\n`;
    calcStr += `f = 1 / (2π√(${formatValue(LInH * CInF)}))\n`;
    calcStr += `f = ${formatValue(frequencyInHz)} Hz = ${formatValue(frequencyInUnit)} ${frequencyUnit}`;

    setCalculation(calcStr);
  };

  const calculateInductance = () => {
    const f = parseFloat(frequency);
    const C = parseFloat(capacitance);

    if (isNaN(f) || isNaN(C) || f <= 0 || C <= 0) {
      setResult(null);
      setCalculation('Please enter valid positive numerical values for frequency and capacitance.');
      return;
    }

    // Convert to base units (Hz, F)
    const fInHz = convertFrequencyToBaseUnits(f, frequencyUnit);
    const CInF = convertCapacitanceToBaseUnits(C, capacitanceUnit);

    // Calculate inductance: L = 1 / (4π²f²C)
    const LInH = 1 / (4 * Math.PI * Math.PI * fInHz * fInHz * CInF);
    const LInUnit = convertInductanceFromBaseUnits(LInH, inductanceUnit);

    setResult({
      value: LInUnit,
      unit: inductanceUnit,
      variable: 'Inductance'
    });

    let calcStr = `L = 1 / (4π²f²C)\n`;
    calcStr += `L = 1 / (4π² × ${formatValue(fInHz)}² Hz × ${formatValue(CInF)} F)\n`;
    calcStr += `L = 1 / (${formatValue(4 * Math.PI * Math.PI * fInHz * fInHz * CInF)})\n`;
    calcStr += `L = ${formatValue(LInH)} H = ${formatValue(LInUnit)} ${inductanceUnit}`;

    setCalculation(calcStr);
  };

  const calculateCapacitance = () => {
    const f = parseFloat(frequency);
    const L = parseFloat(inductance);

    if (isNaN(f) || isNaN(L) || f <= 0 || L <= 0) {
      setResult(null);
      setCalculation('Please enter valid positive numerical values for frequency and inductance.');
      return;
    }

    // Convert to base units (Hz, H)
    const fInHz = convertFrequencyToBaseUnits(f, frequencyUnit);
    const LInH = convertInductanceToBaseUnits(L, inductanceUnit);

    // Calculate capacitance: C = 1 / (4π²f²L)
    const CInF = 1 / (4 * Math.PI * Math.PI * fInHz * fInHz * LInH);
    const CInUnit = convertCapacitanceFromBaseUnits(CInF, capacitanceUnit);

    setResult({
      value: CInUnit,
      unit: capacitanceUnit,
      variable: 'Capacitance'
    });

    let calcStr = `C = 1 / (4π²f²L)\n`;
    calcStr += `C = 1 / (4π² × ${formatValue(fInHz)}² Hz × ${formatValue(LInH)} H)\n`;
    calcStr += `C = 1 / (${formatValue(4 * Math.PI * Math.PI * fInHz * fInHz * LInH)})\n`;
    calcStr += `C = ${formatValue(CInF)} F = ${formatValue(CInUnit)} ${capacitanceUnit}`;

    setCalculation(calcStr);
  };

  const calculateCharacteristicImpedance = () => {
    const L = parseFloat(inductance);
    const C = parseFloat(capacitance);

    if (isNaN(L) || isNaN(C) || L <= 0 || C <= 0) {
      setResult(null);
      setCalculation('Please enter valid positive numerical values for inductance and capacitance.');
      return;
    }

    // Convert to base units (H, F)
    const LInH = convertInductanceToBaseUnits(L, inductanceUnit);
    const CInF = convertCapacitanceToBaseUnits(C, capacitanceUnit);

    // Calculate characteristic impedance: Z₀ = √(L/C)
    const ZInOhms = Math.sqrt(LInH / CInF);
    const ZInUnit = convertImpedanceFromBaseUnits(ZInOhms, impedanceUnit);

    setResult({
      value: ZInUnit,
      unit: impedanceUnit,
      variable: 'Characteristic Impedance'
    });

    let calcStr = `Z₀ = √(L/C)\n`;
    calcStr += `Z₀ = √(${formatValue(LInH)} H / ${formatValue(CInF)} F)\n`;
    calcStr += `Z₀ = √(${formatValue(LInH / CInF)})\n`;
    calcStr += `Z₀ = ${formatValue(ZInOhms)} Ω = ${formatValue(ZInUnit)} ${impedanceUnit}`;

    setCalculation(calcStr);
  };

  const calculate = () => {
    switch (calculationType) {
      case 'frequency':
        calculateResonantFrequency();
        break;
      case 'inductance':
        calculateInductance();
        break;
      case 'capacitance':
        calculateCapacitance();
        break;
      case 'impedance':
        calculateCharacteristicImpedance();
        break;
    }
  };

  const clearAll = () => {
    setCalculationType('frequency');
    setInductance('');
    setCapacitance('');
    setFrequency('');
    setCharacteristicImpedance('');
    setInductanceUnit('mH');
    setCapacitanceUnit('μF');
    setFrequencyUnit('kHz');
    setImpedanceUnit('Ω');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">LC Filter Calculator</h2>
            <p className="text-gray-600">Calculate resonant frequency, inductance, capacitance, or impedance</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="calculationType" className="block text-sm font-medium text-gray-700 mb-3">
              Calculate
            </label>
            <select
              id="calculationType"
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value as 'frequency' | 'inductance' | 'capacitance' | 'impedance')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="frequency">Resonant Frequency (f)</option>
              <option value="inductance">Inductance (L)</option>
              <option value="capacitance">Capacitance (C)</option>
              <option value="impedance">Characteristic Impedance (Z₀)</option>
            </select>
          </div>

          {calculationType === 'frequency' && (
            <>
              <div>
                <label htmlFor="inductance" className="block text-sm font-medium text-gray-700 mb-3">
                  Inductance (L)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="inductance"
                      type="number"
                      placeholder="Enter inductance"
                      value={inductance}
                      onChange={(e) => setInductance(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={inductanceUnit}
                      onChange={(e) => setInductanceUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                <label htmlFor="capacitance" className="block text-sm font-medium text-gray-700 mb-3">
                  Capacitance (C)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="capacitance"
                      type="number"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

              <div>
                <label htmlFor="frequencyUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Result Frequency Unit
                </label>
                <select
                  id="frequencyUnit"
                  value={frequencyUnit}
                  onChange={(e) => setFrequencyUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(frequencyUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {calculationType === 'inductance' && (
            <>
              <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-3">
                  Resonant Frequency (f)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="frequency"
                      type="number"
                      placeholder="Enter frequency"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={frequencyUnit}
                      onChange={(e) => setFrequencyUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

              <div>
                <label htmlFor="capacitance" className="block text-sm font-medium text-gray-700 mb-3">
                  Capacitance (C)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="capacitance"
                      type="number"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

              <div>
                <label htmlFor="inductanceUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Result Inductance Unit
                </label>
                <select
                  id="inductanceUnit"
                  value={inductanceUnit}
                  onChange={(e) => setInductanceUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(inductanceUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {calculationType === 'capacitance' && (
            <>
              <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-3">
                  Resonant Frequency (f)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="frequency"
                      type="number"
                      placeholder="Enter frequency"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={frequencyUnit}
                      onChange={(e) => setFrequencyUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

              <div>
                <label htmlFor="inductance" className="block text-sm font-medium text-gray-700 mb-3">
                  Inductance (L)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="inductance"
                      type="number"
                      placeholder="Enter inductance"
                      value={inductance}
                      onChange={(e) => setInductance(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={inductanceUnit}
                      onChange={(e) => setInductanceUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                <label htmlFor="capacitanceUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Result Capacitance Unit
                </label>
                <select
                  id="capacitanceUnit"
                  value={capacitanceUnit}
                  onChange={(e) => setCapacitanceUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(capacitanceUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {calculationType === 'impedance' && (
            <>
              <div>
                <label htmlFor="inductance" className="block text-sm font-medium text-gray-700 mb-3">
                  Inductance (L)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="inductance"
                      type="number"
                      placeholder="Enter inductance"
                      value={inductance}
                      onChange={(e) => setInductance(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={inductanceUnit}
                      onChange={(e) => setInductanceUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                <label htmlFor="capacitance" className="block text-sm font-medium text-gray-700 mb-3">
                  Capacitance (C)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="capacitance"
                      type="number"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

              <div>
                <label htmlFor="impedanceUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Result Impedance Unit
                </label>
                <select
                  id="impedanceUnit"
                  value={impedanceUnit}
                  onChange={(e) => setImpedanceUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(impedanceUnits).map(([key, unit]) => (
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
              <li>• Select what you want to calculate: Frequency, Inductance, Capacitance, or Impedance</li>
              <li>• Enter the required values based on your selection</li>
              <li>• Select appropriate units for each parameter</li>
              <li>• Click &quot;Calculate&quot; to get the result with step-by-step calculations</li>
              <li>• Results include characteristic impedance calculations for transmission line analysis</li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}
