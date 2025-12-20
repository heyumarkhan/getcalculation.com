'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: m³/s, m², m/s, m³, s)
const flowRateUnits = {
  'm³/s': { name: 'm³/s', factor: 1 },
  'L/s': { name: 'L/s', factor: 0.001 },
  'L/min': { name: 'L/min', factor: 0.0000166667 },
  'L/h': { name: 'L/h', factor: 0.000000277778 },
  'mL/s': { name: 'mL/s', factor: 0.000001 },
  'gal/min': { name: 'gal/min (US)', factor: 0.0000630902 },
  'gal/h': { name: 'gal/h (US)', factor: 0.0000010515 },
  'ft³/s': { name: 'ft³/s', factor: 0.0283168 },
  'ft³/min': { name: 'ft³/min', factor: 0.000471947 },
  'in³/s': { name: 'in³/s', factor: 0.0000163871 }
};

const areaUnits = {
  'm²': { name: 'm²', factor: 1 },
  'cm²': { name: 'cm²', factor: 0.0001 },
  'mm²': { name: 'mm²', factor: 0.000001 },
  'ft²': { name: 'ft²', factor: 0.092903 },
  'in²': { name: 'in²', factor: 0.00064516 }
};

const velocityUnits = {
  'm/s': { name: 'm/s', factor: 1 },
  'cm/s': { name: 'cm/s', factor: 0.01 },
  'mm/s': { name: 'mm/s', factor: 0.001 },
  'km/h': { name: 'km/h', factor: 0.277778 },
  'ft/s': { name: 'ft/s', factor: 0.3048 },
  'in/s': { name: 'in/s', factor: 0.0254 },
  'mph': { name: 'mph', factor: 0.44704 }
};

const volumeUnits = {
  'm³': { name: 'm³', factor: 1 },
  'L': { name: 'L', factor: 0.001 },
  'mL': { name: 'mL', factor: 0.000001 },
  'cm³': { name: 'cm³', factor: 0.000001 },
  'ft³': { name: 'ft³', factor: 0.0283168 },
  'in³': { name: 'in³', factor: 0.0000163871 },
  'gal': { name: 'gal (US)', factor: 0.00378541 }
};

const timeUnits = {
  's': { name: 's', factor: 1 },
  'min': { name: 'min', factor: 60 },
  'h': { name: 'h', factor: 3600 },
  'ms': { name: 'ms', factor: 0.001 },
  'day': { name: 'day', factor: 86400 }
};

type CalculationMode = 'area-velocity' | 'volume-time';

