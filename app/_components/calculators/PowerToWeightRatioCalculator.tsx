'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: W, kg, W/kg)
const powerUnits = {
  'W': { name: 'W (Watts)', factor: 1 },
  'kW': { name: 'kW (Kilowatts)', factor: 1000 },
  'MW': { name: 'MW (Megawatts)', factor: 1000000 },
  'hp': { name: 'hp (Horsepower)', factor: 745.7 },
  'hp_metric': { name: 'hp (Metric)', factor: 735.5 },
  'Btu/h': { name: 'Btu/h', factor: 0.293071 }
};

const weightUnits = {
  'kg': { name: 'kg (Kilograms)', factor: 1 },
  'g': { name: 'g (Grams)', factor: 0.001 },
  'lb': { name: 'lb (Pounds)', factor: 0.453592 },
  'oz': { name: 'oz (Ounces)', factor: 0.0283495 },
  'ton': { name: 'ton (Metric tons)', factor: 1000 },
  'ton_us': { name: 'ton (US tons)', factor: 907.185 }
};

const ratioUnits = {
  'W/kg': { name: 'W/kg', factor: 1, powerUnit: 'W', weightUnit: 'kg' },
  'kW/kg': { name: 'kW/kg', factor: 1000, powerUnit: 'kW', weightUnit: 'kg' },
  'hp/lb': { name: 'hp/lb', factor: 1645.92, powerUnit: 'hp', weightUnit: 'lb' },
  'hp/kg': { name: 'hp/kg', factor: 745.7, powerUnit: 'hp', weightUnit: 'kg' },
  'W/lb': { name: 'W/lb', factor: 2.20462, powerUnit: 'W', weightUnit: 'lb' }
};

