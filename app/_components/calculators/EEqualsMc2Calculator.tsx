'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const SPEED_OF_LIGHT = 299792458; // m/s

const massUnits = {
  kg: { name: 'Kilogram (kg)', factor: 1 },
  g: { name: 'Gram (g)', factor: 0.001 },
  lb: { name: 'Pound (lb)', factor: 0.45359237 }
};

const energyUnits = {
  J: { name: 'Joule (J)', factor: 1 },
  kJ: { name: 'Kilojoule (kJ)', factor: 0.001 },
  MJ: { name: 'Megajoule (MJ)', factor: 0.000001 },
  GJ: { name: 'Gigajoule (GJ)', factor: 1e-9 }
};

interface EEqualsMc2CalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function EEqualsMc2Calculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: EEqualsMc2CalculatorProps) {
  const [mass, setMass] = useState('');
  const [massUnit, setMassUnit] = useState<keyof typeof massUnits>('kg');
  const [energyUnit, setEnergyUnit] = useState<keyof typeof energyUnits>('J');
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState('');

  const formatNumber = (value: number) => {
    if (!isFinite(value)) return 'Invalid';
    if (Math.abs(value) >= 1e9 || Math.abs(value) < 0.001) return value.toExponential(6);
    return value.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  const calculate = () => {
    const m = parseFloat(mass);
    if (isNaN(m) || m < 0) {
      setResult(null);
      setSteps('Enter a valid non-negative mass.');
      return;
    }

    const massKg = m * massUnits[massUnit].factor;
    const energyJ = massKg * SPEED_OF_LIGHT * SPEED_OF_LIGHT;
    const energyOut = energyJ * energyUnits[energyUnit].factor;

    setResult(energyOut);

    const calcText = [
      'E = m × c²',
      `m = ${formatNumber(massKg)} kg`,
      `c = ${SPEED_OF_LIGHT.toLocaleString()} m/s`,
      `E = ${formatNumber(energyJ)} J`,
      `E = ${formatNumber(energyOut)} ${energyUnit}`
    ].join('\n');

    setSteps(calcText);
  };

  const reset = () => {
    setMass('');
    setMassUnit('kg');
    setEnergyUnit('J');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">E = mc^2 Calculator</h2>
            <p className="text-gray-600">Convert mass to energy using Einstein's equation with flexible units.</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mass</label>
            <div className="flex gap-3">
              <Input
                type="number"
                min="0"
                placeholder="e.g., 1"
                value={mass}
                onChange={(e) => setMass(e.target.value)}
                className="flex-1"
              />
              <select
                value={massUnit}
                onChange={(e) => setMassUnit(e.target.value as keyof typeof massUnits)}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {Object.entries(massUnits).map(([key, unit]) => (
                  <option key={key} value={key}>{unit.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Energy unit</label>
            <select
              value={energyUnit}
              onChange={(e) => setEnergyUnit(e.target.value as keyof typeof energyUnits)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {Object.entries(energyUnits).map(([key, unit]) => (
                <option key={key} value={key}>{unit.name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={calculate} className="flex-1 custom-color-button">Calculate</Button>
            <Button onClick={reset} variant="outline" className="flex-1 custom-outline-button">Reset</Button>
          </div>

          {result !== null && (
            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg animate-fadeIn">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Energy</h3>
              <p className="text-2xl font-bold text-purple-700 mb-3">
                {formatNumber(result)} {energyUnit}
              </p>
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
