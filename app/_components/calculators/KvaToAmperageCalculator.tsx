'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'single-phase' | 'three-phase' | 'dc' | 'kva-from-current';

type Result = {
  lines: string[];
};

export default function KvaToAmperageCalculator() {
  const [method, setMethod] = useState<Method>('single-phase');

  const [kva, setKva] = useState('10');
  const [voltage, setVoltage] = useState('230');
  const [voltageUnit, setVoltageUnit] = useState('V');
  const [powerFactor, setPowerFactor] = useState('0.8');
  const [current, setCurrent] = useState('43.48');
  const [currentUnit, setCurrentUnit] = useState('A');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const format = (val: number, digits = 4) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1e6 || (Math.abs(val) < 0.001 && val !== 0)) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  const voltageToVolts = (val: number, unit: string) => {
    switch (unit) {
      case 'V': return val;
      case 'kV': return val * 1000;
      case 'mV': return val / 1000;
      default: return val;
    }
  };

  const voltsToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'V': return val;
      case 'kV': return val / 1000;
      case 'mV': return val * 1000;
      default: return val;
    }
  };

  const currentToAmps = (val: number, unit: string) => {
    switch (unit) {
      case 'A': return val;
      case 'mA': return val / 1000;
      case 'kA': return val * 1000;
      default: return val;
    }
  };

  const ampsToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'A': return val;
      case 'mA': return val * 1000;
      case 'kA': return val / 1000;
      default: return val;
    }
  };

  const parsePositive = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const parsePowerFactor = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 || num > 1 ? NaN : num;
  };

  const handleCalculate = () => {
    setResult(null);
    setCalculation('');

    if (method === 'single-phase') {
      const kvaVal = parsePositive(kva);
      const vVal = parsePositive(voltage);

      if (isNaN(kvaVal) || isNaN(vVal)) {
        setCalculation('Please enter valid kVA and voltage values.');
        return;
      }

      const V = voltageToVolts(vVal, voltageUnit);
      const S_VA = kvaVal * 1000; // kVA to VA

      // For single-phase: I = S / V
      const I = S_VA / V;
      const I_out = ampsToUnit(I, currentUnit);

      setResult({
        lines: [
          `Apparent power S = ${format(kvaVal)} kVA = ${format(S_VA)} VA`,
          `Voltage V = ${format(voltsToUnit(V, voltageUnit))} ${voltageUnit} (${format(V)} V)`,
          `Current I = ${format(I_out)} ${currentUnit} (${format(I)} A)`,
          `Formula: I = S / V (single-phase AC)`
        ]
      });
      setCalculation('Computed single-phase AC current from kVA and voltage.');
      return;
    }

    if (method === 'three-phase') {
      const kvaVal = parsePositive(kva);
      const vVal = parsePositive(voltage);

      if (isNaN(kvaVal) || isNaN(vVal)) {
        setCalculation('Please enter valid kVA and voltage values.');
        return;
      }

      const V = voltageToVolts(vVal, voltageUnit);
      const S_VA = kvaVal * 1000; // kVA to VA

      // For three-phase: I = S / (√3 × V_L)
      // where V_L is line-to-line voltage
      const I = S_VA / (Math.sqrt(3) * V);
      const I_out = ampsToUnit(I, currentUnit);

      setResult({
        lines: [
          `Apparent power S = ${format(kvaVal)} kVA = ${format(S_VA)} VA`,
          `Line-to-line voltage V = ${format(voltsToUnit(V, voltageUnit))} ${voltageUnit} (${format(V)} V)`,
          `Line current I = ${format(I_out)} ${currentUnit} (${format(I)} A)`,
          `Formula: I = S / (√3 × V) (three-phase AC)`
        ]
      });
      setCalculation('Computed three-phase AC line current from kVA and line voltage.');
      return;
    }

    if (method === 'dc') {
      const kvaVal = parsePositive(kva);
      const vVal = parsePositive(voltage);

      if (isNaN(kvaVal) || isNaN(vVal)) {
        setCalculation('Please enter valid kW (not kVA for DC) and voltage values.');
        return;
      }

      const V = voltageToVolts(vVal, voltageUnit);
      const P_W = kvaVal * 1000; // kW to W (for DC, kVA = kW)

      // For DC: I = P / V
      const I = P_W / V;
      const I_out = ampsToUnit(I, currentUnit);

      setResult({
        lines: [
          `Power P = ${format(kvaVal)} kW = ${format(P_W)} W`,
          `Voltage V = ${format(voltsToUnit(V, voltageUnit))} ${voltageUnit} (${format(V)} V)`,
          `Current I = ${format(I_out)} ${currentUnit} (${format(I)} A)`,
          `Formula: I = P / V (DC power)`
        ]
      });
      setCalculation('Computed DC current from power and voltage.');
      return;
    }

    if (method === 'kva-from-current') {
      const iVal = parsePositive(current);
      const vVal = parsePositive(voltage);

      if (isNaN(iVal) || isNaN(vVal)) {
        setCalculation('Please enter valid current and voltage values.');
        return;
      }

      const I = currentToAmps(iVal, currentUnit);
      const V = voltageToVolts(vVal, voltageUnit);

      // For single-phase: S = V × I
      const S_VA = V * I;
      const S_kVA = S_VA / 1000;

      setResult({
        lines: [
          `Current I = ${format(ampsToUnit(I, currentUnit))} ${currentUnit} (${format(I)} A)`,
          `Voltage V = ${format(voltsToUnit(V, voltageUnit))} ${voltageUnit} (${format(V)} V)`,
          `Apparent power S = ${format(S_kVA)} kVA = ${format(S_VA)} VA`,
          `Formula: S = V × I (single-phase AC)`
        ]
      });
      setCalculation('Computed apparent power (kVA) from current and voltage.');
      return;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🔋</span>
          <h1 className="text-2xl font-bold text-gray-900">kVA to Amperage Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate current (amperes) from apparent power (kVA) for single-phase, three-phase AC, and DC systems.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select calculation method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'single-phase' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="single-phase" checked={method === 'single-phase'} onChange={() => setMethod('single-phase')} className="mr-2" />
              Single-phase AC
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'three-phase' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="three-phase" checked={method === 'three-phase'} onChange={() => setMethod('three-phase')} className="mr-2" />
              Three-phase AC
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'dc' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="dc" checked={method === 'dc'} onChange={() => setMethod('dc')} className="mr-2" />
              DC power
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'kva-from-current' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="kva-from-current" checked={method === 'kva-from-current'} onChange={() => setMethod('kva-from-current')} className="mr-2" />
              kVA from current
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {(method === 'single-phase' || method === 'three-phase' || method === 'dc') && (
            <div>
              <Input 
                label={method === 'dc' ? 'Power (kW)' : 'Apparent Power (kVA)'} 
                value={kva} 
                onChange={(e) => setKva(e.target.value)} 
                type="number" 
                placeholder="e.g., 10" 
              />
            </div>
          )}

          <div className="flex gap-3">
            <div className="flex-1">
              <Input 
                label={method === 'three-phase' ? 'Line-to-Line Voltage' : 'Voltage'} 
                value={voltage} 
                onChange={(e) => setVoltage(e.target.value)} 
                type="number" 
                placeholder="e.g., 230" 
              />
            </div>
            <div className="w-28">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
              <select value={voltageUnit} onChange={(e) => setVoltageUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                <option value="V">V</option>
                <option value="kV">kV</option>
                <option value="mV">mV</option>
              </select>
            </div>
          </div>

          {method === 'kva-from-current' && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Current" 
                  value={current} 
                  onChange={(e) => setCurrent(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 43.48" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={currentUnit} onChange={(e) => setCurrentUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="A">A</option>
                  <option value="mA">mA</option>
                  <option value="kA">kA</option>
                </select>
              </div>
            </div>
          )}

          <Button onClick={handleCalculate} className="w-full bg-[#820ECC] text-white font-semibold py-3 rounded-lg hover:bg-[#6b0aa6] transition">
            Calculate
          </Button>

          {result && (
            <div className="bg-[#820ECC]/10 border-l-4 border-[#820ECC] p-4 rounded">
              <p className="text-gray-600 text-sm mb-2">{calculation}</p>
              <ul className="list-disc list-inside space-y-1 text-gray-800">
                {result.lines.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
