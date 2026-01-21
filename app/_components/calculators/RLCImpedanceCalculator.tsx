'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'series-impedance' | 'resonant-frequency' | 'tune-capacitance' | 'voltage-current';

type Result = {
  lines: string[];
};

const TWO_PI = 2 * Math.PI;

export default function RLCImpedanceCalculator() {
  const [method, setMethod] = useState<Method>('series-impedance');

  const [resistance, setResistance] = useState('50');
  const [resistanceUnit, setResistanceUnit] = useState('ohm');
  const [inductance, setInductance] = useState('10');
  const [inductanceUnit, setInductanceUnit] = useState('mH');
  const [capacitance, setCapacitance] = useState('1');
  const [capacitanceUnit, setCapacitanceUnit] = useState('uF');
  const [frequency, setFrequency] = useState('1000');
  const [frequencyUnit, setFrequencyUnit] = useState('Hz');
  const [voltage, setVoltage] = useState('120');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const format = (val: number, digits = 4) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1e6 || (Math.abs(val) < 0.001 && val !== 0)) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  const toOhms = (val: number, unit: string) => {
    if (unit === 'ohm') return val;
    if (unit === 'kohm') return val * 1000;
    return val;
  };

  const toHenries = (val: number, unit: string) => {
    if (unit === 'H') return val;
    if (unit === 'mH') return val / 1000;
    if (unit === 'uH') return val / 1_000_000;
    return val;
  };

  const toFarads = (val: number, unit: string) => {
    if (unit === 'F') return val;
    if (unit === 'mF') return val / 1000;
    if (unit === 'uF') return val / 1_000_000;
    if (unit === 'nF') return val / 1_000_000_000;
    return val;
  };

  const toHertz = (val: number, unit: string) => {
    if (unit === 'Hz') return val;
    if (unit === 'kHz') return val * 1000;
    if (unit === 'MHz') return val * 1_000_000;
    return val;
  };

  const parsePositive = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const calcReactance = (fHz: number, L: number, C: number) => {
    const xl = TWO_PI * fHz * L;
    const xc = 1 / (TWO_PI * fHz * C);
    return { xl, xc, net: xl - xc };
  };

  const handleCalculate = () => {
    setResult(null);
    setCalculation('');

    const rVal = parsePositive(resistance);
    const lVal = parsePositive(inductance);
    const cVal = parsePositive(capacitance);
    const fVal = parsePositive(frequency);

    if (method === 'series-impedance') {
      if (isNaN(rVal) || isNaN(lVal) || isNaN(cVal) || isNaN(fVal)) {
        setCalculation('Please enter valid resistance, inductance, capacitance, and frequency.');
        return;
      }
      const R = toOhms(rVal, resistanceUnit);
      const L = toHenries(lVal, inductanceUnit);
      const C = toFarads(cVal, capacitanceUnit);
      const f = toHertz(fVal, frequencyUnit);

      const { xl, xc, net } = calcReactance(f, L, C);
      const magnitude = Math.sqrt(R * R + net * net);
      const phaseDeg = Math.atan2(net, R) * 180 / Math.PI;
      const nature = net > 0 ? 'Inductive (current lags voltage)' : net < 0 ? 'Capacitive (current leads voltage)' : 'Resonant (balanced reactance)';

      setResult({
        lines: [
          `X_L = ${format(xl)} Ω`,
          `X_C = ${format(xc)} Ω`,
          `Net reactance X = ${format(net)} Ω (${nature})`,
          `Impedance |Z| = ${format(magnitude)} Ω`,
          `Phase angle φ = ${format(phaseDeg)}°`
        ]
      });
      setCalculation('Computed series RLC impedance magnitude and phase.');
      return;
    }

    if (method === 'resonant-frequency') {
      if (isNaN(lVal) || isNaN(cVal) || isNaN(rVal)) {
        setCalculation('Please enter valid inductance, capacitance, and resistance.');
        return;
      }
      const R = toOhms(rVal, resistanceUnit);
      const L = toHenries(lVal, inductanceUnit);
      const C = toFarads(cVal, capacitanceUnit);
      const f0 = 1 / (TWO_PI * Math.sqrt(L * C));
      const q = (1 / R) * Math.sqrt(L / C);
      const bandwidth = q > 0 ? f0 / q : NaN;
      const xl = TWO_PI * f0 * L;

      setResult({
        lines: [
          `Resonant frequency f₀ = ${format(f0)} Hz`,
          `Reactance at resonance X_L = X_C = ${format(xl)} Ω`,
          `Quality factor Q = ${format(q)}`,
          isNaN(bandwidth) ? 'Bandwidth: n/a' : `-3 dB bandwidth ≈ ${format(bandwidth)} Hz`
        ]
      });
      setCalculation('Computed resonant frequency, Q factor, and bandwidth for series RLC.');
      return;
    }

    if (method === 'tune-capacitance') {
      if (isNaN(lVal) || isNaN(fVal)) {
        setCalculation('Please enter valid inductance and target frequency.');
        return;
      }
      const L = toHenries(lVal, inductanceUnit);
      const f = toHertz(fVal, frequencyUnit);
      const C = 1 / (Math.pow(TWO_PI * f, 2) * L);
      const cMicro = C * 1_000_000;
      const cNano = C * 1_000_000_000;
      const xl = TWO_PI * f * L;

      setResult({
        lines: [
          `Required capacitance for resonance: ${format(C)} F (${format(cMicro)} µF, ${format(cNano)} nF)`,
          `Resulting reactances at resonance: X_L = X_C = ${format(xl)} Ω`,
          `Tuning tip: increase C to lower f₀; decrease C to raise f₀`
        ]
      });
      setCalculation('Computed capacitance needed for target resonant frequency.');
      return;
    }

    if (method === 'voltage-current') {
      if (isNaN(rVal) || isNaN(lVal) || isNaN(cVal) || isNaN(fVal)) {
        setCalculation('Please enter valid resistance, inductance, capacitance, and frequency.');
        return;
      }
      const R = toOhms(rVal, resistanceUnit);
      const L = toHenries(lVal, inductanceUnit);
      const C = toFarads(cVal, capacitanceUnit);
      const f = toHertz(fVal, frequencyUnit);
      const V = parsePositive(voltage);
      if (isNaN(V)) {
        setCalculation('Please enter valid source voltage.');
        return;
      }

      const { xl, xc, net } = calcReactance(f, L, C);
      const magnitude = Math.sqrt(R * R + net * net);
      if (magnitude === 0) {
        setCalculation('Impedance magnitude must be positive.');
        return;
      }
      const I = V / magnitude;
      const vR = I * R;
      const vL = I * xl;
      const vC = I * xc;
      const phaseDeg = Math.atan2(net, R) * 180 / Math.PI;

      setResult({
        lines: [
          `Impedance |Z| = ${format(magnitude)} Ω`,
          `Current magnitude I = ${format(I)} A`,
          `Voltage drops (magnitudes): VR = ${format(vR)} V, VL = ${format(vL)} V, VC = ${format(vC)} V`,
          `Phase angle φ = ${format(phaseDeg)}° (positive = inductive lag)`
        ]
      });
      setCalculation('Computed current and voltage drops across R, L, and C.');
      return;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🎛️</span>
          <h1 className="text-2xl font-bold text-gray-900">RLC Impedance Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate series RLC impedance, resonance, phase angle, reactance, and current magnitude.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'series-impedance' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="series-impedance" checked={method === 'series-impedance'} onChange={() => setMethod('series-impedance')} className="mr-2" />
              Series impedance
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'resonant-frequency' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="resonant-frequency" checked={method === 'resonant-frequency'} onChange={() => setMethod('resonant-frequency')} className="mr-2" />
              Resonant frequency & Q
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'tune-capacitance' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="tune-capacitance" checked={method === 'tune-capacitance'} onChange={() => setMethod('tune-capacitance')} className="mr-2" />
              Tune capacitance
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'voltage-current' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="voltage-current" checked={method === 'voltage-current'} onChange={() => setMethod('voltage-current')} className="mr-2" />
              Current & voltage drops
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {(method === 'series-impedance' || method === 'resonant-frequency' || method === 'tune-capacitance' || method === 'voltage-current') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Resistance" value={resistance} onChange={(e) => setResistance(e.target.value)} type="number" placeholder="e.g., 50" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={resistanceUnit} onChange={(e) => setResistanceUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="ohm">Ω</option>
                  <option value="kohm">kΩ</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'series-impedance' || method === 'resonant-frequency' || method === 'tune-capacitance' || method === 'voltage-current') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Inductance" value={inductance} onChange={(e) => setInductance(e.target.value)} type="number" placeholder="e.g., 10" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={inductanceUnit} onChange={(e) => setInductanceUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="H">H</option>
                  <option value="mH">mH</option>
                  <option value="uH">µH</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'series-impedance' || method === 'resonant-frequency' || method === 'tune-capacitance' || method === 'voltage-current') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Capacitance" value={capacitance} onChange={(e) => setCapacitance(e.target.value)} type="number" placeholder="e.g., 1" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={capacitanceUnit} onChange={(e) => setCapacitanceUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="F">F</option>
                  <option value="mF">mF</option>
                  <option value="uF">µF</option>
                  <option value="nF">nF</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'series-impedance' || method === 'tune-capacitance' || method === 'voltage-current') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)} type="number" placeholder="e.g., 1000" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={frequencyUnit} onChange={(e) => setFrequencyUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="Hz">Hz</option>
                  <option value="kHz">kHz</option>
                  <option value="MHz">MHz</option>
                </select>
              </div>
            </div>
          )}

          {method === 'voltage-current' && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Source Voltage" value={voltage} onChange={(e) => setVoltage(e.target.value)} type="number" placeholder="e.g., 120" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500" disabled>
                  <option>V</option>
                </select>
              </div>
            </div>
          )}

          {method === 'tune-capacitance' && (
            <p className="text-sm text-gray-600">Provide inductance and desired resonant frequency to compute required capacitance.</p>
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
