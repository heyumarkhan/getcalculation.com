'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const heightUnits = {
  m: { name: 'Meters (m)', factor: 1 },
  ft: { name: 'Feet (ft)', factor: 0.3048 }
};

interface FreeFallTimeCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function FreeFallTimeCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: FreeFallTimeCalculatorProps) {
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState<'m' | 'ft'>('m');
  const [gravity, setGravity] = useState('9.81');
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState('');

  const formatNumber = (value: number) => {
    if (!isFinite(value)) return 'Invalid';
    if (Math.abs(value) < 0.0001 || Math.abs(value) >= 1e6) return value.toExponential(6);
    return value.toFixed(4);
  };

  const calculate = () => {
    const h = parseFloat(height);
    const g = parseFloat(gravity);

    if (isNaN(h) || h < 0) {
      setResult(null);
      setSteps('Enter a valid non-negative height.');
      return;
    }
    if (isNaN(g) || g <= 0) {
      setResult(null);
      setSteps('Gravity must be greater than zero.');
      return;
    }

    const heightMeters = h * heightUnits[heightUnit].factor;
    const timeSeconds = Math.sqrt((2 * heightMeters) / g);

    setResult(timeSeconds);

    const calcText = [
      't = \u221A(2h / g)',
      `h = ${formatNumber(heightMeters)} m`,
      `g = ${formatNumber(g)} m/s²`,
      `t = ${formatNumber(timeSeconds)} s`
    ].join('\n');

    setSteps(calcText);
  };

  const reset = () => {
    setHeight('');
    setHeightUnit('m');
    setGravity('9.81');
    setResult(null);
    setSteps('');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-color-button { background-color: ${primaryColor}; }
          .custom-color-button:hover { background-color: ${primaryColor}dd !important; }
          .custom-color-button:focus { box-shadow: 0 0 0 3px ${primaryColor}40 !important; }
          .custom-outline-button { color: ${primaryColor}; border-color: ${primaryColor}; }
          .custom-outline-button:hover { background-color: ${primaryColor}10 !important; }
          .custom-outline-button:focus { box-shadow: 0 0 0 3px ${primaryColor}40 !important; }
        `
      }} />

      <Card className="p-6 max-w-xl mx-auto">
        {showTitle && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Free Fall Time Calculator</h2>
            <p className="text-gray-600">Compute fall time from height using t = √(2h/g).</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
            <div className="flex gap-3">
              <Input
                type="number"
                min="0"
                placeholder="e.g., 20"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="flex-1"
              />
              <select
                value={heightUnit}
                onChange={(e) => setHeightUnit(e.target.value as 'm' | 'ft')}
                className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {Object.entries(heightUnits).map(([key, unit]) => (
                  <option key={key} value={key}>{unit.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gravity (m/s²)</label>
            <Input
              type="number"
              min="0"
              step="0.01"
              placeholder="9.81"
              value={gravity}
              onChange={(e) => setGravity(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">Use 9.81 m/s² for Earth at sea level.</p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={calculate} className="flex-1 custom-color-button">Calculate</Button>
            <Button onClick={reset} variant="outline" className="flex-1 custom-outline-button">Reset</Button>
          </div>

          {result !== null && (
            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg animate-fadeIn">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Time of Fall</h3>
              <p className="text-2xl font-bold text-purple-700 mb-3">{formatNumber(result)} s</p>
              {steps && (
                <div className="text-sm text-purple-700 font-mono whitespace-pre-line bg-white p-3 rounded border border-purple-100">
                  {steps}
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
