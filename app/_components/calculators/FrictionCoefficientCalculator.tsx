'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'coefficient' | 'friction-force' | 'normal-force' | 'static-kinetic';

type Result = {
  lines: string[];
};

export default function FrictionCoefficientCalculator() {
  const [method, setMethod] = useState<Method>('coefficient');

  const [frictionForce, setFrictionForce] = useState('50');
  const [frictionForceUnit, setFrictionForceUnit] = useState('N');
  const [normalForce, setNormalForce] = useState('100');
  const [normalForceUnit, setNormalForceUnit] = useState('N');
  const [coefficient, setCoefficient] = useState('0.5');
  
  const [mass, setMass] = useState('10');
  const [massUnit, setMassUnit] = useState('kg');
  const [angle, setAngle] = useState('0');
  const [gravity, setGravity] = useState('9.81');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const format = (val: number, digits = 4) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1e6 || (Math.abs(val) < 0.001 && val !== 0)) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  const forceToNewtons = (val: number, unit: string) => {
    switch (unit) {
      case 'N': return val;
      case 'kN': return val * 1000;
      case 'lbf': return val * 4.44822;
      case 'kgf': return val * 9.80665;
      default: return val;
    }
  };

  const newtonsToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'N': return val;
      case 'kN': return val / 1000;
      case 'lbf': return val / 4.44822;
      case 'kgf': return val / 9.80665;
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

  const parsePositive = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const parseNonNegative = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num < 0 ? NaN : num;
  };

  const handleCalculate = () => {
    setResult(null);
    setCalculation('');

    if (method === 'coefficient') {
      const fVal = parsePositive(frictionForce);
      const nVal = parsePositive(normalForce);

      if (isNaN(fVal) || isNaN(nVal)) {
        setCalculation('Please enter valid friction force and normal force values.');
        return;
      }

      const F = forceToNewtons(fVal, frictionForceUnit);
      const N = forceToNewtons(nVal, normalForceUnit);

      // μ = F / N
      const mu = F / N;

      setResult({
        lines: [
          `Friction force F = ${format(newtonsToUnit(F, frictionForceUnit))} ${frictionForceUnit} (${format(F)} N)`,
          `Normal force N = ${format(newtonsToUnit(N, normalForceUnit))} ${normalForceUnit} (${format(N)} N)`,
          `Coefficient of friction μ = ${format(mu)}`,
          `Formula: μ = F / N`,
          mu < 0.1 ? 'Very low friction (ice-like surfaces)' : mu < 0.3 ? 'Low friction (smooth surfaces)' : mu < 0.6 ? 'Moderate friction (wood, metal)' : mu < 1.0 ? 'High friction (rubber on dry concrete)' : 'Very high friction (rubber on rough surfaces)'
        ]
      });
      setCalculation('Computed coefficient of friction from forces.');
      return;
    }

    if (method === 'friction-force') {
      const muVal = parsePositive(coefficient);
      const nVal = parsePositive(normalForce);

      if (isNaN(muVal) || isNaN(nVal)) {
        setCalculation('Please enter valid coefficient and normal force values.');
        return;
      }

      const mu = muVal;
      const N = forceToNewtons(nVal, normalForceUnit);

      // F = μ × N
      const F = mu * N;
      const F_out = newtonsToUnit(F, frictionForceUnit);

      setResult({
        lines: [
          `Coefficient of friction μ = ${format(mu)}`,
          `Normal force N = ${format(newtonsToUnit(N, normalForceUnit))} ${normalForceUnit} (${format(N)} N)`,
          `Friction force F = ${format(F_out)} ${frictionForceUnit} (${format(F)} N)`,
          `Formula: F = μ × N`,
          `This is the maximum static friction or kinetic friction force.`
        ]
      });
      setCalculation('Computed friction force from coefficient and normal force.');
      return;
    }

    if (method === 'normal-force') {
      const muVal = parsePositive(coefficient);
      const fVal = parsePositive(frictionForce);

      if (isNaN(muVal) || isNaN(fVal)) {
        setCalculation('Please enter valid coefficient and friction force values.');
        return;
      }

      const mu = muVal;
      const F = forceToNewtons(fVal, frictionForceUnit);

      // N = F / μ
      const N = F / mu;
      const N_out = newtonsToUnit(N, normalForceUnit);

      setResult({
        lines: [
          `Coefficient of friction μ = ${format(mu)}`,
          `Friction force F = ${format(newtonsToUnit(F, frictionForceUnit))} ${frictionForceUnit} (${format(F)} N)`,
          `Normal force N = ${format(N_out)} ${normalForceUnit} (${format(N)} N)`,
          `Formula: N = F / μ`,
          `Normal force is the perpendicular contact force between surfaces.`
        ]
      });
      setCalculation('Computed normal force from coefficient and friction force.');
      return;
    }

    if (method === 'static-kinetic') {
      const mVal = parsePositive(mass);
      const gVal = parsePositive(gravity);
      const angleVal = parseNonNegative(angle);

      if (isNaN(mVal) || isNaN(gVal) || isNaN(angleVal)) {
        setCalculation('Please enter valid mass, gravity, and angle values.');
        return;
      }

      const m = massToKg(mVal, massUnit);
      const g = gVal;
      const theta = (angleVal * Math.PI) / 180; // Convert to radians

      // Normal force on incline: N = m × g × cos(θ)
      const N = m * g * Math.cos(theta);
      const N_out = newtonsToUnit(N, normalForceUnit);

      // Weight component parallel to surface: W_parallel = m × g × sin(θ)
      const W_parallel = m * g * Math.sin(theta);

      setResult({
        lines: [
          `Mass m = ${format(mVal)} ${massUnit} (${format(m)} kg)`,
          `Gravity g = ${format(g)} m/s²`,
          `Incline angle θ = ${format(angleVal)}°`,
          `Normal force N = ${format(N_out)} ${normalForceUnit} (${format(N)} N)`,
          `Weight parallel to surface = ${format(newtonsToUnit(W_parallel, normalForceUnit))} ${normalForceUnit}`,
          `Formula: N = m × g × cos(θ)`,
          angleVal === 0 ? 'On horizontal surface: N = m × g' : `On incline: Friction must overcome ${format(newtonsToUnit(W_parallel, normalForceUnit))} ${normalForceUnit} to prevent sliding.`
        ]
      });
      setCalculation('Computed normal force on inclined surface.');
      return;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🛠️</span>
          <h1 className="text-2xl font-bold text-gray-900">Friction Coefficient Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate coefficient of friction, friction force, and normal force for static and kinetic friction scenarios.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select calculation method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'coefficient' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="coefficient" checked={method === 'coefficient'} onChange={() => setMethod('coefficient')} className="mr-2" />
              Find coefficient μ
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'friction-force' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="friction-force" checked={method === 'friction-force'} onChange={() => setMethod('friction-force')} className="mr-2" />
              Find friction force
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'normal-force' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="normal-force" checked={method === 'normal-force'} onChange={() => setMethod('normal-force')} className="mr-2" />
              Find normal force
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'static-kinetic' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="static-kinetic" checked={method === 'static-kinetic'} onChange={() => setMethod('static-kinetic')} className="mr-2" />
              Inclined surface
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {method === 'coefficient' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Friction Force F" 
                    value={frictionForce} 
                    onChange={(e) => setFrictionForce(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 50" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={frictionForceUnit} onChange={(e) => setFrictionForceUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="N">N</option>
                    <option value="kN">kN</option>
                    <option value="lbf">lbf</option>
                    <option value="kgf">kgf</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Normal Force N" 
                    value={normalForce} 
                    onChange={(e) => setNormalForce(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 100" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={normalForceUnit} onChange={(e) => setNormalForceUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="N">N</option>
                    <option value="kN">kN</option>
                    <option value="lbf">lbf</option>
                    <option value="kgf">kgf</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {method === 'friction-force' && (
            <>
              <div>
                <Input 
                  label="Coefficient of Friction μ" 
                  value={coefficient} 
                  onChange={(e) => setCoefficient(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 0.5" 
                />
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Normal Force N" 
                    value={normalForce} 
                    onChange={(e) => setNormalForce(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 100" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={normalForceUnit} onChange={(e) => setNormalForceUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="N">N</option>
                    <option value="kN">kN</option>
                    <option value="lbf">lbf</option>
                    <option value="kgf">kgf</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {method === 'normal-force' && (
            <>
              <div>
                <Input 
                  label="Coefficient of Friction μ" 
                  value={coefficient} 
                  onChange={(e) => setCoefficient(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 0.5" 
                />
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Friction Force F" 
                    value={frictionForce} 
                    onChange={(e) => setFrictionForce(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 50" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={frictionForceUnit} onChange={(e) => setFrictionForceUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="N">N</option>
                    <option value="kN">kN</option>
                    <option value="lbf">lbf</option>
                    <option value="kgf">kgf</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {method === 'static-kinetic' && (
            <>
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
                    <option value="lb">lb</option>
                    <option value="oz">oz</option>
                  </select>
                </div>
              </div>

              <div>
                <Input 
                  label="Gravity (m/s²)" 
                  value={gravity} 
                  onChange={(e) => setGravity(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 9.81" 
                />
              </div>

              <div>
                <Input 
                  label="Incline Angle (degrees)" 
                  value={angle} 
                  onChange={(e) => setAngle(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 0 (horizontal surface)" 
                />
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
