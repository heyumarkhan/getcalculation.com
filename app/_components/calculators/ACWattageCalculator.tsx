'use client';

import { useState } from 'react';

type CalculationMode = 'power' | 'voltage' | 'current' | 'powerFactor';
type PhaseType = 'single' | 'three';

const voltageUnits = [
  { value: 'V', label: 'V', toBase: 1 },
  { value: 'kV', label: 'kV', toBase: 1000 },
  { value: 'mV', label: 'mV', toBase: 0.001 },
];

const currentUnits = [
  { value: 'A', label: 'A', toBase: 1 },
  { value: 'mA', label: 'mA', toBase: 0.001 },
  { value: 'kA', label: 'kA', toBase: 1000 },
];

const powerUnits = [
  { value: 'W', label: 'W', toBase: 1 },
  { value: 'kW', label: 'kW', toBase: 1000 },
  { value: 'MW', label: 'MW', toBase: 1000000 },
  { value: 'mW', label: 'mW', toBase: 0.001 },
  { value: 'hp', label: 'hp', toBase: 745.7 },
];

export default function ACWattageCalculator() {
  const [mode, setMode] = useState<CalculationMode>('power');
  const [phaseType, setPhaseType] = useState<PhaseType>('single');
  
  const [voltage, setVoltage] = useState('');
  const [voltageUnit, setVoltageUnit] = useState('V');
  
  const [current, setCurrent] = useState('');
  const [currentUnit, setCurrentUnit] = useState('A');
  
  const [power, setPower] = useState('');
  const [powerUnit, setPowerUnit] = useState('W');
  
  const [powerFactor, setPowerFactor] = useState('');
  
  const [result, setResult] = useState<{
    power?: number;
    voltage?: number;
    current?: number;
    powerFactor?: number;
    apparentPower?: number;
    reactivePower?: number;
  } | null>(null);

  const convertToBase = (value: number, unit: string, units: typeof voltageUnits) => {
    const unitData = units.find(u => u.value === unit);
    return value * (unitData?.toBase || 1);
  };

  const convertFromBase = (value: number, unit: string, units: typeof voltageUnits) => {
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
      const voltageBase = voltage ? convertToBase(parseFloat(voltage), voltageUnit, voltageUnits) : 0;
      const currentBase = current ? convertToBase(parseFloat(current), currentUnit, currentUnits) : 0;
      const powerBase = power ? convertToBase(parseFloat(power), powerUnit, powerUnits) : 0;
      const pf = powerFactor ? parseFloat(powerFactor) : 0;

      if (pf < 0 || pf > 1) {
        alert('Power factor must be between 0 and 1');
        return;
      }

      const phaseFactor = phaseType === 'three' ? Math.sqrt(3) : 1;

      let calculatedResult: typeof result = {};

      if (mode === 'power') {
        // Calculate power from V, I, PF
        if (!voltage || !current || !powerFactor) {
          alert('Please enter voltage, current, and power factor');
          return;
        }
        
        const realPower = phaseFactor * voltageBase * currentBase * pf;
        const apparentPower = phaseFactor * voltageBase * currentBase;
        const reactivePower = Math.sqrt(apparentPower ** 2 - realPower ** 2);
        
        calculatedResult = {
          power: realPower,
          apparentPower,
          reactivePower,
        };
      } else if (mode === 'voltage') {
        // Calculate voltage from P, I, PF
        if (!power || !current || !powerFactor) {
          alert('Please enter power, current, and power factor');
          return;
        }
        
        if (pf === 0) {
          alert('Power factor cannot be zero');
          return;
        }
        
        const calculatedVoltage = powerBase / (phaseFactor * currentBase * pf);
        const apparentPower = phaseFactor * calculatedVoltage * currentBase;
        const reactivePower = Math.sqrt(apparentPower ** 2 - powerBase ** 2);
        
        calculatedResult = {
          voltage: calculatedVoltage,
          apparentPower,
          reactivePower,
        };
      } else if (mode === 'current') {
        // Calculate current from P, V, PF
        if (!power || !voltage || !powerFactor) {
          alert('Please enter power, voltage, and power factor');
          return;
        }
        
        if (pf === 0) {
          alert('Power factor cannot be zero');
          return;
        }
        
        const calculatedCurrent = powerBase / (phaseFactor * voltageBase * pf);
        const apparentPower = phaseFactor * voltageBase * calculatedCurrent;
        const reactivePower = Math.sqrt(apparentPower ** 2 - powerBase ** 2);
        
        calculatedResult = {
          current: calculatedCurrent,
          apparentPower,
          reactivePower,
        };
      } else if (mode === 'powerFactor') {
        // Calculate power factor from P, V, I
        if (!power || !voltage || !current) {
          alert('Please enter power, voltage, and current');
          return;
        }
        
        const apparentPower = phaseFactor * voltageBase * currentBase;
        
        if (apparentPower === 0) {
          alert('Apparent power cannot be zero');
          return;
        }
        
        const calculatedPF = powerBase / apparentPower;
        
        if (calculatedPF > 1) {
          alert('Calculated power factor exceeds 1. Check input values.');
          return;
        }
        
        const reactivePower = Math.sqrt(apparentPower ** 2 - powerBase ** 2);
        
        calculatedResult = {
          powerFactor: calculatedPF,
          apparentPower,
          reactivePower,
        };
      }

      setResult(calculatedResult);
    } catch (error) {
      alert('Invalid input. Please check your values.');
    }
  };

  const reset = () => {
    setVoltage('');
    setCurrent('');
    setPower('');
    setPowerFactor('');
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-6">
        {/* Phase Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phase Type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="single"
                checked={phaseType === 'single'}
                onChange={(e) => setPhaseType(e.target.value as PhaseType)}
                className="mr-2"
                style={{ accentColor: '#820ECC' }}
              />
              <span className="text-sm">Single-Phase</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="three"
                checked={phaseType === 'three'}
                onChange={(e) => setPhaseType(e.target.value as PhaseType)}
                className="mr-2"
                style={{ accentColor: '#820ECC' }}
              />
              <span className="text-sm">Three-Phase</span>
            </label>
          </div>
        </div>

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
            <option value="power">Power (from V, I, PF)</option>
            <option value="voltage">Voltage (from P, I, PF)</option>
            <option value="current">Current (from P, V, PF)</option>
            <option value="powerFactor">Power Factor (from P, V, I)</option>
          </select>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Voltage Input */}
          {mode !== 'voltage' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voltage (V) {mode === 'power' ? '*' : mode === 'current' || mode === 'powerFactor' ? '*' : ''}
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent"
                  placeholder="Enter voltage"
                  step="any"
                />
                <select
                  value={voltageUnit}
                  onChange={(e) => setVoltageUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent"
                >
                  {voltageUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Current Input */}
          {mode !== 'current' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current (I) {mode === 'power' ? '*' : mode === 'voltage' || mode === 'powerFactor' ? '*' : ''}
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent"
                  placeholder="Enter current"
                  step="any"
                />
                <select
                  value={currentUnit}
                  onChange={(e) => setCurrentUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent"
                >
                  {currentUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Power Input */}
          {mode !== 'power' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Real Power (P) *
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={power}
                  onChange={(e) => setPower(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent"
                  placeholder="Enter power"
                  step="any"
                />
                <select
                  value={powerUnit}
                  onChange={(e) => setPowerUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent"
                >
                  {powerUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Power Factor Input */}
          {mode !== 'powerFactor' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Power Factor (cos φ) *
              </label>
              <input
                type="number"
                value={powerFactor}
                onChange={(e) => setPowerFactor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent"
                placeholder="Enter power factor (0-1)"
                step="0.01"
                min="0"
                max="1"
              />
              <p className="text-xs text-gray-500 mt-1">Value between 0 and 1 (1 = unity power factor)</p>
            </div>
          )}
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
              {result.power !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Real Power (P):</span>
                  <span className="text-lg font-bold text-[#820ECC]">
                    {formatResult(convertFromBase(result.power, powerUnit, powerUnits))} {powerUnit}
                  </span>
                </div>
              )}
              {result.voltage !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Voltage (V):</span>
                  <span className="text-lg font-bold text-[#820ECC]">
                    {formatResult(convertFromBase(result.voltage, voltageUnit, voltageUnits))} {voltageUnit}
                  </span>
                </div>
              )}
              {result.current !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Current (I):</span>
                  <span className="text-lg font-bold text-[#820ECC]">
                    {formatResult(convertFromBase(result.current, currentUnit, currentUnits))} {currentUnit}
                  </span>
                </div>
              )}
              {result.powerFactor !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Power Factor (cos φ):</span>
                  <span className="text-lg font-bold text-[#820ECC]">
                    {formatResult(result.powerFactor)}
                  </span>
                </div>
              )}
              {result.apparentPower !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Apparent Power (S):</span>
                  <span className="text-lg font-bold text-gray-600">
                    {formatResult(convertFromBase(result.apparentPower, powerUnit, powerUnits))} VA
                  </span>
                </div>
              )}
              {result.reactivePower !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Reactive Power (Q):</span>
                  <span className="text-lg font-bold text-gray-600">
                    {formatResult(convertFromBase(result.reactivePower, powerUnit, powerUnits))} VAR
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Formula Reference */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-700 mb-2">Formulas:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Single-Phase:</strong> P = V × I × cos(φ)</p>
            <p><strong>Three-Phase:</strong> P = √3 × V × I × cos(φ)</p>
            <p><strong>Apparent Power:</strong> S = V × I (or √3 × V × I for 3-phase)</p>
            <p><strong>Reactive Power:</strong> Q = √(S² - P²)</p>
            <p><strong>Power Factor:</strong> PF = cos(φ) = P / S</p>
          </div>
        </div>

        {/* Common AC Power Examples */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-gray-700 mb-3">Common AC Power Applications:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-700">Residential (120V, 15A, PF=0.9):</p>
              <p>Power ≈ 1,620 W</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Industrial Motor (480V, 50A, PF=0.85):</p>
              <p>Power ≈ 20,400 W</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Small Appliance (230V, 5A, PF=0.95):</p>
              <p>Power ≈ 1,093 W</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">3-Phase Motor (400V, 100A, PF=0.8):</p>
              <p>Power ≈ 55,426 W</p>
            </div>
          </div>
        </div>

        {/* Typical Power Factor Values */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-gray-700 mb-3">Typical Power Factor Values:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600">
            <div>Incandescent Lamps: 1.0</div>
            <div>Fluorescent Lamps: 0.5-0.95</div>
            <div>Induction Motors (Full Load): 0.85-0.9</div>
            <div>Induction Motors (No Load): 0.2-0.3</div>
            <div>Resistance Heaters: 1.0</div>
            <div>Welding Equipment: 0.5-0.7</div>
          </div>
        </div>
      </div>
    </div>
  );
}
