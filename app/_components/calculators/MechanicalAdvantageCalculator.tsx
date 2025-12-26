'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'mechanicalAdvantage' | 'outputForce' | 'inputForce' | 'inputDistance' | 'outputDistance';

interface MechanicalAdvantageCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Unit conversion factors
const forceUnits = {
  'N': { name: 'N (Newtons)', factor: 1 },
  'kN': { name: 'kN (Kilonewtons)', factor: 1000 },
  'lbf': { name: 'lbf (Pounds-force)', factor: 4.44822 },
  'kgf': { name: 'kgf (Kilogram-force)', factor: 9.80665 }
};

const distanceUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 },
  'km': { name: 'km (Kilometers)', factor: 1000 }
};

export default function MechanicalAdvantageCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: MechanicalAdvantageCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('mechanicalAdvantage');
  const [mechanicalAdvantage, setMechanicalAdvantage] = useState('');
  const [inputForce, setInputForce] = useState('');
  const [outputForce, setOutputForce] = useState('');
  const [inputDistance, setInputDistance] = useState('');
  const [outputDistance, setOutputDistance] = useState('');
  const [forceUnit, setForceUnit] = useState('N');
  const [distanceUnit, setDistanceUnit] = useState('m');
  const [result, setResult] = useState<{ value: number; unit: string; label: string } | null>(null);
  const [calculation, setCalculation] = useState('');
  const [error, setError] = useState('');

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

  const convertForceToBase = (value: number, unit: string): number => {
    return value * forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertForceFromBase = (value: number, unit: string): number => {
    return value / forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertDistanceToBase = (value: number, unit: string): number => {
    return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertDistanceFromBase = (value: number, unit: string): number => {
    return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const MA = mechanicalAdvantage ? parseFloat(mechanicalAdvantage) : NaN;
    const Fin = inputForce ? parseFloat(inputForce) : NaN;
    const Fout = outputForce ? parseFloat(outputForce) : NaN;
    const Din = inputDistance ? parseFloat(inputDistance) : NaN;
    const Dout = outputDistance ? parseFloat(outputDistance) : NaN;

    if (calculationMode === 'mechanicalAdvantage') {
      // Calculate MA from forces: MA = F_out / F_in
      // Or from distances: MA = D_in / D_out
      let calculatedMA: number;
      let calculationText: string;

      if (!isNaN(Fin) && !isNaN(Fout)) {
        if (Fin === 0) {
          setError('Input force cannot be zero');
          return;
        }
        const FinBase = convertForceToBase(Fin, forceUnit);
        const FoutBase = convertForceToBase(Fout, forceUnit);
        calculatedMA = FoutBase / FinBase;
        calculationText = `Mechanical Advantage (MA) = Output Force (F_out) / Input Force (F_in)\nMA = F_out / F_in\nF_in = ${formatValue(Fin)} ${forceUnit} = ${formatValue(FinBase)} N\nF_out = ${formatValue(Fout)} ${forceUnit} = ${formatValue(FoutBase)} N\nMA = ${formatValue(FoutBase)} N / ${formatValue(FinBase)} N = ${formatValue(calculatedMA)}`;
      } else if (!isNaN(Din) && !isNaN(Dout)) {
        if (Dout === 0) {
          setError('Output distance cannot be zero');
          return;
        }
        const DinBase = convertDistanceToBase(Din, distanceUnit);
        const DoutBase = convertDistanceToBase(Dout, distanceUnit);
        calculatedMA = DinBase / DoutBase;
        calculationText = `Mechanical Advantage (MA) = Input Distance (D_in) / Output Distance (D_out)\nMA = D_in / D_out\nD_in = ${formatValue(Din)} ${distanceUnit} = ${formatValue(DinBase)} m\nD_out = ${formatValue(Dout)} ${distanceUnit} = ${formatValue(DoutBase)} m\nMA = ${formatValue(DinBase)} m / ${formatValue(DoutBase)} m = ${formatValue(calculatedMA)}`;
      } else {
        setError('Please enter either both forces or both distances');
        return;
      }

      if (calculatedMA < 0) {
        setError('Mechanical advantage cannot be negative');
        return;
      }

      setResult({ value: calculatedMA, unit: '', label: 'Mechanical Advantage' });
      setCalculation(calculationText);
    } else if (calculationMode === 'outputForce') {
      // Calculate output force: F_out = MA × F_in
      if (!mechanicalAdvantage || !inputForce) {
        setError('Please enter both mechanical advantage and input force');
        return;
      }

      if (isNaN(MA) || MA <= 0) {
        setError('Mechanical advantage must be a valid positive number');
        return;
      }
      if (isNaN(Fin) || Fin < 0) {
        setError('Input force must be a valid non-negative number');
        return;
      }

      const FinBase = convertForceToBase(Fin, forceUnit);
      const FoutBase = MA * FinBase;
      const FoutResult = convertForceFromBase(FoutBase, forceUnit);

      setResult({ value: FoutResult, unit: forceUnit, label: 'Output Force' });
      setCalculation(`Output Force (F_out) = Mechanical Advantage (MA) × Input Force (F_in)\nF_out = MA × F_in\nMA = ${formatValue(MA)}\nF_in = ${formatValue(Fin)} ${forceUnit} = ${formatValue(FinBase)} N\nF_out = ${formatValue(MA)} × ${formatValue(FinBase)} N = ${formatValue(FoutBase)} N = ${formatValue(FoutResult)} ${forceUnit}`);
    } else if (calculationMode === 'inputForce') {
      // Calculate input force: F_in = F_out / MA
      if (!outputForce || !mechanicalAdvantage) {
        setError('Please enter both output force and mechanical advantage');
        return;
      }

      if (isNaN(Fout) || Fout < 0) {
        setError('Output force must be a valid non-negative number');
        return;
      }
      if (isNaN(MA) || MA <= 0) {
        setError('Mechanical advantage must be a valid positive number');
        return;
      }

      const FoutBase = convertForceToBase(Fout, forceUnit);
      const FinBase = FoutBase / MA;
      const FinResult = convertForceFromBase(FinBase, forceUnit);

      setResult({ value: FinResult, unit: forceUnit, label: 'Input Force' });
      setCalculation(`Input Force (F_in) = Output Force (F_out) / Mechanical Advantage (MA)\nF_in = F_out / MA\nF_out = ${formatValue(Fout)} ${forceUnit} = ${formatValue(FoutBase)} N\nMA = ${formatValue(MA)}\nF_in = ${formatValue(FoutBase)} N / ${formatValue(MA)} = ${formatValue(FinBase)} N = ${formatValue(FinResult)} ${forceUnit}`);
    } else if (calculationMode === 'inputDistance') {
      // Calculate input distance: D_in = MA × D_out
      if (!mechanicalAdvantage || !outputDistance) {
        setError('Please enter both mechanical advantage and output distance');
        return;
      }

      if (isNaN(MA) || MA <= 0) {
        setError('Mechanical advantage must be a valid positive number');
        return;
      }
      if (isNaN(Dout) || Dout < 0) {
        setError('Output distance must be a valid non-negative number');
        return;
      }

      const DoutBase = convertDistanceToBase(Dout, distanceUnit);
      const DinBase = MA * DoutBase;
      const DinResult = convertDistanceFromBase(DinBase, distanceUnit);

      setResult({ value: DinResult, unit: distanceUnit, label: 'Input Distance' });
      setCalculation(`Input Distance (D_in) = Mechanical Advantage (MA) × Output Distance (D_out)\nD_in = MA × D_out\nMA = ${formatValue(MA)}\nD_out = ${formatValue(Dout)} ${distanceUnit} = ${formatValue(DoutBase)} m\nD_in = ${formatValue(MA)} × ${formatValue(DoutBase)} m = ${formatValue(DinBase)} m = ${formatValue(DinResult)} ${distanceUnit}`);
    } else if (calculationMode === 'outputDistance') {
      // Calculate output distance: D_out = D_in / MA
      if (!inputDistance || !mechanicalAdvantage) {
        setError('Please enter both input distance and mechanical advantage');
        return;
      }

      if (isNaN(Din) || Din < 0) {
        setError('Input distance must be a valid non-negative number');
        return;
      }
      if (isNaN(MA) || MA <= 0) {
        setError('Mechanical advantage must be a valid positive number');
        return;
      }

      const DinBase = convertDistanceToBase(Din, distanceUnit);
      const DoutBase = DinBase / MA;
      const DoutResult = convertDistanceFromBase(DoutBase, distanceUnit);

      setResult({ value: DoutResult, unit: distanceUnit, label: 'Output Distance' });
      setCalculation(`Output Distance (D_out) = Input Distance (D_in) / Mechanical Advantage (MA)\nD_out = D_in / MA\nD_in = ${formatValue(Din)} ${distanceUnit} = ${formatValue(DinBase)} m\nMA = ${formatValue(MA)}\nD_out = ${formatValue(DinBase)} m / ${formatValue(MA)} = ${formatValue(DoutBase)} m = ${formatValue(DoutResult)} ${distanceUnit}`);
    }
  };

  const clearAll = () => {
    setMechanicalAdvantage('');
    setInputForce('');
    setOutputForce('');
    setInputDistance('');
    setOutputDistance('');
    setForceUnit('N');
    setDistanceUnit('m');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Mechanical Advantage Calculator</h2>
          <p className="text-gray-600">Calculate mechanical advantage, forces, or distances for simple machines</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculate
          </label>
          <select
            value={calculationMode}
            onChange={(e) => {
              setCalculationMode(e.target.value as CalculationMode);
              clearAll();
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="mechanicalAdvantage">Mechanical Advantage (MA)</option>
            <option value="outputForce">Output Force (F_out)</option>
            <option value="inputForce">Input Force (F_in)</option>
            <option value="inputDistance">Input Distance (D_in)</option>
            <option value="outputDistance">Output Distance (D_out)</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Mechanical Advantage Formulas:</p>
          <p className="font-mono text-xs font-bold text-gray-800 mb-1">
            MA = F_out / F_in = D_in / D_out
          </p>
          <p className="text-xs text-gray-600">Where: MA = Mechanical Advantage, F = Force, D = Distance</p>
        </div>

        {/* Mechanical Advantage Input */}
        {(calculationMode === 'outputForce' || calculationMode === 'inputForce' || calculationMode === 'inputDistance' || calculationMode === 'outputDistance') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Mechanical Advantage (MA)
            </label>
            <Input
              type="text"
              placeholder="Enter mechanical advantage"
              value={mechanicalAdvantage}
              onChange={(e) => setMechanicalAdvantage(e.target.value)}
              className="w-full"
              autoFocus
            />
          </div>
        )}

        {/* Input Force */}
        {(calculationMode === 'mechanicalAdvantage' || calculationMode === 'outputForce') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Input Force (F_in)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter input force"
                  value={inputForce}
                  onChange={(e) => setInputForce(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
                <select
                  value={forceUnit}
                  onChange={(e) => setForceUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(forceUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Output Force */}
        {(calculationMode === 'mechanicalAdvantage' || calculationMode === 'inputForce') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Output Force (F_out)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter output force"
                  value={outputForce}
                  onChange={(e) => setOutputForce(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
                <select
                  value={forceUnit}
                  onChange={(e) => setForceUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(forceUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Input Distance */}
        {(calculationMode === 'mechanicalAdvantage' || calculationMode === 'outputDistance') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Input Distance (D_in)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter input distance"
                  value={inputDistance}
                  onChange={(e) => setInputDistance(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
                <select
                  value={distanceUnit}
                  onChange={(e) => setDistanceUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(distanceUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Output Distance */}
        {(calculationMode === 'mechanicalAdvantage' || calculationMode === 'inputDistance') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Output Distance (D_out)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter output distance"
                  value={outputDistance}
                  onChange={(e) => setOutputDistance(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
                <select
                  value={distanceUnit}
                  onChange={(e) => setDistanceUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(distanceUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Result Unit Selector (for force results) */}
        {(calculationMode === 'outputForce' || calculationMode === 'inputForce') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Result Unit
            </label>
            <select
              value={forceUnit}
              onChange={(e) => setForceUnit(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
            >
              {Object.entries(forceUnits).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Result Unit Selector (for distance results) */}
        {(calculationMode === 'inputDistance' || calculationMode === 'outputDistance') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Result Unit
            </label>
            <select
              value={distanceUnit}
              onChange={(e) => setDistanceUnit(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
            >
              {Object.entries(distanceUnits).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            onClick={calculate}
            className="flex-1"
            style={{ backgroundColor: primaryColor }}
          >
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}10`, borderColor: `${primaryColor}30`, borderWidth: '1px', borderStyle: 'solid' }}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>Result</h3>
            <p className="text-2xl font-bold" style={{ color: primaryColor }}>
              {formatValue(result.value)} {result.unit}
            </p>
            <p className="text-sm mt-1" style={{ color: `${primaryColor}CC` }}>
              {result.label}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <div className="text-sm mt-3 font-mono whitespace-pre-line" style={{ color: `${primaryColor}CC` }}>
                {calculation}
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-mono">{error}</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {calculationMode === 'mechanicalAdvantage' && (
              <>
                <li>• Enter either both forces (Input Force and Output Force) OR both distances (Input Distance and Output Distance)</li>
                <li>• Calculator will determine the mechanical advantage</li>
                <li>• Formulas: MA = F_out / F_in OR MA = D_in / D_out</li>
              </>
            )}
            {calculationMode === 'outputForce' && (
              <>
                <li>• Enter mechanical advantage and input force</li>
                <li>• Calculator will determine the output force</li>
                <li>• Formula: F_out = MA × F_in</li>
              </>
            )}
            {calculationMode === 'inputForce' && (
              <>
                <li>• Enter mechanical advantage and output force</li>
                <li>• Calculator will determine the input force</li>
                <li>• Formula: F_in = F_out / MA</li>
              </>
            )}
            {calculationMode === 'inputDistance' && (
              <>
                <li>• Enter mechanical advantage and output distance</li>
                <li>• Calculator will determine the input distance</li>
                <li>• Formula: D_in = MA × D_out</li>
              </>
            )}
            {calculationMode === 'outputDistance' && (
              <>
                <li>• Enter mechanical advantage and input distance</li>
                <li>• Calculator will determine the output distance</li>
                <li>• Formula: D_out = D_in / MA</li>
              </>
            )}
            <li>• Mechanical advantage is a dimensionless number (no units)</li>
            <li>• MA &gt; 1 means the machine multiplies force (at the cost of distance)</li>
            <li>• MA &lt; 1 means the machine multiplies distance (at the cost of force)</li>
            <li>• MA = 1 means no mechanical advantage (input equals output)</li>
            <li>• The calculator automatically handles unit conversions</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

