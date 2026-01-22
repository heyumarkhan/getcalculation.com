'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'basic' | 'velocity' | 'acceleration' | 'revolutions';

type Result = {
  lines: string[];
};

export default function AngularDisplacementCalculator() {
  const [method, setMethod] = useState<Method>('basic');

  // Method 1: Basic - θ = ωt
  const [angularVelocity, setAngularVelocity] = useState('5');
  const [omegaUnit, setOmegaUnit] = useState('rad/s');
  const [time, setTime] = useState('4');
  const [timeUnit, setTimeUnit] = useState('s');

  // Method 2: With angular acceleration - θ = θ₀ + ω₀t + ½αt²
  const [initialAngle, setInitialAngle] = useState('0');
  const [initialVelocity, setInitialVelocity] = useState('2');
  const [angularAccel, setAngularAccel] = useState('3');
  const [accelUnit, setAccelUnit] = useState('rad/s²');
  const [time2, setTime2] = useState('5');

  // Method 3: From angular velocity change - θ = (ω² - ω₀²)/(2α)
  const [initialOmega, setInitialOmega] = useState('2');
  const [finalOmega, setFinalOmega] = useState('10');
  const [alpha, setAlpha] = useState('4');

  // Method 4: Revolutions and arc length
  const [revolutions, setRevolutions] = useState('5');
  const [radius, setRadius] = useState('0.5');
  const [radiusUnit, setRadiusUnit] = useState('m');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const format = (val: number, digits = 4) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1e6 || (Math.abs(val) < 0.001 && val !== 0)) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
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

  const accelToRadS2 = (val: number, unit: string) => {
    switch (unit) {
      case 'rad/s²': return val;
      case 'deg/s²': return val * (Math.PI / 180);
      case 'rpm/s': return val * (2 * Math.PI / 60);
      case 'rev/s²': return val * 2 * Math.PI;
      default: return val;
    }
  };

  const radS2ToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'rad/s²': return val;
      case 'deg/s²': return val / (Math.PI / 180);
      case 'rpm/s': return val / (2 * Math.PI / 60);
      case 'rev/s²': return val / (2 * Math.PI);
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

  const radiusToM = (val: number, unit: string) => {
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
      if (method === 'basic') {
        // θ = ωt (constant angular velocity)
        const omega = parseAny(angularVelocity);
        const t = parsePositive(time);

        if (isNaN(omega) || isNaN(t)) {
          setResult({ lines: ['Error: Please enter valid values for angular velocity and time.'] });
          setCalculation('');
          return;
        }

        const omegaRadS = omegaToRadS(omega, omegaUnit);
        const tS = timeToS(t, timeUnit);

        const theta = omegaRadS * tS;
        const thetaDeg = theta * (180 / Math.PI);
        const revs = theta / (2 * Math.PI);

        // Linear distance if radius is known (optional visualization)
        const exampleRadius = 1; // 1 meter for example
        const arcLength = Math.abs(theta) * exampleRadius;

        const lines = [
          `<strong>Angular Displacement:</strong> θ = ${format(theta)} rad (${format(thetaDeg)}°)`,
          ``,
          `<strong>Formula:</strong>`,
          `θ = ω × t (constant angular velocity)`,
          ``,
          `<strong>Given:</strong>`,
          `Angular Velocity: ω = ${format(omegaRadS)} rad/s`,
          `Time: t = ${format(tS)} s`,
          ``,
          `<strong>Calculation:</strong>`,
          `θ = ${format(omegaRadS)} × ${format(tS)}`,
          `θ = ${format(theta)} rad`,
          ``,
          `<strong>Conversions:</strong>`,
          `In degrees: θ = ${format(thetaDeg)}°`,
          `In revolutions: ${format(revs)} rev (${format(Math.abs(revs))} complete rotations)`,
          ``,
          `<strong>Additional Information:</strong>`,
          `Arc length (r=1m): s = rθ = ${format(arcLength)} m`,
          `Average angular velocity: ω_avg = ${format(omegaRadS)} rad/s (constant)`,
          `Direction: ${theta >= 0 ? 'Counterclockwise (positive)' : 'Clockwise (negative)'}`,
          ``,
          `<strong>Note:</strong> This assumes constant angular velocity (no acceleration).`
        ];

        setResult({ lines });
        setCalculation(`Angular Displacement: θ = ωt = ${format(omegaRadS)} × ${format(tS)} = ${format(theta)} rad`);

      } else if (method === 'velocity') {
        // θ = θ₀ + ω₀t + ½αt² (constant angular acceleration)
        const theta0 = parseAny(initialAngle);
        const omega0 = parseAny(initialVelocity);
        const alpha = parseAny(angularAccel);
        const t = parsePositive(time2);

        if (isNaN(theta0) || isNaN(omega0) || isNaN(alpha) || isNaN(t)) {
          setResult({ lines: ['Error: Please enter valid values for all inputs.'] });
          setCalculation('');
          return;
        }

        const theta0Rad = theta0 * (Math.PI / 180); // assuming initial angle in degrees
        const omega0RadS = omegaToRadS(omega0, omegaUnit);
        const alphaRadS2 = accelToRadS2(alpha, accelUnit);
        const tS = timeToS(t, timeUnit);

        const displacement = omega0RadS * tS + 0.5 * alphaRadS2 * tS * tS;
        const thetaFinal = theta0Rad + displacement;
        const omegaFinal = omega0RadS + alphaRadS2 * tS;

        const displacementDeg = displacement * (180 / Math.PI);
        const thetaFinalDeg = thetaFinal * (180 / Math.PI);
        const revs = displacement / (2 * Math.PI);

        // Average angular velocity
        const omegaAvg = (omega0RadS + omegaFinal) / 2;

        const lines = [
          `<strong>Angular Displacement:</strong> Δθ = ${format(displacement)} rad (${format(displacementDeg)}°)`,
          `<strong>Final Angle:</strong> θf = ${format(thetaFinal)} rad (${format(thetaFinalDeg)}°)`,
          ``,
          `<strong>Formula:</strong>`,
          `θ = θ₀ + ω₀t + ½αt² (constant angular acceleration)`,
          ``,
          `<strong>Given:</strong>`,
          `Initial Angle: θ₀ = ${format(theta0)}° = ${format(theta0Rad)} rad`,
          `Initial Angular Velocity: ω₀ = ${format(omega0RadS)} rad/s`,
          `Angular Acceleration: α = ${format(alphaRadS2)} rad/s²`,
          `Time: t = ${format(tS)} s`,
          ``,
          `<strong>Calculation:</strong>`,
          `Δθ = ω₀t + ½αt²`,
          `Δθ = (${format(omega0RadS)} × ${format(tS)}) + (½ × ${format(alphaRadS2)} × ${format(tS)}²)`,
          `Δθ = ${format(omega0RadS * tS)} + ${format(0.5 * alphaRadS2 * tS * tS)}`,
          `Δθ = ${format(displacement)} rad`,
          ``,
          `Final Position: θf = θ₀ + Δθ = ${format(theta0Rad)} + ${format(displacement)} = ${format(thetaFinal)} rad`,
          ``,
          `<strong>Motion Analysis:</strong>`,
          `Final Angular Velocity: ωf = ω₀ + αt = ${format(omegaFinal)} rad/s`,
          `Average Angular Velocity: ω_avg = (ω₀ + ωf)/2 = ${format(omegaAvg)} rad/s`,
          `Revolutions: ${format(revs)} rev`,
          `Motion Type: ${alphaRadS2 > 0 ? 'Speeding up (accelerating)' : alphaRadS2 < 0 ? 'Slowing down (decelerating)' : 'Constant velocity'}`,
          ``,
          `<strong>Verification:</strong> Δθ = ω_avg × t = ${format(omegaAvg)} × ${format(tS)} = ${format(omegaAvg * tS)} rad ✓`
        ];

        setResult({ lines });
        setCalculation(`Angular Displacement: Δθ = ${format(omega0RadS * tS)} + ${format(0.5 * alphaRadS2 * tS * tS)} = ${format(displacement)} rad`);

      } else if (method === 'acceleration') {
        // θ = (ω² - ω₀²)/(2α) (from kinematic equation ω² = ω₀² + 2αθ)
        const omega0 = parseAny(initialOmega);
        const omega = parseAny(finalOmega);
        const alphaVal = parseAny(alpha);

        if (isNaN(omega0) || isNaN(omega) || isNaN(alphaVal)) {
          setResult({ lines: ['Error: Please enter valid values for all inputs.'] });
          setCalculation('');
          return;
        }

        if (Math.abs(alphaVal) < 1e-10) {
          setResult({ lines: ['Error: Angular acceleration cannot be zero for this calculation.'] });
          setCalculation('');
          return;
        }

        const omega0RadS = omegaToRadS(omega0, omegaUnit);
        const omegaRadS = omegaToRadS(omega, omegaUnit);
        const alphaRadS2 = accelToRadS2(alphaVal, accelUnit);

        const theta = (omegaRadS * omegaRadS - omega0RadS * omega0RadS) / (2 * alphaRadS2);
        const thetaDeg = theta * (180 / Math.PI);
        const revs = theta / (2 * Math.PI);

        // Calculate time taken
        const timeElapsed = (omegaRadS - omega0RadS) / alphaRadS2;

        // Average velocity
        const omegaAvg = (omega0RadS + omegaRadS) / 2;

        const lines = [
          `<strong>Angular Displacement:</strong> θ = ${format(theta)} rad (${format(thetaDeg)}°)`,
          ``,
          `<strong>Formula:</strong>`,
          `θ = (ωf² - ω₀²) / (2α) [from ωf² = ω₀² + 2αθ]`,
          ``,
          `<strong>Given:</strong>`,
          `Initial Angular Velocity: ω₀ = ${format(omega0RadS)} rad/s`,
          `Final Angular Velocity: ωf = ${format(omegaRadS)} rad/s`,
          `Angular Acceleration: α = ${format(alphaRadS2)} rad/s²`,
          ``,
          `<strong>Calculation:</strong>`,
          `θ = (${format(omegaRadS)}² - ${format(omega0RadS)}²) / (2 × ${format(alphaRadS2)})`,
          `θ = (${format(omegaRadS * omegaRadS)} - ${format(omega0RadS * omega0RadS)}) / ${format(2 * alphaRadS2)}`,
          `θ = ${format(omegaRadS * omegaRadS - omega0RadS * omega0RadS)} / ${format(2 * alphaRadS2)}`,
          `θ = ${format(theta)} rad`,
          ``,
          `<strong>Additional Information:</strong>`,
          `In degrees: θ = ${format(thetaDeg)}°`,
          `In revolutions: ${format(revs)} rev`,
          `Time elapsed: t = (ωf - ω₀)/α = ${format(timeElapsed)} s`,
          `Average angular velocity: ω_avg = ${format(omegaAvg)} rad/s`,
          `Velocity change: Δω = ${format(omegaRadS - omega0RadS)} rad/s`,
          ``,
          `<strong>Motion Characteristics:</strong>`,
          `${alphaRadS2 > 0 ? 'Positive acceleration (speeding up)' : 'Negative acceleration (slowing down/braking)'}`,
          `${Math.sign(omegaRadS) !== Math.sign(omega0RadS) && omega0RadS !== 0 ? 'Direction reversal occurred' : ''}`,
          ``,
          `<strong>Verification:</strong> ωf² = ω₀² + 2αθ = ${format(omega0RadS * omega0RadS + 2 * alphaRadS2 * theta)} = ${format(omegaRadS * omegaRadS)} ✓`
        ];

        setResult({ lines });
        setCalculation(`Angular Displacement: θ = (ωf² - ω₀²)/(2α) = ${format(theta)} rad`);

      } else if (method === 'revolutions') {
        // Convert revolutions to angular displacement and calculate arc length
        const revs = parsePositive(revolutions);
        const r = parsePositive(radius);

        if (isNaN(revs) || isNaN(r)) {
          setResult({ lines: ['Error: Please enter valid positive values for revolutions and radius.'] });
          setCalculation('');
          return;
        }

        const rM = radiusToM(r, radiusUnit);

        const theta = revs * 2 * Math.PI;
        const thetaDeg = theta * (180 / Math.PI);
        const arcLength = theta * rM;

        // Circumference
        const circumference = 2 * Math.PI * rM;

        // If we know example angular velocity, calculate time
        const exampleOmega = 10; // rad/s
        const exampleTime = theta / exampleOmega;

        const lines = [
          `<strong>Angular Displacement:</strong> θ = ${format(theta)} rad (${format(thetaDeg)}°)`,
          `<strong>Arc Length:</strong> s = ${format(arcLength)} m`,
          ``,
          `<strong>Formula:</strong>`,
          `θ = n × 2π (where n = number of revolutions)`,
          `s = rθ (arc length)`,
          ``,
          `<strong>Given:</strong>`,
          `Number of Revolutions: n = ${format(revs)} rev`,
          `Radius: r = ${format(rM)} m`,
          ``,
          `<strong>Calculation:</strong>`,
          `θ = ${format(revs)} × 2π = ${format(revs)} × ${format(2 * Math.PI)}`,
          `θ = ${format(theta)} rad`,
          ``,
          `Arc Length: s = r × θ = ${format(rM)} × ${format(theta)}`,
          `s = ${format(arcLength)} m (${format(mToUnit(arcLength, radiusUnit))} ${radiusUnit})`,
          ``,
          `<strong>Circle Properties:</strong>`,
          `Circumference: C = 2πr = ${format(circumference)} m`,
          `One revolution = ${format(circumference)} m of arc length`,
          `Verification: ${format(revs)} revolutions = ${format(revs * circumference)} m ✓`,
          ``,
          `<strong>Conversions:</strong>`,
          `In degrees: θ = ${format(thetaDeg)}°`,
          `In radians: θ = ${format(theta)} rad`,
          `In rotations: ${format(revs)} complete rotations`,
          ``,
          `<strong>Example Time Calculation:</strong>`,
          `If angular velocity ω = ${exampleOmega} rad/s:`,
          `Time required: t = θ/ω = ${format(theta)}/${exampleOmega} = ${format(exampleTime)} s`
        ];

        setResult({ lines });
        setCalculation(`Angular Displacement: θ = ${format(revs)} × 2π = ${format(theta)} rad, Arc Length: s = ${format(arcLength)} m`);
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
          <span className="text-2xl">🔁</span>
          <h1 className="text-2xl font-bold text-gray-900">Angular Displacement Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate angular displacement, rotational motion, and arc length for rotating objects and circular motion.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select calculation method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'basic' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="basic" checked={method === 'basic'} onChange={() => setMethod('basic')} className="mr-2" />
              Basic (θ = ωt)
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'velocity' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="velocity" checked={method === 'velocity'} onChange={() => setMethod('velocity')} className="mr-2" />
              With Acceleration (θ = ω₀t + ½αt²)
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'acceleration' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="acceleration" checked={method === 'acceleration'} onChange={() => setMethod('acceleration')} className="mr-2" />
              From Velocity Change
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'revolutions' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="revolutions" checked={method === 'revolutions'} onChange={() => setMethod('revolutions')} className="mr-2" />
              Revolutions & Arc Length
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {method === 'basic' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Angular Velocity (ω)" 
                    value={angularVelocity} 
                    onChange={(e) => setAngularVelocity(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 5" 
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
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Time (t)" 
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
            </>
          )}

          {method === 'velocity' && (
            <>
              <Input 
                label="Initial Angle (θ₀) in degrees" 
                value={initialAngle} 
                onChange={(e) => setInitialAngle(e.target.value)} 
                type="number" 
                placeholder="e.g., 0" 
              />
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Initial Angular Velocity (ω₀)" 
                    value={initialVelocity} 
                    onChange={(e) => setInitialVelocity(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 2" 
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
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Angular Acceleration (α)" 
                    value={angularAccel} 
                    onChange={(e) => setAngularAccel(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 3" 
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={accelUnit} onChange={(e) => setAccelUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="rad/s²">rad/s²</option>
                    <option value="deg/s²">deg/s²</option>
                    <option value="rpm/s">rpm/s</option>
                    <option value="rev/s²">rev/s²</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Time (t)" 
                    value={time2} 
                    onChange={(e) => setTime2(e.target.value)} 
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

          {method === 'acceleration' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Initial Angular Velocity (ω₀)" 
                    value={initialOmega} 
                    onChange={(e) => setInitialOmega(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 2" 
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
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Final Angular Velocity (ωf)" 
                    value={finalOmega} 
                    onChange={(e) => setFinalOmega(e.target.value)} 
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
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Angular Acceleration (α)" 
                    value={alpha} 
                    onChange={(e) => setAlpha(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 4" 
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={accelUnit} onChange={(e) => setAccelUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="rad/s²">rad/s²</option>
                    <option value="deg/s²">deg/s²</option>
                    <option value="rpm/s">rpm/s</option>
                    <option value="rev/s²">rev/s²</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {method === 'revolutions' && (
            <>
              <Input 
                label="Number of Revolutions" 
                value={revolutions} 
                onChange={(e) => setRevolutions(e.target.value)} 
                type="number" 
                placeholder="e.g., 5" 
              />
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Radius (r)" 
                    value={radius} 
                    onChange={(e) => setRadius(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 0.5" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={radiusUnit} onChange={(e) => setRadiusUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="m">m</option>
                    <option value="cm">cm</option>
                    <option value="mm">mm</option>
                    <option value="km">km</option>
                    <option value="ft">ft</option>
                    <option value="in">in</option>
                  </select>
                </div>
              </div>
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
