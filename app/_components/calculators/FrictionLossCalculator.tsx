'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors
const lengthUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 },
  'km': { name: 'km (Kilometers)', factor: 1000 }
};

const velocityUnits = {
  'm/s': { name: 'm/s (Meters per second)', factor: 1 },
  'cm/s': { name: 'cm/s (Centimeters per second)', factor: 0.01 },
  'ft/s': { name: 'ft/s (Feet per second)', factor: 0.3048 },
  'km/h': { name: 'km/h (Kilometers per hour)', factor: 0.277778 },
  'mph': { name: 'mph (Miles per hour)', factor: 0.44704 }
};

const flowRateUnits = {
  'm³/s': { name: 'm³/s (Cubic meters per second)', factor: 1 },
  'L/s': { name: 'L/s (Liters per second)', factor: 0.001 },
  'L/min': { name: 'L/min (Liters per minute)', factor: 0.00001667 },
  'm³/h': { name: 'm³/h (Cubic meters per hour)', factor: 0.000277778 },
  'ft³/s': { name: 'ft³/s (Cubic feet per second)', factor: 0.0283168 },
  'gal/min': { name: 'gal/min (Gallons per minute)', factor: 0.00006309 },
  'gal/s': { name: 'gal/s (Gallons per second)', factor: 0.00378541 }
};

const headLossUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 }
};

const pressureLossUnits = {
  'Pa': { name: 'Pa (Pascals)', factor: 1 },
  'kPa': { name: 'kPa (Kilopascals)', factor: 1000 },
  'bar': { name: 'bar', factor: 100000 },
  'psi': { name: 'psi (Pounds per square inch)', factor: 6894.76 },
  'atm': { name: 'atm (Atmospheres)', factor: 101325 }
};

type CalculationMethod = 'darcy-weisbach' | 'hazen-williams';

