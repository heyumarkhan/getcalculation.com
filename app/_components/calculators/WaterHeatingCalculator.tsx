'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'energy' | 'time' | 'temp-rise' | 'mass';

type Result = {
  title: string;
  lines: string[];
};

export default function WaterHeatingCalculator() {
  const [method, setMethod] = useState<Method>('energy');

  // Shared inputs
  const [mass, setMass] = useState('10');
  const [massUnit, setMassUnit] = useState('kg');
  const [startTemp, setStartTemp] = useState('20');
  const [startTempUnit, setStartTempUnit] = useState('C');
  const [targetTemp, setTargetTemp] = useState('60');
  const [targetTempUnit, setTargetTempUnit] = useState('C');
  const [specificHeat, setSpecificHeat] = useState('4186'); // J/(kg·°C) for water

  // Energy input (for temp-rise, mass)
  const [energy, setEnergy] = useState('5000');
  const [energyUnit, setEnergyUnit] = useState('kWh');

  // Power input (for time)
  const [power, setPower] = useState('3');
  const [powerUnit, setPowerUnit] = useState('kW');
  const [efficiency, setEfficiency] = useState('95');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const parsePositive = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const massToKg = (val: number, unit: string) => {
    if (unit === 'kg') return val;
    if (unit === 'g') return val / 1000;
    if (unit === 'lb') return val * 0.45359237;
    if (unit === 'oz') return val * 0.0283495231;
    return val;
  };

  const tempToC = (val: number, unit: string) => {
    if (unit === 'C') return val;
    if (unit === 'F') return (val - 32) * (5 / 9);
    if (unit === 'K') return val - 273.15;
    return val;
  };

  const tempFromC = (valC: number, unit: string) => {
    if (unit === 'C') return valC;
    if (unit === 'F') return valC * 9 / 5 + 32;
    if (unit === 'K') return valC + 273.15;
    return valC;
  };

  const energyToJoules = (val: number, unit: string) => {
    if (unit === 'J') return val;
    if (unit === 'kJ') return val * 1000;
    if (unit === 'kWh') return val * 3_600_000;
    if (unit === 'BTU') return val * 1055.05585;
    return val;
  };

  const powerToWatts = (val: number, unit: string) => {
    if (unit === 'W') return val;
    if (unit === 'kW') return val * 1000;
    if (unit === 'BTU/h') return val * 0.29307107;
    return val;
  };

  const format = (val: number, digits = 3) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1_000_000 || Math.abs(val) < 0.001) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  const handleCalculate = () => {
    setResult(null);
    setCalculation('');

    const mVal = parsePositive(mass);
    const cVal = parsePositive(specificHeat);
    const tStart = parseFloat(startTemp);
    const tTarget = parseFloat(targetTemp);

    if (method !== 'temp-rise') {
      if (isNaN(mVal) || isNaN(cVal) || isNaN(tStart) || isNaN(tTarget)) {
        setCalculation('Please enter valid mass, temperatures, and specific heat.');
        return;
      }
    }

    if (method === 'energy' || method === 'time' || method === 'mass') {
      const mKg = massToKg(mVal, massUnit);
      const tStartC = tempToC(tStart, startTempUnit);
      const tTargetC = tempToC(tTarget, targetTempUnit);
      const deltaT = tTargetC - tStartC;
      if (deltaT <= 0) {
        setCalculation('Target temperature must be higher than start temperature.');
        return;
      }

      const energyJ = mKg * cVal * deltaT;

      if (method === 'energy') {
        setResult({
          title: 'Energy Required',
          lines: [
            `Q = m × c × ΔT = ${format(mKg)} kg × ${format(cVal)} J/(kg·°C) × ${format(deltaT)} °C`,
            `Energy = ${format(energyJ)} J (${format(energyJ / 1000)} kJ)` ,
            `= ${format(energyJ / 3_600_000)} kWh ≈ ${format(energyJ / 1055.05585)} BTU`
          ]
        });
        setCalculation('Computed energy using Q = m × c × ΔT');
        return;
      }

      if (method === 'time') {
        const pVal = parsePositive(power);
        const effVal = parsePositive(efficiency);
        if (isNaN(pVal) || isNaN(effVal)) {
          setCalculation('Please enter valid power and efficiency.');
          return;
        }
        const watts = powerToWatts(pVal, powerUnit);
        const eff = effVal / 100;
        if (eff <= 0 || eff > 1.5) {
          setCalculation('Efficiency should be between 0 and 150%.');
          return;
        }
        const timeSeconds = energyJ / (watts * eff);
        setResult({
          title: 'Heating Time',
          lines: [
            `Time = Energy / (Power × η) = ${format(energyJ)} J / (${format(watts)} W × ${format(eff)})`,
            `Time ≈ ${format(timeSeconds)} s = ${format(timeSeconds / 60)} min = ${format(timeSeconds / 3600)} h`
          ]
        });
        setCalculation('Computed time using heater power and efficiency.');
        return;
      }

      if (method === 'mass') {
        const eVal = parsePositive(energy);
        if (isNaN(eVal)) {
          setCalculation('Please enter valid energy.');
          return;
        }
        const energyInputJ = energyToJoules(eVal, energyUnit);
        const massKg = energyInputJ / (cVal * deltaT);
        setResult({
          title: 'Water Mass Required',
          lines: [
            `m = Q / (c × ΔT) = ${format(energyInputJ)} J / (${format(cVal)} × ${format(deltaT)})`,
            `Mass = ${format(massKg)} kg (≈ ${format(massKg * 2.20462)} lb, ${format(massKg)} liters)`
          ]
        });
        setCalculation('Computed mass from energy, specific heat, and temperature rise.');
        return;
      }
    }

    if (method === 'temp-rise') {
      const mValLocal = parsePositive(mass);
      const eVal = parsePositive(energy);
      const cValLocal = parsePositive(specificHeat);
      const tStartLocal = parseFloat(startTemp);
      if (isNaN(mValLocal) || isNaN(eVal) || isNaN(cValLocal) || isNaN(tStartLocal)) {
        setCalculation('Please enter valid mass, energy, temperatures, and specific heat.');
        return;
      }
      const mKg = massToKg(mValLocal, massUnit);
      const energyInputJ = energyToJoules(eVal, energyUnit);
      const deltaT = energyInputJ / (mKg * cValLocal);
      const startC = tempToC(tStartLocal, startTempUnit);
      const finalC = startC + deltaT;
      const finalOut = tempFromC(finalC, targetTempUnit);
      setResult({
        title: 'Temperature Rise',
        lines: [
          `ΔT = Q / (m × c) = ${format(energyInputJ)} J / (${format(mKg)} kg × ${format(cValLocal)})`,
          `ΔT = ${format(deltaT)} °C; Final temperature ≈ ${format(finalOut)} °${targetTempUnit}`
        ]
      });
      setCalculation('Computed temperature increase from supplied energy.');
      return;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">♨️</span>
          <h1 className="text-2xl font-bold text-gray-900">Water Heating Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Estimate energy, heating time, temperature rise, or required water mass for heating with automatic unit conversions.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'energy' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="energy" checked={method === 'energy'} onChange={() => setMethod('energy')} className="mr-2" />
              Energy required (Q = m × c × ΔT)
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'time' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="time" checked={method === 'time'} onChange={() => setMethod('time')} className="mr-2" />
              Heating time from power
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'temp-rise' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="temp-rise" checked={method === 'temp-rise'} onChange={() => setMethod('temp-rise')} className="mr-2" />
              Temperature rise from energy
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'mass' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="mass" checked={method === 'mass'} onChange={() => setMethod('mass')} className="mr-2" />
              Water mass from energy
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {(method === 'energy' || method === 'time' || method === 'mass' || method === 'temp-rise') && (
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input label="Water Mass" value={mass} onChange={(e) => setMass(e.target.value)} type="number" placeholder="e.g., 10" />
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
                  <Input label="Start Temperature" value={startTemp} onChange={(e) => setStartTemp(e.target.value)} type="number" placeholder="e.g., 20" />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={startTempUnit} onChange={(e) => setStartTempUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="C">°C</option>
                    <option value="F">°F</option>
                    <option value="K">K</option>
                  </select>
                </div>
                <div className="flex-1">
                  <Input label="Target Temperature" value={targetTemp} onChange={(e) => setTargetTemp(e.target.value)} type="number" placeholder="e.g., 60" />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={targetTempUnit} onChange={(e) => setTargetTempUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="C">°C</option>
                    <option value="F">°F</option>
                    <option value="K">K</option>
                  </select>
                </div>
              </div>
              <Input label="Specific Heat (J/kg·°C)" value={specificHeat} onChange={(e) => setSpecificHeat(e.target.value)} type="number" placeholder="4186" />
            </div>
          )}

          {(method === 'temp-rise' || method === 'mass') && (
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input label="Supplied Energy" value={energy} onChange={(e) => setEnergy(e.target.value)} type="number" placeholder="e.g., 5" />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={energyUnit} onChange={(e) => setEnergyUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="J">J</option>
                    <option value="kJ">kJ</option>
                    <option value="kWh">kWh</option>
                    <option value="BTU">BTU</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {method === 'time' && (
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input label="Heater Power" value={power} onChange={(e) => setPower(e.target.value)} type="number" placeholder="e.g., 3" />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={powerUnit} onChange={(e) => setPowerUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="kW">kW</option>
                    <option value="W">W</option>
                    <option value="BTU/h">BTU/h</option>
                  </select>
                </div>
              </div>
              <Input label="Efficiency (%)" value={efficiency} onChange={(e) => setEfficiency(e.target.value)} type="number" placeholder="e.g., 95" />
            </div>
          )}

          <Button onClick={handleCalculate} className="w-full bg-[#820ECC] text-white font-semibold py-3 rounded-lg hover:bg-[#6b0aa6] transition">
            Calculate
          </Button>

          {result && (
            <div className="bg-[#820ECC]/10 border-l-4 border-[#820ECC] p-4 rounded">
              <p className="text-gray-600 text-sm mb-2">{calculation}</p>
              <p className="text-lg font-semibold text-[#820ECC] mb-2">{result.title}</p>
              <ul className="list-disc list-inside text-gray-800 space-y-1">
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
