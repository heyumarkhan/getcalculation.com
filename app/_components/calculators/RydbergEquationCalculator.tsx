'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const R_H_DEFAULT = 1.0967758e7; // Rydberg constant for hydrogen in m^-1
const C = 299792458; // speed of light m/s
const H = 6.62607015e-34; // Planck constant J*s
const EV = 1.602176634e-19; // J per eV

type CalcMode = 'wavelength' | 'frequency' | 'energy';

interface RydbergEquationCalculatorProps {
  primaryColor?: string;
}

export default function RydbergEquationCalculator({ primaryColor = '#820ECC' }: RydbergEquationCalculatorProps) {
  const [mode, setMode] = useState<CalcMode>('wavelength');
  const [n1, setN1] = useState('1');
  const [n2, setN2] = useState('2');
  const [rydberg, setRydberg] = useState(String(R_H_DEFAULT));
  const [wavelengthUnit, setWavelengthUnit] = useState<'nm'|'m'>('nm');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  function parsePositiveInt(value: string): number | null {
    const v = Math.floor(Number(value));
    if (!isFinite(v) || v <= 0) return null;
    return v;
  }

  function calculate() {
    setError('');
    setResult('');
    const a = parsePositiveInt(n1);
    const b = parsePositiveInt(n2);
    const R = Number(rydberg);
    if (a === null || b === null) {
      setError('Enter valid positive integers for n₁ and n₂');
      return;
    }
    if (!isFinite(R) || R <= 0) {
      setError('Enter a valid positive Rydberg constant');
      return;
    }
    if (a === b) {
      setError('n₁ and n₂ must be different');
      return;
    }
    // For emission n2 > n1 yields positive delta; for absorption n2 < n1 yields negative
    const term = (1 / (a * a)) - (1 / (b * b));
    const delta = Math.abs(term);
    if (delta === 0) {
      setError('Invalid transition between the specified energy levels');
      return;
    }
    const invLambda = R * delta; // in m^-1
    const lambda_m = 1 / invLambda; // meters
    const frequency = C / lambda_m; // Hz
    const energyJ = H * frequency; // J
    const energyEv = energyJ / EV; // eV

    if (mode === 'wavelength') {
      const val = wavelengthUnit === 'nm' ? lambda_m * 1e9 : lambda_m;
      setResult(`${val.toPrecision(6)} ${wavelengthUnit}`);
      return;
    }
    if (mode === 'frequency') {
      setResult(`${frequency.toExponential(6)} Hz`);
      return;
    }
    if (mode === 'energy') {
      setResult(`${energyEv.toPrecision(6)} eV (${energyJ.toExponential(6)} J)`);
      return;
    }
  }

  function reset() {
    setN1('1');
    setN2('2');
    setRydberg(String(R_H_DEFAULT));
    setResult('');
    setError('');
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-color-button:hover { background-color: ${primaryColor} !important; }
          .custom-color-button:focus { box-shadow: 0 0 0 4px ${primaryColor}66 !important; }
        `
      }} />
      <Card>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold" style={{ color: primaryColor }}>Rydberg Equation Calculator</h3>
        <p className="text-sm text-gray-600">Calculate wavelength, frequency, or photon energy for hydrogen-like transitions using the Rydberg equation.</p>

        <div className="flex gap-2">
          <button onClick={() => setMode('wavelength')} className={`px-3 py-1 rounded ${mode === 'wavelength' ? 'custom-color-button text-white' : 'bg-gray-100'}`} style={mode === 'wavelength' ? { backgroundColor: primaryColor } : undefined}>Wavelength</button>
          <button onClick={() => setMode('frequency')} className={`px-3 py-1 rounded ${mode === 'frequency' ? 'custom-color-button text-white' : 'bg-gray-100'}`} style={mode === 'frequency' ? { backgroundColor: primaryColor } : undefined}>Frequency</button>
          <button onClick={() => setMode('energy')} className={`px-3 py-1 rounded ${mode === 'energy' ? 'custom-color-button text-white' : 'bg-gray-100'}`} style={mode === 'energy' ? { backgroundColor: primaryColor } : undefined}>Energy (eV)</button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Lower energy level (n₁)</label>
          <Input value={n1} onChange={(e) => setN1(e.target.value)} placeholder="e.g. 1" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Upper energy level (n₂)</label>
          <Input value={n2} onChange={(e) => setN2(e.target.value)} placeholder="e.g. 2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Rydberg constant (R) in m⁻¹</label>
          <Input value={rydberg} onChange={(e) => setRydberg(e.target.value)} placeholder={String(R_H_DEFAULT)} />
          <p className="text-xs text-gray-500 mt-1">Default is Rₕ = 1.0967758×10⁷ m⁻¹ (hydrogen). For hydrogen-like ions change R accordingly.</p>
        </div>

        {mode === 'wavelength' && (
          <div className="flex items-center gap-3">
            <label className="text-sm">Unit:</label>
            <select value={wavelengthUnit} onChange={(e) => setWavelengthUnit(e.target.value as 'nm'|'m')} className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
              <option value="nm">nm</option>
              <option value="m">m</option>
            </select>
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1 custom-color-button" size="md" style={{ backgroundColor: primaryColor, color: '#fff' }}>Calculate</Button>
          <Button onClick={reset} variant="outline" size="md">Reset</Button>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        {result && (
          <div className="bg-gray-50 p-3 rounded">
            <p className="font-mono">Result: {result}</p>
          </div>
        )}

        <div className="text-xs text-gray-500">
          <p>Formula used: 1/λ = R × (1/n₁² - 1/n₂²)</p>
        </div>
      </div>
      </Card>
    </>
  );
}
