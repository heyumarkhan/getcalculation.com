'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'output' | 'r1' | 'r2' | 'power';

type Result = {
  lines: string[];
};

export default function VoltageDividerCalculator() {
  const [method, setMethod] = useState<Method>('output');

  // Method 1: Calculate output voltage
  const [inputVoltage, setInputVoltage] = useState('12');
  const [voltageUnit, setVoltageUnit] = useState('V');
  const [r1, setR1] = useState('1000');
  const [r1Unit, setR1Unit] = useState('Ω');
  const [r2, setR2] = useState('2000');
  const [r2Unit, setR2Unit] = useState('Ω');

  // Method 2: Calculate R1
  const [vin2, setVin2] = useState('12');
  const [vout2, setVout2] = useState('4');
  const [r2Value, setR2Value] = useState('2000');

  // Method 3: Calculate R2
  const [vin3, setVin3] = useState('12');
  const [vout3, setVout3] = useState('8');
  const [r1Value, setR1Value] = useState('1000');

  // Method 4: Power dissipation
  const [vinPower, setVinPower] = useState('12');
  const [r1Power, setR1Power] = useState('1000');
  const [r2Power, setR2Power] = useState('2000');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const format = (val: number, digits = 4) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1e6 || (Math.abs(val) < 0.001 && val !== 0)) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  const voltageToV = (val: number, unit: string) => {
    switch (unit) {
      case 'V': return val;
      case 'mV': return val / 1000;
      case 'kV': return val * 1000;
      case 'μV': return val / 1e6;
      default: return val;
    }
  };

  const vToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'V': return val;
      case 'mV': return val * 1000;
      case 'kV': return val / 1000;
      case 'μV': return val * 1e6;
      default: return val;
    }
  };

  const resistanceToOhm = (val: number, unit: string) => {
    switch (unit) {
      case 'Ω': return val;
      case 'kΩ': return val * 1000;
      case 'MΩ': return val * 1e6;
      case 'mΩ': return val / 1000;
      default: return val;
    }
  };

  const ohmToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'Ω': return val;
      case 'kΩ': return val / 1000;
      case 'MΩ': return val / 1e6;
      case 'mΩ': return val * 1000;
      default: return val;
    }
  };

  const parsePositive = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const handleCalculate = () => {
    try {
      if (method === 'output') {
        // Vout = Vin × R2/(R1 + R2)
        const vin = parsePositive(inputVoltage);
        const r1Val = parsePositive(r1);
        const r2Val = parsePositive(r2);

        if (isNaN(vin) || isNaN(r1Val) || isNaN(r2Val)) {
          setResult({ lines: ['Error: Please enter valid positive values for all inputs.'] });
          setCalculation('');
          return;
        }

        const vinV = voltageToV(vin, voltageUnit);
        const r1Ohm = resistanceToOhm(r1Val, r1Unit);
        const r2Ohm = resistanceToOhm(r2Val, r2Unit);

        const rTotal = r1Ohm + r2Ohm;
        const vout = vinV * (r2Ohm / rTotal);
        const ratio = r2Ohm / rTotal;
        const percentage = ratio * 100;

        // Calculate current through the divider
        const current = vinV / rTotal;

        // Voltage across R1
        const vR1 = vinV * (r1Ohm / rTotal);

        // Power dissipation
        const powerR1 = current * current * r1Ohm;
        const powerR2 = current * current * r2Ohm;
        const powerTotal = powerR1 + powerR2;

        const lines = [
          `<strong>Output Voltage:</strong> Vout = ${format(vout)} V (${format(vToUnit(vout, voltageUnit))} ${voltageUnit})`,
          ``,
          `<strong>Voltage Divider Formula:</strong>`,
          `Vout = Vin × R2/(R1 + R2)`,
          ``,
          `<strong>Given:</strong>`,
          `Input Voltage: Vin = ${format(vinV)} V`,
          `Resistor 1: R1 = ${format(r1Ohm)} Ω`,
          `Resistor 2: R2 = ${format(r2Ohm)} Ω`,
          ``,
          `<strong>Calculation:</strong>`,
          `Total Resistance: Rtotal = R1 + R2 = ${format(r1Ohm)} + ${format(r2Ohm)} = ${format(rTotal)} Ω`,
          `Division Ratio: R2/Rtotal = ${format(r2Ohm)}/${format(rTotal)} = ${format(ratio)}`,
          `Vout = ${format(vinV)} × ${format(ratio)} = ${format(vout)} V`,
          ``,
          `<strong>Additional Information:</strong>`,
          `Voltage Division: ${format(percentage)}% of input voltage`,
          `Current through divider: I = ${format(current)} A (${format(current * 1000)} mA)`,
          `Voltage across R1: VR1 = ${format(vR1)} V`,
          `Voltage across R2: VR2 = ${format(vout)} V`,
          ``,
          `<strong>Power Dissipation:</strong>`,
          `Power in R1: PR1 = I²R1 = ${format(powerR1)} W (${format(powerR1 * 1000)} mW)`,
          `Power in R2: PR2 = I²R2 = ${format(powerR2)} W (${format(powerR2 * 1000)} mW)`,
          `Total Power: Ptotal = ${format(powerTotal)} W (${format(powerTotal * 1000)} mW)`,
          ``,
          `<strong>Verification:</strong> VR1 + VR2 = ${format(vR1)} + ${format(vout)} = ${format(vR1 + vout)} V ✓`
        ];

        setResult({ lines });
        setCalculation(`Output Voltage: Vout = ${format(vinV)} × (${format(r2Ohm)}/${format(rTotal)}) = ${format(vout)} V`);

      } else if (method === 'r1') {
        // Find R1: R1 = R2 × (Vin - Vout) / Vout
        const vin = parsePositive(vin2);
        const vout = parsePositive(vout2);
        const r2Val = parsePositive(r2Value);

        if (isNaN(vin) || isNaN(vout) || isNaN(r2Val)) {
          setResult({ lines: ['Error: Please enter valid positive values for all inputs.'] });
          setCalculation('');
          return;
        }

        if (vout >= vin) {
          setResult({ lines: ['Error: Output voltage must be less than input voltage in a voltage divider.'] });
          setCalculation('');
          return;
        }

        const vinV = voltageToV(vin, voltageUnit);
        const voutV = voltageToV(vout, voltageUnit);
        const r2Ohm = resistanceToOhm(r2Val, r2Unit);

        const r1Ohm = r2Ohm * (vinV - voutV) / voutV;
        const rTotal = r1Ohm + r2Ohm;
        const current = vinV / rTotal;
        const ratio = voutV / vinV;

        // Power dissipation
        const powerR1 = current * current * r1Ohm;
        const powerR2 = current * current * r2Ohm;
        const powerTotal = powerR1 + powerR2;

        const lines = [
          `<strong>Required Resistor R1:</strong> ${format(r1Ohm)} Ω (${format(ohmToUnit(r1Ohm, r1Unit))} ${r1Unit})`,
          ``,
          `<strong>Formula:</strong>`,
          `R1 = R2 × (Vin - Vout) / Vout`,
          ``,
          `<strong>Given:</strong>`,
          `Input Voltage: Vin = ${format(vinV)} V`,
          `Desired Output: Vout = ${format(voutV)} V`,
          `Resistor 2: R2 = ${format(r2Ohm)} Ω`,
          ``,
          `<strong>Calculation:</strong>`,
          `Voltage drop across R1: VR1 = Vin - Vout = ${format(vinV)} - ${format(voutV)} = ${format(vinV - voutV)} V`,
          `R1 = ${format(r2Ohm)} × (${format(vinV)} - ${format(voutV)}) / ${format(voutV)}`,
          `R1 = ${format(r2Ohm)} × ${format(vinV - voutV)} / ${format(voutV)}`,
          `R1 = ${format(r1Ohm)} Ω`,
          ``,
          `<strong>Divider Characteristics:</strong>`,
          `Total Resistance: Rtotal = ${format(rTotal)} Ω`,
          `Division Ratio: Vout/Vin = ${format(ratio)} (${format(ratio * 100)}%)`,
          `Current: I = Vin/Rtotal = ${format(current)} A (${format(current * 1000)} mA)`,
          ``,
          `<strong>Power Dissipation:</strong>`,
          `Power in R1: PR1 = ${format(powerR1)} W (${format(powerR1 * 1000)} mW)`,
          `Power in R2: PR2 = ${format(powerR2)} W (${format(powerR2 * 1000)} mW)`,
          `Total Power: Ptotal = ${format(powerTotal)} W`,
          ``,
          `<strong>Verification:</strong> Vout = ${format(vinV)} × ${format(r2Ohm)}/(${format(r1Ohm)}+${format(r2Ohm)}) = ${format(voutV)} V ✓`
        ];

        setResult({ lines });
        setCalculation(`Required R1 = ${format(r2Ohm)} × (${format(vinV - voutV)}/${format(voutV)}) = ${format(r1Ohm)} Ω`);

      } else if (method === 'r2') {
        // Find R2: R2 = R1 × Vout / (Vin - Vout)
        const vin = parsePositive(vin3);
        const vout = parsePositive(vout3);
        const r1Val = parsePositive(r1Value);

        if (isNaN(vin) || isNaN(vout) || isNaN(r1Val)) {
          setResult({ lines: ['Error: Please enter valid positive values for all inputs.'] });
          setCalculation('');
          return;
        }

        if (vout >= vin) {
          setResult({ lines: ['Error: Output voltage must be less than input voltage in a voltage divider.'] });
          setCalculation('');
          return;
        }

        const vinV = voltageToV(vin, voltageUnit);
        const voutV = voltageToV(vout, voltageUnit);
        const r1Ohm = resistanceToOhm(r1Val, r1Unit);

        const r2Ohm = r1Ohm * voutV / (vinV - voutV);
        const rTotal = r1Ohm + r2Ohm;
        const current = vinV / rTotal;
        const ratio = voutV / vinV;

        // Power dissipation
        const powerR1 = current * current * r1Ohm;
        const powerR2 = current * current * r2Ohm;
        const powerTotal = powerR1 + powerR2;

        const lines = [
          `<strong>Required Resistor R2:</strong> ${format(r2Ohm)} Ω (${format(ohmToUnit(r2Ohm, r2Unit))} ${r2Unit})`,
          ``,
          `<strong>Formula:</strong>`,
          `R2 = R1 × Vout / (Vin - Vout)`,
          ``,
          `<strong>Given:</strong>`,
          `Input Voltage: Vin = ${format(vinV)} V`,
          `Desired Output: Vout = ${format(voutV)} V`,
          `Resistor 1: R1 = ${format(r1Ohm)} Ω`,
          ``,
          `<strong>Calculation:</strong>`,
          `Voltage drop across R1: VR1 = Vin - Vout = ${format(vinV)} - ${format(voutV)} = ${format(vinV - voutV)} V`,
          `R2 = ${format(r1Ohm)} × ${format(voutV)} / (${format(vinV)} - ${format(voutV)})`,
          `R2 = ${format(r1Ohm)} × ${format(voutV)} / ${format(vinV - voutV)}`,
          `R2 = ${format(r2Ohm)} Ω`,
          ``,
          `<strong>Divider Characteristics:</strong>`,
          `Total Resistance: Rtotal = ${format(rTotal)} Ω`,
          `Division Ratio: Vout/Vin = ${format(ratio)} (${format(ratio * 100)}%)`,
          `Current: I = Vin/Rtotal = ${format(current)} A (${format(current * 1000)} mA)`,
          ``,
          `<strong>Power Dissipation:</strong>`,
          `Power in R1: PR1 = ${format(powerR1)} W (${format(powerR1 * 1000)} mW)`,
          `Power in R2: PR2 = ${format(powerR2)} W (${format(powerR2 * 1000)} mW)`,
          `Total Power: Ptotal = ${format(powerTotal)} W`,
          ``,
          `<strong>Verification:</strong> Vout = ${format(vinV)} × ${format(r2Ohm)}/(${format(r1Ohm)}+${format(r2Ohm)}) = ${format(voutV)} V ✓`
        ];

        setResult({ lines });
        setCalculation(`Required R2 = ${format(r1Ohm)} × ${format(voutV)}/${format(vinV - voutV)} = ${format(r2Ohm)} Ω`);

      } else if (method === 'power') {
        // Power dissipation analysis
        const vin = parsePositive(vinPower);
        const r1Val = parsePositive(r1Power);
        const r2Val = parsePositive(r2Power);

        if (isNaN(vin) || isNaN(r1Val) || isNaN(r2Val)) {
          setResult({ lines: ['Error: Please enter valid positive values for all inputs.'] });
          setCalculation('');
          return;
        }

        const vinV = voltageToV(vin, voltageUnit);
        const r1Ohm = resistanceToOhm(r1Val, r1Unit);
        const r2Ohm = resistanceToOhm(r2Val, r2Unit);

        const rTotal = r1Ohm + r2Ohm;
        const current = vinV / rTotal;
        const vout = vinV * (r2Ohm / rTotal);
        const vR1 = vinV - vout;

        // Power dissipation
        const powerR1 = current * current * r1Ohm;
        const powerR2 = current * current * r2Ohm;
        const powerTotal = powerR1 + powerR2;

        // Alternative power calculations
        const powerR1Alt = (vR1 * vR1) / r1Ohm;
        const powerR2Alt = (vout * vout) / r2Ohm;

        // Efficiency
        const efficiency = (powerR2 / powerTotal) * 100;

        const lines = [
          `<strong>Power Dissipation Analysis</strong>`,
          ``,
          `<strong>Circuit Parameters:</strong>`,
          `Input Voltage: Vin = ${format(vinV)} V`,
          `Resistor 1: R1 = ${format(r1Ohm)} Ω`,
          `Resistor 2: R2 = ${format(r2Ohm)} Ω`,
          `Total Resistance: Rtotal = ${format(rTotal)} Ω`,
          ``,
          `<strong>Voltages and Current:</strong>`,
          `Current: I = Vin/Rtotal = ${format(vinV)}/${format(rTotal)} = ${format(current)} A (${format(current * 1000)} mA)`,
          `Voltage across R1: VR1 = ${format(vR1)} V`,
          `Voltage across R2 (Vout): VR2 = ${format(vout)} V`,
          ``,
          `<strong>Power Dissipation:</strong>`,
          `Power in R1: PR1 = I²R1 = (${format(current)})² × ${format(r1Ohm)} = ${format(powerR1)} W`,
          `Power in R1 (alt): PR1 = VR1²/R1 = (${format(vR1)})²/${format(r1Ohm)} = ${format(powerR1Alt)} W ✓`,
          `PR1 = ${format(powerR1 * 1000)} mW`,
          ``,
          `Power in R2: PR2 = I²R2 = (${format(current)})² × ${format(r2Ohm)} = ${format(powerR2)} W`,
          `Power in R2 (alt): PR2 = Vout²/R2 = (${format(vout)})²/${format(r2Ohm)} = ${format(powerR2Alt)} W ✓`,
          `PR2 = ${format(powerR2 * 1000)} mW`,
          ``,
          `<strong>Total Power:</strong>`,
          `Ptotal = PR1 + PR2 = ${format(powerR1)} + ${format(powerR2)} = ${format(powerTotal)} W`,
          `Ptotal (alt) = Vin × I = ${format(vinV)} × ${format(current)} = ${format(vinV * current)} W ✓`,
          `Ptotal = ${format(powerTotal * 1000)} mW`,
          ``,
          `<strong>Power Distribution:</strong>`,
          `R1 dissipates: ${format((powerR1 / powerTotal) * 100)}% of total power`,
          `R2 dissipates: ${format((powerR2 / powerTotal) * 100)}% of total power`,
          `Divider efficiency (power to load): ${format(efficiency)}%`,
          ``,
          `<strong>Resistor Ratings Required:</strong>`,
          `R1 should be rated for at least ${format(powerR1 * 2)} W (2× safety factor)`,
          `R2 should be rated for at least ${format(powerR2 * 2)} W (2× safety factor)`
        ];

        setResult({ lines });
        setCalculation(`Total Power Dissipated: ${format(powerTotal)} W = ${format(powerTotal * 1000)} mW`);
      }

    } catch (error) {
      setResult({ lines: ['Error: Calculation failed. Please check your inputs.'] });
      setCalculation('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📉</span>
          <h1 className="text-2xl font-bold text-gray-900">Voltage Divider Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate output voltage, required resistor values, and power dissipation for voltage divider circuits.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select calculation method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'output' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="output" checked={method === 'output'} onChange={() => setMethod('output')} className="mr-2" />
              Output Voltage (Vout)
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'r1' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="r1" checked={method === 'r1'} onChange={() => setMethod('r1')} className="mr-2" />
              Find R1 (given Vout)
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'r2' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="r2" checked={method === 'r2'} onChange={() => setMethod('r2')} className="mr-2" />
              Find R2 (given Vout)
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'power' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="power" checked={method === 'power'} onChange={() => setMethod('power')} className="mr-2" />
              Power Dissipation
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {method === 'output' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Input Voltage (Vin)" 
                    value={inputVoltage} 
                    onChange={(e) => setInputVoltage(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 12" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={voltageUnit} onChange={(e) => setVoltageUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="V">V</option>
                    <option value="mV">mV</option>
                    <option value="kV">kV</option>
                    <option value="μV">μV</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Resistor R1 (top)" 
                    value={r1} 
                    onChange={(e) => setR1(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 1000" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={r1Unit} onChange={(e) => setR1Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="Ω">Ω</option>
                    <option value="kΩ">kΩ</option>
                    <option value="MΩ">MΩ</option>
                    <option value="mΩ">mΩ</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Resistor R2 (bottom)" 
                    value={r2} 
                    onChange={(e) => setR2(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 2000" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={r2Unit} onChange={(e) => setR2Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="Ω">Ω</option>
                    <option value="kΩ">kΩ</option>
                    <option value="MΩ">MΩ</option>
                    <option value="mΩ">mΩ</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {method === 'r1' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Input Voltage (Vin)" 
                    value={vin2} 
                    onChange={(e) => setVin2(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 12" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={voltageUnit} onChange={(e) => setVoltageUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="V">V</option>
                    <option value="mV">mV</option>
                    <option value="kV">kV</option>
                    <option value="μV">μV</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Desired Output Voltage (Vout)" 
                    value={vout2} 
                    onChange={(e) => setVout2(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 4" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={voltageUnit} onChange={(e) => setVoltageUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="V">V</option>
                    <option value="mV">mV</option>
                    <option value="kV">kV</option>
                    <option value="μV">μV</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Resistor R2 (bottom)" 
                    value={r2Value} 
                    onChange={(e) => setR2Value(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 2000" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={r2Unit} onChange={(e) => setR2Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="Ω">Ω</option>
                    <option value="kΩ">kΩ</option>
                    <option value="MΩ">MΩ</option>
                    <option value="mΩ">mΩ</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {method === 'r2' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Input Voltage (Vin)" 
                    value={vin3} 
                    onChange={(e) => setVin3(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 12" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={voltageUnit} onChange={(e) => setVoltageUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="V">V</option>
                    <option value="mV">mV</option>
                    <option value="kV">kV</option>
                    <option value="μV">μV</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Desired Output Voltage (Vout)" 
                    value={vout3} 
                    onChange={(e) => setVout3(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 8" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={voltageUnit} onChange={(e) => setVoltageUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="V">V</option>
                    <option value="mV">mV</option>
                    <option value="kV">kV</option>
                    <option value="μV">μV</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Resistor R1 (top)" 
                    value={r1Value} 
                    onChange={(e) => setR1Value(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 1000" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={r1Unit} onChange={(e) => setR1Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="Ω">Ω</option>
                    <option value="kΩ">kΩ</option>
                    <option value="MΩ">MΩ</option>
                    <option value="mΩ">mΩ</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {method === 'power' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Input Voltage (Vin)" 
                    value={vinPower} 
                    onChange={(e) => setVinPower(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 12" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={voltageUnit} onChange={(e) => setVoltageUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="V">V</option>
                    <option value="mV">mV</option>
                    <option value="kV">kV</option>
                    <option value="μV">μV</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Resistor R1 (top)" 
                    value={r1Power} 
                    onChange={(e) => setR1Power(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 1000" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={r1Unit} onChange={(e) => setR1Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="Ω">Ω</option>
                    <option value="kΩ">kΩ</option>
                    <option value="MΩ">MΩ</option>
                    <option value="mΩ">mΩ</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Resistor R2 (bottom)" 
                    value={r2Power} 
                    onChange={(e) => setR2Power(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 2000" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={r2Unit} onChange={(e) => setR2Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="Ω">Ω</option>
                    <option value="kΩ">kΩ</option>
                    <option value="MΩ">MΩ</option>
                    <option value="mΩ">mΩ</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>

        <Button onClick={handleCalculate} className="w-full bg-[#820ECC] text-white font-semibold py-3 rounded-lg hover:bg-[#6b0aa6] transition mt-6">
          Calculate
        </Button>

        {result && (
          <div className="bg-[#820ECC]/10 border-l-4 border-[#820ECC] p-4 rounded mt-6">
            {calculation && <p className="text-gray-600 text-sm mb-2">{calculation}</p>}
            <div className="space-y-1 text-sm text-gray-800">
              {result.lines.map((line, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: line }} />
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
