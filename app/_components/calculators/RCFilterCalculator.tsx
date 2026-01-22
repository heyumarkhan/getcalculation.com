'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const resistanceUnits = {
  'Ω': 1,
  'kΩ': 1_000,
  'MΩ': 1_000_000
};

const capacitanceUnits = {
  F: 1,
  'µF': 1e-6,
  nF: 1e-9,
  pF: 1e-12
};

const frequencyUnits = {
  Hz: 1,
  kHz: 1_000,
  MHz: 1_000_000
};

const timeUnits = {
  s: 1,
  ms: 1e-3,
  µs: 1e-6
};

const formatNumber = (value: number, digits = 6) => {
  if (!isFinite(value)) return 'Invalid';
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 1e-3 && value !== 0)) {
    return value.toExponential(4);
  }
  return value.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
};

export default function RCFilterCalculator() {
  const [method, setMethod] = useState('cutoff');
  const [resistance, setResistance] = useState('10');
  const [resistanceUnit, setResistanceUnit] = useState<'Ω' | 'kΩ' | 'MΩ'>('kΩ');
  const [capacitance, setCapacitance] = useState('100');
  const [capacitanceUnit, setCapacitanceUnit] = useState<'F' | 'µF' | 'nF' | 'pF'>('nF');
  const [frequency, setFrequency] = useState('1.5915');
  const [frequencyUnit, setFrequencyUnit] = useState<'Hz' | 'kHz' | 'MHz'>('kHz');
  const [timeConstant, setTimeConstant] = useState('1');
  const [timeUnit, setTimeUnit] = useState<'s' | 'ms' | 'µs'>('ms');
  const [result, setResult] = useState<{
    cutoffHz?: number;
    cutoffKHz?: number;
    reactanceOhms?: number;
    tauSeconds?: number;
    tauMs?: number;
    tauUs?: number;
    cutoffFromTauHz?: number;
    cutoffFromTauKHz?: number;
    error?: boolean;
  }>({});

  const toResistance = (value: string, unit: keyof typeof resistanceUnits) => parseFloat(value) * resistanceUnits[unit];
  const toCapacitance = (value: string, unit: keyof typeof capacitanceUnits) => parseFloat(value) * capacitanceUnits[unit];
  const toFrequency = (value: string, unit: keyof typeof frequencyUnits) => parseFloat(value) * frequencyUnits[unit];
  const toTime = (value: string, unit: keyof typeof timeUnits) => parseFloat(value) * timeUnits[unit];

  const calculateCutoff = () => {
    const R = toResistance(resistance, resistanceUnit);
    const C = toCapacitance(capacitance, capacitanceUnit);

    if (!isFinite(R) || !isFinite(C) || R <= 0 || C <= 0) {
      setResult({ error: true });
      return;
    }

    const fc = 1 / (2 * Math.PI * R * C);
    setResult({ cutoffHz: fc, cutoffKHz: fc / 1_000 });
  };

  const calculateImpedance = () => {
    const f = toFrequency(frequency, frequencyUnit);
    const C = toCapacitance(capacitance, capacitanceUnit);

    if (!isFinite(f) || !isFinite(C) || f <= 0 || C <= 0) {
      setResult({ error: true });
      return;
    }

    const Xc = 1 / (2 * Math.PI * f * C);
    setResult({ reactanceOhms: Xc });
  };

  const calculateTau = () => {
    const R = toResistance(resistance, resistanceUnit);
    const C = toCapacitance(capacitance, capacitanceUnit);

    if (!isFinite(R) || !isFinite(C) || R <= 0 || C <= 0) {
      setResult({ error: true });
      return;
    }

    const tau = R * C;
    setResult({ tauSeconds: tau, tauMs: tau * 1e3, tauUs: tau * 1e6 });
  };

  const calculateCutoffFromTau = () => {
    const tau = toTime(timeConstant, timeUnit);

    if (!isFinite(tau) || tau <= 0) {
      setResult({ error: true });
      return;
    }

    const fc = 1 / (2 * Math.PI * tau);
    setResult({ cutoffFromTauHz: fc, cutoffFromTauKHz: fc / 1_000 });
  };

  const handleCalculate = () => {
    setResult({});

    if (method === 'cutoff') calculateCutoff();
    if (method === 'impedance') calculateImpedance();
    if (method === 'tau') calculateTau();
    if (method === 'cutoff-tau') calculateCutoffFromTau();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">RC Filter Calculator</h2>
          <p className="text-gray-600 mb-6">Calculate cutoff frequency, impedance, or time constant for RC filters</p>

          {/* Method Selection */}
          <div className="space-y-3 mb-6">
            <label className="block text-sm font-medium text-gray-700">Calculation Method</label>
            <div className="grid grid-cols-1 gap-2">
              {[{ value: 'cutoff', label: 'Cutoff Frequency from R & C' }, { value: 'impedance', label: 'Capacitive Reactance (Impedance)' }, { value: 'tau', label: 'Time Constant from R & C' }, { value: 'cutoff-tau', label: 'Cutoff Frequency from τ' }].map((m) => (
                <label key={m.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="method"
                    value={m.value}
                    checked={method === m.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">{m.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-4 mb-6">
            {['cutoff', 'tau'].includes(method) && (
              <>
                <div className="grid grid-cols-3 gap-3 items-center">
                  <label className="col-span-3 text-sm font-medium text-gray-700">Resistance</label>
                  <Input
                    type="number"
                    placeholder="e.g., 10"
                    value={resistance}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setResistance(e.target.value)}
                  />
                  <select
                    value={resistanceUnit}
                    onChange={(e) => setResistanceUnit(e.target.value as keyof typeof resistanceUnits)}
                    className="col-span-2 rounded border border-gray-300 px-3 py-2 text-sm"
                  >
                    {Object.keys(resistanceUnits).map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-3 items-center">
                  <label className="col-span-3 text-sm font-medium text-gray-700">Capacitance</label>
                  <Input
                    type="number"
                    placeholder="e.g., 100"
                    value={capacitance}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCapacitance(e.target.value)}
                  />
                  <select
                    value={capacitanceUnit}
                    onChange={(e) => setCapacitanceUnit(e.target.value as keyof typeof capacitanceUnits)}
                    className="col-span-2 rounded border border-gray-300 px-3 py-2 text-sm"
                  >
                    {Object.keys(capacitanceUnits).map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {method === 'impedance' && (
              <>
                <div className="grid grid-cols-3 gap-3 items-center">
                  <label className="col-span-3 text-sm font-medium text-gray-700">Frequency</label>
                  <Input
                    type="number"
                    placeholder="e.g., 1.5915"
                    value={frequency}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFrequency(e.target.value)}
                  />
                  <select
                    value={frequencyUnit}
                    onChange={(e) => setFrequencyUnit(e.target.value as keyof typeof frequencyUnits)}
                    className="col-span-2 rounded border border-gray-300 px-3 py-2 text-sm"
                  >
                    {Object.keys(frequencyUnits).map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-3 items-center">
                  <label className="col-span-3 text-sm font-medium text-gray-700">Capacitance</label>
                  <Input
                    type="number"
                    placeholder="e.g., 100"
                    value={capacitance}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCapacitance(e.target.value)}
                  />
                  <select
                    value={capacitanceUnit}
                    onChange={(e) => setCapacitanceUnit(e.target.value as keyof typeof capacitanceUnits)}
                    className="col-span-2 rounded border border-gray-300 px-3 py-2 text-sm"
                  >
                    {Object.keys(capacitanceUnits).map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {method === 'cutoff-tau' && (
              <div className="grid grid-cols-3 gap-3 items-center">
                <label className="col-span-3 text-sm font-medium text-gray-700">Time Constant τ</label>
                <Input
                  type="number"
                  placeholder="e.g., 1"
                  value={timeConstant}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimeConstant(e.target.value)}
                />
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value as keyof typeof timeUnits)}
                  className="col-span-2 rounded border border-gray-300 px-3 py-2 text-sm"
                >
                  {Object.keys(timeUnits).map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Calculate Button */}
          <Button onClick={handleCalculate} className="w-full" style={{ backgroundColor: '#820ECC' }}>
            Calculate
          </Button>

          {/* Results */}
          {Object.keys(result).length > 0 && !result.error && (
            <div className="mt-6 p-4 rounded-lg bg-purple-50 border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">Results</h3>
              <div className="space-y-2 text-sm text-purple-800">
                {result.cutoffHz !== undefined && (
                  <>
                    <div className="flex justify-between">
                      <span>Cutoff Frequency:</span>
                      <span className="font-mono font-semibold">{formatNumber(result.cutoffHz, 4)} Hz</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cutoff Frequency:</span>
                      <span className="font-mono font-semibold">{formatNumber(result.cutoffKHz ?? 0, 6)} kHz</span>
                    </div>
                  </>
                )}

                {result.reactanceOhms !== undefined && (
                  <div className="flex justify-between">
                    <span>Capacitive Reactance:</span>
                    <span className="font-mono font-semibold">{formatNumber(result.reactanceOhms, 4)} Ω</span>
                  </div>
                )}

                {result.tauSeconds !== undefined && (
                  <>
                    <div className="flex justify-between">
                      <span>Time Constant:</span>
                      <span className="font-mono font-semibold">{formatNumber(result.tauSeconds, 6)} s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Constant:</span>
                      <span className="font-mono font-semibold">{formatNumber(result.tauMs ?? 0, 4)} ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Constant:</span>
                      <span className="font-mono font-semibold">{formatNumber(result.tauUs ?? 0, 2)} µs</span>
                    </div>
                  </>
                )}

                {result.cutoffFromTauHz !== undefined && (
                  <>
                    <div className="flex justify-between">
                      <span>Cutoff Frequency:</span>
                      <span className="font-mono font-semibold">{formatNumber(result.cutoffFromTauHz, 4)} Hz</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cutoff Frequency:</span>
                      <span className="font-mono font-semibold">{formatNumber(result.cutoffFromTauKHz ?? 0, 6)} kHz</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {result.error && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-800 font-semibold">Please enter valid positive values</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
