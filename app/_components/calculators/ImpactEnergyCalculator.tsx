'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface ImpactEnergyCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Unit conversion factors (all relative to base units: J, kg, m/s)
const energyUnits = {
  'J': { name: 'J (Joules)', factor: 1 },
  'kJ': { name: 'kJ (Kilojoules)', factor: 1000 },
  'cal': { name: 'cal (Calories)', factor: 4.184 },
  'kcal': { name: 'kcal (Kilocalories)', factor: 4184 },
  'BTU': { name: 'BTU (British Thermal Units)', factor: 1055.06 },
  'ft-lb': { name: 'ft-lb (Foot-pounds)', factor: 1.35582 },
  'in-lb': { name: 'in-lb (Inch-pounds)', factor: 0.112985 }
};

const massUnits = {
  'kg': { name: 'kg (Kilograms)', factor: 1 },
  'g': { name: 'g (Grams)', factor: 0.001 },
  'mg': { name: 'mg (Milligrams)', factor: 0.000001 },
  'lb': { name: 'lb (Pounds)', factor: 0.453592 },
  'oz': { name: 'oz (Ounces)', factor: 0.0283495 },
  'ton': { name: 'ton (Metric tons)', factor: 1000 },
  'ton_us': { name: 'ton (US tons)', factor: 907.185 }
};

const velocityUnits = {
  'm/s': { name: 'm/s (Meters per second)', factor: 1 },
  'km/h': { name: 'km/h (Kilometers per hour)', factor: 0.277778 },
  'mph': { name: 'mph (Miles per hour)', factor: 0.44704 },
  'ft/s': { name: 'ft/s (Feet per second)', factor: 0.3048 },
  'in/s': { name: 'in/s (Inches per second)', factor: 0.0254 },
  'cm/s': { name: 'cm/s (Centimeters per second)', factor: 0.01 },
  'mm/s': { name: 'mm/s (Millimeters per second)', factor: 0.001 }
};

