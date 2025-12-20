'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: J, kg, J/(kg·K), K)
const heatEnergyUnits = {
  'J': { name: 'J (Joules)', factor: 1 },
  'kJ': { name: 'kJ (Kilojoules)', factor: 1000 },
  'cal': { name: 'cal (Calories)', factor: 4.184 },
  'kcal': { name: 'kcal (Kilocalories)', factor: 4184 },
  'BTU': { name: 'BTU', factor: 1055.06 },
  'Wh': { name: 'Wh (Watt-hours)', factor: 3600 }
};

const massUnits = {
  'kg': { name: 'kg', factor: 1 },
  'g': { name: 'g', factor: 0.001 },
  'lb': { name: 'lb', factor: 0.453592 },
  'oz': { name: 'oz', factor: 0.0283495 }
};

const specificHeatUnits = {
  'J/(kg·K)': { name: 'J/(kg·K)', factor: 1 },
  'kJ/(kg·K)': { name: 'kJ/(kg·K)', factor: 1000 },
  'cal/(g·°C)': { name: 'cal/(g·°C)', factor: 4184 },
  'kcal/(kg·°C)': { name: 'kcal/(kg·°C)', factor: 4184 },
  'BTU/(lb·°F)': { name: 'BTU/(lb·°F)', factor: 4186.8 }
};

const temperatureUnits = {
  'K': { name: 'K (Kelvin)', factor: 1, offset: 0 },
  '°C': { name: '°C (Celsius)', factor: 1, offset: 273.15 },
  '°F': { name: '°F (Fahrenheit)', factor: 5/9, offset: 459.67 }
};

