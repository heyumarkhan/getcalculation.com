'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'resistor' | 'voltage-current' | 'resistance-current' | 'capacitor';

type Result = {
  lines: string[];
};

export default function PowerDissipationCalculator() {
  const [method, setMethod] = useState<Method>('resistor');

  const [voltage, setVoltage] = useState('12');
  const [voltageUnit, setVoltageUnit] = useState('V');
  const [current, setCurrent] = useState('2');
  const [currentUnit, setCurrentUnit] = useState('A');
  const [resistance, setResistance] = useState('6');
  const [resistanceUnit, setResistanceUnit] = useState('Ω');
  
  const [capacitance, setCapacitance] = useState('100');
  const [capacitanceUnit, setCapacitanceUnit] = useState('μF');
  const [frequency, setFrequency] = useState('60');
  const [esr, setEsr] = useState('0.1');

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
      case 'μA': return val / 1_000_000;
      default: return val;
    }
  };

  const ampsToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'A': return val;
      case 'mA': return val * 1000;
      case 'μA': return val * 1_000_000;
      default: return val;
    }
  };

  const resistanceToOhms = (val: number, unit: string) => {
    switch (unit) {
      case 'Ω': return val;
      case 'kΩ': return val * 1000;
      case 'MΩ': return val * 1_000_000;
      case 'mΩ': return val / 1000;
      default: return val;
    }
  };

  const ohmsToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'Ω': return val;
      case 'kΩ': return val / 1000;
      case 'MΩ': return val / 1_000_000;
      case 'mΩ': return val * 1000;
      default: return val;
    }
  };

  const capacitanceToFarads = (val: number, unit: string) => {
    switch (unit) {
      case 'F': return val;
      case 'mF': return val / 1000;
      case 'μF': return val / 1_000_000;
      case 'nF': return val / 1_000_000_000;
      case 'pF': return val / 1_000_000_000_000;
      default: return val;
    }
  };

  const parsePositive = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const parseNonNegative = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num < 0 ? NaN : num;
  };

  const handleCalculate = () => {
    setResult(null);
    setCalculation('');

    if (method === 'resistor') {
      const vVal = parsePositive(voltage);
      const rVal = parsePositive(resistance);

      if (isNaN(vVal) || isNaN(rVal)) {
        setCalculation('Please enter valid voltage and resistance values.');
        return;
      }

      const V = voltageToVolts(vVal, voltageUnit);
      const R = resistanceToOhms(rVal, resistanceUnit);

      // P = V² / R
      const P = (V * V) / R;

      // Also calculate current: I = V / R
      const I = V / R;
      const I_out = ampsToUnit(I, currentUnit);

      setResult({
        lines: [
          `Voltage V = ${format(voltsToUnit(V, voltageUnit))} ${voltageUnit} (${format(V)} V)`,
          `Resistance R = ${format(ohmsToUnit(R, resistanceUnit))} ${resistanceUnit} (${format(R)} Ω)`,
          `Power dissipated P = ${format(P)} W`,
          `Current I = ${format(I_out)} ${currentUnit} (${format(I)} A)`,
          `Formula: P = V² / R`,
          `Energy dissipated as heat in resistor.`
        ]
      });
      setCalculation('Computed power dissipation in resistor from voltage and resistance.');
      return;
    }

    if (method === 'voltage-current') {
      const vVal = parsePositive(voltage);
      const iVal = parsePositive(current);

      if (isNaN(vVal) || isNaN(iVal)) {
        setCalculation('Please enter valid voltage and current values.');
        return;
      }

      const V = voltageToVolts(vVal, voltageUnit);
      const I = currentToAmps(iVal, currentUnit);

      // P = V × I
      const P = V * I;

      // Calculate equivalent resistance: R = V / I
      const R = V / I;
      const R_out = ohmsToUnit(R, resistanceUnit);

      setResult({
        lines: [
          `Voltage V = ${format(voltsToUnit(V, voltageUnit))} ${voltageUnit} (${format(V)} V)`,
          `Current I = ${format(ampsToUnit(I, currentUnit))} ${currentUnit} (${format(I)} A)`,
          `Power dissipated P = ${format(P)} W`,
          `Equivalent resistance R = ${format(R_out)} ${resistanceUnit} (${format(R)} Ω)`,
          `Formula: P = V × I`,
          `Total power consumed/dissipated by the component.`
        ]
      });
      setCalculation('Computed power dissipation from voltage and current.');
      return;
    }

    if (method === 'resistance-current') {
      const rVal = parsePositive(resistance);
      const iVal = parsePositive(current);

      if (isNaN(rVal) || isNaN(iVal)) {
        setCalculation('Please enter valid resistance and current values.');
        return;
      }

      const R = resistanceToOhms(rVal, resistanceUnit);
      const I = currentToAmps(iVal, currentUnit);

      // P = I² × R
      const P = I * I * R;

      // Calculate voltage drop: V = I × R
      const V = I * R;
      const V_out = voltsToUnit(V, voltageUnit);

      setResult({
        lines: [
          `Current I = ${format(ampsToUnit(I, currentUnit))} ${currentUnit} (${format(I)} A)`,
          `Resistance R = ${format(ohmsToUnit(R, resistanceUnit))} ${resistanceUnit} (${format(R)} Ω)`,
          `Power dissipated P = ${format(P)} W`,
          `Voltage drop V = ${format(V_out)} ${voltageUnit} (${format(V)} V)`,
          `Formula: P = I² × R`,
          `Heat dissipated in resistance due to current flow.`
        ]
      });
      setCalculation('Computed power dissipation from current and resistance.');
      return;
    }

    if (method === 'capacitor') {
      const cVal = parsePositive(capacitance);
      const fVal = parsePositive(frequency);
      const vVal = parsePositive(voltage);
      const esrVal = parseNonNegative(esr);

      if (isNaN(cVal) || isNaN(fVal) || isNaN(vVal) || isNaN(esrVal)) {
        setCalculation('Please enter valid capacitance, frequency, voltage, and ESR values.');
        return;
      }

      const C = capacitanceToFarads(cVal, capacitanceUnit);
      const f = fVal;
      const V = voltageToVolts(vVal, voltageUnit);
      const ESR = esrVal; // Already in ohms

      // Capacitive reactance: Xc = 1 / (2πfC)
      const Xc = 1 / (2 * Math.PI * f * C);

      // RMS current through capacitor: I = V / Xc
      const I = V / Xc;

      // Power dissipation in ESR: P = I² × ESR
      const P = I * I * ESR;

      setResult({
        lines: [
          `Capacitance C = ${format(cVal)} ${capacitanceUnit} (${format(C)} F)`,
          `Frequency f = ${format(f)} Hz`,
          `RMS Voltage V = ${format(voltsToUnit(V, voltageUnit))} ${voltageUnit}`,
          `ESR = ${format(ESR)} Ω`,
          `Capacitive reactance Xc = ${format(Xc)} Ω`,
          `RMS Current I = ${format(I)} A`,
          `Power dissipated P = ${format(P)} W (heat in ESR)`,
          `Formula: P = I² × ESR, where I = V / Xc`
        ]
      });
      setCalculation('Computed power dissipation in capacitor ESR.');
      return;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">💫</span>
          <h1 className="text-2xl font-bold text-gray-900">Power Dissipation Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate power dissipation in resistors, capacitors, and electrical components using voltage, current, and resistance.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select calculation method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'resistor' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="resistor" checked={method === 'resistor'} onChange={() => setMethod('resistor')} className="mr-2" />
              Resistor (V, R)
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'voltage-current' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="voltage-current" checked={method === 'voltage-current'} onChange={() => setMethod('voltage-current')} className="mr-2" />
              Component (V, I)
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'resistance-current' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="resistance-current" checked={method === 'resistance-current'} onChange={() => setMethod('resistance-current')} className="mr-2" />
              Resistor (I, R)
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'capacitor' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="capacitor" checked={method === 'capacitor'} onChange={() => setMethod('capacitor')} className="mr-2" />
              Capacitor ESR
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {(method === 'resistor' || method === 'voltage-current' || method === 'capacitor') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label={method === 'capacitor' ? 'RMS Voltage' : 'Voltage V'} 
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
                </select>
              </div>
            </div>
          )}

          {(method === 'voltage-current' || method === 'resistance-current') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Current I" 
                  value={current} 
                  onChange={(e) => setCurrent(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 2" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={currentUnit} onChange={(e) => setCurrentUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="A">A</option>
                  <option value="mA">mA</option>
                  <option value="μA">μA</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'resistor' || method === 'resistance-current') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Resistance R" 
                  value={resistance} 
                  onChange={(e) => setResistance(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 6" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={resistanceUnit} onChange={(e) => setResistanceUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="Ω">Ω</option>
                  <option value="kΩ">kΩ</option>
                  <option value="MΩ">MΩ</option>
                  <option value="mΩ">mΩ</option>
                </select>
              </div>
            </div>
          )}

          {method === 'capacitor' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Capacitance C" 
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

              <div>
                <Input 
                  label="Frequency (Hz)" 
                  value={frequency} 
                  onChange={(e) => setFrequency(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 60" 
                />
              </div>

              <div>
                <Input 
                  label="ESR (Equivalent Series Resistance, Ω)" 
                  value={esr} 
                  onChange={(e) => setEsr(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 0.1" 
                />
              </div>
            </>
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
