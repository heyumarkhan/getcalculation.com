'use client';

import { useState } from 'react';

type CalculationMode = 'flowRate' | 'pressureDrop' | 'diameter';

const flowRateUnits = [
  { value: 'm3/s', label: 'm³/s', toBase: 1 },
  { value: 'L/s', label: 'L/s', toBase: 0.001 },
  { value: 'L/min', label: 'L/min', toBase: 0.001 / 60 },
  { value: 'gpm', label: 'GPM (US)', toBase: 0.00006309 },
  { value: 'cfm', label: 'CFM', toBase: 0.0004719 },
];

const pressureUnits = [
  { value: 'Pa', label: 'Pa', toBase: 1 },
  { value: 'kPa', label: 'kPa', toBase: 1000 },
  { value: 'bar', label: 'bar', toBase: 100000 },
  { value: 'psi', label: 'psi', toBase: 6894.76 },
  { value: 'mmHg', label: 'mmHg', toBase: 133.322 },
];

const densityUnits = [
  { value: 'kg/m3', label: 'kg/m³', toBase: 1 },
  { value: 'g/cm3', label: 'g/cm³', toBase: 1000 },
  { value: 'lb/ft3', label: 'lb/ft³', toBase: 16.0185 },
];

const diameterUnits = [
  { value: 'mm', label: 'mm', toBase: 0.001 },
  { value: 'cm', label: 'cm', toBase: 0.01 },
  { value: 'm', label: 'm', toBase: 1 },
  { value: 'in', label: 'in', toBase: 0.0254 },
  { value: 'ft', label: 'ft', toBase: 0.3048 },
];

