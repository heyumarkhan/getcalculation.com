'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// AWG to cross-sectional area (mm²) conversion
// AWG values from 0000 (4/0) to 40
const AWG_TO_AREA: { [key: number]: number } = {
  0: 53.5, 1: 42.4, 2: 33.6, 3: 26.7, 4: 21.2, 5: 16.8, 6: 13.3, 7: 10.5, 8: 8.37, 9: 6.63,
  10: 5.26, 11: 4.17, 12: 3.31, 13: 2.62, 14: 2.08, 15: 1.65, 16: 1.31, 17: 1.04, 18: 0.823, 19: 0.653,
  20: 0.518, 21: 0.410, 22: 0.326, 23: 0.258, 24: 0.205, 25: 0.162, 26: 0.129, 27: 0.102, 28: 0.0810, 29: 0.0642,
  30: 0.0509, 31: 0.0404, 32: 0.0320, 33: 0.0254, 34: 0.0201, 35: 0.0160, 36: 0.0127, 37: 0.0100, 38: 0.00797, 39: 0.00632, 40: 0.00501
};

// AWG 0000 (4/0) to 000 (3/0) special cases
AWG_TO_AREA[-1] = 67.4; // 3/0
AWG_TO_AREA[-2] = 85.0; // 4/0

// Reverse lookup: area to AWG
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
  copper: 1.68e-8, // Ω·m
  aluminum: 2.65e-8 // Ω·m
};

type CalculationMode = 'wireSize' | 'current' | 'voltageDrop';

const lengthUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'mi': { name: 'mi (Miles)', factor: 1609.34 }
};

