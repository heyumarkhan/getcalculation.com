'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'maxHeight' | 'initialVelocity' | 'launchAngle';

interface MaximumHeightProjectileCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Gravitational acceleration (m/s²)
const g = 9.80665; // Standard gravitational acceleration

// Unit conversion factors
const velocityUnits = {
  'm/s': { name: 'm/s (Meters per second)', factor: 1 },
  'km/h': { name: 'km/h (Kilometers per hour)', factor: 1 / 3.6 },
  'mph': { name: 'mph (Miles per hour)', factor: 0.44704 },
  'ft/s': { name: 'ft/s (Feet per second)', factor: 0.3048 },
  'knots': { name: 'knots', factor: 0.514444 }
};

const heightUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 },
  'mi': { name: 'mi (Miles)', factor: 1609.34 }
};

export default function MaximumHeightProjectileCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: MaximumHeightProjectileCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('maxHeight');
  const [maxHeight, setMaxHeight] = useState('');
  const [initialVelocity, setInitialVelocity] = useState('');
  const [launchAngle, setLaunchAngle] = useState('');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [heightUnit, setHeightUnit] = useState('m');
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

  const convertVelocityToBase = (value: number, unit: string): number => {
    return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertVelocityFromBase = (value: number, unit: string): number => {
    return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertHeightToBase = (value: number, unit: string): number => {
    return value * heightUnits[unit as keyof typeof heightUnits].factor;
  };

  const convertHeightFromBase = (value: number, unit: string): number => {
    return value / heightUnits[unit as keyof typeof heightUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const h = maxHeight ? parseFloat(maxHeight) : NaN;
    const v0 = initialVelocity ? parseFloat(initialVelocity) : NaN;
    const theta = launchAngle ? parseFloat(launchAngle) : NaN;

    if (calculationMode === 'maxHeight') {
      // Calculate maximum height: h_max = (v₀² × sin²(θ)) / (2g)
      if (!initialVelocity || !launchAngle) {
        setError('Please enter both initial velocity and launch angle');
        return;
      }

      if (isNaN(v0) || v0 <= 0) {
        setError('Initial velocity must be a valid positive number');
        return;
      }
      if (isNaN(theta) || theta < 0 || theta > 90) {
        setError('Launch angle must be between 0 and 90 degrees');
        return;
      }

      const v0Base = convertVelocityToBase(v0, velocityUnit);
      const thetaRad = (theta * Math.PI) / 180;
      const sinTheta = Math.sin(thetaRad);
      const hBase = (v0Base * v0Base * sinTheta * sinTheta) / (2 * g);
      const hResult = convertHeightFromBase(hBase, heightUnit);

      setResult({ value: hResult, unit: heightUnit, label: 'Maximum Height' });
      setCalculation(`Maximum Height (h_max) = (v₀² × sin²(θ)) / (2g)\nh_max = (v₀² × sin²(θ)) / (2g)\nv₀ = ${formatValue(v0)} ${velocityUnit} = ${formatValue(v0Base)} m/s\nθ = ${formatValue(theta)}°\nsin(θ) = sin(${formatValue(theta)}°) = ${formatValue(sinTheta)}\ng = ${g} m/s²\nh_max = (${formatValue(v0Base)}² × ${formatValue(sinTheta)}²) / (2 × ${g})\nh_max = (${formatValue(v0Base * v0Base)} × ${formatValue(sinTheta * sinTheta)}) / ${2 * g}\nh_max = ${formatValue(hBase)} m = ${formatValue(hResult)} ${heightUnit}`);
    } else if (calculationMode === 'initialVelocity') {
      // Calculate initial velocity: v₀ = √[2gh_max / sin²(θ)]
      if (!maxHeight || !launchAngle) {
        setError('Please enter both maximum height and launch angle');
        return;
      }

      if (isNaN(h) || h <= 0) {
        setError('Maximum height must be a valid positive number');
        return;
      }
      if (isNaN(theta) || theta <= 0 || theta > 90) {
        setError('Launch angle must be between 0 and 90 degrees (exclusive of 0)');
        return;
      }

      const hBase = convertHeightToBase(h, heightUnit);
      const thetaRad = (theta * Math.PI) / 180;
      const sinTheta = Math.sin(thetaRad);
      if (sinTheta === 0) {
        setError('Launch angle cannot be 0 degrees for maximum height calculation');
        return;
      }
      const v0Base = Math.sqrt((2 * g * hBase) / (sinTheta * sinTheta));
      const v0Result = convertVelocityFromBase(v0Base, velocityUnit);

      setResult({ value: v0Result, unit: velocityUnit, label: 'Initial Velocity' });
      setCalculation(`Initial Velocity (v₀) = √[2gh_max / sin²(θ)]\nv₀ = √[2gh_max / sin²(θ)]\nh_max = ${formatValue(h)} ${heightUnit} = ${formatValue(hBase)} m\nθ = ${formatValue(theta)}°\nsin(θ) = sin(${formatValue(theta)}°) = ${formatValue(sinTheta)}\ng = ${g} m/s²\nv₀ = √[(2 × ${g} × ${formatValue(hBase)}) / ${formatValue(sinTheta * sinTheta)}]\nv₀ = √[${formatValue(2 * g * hBase)} / ${formatValue(sinTheta * sinTheta)}]\nv₀ = √[${formatValue((2 * g * hBase) / (sinTheta * sinTheta))}]\nv₀ = ${formatValue(v0Base)} m/s = ${formatValue(v0Result)} ${velocityUnit}`);
    } else if (calculationMode === 'launchAngle') {
      // Calculate launch angle: θ = arcsin(√[2gh_max / v₀²])
      if (!maxHeight || !initialVelocity) {
        setError('Please enter both maximum height and initial velocity');
        return;
      }

      if (isNaN(h) || h <= 0) {
        setError('Maximum height must be a valid positive number');
        return;
      }
      if (isNaN(v0) || v0 <= 0) {
        setError('Initial velocity must be a valid positive number');
        return;
      }

      const hBase = convertHeightToBase(h, heightUnit);
      const v0Base = convertVelocityToBase(v0, velocityUnit);
      const sinSquaredTheta = (2 * g * hBase) / (v0Base * v0Base);
      
      if (sinSquaredTheta < 0 || sinSquaredTheta > 1) {
        setError('Invalid combination: The maximum height cannot be achieved with the given initial velocity');
        return;
      }

      const sinTheta = Math.sqrt(sinSquaredTheta);
      const thetaRad = Math.asin(sinTheta);
      const thetaDeg = (thetaRad * 180) / Math.PI;

      setResult({ value: thetaDeg, unit: '°', label: 'Launch Angle' });
      setCalculation(`Launch Angle (θ) = arcsin(√[2gh_max / v₀²])\nθ = arcsin(√[2gh_max / v₀²])\nh_max = ${formatValue(h)} ${heightUnit} = ${formatValue(hBase)} m\nv₀ = ${formatValue(v0)} ${velocityUnit} = ${formatValue(v0Base)} m/s\ng = ${g} m/s²\nsin²(θ) = (2 × ${g} × ${formatValue(hBase)}) / ${formatValue(v0Base)}²\nsin²(θ) = ${formatValue(2 * g * hBase)} / ${formatValue(v0Base * v0Base)}\nsin²(θ) = ${formatValue(sinSquaredTheta)}\nsin(θ) = √[${formatValue(sinSquaredTheta)}] = ${formatValue(sinTheta)}\nθ = arcsin(${formatValue(sinTheta)}) = ${formatValue(thetaRad)} rad = ${formatValue(thetaDeg)}°`);
    }
  };

  const clearAll = () => {
    setMaxHeight('');
    setInitialVelocity('');
    setLaunchAngle('');
    setVelocityUnit('m/s');
    setHeightUnit('m');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Maximum Height Calculator for Projectile Motion</h2>
          <p className="text-gray-600">Calculate maximum height, initial velocity, or launch angle using h_max = (v₀² × sin²(θ)) / (2g)</p>
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
            <option value="maxHeight">Maximum Height (h_max)</option>
            <option value="initialVelocity">Initial Velocity (v₀)</option>
            <option value="launchAngle">Launch Angle (θ)</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Maximum Height Formula:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            h_max = (v₀² × sin²(θ)) / (2g)
          </p>
          <p className="text-xs text-gray-600 mt-1">Where: h_max = Maximum Height, v₀ = Initial Velocity, θ = Launch Angle, g = 9.80665 m/s²</p>
        </div>

        {/* Maximum Height Input */}
        {(calculationMode === 'initialVelocity' || calculationMode === 'launchAngle') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Maximum Height (h_max)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter maximum height"
                  value={maxHeight}
                  onChange={(e) => setMaxHeight(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="w-32">
                <select
                  value={heightUnit}
                  onChange={(e) => setHeightUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(heightUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Initial Velocity Input */}
        {(calculationMode === 'maxHeight' || calculationMode === 'launchAngle') && (
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
                />
              </div>
              <div className="w-32">
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
        )}

        {/* Launch Angle Input */}
        {(calculationMode === 'maxHeight' || calculationMode === 'initialVelocity') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Launch Angle (θ)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter launch angle (degrees)"
                  value={launchAngle}
                  onChange={(e) => setLaunchAngle(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-20 flex items-center">
                <span className="text-sm text-gray-600">°</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Launch angle must be between 0° and 90°</p>
          </div>
        )}

        {/* Result Unit Selector (for maxHeight mode) */}
        {calculationMode === 'maxHeight' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Result Unit
            </label>
            <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
            >
              {Object.entries(heightUnits).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Result Unit Selector (for initialVelocity mode) */}
        {calculationMode === 'initialVelocity' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Result Unit
            </label>
            <select
              value={velocityUnit}
              onChange={(e) => setVelocityUnit(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
            >
              {Object.entries(velocityUnits).map(([key, unit]) => (
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
            {calculationMode === 'maxHeight' && (
              <>
                <li>• Enter the initial velocity (v₀) and launch angle (θ)</li>
                <li>• Calculator will determine the maximum height</li>
                <li>• Formula: h_max = (v₀² × sin²(θ)) / (2g)</li>
              </>
            )}
            {calculationMode === 'initialVelocity' && (
              <>
                <li>• Enter the maximum height (h_max) and launch angle (θ)</li>
                <li>• Calculator will determine the initial velocity</li>
                <li>• Formula: v₀ = √[2gh_max / sin²(θ)]</li>
              </>
            )}
            {calculationMode === 'launchAngle' && (
              <>
                <li>• Enter the maximum height (h_max) and initial velocity (v₀)</li>
                <li>• Calculator will determine the launch angle</li>
                <li>• Formula: θ = arcsin(√[2gh_max / v₀²])</li>
              </>
            )}
            <li>• Maximum height occurs when the vertical component of velocity becomes zero</li>
            <li>• Launch angle must be between 0° and 90° (0° = horizontal, 90° = vertical)</li>
            <li>• Maximum height occurs at 90° launch angle for a given initial velocity</li>
            <li>• Gravitational acceleration (g) = 9.80665 m/s² (standard value)</li>
            <li>• The calculator automatically handles unit conversions</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

