'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMethod = 'kva-from-voltage-current' | 'kva-from-kw-pf' | 'kw-from-kva-pf' | 'pf-from-kva-kw';

export default function KVACalculator() {
  const [method, setMethod] = useState<CalculationMethod>('kva-from-voltage-current');
  
  // kVA from voltage and current
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [phase, setPhase] = useState('3');
  
  // kVA from kW and power factor
  const [kw, setKw] = useState('');
  const [powerFactor, setPowerFactor] = useState('');
  
  // kW from kVA and power factor
  const [kva, setKva] = useState('');
  const [powerFactorForKw, setPowerFactorForKw] = useState('');
  
  // PF from kVA and kW
  const [kvaForPf, setKvaForPf] = useState('');
  const [kwForPf, setKwForPf] = useState('');
  
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

  const calculate = () => {
    if (method === 'kva-from-voltage-current') {
      const vVal = voltage ? parseFloat(voltage) : NaN;
      const iVal = current ? parseFloat(current) : NaN;
      const phaseVal = parseInt(phase);

      if (!voltage || !current) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(vVal) || isNaN(iVal) || vVal <= 0 || iVal <= 0) {
        setResult(null);
        setCalculation('Error: Voltage and current must be positive numbers.');
        return;
      }

      // Calculate kVA: S = (√3 × V × I) / 1000 for 3-phase or S = (V × I) / 1000 for 1-phase
      let kvaVal: number;
      if (phaseVal === 3) {
        kvaVal = (Math.sqrt(3) * vVal * iVal) / 1000;
        setCalculation(`kVA = (√3 × V × I) / 1000 = (1.732 × ${formatValue(vVal)} × ${formatValue(iVal)}) / 1000 = ${formatValue(kvaVal)} kVA`);
      } else {
        kvaVal = (vVal * iVal) / 1000;
        setCalculation(`kVA = (V × I) / 1000 = (${formatValue(vVal)} × ${formatValue(iVal)}) / 1000 = ${formatValue(kvaVal)} kVA`);
      }

      setResult({ value: kvaVal, unit: 'kVA' });
    } else if (method === 'kva-from-kw-pf') {
      const kwVal = kw ? parseFloat(kw) : NaN;
      const pfVal = powerFactor ? parseFloat(powerFactor) : NaN;

      if (!kw || !powerFactor) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(kwVal) || isNaN(pfVal) || kwVal <= 0 || pfVal <= 0 || pfVal > 1) {
        setResult(null);
        setCalculation('Error: kW must be positive. Power factor must be between 0 and 1.');
        return;
      }

      // Calculate kVA: S = P / PF
      const kvaVal = kwVal / pfVal;

      setResult({ value: kvaVal, unit: 'kVA' });
      setCalculation(`kVA = kW / PF = ${formatValue(kwVal)} / ${formatValue(pfVal)} = ${formatValue(kvaVal)} kVA`);
    } else if (method === 'kw-from-kva-pf') {
      const kvaVal = kva ? parseFloat(kva) : NaN;
      const pfVal = powerFactorForKw ? parseFloat(powerFactorForKw) : NaN;

      if (!kva || !powerFactorForKw) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(kvaVal) || isNaN(pfVal) || kvaVal <= 0 || pfVal <= 0 || pfVal > 1) {
        setResult(null);
        setCalculation('Error: kVA must be positive. Power factor must be between 0 and 1.');
        return;
      }

      // Calculate kW: P = S × PF
      const kwVal = kvaVal * pfVal;

      setResult({ value: kwVal, unit: 'kW' });
      setCalculation(`kW = kVA × PF = ${formatValue(kvaVal)} × ${formatValue(pfVal)} = ${formatValue(kwVal)} kW`);
    } else if (method === 'pf-from-kva-kw') {
      const kvaVal = kvaForPf ? parseFloat(kvaForPf) : NaN;
      const kwVal = kwForPf ? parseFloat(kwForPf) : NaN;

      if (!kvaForPf || !kwForPf) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(kvaVal) || isNaN(kwVal) || kvaVal <= 0 || kwVal <= 0 || kwVal > kvaVal) {
        setResult(null);
        setCalculation('Error: kVA and kW must be positive. kW cannot exceed kVA.');
        return;
      }

      // Calculate PF: PF = P / S
      const pfVal = kwVal / kvaVal;

      setResult({ value: pfVal, unit: '' });
      setCalculation(`Power Factor = kW / kVA = ${formatValue(kwVal)} / ${formatValue(kvaVal)} = ${formatValue(pfVal)}`);
    }
  };

  const clearAll = () => {
    setVoltage('');
    setCurrent('');
    setKw('');
    setPowerFactor('');
    setKva('');
    setPowerFactorForKw('');
    setKvaForPf('');
    setKwForPf('');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">kVA Calculator</h2>
        <p className="text-gray-600">Calculate kilovolt-amperes for AC electrical power systems</p>
      </div>

      <div className="space-y-6">
        {/* Method Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Calculation Method
          </label>
          <select
            value={method}
            onChange={(e) => {
              setMethod(e.target.value as CalculationMethod);
              clearAll();
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="kva-from-voltage-current">Find kVA from Voltage & Current</option>
            <option value="kva-from-kw-pf">Find kVA from kW & Power Factor</option>
            <option value="kw-from-kva-pf">Find kW from kVA & Power Factor</option>
            <option value="pf-from-kva-kw">Find Power Factor from kVA & kW</option>
          </select>
        </div>

        {/* kVA from Voltage and Current */}
        {method === 'kva-from-voltage-current' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                System Type
              </label>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                <option value="1">Single Phase (1Φ)</option>
                <option value="3">Three Phase (3Φ)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Voltage (V)
              </label>
              <Input
                type="text"
                placeholder="e.g., 120, 208, 240, 480, 2300"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Current (A)
              </label>
              <Input
                type="text"
                placeholder="Enter current in amperes"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="w-full"
              />
            </div>
          </>
        )}

        {/* kVA from kW and Power Factor */}
        {method === 'kva-from-kw-pf' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Real Power (kW)
              </label>
              <Input
                type="text"
                placeholder="Enter power in kilowatts"
                value={kw}
                onChange={(e) => setKw(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Power Factor (0 to 1)
              </label>
              <Input
                type="text"
                placeholder="e.g., 0.85, 0.9, 0.95"
                value={powerFactor}
                onChange={(e) => setPowerFactor(e.target.value)}
                className="w-full"
              />
            </div>
          </>
        )}

        {/* kW from kVA and Power Factor */}
        {method === 'kw-from-kva-pf' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Apparent Power (kVA)
              </label>
              <Input
                type="text"
                placeholder="Enter apparent power in kilovolt-amperes"
                value={kva}
                onChange={(e) => setKva(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Power Factor (0 to 1)
              </label>
              <Input
                type="text"
                placeholder="e.g., 0.85, 0.9, 0.95"
                value={powerFactorForKw}
                onChange={(e) => setPowerFactorForKw(e.target.value)}
                className="w-full"
              />
            </div>
          </>
        )}

        {/* Power Factor from kVA and kW */}
        {method === 'pf-from-kva-kw' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Apparent Power (kVA)
              </label>
              <Input
                type="text"
                placeholder="Enter apparent power in kilovolt-amperes"
                value={kvaForPf}
                onChange={(e) => setKvaForPf(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Real Power (kW)
              </label>
              <Input
                type="text"
                placeholder="Enter power in kilowatts"
                value={kwForPf}
                onChange={(e) => setKwForPf(e.target.value)}
                className="w-full"
              />
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
          <div className={`mt-6 p-4 ${getResultColor()} border rounded-lg`}>
            <h3 className={`text-lg font-semibold ${getResultTextColor()} mb-2`}>Result</h3>
            <p className={`text-2xl font-bold ${getResultTextColor()}`}>
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && (
              <p className={`text-sm ${getResultTextColor()}/80 mt-2 font-mono`}>
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
            <li>• <strong>kVA (Kilovolt-Amperes):</strong> Apparent power in AC electrical systems</li>
            <li>• <strong>1-Phase Formula:</strong> kVA = (V × I) / 1000</li>
            <li>• <strong>3-Phase Formula:</strong> kVA = (√3 × V × I) / 1000 ≈ (1.732 × V × I) / 1000</li>
            <li>• <strong>From Power & PF:</strong> kVA = kW / Power Factor</li>
            <li>• <strong>Real Power:</strong> kW = kVA × Power Factor</li>
            <li>• <strong>Power Factor:</strong> Typically 0.8-0.95 for industrial loads</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
