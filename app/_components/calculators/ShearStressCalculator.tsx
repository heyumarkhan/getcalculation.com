'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'force-area' | 'torque-shaft' | 'beam-shear' | 'max-shear';

type Result = {
  lines: string[];
};

export default function ShearStressCalculator() {
  const [method, setMethod] = useState<Method>('force-area');

  const [force, setForce] = useState('5000');
  const [forceUnit, setForceUnit] = useState('N');
  const [area, setArea] = useState('0.01');
  const [areaUnit, setAreaUnit] = useState('m2');
  const [torque, setTorque] = useState('100');
  const [torqueUnit, setTorqueUnit] = useState('Nm');
  const [radius, setRadius] = useState('0.05');
  const [radiusUnit, setRadiusUnit] = useState('m');
  const [shearForce, setShearForce] = useState('10000');
  const [width, setWidth] = useState('0.2');
  const [widthUnit, setWidthUnit] = useState('m');
  const [height, setHeight] = useState('0.3');
  const [heightUnit, setHeightUnit] = useState('m');
  const [normalStress1, setNormalStress1] = useState('100');
  const [normalStress2, setNormalStress2] = useState('50');
  const [stressUnit, setStressUnit] = useState('MPa');

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

  const areaToM2 = (val: number, unit: string) => {
    if (unit === 'm2') return val;
    if (unit === 'cm2') return val / 10000;
    if (unit === 'mm2') return val / 1_000_000;
    if (unit === 'in2') return val * 0.00064516;
    return val;
  };

  const torqueToNm = (val: number, unit: string) => {
    if (unit === 'Nm') return val;
    if (unit === 'kNm') return val * 1000;
    if (unit === 'lbf-ft') return val * 1.35582;
    return val;
  };

  const lengthToMeters = (val: number, unit: string) => {
    if (unit === 'm') return val;
    if (unit === 'cm') return val / 100;
    if (unit === 'mm') return val / 1000;
    if (unit === 'in') return val * 0.0254;
    return val;
  };

  const stressToPa = (val: number, unit: string) => {
    if (unit === 'Pa') return val;
    if (unit === 'kPa') return val * 1000;
    if (unit === 'MPa') return val * 1_000_000;
    if (unit === 'GPa') return val * 1_000_000_000;
    if (unit === 'psi') return val * 6894.76;
    return val;
  };

  const paToUnit = (val: number, unit: string) => {
    if (unit === 'Pa') return val;
    if (unit === 'kPa') return val / 1000;
    if (unit === 'MPa') return val / 1_000_000;
    if (unit === 'GPa') return val / 1_000_000_000;
    if (unit === 'psi') return val / 6894.76;
    return val;
  };

  const parsePositive = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const handleCalculate = () => {
    setResult(null);
    setCalculation('');

    if (method === 'force-area') {
      const fVal = parsePositive(force);
      const aVal = parsePositive(area);
      if (isNaN(fVal) || isNaN(aVal)) {
        setCalculation('Please enter valid force and area.');
        return;
      }
      const F = forceToNewtons(fVal, forceUnit);
      const A = areaToM2(aVal, areaUnit);
      const tau = F / A;
      const tauMPa = tau / 1_000_000;
      const tauPsi = tau / 6894.76;

      setResult({
        lines: [
          `Shear force: ${format(F)} N`,
          `Shear area: ${format(A)} m²`,
          `Shear stress τ = ${format(tau)} Pa (${format(tauMPa)} MPa)`,
          `Equivalent: ${format(tauPsi)} psi`,
          `Formula: τ = F / A`
        ]
      });
      setCalculation('Computed shear stress from force and area.');
      return;
    }

    if (method === 'torque-shaft') {
      const tVal = parsePositive(torque);
      const rVal = parsePositive(radius);
      if (isNaN(tVal) || isNaN(rVal)) {
        setCalculation('Please enter valid torque and radius.');
        return;
      }
      const T = torqueToNm(tVal, torqueUnit);
      const r = lengthToMeters(rVal, radiusUnit);
      const J = (Math.PI / 2) * Math.pow(r, 4); // polar moment for solid circular shaft
      const tau = (T * r) / J;
      const tauMPa = tau / 1_000_000;

      setResult({
        lines: [
          `Torque: ${format(T)} N·m`,
          `Shaft radius: ${format(r)} m`,
          `Polar moment J = ${format(J)} m⁴`,
          `Max shear stress τ_max = ${format(tau)} Pa (${format(tauMPa)} MPa)`,
          `Formula: τ = T·r / J (solid circular shaft)`
        ]
      });
      setCalculation('Computed maximum shear stress in circular shaft from torque.');
      return;
    }

    if (method === 'beam-shear') {
      const vVal = parsePositive(shearForce);
      const bVal = parsePositive(width);
      const hVal = parsePositive(height);
      if (isNaN(vVal) || isNaN(bVal) || isNaN(hVal)) {
        setCalculation('Please enter valid shear force, width, and height.');
        return;
      }
      const V = forceToNewtons(vVal, forceUnit);
      const b = lengthToMeters(bVal, widthUnit);
      const h = lengthToMeters(hVal, heightUnit);
      const A = b * h;
      const tauAvg = V / A;
      const tauMax = 1.5 * tauAvg; // for rectangular cross-section
      const tauMPa = tauMax / 1_000_000;

      setResult({
        lines: [
          `Shear force V: ${format(V)} N`,
          `Cross-section: ${format(b)} m × ${format(h)} m`,
          `Area: ${format(A)} m²`,
          `Average shear stress: ${format(tauAvg)} Pa`,
          `Maximum shear stress τ_max = ${format(tauMax)} Pa (${format(tauMPa)} MPa)`,
          `Formula: τ_max = 1.5 × V / A (rectangular beam)`
        ]
      });
      setCalculation('Computed maximum shear stress in rectangular beam.');
      return;
    }

    if (method === 'max-shear') {
      const s1Val = parseFloat(normalStress1);
      const s2Val = parseFloat(normalStress2);
      if (isNaN(s1Val) || isNaN(s2Val)) {
        setCalculation('Please enter valid principal stresses.');
        return;
      }
      const sigma1 = stressToPa(s1Val, stressUnit);
      const sigma2 = stressToPa(s2Val, stressUnit);
      const tauMax = Math.abs(sigma1 - sigma2) / 2;
      const tauMaxOut = paToUnit(tauMax, stressUnit);

      setResult({
        lines: [
          `Principal stress σ₁: ${format(s1Val)} ${stressUnit}`,
          `Principal stress σ₂: ${format(s2Val)} ${stressUnit}`,
          `Maximum shear stress τ_max = ${format(tauMaxOut)} ${stressUnit}`,
          `Formula: τ_max = |σ₁ - σ₂| / 2`,
          `Occurs at 45° to principal stress directions`
        ]
      });
      setCalculation('Computed maximum shear stress from principal stresses (Mohr\'s circle).');
      return;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">✂️</span>
          <h1 className="text-2xl font-bold text-gray-900">Shear Stress Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate shear stress from force, torque, beam loading, and principal stresses.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'force-area' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="force-area" checked={method === 'force-area'} onChange={() => setMethod('force-area')} className="mr-2" />
              From force & area
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'torque-shaft' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="torque-shaft" checked={method === 'torque-shaft'} onChange={() => setMethod('torque-shaft')} className="mr-2" />
              From torque (shaft)
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'beam-shear' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="beam-shear" checked={method === 'beam-shear'} onChange={() => setMethod('beam-shear')} className="mr-2" />
              Beam shear stress
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'max-shear' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="max-shear" checked={method === 'max-shear'} onChange={() => setMethod('max-shear')} className="mr-2" />
              Max shear (principal)
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {method === 'force-area' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input label="Shear Force" value={force} onChange={(e) => setForce(e.target.value)} type="number" placeholder="e.g., 5000" />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={forceUnit} onChange={(e) => setForceUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="N">N</option>
                    <option value="kN">kN</option>
                    <option value="lbf">lbf</option>
                    <option value="kgf">kgf</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input label="Shear Area" value={area} onChange={(e) => setArea(e.target.value)} type="number" placeholder="e.g., 0.01" />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={areaUnit} onChange={(e) => setAreaUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="m2">m²</option>
                    <option value="cm2">cm²</option>
                    <option value="mm2">mm²</option>
                    <option value="in2">in²</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {method === 'torque-shaft' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input label="Torque" value={torque} onChange={(e) => setTorque(e.target.value)} type="number" placeholder="e.g., 100" />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={torqueUnit} onChange={(e) => setTorqueUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="Nm">N·m</option>
                    <option value="kNm">kN·m</option>
                    <option value="lbf-ft">lbf·ft</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input label="Shaft Radius" value={radius} onChange={(e) => setRadius(e.target.value)} type="number" placeholder="e.g., 0.05" />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={radiusUnit} onChange={(e) => setRadiusUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="m">m</option>
                    <option value="cm">cm</option>
                    <option value="mm">mm</option>
                    <option value="in">in</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {method === 'beam-shear' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input label="Shear Force (V)" value={shearForce} onChange={(e) => setShearForce(e.target.value)} type="number" placeholder="e.g., 10000" />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={forceUnit} onChange={(e) => setForceUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="N">N</option>
                    <option value="kN">kN</option>
                    <option value="lbf">lbf</option>
                    <option value="kgf">kgf</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input label="Beam Width (b)" value={width} onChange={(e) => setWidth(e.target.value)} type="number" placeholder="e.g., 0.2" />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={widthUnit} onChange={(e) => setWidthUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="m">m</option>
                    <option value="cm">cm</option>
                    <option value="mm">mm</option>
                    <option value="in">in</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input label="Beam Height (h)" value={height} onChange={(e) => setHeight(e.target.value)} type="number" placeholder="e.g., 0.3" />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="m">m</option>
                    <option value="cm">cm</option>
                    <option value="mm">mm</option>
                    <option value="in">in</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {method === 'max-shear' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input label="Principal Stress σ₁" value={normalStress1} onChange={(e) => setNormalStress1(e.target.value)} type="number" placeholder="e.g., 100" />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={stressUnit} onChange={(e) => setStressUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="Pa">Pa</option>
                    <option value="kPa">kPa</option>
                    <option value="MPa">MPa</option>
                    <option value="GPa">GPa</option>
                    <option value="psi">psi</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input label="Principal Stress σ₂" value={normalStress2} onChange={(e) => setNormalStress2(e.target.value)} type="number" placeholder="e.g., 50" />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={stressUnit} onChange={(e) => setStressUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="Pa">Pa</option>
                    <option value="kPa">kPa</option>
                    <option value="MPa">MPa</option>
                    <option value="GPa">GPa</option>
                    <option value="psi">psi</option>
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