export default function DCWireSizeCalculator() {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('wireSize');
  const [current, setCurrent] = useState('');
  const [voltage, setVoltage] = useState('');
  const [voltageDrop, setVoltageDrop] = useState('');
  const [length, setLength] = useState('');
  const [wireGauge, setWireGauge] = useState('');
  const [material, setMaterial] = useState<'copper' | 'aluminum'>('copper');
  const [lengthUnit, setLengthUnit] = useState('m');
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
    const v = voltage ? parseFloat(voltage) : NaN;
    const vDrop = voltageDrop ? parseFloat(voltageDrop) : NaN;
    const l = length ? parseFloat(length) : NaN;
    const awg = wireGauge ? parseFloat(wireGauge) : NaN;

    if (calculationMode === 'wireSize') {
      // Calculate wire size from current, voltage drop, and length
      if (!current || !voltageDrop || !length || !voltage) {
        setResult(null);
        setCalculation('Error: Please enter current, voltage, voltage drop, and length');
        return;
      }

      if (isNaN(i) || i <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for current');
        return;
      }
      if (isNaN(v) || v <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for voltage');
        return;
      }
      if (isNaN(vDrop) || vDrop <= 0 || vDrop >= v) {
        setResult(null);
        setCalculation('Error: Voltage drop must be positive and less than supply voltage');
        return;
      }
      if (isNaN(l) || l <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for length');
        return;
      }

      // Calculate required resistance: R = V_drop / I
      const requiredResistance = vDrop / i;
      
      // Calculate required cross-sectional area: A = ρ × L / R
      const lBase = convertLengthToBase(l, lengthUnit);
      const resistivity = RESISTIVITY[material];
      const requiredArea = (resistivity * lBase * 2) / requiredResistance; // ×2 for round trip
      
      // Convert area from m² to mm²
      const requiredAreaMM2 = requiredArea * 1e6;
      
      // Find closest AWG
      const calculatedAWG = findAWGFromArea(requiredAreaMM2);
      const actualArea = AWG_TO_AREA[calculatedAWG] || AWG_TO_AREA[Math.max(0, Math.min(40, Math.round(calculatedAWG)))];

      setResult({ value: calculatedAWG, unit: 'AWG', label: `Wire Gauge: ${getAWGLabel(calculatedAWG)}` });
      setCalculation(`Required resistance: R = V_drop / I = ${formatValue(vDrop)} V / ${formatValue(i)} A = ${formatValue(requiredResistance)} Ω\nRequired area: A = (ρ × L × 2) / R = (${resistivity.toExponential(2)} Ω·m × ${formatValue(lBase)} m × 2) / ${formatValue(requiredResistance)} Ω = ${formatValue(requiredAreaMM2)} mm²\nRecommended wire size: ${getAWGLabel(calculatedAWG)} (${formatValue(actualArea)} mm²)`);
    } else if (calculationMode === 'current') {
      // Calculate maximum current for given wire size
      if (!wireGauge || !voltageDrop || !length || !voltage) {
        setResult(null);
        setCalculation('Error: Please enter wire gauge, voltage, voltage drop, and length');
        return;
      }

      if (isNaN(awg) || awg < -2 || awg > 40) {
        setResult(null);
        setCalculation('Error: Please enter a valid AWG value (-2 to 40, where -2 = 4/0, -1 = 3/0)');
        return;
      }
      if (isNaN(v) || v <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for voltage');
        return;
      }
      if (isNaN(vDrop) || vDrop <= 0 || vDrop >= v) {
        setResult(null);
        setCalculation('Error: Voltage drop must be positive and less than supply voltage');
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
      
      // Calculate resistance: R = ρ × L / A
      const resistance = (resistivity * lBase * 2) / areaM2; // ×2 for round trip
      
      // Calculate maximum current: I = V_drop / R
      const maxCurrent = vDrop / resistance;
      
      setResult({ value: maxCurrent, unit: 'A', label: 'Maximum Current' });
      setCalculation(`Wire area: ${formatValue(areaMM2)} mm²\nResistance: R = (ρ × L × 2) / A = (${resistivity.toExponential(2)} Ω·m × ${formatValue(lBase)} m × 2) / ${formatValue(areaM2)} m² = ${formatValue(resistance)} Ω\nMaximum current: I = V_drop / R = ${formatValue(vDrop)} V / ${formatValue(resistance)} Ω = ${formatValue(maxCurrent)} A`);
    } else if (calculationMode === 'voltageDrop') {
      // Calculate voltage drop for given wire size and current
      if (!wireGauge || !current || !length || !voltage) {
        setResult(null);
        setCalculation('Error: Please enter wire gauge, current, voltage, and length');
        return;
      }

      if (isNaN(awg) || awg < -2 || awg > 40) {
        setResult(null);
        setCalculation('Error: Please enter a valid AWG value (-2 to 40, where -2 = 4/0, -1 = 3/0)');
        return;
      }
      if (isNaN(i) || i <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for current');
        return;
      }
      if (isNaN(v) || v <= 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for voltage');
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
      
      // Calculate resistance: R = ρ × L / A
      const resistance = (resistivity * lBase * 2) / areaM2; // ×2 for round trip
      
      // Calculate voltage drop: V_drop = I × R
      const calculatedVoltageDrop = i * resistance;
      const voltageDropPercent = (calculatedVoltageDrop / v) * 100;
      
      setResult({ value: calculatedVoltageDrop, unit: 'V', label: `Voltage Drop (${formatValue(voltageDropPercent)}%)` });
      setCalculation(`Wire area: ${formatValue(areaMM2)} mm²\nResistance: R = (ρ × L × 2) / A = (${resistivity.toExponential(2)} Ω·m × ${formatValue(lBase)} m × 2) / ${formatValue(areaM2)} m² = ${formatValue(resistance)} Ω\nVoltage drop: V_drop = I × R = ${formatValue(i)} A × ${formatValue(resistance)} Ω = ${formatValue(calculatedVoltageDrop)} V (${formatValue(voltageDropPercent)}% of ${formatValue(v)} V)`);
    }
  };

  const clearAll = () => {
    setCurrent('');
    setVoltage('');
    setVoltageDrop('');
    setLength('');
    setWireGauge('');
    setLengthUnit('m');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">DC Wire Size Calculator</h2>
        <p className="text-gray-600">Calculate wire gauge (AWG), current capacity, or voltage drop for DC electrical circuits</p>
      </div>

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Mode
          </label>
          <select
            value={calculationMode}
            onChange={(e) => {
              setCalculationMode(e.target.value as CalculationMode);
              clearAll();
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="wireSize">Calculate Wire Size (AWG)</option>
            <option value="current">Calculate Maximum Current</option>
            <option value="voltageDrop">Calculate Voltage Drop</option>
          </select>
        </div>

        {/* Material Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Wire Material
          </label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value as 'copper' | 'aluminum')}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="copper">Copper (ρ = 1.68×10⁻⁸ Ω·m)</option>
            <option value="aluminum">Aluminum (ρ = 2.65×10⁻⁸ Ω·m)</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            {calculationMode === 'wireSize' && 'R = (ρ × L × 2) / A, V_drop = I × R'}
            {calculationMode === 'current' && 'I = V_drop / R, R = (ρ × L × 2) / A'}
            {calculationMode === 'voltageDrop' && 'V_drop = I × R, R = (ρ × L × 2) / A'}
          </p>
        </div>

        {/* Voltage Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            DC Supply Voltage (V)
          </label>
          <Input
            type="text"
            placeholder="Enter DC supply voltage"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
            className="w-full"
            autoFocus
          />
        </div>

        {/* Current Input */}
        {(calculationMode === 'wireSize' || calculationMode === 'voltageDrop') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Current (I)
            </label>
            <Input
              type="text"
              placeholder="Enter current in amperes"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="w-full"
            />
          </div>
        )}

        {/* Voltage Drop Input */}
        {(calculationMode === 'wireSize' || calculationMode === 'current') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Maximum Voltage Drop (V)
            </label>
            <Input
              type="text"
              placeholder="Enter maximum allowed voltage drop"
              value={voltageDrop}
              onChange={(e) => setVoltageDrop(e.target.value)}
              className="w-full"
            />
          </div>
        )}

        {/* Wire Gauge Input */}
        {(calculationMode === 'current' || calculationMode === 'voltageDrop') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Wire Gauge (AWG)
            </label>
            <Input
              type="text"
              placeholder="Enter AWG (-2 to 40, -2=4/0, -1=3/0, 0=1/0)"
              value={wireGauge}
              onChange={(e) => setWireGauge(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Common values: 12 AWG, 14 AWG, 16 AWG, 18 AWG, 20 AWG
            </p>
          </div>
        )}

        {/* Length Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Wire Length
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter wire length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-32">
              <select
                value={lengthUnit}
                onChange={(e) => setLengthUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(lengthUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Note: Length is for one-way distance. Calculator uses round-trip (×2) for resistance.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button onClick={calculate} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg">
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">Result</h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            <p className="text-sm text-[#820ECC]/80 mt-1">
              {result.label}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <div className="text-sm text-[#820ECC]/80 mt-3 font-mono whitespace-pre-line">
                {calculation}
              </div>
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
            {calculationMode === 'wireSize' && (
              <>
                <li>• Enter current, DC supply voltage, maximum voltage drop, and wire length</li>
                <li>• Calculator will determine the minimum required wire gauge (AWG)</li>
                <li>• Formula: R = (ρ × L × 2) / A, then V_drop = I × R</li>
              </>
            )}
            {calculationMode === 'current' && (
              <>
                <li>• Enter wire gauge (AWG), DC supply voltage, maximum voltage drop, and length</li>
                <li>• Calculator will determine the maximum safe current</li>
                <li>• Formula: I = V_drop / R, where R = (ρ × L × 2) / A</li>
              </>
            )}
            {calculationMode === 'voltageDrop' && (
              <>
                <li>• Enter wire gauge (AWG), current, DC supply voltage, and length</li>
                <li>• Calculator will determine the voltage drop</li>
                <li>• Formula: V_drop = I × R, where R = (ρ × L × 2) / A</li>
              </>
            )}
            <li>• Select wire material (copper or aluminum)</li>
            <li>• Length is one-way; calculator uses round-trip (×2) for resistance</li>
            <li>• AWG values: -2 = 4/0, -1 = 3/0, 0 = 1/0, then 1-40</li>
            <li>• Always consult electrical codes and safety standards for actual installations</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

