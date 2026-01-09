'use client';

import { useState } from 'react';
import Card from '../ui/Card';

interface Calculation {
  formula: string;
  steps: string[];
}

export default function RCCircuitCalculator({ showTitle = true, primaryColor = '#820ECC' }: { showTitle?: boolean; primaryColor?: string }) {
  const [calculationType, setCalculationType] = useState<'timeConstant' | 'charging' | 'frequency' | 'impedance'>('timeConstant');

  // Time Constant inputs
  const [resistance, setResistance] = useState('1000');
  const [resistanceUnit, setResistanceUnit] = useState('Ω');
  const [capacitance, setCapacitance] = useState('100');
  const [capacitanceUnit, setCapacitanceUnit] = useState('μF');

  // Charging inputs
  const [voltageInput, setVoltageInput] = useState('12');
  const [timeInput, setTimeInput] = useState('0.5');
  const [timeUnit, setTimeUnit] = useState('s');
  const [resistanceForCharging, setResistanceForCharging] = useState('1000');
  const [resistanceForChargingUnit, setResistanceForChargingUnit] = useState('Ω');
  const [capacitanceForCharging, setCapacitanceForCharging] = useState('100');
  const [capacitanceForChargingUnit, setCapacitanceForChargingUnit] = useState('μF');

  // Frequency inputs
  const [resistanceForFreq, setResistanceForFreq] = useState('1000');
  const [resistanceForFreqUnit, setResistanceForFreqUnit] = useState('Ω');
  const [capacitanceForFreq, setCapacitanceForFreq] = useState('100');
  const [capacitanceForFreqUnit, setCapacitanceForFreqUnit] = useState('μF');

  // Impedance inputs
  const [frequencyInput, setFrequencyInput] = useState('1000');
  const [frequencyUnit, setFrequencyUnit] = useState('Hz');
  const [resistanceForImpedance, setResistanceForImpedance] = useState('1000');
  const [resistanceForImpedanceUnit, setResistanceForImpedanceUnit] = useState('Ω');
  const [capacitanceForImpedance, setCapacitanceForImpedance] = useState('100');
  const [capacitanceForImpedanceUnit, setCapacitanceForImpedanceUnit] = useState('μF');

  const [result, setResult] = useState('');
  const [resultUnit, setResultUnit] = useState('');
  const [calculation, setCalculation] = useState<Calculation | null>(null);

  const resistanceUnits = { 'Ω': 1, 'mΩ': 0.001, 'kΩ': 1000, 'MΩ': 1e6 };
  const capacitanceUnits = { 'F': 1, 'μF': 1e-6, 'nF': 1e-9, 'pF': 1e-12 };
  const frequencyUnits = { 'Hz': 1, 'kHz': 1000, 'MHz': 1e6 };
  const timeUnits = { 'ms': 0.001, 's': 1, 'min': 60, 'h': 3600 };

  // Calculate Time Constant
  const calculateTimeConstant = () => {
    const R = parseFloat(resistance) * (resistanceUnits[resistanceUnit as keyof typeof resistanceUnits] || 1);
    const C = parseFloat(capacitance) * (capacitanceUnits[capacitanceUnit as keyof typeof capacitanceUnits] || 1);

    if (isNaN(R) || isNaN(C) || R <= 0 || C <= 0) {
      setResult('Invalid input');
      return;
    }

    const tau = R * C; // seconds
    const tauMs = tau * 1000;
    const tauUs = tau * 1e6;

    setResult(tau.toFixed(6));
    setResultUnit('s');
    setCalculation({
      formula: 'τ (Time Constant) = R × C',
      steps: [
        `Resistance (R) = ${resistance} ${resistanceUnit} = ${R.toExponential(3)} Ω`,
        `Capacitance (C) = ${capacitance} ${capacitanceUnit} = ${C.toExponential(3)} F`,
        `τ = R × C = ${R.toExponential(3)} × ${C.toExponential(3)}`,
        `τ = ${tau.toExponential(3)} s = ${tauMs.toFixed(3)} ms = ${tauUs.toFixed(3)} μs`,
        `The circuit reaches 63.2% charge in one time constant, 95% in 3τ, and 99% in 5τ`,
      ],
    });
  };

  // Calculate Charging Voltage
  const calculateCharging = () => {
    const V0 = parseFloat(voltageInput);
    const t = parseFloat(timeInput) * (timeUnits[timeUnit as keyof typeof timeUnits] || 1);
    const R = parseFloat(resistanceForCharging) * (resistanceUnits[resistanceForChargingUnit as keyof typeof resistanceUnits] || 1);
    const C = parseFloat(capacitanceForCharging) * (capacitanceUnits[capacitanceForChargingUnit as keyof typeof capacitanceUnits] || 1);

    if (isNaN(V0) || isNaN(t) || isNaN(R) || isNaN(C) || V0 < 0 || t < 0 || R <= 0 || C <= 0) {
      setResult('Invalid input');
      return;
    }

    const tau = R * C;
    const Vt = V0 * (1 - Math.exp(-t / tau)); // Charging voltage
    const percentCharge = (Vt / V0) * 100;
    const timeToCharge63 = tau;
    const timeToCharge95 = 3 * tau;

    setResult(Vt.toFixed(4));
    setResultUnit('V');
    setCalculation({
      formula: 'V(t) = V₀ × (1 - e^(-t/RC))',
      steps: [
        `Initial Voltage (V₀) = ${V0} V`,
        `Time (t) = ${timeInput} ${timeUnit} = ${t.toFixed(3)} s`,
        `Resistance (R) = ${resistanceForCharging} ${resistanceForChargingUnit} = ${R.toExponential(3)} Ω`,
        `Capacitance (C) = ${capacitanceForCharging} ${capacitanceForChargingUnit} = ${C.toExponential(3)} F`,
        `Time Constant (τ) = R × C = ${tau.toExponential(3)} s`,
        `V(t) = ${V0} × (1 - e^(-${t.toFixed(3)}/${tau.toFixed(3)}))`,
        `V(t) = ${V0} × (1 - e^(-${(t/tau).toFixed(3)}))`,
        `V(t) = ${Vt.toFixed(4)} V (${percentCharge.toFixed(2)}% charge)`,
        `Time to reach 63.2% charge: ${timeToCharge63.toFixed(3)} s`,
        `Time to reach 95% charge: ${timeToCharge95.toFixed(3)} s`,
      ],
    });
  };

  // Calculate Cutoff Frequency
  const calculateFrequency = () => {
    const R = parseFloat(resistanceForFreq) * (resistanceUnits[resistanceForFreqUnit as keyof typeof resistanceUnits] || 1);
    const C = parseFloat(capacitanceForFreq) * (capacitanceUnits[capacitanceForFreqUnit as keyof typeof capacitanceUnits] || 1);

    if (isNaN(R) || isNaN(C) || R <= 0 || C <= 0) {
      setResult('Invalid input');
      return;
    }

    const fc = 1 / (2 * Math.PI * R * C);
    const fcKHz = fc / 1000;

    setResult(fcKHz > 0.001 ? fcKHz.toFixed(6) : fc.toFixed(2));
    setResultUnit(fcKHz > 0.001 ? 'kHz' : 'Hz');
    setCalculation({
      formula: 'f_c = 1 / (2πRC)',
      steps: [
        `Resistance (R) = ${resistanceForFreq} ${resistanceForFreqUnit} = ${R.toExponential(3)} Ω`,
        `Capacitance (C) = ${capacitanceForFreq} ${capacitanceForFreqUnit} = ${C.toExponential(3)} F`,
        `f_c = 1 / (2 × π × ${R.toExponential(3)} × ${C.toExponential(3)})`,
        `f_c = 1 / (2 × 3.14159 × ${(2 * Math.PI * R * C).toExponential(3)})`,
        `f_c = ${fc.toExponential(3)} Hz = ${fcKHz.toFixed(6)} kHz`,
        `This is the -3dB cutoff frequency for the RC low pass filter`,
      ],
    });
  };

  // Calculate Impedance
  const calculateImpedance = () => {
    const f = parseFloat(frequencyInput) * (frequencyUnits[frequencyUnit as keyof typeof frequencyUnits] || 1);
    const R = parseFloat(resistanceForImpedance) * (resistanceUnits[resistanceForImpedanceUnit as keyof typeof resistanceUnits] || 1);
    const C = parseFloat(capacitanceForImpedance) * (capacitanceUnits[capacitanceForImpedanceUnit as keyof typeof capacitanceUnits] || 1);

    if (isNaN(f) || isNaN(R) || isNaN(C) || f <= 0 || R <= 0 || C <= 0) {
      setResult('Invalid input');
      return;
    }

    const Xc = 1 / (2 * Math.PI * f * C); // Capacitive reactance
    const Z = Math.sqrt(R * R + Xc * Xc); // Total impedance
    const phase = Math.atan(-Xc / R) * (180 / Math.PI); // Phase angle

    setResult(Z.toFixed(2));
    setResultUnit('Ω');
    setCalculation({
      formula: 'Z = √(R² + Xc²), where Xc = 1/(2πfC)',
      steps: [
        `Frequency (f) = ${frequencyInput} ${frequencyUnit} = ${f.toExponential(3)} Hz`,
        `Resistance (R) = ${resistanceForImpedance} ${resistanceForImpedanceUnit} = ${R.toExponential(3)} Ω`,
        `Capacitance (C) = ${capacitanceForImpedance} ${capacitanceForImpedanceUnit} = ${C.toExponential(3)} F`,
        `Capacitive Reactance (Xc) = 1 / (2 × π × ${f.toExponential(3)} × ${C.toExponential(3)})`,
        `Xc = ${Xc.toExponential(3)} Ω`,
        `Total Impedance (Z) = √(${R.toFixed(2)}² + ${Xc.toFixed(2)}²)`,
        `Z = √(${(R*R).toFixed(2)} + ${(Xc*Xc).toFixed(2)})`,
        `Z = ${Z.toFixed(2)} Ω`,
        `Phase Angle = ${phase.toFixed(2)}° (negative means capacitive)`,
      ],
    });
  };

  const handleCalculate = () => {
    if (calculationType === 'timeConstant') calculateTimeConstant();
    else if (calculationType === 'charging') calculateCharging();
    else if (calculationType === 'frequency') calculateFrequency();
    else if (calculationType === 'impedance') calculateImpedance();
  };

  return (
    <div style={{ '--primary-color': primaryColor } as React.CSSProperties}>
      <Card className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200">
        {showTitle && <h1 className="text-4xl font-bold mb-6 text-slate-800">RC Circuit Calculator</h1>}

        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 mb-8">
          <label className="block text-lg font-semibold mb-4 text-slate-700">Select Calculation</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setCalculationType('timeConstant')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                calculationType === 'timeConstant'
                  ? 'bg-[#820ECC] text-white shadow-lg'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Time Constant (τ)
            </button>
            <button
              onClick={() => setCalculationType('charging')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                calculationType === 'charging'
                  ? 'bg-[#820ECC] text-white shadow-lg'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Charging Voltage
            </button>
            <button
              onClick={() => setCalculationType('frequency')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                calculationType === 'frequency'
                  ? 'bg-[#820ECC] text-white shadow-lg'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Cutoff Frequency
            </button>
            <button
              onClick={() => setCalculationType('impedance')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                calculationType === 'impedance'
                  ? 'bg-[#820ECC] text-white shadow-lg'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Impedance (Z)
            </button>
          </div>
        </div>

        {/* Time Constant */}
        {calculationType === 'timeConstant' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Resistance (R)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={resistance}
                  onChange={(e) => setResistance(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                  placeholder="Enter resistance"
                />
                <select
                  value={resistanceUnit}
                  onChange={(e) => setResistanceUnit(e.target.value)}
                  className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                >
                  {Object.keys(resistanceUnits).map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Capacitance (C)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={capacitance}
                  onChange={(e) => setCapacitance(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                  placeholder="Enter capacitance"
                />
                <select
                  value={capacitanceUnit}
                  onChange={(e) => setCapacitanceUnit(e.target.value)}
                  className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                >
                  {Object.keys(capacitanceUnits).map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Charging Voltage */}
        {calculationType === 'charging' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Initial Voltage (V)</label>
              <input
                type="number"
                value={voltageInput}
                onChange={(e) => setVoltageInput(e.target.value)}
                className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                placeholder="Enter voltage"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Time (t)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={timeInput}
                  onChange={(e) => setTimeInput(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                  placeholder="Enter time"
                />
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value)}
                  className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                >
                  {Object.keys(timeUnits).map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Resistance (R)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={resistanceForCharging}
                  onChange={(e) => setResistanceForCharging(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                  placeholder="Enter resistance"
                />
                <select
                  value={resistanceForChargingUnit}
                  onChange={(e) => setResistanceForChargingUnit(e.target.value)}
                  className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                >
                  {Object.keys(resistanceUnits).map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Capacitance (C)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={capacitanceForCharging}
                  onChange={(e) => setCapacitanceForCharging(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                  placeholder="Enter capacitance"
                />
                <select
                  value={capacitanceForChargingUnit}
                  onChange={(e) => setCapacitanceForChargingUnit(e.target.value)}
                  className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                >
                  {Object.keys(capacitanceUnits).map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Frequency */}
        {calculationType === 'frequency' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Resistance (R)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={resistanceForFreq}
                  onChange={(e) => setResistanceForFreq(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                  placeholder="Enter resistance"
                />
                <select
                  value={resistanceForFreqUnit}
                  onChange={(e) => setResistanceForFreqUnit(e.target.value)}
                  className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                >
                  {Object.keys(resistanceUnits).map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Capacitance (C)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={capacitanceForFreq}
                  onChange={(e) => setCapacitanceForFreq(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                  placeholder="Enter capacitance"
                />
                <select
                  value={capacitanceForFreqUnit}
                  onChange={(e) => setCapacitanceForFreqUnit(e.target.value)}
                  className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                >
                  {Object.keys(capacitanceUnits).map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Impedance */}
        {calculationType === 'impedance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Frequency (f)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={frequencyInput}
                  onChange={(e) => setFrequencyInput(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                  placeholder="Enter frequency"
                />
                <select
                  value={frequencyUnit}
                  onChange={(e) => setFrequencyUnit(e.target.value)}
                  className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                >
                  {Object.keys(frequencyUnits).map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Resistance (R)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={resistanceForImpedance}
                  onChange={(e) => setResistanceForImpedance(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                  placeholder="Enter resistance"
                />
                <select
                  value={resistanceForImpedanceUnit}
                  onChange={(e) => setResistanceForImpedanceUnit(e.target.value)}
                  className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                >
                  {Object.keys(resistanceUnits).map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-slate-700">Capacitance (C)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={capacitanceForImpedance}
                  onChange={(e) => setCapacitanceForImpedance(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                  placeholder="Enter capacitance"
                />
                <select
                  value={capacitanceForImpedanceUnit}
                  onChange={(e) => setCapacitanceForImpedanceUnit(e.target.value)}
                  className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                >
                  {Object.keys(capacitanceUnits).map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
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
          <h3 className="text-lg font-bold text-slate-800 mb-2">📝 About RC Circuits</h3>
          <p className="text-slate-700 text-sm">
            An RC (Resistor-Capacitor) circuit is a fundamental electronic circuit consisting of a resistor and capacitor. 
            The time constant τ = RC determines how quickly the capacitor charges or discharges. RC circuits are used in 
            timing applications, signal filtering, coupling/decoupling, and integrator/differentiator circuits. The cutoff 
            frequency f_c = 1/(2πRC) defines the point where a low pass filter attenuates the signal to -3dB. Understanding 
            RC circuit behavior is essential for analog electronics design, signal processing, and power supply filtering.
          </p>
        </div>
      </Card>
    </div>
  );
}
