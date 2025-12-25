'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'powerFactor' | 'realPower' | 'apparentPower';

interface PowerFactorCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function PowerFactorCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: PowerFactorCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('powerFactor');
  const [powerFactor, setPowerFactor] = useState('');
  const [realPower, setRealPower] = useState('');
  const [apparentPower, setApparentPower] = useState('');
  const [result, setResult] = useState<{ value: number; unit: string; label: string; phaseAngle?: number } | null>(null);
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

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const pf = parseFloat(powerFactor);
    const p = parseFloat(realPower);
    const s = parseFloat(apparentPower);

    if (calculationMode === 'powerFactor') {
      // Calculate Power Factor: PF = P / S
      if (!realPower || !apparentPower) {
        setError('Please enter both real power and apparent power');
        return;
      }

      if (isNaN(p) || p < 0) {
        setError('Real power must be a valid non-negative number');
        return;
      }
      if (isNaN(s) || s <= 0) {
        setError('Apparent power must be a valid positive number');
        return;
      }

      const calculatedPF = p / s;
      if (calculatedPF > 1) {
        setError('Power factor cannot exceed 1. Please check your inputs.');
        return;
      }

      const phaseAngle = Math.acos(calculatedPF) * (180 / Math.PI);

      setResult({ value: calculatedPF, unit: '', label: 'Power Factor', phaseAngle });
      setCalculation(`Power Factor = Real Power ÷ Apparent Power\nPF = P / S\nPF = ${formatValue(p)} W ÷ ${formatValue(s)} VA\nPF = ${formatValue(calculatedPF)}\n\nPhase Angle: φ = arccos(${formatValue(calculatedPF)}) = ${formatValue(phaseAngle)}°`);
    } else if (calculationMode === 'realPower') {
      // Calculate Real Power: P = PF × S
      if (!powerFactor || !apparentPower) {
        setError('Please enter both power factor and apparent power');
        return;
      }

      if (isNaN(pf) || pf < 0 || pf > 1) {
        setError('Power factor must be between 0 and 1');
        return;
      }
      if (isNaN(s) || s < 0) {
        setError('Apparent power must be a valid non-negative number');
        return;
      }

      const calculatedRealPower = pf * s;

      setResult({ value: calculatedRealPower, unit: 'W', label: 'Real Power (Active Power)' });
      setCalculation(`Real Power = Power Factor × Apparent Power\nP = PF × S\nP = ${formatValue(pf)} × ${formatValue(s)} VA\nP = ${formatValue(calculatedRealPower)} W`);
    } else if (calculationMode === 'apparentPower') {
      // Calculate Apparent Power: S = P / PF
      if (!realPower || !powerFactor) {
        setError('Please enter both real power and power factor');
        return;
      }

      if (isNaN(p) || p < 0) {
        setError('Real power must be a valid non-negative number');
        return;
      }
      if (isNaN(pf) || pf <= 0 || pf > 1) {
        setError('Power factor must be between 0 and 1 (exclusive of 0)');
        return;
      }

      const calculatedApparentPower = p / pf;

      setResult({ value: calculatedApparentPower, unit: 'VA', label: 'Apparent Power' });
      setCalculation(`Apparent Power = Real Power ÷ Power Factor\nS = P / PF\nS = ${formatValue(p)} W ÷ ${formatValue(pf)}\nS = ${formatValue(calculatedApparentPower)} VA`);
    }
  };

  const clearAll = () => {
    setPowerFactor('');
    setRealPower('');
    setApparentPower('');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Power Factor Calculator</h2>
          <p className="text-gray-600">Calculate power factor, real power, or apparent power in AC circuits</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Mode
          </label>
          <select
            value={calculationMode}
            onChange={(e) => {
              setCalculationMode(e.target.value as CalculationMode);
              clearAll();
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="powerFactor">Calculate Power Factor</option>
            <option value="realPower">Calculate Real Power (Active Power)</option>
            <option value="apparentPower">Calculate Apparent Power</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            PF = P / S
          </p>
          <p className="text-xs text-gray-600 mt-1">Where: PF = Power Factor, P = Real Power (W), S = Apparent Power (VA)</p>
        </div>

        {/* Power Factor Input */}
        {(calculationMode === 'realPower' || calculationMode === 'apparentPower') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Power Factor (PF)
            </label>
            <Input
              type="text"
              placeholder="Enter power factor (0 to 1)"
              value={powerFactor}
              onChange={(e) => setPowerFactor(e.target.value)}
              className="w-full"
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-1">
              Power factor ranges from 0 to 1. Typical values: 0.8-0.95 for motors, 0.9-1.0 for resistive loads
            </p>
          </div>
        )}

        {/* Real Power Input */}
        {(calculationMode === 'powerFactor' || calculationMode === 'apparentPower') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Real Power (P) - Active Power
            </label>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter real power"
                value={realPower}
                onChange={(e) => setRealPower(e.target.value)}
                className="flex-1"
              />
              <div className="flex items-center text-sm text-gray-600">W (Watts)</div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Real power is the actual power consumed and converted into work
            </p>
          </div>
        )}

        {/* Apparent Power Input */}
        {(calculationMode === 'powerFactor' || calculationMode === 'realPower') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Apparent Power (S)
            </label>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter apparent power"
                value={apparentPower}
                onChange={(e) => setApparentPower(e.target.value)}
                className="flex-1"
              />
              <div className="flex items-center text-sm text-gray-600">VA (Volt-Amperes)</div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Apparent power = Voltage × Current (S = V × I)
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
            {result.phaseAngle !== undefined && (
              <p className="text-sm mt-2" style={{ color: `${primaryColor}CC` }}>
                Phase Angle: {formatValue(result.phaseAngle)}°
              </p>
            )}
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

        {calculation && calculation.startsWith('Error:') && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-mono">{calculation}</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {calculationMode === 'powerFactor' && (
              <>
                <li>• Enter real power (P) in watts and apparent power (S) in volt-amperes</li>
                <li>• Calculator will determine the power factor (PF = P / S)</li>
                <li>• Power factor ranges from 0 (purely reactive) to 1 (purely resistive)</li>
                <li>• Phase angle is automatically calculated: φ = arccos(PF)</li>
              </>
            )}
            {calculationMode === 'realPower' && (
              <>
                <li>• Enter power factor (0 to 1) and apparent power (S) in volt-amperes</li>
                <li>• Calculator will determine the real power (P = PF × S)</li>
                <li>• Real power is the actual power consumed by the load</li>
              </>
            )}
            {calculationMode === 'apparentPower' && (
              <>
                <li>• Enter real power (P) in watts and power factor (0 to 1)</li>
                <li>• Calculator will determine the apparent power (S = P / PF)</li>
                <li>• Apparent power is the product of voltage and current (S = V × I)</li>
              </>
            )}
            <li>• Power factor indicates how effectively electrical power is being used</li>
            <li>• A low power factor means more current is required to deliver the same real power</li>
            <li>• Power factor correction can improve efficiency and reduce energy costs</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

