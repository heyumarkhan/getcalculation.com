'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface HorizontalProjectileMotionCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

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

export default function HorizontalProjectileMotionCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: HorizontalProjectileMotionCalculatorProps) {
  const [initialVelocity, setInitialVelocity] = useState('');
  const [initialHeight, setInitialHeight] = useState('');
  const [gravity, setGravity] = useState('9.80665');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [distanceUnit, setDistanceUnit] = useState('m');
  const [timeUnit, setTimeUnit] = useState('s');
  const [gravityUnit, setGravityUnit] = useState('m/s²');
  const [result, setResult] = useState<{
    range: number;
    timeOfFlight: number;
    finalVelocity: number;
  } | null>(null);
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

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    if (!initialVelocity || !initialHeight) {
      setError('Please enter both initial velocity and initial height');
      return;
    }

    const v0 = parseFloat(initialVelocity);
    const h = parseFloat(initialHeight);
    const g = gravity ? parseFloat(gravity) : GRAVITY_DEFAULT;

    if (isNaN(v0) || v0 <= 0) {
      setError('Initial velocity must be a valid positive number');
      return;
    }

    if (isNaN(h) || h <= 0) {
      setError('Initial height must be a valid positive number');
      return;
    }

    if (isNaN(g) || g <= 0) {
      setError('Gravity must be a valid positive number');
      return;
    }

    // Convert to base units
    const v0Base = convertToBase(v0, velocityUnit, 'velocity');
    const hBase = convertToBase(h, distanceUnit, 'distance');
    const gBase = convertToBase(g, gravityUnit, 'acceleration');

    // Calculate time of flight: t = √(2h/g)
    const timeOfFlightBase = Math.sqrt((2 * hBase) / gBase);
    const timeOfFlight = convertFromBase(timeOfFlightBase, timeUnit, 'time');

    // Calculate range (horizontal distance): R = v₀x × t = v₀ × t
    // Since horizontal velocity is constant and equals initial velocity
    const rangeBase = v0Base * timeOfFlightBase;
    const range = convertFromBase(rangeBase, distanceUnit, 'distance');

    // Calculate final vertical velocity: v_y = gt
    const finalVerticalVelocity = gBase * timeOfFlightBase;
    
    // Calculate final velocity magnitude: v = √(v₀x² + v_y²) = √(v₀² + (gt)²)
    const finalVelocityBase = Math.sqrt(v0Base * v0Base + finalVerticalVelocity * finalVerticalVelocity);
    const finalVelocity = convertFromBase(finalVelocityBase, velocityUnit, 'velocity');

    setResult({
      range,
      timeOfFlight,
      finalVelocity
    });

    // Create detailed calculation steps
    const steps = [
      `Given:`,
      `  Initial horizontal velocity (v₀) = ${formatValue(v0)} ${velocityUnit} = ${formatValue(v0Base)} m/s`,
      `  Initial height (h) = ${formatValue(h)} ${distanceUnit} = ${formatValue(hBase)} m`,
      `  Gravity (g) = ${formatValue(g)} ${gravityUnit} = ${formatValue(gBase)} m/s²`,
      ``,
      `Step 1: Calculate time of flight`,
      `  t = √(2h/g)`,
      `  t = √(2 × ${formatValue(hBase)} / ${formatValue(gBase)})`,
      `  t = √(${formatValue(2 * hBase)} / ${formatValue(gBase)})`,
      `  t = √(${formatValue((2 * hBase) / gBase)})`,
      `  t = ${formatValue(timeOfFlightBase)} s = ${formatValue(timeOfFlight)} ${timeUnits[timeUnit as keyof typeof timeUnits]?.name || timeUnit}`,
      ``,
      `Step 2: Calculate range (horizontal distance)`,
      `  R = v₀ × t`,
      `  R = ${formatValue(v0Base)} × ${formatValue(timeOfFlightBase)}`,
      `  R = ${formatValue(rangeBase)} m = ${formatValue(range)} ${distanceUnits[distanceUnit as keyof typeof distanceUnits]?.name || distanceUnit}`,
      ``,
      `Step 3: Calculate final velocity`,
      `  Final vertical velocity: v_y = gt = ${formatValue(gBase)} × ${formatValue(timeOfFlightBase)} = ${formatValue(finalVerticalVelocity)} m/s`,
      `  Final velocity magnitude: v = √(v₀² + v_y²)`,
      `  v = √(${formatValue(v0Base)}² + ${formatValue(finalVerticalVelocity)}²)`,
      `  v = √(${formatValue(v0Base * v0Base)} + ${formatValue(finalVerticalVelocity * finalVerticalVelocity)})`,
      `  v = √(${formatValue(v0Base * v0Base + finalVerticalVelocity * finalVerticalVelocity)})`,
      `  v = ${formatValue(finalVelocityBase)} m/s = ${formatValue(finalVelocity)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits]?.name || velocityUnit}`
    ];

    setCalculation(steps.join('\n'));
  };

  const clearAll = () => {
    setInitialVelocity('');
    setInitialHeight('');
    setGravity('9.80665');
    setVelocityUnit('m/s');
    setDistanceUnit('m');
    setTimeUnit('s');
    setGravityUnit('m/s²');
    setResult(null);
    setCalculation('');
    setError('');
  };

  const getResultColor = () => {
    return 'bg-[#820ECC]/10 border-[#820ECC]/30';
  };

  const getResultTextColor = () => {
    return 'text-[#820ECC]';
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Horizontal Projectile Motion Calculator</h2>
          <p className="text-gray-600">Calculate range, time of flight, and final velocity for horizontally launched projectiles</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Key Formulas:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            t = √(2h/g) | R = v₀ × t | v = √(v₀² + (gt)²)
          </p>
        </div>

        {/* Initial Velocity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Initial Horizontal Velocity (v₀)
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
                value={velocityUnit}
                onChange={(e) => setVelocityUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        {/* Initial Height Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Initial Height (h)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter initial height"
                value={initialHeight}
                onChange={(e) => setInitialHeight(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
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

        {/* Gravity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Gravity (g)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter gravity (default: 9.80665)"
                value={gravity}
                onChange={(e) => setGravity(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={gravityUnit}
                onChange={(e) => setGravityUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        {/* Output Units */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Distance Unit
            </label>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Time Unit
            </label>
            <select
              value={timeUnit}
              onChange={(e) => setTimeUnit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-mono">{error}</p>
          </div>
        )}

        {result && (
          <div className={`mt-6 p-4 ${getResultColor()} border rounded-lg`}>
            <h3 className={`text-lg font-semibold ${getResultTextColor()} mb-3`}>Results</h3>
            <div className="space-y-2">
              <div>
                <p className={`text-sm ${getResultTextColor()}/80`}>Range (Horizontal Distance)</p>
                <p className={`text-xl font-bold ${getResultTextColor()}`}>
                  {formatValue(result.range)} {distanceUnits[distanceUnit as keyof typeof distanceUnits]?.name || distanceUnit}
                </p>
              </div>
              <div>
                <p className={`text-sm ${getResultTextColor()}/80`}>Time of Flight</p>
                <p className={`text-xl font-bold ${getResultTextColor()}`}>
                  {formatValue(result.timeOfFlight)} {timeUnits[timeUnit as keyof typeof timeUnits]?.name || timeUnit}
                </p>
              </div>
              <div>
                <p className={`text-sm ${getResultTextColor()}/80`}>Final Velocity</p>
                <p className={`text-xl font-bold ${getResultTextColor()}`}>
                  {formatValue(result.finalVelocity)} {velocityUnits[velocityUnit as keyof typeof velocityUnits]?.name || velocityUnit}
                </p>
              </div>
            </div>
            {calculation && (
              <div className={`text-sm ${getResultTextColor()}/80 mt-4 font-mono whitespace-pre-line border-t ${getResultTextColor()}/20 pt-3`}>
                {calculation}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">How It Works</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Enter the initial horizontal velocity (launch speed)</li>
            <li>• Enter the initial height from which the projectile is launched</li>
            <li>• Optionally adjust gravity (default: 9.80665 m/s² for Earth)</li>
            <li>• Time of flight: t = √(2h/g)</li>
            <li>• Range: R = v₀ × t (horizontal distance traveled)</li>
            <li>• Final velocity: v = √(v₀² + (gt)²)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

