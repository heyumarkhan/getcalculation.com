'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'energy-cv' | 'energy-qv' | 'charge' | 'voltage';

type Result = {
  lines: string[];
};

export default function CapacitorEnergyCalculator() {
  const [method, setMethod] = useState<Method>('energy-cv');

  const [capacitance, setCapacitance] = useState('100');
  const [capacitanceUnit, setCapacitanceUnit] = useState('μF');
  const [voltage, setVoltage] = useState('12');
  const [voltageUnit, setVoltageUnit] = useState('V');
  const [charge, setCharge] = useState('0.0012');
  const [chargeUnit, setChargeUnit] = useState('C');
  const [energy, setEnergy] = useState('0.0072');
  const [energyUnit, setEnergyUnit] = useState('J');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const format = (val: number, digits = 4) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1e6 || (Math.abs(val) < 0.001 && val !== 0)) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  const capacitanceToF = (val: number, unit: string) => {
    switch (unit) {
      case 'F': return val;
      case 'mF': return val / 1000;
      case 'μF': return val / 1_000_000;
      case 'nF': return val / 1_000_000_000;
      case 'pF': return val / 1_000_000_000_000;
      default: return val;
    }
  };

  const fToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'F': return val;
      case 'mF': return val * 1000;
      case 'μF': return val * 1_000_000;
      case 'nF': return val * 1_000_000_000;
      case 'pF': return val * 1_000_000_000_000;
      default: return val;
    }
  };

  const voltageToV = (val: number, unit: string) => {
    switch (unit) {
      case 'V': return val;
      case 'kV': return val * 1000;
      case 'mV': return val / 1000;
      case 'μV': return val / 1_000_000;
      default: return val;
    }
  };

  const vToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'V': return val;
      case 'kV': return val / 1000;
      case 'mV': return val * 1000;
      case 'μV': return val * 1_000_000;
      default: return val;
    }
  };

  const chargeToC = (val: number, unit: string) => {
    switch (unit) {
      case 'C': return val;
      case 'mC': return val / 1000;
      case 'μC': return val / 1_000_000;
      case 'nC': return val / 1_000_000_000;
      case 'pC': return val / 1_000_000_000_000;
      default: return val;
    }
  };

  const cToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'C': return val;
      case 'mC': return val * 1000;
      case 'μC': return val * 1_000_000;
      case 'nC': return val * 1_000_000_000;
      case 'pC': return val * 1_000_000_000_000;
      default: return val;
    }
  };

  const energyToJ = (val: number, unit: string) => {
    switch (unit) {
      case 'J': return val;
      case 'kJ': return val * 1000;
      case 'mJ': return val / 1000;
      case 'μJ': return val / 1_000_000;
      case 'nJ': return val / 1_000_000_000;
      case 'Wh': return val * 3600;
      case 'mWh': return val * 3.6;
      default: return val;
    }
  };

  const jToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'J': return val;
      case 'kJ': return val / 1000;
      case 'mJ': return val * 1000;
      case 'μJ': return val * 1_000_000;
      case 'nJ': return val * 1_000_000_000;
      case 'Wh': return val / 3600;
      case 'mWh': return val / 3.6;
      default: return val;
    }
  };

  const parsePositive = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const handleCalculate = () => {
    setResult(null);
    setCalculation('');

    if (method === 'energy-cv') {
      const cVal = parsePositive(capacitance);
      const vVal = parsePositive(voltage);

      if (isNaN(cVal) || isNaN(vVal)) {
        setCalculation('Please enter valid capacitance and voltage values.');
        return;
      }

      const C = capacitanceToF(cVal, capacitanceUnit);
      const V = voltageToV(vVal, voltageUnit);

      // Energy stored: E = ½CV²
      const E = 0.5 * C * V * V;

      // Charge stored: Q = CV
      const Q = C * V;

      // Time constant (assuming 1Ω resistance for reference)
      const tau = C * 1; // τ = RC

      // Energy in different units
      const energyJ = E;
      const energymJ = E * 1000;
      const energyμJ = E * 1_000_000;
      const energyWh = E / 3600;

      setResult({
        lines: [
          `Capacitance C = ${format(fToUnit(C, capacitanceUnit))} ${capacitanceUnit} (${format(C)} F)`,
          `Voltage V = ${format(vToUnit(V, voltageUnit))} ${voltageUnit} (${format(V)} V)`,
          `Energy stored E = ½CV² = ${format(jToUnit(E, energyUnit))} ${energyUnit}`,
          `Also: ${format(energyJ)} J = ${format(energymJ)} mJ = ${format(energyμJ)} μJ`,
          `Energy in Wh: ${format(energyWh)} Wh`,
          `Charge stored Q = CV = ${format(cToUnit(Q, chargeUnit))} ${chargeUnit}`,
          `Time constant τ = RC = ${format(tau)} s (for R = 1Ω)`,
          `Formula: E = ½CV² (SI units: Joules)`
        ]
      });
      setCalculation('Calculated energy stored in capacitor.');
      return;
    }

    if (method === 'energy-qv') {
      const qVal = parsePositive(charge);
      const vVal = parsePositive(voltage);

      if (isNaN(qVal) || isNaN(vVal)) {
        setCalculation('Please enter valid charge and voltage values.');
        return;
      }

      const Q = chargeToC(qVal, chargeUnit);
      const V = voltageToV(vVal, voltageUnit);

      // Energy: E = ½QV
      const E = 0.5 * Q * V;

      // Capacitance: C = Q/V
      const C = Q / V;

      // Also E = Q²/(2C)
      const E_alt = (Q * Q) / (2 * C);

      setResult({
        lines: [
          `Charge Q = ${format(cToUnit(Q, chargeUnit))} ${chargeUnit} (${format(Q)} C)`,
          `Voltage V = ${format(vToUnit(V, voltageUnit))} ${voltageUnit} (${format(V)} V)`,
          `Energy E = ½QV = ${format(jToUnit(E, energyUnit))} ${energyUnit}`,
          `Capacitance C = Q/V = ${format(fToUnit(C, capacitanceUnit))} ${capacitanceUnit}`,
          `Verification: E = Q²/(2C) = ${format(E_alt)} J`,
          `Formula: E = ½QV = Q²/(2C)`
        ]
      });
      setCalculation('Calculated energy from charge and voltage.');
      return;
    }

    if (method === 'charge') {
      const eVal = parsePositive(energy);
      const cVal = parsePositive(capacitance);

      if (isNaN(eVal) || isNaN(cVal)) {
        setCalculation('Please enter valid energy and capacitance values.');
        return;
      }

      const E = energyToJ(eVal, energyUnit);
      const C = capacitanceToF(cVal, capacitanceUnit);

      // From E = ½CV² → V = √(2E/C)
      const V = Math.sqrt(2 * E / C);

      // From Q = CV
      const Q = C * V;

      // Also from E = Q²/(2C) → Q = √(2EC)
      const Q_alt = Math.sqrt(2 * E * C);

      setResult({
        lines: [
          `Energy E = ${format(jToUnit(E, energyUnit))} ${energyUnit} (${format(E)} J)`,
          `Capacitance C = ${format(fToUnit(C, capacitanceUnit))} ${capacitanceUnit} (${format(C)} F)`,
          `Voltage V = √(2E/C) = ${format(vToUnit(V, voltageUnit))} ${voltageUnit}`,
          `Charge Q = CV = ${format(cToUnit(Q, chargeUnit))} ${chargeUnit}`,
          `Verification: Q = √(2EC) = ${format(Q_alt)} C`,
          `Formula: V = √(2E/C), Q = √(2EC)`
        ]
      });
      setCalculation('Calculated voltage and charge from energy.');
      return;
    }

    if (method === 'voltage') {
      const eVal = parsePositive(energy);
      const qVal = parsePositive(charge);

      if (isNaN(eVal) || isNaN(qVal)) {
        setCalculation('Please enter valid energy and charge values.');
        return;
      }

      const E = energyToJ(eVal, energyUnit);
      const Q = chargeToC(qVal, chargeUnit);

      // From E = ½QV → V = 2E/Q
      const V = (2 * E) / Q;

      // Capacitance: C = Q/V
      const C = Q / V;

      // Verification: E = ½CV²
      const E_verify = 0.5 * C * V * V;

      setResult({
        lines: [
          `Energy E = ${format(jToUnit(E, energyUnit))} ${energyUnit} (${format(E)} J)`,
          `Charge Q = ${format(cToUnit(Q, chargeUnit))} ${chargeUnit} (${format(Q)} C)`,
          `Voltage V = 2E/Q = ${format(vToUnit(V, voltageUnit))} ${voltageUnit}`,
          `Capacitance C = Q/V = ${format(fToUnit(C, capacitanceUnit))} ${capacitanceUnit}`,
          `Verification: E = ½CV² = ${format(E_verify)} J`,
          `Formula: V = 2E/Q`
        ]
      });
      setCalculation('Calculated voltage and capacitance from energy and charge.');
      return;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">💾</span>
          <h1 className="text-2xl font-bold text-gray-900">Capacitor Energy Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate energy stored in capacitors from capacitance, voltage, and charge.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select calculation method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'energy-cv' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="energy-cv" checked={method === 'energy-cv'} onChange={() => setMethod('energy-cv')} className="mr-2" />
              Energy from C & V
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'energy-qv' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="energy-qv" checked={method === 'energy-qv'} onChange={() => setMethod('energy-qv')} className="mr-2" />
              Energy from Q & V
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'charge' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="charge" checked={method === 'charge'} onChange={() => setMethod('charge')} className="mr-2" />
              Find V & Q from E
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'voltage' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="voltage" checked={method === 'voltage'} onChange={() => setMethod('voltage')} className="mr-2" />
              Find V from E & Q
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {(method === 'energy-cv' || method === 'charge') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Capacitance" 
                  value={capacitance} 
                  onChange={(e) => setCapacitance(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 100" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={capacitanceUnit} onChange={(e) => setCapacitanceUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="F">F</option>
                  <option value="mF">mF</option>
                  <option value="μF">μF</option>
                  <option value="nF">nF</option>
                  <option value="pF">pF</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'energy-cv' || method === 'energy-qv') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Voltage" 
                  value={voltage} 
                  onChange={(e) => setVoltage(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 12" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={voltageUnit} onChange={(e) => setVoltageUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="V">V</option>
                  <option value="kV">kV</option>
                  <option value="mV">mV</option>
                  <option value="μV">μV</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'energy-qv' || method === 'voltage') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Charge" 
                  value={charge} 
                  onChange={(e) => setCharge(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 0.0012" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={chargeUnit} onChange={(e) => setChargeUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="C">C</option>
                  <option value="mC">mC</option>
                  <option value="μC">μC</option>
                  <option value="nC">nC</option>
                  <option value="pC">pC</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'charge' || method === 'voltage') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Energy" 
                  value={energy} 
                  onChange={(e) => setEnergy(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 0.0072" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={energyUnit} onChange={(e) => setEnergyUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="J">J</option>
                  <option value="kJ">kJ</option>
                  <option value="mJ">mJ</option>
                  <option value="μJ">μJ</option>
                  <option value="nJ">nJ</option>
                  <option value="Wh">Wh</option>
                  <option value="mWh">mWh</option>
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
