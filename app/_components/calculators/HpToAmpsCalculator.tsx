'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors
const hpUnits = {
  'hp': { name: 'hp (Horsepower)', factor: 1 },
  'kW': { name: 'kW (Kilowatts)', factor: 1.34102 },
  'W': { name: 'W (Watts)', factor: 0.00134102 }
};

const voltageUnits = {
  'V': { name: 'V (Volts)', factor: 1 },
  'kV': { name: 'kV (Kilovolts)', factor: 1000 },
  'mV': { name: 'mV (Millivolts)', factor: 0.001 }
};

const currentUnits = {
  'A': { name: 'A (Amperes)', factor: 1 },
  'mA': { name: 'mA (Milliamperes)', factor: 0.001 },
  'kA': { name: 'kA (Kiloamperes)', factor: 1000 }
};

export default function HpToAmpsCalculator() {
  const [horsepower, setHorsepower] = useState('');
  const [voltage, setVoltage] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [current, setCurrent] = useState('');
  const [hpUnit, setHpUnit] = useState('hp');
  const [voltageUnit, setVoltageUnit] = useState('V');
  const [currentUnit, setCurrentUnit] = useState('A');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'current' | 'horsepower' | 'voltage' } | null>(null);
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

  const convertHpToBase = (value: number, unit: string) => {
    // Convert to horsepower first
    if (unit === 'hp') return value;
    if (unit === 'kW') return value / 0.7457; // 1 kW = 1.34102 hp, so 1 hp = 0.7457 kW
    if (unit === 'W') return value / 745.7; // 1 hp = 745.7 W
    return value;
  };

  const convertHpFromBase = (value: number, unit: string) => {
    if (unit === 'hp') return value;
    if (unit === 'kW') return value * 0.7457;
    if (unit === 'W') return value * 745.7;
    return value;
  };

  const convertVoltageToBase = (value: number, unit: string) => {
    return value * voltageUnits[unit as keyof typeof voltageUnits].factor;
  };

  const convertVoltageFromBase = (value: number, unit: string) => {
    return value / voltageUnits[unit as keyof typeof voltageUnits].factor;
  };

  const convertCurrentToBase = (value: number, unit: string) => {
    return value * currentUnits[unit as keyof typeof currentUnits].factor;
  };

  const convertCurrentFromBase = (value: number, unit: string) => {
    return value / currentUnits[unit as keyof typeof currentUnits].factor;
  };

  const calculate = () => {
    const hp = horsepower ? parseFloat(horsepower) : NaN;
    const v = voltage ? parseFloat(voltage) : NaN;
    const eff = efficiency ? parseFloat(efficiency) : NaN;
    const i = current ? parseFloat(current) : NaN;

    const filledCount = [horsepower, voltage, current].filter(val => val !== '').length;

    if (filledCount !== 2) {
      setResult(null);
      setCalculation('');
      return;
    }

    // Validate inputs
    if (horsepower && (isNaN(hp) || hp <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for horsepower');
      return;
    }
    if (voltage && (isNaN(v) || v <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for voltage');
      return;
    }
    if (efficiency && (isNaN(eff) || eff <= 0 || eff > 100)) {
      setResult(null);
      setCalculation('Error: Efficiency must be between 0 and 100');
      return;
    }
    if (current && (isNaN(i) || i <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for current');
      return;
    }

    // Convert efficiency to decimal (if provided as percentage)
    const efficiencyDecimal = efficiency ? (eff > 1 ? eff / 100 : eff) : 1;

    // 1 hp = 745.7 watts (approximately)
    const HP_TO_WATTS = 745.7;

    if (!current) {
      // Calculate current: I = (hp × 746) / (V × efficiency)
      const hpBase = convertHpToBase(hp, hpUnit);
      const vBase = convertVoltageToBase(v, voltageUnit);
      
      if (vBase === 0) {
        setResult(null);
        setCalculation('Error: Voltage cannot be zero');
        return;
      }

      const powerWatts = hpBase * HP_TO_WATTS;
      const iBase = powerWatts / (vBase * efficiencyDecimal);
      const iResult = convertCurrentFromBase(iBase, currentUnit);

      setResult({ value: iResult, unit: currentUnit, type: 'current' });
      if (efficiency && efficiencyDecimal < 1) {
        setCalculation(`I = (hp × 746) / (V × efficiency) = (${formatValue(hp)} ${hpUnit} × 746 W/hp) / (${formatValue(v)} ${voltageUnit} × ${(efficiencyDecimal * 100).toFixed(1)}%) = ${formatValue(powerWatts)} W / (${formatValue(vBase)} V × ${efficiencyDecimal.toFixed(3)}) = ${formatValue(iResult)} ${currentUnit}`);
      } else {
        setCalculation(`I = (hp × 746) / V = (${formatValue(hp)} ${hpUnit} × 746 W/hp) / ${formatValue(v)} ${voltageUnit} = ${formatValue(powerWatts)} W / ${formatValue(vBase)} V = ${formatValue(iResult)} ${currentUnit}`);
      }
    } else if (!horsepower) {
      // Calculate horsepower: hp = (I × V × efficiency) / 746
      const iBase = convertCurrentToBase(i, currentUnit);
      const vBase = convertVoltageToBase(v, voltageUnit);
      
      const powerWatts = iBase * vBase * efficiencyDecimal;
      const hpBase = powerWatts / HP_TO_WATTS;
      const hpResult = convertHpFromBase(hpBase, hpUnit);

      setResult({ value: hpResult, unit: hpUnit, type: 'horsepower' });
      if (efficiency && efficiencyDecimal < 1) {
        setCalculation(`hp = (I × V × efficiency) / 746 = (${formatValue(i)} ${currentUnit} × ${formatValue(v)} ${voltageUnit} × ${(efficiencyDecimal * 100).toFixed(1)}%) / 746 W/hp = ${formatValue(powerWatts)} W / 746 W/hp = ${formatValue(hpResult)} ${hpUnit}`);
      } else {
        setCalculation(`hp = (I × V) / 746 = (${formatValue(i)} ${currentUnit} × ${formatValue(v)} ${voltageUnit}) / 746 W/hp = ${formatValue(powerWatts)} W / 746 W/hp = ${formatValue(hpResult)} ${hpUnit}`);
      }
    } else if (!voltage) {
      // Calculate voltage: V = (hp × 746) / (I × efficiency)
      const hpBase = convertHpToBase(hp, hpUnit);
      const iBase = convertCurrentToBase(i, currentUnit);
      
      if (iBase === 0) {
        setResult(null);
        setCalculation('Error: Current cannot be zero');
        return;
      }

      const powerWatts = hpBase * HP_TO_WATTS;
      const vBase = powerWatts / (iBase * efficiencyDecimal);
      const vResult = convertVoltageFromBase(vBase, voltageUnit);

      setResult({ value: vResult, unit: voltageUnit, type: 'voltage' });
      if (efficiency && efficiencyDecimal < 1) {
        setCalculation(`V = (hp × 746) / (I × efficiency) = (${formatValue(hp)} ${hpUnit} × 746 W/hp) / (${formatValue(i)} ${currentUnit} × ${(efficiencyDecimal * 100).toFixed(1)}%) = ${formatValue(powerWatts)} W / (${formatValue(iBase)} A × ${efficiencyDecimal.toFixed(3)}) = ${formatValue(vResult)} ${voltageUnit}`);
      } else {
        setCalculation(`V = (hp × 746) / I = (${formatValue(hp)} ${hpUnit} × 746 W/hp) / ${formatValue(i)} ${currentUnit} = ${formatValue(powerWatts)} W / ${formatValue(iBase)} A = ${formatValue(vResult)} ${voltageUnit}`);
      }
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setHorsepower('');
    setVoltage('');
    setEfficiency('');
    setCurrent('');
    setHpUnit('hp');
    setVoltageUnit('V');
    setCurrentUnit('A');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">HP to Amps Calculator</h2>
        <p className="text-gray-600">Convert horsepower to amperes using I = (hp × 746) / (V × efficiency)</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">I = (hp × 746) / (V × efficiency)</p>
          <p className="text-xs text-gray-500 mt-1">
            Where: I = Current (Amps), hp = Horsepower, V = Voltage, efficiency = Motor efficiency (optional)
          </p>
        </div>

        {/* Horsepower Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Horsepower (hp)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter horsepower (leave empty to calculate)"
                value={horsepower}
                onChange={(e) => setHorsepower(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={hpUnit}
                onChange={(e) => setHpUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(hpUnits).map(([key, unit]) => (
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
                placeholder="Enter voltage (leave empty to calculate)"
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

        {/* Efficiency Input (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Efficiency (Optional)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter efficiency as % (e.g., 85) or decimal (e.g., 0.85)"
                value={efficiency}
                onChange={(e) => setEfficiency(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-32 flex items-center">
              <span className="text-sm text-gray-600">% or decimal</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Leave empty for 100% efficiency. Enter as percentage (0-100) or decimal (0-1)
          </p>
        </div>

        {/* Current Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Current (I)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter current (leave empty to calculate)"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
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

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> 1 hp = 746 watts (approximately). Motor efficiency typically ranges from 70% to 95%.
          </p>
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
          <div className="mt-6 p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg">
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">Result</h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <p className="text-sm text-[#820ECC]/80 mt-2 font-mono break-words">
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
            <li>• Enter any two values to calculate the third (horsepower, voltage, or current)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: I = (hp × 746) / (V × efficiency)</li>
            <li>• Efficiency is optional (defaults to 100% if not provided)</li>
            <li>• Enter efficiency as percentage (0-100) or decimal (0-1)</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• Commonly used for sizing circuit breakers and wire gauges for motors</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

