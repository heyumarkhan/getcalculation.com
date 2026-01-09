'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors for frequency
const frequencyUnits = {
  'Hz': { name: 'Hertz (Hz)', factor: 1 },
  'kHz': { name: 'Kilohertz (kHz)', factor: 1000 },
  'MHz': { name: 'Megahertz (MHz)', factor: 1e6 },
  'GHz': { name: 'Gigahertz (GHz)', factor: 1e9 }
};

// Unit conversion factors for capacitance
const capacitanceUnits = {
  'F': { name: 'Farad (F)', factor: 1 },
  'mF': { name: 'Millifarad (mF)', factor: 0.001 },
  'μF': { name: 'Microfarad (μF)', factor: 1e-6 },
  'nF': { name: 'Nanofarad (nF)', factor: 1e-9 },
  'pF': { name: 'Picofarad (pF)', factor: 1e-12 }
};

// Unit conversion factors for reactance
const reactanceUnits = {
  'Ω': { name: 'Ohm (Ω)', factor: 1 },
  'kΩ': { name: 'Kilohm (kΩ)', factor: 1000 },
  'MΩ': { name: 'Megaohm (MΩ)', factor: 1e6 }
};

interface CapacitiveReactanceCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function CapacitiveReactanceCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: CapacitiveReactanceCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'reactance' | 'frequency' | 'capacitance'>('reactance');
  const [frequency, setFrequency] = useState('');
  const [capacitance, setCapacitance] = useState('');
  const [reactance, setReactance] = useState('');
  const [frequencyUnit, setFrequencyUnit] = useState('kHz');
  const [capacitanceUnit, setCapacitanceUnit] = useState('μF');
  const [reactanceUnit, setReactanceUnit] = useState('Ω');
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

  const convertFrequencyToBaseUnits = (value: number, unit: string): number => {
    return value * frequencyUnits[unit as keyof typeof frequencyUnits].factor;
  };

  const convertCapacitanceToBaseUnits = (value: number, unit: string): number => {
    return value * capacitanceUnits[unit as keyof typeof capacitanceUnits].factor;
  };

  const convertReactanceToBaseUnits = (value: number, unit: string): number => {
    return value * reactanceUnits[unit as keyof typeof reactanceUnits].factor;
  };

  const convertFrequencyFromBaseUnits = (value: number, unit: string): number => {
    return value / frequencyUnits[unit as keyof typeof frequencyUnits].factor;
  };

  const convertCapacitanceFromBaseUnits = (value: number, unit: string): number => {
    return value / capacitanceUnits[unit as keyof typeof capacitanceUnits].factor;
  };

  const convertReactanceFromBaseUnits = (value: number, unit: string): number => {
    return value / reactanceUnits[unit as keyof typeof reactanceUnits].factor;
  };

  const calculateReactance = () => {
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

    // Calculate reactance: Xc = 1 / (2πfC)
    const XcInOhms = 1 / (2 * Math.PI * fInHz * CInF);
    const XcInUnit = convertReactanceFromBaseUnits(XcInOhms, reactanceUnit);

    setResult({
      value: XcInUnit,
      unit: reactanceUnit,
      variable: 'Capacitive Reactance'
    });

    let calcStr = `Xc = 1 / (2πfC)\n`;
    calcStr += `Xc = 1 / (2π × ${formatValue(fInHz)} Hz × ${formatValue(CInF)} F)\n`;
    calcStr += `Xc = 1 / (${formatValue(2 * Math.PI * fInHz * CInF)})\n`;
    calcStr += `Xc = ${formatValue(XcInOhms)} Ω = ${formatValue(XcInUnit)} ${reactanceUnit}`;

    setCalculation(calcStr);
  };

  const calculateFrequency = () => {
    const Xc = parseFloat(reactance);
    const C = parseFloat(capacitance);

    if (isNaN(Xc) || isNaN(C) || Xc <= 0 || C <= 0) {
      setResult(null);
      setCalculation('Please enter valid positive numerical values for reactance and capacitance.');
      return;
    }

    // Convert to base units (Ω, F)
    const XcInOhms = convertReactanceToBaseUnits(Xc, reactanceUnit);
    const CInF = convertCapacitanceToBaseUnits(C, capacitanceUnit);

    // Calculate frequency: f = 1 / (2πXcC)
    const fInHz = 1 / (2 * Math.PI * XcInOhms * CInF);
    const fInUnit = convertFrequencyFromBaseUnits(fInHz, frequencyUnit);

    setResult({
      value: fInUnit,
      unit: frequencyUnit,
      variable: 'Frequency'
    });

    let calcStr = `f = 1 / (2πXcC)\n`;
    calcStr += `f = 1 / (2π × ${formatValue(XcInOhms)} Ω × ${formatValue(CInF)} F)\n`;
    calcStr += `f = 1 / (${formatValue(2 * Math.PI * XcInOhms * CInF)})\n`;
    calcStr += `f = ${formatValue(fInHz)} Hz = ${formatValue(fInUnit)} ${frequencyUnit}`;

    setCalculation(calcStr);
  };

  const calculateCapacitance = () => {
    const Xc = parseFloat(reactance);
    const f = parseFloat(frequency);

    if (isNaN(Xc) || isNaN(f) || Xc <= 0 || f <= 0) {
      setResult(null);
      setCalculation('Please enter valid positive numerical values for reactance and frequency.');
      return;
    }

    // Convert to base units (Ω, Hz)
    const XcInOhms = convertReactanceToBaseUnits(Xc, reactanceUnit);
    const fInHz = convertFrequencyToBaseUnits(f, frequencyUnit);

    // Calculate capacitance: C = 1 / (2πfXc)
    const CInF = 1 / (2 * Math.PI * fInHz * XcInOhms);
    const CInUnit = convertCapacitanceFromBaseUnits(CInF, capacitanceUnit);

    setResult({
      value: CInUnit,
      unit: capacitanceUnit,
      variable: 'Capacitance'
    });

    let calcStr = `C = 1 / (2πfXc)\n`;
    calcStr += `C = 1 / (2π × ${formatValue(fInHz)} Hz × ${formatValue(XcInOhms)} Ω)\n`;
    calcStr += `C = 1 / (${formatValue(2 * Math.PI * fInHz * XcInOhms)})\n`;
    calcStr += `C = ${formatValue(CInF)} F = ${formatValue(CInUnit)} ${capacitanceUnit}`;

    setCalculation(calcStr);
  };

  const calculate = () => {
    switch (calculationType) {
      case 'reactance':
        calculateReactance();
        break;
      case 'frequency':
        calculateFrequency();
        break;
      case 'capacitance':
        calculateCapacitance();
        break;
    }
  };

  const clearAll = () => {
    setCalculationType('reactance');
    setFrequency('');
    setCapacitance('');
    setReactance('');
    setFrequencyUnit('kHz');
    setCapacitanceUnit('μF');
    setReactanceUnit('Ω');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Capacitive Reactance Calculator</h2>
            <p className="text-gray-600">Calculate capacitive reactance, frequency, or capacitance using Xc = 1/(2πfC)</p>
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
              onChange={(e) => setCalculationType(e.target.value as 'reactance' | 'frequency' | 'capacitance')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="reactance">Capacitive Reactance (Xc)</option>
              <option value="frequency">Frequency (f)</option>
              <option value="capacitance">Capacitance (C)</option>
            </select>
          </div>

          {calculationType === 'reactance' && (
            <>
              <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-3">
                  Frequency (f)
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
                <label htmlFor="reactanceUnit" className="block text-sm font-medium text-gray-700 mb-3">
                  Result Reactance Unit
                </label>
                <select
                  id="reactanceUnit"
                  value={reactanceUnit}
                  onChange={(e) => setReactanceUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(reactanceUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {calculationType === 'frequency' && (
            <>
              <div>
                <label htmlFor="reactance" className="block text-sm font-medium text-gray-700 mb-3">
                  Capacitive Reactance (Xc)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="reactance"
                      type="number"
                      placeholder="Enter reactance"
                      value={reactance}
                      onChange={(e) => setReactance(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={reactanceUnit}
                      onChange={(e) => setReactanceUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(reactanceUnits).map(([key, unit]) => (
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

          {calculationType === 'capacitance' && (
            <>
              <div>
                <label htmlFor="reactance" className="block text-sm font-medium text-gray-700 mb-3">
                  Capacitive Reactance (Xc)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="reactance"
                      type="number"
                      placeholder="Enter reactance"
                      value={reactance}
                      onChange={(e) => setReactance(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={reactanceUnit}
                      onChange={(e) => setReactanceUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(reactanceUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-3">
                  Frequency (f)
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
              <li>• Select what you want to calculate: Reactance, Frequency, or Capacitance</li>
              <li>• Enter the required values based on your selection</li>
              <li>• Select appropriate units for each parameter</li>
              <li>• Click &quot;Calculate&quot; to get the result with step-by-step calculations</li>
              <li>• Capacitive reactance decreases as frequency increases</li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}
