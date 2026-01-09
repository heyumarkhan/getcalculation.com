'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors for resistance (base unit: Ohm)
const resistanceUnits = {
  'Ω': { name: 'Ohm (Ω)', factor: 1 },
  'mΩ': { name: 'Milliohm (mΩ)', factor: 0.001 },
  'kΩ': { name: 'Kilohm (kΩ)', factor: 1000 },
  'MΩ': { name: 'Megaohm (MΩ)', factor: 1e6 },
  'GΩ': { name: 'Gigaohm (GΩ)', factor: 1e9 }
};

interface Resistor {
  id: string;
  value: string;
  unit: string;
}

interface SeriesResistorCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function SeriesResistorCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: SeriesResistorCalculatorProps) {
  const [resistors, setResistors] = useState<Resistor[]>([
    { id: '1', value: '', unit: 'Ω' },
    { id: '2', value: '', unit: 'Ω' }
  ]);
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [calculationType, setCalculationType] = useState<'resistance' | 'voltage' | 'current'>('resistance');
  const [resultUnit, setResultUnit] = useState('Ω');
  const [result, setResult] = useState<{
    totalResistance: number;
    voltage?: number;
    current?: number;
    voltages?: number[];
    currents?: number[];
  } | null>(null);
  const [calculation, setCalculation] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    if (Math.abs(value) >= 1e12) {
      return value.toExponential(4);
    }
    return value.toFixed(4);
  };

  const convertToBaseUnits = (value: number, unit: string): number => {
    return value * resistanceUnits[unit as keyof typeof resistanceUnits].factor;
  };

  const convertFromBaseUnits = (value: number, unit: string): number => {
    return value / resistanceUnits[unit as keyof typeof resistanceUnits].factor;
  };

  const addResistor = () => {
    const newId = String(Math.max(...resistors.map(r => parseInt(r.id)), 0) + 1);
    setResistors([...resistors, { id: newId, value: '', unit: 'Ω' }]);
  };

  const removeResistor = (id: string) => {
    if (resistors.length > 2) {
      setResistors(resistors.filter(r => r.id !== id));
    }
  };

  const updateResistor = (id: string, field: 'value' | 'unit', val: string) => {
    setResistors(resistors.map(r => 
      r.id === id ? { ...r, [field]: val } : r
    ));
  };

  const calculateTotalResistance = (): number => {
    let total = 0;
    for (const resistor of resistors) {
      const val = parseFloat(resistor.value);
      if (!isNaN(val) && val >= 0) {
        const valInOhms = convertToBaseUnits(val, resistor.unit);
        total += valInOhms;
      }
    }
    return total;
  };

  const calculate = () => {
    const totalResistance = calculateTotalResistance();
    const validResistors = resistors.filter(r => {
      const val = parseFloat(r.value);
      return !isNaN(val) && val >= 0;
    });

    if (validResistors.length < 2) {
      setResult(null);
      setCalculation('Please enter at least 2 valid resistor values.');
      return;
    }

    const totalInUnit = convertFromBaseUnits(totalResistance, resultUnit);

    if (calculationType === 'resistance') {
      let calcStr = 'R_total = R1 + R2 + R3 + ... + Rn\n';
      calcStr += 'R_total = ';
      calcStr += validResistors.map(r => {
        const val = parseFloat(r.value);
        const valInOhms = convertToBaseUnits(val, r.unit);
        return `${formatValue(valInOhms)} Ω`;
      }).join(' + ');
      calcStr += `\nR_total = ${formatValue(totalResistance)} Ω = ${formatValue(totalInUnit)} ${resultUnit}`;

      setResult({
        totalResistance: totalInUnit
      });
      setCalculation(calcStr);
    } else if (calculationType === 'voltage' && voltage) {
      const v = parseFloat(voltage);
      if (isNaN(v) || v < 0) {
        setCalculation('Please enter a valid voltage value.');
        return;
      }

      // Calculate current using Ohm's Law: I = V / R
      const currentInAmps = v / totalResistance;
      
      // Calculate voltage across each resistor: V = I × R
      const voltages = validResistors.map(r => {
        const val = parseFloat(r.value);
        const valInOhms = convertToBaseUnits(val, r.unit);
        return currentInAmps * valInOhms;
      });

      let calcStr = `Total Voltage: ${formatValue(v)} V\n`;
      calcStr += `Total Resistance: ${formatValue(totalResistance)} Ω\n\n`;
      calcStr += `Current (Ohm's Law: I = V / R):\n`;
      calcStr += `I = ${formatValue(v)} V / ${formatValue(totalResistance)} Ω = ${formatValue(currentInAmps)} A\n\n`;
      calcStr += `Voltage across each resistor (V = I × R):\n`;
      validResistors.forEach((r, idx) => {
        const val = parseFloat(r.value);
        const valInOhms = convertToBaseUnits(val, r.unit);
        calcStr += `R${idx + 1}: V = ${formatValue(currentInAmps)} A × ${formatValue(valInOhms)} Ω = ${formatValue(voltages[idx])} V\n`;
      });
      calcStr += `\nTotal Voltage Check: ${formatValue(voltages.reduce((a, b) => a + b, 0))} V`;

      setResult({
        totalResistance: totalInUnit,
        voltage: v,
        current: currentInAmps,
        voltages: voltages
      });
      setCalculation(calcStr);
    } else if (calculationType === 'current' && current) {
      const i = parseFloat(current);
      if (isNaN(i) || i <= 0) {
        setCalculation('Please enter a valid positive current value.');
        return;
      }

      // Calculate voltage using Ohm's Law: V = I × R
      const voltageInVolts = i * totalResistance;
      
      // Voltage across each resistor
      const voltages = validResistors.map(r => {
        const val = parseFloat(r.value);
        const valInOhms = convertToBaseUnits(val, r.unit);
        return i * valInOhms;
      });

      let calcStr = `Total Current: ${formatValue(i)} A\n`;
      calcStr += `Total Resistance: ${formatValue(totalResistance)} Ω\n\n`;
      calcStr += `Total Voltage (Ohm's Law: V = I × R):\n`;
      calcStr += `V = ${formatValue(i)} A × ${formatValue(totalResistance)} Ω = ${formatValue(voltageInVolts)} V\n\n`;
      calcStr += `Voltage across each resistor (V = I × R):\n`;
      validResistors.forEach((r, idx) => {
        const val = parseFloat(r.value);
        const valInOhms = convertToBaseUnits(val, r.unit);
        calcStr += `R${idx + 1}: V = ${formatValue(i)} A × ${formatValue(valInOhms)} Ω = ${formatValue(voltages[idx])} V\n`;
      });
      calcStr += `\nTotal Voltage: ${formatValue(voltages.reduce((a, b) => a + b, 0))} V`;

      setResult({
        totalResistance: totalInUnit,
        voltage: voltageInVolts,
        current: i,
        voltages: voltages
      });
      setCalculation(calcStr);
    }
  };

  const clearAll = () => {
    setResistors([
      { id: '1', value: '', unit: 'Ω' },
      { id: '2', value: '', unit: 'Ω' }
    ]);
    setVoltage('');
    setCurrent('');
    setCalculationType('resistance');
    setResultUnit('Ω');
    setResult(null);
    setCalculation('');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-color-button {
            background-color: ${primaryColor};
          }
          .custom-color-button:hover {
            background-color: ${primaryColor}dd !important;
          }
          .custom-color-button:focus {
            box-shadow: 0 0 0 3px ${primaryColor}40 !important;
          }
          .custom-outline-button {
            color: ${primaryColor};
            border-color: ${primaryColor};
          }
          .custom-outline-button:hover {
            background-color: ${primaryColor}10 !important;
          }
          .custom-outline-button:focus {
            box-shadow: 0 0 0 3px ${primaryColor}40 !important;
          }
        `
      }} />
      <Card className="p-6 max-w-2xl mx-auto">
        {showTitle && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Series Resistor Calculator</h2>
            <p className="text-gray-600">Calculate total resistance, voltage drop, or current in series circuits using R_total = R1 + R2 + R3 + ... + Rn</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="calculationType" className="block text-sm font-medium text-gray-700 mb-3">
              Calculate
            </label>
            <select
              id="calculationType"
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value as 'resistance' | 'voltage' | 'current')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="resistance">Total Resistance</option>
              <option value="voltage">Voltage Drop Across Resistors</option>
              <option value="current">Total Voltage from Current</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Resistors in Series
              </label>
              <Button onClick={addResistor} variant="outline" className="text-xs px-3 py-1 custom-outline-button">
                Add Resistor
              </Button>
            </div>
            <div className="space-y-3">
              {resistors.map((resistor) => (
                <div key={resistor.id} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder={`R${resistor.id}`}
                      value={resistor.value}
                      onChange={(e) => updateResistor(resistor.id, 'value', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-32">
                    <select
                      value={resistor.unit}
                      onChange={(e) => updateResistor(resistor.id, 'unit', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(resistanceUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {resistors.length > 2 && (
                    <Button 
                      onClick={() => removeResistor(resistor.id)}
                      variant="outline"
                      className="px-3 py-2 text-red-600 border-red-300"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {calculationType === 'resistance' && (
            <div>
              <label htmlFor="resultUnit" className="block text-sm font-medium text-gray-700 mb-3">
                Result Resistance Unit
              </label>
              <select
                id="resultUnit"
                value={resultUnit}
                onChange={(e) => setResultUnit(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {Object.entries(resistanceUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {calculationType === 'voltage' && (
            <div>
              <label htmlFor="voltage" className="block text-sm font-medium text-gray-700 mb-3">
                Supply Voltage (V)
              </label>
              <Input
                id="voltage"
                type="number"
                placeholder="Enter voltage in volts"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="w-full"
              />
            </div>
          )}

          {calculationType === 'current' && (
            <div>
              <label htmlFor="current" className="block text-sm font-medium text-gray-700 mb-3">
                Circuit Current (A)
              </label>
              <Input
                id="current"
                type="number"
                placeholder="Enter current in amperes"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="w-full"
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button onClick={calculate} className="flex-1 custom-color-button">
              Calculate
            </Button>
            <Button onClick={clearAll} variant="outline" className="flex-1 custom-outline-button">
              Clear
            </Button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-fadeIn">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Result</h3>
              <p className="text-xl font-bold text-blue-700 mb-2">
                Total Resistance: {formatValue(result.totalResistance)} {resultUnit}
              </p>
              {result.current !== undefined && (
                <p className="text-lg font-semibold text-blue-700 mb-2">
                  Circuit Current: {formatValue(result.current)} A
                </p>
              )}
              {result.voltage !== undefined && (
                <p className="text-lg font-semibold text-blue-700 mb-3">
                  Total Voltage: {formatValue(result.voltage)} V
                </p>
              )}
              {result.voltages && result.voltages.length > 0 && (
                <div className="mt-3 bg-white rounded p-3 border border-blue-100">
                  <p className="text-sm font-semibold text-blue-900 mb-2">Voltage across each resistor:</p>
                  <div className="space-y-1 text-sm text-blue-700 font-mono">
                    {result.voltages.map((v, idx) => (
                      <div key={idx}>R{idx + 1}: {formatValue(v)} V</div>
                    ))}
                  </div>
                </div>
              )}
              {calculation && (
                <div className="text-sm text-blue-600 mt-4 font-mono whitespace-pre-line bg-white p-3 rounded border border-blue-100">
                  {calculation}
                </div>
              )}
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Enter resistance values for each component in the series circuit</li>
              <li>• Use the Add Resistor button to add more resistors</li>
              <li>• Select the calculation type: Total Resistance, Voltage Drop, or Voltage from Current</li>
              <li>• Click &quot;Calculate&quot; to get results with step-by-step calculations</li>
              <li>• In series circuits, total resistance is the sum of all individual resistances</li>
              <li>• Current remains constant throughout a series circuit</li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}