export default function SpecificHeatCalculator() {
  const [heatEnergy, setHeatEnergy] = useState('');
  const [mass, setMass] = useState('');
  const [specificHeat, setSpecificHeat] = useState('');
  const [initialTemp, setInitialTemp] = useState('');
  const [finalTemp, setFinalTemp] = useState('');
  const [heatEnergyUnit, setHeatEnergyUnit] = useState('J');
  const [massUnit, setMassUnit] = useState('kg');
  const [specificHeatUnit, setSpecificHeatUnit] = useState('J/(kg·K)');
  const [tempUnit, setTempUnit] = useState('°C');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'heat' | 'mass' | 'specificHeat' | 'tempChange' } | null>(null);
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

  const convertHeatEnergyToBase = (value: number, unit: string) => {
    return value * heatEnergyUnits[unit as keyof typeof heatEnergyUnits].factor;
  };

  const convertHeatEnergyFromBase = (value: number, unit: string) => {
    return value / heatEnergyUnits[unit as keyof typeof heatEnergyUnits].factor;
  };

  const convertMassToBase = (value: number, unit: string) => {
    return value * massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertMassFromBase = (value: number, unit: string) => {
    return value / massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertSpecificHeatToBase = (value: number, unit: string) => {
    return value * specificHeatUnits[unit as keyof typeof specificHeatUnits].factor;
  };

  const convertSpecificHeatFromBase = (value: number, unit: string) => {
    return value / specificHeatUnits[unit as keyof typeof specificHeatUnits].factor;
  };

  const convertTempToKelvin = (value: number, unit: string) => {
    const tempData = temperatureUnits[unit as keyof typeof temperatureUnits];
    return value * tempData.factor + tempData.offset;
  };

  const convertTempFromKelvin = (value: number, unit: string) => {
    const tempData = temperatureUnits[unit as keyof typeof temperatureUnits];
    return (value - tempData.offset) / tempData.factor;
  };

  const calculate = () => {
    const q = heatEnergy ? parseFloat(heatEnergy) : NaN;
    const m = mass ? parseFloat(mass) : NaN;
    const c = specificHeat ? parseFloat(specificHeat) : NaN;
    const t1 = initialTemp ? parseFloat(initialTemp) : NaN;
    const t2 = finalTemp ? parseFloat(finalTemp) : NaN;

    const filledCount = [heatEnergy, mass, specificHeat, initialTemp, finalTemp].filter(val => val !== '').length;

    if (filledCount !== 4) {
      setResult(null);
      setCalculation('');
      return;
    }

    // Validate that filled values are valid numbers
    if (heatEnergy && (isNaN(q) || q <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for heat energy');
      return;
    }
    if (mass && (isNaN(m) || m <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for mass');
      return;
    }
    if (specificHeat && (isNaN(c) || c <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for specific heat');
      return;
    }
    if (initialTemp && isNaN(t1)) {
      setResult(null);
      setCalculation('Error: Please enter a valid number for initial temperature');
      return;
    }
    if (finalTemp && isNaN(t2)) {
      setResult(null);
      setCalculation('Error: Please enter a valid number for final temperature');
      return;
    }

    // Convert all to base units
    let qBase: number;
    let mBase: number;
    let cBase: number;
    let deltaTBase: number;

    if (!heatEnergy) {
      // Calculate heat energy: Q = m × c × ΔT
      mBase = convertMassToBase(m, massUnit);
      cBase = convertSpecificHeatToBase(c, specificHeatUnit);
      const t1Base = convertTempToKelvin(t1, tempUnit);
      const t2Base = convertTempToKelvin(t2, tempUnit);
      deltaTBase = Math.abs(t2Base - t1Base);
      
      qBase = mBase * cBase * deltaTBase;
      const qResult = convertHeatEnergyFromBase(qBase, heatEnergyUnit);
      
      setResult({ value: qResult, unit: heatEnergyUnit, type: 'heat' });
      setCalculation(`Q = m × c × ΔT = ${formatValue(m)} ${massUnit} × ${formatValue(c)} ${specificHeatUnit} × ${formatValue(Math.abs(t2 - t1))} ${tempUnit} = ${formatValue(qResult)} ${heatEnergyUnit}`);
    } else if (!mass) {
      // Calculate mass: m = Q / (c × ΔT)
      qBase = convertHeatEnergyToBase(q, heatEnergyUnit);
      cBase = convertSpecificHeatToBase(c, specificHeatUnit);
      const t1Base = convertTempToKelvin(t1, tempUnit);
      const t2Base = convertTempToKelvin(t2, tempUnit);
      deltaTBase = Math.abs(t2Base - t1Base);
      
      if (deltaTBase === 0 || cBase === 0) {
        setResult(null);
        setCalculation('Error: Temperature change or specific heat cannot be zero');
        return;
      }
      
      mBase = qBase / (cBase * deltaTBase);
      const mResult = convertMassFromBase(mBase, massUnit);
      
      setResult({ value: mResult, unit: massUnit, type: 'mass' });
      setCalculation(`m = Q / (c × ΔT) = ${formatValue(q)} ${heatEnergyUnit} / (${formatValue(c)} ${specificHeatUnit} × ${formatValue(Math.abs(t2 - t1))} ${tempUnit}) = ${formatValue(mResult)} ${massUnit}`);
    } else if (!specificHeat) {
      // Calculate specific heat: c = Q / (m × ΔT)
      qBase = convertHeatEnergyToBase(q, heatEnergyUnit);
      mBase = convertMassToBase(m, massUnit);
      const t1Base = convertTempToKelvin(t1, tempUnit);
      const t2Base = convertTempToKelvin(t2, tempUnit);
      deltaTBase = Math.abs(t2Base - t1Base);
      
      if (deltaTBase === 0 || mBase === 0) {
        setResult(null);
        setCalculation('Error: Temperature change or mass cannot be zero');
        return;
      }
      
      cBase = qBase / (mBase * deltaTBase);
      const cResult = convertSpecificHeatFromBase(cBase, specificHeatUnit);
      
      setResult({ value: cResult, unit: specificHeatUnit, type: 'specificHeat' });
      setCalculation(`c = Q / (m × ΔT) = ${formatValue(q)} ${heatEnergyUnit} / (${formatValue(m)} ${massUnit} × ${formatValue(Math.abs(t2 - t1))} ${tempUnit}) = ${formatValue(cResult)} ${specificHeatUnit}`);
    } else if (!initialTemp) {
      // Calculate initial temperature: T1 = T2 - (Q / (m × c))
      qBase = convertHeatEnergyToBase(q, heatEnergyUnit);
      mBase = convertMassToBase(m, massUnit);
      cBase = convertSpecificHeatToBase(c, specificHeatUnit);
      const t2Base = convertTempToKelvin(t2, tempUnit);
      
      if (mBase === 0 || cBase === 0) {
        setResult(null);
        setCalculation('Error: Mass or specific heat cannot be zero');
        return;
      }
      
      deltaTBase = qBase / (mBase * cBase);
      const t1Base = t2Base - deltaTBase;
      const t1Result = convertTempFromKelvin(t1Base, tempUnit);
      
      setResult({ value: t1Result, unit: tempUnit, type: 'tempChange' });
      setCalculation(`T₁ = T₂ - (Q / (m × c)) = ${formatValue(t2)} ${tempUnit} - (${formatValue(q)} ${heatEnergyUnit} / (${formatValue(m)} ${massUnit} × ${formatValue(c)} ${specificHeatUnit})) = ${formatValue(t1Result)} ${tempUnit}`);
    } else if (!finalTemp) {
      // Calculate final temperature: T2 = T1 + (Q / (m × c))
      qBase = convertHeatEnergyToBase(q, heatEnergyUnit);
      mBase = convertMassToBase(m, massUnit);
      cBase = convertSpecificHeatToBase(c, specificHeatUnit);
      const t1Base = convertTempToKelvin(t1, tempUnit);
      
      if (mBase === 0 || cBase === 0) {
        setResult(null);
        setCalculation('Error: Mass or specific heat cannot be zero');
        return;
      }
      
      deltaTBase = qBase / (mBase * cBase);
      const t2Base = t1Base + deltaTBase;
      const t2Result = convertTempFromKelvin(t2Base, tempUnit);
      
      setResult({ value: t2Result, unit: tempUnit, type: 'tempChange' });
      setCalculation(`T₂ = T₁ + (Q / (m × c)) = ${formatValue(t1)} ${tempUnit} + (${formatValue(q)} ${heatEnergyUnit} / (${formatValue(m)} ${massUnit} × ${formatValue(c)} ${specificHeatUnit})) = ${formatValue(t2Result)} ${tempUnit}`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setHeatEnergy('');
    setMass('');
    setSpecificHeat('');
    setInitialTemp('');
    setFinalTemp('');
    setHeatEnergyUnit('J');
    setMassUnit('kg');
    setSpecificHeatUnit('J/(kg·K)');
    setTempUnit('°C');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Specific Heat Calculator</h2>
        <p className="text-gray-600">Calculate heat energy, mass, specific heat, or temperature change using Q = m × c × ΔT</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Heat Energy (Q)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter heat energy"
                value={heatEnergy}
                onChange={(e) => setHeatEnergy(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={heatEnergyUnit}
                onChange={(e) => setHeatEnergyUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(heatEnergyUnits).map(([key, unit]) => (
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
            Mass (m)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter mass"
                value={mass}
                onChange={(e) => setMass(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-32">
              <select
                value={massUnit}
                onChange={(e) => setMassUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(massUnits).map(([key, unit]) => (
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
            Specific Heat (c)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter specific heat"
                value={specificHeat}
                onChange={(e) => setSpecificHeat(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={specificHeatUnit}
                onChange={(e) => setSpecificHeatUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(specificHeatUnits).map(([key, unit]) => (
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
            Initial Temperature (T₁)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter initial temperature"
                value={initialTemp}
                onChange={(e) => setInitialTemp(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-32">
              <select
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(temperatureUnits).map(([key, unit]) => (
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
            Final Temperature (T₂)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter final temperature"
                value={finalTemp}
                onChange={(e) => setFinalTemp(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-32">
              <select
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(temperatureUnits).map(([key, unit]) => (
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
            <li>• Enter any four values to calculate the fifth</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• Formula: Q = m × c × ΔT (Heat Energy = Mass × Specific Heat × Temperature Change)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

