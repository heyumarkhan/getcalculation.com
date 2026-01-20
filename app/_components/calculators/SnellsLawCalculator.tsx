'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion for angles
const angleUnits = {
  'degrees': { name: 'degrees (°)', factor: 1, toRadians: (val: number) => val * Math.PI / 180 },
  'radians': { name: 'radians (rad)', factor: 1, toRadians: (val: number) => val }
};

type CalculationMethod = 'refracted-angle' | 'refractive-index2' | 'refractive-index1';

export default function SnellsLawCalculator() {
  const [method, setMethod] = useState<CalculationMethod>('refracted-angle');
  
  // Input values
  const [n1, setN1] = useState('');
  const [theta1, setTheta1] = useState('');
  const [n2, setN2] = useState('');
  const [theta2, setTheta2] = useState('');
  
  const [angleUnit, setAngleUnit] = useState('degrees');
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

  const radiansToDegrees = (radians: number): number => {
    return radians * 180 / Math.PI;
  };

  const toRadians = (value: number, unit: string): number => {
    if (unit === 'radians') return value;
    return value * Math.PI / 180;
  };

  const fromRadians = (value: number, unit: string): number => {
    if (unit === 'radians') return value;
    return value * 180 / Math.PI;
  };

  const calculate = () => {
    if (method === 'refracted-angle') {
      const n1Val = n1 ? parseFloat(n1) : NaN;
      const theta1Val = theta1 ? parseFloat(theta1) : NaN;
      const n2Val = n2 ? parseFloat(n2) : NaN;

      if (!n1 || !theta1 || !n2) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(n1Val) || isNaN(theta1Val) || isNaN(n2Val) || n1Val <= 0 || n2Val <= 0 || theta1Val < 0 || theta1Val > 90) {
        setResult(null);
        setCalculation('Error: Refractive indices must be positive. Angle must be between 0-90 degrees.');
        return;
      }

      // Check for total internal reflection
      const sinTheta1 = Math.sin(toRadians(theta1Val, angleUnit));
      const sinTheta2 = (n1Val * sinTheta1) / n2Val;

      if (Math.abs(sinTheta2) > 1) {
        setResult(null);
        setCalculation('Error: Total internal reflection occurs. No refracted ray exists.');
        return;
      }

      // Calculate refracted angle: n1 sin(θ1) = n2 sin(θ2)
      const theta2Radians = Math.asin(sinTheta2);
      const theta2Val = fromRadians(theta2Radians, angleUnit);

      setResult({ value: theta2Val, unit: angleUnit === 'degrees' ? '°' : 'rad' });
      setCalculation(`n₁ sin(θ₁) = n₂ sin(θ₂) → θ₂ = arcsin((${formatValue(n1Val)} × sin(${formatValue(theta1Val)}°)) / ${formatValue(n2Val)}) = ${formatValue(theta2Val)}${angleUnit === 'degrees' ? '°' : ' rad'}`);
    } else if (method === 'refractive-index2') {
      const n1Val = n1 ? parseFloat(n1) : NaN;
      const theta1Val = theta1 ? parseFloat(theta1) : NaN;
      const theta2Val = theta2 ? parseFloat(theta2) : NaN;

      if (!n1 || !theta1 || !theta2) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(n1Val) || isNaN(theta1Val) || isNaN(theta2Val) || n1Val <= 0 || theta1Val < 0 || theta1Val > 90 || theta2Val < 0 || theta2Val > 90) {
        setResult(null);
        setCalculation('Error: Refractive index must be positive. Angles must be between 0-90 degrees.');
        return;
      }

      // Calculate n2: n2 = (n1 × sin(θ1)) / sin(θ2)
      const sinTheta2 = Math.sin(toRadians(theta2Val, angleUnit));
      if (Math.abs(sinTheta2) < 0.0001) {
        setResult(null);
        setCalculation('Error: Refracted angle cannot be 0 degrees.');
        return;
      }

      const sinTheta1 = Math.sin(toRadians(theta1Val, angleUnit));
      const n2Val = (n1Val * sinTheta1) / sinTheta2;

      setResult({ value: n2Val, unit: '' });
      setCalculation(`n₂ = (n₁ × sin(θ₁)) / sin(θ₂) = (${formatValue(n1Val)} × sin(${formatValue(theta1Val)}°)) / sin(${formatValue(theta2Val)}°) = ${formatValue(n2Val)}`);
    } else if (method === 'refractive-index1') {
      const n2Val = n2 ? parseFloat(n2) : NaN;
      const theta1Val = theta1 ? parseFloat(theta1) : NaN;
      const theta2Val = theta2 ? parseFloat(theta2) : NaN;

      if (!n2 || !theta1 || !theta2) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(n2Val) || isNaN(theta1Val) || isNaN(theta2Val) || n2Val <= 0 || theta1Val < 0 || theta1Val > 90 || theta2Val < 0 || theta2Val > 90) {
        setResult(null);
        setCalculation('Error: Refractive index must be positive. Angles must be between 0-90 degrees.');
        return;
      }

      // Calculate n1: n1 = (n2 × sin(θ2)) / sin(θ1)
      const sinTheta1 = Math.sin(toRadians(theta1Val, angleUnit));
      if (Math.abs(sinTheta1) < 0.0001) {
        setResult(null);
        setCalculation('Error: Incident angle cannot be 0 degrees.');
        return;
      }

      const sinTheta2 = Math.sin(toRadians(theta2Val, angleUnit));
      const n1Val = (n2Val * sinTheta2) / sinTheta1;

      setResult({ value: n1Val, unit: '' });
      setCalculation(`n₁ = (n₂ × sin(θ₂)) / sin(θ₁) = (${formatValue(n2Val)} × sin(${formatValue(theta2Val)}°)) / sin(${formatValue(theta1Val)}°) = ${formatValue(n1Val)}`);
    }
  };

  const clearAll = () => {
    setN1('');
    setTheta1('');
    setN2('');
    setTheta2('');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Snell's Law Calculator</h2>
        <p className="text-gray-600">Calculate refraction angles and refractive indices using n₁ sin(θ₁) = n₂ sin(θ₂)</p>
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
            <option value="refracted-angle">Find Refracted Angle (θ₂)</option>
            <option value="refractive-index2">Find Second Refractive Index (n₂)</option>
            <option value="refractive-index1">Find First Refractive Index (n₁)</option>
          </select>
        </div>

        {/* Angle Unit Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Angle Unit
          </label>
          <select
            value={angleUnit}
            onChange={(e) => setAngleUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="degrees">Degrees (°)</option>
            <option value="radians">Radians (rad)</option>
          </select>
        </div>

        {/* Refracted Angle Method */}
        {method === 'refracted-angle' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                First Refractive Index (n₁)
              </label>
              <Input
                type="text"
                placeholder="e.g., 1.0 (air), 1.33 (water), 1.5 (glass)"
                value={n1}
                onChange={(e) => setN1(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Incident Angle (θ₁)
              </label>
              <Input
                type="text"
                placeholder={`Enter angle in ${angleUnit}`}
                value={theta1}
                onChange={(e) => setTheta1(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Second Refractive Index (n₂)
              </label>
              <Input
                type="text"
                placeholder="e.g., 1.33 (water), 1.5 (glass), 2.42 (diamond)"
                value={n2}
                onChange={(e) => setN2(e.target.value)}
                className="w-full"
              />
            </div>
          </>
        )}

        {/* Second Refractive Index Method */}
        {method === 'refractive-index2' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                First Refractive Index (n₁)
              </label>
              <Input
                type="text"
                placeholder="e.g., 1.0 (air), 1.33 (water), 1.5 (glass)"
                value={n1}
                onChange={(e) => setN1(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Incident Angle (θ₁)
              </label>
              <Input
                type="text"
                placeholder={`Enter angle in ${angleUnit}`}
                value={theta1}
                onChange={(e) => setTheta1(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Refracted Angle (θ₂)
              </label>
              <Input
                type="text"
                placeholder={`Enter angle in ${angleUnit}`}
                value={theta2}
                onChange={(e) => setTheta2(e.target.value)}
                className="w-full"
              />
            </div>
          </>
        )}

        {/* First Refractive Index Method */}
        {method === 'refractive-index1' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Incident Angle (θ₁)
              </label>
              <Input
                type="text"
                placeholder={`Enter angle in ${angleUnit}`}
                value={theta1}
                onChange={(e) => setTheta1(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Refracted Angle (θ₂)
              </label>
              <Input
                type="text"
                placeholder={`Enter angle in ${angleUnit}`}
                value={theta2}
                onChange={(e) => setTheta2(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Second Refractive Index (n₂)
              </label>
              <Input
                type="text"
                placeholder="e.g., 1.33 (water), 1.5 (glass), 2.42 (diamond)"
                value={n2}
                onChange={(e) => setN2(e.target.value)}
                className="w-full"
              />
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
            <li>• Snell&apos;s Law: n₁ sin(θ₁) = n₂ sin(θ₂)</li>
            <li>• Refractive indices: air ≈ 1.0, water ≈ 1.33, glass ≈ 1.5, diamond ≈ 2.42</li>
            <li>• Angles are measured from the normal to the surface</li>
            <li>• Use degrees or radians as preferred</li>
            <li>• Total internal reflection occurs when light travels from denser to less dense medium</li>
            <li>• Critical angle: sin(θc) = n₂/n₁ (when n₁ &gt; n₂)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
