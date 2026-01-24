'use client';

import React, { useState } from 'react';

interface CalculationStep {
  description: string;
  formula: string;
  result: string;
}

type FilterType = 'rc-low-pass' | 'rc-high-pass' | 'rl-low-pass' | 'rl-high-pass';

export default function CutoffFrequencyCalculator({ showTitle = true }: { showTitle?: boolean }) {
  const [filterType, setFilterType] = useState<FilterType>('rc-low-pass');
  const [value1, setValue1] = useState<number | ''>('');
  const [value2, setValue2] = useState<number | ''>('');
  const [cutoffFrequency, setCutoffFrequency] = useState<number | ''>('');
  const [value1Unit, setValue1Unit] = useState('Ω');
  const [value2Unit, setValue2Unit] = useState('F');
  const [frequencyUnit, setFrequencyUnit] = useState('Hz');
  const [steps, setSteps] = useState<CalculationStep[]>([]);

  const frequencyMultipliers: Record<string, number> = {
    'Hz': 1,
    'kHz': 1000,
    'MHz': 1000000,
    'GHz': 1000000000
  };

  const resistanceMultipliers: Record<string, number> = {
    'Ω': 1,
    'kΩ': 1000,
    'MΩ': 1000000
  };

  const capacitanceMultipliers: Record<string, number> = {
    'F': 1,
    'mF': 0.001,
    'μF': 0.000001,
    'nF': 0.000000001,
    'pF': 0.000000000001
  };

  const inductanceMultipliers: Record<string, number> = {
    'H': 1,
    'mH': 0.001,
    'μH': 0.000001,
    'nH': 0.000000001
  };

  const calculateFromComponents = () => {
    if (value1 === '' || value1 <= 0 || value2 === '' || value2 <= 0) {
      alert('Please enter valid component values');
      return;
    }

    let fc: number;
    let formula: string;
    let steps_list: CalculationStep[] = [];

    if (filterType === 'rc-low-pass' || filterType === 'rc-high-pass') {
      const R = value1 * resistanceMultipliers[value1Unit];
      const C = value2 * capacitanceMultipliers[value2Unit];
      const tau = R * C;

      fc = 1 / (2 * Math.PI * R * C);
      formula = `fc = 1 / (2π × R × C) = 1 / (2π × ${R.toExponential(2)} × ${C.toExponential(2)})`;

      steps_list = [
        {
          description: 'Convert resistance to ohms',
          formula: `${value1} ${value1Unit} = ${R.toExponential(2)} Ω`,
          result: R.toExponential(2)
        },
        {
          description: 'Convert capacitance to farads',
          formula: `${value2} ${value2Unit} = ${C.toExponential(2)} F`,
          result: C.toExponential(2)
        },
        {
          description: 'Calculate RC time constant (τ)',
          formula: `τ = R × C = ${R.toExponential(2)} × ${C.toExponential(2)} = ${tau.toExponential(2)} s`,
          result: tau.toExponential(2)
        },
        {
          description: 'Calculate cutoff frequency',
          formula: `fc = 1 / (2π × τ) = 1 / (2π × ${tau.toExponential(2)}) = ${fc.toExponential(4)} Hz`,
          result: fc.toExponential(4)
        }
      ];
    } else {
      const R = value1 * resistanceMultipliers[value1Unit];
      const L = value2 * inductanceMultipliers[value2Unit];

      fc = R / (2 * Math.PI * L);
      formula = `fc = R / (2π × L) = ${R.toExponential(2)} / (2π × ${L.toExponential(2)})`;

      steps_list = [
        {
          description: 'Convert resistance to ohms',
          formula: `${value1} ${value1Unit} = ${R.toExponential(2)} Ω`,
          result: R.toExponential(2)
        },
        {
          description: 'Convert inductance to henries',
          formula: `${value2} ${value2Unit} = ${L.toExponential(2)} H`,
          result: L.toExponential(2)
        },
        {
          description: 'Calculate RL time constant (τ)',
          formula: `τ = L / R = ${L.toExponential(2)} / ${R.toExponential(2)} = ${(L / R).toExponential(2)} s`,
          result: (L / R).toExponential(2)
        },
        {
          description: 'Calculate cutoff frequency',
          formula: `fc = R / (2π × L) = ${R.toExponential(2)} / (2π × ${L.toExponential(2)}) = ${fc.toExponential(4)} Hz`,
          result: fc.toExponential(4)
        }
      ];
    }

    const fcInSelectedUnit = fc / frequencyMultipliers[frequencyUnit];

    steps_list.push({
      description: `Convert to ${frequencyUnit}`,
      formula: `${fc.toExponential(4)} Hz = ${fcInSelectedUnit.toExponential(4)} ${frequencyUnit}`,
      result: fcInSelectedUnit.toExponential(4)
    });

    setCutoffFrequency(parseFloat(fcInSelectedUnit.toExponential(4)));
    setSteps(steps_list);
  };

  const calculateFromCutoff = () => {
    if (cutoffFrequency === '' || cutoffFrequency <= 0) {
      alert('Please enter a valid cutoff frequency');
      return;
    }

    const fcInHz = cutoffFrequency * frequencyMultipliers[frequencyUnit];

    if (filterType === 'rc-low-pass' || filterType === 'rc-high-pass') {
      // If we have one component value, calculate the other
      if (value1 !== '' && value1 > 0) {
        const R = value1 * resistanceMultipliers[value1Unit];
        const C = 1 / (2 * Math.PI * R * fcInHz);
        const CInSelectedUnit = C / capacitanceMultipliers[value2Unit];

        const steps_list: CalculationStep[] = [
          {
            description: 'Convert cutoff frequency to Hz',
            formula: `${cutoffFrequency} ${frequencyUnit} = ${fcInHz.toExponential(4)} Hz`,
            result: fcInHz.toExponential(4)
          },
          {
            description: 'Convert resistance to ohms',
            formula: `${value1} ${value1Unit} = ${R.toExponential(2)} Ω`,
            result: R.toExponential(2)
          },
          {
            description: 'Calculate capacitance from fc = 1/(2πRC)',
            formula: `C = 1 / (2π × fc × R) = 1 / (2π × ${fcInHz.toExponential(4)} × ${R.toExponential(2)}) = ${C.toExponential(4)} F`,
            result: C.toExponential(4)
          },
          {
            description: `Convert to ${value2Unit}`,
            formula: `${C.toExponential(4)} F = ${CInSelectedUnit.toExponential(4)} ${value2Unit}`,
            result: CInSelectedUnit.toExponential(4)
          }
        ];

        setValue2(parseFloat(CInSelectedUnit.toExponential(4)));
        setSteps(steps_list);
      }
    } else {
      // RL filter
      if (value1 !== '' && value1 > 0) {
        const R = value1 * resistanceMultipliers[value1Unit];
        const L = R / (2 * Math.PI * fcInHz);
        const LInSelectedUnit = L / inductanceMultipliers[value2Unit];

        const steps_list: CalculationStep[] = [
          {
            description: 'Convert cutoff frequency to Hz',
            formula: `${cutoffFrequency} ${frequencyUnit} = ${fcInHz.toExponential(4)} Hz`,
            result: fcInHz.toExponential(4)
          },
          {
            description: 'Convert resistance to ohms',
            formula: `${value1} ${value1Unit} = ${R.toExponential(2)} Ω`,
            result: R.toExponential(2)
          },
          {
            description: 'Calculate inductance from fc = R/(2πL)',
            formula: `L = R / (2π × fc) = ${R.toExponential(2)} / (2π × ${fcInHz.toExponential(4)}) = ${L.toExponential(4)} H`,
            result: L.toExponential(4)
          },
          {
            description: `Convert to ${value2Unit}`,
            formula: `${L.toExponential(4)} H = ${LInSelectedUnit.toExponential(4)} ${value2Unit}`,
            result: LInSelectedUnit.toExponential(4)
          }
        ];

        setValue2(parseFloat(LInSelectedUnit.toExponential(4)));
        setSteps(steps_list);
      }
    }
  };

  const reset = () => {
    setValue1('');
    setValue2('');
    setCutoffFrequency('');
    setSteps([]);
  };

  const getLabel1 = () => filterType.includes('rc') ? 'Resistance (R)' : 'Resistance (R)';
  const getLabel2 = () => filterType.includes('rc') ? 'Capacitance (C)' : 'Inductance (L)';
  const getUnit2 = () => filterType.includes('rc') ? value2Unit : value2Unit;
  const getMultiplier2 = () => filterType.includes('rc') ? capacitanceMultipliers : inductanceMultipliers;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {showTitle && <h1 className="text-3xl font-bold mb-6 text-gray-800">Cutoff Frequency Calculator</h1>}

      {/* Filter Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter Type</label>
        <select
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value as FilterType);
            setSteps([]);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="rc-low-pass">RC Low Pass Filter</option>
          <option value="rc-high-pass">RC High Pass Filter</option>
          <option value="rl-low-pass">RL Low Pass Filter</option>
          <option value="rl-high-pass">RL High Pass Filter</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Value 1 Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{getLabel1()}</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="Enter resistance"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <select
              value={value1Unit}
              onChange={(e) => setValue1Unit(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="Ω">Ω</option>
              <option value="kΩ">kΩ</option>
              <option value="MΩ">MΩ</option>
            </select>
          </div>
        </div>

        {/* Value 2 Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{getLabel2()}</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder={`Enter ${filterType.includes('rc') ? 'capacitance' : 'inductance'}`}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <select
              value={value2Unit}
              onChange={(e) => setValue2Unit(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
            >
              {filterType.includes('rc') ? (
                <>
                  <option value="F">F</option>
                  <option value="mF">mF</option>
                  <option value="μF">μF</option>
                  <option value="nF">nF</option>
                  <option value="pF">pF</option>
                </>
              ) : (
                <>
                  <option value="H">H</option>
                  <option value="mH">mH</option>
                  <option value="μH">μH</option>
                  <option value="nH">nH</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Cutoff Frequency Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cutoff Frequency (fc)</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={cutoffFrequency}
              onChange={(e) => setCutoffFrequency(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="Enter frequency"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <select
              value={frequencyUnit}
              onChange={(e) => setFrequencyUnit(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="Hz">Hz</option>
              <option value="kHz">kHz</option>
              <option value="MHz">MHz</option>
              <option value="GHz">GHz</option>
            </select>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={calculateFromComponents}
          className="flex-1 px-4 py-2 text-white font-medium rounded-lg transition"
          style={{ backgroundColor: '#820ECC' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6a0b9e')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#820ECC')}
        >
          Calculate from Components
        </button>
        <button
          onClick={calculateFromCutoff}
          className="flex-1 px-4 py-2 text-white font-medium rounded-lg transition"
          style={{ backgroundColor: '#820ECC' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6a0b9e')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#820ECC')}
        >
          Calculate Component
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition"
        >
          Reset
        </button>
      </div>

      {/* Steps */}
      {steps.length > 0 && (
        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Calculation Steps</h2>
          {steps.map((step, index) => (
            <div key={index} className="mb-4 p-3 bg-white rounded border-l-4 border-purple-500">
              <p className="font-medium text-gray-700">{index + 1}. {step.description}</p>
              <p className="text-sm text-gray-600 font-mono mt-1">{step.formula}</p>
              <p className="text-sm font-semibold text-purple-600 mt-2">Result: {step.result}</p>
            </div>
          ))}
        </div>
      )}

      {/* Results Summary */}
      {steps.length > 0 && (
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">{getLabel1()}</p>
              <p className="text-xl font-bold text-gray-800">
                {value1 !== '' ? `${value1} ${value1Unit}` : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">{getLabel2()}</p>
              <p className="text-xl font-bold text-gray-800">
                {value2 !== '' ? `${typeof value2 === 'number' ? value2.toExponential(4) : value2} ${value2Unit}` : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Cutoff Frequency</p>
              <p className="text-xl font-bold text-gray-800">
                {cutoffFrequency !== '' ? `${typeof cutoffFrequency === 'number' ? cutoffFrequency.toExponential(4) : cutoffFrequency} ${frequencyUnit}` : 'N/A'}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-300">
            <p className="text-xs text-gray-500">
              {filterType.includes('rc') ? 'RC Filter: fc = 1/(2πRC)' : 'RL Filter: fc = R/(2πL)'} | -3dB point
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
