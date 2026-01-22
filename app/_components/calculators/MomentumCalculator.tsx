'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'linear-momentum' | 'impulse-momentum' | 'momentum-change' | 'collision';

type Result = {
  lines: string[];
};

export default function MomentumCalculator() {
  const [method, setMethod] = useState<Method>('linear-momentum');

  const [mass, setMass] = useState('5');
  const [massUnit, setMassUnit] = useState('kg');
  const [velocity, setVelocity] = useState('20');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [force, setForce] = useState('100');
  const [forceUnit, setForceUnit] = useState('N');
  const [time, setTime] = useState('2');
  const [timeUnit, setTimeUnit] = useState('s');
  const [mass2, setMass2] = useState('3');
  const [mass2Unit, setMass2Unit] = useState('kg');
  const [velocity2, setVelocity2] = useState('15');
  const [velocity2Unit, setVelocity2Unit] = useState('m/s');
  const [velocityFinal, setVelocityFinal] = useState('');
  const [velocityFinalUnit, setVelocityFinalUnit] = useState('m/s');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const format = (val: number, digits = 4) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1e6 || (Math.abs(val) < 0.001 && val !== 0)) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  const massToKg = (val: number, unit: string) => {
    switch (unit) {
      case 'kg': return val;
      case 'g': return val / 1000;
      case 'mg': return val / 1_000_000;
      case 'lb': return val * 0.453592;
      case 'oz': return val * 0.0283495;
      case 'ton': return val * 1000;
      default: return val;
    }
  };

  const kgToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'kg': return val;
      case 'g': return val * 1000;
      case 'mg': return val * 1_000_000;
      case 'lb': return val / 0.453592;
      case 'oz': return val / 0.0283495;
      case 'ton': return val / 1000;
      default: return val;
    }
  };

  const velocityToMs = (val: number, unit: string) => {
    switch (unit) {
      case 'm/s': return val;
      case 'km/h': return val / 3.6;
      case 'ft/s': return val * 0.3048;
      case 'mph': return val * 0.44704;
      case 'cm/s': return val / 100;
      default: return val;
    }
  };

  const msToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'm/s': return val;
      case 'km/h': return val * 3.6;
      case 'ft/s': return val / 0.3048;
      case 'mph': return val / 0.44704;
      case 'cm/s': return val * 100;
      default: return val;
    }
  };

  const forceToN = (val: number, unit: string) => {
    switch (unit) {
      case 'N': return val;
      case 'kN': return val * 1000;
      case 'MN': return val * 1_000_000;
      case 'dyn': return val / 100000;
      case 'lbf': return val * 4.44822;
      case 'kgf': return val * 9.80665;
      default: return val;
    }
  };

  const nToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'N': return val;
      case 'kN': return val / 1000;
      case 'MN': return val / 1_000_000;
      case 'dyn': return val * 100000;
      case 'lbf': return val / 4.44822;
      case 'kgf': return val / 9.80665;
      default: return val;
    }
  };

  const timeToSec = (val: number, unit: string) => {
    switch (unit) {
      case 's': return val;
      case 'ms': return val / 1000;
      case 'μs': return val / 1_000_000;
      case 'min': return val * 60;
      case 'h': return val * 3600;
      default: return val;
    }
  };

  const secToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 's': return val;
      case 'ms': return val * 1000;
      case 'μs': return val * 1_000_000;
      case 'min': return val / 60;
      case 'h': return val / 3600;
      default: return val;
    }
  };

  const parsePositive = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const parseNumber = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) ? NaN : num;
  };

  const handleCalculate = () => {
    setResult(null);
    setCalculation('');

    if (method === 'linear-momentum') {
      const mVal = parsePositive(mass);
      const vVal = parseNumber(velocity);

      if (isNaN(mVal) || isNaN(vVal)) {
        setCalculation('Please enter valid mass and velocity values.');
        return;
      }

      const m = massToKg(mVal, massUnit);
      const v = velocityToMs(vVal, velocityUnit);

      // Linear momentum: p = m × v
      const p = m * v;
      const pInKgMs = p;
      const pInlbFtS = p / 0.453592 / 0.3048;

      const speedMagnitude = Math.abs(v);
      const kineticEnergy = 0.5 * m * v * v;

      setResult({
        lines: [
          `Mass m = ${format(mVal)} ${massUnit} (${format(m)} kg)`,
          `Velocity v = ${format(msToUnit(v, velocityUnit))} ${velocityUnit} (${format(v)} m/s)`,
          `Linear momentum p = m × v = ${format(pInKgMs)} kg·m/s`,
          `Also expressed as: ${format(pInlbFtS)} lb·ft/s`,
          `Speed magnitude |v| = ${format(speedMagnitude)} m/s`,
          `Kinetic energy KE = ½m·v² = ${format(kineticEnergy)} J`,
          `Formula: p = m·v (SI unit: kilogram-meter per second, kg·m/s)`
        ]
      });
      setCalculation('Calculated linear momentum and kinetic energy.');
      return;
    }

    if (method === 'impulse-momentum') {
      const fVal = parseNumber(force);
      const tVal = parsePositive(time);
      const mVal = parsePositive(mass);
      const vVal = parseNumber(velocity);

      if (isNaN(fVal) || isNaN(tVal) || isNaN(mVal) || isNaN(vVal)) {
        setCalculation('Please enter valid force, time, mass, and velocity values.');
        return;
      }

      const F = forceToN(fVal, forceUnit);
      const t = timeToSec(tVal, timeUnit);
      const m = massToKg(mVal, massUnit);
      const v = velocityToMs(vVal, velocityUnit);

      // Impulse: J = F × t
      const impulse = F * t;

      // Momentum change: Δp = m × Δv
      const momentumChange = m * v;

      // Impulse-momentum theorem: J = Δp
      const velocityChange = impulse / m;
      const initialVelocity = v - velocityChange;

      setResult({
        lines: [
          `Force F = ${format(nToUnit(F, forceUnit))} ${forceUnit} (${format(F)} N)`,
          `Time interval t = ${format(secToUnit(t, timeUnit))} ${timeUnit} (${format(t)} s)`,
          `Mass m = ${format(mVal)} ${massUnit} (${format(m)} kg)`,
          `Final velocity = ${format(msToUnit(v, velocityUnit))} ${velocityUnit}`,
          `Impulse J = F × t = ${format(impulse)} N·s`,
          `Momentum change Δp = ${format(momentumChange)} kg·m/s`,
          `Velocity change Δv = J/m = ${format(msToUnit(velocityChange, velocityUnit))} ${velocityUnit}`,
          `Initial velocity = ${format(msToUnit(initialVelocity, velocityUnit))} ${velocityUnit}`,
          `Impulse-momentum theorem: J = Δp`
        ]
      });
      setCalculation('Calculated impulse and momentum change.');
      return;
    }

    if (method === 'momentum-change') {
      const mVal = parsePositive(mass);
      const v1Val = parseNumber(velocity);
      const v2Val = parseNumber(velocityFinal);

      if (isNaN(mVal) || isNaN(v1Val) || isNaN(v2Val)) {
        setCalculation('Please enter valid mass and velocity values.');
        return;
      }

      const m = massToKg(mVal, massUnit);
      const v1 = velocityToMs(v1Val, velocityUnit);
      const v2 = velocityToMs(v2Val, velocityFinalUnit);

      // Initial momentum
      const p1 = m * v1;

      // Final momentum
      const p2 = m * v2;

      // Momentum change
      const deltaP = p2 - p1;

      // Velocity change
      const deltaV = v2 - v1;

      // Average acceleration
      const avgAccel = deltaV > 0 ? deltaV : deltaV;

      setResult({
        lines: [
          `Mass m = ${format(mVal)} ${massUnit} (${format(m)} kg)`,
          `Initial velocity v₁ = ${format(msToUnit(v1, velocityUnit))} ${velocityUnit} (${format(v1)} m/s)`,
          `Final velocity v₂ = ${format(msToUnit(v2, velocityFinalUnit))} ${velocityFinalUnit} (${format(v2)} m/s)`,
          `Initial momentum p₁ = m·v₁ = ${format(p1)} kg·m/s`,
          `Final momentum p₂ = m·v₂ = ${format(p2)} kg·m/s`,
          `Momentum change Δp = p₂ - p₁ = ${format(deltaP)} kg·m/s`,
          `Velocity change Δv = v₂ - v₁ = ${format(msToUnit(deltaV, velocityUnit))} ${velocityUnit}`,
          `Direction: ${deltaP > 0 ? 'Momentum increased (accelerating)' : deltaP < 0 ? 'Momentum decreased (decelerating)' : 'No change (constant velocity)'}`
        ]
      });
      setCalculation('Calculated momentum change and velocity difference.');
      return;
    }

    if (method === 'collision') {
      const m1Val = parsePositive(mass);
      const v1Val = parseNumber(velocity);
      const m2Val = parsePositive(mass2);
      const v2Val = parseNumber(velocity2);

      if (isNaN(m1Val) || isNaN(v1Val) || isNaN(m2Val) || isNaN(v2Val)) {
        setCalculation('Please enter valid mass and velocity values for both objects.');
        return;
      }

      const m1 = massToKg(m1Val, massUnit);
      const v1 = velocityToMs(v1Val, velocityUnit);
      const m2 = massToKg(m2Val, mass2Unit);
      const v2 = velocityToMs(v2Val, velocity2Unit);

      // Initial total momentum
      const p1Total = m1 * v1 + m2 * v2;

      // Final velocity (conservation of momentum, perfectly inelastic collision)
      const vFinal = p1Total / (m1 + m2);

      // Kinetic energy before collision
      const keBefore = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2;

      // Kinetic energy after collision
      const keAfter = 0.5 * (m1 + m2) * vFinal * vFinal;

      // Energy lost
      const energyLost = keBefore - keAfter;

      // Coefficient of restitution (if velocities are different)
      const relVelBefore = Math.abs(v1 - v2);
      const relVelAfter = 0; // Perfectly inelastic
      const coefRestitution = relVelBefore > 0 ? relVelAfter / relVelBefore : 0;

      setResult({
        lines: [
          `Object 1: m₁ = ${format(m1Val)} ${massUnit}, v₁ = ${format(msToUnit(v1, velocityUnit))} ${velocityUnit}`,
          `Object 2: m₂ = ${format(m2Val)} ${mass2Unit}, v₂ = ${format(msToUnit(v2, velocity2Unit))} ${velocity2Unit}`,
          `Total initial momentum = ${format(p1Total)} kg·m/s`,
          `Combined mass = ${format(m1 + m2)} kg`,
          `Final velocity (perfectly inelastic) = ${format(msToUnit(vFinal, velocityUnit))} ${velocityUnit}`,
          `Kinetic energy before: ${format(keBefore)} J`,
          `Kinetic energy after: ${format(keAfter)} J`,
          `Energy lost in collision: ${format(energyLost)} J`,
          `Coefficient of restitution e = ${format(coefRestitution)}`,
          `Conservation of momentum: m₁v₁ + m₂v₂ = (m₁ + m₂)v_f`
        ]
      });
      setCalculation('Calculated collision dynamics with energy loss.');
      return;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🆔</span>
          <h1 className="text-2xl font-bold text-gray-900">Momentum Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate linear momentum, impulse-momentum relationships, and collision dynamics.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select calculation method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'linear-momentum' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="linear-momentum" checked={method === 'linear-momentum'} onChange={() => setMethod('linear-momentum')} className="mr-2" />
              Linear momentum
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'impulse-momentum' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="impulse-momentum" checked={method === 'impulse-momentum'} onChange={() => setMethod('impulse-momentum')} className="mr-2" />
              Impulse & momentum
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'momentum-change' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="momentum-change" checked={method === 'momentum-change'} onChange={() => setMethod('momentum-change')} className="mr-2" />
              Momentum change
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'collision' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="collision" checked={method === 'collision'} onChange={() => setMethod('collision')} className="mr-2" />
              Collision analysis
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {(method === 'linear-momentum' || method === 'impulse-momentum' || method === 'momentum-change' || method === 'collision') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Mass" 
                  value={mass} 
                  onChange={(e) => setMass(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 5" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={massUnit} onChange={(e) => setMassUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="mg">mg</option>
                  <option value="lb">lb</option>
                  <option value="oz">oz</option>
                  <option value="ton">ton</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'linear-momentum' || method === 'momentum-change') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label={method === 'momentum-change' ? 'Initial Velocity' : 'Velocity'} 
                  value={velocity} 
                  onChange={(e) => setVelocity(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 20" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={velocityUnit} onChange={(e) => setVelocityUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="m/s">m/s</option>
                  <option value="km/h">km/h</option>
                  <option value="ft/s">ft/s</option>
                  <option value="mph">mph</option>
                  <option value="cm/s">cm/s</option>
                </select>
              </div>
            </div>
          )}

          {method === 'impulse-momentum' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Force" 
                    value={force} 
                    onChange={(e) => setForce(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 100" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={forceUnit} onChange={(e) => setForceUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="N">N</option>
                    <option value="kN">kN</option>
                    <option value="MN">MN</option>
                    <option value="dyn">dyn</option>
                    <option value="lbf">lbf</option>
                    <option value="kgf">kgf</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Time Duration" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 2" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={timeUnit} onChange={(e) => setTimeUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="s">s</option>
                    <option value="ms">ms</option>
                    <option value="μs">μs</option>
                    <option value="min">min</option>
                    <option value="h">h</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Final Velocity" 
                    value={velocity} 
                    onChange={(e) => setVelocity(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 30" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={velocityUnit} onChange={(e) => setVelocityUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="m/s">m/s</option>
                    <option value="km/h">km/h</option>
                    <option value="ft/s">ft/s</option>
                    <option value="mph">mph</option>
                    <option value="cm/s">cm/s</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {method === 'momentum-change' && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Final Velocity" 
                  value={velocityFinal} 
                  onChange={(e) => setVelocityFinal(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 25" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={velocityFinalUnit} onChange={(e) => setVelocityFinalUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="m/s">m/s</option>
                  <option value="km/h">km/h</option>
                  <option value="ft/s">ft/s</option>
                  <option value="mph">mph</option>
                  <option value="cm/s">cm/s</option>
                </select>
              </div>
            </div>
          )}

          {method === 'collision' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Object 1 Velocity" 
                    value={velocity} 
                    onChange={(e) => setVelocity(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 20" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={velocityUnit} onChange={(e) => setVelocityUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="m/s">m/s</option>
                    <option value="km/h">km/h</option>
                    <option value="ft/s">ft/s</option>
                    <option value="mph">mph</option>
                    <option value="cm/s">cm/s</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Object 2 Mass" 
                    value={mass2} 
                    onChange={(e) => setMass2(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 3" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={mass2Unit} onChange={(e) => setMass2Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="mg">mg</option>
                    <option value="lb">lb</option>
                    <option value="oz">oz</option>
                    <option value="ton">ton</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Object 2 Velocity" 
                    value={velocity2} 
                    onChange={(e) => setVelocity2(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 15" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={velocity2Unit} onChange={(e) => setVelocity2Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="m/s">m/s</option>
                    <option value="km/h">km/h</option>
                    <option value="ft/s">ft/s</option>
                    <option value="mph">mph</option>
                    <option value="cm/s">cm/s</option>
                  </select>
                </div>
              </div>
            </>
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
