'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMethod = 'wavelength-from-momentum' | 'wavelength-from-mass-velocity' | 'momentum-from-wavelength' | 'velocity-from-wavelength-mass';

export default function DeBroglieWavelengthCalculator() {
  const [method, setMethod] = useState<CalculationMethod>('wavelength-from-momentum');
  
  // Wavelength from momentum
  const [momentum, setMomentum] = useState('');
  const [momentumUnit, setMomentumUnit] = useState('kg·m/s');
  
  // Wavelength from mass and velocity
  const [mass, setMass] = useState('');
  const [massUnit, setMassUnit] = useState('kg');
  const [velocity, setVelocity] = useState('');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  
  // Momentum from wavelength
  const [wavelength, setWavelength] = useState('');
  const [wavelengthUnit, setWavelengthUnit] = useState('nm');
  
  // Velocity from wavelength and mass
  const [wavelengthForVel, setWavelengthForVel] = useState('');
  const [wavelengthUnitForVel, setWavelengthUnitForVel] = useState('nm');
  const [massForVel, setMassForVel] = useState('');
  const [massUnitForVel, setMassUnitForVel] = useState('kg');
  
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
  const [calculation, setCalculation] = useState('');

  // Planck's constant: 6.62607015 × 10^-34 J·s
  const PLANCK_CONSTANT = 6.62607015e-34;

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

  const convertMassToKg = (value: number, unit: string): number => {
    switch (unit) {
      case 'kg': return value;
      case 'g': return value / 1000;
      case 'mg': return value / 1e6;
      case 'u': return value * 1.66053906660e-27; // atomic mass unit
      case 'me': return value * 9.1093837015e-31; // electron mass
      default: return value;
    }
  };

  const convertMassFromKg = (value: number, unit: string): number => {
    switch (unit) {
      case 'kg': return value;
      case 'g': return value * 1000;
      case 'mg': return value * 1e6;
      case 'u': return value / 1.66053906660e-27;
      case 'me': return value / 9.1093837015e-31;
      default: return value;
    }
  };

  const convertVelocityToMs = (value: number, unit: string): number => {
    switch (unit) {
      case 'm/s': return value;
      case 'km/s': return value * 1000;
      case 'km/h': return value / 3.6;
      case 'mi/h': return value * 0.44704;
      default: return value;
    }
  };

  const convertMomentumToKgMs = (value: number, unit: string): number => {
    switch (unit) {
      case 'kg·m/s': return value;
      case 'g·m/s': return value / 1000;
      case 'kg·km/s': return value * 1000;
      default: return value;
    }
  };

  const convertWavelengthToM = (value: number, unit: string): number => {
    switch (unit) {
      case 'm': return value;
      case 'nm': return value * 1e-9;
      case 'pm': return value * 1e-12;
      case 'Å': return value * 1e-10;
      case 'μm': return value * 1e-6;
      default: return value;
    }
  };

  const convertWavelengthFromM = (value: number, unit: string): number => {
    switch (unit) {
      case 'm': return value;
      case 'nm': return value / 1e-9;
      case 'pm': return value / 1e-12;
      case 'Å': return value / 1e-10;
      case 'μm': return value / 1e-6;
      default: return value;
    }
  };

  const calculate = () => {
    if (method === 'wavelength-from-momentum') {
      const pVal = convertMomentumToKgMs(momentum ? parseFloat(momentum) : NaN, momentumUnit);

      if (!momentum) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(pVal) || pVal <= 0) {
        setResult(null);
        setCalculation('Error: Momentum must be a positive number.');
        return;
      }

      // λ = h / p (De Broglie formula)
      const wavelengthM = PLANCK_CONSTANT / pVal;
      const wavelengthNm = wavelengthM / 1e-9;

      setResult({ value: wavelengthNm, unit: 'nm' });
      setCalculation(`λ = h / p = ${PLANCK_CONSTANT.toExponential(4)} / ${formatValue(pVal)} = ${formatValue(wavelengthM)} m = ${formatValue(wavelengthNm)} nm`);
    } else if (method === 'wavelength-from-mass-velocity') {
      const mVal = convertMassToKg(mass ? parseFloat(mass) : NaN, massUnit);
      const vVal = convertVelocityToMs(velocity ? parseFloat(velocity) : NaN, velocityUnit);

      if (!mass || !velocity) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(mVal) || isNaN(vVal) || mVal <= 0 || vVal < 0) {
        setResult(null);
        setCalculation('Error: Mass must be positive and velocity must be non-negative.');
        return;
      }

      // p = m × v, then λ = h / p = h / (m × v)
      const momentumVal = mVal * vVal;
      const wavelengthM = PLANCK_CONSTANT / momentumVal;
      const wavelengthNm = wavelengthM / 1e-9;

      setResult({ value: wavelengthNm, unit: 'nm' });
      setCalculation(`p = m × v = ${formatValue(mVal)} × ${formatValue(vVal)} = ${formatValue(momentumVal)} kg·m/s; λ = h / p = ${formatValue(wavelengthNm)} nm`);
    } else if (method === 'momentum-from-wavelength') {
      const wVal = convertWavelengthToM(wavelength ? parseFloat(wavelength) : NaN, wavelengthUnit);

      if (!wavelength) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(wVal) || wVal <= 0) {
        setResult(null);
        setCalculation('Error: Wavelength must be a positive number.');
        return;
      }

      // p = h / λ
      const momentumVal = PLANCK_CONSTANT / wVal;

      setResult({ value: momentumVal, unit: 'kg·m/s' });
      setCalculation(`p = h / λ = ${PLANCK_CONSTANT.toExponential(4)} / ${formatValue(wVal)} = ${formatValue(momentumVal)} kg·m/s`);
    } else if (method === 'velocity-from-wavelength-mass') {
      const wVal = convertWavelengthToM(wavelengthForVel ? parseFloat(wavelengthForVel) : NaN, wavelengthUnitForVel);
      const mVal = convertMassToKg(massForVel ? parseFloat(massForVel) : NaN, massUnitForVel);

      if (!wavelengthForVel || !massForVel) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(wVal) || isNaN(mVal) || wVal <= 0 || mVal <= 0) {
        setResult(null);
        setCalculation('Error: Wavelength and mass must be positive numbers.');
        return;
      }

      // p = h / λ, then v = p / m = h / (m × λ)
      const momentumVal = PLANCK_CONSTANT / wVal;
      const velocityVal = momentumVal / mVal;

      setResult({ value: velocityVal, unit: 'm/s' });
      setCalculation(`v = h / (m × λ) = ${PLANCK_CONSTANT.toExponential(4)} / (${formatValue(mVal)} × ${formatValue(wVal)}) = ${formatValue(velocityVal)} m/s`);
    }
  };

  const handleCalculate = () => {
    calculate();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">De Broglie Wavelength Calculator</h2>
          
          <div className="border-b-2 border-gray-200 pb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Select Calculation Method</label>
            <div className="grid grid-cols-1 gap-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="wavelength-from-momentum"
                  checked={method === 'wavelength-from-momentum'}
                  onChange={(e) => {
                    setMethod(e.target.value as CalculationMethod);
                    setResult(null);
                    setCalculation('');
                  }}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Find Wavelength from Momentum</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="wavelength-from-mass-velocity"
                  checked={method === 'wavelength-from-mass-velocity'}
                  onChange={(e) => {
                    setMethod(e.target.value as CalculationMethod);
                    setResult(null);
                    setCalculation('');
                  }}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Find Wavelength from Mass & Velocity</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="momentum-from-wavelength"
                  checked={method === 'momentum-from-wavelength'}
                  onChange={(e) => {
                    setMethod(e.target.value as CalculationMethod);
                    setResult(null);
                    setCalculation('');
                  }}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Find Momentum from Wavelength</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="velocity-from-wavelength-mass"
                  checked={method === 'velocity-from-wavelength-mass'}
                  onChange={(e) => {
                    setMethod(e.target.value as CalculationMethod);
                    setResult(null);
                    setCalculation('');
                  }}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Find Velocity from Wavelength & Mass</span>
              </label>
            </div>
          </div>

          {method === 'wavelength-from-momentum' && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  label="Momentum"
                  value={momentum}
                  onChange={(e) => setMomentum(e.target.value)}
                  placeholder="e.g., 1e-24"
                  type="number"
                />
              </div>
              <div className="w-32">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select
                  value={momentumUnit}
                  onChange={(e) => setMomentumUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                >
                  <option value="kg·m/s">kg·m/s</option>
                  <option value="g·m/s">g·m/s</option>
                  <option value="kg·km/s">kg·km/s</option>
                </select>
              </div>
            </div>
          )}

          {method === 'wavelength-from-mass-velocity' && (
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Mass"
                    value={mass}
                    onChange={(e) => setMass(e.target.value)}
                    placeholder="e.g., 0.0000091"
                    type="number"
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={massUnit}
                    onChange={(e) => setMassUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="mg">mg</option>
                    <option value="u">u</option>
                    <option value="me">me</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Velocity"
                    value={velocity}
                    onChange={(e) => setVelocity(e.target.value)}
                    placeholder="e.g., 2000000"
                    type="number"
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={velocityUnit}
                    onChange={(e) => setVelocityUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="m/s">m/s</option>
                    <option value="km/s">km/s</option>
                    <option value="km/h">km/h</option>
                    <option value="mi/h">mi/h</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {method === 'momentum-from-wavelength' && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  label="Wavelength"
                  value={wavelength}
                  onChange={(e) => setWavelength(e.target.value)}
                  placeholder="e.g., 0.364"
                  type="number"
                />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select
                  value={wavelengthUnit}
                  onChange={(e) => setWavelengthUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                >
                  <option value="nm">nm</option>
                  <option value="pm">pm</option>
                  <option value="Å">Å</option>
                  <option value="μm">μm</option>
                  <option value="m">m</option>
                </select>
              </div>
            </div>
          )}

          {method === 'velocity-from-wavelength-mass' && (
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Wavelength"
                    value={wavelengthForVel}
                    onChange={(e) => setWavelengthForVel(e.target.value)}
                    placeholder="e.g., 0.364"
                    type="number"
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={wavelengthUnitForVel}
                    onChange={(e) => setWavelengthUnitForVel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="nm">nm</option>
                    <option value="pm">pm</option>
                    <option value="Å">Å</option>
                    <option value="μm">μm</option>
                    <option value="m">m</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Mass"
                    value={massForVel}
                    onChange={(e) => setMassForVel(e.target.value)}
                    placeholder="e.g., 0.0000091"
                    type="number"
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={massUnitForVel}
                    onChange={(e) => setMassUnitForVel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="mg">mg</option>
                    <option value="u">u</option>
                    <option value="me">me</option>
                  </select>
                </div>
              </div>
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
