'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'resistance' | 'voltage' | 'current';

interface OhmsLawResistanceCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Unit conversion factors
const voltageUnits = {
  'V': { name: 'V (Volts)', factor: 1 },
  'mV': { name: 'mV (Millivolts)', factor: 0.001 },
  'kV': { name: 'kV (Kilovolts)', factor: 1000 },
  'μV': { name: 'μV (Microvolts)', factor: 0.000001 }
};

const currentUnits = {
  'A': { name: 'A (Amperes)', factor: 1 },
  'mA': { name: 'mA (Milliamperes)', factor: 0.001 },
  'μA': { name: 'μA (Microamperes)', factor: 0.000001 },
  'kA': { name: 'kA (Kiloamperes)', factor: 1000 },
  'nA': { name: 'nA (Nanoamperes)', factor: 0.000000001 }
};

const resistanceUnits = {
  'Ω': { name: 'Ω (Ohms)', factor: 1 },
  'kΩ': { name: 'kΩ (Kiloohms)', factor: 1000 },
  'MΩ': { name: 'MΩ (Megaohms)', factor: 1000000 },
  'mΩ': { name: 'mΩ (Milliohms)', factor: 0.001 },
  'μΩ': { name: 'μΩ (Microohms)', factor: 0.000001 }
};

export default function OhmsLawResistanceCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: OhmsLawResistanceCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('resistance');
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');
  const [voltageUnit, setVoltageUnit] = useState('V');
  const [currentUnit, setCurrentUnit] = useState('A');
  const [resistanceUnit, setResistanceUnit] = useState('Ω');
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

  const convertVoltageToBase = (value: number, unit: string): number => {
    return value * voltageUnits[unit as keyof typeof voltageUnits].factor;
  };

  const convertVoltageFromBase = (value: number, unit: string): number => {
    return value / voltageUnits[unit as keyof typeof voltageUnits].factor;
  };

  const convertCurrentToBase = (value: number, unit: string): number => {
    return value * currentUnits[unit as keyof typeof currentUnits].factor;
  };

  const convertCurrentFromBase = (value: number, unit: string): number => {
    return value / currentUnits[unit as keyof typeof currentUnits].factor;
  };

  const convertResistanceToBase = (value: number, unit: string): number => {
    return value * resistanceUnits[unit as keyof typeof resistanceUnits].factor;
  };

  const convertResistanceFromBase = (value: number, unit: string): number => {
    return value / resistanceUnits[unit as keyof typeof resistanceUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const V = voltage ? parseFloat(voltage) : NaN;
    const I = current ? parseFloat(current) : NaN;
    const R = resistance ? parseFloat(resistance) : NaN;

    if (calculationMode === 'resistance') {
      // Calculate resistance: R = V/I
      if (!voltage || !current) {
        setError('Please enter both voltage and current');
        return;
      }

      if (isNaN(V) || V === 0) {
        setError('Voltage must be a valid non-zero number');
        return;
      }
      if (isNaN(I) || I === 0) {
        setError('Current must be a valid non-zero number');
        return;
      }

      const VBase = convertVoltageToBase(V, voltageUnit);
      const IBase = convertCurrentToBase(I, currentUnit);
      const RBase = VBase / IBase;
      const RResult = convertResistanceFromBase(RBase, resistanceUnit);

      setResult({ value: RResult, unit: resistanceUnit, label: 'Resistance' });
      setCalculation(`Resistance (R) = Voltage (V) / Current (I)\nR = V / I\nV = ${formatValue(V)} ${voltageUnit} = ${formatValue(VBase)} V\nI = ${formatValue(I)} ${currentUnit} = ${formatValue(IBase)} A\nR = ${formatValue(VBase)} V / ${formatValue(IBase)} A = ${formatValue(RBase)} Ω = ${formatValue(RResult)} ${resistanceUnit}`);
    } else if (calculationMode === 'voltage') {
      // Calculate voltage: V = I × R
      if (!current || !resistance) {
        setError('Please enter both current and resistance');
        return;
      }

      if (isNaN(I) || I === 0) {
        setError('Current must be a valid non-zero number');
        return;
      }
      if (isNaN(R) || R <= 0) {
        setError('Resistance must be a valid positive number');
        return;
      }

      const IBase = convertCurrentToBase(I, currentUnit);
      const RBase = convertResistanceToBase(R, resistanceUnit);
      const VBase = IBase * RBase;
      const VResult = convertVoltageFromBase(VBase, voltageUnit);

      setResult({ value: VResult, unit: voltageUnit, label: 'Voltage' });
      setCalculation(`Voltage (V) = Current (I) × Resistance (R)\nV = I × R\nI = ${formatValue(I)} ${currentUnit} = ${formatValue(IBase)} A\nR = ${formatValue(R)} ${resistanceUnit} = ${formatValue(RBase)} Ω\nV = ${formatValue(IBase)} A × ${formatValue(RBase)} Ω = ${formatValue(VBase)} V = ${formatValue(VResult)} ${voltageUnit}`);
    } else if (calculationMode === 'current') {
      // Calculate current: I = V/R
      if (!voltage || !resistance) {
        setError('Please enter both voltage and resistance');
        return;
      }

      if (isNaN(V) || V === 0) {
        setError('Voltage must be a valid non-zero number');
        return;
      }
      if (isNaN(R) || R <= 0) {
        setError('Resistance must be a valid positive number');
        return;
      }

      const VBase = convertVoltageToBase(V, voltageUnit);
      const RBase = convertResistanceToBase(R, resistanceUnit);
      const IBase = VBase / RBase;
      const IResult = convertCurrentFromBase(IBase, currentUnit);

      setResult({ value: IResult, unit: currentUnit, label: 'Current' });
      setCalculation(`Current (I) = Voltage (V) / Resistance (R)\nI = V / R\nV = ${formatValue(V)} ${voltageUnit} = ${formatValue(VBase)} V\nR = ${formatValue(R)} ${resistanceUnit} = ${formatValue(RBase)} Ω\nI = ${formatValue(VBase)} V / ${formatValue(RBase)} Ω = ${formatValue(IBase)} A = ${formatValue(IResult)} ${currentUnit}`);
    }
  };

  const clearAll = () => {
    setVoltage('');
    setCurrent('');
    setResistance('');
    setVoltageUnit('V');
    setCurrentUnit('A');
    setResistanceUnit('Ω');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ohm&apos;s Law Resistance Calculator</h2>
          <p className="text-gray-600">Calculate resistance, voltage, or current using V = I × R</p>
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
            <option value="resistance">Resistance (R)</option>
            <option value="voltage">Voltage (V)</option>
            <option value="current">Current (I)</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Ohm&apos;s Law Formula:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            V = I × R
          </p>
          <p className="text-xs text-gray-600 mt-1">Where: V = Voltage, I = Current, R = Resistance</p>
        </div>

        {/* Voltage Input */}
        {(calculationMode === 'resistance' || calculationMode === 'current') && (
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
                  autoFocus
                />
              </div>
              <div className="w-32">
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
        )}

        {/* Current Input */}
        {(calculationMode === 'resistance' || calculationMode === 'voltage') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Current (I)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter current"
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
                <select
                  value={currentUnit}
                  onChange={(e) => setCurrentUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(currentUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Resistance Input */}
        {(calculationMode === 'voltage' || calculationMode === 'current') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Resistance (R)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter resistance"
                  value={resistance}
                  onChange={(e) => setResistance(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
                <select
                  value={resistanceUnit}
                  onChange={(e) => setResistanceUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(resistanceUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
            {calculationMode === 'resistance' && (
              <>
                <li>• Enter the voltage (V) and current (I)</li>
                <li>• Calculator will determine the resistance</li>
                <li>• Formula: R = V / I</li>
              </>
            )}
            {calculationMode === 'voltage' && (
              <>
                <li>• Enter the current (I) and resistance (R)</li>
                <li>• Calculator will determine the voltage</li>
                <li>• Formula: V = I × R</li>
              </>
            )}
            {calculationMode === 'current' && (
              <>
                <li>• Enter the voltage (V) and resistance (R)</li>
                <li>• Calculator will determine the current</li>
                <li>• Formula: I = V / R</li>
              </>
            )}
            <li>• Ohm&apos;s Law: V = I × R (Voltage = Current × Resistance)</li>
            <li>• Resistance is measured in Ohms (Ω), commonly in kiloohms (kΩ) or megaohms (MΩ)</li>
            <li>• Voltage is measured in Volts (V)</li>
            <li>• Current is measured in Amperes (A), commonly in milliamperes (mA)</li>
            <li>• The calculator automatically handles unit conversions</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

