'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'force-mass' | 'force-time' | 'net-force' | 'kinematics';

type Result = {
  lines: string[];
};

export default function AccelerationForceAndMassCalculator() {
  const [method, setMethod] = useState<Method>('force-mass');

  const [force, setForce] = useState('50');
  const [forceUnit, setForceUnit] = useState('N');
  const [mass, setMass] = useState('10');
  const [massUnit, setMassUnit] = useState('kg');
  const [velocity1, setVelocity1] = useState('0');
  const [velocity1Unit, setVelocity1Unit] = useState('m/s');
  const [velocity2, setVelocity2] = useState('20');
  const [velocity2Unit, setVelocity2Unit] = useState('m/s');
  const [time, setTime] = useState('5');
  const [timeUnit, setTimeUnit] = useState('s');
  const [distance, setDistance] = useState('100');
  const [distanceUnit, setDistanceUnit] = useState('m');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const format = (val: number, digits = 4) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1e6 || (Math.abs(val) < 0.001 && val !== 0)) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
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

  const timeToSec = (val: number, unit: string) => {
    switch (unit) {
      case 's': return val;
      case 'ms': return val / 1000;
      case 'min': return val * 60;
      case 'h': return val * 3600;
      default: return val;
    }
  };

  const secToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 's': return val;
      case 'ms': return val * 1000;
      case 'min': return val / 60;
      case 'h': return val / 3600;
      default: return val;
    }
  };

  const distanceToM = (val: number, unit: string) => {
    switch (unit) {
      case 'm': return val;
      case 'km': return val * 1000;
      case 'cm': return val / 100;
      case 'mm': return val / 1000;
      case 'mi': return val * 1609.34;
      case 'ft': return val * 0.3048;
      case 'in': return val * 0.0254;
      default: return val;
    }
  };

  const mToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'm': return val;
      case 'km': return val / 1000;
      case 'cm': return val * 100;
      case 'mm': return val * 1000;
      case 'mi': return val / 1609.34;
      case 'ft': return val / 0.3048;
      case 'in': return val / 0.0254;
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

    if (method === 'force-mass') {
      const fVal = parseNumber(force);
      const mVal = parsePositive(mass);

      if (isNaN(fVal) || isNaN(mVal)) {
        setCalculation('Please enter valid force and mass values.');
        return;
      }

      const F = forceToN(fVal, forceUnit);
      const m = massToKg(mVal, massUnit);

      // Newton's second law: F = m × a → a = F / m
      const a = F / m;

      // Direction and magnitude
      const direction = F > 0 ? 'same direction as force' : 'opposite direction to force';

      // Time to reach certain velocities
      const timeFor10ms = 10 / a;
      const timeFor100ms = 100 / a;

      setResult({
        lines: [
          `Force F = ${format(nToUnit(F, forceUnit))} ${forceUnit} (${format(F)} N)`,
          `Mass m = ${format(mVal)} ${massUnit} (${format(m)} kg)`,
          `Acceleration a = F / m = ${format(a)} m/s²`,
          `Direction: ${direction}`,
          `Time to reach 10 m/s: ${format(timeFor10ms)} s`,
          `Time to reach 100 m/s: ${format(timeFor100ms)} s`,
          `Formula: a = F / m (Newton's Second Law, F = m·a)`
        ]
      });
      setCalculation('Calculated acceleration using Newton\'s Second Law.');
      return;
    }

    if (method === 'force-time') {
      const v1Val = parseNumber(velocity1);
      const v2Val = parseNumber(velocity2);
      const tVal = parsePositive(time);

      if (isNaN(v1Val) || isNaN(v2Val) || isNaN(tVal)) {
        setCalculation('Please enter valid velocity and time values.');
        return;
      }

      const v1 = velocityToMs(v1Val, velocity1Unit);
      const v2 = velocityToMs(v2Val, velocity2Unit);
      const t = timeToSec(tVal, timeUnit);

      // Acceleration: a = (v₂ - v₁) / t
      const a = (v2 - v1) / t;

      // Force needed (assuming mass input, use it if provided)
      const mVal = parsePositive(mass);
      const m = isNaN(mVal) ? NaN : massToKg(mVal, massUnit);
      const F = !isNaN(m) ? m * a : NaN;

      // Average velocity
      const vAvg = (v1 + v2) / 2;

      // Distance traveled
      const distance = vAvg * t;

      setResult({
        lines: [
          `Initial velocity v₁ = ${format(msToUnit(v1, velocity1Unit))} ${velocity1Unit} (${format(v1)} m/s)`,
          `Final velocity v₂ = ${format(msToUnit(v2, velocity2Unit))} ${velocity2Unit} (${format(v2)} m/s)`,
          `Time interval t = ${format(secToUnit(t, timeUnit))} ${timeUnit} (${format(t)} s)`,
          `Acceleration a = (v₂ - v₁) / t = ${format(a)} m/s²`,
          ...(isNaN(m) ? [] : [`Force required F = m·a = ${format(nToUnit(F, forceUnit))} ${forceUnit}`]),
          `Average velocity v_avg = ${format(msToUnit(vAvg, velocity1Unit))} ${velocity1Unit}`,
          `Distance traveled s = ${format(mToUnit(distance, distanceUnit))} ${distanceUnit}`,
          `Formula: a = Δv / t`
        ]
      });
      setCalculation('Calculated acceleration from velocity and time changes.');
      return;
    }

    if (method === 'net-force') {
      const f1Val = parseNumber(force);
      const f2Val = parseNumber(velocity1); // Reuse for second force
      const mVal = parsePositive(mass);

      if (isNaN(f1Val) || isNaN(f2Val) || isNaN(mVal)) {
        setCalculation('Please enter valid forces and mass values.');
        return;
      }

      const F1 = forceToN(f1Val, forceUnit);
      const F2 = forceToN(f2Val, velocity1Unit); // Use velocity1Unit as second force unit
      const m = massToKg(mVal, massUnit);

      // Net force (assuming opposite directions for this calculation)
      const netForce = F1 + F2;
      const acceleration = netForce / m;

      // Magnitude and direction
      const netForceMag = Math.abs(netForce);
      const netForceDir = netForce >= 0 ? 'in direction of F₁' : 'in direction of F₂';

      setResult({
        lines: [
          `Force F₁ = ${format(nToUnit(F1, forceUnit))} ${forceUnit} (${format(F1)} N)`,
          `Force F₂ = ${format(nToUnit(F2, velocity1Unit))} ${velocity1Unit} (${format(F2)} N)`,
          `Mass m = ${format(mVal)} ${massUnit} (${format(m)} kg)`,
          `Net force F_net = F₁ + F₂ = ${format(nToUnit(netForce, forceUnit))} ${forceUnit}`,
          `Net force magnitude = ${format(netForceMag)} N`,
          `Direction: ${netForceDir}`,
          `Acceleration a = F_net / m = ${format(acceleration)} m/s²`,
          `Formula: F_net = m·a → a = F_net / m`
        ]
      });
      setCalculation('Calculated acceleration from net force.');
      return;
    }

    if (method === 'kinematics') {
      const v1Val = parseNumber(velocity1);
      const v2Val = parseNumber(velocity2);
      const sVal = parseNumber(distance);

      if (isNaN(v1Val) || isNaN(v2Val) || isNaN(sVal)) {
        setCalculation('Please enter valid velocity and distance values.');
        return;
      }

      const v1 = velocityToMs(v1Val, velocity1Unit);
      const v2 = velocityToMs(v2Val, velocity2Unit);
      const s = distanceToM(sVal, distanceUnit);

      // Using v₂² = v₁² + 2·a·s → a = (v₂² - v₁²) / (2·s)
      if (s === 0) {
        setCalculation('Distance cannot be zero for kinematic calculation.');
        return;
      }

      const a = (v2 * v2 - v1 * v1) / (2 * s);

      // Time taken (using v₂ = v₁ + a·t)
      const tVal = a !== 0 ? (v2 - v1) / a : NaN;

      // Average velocity
      const vAvg = s / (isNaN(tVal) ? 1 : tVal);

      // Force needed (if mass provided)
      const mVal = parsePositive(mass);
      const m = isNaN(mVal) ? NaN : massToKg(mVal, massUnit);
      const F = !isNaN(m) ? m * a : NaN;

      setResult({
        lines: [
          `Initial velocity v₁ = ${format(msToUnit(v1, velocity1Unit))} ${velocity1Unit} (${format(v1)} m/s)`,
          `Final velocity v₂ = ${format(msToUnit(v2, velocity2Unit))} ${velocity2Unit} (${format(v2)} m/s)`,
          `Distance s = ${format(mToUnit(s, distanceUnit))} ${distanceUnit} (${format(s)} m)`,
          `Acceleration a = (v₂² - v₁²) / (2·s) = ${format(a)} m/s²`,
          ...(isNaN(tVal) ? [] : [`Time taken t = ${format(secToUnit(tVal, timeUnit))} ${timeUnit}`]),
          `Average velocity v_avg = ${format(msToUnit(vAvg, velocity1Unit))} ${velocity1Unit}`,
          ...(isNaN(m) ? [] : [`Force required F = m·a = ${format(nToUnit(F, forceUnit))} ${forceUnit}`]),
          `Formula: v₂² = v₁² + 2·a·s`
        ]
      });
      setCalculation('Calculated acceleration using kinematics equation.');
      return;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🎓</span>
          <h1 className="text-2xl font-bold text-gray-900">Acceleration Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate acceleration from force and mass using Newton's Second Law and kinematics.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select calculation method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'force-mass' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="force-mass" checked={method === 'force-mass'} onChange={() => setMethod('force-mass')} className="mr-2" />
              Force & mass
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'force-time' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="force-time" checked={method === 'force-time'} onChange={() => setMethod('force-time')} className="mr-2" />
              Velocity & time
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'net-force' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="net-force" checked={method === 'net-force'} onChange={() => setMethod('net-force')} className="mr-2" />
              Net force
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'kinematics' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="kinematics" checked={method === 'kinematics'} onChange={() => setMethod('kinematics')} className="mr-2" />
              Kinematics
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {(method === 'force-mass' || method === 'net-force') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label={method === 'net-force' ? 'Force 1' : 'Force'} 
                  value={force} 
                  onChange={(e) => setForce(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 50" 
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
          )}

          {method === 'net-force' && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Force 2" 
                  value={velocity1} 
                  onChange={(e) => setVelocity1(e.target.value)} 
                  type="number" 
                  placeholder="e.g., -30" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={velocity1Unit} onChange={(e) => setVelocity1Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="N">N</option>
                  <option value="kN">kN</option>
                  <option value="MN">MN</option>
                  <option value="dyn">dyn</option>
                  <option value="lbf">lbf</option>
                  <option value="kgf">kgf</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'force-mass' || method === 'force-time' || method === 'net-force' || method === 'kinematics') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Mass" 
                  value={mass} 
                  onChange={(e) => setMass(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 10" 
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

          {method === 'force-time' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Initial Velocity" 
                    value={velocity1} 
                    onChange={(e) => setVelocity1(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 0" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={velocity1Unit} onChange={(e) => setVelocity1Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
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
                    label="Final Velocity" 
                    value={velocity2} 
                    onChange={(e) => setVelocity2(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 20" 
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

              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Time Interval" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 5" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={timeUnit} onChange={(e) => setTimeUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="s">s</option>
                    <option value="ms">ms</option>
                    <option value="min">min</option>
                    <option value="h">h</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {method === 'kinematics' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Initial Velocity" 
                    value={velocity1} 
                    onChange={(e) => setVelocity1(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 0" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={velocity1Unit} onChange={(e) => setVelocity1Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
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
                    label="Final Velocity" 
                    value={velocity2} 
                    onChange={(e) => setVelocity2(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 20" 
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

              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Distance" 
                    value={distance} 
                    onChange={(e) => setDistance(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 100" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="m">m</option>
                    <option value="km">km</option>
                    <option value="cm">cm</option>
                    <option value="mm">mm</option>
                    <option value="mi">mi</option>
                    <option value="ft">ft</option>
                    <option value="in">in</option>
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
