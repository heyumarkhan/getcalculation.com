'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors
const forceUnits = {
  'N': { name: 'N (Newtons)', factor: 1 },
  'kN': { name: 'kN (Kilonewtons)', factor: 1000 },
  'mN': { name: 'mN (Millinewtons)', factor: 0.001 },
  'lb': { name: 'lb (Pounds-force)', factor: 4.44822 },
  'oz': { name: 'oz (Ounce-force)', factor: 0.278014 }
};

const timeUnits = {
  's': { name: 's (Seconds)', factor: 1 },
  'ms': { name: 'ms (Milliseconds)', factor: 0.001 },
  'μs': { name: 'μs (Microseconds)', factor: 0.000001 },
  'min': { name: 'min (Minutes)', factor: 60 },
  'h': { name: 'h (Hours)', factor: 3600 }
};

const massUnits = {
  'kg': { name: 'kg (Kilograms)', factor: 1 },
  'g': { name: 'g (Grams)', factor: 0.001 },
  'mg': { name: 'mg (Milligrams)', factor: 0.000001 },
  'lb': { name: 'lb (Pounds)', factor: 0.453592 },
  'oz': { name: 'oz (Ounces)', factor: 0.0283495 },
  'ton': { name: 'ton (Metric tons)', factor: 1000 }
};

const velocityUnits = {
  'm/s': { name: 'm/s (Meters per second)', factor: 1 },
  'cm/s': { name: 'cm/s (Centimeters per second)', factor: 0.01 },
  'km/h': { name: 'km/h (Kilometers per hour)', factor: 0.277778 },
  'mph': { name: 'mph (Miles per hour)', factor: 0.44704 },
  'ft/s': { name: 'ft/s (Feet per second)', factor: 0.3048 }
};

const impulseUnits = {
  'N·s': { name: 'N·s (Newton-seconds)', factor: 1 },
  'kg·m/s': { name: 'kg·m/s (Kilogram-meters per second)', factor: 1 },
  'lb·s': { name: 'lb·s (Pound-seconds)', factor: 4.44822 }
};

const momentumUnits = {
  'kg·m/s': { name: 'kg·m/s (Kilogram-meters per second)', factor: 1 },
  'g·cm/s': { name: 'g·cm/s (Gram-centimeters per second)', factor: 0.0001 },
  'lb·ft/s': { name: 'lb·ft/s (Pound-feet per second)', factor: 0.138255 }
};

type CalculationMode = 'impulse' | 'momentum' | 'change';

