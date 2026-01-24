'use client';

import React, { useState } from 'react';

interface CalculationStep {
  description: string;
  formula: string;
  result: string;
}

export default function AngularFrequencyCalculator({ showTitle = true }: { showTitle?: boolean }) {
  const [frequency, setFrequency] = useState<number | ''>('');
  const [angularFrequency, setAngularFrequency] = useState<number | ''>('');
  const [period, setPeriod] = useState<number | ''>('');
  const [frequencyUnit, setFrequencyUnit] = useState('Hz');
  const [angularUnit, setAngularUnit] = useState('rad/s');
  const [periodUnit, setPeriodUnit] = useState('s');
  const [steps, setSteps] = useState<CalculationStep[]>([]);

  // Unit conversion factors
  const frequencyToHz: Record<string, number> = {
    'Hz': 1,
    'kHz': 1000,
    'MHz': 1000000,
    'GHz': 1000000000,
    'rpm': 1/60
  };

  const angularToRadS: Record<string, number> = {
    'rad/s': 1,
    'deg/s': Math.PI / 180,
    'rpm': 2 * Math.PI / 60
  };

  const periodToSeconds: Record<string, number> = {
    's': 1,
    'ms': 0.001,
    'μs': 0.000001,
    'min': 60,
    'h': 3600
  };

  const calculateFromFrequency = () => {
    if (frequency === '' || frequency <= 0) {
      alert('Please enter a valid frequency');
      return;
    }

    const freqInHz = frequency * frequencyToHz[frequencyUnit];
    const omega = 2 * Math.PI * freqInHz;
    const T = 1 / freqInHz;

    const omegaInSelectedUnit = omega / angularToRadS[angularUnit];
    const periodInSelectedUnit = T / periodToSeconds[periodUnit];

    const newSteps: CalculationStep[] = [
      {
        description: 'Convert frequency to Hz',
        formula: `${frequency} ${frequencyUnit} = ${freqInHz.toExponential(4)} Hz`,
        result: freqInHz.toExponential(4)
      },
      {
        description: 'Calculate angular frequency using ω = 2πf',
        formula: `ω = 2π × ${freqInHz.toExponential(4)} = ${omega.toExponential(4)} rad/s`,
        result: omega.toExponential(4)
      },
      {
        description: `Convert to ${angularUnit}`,
        formula: `${omega.toExponential(4)} rad/s = ${omegaInSelectedUnit.toExponential(4)} ${angularUnit}`,
        result: omegaInSelectedUnit.toExponential(4)
      },
      {
        description: 'Calculate period using T = 1/f',
        formula: `T = 1 / ${freqInHz.toExponential(4)} = ${T.toExponential(4)} s`,
        result: T.toExponential(4)
      },
      {
        description: `Convert period to ${periodUnit}`,
        formula: `${T.toExponential(4)} s = ${periodInSelectedUnit.toExponential(4)} ${periodUnit}`,
        result: periodInSelectedUnit.toExponential(4)
      }
    ];

    setAngularFrequency(parseFloat(omegaInSelectedUnit.toExponential(4)));
    setPeriod(parseFloat(periodInSelectedUnit.toExponential(4)));
    setSteps(newSteps);
  };

  const calculateFromAngular = () => {
    if (angularFrequency === '' || angularFrequency <= 0) {
      alert('Please enter a valid angular frequency');
      return;
    }

    const omegaInRadS = angularFrequency * angularToRadS[angularUnit];
    const freqInHz = omegaInRadS / (2 * Math.PI);
    const T = 1 / freqInHz;

    const freqInSelectedUnit = freqInHz / frequencyToHz[frequencyUnit];
    const periodInSelectedUnit = T / periodToSeconds[periodUnit];

    const newSteps: CalculationStep[] = [
      {
        description: 'Convert angular frequency to rad/s',
        formula: `${angularFrequency} ${angularUnit} = ${omegaInRadS.toExponential(4)} rad/s`,
        result: omegaInRadS.toExponential(4)
      },
      {
        description: 'Calculate frequency using f = ω/(2π)',
        formula: `f = ${omegaInRadS.toExponential(4)} / (2π) = ${freqInHz.toExponential(4)} Hz`,
        result: freqInHz.toExponential(4)
      },
      {
        description: `Convert to ${frequencyUnit}`,
        formula: `${freqInHz.toExponential(4)} Hz = ${freqInSelectedUnit.toExponential(4)} ${frequencyUnit}`,
        result: freqInSelectedUnit.toExponential(4)
      },
      {
        description: 'Calculate period using T = 2π/ω',
        formula: `T = 2π / ${omegaInRadS.toExponential(4)} = ${T.toExponential(4)} s`,
        result: T.toExponential(4)
      },
      {
        description: `Convert period to ${periodUnit}`,
        formula: `${T.toExponential(4)} s = ${periodInSelectedUnit.toExponential(4)} ${periodUnit}`,
        result: periodInSelectedUnit.toExponential(4)
      }
    ];

    setFrequency(parseFloat(freqInSelectedUnit.toExponential(4)));
    setPeriod(parseFloat(periodInSelectedUnit.toExponential(4)));
    setSteps(newSteps);
  };

  const calculateFromPeriod = () => {
    if (period === '' || period <= 0) {
      alert('Please enter a valid period');
      return;
    }

    const T = period * periodToSeconds[periodUnit];
    const freqInHz = 1 / T;
    const omega = 2 * Math.PI * freqInHz;

    const freqInSelectedUnit = freqInHz / frequencyToHz[frequencyUnit];
    const omegaInSelectedUnit = omega / angularToRadS[angularUnit];

    const newSteps: CalculationStep[] = [
      {
        description: 'Convert period to seconds',
        formula: `${period} ${periodUnit} = ${T.toExponential(4)} s`,
        result: T.toExponential(4)
      },
      {
        description: 'Calculate frequency using f = 1/T',
        formula: `f = 1 / ${T.toExponential(4)} = ${freqInHz.toExponential(4)} Hz`,
        result: freqInHz.toExponential(4)
      },
      {
        description: `Convert to ${frequencyUnit}`,
        formula: `${freqInHz.toExponential(4)} Hz = ${freqInSelectedUnit.toExponential(4)} ${frequencyUnit}`,
        result: freqInSelectedUnit.toExponential(4)
      },
      {
        description: 'Calculate angular frequency using ω = 2π/T',
        formula: `ω = 2π / ${T.toExponential(4)} = ${omega.toExponential(4)} rad/s`,
        result: omega.toExponential(4)
      },
      {
        description: `Convert to ${angularUnit}`,
        formula: `${omega.toExponential(4)} rad/s = ${omegaInSelectedUnit.toExponential(4)} ${angularUnit}`,
        result: omegaInSelectedUnit.toExponential(4)
      }
    ];

    setFrequency(parseFloat(freqInSelectedUnit.toExponential(4)));
    setAngularFrequency(parseFloat(omegaInSelectedUnit.toExponential(4)));
    setSteps(newSteps);
  };

  const reset = () => {
    setFrequency('');
    setAngularFrequency('');
    setPeriod('');
    setSteps([]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {showTitle && <h1 className="text-3xl font-bold mb-6 text-gray-800">Angular Frequency Calculator</h1>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Frequency Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Frequency (f)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value === '' ? '' : parseFloat(e.target.value))}
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
              <option value="rpm">rpm</option>
            </select>
          </div>
        </div>

        {/* Angular Frequency Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Angular Frequency (ω)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={angularFrequency}
              onChange={(e) => setAngularFrequency(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="Enter angular frequency"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <select
              value={angularUnit}
              onChange={(e) => setAngularUnit(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="rad/s">rad/s</option>
              <option value="deg/s">deg/s</option>
              <option value="rpm">rpm</option>
            </select>
          </div>
        </div>

        {/* Period Input */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Period (T)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={period}
              onChange={(e) => setPeriod(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="Enter period"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <select
              value={periodUnit}
              onChange={(e) => setPeriodUnit(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="s">s</option>
              <option value="ms">ms</option>
              <option value="μs">μs</option>
              <option value="min">min</option>
              <option value="h">h</option>
            </select>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <button
          onClick={calculateFromFrequency}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition"
          style={{ backgroundColor: '#820ECC' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6a0b9e')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#820ECC')}
        >
          From Frequency
        </button>
        <button
          onClick={calculateFromAngular}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition"
          style={{ backgroundColor: '#820ECC' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6a0b9e')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#820ECC')}
        >
          From Angular Freq
        </button>
        <button
          onClick={calculateFromPeriod}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition"
          style={{ backgroundColor: '#820ECC' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6a0b9e')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#820ECC')}
        >
          From Period
        </button>
      </div>

      <button
        onClick={reset}
        className="w-full px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition mb-6"
      >
        Reset
      </button>

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
              <p className="text-sm text-gray-600">Frequency (f)</p>
              <p className="text-xl font-bold text-gray-800">
                {frequency !== '' ? `${typeof frequency === 'number' ? frequency.toExponential(4) : frequency} ${frequencyUnit}` : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Angular Frequency (ω)</p>
              <p className="text-xl font-bold text-gray-800">
                {angularFrequency !== '' ? `${typeof angularFrequency === 'number' ? angularFrequency.toExponential(4) : angularFrequency} ${angularUnit}` : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Period (T)</p>
              <p className="text-xl font-bold text-gray-800">
                {period !== '' ? `${typeof period === 'number' ? period.toExponential(4) : period} ${periodUnit}` : 'N/A'}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-300">
            <p className="text-xs text-gray-500">Key formulas: ω = 2πf, f = 1/T, ω = 2π/T</p>
          </div>
        </div>
      )}
    </div>
  );
}