export default function PowerToWeightRatioCalculator() {
  const [power, setPower] = useState('');
  const [weight, setWeight] = useState('');
  const [ratio, setRatio] = useState('');
  const [powerUnit, setPowerUnit] = useState('W');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [ratioUnit, setRatioUnit] = useState('W/kg');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'power' | 'weight' | 'ratio' } | null>(null);
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

  const convertPowerToBase = (value: number, unit: string) => {
    return value * powerUnits[unit as keyof typeof powerUnits].factor;
  };

  const convertPowerFromBase = (value: number, unit: string) => {
    return value / powerUnits[unit as keyof typeof powerUnits].factor;
  };

  const convertWeightToBase = (value: number, unit: string) => {
    return value * weightUnits[unit as keyof typeof weightUnits].factor;
  };

  const convertWeightFromBase = (value: number, unit: string) => {
    return value / weightUnits[unit as keyof typeof weightUnits].factor;
  };

  const convertRatioToBase = (value: number, unit: string) => {
    const ratioData = ratioUnits[unit as keyof typeof ratioUnits];
    // Convert ratio to base (W/kg)
    // If ratio is in hp/lb, we need to convert: (hp/lb) = (hp × 745.7 W/hp) / (lb × 0.453592 kg/lb) = W/kg
    const powerFactor = powerUnits[ratioData.powerUnit as keyof typeof powerUnits].factor;
    const weightFactor = weightUnits[ratioData.weightUnit as keyof typeof weightUnits].factor;
    return value * (powerFactor / weightFactor);
  };

  const convertRatioFromBase = (value: number, unit: string) => {
    const ratioData = ratioUnits[unit as keyof typeof ratioUnits];
    const powerFactor = powerUnits[ratioData.powerUnit as keyof typeof powerUnits].factor;
    const weightFactor = weightUnits[ratioData.weightUnit as keyof typeof weightUnits].factor;
    return value / (powerFactor / weightFactor);
  };

  const calculate = () => {
    const p = power ? parseFloat(power) : NaN;
    const w = weight ? parseFloat(weight) : NaN;
    const r = ratio ? parseFloat(ratio) : NaN;

    const filledCount = [power, weight, ratio].filter(val => val !== '').length;

    if (filledCount !== 2) {
      setResult(null);
      setCalculation('');
      return;
    }

    // Validate that filled values are valid numbers
    if (power && (isNaN(p) || p <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for power');
      return;
    }
    if (weight && (isNaN(w) || w <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for weight');
      return;
    }
    if (ratio && (isNaN(r) || r <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for power-to-weight ratio');
      return;
    }

    if (!ratio) {
      // Calculate ratio: P/W = Power / Weight
      const pBase = convertPowerToBase(p, powerUnit);
      const wBase = convertWeightToBase(w, weightUnit);
      
      if (wBase === 0) {
        setResult(null);
        setCalculation('Error: Weight cannot be zero');
        return;
      }
      
      const rBase = pBase / wBase; // in W/kg
      const rResult = convertRatioFromBase(rBase, ratioUnit);
      
      setResult({ value: rResult, unit: ratioUnit, type: 'ratio' });
      setCalculation(`P/W = Power / Weight = ${formatValue(p)} ${powerUnit} / ${formatValue(w)} ${weightUnit} = ${formatValue(rResult)} ${ratioUnit}`);
    } else if (!power) {
      // Calculate power: P = (P/W) × Weight
      const rBase = convertRatioToBase(r, ratioUnit);
      const wBase = convertWeightToBase(w, weightUnit);
      const pBase = rBase * wBase; // in W
      const pResult = convertPowerFromBase(pBase, powerUnit);
      
      setResult({ value: pResult, unit: powerUnit, type: 'power' });
      setCalculation(`P = (P/W) × Weight = ${formatValue(r)} ${ratioUnit} × ${formatValue(w)} ${weightUnit} = ${formatValue(pResult)} ${powerUnit}`);
    } else if (!weight) {
      // Calculate weight: W = Power / (P/W)
      const pBase = convertPowerToBase(p, powerUnit);
      const rBase = convertRatioToBase(r, ratioUnit);
      
      if (rBase === 0) {
        setResult(null);
        setCalculation('Error: Power-to-weight ratio cannot be zero');
        return;
      }
      
      const wBase = pBase / rBase; // in kg
      const wResult = convertWeightFromBase(wBase, weightUnit);
      
      setResult({ value: wResult, unit: weightUnit, type: 'weight' });
      setCalculation(`W = Power / (P/W) = ${formatValue(p)} ${powerUnit} / ${formatValue(r)} ${ratioUnit} = ${formatValue(wResult)} ${weightUnit}`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setPower('');
    setWeight('');
    setRatio('');
    setPowerUnit('W');
    setWeightUnit('kg');
    setRatioUnit('W/kg');
    setResult(null);
    setCalculation('');
  };

  const getResultColor = () => {
    return 'bg-[#820ECC]/10 border-[#820ECC]/30';
  };

  const getResultTextColor = () => {
    return 'text-[#820ECC]';
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Power-to-Weight Ratio Calculator</h2>
        <p className="text-gray-600">Calculate power, weight, or power-to-weight ratio using P/W = Power / Weight</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Power (P)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter power"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={powerUnit}
                onChange={(e) => setPowerUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(powerUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Weight (W)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(weightUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Power-to-Weight Ratio (P/W)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter power-to-weight ratio"
                value={ratio}
                onChange={(e) => setRatio(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={ratioUnit}
                onChange={(e) => setRatioUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(ratioUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button onClick={calculate} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className={`mt-6 p-4 ${getResultColor()} border rounded-lg`}>
            <h3 className={`text-lg font-semibold ${getResultTextColor()} mb-2`}>Result</h3>
            <p className={`text-2xl font-bold ${getResultTextColor()}`}>
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && (
              <p className={`text-sm ${getResultTextColor()}/80 mt-2 font-mono`}>
                {calculation}
              </p>
            )}
          </div>
        )}

        {calculation && calculation.startsWith('Error:') && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-mono">{calculation}</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Enter any two values to calculate the third (P, W, or P/W)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• Formula: P/W = Power / Weight</li>
            <li>• Higher power-to-weight ratio indicates better performance potential</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

