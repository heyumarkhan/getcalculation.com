'use client';

import React, { useState } from 'react';

type CalculationMode = 'pointCharge' | 'forceCharge' | 'voltageDistance' | null;

interface CalculatorState {
  // Point charge: E = kQ/r²
  charge: string;
  distance: string;
  
  // Force and charge: E = F/q
  force: string;
  testCharge: string;
  
  // Voltage and distance: E = V/d
  voltage: string;
  separation: string;
}

const ElectricFieldCalculator: React.FC = () => {
  const [values, setValues] = useState<CalculatorState>({
    charge: '',
    distance: '',
    force: '',
    testCharge: '',
    voltage: '',
    separation: '',
  });

  const [mode, setMode] = useState<CalculationMode>(null);
  const [result, setResult] = useState<number | null>(null);

  // Coulomb's constant
  const k = 8.99e9; // N⋅m²/C²

  // Unit conversion constants
  const chargeUnits = [
    { value: 1, label: 'C (Coulomb)' },
    { value: 1e-6, label: 'µC (Microcoulomb)' },
    { value: 1e-9, label: 'nC (Nanocoulomb)' },
    { value: 1e-12, label: 'pC (Picocoulomb)' },
    { value: 1.602176634e-19, label: 'e (Elementary charge)' },
  ];

  const distanceUnits = [
    { value: 1, label: 'm (meter)' },
    { value: 0.01, label: 'cm (centimeter)' },
    { value: 0.001, label: 'mm (millimeter)' },
    { value: 1e-6, label: 'µm (micrometer)' },
    { value: 1e-9, label: 'nm (nanometer)' },
    { value: 0.3048, label: 'ft (feet)' },
    { value: 0.0254, label: 'in (inch)' },
  ];

  const forceUnits = [
    { value: 1, label: 'N (Newton)' },
    { value: 1e-3, label: 'mN (Millinewton)' },
    { value: 1e-6, label: 'µN (Micronewton)' },
    { value: 1e-9, label: 'nN (Nanonewton)' },
    { value: 4.448222, label: 'lbf (Pound-force)' },
  ];

  const voltageUnits = [
    { value: 1, label: 'V (Volt)' },
    { value: 1000, label: 'kV (Kilovolt)' },
    { value: 1e6, label: 'MV (Megavolt)' },
    { value: 0.001, label: 'mV (Millivolt)' },
  ];

  const [selectedChargeUnit, setSelectedChargeUnit] = useState(1);
  const [selectedDistanceUnit, setSelectedDistanceUnit] = useState(1);
  const [selectedForceUnit, setSelectedForceUnit] = useState(1);
  const [selectedTestChargeUnit, setSelectedTestChargeUnit] = useState(1);
  const [selectedVoltageUnit, setSelectedVoltageUnit] = useState(1);
  const [selectedSeparationUnit, setSelectedSeparationUnit] = useState(1);

  const handleChange = (field: keyof CalculatorState, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setResult(null);
  };

  const calculate = () => {
    if (!mode) {
      alert('Please select a calculation method');
      return;
    }

    let calculatedResult: number | null = null;

    try {
      switch (mode) {
        case 'pointCharge': {
          // E = kQ/r²
          const Q = parseFloat(values.charge) * selectedChargeUnit;
          const r = parseFloat(values.distance) * selectedDistanceUnit;
          
          if (!values.charge || !values.distance) {
            alert('Please enter both charge and distance');
            return;
          }
          
          if (r === 0) {
            alert('Distance cannot be zero');
            return;
          }
          
          calculatedResult = (k * Math.abs(Q)) / (r * r);
          break;
        }

        case 'forceCharge': {
          // E = F/q
          const F = parseFloat(values.force) * selectedForceUnit;
          const q = parseFloat(values.testCharge) * selectedTestChargeUnit;
          
          if (!values.force || !values.testCharge) {
            alert('Please enter both force and test charge');
            return;
          }
          
          if (q === 0) {
            alert('Test charge cannot be zero');
            return;
          }
          
          calculatedResult = Math.abs(F / q);
          break;
        }

        case 'voltageDistance': {
          // E = V/d
          const V = parseFloat(values.voltage) * selectedVoltageUnit;
          const d = parseFloat(values.separation) * selectedSeparationUnit;
          
          if (!values.voltage || !values.separation) {
            alert('Please enter both voltage and distance');
            return;
          }
          
          if (d === 0) {
            alert('Distance cannot be zero');
            return;
          }
          
          calculatedResult = Math.abs(V / d);
          break;
        }

        default:
          break;
      }

      if (calculatedResult !== null && !isNaN(calculatedResult) && isFinite(calculatedResult)) {
        setResult(calculatedResult);
      } else {
        alert('Cannot calculate. Please check your inputs.');
      }
    } catch (error) {
      alert('Error in calculation. Please check your inputs.');
    }
  };

  const reset = () => {
    setValues({
      charge: '',
      distance: '',
      force: '',
      testCharge: '',
      voltage: '',
      separation: '',
    });
    setMode(null);
    setResult(null);
    setSelectedChargeUnit(1);
    setSelectedDistanceUnit(1);
    setSelectedForceUnit(1);
    setSelectedTestChargeUnit(1);
    setSelectedVoltageUnit(1);
    setSelectedSeparationUnit(1);
  };

  const formatScientific = (value: number): string => {
    if (value === 0) return '0';
    const exponent = Math.floor(Math.log10(Math.abs(value)));
    const mantissa = value / Math.pow(10, exponent);
    
    if (exponent >= -2 && exponent <= 4) {
      return value.toFixed(6);
    }
    
    return `${mantissa.toFixed(4)} × 10^${exponent}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center" style={{ color: '#820ECC' }}>
        Electric Field Calculator
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Calculate electric field strength using point charge, force, or voltage methods
      </p>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-3" style={{ color: '#820ECC' }}>
          Electric Field Formulas
        </h2>
        <div className="space-y-2">
          <p className="text-center text-lg font-mono">E = kQ/r² (Point Charge)</p>
          <p className="text-center text-lg font-mono">E = F/q (Force on Charge)</p>
          <p className="text-center text-lg font-mono">E = V/d (Voltage & Distance)</p>
        </div>
        <p className="text-sm text-gray-600 text-center mt-3">
          Where k = 8.99 × 10⁹ N⋅m²/C², E = electric field (N/C or V/m)
        </p>
      </div>

      {/* Calculation Method Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Calculation Method:
        </label>
        <select
          value={mode || ''}
          onChange={(e) => setMode(e.target.value as CalculationMode)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">-- Select Method --</option>
          <option value="pointCharge">Point Charge (E = kQ/r²)</option>
          <option value="forceCharge">Force on Charge (E = F/q)</option>
          <option value="voltageDistance">Voltage & Distance (E = V/d)</option>
        </select>
      </div>

      {/* Point Charge Method */}
      {mode === 'pointCharge' && (
        <div className="space-y-4 mb-6 p-4 border-2 border-purple-200 rounded-lg">
          <h3 className="font-semibold text-gray-700">Point Charge Method: E = kQ/r²</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Source Charge (Q)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={values.charge}
                onChange={(e) => handleChange('charge', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter charge"
                step="any"
              />
              <select
                value={selectedChargeUnit}
                onChange={(e) => setSelectedChargeUnit(Number(e.target.value))}
                className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {chargeUnits.map((unit) => (
                  <option key={unit.label} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Distance from Charge (r)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={values.distance}
                onChange={(e) => handleChange('distance', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter distance"
                step="any"
              />
              <select
                value={selectedDistanceUnit}
                onChange={(e) => setSelectedDistanceUnit(Number(e.target.value))}
                className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {distanceUnits.map((unit) => (
                  <option key={unit.label} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Force on Charge Method */}
      {mode === 'forceCharge' && (
        <div className="space-y-4 mb-6 p-4 border-2 border-purple-200 rounded-lg">
          <h3 className="font-semibold text-gray-700">Force on Charge Method: E = F/q</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Force (F)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={values.force}
                onChange={(e) => handleChange('force', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter force"
                step="any"
              />
              <select
                value={selectedForceUnit}
                onChange={(e) => setSelectedForceUnit(Number(e.target.value))}
                className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {forceUnits.map((unit) => (
                  <option key={unit.label} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Test Charge (q)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={values.testCharge}
                onChange={(e) => handleChange('testCharge', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter test charge"
                step="any"
              />
              <select
                value={selectedTestChargeUnit}
                onChange={(e) => setSelectedTestChargeUnit(Number(e.target.value))}
                className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {chargeUnits.map((unit) => (
                  <option key={unit.label} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Voltage and Distance Method */}
      {mode === 'voltageDistance' && (
        <div className="space-y-4 mb-6 p-4 border-2 border-purple-200 rounded-lg">
          <h3 className="font-semibold text-gray-700">Voltage & Distance Method: E = V/d</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Voltage (V)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={values.voltage}
                onChange={(e) => handleChange('voltage', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter voltage"
                step="any"
              />
              <select
                value={selectedVoltageUnit}
                onChange={(e) => setSelectedVoltageUnit(Number(e.target.value))}
                className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {voltageUnits.map((unit) => (
                  <option key={unit.label} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Distance between Plates (d)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={values.separation}
                onChange={(e) => handleChange('separation', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter distance"
                step="any"
              />
              <select
                value={selectedSeparationUnit}
                onChange={(e) => setSelectedSeparationUnit(Number(e.target.value))}
                className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {distanceUnits.map((unit) => (
                  <option key={unit.label} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {mode && (
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
      )}

      {/* Result Display */}
      {result !== null && (
        <div className="mt-6 p-6 rounded-lg" style={{ backgroundColor: '#f3e8ff' }}>
          <h2 className="text-xl font-bold mb-4 text-center" style={{ color: '#820ECC' }}>
            Electric Field Strength
          </h2>
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="text-4xl font-bold text-gray-800 mb-2">
              {formatScientific(result)}
            </p>
            <p className="text-lg text-gray-600">N/C (or V/m)</p>
            <p className="text-sm text-gray-500 mt-3">
              Newtons per Coulomb (equivalent to Volts per meter)
            </p>
          </div>
        </div>
      )}

      {/* Reference Information */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-3">Electric Field Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Common Electric Fields:</h4>
            <ul className="space-y-1">
              <li><strong>Fair weather field:</strong> ~100 V/m</li>
              <li><strong>Thunderstorm:</strong> ~10,000 V/m</li>
              <li><strong>Lightning:</strong> ~3 × 10⁶ V/m</li>
              <li><strong>Air breakdown:</strong> ~3 × 10⁶ V/m</li>
              <li><strong>Near electron:</strong> ~10¹¹ V/m</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Key Constants:</h4>
            <ul className="space-y-1">
              <li><strong>k (Coulomb):</strong> 8.99 × 10⁹ N⋅m²/C²</li>
              <li><strong>ε₀ (Permittivity):</strong> 8.85 × 10⁻¹² F/m</li>
              <li><strong>e (Electron):</strong> 1.602 × 10⁻¹⁹ C</li>
              <li><strong>1 N/C:</strong> = 1 V/m</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricFieldCalculator;
