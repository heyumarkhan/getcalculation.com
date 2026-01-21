'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'ke-from-velocity' | 'velocity-from-ke' | 'gamma-factor' | 'rest-energy';

type Result = {
  lines: string[];
};

export default function RelativisticKineticEnergyCalculator() {
  const [method, setMethod] = useState<Method>('ke-from-velocity');

  // Inputs
  const [mass, setMass] = useState('1');
  const [massUnit, setMassUnit] = useState('kg');
  const [velocity, setVelocity] = useState('100000000');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [kineticEnergy, setKineticEnergy] = useState('');
  const [keUnit, setKeUnit] = useState('J');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const SPEED_OF_LIGHT = 299_792_458; // m/s

  const formatValue = (val: number, digits = 3) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1_000_000 || Math.abs(val) < 0.001) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  const massToKg = (val: number, unit: string) => {
    if (unit === 'kg') return val;
    if (unit === 'g') return val / 1000;
    if (unit === 'u') return val * 1.66053906660e-27; // atomic mass units
    if (unit === 'MeV/c²') return val * 1.78266192e-30; // relativistic mass units
    return val;
  };

  const velocityToMs = (val: number, unit: string) => {
    if (unit === 'm/s') return val;
    if (unit === 'km/s') return val * 1000;
    if (unit === 'c') return val * SPEED_OF_LIGHT;
    return val;
  };

  const energyToJoules = (val: number, unit: string) => {
    if (unit === 'J') return val;
    if (unit === 'kJ') return val * 1000;
    if (unit === 'MJ') return val * 1_000_000;
    if (unit === 'eV') return val * 1.60217663e-19;
    if (unit === 'MeV') return val * 1.60217663e-13;
    if (unit === 'GeV') return val * 1.60217663e-10;
    return val;
  };

  const parsePositive = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const handleCalculate = () => {
    setResult(null);
    setCalculation('');

    const mVal = parsePositive(mass);
    if (isNaN(mVal)) {
      setCalculation('Please enter valid mass.');
      return;
    }

    const mKg = massToKg(mVal, massUnit);

    if (method === 'ke-from-velocity') {
      const vVal = parsePositive(velocity);
      if (isNaN(vVal)) {
        setCalculation('Please enter valid velocity.');
        return;
      }
      const vMs = velocityToMs(vVal, velocityUnit);
      const beta = vMs / SPEED_OF_LIGHT;
      if (beta >= 1) {
        setCalculation('Velocity must be less than speed of light.');
        return;
      }
      const gamma = 1 / Math.sqrt(1 - beta * beta);
      const restEnergy = mKg * SPEED_OF_LIGHT * SPEED_OF_LIGHT;
      const totalEnergy = gamma * restEnergy;
      const keJ = totalEnergy - restEnergy;

      setResult({
        lines: [
          `β = v/c = ${format(vMs)} m/s / ${format(SPEED_OF_LIGHT)} m/s = ${format(beta)}`,
          `γ = 1/√(1-β²) = ${format(gamma)}`,
          `Rest energy E₀ = mc² = ${format(restEnergy)} J`,
          `Total energy E = γmc² = ${format(totalEnergy)} J`,
          `Relativistic KE = (γ-1)mc² = ${format(keJ)} J ≈ ${format(keJ / 1e6)} MJ`
        ]
      });
      setCalculation(`Computed relativistic kinetic energy using γ = ${format(gamma)}`);
      return;
    }

    if (method === 'velocity-from-ke') {
      const keVal = parsePositive(kineticEnergy);
      if (isNaN(keVal)) {
        setCalculation('Please enter valid kinetic energy.');
        return;
      }
      const keJ = energyToJoules(keVal, keUnit);
      const restEnergy = mKg * SPEED_OF_LIGHT * SPEED_OF_LIGHT;
      const gamma = keJ / restEnergy + 1;
      const beta = Math.sqrt(1 - 1 / (gamma * gamma));
      const vMs = beta * SPEED_OF_LIGHT;

      setResult({
        lines: [
          `γ = KE/(mc²) + 1 = ${format(keJ)} / ${format(restEnergy)} + 1 = ${format(gamma)}`,
          `β = √(1 - 1/γ²) = ${format(beta)}`,
          `Velocity v = β × c = ${format(vMs)} m/s ≈ ${format(beta * 100)}% c`
        ]
      });
      setCalculation(`Computed velocity from relativistic kinetic energy using γ = ${format(gamma)}`);
      return;
    }

    if (method === 'gamma-factor') {
      const vVal = parsePositive(velocity);
      if (isNaN(vVal)) {
        setCalculation('Please enter valid velocity.');
        return;
      }
      const vMs = velocityToMs(vVal, velocityUnit);
      const beta = vMs / SPEED_OF_LIGHT;
      if (beta >= 1) {
        setCalculation('Velocity must be less than speed of light.');
        return;
      }
      const gamma = 1 / Math.sqrt(1 - beta * beta);

      setResult({
        lines: [
          `β = v/c = ${format(vMs)} / ${format(SPEED_OF_LIGHT)} = ${format(beta)}`,
          `γ = 1/√(1-β²) = ${format(gamma)}`,
          `Lorentz factor γ indicates relativistic effects are ${format((gamma - 1) * 100)}% stronger than classical`
        ]
      });
      setCalculation(`Computed Lorentz factor (gamma) for velocity ${format(beta * 100)}% of c`);
      return;
    }

    if (method === 'rest-energy') {
      const restEnergy = mKg * SPEED_OF_LIGHT * SPEED_OF_LIGHT;
      setResult({
        lines: [
          `E₀ = mc² = ${format(mKg)} kg × (${format(SPEED_OF_LIGHT)})² m²/s²`,
          `Rest energy = ${format(restEnergy)} J`,
          `= ${format(restEnergy / 1.60217663e-13)} MeV ≈ ${format(restEnergy / 1.60217663e-10)} GeV`
        ]
      });
      setCalculation('Computed rest mass energy using Einstein E = mc²');
      return;
    }
  };

  const format = (val: number, digits = 3) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1_000_000 || Math.abs(val) < 0.001) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">💥</span>
          <h1 className="text-2xl font-bold text-gray-900">Relativistic Kinetic Energy Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate relativistic kinetic energy, velocity, Lorentz factor, or rest mass energy from special relativity.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'ke-from-velocity' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="ke-from-velocity" checked={method === 'ke-from-velocity'} onChange={() => setMethod('ke-from-velocity')} className="mr-2" />
              KE from velocity (γ-1)mc²
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'velocity-from-ke' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="velocity-from-ke" checked={method === 'velocity-from-ke'} onChange={() => setMethod('velocity-from-ke')} className="mr-2" />
              Velocity from KE
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'gamma-factor' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="gamma-factor" checked={method === 'gamma-factor'} onChange={() => setMethod('gamma-factor')} className="mr-2" />
              Lorentz factor γ = 1/√(1-β²)
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'rest-energy' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="rest-energy" checked={method === 'rest-energy'} onChange={() => setMethod('rest-energy')} className="mr-2" />
              Rest mass energy E₀ = mc²
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input label="Mass" value={mass} onChange={(e) => setMass(e.target.value)} type="number" placeholder="e.g., 1" />
            </div>
            <div className="w-28">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
              <select value={massUnit} onChange={(e) => setMassUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="u">u (AMU)</option>
                <option value="MeV/c²">MeV/c²</option>
              </select>
            </div>
          </div>

          {(method === 'ke-from-velocity' || method === 'gamma-factor') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Velocity" value={velocity} onChange={(e) => setVelocity(e.target.value)} type="number" placeholder="e.g., 100000000" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={velocityUnit} onChange={(e) => setVelocityUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="m/s">m/s</option>
                  <option value="km/s">km/s</option>
                  <option value="c">c (% of light speed)</option>
                </select>
              </div>
            </div>
          )}

          {method === 'velocity-from-ke' && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Kinetic Energy" value={kineticEnergy} onChange={(e) => setKineticEnergy(e.target.value)} type="number" placeholder="e.g., 100" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={keUnit} onChange={(e) => setKeUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="J">J</option>
                  <option value="kJ">kJ</option>
                  <option value="MJ">MJ</option>
                  <option value="eV">eV</option>
                  <option value="MeV">MeV</option>
                  <option value="GeV">GeV</option>
                </select>
              </div>
            </div>
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
