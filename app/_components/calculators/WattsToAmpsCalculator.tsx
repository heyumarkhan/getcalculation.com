'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface WattsToAmpsCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Power units (all relative to base unit: watts)
const powerUnits = {
  'W': { name: 'W (Watts)', factor: 1 },
  'kW': { name: 'kW (Kilowatts)', factor: 1000 },
  'mW': { name: 'mW (Milliwatts)', factor: 0.001 },
  'MW': { name: 'MW (Megawatts)', factor: 1000000 }
};

// Voltage units (all relative to base unit: volts)
const voltageUnits = {
  'V': { name: 'V (Volts)', factor: 1 },
  'kV': { name: 'kV (Kilovolts)', factor: 1000 },
  'mV': { name: 'mV (Millivolts)', factor: 0.001 }
};

type CircuitType = 'dc' | 'ac';

export default function WattsToAmpsCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: WattsToAmpsCalculatorProps) {
  const [power, setPower] = useState('');
  const [voltage, setVoltage] = useState('');
  const [powerFactor, setPowerFactor] = useState('');
  const [circuitType, setCircuitType] = useState<CircuitType>('dc');
  const [powerUnit, setPowerUnit] = useState('W');
  const [voltageUnit, setVoltageUnit] = useState('V');
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
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
      return value.toExponential(2);
    }
    return value.toFixed(4).replace(/\.?0+$/, '');
  };

  const convertPowerToBase = (value: number, unit: string): number => {
    return value * powerUnits[unit as keyof typeof powerUnits].factor;
  };

  const convertVoltageToBase = (value: number, unit: string): number => {
    return value * voltageUnits[unit as keyof typeof voltageUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    if (!power || !voltage) {
      setError('Please enter both power and voltage');
      return;
    }

    const powerValue = parseFloat(power);
    const voltageValue = parseFloat(voltage);
    const pfValue = powerFactor ? parseFloat(powerFactor) : 1;

    if (isNaN(powerValue) || isNaN(voltageValue)) {
      setError('Power and voltage must be valid numbers');
      return;
    }

    if (powerValue <= 0 || voltageValue <= 0) {
      setError('Power and voltage must be positive numbers');
      return;
    }

    if (circuitType === 'ac') {
      if (powerFactor && (isNaN(pfValue) || pfValue <= 0 || pfValue > 1)) {
        setError('Power factor must be between 0 and 1');
        return;
      }
    }

    // Convert to base units
    const powerBase = convertPowerToBase(powerValue, powerUnit);
    const voltageBase = convertVoltageToBase(voltageValue, voltageUnit);

    // Calculate current
    let currentBase: number;
    if (circuitType === 'dc') {
      // DC: I = P / V
      currentBase = powerBase / voltageBase;
      setResult({ value: currentBase, unit: 'A' });
      setCalculation(
        `Current = Power ÷ Voltage\nI = P / V\n` +
        `P = ${formatValue(powerValue)} ${powerUnits[powerUnit as keyof typeof powerUnits].name} = ${formatValue(powerBase)} W\n` +
        `V = ${formatValue(voltageValue)} ${voltageUnits[voltageUnit as keyof typeof voltageUnits].name} = ${formatValue(voltageBase)} V\n` +
        `I = ${formatValue(powerBase)} W ÷ ${formatValue(voltageBase)} V\n` +
        `I = ${formatValue(currentBase)} A`
      );
    } else {
      // AC: I = P / (V × PF)
      const effectivePF = pfValue || 1;
      currentBase = powerBase / (voltageBase * effectivePF);
      setResult({ value: currentBase, unit: 'A' });
      const pfNote = effectivePF === 1 ? ' (assuming unity power factor)' : '';
      setCalculation(
        `Current = Power ÷ (Voltage × Power Factor)\nI = P / (V × PF)\n` +
        `P = ${formatValue(powerValue)} ${powerUnits[powerUnit as keyof typeof powerUnits].name} = ${formatValue(powerBase)} W\n` +
        `V = ${formatValue(voltageValue)} ${voltageUnits[voltageUnit as keyof typeof voltageUnits].name} = ${formatValue(voltageBase)} V\n` +
        `PF = ${formatValue(effectivePF)}${pfNote}\n` +
        `I = ${formatValue(powerBase)} W ÷ (${formatValue(voltageBase)} V × ${formatValue(effectivePF)})\n` +
        `I = ${formatValue(powerBase)} W ÷ ${formatValue(voltageBase * effectivePF)} VA\n` +
        `I = ${formatValue(currentBase)} A`
      );
    }
  };

  const clearAll = () => {
    setPower('');
    setVoltage('');
    setPowerFactor('');
    setCircuitType('dc');
    setPowerUnit('W');
    setVoltageUnit('V');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Watts to Amps Calculator</h2>
          <p className="text-gray-600">Convert watts (power) to amperes (current) using voltage</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Circuit Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Circuit Type
          </label>
          <select
            value={circuitType}
            onChange={(e) => {
              setCircuitType(e.target.value as CircuitType);
              if (e.target.value === 'dc') {
                setPowerFactor('');
              }
              setResult(null);
              setCalculation('');
              setError('');
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="dc">DC (Direct Current)</option>
            <option value="ac">AC (Alternating Current)</option>
          </select>
        </div>

        {/* Power Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Power (P)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter power"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={powerUnit}
                onChange={(e) => setPowerUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(powerUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Voltage Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Voltage (V)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter voltage"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={voltageUnit}
                onChange={(e) => setVoltageUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(voltageUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Power Factor Input (AC only) */}
        {circuitType === 'ac' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Power Factor (PF) <span className="text-gray-500 text-xs">(Optional, 0-1)</span>
            </label>
            <Input
              type="text"
              placeholder="Enter power factor (0-1), leave empty for 1.0"
              value={powerFactor}
              onChange={(e) => setPowerFactor(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Power factor is typically between 0 and 1. Leave empty to assume unity power factor (1.0).
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
            <h3 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>Current (Amps)</h3>
            <p className="text-2xl font-bold" style={{ color: primaryColor }}>
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <div className="text-sm mt-3 font-mono whitespace-pre-line text-gray-700">
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
            <li>• Select circuit type: DC or AC</li>
            <li>• Enter power in watts, kilowatts, milliwatts, or megawatts</li>
            <li>• Enter voltage in volts, kilovolts, or millivolts</li>
            <li>• For AC circuits, optionally enter power factor (0-1, default is 1.0)</li>
            <li>• Formula: I = P / V (DC) or I = P / (V × PF) (AC)</li>
            <li>• The calculator converts all units to base units automatically</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

