'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'rotational' | 'linear' | 'conservation' | 'torque';

type Result = {
  lines: string[];
};

export default function AngularMomentumCalculator() {
  const [method, setMethod] = useState<Method>('rotational');

  // Method 1: Rotational - L = Iω
  const [momentInertia, setMomentInertia] = useState('2');
  const [inertiaUnit, setInertiaUnit] = useState('kg·m²');
  const [angularVelocity, setAngularVelocity] = useState('10');
  const [omegaUnit, setOmegaUnit] = useState('rad/s');

  // Method 2: Linear particle - L = mvr
  const [mass, setMass] = useState('5');
  const [massUnit, setMassUnit] = useState('kg');
  const [velocity, setVelocity] = useState('20');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [radius, setRadius] = useState('3');
  const [radiusUnit, setRadiusUnit] = useState('m');

  // Method 3: Conservation
  const [L1, setL1] = useState('100');
  const [I1, setI1] = useState('10');
  const [I2, setI2] = useState('5');
  const [momentumUnit, setMomentumUnit] = useState('kg·m²/s');

  // Method 4: Torque and time
  const [torque, setTorque] = useState('15');
  const [torqueUnit, setTorqueUnit] = useState('N·m');
  const [time, setTime] = useState('4');
  const [timeUnit, setTimeUnit] = useState('s');
  const [initialL, setInitialL] = useState('50');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const format = (val: number, digits = 4) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1e6 || (Math.abs(val) < 0.001 && val !== 0)) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  const inertiaToKgM2 = (val: number, unit: string) => {
    switch (unit) {
      case 'kg·m²': return val;
      case 'g·cm²': return val * 1e-7;
      case 'lb·ft²': return val * 0.04214011;
      default: return val;
    }
  };

  const kgM2ToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'kg·m²': return val;
      case 'g·cm²': return val / 1e-7;
      case 'lb·ft²': return val / 0.04214011;
      default: return val;
    }
  };

  const omegaToRadS = (val: number, unit: string) => {
    switch (unit) {
      case 'rad/s': return val;
      case 'deg/s': return val * (Math.PI / 180);
      case 'rpm': return val * (2 * Math.PI / 60);
      case 'rev/s': return val * 2 * Math.PI;
      default: return val;
    }
  };

  const radSToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'rad/s': return val;
      case 'deg/s': return val / (Math.PI / 180);
      case 'rpm': return val / (2 * Math.PI / 60);
      case 'rev/s': return val / (2 * Math.PI);
      default: return val;
    }
  };

  const massToKg = (val: number, unit: string) => {
    switch (unit) {
      case 'kg': return val;
      case 'g': return val / 1000;
      case 'lb': return val * 0.453592;
      case 'oz': return val * 0.0283495;
      default: return val;
    }
  };

  const kgToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'kg': return val;
      case 'g': return val * 1000;
      case 'lb': return val / 0.453592;
      case 'oz': return val / 0.0283495;
      default: return val;
    }
  };

  const velocityToMs = (val: number, unit: string) => {
    switch (unit) {
      case 'm/s': return val;
      case 'km/h': return val / 3.6;
      case 'mph': return val * 0.44704;
      case 'ft/s': return val * 0.3048;
      default: return val;
    }
  };

  const msToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'm/s': return val;
      case 'km/h': return val * 3.6;
      case 'mph': return val / 0.44704;
      case 'ft/s': return val / 0.3048;
      default: return val;
    }
  };

  const radiusToM = (val: number, unit: string) => {
    switch (unit) {
      case 'm': return val;
      case 'cm': return val / 100;
      case 'mm': return val / 1000;
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
      case 'ft': return val / 0.3048;
      case 'in': return val / 0.0254;
      default: return val;
    }
  };

  const torqueToNm = (val: number, unit: string) => {
    switch (unit) {
      case 'N·m': return val;
      case 'lb·ft': return val * 1.35582;
      case 'dyne·cm': return val * 1e-7;
      default: return val;
    }
  };

  const nmToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'N·m': return val;
      case 'lb·ft': return val / 1.35582;
      case 'dyne·cm': return val / 1e-7;
      default: return val;
    }
  };

  const timeToS = (val: number, unit: string) => {
    switch (unit) {
      case 's': return val;
      case 'ms': return val / 1000;
      case 'min': return val * 60;
      case 'h': return val * 3600;
      default: return val;
    }
  };

  const sToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 's': return val;
      case 'ms': return val * 1000;
      case 'min': return val / 60;
      case 'h': return val / 3600;
      default: return val;
    }
  };

  const parsePositive = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const parseAny = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) ? NaN : num;
  };

  const handleCalculate = () => {
    try {
      if (method === 'rotational') {
        // L = Iω
        const I = parsePositive(momentInertia);
        const omega = parseAny(angularVelocity);

        if (isNaN(I) || isNaN(omega)) {
          setResult({ lines: ['Error: Please enter valid values for moment of inertia and angular velocity.'] });
          setCalculation('');
          return;
        }

        const IKgM2 = inertiaToKgM2(I, inertiaUnit);
        const omegaRadS = omegaToRadS(omega, omegaUnit);

        const L = IKgM2 * omegaRadS;

        // Calculate rotational kinetic energy
        const KE = 0.5 * IKgM2 * omegaRadS * omegaRadS;

        // Angular frequency
        const f = Math.abs(omegaRadS) / (2 * Math.PI);
        const period = f > 0 ? 1 / f : Infinity;

        const lines = [
          `<strong>Angular Momentum:</strong> L = ${format(L)} kg·m²/s`,
          ``,
          `<strong>Formula:</strong>`,
          `L = I × ω`,
          ``,
          `<strong>Given:</strong>`,
          `Moment of Inertia: I = ${format(IKgM2)} kg·m²`,
          `Angular Velocity: ω = ${format(omegaRadS)} rad/s`,
          ``,
          `<strong>Calculation:</strong>`,
          `L = ${format(IKgM2)} × ${format(omegaRadS)}`,
          `L = ${format(L)} kg·m²/s`,
          ``,
          `<strong>Additional Information:</strong>`,
          `Rotational Kinetic Energy: KE = ½Iω² = ${format(KE)} J`,
          `Rotation Frequency: f = ${format(f)} Hz`,
          `Period: T = ${isFinite(period) ? format(period) + ' s' : 'N/A'}`,
          `Direction: ${omegaRadS >= 0 ? 'Counterclockwise (positive)' : 'Clockwise (negative)'}`
        ];

        setResult({ lines });
        setCalculation(`Angular Momentum: L = Iω = ${format(IKgM2)} × ${format(omegaRadS)} = ${format(L)} kg·m²/s`);

      } else if (method === 'linear') {
        // L = mvr (for point mass or particle)
        const m = parsePositive(mass);
        const v = parseAny(velocity);
        const r = parsePositive(radius);

        if (isNaN(m) || isNaN(v) || isNaN(r)) {
          setResult({ lines: ['Error: Please enter valid values for mass, velocity, and radius.'] });
          setCalculation('');
          return;
        }

        const mKg = massToKg(m, massUnit);
        const vMs = velocityToMs(v, velocityUnit);
        const rM = radiusToM(r, radiusUnit);

        const L = mKg * vMs * rM;
        
        // Linear momentum
        const p = mKg * vMs;
        
        // Kinetic energy
        const KE = 0.5 * mKg * vMs * vMs;

        // Angular velocity
        const omega = vMs / rM;

        // Equivalent moment of inertia
        const I = mKg * rM * rM;

        const lines = [
          `<strong>Angular Momentum:</strong> L = ${format(L)} kg·m²/s`,
          ``,
          `<strong>Formula:</strong>`,
          `L = m × v × r = r × p`,
          ``,
          `<strong>Given:</strong>`,
          `Mass: m = ${format(mKg)} kg`,
          `Velocity: v = ${format(vMs)} m/s`,
          `Radius: r = ${format(rM)} m`,
          ``,
          `<strong>Calculation:</strong>`,
          `L = ${format(mKg)} × ${format(vMs)} × ${format(rM)}`,
          `L = ${format(L)} kg·m²/s`,
          ``,
          `<strong>Related Quantities:</strong>`,
          `Linear Momentum: p = mv = ${format(p)} kg·m/s`,
          `Angular Velocity: ω = v/r = ${format(omega)} rad/s`,
          `Equivalent Moment of Inertia: I = mr² = ${format(I)} kg·m²`,
          `Kinetic Energy: KE = ½mv² = ${format(KE)} J`,
          ``,
          `<strong>Verification:</strong> L = Iω = ${format(I)} × ${format(omega)} = ${format(I * omega)} kg·m²/s ✓`
        ];

        setResult({ lines });
        setCalculation(`Angular Momentum: L = mvr = ${format(mKg)} × ${format(vMs)} × ${format(rM)} = ${format(L)} kg·m²/s`);

      } else if (method === 'conservation') {
        // Conservation: L₁ = L₂, so I₁ω₁ = I₂ω₂
        const L1Val = parseAny(L1);
        const I1Val = parsePositive(I1);
        const I2Val = parsePositive(I2);

        if (isNaN(L1Val) || isNaN(I1Val) || isNaN(I2Val)) {
          setResult({ lines: ['Error: Please enter valid values.'] });
          setCalculation('');
          return;
        }

        const I1KgM2 = inertiaToKgM2(I1Val, inertiaUnit);
        const I2KgM2 = inertiaToKgM2(I2Val, inertiaUnit);

        // From L = Iω, we get ω = L/I
        const omega1 = L1Val / I1KgM2;
        const omega2 = L1Val / I2KgM2;

        const omegaChange = omega2 - omega1;
        const omegaRatio = omega2 / omega1;

        // Kinetic energies
        const KE1 = 0.5 * I1KgM2 * omega1 * omega1;
        const KE2 = 0.5 * I2KgM2 * omega2 * omega2;
        const KEChange = KE2 - KE1;

        const lines = [
          `<strong>Conservation of Angular Momentum</strong>`,
          `L₁ = L₂ = ${format(L1Val)} kg·m²/s (conserved)`,
          ``,
          `<strong>Initial State:</strong>`,
          `I₁ = ${format(I1KgM2)} kg·m²`,
          `ω₁ = L/I₁ = ${format(L1Val)}/${format(I1KgM2)} = ${format(omega1)} rad/s`,
          `KE₁ = ½I₁ω₁² = ${format(KE1)} J`,
          ``,
          `<strong>Final State:</strong>`,
          `I₂ = ${format(I2KgM2)} kg·m²`,
          `ω₂ = L/I₂ = ${format(L1Val)}/${format(I2KgM2)} = ${format(omega2)} rad/s`,
          `KE₂ = ½I₂ω₂² = ${format(KE2)} J`,
          ``,
          `<strong>Changes:</strong>`,
          `Δω = ω₂ - ω₁ = ${format(omegaChange)} rad/s`,
          `ω₂/ω₁ = ${format(omegaRatio)} (${omegaRatio > 1 ? 'speed increased' : 'speed decreased'})`,
          `ΔKE = ${format(KEChange)} J ${KEChange > 0 ? '(energy added - work done)' : '(energy released)'}`,
          ``,
          `<strong>Physical Interpretation:</strong>`,
          `${I2KgM2 < I1KgM2 ? 'Moment of inertia decreased → angular velocity increased (e.g., ice skater pulls arms in)' : 'Moment of inertia increased → angular velocity decreased (e.g., ice skater extends arms)'}`,
          `Angular momentum remains constant: L = ${format(L1Val)} kg·m²/s`
        ];

        setResult({ lines });
        setCalculation(`Conservation: L = ${format(L1Val)} kg·m²/s, ω₁ = ${format(omega1)} rad/s, ω₂ = ${format(omega2)} rad/s`);

      } else if (method === 'torque') {
        // τ = dL/dt, so ΔL = τ × Δt
        const tau = parseAny(torque);
        const t = parsePositive(time);
        const L0 = parseAny(initialL);

        if (isNaN(tau) || isNaN(t) || isNaN(L0)) {
          setResult({ lines: ['Error: Please enter valid values for torque, time, and initial angular momentum.'] });
          setCalculation('');
          return;
        }

        const tauNm = torqueToNm(tau, torqueUnit);
        const tS = timeToS(t, timeUnit);

        const deltaL = tauNm * tS;
        const Lfinal = L0 + deltaL;

        // Average angular impulse
        const angularImpulse = deltaL;

        // Work done (assuming constant torque and constant angular velocity - approximation)
        // W = τ × θ, where θ = ω_avg × t

        const lines = [
          `<strong>Change in Angular Momentum:</strong>`,
          `ΔL = ${format(deltaL)} kg·m²/s`,
          ``,
          `<strong>Formula:</strong>`,
          `ΔL = τ × Δt (Angular Impulse)`,
          ``,
          `<strong>Given:</strong>`,
          `Torque: τ = ${format(tauNm)} N·m`,
          `Time: Δt = ${format(tS)} s`,
          `Initial Angular Momentum: L₀ = ${format(L0)} kg·m²/s`,
          ``,
          `<strong>Calculation:</strong>`,
          `ΔL = ${format(tauNm)} × ${format(tS)} = ${format(deltaL)} kg·m²/s`,
          ``,
          `<strong>Results:</strong>`,
          `Initial: L₀ = ${format(L0)} kg·m²/s`,
          `Change: ΔL = ${format(deltaL)} kg·m²/s`,
          `Final: Lf = L₀ + ΔL = ${format(Lfinal)} kg·m²/s`,
          ``,
          `<strong>Angular Impulse:</strong>`,
          `J_angular = τ × Δt = ${format(angularImpulse)} kg·m²/s`,
          ``,
          `<strong>Interpretation:</strong>`,
          `${tau > 0 ? 'Positive torque increases angular momentum' : tau < 0 ? 'Negative torque (braking) decreases angular momentum' : 'No torque - angular momentum constant'}`,
          `Average rate of change: dL/dt ≈ ${format(deltaL / tS)} kg·m²/s² = ${format(tauNm)} N·m ✓`
        ];

        setResult({ lines });
        setCalculation(`Change in Angular Momentum: ΔL = τΔt = ${format(tauNm)} × ${format(tS)} = ${format(deltaL)} kg·m²/s`);
      }

    } catch (error) {
      setResult({ lines: ['Error: Calculation failed. Please check your inputs.'] });
      setCalculation('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🔃</span>
          <h1 className="text-2xl font-bold text-gray-900">Angular Momentum Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate angular momentum for rotating objects, particles in circular motion, conservation problems, and torque effects.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select calculation method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'rotational' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="rotational" checked={method === 'rotational'} onChange={() => setMethod('rotational')} className="mr-2" />
              Rotational (L = Iω)
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'linear' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="linear" checked={method === 'linear'} onChange={() => setMethod('linear')} className="mr-2" />
              Linear Particle (L = mvr)
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'conservation' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="conservation" checked={method === 'conservation'} onChange={() => setMethod('conservation')} className="mr-2" />
              Conservation of L
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'torque' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="torque" checked={method === 'torque'} onChange={() => setMethod('torque')} className="mr-2" />
              Torque & Change (τ = dL/dt)
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {method === 'rotational' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Moment of Inertia (I)" 
                    value={momentInertia} 
                    onChange={(e) => setMomentInertia(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 2" 
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={inertiaUnit} onChange={(e) => setInertiaUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="kg·m²">kg·m²</option>
                    <option value="g·cm²">g·cm²</option>
                    <option value="lb·ft²">lb·ft²</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Angular Velocity (ω)" 
                    value={angularVelocity} 
                    onChange={(e) => setAngularVelocity(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 10" 
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={omegaUnit} onChange={(e) => setOmegaUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="rad/s">rad/s</option>
                    <option value="deg/s">deg/s</option>
                    <option value="rpm">rpm</option>
                    <option value="rev/s">rev/s</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {method === 'linear' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Mass (m)" 
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
                    <option value="lb">lb</option>
                    <option value="oz">oz</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Velocity (v)" 
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
                    <option value="mph">mph</option>
                    <option value="ft/s">ft/s</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Radius (r)" 
                    value={radius} 
                    onChange={(e) => setRadius(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 3" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={radiusUnit} onChange={(e) => setRadiusUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="m">m</option>
                    <option value="cm">cm</option>
                    <option value="mm">mm</option>
                    <option value="ft">ft</option>
                    <option value="in">in</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {method === 'conservation' && (
            <>
              <Input 
                label="Angular Momentum (L)" 
                value={L1} 
                onChange={(e) => setL1(e.target.value)} 
                type="number" 
                placeholder="e.g., 100" 
              />
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Initial Moment of Inertia (I₁)" 
                    value={I1} 
                    onChange={(e) => setI1(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 10" 
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={inertiaUnit} onChange={(e) => setInertiaUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="kg·m²">kg·m²</option>
                    <option value="g·cm²">g·cm²</option>
                    <option value="lb·ft²">lb·ft²</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Final Moment of Inertia (I₂)" 
                    value={I2} 
                    onChange={(e) => setI2(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 5" 
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={inertiaUnit} onChange={(e) => setInertiaUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="kg·m²">kg·m²</option>
                    <option value="g·cm²">g·cm²</option>
                    <option value="lb·ft²">lb·ft²</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {method === 'torque' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Torque (τ)" 
                    value={torque} 
                    onChange={(e) => setTorque(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 15" 
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={torqueUnit} onChange={(e) => setTorqueUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="N·m">N·m</option>
                    <option value="lb·ft">lb·ft</option>
                    <option value="dyne·cm">dyne·cm</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Time Duration (Δt)" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 4" 
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
              <Input 
                label="Initial Angular Momentum (L₀)" 
                value={initialL} 
                onChange={(e) => setInitialL(e.target.value)} 
                type="number" 
                placeholder="e.g., 50" 
              />
            </>
          )}
        </div>

        <Button onClick={handleCalculate} className="w-full bg-[#820ECC] text-white font-semibold py-3 rounded-lg hover:bg-[#6b0aa6] transition mt-6">
          Calculate
        </Button>

        {result && (
          <div className="bg-[#820ECC]/10 border-l-4 border-[#820ECC] p-4 rounded mt-6">
            {calculation && <p className="text-gray-600 text-sm mb-2">{calculation}</p>}
            <div className="space-y-1 text-sm text-gray-800">
              {result.lines.map((line, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: line }} />
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
