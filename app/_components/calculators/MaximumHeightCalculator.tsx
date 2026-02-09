'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface MaximumHeightCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function MaximumHeightCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: MaximumHeightCalculatorProps) {
  const [initialVelocity, setInitialVelocity] = useState<string>('');
  const [angle, setAngle] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [calculationSteps, setCalculationSteps] = useState<string[]>([]);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(6);
  };

  const calculateMaxHeight = () => {
    const v0 = parseFloat(initialVelocity);
    const angleInput = parseFloat(angle);
    
    if (isNaN(v0) || v0 <= 0) {
      alert('Please enter a valid positive initial velocity');
      return;
    }

    if (isNaN(angleInput) || angleInput < 0 || angleInput > 90) {
      alert('Please enter a valid angle between 0 and 90 degrees');
      return;
    }

    const steps: string[] = [];
    const g = 9.81; // Acceleration due to gravity (m/s²)

    // Convert angle to radians
    const angleRad = angleInput * (Math.PI / 180);
    steps.push(`Given: Initial velocity (v₀) = ${v0} m/s`);
    steps.push(`Given: Launch angle (θ) = ${angleInput}°`);
    steps.push(`Acceleration due to gravity (g) = ${g} m/s²`);
    
    // Calculate vertical component of velocity
    const v0y = v0 * Math.sin(angleRad);
    steps.push(`Vertical velocity component: v₀ᵧ = v₀ × sin(θ)`);
    steps.push(`v₀ᵧ = ${v0} × sin(${angleInput}°)`);
    steps.push(`v₀ᵧ = ${v0} × ${Math.sin(angleRad).toFixed(6)}`);
    steps.push(`v₀ᵧ = ${formatValue(v0y)} m/s`);

    // Maximum height formula: h_max = (v₀ᵧ²) / (2g)
    // Or: h_max = (v₀² × sin²θ) / (2g)
    const h_max = (v0 * v0 * Math.sin(angleRad) * Math.sin(angleRad)) / (2 * g);
    
    steps.push(`Maximum height formula: h_max = (v₀² × sin²θ) / (2g)`);
    steps.push(`h_max = (${v0}² × sin²(${angleInput}°)) / (2 × ${g})`);
    steps.push(`h_max = (${(v0 * v0).toFixed(6)} × ${(Math.sin(angleRad) * Math.sin(angleRad)).toFixed(6)}) / ${(2 * g).toFixed(2)}`);
    steps.push(`h_max = ${((v0 * v0 * Math.sin(angleRad) * Math.sin(angleRad))).toFixed(6)} / ${(2 * g).toFixed(2)}`);
    steps.push(`h_max = ${formatValue(h_max)} meters`);

    // Additional info: Time to reach maximum height
    const timeToMax = v0y / g;
    steps.push(`Time to reach maximum height: t = v₀ᵧ / g = ${formatValue(v0y)} / ${g} = ${formatValue(timeToMax)} seconds`);

    setResult(h_max);
    setCalculationSteps(steps);
  };

  const handleReset = () => {
    setInitialVelocity('');
    setAngle('');
    setResult(null);
    setCalculationSteps([]);
  };

  return (
    <div className="w-full max-w-md">
      {showTitle && <h2 className="text-2xl font-bold mb-4">Maximum Height Calculator</h2>}
      
      <Card className="mb-6">
        <div className="space-y-4">
          <Input
            label="Initial Velocity (v₀) in m/s"
            value={initialVelocity}
            onChange={(e) => setInitialVelocity(e.target.value)}
            placeholder="Enter velocity (e.g., 20)"
            type="number"
            min="0"
          />

          <Input
            label="Launch Angle (θ) in degrees"
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            placeholder="Enter angle 0-90° (e.g., 60)"
            type="number"
            min="0"
            max="90"
          />

          <div className="flex gap-2">
            <Button onClick={calculateMaxHeight} style={{ backgroundColor: primaryColor }}>
              Calculate Height
            </Button>
            <Button onClick={handleReset} variant="secondary">
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {result !== null && (
        <>
          <Card className="mb-6 bg-green-50">
            <div className="text-center">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Maximum Height</h3>
              <p className="text-3xl font-bold text-green-600">{formatValue(result)} m</p>
              <p className="text-xs text-gray-500 mt-2">Meters</p>
            </div>
          </Card>

          {calculationSteps.length > 0 && (
            <Card className="mb-4 bg-blue-50">
              <h3 className="font-semibold mb-3 text-gray-800">Calculation Steps:</h3>
              <ol className="space-y-2">
                {calculationSteps.map((step, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="font-semibold mr-2 text-blue-600">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
