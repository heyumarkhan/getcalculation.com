'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function ElectricalPowerCalculator() {
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');
  const [power, setPower] = useState('');
  const [result, setResult] = useState<{ value: number; unit: string; label: string } | null>(null);
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
    const v = parseFloat(voltage);
    const i = parseFloat(current);
    const r = parseFloat(resistance);
    const p = parseFloat(power);

    // Count how many values are provided
    const providedValues = [voltage, current, resistance, power].filter(val => val !== '').length;

    if (providedValues < 2) {
      setResult(null);
      setCalculation('');
      return;
    }

    // Validate inputs
    if (voltage && (isNaN(v) || v <= 0)) {
      setResult(null);
      setCalculation('Error: Voltage must be a valid positive number');
      return;
    }
    if (current && (isNaN(i) || i <= 0)) {
      setResult(null);
      setCalculation('Error: Current must be a valid positive number');
      return;
    }
    if (resistance && (isNaN(r) || r <= 0)) {
      setResult(null);
      setCalculation('Error: Resistance must be a valid positive number');
      return;
    }
    if (power && (isNaN(p) || p <= 0)) {
      setResult(null);
      setCalculation('Error: Power must be a valid positive number');
      return;
    }

    // Calculate Power (P = V × I)
    if (voltage && current && !power && !resistance) {
      const calculatedPower = v * i;
      setResult({ value: calculatedPower, unit: 'W', label: 'Electrical Power' });
      setCalculation(`Power = Voltage × Current\nP = V × I\nP = ${formatValue(v)} V × ${formatValue(i)} A\nP = ${formatValue(calculatedPower)} W`);
    }
    // Calculate Power (P = V²/R)
    else if (voltage && resistance && !power && !current) {
      const calculatedPower = (v * v) / r;
      setResult({ value: calculatedPower, unit: 'W', label: 'Electrical Power' });
      setCalculation(`Power = Voltage² ÷ Resistance\nP = V² / R\nP = (${formatValue(v)} V)² ÷ ${formatValue(r)} Ω\nP = ${formatValue(v * v)} ÷ ${formatValue(r)}\nP = ${formatValue(calculatedPower)} W`);
    }
    // Calculate Power (P = I²R)
    else if (current && resistance && !power && !voltage) {
      const calculatedPower = i * i * r;
      setResult({ value: calculatedPower, unit: 'W', label: 'Electrical Power' });
      setCalculation(`Power = Current² × Resistance\nP = I² × R\nP = (${formatValue(i)} A)² × ${formatValue(r)} Ω\nP = ${formatValue(i * i)} × ${formatValue(r)}\nP = ${formatValue(calculatedPower)} W`);
    }
    // Calculate Voltage (V = P/I)
    else if (power && current && !voltage && !resistance) {
      const calculatedVoltage = p / i;
      setResult({ value: calculatedVoltage, unit: 'V', label: 'Voltage' });
      setCalculation(`Voltage = Power ÷ Current\nV = P / I\nV = ${formatValue(p)} W ÷ ${formatValue(i)} A\nV = ${formatValue(calculatedVoltage)} V`);
    }
    // Calculate Voltage (V = √(P × R))
    else if (power && resistance && !voltage && !current) {
      const calculatedVoltage = Math.sqrt(p * r);
      setResult({ value: calculatedVoltage, unit: 'V', label: 'Voltage' });
      setCalculation(`Voltage = √(Power × Resistance)\nV = √(P × R)\nV = √(${formatValue(p)} W × ${formatValue(r)} Ω)\nV = √${formatValue(p * r)}\nV = ${formatValue(calculatedVoltage)} V`);
    }
    // Calculate Current (I = P/V)
    else if (power && voltage && !current && !resistance) {
      const calculatedCurrent = p / v;
      setResult({ value: calculatedCurrent, unit: 'A', label: 'Current' });
      setCalculation(`Current = Power ÷ Voltage\nI = P / V\nI = ${formatValue(p)} W ÷ ${formatValue(v)} V\nI = ${formatValue(calculatedCurrent)} A`);
    }
    // Calculate Current (I = √(P/R))
    else if (power && resistance && !current && !voltage) {
      const calculatedCurrent = Math.sqrt(p / r);
      setResult({ value: calculatedCurrent, unit: 'A', label: 'Current' });
      setCalculation(`Current = √(Power ÷ Resistance)\nI = √(P / R)\nI = √(${formatValue(p)} W ÷ ${formatValue(r)} Ω)\nI = √${formatValue(p / r)}\nI = ${formatValue(calculatedCurrent)} A`);
    }
    // Calculate Resistance (R = V²/P)
    else if (voltage && power && !resistance && !current) {
      const calculatedResistance = (v * v) / p;
      setResult({ value: calculatedResistance, unit: 'Ω', label: 'Resistance' });
      setCalculation(`Resistance = Voltage² ÷ Power\nR = V² / P\nR = (${formatValue(v)} V)² ÷ ${formatValue(p)} W\nR = ${formatValue(v * v)} ÷ ${formatValue(p)}\nR = ${formatValue(calculatedResistance)} Ω`);
    }
    // Calculate Resistance (R = P/I²)
    else if (power && current && !resistance && !voltage) {
      const calculatedResistance = p / (i * i);
      setResult({ value: calculatedResistance, unit: 'Ω', label: 'Resistance' });
      setCalculation(`Resistance = Power ÷ Current²\nR = P / I²\nR = ${formatValue(p)} W ÷ (${formatValue(i)} A)²\nR = ${formatValue(p)} ÷ ${formatValue(i * i)}\nR = ${formatValue(calculatedResistance)} Ω`);
    }
    // Calculate Resistance (R = V/I) when we have V, I, and P (verify with P = VI)
    else if (voltage && current && power && !resistance) {
      const calculatedResistance = v / i;
      const calculatedPower = v * i;
      if (Math.abs(calculatedPower - p) < 0.01) {
        setResult({ value: calculatedResistance, unit: 'Ω', label: 'Resistance' });
        setCalculation(`Resistance = Voltage ÷ Current\nR = V / I\nR = ${formatValue(v)} V ÷ ${formatValue(i)} A\nR = ${formatValue(calculatedResistance)} Ω`);
      } else {
        setResult(null);
        setCalculation('Error: The provided values do not satisfy P = V × I. Please check your inputs.');
      }
    }
    // Calculate Voltage (V = I × R) when we have I, R, and P (verify with P = I²R)
    else if (current && resistance && power && !voltage) {
      const calculatedVoltage = i * r;
      const calculatedPower = i * i * r;
      if (Math.abs(calculatedPower - p) < 0.01) {
        setResult({ value: calculatedVoltage, unit: 'V', label: 'Voltage' });
        setCalculation(`Voltage = Current × Resistance\nV = I × R\nV = ${formatValue(i)} A × ${formatValue(r)} Ω\nV = ${formatValue(calculatedVoltage)} V`);
      } else {
        setResult(null);
        setCalculation('Error: The provided values do not satisfy P = I²R. Please check your inputs.');
      }
    }
    // Calculate Current (I = V/R) when we have V, R, and P (verify with P = V²/R)
    else if (voltage && resistance && power && !current) {
      const calculatedCurrent = v / r;
      const calculatedPower = (v * v) / r;
      if (Math.abs(calculatedPower - p) < 0.01) {
        setResult({ value: calculatedCurrent, unit: 'A', label: 'Current' });
        setCalculation(`Current = Voltage ÷ Resistance\nI = V / R\nI = ${formatValue(v)} V ÷ ${formatValue(r)} Ω\nI = ${formatValue(calculatedCurrent)} A`);
      } else {
        setResult(null);
        setCalculation('Error: The provided values do not satisfy P = V²/R. Please check your inputs.');
      }
    }
    else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setVoltage('');
    setCurrent('');
    setResistance('');
    setPower('');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Electrical Power Calculator</h2>
        <p className="text-gray-600">Calculate electrical power, voltage, current, or resistance using power formulas</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Voltage (V)
          </label>
          <Input
            type="text"
            placeholder="Enter voltage in volts"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
            className="w-full"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Current (I)
          </label>
          <Input
            type="text"
            placeholder="Enter current in amperes"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Resistance (R)
          </label>
          <Input
            type="text"
            placeholder="Enter resistance in ohms"
            value={resistance}
            onChange={(e) => setResistance(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Electrical Power (P)
          </label>
          <Input
            type="text"
            placeholder="Enter power in watts"
            value={power}
            onChange={(e) => setPower(e.target.value)}
            className="w-full"
          />
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
            <p className="text-sm text-[#820ECC]/80 mt-1">
              {result.label}
            </p>
            {calculation && (
              <div className="text-sm text-[#820ECC]/80 mt-3 font-mono whitespace-pre-line">
                {calculation}
              </div>
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
            <li>• Enter any two values to calculate the third or fourth</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Supported formulas: P = V × I, P = V²/R, P = I²R</li>
            <li>• All values are in standard SI units (V, A, Ω, W)</li>
            <li>• The calculator automatically selects the appropriate formula</li>
            <li>• Works for DC and AC resistive circuits</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

