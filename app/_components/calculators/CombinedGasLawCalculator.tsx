'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'final-state' | 'initial-state' | 'pressure-change' | 'volume-change';

type Result = {
  lines: string[];
};

export default function CombinedGasLawCalculator() {
  const [method, setMethod] = useState<Method>('final-state');

  const [pressure1, setPressure1] = useState('101325');
  const [pressure1Unit, setPressure1Unit] = useState('Pa');
  const [volume1, setVolume1] = useState('1');
  const [volume1Unit, setVolume1Unit] = useState('m3');
  const [temperature1, setTemperature1] = useState('273.15');
  const [temperature1Unit, setTemperature1Unit] = useState('K');
  
  const [pressure2, setPressure2] = useState('202650');
  const [pressure2Unit, setPressure2Unit] = useState('Pa');
  const [volume2, setVolume2] = useState('0.5');
  const [volume2Unit, setVolume2Unit] = useState('m3');
  const [temperature2, setTemperature2] = useState('273.15');
  const [temperature2Unit, setTemperature2Unit] = useState('K');

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
      case 'atm': return val * 101325;
      case 'bar': return val * 100000;
      case 'psi': return val * 6894.76;
      case 'mmHg': return val * 133.322;
      default: return val;
    }
  };

  const paToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'Pa': return val;
      case 'kPa': return val / 1000;
      case 'atm': return val / 101325;
      case 'bar': return val / 100000;
      case 'psi': return val / 6894.76;
      case 'mmHg': return val / 133.322;
      default: return val;
    }
  };

  const volumeToM3 = (val: number, unit: string) => {
    switch (unit) {
      case 'm3': return val;
      case 'L': return val / 1000;
      case 'mL': return val / 1_000_000;
      case 'cm3': return val / 1_000_000;
      case 'ft3': return val * 0.0283168;
      default: return val;
    }
  };

  const m3ToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'm3': return val;
      case 'L': return val * 1000;
      case 'mL': return val * 1_000_000;
      case 'cm3': return val * 1_000_000;
      case 'ft3': return val / 0.0283168;
      default: return val;
    }
  };

  const tempToKelvin = (val: number, unit: string) => {
    switch (unit) {
      case 'K': return val;
      case 'C': return val + 273.15;
      case 'F': return (val - 32) * 5/9 + 273.15;
      default: return val;
    }
  };

  const kelvinToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'K': return val;
      case 'C': return val - 273.15;
      case 'F': return (val - 273.15) * 9/5 + 32;
      default: return val;
    }
  };

  const parsePositive = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const handleCalculate = () => {
    setResult(null);
    setCalculation('');

    if (method === 'final-state') {
      const p1Val = parsePositive(pressure1);
      const v1Val = parsePositive(volume1);
      const t1Val = parsePositive(temperature1);
      const p2Val = parsePositive(pressure2);
      const v2Val = parsePositive(volume2);

      if (isNaN(p1Val) || isNaN(v1Val) || isNaN(t1Val) || isNaN(p2Val) || isNaN(v2Val)) {
        setCalculation('Please enter valid P₁, V₁, T₁, P₂, V₂.');
        return;
      }

      const P1 = pressureToPa(p1Val, pressure1Unit);
      const V1 = volumeToM3(v1Val, volume1Unit);
      const T1 = tempToKelvin(t1Val, temperature1Unit);
      const P2 = pressureToPa(p2Val, pressure2Unit);
      const V2 = volumeToM3(v2Val, volume2Unit);

      // (P1·V1)/T1 = (P2·V2)/T2 → T2 = (P2·V2·T1)/(P1·V1)
      const T2 = (P2 * V2 * T1) / (P1 * V1);
      const T2Out = kelvinToUnit(T2, temperature2Unit);

      setResult({
        lines: [
          `Initial: P₁ = ${format(paToUnit(P1, pressure1Unit))} ${pressure1Unit}, V₁ = ${format(m3ToUnit(V1, volume1Unit))} ${volume1Unit}, T₁ = ${format(kelvinToUnit(T1, temperature1Unit))} ${temperature1Unit}`,
          `Final: P₂ = ${format(paToUnit(P2, pressure2Unit))} ${pressure2Unit}, V₂ = ${format(m3ToUnit(V2, volume2Unit))} ${volume2Unit}`,
          `Final temperature T₂ = ${format(T2Out)} ${temperature2Unit} (${format(T2)} K)`,
          `Combined gas law: (P₁V₁)/T₁ = (P₂V₂)/T₂`
        ]
      });
      setCalculation('Computed final temperature using combined gas law.');
      return;
    }

    if (method === 'initial-state') {
      const p1Val = parsePositive(pressure1);
      const t1Val = parsePositive(temperature1);
      const p2Val = parsePositive(pressure2);
      const v2Val = parsePositive(volume2);
      const t2Val = parsePositive(temperature2);

      if (isNaN(p1Val) || isNaN(t1Val) || isNaN(p2Val) || isNaN(v2Val) || isNaN(t2Val)) {
        setCalculation('Please enter valid P₁, T₁, P₂, V₂, T₂.');
        return;
      }

      const P1 = pressureToPa(p1Val, pressure1Unit);
      const T1 = tempToKelvin(t1Val, temperature1Unit);
      const P2 = pressureToPa(p2Val, pressure2Unit);
      const V2 = volumeToM3(v2Val, volume2Unit);
      const T2 = tempToKelvin(t2Val, temperature2Unit);

      // V1 = (P2·V2·T1)/(P1·T2)
      const V1 = (P2 * V2 * T1) / (P1 * T2);
      const V1Out = m3ToUnit(V1, volume1Unit);

      setResult({
        lines: [
          `Initial: P₁ = ${format(paToUnit(P1, pressure1Unit))} ${pressure1Unit}, T₁ = ${format(kelvinToUnit(T1, temperature1Unit))} ${temperature1Unit}`,
          `Final: P₂ = ${format(paToUnit(P2, pressure2Unit))} ${pressure2Unit}, V₂ = ${format(m3ToUnit(V2, volume2Unit))} ${volume2Unit}, T₂ = ${format(kelvinToUnit(T2, temperature2Unit))} ${temperature2Unit}`,
          `Initial volume V₁ = ${format(V1Out)} ${volume1Unit} (${format(V1)} m³)`,
          `Combined gas law: (P₁V₁)/T₁ = (P₂V₂)/T₂`
        ]
      });
      setCalculation('Computed initial volume using combined gas law.');
      return;
    }

    if (method === 'pressure-change') {
      const p1Val = parsePositive(pressure1);
      const v1Val = parsePositive(volume1);
      const t1Val = parsePositive(temperature1);
      const v2Val = parsePositive(volume2);
      const t2Val = parsePositive(temperature2);

      if (isNaN(p1Val) || isNaN(v1Val) || isNaN(t1Val) || isNaN(v2Val) || isNaN(t2Val)) {
        setCalculation('Please enter valid P₁, V₁, T₁, V₂, T₂.');
        return;
      }

      const P1 = pressureToPa(p1Val, pressure1Unit);
      const V1 = volumeToM3(v1Val, volume1Unit);
      const T1 = tempToKelvin(t1Val, temperature1Unit);
      const V2 = volumeToM3(v2Val, volume2Unit);
      const T2 = tempToKelvin(t2Val, temperature2Unit);

      // P2 = (P1·V1·T2)/(V2·T1)
      const P2 = (P1 * V1 * T2) / (V2 * T1);
      const P2Out = paToUnit(P2, pressure2Unit);

      setResult({
        lines: [
          `Initial: P₁ = ${format(paToUnit(P1, pressure1Unit))} ${pressure1Unit}, V₁ = ${format(m3ToUnit(V1, volume1Unit))} ${volume1Unit}, T₁ = ${format(kelvinToUnit(T1, temperature1Unit))} ${temperature1Unit}`,
          `Final: V₂ = ${format(m3ToUnit(V2, volume2Unit))} ${volume2Unit}, T₂ = ${format(kelvinToUnit(T2, temperature2Unit))} ${temperature2Unit}`,
          `Final pressure P₂ = ${format(P2Out)} ${pressure2Unit} (${format(P2)} Pa)`,
          `Combined gas law: (P₁V₁)/T₁ = (P₂V₂)/T₂`
        ]
      });
      setCalculation('Computed final pressure using combined gas law.');
      return;
    }

    if (method === 'volume-change') {
      const p1Val = parsePositive(pressure1);
      const v1Val = parsePositive(volume1);
      const t1Val = parsePositive(temperature1);
      const p2Val = parsePositive(pressure2);
      const t2Val = parsePositive(temperature2);

      if (isNaN(p1Val) || isNaN(v1Val) || isNaN(t1Val) || isNaN(p2Val) || isNaN(t2Val)) {
        setCalculation('Please enter valid P₁, V₁, T₁, P₂, T₂.');
        return;
      }

      const P1 = pressureToPa(p1Val, pressure1Unit);
      const V1 = volumeToM3(v1Val, volume1Unit);
      const T1 = tempToKelvin(t1Val, temperature1Unit);
      const P2 = pressureToPa(p2Val, pressure2Unit);
      const T2 = tempToKelvin(t2Val, temperature2Unit);

      // V2 = (P1·V1·T2)/(P2·T1)
      const V2 = (P1 * V1 * T2) / (P2 * T1);
      const V2Out = m3ToUnit(V2, volume2Unit);

      setResult({
        lines: [
          `Initial: P₁ = ${format(paToUnit(P1, pressure1Unit))} ${pressure1Unit}, V₁ = ${format(m3ToUnit(V1, volume1Unit))} ${volume1Unit}, T₁ = ${format(kelvinToUnit(T1, temperature1Unit))} ${temperature1Unit}`,
          `Final: P₂ = ${format(paToUnit(P2, pressure2Unit))} ${pressure2Unit}, T₂ = ${format(kelvinToUnit(T2, temperature2Unit))} ${temperature2Unit}`,
          `Final volume V₂ = ${format(V2Out)} ${volume2Unit} (${format(V2)} m³)`,
          `Combined gas law: (P₁V₁)/T₁ = (P₂V₂)/T₂`
        ]
      });
      setCalculation('Computed final volume using combined gas law.');
      return;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🧪</span>
          <h1 className="text-2xl font-bold text-gray-900">Combined Gas Law Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate gas state changes using combined gas law relating pressure, volume, and temperature.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'final-state' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="final-state" checked={method === 'final-state'} onChange={() => setMethod('final-state')} className="mr-2" />
              Find final temperature
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'initial-state' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="initial-state" checked={method === 'initial-state'} onChange={() => setMethod('initial-state')} className="mr-2" />
              Find initial volume
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'pressure-change' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="pressure-change" checked={method === 'pressure-change'} onChange={() => setMethod('pressure-change')} className="mr-2" />
              Find final pressure
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'volume-change' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="volume-change" checked={method === 'volume-change'} onChange={() => setMethod('volume-change')} className="mr-2" />
              Find final volume
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">Initial State</h3>
          
          {(method === 'final-state' || method === 'pressure-change' || method === 'volume-change') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Pressure P₁" value={pressure1} onChange={(e) => setPressure1(e.target.value)} type="number" placeholder="e.g., 101325" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={pressure1Unit} onChange={(e) => setPressure1Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="Pa">Pa</option>
                  <option value="kPa">kPa</option>
                  <option value="atm">atm</option>
                  <option value="bar">bar</option>
                  <option value="psi">psi</option>
                  <option value="mmHg">mmHg</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'final-state' || method === 'pressure-change' || method === 'volume-change') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Volume V₁" value={volume1} onChange={(e) => setVolume1(e.target.value)} type="number" placeholder="e.g., 1" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={volume1Unit} onChange={(e) => setVolume1Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="m3">m³</option>
                  <option value="L">L</option>
                  <option value="mL">mL</option>
                  <option value="cm3">cm³</option>
                  <option value="ft3">ft³</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'final-state' || method === 'initial-state' || method === 'pressure-change' || method === 'volume-change') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Temperature T₁" value={temperature1} onChange={(e) => setTemperature1(e.target.value)} type="number" placeholder="e.g., 273.15" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={temperature1Unit} onChange={(e) => setTemperature1Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="K">K</option>
                  <option value="C">°C</option>
                  <option value="F">°F</option>
                </select>
              </div>
            </div>
          )}

          <h3 className="text-sm font-semibold text-gray-700 pt-2">Final State</h3>

          {(method === 'final-state' || method === 'initial-state' || method === 'volume-change') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Pressure P₂" value={pressure2} onChange={(e) => setPressure2(e.target.value)} type="number" placeholder="e.g., 202650" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={pressure2Unit} onChange={(e) => setPressure2Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="Pa">Pa</option>
                  <option value="kPa">kPa</option>
                  <option value="atm">atm</option>
                  <option value="bar">bar</option>
                  <option value="psi">psi</option>
                  <option value="mmHg">mmHg</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'final-state' || method === 'initial-state' || method === 'pressure-change') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Volume V₂" value={volume2} onChange={(e) => setVolume2(e.target.value)} type="number" placeholder="e.g., 0.5" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={volume2Unit} onChange={(e) => setVolume2Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="m3">m³</option>
                  <option value="L">L</option>
                  <option value="mL">mL</option>
                  <option value="cm3">cm³</option>
                  <option value="ft3">ft³</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'initial-state' || method === 'pressure-change' || method === 'volume-change') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Temperature T₂" value={temperature2} onChange={(e) => setTemperature2(e.target.value)} type="number" placeholder="e.g., 273.15" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={temperature2Unit} onChange={(e) => setTemperature2Unit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="K">K</option>
                  <option value="C">°C</option>
                  <option value="F">°F</option>
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
