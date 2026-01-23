'use client';

import React, { useState } from 'react';

type Field = 'p1' | 'v1' | 'h1' | 'p2' | 'v2' | 'h2' | 'density' | null;

interface CalculatorState {
  p1: string; // Pressure at point 1
  v1: string; // Velocity at point 1
  h1: string; // Height at point 1
  p2: string; // Pressure at point 2
  v2: string; // Velocity at point 2
  h2: string; // Height at point 2
  density: string; // Fluid density
}

const BernoulliEquationCalculator: React.FC = () => {
  const [values, setValues] = useState<CalculatorState>({
    p1: '',
    v1: '',
    h1: '',
    p2: '',
    v2: '',
    h2: '',
    density: '1000', // Default water density in kg/m³
  });

  const [solveFor, setSolveFor] = useState<Field>(null);
  const [result, setResult] = useState<number | null>(null);

  // Unit conversion constants
  const pressureUnits = [
    { value: 1, label: 'Pa (Pascal)' },
    { value: 1000, label: 'kPa (Kilopascal)' },
    { value: 101325, label: 'atm (Atmosphere)' },
    { value: 6894.76, label: 'psi (Pound per square inch)' },
    { value: 100000, label: 'bar' },
  ];

  const velocityUnits = [
    { value: 1, label: 'm/s' },
    { value: 0.44704, label: 'mph' },
    { value: 0.277778, label: 'km/h' },
    { value: 0.514444, label: 'knots' },
    { value: 0.3048, label: 'ft/s' },
  ];

  const heightUnits = [
    { value: 1, label: 'm (meter)' },
    { value: 0.01, label: 'cm (centimeter)' },
    { value: 0.3048, label: 'ft (feet)' },
    { value: 0.0254, label: 'in (inch)' },
    { value: 1000, label: 'km (kilometer)' },
  ];

  const densityUnits = [
    { value: 1, label: 'kg/m³' },
    { value: 1000, label: 'g/cm³' },
    { value: 16.0185, label: 'lb/ft³' },
    { value: 0.0009765, label: 'lb/in³' },
  ];

  const [selectedPressureUnit, setSelectedPressureUnit] = useState(1);
  const [selectedVelocityUnit, setSelectedVelocityUnit] = useState(1);
  const [selectedHeightUnit, setSelectedHeightUnit] = useState(1);
  const [selectedDensityUnit, setSelectedDensityUnit] = useState(1);

  const g = 9.81; // Gravitational acceleration in m/s²

  const handleChange = (field: keyof CalculatorState, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setResult(null);
  };

  const calculate = () => {
    if (!solveFor) {
      alert('Please select what to solve for');
      return;
    }

    // Convert all values to SI units
    const p1_pa = values.p1 ? parseFloat(values.p1) * selectedPressureUnit : null;
    const p2_pa = values.p2 ? parseFloat(values.p2) * selectedPressureUnit : null;
    const v1_ms = values.v1 ? parseFloat(values.v1) * selectedVelocityUnit : null;
    const v2_ms = values.v2 ? parseFloat(values.v2) * selectedVelocityUnit : null;
    const h1_m = values.h1 ? parseFloat(values.h1) * selectedHeightUnit : null;
    const h2_m = values.h2 ? parseFloat(values.h2) * selectedHeightUnit : null;
    const rho = parseFloat(values.density) * selectedDensityUnit;

    // Bernoulli's equation: P1 + ½ρv1² + ρgh1 = P2 + ½ρv2² + ρgh2

    let calculatedResult: number | null = null;

    try {
      switch (solveFor) {
        case 'p1':
          if (p2_pa !== null && v1_ms !== null && v2_ms !== null && h1_m !== null && h2_m !== null) {
            calculatedResult = p2_pa + 0.5 * rho * (v2_ms ** 2 - v1_ms ** 2) + rho * g * (h2_m - h1_m);
            calculatedResult = calculatedResult / selectedPressureUnit; // Convert back to selected unit
          }
          break;

        case 'p2':
          if (p1_pa !== null && v1_ms !== null && v2_ms !== null && h1_m !== null && h2_m !== null) {
            calculatedResult = p1_pa + 0.5 * rho * (v1_ms ** 2 - v2_ms ** 2) + rho * g * (h1_m - h2_m);
            calculatedResult = calculatedResult / selectedPressureUnit; // Convert back to selected unit
          }
          break;

        case 'v1':
          if (p1_pa !== null && p2_pa !== null && v2_ms !== null && h1_m !== null && h2_m !== null) {
            const v1_squared = v2_ms ** 2 + (2 / rho) * (p1_pa - p2_pa) + 2 * g * (h1_m - h2_m);
            if (v1_squared < 0) {
              alert('Invalid calculation: negative velocity squared. Check your input values.');
              return;
            }
            calculatedResult = Math.sqrt(v1_squared) / selectedVelocityUnit;
          }
          break;

        case 'v2':
          if (p1_pa !== null && p2_pa !== null && v1_ms !== null && h1_m !== null && h2_m !== null) {
            const v2_squared = v1_ms ** 2 + (2 / rho) * (p1_pa - p2_pa) + 2 * g * (h1_m - h2_m);
            if (v2_squared < 0) {
              alert('Invalid calculation: negative velocity squared. Check your input values.');
              return;
            }
            calculatedResult = Math.sqrt(v2_squared) / selectedVelocityUnit;
          }
          break;

        case 'h1':
          if (p1_pa !== null && p2_pa !== null && v1_ms !== null && v2_ms !== null && h2_m !== null) {
            calculatedResult = h2_m + (p1_pa - p2_pa) / (rho * g) + (v1_ms ** 2 - v2_ms ** 2) / (2 * g);
            calculatedResult = calculatedResult / selectedHeightUnit;
          }
          break;

        case 'h2':
          if (p1_pa !== null && p2_pa !== null && v1_ms !== null && v2_ms !== null && h1_m !== null) {
            calculatedResult = h1_m - (p1_pa - p2_pa) / (rho * g) - (v1_ms ** 2 - v2_ms ** 2) / (2 * g);
            calculatedResult = calculatedResult / selectedHeightUnit;
          }
          break;

        case 'density':
          if (p1_pa !== null && p2_pa !== null && v1_ms !== null && v2_ms !== null && h1_m !== null && h2_m !== null) {
            const deltaP = p1_pa - p2_pa;
            const deltaV_squared = v1_ms ** 2 - v2_ms ** 2;
            const deltaH = h1_m - h2_m;
            calculatedResult = deltaP / (0.5 * deltaV_squared + g * deltaH);
            calculatedResult = calculatedResult / selectedDensityUnit;
          }
          break;

        default:
          break;
      }

      if (calculatedResult !== null && !isNaN(calculatedResult) && isFinite(calculatedResult)) {
        setResult(calculatedResult);
      } else {
        alert('Cannot calculate. Please ensure all required fields are filled with valid numbers.');
      }
    } catch (error) {
      alert('Error in calculation. Please check your inputs.');
    }
  };

  const reset = () => {
    setValues({
      p1: '',
      v1: '',
      h1: '',
      p2: '',
      v2: '',
      h2: '',
      density: '1000',
    });
    setSolveFor(null);
    setResult(null);
    setSelectedPressureUnit(1);
    setSelectedVelocityUnit(1);
    setSelectedHeightUnit(1);
    setSelectedDensityUnit(1);
  };

  const getFieldLabel = (field: Field): string => {
    const labels: Record<string, string> = {
      p1: 'Pressure at Point 1',
      p2: 'Pressure at Point 2',
      v1: 'Velocity at Point 1',
      v2: 'Velocity at Point 2',
      h1: 'Height at Point 1',
      h2: 'Height at Point 2',
      density: 'Fluid Density',
    };
    return field ? labels[field] : '';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center" style={{ color: '#820ECC' }}>
        Bernoulli Equation Calculator
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Calculate pressure, velocity, or height using Bernoulli's equation for fluid flow
      </p>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-3" style={{ color: '#820ECC' }}>
          Bernoulli&apos;s Equation
        </h2>
        <p className="text-center text-xl font-mono mb-2">
          P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂
        </p>
        <p className="text-sm text-gray-600 text-center">
          Where P = pressure, ρ = density, v = velocity, g = gravitational acceleration (9.81 m/s²), h = height
        </p>
      </div>

      {/* Solve For Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Solve For:
        </label>
        <select
          value={solveFor || ''}
          onChange={(e) => setSolveFor(e.target.value as Field)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">-- Select Variable --</option>
          <option value="p1">Pressure at Point 1 (P₁)</option>
          <option value="p2">Pressure at Point 2 (P₂)</option>
          <option value="v1">Velocity at Point 1 (v₁)</option>
          <option value="v2">Velocity at Point 2 (v₂)</option>
          <option value="h1">Height at Point 1 (h₁)</option>
          <option value="h2">Height at Point 2 (h₂)</option>
          <option value="density">Fluid Density (ρ)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Point 1 Parameters */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 border-b pb-2">Point 1 Parameters</h3>
          
          {/* Pressure 1 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pressure 1 (P₁) {solveFor === 'p1' && <span className="text-red-500">*Solving for this</span>}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={values.p1}
                onChange={(e) => handleChange('p1', e.target.value)}
                disabled={solveFor === 'p1'}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="Enter pressure"
                step="any"
              />
              <select
                value={selectedPressureUnit}
                onChange={(e) => setSelectedPressureUnit(Number(e.target.value))}
                className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {pressureUnits.map((unit) => (
                  <option key={unit.label} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Velocity 1 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Velocity 1 (v₁) {solveFor === 'v1' && <span className="text-red-500">*Solving for this</span>}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={values.v1}
                onChange={(e) => handleChange('v1', e.target.value)}
                disabled={solveFor === 'v1'}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="Enter velocity"
                step="any"
              />
              <select
                value={selectedVelocityUnit}
                onChange={(e) => setSelectedVelocityUnit(Number(e.target.value))}
                className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {velocityUnits.map((unit) => (
                  <option key={unit.label} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Height 1 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height 1 (h₁) {solveFor === 'h1' && <span className="text-red-500">*Solving for this</span>}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={values.h1}
                onChange={(e) => handleChange('h1', e.target.value)}
                disabled={solveFor === 'h1'}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="Enter height"
                step="any"
              />
              <select
                value={selectedHeightUnit}
                onChange={(e) => setSelectedHeightUnit(Number(e.target.value))}
                className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {heightUnits.map((unit) => (
                  <option key={unit.label} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Point 2 Parameters */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 border-b pb-2">Point 2 Parameters</h3>
          
          {/* Pressure 2 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pressure 2 (P₂) {solveFor === 'p2' && <span className="text-red-500">*Solving for this</span>}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={values.p2}
                onChange={(e) => handleChange('p2', e.target.value)}
                disabled={solveFor === 'p2'}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="Enter pressure"
                step="any"
              />
              <select
                value={selectedPressureUnit}
                onChange={(e) => setSelectedPressureUnit(Number(e.target.value))}
                className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {pressureUnits.map((unit) => (
                  <option key={unit.label} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Velocity 2 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Velocity 2 (v₂) {solveFor === 'v2' && <span className="text-red-500">*Solving for this</span>}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={values.v2}
                onChange={(e) => handleChange('v2', e.target.value)}
                disabled={solveFor === 'v2'}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="Enter velocity"
                step="any"
              />
              <select
                value={selectedVelocityUnit}
                onChange={(e) => setSelectedVelocityUnit(Number(e.target.value))}
                className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {velocityUnits.map((unit) => (
                  <option key={unit.label} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Height 2 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height 2 (h₂) {solveFor === 'h2' && <span className="text-red-500">*Solving for this</span>}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={values.h2}
                onChange={(e) => handleChange('h2', e.target.value)}
                disabled={solveFor === 'h2'}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="Enter height"
                step="any"
              />
              <select
                value={selectedHeightUnit}
                onChange={(e) => setSelectedHeightUnit(Number(e.target.value))}
                className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {heightUnits.map((unit) => (
                  <option key={unit.label} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Fluid Density */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fluid Density (ρ) {solveFor === 'density' && <span className="text-red-500">*Solving for this</span>}
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={values.density}
            onChange={(e) => handleChange('density', e.target.value)}
            disabled={solveFor === 'density'}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
            placeholder="Enter density (default: 1000 kg/m³ for water)"
            step="any"
          />
          <select
            value={selectedDensityUnit}
            onChange={(e) => setSelectedDensityUnit(Number(e.target.value))}
            className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            {densityUnits.map((unit) => (
              <option key={unit.label} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={calculate}
          className="flex-1 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#820ECC' }}
        >
          Calculate
        </button>
        <button
          onClick={reset}
          className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Result Display */}
      {result !== null && solveFor && (
        <div className="mt-6 p-6 rounded-lg text-center" style={{ backgroundColor: '#f3e8ff' }}>
          <h2 className="text-xl font-bold mb-2" style={{ color: '#820ECC' }}>
            Result
          </h2>
          <p className="text-3xl font-bold text-gray-800">
            {getFieldLabel(solveFor)}: {result.toFixed(4)}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            {solveFor === 'p1' || solveFor === 'p2'
              ? pressureUnits.find((u) => u.value === selectedPressureUnit)?.label
              : solveFor === 'v1' || solveFor === 'v2'
              ? velocityUnits.find((u) => u.value === selectedVelocityUnit)?.label
              : solveFor === 'h1' || solveFor === 'h2'
              ? heightUnits.find((u) => u.value === selectedHeightUnit)?.label
              : densityUnits.find((u) => u.value === selectedDensityUnit)?.label}
          </p>
        </div>
      )}

      {/* Common Fluid Densities Reference */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-2">Common Fluid Densities (at 20°C)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div><strong>Water:</strong> 1000 kg/m³</div>
          <div><strong>Air:</strong> 1.2 kg/m³</div>
          <div><strong>Gasoline:</strong> 720 kg/m³</div>
          <div><strong>Oil:</strong> 900 kg/m³</div>
          <div><strong>Mercury:</strong> 13546 kg/m³</div>
          <div><strong>Ethanol:</strong> 789 kg/m³</div>
          <div><strong>Seawater:</strong> 1025 kg/m³</div>
          <div><strong>Glycerin:</strong> 1260 kg/m³</div>
        </div>
      </div>
    </div>
  );
};

export default BernoulliEquationCalculator;
