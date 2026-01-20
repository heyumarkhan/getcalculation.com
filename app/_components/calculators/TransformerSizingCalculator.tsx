'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors for voltage
const voltageUnits = {
  'V': { name: 'V (Volts)', factor: 1 },
  'kV': { name: 'kV (Kilovolts)', factor: 1000 }
};

// Unit conversion factors for current
const currentUnits = {
  'A': { name: 'A (Amperes)', factor: 1 },
  'mA': { name: 'mA (Milliamperes)', factor: 0.001 },
  'kA': { name: 'kA (Kiloamperes)', factor: 1000 }
};

// Unit conversion factors for power
const powerUnits = {
  'W': { name: 'W (Watts)', factor: 1 },
  'kW': { name: 'kW (Kilowatts)', factor: 1000 },
  'MW': { name: 'MW (Megawatts)', factor: 1000000 },
  'VA': { name: 'VA (Volt-Amperes)', factor: 1 },
  'kVA': { name: 'kVA (Kilovolt-Amperes)', factor: 1000 },
  'MVA': { name: 'MVA (Megavolt-Amperes)', factor: 1000000 }
};

// Wire size standards (AWG - American Wire Gauge)
const wireSizeChart = [
  { ampRange: 15, size: '14 AWG' },
  { ampRange: 20, size: '12 AWG' },
  { ampRange: 30, size: '10 AWG' },
  { ampRange: 40, size: '8 AWG' },
  { ampRange: 55, size: '6 AWG' },
  { ampRange: 75, size: '4 AWG' },
  { ampRange: 95, size: '2 AWG' },
  { ampRange: 110, size: '1 AWG' },
  { ampRange: 125, size: '1/0 AWG' },
  { ampRange: 145, size: '2/0 AWG' },
  { ampRange: 165, size: '3/0 AWG' },
  { ampRange: 200, size: '4/0 AWG' },
  { ampRange: 250, size: '250 kcmil' },
  { ampRange: 300, size: '300 kcmil' },
  { ampRange: 400, size: '400 kcmil' },
  { ampRange: 500, size: '500 kcmil' },
  { ampRange: 600, size: '600 kcmil' }
];

