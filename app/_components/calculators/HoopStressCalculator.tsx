'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'hoop-stress' | 'radial-stress' | 'thickness' | 'pressure';

type Result = {
  lines: string[];
};

export default function HoopStressCalculator() {
  const [method, setMethod] = useState<Method>('hoop-stress');

  const [pressure, setPressure] = useState('2');
  const [pressureUnit, setPressureUnit] = useState('MPa');
  const [radius, setRadius] = useState('100');
  const [radiusUnit, setRadiusUnit] = useState('mm');
  const [thickness, setThickness] = useState('5');
  const [thicknessUnit, setThicknessUnit] = useState('mm');
  const [youngModulus, setYoungModulus] = useState('200');
  const [youngsUnit, setYoungsUnit] = useState('GPa');
  const [poissonRatio, setPoissonRatio] = useState('0.3');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const format = (val: number, digits = 4) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1e6 || (Math.abs(val) < 0.001 && val !== 0)) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  const pressureToPa = (val: number, unit: string) => {
    switch (unit) {
      case 'Pa': return val;
      case 'kPa': return val * 1000;
      case 'MPa': return val * 1_000_000;
      case 'GPa': return val * 1_000_000_000;
      case 'atm': return val * 101325;
      case 'bar': return val * 100000;
      case 'psi': return val * 6894.76;
      default: return val;
    }
  };

  const paToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'Pa': return val;
      case 'kPa': return val / 1000;
      case 'MPa': return val / 1_000_000;
      case 'GPa': return val / 1_000_000_000;
      case 'atm': return val / 101325;
      case 'bar': return val / 100000;
      case 'psi': return val / 6894.76;
      default: return val;
    }
  };

  const distanceToMeters = (val: number, unit: string) => {
    switch (unit) {
      case 'm': return val;
      case 'cm': return val / 100;
      case 'mm': return val / 1000;
      case 'μm': return val / 1_000_000;
      case 'in': return val * 0.0254;
      default: return val;
    }
  };

  const metersToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'm': return val;
      case 'cm': return val * 100;
      case 'mm': return val * 1000;
      case 'μm': return val * 1_000_000;
      case 'in': return val / 0.0254;
      default: return val;
    }
  };

  const modulusToPA = (val: number, unit: string) => {
    switch (unit) {
      case 'Pa': return val;
      case 'kPa': return val * 1000;
      case 'MPa': return val * 1_000_000;
      case 'GPa': return val * 1_000_000_000;
      default: return val;
    }
  };

  const paToModulus = (val: number, unit: string) => {
    switch (unit) {
      case 'Pa': return val;
      case 'kPa': return val / 1000;
      case 'MPa': return val / 1_000_000;
      case 'GPa': return val / 1_000_000_000;
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

    if (method === 'hoop-stress') {
      const pVal = parsePositive(pressure);
      const rVal = parsePositive(radius);
      const tVal = parsePositive(thickness);

      if (isNaN(pVal) || isNaN(rVal) || isNaN(tVal)) {
        setCalculation('Please enter valid pressure, radius, and thickness values.');
        return;
      }

      const p = pressureToPa(pVal, pressureUnit);
      const r = distanceToMeters(rVal, radiusUnit);
      const t = distanceToMeters(tVal, thicknessUnit);

      // Hoop stress: σ_h = p × r / t
      const hoopStress = (p * r) / t;
      const hoopStressUnit = paToUnit(hoopStress, pressureUnit);

      // Axial stress: σ_a = p × r / (2 × t)
      const axialStress = (p * r) / (2 * t);
      const axialStressUnit = paToUnit(axialStress, pressureUnit);

      // Radial stress (at inner surface): σ_r = -p (approximated as -p for thin wall)
      const radialStress = -p;

      const ratioDiameter = 2 * r / t;

      setResult({
        lines: [
          `Internal pressure p = ${format(paToUnit(p, pressureUnit))} ${pressureUnit}`,
          `Radius r = ${format(metersToUnit(r, radiusUnit))} ${radiusUnit}`,
          `Wall thickness t = ${format(metersToUnit(t, thicknessUnit))} ${thicknessUnit}`,
          `Diameter-to-thickness ratio d/t = ${format(ratioDiameter)}`,
          `Hoop (circumferential) stress σ_h = ${format(hoopStressUnit)} ${pressureUnit} (${format(hoopStress)} Pa)`,
          `Axial (longitudinal) stress σ_a = ${format(axialStressUnit)} ${pressureUnit} (${format(axialStress)} Pa)`,
          `Radial stress σ_r ≈ ${format(paToUnit(radialStress, pressureUnit))} ${pressureUnit} (inner surface)`,
          `Formula: σ_h = p·r/t (thin-wall approximation valid for d/t > 20)`
        ]
      });
      setCalculation('Computed hoop stress and related stresses in pressure vessel.');
      return;
    }

    if (method === 'radial-stress') {
      const pVal = parsePositive(pressure);
      const rVal = parsePositive(radius);
      const tVal = parsePositive(thickness);
      const eVal = parsePositive(youngModulus);
      const vVal = parsePositive(poissonRatio);

      if (isNaN(pVal) || isNaN(rVal) || isNaN(tVal) || isNaN(eVal) || isNaN(vVal)) {
        setCalculation('Please enter valid pressure, radius, thickness, Young modulus, and Poisson ratio.');
        return;
      }

      const p = pressureToPa(pVal, pressureUnit);
      const r = distanceToMeters(rVal, radiusUnit);
      const t = distanceToMeters(tVal, thicknessUnit);
      const E = modulusToPA(eVal, youngsUnit);
      const nu = vVal;

      // Hoop strain: ε_h = (σ_h - ν(σ_a + σ_r)) / E
      const hoopStress = (p * r) / t;
      const axialStress = (p * r) / (2 * t);
      const radialStress = -p;

      const hoopStrain = (hoopStress - nu * (axialStress + radialStress)) / E;
      const radialStrain = (radialStress - nu * (hoopStress + axialStress)) / E;
      const axialStrain = (axialStress - nu * (hoopStress + radialStress)) / E;

      // Hoop displacement: u = ε_h × r
      const hoopDisplacement = hoopStrain * r;
      const hoopDisplacementMm = metersToUnit(hoopDisplacement, 'mm');

      setResult({
        lines: [
          `Internal pressure p = ${format(paToUnit(p, pressureUnit))} ${pressureUnit}`,
          `Radius r = ${format(metersToUnit(r, radiusUnit))} ${radiusUnit}`,
          `Young's modulus E = ${format(paToModulus(E, youngsUnit))} ${youngsUnit}`,
          `Poisson's ratio ν = ${format(nu)}`,
          `Hoop strain ε_h = ${format(hoopStrain)}`,
          `Radial strain ε_r = ${format(radialStrain)}`,
          `Axial strain ε_a = ${format(axialStrain)}`,
          `Radial displacement u = ${format(hoopDisplacementMm)} mm`,
          `Formula: ε = (σ - ν(σ_other)) / E`
        ]
      });
      setCalculation('Computed strains and displacements in pressure vessel.');
      return;
    }

    if (method === 'thickness') {
      const pVal = parsePositive(pressure);
      const rVal = parsePositive(radius);
      const allowableVal = parsePositive(youngModulus); // Reuse for allowable stress

      if (isNaN(pVal) || isNaN(rVal) || isNaN(allowableVal)) {
        setCalculation('Please enter valid pressure, radius, and allowable stress.');
        return;
      }

      const p = pressureToPa(pVal, pressureUnit);
      const r = distanceToMeters(rVal, radiusUnit);
      const allowableStress = pressureToPa(allowableVal, pressureUnit);

      // Minimum thickness: t = p × r / σ_allowable
      const minThickness = (p * r) / allowableStress;
      const minThicknessUnit = metersToUnit(minThickness, thicknessUnit);

      // Safety factor for 2:1 thickness ratio
      const safetyThickness = minThickness * 2;
      const safetyThicknessUnit = metersToUnit(safetyThickness, thicknessUnit);

      setResult({
        lines: [
          `Internal pressure p = ${format(paToUnit(p, pressureUnit))} ${pressureUnit}`,
          `Radius r = ${format(metersToUnit(r, radiusUnit))} ${radiusUnit}`,
          `Allowable stress σ_allowable = ${format(paToUnit(allowableStress, pressureUnit))} ${pressureUnit}`,
          `Minimum thickness t_min = ${format(minThicknessUnit)} ${thicknessUnit}`,
          `Recommended thickness (2× safety) = ${format(safetyThicknessUnit)} ${thicknessUnit}`,
          `Formula: t = p·r / σ_allowable`,
          `Actual thickness should exceed minimum for fatigue and corrosion allowance.`
        ]
      });
      setCalculation('Computed minimum vessel wall thickness.');
      return;
    }

    if (method === 'pressure') {
      const rVal = parsePositive(radius);
      const tVal = parsePositive(thickness);
      const stressVal = parsePositive(youngModulus); // Reuse for maximum stress

      if (isNaN(rVal) || isNaN(tVal) || isNaN(stressVal)) {
        setCalculation('Please enter valid radius, thickness, and maximum stress.');
        return;
      }

      const r = distanceToMeters(rVal, radiusUnit);
      const t = distanceToMeters(tVal, thicknessUnit);
      const maxStress = pressureToPa(stressVal, pressureUnit);

      // Maximum pressure: p = σ_max × t / r
      const maxPressure = (maxStress * t) / r;
      const maxPressureUnit = paToUnit(maxPressure, pressureUnit);

      // Working pressure with safety factor 4
      const workingPressure = maxPressure / 4;
      const workingPressureUnit = paToUnit(workingPressure, pressureUnit);

      setResult({
        lines: [
          `Radius r = ${format(metersToUnit(r, radiusUnit))} ${radiusUnit}`,
          `Wall thickness t = ${format(metersToUnit(t, thicknessUnit))} ${thicknessUnit}`,
          `Maximum allowable stress σ_max = ${format(paToUnit(maxStress, pressureUnit))} ${pressureUnit}`,
          `Maximum pressure p_max = ${format(maxPressureUnit)} ${pressureUnit}`,
          `Design working pressure (SF=4) = ${format(workingPressureUnit)} ${pressureUnit}`,
          `Formula: p = σ·t / r`,
          `Safety factor of 4 is typical for pressure vessel code compliance.`
        ]
      });
      setCalculation('Computed maximum and working pressure for vessel.');
      return;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🔧</span>
          <h1 className="text-2xl font-bold text-gray-900">Hoop Stress Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate hoop stress, radial stress, and required thickness for pressure vessels and pipes.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select calculation method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'hoop-stress' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="hoop-stress" checked={method === 'hoop-stress'} onChange={() => setMethod('hoop-stress')} className="mr-2" />
              Hoop & axial stress
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'radial-stress' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="radial-stress" checked={method === 'radial-stress'} onChange={() => setMethod('radial-stress')} className="mr-2" />
              Strains & displacement
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'thickness' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="thickness" checked={method === 'thickness'} onChange={() => setMethod('thickness')} className="mr-2" />
              Find min. thickness
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'pressure' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="pressure" checked={method === 'pressure'} onChange={() => setMethod('pressure')} className="mr-2" />
              Find max. pressure
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {(method === 'hoop-stress' || method === 'radial-stress' || method === 'thickness' || method === 'pressure') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label={method === 'pressure' ? 'Maximum Stress' : 'Internal Pressure'} 
                  value={method === 'pressure' ? youngModulus : pressure} 
                  onChange={(e) => method === 'pressure' ? setYoungModulus(e.target.value) : setPressure(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 2" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={method === 'pressure' ? youngsUnit : pressureUnit} onChange={(e) => method === 'pressure' ? setYoungsUnit(e.target.value) : setPressureUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="Pa">Pa</option>
                  <option value="kPa">kPa</option>
                  <option value="MPa">MPa</option>
                  <option value="GPa">GPa</option>
                  <option value="atm">atm</option>
                  <option value="bar">bar</option>
                  <option value="psi">psi</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'hoop-stress' || method === 'radial-stress' || method === 'thickness' || method === 'pressure') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Radius r (or diameter/2)" 
                  value={radius} 
                  onChange={(e) => setRadius(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 100" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={radiusUnit} onChange={(e) => setRadiusUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="m">m</option>
                  <option value="cm">cm</option>
                  <option value="mm">mm</option>
                  <option value="μm">μm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'hoop-stress' || method === 'radial-stress' || method === 'thickness' || method === 'pressure') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  label="Wall Thickness t" 
                  value={thickness} 
                  onChange={(e) => setThickness(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 5" 
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={thicknessUnit} onChange={(e) => setThicknessUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="m">m</option>
                  <option value="cm">cm</option>
                  <option value="mm">mm</option>
                  <option value="μm">μm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
          )}

          {method === 'radial-stress' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Young's Modulus E" 
                    value={youngModulus} 
                    onChange={(e) => setYoungModulus(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 200" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={youngsUnit} onChange={(e) => setYoungsUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="Pa">Pa</option>
                    <option value="kPa">kPa</option>
                    <option value="MPa">MPa</option>
                    <option value="GPa">GPa</option>
                  </select>
                </div>
              </div>

              <div>
                <Input 
                  label="Poisson's Ratio (ν)" 
                  value={poissonRatio} 
                  onChange={(e) => setPoissonRatio(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 0.3" 
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
