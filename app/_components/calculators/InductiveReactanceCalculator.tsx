'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function InductiveReactanceCalculator() {
  const [method, setMethod] = useState('reactance');
  
  // Method 1: Calculate Inductive Reactance
  const [frequency, setFrequency] = useState('');
  const [frequencyUnit, setFrequencyUnit] = useState('Hz');
  const [inductance, setInductance] = useState('');
  const [inductanceUnit, setInductanceUnit] = useState('H');
  
  // Method 2: Calculate Inductance
  const [reactance2, setReactance2] = useState('');
  const [reactanceUnit2, setReactanceUnit2] = useState('Ω');
  const [frequency2, setFrequency2] = useState('');
  const [frequencyUnit2, setFrequencyUnit2] = useState('Hz');
  
  // Method 3: Calculate Frequency
  const [reactance3, setReactance3] = useState('');
  const [reactanceUnit3, setReactanceUnit3] = useState('Ω');
  const [inductance3, setInductance3] = useState('');
  const [inductanceUnit3, setInductanceUnit3] = useState('H');
  
  // Method 4: Calculate Impedance in RL Circuit
  const [resistance, setResistance] = useState('');
  const [resistanceUnit, setResistanceUnit] = useState('Ω');
  const [reactance4, setReactance4] = useState('');
  const [reactanceUnit4, setReactanceUnit4] = useState('Ω');

  const [result, setResult] = useState<string | null>(null);

  // Conversion functions for frequency
  const frequencyToHz = (value: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'Hz': 1,
      'kHz': 1000,
      'MHz': 1000000,
      'GHz': 1000000000
    };
    return value * conversions[unit];
  };

  const hzToUnit = (hz: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'Hz': 1,
      'kHz': 1000,
      'MHz': 1000000,
      'GHz': 1000000000
    };
    return hz / conversions[unit];
  };

  // Conversion functions for inductance
  const inductanceToH = (value: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'H': 1,
      'mH': 0.001,
      'μH': 0.000001,
      'nH': 0.000000001
    };
    return value * conversions[unit];
  };

  const hToUnit = (h: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'H': 1,
      'mH': 0.001,
      'μH': 0.000001,
      'nH': 0.000000001
    };
    return h / conversions[unit];
  };

  // Conversion functions for reactance/resistance
  const reactanceToOhm = (value: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'Ω': 1,
      'kΩ': 1000,
      'MΩ': 1000000,
      'mΩ': 0.001
    };
    return value * conversions[unit];
  };

  const ohmToUnit = (ohm: number, unit: string): number => {
    const conversions: { [key: string]: number } = {
      'Ω': 1,
      'kΩ': 1000,
      'MΩ': 1000000,
      'mΩ': 0.001
    };
    return ohm / conversions[unit];
  };

  const calculate = () => {
    try {
      if (method === 'reactance') {
        // XL = 2πfL
        const fVal = parseFloat(frequency);
        const lVal = parseFloat(inductance);

        if (isNaN(fVal) || isNaN(lVal) || fVal <= 0 || lVal <= 0) {
          setResult('Please enter valid positive values for frequency and inductance.');
          return;
        }

        const fHz = frequencyToHz(fVal, frequencyUnit);
        const lH = inductanceToH(lVal, inductanceUnit);

        const xl = 2 * Math.PI * fHz * lH;
        const omega = 2 * Math.PI * fHz;
        
        // Verification
        const xlCheck = omega * lH;

        setResult(`
          <div class="space-y-3">
            <div class="text-lg font-semibold text-purple-700">Inductive Reactance:</div>
            <div class="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
              <div class="text-3xl font-bold text-purple-900">XL = ${xl.toFixed(4)} Ω</div>
              <div class="text-sm text-gray-600 mt-2">
                = ${ohmToUnit(xl, 'kΩ').toFixed(6)} kΩ
                ${xl >= 1000000 ? `= ${ohmToUnit(xl, 'MΩ').toFixed(6)} MΩ` : ''}
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div class="p-3 bg-gray-50 rounded border">
                <div class="text-sm font-semibold text-gray-700">Angular Frequency (ω)</div>
                <div class="text-lg font-bold text-gray-900">${omega.toFixed(4)} rad/s</div>
              </div>
              <div class="p-3 bg-gray-50 rounded border">
                <div class="text-sm font-semibold text-gray-700">Frequency</div>
                <div class="text-lg font-bold text-gray-900">${fHz.toFixed(2)} Hz</div>
              </div>
            </div>

            <div class="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
              <div class="text-sm font-semibold text-blue-900">Verification:</div>
              <div class="text-sm text-blue-800 mt-1">
                XL = ωL = ${omega.toFixed(4)} × ${lH.toExponential(4)} = ${xlCheck.toFixed(4)} Ω ✓
              </div>
            </div>

            <div class="text-xs text-gray-500 mt-3">
              Formula: XL = 2πfL where f = ${fVal} ${frequencyUnit}, L = ${lVal} ${inductanceUnit}
            </div>
          </div>
        `);

      } else if (method === 'inductance') {
        // L = XL / (2πf)
        const xlVal = parseFloat(reactance2);
        const fVal = parseFloat(frequency2);

        if (isNaN(xlVal) || isNaN(fVal) || xlVal <= 0 || fVal <= 0) {
          setResult('Please enter valid positive values for reactance and frequency.');
          return;
        }

        const xlOhm = reactanceToOhm(xlVal, reactanceUnit2);
        const fHz = frequencyToHz(fVal, frequencyUnit2);

        const omega = 2 * Math.PI * fHz;
        const l = xlOhm / omega;
        
        // Verification
        const xlCheck = 2 * Math.PI * fHz * l;

        setResult(`
          <div class="space-y-3">
            <div class="text-lg font-semibold text-purple-700">Inductance:</div>
            <div class="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
              <div class="text-3xl font-bold text-purple-900">L = ${l.toExponential(4)} H</div>
              <div class="text-sm text-gray-600 mt-2">
                = ${hToUnit(l, 'mH').toFixed(6)} mH
                = ${hToUnit(l, 'μH').toFixed(6)} μH
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div class="p-3 bg-gray-50 rounded border">
                <div class="text-sm font-semibold text-gray-700">Angular Frequency (ω)</div>
                <div class="text-lg font-bold text-gray-900">${omega.toFixed(4)} rad/s</div>
              </div>
              <div class="p-3 bg-gray-50 rounded border">
                <div class="text-sm font-semibold text-gray-700">Reactance</div>
                <div class="text-lg font-bold text-gray-900">${xlOhm.toFixed(4)} Ω</div>
              </div>
            </div>

            <div class="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
              <div class="text-sm font-semibold text-blue-900">Verification:</div>
              <div class="text-sm text-blue-800 mt-1">
                XL = 2πfL = 2π × ${fHz.toFixed(2)} × ${l.toExponential(4)} = ${xlCheck.toFixed(4)} Ω ✓
              </div>
            </div>

            <div class="text-xs text-gray-500 mt-3">
              Formula: L = XL / (2πf) where XL = ${xlVal} ${reactanceUnit2}, f = ${fVal} ${frequencyUnit2}
            </div>
          </div>
        `);

      } else if (method === 'frequency') {
        // f = XL / (2πL)
        const xlVal = parseFloat(reactance3);
        const lVal = parseFloat(inductance3);

        if (isNaN(xlVal) || isNaN(lVal) || xlVal <= 0 || lVal <= 0) {
          setResult('Please enter valid positive values for reactance and inductance.');
          return;
        }

        const xlOhm = reactanceToOhm(xlVal, reactanceUnit3);
        const lH = inductanceToH(lVal, inductanceUnit3);

        const f = xlOhm / (2 * Math.PI * lH);
        const omega = xlOhm / lH;
        
        // Verification
        const xlCheck = 2 * Math.PI * f * lH;

        setResult(`
          <div class="space-y-3">
            <div class="text-lg font-semibold text-purple-700">Frequency:</div>
            <div class="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
              <div class="text-3xl font-bold text-purple-900">f = ${f.toFixed(4)} Hz</div>
              <div class="text-sm text-gray-600 mt-2">
                = ${hzToUnit(f, 'kHz').toFixed(6)} kHz
                ${f >= 1000000 ? `= ${hzToUnit(f, 'MHz').toFixed(6)} MHz` : ''}
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div class="p-3 bg-gray-50 rounded border">
                <div class="text-sm font-semibold text-gray-700">Angular Frequency (ω)</div>
                <div class="text-lg font-bold text-gray-900">${omega.toFixed(4)} rad/s</div>
              </div>
              <div class="p-3 bg-gray-50 rounded border">
                <div class="text-sm font-semibold text-gray-700">Period (T)</div>
                <div class="text-lg font-bold text-gray-900">${(1/f).toExponential(4)} s</div>
              </div>
            </div>

            <div class="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
              <div class="text-sm font-semibold text-blue-900">Verification:</div>
              <div class="text-sm text-blue-800 mt-1">
                XL = 2πfL = 2π × ${f.toFixed(4)} × ${lH.toExponential(4)} = ${xlCheck.toFixed(4)} Ω ✓
              </div>
            </div>

            <div class="text-xs text-gray-500 mt-3">
              Formula: f = XL / (2πL) where XL = ${xlVal} ${reactanceUnit3}, L = ${lVal} ${inductanceUnit3}
            </div>
          </div>
        `);

      } else if (method === 'impedance') {
        // Z = √(R² + XL²), Phase angle φ = arctan(XL/R)
        const rVal = parseFloat(resistance);
        const xlVal = parseFloat(reactance4);

        if (isNaN(rVal) || isNaN(xlVal) || rVal < 0 || xlVal < 0) {
          setResult('Please enter valid non-negative values for resistance and reactance.');
          return;
        }

        const rOhm = reactanceToOhm(rVal, resistanceUnit);
        const xlOhm = reactanceToOhm(xlVal, reactanceUnit4);

        const z = Math.sqrt(rOhm * rOhm + xlOhm * xlOhm);
        const phaseRad = Math.atan2(xlOhm, rOhm);
        const phaseDeg = phaseRad * (180 / Math.PI);
        const powerFactor = Math.cos(phaseRad);
        
        // Verification using polar form
        const zCheck = Math.sqrt(Math.pow(rOhm, 2) + Math.pow(xlOhm, 2));

        setResult(`
          <div class="space-y-3">
            <div class="text-lg font-semibold text-purple-700">RL Circuit Impedance:</div>
            <div class="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
              <div class="text-3xl font-bold text-purple-900">Z = ${z.toFixed(4)} Ω</div>
              <div class="text-sm text-gray-600 mt-2">
                = ${ohmToUnit(z, 'kΩ').toFixed(6)} kΩ
                ${z >= 1000000 ? `= ${ohmToUnit(z, 'MΩ').toFixed(6)} MΩ` : ''}
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div class="p-3 bg-gray-50 rounded border">
                <div class="text-sm font-semibold text-gray-700">Phase Angle (φ)</div>
                <div class="text-lg font-bold text-gray-900">${phaseDeg.toFixed(2)}°</div>
                <div class="text-xs text-gray-600">${phaseRad.toFixed(4)} rad</div>
              </div>
              <div class="p-3 bg-gray-50 rounded border">
                <div class="text-sm font-semibold text-gray-700">Power Factor</div>
                <div class="text-lg font-bold text-gray-900">${powerFactor.toFixed(4)}</div>
                <div class="text-xs text-gray-600">${rOhm > 0 ? 'Lagging' : 'N/A'}</div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div class="p-3 bg-gray-50 rounded border">
                <div class="text-sm font-semibold text-gray-700">Resistance (R)</div>
                <div class="text-lg font-bold text-gray-900">${rOhm.toFixed(4)} Ω</div>
              </div>
              <div class="p-3 bg-gray-50 rounded border">
                <div class="text-sm font-semibold text-gray-700">Reactance (XL)</div>
                <div class="text-lg font-bold text-gray-900">${xlOhm.toFixed(4)} Ω</div>
              </div>
            </div>

            <div class="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
              <div class="text-sm font-semibold text-blue-900">Verification:</div>
              <div class="text-sm text-blue-800 mt-1">
                Z = √(R² + XL²) = √(${rOhm.toFixed(2)}² + ${xlOhm.toFixed(2)}²) = ${zCheck.toFixed(4)} Ω ✓
              </div>
            </div>

            <div class="text-xs text-gray-500 mt-3">
              Formula: Z = √(R² + XL²), φ = arctan(XL/R) where R = ${rVal} ${resistanceUnit}, XL = ${xlVal} ${reactanceUnit4}
            </div>
          </div>
        `);
      }
    } catch (error) {
      setResult('An error occurred during calculation. Please check your inputs.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🧲</span>
          <h1 className="text-2xl font-bold text-gray-900">Inductive Reactance Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate inductive reactance, inductance, frequency, and RL circuit impedance for AC analysis.
        </p>

        {/* Method Selection */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select calculation method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'reactance' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input
                type="radio"
                name="method"
                value="reactance"
                checked={method === 'reactance'}
                onChange={(e) => setMethod(e.target.value)}
                className="mr-2"
              />
              Calculate Inductive Reactance (XL = 2πfL)
            </label>

            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'inductance' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input
                type="radio"
                name="method"
                value="inductance"
                checked={method === 'inductance'}
                onChange={(e) => setMethod(e.target.value)}
                className="mr-2"
              />
              Calculate Inductance (L = XL/(2πf))
            </label>

            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'frequency' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input
                type="radio"
                name="method"
                value="frequency"
                checked={method === 'frequency'}
                onChange={(e) => setMethod(e.target.value)}
                className="mr-2"
              />
              Calculate Frequency (f = XL/(2πL))
            </label>

            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'impedance' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input
                type="radio"
                name="method"
                value="impedance"
                checked={method === 'impedance'}
                onChange={(e) => setMethod(e.target.value)}
                className="mr-2"
              />
              Calculate RL Circuit Impedance (Z = √(R²+XL²))
            </label>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {method === 'reactance' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency (f):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter frequency"
                      step="any"
                    />
                    <select
                      value={frequencyUnit}
                      onChange={(e) => setFrequencyUnit(e.target.value)}
                      className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Hz">Hz</option>
                      <option value="kHz">kHz</option>
                      <option value="MHz">MHz</option>
                      <option value="GHz">GHz</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inductance (L):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inductance}
                      onChange={(e) => setInductance(e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter inductance"
                      step="any"
                    />
                    <select
                      value={inductanceUnit}
                      onChange={(e) => setInductanceUnit(e.target.value)}
                      className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="H">H</option>
                      <option value="mH">mH</option>
                      <option value="μH">μH</option>
                      <option value="nH">nH</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          {method === 'inductance' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inductive Reactance (XL):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={reactance2}
                      onChange={(e) => setReactance2(e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter reactance"
                      step="any"
                    />
                    <select
                      value={reactanceUnit2}
                      onChange={(e) => setReactanceUnit2(e.target.value)}
                      className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Ω">Ω</option>
                      <option value="kΩ">kΩ</option>
                      <option value="MΩ">MΩ</option>
                      <option value="mΩ">mΩ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency (f):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={frequency2}
                      onChange={(e) => setFrequency2(e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter frequency"
                      step="any"
                    />
                    <select
                      value={frequencyUnit2}
                      onChange={(e) => setFrequencyUnit2(e.target.value)}
                      className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Hz">Hz</option>
                      <option value="kHz">kHz</option>
                      <option value="MHz">MHz</option>
                      <option value="GHz">GHz</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          {method === 'frequency' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inductive Reactance (XL):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={reactance3}
                      onChange={(e) => setReactance3(e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter reactance"
                      step="any"
                    />
                    <select
                      value={reactanceUnit3}
                      onChange={(e) => setReactanceUnit3(e.target.value)}
                      className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Ω">Ω</option>
                      <option value="kΩ">kΩ</option>
                      <option value="MΩ">MΩ</option>
                      <option value="mΩ">mΩ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inductance (L):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inductance3}
                      onChange={(e) => setInductance3(e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter inductance"
                      step="any"
                    />
                    <select
                      value={inductanceUnit3}
                      onChange={(e) => setInductanceUnit3(e.target.value)}
                      className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="H">H</option>
                      <option value="mH">mH</option>
                      <option value="μH">μH</option>
                      <option value="nH">nH</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          {method === 'impedance' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resistance (R):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={resistance}
                      onChange={(e) => setResistance(e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter resistance"
                      step="any"
                    />
                    <select
                      value={resistanceUnit}
                      onChange={(e) => setResistanceUnit(e.target.value)}
                      className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Ω">Ω</option>
                      <option value="kΩ">kΩ</option>
                      <option value="MΩ">MΩ</option>
                      <option value="mΩ">mΩ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inductive Reactance (XL):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={reactance4}
                      onChange={(e) => setReactance4(e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter reactance"
                      step="any"
                    />
                    <select
                      value={reactanceUnit4}
                      onChange={(e) => setReactanceUnit4(e.target.value)}
                      className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Ω">Ω</option>
                      <option value="kΩ">kΩ</option>
                      <option value="MΩ">MΩ</option>
                      <option value="mΩ">mΩ</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>


        <Button onClick={calculate} className="w-full bg-[#820ECC] text-white font-semibold py-3 rounded-lg hover:bg-[#6b0aa6] transition">
          Calculate
        </Button>

        {/* Result Display */}
        {result && (
          <div 
            className="result-container mt-6"
            dangerouslySetInnerHTML={{ __html: result }}
          />
        )}
      </Card>
    </div>
  );
}
