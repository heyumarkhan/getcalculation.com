'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// AWG to cross-sectional area (mm²) conversion
const AWG_TO_AREA: { [key: number]: number } = {
  0: 53.5, 1: 42.4, 2: 33.6, 3: 26.7, 4: 21.2, 5: 16.8, 6: 13.3, 7: 10.5, 8: 8.37, 9: 6.63,
  10: 5.26, 11: 4.17, 12: 3.31, 13: 2.62, 14: 2.08, 15: 1.65, 16: 1.31, 17: 1.04, 18: 0.823, 19: 0.653,
  20: 0.518, 21: 0.410, 22: 0.326, 23: 0.258, 24: 0.205, 25: 0.162, 26: 0.129, 27: 0.102, 28: 0.0810, 29: 0.0642,
  30: 0.0509, 31: 0.0404, 32: 0.0320, 33: 0.0254, 34: 0.0201, 35: 0.0160, 36: 0.0127, 37: 0.0100, 38: 0.00797, 39: 0.00632, 40: 0.00501
};

AWG_TO_AREA[-1] = 67.4; // 3/0
AWG_TO_AREA[-2] = 85.0; // 4/0

const findAWGFromArea = (area: number): number => {
  let closestAWG = 0;
  let minDiff = Infinity;
  
  for (const [awg, awgArea] of Object.entries(AWG_TO_AREA)) {
    const diff = Math.abs(awgArea - area);
    if (diff < minDiff) {
      minDiff = diff;
      closestAWG = parseInt(awg);
    }
  }
  
  return closestAWG;
};

// Resistivity values (Ω·m at 20°C)
const RESISTIVITY = {
  copper: 1.68e-8,
  aluminum: 2.65e-8
};

// 220V AC is commonly found in: residential (Brazil, Australia, India), commercial industrial
const COMMON_LOADS_220V: { [key: string]: number } = {
  'Electric Heater (3-5 kW)': 15,
  'Water Heater (3 kW)': 13,
  'Air Conditioner (5 HP)': 25,
  'Welding Machine (7 kW)': 32,
  'Industrial Motor (10 HP)': 50,
  'Residential Branch (20 A)': 20,
  'Refrigerator (1.2 kW)': 5
};

type CalculationMode = 'wireSize' | 'current' | 'voltageDrop';

const lengthUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'mi': { name: 'mi (Miles)', factor: 1609.34 }
};

