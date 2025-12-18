'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface WattCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function WattCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: WattCalculatorProps) {
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');
  const [power, setPower] = useState('');
  const [result, setResult] = useState<{ value: number; unit: string; label: string } | null>(null);
  const [calculation, setCalculation] = useState('');

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

    // Calculate Power (P = V × I)
    if (voltage && current && !power && !resistance) {
      const calculatedPower = v * i;
      setResult({ value: calculatedPower, unit: 'W', label: 'Power' });
      setCalculation(`Power = Voltage × Current = ${v} V × ${i} A = ${calculatedPower.toFixed(2)} W`);
    }
    // Calculate Power (P = V²/R)
    else if (voltage && resistance && !power && !current) {
      const calculatedPower = (v * v) / r;
      setResult({ value: calculatedPower, unit: 'W', label: 'Power' });
      setCalculation(`Power = Voltage² ÷ Resistance = (${v} V)² ÷ ${r} Ω = ${(v * v).toFixed(2)} ÷ ${r} = ${calculatedPower.toFixed(2)} W`);
    }
    // Calculate Power (P = I²R)
    else if (current && resistance && !power && !voltage) {
      const calculatedPower = i * i * r;
      setResult({ value: calculatedPower, unit: 'W', label: 'Power' });
      setCalculation(`Power = Current² × Resistance = (${i} A)² × ${r} Ω = ${(i * i).toFixed(2)} × ${r} = ${calculatedPower.toFixed(2)} W`);
    }
    // Calculate Voltage (V = P/I)
    else if (power && current && !voltage && !resistance) {
      const calculatedVoltage = p / i;
      setResult({ value: calculatedVoltage, unit: 'V', label: 'Voltage' });
      setCalculation(`Voltage = Power ÷ Current = ${p} W ÷ ${i} A = ${calculatedVoltage.toFixed(2)} V`);
    }
    // Calculate Voltage (V = √(P × R))
    else if (power && resistance && !voltage && !current) {
      const calculatedVoltage = Math.sqrt(p * r);
      setResult({ value: calculatedVoltage, unit: 'V', label: 'Voltage' });
      setCalculation(`Voltage = √(Power × Resistance) = √(${p} W × ${r} Ω) = √${(p * r).toFixed(2)} = ${calculatedVoltage.toFixed(2)} V`);
    }
    // Calculate Current (I = P/V)
    else if (power && voltage && !current && !resistance) {
      const calculatedCurrent = p / v;
      setResult({ value: calculatedCurrent, unit: 'A', label: 'Current' });
      setCalculation(`Current = Power ÷ Voltage = ${p} W ÷ ${v} V = ${calculatedCurrent.toFixed(2)} A`);
    }
    // Calculate Current (I = √(P/R))
    else if (power && resistance && !current && !voltage) {
      const calculatedCurrent = Math.sqrt(p / r);
      setResult({ value: calculatedCurrent, unit: 'A', label: 'Current' });
      setCalculation(`Current = √(Power ÷ Resistance) = √(${p} W ÷ ${r} Ω) = √${(p / r).toFixed(2)} = ${calculatedCurrent.toFixed(2)} A`);
    }
    // Calculate Resistance (R = V²/P)
    else if (voltage && power && !resistance && !current) {
      const calculatedResistance = (v * v) / p;
      setResult({ value: calculatedResistance, unit: 'Ω', label: 'Resistance' });
      setCalculation(`Resistance = Voltage² ÷ Power = (${v} V)² ÷ ${p} W = ${(v * v).toFixed(2)} ÷ ${p} = ${calculatedResistance.toFixed(2)} Ω`);
    }
    // Calculate Resistance (R = P/I²)
    else if (power && current && !resistance && !voltage) {
      const calculatedResistance = p / (i * i);
      setResult({ value: calculatedResistance, unit: 'Ω', label: 'Resistance' });
      setCalculation(`Resistance = Power ÷ Current² = ${p} W ÷ (${i} A)² = ${p} ÷ ${(i * i).toFixed(2)} = ${calculatedResistance.toFixed(2)} Ω`);
    }
    // Calculate Resistance (R = V/I) when we have V, I, and P (verify with P = VI)
    else if (voltage && current && power && !resistance) {
      const calculatedResistance = v / i;
      const calculatedPower = v * i;
      if (Math.abs(calculatedPower - p) < 0.01) {
        setResult({ value: calculatedResistance, unit: 'Ω', label: 'Resistance' });
        setCalculation(`Resistance = Voltage ÷ Current = ${v} V ÷ ${i} A = ${calculatedResistance.toFixed(2)} Ω`);
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
        setCalculation(`Voltage = Current × Resistance = ${i} A × ${r} Ω = ${calculatedVoltage.toFixed(2)} V`);
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
        setCalculation(`Current = Voltage ÷ Resistance = ${v} V ÷ ${r} Ω = ${calculatedCurrent.toFixed(2)} A`);
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
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Watt Calculator</h2>
          <p className="text-gray-600">Calculate power, voltage, current, or resistance using electrical formulas</p>
        </div>
      )}

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
            Power (P)
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
          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, borderWidth: '1px' }}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>Result</h3>
            <p className="text-2xl font-bold" style={{ color: primaryColor }}>
              {result.value.toFixed(2)} {result.unit}
            </p>
            <p className="text-sm mt-1" style={{ color: `${primaryColor}CC` }}>
              {result.label}
            </p>
            {calculation && (
              <p className="text-sm mt-3 font-mono" style={{ color: `${primaryColor}AA` }}>
                {calculation}
              </p>
            )}
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
          </ul>
        </div>
      </div>
    </Card>
  );
}
