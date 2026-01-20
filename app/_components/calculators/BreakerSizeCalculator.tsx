'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMethod = 'breaker-from-current' | 'max-current-from-breaker' | 'wire-size-from-breaker' | 'fault-current-calc';

export default function BreakerSizeCalculator() {
  const [method, setMethod] = useState<CalculationMethod>('breaker-from-current');
  
  // Breaker from current
  const [loadCurrent, setLoadCurrent] = useState('');
  const [phaseSystem, setPhaseSystem] = useState('1');
  const [deratingFactor, setDeratingFactor] = useState('1.25');
  
  // Max current from breaker
  const [breakerSize, setBreakerSize] = useState('');
  const [breakerUnit, setBreakerUnit] = useState('A');
  
  // Wire size from breaker
  const [breakerSizeForWire, setBreakerSizeForWire] = useState('');
  const [breakerUnitForWire, setBreakerUnitForWire] = useState('A');
  const [wireInsulation, setWireInsulation] = useState('copper');
  
  // Fault current calculation
  const [voltage, setVoltage] = useState('');
  const [impedance, setImpedance] = useState('');
  
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
    return value.toFixed(2).replace(/\.?0+$/, '');
  };

  // Standard breaker sizes (ANSI standard)
  const standardBreakerSizes = [15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110, 125, 150, 175, 200, 225, 250, 300, 350, 400, 450, 500];

  const getNextStandardBreaker = (current: number): number => {
    return standardBreakerSizes.find(size => size >= current) || 500;
  };

  // AWG wire size reference (single conductor, copper, 75°C)
  const getWireSizeFromBreaker = (breakerAmp: number, insulation: string): string => {
    // Simplified wire sizing guide for 75°C insulation
    const wireSizesCu = {
      15: '14',
      20: '12',
      30: '10',
      40: '8',
      50: '6',
      60: '4',
      70: '2',
      80: '1',
      100: '1/0',
      125: '2/0',
      150: '3/0',
      175: '4/0',
      200: '250',
      225: '300',
      250: '350',
      300: '400',
      350: '500',
      400: '600',
    };

    const wireSizesAl = {
      15: '12',
      20: '10',
      30: '8',
      40: '6',
      50: '4',
      60: '2',
      70: '1',
      80: '1/0',
      100: '2/0',
      125: '3/0',
      150: '4/0',
      175: '250',
      200: '300',
      225: '350',
      250: '400',
      300: '500',
      350: '600',
      400: '700',
    };

    const sizes = insulation === 'copper' ? wireSizesCu : wireSizesAl;
    return sizes[breakerAmp as keyof typeof sizes] || 'Check NEC Table 310';
  };

  const calculate = () => {
    if (method === 'breaker-from-current') {
      const currentVal = loadCurrent ? parseFloat(loadCurrent) : NaN;
      const deratingVal = parseFloat(deratingFactor) || 1.25;

      if (!loadCurrent) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(currentVal) || currentVal <= 0) {
        setResult(null);
        setCalculation('Error: Load current must be a positive number.');
        return;
      }

      // Breaker size = Load current × Derating factor, then round up to standard size
      const breakerRequired = currentVal * deratingVal;
      const breakerStandard = getNextStandardBreaker(breakerRequired);

      setResult({ value: breakerStandard, unit: 'A' });
      setCalculation(`Breaker Size = Load Current × Derating Factor = ${formatValue(currentVal)} × ${formatValue(deratingVal)} = ${formatValue(breakerRequired)} A → Standard Breaker: ${formatValue(breakerStandard)} A`);
    } else if (method === 'max-current-from-breaker') {
      const sizeVal = breakerSize ? parseFloat(breakerSize) : NaN;

      if (!breakerSize) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(sizeVal) || sizeVal <= 0) {
        setResult(null);
        setCalculation('Error: Breaker size must be a positive number.');
        return;
      }

      // Maximum current is the breaker trip rating
      setResult({ value: sizeVal, unit: 'A' });
      setCalculation(`Maximum Circuit Current = Breaker Trip Rating = ${formatValue(sizeVal)} A (at which breaker will trip)`);
    } else if (method === 'wire-size-from-breaker') {
      const sizeVal = breakerSizeForWire ? parseFloat(breakerSizeForWire) : NaN;

      if (!breakerSizeForWire) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(sizeVal) || sizeVal <= 0) {
        setResult(null);
        setCalculation('Error: Breaker size must be a positive number.');
        return;
      }

      const wireSize = getWireSizeFromBreaker(sizeVal, wireInsulation);
      setResult({ value: sizeVal, unit: `AWG ${wireSize} (${wireInsulation})` });
      setCalculation(`Wire Size for ${formatValue(sizeVal)} A Breaker: ${wireSize} AWG (${wireInsulation} conductor, 75°C insulation, per NEC Table 310)`);
    } else if (method === 'fault-current-calc') {
      const voltVal = voltage ? parseFloat(voltage) : NaN;
      const impedVal = impedance ? parseFloat(impedance) : NaN;

      if (!voltage || !impedance) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(voltVal) || isNaN(impedVal) || voltVal <= 0 || impedVal <= 0) {
        setResult(null);
        setCalculation('Error: Voltage and impedance must be positive numbers.');
        return;
      }

      // Fault current I = V / Z
      const faultCurrent = voltVal / impedVal;

      setResult({ value: faultCurrent, unit: 'A' });
      setCalculation(`Fault Current = V / Z = ${formatValue(voltVal)} / ${formatValue(impedVal)} = ${formatValue(faultCurrent)} A`);
    }
  };

  const handleCalculate = () => {
    calculate();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Breaker Size Calculator</h2>
          
          <div className="border-b-2 border-gray-200 pb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Select Calculation Method</label>
            <div className="grid grid-cols-1 gap-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="breaker-from-current"
                  checked={method === 'breaker-from-current'}
                  onChange={(e) => {
                    setMethod(e.target.value as CalculationMethod);
                    setResult(null);
                    setCalculation('');
                  }}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Find Breaker Size from Load Current</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="max-current-from-breaker"
                  checked={method === 'max-current-from-breaker'}
                  onChange={(e) => {
                    setMethod(e.target.value as CalculationMethod);
                    setResult(null);
                    setCalculation('');
                  }}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Find Maximum Current from Breaker Size</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="wire-size-from-breaker"
                  checked={method === 'wire-size-from-breaker'}
                  onChange={(e) => {
                    setMethod(e.target.value as CalculationMethod);
                    setResult(null);
                    setCalculation('');
                  }}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Find Wire Size from Breaker Size</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="fault-current-calc"
                  checked={method === 'fault-current-calc'}
                  onChange={(e) => {
                    setMethod(e.target.value as CalculationMethod);
                    setResult(null);
                    setCalculation('');
                  }}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Calculate Fault Current</span>
              </label>
            </div>
          </div>

          {method === 'breaker-from-current' && (
            <div className="space-y-3">
              <Input
                label="Load Current (Amperes)"
                value={loadCurrent}
                onChange={(e) => setLoadCurrent(e.target.value)}
                placeholder="e.g., 30"
                type="number"
              />
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Derating Factor</label>
                  <select
                    value={deratingFactor}
                    onChange={(e) => setDeratingFactor(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="1.0">1.0 (100% - Continuous Load)</option>
                    <option value="1.25">1.25 (125% - Standard)</option>
                    <option value="1.33">1.33 (133% - Motor Loads)</option>
                    <option value="1.5">1.5 (150% - Heavy Duty)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {method === 'max-current-from-breaker' && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  label="Breaker Size"
                  value={breakerSize}
                  onChange={(e) => setBreakerSize(e.target.value)}
                  placeholder="e.g., 40"
                  type="number"
                />
              </div>
              <div className="w-20">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select
                  value={breakerUnit}
                  onChange={(e) => setBreakerUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                >
                  <option value="A">A</option>
                </select>
              </div>
            </div>
          )}

          {method === 'wire-size-from-breaker' && (
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Breaker Size"
                    value={breakerSizeForWire}
                    onChange={(e) => setBreakerSizeForWire(e.target.value)}
                    placeholder="e.g., 40"
                    type="number"
                  />
                </div>
                <div className="w-20">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={breakerUnitForWire}
                    onChange={(e) => setBreakerUnitForWire(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="A">A</option>
                  </select>
                </div>
              </div>
              <label className="block">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">Conductor Material</span>
                <select
                  value={wireInsulation}
                  onChange={(e) => setWireInsulation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                >
                  <option value="copper">Copper (75°C)</option>
                  <option value="aluminum">Aluminum (75°C)</option>
                </select>
              </label>
            </div>
          )}

          {method === 'fault-current-calc' && (
            <div className="space-y-3">
              <Input
                label="System Voltage (Volts)"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                placeholder="e.g., 480"
                type="number"
              />
              <Input
                label="System Impedance (Ohms)"
                value={impedance}
                onChange={(e) => setImpedance(e.target.value)}
                placeholder="e.g., 0.5"
                type="number"
              />
            </div>
          )}

          <Button onClick={handleCalculate} className="w-full bg-[#820ECC] text-white font-semibold py-3 rounded-lg hover:bg-[#6b0aa6] transition">
            Calculate
          </Button>

          {result && (
            <div className="bg-[#820ECC]/10 border-l-4 border-[#820ECC] p-4 rounded">
              <p className="text-gray-600 text-sm mb-2">{calculation}</p>
              <p className="text-2xl font-bold text-[#820ECC]">
                {formatValue(result.value)} {result.unit}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