export default function TransformerSizingCalculator() {
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [power, setPower] = useState('');
  const [voltageUnit, setVoltageUnit] = useState('V');
  const [currentUnit, setCurrentUnit] = useState('A');
  const [powerUnit, setPowerUnit] = useState('kVA');
  const [coolingType, setCoolingType] = useState('ONAN');
  const [powerFactor, setPowerFactor] = useState('1');
  const [result, setResult] = useState<{
    kva: number;
    amps: number;
    wireSize: string;
    coolingDerating: number;
    adjustedKVA: number;
  } | null>(null);
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

  const getCoolingDerating = (type: string): number => {
    const dearatingFactors: { [key: string]: number } = {
      'ONAN': 1.0,      // Oil-Immersed Self-Cooled
      'ONAF': 1.333,    // Oil-Immersed Forced-Air-Cooled
      'OFAN': 1.333,    // Oil-Forced-Air-Cooled
      'OFWF': 1.667,    // Oil-Forced-Water-Cooled
      'DNAN': 0.9,      // Dry-Type Self-Cooled
      'DNAF': 1.25      // Dry-Type Forced-Air-Cooled
    };
    return dearatingFactors[type] || 1.0;
  };

  const getWireSize = (amps: number): string => {
    for (const wire of wireSizeChart) {
      if (amps <= wire.ampRange) {
        return wire.size;
      }
    }
    return '800 kcmil or larger';
  };

  const calculate = () => {
    const v = voltage ? parseFloat(voltage) : NaN;
    const i = current ? parseFloat(current) : NaN;
    const p = power ? parseFloat(power) : NaN;
    const pf = powerFactor ? parseFloat(powerFactor) : 1;

    const filledCount = [voltage, current, power].filter(val => val !== '').length;

    if (filledCount === 0) {
      setResult(null);
      setCalculation('Please enter at least one value to calculate');
      return;
    }

    // Validate power factor
    if (isNaN(pf) || pf <= 0 || pf > 1) {
      setResult(null);
      setCalculation('Error: Power factor must be between 0 and 1');
      return;
    }

    try {
      let kvaValue = 0;
      let ampValue = 0;
      let calcMessage = '';

      if (!isNaN(v) && !isNaN(i)) {
        // Calculate from voltage and current
        if (v <= 0 || i <= 0) {
          setResult(null);
          setCalculation('Error: Voltage and current must be positive values');
          return;
        }

        const vBase = v * voltageUnits[voltageUnit as keyof typeof voltageUnits].factor;
        const iBase = i * currentUnits[currentUnit as keyof typeof currentUnits].factor;

        // For three-phase, kVA = sqrt(3) * V * I / 1000
        // For single-phase, kVA = V * I / 1000
        kvaValue = (Math.sqrt(3) * vBase * iBase) / 1000;
        ampValue = iBase;
        calcMessage = `kVA = √3 × ${formatValue(v)} ${voltageUnit} × ${formatValue(i)} ${currentUnit} / 1000 = ${formatValue(kvaValue / 1000)} kVA`;
      } else if (!isNaN(p) && !isNaN(v)) {
        // Calculate from power and voltage
        if (p <= 0 || v <= 0) {
          setResult(null);
          setCalculation('Error: Power and voltage must be positive values');
          return;
        }

        const pBase = p * powerUnits[powerUnit as keyof typeof powerUnits].factor;
        const vBase = v * voltageUnits[voltageUnit as keyof typeof voltageUnits].factor;

        kvaValue = pBase / pf;
        ampValue = (kvaValue * 1000) / (Math.sqrt(3) * vBase);
        calcMessage = `kVA = ${formatValue(p)} ${powerUnit} / ${formatValue(pf)} = ${formatValue(kvaValue / 1000)} kVA, I = kVA × 1000 / (√3 × V) = ${formatValue(ampValue)} A`;
      } else if (!isNaN(p) && !isNaN(i)) {
        // Calculate from power and current
        if (p <= 0 || i <= 0) {
          setResult(null);
          setCalculation('Error: Power and current must be positive values');
          return;
        }

        const pBase = p * powerUnits[powerUnit as keyof typeof powerUnits].factor;
        const iBase = i * currentUnits[currentUnit as keyof typeof currentUnits].factor;

        kvaValue = pBase / pf;
        const vRequired = (kvaValue * 1000) / (Math.sqrt(3) * iBase);
        ampValue = iBase;
        calcMessage = `kVA = ${formatValue(p)} ${powerUnit} / ${formatValue(pf)} = ${formatValue(kvaValue / 1000)} kVA, Required Voltage = ${formatValue(vRequired)} V`;
      } else {
        setResult(null);
        setCalculation('Please enter at least two values to calculate');
        return;
      }

      // Get cooling derating
      const coolingDerating = getCoolingDerating(coolingType);
      const adjustedKVA = kvaValue / coolingDerating;
      const wireSize = getWireSize(ampValue * 1.25); // 25% safety margin for wire sizing

      setResult({
        kva: kvaValue,
        amps: ampValue,
        wireSize: wireSize,
        coolingDerating: coolingDerating,
        adjustedKVA: adjustedKVA
      });

      setCalculation(calcMessage);
    } catch (error) {
      setResult(null);
      setCalculation('Error: Invalid input values');
    }
  };

  const clearAll = () => {
    setVoltage('');
    setCurrent('');
    setPower('');
    setVoltageUnit('V');
    setCurrentUnit('A');
    setPowerUnit('kVA');
    setPowerFactor('1');
    setCoolingType('ONAN');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Transformer Sizing Calculator</h2>
        <p className="text-gray-600">Calculate transformer size, output current, and wire requirements</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula (Three-Phase):</p>
          <p className="font-mono text-lg font-bold text-gray-800">kVA = √3 × V × I / 1000</p>
          <p className="text-sm text-gray-600 mt-1">Where: V = Voltage (V), I = Current (A)</p>
        </div>

        {/* Voltage Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Primary Voltage (V) - Optional
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter primary voltage"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={voltageUnit}
                onChange={(e) => setVoltageUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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

        {/* Current Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Output Current (I) - Optional
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter output current"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={currentUnit}
                onChange={(e) => setCurrentUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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

        {/* Power Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Power Load - Optional
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter power"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                className="w-full"
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

        {/* Power Factor Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Power Factor (0-1)
          </label>
          <Input
            type="text"
            placeholder="Enter power factor (default: 1)"
            value={powerFactor}
            onChange={(e) => setPowerFactor(e.target.value)}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">Typical: 0.8-1.0 for most industrial loads</p>
        </div>

        {/* Cooling Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Cooling Type
          </label>
          <select
            value={coolingType}
            onChange={(e) => setCoolingType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="ONAN">ONAN - Oil-Immersed Self-Cooled (1.0x)</option>
            <option value="ONAF">ONAF - Oil-Immersed Forced-Air-Cooled (1.33x)</option>
            <option value="OFAN">OFAN - Oil-Forced-Air-Cooled (1.33x)</option>
            <option value="OFWF">OFWF - Oil-Forced-Water-Cooled (1.67x)</option>
            <option value="DNAN">DNAN - Dry-Type Self-Cooled (0.9x)</option>
            <option value="DNAF">DNAF - Dry-Type Forced-Air-Cooled (1.25x)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Affects transformer capacity rating</p>
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
          <div className="mt-6 p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg space-y-3">
            <h3 className="text-lg font-semibold text-[#820ECC] mb-3">Results</h3>
            
            <div className="bg-white p-3 rounded border border-[#820ECC]/20">
              <p className="text-sm text-gray-600">Transformer Capacity (Apparent Power)</p>
              <p className="text-xl font-bold text-[#820ECC]">
                {formatValue(result.kva / 1000)} kVA
              </p>
            </div>

            <div className="bg-white p-3 rounded border border-[#820ECC]/20">
              <p className="text-sm text-gray-600">Secondary Current</p>
              <p className="text-xl font-bold text-[#820ECC]">
                {formatValue(result.amps)} A
              </p>
            </div>

            <div className="bg-white p-3 rounded border border-[#820ECC]/20">
              <p className="text-sm text-gray-600">Recommended Wire Size (with 25% safety margin)</p>
              <p className="text-xl font-bold text-[#820ECC]">
                {result.wireSize}
              </p>
            </div>

            <div className="bg-white p-3 rounded border border-[#820ECC]/20">
              <p className="text-sm text-gray-600">Adjusted Capacity ({coolingType})</p>
              <p className="text-xl font-bold text-[#820ECC]">
                {formatValue(result.adjustedKVA / 1000)} kVA
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Cooling Derating Factor: {result.coolingDerating.toFixed(2)}x
              </p>
            </div>

            {calculation && !calculation.startsWith('Error:') && (
              <div className="bg-gray-50 p-2 rounded mt-2">
                <p className="text-xs text-gray-600 font-mono break-words">
                  {calculation}
                </p>
              </div>
            )}
          </div>
        )}

        {calculation && calculation.startsWith('Error:') && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-mono">{calculation}</p>
          </div>
        )}

        {calculation && !result && !calculation.startsWith('Error:') && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">{calculation}</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Enter at least two values (Voltage, Current, or Power) to calculate transformer size</li>
            <li>• Power factor typically ranges from 0.8 to 1.0 (1.0 = pure resistive load)</li>
            <li>• Cooling type affects the transformer's capacity rating</li>
            <li>• Wire size includes 25% safety margin for protection coordination</li>
            <li>• Three-phase calculations use √3 ≈ 1.732</li>
            <li>• All values should be positive numbers</li>
            <li>• For single-phase systems, use simpler V × I formulas separately</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
