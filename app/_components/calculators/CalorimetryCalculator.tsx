'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface CalorimetryCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Unit conversion factors (all relative to base units: J, kg, J/(kg·K), K)
const heatEnergyUnits = {
  'J': { name: 'J (Joules)', factor: 1 },
  'kJ': { name: 'kJ (Kilojoules)', factor: 1000 },
  'cal': { name: 'cal (Calories)', factor: 4.184 },
  'kcal': { name: 'kcal (Kilocalories)', factor: 4184 },
  'BTU': { name: 'BTU (British Thermal Units)', factor: 1055.06 },
  'Wh': { name: 'Wh (Watt-hours)', factor: 3600 }
};

const massUnits = {
  'kg': { name: 'kg (Kilograms)', factor: 1 },
  'g': { name: 'g (Grams)', factor: 0.001 },
  'mg': { name: 'mg (Milligrams)', factor: 0.000001 },
  'lb': { name: 'lb (Pounds)', factor: 0.453592 },
  'oz': { name: 'oz (Ounces)', factor: 0.0283495 }
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

export default function CalorimetryCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: CalorimetryCalculatorProps) {
  const [heatEnergy, setHeatEnergy] = useState('');
  const [mass, setMass] = useState('');
  const [specificHeat, setSpecificHeat] = useState('');
  const [initialTemp, setInitialTemp] = useState('');
  const [finalTemp, setFinalTemp] = useState('');
  const [heatEnergyUnit, setHeatEnergyUnit] = useState('J');
  const [massUnit, setMassUnit] = useState('kg');
  const [specificHeatUnit, setSpecificHeatUnit] = useState('J/(kg·K)');
  const [tempUnit, setTempUnit] = useState('°C');
  const [result, setResult] = useState<{
    value: number;
    unit: string;
    type: 'heat' | 'mass' | 'specificHeat' | 'tempChange';
  } | null>(null);
  const [calculation, setCalculation] = useState('');
  const [error, setError] = useState('');

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
    setError('');
    setResult(null);
    setCalculation('');

    const q = heatEnergy ? parseFloat(heatEnergy) : NaN;
    const m = mass ? parseFloat(mass) : NaN;
    const c = specificHeat ? parseFloat(specificHeat) : NaN;
    const t1 = initialTemp ? parseFloat(initialTemp) : NaN;
    const t2 = finalTemp ? parseFloat(finalTemp) : NaN;

    const filledCount = [heatEnergy, mass, specificHeat, initialTemp, finalTemp].filter(val => val !== '').length;

    if (filledCount !== 4) {
      setError('Please enter exactly four values to calculate the fifth');
      return;
    }

    // Validate that filled values are valid numbers
    if (heatEnergy && (isNaN(q) || q <= 0)) {
      setError('Heat energy must be a valid positive number');
      return;
    }
    if (mass && (isNaN(m) || m <= 0)) {
      setError('Mass must be a valid positive number');
      return;
    }
    if (specificHeat && (isNaN(c) || c <= 0)) {
      setError('Specific heat must be a valid positive number');
      return;
    }
    if (initialTemp && isNaN(t1)) {
      setError('Initial temperature must be a valid number');
      return;
    }
    if (finalTemp && isNaN(t2)) {
      setError('Final temperature must be a valid number');
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
      
      const steps = [
        `Given:`,
        `  Mass (m) = ${formatValue(m)} ${massUnit} = ${formatValue(mBase)} kg`,
        `  Specific Heat (c) = ${formatValue(c)} ${specificHeatUnit} = ${formatValue(cBase)} J/(kg·K)`,
        `  Initial Temperature (T₁) = ${formatValue(t1)} ${tempUnit}`,
        `  Final Temperature (T₂) = ${formatValue(t2)} ${tempUnit}`,
        `  Temperature Change (ΔT) = ${formatValue(Math.abs(t2 - t1))} ${tempUnit} = ${formatValue(deltaTBase)} K`,
        ``,
        `Calculate heat energy using calorimetry formula:`,
        `  Q = m × c × ΔT`,
        `  Q = ${formatValue(mBase)} × ${formatValue(cBase)} × ${formatValue(deltaTBase)}`,
        `  Q = ${formatValue(qBase)} J = ${formatValue(qResult)} ${heatEnergyUnits[heatEnergyUnit as keyof typeof heatEnergyUnits]?.name || heatEnergyUnit}`
      ];
      setCalculation(steps.join('\n'));
    } else if (!mass) {
      // Calculate mass: m = Q / (c × ΔT)
      qBase = convertHeatEnergyToBase(q, heatEnergyUnit);
      cBase = convertSpecificHeatToBase(c, specificHeatUnit);
      const t1Base = convertTempToKelvin(t1, tempUnit);
      const t2Base = convertTempToKelvin(t2, tempUnit);
      deltaTBase = Math.abs(t2Base - t1Base);
      
      if (deltaTBase === 0 || cBase === 0) {
        setError('Temperature change or specific heat cannot be zero');
        return;
      }
      
      mBase = qBase / (cBase * deltaTBase);
      const mResult = convertMassFromBase(mBase, massUnit);
      
      setResult({ value: mResult, unit: massUnit, type: 'mass' });
      
      const steps = [
        `Given:`,
        `  Heat Energy (Q) = ${formatValue(q)} ${heatEnergyUnit} = ${formatValue(qBase)} J`,
        `  Specific Heat (c) = ${formatValue(c)} ${specificHeatUnit} = ${formatValue(cBase)} J/(kg·K)`,
        `  Temperature Change (ΔT) = ${formatValue(Math.abs(t2 - t1))} ${tempUnit} = ${formatValue(deltaTBase)} K`,
        ``,
        `Calculate mass using calorimetry formula:`,
        `  m = Q / (c × ΔT)`,
        `  m = ${formatValue(qBase)} / (${formatValue(cBase)} × ${formatValue(deltaTBase)})`,
        `  m = ${formatValue(mBase)} kg = ${formatValue(mResult)} ${massUnits[massUnit as keyof typeof massUnits]?.name || massUnit}`
      ];
      setCalculation(steps.join('\n'));
    } else if (!specificHeat) {
      // Calculate specific heat: c = Q / (m × ΔT)
      qBase = convertHeatEnergyToBase(q, heatEnergyUnit);
      mBase = convertMassToBase(m, massUnit);
      const t1Base = convertTempToKelvin(t1, tempUnit);
      const t2Base = convertTempToKelvin(t2, tempUnit);
      deltaTBase = Math.abs(t2Base - t1Base);
      
      if (deltaTBase === 0 || mBase === 0) {
        setError('Temperature change or mass cannot be zero');
        return;
      }
      
      cBase = qBase / (mBase * deltaTBase);
      const cResult = convertSpecificHeatFromBase(cBase, specificHeatUnit);
      
      setResult({ value: cResult, unit: specificHeatUnit, type: 'specificHeat' });
      
      const steps = [
        `Given:`,
        `  Heat Energy (Q) = ${formatValue(q)} ${heatEnergyUnit} = ${formatValue(qBase)} J`,
        `  Mass (m) = ${formatValue(m)} ${massUnit} = ${formatValue(mBase)} kg`,
        `  Temperature Change (ΔT) = ${formatValue(Math.abs(t2 - t1))} ${tempUnit} = ${formatValue(deltaTBase)} K`,
        ``,
        `Calculate specific heat using calorimetry formula:`,
        `  c = Q / (m × ΔT)`,
        `  c = ${formatValue(qBase)} / (${formatValue(mBase)} × ${formatValue(deltaTBase)})`,
        `  c = ${formatValue(cBase)} J/(kg·K) = ${formatValue(cResult)} ${specificHeatUnits[specificHeatUnit as keyof typeof specificHeatUnits]?.name || specificHeatUnit}`
      ];
      setCalculation(steps.join('\n'));
    } else if (!initialTemp) {
      // Calculate initial temperature: T₁ = T₂ - (Q / (m × c))
      qBase = convertHeatEnergyToBase(q, heatEnergyUnit);
      mBase = convertMassToBase(m, massUnit);
      cBase = convertSpecificHeatToBase(c, specificHeatUnit);
      const t2Base = convertTempToKelvin(t2, tempUnit);
      
      if (mBase === 0 || cBase === 0) {
        setError('Mass or specific heat cannot be zero');
        return;
      }
      
      deltaTBase = qBase / (mBase * cBase);
      const t1Base = t2Base - deltaTBase;
      const t1Result = convertTempFromKelvin(t1Base, tempUnit);
      
      setResult({ value: t1Result, unit: tempUnit, type: 'tempChange' });
      
      const steps = [
        `Given:`,
        `  Heat Energy (Q) = ${formatValue(q)} ${heatEnergyUnit} = ${formatValue(qBase)} J`,
        `  Mass (m) = ${formatValue(m)} ${massUnit} = ${formatValue(mBase)} kg`,
        `  Specific Heat (c) = ${formatValue(c)} ${specificHeatUnit} = ${formatValue(cBase)} J/(kg·K)`,
        `  Final Temperature (T₂) = ${formatValue(t2)} ${tempUnit}`,
        ``,
        `Calculate initial temperature using calorimetry formula:`,
        `  T₁ = T₂ - (Q / (m × c))`,
        `  T₁ = ${formatValue(t2)} - (${formatValue(qBase)} / (${formatValue(mBase)} × ${formatValue(cBase)}))`,
        `  T₁ = ${formatValue(t1Result)} ${tempUnit}`
      ];
      setCalculation(steps.join('\n'));
    } else if (!finalTemp) {
      // Calculate final temperature: T₂ = T₁ + (Q / (m × c))
      qBase = convertHeatEnergyToBase(q, heatEnergyUnit);
      mBase = convertMassToBase(m, massUnit);
      cBase = convertSpecificHeatToBase(c, specificHeatUnit);
      const t1Base = convertTempToKelvin(t1, tempUnit);
      
      if (mBase === 0 || cBase === 0) {
        setError('Mass or specific heat cannot be zero');
        return;
      }
      
      deltaTBase = qBase / (mBase * cBase);
      const t2Base = t1Base + deltaTBase;
      const t2Result = convertTempFromKelvin(t2Base, tempUnit);
      
      setResult({ value: t2Result, unit: tempUnit, type: 'tempChange' });
      
      const steps = [
        `Given:`,
        `  Heat Energy (Q) = ${formatValue(q)} ${heatEnergyUnit} = ${formatValue(qBase)} J`,
        `  Mass (m) = ${formatValue(m)} ${massUnit} = ${formatValue(mBase)} kg`,
        `  Specific Heat (c) = ${formatValue(c)} ${specificHeatUnit} = ${formatValue(cBase)} J/(kg·K)`,
        `  Initial Temperature (T₁) = ${formatValue(t1)} ${tempUnit}`,
        ``,
        `Calculate final temperature using calorimetry formula:`,
        `  T₂ = T₁ + (Q / (m × c))`,
        `  T₂ = ${formatValue(t1)} + (${formatValue(qBase)} / (${formatValue(mBase)} × ${formatValue(cBase)}))`,
        `  T₂ = ${formatValue(t2Result)} ${tempUnit}`
      ];
      setCalculation(steps.join('\n'));
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
    setError('');
  };

  const getResultColor = () => {
    return 'bg-[#820ECC]/10 border-[#820ECC]/30';
  };

  const getResultTextColor = () => {
    return 'text-[#820ECC]';
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Calorimetry Calculator</h2>
          <p className="text-gray-600">Calculate heat transfer, mass, specific heat, or temperature change using Q = m × c × ΔT</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Calorimetry Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">Q = m × c × ΔT</p>
          <p className="text-sm text-gray-600 mt-1">Where: Q = Heat Energy, m = Mass, c = Specific Heat, ΔT = Temperature Change</p>
        </div>

        {/* Heat Energy Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Heat Energy (Q)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter heat energy (leave empty to calculate)"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        {/* Mass Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Mass (m)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter mass (leave empty to calculate)"
                value={mass}
                onChange={(e) => setMass(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={massUnit}
                onChange={(e) => setMassUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        {/* Specific Heat Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Specific Heat (c)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter specific heat (leave empty to calculate)"
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

        {/* Initial Temperature Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Initial Temperature (T₁)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter initial temperature (leave empty to calculate)"
                value={initialTemp}
                onChange={(e) => setInitialTemp(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        {/* Final Temperature Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Final Temperature (T₂)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter final temperature (leave empty to calculate)"
                value={finalTemp}
                onChange={(e) => setFinalTemp(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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
          <Button 
            onClick={calculate} 
            className="flex-1"
            style={{ backgroundColor: primaryColor }}
          >
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-mono">{error}</p>
          </div>
        )}

        {result && (
          <div className={`mt-6 p-4 ${getResultColor()} border rounded-lg`}>
            <h3 className={`text-lg font-semibold ${getResultTextColor()} mb-3`}>Result</h3>
            <div className="space-y-2">
              <div>
                <p className={`text-sm ${getResultTextColor()}/80`}>
                  {result.type === 'heat' && 'Heat Energy (Q)'}
                  {result.type === 'mass' && 'Mass (m)'}
                  {result.type === 'specificHeat' && 'Specific Heat (c)'}
                  {result.type === 'tempChange' && (initialTemp ? 'Final Temperature (T₂)' : 'Initial Temperature (T₁)')}
                </p>
                <p className={`text-xl font-bold ${getResultTextColor()}`}>
                  {formatValue(result.value)} {result.unit}
                </p>
              </div>
            </div>
            {calculation && (
              <div className={`text-sm ${getResultTextColor()}/80 mt-4 font-mono whitespace-pre-line border-t ${getResultTextColor()}/20 pt-3`}>
                {calculation}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">How It Works</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Enter any four values to calculate the fifth (Heat Energy, Mass, Specific Heat, Initial Temp, or Final Temp)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: Q = m × c × ΔT (Calorimetry Equation)</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• Heat energy and mass must be positive; temperatures can be negative</li>
            <li>• Calorimetry is used to measure heat transfer in chemical reactions and physical processes</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

