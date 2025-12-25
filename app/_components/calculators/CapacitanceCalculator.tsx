'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'capacitance' | 'charge' | 'voltage';

interface CapacitanceCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Unit conversion factors
const capacitanceUnits = {
  'F': { name: 'F (Farads)', factor: 1 },
  'mF': { name: 'mF (Millifarads)', factor: 1e-3 },
  'μF': { name: 'μF (Microfarads)', factor: 1e-6 },
  'nF': { name: 'nF (Nanofarads)', factor: 1e-9 },
  'pF': { name: 'pF (Picofarads)', factor: 1e-12 }
};

const chargeUnits = {
  'C': { name: 'C (Coulombs)', factor: 1 },
  'mC': { name: 'mC (Millicoulombs)', factor: 1e-3 },
  'μC': { name: 'μC (Microcoulombs)', factor: 1e-6 },
  'nC': { name: 'nC (Nanocoulombs)', factor: 1e-9 },
  'pC': { name: 'pC (Picocoulombs)', factor: 1e-12 }
};

const voltageUnits = {
  'V': { name: 'V (Volts)', factor: 1 },
  'mV': { name: 'mV (Millivolts)', factor: 1e-3 },
  'kV': { name: 'kV (Kilovolts)', factor: 1e3 }
};

export default function CapacitanceCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: CapacitanceCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('capacitance');
  const [capacitance, setCapacitance] = useState('');
  const [charge, setCharge] = useState('');
  const [voltage, setVoltage] = useState('');
  const [capacitanceUnit, setCapacitanceUnit] = useState('μF');
  const [chargeUnit, setChargeUnit] = useState('μC');
  const [voltageUnit, setVoltageUnit] = useState('V');
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

  const convertCapacitanceToBase = (value: number, unit: string): number => {
    return value * capacitanceUnits[unit as keyof typeof capacitanceUnits].factor;
  };

  const convertCapacitanceFromBase = (value: number, unit: string): number => {
    return value / capacitanceUnits[unit as keyof typeof capacitanceUnits].factor;
  };

  const convertChargeToBase = (value: number, unit: string): number => {
    return value * chargeUnits[unit as keyof typeof chargeUnits].factor;
  };

  const convertChargeFromBase = (value: number, unit: string): number => {
    return value / chargeUnits[unit as keyof typeof chargeUnits].factor;
  };

  const convertVoltageToBase = (value: number, unit: string): number => {
    return value * voltageUnits[unit as keyof typeof voltageUnits].factor;
  };

  const convertVoltageFromBase = (value: number, unit: string): number => {
    return value / voltageUnits[unit as keyof typeof voltageUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const C = capacitance ? parseFloat(capacitance) : NaN;
    const Q = charge ? parseFloat(charge) : NaN;
    const V = voltage ? parseFloat(voltage) : NaN;

    if (calculationMode === 'capacitance') {
      // Calculate capacitance: C = Q/V
      if (!charge || !voltage) {
        setError('Please enter both charge and voltage');
        return;
      }

      if (isNaN(Q) || Q === 0) {
        setError('Charge must be a valid non-zero number');
        return;
      }
      if (isNaN(V) || V === 0) {
        setError('Voltage must be a valid non-zero number');
        return;
      }

      const QBase = convertChargeToBase(Q, chargeUnit);
      const VBase = convertVoltageToBase(V, voltageUnit);
      const CBase = QBase / VBase;
      const CResult = convertCapacitanceFromBase(CBase, capacitanceUnit);

      setResult({ value: CResult, unit: capacitanceUnit, label: 'Capacitance' });
      setCalculation(`Capacitance (C) = Charge (Q) / Voltage (V)\nC = Q / V\nQ = ${formatValue(Q)} ${chargeUnit} = ${formatValue(QBase)} C\nV = ${formatValue(V)} ${voltageUnit} = ${formatValue(VBase)} V\nC = ${formatValue(QBase)} C / ${formatValue(VBase)} V = ${formatValue(CBase)} F = ${formatValue(CResult)} ${capacitanceUnit}`);
    } else if (calculationMode === 'charge') {
      // Calculate charge: Q = CV
      if (!capacitance || !voltage) {
        setError('Please enter both capacitance and voltage');
        return;
      }

      if (isNaN(C) || C <= 0) {
        setError('Capacitance must be a valid positive number');
        return;
      }
      if (isNaN(V) || V === 0) {
        setError('Voltage must be a valid non-zero number');
        return;
      }

      const CBase = convertCapacitanceToBase(C, capacitanceUnit);
      const VBase = convertVoltageToBase(V, voltageUnit);
      const QBase = CBase * VBase;
      const QResult = convertChargeFromBase(QBase, chargeUnit);

      setResult({ value: QResult, unit: chargeUnit, label: 'Charge' });
      setCalculation(`Charge (Q) = Capacitance (C) × Voltage (V)\nQ = C × V\nC = ${formatValue(C)} ${capacitanceUnit} = ${formatValue(CBase)} F\nV = ${formatValue(V)} ${voltageUnit} = ${formatValue(VBase)} V\nQ = ${formatValue(CBase)} F × ${formatValue(VBase)} V = ${formatValue(QBase)} C = ${formatValue(QResult)} ${chargeUnit}`);
    } else if (calculationMode === 'voltage') {
      // Calculate voltage: V = Q/C
      if (!charge || !capacitance) {
        setError('Please enter both charge and capacitance');
        return;
      }

      if (isNaN(Q) || Q === 0) {
        setError('Charge must be a valid non-zero number');
        return;
      }
      if (isNaN(C) || C <= 0) {
        setError('Capacitance must be a valid positive number');
        return;
      }

      const QBase = convertChargeToBase(Q, chargeUnit);
      const CBase = convertCapacitanceToBase(C, capacitanceUnit);
      const VBase = QBase / CBase;
      const VResult = convertVoltageFromBase(VBase, voltageUnit);

      setResult({ value: VResult, unit: voltageUnit, label: 'Voltage' });
      setCalculation(`Voltage (V) = Charge (Q) / Capacitance (C)\nV = Q / C\nQ = ${formatValue(Q)} ${chargeUnit} = ${formatValue(QBase)} C\nC = ${formatValue(C)} ${capacitanceUnit} = ${formatValue(CBase)} F\nV = ${formatValue(QBase)} C / ${formatValue(CBase)} F = ${formatValue(VBase)} V = ${formatValue(VResult)} ${voltageUnit}`);
    }
  };

  const clearAll = () => {
    setCapacitance('');
    setCharge('');
    setVoltage('');
    setCapacitanceUnit('μF');
    setChargeUnit('μC');
    setVoltageUnit('V');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Capacitance Calculator</h2>
          <p className="text-gray-600">Calculate capacitance, charge, or voltage using C = Q/V</p>
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
            <option value="capacitance">Capacitance (C)</option>
            <option value="charge">Charge (Q)</option>
            <option value="voltage">Voltage (V)</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            C = Q / V
          </p>
          <p className="text-xs text-gray-600 mt-1">Where: C = Capacitance, Q = Charge, V = Voltage</p>
        </div>

        {/* Capacitance Input */}
        {(calculationMode === 'charge' || calculationMode === 'voltage') && (
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
                  autoFocus
                />
              </div>
              <div className="w-32">
                <select
                  value={capacitanceUnit}
                  onChange={(e) => setCapacitanceUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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
        )}

        {/* Charge Input */}
        {(calculationMode === 'capacitance' || calculationMode === 'voltage') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Charge (Q)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter charge"
                  value={charge}
                  onChange={(e) => setCharge(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
                <select
                  value={chargeUnit}
                  onChange={(e) => setChargeUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(chargeUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Voltage Input */}
        {(calculationMode === 'capacitance' || calculationMode === 'charge') && (
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
            {calculationMode === 'capacitance' && (
              <>
                <li>• Enter the charge (Q) and voltage (V)</li>
                <li>• Calculator will determine the capacitance</li>
                <li>• Formula: C = Q / V</li>
              </>
            )}
            {calculationMode === 'charge' && (
              <>
                <li>• Enter the capacitance (C) and voltage (V)</li>
                <li>• Calculator will determine the charge stored</li>
                <li>• Formula: Q = C × V</li>
              </>
            )}
            {calculationMode === 'voltage' && (
              <>
                <li>• Enter the charge (Q) and capacitance (C)</li>
                <li>• Calculator will determine the voltage</li>
                <li>• Formula: V = Q / C</li>
              </>
            )}
            <li>• Capacitance is measured in Farads (F), commonly in microfarads (μF), nanofarads (nF), or picofarads (pF)</li>
            <li>• Charge is measured in Coulombs (C), commonly in microcoulombs (μC) or nanocoulombs (nC)</li>
            <li>• Voltage is measured in Volts (V)</li>
            <li>• This calculator uses the fundamental relationship: C = Q/V</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