export default function ImpactEnergyCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: ImpactEnergyCalculatorProps) {
  const [impactEnergy, setImpactEnergy] = useState('');
  const [mass, setMass] = useState('');
  const [velocity, setVelocity] = useState('');
  const [energyUnit, setEnergyUnit] = useState('J');
  const [massUnit, setMassUnit] = useState('kg');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [result, setResult] = useState<{
    value: number;
    unit: string;
    type: 'energy' | 'mass' | 'velocity';
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

  const convertEnergyToBase = (value: number, unit: string) => {
    return value * energyUnits[unit as keyof typeof energyUnits].factor;
  };

  const convertEnergyFromBase = (value: number, unit: string) => {
    return value / energyUnits[unit as keyof typeof energyUnits].factor;
  };

  const convertMassToBase = (value: number, unit: string) => {
    return value * massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertMassFromBase = (value: number, unit: string) => {
    return value / massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertVelocityToBase = (value: number, unit: string) => {
    return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertVelocityFromBase = (value: number, unit: string) => {
    return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const e = impactEnergy ? parseFloat(impactEnergy) : NaN;
    const m = mass ? parseFloat(mass) : NaN;
    const v = velocity ? parseFloat(velocity) : NaN;

    const filledCount = [impactEnergy, mass, velocity].filter(val => val !== '').length;

    if (filledCount !== 2) {
      setError('Please enter exactly two values to calculate the third');
      return;
    }

    // Validate that filled values are valid positive numbers
    if (impactEnergy && (isNaN(e) || e < 0)) {
      setError('Impact energy must be a valid non-negative number');
      return;
    }
    if (mass && (isNaN(m) || m <= 0)) {
      setError('Mass must be a valid positive number');
      return;
    }
    if (velocity && (isNaN(v) || v < 0)) {
      setError('Velocity must be a valid non-negative number');
      return;
    }

    // Convert to base units
    if (!impactEnergy) {
      // Calculate impact energy: E = (1/2) × m × v²
      const mBase = convertMassToBase(m, massUnit);
      const vBase = convertVelocityToBase(v, velocityUnit);
      const eBase = 0.5 * mBase * vBase * vBase;
      const eResult = convertEnergyFromBase(eBase, energyUnit);
      
      setResult({ value: eResult, unit: energyUnit, type: 'energy' });
      
      const steps = [
        `Given:`,
        `  Mass (m) = ${formatValue(m)} ${massUnit} = ${formatValue(mBase)} kg`,
        `  Velocity (v) = ${formatValue(v)} ${velocityUnit} = ${formatValue(vBase)} m/s`,
        ``,
        `Calculate impact energy using impact energy formula:`,
        `  E = (1/2) × m × v²`,
        `  E = (1/2) × ${formatValue(mBase)} × ${formatValue(vBase)}²`,
        `  E = (1/2) × ${formatValue(mBase)} × ${formatValue(vBase * vBase)}`,
        `  E = ${formatValue(eBase)} J = ${formatValue(eResult)} ${energyUnits[energyUnit as keyof typeof energyUnits]?.name || energyUnit}`
      ];
      setCalculation(steps.join('\n'));
    } else if (!mass) {
      // Calculate mass: m = 2E / v²
      const eBase = convertEnergyToBase(e, energyUnit);
      const vBase = convertVelocityToBase(v, velocityUnit);
      
      if (vBase === 0) {
        setError('Velocity cannot be zero when calculating mass');
        return;
      }
      
      const mBase = (2 * eBase) / (vBase * vBase);
      const mResult = convertMassFromBase(mBase, massUnit);
      
      setResult({ value: mResult, unit: massUnit, type: 'mass' });
      
      const steps = [
        `Given:`,
        `  Impact Energy (E) = ${formatValue(e)} ${energyUnit} = ${formatValue(eBase)} J`,
        `  Velocity (v) = ${formatValue(v)} ${velocityUnit} = ${formatValue(vBase)} m/s`,
        ``,
        `Calculate mass using impact energy formula:`,
        `  m = 2E / v²`,
        `  m = 2 × ${formatValue(eBase)} / ${formatValue(vBase)}²`,
        `  m = ${formatValue(2 * eBase)} / ${formatValue(vBase * vBase)}`,
        `  m = ${formatValue(mBase)} kg = ${formatValue(mResult)} ${massUnits[massUnit as keyof typeof massUnits]?.name || massUnit}`
      ];
      setCalculation(steps.join('\n'));
    } else if (!velocity) {
      // Calculate velocity: v = √(2E / m)
      const eBase = convertEnergyToBase(e, energyUnit);
      const mBase = convertMassToBase(m, massUnit);
      
      if (mBase === 0) {
        setError('Mass cannot be zero when calculating velocity');
        return;
      }
      
      if (eBase < 0) {
        setError('Impact energy cannot be negative when calculating velocity');
        return;
      }
      
      const vBase = Math.sqrt((2 * eBase) / mBase);
      const vResult = convertVelocityFromBase(vBase, velocityUnit);
      
      setResult({ value: vResult, unit: velocityUnit, type: 'velocity' });
      
      const steps = [
        `Given:`,
        `  Impact Energy (E) = ${formatValue(e)} ${energyUnit} = ${formatValue(eBase)} J`,
        `  Mass (m) = ${formatValue(m)} ${massUnit} = ${formatValue(mBase)} kg`,
        ``,
        `Calculate velocity using impact energy formula:`,
        `  v = √(2E / m)`,
        `  v = √(2 × ${formatValue(eBase)} / ${formatValue(mBase)})`,
        `  v = √(${formatValue(2 * eBase)} / ${formatValue(mBase)})`,
        `  v = √(${formatValue((2 * eBase) / mBase)})`,
        `  v = ${formatValue(vBase)} m/s = ${formatValue(vResult)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits]?.name || velocityUnit}`
      ];
      setCalculation(steps.join('\n'));
    }
  };

  const clearAll = () => {
    setImpactEnergy('');
    setMass('');
    setVelocity('');
    setEnergyUnit('J');
    setMassUnit('kg');
    setVelocityUnit('m/s');
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Impact Energy Calculator</h2>
          <p className="text-gray-600">Calculate impact energy, mass, or velocity using E = (1/2) × m × v²</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Impact Energy Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">E = (1/2) × m × v²</p>
          <p className="text-sm text-gray-600 mt-1">Where: E = Impact Energy, m = Mass, v = Velocity</p>
        </div>

        {/* Impact Energy Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Impact Energy (E)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter impact energy (leave empty to calculate)"
                value={impactEnergy}
                onChange={(e) => setImpactEnergy(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={energyUnit}
                onChange={(e) => setEnergyUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(energyUnits).map(([key, unit]) => (
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

        {/* Velocity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Velocity (v)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter velocity (leave empty to calculate)"
                value={velocity}
                onChange={(e) => setVelocity(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={velocityUnit}
                onChange={(e) => setVelocityUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(velocityUnits).map(([key, unit]) => (
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
                  {result.type === 'energy' && 'Impact Energy (E)'}
                  {result.type === 'mass' && 'Mass (m)'}
                  {result.type === 'velocity' && 'Velocity (v)'}
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
            <li>• Enter any two values to calculate the third (Impact Energy, Mass, or Velocity)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: E = (1/2) × m × v² (Impact Energy Formula)</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• Impact energy and velocity must be non-negative; mass must be positive</li>
            <li>• Impact energy represents the kinetic energy at the moment of impact or collision</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

