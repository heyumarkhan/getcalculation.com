'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: N, kg, m/s²)
const forceUnits = {
  'N': { name: 'N (Newtons)', factor: 1 },
  'kN': { name: 'kN (Kilonewtons)', factor: 1000 },
  'mN': { name: 'mN (Millinewtons)', factor: 0.001 },
  'lb': { name: 'lb (Pounds-force)', factor: 4.44822 },
  'oz': { name: 'oz (Ounce-force)', factor: 0.278014 },
  'dyn': { name: 'dyn (Dynes)', factor: 0.00001 }
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

const accelerationUnits = {
  'm/s²': { name: 'm/s² (Meters per second squared)', factor: 1 },
  'cm/s²': { name: 'cm/s² (Centimeters per second squared)', factor: 0.01 },
  'ft/s²': { name: 'ft/s² (Feet per second squared)', factor: 0.3048 },
  'g': { name: 'g (Standard gravity)', factor: 9.80665 },
  'km/h²': { name: 'km/h²', factor: 0.00007716 }
};

type CalculationMethod = 'mass-acceleration' | 'force';

export default function TensionCalculator() {
  const [method, setMethod] = useState<CalculationMethod>('mass-acceleration');
  
  // Mass-acceleration method
  const [mass, setMass] = useState('');
  const [acceleration, setAcceleration] = useState('');
  const [massUnit, setMassUnit] = useState('kg');
  const [accelerationUnit, setAccelerationUnit] = useState('m/s²');
  const [accelerationDirection, setAccelerationDirection] = useState<'up' | 'down' | 'static'>('static');
  
  // Force method
  const [force, setForce] = useState('');
  const [forceUnit, setForceUnit] = useState('N');
  
  const [tensionUnit, setTensionUnit] = useState('N');
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

  const convertForceToBase = (value: number, unit: string) => {
    return value * forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertForceFromBase = (value: number, unit: string) => {
    return value / forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertMassToBase = (value: number, unit: string) => {
    return value * massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertAccelerationToBase = (value: number, unit: string) => {
    return value * accelerationUnits[unit as keyof typeof accelerationUnits].factor;
  };

  const calculate = () => {
    if (method === 'mass-acceleration') {
      const m = mass ? parseFloat(mass) : NaN;
      const a = acceleration ? parseFloat(acceleration) : NaN;

      if (!mass) {
        setResult(null);
        setCalculation('Error: Mass is required for this calculation');
        return;
      }

      if (isNaN(m) || m <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for mass');
        return;
      }

      // Standard gravity in m/s²
      const g = 9.80665;

      // Convert to base units
      const massInKg = convertMassToBase(m, massUnit);
      let accelerationInMps2 = 0;

      if (accelerationDirection === 'static') {
        // Static case: T = mg
        accelerationInMps2 = 0;
        const tensionInN = massInKg * g;
        const tension = convertForceFromBase(tensionInN, tensionUnit);
        
        setResult({ value: tension, unit: tensionUnit });
        setCalculation(`T = mg = ${formatValue(m)} ${massUnit} × 9.80665 m/s² = ${formatValue(tension)} ${tensionUnit}`);
      } else {
        if (!acceleration || isNaN(a)) {
          setResult(null);
          setCalculation('Error: Please enter acceleration value');
          return;
        }

        accelerationInMps2 = convertAccelerationToBase(a, accelerationUnit);
        
        let tensionInN: number;
        let formula: string;

        if (accelerationDirection === 'up') {
          // Upward acceleration: T = m(g + a)
          tensionInN = massInKg * (g + accelerationInMps2);
          formula = `T = m(g + a)`;
          setCalculation(`${formula} = ${formatValue(m)} ${massUnit} × (9.80665 m/s² + ${formatValue(a)} ${accelerationUnit}) = ${formatValue(convertForceFromBase(tensionInN, tensionUnit))} ${tensionUnit}`);
        } else {
          // Downward acceleration: T = m(g - a)
          if (accelerationInMps2 >= g) {
            setResult(null);
            setCalculation('Error: Downward acceleration cannot be greater than or equal to gravity (free fall or beyond)');
            return;
          }
          tensionInN = massInKg * (g - accelerationInMps2);
          formula = `T = m(g - a)`;
          setCalculation(`${formula} = ${formatValue(m)} ${massUnit} × (9.80665 m/s² - ${formatValue(a)} ${accelerationUnit}) = ${formatValue(convertForceFromBase(tensionInN, tensionUnit))} ${tensionUnit}`);
        }

        const tension = convertForceFromBase(tensionInN, tensionUnit);
        setResult({ value: tension, unit: tensionUnit });
      }
    } else if (method === 'force') {
      const f = force ? parseFloat(force) : NaN;

      if (!force) {
        setResult(null);
        setCalculation('Error: Force is required for this calculation');
        return;
      }

      if (isNaN(f) || f <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for force');
        return;
      }

      // Tension equals the applied force: T = F
      const forceInN = convertForceToBase(f, forceUnit);
      const tension = convertForceFromBase(forceInN, tensionUnit);
      
      setResult({ value: tension, unit: tensionUnit });
      setCalculation(`T = F = ${formatValue(f)} ${forceUnit} = ${formatValue(tension)} ${tensionUnit}`);
    }
  };

  const clearAll = () => {
    setMass('');
    setAcceleration('');
    setForce('');
    setTensionUnit('N');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tension Calculator</h2>
        <p className="text-gray-600">Calculate tension in ropes, cables, and strings using mass/acceleration or force</p>
      </div>

      <div className="space-y-6">
        {/* Method Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Calculation Method
          </label>
          <select
            value={method}
            onChange={(e) => {
              setMethod(e.target.value as CalculationMethod);
              clearAll();
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="mass-acceleration">Mass and Acceleration (T = m(g ± a))</option>
            <option value="force">Direct Force (T = F)</option>
          </select>
        </div>

        {/* Mass-Acceleration Method */}
        {method === 'mass-acceleration' && (
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
                Motion Type
              </label>
              <select
                value={accelerationDirection}
                onChange={(e) => {
                  setAccelerationDirection(e.target.value as 'up' | 'down' | 'static');
                  if (e.target.value === 'static') {
                    setAcceleration('');
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                <option value="static">Static (Hanging at Rest) - T = mg</option>
                <option value="up">Accelerating Upward - T = m(g + a)</option>
                <option value="down">Accelerating Downward - T = m(g - a)</option>
              </select>
            </div>

            {accelerationDirection !== 'static' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Acceleration (a)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Enter acceleration"
                      value={acceleration}
                      onChange={(e) => setAcceleration(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-48">
                    <select
                      value={accelerationUnit}
                      onChange={(e) => setAccelerationUnit(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                    >
                      {Object.entries(accelerationUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Force Method */}
        {method === 'force' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Force (F)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter force"
                  value={force}
                  onChange={(e) => setForce(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="w-40">
                <select
                  value={forceUnit}
                  onChange={(e) => setForceUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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
        )}

        {/* Tension Unit Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tension Unit (Result)
          </label>
          <select
            value={tensionUnit}
            onChange={(e) => setTensionUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            {Object.entries(forceUnits).map(([key, unit]) => (
              <option key={key} value={key}>
                {unit.name}
              </option>
            ))}
          </select>
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
            {calculation && !calculation.startsWith('Error:') && (
              <p className={`text-sm ${getResultTextColor()}/80 mt-2 font-mono break-words`}>
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
            {method === 'mass-acceleration' && (
              <>
                <li>• Enter the mass of the object</li>
                <li>• Select motion type: Static, Accelerating Upward, or Accelerating Downward</li>
                <li>• If accelerating, enter the acceleration value</li>
                <li>• Formulas: T = mg (static), T = m(g + a) (upward), T = m(g - a) (downward)</li>
              </>
            )}
            {method === 'force' && (
              <>
                <li>• Enter the force applied to the rope/cable</li>
                <li>• Formula: T = F (tension equals the applied force)</li>
              </>
            )}
            <li>• Select your preferred unit for tension result</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• Standard gravity (g) = 9.80665 m/s² is used in calculations</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

