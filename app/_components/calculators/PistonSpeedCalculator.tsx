'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMethod = 'piston-speed-from-rpm-stroke' | 'rpm-from-piston-speed-stroke' | 'stroke-from-piston-speed-rpm';

export default function PistonSpeedCalculator() {
  const [method, setMethod] = useState<CalculationMethod>('piston-speed-from-rpm-stroke');
  
  // Piston speed from RPM and stroke
  const [rpm, setRpm] = useState('');
  const [stroke, setStroke] = useState('');
  const [strokeUnit, setStrokeUnit] = useState('mm');
  
  // RPM from piston speed and stroke
  const [pistonSpeed, setPistonSpeed] = useState('');
  const [pistonSpeedUnit, setPistonSpeedUnit] = useState('m/s');
  const [strokeForRpm, setStrokeForRpm] = useState('');
  const [strokeUnitForRpm, setStrokeUnitForRpm] = useState('mm');
  
  // Stroke from piston speed and RPM
  const [pistonSpeedForStroke, setPistonSpeedForStroke] = useState('');
  const [pistonSpeedUnitForStroke, setPistonSpeedUnitForStroke] = useState('m/s');
  const [rpmForStroke, setRpmForStroke] = useState('');
  
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
  const [calculation, setCalculation] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    if (Math.abs(value) >= 1000000) {
      return value.toExponential(4);
    }
    return value.toFixed(4).replace(/\.?0+$/, '');
  };

  const convertStrokeToMm = (value: number, unit: string): number => {
    switch (unit) {
      case 'mm': return value;
      case 'cm': return value * 10;
      case 'm': return value * 1000;
      case 'in': return value * 25.4;
      default: return value;
    }
  };

  const convertStrokeFromMm = (value: number, unit: string): number => {
    switch (unit) {
      case 'mm': return value;
      case 'cm': return value / 10;
      case 'm': return value / 1000;
      case 'in': return value / 25.4;
      default: return value;
    }
  };

  const convertSpeedToMs = (value: number, unit: string): number => {
    switch (unit) {
      case 'm/s': return value;
      case 'km/h': return value / 3.6;
      case 'ft/s': return value * 0.3048;
      case 'mi/h': return value * 0.44704;
      default: return value;
    }
  };

  const convertSpeedFromMs = (value: number, unit: string): number => {
    switch (unit) {
      case 'm/s': return value;
      case 'km/h': return value * 3.6;
      case 'ft/s': return value / 0.3048;
      case 'mi/h': return value / 0.44704;
      default: return value;
    }
  };

  const calculate = () => {
    if (method === 'piston-speed-from-rpm-stroke') {
      const rpmVal = rpm ? parseFloat(rpm) : NaN;
      const strokeMm = convertStrokeToMm(stroke ? parseFloat(stroke) : NaN, strokeUnit);

      if (!rpm || !stroke) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(rpmVal) || isNaN(strokeMm) || rpmVal <= 0 || strokeMm <= 0) {
        setResult(null);
        setCalculation('Error: RPM and stroke must be positive numbers.');
        return;
      }

      // Piston speed formula: Vs = (2 × N × L) / 60,000
      // Where N = RPM, L = stroke in mm, result in m/s
      const pistonSpeedMs = (2 * rpmVal * strokeMm) / 60000;

      setResult({ value: pistonSpeedMs, unit: 'm/s' });
      setCalculation(`Piston Speed = (2 × N × L) / 60,000 = (2 × ${formatValue(rpmVal)} × ${formatValue(strokeMm)}) / 60,000 = ${formatValue(pistonSpeedMs)} m/s`);
    } else if (method === 'rpm-from-piston-speed-stroke') {
      const speedMs = convertSpeedToMs(pistonSpeed ? parseFloat(pistonSpeed) : NaN, pistonSpeedUnit);
      const strokeMm = convertStrokeToMm(strokeForRpm ? parseFloat(strokeForRpm) : NaN, strokeUnitForRpm);

      if (!pistonSpeed || !strokeForRpm) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(speedMs) || isNaN(strokeMm) || speedMs <= 0 || strokeMm <= 0) {
        setResult(null);
        setCalculation('Error: Piston speed and stroke must be positive numbers.');
        return;
      }

      // RPM formula: N = (Vs × 60,000) / (2 × L)
      const rpmVal = (speedMs * 60000) / (2 * strokeMm);

      setResult({ value: rpmVal, unit: 'RPM' });
      setCalculation(`RPM = (Vs × 60,000) / (2 × L) = (${formatValue(speedMs)} × 60,000) / (2 × ${formatValue(strokeMm)}) = ${formatValue(rpmVal)} RPM`);
    } else if (method === 'stroke-from-piston-speed-rpm') {
      const speedMs = convertSpeedToMs(pistonSpeedForStroke ? parseFloat(pistonSpeedForStroke) : NaN, pistonSpeedUnitForStroke);
      const rpmVal = rpmForStroke ? parseFloat(rpmForStroke) : NaN;

      if (!pistonSpeedForStroke || !rpmForStroke) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(speedMs) || isNaN(rpmVal) || speedMs <= 0 || rpmVal <= 0) {
        setResult(null);
        setCalculation('Error: Piston speed and RPM must be positive numbers.');
        return;
      }

      // Stroke formula: L = (Vs × 60,000) / (2 × N)
      const strokeMm = (speedMs * 60000) / (2 * rpmVal);
      const strokeResult = convertStrokeFromMm(strokeMm, 'mm');

      setResult({ value: strokeResult, unit: 'mm' });
      setCalculation(`Stroke = (Vs × 60,000) / (2 × N) = (${formatValue(speedMs)} × 60,000) / (2 × ${formatValue(rpmVal)}) = ${formatValue(strokeMm)} mm`);
    }
  };

  const handleCalculate = () => {
    calculate();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Piston Speed Calculator</h2>
          
          <div className="border-b-2 border-gray-200 pb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Select Calculation Method</label>
            <div className="grid grid-cols-1 gap-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="piston-speed-from-rpm-stroke"
                  checked={method === 'piston-speed-from-rpm-stroke'}
                  onChange={(e) => {
                    setMethod(e.target.value as CalculationMethod);
                    setResult(null);
                    setCalculation('');
                  }}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Find Piston Speed from RPM & Stroke</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="rpm-from-piston-speed-stroke"
                  checked={method === 'rpm-from-piston-speed-stroke'}
                  onChange={(e) => {
                    setMethod(e.target.value as CalculationMethod);
                    setResult(null);
                    setCalculation('');
                  }}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Find RPM from Piston Speed & Stroke</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="stroke-from-piston-speed-rpm"
                  checked={method === 'stroke-from-piston-speed-rpm'}
                  onChange={(e) => {
                    setMethod(e.target.value as CalculationMethod);
                    setResult(null);
                    setCalculation('');
                  }}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Find Stroke from Piston Speed & RPM</span>
              </label>
            </div>
          </div>

          {method === 'piston-speed-from-rpm-stroke' && (
            <div className="space-y-3">
              <Input
                label="RPM (Revolutions Per Minute)"
                value={rpm}
                onChange={(e) => setRpm(e.target.value)}
                placeholder="e.g., 3000"
                type="number"
              />
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Stroke"
                    value={stroke}
                    onChange={(e) => setStroke(e.target.value)}
                    placeholder="e.g., 100"
                    type="number"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={strokeUnit}
                    onChange={(e) => setStrokeUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                    <option value="in">in</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {method === 'rpm-from-piston-speed-stroke' && (
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Piston Speed"
                    value={pistonSpeed}
                    onChange={(e) => setPistonSpeed(e.target.value)}
                    placeholder="e.g., 10"
                    type="number"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={pistonSpeedUnit}
                    onChange={(e) => setPistonSpeedUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="m/s">m/s</option>
                    <option value="km/h">km/h</option>
                    <option value="ft/s">ft/s</option>
                    <option value="mi/h">mi/h</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Stroke"
                    value={strokeForRpm}
                    onChange={(e) => setStrokeForRpm(e.target.value)}
                    placeholder="e.g., 100"
                    type="number"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={strokeUnitForRpm}
                    onChange={(e) => setStrokeUnitForRpm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                    <option value="in">in</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {method === 'stroke-from-piston-speed-rpm' && (
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Piston Speed"
                    value={pistonSpeedForStroke}
                    onChange={(e) => setPistonSpeedForStroke(e.target.value)}
                    placeholder="e.g., 10"
                    type="number"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={pistonSpeedUnitForStroke}
                    onChange={(e) => setPistonSpeedUnitForStroke(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="m/s">m/s</option>
                    <option value="km/h">km/h</option>
                    <option value="ft/s">ft/s</option>
                    <option value="mi/h">mi/h</option>
                  </select>
                </div>
              </div>
              <Input
                label="RPM (Revolutions Per Minute)"
                value={rpmForStroke}
                onChange={(e) => setRpmForStroke(e.target.value)}
                placeholder="e.g., 3000"
                type="number"
              />
            </div>
          )}

          <Button onClick={handleCalculate} className="w-full bg-[#820ECC] text-white font-semibold py-3 rounded-lg hover:bg-[#6b0aa6] transition">
            Calculate
          </Button>

          {result && (
            <div className="bg-[#820ECC]/10 border-l-4 border-[#820ECC] p-4 rounded">
              <p className="text-gray-600 text-sm mb-2">{calculation}</p>
              <p className="text-2xl font-bold text-[#820ECC]">
                {formatValue(result.value)} {result.unit}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
