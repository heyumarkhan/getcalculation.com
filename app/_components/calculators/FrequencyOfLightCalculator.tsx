'use client';

import React, { useState } from 'react';

interface CalculationStep {
  description: string;
  formula: string;
  result: string;
}

export default function FrequencyOfLightCalculator({ showTitle = true }: { showTitle?: boolean }) {
  const [wavelength, setWavelength] = useState<number | ''>('');
  const [frequency, setFrequency] = useState<number | ''>('');
  const [wavelengthUnit, setWavelengthUnit] = useState('nm');
  const [frequencyUnit, setFrequencyUnit] = useState('Hz');
  const [steps, setSteps] = useState<CalculationStep[]>([]);

  const speedOfLight = 299792458; // m/s
  const speedOfLightNm = speedOfLight * 1e9; // in nm/s

  // Unit conversion factors
  const wavelengthToMeters: Record<string, number> = {
    'm': 1,
    'cm': 0.01,
    'mm': 0.001,
    'μm': 1e-6,
    'nm': 1e-9,
    'Å': 1e-10
  };

  const frequencyMultipliers: Record<string, number> = {
    'Hz': 1,
    'kHz': 1e3,
    'MHz': 1e6,
    'GHz': 1e9,
    'THz': 1e12,
    'PHz': 1e15
  };

  const calculateFromWavelength = () => {
    if (wavelength === '' || wavelength <= 0) {
      alert('Please enter a valid wavelength');
      return;
    }

    const wavelengthInMeters = wavelength * wavelengthToMeters[wavelengthUnit];
    const freqInHz = speedOfLight / wavelengthInMeters;
    const freqInSelectedUnit = freqInHz / frequencyMultipliers[frequencyUnit];

    const newSteps: CalculationStep[] = [
      {
        description: 'Convert wavelength to meters',
        formula: `${wavelength} ${wavelengthUnit} = ${wavelengthInMeters.toExponential(2)} m`,
        result: wavelengthInMeters.toExponential(2)
      },
      {
        description: 'Calculate frequency using c = λ × f',
        formula: `f = c / λ = ${speedOfLight} / ${wavelengthInMeters.toExponential(2)}`,
        result: freqInHz.toExponential(2)
      },
      {
        description: `Convert to ${frequencyUnit}`,
        formula: `f = ${freqInHz.toExponential(2)} / ${frequencyMultipliers[frequencyUnit]}`,
        result: freqInSelectedUnit.toExponential(4)
      }
    ];

    setFrequency(parseFloat(freqInSelectedUnit.toExponential(4)));
    setSteps(newSteps);
  };

  const calculateFromFrequency = () => {
    if (frequency === '' || frequency <= 0) {
      alert('Please enter a valid frequency');
      return;
    }

    const freqInHz = frequency * frequencyMultipliers[frequencyUnit];
    const wavelengthInMeters = speedOfLight / freqInHz;
    const wavelengthInSelectedUnit = wavelengthInMeters / wavelengthToMeters[wavelengthUnit];

    const newSteps: CalculationStep[] = [
      {
        description: 'Convert frequency to Hz',
        formula: `${frequency} ${frequencyUnit} = ${freqInHz.toExponential(2)} Hz`,
        result: freqInHz.toExponential(2)
      },
      {
        description: 'Calculate wavelength using λ = c / f',
        formula: `λ = ${speedOfLight} / ${freqInHz.toExponential(2)}`,
        result: wavelengthInMeters.toExponential(2)
      },
      {
        description: `Convert to ${wavelengthUnit}`,
        formula: `λ = ${wavelengthInMeters.toExponential(2)} / ${wavelengthToMeters[wavelengthUnit]}`,
        result: wavelengthInSelectedUnit.toExponential(4)
      }
    ];

    setWavelength(parseFloat(wavelengthInSelectedUnit.toExponential(4)));
    setSteps(newSteps);
  };

  const reset = () => {
    setWavelength('');
    setFrequency('');
    setSteps([]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {showTitle && <h1 className="text-3xl font-bold mb-6 text-gray-800">Frequency of Light Calculator</h1>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Wavelength Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Wavelength
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={wavelength}
              onChange={(e) => setWavelength(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="Enter wavelength"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <select
              value={wavelengthUnit}
              onChange={(e) => setWavelengthUnit(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="m">m</option>
              <option value="cm">cm</option>
              <option value="mm">mm</option>
              <option value="μm">μm</option>
              <option value="nm">nm</option>
              <option value="Å">Å</option>
            </select>
          </div>
        </div>

        {/* Frequency Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Frequency
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
              <option value="THz">THz</option>
              <option value="PHz">PHz</option>
            </select>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={calculateFromWavelength}
          className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition"
          style={{ backgroundColor: '#820ECC' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6a0b9e')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#820ECC')}
        >
          Calculate from Wavelength
        </button>
        <button
          onClick={calculateFromFrequency}
          className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition"
          style={{ backgroundColor: '#820ECC' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6a0b9e')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#820ECC')}
        >
          Calculate from Frequency
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Wavelength</p>
              <p className="text-xl font-bold text-gray-800">
                {wavelength !== '' ? `${wavelength} ${wavelengthUnit}` : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Frequency</p>
              <p className="text-xl font-bold text-gray-800">
                {frequency !== '' ? `${typeof frequency === 'number' ? frequency.toExponential(4) : frequency} ${frequencyUnit}` : 'N/A'}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">Speed of light (c) = {speedOfLight} m/s</p>
        </div>
      )}
    </div>
  );
}
