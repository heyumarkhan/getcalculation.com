'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'range-height-time' | 'initial-velocity' | 'angle' | 'landing-velocity';

type Result = {
  lines: string[];
};

export default function TrajectoryCalculator() {
  const [method, setMethod] = useState<Method>('range-height-time');

  const [initialVelocity, setInitialVelocity] = useState('20');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [angle, setAngle] = useState('45');
  const [gravity, setGravity] = useState('9.81');
  const [initialHeight, setInitialHeight] = useState('0');
  const [heightUnit, setHeightUnit] = useState('m');
  
  const [range, setRange] = useState('40.77');
  const [maxHeight, setMaxHeight] = useState('10.19');
  const [timeOfFlight, setTimeOfFlight] = useState('2.89');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const format = (val: number, digits = 4) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1e6 || (Math.abs(val) < 0.001 && val !== 0)) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
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

  const distanceToMeters = (val: number, unit: string) => {
    switch (unit) {
      case 'm': return val;
      case 'km': return val * 1000;
      case 'ft': return val * 0.3048;
      case 'mi': return val * 1609.34;
      default: return val;
    }
  };

  const metersToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'm': return val;
      case 'km': return val / 1000;
      case 'ft': return val / 0.3048;
      case 'mi': return val / 1609.34;
      default: return val;
    }
  };

  const parsePositive = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const parseNonNegative = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num < 0 ? NaN : num;
  };

  const parseAngle = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num < 0 || num > 90 ? NaN : num;
  };

  const handleCalculate = () => {
    setResult(null);
    setCalculation('');

    if (method === 'range-height-time') {
      const v0Val = parsePositive(initialVelocity);
      const thetaVal = parseAngle(angle);
      const gVal = parsePositive(gravity);
      const h0Val = parseNonNegative(initialHeight);

      if (isNaN(v0Val) || isNaN(thetaVal) || isNaN(gVal) || isNaN(h0Val)) {
        setCalculation('Please enter valid initial velocity, angle (0-90°), gravity, and initial height.');
        return;
      }

      const v0 = velocityToMs(v0Val, velocityUnit);
      const theta = (thetaVal * Math.PI) / 180; // Convert to radians
      const g = gVal;
      const h0 = distanceToMeters(h0Val, heightUnit);

      const v0x = v0 * Math.cos(theta); // Horizontal component
      const v0y = v0 * Math.sin(theta); // Vertical component

      // Time of flight: solve h = h0 + v0y*t - 0.5*g*t^2 = 0
      // Using quadratic formula: t = (v0y + sqrt(v0y^2 + 2*g*h0)) / g
      const discriminant = v0y * v0y + 2 * g * h0;
      const timeOfFlight = (v0y + Math.sqrt(discriminant)) / g;

      // Range: R = v0x * t
      const rangeM = v0x * timeOfFlight;

      // Max height: H = h0 + v0y^2 / (2*g)
      const maxHeightM = h0 + (v0y * v0y) / (2 * g);

      setResult({
        lines: [
          `Initial velocity v₀ = ${format(msToUnit(v0, velocityUnit))} ${velocityUnit} (${format(v0)} m/s)`,
          `Launch angle θ = ${format(thetaVal)}°`,
          `Initial height h₀ = ${format(metersToUnit(h0, heightUnit))} ${heightUnit}`,
          `Range R = ${format(metersToUnit(rangeM, heightUnit))} ${heightUnit} (${format(rangeM)} m)`,
          `Maximum height H = ${format(metersToUnit(maxHeightM, heightUnit))} ${heightUnit} (${format(maxHeightM)} m)`,
          `Time of flight t = ${format(timeOfFlight)} s`,
          `Horizontal velocity vₓ = ${format(msToUnit(v0x, velocityUnit))} ${velocityUnit} (constant)`,
          `Initial vertical velocity vᵧ = ${format(msToUnit(v0y, velocityUnit))} ${velocityUnit}`
        ]
      });
      setCalculation('Computed projectile trajectory parameters.');
      return;
    }

    if (method === 'initial-velocity') {
      const rangeVal = parsePositive(range);
      const thetaVal = parseAngle(angle);
      const gVal = parsePositive(gravity);
      const h0Val = parseNonNegative(initialHeight);

      if (isNaN(rangeVal) || isNaN(thetaVal) || isNaN(gVal) || isNaN(h0Val)) {
        setCalculation('Please enter valid range, angle (0-90°), gravity, and initial height.');
        return;
      }

      const R = distanceToMeters(rangeVal, heightUnit);
      const theta = (thetaVal * Math.PI) / 180;
      const g = gVal;
      const h0 = distanceToMeters(h0Val, heightUnit);

      // For flat ground (h0 = 0): v0 = sqrt(R*g / sin(2*theta))
      // For elevated launch, this is approximate
      const sin2theta = Math.sin(2 * theta);
      
      if (h0 === 0) {
        const v0 = Math.sqrt((R * g) / sin2theta);
        const v0_out = msToUnit(v0, velocityUnit);

        setResult({
          lines: [
            `Range R = ${format(metersToUnit(R, heightUnit))} ${heightUnit} (${format(R)} m)`,
            `Launch angle θ = ${format(thetaVal)}°`,
            `Required initial velocity v₀ = ${format(v0_out)} ${velocityUnit} (${format(v0)} m/s)`,
            `Formula: v₀ = √(R·g / sin(2θ)) (flat ground)`,
            `This assumes launch and landing at same height.`
          ]
        });
        setCalculation('Computed initial velocity for flat ground trajectory.');
      } else {
        // Approximate solution for elevated launch
        const v0_approx = Math.sqrt((R * g) / sin2theta);
        const v0_out = msToUnit(v0_approx, velocityUnit);

        setResult({
          lines: [
            `Range R = ${format(metersToUnit(R, heightUnit))} ${heightUnit} (${format(R)} m)`,
            `Launch angle θ = ${format(thetaVal)}°`,
            `Initial height h₀ = ${format(metersToUnit(h0, heightUnit))} ${heightUnit}`,
            `Approximate initial velocity v₀ ≈ ${format(v0_out)} ${velocityUnit} (${format(v0_approx)} m/s)`,
            `Note: This is an approximation. Exact solution requires solving quartic equation.`
          ]
        });
        setCalculation('Computed approximate initial velocity for elevated launch.');
      }
      return;
    }

    if (method === 'angle') {
      const v0Val = parsePositive(initialVelocity);
      const rangeVal = parsePositive(range);
      const gVal = parsePositive(gravity);
      const h0Val = parseNonNegative(initialHeight);

      if (isNaN(v0Val) || isNaN(rangeVal) || isNaN(gVal) || isNaN(h0Val)) {
        setCalculation('Please enter valid initial velocity, range, gravity, and initial height.');
        return;
      }

      const v0 = velocityToMs(v0Val, velocityUnit);
      const R = distanceToMeters(rangeVal, heightUnit);
      const g = gVal;
      const h0 = distanceToMeters(h0Val, heightUnit);

      if (h0 === 0) {
        // sin(2*theta) = R*g / v0^2
        const sin2theta = (R * g) / (v0 * v0);
        
        if (Math.abs(sin2theta) > 1) {
          setCalculation('No solution: Range too large for given velocity. Increase initial velocity or decrease range.');
          return;
        }

        const angle2theta = Math.asin(sin2theta);
        const theta1 = angle2theta / 2; // Low angle
        const theta2 = (Math.PI - angle2theta) / 2; // High angle

        const theta1_deg = (theta1 * 180) / Math.PI;
        const theta2_deg = (theta2 * 180) / Math.PI;

        setResult({
          lines: [
            `Initial velocity v₀ = ${format(msToUnit(v0, velocityUnit))} ${velocityUnit} (${format(v0)} m/s)`,
            `Range R = ${format(metersToUnit(R, heightUnit))} ${heightUnit} (${format(R)} m)`,
            `Two possible angles:`,
            `Low trajectory: θ₁ = ${format(theta1_deg)}°`,
            `High trajectory: θ₂ = ${format(theta2_deg)}°`,
            `Both angles achieve the same range at different flight times.`
          ]
        });
        setCalculation('Computed launch angles for flat ground trajectory.');
      } else {
        setCalculation('Angle calculation for elevated launch requires numerical methods. Set initial height to 0 for analytical solution.');
      }
      return;
    }

    if (method === 'landing-velocity') {
      const v0Val = parsePositive(initialVelocity);
      const thetaVal = parseAngle(angle);
      const gVal = parsePositive(gravity);
      const h0Val = parseNonNegative(initialHeight);

      if (isNaN(v0Val) || isNaN(thetaVal) || isNaN(gVal) || isNaN(h0Val)) {
        setCalculation('Please enter valid initial velocity, angle (0-90°), gravity, and initial height.');
        return;
      }

      const v0 = velocityToMs(v0Val, velocityUnit);
      const theta = (thetaVal * Math.PI) / 180;
      const g = gVal;
      const h0 = distanceToMeters(h0Val, heightUnit);

      const v0x = v0 * Math.cos(theta);
      const v0y = v0 * Math.sin(theta);

      // Time of flight
      const discriminant = v0y * v0y + 2 * g * h0;
      const timeOfFlight = (v0y + Math.sqrt(discriminant)) / g;

      // Landing velocity components
      const vx = v0x; // Horizontal velocity remains constant
      const vy = v0y - g * timeOfFlight; // Vertical velocity at landing

      // Total landing velocity
      const vf = Math.sqrt(vx * vx + vy * vy);
      const vf_out = msToUnit(vf, velocityUnit);

      // Landing angle (below horizontal)
      const landingAngle = Math.atan(Math.abs(vy) / vx) * (180 / Math.PI);

      setResult({
        lines: [
          `Initial velocity v₀ = ${format(msToUnit(v0, velocityUnit))} ${velocityUnit} (${format(v0)} m/s)`,
          `Launch angle θ = ${format(thetaVal)}°`,
          `Initial height h₀ = ${format(metersToUnit(h0, heightUnit))} ${heightUnit}`,
          `Landing velocity v_f = ${format(vf_out)} ${velocityUnit} (${format(vf)} m/s)`,
          `Horizontal component vₓ = ${format(msToUnit(vx, velocityUnit))} ${velocityUnit}`,
          `Vertical component vᵧ = ${format(msToUnit(Math.abs(vy), velocityUnit))} ${velocityUnit} (downward)`,
          `Landing angle = ${format(landingAngle)}° (below horizontal)`,
          `Time of flight t = ${format(timeOfFlight)} s`
        ]
      });
      setCalculation('Computed landing velocity and impact angle.');
      return;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🎢</span>
          <h1 className="text-2xl font-bold text-gray-900">Trajectory Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate projectile motion trajectory including range, maximum height, time of flight, and landing velocity.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select calculation method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'range-height-time' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="range-height-time" checked={method === 'range-height-time'} onChange={() => setMethod('range-height-time')} className="mr-2" />
              Range, height, time
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'initial-velocity' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="initial-velocity" checked={method === 'initial-velocity'} onChange={() => setMethod('initial-velocity')} className="mr-2" />
              Find initial velocity
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'angle' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="angle" checked={method === 'angle'} onChange={() => setMethod('angle')} className="mr-2" />
              Find launch angle
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'landing-velocity' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="landing-velocity" checked={method === 'landing-velocity'} onChange={() => setMethod('landing-velocity')} className="mr-2" />
              Landing velocity
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {(method === 'range-height-time' || method === 'angle' || method === 'landing-velocity') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Initial Velocity v₀" 
                  value={initialVelocity} 
                  onChange={(e) => setInitialVelocity(e.target.value)} 
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
          )}

          {(method === 'range-height-time' || method === 'initial-velocity' || method === 'landing-velocity') && (
            <div>
              <Input 
                label="Launch Angle (degrees, 0-90)" 
                value={angle} 
                onChange={(e) => setAngle(e.target.value)} 
                type="number" 
                placeholder="e.g., 45" 
              />
            </div>
          )}

          {method === 'initial-velocity' && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Range R" 
                  value={range} 
                  onChange={(e) => setRange(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 40.77" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="m">m</option>
                  <option value="km">km</option>
                  <option value="ft">ft</option>
                  <option value="mi">mi</option>
                </select>
              </div>
            </div>
          )}

          {method === 'angle' && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Range R" 
                  value={range} 
                  onChange={(e) => setRange(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 40.77" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="m">m</option>
                  <option value="km">km</option>
                  <option value="ft">ft</option>
                  <option value="mi">mi</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <Input 
              label="Gravity (m/s²)" 
              value={gravity} 
              onChange={(e) => setGravity(e.target.value)} 
              type="number" 
              placeholder="e.g., 9.81" 
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <Input 
                label="Initial Height h₀" 
                value={initialHeight} 
                onChange={(e) => setInitialHeight(e.target.value)} 
                type="number" 
                placeholder="e.g., 0" 
              />
            </div>
            <div className="w-28">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
              <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                <option value="m">m</option>
                <option value="km">km</option>
                <option value="ft">ft</option>
                <option value="mi">mi</option>
              </select>
            </div>
          </div>

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
