'use client';

import { useState } from 'react';
import Card from '../ui/Card';

interface Calculation {
  formula: string;
  steps: string[];
}

const frequencyUnits = {
  Hz: 1,
  kHz: 1000,
  MHz: 1e6,
  GHz: 1e9,
};

const resistanceUnits = {
  'Ω': 1,
  kΩ: 1000,
  MΩ: 1e6,
};

const capacitanceUnits = {
  F: 1,
  μF: 1e-6,
  nF: 1e-9,
  pF: 1e-12,
};

const inductanceUnits = {
  H: 1,
  mH: 1e-3,
  μH: 1e-6,
};

export default function LowPassFilterCalculator({ showTitle = true, primaryColor = '#820ECC' }: { showTitle?: boolean; primaryColor?: string }) {
  const [filterType, setFilterType] = useState<'rc' | 'rl'>('rc');
  const [calculationType, setCalculationType] = useState<'frequency' | 'resistance' | 'capacitance' | 'inductance'>('frequency');

  // RC Filter states
  const [resistance, setResistance] = useState('10');
  const [resistanceUnit, setResistanceUnit] = useState('kΩ');
  const [capacitance, setCapacitance] = useState('100');
  const [capacitanceUnit, setCapacitanceUnit] = useState('nF');
  const [frequency, setFrequency] = useState('');
  const [frequencyUnit, setFrequencyUnit] = useState('kHz');

  // RL Filter states
  const [inductance, setInductance] = useState('10');
  const [inductanceUnit, setInductanceUnit] = useState('mH');
  const [rlResistance, setRlResistance] = useState('1');
  const [rlResistanceUnit, setRlResistanceUnit] = useState('kΩ');
  const [rlFrequency, setRlFrequency] = useState('');
  const [rlFrequencyUnit, setRlFrequencyUnit] = useState('kHz');

  const [result, setResult] = useState('');
  const [resultUnit, setResultUnit] = useState('');
  const [calculation, setCalculation] = useState<Calculation | null>(null);

  const calculateFrequencyRC = () => {
    const R = parseFloat(resistance) * resistanceUnits[resistanceUnit as keyof typeof resistanceUnits];
    const C = parseFloat(capacitance) * capacitanceUnits[capacitanceUnit as keyof typeof capacitanceUnits];

    if (isNaN(R) || isNaN(C) || R <= 0 || C <= 0) {
      setResult('Invalid input');
      return;
    }

    const fc = 1 / (2 * Math.PI * R * C);
    const fcKHz = fc / 1000;

    setResult(fcKHz.toFixed(6));
    setResultUnit('kHz');
    setCalculation({
      formula: 'f_c = 1 / (2πRC)',
      steps: [
        `R = ${resistance} ${resistanceUnit} = ${R.toExponential(3)} Ω`,
        `C = ${capacitance} ${capacitanceUnit} = ${C.toExponential(3)} F`,
        `f_c = 1 / (2 × π × ${R.toExponential(3)} × ${C.toExponential(3)})`,
        `f_c = 1 / (2 × 3.14159 × ${(2 * Math.PI * R * C).toExponential(3)})`,
        `f_c = ${fc.toExponential(3)} Hz = ${fcKHz.toFixed(6)} kHz`,
      ],
    });
  };

  const calculateResistanceRC = () => {
    const C = parseFloat(capacitance) * capacitanceUnits[capacitanceUnit as keyof typeof capacitanceUnits];
    const fc = parseFloat(frequency) * frequencyUnits[frequencyUnit as keyof typeof frequencyUnits];

    if (isNaN(C) || isNaN(fc) || C <= 0 || fc <= 0) {
      setResult('Invalid input');
      return;
    }

    const R = 1 / (2 * Math.PI * fc * C);
    const RkOhm = R / 1000;

    setResult(RkOhm.toFixed(6));
    setResultUnit('kΩ');
    setCalculation({
      formula: 'R = 1 / (2πf_c × C)',
      steps: [
        `f_c = ${frequency} ${frequencyUnit} = ${fc.toExponential(3)} Hz`,
        `C = ${capacitance} ${capacitanceUnit} = ${C.toExponential(3)} F`,
        `R = 1 / (2 × π × ${fc.toExponential(3)} × ${C.toExponential(3)})`,
        `R = 1 / (2 × 3.14159 × ${(2 * Math.PI * fc * C).toExponential(3)})`,
        `R = ${R.toExponential(3)} Ω = ${RkOhm.toFixed(6)} kΩ`,
      ],
    });
  };

  const calculateCapacitanceRC = () => {
    const R = parseFloat(resistance) * resistanceUnits[resistanceUnit as keyof typeof resistanceUnits];
    const fc = parseFloat(frequency) * frequencyUnits[frequencyUnit as keyof typeof frequencyUnits];

    if (isNaN(R) || isNaN(fc) || R <= 0 || fc <= 0) {
      setResult('Invalid input');
      return;
    }

    const C = 1 / (2 * Math.PI * fc * R);
    const CnF = C * 1e9;

    setResult(CnF.toFixed(6));
    setResultUnit('nF');
    setCalculation({
      formula: 'C = 1 / (2πf_c × R)',
      steps: [
        `f_c = ${frequency} ${frequencyUnit} = ${fc.toExponential(3)} Hz`,
        `R = ${resistance} ${resistanceUnit} = ${R.toExponential(3)} Ω`,
        `C = 1 / (2 × π × ${fc.toExponential(3)} × ${R.toExponential(3)})`,
        `C = 1 / (2 × 3.14159 × ${(2 * Math.PI * fc * R).toExponential(3)})`,
        `C = ${C.toExponential(3)} F = ${CnF.toFixed(6)} nF`,
      ],
    });
  };

  const calculateFrequencyRL = () => {
    const R = parseFloat(rlResistance) * resistanceUnits[rlResistanceUnit as keyof typeof resistanceUnits];
    const L = parseFloat(inductance) * inductanceUnits[inductanceUnit as keyof typeof inductanceUnits];

    if (isNaN(R) || isNaN(L) || R <= 0 || L <= 0) {
      setResult('Invalid input');
      return;
    }

    const fc = R / (2 * Math.PI * L);
    const fcKHz = fc / 1000;

    setResult(fcKHz.toFixed(6));
    setResultUnit('kHz');
    setCalculation({
      formula: 'f_c = R / (2πL)',
      steps: [
        `R = ${rlResistance} ${rlResistanceUnit} = ${R.toExponential(3)} Ω`,
        `L = ${inductance} ${inductanceUnit} = ${L.toExponential(3)} H`,
        `f_c = ${R.toExponential(3)} / (2 × π × ${L.toExponential(3)})`,
        `f_c = ${R.toExponential(3)} / (2 × 3.14159 × ${(2 * Math.PI * L).toExponential(3)})`,
        `f_c = ${fc.toExponential(3)} Hz = ${fcKHz.toFixed(6)} kHz`,
      ],
    });
  };

  const calculateResistanceRL = () => {
    const L = parseFloat(inductance) * inductanceUnits[inductanceUnit as keyof typeof inductanceUnits];
    const fc = parseFloat(rlFrequency) * frequencyUnits[rlFrequencyUnit as keyof typeof frequencyUnits];

    if (isNaN(L) || isNaN(fc) || L <= 0 || fc <= 0) {
      setResult('Invalid input');
      return;
    }

    const R = 2 * Math.PI * fc * L;
    const RkOhm = R / 1000;

    setResult(RkOhm.toFixed(6));
    setResultUnit('kΩ');
    setCalculation({
      formula: 'R = 2πf_c × L',
      steps: [
        `f_c = ${rlFrequency} ${rlFrequencyUnit} = ${fc.toExponential(3)} Hz`,
        `L = ${inductance} ${inductanceUnit} = ${L.toExponential(3)} H`,
        `R = 2 × π × ${fc.toExponential(3)} × ${L.toExponential(3)}`,
        `R = 2 × 3.14159 × ${(2 * Math.PI * fc * L).toExponential(3)}`,
        `R = ${R.toExponential(3)} Ω = ${RkOhm.toFixed(6)} kΩ`,
      ],
    });
  };

  const calculateInductanceRL = () => {
    const R = parseFloat(rlResistance) * resistanceUnits[rlResistanceUnit as keyof typeof resistanceUnits];
    const fc = parseFloat(rlFrequency) * frequencyUnits[rlFrequencyUnit as keyof typeof frequencyUnits];

    if (isNaN(R) || isNaN(fc) || R <= 0 || fc <= 0) {
      setResult('Invalid input');
      return;
    }

    const L = R / (2 * Math.PI * fc);
    const LmH = L * 1000;

    setResult(LmH.toFixed(6));
    setResultUnit('mH');
    setCalculation({
      formula: 'L = R / (2πf_c)',
      steps: [
        `R = ${rlResistance} ${rlResistanceUnit} = ${R.toExponential(3)} Ω`,
        `f_c = ${rlFrequency} ${rlFrequencyUnit} = ${fc.toExponential(3)} Hz`,
        `L = ${R.toExponential(3)} / (2 × π × ${fc.toExponential(3)})`,
        `L = ${R.toExponential(3)} / (2 × 3.14159 × ${(2 * Math.PI * fc).toExponential(3)})`,
        `L = ${L.toExponential(3)} H = ${LmH.toFixed(6)} mH`,
      ],
    });
  };

  const handleCalculate = () => {
    if (filterType === 'rc') {
      if (calculationType === 'frequency') calculateFrequencyRC();
      else if (calculationType === 'resistance') calculateResistanceRC();
      else if (calculationType === 'capacitance') calculateCapacitanceRC();
    } else {
      if (calculationType === 'frequency') calculateFrequencyRL();
      else if (calculationType === 'resistance') calculateResistanceRL();
      else if (calculationType === 'inductance') calculateInductanceRL();
    }
  };

  return (
    <div style={{ '--primary-color': primaryColor } as React.CSSProperties}>
      <Card className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200">
        {showTitle && <h1 className="text-4xl font-bold mb-6 text-slate-800">Low Pass Filter Calculator</h1>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Filter Type Selection */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <label className="block text-lg font-semibold mb-4 text-slate-700">Filter Type</label>
            <div className="flex gap-4">
              <button
                onClick={() => setFilterType('rc')}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  filterType === 'rc'
                    ? 'bg-[#820ECC] text-white shadow-lg'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                RC Filter
              </button>
              <button
                onClick={() => setFilterType('rl')}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  filterType === 'rl'
                    ? 'bg-[#820ECC] text-white shadow-lg'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                RL Filter
              </button>
            </div>
          </div>

          {/* Calculation Type */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <label className="block text-lg font-semibold mb-4 text-slate-700">Calculate</label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value as any)}
              className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg font-semibold text-slate-700 focus:border-[#820ECC] focus:outline-none"
            >
              <option value="frequency">Cutoff Frequency (f_c)</option>
              <option value="resistance">Resistance (R)</option>
              {filterType === 'rc' && <option value="capacitance">Capacitance (C)</option>}
              {filterType === 'rl' && <option value="inductance">Inductance (L)</option>}
            </select>
          </div>
        </div>

        {/* RC Filter Inputs */}
        {filterType === 'rc' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white p-6 rounded-lg shadow-md border border-slate-200">
            {calculationType !== 'resistance' && (
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
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {calculationType !== 'capacitance' && (
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
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {(calculationType === 'resistance' || calculationType === 'capacitance') && (
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Cutoff Frequency (f_c)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                    placeholder="Enter frequency"
                  />
                  <select
                    value={frequencyUnit}
                    onChange={(e) => setFrequencyUnit(e.target.value)}
                    className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                  >
                    {Object.keys(frequencyUnits).map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        )}

        {/* RL Filter Inputs */}
        {filterType === 'rl' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white p-6 rounded-lg shadow-md border border-slate-200">
            {calculationType !== 'resistance' && (
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Inductance (L)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inductance}
                    onChange={(e) => setInductance(e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                    placeholder="Enter inductance"
                  />
                  <select
                    value={inductanceUnit}
                    onChange={(e) => setInductanceUnit(e.target.value)}
                    className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                  >
                    {Object.keys(inductanceUnits).map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {calculationType !== 'inductance' && (
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Resistance (R)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={rlResistance}
                    onChange={(e) => setRlResistance(e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                    placeholder="Enter resistance"
                  />
                  <select
                    value={rlResistanceUnit}
                    onChange={(e) => setRlResistanceUnit(e.target.value)}
                    className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                  >
                    {Object.keys(resistanceUnits).map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {(calculationType === 'resistance' || calculationType === 'inductance') && (
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Cutoff Frequency (f_c)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={rlFrequency}
                    onChange={(e) => setRlFrequency(e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                    placeholder="Enter frequency"
                  />
                  <select
                    value={rlFrequencyUnit}
                    onChange={(e) => setRlFrequencyUnit(e.target.value)}
                    className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-[#820ECC] focus:outline-none"
                  >
                    {Object.keys(frequencyUnits).map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
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
          <h3 className="text-lg font-bold text-slate-800 mb-2">📝 About Low Pass Filters</h3>
          <p className="text-slate-700 text-sm">
            A low pass filter (LPF) allows signals below a cutoff frequency (f_c) to pass through while attenuating higher frequencies. Common topologies include RC (resistor-capacitor) filters with formula f_c = 1/(2πRC) and RL (resistor-inductor) filters with formula f_c = R/(2πL). These filters are essential in audio processing, anti-aliasing, power supply noise reduction, and signal conditioning applications.
          </p>
        </div>
      </Card>
    </div>
  );
}
