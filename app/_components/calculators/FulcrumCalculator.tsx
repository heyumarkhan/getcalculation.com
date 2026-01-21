'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'find-force' | 'find-distance' | 'mechanical-advantage' | 'balance-check';

type Result = {
  lines: string[];
};

export default function FulcrumCalculator() {
  const [method, setMethod] = useState<Method>('find-force');

  // Inputs
  const [force1, setForce1] = useState('100');
  const [force1Unit, setForce1Unit] = useState('N');
  const [distance1, setDistance1] = useState('2');
  const [distance1Unit, setDistance1Unit] = useState('m');
  const [force2, setForce2] = useState('50');
  const [force2Unit, setForce2Unit] = useState('N');
  const [distance2, setDistance2] = useState('4');
  const [distance2Unit, setDistance2Unit] = useState('m');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const format = (val: number, digits = 4) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1e6 || (Math.abs(val) < 0.001 && val !== 0)) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  const forceToNewtons = (val: number, unit: string) => {
    if (unit === 'N') return val;
    if (unit === 'kN') return val * 1000;
    if (unit === 'lbf') return val * 4.44822;
    if (unit === 'kgf') return val * 9.80665;
    return val;
  };

  const distanceToMeters = (val: number, unit: string) => {
    if (unit === 'm') return val;
    if (unit === 'cm') return val / 100;
    if (unit === 'mm') return val / 1000;
    if (unit === 'ft') return val * 0.3048;
    if (unit === 'in') return val * 0.0254;
    return val;
  };

  const parsePositive = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const handleCalculate = () => {
    setResult(null);
    setCalculation('');

    if (method === 'find-force') {
      const f1Val = parsePositive(force1);
      const d1Val = parsePositive(distance1);
      const d2Val = parsePositive(distance2);
      if (isNaN(f1Val) || isNaN(d1Val) || isNaN(d2Val)) {
        setCalculation('Please enter valid force and distances.');
        return;
      }

      const f1N = forceToNewtons(f1Val, force1Unit);
      const d1M = distanceToMeters(d1Val, distance1Unit);
      const d2M = distanceToMeters(d2Val, distance2Unit);

      // F1 × d1 = F2 × d2
      const f2N = (f1N * d1M) / d2M;
      const mechanicalAdvantage = d2M / d1M;

      setResult({
        lines: [
          `Input force (F₁): ${format(f1N)} N at ${format(d1M)} m from fulcrum`,
          `Output force (F₂): ${format(f2N)} N at ${format(d2M)} m from fulcrum`,
          `Mechanical advantage: ${format(mechanicalAdvantage)}`,
          `Torque balance: ${format(f1N * d1M)} N·m = ${format(f2N * d2M)} N·m`,
          mechanicalAdvantage > 1 
            ? `Force amplification: Output force is ${format(mechanicalAdvantage)}× input force`
            : `Distance amplification: Output moves ${format(1/mechanicalAdvantage)}× input distance`
        ]
      });
      setCalculation('Computed output force using lever principle F₁ × d₁ = F₂ × d₂.');
      return;
    }

    if (method === 'find-distance') {
      const f1Val = parsePositive(force1);
      const d1Val = parsePositive(distance1);
      const f2Val = parsePositive(force2);
      if (isNaN(f1Val) || isNaN(d1Val) || isNaN(f2Val)) {
        setCalculation('Please enter valid forces and distance.');
        return;
      }

      const f1N = forceToNewtons(f1Val, force1Unit);
      const d1M = distanceToMeters(d1Val, distance1Unit);
      const f2N = forceToNewtons(f2Val, force2Unit);

      // F1 × d1 = F2 × d2 → d2 = (F1 × d1) / F2
      const d2M = (f1N * d1M) / f2N;
      const mechanicalAdvantage = d2M / d1M;

      setResult({
        lines: [
          `Input force (F₁): ${format(f1N)} N at ${format(d1M)} m from fulcrum`,
          `Output force (F₂): ${format(f2N)} N`,
          `Required distance (d₂): ${format(d2M)} m from fulcrum`,
          `Mechanical advantage: ${format(mechanicalAdvantage)}`,
          `Torque balance: ${format(f1N * d1M)} N·m = ${format(f2N * d2M)} N·m`
        ]
      });
      setCalculation('Computed required distance using lever principle F₁ × d₁ = F₂ × d₂.');
      return;
    }

    if (method === 'mechanical-advantage') {
      const d1Val = parsePositive(distance1);
      const d2Val = parsePositive(distance2);
      if (isNaN(d1Val) || isNaN(d2Val)) {
        setCalculation('Please enter valid distances.');
        return;
      }

      const d1M = distanceToMeters(d1Val, distance1Unit);
      const d2M = distanceToMeters(d2Val, distance2Unit);

      const mechanicalAdvantage = d2M / d1M;
      const idealForceRatio = mechanicalAdvantage;
      const velocityRatio = 1 / mechanicalAdvantage;

      setResult({
        lines: [
          `Effort arm (d₁): ${format(d1M)} m`,
          `Load arm (d₂): ${format(d2M)} m`,
          `Mechanical advantage (MA): ${format(mechanicalAdvantage)}`,
          `Force ratio: 1 N effort → ${format(idealForceRatio)} N load`,
          `Velocity ratio: ${format(velocityRatio)} (effort moves ${format(1/velocityRatio)}× faster than load)`,
          mechanicalAdvantage > 1 
            ? `Class 2 lever: Effort moves farther, load multiplied by ${format(mechanicalAdvantage)}×`
            : mechanicalAdvantage < 1
            ? `Class 3 lever: Effort closer to fulcrum, speed/distance multiplied`
            : 'Balanced lever: No mechanical advantage'
        ]
      });
      setCalculation('Computed mechanical advantage from lever arm distances.');
      return;
    }

    if (method === 'balance-check') {
      const f1Val = parsePositive(force1);
      const d1Val = parsePositive(distance1);
      const f2Val = parsePositive(force2);
      const d2Val = parsePositive(distance2);
      if (isNaN(f1Val) || isNaN(d1Val) || isNaN(f2Val) || isNaN(d2Val)) {
        setCalculation('Please enter valid forces and distances.');
        return;
      }

      const f1N = forceToNewtons(f1Val, force1Unit);
      const d1M = distanceToMeters(d1Val, distance1Unit);
      const f2N = forceToNewtons(f2Val, force2Unit);
      const d2M = distanceToMeters(d2Val, distance2Unit);

      const torque1 = f1N * d1M;
      const torque2 = f2N * d2M;
      const difference = torque1 - torque2;
      const percentDiff = Math.abs(difference / Math.max(torque1, torque2)) * 100;
      const isBalanced = Math.abs(percentDiff) < 0.1;

      setResult({
        lines: [
          `Side 1 torque: ${format(f1N)} N × ${format(d1M)} m = ${format(torque1)} N·m`,
          `Side 2 torque: ${format(f2N)} N × ${format(d2M)} m = ${format(torque2)} N·m`,
          `Torque difference: ${format(Math.abs(difference))} N·m (${format(percentDiff)}%)`,
          isBalanced 
            ? '✓ System is balanced (torques equal)'
            : difference > 0
            ? `⚠ Side 1 dominates by ${format(Math.abs(difference))} N·m (rotates counterclockwise)`
            : `⚠ Side 2 dominates by ${format(Math.abs(difference))} N·m (rotates clockwise)`,
          `Net torque: ${format(difference)} N·m`
        ]
      });
      setCalculation('Checked lever balance by comparing torques on both sides.');
      return;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">⚒️</span>
          <h1 className="text-2xl font-bold text-gray-900">Fulcrum Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate lever mechanics using fulcrum position, forces, distances, and mechanical advantage.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'find-force' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="find-force" checked={method === 'find-force'} onChange={() => setMethod('find-force')} className="mr-2" />
              Find output force
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'find-distance' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="find-distance" checked={method === 'find-distance'} onChange={() => setMethod('find-distance')} className="mr-2" />
              Find required distance
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'mechanical-advantage' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="mechanical-advantage" checked={method === 'mechanical-advantage'} onChange={() => setMethod('mechanical-advantage')} className="mr-2" />
              Mechanical advantage
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'balance-check' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="balance-check" checked={method === 'balance-check'} onChange={() => setMethod('balance-check')} className="mr-2" />
              Balance check
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {(method === 'find-force' || method === 'find-distance' || method === 'balance-check') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Force 1 (Effort)" value={force1} onChange={(e) => setForce1(e.target.value)} type="number" placeholder="e.g., 100" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={force1Unit} onChange={(e) => setForce1Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="N">N</option>
                  <option value="kN">kN</option>
                  <option value="lbf">lbf</option>
                  <option value="kgf">kgf</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'find-force' || method === 'find-distance' || method === 'mechanical-advantage' || method === 'balance-check') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Distance 1 (Effort Arm)" value={distance1} onChange={(e) => setDistance1(e.target.value)} type="number" placeholder="e.g., 2" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={distance1Unit} onChange={(e) => setDistance1Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="m">m</option>
                  <option value="cm">cm</option>
                  <option value="mm">mm</option>
                  <option value="ft">ft</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'find-distance' || method === 'balance-check') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Force 2 (Load)" value={force2} onChange={(e) => setForce2(e.target.value)} type="number" placeholder="e.g., 50" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={force2Unit} onChange={(e) => setForce2Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="N">N</option>
                  <option value="kN">kN</option>
                  <option value="lbf">lbf</option>
                  <option value="kgf">kgf</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'find-force' || method === 'mechanical-advantage' || method === 'balance-check') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Distance 2 (Load Arm)" value={distance2} onChange={(e) => setDistance2(e.target.value)} type="number" placeholder="e.g., 4" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={distance2Unit} onChange={(e) => setDistance2Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="m">m</option>
                  <option value="cm">cm</option>
                  <option value="mm">mm</option>
                  <option value="ft">ft</option>
                  <option value="in">in</option>
                </select>
              </div>
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