export default function FrictionLossCalculator() {
  const [method, setMethod] = useState<CalculationMethod>('darcy-weisbach');
  const [frictionLoss, setFrictionLoss] = useState('');
  const [pipeLength, setPipeLength] = useState('');
  const [pipeDiameter, setPipeDiameter] = useState('');
  const [velocity, setVelocity] = useState('');
  const [flowRate, setFlowRate] = useState('');
  const [frictionFactor, setFrictionFactor] = useState('');
  const [hazenWilliamsCoeff, setHazenWilliamsCoeff] = useState('100');
  const [density, setDensity] = useState('1000'); // Water density in kg/m³
  const [lengthUnit, setLengthUnit] = useState('m');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [flowRateUnit, setFlowRateUnit] = useState('m³/s');
  const [headLossUnit, setHeadLossUnit] = useState('m');
  const [pressureLossUnit, setPressureLossUnit] = useState('Pa');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'head' | 'pressure' } | null>(null);
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

  const convertLengthToBase = (value: number, unit: string) => {
    return value * lengthUnits[unit as keyof typeof lengthUnits].factor;
  };

  const convertLengthFromBase = (value: number, unit: string) => {
    return value / lengthUnits[unit as keyof typeof lengthUnits].factor;
  };

  const convertVelocityToBase = (value: number, unit: string) => {
    return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertFlowRateToBase = (value: number, unit: string) => {
    return value * flowRateUnits[unit as keyof typeof flowRateUnits].factor;
  };

  const convertHeadLossFromBase = (value: number, unit: string) => {
    return value / headLossUnits[unit as keyof typeof headLossUnits].factor;
  };

  const convertPressureLossFromBase = (value: number, unit: string) => {
    return value / pressureLossUnits[unit as keyof typeof pressureLossUnits].factor;
  };

  // Calculate friction factor using Swamee-Jain approximation (for smooth pipes)
  const calculateFrictionFactor = (reynolds: number, roughness: number, diameter: number): number => {
    if (reynolds < 2300) {
      // Laminar flow
      return 64 / reynolds;
    } else {
      // Turbulent flow - Swamee-Jain equation
      const relativeRoughness = roughness / diameter;
      const term1 = relativeRoughness / 3.7;
      const term2 = 5.74 / Math.pow(reynolds, 0.9);
      const term3 = Math.log10(term1 + term2);
      return 0.25 / Math.pow(term3, 2);
    }
  };

  const calculate = () => {
    const L = pipeLength ? parseFloat(pipeLength) : NaN;
    const D = pipeDiameter ? parseFloat(pipeDiameter) : NaN;
    const v = velocity ? parseFloat(velocity) : NaN;
    const Q = flowRate ? parseFloat(flowRate) : NaN;
    const f = frictionFactor ? parseFloat(frictionFactor) : NaN;
    const C = hazenWilliamsCoeff ? parseFloat(hazenWilliamsCoeff) : 100;
    const ρ = density ? parseFloat(density) : 1000;
    const g = 9.80665; // Standard gravity in m/s²

    // Validate required inputs
    if (method === 'darcy-weisbach') {
      if (!pipeLength || !pipeDiameter) {
        setResult(null);
        setCalculation('Error: Pipe length and diameter are required');
        return;
      }
      if (isNaN(L) || L <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for pipe length');
        return;
      }
      if (isNaN(D) || D <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for pipe diameter');
        return;
      }
      if (!velocity && !flowRate) {
        setResult(null);
        setCalculation('Error: Please enter either velocity or flow rate');
        return;
      }
    } else {
      // Hazen-Williams
      if (!pipeLength || !pipeDiameter || !flowRate) {
        setResult(null);
        setCalculation('Error: Pipe length, diameter, and flow rate are required');
        return;
      }
      if (isNaN(L) || L <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for pipe length');
        return;
      }
      if (isNaN(D) || D <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for pipe diameter');
        return;
      }
      if (isNaN(Q) || Q <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for flow rate');
        return;
      }
      if (isNaN(C) || C <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for Hazen-Williams coefficient');
        return;
      }
    }

    // Convert to base units
    const LBase = convertLengthToBase(L, lengthUnit);
    const DBase = convertLengthToBase(D, lengthUnit);

    if (method === 'darcy-weisbach') {
      let vBase: number;
      if (velocity) {
        if (isNaN(v) || v <= 0) {
          setResult(null);
          setCalculation('Error: Please enter a valid positive number for velocity');
          return;
        }
        vBase = convertVelocityToBase(v, velocityUnit);
      } else {
        if (isNaN(Q) || Q <= 0) {
          setResult(null);
          setCalculation('Error: Please enter a valid positive number for flow rate');
          return;
        }
        const QBase = convertFlowRateToBase(Q, flowRateUnit);
        // v = Q / A, where A = π × (D/2)²
        const area = Math.PI * Math.pow(DBase / 2, 2);
        vBase = QBase / area;
      }

      // Calculate friction factor if not provided
      let fValue = f;
      if (!frictionFactor || isNaN(f) || f <= 0) {
        // Estimate using Reynolds number and roughness
        // For water at 20°C: μ ≈ 0.001 Pa·s
        const μ = 0.001; // Dynamic viscosity of water
        const Re = (ρ * vBase * DBase) / μ;
        const roughness = 0.000045; // Typical for smooth pipe (45 μm)
        fValue = calculateFrictionFactor(Re, roughness, DBase);
      }

      // Darcy-Weisbach: h_f = f × (L/D) × (v²/(2g))
      const hfBase = fValue * (LBase / DBase) * (Math.pow(vBase, 2) / (2 * g));
      const hfResult = convertHeadLossFromBase(hfBase, headLossUnit);

      // Calculate pressure loss: ΔP = ρ × g × h_f
      const pressureLossBase = ρ * g * hfBase;
      const pressureLossResult = convertPressureLossFromBase(pressureLossBase, pressureLossUnit);

      setResult({ value: hfResult, unit: headLossUnit, type: 'head' });
      setCalculation(`h_f = f × (L/D) × (v²/(2g)) = ${formatValue(fValue)} × (${formatValue(L)} ${lengthUnit} / ${formatValue(D)} ${lengthUnit}) × ((${formatValue(vBase)} m/s)² / (2 × 9.80665 m/s²)) = ${formatValue(hfResult)} ${headLossUnit} (Pressure loss: ${formatValue(pressureLossResult)} ${pressureLossUnit})`);
    } else {
      // Hazen-Williams: h_f = 10.67 × L × (Q^1.852) / (C^1.852 × D^4.8704)
      const QBase = convertFlowRateToBase(Q, flowRateUnit);
      
      const hfBase = 10.67 * LBase * Math.pow(QBase, 1.852) / (Math.pow(C, 1.852) * Math.pow(DBase, 4.8704));
      const hfResult = convertHeadLossFromBase(hfBase, headLossUnit);

      // Calculate pressure loss: ΔP = ρ × g × h_f
      const pressureLossBase = ρ * g * hfBase;
      const pressureLossResult = convertPressureLossFromBase(pressureLossBase, pressureLossUnit);

      setResult({ value: hfResult, unit: headLossUnit, type: 'head' });
      setCalculation(`h_f = 10.67 × L × (Q^1.852) / (C^1.852 × D^4.8704) = 10.67 × ${formatValue(L)} ${lengthUnit} × (${formatValue(QBase)} m³/s)^1.852 / (${formatValue(C)}^1.852 × (${formatValue(D)} ${lengthUnit})^4.8704) = ${formatValue(hfResult)} ${headLossUnit} (Pressure loss: ${formatValue(pressureLossResult)} ${pressureLossUnit})`);
    }
  };

  const clearAll = () => {
    setFrictionLoss('');
    setPipeLength('');
    setPipeDiameter('');
    setVelocity('');
    setFlowRate('');
    setFrictionFactor('');
    setHazenWilliamsCoeff('100');
    setDensity('1000');
    setLengthUnit('m');
    setVelocityUnit('m/s');
    setFlowRateUnit('m³/s');
    setHeadLossUnit('m');
    setPressureLossUnit('Pa');
    setResult(null);
    setCalculation('');
  };

  const handleMethodChange = (newMethod: CalculationMethod) => {
    setMethod(newMethod);
    clearAll();
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Friction Loss Calculator</h2>
        <p className="text-gray-600">Calculate head loss and pressure drop in pipes using Darcy-Weisbach or Hazen-Williams equations</p>
      </div>

      <div className="space-y-6">
        {/* Calculation Method Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Method
          </label>
          <select
            value={method}
            onChange={(e) => handleMethodChange(e.target.value as CalculationMethod)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="darcy-weisbach">Darcy-Weisbach Equation</option>
            <option value="hazen-williams">Hazen-Williams Equation</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">
            {method === 'darcy-weisbach' ? 'h_f = f × (L/D) × (v²/(2g))' : 'h_f = 10.67 × L × (Q^1.852) / (C^1.852 × D^4.8704)'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {method === 'darcy-weisbach' 
              ? 'Where: h_f = Head loss, f = Friction factor, L = Length, D = Diameter, v = Velocity, g = Gravity'
              : 'Where: h_f = Head loss, L = Length, Q = Flow rate, C = Hazen-Williams coefficient, D = Diameter'}
          </p>
        </div>

        {/* Pipe Length Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Pipe Length (L)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter pipe length"
                value={pipeLength}
                onChange={(e) => setPipeLength(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={lengthUnit}
                onChange={(e) => setLengthUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(lengthUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Pipe Diameter Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Pipe Diameter (D)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter pipe diameter"
                value={pipeDiameter}
                onChange={(e) => setPipeDiameter(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={lengthUnit}
                onChange={(e) => setLengthUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(lengthUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Velocity Input (Darcy-Weisbach) */}
        {method === 'darcy-weisbach' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Velocity (v) or Flow Rate (Q)
            </label>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter velocity (leave empty if using flow rate)"
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
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Or enter flow rate (leave empty if using velocity)"
                    value={flowRate}
                    onChange={(e) => setFlowRate(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={flowRateUnit}
                    onChange={(e) => setFlowRateUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                  >
                    {Object.entries(flowRateUnits).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Flow Rate Input (Hazen-Williams) */}
        {method === 'hazen-williams' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Flow Rate (Q)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter flow rate"
                  value={flowRate}
                  onChange={(e) => setFlowRate(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-40">
                <select
                  value={flowRateUnit}
                  onChange={(e) => setFlowRateUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(flowRateUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Friction Factor Input (Darcy-Weisbach) */}
        {method === 'darcy-weisbach' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Friction Factor (f) - Optional
            </label>
            <Input
              type="text"
              placeholder="Enter friction factor (auto-calculated if empty)"
              value={frictionFactor}
              onChange={(e) => setFrictionFactor(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to auto-calculate based on Reynolds number and pipe roughness
            </p>
          </div>
        )}

        {/* Hazen-Williams Coefficient Input */}
        {method === 'hazen-williams' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Hazen-Williams Coefficient (C)
            </label>
            <Input
              type="text"
              placeholder="Enter C value (default: 100)"
              value={hazenWilliamsCoeff}
              onChange={(e) => setHazenWilliamsCoeff(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Typical values: 130-150 (new smooth pipes), 100-120 (old pipes), 80-100 (rough pipes)
            </p>
          </div>
        )}

        {/* Fluid Density Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Fluid Density (ρ) - kg/m³
          </label>
          <Input
            type="text"
            placeholder="Enter fluid density (default: 1000 for water)"
            value={density}
            onChange={(e) => setDensity(e.target.value)}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            Used for pressure loss calculation. Water at 20°C: 1000 kg/m³
          </p>
        </div>

        {/* Head Loss Unit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Head Loss Unit
          </label>
          <select
            value={headLossUnit}
            onChange={(e) => setHeadLossUnit(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            {Object.entries(headLossUnits).map(([key, unit]) => (
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
          <div className="mt-6 p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg">
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">Result</h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            <p className="text-sm text-[#820ECC]/70 mt-1">Head Loss</p>
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
            <li>• Enter pipe length and diameter (required)</li>
            {method === 'darcy-weisbach' ? (
              <>
                <li>• Enter either velocity or flow rate</li>
                <li>• Friction factor is auto-calculated if not provided</li>
                <li>• Formula: h_f = f × (L/D) × (v²/(2g))</li>
              </>
            ) : (
              <>
                <li>• Enter flow rate (required)</li>
                <li>• Enter Hazen-Williams coefficient (C value)</li>
                <li>• Formula: h_f = 10.67 × L × (Q^1.852) / (C^1.852 × D^4.8704)</li>
              </>
            )}
            <li>• Enter fluid density for pressure loss calculation (default: 1000 kg/m³ for water)</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• Commonly used for pipe sizing and pump selection</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

