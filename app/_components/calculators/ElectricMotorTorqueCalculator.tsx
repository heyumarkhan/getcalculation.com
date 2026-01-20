'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMethod = 'power-speed' | 'power-speed-efficiency' | 'current-kt' | 'force-radius';

type Result = {
  value: number;
  unit: string;
  detail: string;
};

export default function ElectricMotorTorqueCalculator() {
  const [method, setMethod] = useState<CalculationMethod>('power-speed');

  // Power + speed
  const [power, setPower] = useState('');
  const [powerUnit, setPowerUnit] = useState('kW');
  const [speed, setSpeed] = useState('1800');
  const [speedUnit, setSpeedUnit] = useState('rpm');

  // Power + efficiency + speed
  const [inputPower, setInputPower] = useState('');
  const [inputPowerUnit, setInputPowerUnit] = useState('kW');
  const [efficiency, setEfficiency] = useState('92');
  const [loadedSpeed, setLoadedSpeed] = useState('1750');
  const [loadedSpeedUnit, setLoadedSpeedUnit] = useState('rpm');

  // Current + torque constant
  const [current, setCurrent] = useState('');
  const [currentUnit, setCurrentUnit] = useState('A');
  const [kt, setKt] = useState('0.5');
  const [ktUnit, setKtUnit] = useState('Nm/A');

  // Force + radius
  const [force, setForce] = useState('');
  const [forceUnit, setForceUnit] = useState('N');
  const [radius, setRadius] = useState('');
  const [radiusUnit, setRadiusUnit] = useState('m');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const formatValue = (value: number): string => {
    if (!isFinite(value)) return 'Invalid';
    if (Math.abs(value) >= 1_000_000 || Math.abs(value) < 0.0001) {
      return value.toExponential(4);
    }
    return value.toFixed(3).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  const powerToWatts = (val: number, unit: string): number => {
    if (unit === 'W') return val;
    if (unit === 'kW') return val * 1000;
    if (unit === 'HP') return val * 745.699872;
    return val;
  };

  const speedToRadPerSec = (val: number, unit: string): number => {
    if (unit === 'rpm') return (val * Math.PI * 2) / 60;
    if (unit === 'rad/s') return val;
    return val;
  };

  const torqueToLbFt = (nm: number): number => nm * 0.737562149;

  const ktToNmPerAmp = (val: number, unit: string): number => {
    if (unit === 'Nm/A') return val;
    if (unit === 'oz-in/A') return val * 0.00706155183333;
    if (unit === 'lb-ft/A') return val * 1.35581795;
    return val;
  };

  const forceToNewtons = (val: number, unit: string): number => {
    if (unit === 'N') return val;
    if (unit === 'lbf') return val * 4.4482216153;
    if (unit === 'kgf') return val * 9.80665;
    return val;
  };

  const radiusToMeters = (val: number, unit: string): number => {
    if (unit === 'm') return val;
    if (unit === 'cm') return val / 100;
    if (unit === 'mm') return val / 1000;
    if (unit === 'in') return val * 0.0254;
    if (unit === 'ft') return val * 0.3048;
    return val;
  };

  const handleCalculate = () => {
    setResult(null);
    setCalculation('');

    try {
      if (method === 'power-speed') {
        const pVal = parseFloat(power);
        const nVal = parseFloat(speed);
        if (isNaN(pVal) || isNaN(nVal) || pVal <= 0 || nVal <= 0) {
          setCalculation('Enter positive power and speed values.');
          return;
        }
        const watts = powerToWatts(pVal, powerUnit);
        const radPerSec = speedToRadPerSec(nVal, speedUnit);
        const torqueNm = watts / radPerSec;
        const torqueLbFt = torqueToLbFt(torqueNm);
        setResult({ value: torqueNm, unit: 'N·m', detail: `${formatValue(torqueLbFt)} lb·ft` });
        setCalculation(`τ = P / ω = ${formatValue(watts)} W / ${formatValue(radPerSec)} rad/s`);
        return;
      }

      if (method === 'power-speed-efficiency') {
        const pVal = parseFloat(inputPower);
        const nVal = parseFloat(loadedSpeed);
        const effVal = parseFloat(efficiency);
        if (isNaN(pVal) || isNaN(nVal) || isNaN(effVal) || pVal <= 0 || nVal <= 0 || effVal <= 0) {
          setCalculation('Enter positive power, speed, and efficiency values.');
          return;
        }
        const wattsIn = powerToWatts(pVal, inputPowerUnit);
        const wattsOut = wattsIn * (effVal / 100);
        const radPerSec = speedToRadPerSec(nVal, loadedSpeedUnit);
        const torqueNm = wattsOut / radPerSec;
        const torqueLbFt = torqueToLbFt(torqueNm);
        setResult({ value: torqueNm, unit: 'N·m', detail: `${formatValue(torqueLbFt)} lb·ft` });
        setCalculation(`τ = (P_in × η) / ω = ${formatValue(wattsOut)} W / ${formatValue(radPerSec)} rad/s`);
        return;
      }

      if (method === 'current-kt') {
        const iVal = parseFloat(current);
        const ktVal = parseFloat(kt);
        if (isNaN(iVal) || isNaN(ktVal) || iVal <= 0 || ktVal <= 0) {
          setCalculation('Enter positive current and torque constant values.');
          return;
        }
        const ktNmPerA = ktToNmPerAmp(ktVal, ktUnit);
        const torqueNm = ktNmPerA * iVal;
        const torqueLbFt = torqueToLbFt(torqueNm);
        setResult({ value: torqueNm, unit: 'N·m', detail: `${formatValue(torqueLbFt)} lb·ft` });
        setCalculation(`τ = Kt × I = ${formatValue(ktNmPerA)} N·m/A × ${formatValue(iVal)} A`);
        return;
      }

      if (method === 'force-radius') {
        const fVal = parseFloat(force);
        const rVal = parseFloat(radius);
        if (isNaN(fVal) || isNaN(rVal) || fVal <= 0 || rVal <= 0) {
          setCalculation('Enter positive force and radius values.');
          return;
        }
        const newtons = forceToNewtons(fVal, forceUnit);
        const meters = radiusToMeters(rVal, radiusUnit);
        const torqueNm = newtons * meters;
        const torqueLbFt = torqueToLbFt(torqueNm);
        setResult({ value: torqueNm, unit: 'N·m', detail: `${formatValue(torqueLbFt)} lb·ft` });
        setCalculation(`τ = F × r = ${formatValue(newtons)} N × ${formatValue(meters)} m`);
        return;
      }
    } catch (err) {
      setCalculation('Calculation error: please check your inputs.');
      setResult(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🖤</span>
          <h1 className="text-2xl font-bold text-gray-900">Electric Motor Torque Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Compute motor shaft torque from power, speed, current, torque constant, or force-radius inputs with unit conversions.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'power-speed' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input
                type="radio"
                name="method"
                value="power-speed"
                checked={method === 'power-speed'}
                onChange={() => setMethod('power-speed')}
                className="mr-2"
              />
              Torque from output power & speed
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'power-speed-efficiency' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input
                type="radio"
                name="method"
                value="power-speed-efficiency"
                checked={method === 'power-speed-efficiency'}
                onChange={() => setMethod('power-speed-efficiency')}
                className="mr-2"
              />
              Torque from input power, efficiency & speed
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'current-kt' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input
                type="radio"
                name="method"
                value="current-kt"
                checked={method === 'current-kt'}
                onChange={() => setMethod('current-kt')}
                className="mr-2"
              />
              Torque from motor constant & current
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'force-radius' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input
                type="radio"
                name="method"
                value="force-radius"
                checked={method === 'force-radius'}
                onChange={() => setMethod('force-radius')}
                className="mr-2"
              />
              Torque from force and radius
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {method === 'power-speed' && (
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Output Power"
                    value={power}
                    onChange={(e) => setPower(e.target.value)}
                    placeholder="e.g., 3.7"
                    type="number"
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={powerUnit}
                    onChange={(e) => setPowerUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="kW">kW</option>
                    <option value="W">W</option>
                    <option value="HP">HP</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Speed"
                    value={speed}
                    onChange={(e) => setSpeed(e.target.value)}
                    placeholder="e.g., 1800"
                    type="number"
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={speedUnit}
                    onChange={(e) => setSpeedUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="rpm">rpm</option>
                    <option value="rad/s">rad/s</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {method === 'power-speed-efficiency' && (
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Input Power"
                    value={inputPower}
                    onChange={(e) => setInputPower(e.target.value)}
                    placeholder="e.g., 5"
                    type="number"
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={inputPowerUnit}
                    onChange={(e) => setInputPowerUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="kW">kW</option>
                    <option value="W">W</option>
                    <option value="HP">HP</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Efficiency (%)"
                    value={efficiency}
                    onChange={(e) => setEfficiency(e.target.value)}
                    placeholder="e.g., 92"
                    type="number"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    label="Speed"
                    value={loadedSpeed}
                    onChange={(e) => setLoadedSpeed(e.target.value)}
                    placeholder="e.g., 1750"
                    type="number"
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={loadedSpeedUnit}
                    onChange={(e) => setLoadedSpeedUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="rpm">rpm</option>
                    <option value="rad/s">rad/s</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {method === 'current-kt' && (
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Current"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    placeholder="e.g., 8"
                    type="number"
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={currentUnit}
                    onChange={(e) => setCurrentUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="A">A</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Torque Constant (Kt)"
                    value={kt}
                    onChange={(e) => setKt(e.target.value)}
                    placeholder="e.g., 0.5"
                    type="number"
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={ktUnit}
                    onChange={(e) => setKtUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="Nm/A">N·m/A</option>
                    <option value="oz-in/A">oz-in/A</option>
                    <option value="lb-ft/A">lb·ft/A</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {method === 'force-radius' && (
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Force"
                    value={force}
                    onChange={(e) => setForce(e.target.value)}
                    placeholder="e.g., 120"
                    type="number"
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={forceUnit}
                    onChange={(e) => setForceUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="N">N</option>
                    <option value="lbf">lbf</option>
                    <option value="kgf">kgf</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Radius"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    placeholder="e.g., 0.25"
                    type="number"
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={radiusUnit}
                    onChange={(e) => setRadiusUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="m">m</option>
                    <option value="cm">cm</option>
                    <option value="mm">mm</option>
                    <option value="in">in</option>
                    <option value="ft">ft</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={handleCalculate}
            className="w-full bg-[#820ECC] text-white font-semibold py-3 rounded-lg hover:bg-[#6b0aa6] transition"
          >
            Calculate
          </Button>

          {result && (
            <div className="bg-[#820ECC]/10 border-l-4 border-[#820ECC] p-4 rounded">
              <p className="text-gray-600 text-sm mb-2">{calculation}</p>
              <p className="text-2xl font-bold text-[#820ECC]">
                {formatValue(result.value)} {result.unit}
              </p>
              <p className="text-sm text-gray-700 mt-1">{result.detail}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
