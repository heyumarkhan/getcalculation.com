'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: N)
const forceUnits = {
  'N': { name: 'N (Newtons)', factor: 1 },
  'kN': { name: 'kN (Kilonewtons)', factor: 1000 },
  'mN': { name: 'mN (Millinewtons)', factor: 0.001 },
  'lb': { name: 'lb (Pounds-force)', factor: 4.44822 },
  'oz': { name: 'oz (Ounce-force)', factor: 0.278014 },
  'dyn': { name: 'dyn (Dynes)', factor: 0.00001 }
};

type CalculationMode = 'components' | 'forces';

export default function NetForceCalculator() {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('components');
  const [forceX, setForceX] = useState('');
  const [forceY, setForceY] = useState('');
  const [force1, setForce1] = useState('');
  const [angle1, setAngle1] = useState('');
  const [force2, setForce2] = useState('');
  const [angle2, setAngle2] = useState('');
  const [forceUnit, setForceUnit] = useState('N');
  const [angleUnit, setAngleUnit] = useState('deg');
  const [result, setResult] = useState<{ magnitude: number; direction: number; unit: string; angleUnit: string } | null>(null);
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

  const convertToBase = (value: number, unit: string) => {
    return value * forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertFromBase = (value: number, unit: string) => {
    return value / forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const degToRad = (deg: number) => deg * (Math.PI / 180);
  const radToDeg = (rad: number) => rad * (180 / Math.PI);

  const calculate = () => {
    if (calculationMode === 'components') {
      const Fx = forceX ? parseFloat(forceX) : 0;
      const Fy = forceY ? parseFloat(forceY) : 0;

      if (forceX === '' && forceY === '') {
        setResult(null);
        setCalculation('Error: Please enter at least one force component');
        return;
      }

      if (forceX && isNaN(Fx)) {
        setResult(null);
        setCalculation('Error: Please enter a valid number for Fx');
        return;
      }
      if (forceY && isNaN(Fy)) {
        setResult(null);
        setCalculation('Error: Please enter a valid number for Fy');
        return;
      }

      // Convert to base units
      const FxBase = convertToBase(Fx, forceUnit);
      const FyBase = convertToBase(Fy, forceUnit);

      // Calculate net force magnitude: F_net = √(Fx² + Fy²)
      const FnetMagnitude = Math.sqrt(FxBase * FxBase + FyBase * FyBase);
      const FnetResult = convertFromBase(FnetMagnitude, forceUnit);

      // Calculate direction: θ = arctan(Fy/Fx)
      let direction = 0;
      if (FxBase !== 0) {
        direction = Math.atan2(FyBase, FxBase);
      } else if (FyBase > 0) {
        direction = Math.PI / 2; // 90 degrees
      } else if (FyBase < 0) {
        direction = -Math.PI / 2; // -90 degrees
      }

      const directionDeg = radToDeg(direction);
      const directionRad = direction;

      setResult({ 
        magnitude: FnetResult, 
        direction: angleUnit === 'deg' ? directionDeg : directionRad,
        unit: forceUnit,
        angleUnit: angleUnit
      });

      const FxDisplay = forceX ? formatValue(Fx) : '0';
      const FyDisplay = forceY ? formatValue(Fy) : '0';
      const directionDisplay = angleUnit === 'deg' ? formatValue(directionDeg) : formatValue(directionRad);
      const directionUnit = angleUnit === 'deg' ? '°' : ' rad';

      setCalculation(`F_net = √(Fx² + Fy²) = √((${FxDisplay})² + (${FyDisplay})²) ${forceUnit} = ${formatValue(FnetResult)} ${forceUnit}\nθ = arctan(Fy/Fx) = arctan(${FyDisplay}/${FxDisplay}) = ${directionDisplay}${directionUnit}`);
    } else {
      // Mode: Forces with angles
      const F1 = force1 ? parseFloat(force1) : NaN;
      const θ1 = angle1 ? parseFloat(angle1) : NaN;
      const F2 = force2 ? parseFloat(force2) : NaN;
      const θ2 = angle2 ? parseFloat(angle2) : NaN;

      if (!force1 || !angle1) {
        setResult(null);
        setCalculation('Error: Please enter Force 1 and its angle');
        return;
      }

      if (isNaN(F1) || F1 <= 0) {
        setResult(null);
        setCalculation('Error: Force 1 must be a positive number');
        return;
      }
      if (isNaN(θ1)) {
        setResult(null);
        setCalculation('Error: Please enter a valid angle for Force 1');
        return;
      }

      // Convert angles to radians
      const θ1Rad = angleUnit === 'deg' ? degToRad(θ1) : θ1;
      const θ2Rad = force2 && angle2 ? (angleUnit === 'deg' ? degToRad(θ2) : θ2) : 0;

      // Convert forces to base units
      const F1Base = convertToBase(F1, forceUnit);
      const F2Base = force2 ? convertToBase(F2, forceUnit) : 0;

      // Calculate components
      let FxTotal = F1Base * Math.cos(θ1Rad);
      let FyTotal = F1Base * Math.sin(θ1Rad);

      if (force2 && angle2) {
        if (isNaN(F2) || F2 <= 0) {
          setResult(null);
          setCalculation('Error: Force 2 must be a positive number');
          return;
        }
        if (isNaN(θ2)) {
          setResult(null);
          setCalculation('Error: Please enter a valid angle for Force 2');
          return;
        }
        FxTotal += F2Base * Math.cos(θ2Rad);
        FyTotal += F2Base * Math.sin(θ2Rad);
      }

      // Calculate net force magnitude
      const FnetMagnitude = Math.sqrt(FxTotal * FxTotal + FyTotal * FyTotal);
      const FnetResult = convertFromBase(FnetMagnitude, forceUnit);

      // Calculate direction
      let direction = 0;
      if (FxTotal !== 0) {
        direction = Math.atan2(FyTotal, FxTotal);
      } else if (FyTotal > 0) {
        direction = Math.PI / 2;
      } else if (FyTotal < 0) {
        direction = -Math.PI / 2;
      }

      const directionDeg = radToDeg(direction);
      const directionRad = direction;

      setResult({ 
        magnitude: FnetResult, 
        direction: angleUnit === 'deg' ? directionDeg : directionRad,
        unit: forceUnit,
        angleUnit: angleUnit
      });

      const F1Display = formatValue(F1);
      const θ1Display = formatValue(θ1);
      const F2Display = force2 ? formatValue(F2) : '0';
      const θ2Display = angle2 ? formatValue(θ2) : '0';
      const directionDisplay = angleUnit === 'deg' ? formatValue(directionDeg) : formatValue(directionRad);
      const angleUnitDisplay = angleUnit === 'deg' ? '°' : ' rad';

      let calcText = `Fx = F₁cos(θ₁)`;
      if (force2 && angle2) {
        calcText += ` + F₂cos(θ₂) = ${F1Display}cos(${θ1Display}${angleUnitDisplay}) + ${F2Display}cos(${θ2Display}${angleUnitDisplay})`;
      } else {
        calcText += ` = ${F1Display}cos(${θ1Display}${angleUnitDisplay})`;
      }
      const FxCalc = FxTotal;
      calcText += ` = ${formatValue(convertFromBase(FxCalc, forceUnit))} ${forceUnit}\n`;

      calcText += `Fy = F₁sin(θ₁)`;
      if (force2 && angle2) {
        calcText += ` + F₂sin(θ₂) = ${F1Display}sin(${θ1Display}${angleUnitDisplay}) + ${F2Display}sin(${θ2Display}${angleUnitDisplay})`;
      } else {
        calcText += ` = ${F1Display}sin(${θ1Display}${angleUnitDisplay})`;
      }
      const FyCalc = FyTotal;
      calcText += ` = ${formatValue(convertFromBase(FyCalc, forceUnit))} ${forceUnit}\n`;

      calcText += `F_net = √(Fx² + Fy²) = ${formatValue(FnetResult)} ${forceUnit}\n`;
      calcText += `θ = arctan(Fy/Fx) = ${directionDisplay}${angleUnitDisplay}`;

      setCalculation(calcText);
    }
  };

  const clearAll = () => {
    setForceX('');
    setForceY('');
    setForce1('');
    setAngle1('');
    setForce2('');
    setAngle2('');
    setForceUnit('N');
    setAngleUnit('deg');
    setResult(null);
    setCalculation('');
  };

  const handleModeChange = (mode: CalculationMode) => {
    setCalculationMode(mode);
    clearAll();
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Net Force Calculator</h2>
        <p className="text-gray-600">Calculate net force magnitude and direction from force components or multiple forces</p>
      </div>

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Mode
          </label>
          <select
            value={calculationMode}
            onChange={(e) => handleModeChange(e.target.value as CalculationMode)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="components">From Force Components (Fx, Fy)</option>
            <option value="forces">From Forces with Angles</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">
            {calculationMode === 'components' && 'F_net = √(Fx² + Fy²), θ = arctan(Fy/Fx)'}
            {calculationMode === 'forces' && 'F_net = √(Fx² + Fy²), where Fx = ΣFcos(θ), Fy = ΣFsin(θ)'}
          </p>
        </div>

        {/* Components Mode Inputs */}
        {calculationMode === 'components' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Force X Component (Fx)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter Fx (leave empty for 0)"
                    value={forceX}
                    onChange={(e) => setForceX(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-40">
                  <select
                    value={forceUnit}
                    onChange={(e) => setForceUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Force Y Component (Fy)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter Fy (leave empty for 0)"
                    value={forceY}
                    onChange={(e) => setForceY(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={forceUnit}
                    onChange={(e) => setForceUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Angle Unit
              </label>
              <select
                value={angleUnit}
                onChange={(e) => setAngleUnit(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                <option value="deg">Degrees (°)</option>
                <option value="rad">Radians (rad)</option>
              </select>
            </div>
          </>
        )}

        {/* Forces with Angles Mode Inputs */}
        {calculationMode === 'forces' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Force 1 (F₁)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter Force 1"
                    value={force1}
                    onChange={(e) => setForce1(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-40">
                  <select
                    value={forceUnit}
                    onChange={(e) => setForceUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Angle 1 (θ₁)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter angle for Force 1"
                    value={angle1}
                    onChange={(e) => setAngle1(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={angleUnit}
                    onChange={(e) => setAngleUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    <option value="deg">Degrees (°)</option>
                    <option value="rad">Radians (rad)</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Force 2 (F₂) - Optional
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter Force 2 (optional)"
                    value={force2}
                    onChange={(e) => setForce2(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={forceUnit}
                    onChange={(e) => setForceUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Angle 2 (θ₂) - Optional
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter angle for Force 2 (optional)"
                    value={angle2}
                    onChange={(e) => setAngle2(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={angleUnit}
                    onChange={(e) => setAngleUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    <option value="deg">Degrees (°)</option>
                    <option value="rad">Radians (rad)</option>
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
          <div className="mt-6 p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg">
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">Result</h3>
            <p className="text-xl font-bold text-[#820ECC] mb-2">
              Net Force Magnitude: {formatValue(result.magnitude)} {result.unit}
            </p>
            <p className="text-xl font-bold text-[#820ECC]">
              Direction: {formatValue(result.direction)} {result.angleUnit === 'deg' ? '°' : ' rad'}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <p className="text-sm text-[#820ECC]/80 mt-2 font-mono break-words whitespace-pre-line">
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
            {calculationMode === 'components' ? (
              <>
                <li>• Enter force components Fx and Fy (leave empty for 0)</li>
                <li>• Formula: F_net = √(Fx² + Fy²)</li>
                <li>• Direction: θ = arctan(Fy/Fx)</li>
                <li>• Select your preferred units for force and angle</li>
              </>
            ) : (
              <>
                <li>• Enter Force 1 and its angle (required)</li>
                <li>• Optionally enter Force 2 and its angle</li>
                <li>• Formula: Fx = ΣFcos(θ), Fy = ΣFsin(θ), F_net = √(Fx² + Fy²)</li>
                <li>• Angles are measured from the positive x-axis</li>
                <li>• Select your preferred units for force and angle</li>
              </>
            )}
            <li>• The calculator automatically converts between different units</li>
            <li>• All force values should be valid numbers</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

