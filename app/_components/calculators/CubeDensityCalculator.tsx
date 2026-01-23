'use client';

import React, { useState } from 'react';

type Field = 'density' | 'mass' | 'sideLength' | null;

interface CalculatorState {
  density: string;
  mass: string;
  sideLength: string;
}

const CubeDensityCalculator: React.FC = () => {
  const [values, setValues] = useState<CalculatorState>({
    density: '',
    mass: '',
    sideLength: '',
  });

  const [solveFor, setSolveFor] = useState<Field>(null);
  const [result, setResult] = useState<number | null>(null);

  // Unit conversion constants
  const densityUnits = [
    { value: 1, label: 'kg/m³' },
    { value: 1000, label: 'g/cm³' },
    { value: 16.0185, label: 'lb/ft³' },
    { value: 0.0009765, label: 'lb/in³' },
    { value: 0.001, label: 'kg/L' },
  ];

  const massUnits = [
    { value: 1, label: 'kg (kilogram)' },
    { value: 0.001, label: 'g (gram)' },
    { value: 0.453592, label: 'lb (pound)' },
    { value: 0.0283495, label: 'oz (ounce)' },
    { value: 1000, label: 't (metric ton)' },
  ];

  const lengthUnits = [
    { value: 1, label: 'm (meter)' },
    { value: 0.01, label: 'cm (centimeter)' },
    { value: 0.001, label: 'mm (millimeter)' },
    { value: 0.3048, label: 'ft (feet)' },
    { value: 0.0254, label: 'in (inch)' },
  ];

  const [selectedDensityUnit, setSelectedDensityUnit] = useState(1);
  const [selectedMassUnit, setSelectedMassUnit] = useState(1);
  const [selectedLengthUnit, setSelectedLengthUnit] = useState(1);

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
    const density_si = values.density ? parseFloat(values.density) * selectedDensityUnit : null;
    const mass_si = values.mass ? parseFloat(values.mass) * selectedMassUnit : null;
    const side_si = values.sideLength ? parseFloat(values.sideLength) * selectedLengthUnit : null;

    let calculatedResult: number | null = null;

    try {
      switch (solveFor) {
        case 'density':
          // ρ = m / V, where V = s³
          if (mass_si !== null && side_si !== null) {
            const volume = Math.pow(side_si, 3);
            calculatedResult = mass_si / volume;
            calculatedResult = calculatedResult / selectedDensityUnit; // Convert back to selected unit
          }
          break;

        case 'mass':
          // m = ρ × V, where V = s³
          if (density_si !== null && side_si !== null) {
            const volume = Math.pow(side_si, 3);
            calculatedResult = density_si * volume;
            calculatedResult = calculatedResult / selectedMassUnit; // Convert back to selected unit
          }
          break;

        case 'sideLength':
          // s = ∛(m / ρ)
          if (mass_si !== null && density_si !== null) {
            const volume = mass_si / density_si;
            calculatedResult = Math.pow(volume, 1 / 3);
            calculatedResult = calculatedResult / selectedLengthUnit; // Convert back to selected unit
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
      density: '',
      mass: '',
      sideLength: '',
    });
    setSolveFor(null);
    setResult(null);
    setSelectedDensityUnit(1);
    setSelectedMassUnit(1);
    setSelectedLengthUnit(1);
  };

  const getFieldLabel = (field: Field): string => {
    const labels: Record<string, string> = {
      density: 'Density (ρ)',
      mass: 'Mass (m)',
      sideLength: 'Side Length (s)',
    };
    return field ? labels[field] : '';
  };

  const getResultUnit = (): string => {
    if (!solveFor) return '';
    switch (solveFor) {
      case 'density':
        return densityUnits.find((u) => u.value === selectedDensityUnit)?.label || '';
      case 'mass':
        return massUnits.find((u) => u.value === selectedMassUnit)?.label || '';
      case 'sideLength':
        return lengthUnits.find((u) => u.value === selectedLengthUnit)?.label || '';
      default:
        return '';
    }
  };

  // Calculate additional properties when all values are known
  const volume = result !== null && solveFor === 'sideLength' 
    ? Math.pow(result * selectedLengthUnit, 3) 
    : values.sideLength 
    ? Math.pow(parseFloat(values.sideLength) * selectedLengthUnit, 3) 
    : null;

  const surfaceArea = result !== null && solveFor === 'sideLength'
    ? 6 * Math.pow(result * selectedLengthUnit, 2)
    : values.sideLength
    ? 6 * Math.pow(parseFloat(values.sideLength) * selectedLengthUnit, 2)
    : null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center" style={{ color: '#820ECC' }}>
        Cube Density Calculator
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Calculate density, mass, or side length of a cube using the density formula ρ = m/V
      </p>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-3" style={{ color: '#820ECC' }}>
          Cube Density Formulas
        </h2>
        <div className="space-y-2">
          <p className="text-center text-lg font-mono">ρ = m / V = m / s³</p>
          <p className="text-center text-lg font-mono">m = ρ × s³</p>
          <p className="text-center text-lg font-mono">s = ∛(m / ρ)</p>
        </div>
        <p className="text-sm text-gray-600 text-center mt-3">
          Where ρ = density, m = mass, s = side length, V = volume = s³
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
          <option value="density">Density (ρ)</option>
          <option value="mass">Mass (m)</option>
          <option value="sideLength">Side Length (s)</option>
        </select>
      </div>

      <div className="space-y-4 mb-6">
        {/* Density Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Density (ρ) {solveFor === 'density' && <span className="text-red-500">*Solving for this</span>}
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={values.density}
              onChange={(e) => handleChange('density', e.target.value)}
              disabled={solveFor === 'density'}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="Enter density"
              step="any"
            />
            <select
              value={selectedDensityUnit}
              onChange={(e) => setSelectedDensityUnit(Number(e.target.value))}
              disabled={solveFor === 'density'}
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

        {/* Mass Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mass (m) {solveFor === 'mass' && <span className="text-red-500">*Solving for this</span>}
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={values.mass}
              onChange={(e) => handleChange('mass', e.target.value)}
              disabled={solveFor === 'mass'}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="Enter mass"
              step="any"
            />
            <select
              value={selectedMassUnit}
              onChange={(e) => setSelectedMassUnit(Number(e.target.value))}
              disabled={solveFor === 'mass'}
              className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              {massUnits.map((unit) => (
                <option key={unit.label} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Side Length Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Side Length (s) {solveFor === 'sideLength' && <span className="text-red-500">*Solving for this</span>}
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={values.sideLength}
              onChange={(e) => handleChange('sideLength', e.target.value)}
              disabled={solveFor === 'sideLength'}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="Enter side length"
              step="any"
            />
            <select
              value={selectedLengthUnit}
              onChange={(e) => setSelectedLengthUnit(Number(e.target.value))}
              disabled={solveFor === 'sideLength'}
              className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              {lengthUnits.map((unit) => (
                <option key={unit.label} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
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
        <div className="mt-6 p-6 rounded-lg" style={{ backgroundColor: '#f3e8ff' }}>
          <h2 className="text-xl font-bold mb-4 text-center" style={{ color: '#820ECC' }}>
            Results
          </h2>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">{getFieldLabel(solveFor)}</p>
              <p className="text-3xl font-bold text-gray-800">
                {result.toFixed(6)} <span className="text-xl">{getResultUnit()}</span>
              </p>
            </div>

            {volume !== null && (
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Volume (V = s³)</p>
                <p className="text-2xl font-bold text-gray-800">
                  {volume.toFixed(6)} <span className="text-lg">m³</span>
                </p>
              </div>
            )}

            {surfaceArea !== null && (
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Surface Area (SA = 6s²)</p>
                <p className="text-2xl font-bold text-gray-800">
                  {surfaceArea.toFixed(6)} <span className="text-lg">m²</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Common Material Densities Reference */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-3">Common Material Densities (at 20°C)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <strong>Metals:</strong>
            <ul className="mt-1 space-y-1">
              <li>Aluminum: 2700 kg/m³</li>
              <li>Copper: 8960 kg/m³</li>
              <li>Iron: 7874 kg/m³</li>
              <li>Steel: 7850 kg/m³</li>
              <li>Gold: 19320 kg/m³</li>
              <li>Silver: 10490 kg/m³</li>
            </ul>
          </div>
          <div>
            <strong>Wood:</strong>
            <ul className="mt-1 space-y-1">
              <li>Balsa: 170 kg/m³</li>
              <li>Pine: 500 kg/m³</li>
              <li>Oak: 750 kg/m³</li>
              <li>Teak: 630 kg/m³</li>
              <li>Mahogany: 550 kg/m³</li>
            </ul>
          </div>
          <div>
            <strong>Plastics:</strong>
            <ul className="mt-1 space-y-1">
              <li>PVC: 1380 kg/m³</li>
              <li>Polystyrene: 1050 kg/m³</li>
              <li>Nylon: 1150 kg/m³</li>
              <li>Acrylic: 1180 kg/m³</li>
              <li>HDPE: 950 kg/m³</li>
            </ul>
          </div>
          <div>
            <strong>Other:</strong>
            <ul className="mt-1 space-y-1">
              <li>Concrete: 2400 kg/m³</li>
              <li>Glass: 2500 kg/m³</li>
              <li>Ice: 917 kg/m³</li>
              <li>Rubber: 1100 kg/m³</li>
              <li>Cork: 240 kg/m³</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CubeDensityCalculator;