export default function OrificeFlowCalculator() {
  const [mode, setMode] = useState<CalculationMode>('flowRate');
  
  const [diameter, setDiameter] = useState('');
  const [diameterUnit, setDiameterUnit] = useState('mm');
  
  const [pressureDrop, setPressureDrop] = useState('');
  const [pressureUnit, setPressureUnit] = useState('Pa');
  
  const [density, setDensity] = useState('');
  const [densityUnit, setDensityUnit] = useState('kg/m3');
  
  const [flowRate, setFlowRate] = useState('');
  const [flowRateUnit, setFlowRateUnit] = useState('L/s');
  
  const [dischargeCoefficient, setDischargeCoefficient] = useState('0.61');
  
  const [result, setResult] = useState<{
    flowRate?: number;
    pressureDrop?: number;
    diameter?: number;
    velocity?: number;
    area?: number;
  } | null>(null);

  const convertToBase = (value: number, unit: string, units: typeof flowRateUnits) => {
    const unitData = units.find(u => u.value === unit);
    return value * (unitData?.toBase || 1);
  };

  const convertFromBase = (value: number, unit: string, units: typeof flowRateUnits) => {
    const unitData = units.find(u => u.value === unit);
    return value / (unitData?.toBase || 1);
  };

  const formatResult = (value: number): string => {
    if (Math.abs(value) >= 1000000) {
      return value.toExponential(4);
    } else if (Math.abs(value) >= 1000) {
      return value.toFixed(2);
    } else if (Math.abs(value) >= 1) {
      return value.toFixed(4);
    } else if (Math.abs(value) >= 0.0001) {
      return value.toFixed(6);
    } else {
      return value.toExponential(4);
    }
  };

  const calculate = () => {
    try {
      const Cd = parseFloat(dischargeCoefficient);
      
      if (Cd <= 0 || Cd > 1) {
        alert('Discharge coefficient must be between 0 and 1 (typically 0.6-0.98)');
        return;
      }

      if (mode === 'flowRate') {
        // Calculate flow rate: Q = Cd × A × √(2ΔP/ρ)
        if (!diameter || !pressureDrop || !density) {
          alert('Please enter diameter, pressure drop, and density');
          return;
        }
        
        const d = convertToBase(parseFloat(diameter), diameterUnit, diameterUnits);
        const dP = convertToBase(parseFloat(pressureDrop), pressureUnit, pressureUnits);
        const rho = convertToBase(parseFloat(density), densityUnit, densityUnits);
        
        if (rho <= 0) {
          alert('Density must be greater than zero');
          return;
        }
        
        const area = Math.PI * (d / 2) ** 2;
        const velocity = Math.sqrt((2 * dP) / rho);
        const Q = Cd * area * velocity;
        
        setResult({
          flowRate: Q,
          velocity,
          area,
        });
      } else if (mode === 'pressureDrop') {
        // Calculate pressure drop: ΔP = (Q / (Cd × A))² × ρ / 2
        if (!diameter || !flowRate || !density) {
          alert('Please enter diameter, flow rate, and density');
          return;
        }
        
        const d = convertToBase(parseFloat(diameter), diameterUnit, diameterUnits);
        const Q = convertToBase(parseFloat(flowRate), flowRateUnit, flowRateUnits);
        const rho = convertToBase(parseFloat(density), densityUnit, densityUnits);
        
        if (rho <= 0) {
          alert('Density must be greater than zero');
          return;
        }
        
        const area = Math.PI * (d / 2) ** 2;
        const velocity = Q / area;
        const dP = ((Q / (Cd * area)) ** 2) * (rho / 2);
        
        setResult({
          pressureDrop: dP,
          velocity,
          area,
        });
      } else if (mode === 'diameter') {
        // Calculate diameter: d = 2 × √(Q / (Cd × π × √(2ΔP/ρ)))
        if (!flowRate || !pressureDrop || !density) {
          alert('Please enter flow rate, pressure drop, and density');
          return;
        }
        
        const Q = convertToBase(parseFloat(flowRate), flowRateUnit, flowRateUnits);
        const dP = convertToBase(parseFloat(pressureDrop), pressureUnit, pressureUnits);
        const rho = convertToBase(parseFloat(density), densityUnit, densityUnits);
        
        if (rho <= 0) {
          alert('Density must be greater than zero');
          return;
        }
        
        const velocity = Math.sqrt((2 * dP) / rho);
        const area = Q / (Cd * velocity);
        const d = 2 * Math.sqrt(area / Math.PI);
        
        setResult({
          diameter: d,
          velocity,
          area,
        });
      }
    } catch (error) {
      alert('Invalid input. Please check your values.');
    }
  };

  const reset = () => {
    setDiameter('');
    setPressureDrop('');
    setDensity('');
    setFlowRate('');
    setDischargeCoefficient('0.61');
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-6">
        {/* Calculation Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculate
          </label>
          <select
            value={mode}
            onChange={(e) => {
              setMode(e.target.value as CalculationMode);
              setResult(null);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent"
          >
            <option value="flowRate">Flow Rate (Q)</option>
            <option value="pressureDrop">Pressure Drop (ΔP)</option>
            <option value="diameter">Orifice Diameter (d)</option>
          </select>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Discharge Coefficient */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discharge Coefficient (Cd) *
            </label>
            <input
              type="number"
              value={dischargeCoefficient}
              onChange={(e) => setDischargeCoefficient(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent"
              placeholder="Enter discharge coefficient"
              step="0.01"
              min="0"
              max="1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Typical values: Sharp-edged orifice: 0.60-0.62, Rounded orifice: 0.95-0.98
            </p>
          </div>

          {/* Diameter Input */}
          {mode !== 'diameter' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Orifice Diameter (d) *
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={diameter}
                  onChange={(e) => setDiameter(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent"
                  placeholder="Enter diameter"
                  step="any"
                />
                <select
                  value={diameterUnit}
                  onChange={(e) => setDiameterUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent"
                >
                  {diameterUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Pressure Drop Input */}
          {mode !== 'pressureDrop' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pressure Drop (ΔP) *
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={pressureDrop}
                  onChange={(e) => setPressureDrop(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent"
                  placeholder="Enter pressure drop"
                  step="any"
                />
                <select
                  value={pressureUnit}
                  onChange={(e) => setPressureUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent"
                >
                  {pressureUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Flow Rate Input */}
          {mode !== 'flowRate' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Flow Rate (Q) *
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={flowRate}
                  onChange={(e) => setFlowRate(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent"
                  placeholder="Enter flow rate"
                  step="any"
                />
                <select
                  value={flowRateUnit}
                  onChange={(e) => setFlowRateUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent"
                >
                  {flowRateUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Density Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fluid Density (ρ) *
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={density}
                onChange={(e) => setDensity(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent"
                placeholder="Enter density"
                step="any"
              />
              <select
                value={densityUnit}
                onChange={(e) => setDensityUnit(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent"
              >
                {densityUnits.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={calculate}
            className="flex-1 bg-[#820ECC] text-white py-2 px-6 rounded-md hover:bg-[#6D0BB3] transition-colors font-medium"
          >
            Calculate
          </button>
          <button
            onClick={reset}
            className="flex-1 bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-colors font-medium"
          >
            Reset
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-[#820ECC]">
            <h3 className="text-xl font-bold text-[#820ECC] mb-4">Results</h3>
            <div className="space-y-3">
              {result.flowRate !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Flow Rate (Q):</span>
                  <span className="text-lg font-bold text-[#820ECC]">
                    {formatResult(convertFromBase(result.flowRate, flowRateUnit, flowRateUnits))} {flowRateUnit}
                  </span>
                </div>
              )}
              {result.pressureDrop !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Pressure Drop (ΔP):</span>
                  <span className="text-lg font-bold text-[#820ECC]">
                    {formatResult(convertFromBase(result.pressureDrop, pressureUnit, pressureUnits))} {pressureUnit}
                  </span>
                </div>
              )}
              {result.diameter !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Orifice Diameter (d):</span>
                  <span className="text-lg font-bold text-[#820ECC]">
                    {formatResult(convertFromBase(result.diameter, diameterUnit, diameterUnits))} {diameterUnit}
                  </span>
                </div>
              )}
              {result.velocity !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Fluid Velocity (v):</span>
                  <span className="text-lg font-bold text-gray-600">
                    {formatResult(result.velocity)} m/s
                  </span>
                </div>
              )}
              {result.area !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Orifice Area (A):</span>
                  <span className="text-lg font-bold text-gray-600">
                    {formatResult(result.area)} m²
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Formula Reference */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-700 mb-2">Orifice Flow Equation:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Flow Rate:</strong> Q = Cd × A × √(2ΔP/ρ)</p>
            <p><strong>Pressure Drop:</strong> ΔP = (Q / (Cd × A))² × ρ / 2</p>
            <p><strong>Orifice Area:</strong> A = π × (d/2)²</p>
            <p><strong>Velocity:</strong> v = √(2ΔP/ρ)</p>
          </div>
        </div>

        {/* Common Fluid Densities */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-gray-700 mb-3">Common Fluid Densities (at 20°C):</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600">
            <div>Water: 998 kg/m³</div>
            <div>Air: 1.2 kg/m³</div>
            <div>Gasoline: 720 kg/m³</div>
            <div>Oil (SAE 30): 870 kg/m³</div>
            <div>Mercury: 13,600 kg/m³</div>
            <div>Ethanol: 789 kg/m³</div>
          </div>
        </div>

        {/* Discharge Coefficient Reference */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-gray-700 mb-3">Discharge Coefficient (Cd) Guide:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Sharp-edged orifice:</strong> 0.60 - 0.62</p>
            <p><strong>Rounded entrance orifice:</strong> 0.95 - 0.98</p>
            <p><strong>Venturi meter:</strong> 0.95 - 0.99</p>
            <p><strong>Flow nozzle:</strong> 0.95 - 0.99</p>
            <p><strong>Orifice plate (standard):</strong> 0.60 - 0.61</p>
            <p className="mt-2 italic">Note: Cd varies with Reynolds number and β ratio (d/D)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
