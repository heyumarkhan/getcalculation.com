'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Mode = 'youngs' | 'stress' | 'strain' | 'force' | 'area';

interface Props { primaryColor?: string }

export default function YoungsModulusCalculator({ primaryColor = '#820ECC' }: Props) {
  const [mode, setMode] = useState<Mode>('youngs');
  const [force, setForce] = useState(''); // N
  const [area, setArea] = useState(''); // mm^2
  const [origLength, setOrigLength] = useState(''); // mm
  const [deltaLength, setDeltaLength] = useState(''); // mm
  const [E_GPa, setE_GPa] = useState(''); // GPa (for modes that need E)
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  function toNumber(v: string) {
    const n = Number(v);
    return Number.isFinite(n) ? n : NaN;
  }

  function calculate() {
    setError('');
    setResult('');
    const F = toNumber(force);
    const A = toNumber(area);
    const L0 = toNumber(origLength);
    const dL = toNumber(deltaLength);
    const Einput = toNumber(E_GPa);

    try {
      if (mode === 'youngs') {
        if (isNaN(F) || isNaN(A) || isNaN(L0) || isNaN(dL)) throw new Error('Enter valid numbers for force, area, original length and change in length');
        if (A <= 0 || L0 <= 0) throw new Error('Area and original length must be > 0');
        const A_m2 = A / 1e6;
        const stress = F / A_m2; // Pa
        const strain = dL / L0; // unitless
        if (strain === 0) throw new Error('Change in length must not be zero for Young\'s modulus calculation');
        const E = stress / strain; // Pa
        const E_GPa_out = E / 1e9;
        setResult(`${E_GPa_out.toPrecision(6)} GPa (${E.toExponential(4)} Pa)`);
        return;
      }

      if (mode === 'stress') {
        if (isNaN(F) || isNaN(A)) throw new Error('Enter valid numbers for force and area');
        if (A <= 0) throw new Error('Area must be > 0');
        const A_m2 = A / 1e6;
        const stress = F / A_m2;
        setResult(`${stress.toExponential(6)} Pa`);
        return;
      }

      if (mode === 'strain') {
        if (isNaN(dL) || isNaN(L0)) throw new Error('Enter valid numbers for change in length and original length');
        if (L0 <= 0) throw new Error('Original length must be > 0');
        const strain = dL / L0;
        setResult(`${strain.toPrecision(6)} (unitless)`);
        return;
      }

      if (mode === 'force') {
        if (isNaN(Einput) || isNaN(A) || isNaN(L0) || isNaN(dL)) throw new Error("Enter valid Young's modulus (GPa), area (mm²), original length and change in length");
        if (A <= 0 || L0 <= 0) throw new Error('Area and original length must be > 0');
        const E = Einput * 1e9; // Pa
        const strain = dL / L0;
        const stress = E * strain;
        const A_m2 = A / 1e6;
        const F_required = stress * A_m2;
        setResult(`${F_required.toPrecision(6)} N`);
        return;
      }

      if (mode === 'area') {
        if (isNaN(Einput) || isNaN(F) || isNaN(L0) || isNaN(dL)) throw new Error("Enter valid Young's modulus (GPa), force (N), original length and change in length");
        if (L0 <= 0) throw new Error('Original length must be > 0');
        const E = Einput * 1e9;
        const strain = dL / L0;
        const stress = E * strain;
        if (stress === 0) throw new Error('Resulting stress is zero — check inputs');
        const A_m2 = F / stress;
        const A_mm2 = A_m2 * 1e6;
        setResult(`${A_mm2.toPrecision(6)} mm²`);
        return;
      }
    } catch (e: any) {
      setError(e?.message || 'Invalid input');
    }
  }

  function reset() {
    setForce(''); setArea(''); setOrigLength(''); setDeltaLength(''); setE_GPa(''); setResult(''); setError('');
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-color-button:hover { background-color: ${primaryColor} !important; }
        .custom-color-button:focus { box-shadow: 0 0 0 4px ${primaryColor}66 !important; }
      ` }} />
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold" style={{ color: primaryColor }}>Young's Modulus Calculator</h3>
          <p className="text-sm text-gray-600">Compute Young's modulus (E), stress, strain, required force, or required cross-sectional area for axial loading.</p>

          <div className="flex gap-2">
            <button onClick={() => setMode('youngs')} className={`px-3 py-1 rounded ${mode === 'youngs' ? 'custom-color-button text-white' : 'bg-gray-100'}`} style={mode === 'youngs' ? { backgroundColor: primaryColor } : undefined}>Young's E</button>
            <button onClick={() => setMode('stress')} className={`px-3 py-1 rounded ${mode === 'stress' ? 'custom-color-button text-white' : 'bg-gray-100'}`} style={mode === 'stress' ? { backgroundColor: primaryColor } : undefined}>Stress</button>
            <button onClick={() => setMode('strain')} className={`px-3 py-1 rounded ${mode === 'strain' ? 'custom-color-button text-white' : 'bg-gray-100'}`} style={mode === 'strain' ? { backgroundColor: primaryColor } : undefined}>Strain</button>
            <button onClick={() => setMode('force')} className={`px-3 py-1 rounded ${mode === 'force' ? 'custom-color-button text-white' : 'bg-gray-100'}`} style={mode === 'force' ? { backgroundColor: primaryColor } : undefined}>Force</button>
            <button onClick={() => setMode('area')} className={`px-3 py-1 rounded ${mode === 'area' ? 'custom-color-button text-white' : 'bg-gray-100'}`} style={mode === 'area' ? { backgroundColor: primaryColor } : undefined}>Area</button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Axial Force (F) — Newtons (N)</label>
            <Input value={force} onChange={(e) => setForce(e.target.value)} placeholder="e.g., 1000" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cross-sectional Area (A) — mm²</label>
            <Input value={area} onChange={(e) => setArea(e.target.value)} placeholder="e.g., 50" />
            <p className="text-xs text-gray-500 mt-1">Note: Area entered in mm²; converts to m² internally for SI stress (Pa).</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Original Length (L₀) — mm</label>
            <Input value={origLength} onChange={(e) => setOrigLength(e.target.value)} placeholder="e.g., 1000" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Change in Length (ΔL) — mm</label>
            <Input value={deltaLength} onChange={(e) => setDeltaLength(e.target.value)} placeholder="e.g., 0.5" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Young's Modulus (E) — GPa (used in Force/Area modes)</label>
            <Input value={E_GPa} onChange={(e) => setE_GPa(e.target.value)} placeholder="e.g., 210" />
          </div>

          <div className="flex gap-3">
            <Button onClick={calculate} className="flex-1 custom-color-button" style={{ backgroundColor: primaryColor, color: '#fff' }}>Calculate</Button>
            <Button onClick={reset} variant="outline">Reset</Button>
          </div>

          {error && <p className="text-red-600">{error}</p>}
          {result && (
            <div className="p-4 rounded" style={{ backgroundColor: `${primaryColor}15` }}>
              <p className="text-sm font-medium mb-1" style={{ color: primaryColor }}>Result</p>
              <p className="text-2xl font-semibold font-mono" style={{ color: primaryColor }}>{result}</p>
            </div>
          )}

          <div className="text-xs text-gray-500">
            <p>Formulas used: Stress = F / A, Strain = ΔL / L₀, Young's Modulus E = Stress / Strain</p>
          </div>
        </div>
      </Card>
    </>
  );
}