export default function WireSize220VoltCalculator() {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('wireSize');
  const [current, setCurrent] = useState('');
  const [voltageDrop, setVoltageDrop] = useState('5');
  const [length, setLength] = useState('');
  const [wireGauge, setWireGauge] = useState('');
  const [material, setMaterial] = useState<'copper' | 'aluminum'>('copper');
  const [lengthUnit, setLengthUnit] = useState('m');
  const [powerFactor, setPowerFactor] = useState('1');
  const [phase, setPhase] = useState<'single' | 'three'>('single');
  const [result, setResult] = useState<{ value: number; unit: string; label: string } | null>(null);
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

  const getAWGLabel = (awg: number): string => {
    if (awg === -2) return '4/0 (0000)';
    if (awg === -1) return '3/0 (000)';
    if (awg === 0) return '1/0 (0)';
    return awg.toString();
  };

  const calculate = () => {
    const i = current ? parseFloat(current) : NaN;
    const vDrop = voltageDrop ? parseFloat(voltageDrop) : NaN;
    const l = length ? parseFloat(length) : NaN;
    const awg = wireGauge ? parseFloat(wireGauge) : NaN;
    const pf = powerFactor ? parseFloat(powerFactor) : 1;

    if (calculationMode === 'wireSize') {
      if (!current || !voltageDrop || !length) {
        setResult(null);
        setCalculation('Error: Please enter current, voltage drop, and length');
        return;
      }

      if (isNaN(i) || i <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for current');
        return;
      }
      if (isNaN(vDrop) || vDrop <= 0 || vDrop > 220) {
        setResult(null);
        setCalculation('Error: Voltage drop must be positive and not exceed 220V');
        return;
      }
      if (isNaN(l) || l <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for length');
        return;
      }

      const requiredResistance = vDrop / i;
      const lBase = convertLengthToBase(l, lengthUnit);
      const resistivity = RESISTIVITY[material];
      
      // For 220V single-phase: R = V_drop / I (2-wire)
      // For 220V three-phase: R = V_drop / (√3 × I) (3-wire)
      let requiredArea: number;
      
      if (phase === 'three') {
        const conductorCount = 3;
        requiredArea = (resistivity * lBase * conductorCount) / requiredResistance;
      } else {
        const conductorCount = 2; // Round trip for single phase
        requiredArea = (resistivity * lBase * conductorCount) / requiredResistance;
      }
      
      const requiredAreaMM2 = requiredArea * 1e6;
      const calculatedAWG = findAWGFromArea(requiredAreaMM2);
      const actualArea = AWG_TO_AREA[calculatedAWG] || AWG_TO_AREA[Math.max(0, Math.min(40, Math.round(calculatedAWG)))];
      
      setResult({ value: calculatedAWG, unit: 'AWG', label: `Wire Gauge: ${getAWGLabel(calculatedAWG)}` });
      setCalculation(`220V ${phase === 'three' ? 'Three-Phase' : 'Single-Phase'} AC Circuit\nRequired resistance: R = V_drop / I = ${formatValue(vDrop)} V / ${formatValue(i)} A = ${formatValue(requiredResistance)} Ω\nRequired area: A = (ρ × L × ${phase === 'three' ? '3' : '2'}) / R = (${resistValue(resistivity)} Ω·m × ${formatValue(lBase)} m × ${phase === 'three' ? '3' : '2'}) / ${formatValue(requiredResistance)} Ω = ${formatValue(requiredAreaMM2)} mm²\nRecommended wire size: ${getAWGLabel(calculatedAWG)} (${formatValue(actualArea)} mm²)`);
    } else if (calculationMode === 'current') {
      if (!wireGauge || !voltageDrop || !length) {
        setResult(null);
        setCalculation('Error: Please enter wire gauge, voltage drop, and length');
        return;
      }

      if (isNaN(awg) || awg < -2 || awg > 40) {
        setResult(null);
        setCalculation('Error: Please enter a valid AWG value (-2 to 40)');
        return;
      }
      if (isNaN(vDrop) || vDrop <= 0 || vDrop > 220) {
        setResult(null);
        setCalculation('Error: Voltage drop must be positive and not exceed 220V');
        return;
      }
      if (isNaN(l) || l <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for length');
        return;
      }

      const areaMM2 = AWG_TO_AREA[awg] || AWG_TO_AREA[Math.max(-2, Math.min(40, Math.round(awg)))];
      const areaM2 = areaMM2 * 1e-6;
      const lBase = convertLengthToBase(l, lengthUnit);
      const resistivity = RESISTIVITY[material];
      
      let resistance: number;
      if (phase === 'three') {
        resistance = (resistivity * lBase * 3) / areaM2;
      } else {
        resistance = (resistivity * lBase * 2) / areaM2;
      }
      
      const maxCurrent = vDrop / resistance;
      
      setResult({ value: maxCurrent, unit: 'A', label: 'Maximum Current' });
      setCalculation(`220V ${phase === 'three' ? 'Three-Phase' : 'Single-Phase'} AC Circuit\nWire area (${getAWGLabel(awg)}): ${formatValue(areaMM2)} mm²\nResistance: R = (ρ × L × ${phase === 'three' ? '3' : '2'}) / A = (${resistValue(resistivity)} Ω·m × ${formatValue(lBase)} m × ${phase === 'three' ? '3' : '2'}) / ${formatValue(areaM2)} m² = ${formatValue(resistance)} Ω\nMaximum current: I = V_drop / R = ${formatValue(vDrop)} V / ${formatValue(resistance)} Ω = ${formatValue(maxCurrent)} A`);
    } else if (calculationMode === 'voltageDrop') {
      if (!wireGauge || !current || !length) {
        setResult(null);
        setCalculation('Error: Please enter wire gauge, current, and length');
        return;
      }

      if (isNaN(awg) || awg < -2 || awg > 40) {
        setResult(null);
        setCalculation('Error: Please enter a valid AWG value (-2 to 40)');
        return;
      }
      if (isNaN(i) || i <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for current');
        return;
      }
      if (isNaN(l) || l <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for length');
        return;
      }

      const areaMM2 = AWG_TO_AREA[awg] || AWG_TO_AREA[Math.max(-2, Math.min(40, Math.round(awg)))];
      const areaM2 = areaMM2 * 1e-6;
      const lBase = convertLengthToBase(l, lengthUnit);
      const resistivity = RESISTIVITY[material];
      
      let resistance: number;
      if (phase === 'three') {
        resistance = (resistivity * lBase * 3) / areaM2;
      } else {
        resistance = (resistivity * lBase * 2) / areaM2;
      }
      
      const calculatedVoltageDrop = i * resistance;
      const percentageDrop = ((calculatedVoltageDrop / 220) * 100);
      
      setResult({ value: calculatedVoltageDrop, unit: 'V', label: `Voltage Drop: ${formatValue(calculatedVoltageDrop)}V (${formatValue(percentageDrop)}%)` });
      setCalculation(`220V ${phase === 'three' ? 'Three-Phase' : 'Single-Phase'} AC Circuit\nWire area (${getAWGLabel(awg)}): ${formatValue(areaMM2)} mm²\nResistance: R = (ρ × L × ${phase === 'three' ? '3' : '2'}) / A = (${resistValue(resistivity)} Ω·m × ${formatValue(lBase)} m × ${phase === 'three' ? '3' : '2'}) / ${formatValue(areaM2)} m² = ${formatValue(resistance)} Ω\nVoltage drop: V_drop = I × R = ${formatValue(i)} A × ${formatValue(resistance)} Ω = ${formatValue(calculatedVoltageDrop)} V (${formatValue(percentageDrop)}%)`);
    }
  };

  const resistValue = (resistivity: number): string => {
    return resistivity.toExponential(2);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">220 Volt Wire Size Calculator</h2>
        <p className="text-gray-700 mb-4">Calculate wire gauge for 220V AC residential and commercial electrical circuits. Supports single-phase and three-phase systems with copper and aluminum conductors.</p>
      </Card>

      <Card className="bg-white border border-gray-300">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Calculation Mode</label>
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={() => {
                  setCalculationMode('wireSize');
                  setResult(null);
                  setCalculation('');
                }}
                variant={calculationMode === 'wireSize' ? 'primary' : 'outline'}
                className="flex-1 min-w-[140px]"
              >
                Wire Size
              </Button>
              <Button
                onClick={() => {
                  setCalculationMode('current');
                  setResult(null);
                  setCalculation('');
                }}
                variant={calculationMode === 'current' ? 'primary' : 'outline'}
                className="flex-1 min-w-[140px]"
              >
                Max Current
              </Button>
              <Button
                onClick={() => {
                  setCalculationMode('voltageDrop');
                  setResult(null);
                  setCalculation('');
                }}
                variant={calculationMode === 'voltageDrop' ? 'primary' : 'outline'}
                className="flex-1 min-w-[140px]"
              >
                Voltage Drop
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">System Type</label>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value as 'single' | 'three')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="single">Single-Phase (2-wire)</option>
                <option value="three">Three-Phase (3-wire)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Conductor Material</label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value as 'copper' | 'aluminum')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="copper">Copper (ρ = 1.68×10⁻⁸ Ω·m)</option>
                <option value="aluminum">Aluminum (ρ = 2.65×10⁻⁸ Ω·m)</option>
              </select>
            </div>
          </div>

          {calculationMode === 'wireSize' && (
            <>
              <Input
                label="Current (Amperes)"
                type="number"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                placeholder="Enter current in amperes"
              />
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Common Loads (Select to Autofill)</label>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      setCurrent(COMMON_LOADS_220V[e.target.value].toString());
                      e.target.value = '';
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">-- Select a common load --</option>
                  {Object.entries(COMMON_LOADS_220V).map(([name, amps]) => (
                    <option key={name} value={name}>
                      {name} - {amps}A
                    </option>
                  ))}
                </select>
              </div>
              <Input
                label="Voltage Drop (Volts)"
                type="number"
                value={voltageDrop}
                onChange={(e) => setVoltageDrop(e.target.value)}
                placeholder="5V recommended (2.3% of 220V)"
              />
              <Input
                label="Length"
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="Enter length"
              />
              <select
                value={lengthUnit}
                onChange={(e) => setLengthUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {Object.entries(lengthUnits).map(([unit, { name }]) => (
                  <option key={unit} value={unit}>
                    {name}
                  </option>
                ))}
              </select>
            </>
          )}

          {calculationMode === 'current' && (
            <>
              <Input
                label="Wire Gauge (AWG)"
                type="number"
                value={wireGauge}
                onChange={(e) => setWireGauge(e.target.value)}
                placeholder="Enter AWG (-2 to 40, -2=4/0, -1=3/0, 0=1/0)"
              />
              <Input
                label="Voltage Drop (Volts)"
                type="number"
                value={voltageDrop}
                onChange={(e) => setVoltageDrop(e.target.value)}
                placeholder="5V recommended"
              />
              <Input
                label="Length"
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="Enter length"
              />
              <select
                value={lengthUnit}
                onChange={(e) => setLengthUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {Object.entries(lengthUnits).map(([unit, { name }]) => (
                  <option key={unit} value={unit}>
                    {name}
                  </option>
                ))}
              </select>
            </>
          )}

          {calculationMode === 'voltageDrop' && (
            <>
              <Input
                label="Wire Gauge (AWG)"
                type="number"
                value={wireGauge}
                onChange={(e) => setWireGauge(e.target.value)}
                placeholder="Enter AWG (-2 to 40)"
              />
              <Input
                label="Current (Amperes)"
                type="number"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                placeholder="Enter current"
              />
              <Input
                label="Length"
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="Enter length"
              />
              <select
                value={lengthUnit}
                onChange={(e) => setLengthUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {Object.entries(lengthUnits).map(([unit, { name }]) => (
                  <option key={unit} value={unit}>
                    {name}
                  </option>
                ))}
              </select>
            </>
          )}

          <Button onClick={calculate} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg">
            Calculate
          </Button>
        </div>
      </Card>

      {result && (
        <Card className="bg-gradient-to-br from-purple-100 to-purple-50 border-l-4 border-purple-500">
          <h3 className="text-lg font-bold text-gray-800 mb-3">{result.label}</h3>
          <p className="text-4xl font-bold text-purple-600 mb-4">
            {calculationMode === 'wireSize' ? getAWGLabel(result.value) : formatValue(result.value)} {result.unit}
          </p>
          <div className="bg-white rounded p-3 border border-purple-300">
            <p className="text-sm text-gray-700 whitespace-pre-wrap font-mono">{calculation}</p>
          </div>
        </Card>
      )}

      <Card className="bg-purple-50 border border-purple-200">
        <h3 className="text-lg font-bold text-gray-800 mb-3">220V System Reference</h3>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>• <strong>Standard Voltage:</strong> 220V AC (or 230V in some regions)</li>
          <li>• <strong>Recommended Voltage Drop:</strong> 3-5% for branch circuits, 2-3% for main feeders</li>
          <li>• <strong>Single-Phase:</strong> Common in residential applications (2-wire + ground)</li>
          <li>• <strong>Three-Phase:</strong> Common in industrial/commercial applications (3-wire + ground)</li>
          <li>• <strong>Copper vs Aluminum:</strong> Copper has lower resistance (better) but higher cost</li>
          <li>• <strong>Formula (Single-Phase):</strong> A = (ρ × L × 2) / (V_drop / I)</li>
          <li>• <strong>Formula (Three-Phase):</strong> A = (ρ × L × 3) / (V_drop / I)</li>
        </ul>
      </Card>
    </div>
  );
}
