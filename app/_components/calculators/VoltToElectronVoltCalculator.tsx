'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const elementaryCharge = 1.602176634e-19; // coulombs

const voltageUnits = {
  V: { name: 'Volt (V)', factor: 1 },
  kV: { name: 'Kilovolt (kV)', factor: 1000 },
  mV: { name: 'Millivolt (mV)', factor: 0.001 }
};

const energyUnits = {
  eV: { name: 'Electron Volt (eV)', factor: 1 },
  keV: { name: 'Kiloelectron Volt (keV)', factor: 1e-3 },
  MeV: { name: 'Megaelectron Volt (MeV)', factor: 1e-6 },
  Joule: { name: 'Joule (J)', factor: elementaryCharge }
};

interface VoltToElectronVoltCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function VoltToElectronVoltCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: VoltToElectronVoltCalculatorProps) {
  const [voltage, setVoltage] = useState('');
  const [voltageUnit, setVoltageUnit] = useState<keyof typeof voltageUnits>('V');
  const [chargeMultiplier, setChargeMultiplier] = useState('1');
  const [energyUnit, setEnergyUnit] = useState<keyof typeof energyUnits>('eV');
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState('');

  const formatNumber = (value: number) => {
    if (!isFinite(value)) return 'Invalid';
    if (Math.abs(value) >= 1e9 || Math.abs(value) < 0.001) return value.toExponential(6);
    return value.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  const calculate = () => {
    const v = parseFloat(voltage);
    const q = parseFloat(chargeMultiplier);

    if (isNaN(v)) {
      setResult(null);
      setSteps('Enter a valid voltage.');
      return;
    }
    if (isNaN(q) || q <= 0) {
      setResult(null);
      setSteps('Charge multiplier must be greater than zero.');
      return;
    }

    const voltageInVolts = v * voltageUnits[voltageUnit].factor;
    // Energy in eV for given charge multiplier (number of elementary charges)
    const energyEv = voltageInVolts * q; // eV per charge (1 eV = 1 V * e)
    let energyOutput: number;

    if (energyUnit === 'Joule') {
      energyOutput = energyEv * elementaryCharge; // convert eV to Joules
    } else {
      energyOutput = energyEv * energyUnits[energyUnit].factor; // scale to keV, MeV, etc.
    }

    setResult(energyOutput);

    const calcLines = [
      'E = q × V (1 eV = 1 V × e)',
      `V = ${formatNumber(voltageInVolts)} V`,
      `q = ${formatNumber(q)} e`,
      `E = ${formatNumber(energyEv)} eV`,
      energyUnit === 'Joule'
        ? `E = ${formatNumber(energyOutput)} J`
        : `E = ${formatNumber(energyOutput)} ${energyUnit}`
    ];

    setSteps(calcLines.join('\n'));
  };

  const reset = () => {
    setVoltage('');
    setVoltageUnit('V');
    setChargeMultiplier('1');
    setEnergyUnit('eV');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Volt to Electron Volt Calculator</h2>
            <p className="text-gray-600">Convert voltage to electron volts or joules using charge multiples.</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Voltage</label>
            <div className="flex gap-3">
              <Input
                type="number"
                placeholder="e.g., 5"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="flex-1"
              />
              <select
                value={voltageUnit}
                onChange={(e) => setVoltageUnit(e.target.value as keyof typeof voltageUnits)}
                className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {Object.entries(voltageUnits).map(([key, unit]) => (
                  <option key={key} value={key}>{unit.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Charge multiplier (number of e)</label>
            <Input
              type="number"
              min="0"
              step="0.01"
              placeholder="1"
              value={chargeMultiplier}
              onChange={(e) => setChargeMultiplier(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">Use 1 for a single electron charge.</p>
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
                {formatNumber(result)} {energyUnit === 'Joule' ? 'J' : energyUnit}
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
