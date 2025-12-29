'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface DBGainCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function DBGainCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: DBGainCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'db-from-power' | 'db-from-voltage' | 'power-from-db' | 'voltage-from-db'>('db-from-power');
  const [inputPower1, setInputPower1] = useState('');
  const [outputPower, setOutputPower] = useState('');
  const [inputVoltage1, setInputVoltage1] = useState('');
  const [outputVoltage, setOutputVoltage] = useState('');
  const [dbGain, setDbGain] = useState('');
  const [result, setResult] = useState<{ value: number; unit: string; variable: string } | null>(null);
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

  const calculateDbFromPower = () => {
    const p1 = parseFloat(inputPower1);
    const p2 = parseFloat(outputPower);

    if (isNaN(p1) || isNaN(p2) || p1 <= 0 || p2 <= 0) {
      setResult(null);
      setCalculation('Please enter valid positive numerical values for input and output power.');
      return;
    }

    // Calculate dB: dB = 10 × log₁₀(P₂/P₁)
    const powerRatio = p2 / p1;
    const db = 10 * Math.log10(powerRatio);

    setResult({
      value: db,
      unit: 'dB',
      variable: 'dB Gain'
    });

    // Build calculation string
    let calcStr = `dB = 10 × log₁₀(P₂/P₁)\n`;
    calcStr += `dB = 10 × log₁₀(${formatValue(p2)} / ${formatValue(p1)})\n`;
    calcStr += `dB = 10 × log₁₀(${formatValue(powerRatio)})\n`;
    calcStr += `dB = 10 × ${formatValue(Math.log10(powerRatio))}\n`;
    calcStr += `dB = ${formatValue(db)} dB`;

    setCalculation(calcStr);
  };

  const calculateDbFromVoltage = () => {
    const v1 = parseFloat(inputVoltage1);
    const v2 = parseFloat(outputVoltage);

    if (isNaN(v1) || isNaN(v2) || v1 <= 0 || v2 <= 0) {
      setResult(null);
      setCalculation('Please enter valid positive numerical values for input and output voltage.');
      return;
    }

    // Calculate dB: dB = 20 × log₁₀(V₂/V₁)
    const voltageRatio = v2 / v1;
    const db = 20 * Math.log10(voltageRatio);

    setResult({
      value: db,
      unit: 'dB',
      variable: 'dB Gain'
    });

    // Build calculation string
    let calcStr = `dB = 20 × log₁₀(V₂/V₁)\n`;
    calcStr += `dB = 20 × log₁₀(${formatValue(v2)} / ${formatValue(v1)})\n`;
    calcStr += `dB = 20 × log₁₀(${formatValue(voltageRatio)})\n`;
    calcStr += `dB = 20 × ${formatValue(Math.log10(voltageRatio))}\n`;
    calcStr += `dB = ${formatValue(db)} dB`;

    setCalculation(calcStr);
  };

  const calculatePowerFromDb = () => {
    const db = parseFloat(dbGain);

    if (isNaN(db)) {
      setResult(null);
      setCalculation('Please enter a valid numerical value for dB gain.');
      return;
    }

    // Calculate power ratio: P₂/P₁ = 10^(dB/10)
    const powerRatio = Math.pow(10, db / 10);

    setResult({
      value: powerRatio,
      unit: '',
      variable: 'Power Ratio (P₂/P₁)'
    });

    // Build calculation string
    let calcStr = `P₂/P₁ = 10^(dB/10)\n`;
    calcStr += `P₂/P₁ = 10^(${formatValue(db)} / 10)\n`;
    calcStr += `P₂/P₁ = 10^${formatValue(db / 10)}\n`;
    calcStr += `P₂/P₁ = ${formatValue(powerRatio)}`;

    setCalculation(calcStr);
  };

  const calculateVoltageFromDb = () => {
    const db = parseFloat(dbGain);

    if (isNaN(db)) {
      setResult(null);
      setCalculation('Please enter a valid numerical value for dB gain.');
      return;
    }

    // Calculate voltage ratio: V₂/V₁ = 10^(dB/20)
    const voltageRatio = Math.pow(10, db / 20);

    setResult({
      value: voltageRatio,
      unit: '',
      variable: 'Voltage Ratio (V₂/V₁)'
    });

    // Build calculation string
    let calcStr = `V₂/V₁ = 10^(dB/20)\n`;
    calcStr += `V₂/V₁ = 10^(${formatValue(db)} / 20)\n`;
    calcStr += `V₂/V₁ = 10^${formatValue(db / 20)}\n`;
    calcStr += `V₂/V₁ = ${formatValue(voltageRatio)}`;

    setCalculation(calcStr);
  };

  const calculate = () => {
    switch (calculationType) {
      case 'db-from-power':
        calculateDbFromPower();
        break;
      case 'db-from-voltage':
        calculateDbFromVoltage();
        break;
      case 'power-from-db':
        calculatePowerFromDb();
        break;
      case 'voltage-from-db':
        calculateVoltageFromDb();
        break;
    }
  };

  const clearAll = () => {
    setCalculationType('db-from-power');
    setInputPower1('');
    setOutputPower('');
    setInputVoltage1('');
    setOutputVoltage('');
    setDbGain('');
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
      <Card className="p-6 max-w-xl mx-auto">
        {showTitle && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">dB Gain Calculator</h2>
            <p className="text-gray-600">Calculate decibel gain from power or voltage ratios</p>
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
              onChange={(e) => setCalculationType(e.target.value as 'db-from-power' | 'db-from-voltage' | 'power-from-db' | 'voltage-from-db')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="db-from-power">dB from Power Ratio</option>
              <option value="db-from-voltage">dB from Voltage Ratio</option>
              <option value="power-from-db">Power Ratio from dB</option>
              <option value="voltage-from-db">Voltage Ratio from dB</option>
            </select>
          </div>

          {calculationType === 'db-from-power' && (
            <>
              <div>
                <label htmlFor="inputPower1" className="block text-sm font-medium text-gray-700 mb-3">
                  Input Power (P₁)
                </label>
                <Input
                  id="inputPower1"
                  type="number"
                  placeholder="Enter input power"
                  value={inputPower1}
                  onChange={(e) => setInputPower1(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="outputPower" className="block text-sm font-medium text-gray-700 mb-3">
                  Output Power (P₂)
                </label>
                <Input
                  id="outputPower"
                  type="number"
                  placeholder="Enter output power"
                  value={outputPower}
                  onChange={(e) => setOutputPower(e.target.value)}
                  className="w-full"
                />
              </div>
            </>
          )}

          {calculationType === 'db-from-voltage' && (
            <>
              <div>
                <label htmlFor="inputVoltage1" className="block text-sm font-medium text-gray-700 mb-3">
                  Input Voltage (V₁)
                </label>
                <Input
                  id="inputVoltage1"
                  type="number"
                  placeholder="Enter input voltage"
                  value={inputVoltage1}
                  onChange={(e) => setInputVoltage1(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="outputVoltage" className="block text-sm font-medium text-gray-700 mb-3">
                  Output Voltage (V₂)
                </label>
                <Input
                  id="outputVoltage"
                  type="number"
                  placeholder="Enter output voltage"
                  value={outputVoltage}
                  onChange={(e) => setOutputVoltage(e.target.value)}
                  className="w-full"
                />
              </div>
            </>
          )}

          {(calculationType === 'power-from-db' || calculationType === 'voltage-from-db') && (
            <div>
              <label htmlFor="dbGain" className="block text-sm font-medium text-gray-700 mb-3">
                dB Gain
              </label>
              <Input
                id="dbGain"
                type="number"
                placeholder="Enter dB gain"
                value={dbGain}
                onChange={(e) => setDbGain(e.target.value)}
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
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Result</h3>
              <p className="text-2xl font-bold text-blue-700">
                {result.variable}: {formatValue(result.value)} {result.unit}
              </p>
              {calculation && (
                <div className="text-sm text-blue-600 mt-2 font-mono whitespace-pre-line">
                  {calculation}
                </div>
              )}
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Select what you want to calculate: dB from power, dB from voltage, power ratio from dB, or voltage ratio from dB</li>
              <li>• Enter the required values based on your selection</li>
              <li>• Click &quot;Calculate&quot; to get the result with step-by-step calculations</li>
              <li>• Note: For power, use dB = 10×log₁₀(P₂/P₁). For voltage/amplitude, use dB = 20×log₁₀(V₂/V₁)</li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}

