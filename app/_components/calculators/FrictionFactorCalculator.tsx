'use client';

import { useState } from 'react';
import Card from '../ui/Card';

interface Calculation {
  formula: string;
  steps: string[];
}

export default function FrictionFactorCalculator({ showTitle = true, primaryColor = '#820ECC' }: { showTitle?: boolean; primaryColor?: string }) {
  const [calculationType, setCalculationType] = useState<'reynolds' | 'frictionFactor' | 'pressureDrop'>('reynolds');
  const [flowRegime, setFlowRegime] = useState<'auto' | 'laminar' | 'turbulent'>('auto');

  // Reynolds Number inputs
  const [velocity, setVelocity] = useState('2');
  const [diameter, setDiameter] = useState('0.05');
  const [viscosity, setViscosity] = useState('0.001');
  const [density, setDensity] = useState('1000');
  const [viscosityType, setViscosityType] = useState<'kinematic' | 'dynamic'>('kinematic');

  // Friction Factor inputs
  const [reynoldsInput, setReynoldsInput] = useState('');
  const [roughness, setRoughness] = useState('0.000045');
  const [relativeDiameter, setRelativeDiameter] = useState('');

  // Pressure Drop inputs
  const [frictionInput, setFrictionInput] = useState('');
  const [lengthInput, setLengthInput] = useState('10');
  const [velocityForPressure, setVelocityForPressure] = useState('2');
  const [diameterForPressure, setDiameterForPressure] = useState('0.05');
  const [densityForPressure, setDensityForPressure] = useState('1000');

  const [result, setResult] = useState('');
  const [resultUnit, setResultUnit] = useState('');
  const [calculation, setCalculation] = useState<Calculation | null>(null);

  // Calculate Reynolds Number
  const calculateReynolds = () => {
    const vel = parseFloat(velocity);
    const dia = parseFloat(diameter);
    let visc: number;

    if (isNaN(vel) || isNaN(dia) || vel <= 0 || dia <= 0) {
      setResult('Invalid input');
      return;
    }

    if (viscosityType === 'kinematic') {
      visc = parseFloat(viscosity);
      if (isNaN(visc) || visc <= 0) {
        setResult('Invalid viscosity');
        return;
      }
    } else {
      const dyn = parseFloat(viscosity);
      const rho = parseFloat(density);
      if (isNaN(dyn) || isNaN(rho) || dyn <= 0 || rho <= 0) {
        setResult('Invalid input');
        return;
      }
      visc = dyn / rho; // kinematic = dynamic / density
    }

    const Re = (vel * dia) / visc;
    const regime = Re < 2300 ? 'Laminar' : Re > 4000 ? 'Turbulent' : 'Transition';

    setResult(Re.toFixed(2));
    setResultUnit('');
    setFlowRegime(Re < 2300 ? 'laminar' : Re > 4000 ? 'turbulent' : 'auto');
    
    setCalculation({
      formula: 'Re = (V × D) / ν  or  Re = (ρ × V × D) / μ',
      steps: [
        `Velocity (V) = ${velocity} m/s`,
        `Diameter (D) = ${diameter} m`,
        viscosityType === 'kinematic' 
          ? `Kinematic Viscosity (ν) = ${viscosity} m²/s`
          : `Dynamic Viscosity (μ) = ${viscosity} Pa·s, Density (ρ) = ${density} kg/m³`,
        viscosityType === 'dynamic' ? `Kinematic Viscosity (ν) = ${viscosity} / ${density} = ${visc.toExponential(3)} m²/s` : '',
        `Re = (${vel} × ${dia}) / ${visc.toExponential(3)}`,
        `Re = ${Re.toFixed(2)} → Flow Regime: ${regime}`,
      ].filter(s => s),
    });
  };

  // Calculate Friction Factor
  const calculateFrictionFactor = () => {
    const Re = parseFloat(reynoldsInput);
    if (isNaN(Re) || Re <= 0) {
      setResult('Invalid Reynolds number');
      return;
    }

    let f: number;
    let formulaUsed: string;
    let regime: string;

    if (Re < 2300) {
      // Laminar flow: f = 64/Re
      f = 64 / Re;
      formulaUsed = 'Hagen-Poiseuille (Laminar): f = 64/Re';
      regime = 'Laminar';
    } else if (Re < 4000) {
      // Transition zone - use turbulent Blasius
      f = 0.316 / Math.pow(Re, 0.25);
      formulaUsed = 'Blasius (Transition/Turbulent): f = 0.316/Re^0.25';
      regime = 'Transition';
    } else {
      // Turbulent flow - Blasius equation (smooth pipes)
      f = 0.316 / Math.pow(Re, 0.25);
      formulaUsed = 'Blasius (Turbulent): f = 0.316/Re^0.25';
      regime = 'Turbulent';

      // If relative roughness provided, use Colebrook-White approximation
      if (roughness && parseFloat(roughness) > 0) {
        const diameterVal = parseFloat(diameterForPressure || diameter);
        const relRough = parseFloat(roughness) / diameterVal;
        if (!isNaN(relRough) && relRough > 0) {
          const kRel = relRough;
          // Colebrook-White equation: 1/√f = -2log10(krel/3.7 + 2.51/(Re√f))
          // Iterative solution - simplified approximation
          f = 0.25 / Math.pow(Math.log10(kRel / 3.7 + 5.74 / Math.pow(Re, 0.9)), 2);
          formulaUsed = 'Colebrook-White (Turbulent, rough pipes)';
        }
      }
    }

    setResult(f.toFixed(6));
    setResultUnit('');
    setCalculation({
      formula: formulaUsed,
      steps: [
        `Reynolds Number (Re) = ${Re.toFixed(2)}`,
        `Flow Regime: ${regime}`,
        regime === 'Laminar' 
          ? `f = 64 / ${Re.toFixed(2)} = ${f.toFixed(6)}`
          : `f = 0.316 / (${Re.toFixed(2)})^0.25`,
        `f = ${f.toFixed(6)}`,
        `Note: Higher friction factors indicate more resistance to flow`,
      ],
    });
  };

  // Calculate Pressure Drop
  const calculatePressureDrop = () => {
    const f = parseFloat(frictionInput);
    const L = parseFloat(lengthInput);
    const V = parseFloat(velocityForPressure);
    const D = parseFloat(diameterForPressure);
    const rho = parseFloat(densityForPressure);

    if (isNaN(f) || isNaN(L) || isNaN(V) || isNaN(D) || isNaN(rho) || 
        f <= 0 || L <= 0 || V < 0 || D <= 0 || rho <= 0) {
      setResult('Invalid input');
      return;
    }

    // Darcy-Weisbach equation: ΔP = f × (L/D) × (ρ × V²/2)
    const deltaPa = f * (L / D) * (rho * V * V / 2);
    const deltaP_kPa = deltaPa / 1000;
    const deltaP_bar = deltaPa / 100000;

    setResult(deltaP_kPa.toFixed(4));
    setResultUnit('kPa');
    setCalculation({
      formula: 'Darcy-Weisbach: ΔP = f × (L/D) × (ρV²/2)',
      steps: [
        `Friction Factor (f) = ${f.toFixed(6)}`,
        `Pipe Length (L) = ${L} m`,
        `Pipe Diameter (D) = ${D} m`,
        `Fluid Velocity (V) = ${V} m/s`,
        `Fluid Density (ρ) = ${rho} kg/m³`,
        `L/D ratio = ${L}/${D} = ${(L/D).toFixed(4)}`,
        `ρV²/2 = ${rho} × ${V}² / 2 = ${(rho * V * V / 2).toFixed(2)} Pa`,
        `ΔP = ${f.toFixed(6)} × ${(L/D).toFixed(4)} × ${(rho * V * V / 2).toFixed(2)}`,
        `ΔP = ${deltaPa.toFixed(2)} Pa = ${deltaP_kPa.toFixed(4)} kPa = ${deltaP_bar.toFixed(6)} bar`,
      ],
    });
  };

  const handleCalculate = () => {
    if (calculationType === 'reynolds') calculateReynolds();
    else if (calculationType === 'frictionFactor') calculateFrictionFactor();
    else if (calculationType === 'pressureDrop') calculatePressureDrop();
  };

  return (
    <div style={{ '--primary-color': primaryColor } as React.CSSProperties}>
      <Card className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200">
        {showTitle && <h1 className="text-4xl font-bold mb-6 text-slate-800">Friction Factor Calculator</h1>}

        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 mb-8">
          <label className="block text-lg font-semibold mb-4 text-slate-700">Select Calculation</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setCalculationType('reynolds')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                calculationType === 'reynolds'
                  ? 'bg-[#820ECC] text-white shadow-lg'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Reynolds Number
            </button>
            <button
              onClick={() => setCalculationType('frictionFactor')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                calculationType === 'frictionFactor'
                  ? 'bg-[#820ECC] text-white shadow-lg'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Friction Factor
            </button>
            <button
              onClick={() => setCalculationType('pressureDrop')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                calculationType === 'pressureDrop'
                  ? 'bg-[#820ECC] text-white shadow-lg'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Pressure Drop
            </button>
          </div>
        </div>

        {/* Reynolds Number Calculation */}
        {calculationType === 'reynolds' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Velocity (m/s)</label>
              <input
                type="number"
                value={velocity}
                onChange={(e) => setVelocity(e.target.value)}
                className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                placeholder="Enter velocity"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Diameter (m)</label>
              <input
                type="number"
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
                className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                placeholder="Enter diameter"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-slate-700">Viscosity Type</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={viscosityType === 'kinematic'}
                    onChange={() => setViscosityType('kinematic')}
                    className="mr-2"
                  />
                  <span className="text-slate-700">Kinematic (m²/s)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={viscosityType === 'dynamic'}
                    onChange={() => setViscosityType('dynamic')}
                    className="mr-2"
                  />
                  <span className="text-slate-700">Dynamic (Pa·s)</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">
                {viscosityType === 'kinematic' ? 'Kinematic Viscosity (m²/s)' : 'Dynamic Viscosity (Pa·s)'}
              </label>
              <input
                type="number"
                value={viscosity}
                onChange={(e) => setViscosity(e.target.value)}
                className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                placeholder="Enter viscosity"
              />
            </div>
            {viscosityType === 'dynamic' && (
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Density (kg/m³)</label>
                <input
                  type="number"
                  value={density}
                  onChange={(e) => setDensity(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                  placeholder="Enter density"
                />
              </div>
            )}
          </div>
        )}

        {/* Friction Factor Calculation */}
        {calculationType === 'frictionFactor' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Reynolds Number</label>
              <input
                type="number"
                value={reynoldsInput}
                onChange={(e) => setReynoldsInput(e.target.value)}
                className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                placeholder="Enter Reynolds number"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Absolute Roughness (m)</label>
              <input
                type="number"
                value={roughness}
                onChange={(e) => setRoughness(e.target.value)}
                className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                placeholder="Enter roughness (optional)"
              />
              <p className="text-xs text-slate-500 mt-1">Leave blank for smooth pipes. Typical values: steel 0.000045 m, concrete 0.00003 m</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-slate-700">Pipe Diameter for Relative Roughness (m)</label>
              <input
                type="number"
                value={diameterForPressure}
                onChange={(e) => setRelativeDiameter(e.target.value)}
                className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                placeholder="Enter diameter (optional, for Colebrook-White)"
              />
            </div>
          </div>
        )}

        {/* Pressure Drop Calculation */}
        {calculationType === 'pressureDrop' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Friction Factor (f)</label>
              <input
                type="number"
                value={frictionInput}
                onChange={(e) => setFrictionInput(e.target.value)}
                className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                placeholder="Enter friction factor"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Pipe Length (m)</label>
              <input
                type="number"
                value={lengthInput}
                onChange={(e) => setLengthInput(e.target.value)}
                className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                placeholder="Enter pipe length"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Pipe Diameter (m)</label>
              <input
                type="number"
                value={diameterForPressure}
                onChange={(e) => setDiameterForPressure(e.target.value)}
                className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                placeholder="Enter diameter"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Velocity (m/s)</label>
              <input
                type="number"
                value={velocityForPressure}
                onChange={(e) => setVelocityForPressure(e.target.value)}
                className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                placeholder="Enter velocity"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-slate-700">Fluid Density (kg/m³)</label>
              <input
                type="number"
                value={densityForPressure}
                onChange={(e) => setDensityForPressure(e.target.value)}
                className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                placeholder="Enter density (typical: water 1000, air 1.2)"
              />
            </div>
          </div>
        )}

        <button
          onClick={handleCalculate}
          className="w-full py-4 bg-[#820ECC] text-white font-bold text-lg rounded-lg hover:bg-purple-700 transition shadow-lg mb-8"
        >
          Calculate
        </button>

        {result && (
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Result</h2>
            <div className="text-5xl font-bold text-[#820ECC]">
              {result} <span className="text-2xl ml-2">{resultUnit}</span>
            </div>
          </div>
        )}

        {calculation && (
          <div className="bg-slate-50 p-6 rounded-lg border-2 border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Formula & Calculation</h3>
            <div className="text-lg font-semibold text-purple-600 mb-4 p-3 bg-white rounded border-l-4 border-[#820ECC]">
              {calculation.formula}
            </div>
            <ol className="space-y-2">
              {calculation.steps.map((step, idx) => (
                <li key={idx} className="text-slate-700 font-medium">
                  {idx + 1}. {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
          <h3 className="text-lg font-bold text-slate-800 mb-2">📝 About Friction Factor</h3>
          <p className="text-slate-700 text-sm">
            The friction factor (f) is a dimensionless parameter that characterizes resistance to fluid flow in pipes and ducts. 
            It depends on Reynolds number and pipe roughness. For laminar flow (Re &lt; 2300), f = 64/Re. For turbulent flow, 
            the Blasius equation (f = 0.316/Re^0.25) is used for smooth pipes, while the Colebrook-White equation accounts for 
            pipe roughness. The Darcy-Weisbach equation relates friction factor to pressure drop: ΔP = f × (L/D) × (ρV²/2). 
            Understanding friction factors is crucial for pump sizing, pipeline design, and energy efficiency in fluid transport systems.
          </p>
        </div>
      </Card>
    </div>
  );
}
