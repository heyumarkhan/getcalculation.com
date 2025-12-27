'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface ConservationOfMomentumCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

type CalculationMode = 'final-velocities' | 'final-velocity-1' | 'final-velocity-2' | 'mass-1' | 'mass-2';

// Mass units (all relative to base unit: kilograms)
const massUnits = {
  'kg': { name: 'kg (Kilograms)', factor: 1 },
  'g': { name: 'g (Grams)', factor: 0.001 },
  'lb': { name: 'lb (Pounds)', factor: 0.453592 },
  'oz': { name: 'oz (Ounces)', factor: 0.0283495 }
};

// Velocity units (all relative to base unit: m/s)
const velocityUnits = {
  'm/s': { name: 'm/s (Meters per second)', factor: 1 },
  'km/h': { name: 'km/h (Kilometers per hour)', factor: 1 / 3.6 },
  'mph': { name: 'mph (Miles per hour)', factor: 0.44704 },
  'ft/s': { name: 'ft/s (Feet per second)', factor: 0.3048 }
};

export default function ConservationOfMomentumCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: ConservationOfMomentumCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('final-velocities');
  const [mass1, setMass1] = useState('');
  const [mass2, setMass2] = useState('');
  const [velocity1Initial, setVelocity1Initial] = useState('');
  const [velocity2Initial, setVelocity2Initial] = useState('');
  const [velocity1Final, setVelocity1Final] = useState('');
  const [velocity2Final, setVelocity2Final] = useState('');
  const [massUnit, setMassUnit] = useState('kg');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [result, setResult] = useState<{ value: number; unit: string; label: string } | null>(null);
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
      return value.toExponential(2);
    }
    return value.toFixed(4).replace(/\.?0+$/, '');
  };

  const convertMassToBase = (value: number, unit: string): number => {
    return value * massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertMassFromBase = (value: number, unit: string): number => {
    return value / massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertVelocityToBase = (value: number, unit: string): number => {
    return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertVelocityFromBase = (value: number, unit: string): number => {
    return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const m1 = mass1 ? parseFloat(mass1) : NaN;
    const m2 = mass2 ? parseFloat(mass2) : NaN;
    const v1i = velocity1Initial ? parseFloat(velocity1Initial) : NaN;
    const v2i = velocity2Initial ? parseFloat(velocity2Initial) : NaN;
    const v1f = velocity1Final ? parseFloat(velocity1Final) : NaN;
    const v2f = velocity2Final ? parseFloat(velocity2Final) : NaN;

    // Convert to base units
    const m1Base = !isNaN(m1) ? convertMassToBase(m1, massUnit) : NaN;
    const m2Base = !isNaN(m2) ? convertMassToBase(m2, massUnit) : NaN;
    const v1iBase = !isNaN(v1i) ? convertVelocityToBase(v1i, velocityUnit) : NaN;
    const v2iBase = !isNaN(v2i) ? convertVelocityToBase(v2i, velocityUnit) : NaN;
    const v1fBase = !isNaN(v1f) ? convertVelocityToBase(v1f, velocityUnit) : NaN;
    const v2fBase = !isNaN(v2f) ? convertVelocityToBase(v2f, velocityUnit) : NaN;

    if (calculationMode === 'final-velocities') {
      // Need: m1, m2, v1i, v2i
      // Calculate: v1f, v2f (assuming elastic collision - requires additional constraint)
      // For simplicity, this mode will require v1f or v2f to be provided, or calculate based on elastic collision
      if (isNaN(m1) || isNaN(m2) || isNaN(v1i) || isNaN(v2i)) {
        setError('Please enter both masses and both initial velocities');
        return;
      }

      if (m1 <= 0 || m2 <= 0) {
        setError('Masses must be positive numbers');
        return;
      }

      // If one final velocity is provided, calculate the other
      if (!isNaN(v1f)) {
        // Calculate v2f from conservation of momentum
        // m1*v1i + m2*v2i = m1*v1f + m2*v2f
        // v2f = (m1*v1i + m2*v2i - m1*v1f) / m2
        const v2fBaseCalc = (m1Base * v1iBase + m2Base * v2iBase - m1Base * v1fBase) / m2Base;
        const v2fResult = convertVelocityFromBase(v2fBaseCalc, velocityUnit);
        
        setResult({ value: v2fResult, unit: velocityUnit, label: 'Final Velocity of Object 2' });
        setCalculation(
          `Conservation of Momentum: m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f\n\n` +
          `Given values:\n` +
          `m₁ = ${formatValue(m1)} ${massUnits[massUnit as keyof typeof massUnits].name} = ${formatValue(m1Base)} kg\n` +
          `m₂ = ${formatValue(m2)} ${massUnits[massUnit as keyof typeof massUnits].name} = ${formatValue(m2Base)} kg\n` +
          `v₁ᵢ = ${formatValue(v1i)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v1iBase)} m/s\n` +
          `v₂ᵢ = ${formatValue(v2i)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v2iBase)} m/s\n` +
          `v₁f = ${formatValue(v1f)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v1fBase)} m/s\n\n` +
          `Solving for v₂f:\n` +
          `m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f\n` +
          `${formatValue(m1Base)} × ${formatValue(v1iBase)} + ${formatValue(m2Base)} × ${formatValue(v2iBase)} = ${formatValue(m1Base)} × ${formatValue(v1fBase)} + ${formatValue(m2Base)} × v₂f\n` +
          `${formatValue(m1Base * v1iBase)} + ${formatValue(m2Base * v2iBase)} = ${formatValue(m1Base * v1fBase)} + ${formatValue(m2Base)} × v₂f\n` +
          `${formatValue(m1Base * v1iBase + m2Base * v2iBase)} = ${formatValue(m1Base * v1fBase)} + ${formatValue(m2Base)} × v₂f\n` +
          `v₂f = (${formatValue(m1Base * v1iBase + m2Base * v2iBase)} - ${formatValue(m1Base * v1fBase)}) / ${formatValue(m2Base)}\n` +
          `v₂f = ${formatValue(v2fBaseCalc)} m/s = ${formatValue(v2fResult)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name}`
        );
      } else if (!isNaN(v2f)) {
        // Calculate v1f from conservation of momentum
        const v1fBaseCalc = (m1Base * v1iBase + m2Base * v2iBase - m2Base * v2fBase) / m1Base;
        const v1fResult = convertVelocityFromBase(v1fBaseCalc, velocityUnit);
        
        setResult({ value: v1fResult, unit: velocityUnit, label: 'Final Velocity of Object 1' });
        setCalculation(
          `Conservation of Momentum: m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f\n\n` +
          `Given values:\n` +
          `m₁ = ${formatValue(m1)} ${massUnits[massUnit as keyof typeof massUnits].name} = ${formatValue(m1Base)} kg\n` +
          `m₂ = ${formatValue(m2)} ${massUnits[massUnit as keyof typeof massUnits].name} = ${formatValue(m2Base)} kg\n` +
          `v₁ᵢ = ${formatValue(v1i)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v1iBase)} m/s\n` +
          `v₂ᵢ = ${formatValue(v2i)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v2iBase)} m/s\n` +
          `v₂f = ${formatValue(v2f)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v2fBase)} m/s\n\n` +
          `Solving for v₁f:\n` +
          `m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f\n` +
          `v₁f = (m₁v₁ᵢ + m₂v₂ᵢ - m₂v₂f) / m₁\n` +
          `v₁f = (${formatValue(m1Base * v1iBase + m2Base * v2iBase)} - ${formatValue(m2Base * v2fBase)}) / ${formatValue(m1Base)}\n` +
          `v₁f = ${formatValue(v1fBaseCalc)} m/s = ${formatValue(v1fResult)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name}`
        );
      } else {
        setError('Please enter at least one final velocity to calculate the other');
        return;
      }
    } else if (calculationMode === 'final-velocity-1') {
      // Need: m1, m2, v1i, v2i, v2f
      if (isNaN(m1) || isNaN(m2) || isNaN(v1i) || isNaN(v2i) || isNaN(v2f)) {
        setError('Please enter both masses, both initial velocities, and final velocity of object 2');
        return;
      }

      if (m1 <= 0 || m2 <= 0) {
        setError('Masses must be positive numbers');
        return;
      }

      const v1fBaseCalc = (m1Base * v1iBase + m2Base * v2iBase - m2Base * v2fBase) / m1Base;
      const v1fResult = convertVelocityFromBase(v1fBaseCalc, velocityUnit);
      
      setResult({ value: v1fResult, unit: velocityUnit, label: 'Final Velocity of Object 1' });
      setCalculation(
        `Conservation of Momentum: m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f\n\n` +
        `Given values:\n` +
        `m₁ = ${formatValue(m1)} ${massUnits[massUnit as keyof typeof massUnits].name} = ${formatValue(m1Base)} kg\n` +
        `m₂ = ${formatValue(m2)} ${massUnits[massUnit as keyof typeof massUnits].name} = ${formatValue(m2Base)} kg\n` +
        `v₁ᵢ = ${formatValue(v1i)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v1iBase)} m/s\n` +
        `v₂ᵢ = ${formatValue(v2i)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v2iBase)} m/s\n` +
        `v₂f = ${formatValue(v2f)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v2fBase)} m/s\n\n` +
        `Solving for v₁f:\n` +
        `m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f\n` +
        `v₁f = (m₁v₁ᵢ + m₂v₂ᵢ - m₂v₂f) / m₁\n` +
        `v₁f = (${formatValue(m1Base * v1iBase + m2Base * v2iBase)} - ${formatValue(m2Base * v2fBase)}) / ${formatValue(m1Base)}\n` +
        `v₁f = ${formatValue(v1fBaseCalc)} m/s = ${formatValue(v1fResult)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name}`
      );
    } else if (calculationMode === 'final-velocity-2') {
      // Need: m1, m2, v1i, v2i, v1f
      if (isNaN(m1) || isNaN(m2) || isNaN(v1i) || isNaN(v2i) || isNaN(v1f)) {
        setError('Please enter both masses, both initial velocities, and final velocity of object 1');
        return;
      }

      if (m1 <= 0 || m2 <= 0) {
        setError('Masses must be positive numbers');
        return;
      }

      const v2fBaseCalc = (m1Base * v1iBase + m2Base * v2iBase - m1Base * v1fBase) / m2Base;
      const v2fResult = convertVelocityFromBase(v2fBaseCalc, velocityUnit);
      
      setResult({ value: v2fResult, unit: velocityUnit, label: 'Final Velocity of Object 2' });
      setCalculation(
        `Conservation of Momentum: m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f\n\n` +
        `Given values:\n` +
        `m₁ = ${formatValue(m1)} ${massUnits[massUnit as keyof typeof massUnits].name} = ${formatValue(m1Base)} kg\n` +
        `m₂ = ${formatValue(m2)} ${massUnits[massUnit as keyof typeof massUnits].name} = ${formatValue(m2Base)} kg\n` +
        `v₁ᵢ = ${formatValue(v1i)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v1iBase)} m/s\n` +
        `v₂ᵢ = ${formatValue(v2i)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v2iBase)} m/s\n` +
        `v₁f = ${formatValue(v1f)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v1fBase)} m/s\n\n` +
        `Solving for v₂f:\n` +
        `m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f\n` +
        `v₂f = (m₁v₁ᵢ + m₂v₂ᵢ - m₁v₁f) / m₂\n` +
        `v₂f = (${formatValue(m1Base * v1iBase + m2Base * v2iBase)} - ${formatValue(m1Base * v1fBase)}) / ${formatValue(m2Base)}\n` +
        `v₂f = ${formatValue(v2fBaseCalc)} m/s = ${formatValue(v2fResult)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name}`
      );
    } else if (calculationMode === 'mass-1') {
      // Need: m2, v1i, v2i, v1f, v2f
      if (isNaN(m2) || isNaN(v1i) || isNaN(v2i) || isNaN(v1f) || isNaN(v2f)) {
        setError('Please enter mass 2, all velocities (initial and final), but leave mass 1 empty');
        return;
      }

      if (m2 <= 0) {
        setError('Mass 2 must be a positive number');
        return;
      }

      // m1*v1i + m2*v2i = m1*v1f + m2*v2f
      // m1*(v1i - v1f) = m2*(v2f - v2i)
      // m1 = m2*(v2f - v2i) / (v1i - v1f)
      const m1BaseCalc = (m2Base * (v2fBase - v2iBase)) / (v1iBase - v1fBase);
      if (isNaN(m1BaseCalc) || !isFinite(m1BaseCalc)) {
        setError('Cannot calculate mass 1: velocities may result in division by zero or invalid result');
        return;
      }
      const m1Result = convertMassFromBase(m1BaseCalc, massUnit);
      
      if (m1Result <= 0) {
        setError('Calculated mass must be positive. Please check your velocity values.');
        return;
      }

      setResult({ value: m1Result, unit: massUnit, label: 'Mass of Object 1' });
      setCalculation(
        `Conservation of Momentum: m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f\n\n` +
        `Given values:\n` +
        `m₂ = ${formatValue(m2)} ${massUnits[massUnit as keyof typeof massUnits].name} = ${formatValue(m2Base)} kg\n` +
        `v₁ᵢ = ${formatValue(v1i)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v1iBase)} m/s\n` +
        `v₂ᵢ = ${formatValue(v2i)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v2iBase)} m/s\n` +
        `v₁f = ${formatValue(v1f)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v1fBase)} m/s\n` +
        `v₂f = ${formatValue(v2f)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v2fBase)} m/s\n\n` +
        `Solving for m₁:\n` +
        `m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f\n` +
        `m₁(v₁ᵢ - v₁f) = m₂(v₂f - v₂ᵢ)\n` +
        `m₁ = m₂(v₂f - v₂ᵢ) / (v₁ᵢ - v₁f)\n` +
        `m₁ = ${formatValue(m2Base)} × (${formatValue(v2fBase)} - ${formatValue(v2iBase)}) / (${formatValue(v1iBase)} - ${formatValue(v1fBase)})\n` +
        `m₁ = ${formatValue(m2Base * (v2fBase - v2iBase))} / ${formatValue(v1iBase - v1fBase)}\n` +
        `m₁ = ${formatValue(m1BaseCalc)} kg = ${formatValue(m1Result)} ${massUnits[massUnit as keyof typeof massUnits].name}`
      );
    } else if (calculationMode === 'mass-2') {
      // Need: m1, v1i, v2i, v1f, v2f
      if (isNaN(m1) || isNaN(v1i) || isNaN(v2i) || isNaN(v1f) || isNaN(v2f)) {
        setError('Please enter mass 1, all velocities (initial and final), but leave mass 2 empty');
        return;
      }

      if (m1 <= 0) {
        setError('Mass 1 must be a positive number');
        return;
      }

      // m1*v1i + m2*v2i = m1*v1f + m2*v2f
      // m2*(v2f - v2i) = m1*(v1i - v1f)
      // m2 = m1*(v1i - v1f) / (v2f - v2i)
      const m2BaseCalc = (m1Base * (v1iBase - v1fBase)) / (v2fBase - v2iBase);
      if (isNaN(m2BaseCalc) || !isFinite(m2BaseCalc)) {
        setError('Cannot calculate mass 2: velocities may result in division by zero or invalid result');
        return;
      }
      const m2Result = convertMassFromBase(m2BaseCalc, massUnit);
      
      if (m2Result <= 0) {
        setError('Calculated mass must be positive. Please check your velocity values.');
        return;
      }

      setResult({ value: m2Result, unit: massUnit, label: 'Mass of Object 2' });
      setCalculation(
        `Conservation of Momentum: m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f\n\n` +
        `Given values:\n` +
        `m₁ = ${formatValue(m1)} ${massUnits[massUnit as keyof typeof massUnits].name} = ${formatValue(m1Base)} kg\n` +
        `v₁ᵢ = ${formatValue(v1i)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v1iBase)} m/s\n` +
        `v₂ᵢ = ${formatValue(v2i)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v2iBase)} m/s\n` +
        `v₁f = ${formatValue(v1f)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v1fBase)} m/s\n` +
        `v₂f = ${formatValue(v2f)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v2fBase)} m/s\n\n` +
        `Solving for m₂:\n` +
        `m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f\n` +
        `m₂(v₂f - v₂ᵢ) = m₁(v₁ᵢ - v₁f)\n` +
        `m₂ = m₁(v₁ᵢ - v₁f) / (v₂f - v₂ᵢ)\n` +
        `m₂ = ${formatValue(m1Base)} × (${formatValue(v1iBase)} - ${formatValue(v1fBase)}) / (${formatValue(v2fBase)} - ${formatValue(v2iBase)})\n` +
        `m₂ = ${formatValue(m1Base * (v1iBase - v1fBase))} / ${formatValue(v2fBase - v2iBase)}\n` +
        `m₂ = ${formatValue(m2BaseCalc)} kg = ${formatValue(m2Result)} ${massUnits[massUnit as keyof typeof massUnits].name}`
      );
    }
  };

  const clearAll = () => {
    setMass1('');
    setMass2('');
    setVelocity1Initial('');
    setVelocity2Initial('');
    setVelocity1Final('');
    setVelocity2Final('');
    setMassUnit('kg');
    setVelocityUnit('m/s');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Conservation of Momentum Calculator</h2>
          <p className="text-gray-600">Calculate final velocities or masses in collisions using conservation of momentum</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Mode
          </label>
          <select
            value={calculationMode}
            onChange={(e) => {
              setCalculationMode(e.target.value as CalculationMode);
              clearAll();
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="final-velocities">Calculate Final Velocities</option>
            <option value="final-velocity-1">Calculate Final Velocity of Object 1</option>
            <option value="final-velocity-2">Calculate Final Velocity of Object 2</option>
            <option value="mass-1">Calculate Mass of Object 1</option>
            <option value="mass-2">Calculate Mass of Object 2</option>
          </select>
        </div>

        {/* Mass 1 Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Mass of Object 1 (m₁)
            {calculationMode === 'mass-1' && <span className="text-gray-500 text-xs ml-2">(Leave empty to calculate)</span>}
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter mass 1"
                value={mass1}
                onChange={(e) => setMass1(e.target.value)}
                className="w-full"
                autoFocus
                disabled={calculationMode === 'mass-1'}
              />
            </div>
            <div className="w-32">
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

        {/* Mass 2 Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Mass of Object 2 (m₂)
            {calculationMode === 'mass-2' && <span className="text-gray-500 text-xs ml-2">(Leave empty to calculate)</span>}
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter mass 2"
                value={mass2}
                onChange={(e) => setMass2(e.target.value)}
                className="w-full"
                disabled={calculationMode === 'mass-2'}
              />
            </div>
            <div className="w-32">
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

        {/* Initial Velocity 1 Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Initial Velocity of Object 1 (v₁ᵢ)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter initial velocity 1"
                value={velocity1Initial}
                onChange={(e) => setVelocity1Initial(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-32">
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

        {/* Initial Velocity 2 Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Initial Velocity of Object 2 (v₂ᵢ)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter initial velocity 2"
                value={velocity2Initial}
                onChange={(e) => setVelocity2Initial(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-32">
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

        {/* Final Velocity 1 Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Final Velocity of Object 1 (v₁f)
            {(calculationMode === 'final-velocity-1' || calculationMode === 'mass-1' || calculationMode === 'mass-2') && <span className="text-gray-500 text-xs ml-2">(Required)</span>}
            {(calculationMode === 'final-velocity-2' || calculationMode === 'final-velocities') && <span className="text-gray-500 text-xs ml-2">(Leave empty to calculate)</span>}
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter final velocity 1"
                value={velocity1Final}
                onChange={(e) => setVelocity1Final(e.target.value)}
                className="w-full"
                disabled={calculationMode === 'final-velocity-1'}
              />
            </div>
            <div className="w-32">
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

        {/* Final Velocity 2 Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Final Velocity of Object 2 (v₂f)
            {(calculationMode === 'final-velocity-2' || calculationMode === 'mass-1' || calculationMode === 'mass-2') && <span className="text-gray-500 text-xs ml-2">(Required)</span>}
            {(calculationMode === 'final-velocity-1' || calculationMode === 'final-velocities') && <span className="text-gray-500 text-xs ml-2">(Leave empty to calculate)</span>}
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter final velocity 2"
                value={velocity2Final}
                onChange={(e) => setVelocity2Final(e.target.value)}
                className="w-full"
                disabled={calculationMode === 'final-velocity-2'}
              />
            </div>
            <div className="w-32">
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

        {result && (
          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}10`, borderColor: `${primaryColor}30`, borderWidth: '1px', borderStyle: 'solid' }}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>{result.label}</h3>
            <p className="text-2xl font-bold" style={{ color: primaryColor }}>
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <div className="text-sm mt-3 font-mono whitespace-pre-line text-gray-700">
                {calculation}
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-mono">{error}</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Select the calculation mode based on what you want to find</li>
            <li>• Enter all required values (masses and velocities)</li>
            <li>• Leave the value you want to calculate empty (or it will be disabled)</li>
            <li>• Formula: m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f (Conservation of Momentum)</li>
            <li>• All units are automatically converted to base units (kg and m/s) for calculation</li>
            <li>• Negative velocities represent motion in the opposite direction</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

