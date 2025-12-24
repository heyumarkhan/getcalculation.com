'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: m/s, m, s, m/s²)
const velocityUnits = {
  'm/s': { name: 'm/s (Meters/second)', factor: 1 },
  'km/h': { name: 'km/h (Kilometers/hour)', factor: 0.277778 },
  'mph': { name: 'mph (Miles/hour)', factor: 0.44704 },
  'ft/s': { name: 'ft/s (Feet/second)', factor: 0.3048 }
};

const distanceUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 },
  'mi': { name: 'mi (Miles)', factor: 1609.34 }
};

const timeUnits = {
  's': { name: 's (Seconds)', factor: 1 },
  'min': { name: 'min (Minutes)', factor: 60 },
  'ms': { name: 'ms (Milliseconds)', factor: 0.001 }
};

const accelerationUnits = {
  'm/s²': { name: 'm/s² (Meters/second²)', factor: 1 },
  'ft/s²': { name: 'ft/s² (Feet/second²)', factor: 0.3048 },
  'g': { name: 'g (Standard Gravity)', factor: 9.80665 }
};

const GRAVITY_DEFAULT = 9.80665; // m/s²

export default function ProjectileMotionCalculator() {
  const [initialVelocity, setInitialVelocity] = useState('');
  const [launchAngle, setLaunchAngle] = useState('');
  const [gravity, setGravity] = useState('9.80665');
  const [initialVelocityUnit, setInitialVelocityUnit] = useState('m/s');
  const [distanceUnit, setDistanceUnit] = useState('m');
  const [timeUnit, setTimeUnit] = useState('s');
  const [gravityUnit, setGravityUnit] = useState('m/s²');
  const [angleUnit, setAngleUnit] = useState('deg');
  const [result, setResult] = useState<{
    range: number;
    maxHeight: number;
    timeOfFlight: number;
    horizontalVelocity: number;
    verticalVelocityInitial: number;
  } | null>(null);
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

  const convertToBase = (value: number, unit: string, type: 'velocity' | 'distance' | 'time' | 'acceleration') => {
    if (type === 'velocity') return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
    if (type === 'distance') return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
    if (type === 'time') return value * timeUnits[unit as keyof typeof timeUnits].factor;
    if (type === 'acceleration') return value * accelerationUnits[unit as keyof typeof accelerationUnits].factor;
    return value;
  };

  const convertFromBase = (value: number, unit: string, type: 'velocity' | 'distance' | 'time' | 'acceleration') => {
    if (type === 'velocity') return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
    if (type === 'distance') return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
    if (type === 'time') return value / timeUnits[unit as keyof typeof timeUnits].factor;
    if (type === 'acceleration') return value / accelerationUnits[unit as keyof typeof accelerationUnits].factor;
    return value;
  };

  const degToRad = (deg: number) => deg * (Math.PI / 180);
  const radToDeg = (rad: number) => rad * (180 / Math.PI);

  const calculate = () => {
    const v0 = initialVelocity ? parseFloat(initialVelocity) : NaN;
    const θ = launchAngle ? parseFloat(launchAngle) : NaN;
    const g = gravity ? parseFloat(gravity) : GRAVITY_DEFAULT;

    if (!initialVelocity || !launchAngle) {
      setResult(null);
      setCalculation('Error: Please enter initial velocity and launch angle');
      return;
    }

    if (isNaN(v0) || v0 <= 0) {
      setResult(null);
      setCalculation('Error: Initial velocity must be a positive number');
      return;
    }

    if (isNaN(θ)) {
      setResult(null);
      setCalculation('Error: Please enter a valid launch angle');
      return;
    }

    if (isNaN(g) || g <= 0) {
      setResult(null);
      setCalculation('Error: Gravity must be a positive number');
      return;
    }

    // Convert to base units
    const v0Base = convertToBase(v0, initialVelocityUnit, 'velocity');
    const gBase = convertToBase(g, gravityUnit, 'acceleration');
    const θRad = angleUnit === 'deg' ? degToRad(θ) : θ;

    // Validate angle range
    if (θRad < 0 || θRad > Math.PI) {
      setResult(null);
      setCalculation('Error: Launch angle must be between 0° and 180° (0 and π radians)');
      return;
    }

    // Calculate projectile motion parameters
    // Range: R = (v₀²sin(2θ))/g
    const rangeBase = (v0Base * v0Base * Math.sin(2 * θRad)) / gBase;
    const range = convertFromBase(rangeBase, distanceUnit, 'distance');

    // Maximum height: h = (v₀²sin²(θ))/(2g)
    const maxHeightBase = (v0Base * v0Base * Math.sin(θRad) * Math.sin(θRad)) / (2 * gBase);
    const maxHeight = convertFromBase(maxHeightBase, distanceUnit, 'distance');

    // Time of flight: t = (2v₀sin(θ))/g
    const timeOfFlightBase = (2 * v0Base * Math.sin(θRad)) / gBase;
    const timeOfFlight = convertFromBase(timeOfFlightBase, timeUnit, 'time');

    // Horizontal velocity (constant): vx = v₀cos(θ)
    const horizontalVelocityBase = v0Base * Math.cos(θRad);
    const horizontalVelocity = convertFromBase(horizontalVelocityBase, initialVelocityUnit, 'velocity');

    // Initial vertical velocity: vy₀ = v₀sin(θ)
    const verticalVelocityInitialBase = v0Base * Math.sin(θRad);
    const verticalVelocityInitial = convertFromBase(verticalVelocityInitialBase, initialVelocityUnit, 'velocity');

    setResult({
      range,
      maxHeight,
      timeOfFlight,
      horizontalVelocity,
      verticalVelocityInitial
    });

    const θDisplay = formatValue(θ);
    const angleUnitDisplay = angleUnit === 'deg' ? '°' : ' rad';
    const sin2θ = Math.sin(2 * θRad);
    const sinθ = Math.sin(θRad);
    const cosθ = Math.cos(θRad);

    let calcText = `Given: v₀ = ${formatValue(v0)} ${initialVelocityUnit}, θ = ${θDisplay}${angleUnitDisplay}, g = ${formatValue(g)} ${gravityUnit}\n\n`;
    calcText += `Range: R = (v₀²sin(2θ))/g = (${formatValue(v0)}² × sin(2 × ${θDisplay}${angleUnitDisplay}))/${formatValue(g)} = ${formatValue(range)} ${distanceUnit}\n`;
    calcText += `Maximum Height: h = (v₀²sin²(θ))/(2g) = (${formatValue(v0)}² × sin²(${θDisplay}${angleUnitDisplay}))/(2 × ${formatValue(g)}) = ${formatValue(maxHeight)} ${distanceUnit}\n`;
    calcText += `Time of Flight: t = (2v₀sin(θ))/g = (2 × ${formatValue(v0)} × sin(${θDisplay}${angleUnitDisplay}))/${formatValue(g)} = ${formatValue(timeOfFlight)} ${timeUnit}\n`;
    calcText += `Horizontal Velocity: vx = v₀cos(θ) = ${formatValue(v0)} × cos(${θDisplay}${angleUnitDisplay}) = ${formatValue(horizontalVelocity)} ${initialVelocityUnit}\n`;
    calcText += `Initial Vertical Velocity: vy₀ = v₀sin(θ) = ${formatValue(v0)} × sin(${θDisplay}${angleUnitDisplay}) = ${formatValue(verticalVelocityInitial)} ${initialVelocityUnit}`;

    setCalculation(calcText);
  };

  const clearAll = () => {
    setInitialVelocity('');
    setLaunchAngle('');
    setGravity('9.80665');
    setInitialVelocityUnit('m/s');
    setDistanceUnit('m');
    setTimeUnit('s');
    setGravityUnit('m/s²');
    setAngleUnit('deg');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Projectile Motion Calculator</h2>
        <p className="text-gray-600">Calculate range, maximum height, time of flight, and velocity components for projectile motion</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Key Formulas:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            R = (v₀²sin(2θ))/g | h = (v₀²sin²(θ))/(2g) | t = (2v₀sin(θ))/g
          </p>
        </div>

        {/* Initial Velocity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Initial Velocity (v₀)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter initial velocity"
                value={initialVelocity}
                onChange={(e) => setInitialVelocity(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={initialVelocityUnit}
                onChange={(e) => setInitialVelocityUnit(e.target.value)}
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

        {/* Launch Angle Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Launch Angle (θ)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter launch angle"
                value={launchAngle}
                onChange={(e) => setLaunchAngle(e.target.value)}
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

        {/* Gravity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Gravity (g)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter gravity (default: 9.80665 m/s²)"
                value={gravity}
                onChange={(e) => setGravity(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={gravityUnit}
                onChange={(e) => setGravityUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(accelerationUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Result Units */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Distance Unit
            </label>
            <select
              value={distanceUnit}
              onChange={(e) => setDistanceUnit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
            >
              {Object.entries(distanceUnits).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Time Unit
            </label>
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
            <h3 className="text-lg font-semibold text-[#820ECC] mb-3">Results</h3>
            <div className="space-y-2">
              <p className="text-lg font-bold text-[#820ECC]">
                Range: {formatValue(result.range)} {distanceUnit}
              </p>
              <p className="text-lg font-bold text-[#820ECC]">
                Maximum Height: {formatValue(result.maxHeight)} {distanceUnit}
              </p>
              <p className="text-lg font-bold text-[#820ECC]">
                Time of Flight: {formatValue(result.timeOfFlight)} {timeUnit}
              </p>
              <p className="text-lg font-bold text-[#820ECC]">
                Horizontal Velocity: {formatValue(result.horizontalVelocity)} {initialVelocityUnit}
              </p>
              <p className="text-lg font-bold text-[#820ECC]">
                Initial Vertical Velocity: {formatValue(result.verticalVelocityInitial)} {initialVelocityUnit}
              </p>
            </div>
            {calculation && !calculation.startsWith('Error:') && (
              <p className="text-sm text-[#820ECC]/80 mt-4 font-mono break-words whitespace-pre-line">
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
            <li>• Enter initial velocity (v₀) and launch angle (θ)</li>
            <li>• Optionally adjust gravity (default: 9.80665 m/s² for Earth)</li>
            <li>• Formulas: Range R = (v₀²sin(2θ))/g, Max Height h = (v₀²sin²(θ))/(2g), Time t = (2v₀sin(θ))/g</li>
            <li>• Launch angle must be between 0° and 180° (0 and π radians)</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• All input values should be valid positive numbers</li>
            <li>• Maximum range occurs at 45° launch angle</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