export default function ImpulseMomentumCalculator() {
  const [mode, setMode] = useState<CalculationMode>('impulse');
  const [impulse, setImpulse] = useState('');
  const [force, setForce] = useState('');
  const [time, setTime] = useState('');
  const [momentum, setMomentum] = useState('');
  const [mass, setMass] = useState('');
  const [velocity, setVelocity] = useState('');
  const [initialVelocity, setInitialVelocity] = useState('');
  const [finalVelocity, setFinalVelocity] = useState('');
  const [forceUnit, setForceUnit] = useState('N');
  const [timeUnit, setTimeUnit] = useState('s');
  const [massUnit, setMassUnit] = useState('kg');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [impulseUnit, setImpulseUnit] = useState('N·s');
  const [momentumUnit, setMomentumUnit] = useState('kg·m/s');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'impulse' | 'momentum' | 'force' | 'time' | 'mass' | 'velocity' | 'change' } | null>(null);
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

  const convertForceToBase = (value: number, unit: string) => {
    return value * forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertForceFromBase = (value: number, unit: string) => {
    return value / forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertTimeToBase = (value: number, unit: string) => {
    return value * timeUnits[unit as keyof typeof timeUnits].factor;
  };

  const convertTimeFromBase = (value: number, unit: string) => {
    return value / timeUnits[unit as keyof typeof timeUnits].factor;
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

  const convertImpulseToBase = (value: number, unit: string) => {
    return value * impulseUnits[unit as keyof typeof impulseUnits].factor;
  };

  const convertImpulseFromBase = (value: number, unit: string) => {
    return value / impulseUnits[unit as keyof typeof impulseUnits].factor;
  };

  const convertMomentumToBase = (value: number, unit: string) => {
    return value * momentumUnits[unit as keyof typeof momentumUnits].factor;
  };

  const convertMomentumFromBase = (value: number, unit: string) => {
    return value / momentumUnits[unit as keyof typeof momentumUnits].factor;
  };

  const calculate = () => {
    if (mode === 'impulse') {
      // Impulse: J = F × t
      const J = impulse ? parseFloat(impulse) : NaN;
      const F = force ? parseFloat(force) : NaN;
      const t = time ? parseFloat(time) : NaN;

      const filledCount = [impulse, force, time].filter(val => val !== '').length;

      if (filledCount !== 2) {
        setResult(null);
        setCalculation('');
        return;
      }

      // Validate inputs
      if (impulse && (isNaN(J) || J <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for impulse');
        return;
      }
      if (force && (isNaN(F) || F <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for force');
        return;
      }
      if (time && (isNaN(t) || t <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for time');
        return;
      }

      if (!impulse) {
        // Calculate impulse: J = F × t
        const FBase = convertForceToBase(F, forceUnit);
        const tBase = convertTimeToBase(t, timeUnit);
        const JBase = FBase * tBase;
        const JResult = convertImpulseFromBase(JBase, impulseUnit);

        setResult({ value: JResult, unit: impulseUnit, type: 'impulse' });
        setCalculation(`J = F × t = ${formatValue(F)} ${forceUnit} × ${formatValue(t)} ${timeUnit} = ${formatValue(JResult)} ${impulseUnit}`);
      } else if (!force) {
        // Calculate force: F = J / t
        const JBase = convertImpulseToBase(J, impulseUnit);
        const tBase = convertTimeToBase(t, timeUnit);

        if (tBase === 0) {
          setResult(null);
          setCalculation('Error: Time cannot be zero');
          return;
        }

        const FBase = JBase / tBase;
        const FResult = convertForceFromBase(FBase, forceUnit);

        setResult({ value: FResult, unit: forceUnit, type: 'force' });
        setCalculation(`F = J / t = ${formatValue(J)} ${impulseUnit} / ${formatValue(t)} ${timeUnit} = ${formatValue(FResult)} ${forceUnit}`);
      } else if (!time) {
        // Calculate time: t = J / F
        const JBase = convertImpulseToBase(J, impulseUnit);
        const FBase = convertForceToBase(F, forceUnit);

        if (FBase === 0) {
          setResult(null);
          setCalculation('Error: Force cannot be zero');
          return;
        }

        const tBase = JBase / FBase;
        const tResult = convertTimeFromBase(tBase, timeUnit);

        setResult({ value: tResult, unit: timeUnit, type: 'time' });
        setCalculation(`t = J / F = ${formatValue(J)} ${impulseUnit} / ${formatValue(F)} ${forceUnit} = ${formatValue(tResult)} ${timeUnit}`);
      }
    } else if (mode === 'momentum') {
      // Momentum: p = m × v
      const p = momentum ? parseFloat(momentum) : NaN;
      const m = mass ? parseFloat(mass) : NaN;
      const v = velocity ? parseFloat(velocity) : NaN;

      const filledCount = [momentum, mass, velocity].filter(val => val !== '').length;

      if (filledCount !== 2) {
        setResult(null);
        setCalculation('');
        return;
      }

      // Validate inputs
      if (momentum && (isNaN(p) || p <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for momentum');
        return;
      }
      if (mass && (isNaN(m) || m <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for mass');
        return;
      }
      if (velocity && (isNaN(v) || v <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for velocity');
        return;
      }

      if (!momentum) {
        // Calculate momentum: p = m × v
        const mBase = convertMassToBase(m, massUnit);
        const vBase = convertVelocityToBase(v, velocityUnit);
        const pBase = mBase * vBase;
        const pResult = convertMomentumFromBase(pBase, momentumUnit);

        setResult({ value: pResult, unit: momentumUnit, type: 'momentum' });
        setCalculation(`p = m × v = ${formatValue(m)} ${massUnit} × ${formatValue(v)} ${velocityUnit} = ${formatValue(pResult)} ${momentumUnit}`);
      } else if (!mass) {
        // Calculate mass: m = p / v
        const pBase = convertMomentumToBase(p, momentumUnit);
        const vBase = convertVelocityToBase(v, velocityUnit);

        if (vBase === 0) {
          setResult(null);
          setCalculation('Error: Velocity cannot be zero');
          return;
        }

        const mBase = pBase / vBase;
        const mResult = convertMassFromBase(mBase, massUnit);

        setResult({ value: mResult, unit: massUnit, type: 'mass' });
        setCalculation(`m = p / v = ${formatValue(p)} ${momentumUnit} / ${formatValue(v)} ${velocityUnit} = ${formatValue(mResult)} ${massUnit}`);
      } else if (!velocity) {
        // Calculate velocity: v = p / m
        const pBase = convertMomentumToBase(p, momentumUnit);
        const mBase = convertMassToBase(m, massUnit);

        if (mBase === 0) {
          setResult(null);
          setCalculation('Error: Mass cannot be zero');
          return;
        }

        const vBase = pBase / mBase;
        const vResult = convertVelocityFromBase(vBase, velocityUnit);

        setResult({ value: vResult, unit: velocityUnit, type: 'velocity' });
        setCalculation(`v = p / m = ${formatValue(p)} ${momentumUnit} / ${formatValue(m)} ${massUnit} = ${formatValue(vResult)} ${velocityUnit}`);
      }
    } else if (mode === 'change') {
      // Change in momentum: Δp = m × (v_f - v_i) = J
      const m = mass ? parseFloat(mass) : NaN;
      const v_i = initialVelocity ? parseFloat(initialVelocity) : NaN;
      const v_f = finalVelocity ? parseFloat(finalVelocity) : NaN;
      const J = impulse ? parseFloat(impulse) : NaN;

      // Need at least mass and both velocities, or impulse and mass, or impulse and velocity change
      const hasMass = mass && !isNaN(m) && m > 0;
      const hasBothVelocities = initialVelocity && finalVelocity && !isNaN(v_i) && !isNaN(v_f);
      const hasImpulse = impulse && !isNaN(J) && J > 0;

      if (!hasMass || (!hasBothVelocities && !hasImpulse)) {
        setResult(null);
        setCalculation('Error: Please enter mass and both initial/final velocities, or mass and impulse');
        return;
      }

      if (hasBothVelocities) {
        // Calculate change in momentum: Δp = m × (v_f - v_i)
        const mBase = convertMassToBase(m, massUnit);
        const v_iBase = convertVelocityToBase(v_i, velocityUnit);
        const v_fBase = convertVelocityToBase(v_f, velocityUnit);
        const deltaV = v_fBase - v_iBase;
        const deltaPBase = mBase * deltaV;
        const deltaPResult = convertImpulseFromBase(deltaPBase, impulseUnit);

        setResult({ value: deltaPResult, unit: impulseUnit, type: 'change' });
        setCalculation(`Δp = m × (v_f - v_i) = ${formatValue(m)} ${massUnit} × (${formatValue(v_f)} ${velocityUnit} - ${formatValue(v_i)} ${velocityUnit}) = ${formatValue(m)} ${massUnit} × ${formatValue(deltaV)} m/s = ${formatValue(deltaPResult)} ${impulseUnit}`);
      } else if (hasImpulse && hasMass) {
        // Calculate velocity change: Δv = J / m
        const mBase = convertMassToBase(m, massUnit);
        const JBase = convertImpulseToBase(J, impulseUnit);

        if (mBase === 0) {
          setResult(null);
          setCalculation('Error: Mass cannot be zero');
          return;
        }

        const deltaVBase = JBase / mBase;
        const deltaVResult = convertVelocityFromBase(deltaVBase, velocityUnit);

        setResult({ value: deltaVResult, unit: velocityUnit, type: 'velocity' });
        setCalculation(`Δv = J / m = ${formatValue(J)} ${impulseUnit} / ${formatValue(m)} ${massUnit} = ${formatValue(deltaVResult)} ${velocityUnit}`);
      }
    }
  };

  const clearAll = () => {
    setImpulse('');
    setForce('');
    setTime('');
    setMomentum('');
    setMass('');
    setVelocity('');
    setInitialVelocity('');
    setFinalVelocity('');
    setForceUnit('N');
    setTimeUnit('s');
    setMassUnit('kg');
    setVelocityUnit('m/s');
    setImpulseUnit('N·s');
    setMomentumUnit('kg·m/s');
    setResult(null);
    setCalculation('');
  };

  const handleModeChange = (newMode: CalculationMode) => {
    setMode(newMode);
    clearAll();
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Impulse and Momentum Calculator</h2>
        <p className="text-gray-600">Calculate impulse (J = F×t) and momentum (p = m×v) with impulse-momentum theorem</p>
      </div>

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Mode
          </label>
          <select
            value={mode}
            onChange={(e) => handleModeChange(e.target.value as CalculationMode)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="impulse">Impulse: J = F × t</option>
            <option value="momentum">Momentum: p = m × v</option>
            <option value="change">Change in Momentum: Δp = m × (v_f - v_i)</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">
            {mode === 'impulse' && 'J = F × t'}
            {mode === 'momentum' && 'p = m × v'}
            {mode === 'change' && 'Δp = m × (v_f - v_i) = J'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {mode === 'impulse' && 'Where: J = Impulse, F = Force, t = Time'}
            {mode === 'momentum' && 'Where: p = Momentum, m = Mass, v = Velocity'}
            {mode === 'change' && 'Where: Δp = Change in momentum, m = Mass, v_f = Final velocity, v_i = Initial velocity, J = Impulse'}
          </p>
        </div>

        {/* Impulse Mode Inputs */}
        {mode === 'impulse' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Impulse (J)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter impulse (leave empty to calculate)"
                    value={impulse}
                    onChange={(e) => setImpulse(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-40">
                  <select
                    value={impulseUnit}
                    onChange={(e) => setImpulseUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                  >
                    {Object.entries(impulseUnits).map(([key, unit]) => (
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
                Force (F)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter force (leave empty to calculate)"
                    value={force}
                    onChange={(e) => setForce(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={forceUnit}
                    onChange={(e) => setForceUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                  >
                    {Object.entries(forceUnits).map(([key, unit]) => (
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
                Time (t)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter time (leave empty to calculate)"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={timeUnit}
                    onChange={(e) => setTimeUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                  >
                    {Object.entries(timeUnits).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Momentum Mode Inputs */}
        {mode === 'momentum' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Momentum (p)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter momentum (leave empty to calculate)"
                    value={momentum}
                    onChange={(e) => setMomentum(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-40">
                  <select
                    value={momentumUnit}
                    onChange={(e) => setMomentumUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                  >
                    {Object.entries(momentumUnits).map(([key, unit]) => (
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
          </>
        )}

        {/* Change in Momentum Mode Inputs */}
        {mode === 'change' && (
          <>
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
                    autoFocus
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Initial Velocity (v_i)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter initial velocity"
                    value={initialVelocity}
                    onChange={(e) => setInitialVelocity(e.target.value)}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Final Velocity (v_f)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter final velocity"
                    value={finalVelocity}
                    onChange={(e) => setFinalVelocity(e.target.value)}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Impulse (J) - Alternative Input
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Or enter impulse instead of velocities"
                    value={impulse}
                    onChange={(e) => setImpulse(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={impulseUnit}
                    onChange={(e) => setImpulseUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                  >
                    {Object.entries(impulseUnits).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex gap-3 pt-2">
          <Button onClick={calculate} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg">
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">Result</h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <p className="text-sm text-[#820ECC]/80 mt-2 font-mono break-words">
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
            {mode === 'impulse' && (
              <>
                <li>• Enter any two values to calculate the third (impulse, force, or time)</li>
                <li>• Formula: J = F × t (Impulse = Force × Time)</li>
                <li>• Leave the value you want to calculate empty</li>
              </>
            )}
            {mode === 'momentum' && (
              <>
                <li>• Enter any two values to calculate the third (momentum, mass, or velocity)</li>
                <li>• Formula: p = m × v (Momentum = Mass × Velocity)</li>
                <li>• Leave the value you want to calculate empty</li>
              </>
            )}
            {mode === 'change' && (
              <>
                <li>• Enter mass and both initial/final velocities to calculate change in momentum</li>
                <li>• Or enter mass and impulse to calculate velocity change</li>
                <li>• Formula: Δp = m × (v_f - v_i) = J</li>
                <li>• This demonstrates the impulse-momentum theorem</li>
              </>
            )}
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• All values should be positive numbers</li>
            <li>• Commonly used in collision analysis and force-time relationships</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