export default function FlowRateCalculator() {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('area-velocity');
  const [flowRate, setFlowRate] = useState('');
  const [area, setArea] = useState('');
  const [velocity, setVelocity] = useState('');
  const [volume, setVolume] = useState('');
  const [time, setTime] = useState('');
  
  const [flowRateUnit, setFlowRateUnit] = useState('m³/s');
  const [areaUnit, setAreaUnit] = useState('m²');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [volumeUnit, setVolumeUnit] = useState('m³');
  const [timeUnit, setTimeUnit] = useState('s');
  
  const [result, setResult] = useState<{ value: number; unit: string; type: 'flowRate' | 'area' | 'velocity' | 'volume' | 'time' } | null>(null);
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

  const convertFlowRateToBase = (value: number, unit: string) => {
    return value * flowRateUnits[unit as keyof typeof flowRateUnits].factor;
  };

  const convertFlowRateFromBase = (value: number, unit: string) => {
    return value / flowRateUnits[unit as keyof typeof flowRateUnits].factor;
  };

  const convertAreaToBase = (value: number, unit: string) => {
    return value * areaUnits[unit as keyof typeof areaUnits].factor;
  };

  const convertAreaFromBase = (value: number, unit: string) => {
    return value / areaUnits[unit as keyof typeof areaUnits].factor;
  };

  const convertVelocityToBase = (value: number, unit: string) => {
    return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertVelocityFromBase = (value: number, unit: string) => {
    return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertVolumeToBase = (value: number, unit: string) => {
    return value * volumeUnits[unit as keyof typeof volumeUnits].factor;
  };

  const convertVolumeFromBase = (value: number, unit: string) => {
    return value / volumeUnits[unit as keyof typeof volumeUnits].factor;
  };

  const convertTimeToBase = (value: number, unit: string) => {
    return value * timeUnits[unit as keyof typeof timeUnits].factor;
  };

  const convertTimeFromBase = (value: number, unit: string) => {
    return value / timeUnits[unit as keyof typeof timeUnits].factor;
  };

  const calculate = () => {
    if (calculationMode === 'area-velocity') {
      // Q = A × v
      const q = flowRate ? parseFloat(flowRate) : NaN;
      const a = area ? parseFloat(area) : NaN;
      const v = velocity ? parseFloat(velocity) : NaN;

      const filledCount = [flowRate, area, velocity].filter(val => val !== '').length;

      if (filledCount !== 2) {
        setResult(null);
        setCalculation('');
        return;
      }

      // Validate that filled values are valid numbers
      if (flowRate && (isNaN(q) || q <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for flow rate');
        return;
      }
      if (area && (isNaN(a) || a <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for area');
        return;
      }
      if (velocity && (isNaN(v) || v <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for velocity');
        return;
      }

      if (!flowRate) {
        // Calculate flow rate: Q = A × v
        const aBase = convertAreaToBase(a, areaUnit);
        const vBase = convertVelocityToBase(v, velocityUnit);
        const qBase = aBase * vBase;
        const qResult = convertFlowRateFromBase(qBase, flowRateUnit);
        
        setResult({ value: qResult, unit: flowRateUnit, type: 'flowRate' });
        setCalculation(`Q = A × v = ${formatValue(a)} ${areaUnit} × ${formatValue(v)} ${velocityUnit} = ${formatValue(qResult)} ${flowRateUnit}`);
      } else if (!area) {
        // Calculate area: A = Q / v
        const qBase = convertFlowRateToBase(q, flowRateUnit);
        const vBase = convertVelocityToBase(v, velocityUnit);
        
        if (vBase === 0) {
          setResult(null);
          setCalculation('Error: Velocity cannot be zero');
          return;
        }
        
        const aBase = qBase / vBase;
        const aResult = convertAreaFromBase(aBase, areaUnit);
        
        setResult({ value: aResult, unit: areaUnit, type: 'area' });
        setCalculation(`A = Q / v = ${formatValue(q)} ${flowRateUnit} / ${formatValue(v)} ${velocityUnit} = ${formatValue(aResult)} ${areaUnit}`);
      } else if (!velocity) {
        // Calculate velocity: v = Q / A
        const qBase = convertFlowRateToBase(q, flowRateUnit);
        const aBase = convertAreaToBase(a, areaUnit);
        
        if (aBase === 0) {
          setResult(null);
          setCalculation('Error: Area cannot be zero');
          return;
        }
        
        const vBase = qBase / aBase;
        const vResult = convertVelocityFromBase(vBase, velocityUnit);
        
        setResult({ value: vResult, unit: velocityUnit, type: 'velocity' });
        setCalculation(`v = Q / A = ${formatValue(q)} ${flowRateUnit} / ${formatValue(a)} ${areaUnit} = ${formatValue(vResult)} ${velocityUnit}`);
      }
    } else {
      // Q = V / t
      const q = flowRate ? parseFloat(flowRate) : NaN;
      const v = volume ? parseFloat(volume) : NaN;
      const t = time ? parseFloat(time) : NaN;

      const filledCount = [flowRate, volume, time].filter(val => val !== '').length;

      if (filledCount !== 2) {
        setResult(null);
        setCalculation('');
        return;
      }

      // Validate that filled values are valid numbers
      if (flowRate && (isNaN(q) || q <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for flow rate');
        return;
      }
      if (volume && (isNaN(v) || v <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for volume');
        return;
      }
      if (time && (isNaN(t) || t <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for time');
        return;
      }

      if (!flowRate) {
        // Calculate flow rate: Q = V / t
        const vBase = convertVolumeToBase(v, volumeUnit);
        const tBase = convertTimeToBase(t, timeUnit);
        
        if (tBase === 0) {
          setResult(null);
          setCalculation('Error: Time cannot be zero');
          return;
        }
        
        const qBase = vBase / tBase;
        const qResult = convertFlowRateFromBase(qBase, flowRateUnit);
        
        setResult({ value: qResult, unit: flowRateUnit, type: 'flowRate' });
        setCalculation(`Q = V / t = ${formatValue(v)} ${volumeUnit} / ${formatValue(t)} ${timeUnit} = ${formatValue(qResult)} ${flowRateUnit}`);
      } else if (!volume) {
        // Calculate volume: V = Q × t
        const qBase = convertFlowRateToBase(q, flowRateUnit);
        const tBase = convertTimeToBase(t, timeUnit);
        const vBase = qBase * tBase;
        const vResult = convertVolumeFromBase(vBase, volumeUnit);
        
        setResult({ value: vResult, unit: volumeUnit, type: 'volume' });
        setCalculation(`V = Q × t = ${formatValue(q)} ${flowRateUnit} × ${formatValue(t)} ${timeUnit} = ${formatValue(vResult)} ${volumeUnit}`);
      } else if (!time) {
        // Calculate time: t = V / Q
        const vBase = convertVolumeToBase(v, volumeUnit);
        const qBase = convertFlowRateToBase(q, flowRateUnit);
        
        if (qBase === 0) {
          setResult(null);
          setCalculation('Error: Flow rate cannot be zero');
          return;
        }
        
        const tBase = vBase / qBase;
        const tResult = convertTimeFromBase(tBase, timeUnit);
        
        setResult({ value: tResult, unit: timeUnit, type: 'time' });
        setCalculation(`t = V / Q = ${formatValue(v)} ${volumeUnit} / ${formatValue(q)} ${flowRateUnit} = ${formatValue(tResult)} ${timeUnit}`);
      }
    }
  };

  const clearAll = () => {
    setFlowRate('');
    setArea('');
    setVelocity('');
    setVolume('');
    setTime('');
    setFlowRateUnit('m³/s');
    setAreaUnit('m²');
    setVelocityUnit('m/s');
    setVolumeUnit('m³');
    setTimeUnit('s');
    setResult(null);
    setCalculation('');
  };

  const getResultColor = () => {
    return 'bg-[#820ECC]/10 border-[#820ECC]/30';
  };

  const getResultTextColor = () => {
    return 'text-[#820ECC]';
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Flow Rate Calculator</h2>
        <p className="text-gray-600">Calculate flow rate using Q = A × v or Q = V/t</p>
      </div>

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Calculation Method
          </label>
          <select
            value={calculationMode}
            onChange={(e) => {
              setCalculationMode(e.target.value as CalculationMode);
              clearAll();
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="area-velocity">Using Area and Velocity (Q = A × v)</option>
            <option value="volume-time">Using Volume and Time (Q = V/t)</option>
          </select>
        </div>

        {/* Flow Rate Input */}
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
                autoFocus
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

        {/* Area and Velocity Inputs (for area-velocity mode) */}
        {calculationMode === 'area-velocity' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Cross-Sectional Area (A)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-32">
                  <select
                    value={areaUnit}
                    onChange={(e) => setAreaUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(areaUnits).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Velocity (v)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter velocity"
                    value={velocity}
                    onChange={(e) => setVelocity(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-32">
                  <select
                    value={velocityUnit}
                    onChange={(e) => setVelocityUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(velocityUnits).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Volume and Time Inputs (for volume-time mode) */}
        {calculationMode === 'volume-time' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Volume (V)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter volume"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-32">
                  <select
                    value={volumeUnit}
                    onChange={(e) => setVolumeUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(volumeUnits).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Time (t)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-32">
                  <select
                    value={timeUnit}
                    onChange={(e) => setTimeUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(timeUnits).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex gap-3 pt-2">
          <Button onClick={calculate} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className={`mt-6 p-4 ${getResultColor()} border rounded-lg`}>
            <h3 className={`text-lg font-semibold ${getResultTextColor()} mb-2`}>Result</h3>
            <p className={`text-2xl font-bold ${getResultTextColor()}`}>
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && (
              <p className={`text-sm ${getResultTextColor()}/80 mt-2 font-mono`}>
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
            {calculationMode === 'area-velocity' ? (
              <>
                <li>• Enter any two values to calculate the third (Q, A, or v)</li>
                <li>• Leave the value you want to calculate empty</li>
                <li>• Formula: Q = A × v (Flow Rate = Area × Velocity)</li>
              </>
            ) : (
              <>
                <li>• Enter any two values to calculate the third (Q, V, or t)</li>
                <li>• Leave the value you want to calculate empty</li>
                <li>• Formula: Q = V/t (Flow Rate = Volume ÷ Time)</li>
              </>
            )}
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

