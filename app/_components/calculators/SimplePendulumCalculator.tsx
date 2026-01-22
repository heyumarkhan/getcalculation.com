'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'period' | 'frequency' | 'length' | 'gravity';

type Result = {
  lines: string[];
};

export default function SimplePendulumCalculator() {
  const [method, setMethod] = useState<Method>('period');

  const [length, setLength] = useState('1');
  const [lengthUnit, setLengthUnit] = useState('m');
  const [gravity, setGravity] = useState('9.81');
  const [gravityUnit, setGravityUnit] = useState('m/s²');
  const [period, setPeriod] = useState('2');
  const [periodUnit, setPeriodUnit] = useState('s');
  const [frequency, setFrequency] = useState('0.5');
  const [frequencyUnit, setFrequencyUnit] = useState('Hz');
  const [amplitude, setAmplitude] = useState('15');
  const [amplitudeUnit, setAmplitudeUnit] = useState('deg');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const format = (val: number, digits = 4) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1e6 || (Math.abs(val) < 0.001 && val !== 0)) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  const lengthToM = (val: number, unit: string) => {
    switch (unit) {
      case 'm': return val;
      case 'cm': return val / 100;
      case 'mm': return val / 1000;
      case 'km': return val * 1000;
      case 'ft': return val * 0.3048;
      case 'in': return val * 0.0254;
      default: return val;
    }
  };

  const mToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'm': return val;
      case 'cm': return val * 100;
      case 'mm': return val * 1000;
      case 'km': return val / 1000;
      case 'ft': return val / 0.3048;
      case 'in': return val / 0.0254;
      default: return val;
    }
  };

  const gravityToMs2 = (val: number, unit: string) => {
    switch (unit) {
      case 'm/s²': return val;
      case 'cm/s²': return val / 100;
      case 'ft/s²': return val * 0.3048;
      default: return val;
    }
  };

  const ms2ToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'm/s²': return val;
      case 'cm/s²': return val * 100;
      case 'ft/s²': return val / 0.3048;
      default: return val;
    }
  };

  const periodToSec = (val: number, unit: string) => {
    switch (unit) {
      case 's': return val;
      case 'ms': return val / 1000;
      case 'min': return val * 60;
      default: return val;
    }
  };

  const secToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 's': return val;
      case 'ms': return val * 1000;
      case 'min': return val / 60;
      default: return val;
    }
  };

  const parsePositive = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const handleCalculate = () => {
    setResult(null);
    setCalculation('');

    if (method === 'period') {
      const lVal = parsePositive(length);
      const gVal = parsePositive(gravity);

      if (isNaN(lVal) || isNaN(gVal)) {
        setCalculation('Please enter valid length and gravity values.');
        return;
      }

      const L = lengthToM(lVal, lengthUnit);
      const g = gravityToMs2(gVal, gravityUnit);

      // Period of simple pendulum: T = 2π√(L/g)
      const T = 2 * Math.PI * Math.sqrt(L / g);

      // Frequency: f = 1/T
      const f = 1 / T;

      // Angular frequency: ω = 2πf
      const omega = 2 * Math.PI * f;

      // Number of oscillations in one minute
      const oscillationsPerMin = f * 60;

      // Maximum velocity (for small angle, amplitude A in radians)
      const A = parseFloat(amplitude) * (Math.PI / 180); // Convert to radians
      const maxVelocity = omega * L * Math.sin(A);

      // Maximum acceleration
      const maxAccel = omega * omega * L * Math.sin(A);

      setResult({
        lines: [
          `Length L = ${format(mToUnit(L, lengthUnit))} ${lengthUnit} (${format(L)} m)`,
          `Gravity g = ${format(ms2ToUnit(g, gravityUnit))} ${gravityUnit} (${format(g)} m/s²)`,
          `Period T = 2π√(L/g) = ${format(secToUnit(T, periodUnit))} ${periodUnit}`,
          `Frequency f = 1/T = ${format(f)} Hz`,
          `Angular frequency ω = 2πf = ${format(omega)} rad/s`,
          `Oscillations per minute = ${format(oscillationsPerMin)}`,
          `Max velocity (A=${parseFloat(amplitude)}°) = ${format(maxVelocity)} m/s`,
          `Max acceleration = ${format(maxAccel)} m/s²`,
          `Formula: T = 2π√(L/g) (valid for small angles < 15°)`
        ]
      });
      setCalculation('Calculated pendulum period and frequency.');
      return;
    }

    if (method === 'frequency') {
      const fVal = parsePositive(frequency);
      const gVal = parsePositive(gravity);

      if (isNaN(fVal) || isNaN(gVal)) {
        setCalculation('Please enter valid frequency and gravity values.');
        return;
      }

      const f = fVal; // frequency in Hz
      const g = gravityToMs2(gVal, gravityUnit);

      // From f = 1/(2π) × √(g/L)
      // Rearranging: L = g / (4π² × f²)
      const L = g / (4 * Math.PI * Math.PI * f * f);

      // Period: T = 1/f
      const T = 1 / f;

      // Angular frequency
      const omega = 2 * Math.PI * f;

      // Oscillations per minute
      const oscillationsPerMin = f * 60;

      setResult({
        lines: [
          `Frequency f = ${format(fVal)} Hz`,
          `Gravity g = ${format(ms2ToUnit(g, gravityUnit))} ${gravityUnit} (${format(g)} m/s²)`,
          `Period T = 1/f = ${format(secToUnit(T, periodUnit))} ${periodUnit}`,
          `Required length L = g / (4π²f²) = ${format(mToUnit(L, lengthUnit))} ${lengthUnit}`,
          `Angular frequency ω = 2πf = ${format(omega)} rad/s`,
          `Oscillations per minute = ${format(oscillationsPerMin)}`,
          `Formula: L = g / (4π² × f²)`
        ]
      });
      setCalculation('Calculated required pendulum length from frequency.');
      return;
    }

    if (method === 'length') {
      const TVal = parsePositive(period);
      const gVal = parsePositive(gravity);

      if (isNaN(TVal) || isNaN(gVal)) {
        setCalculation('Please enter valid period and gravity values.');
        return;
      }

      const T = periodToSec(TVal, periodUnit);
      const g = gravityToMs2(gVal, gravityUnit);

      // From T = 2π√(L/g)
      // Rearranging: L = g × (T / 2π)²
      const L = g * (T / (2 * Math.PI)) * (T / (2 * Math.PI));

      // Frequency
      const f = 1 / T;

      // Angular frequency
      const omega = 2 * Math.PI * f;

      // Oscillations per minute
      const oscillationsPerMin = f * 60;

      setResult({
        lines: [
          `Period T = ${format(secToUnit(T, periodUnit))} ${periodUnit} (${format(T)} s)`,
          `Gravity g = ${format(ms2ToUnit(g, gravityUnit))} ${gravityUnit} (${format(g)} m/s²)`,
          `Length L = g × (T/2π)² = ${format(mToUnit(L, lengthUnit))} ${lengthUnit}`,
          `Frequency f = 1/T = ${format(f)} Hz`,
          `Angular frequency ω = 2πf = ${format(omega)} rad/s`,
          `Oscillations per minute = ${format(oscillationsPerMin)}`,
          `Formula: L = (g × T²) / (4π²)`
        ]
      });
      setCalculation('Calculated required pendulum length from period.');
      return;
    }

    if (method === 'gravity') {
      const lVal = parsePositive(length);
      const TVal = parsePositive(period);

      if (isNaN(lVal) || isNaN(TVal)) {
        setCalculation('Please enter valid length and period values.');
        return;
      }

      const L = lengthToM(lVal, lengthUnit);
      const T = periodToSec(TVal, periodUnit);

      // From T = 2π√(L/g)
      // Rearranging: g = 4π² × L / T²
      const g = 4 * Math.PI * Math.PI * L / (T * T);

      // Frequency
      const f = 1 / T;

      // Angular frequency
      const omega = 2 * Math.PI * f;

      // Local gravity value
      const localGravity = ms2ToUnit(g, gravityUnit);

      // Compare to Earth standard (9.81 m/s²)
      const percentage = (g / 9.81) * 100;

      setResult({
        lines: [
          `Length L = ${format(mToUnit(L, lengthUnit))} ${lengthUnit} (${format(L)} m)`,
          `Period T = ${format(secToUnit(T, periodUnit))} ${periodUnit} (${format(T)} s)`,
          `Gravity g = 4π² × L / T² = ${format(localGravity)} ${gravityUnit}`,
          `Frequency f = 1/T = ${format(f)} Hz`,
          `Angular frequency ω = 2πf = ${format(omega)} rad/s`,
          `Gravity relative to Earth = ${format(percentage)}% of standard gravity`,
          g > 9.81 ? `Location: Higher gravity environment (mountain/higher latitude)` : `Location: Lower gravity environment (equator/altitude)`,
          `Formula: g = (4π² × L) / T²`
        ]
      });
      setCalculation('Calculated local gravity from pendulum measurements.');
      return;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">⏰</span>
          <h1 className="text-2xl font-bold text-gray-900">Simple Pendulum Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate period, frequency, length, or local gravity for simple pendulum systems.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select calculation method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'period' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="period" checked={method === 'period'} onChange={() => setMethod('period')} className="mr-2" />
              Period & frequency
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'frequency' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="frequency" checked={method === 'frequency'} onChange={() => setMethod('frequency')} className="mr-2" />
              Find length (frequency)
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'length' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="length" checked={method === 'length'} onChange={() => setMethod('length')} className="mr-2" />
              Find length (period)
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'gravity' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="gravity" checked={method === 'gravity'} onChange={() => setMethod('gravity')} className="mr-2" />
              Find gravity
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {(method === 'period' || method === 'gravity') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Pendulum Length" 
                  value={length} 
                  onChange={(e) => setLength(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 1" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={lengthUnit} onChange={(e) => setLengthUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="m">m</option>
                  <option value="cm">cm</option>
                  <option value="mm">mm</option>
                  <option value="km">km</option>
                  <option value="ft">ft</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'period' || method === 'frequency') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label={method === 'frequency' ? 'Frequency (Hz)' : 'Gravity'} 
                  value={gravity} 
                  onChange={(e) => setGravity(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 9.81" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={gravityUnit} onChange={(e) => setGravityUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="m/s²">m/s²</option>
                  <option value="cm/s²">cm/s²</option>
                  <option value="ft/s²">ft/s²</option>
                </select>
              </div>
            </div>
          )}

          {method === 'frequency' && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Frequency" 
                  value={frequency} 
                  onChange={(e) => setFrequency(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 0.5" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={frequencyUnit} onChange={(e) => setFrequencyUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="Hz">Hz</option>
                  <option value="rpm">rpm</option>
                </select>
              </div>
            </div>
          )}

          {method === 'length' && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Period" 
                  value={period} 
                  onChange={(e) => setPeriod(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 2" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={periodUnit} onChange={(e) => setPeriodUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="s">s</option>
                  <option value="ms">ms</option>
                  <option value="min">min</option>
                </select>
              </div>
            </div>
          )}

          {method === 'length' && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Gravity" 
                  value={gravity} 
                  onChange={(e) => setGravity(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 9.81" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={gravityUnit} onChange={(e) => setGravityUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="m/s²">m/s²</option>
                  <option value="cm/s²">cm/s²</option>
                  <option value="ft/s²">ft/s²</option>
                </select>
              </div>
            </div>
          )}

          {method === 'gravity' && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Period" 
                  value={period} 
                  onChange={(e) => setPeriod(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 2" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={periodUnit} onChange={(e) => setPeriodUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="s">s</option>
                  <option value="ms">ms</option>
                  <option value="min">min</option>
                </select>
              </div>
            </div>
          )}

          {method === 'period' && (
            <div>
              <Input 
                label="Amplitude (degrees, optional)" 
                value={amplitude} 
                onChange={(e) => setAmplitude(e.target.value)} 
                type="number" 
                placeholder="e.g., 15" 
              />
            </div>
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
