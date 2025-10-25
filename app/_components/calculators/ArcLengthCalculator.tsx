'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface ArcLengthCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface ArcLengthResult {
  radius: number;
  centralAngle: number;
  arcLength: number;
  calculation: string;
  explanation: string;
  steps: string[];
  sectorArea: number;
  chordLength: number;
}

export default function ArcLengthCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: ArcLengthCalculatorProps) {
  const [radius, setRadius] = useState<string>('');
  const [centralAngle, setCentralAngle] = useState<string>('');
  const [result, setResult] = useState<ArcLengthResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const calculateArcLength = () => {
    // Check if fields are empty
    if (!radius || !centralAngle || !radius.trim() || !centralAngle.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const r = parseFloat(radius);
    const angle = parseFloat(centralAngle);

    // Validation
    if (isNaN(r) || isNaN(angle)) {
      alert('Please enter valid numbers for all fields');
      return;
    }

    if (r <= 0) {
      alert('Radius must be a positive number');
      return;
    }

    if (angle < 0 || angle > 360) {
      alert('Central angle must be between 0 and 360 degrees');
      return;
    }

    // Calculate arc length: s = r × θ (where θ is in radians)
    const angleInRadians = (angle * Math.PI) / 180;
    const arcLength = r * angleInRadians;

    // Calculate sector area: A = (1/2) × r² × θ
    const sectorArea = 0.5 * r * r * angleInRadians;

    // Calculate chord length: c = 2r × sin(θ/2)
    const chordLength = 2 * r * Math.sin(angleInRadians / 2);

    // Generate explanation
    let explanation: string;
    if (angle === 360) {
      explanation = `This is a complete circle. The arc length equals the circumference: 2πr = ${(2 * Math.PI * r).toFixed(6)} units.`;
    } else if (angle === 180) {
      explanation = `This is a semicircle. The arc length is half the circumference: πr = ${(Math.PI * r).toFixed(6)} units.`;
    } else if (angle === 90) {
      explanation = `This is a quarter circle. The arc length is one-fourth the circumference: πr/2 = ${(Math.PI * r / 2).toFixed(6)} units.`;
    } else {
      explanation = `The arc length is ${arcLength.toFixed(6)} units. This represents ${((angle / 360) * 100).toFixed(1)}% of the full circle.`;
    }

    // Generate step-by-step calculation
    const steps: string[] = [];
    steps.push(`Given: Radius (r) = ${r} units, Central angle (θ) = ${angle}°`);
    steps.push(`Step 1: Convert angle to radians: θ = ${angle}° × (π/180°) = ${angleInRadians.toFixed(6)} radians`);
    steps.push(`Step 2: Apply arc length formula: s = r × θ`);
    steps.push(`Step 3: s = ${r} × ${angleInRadians.toFixed(6)} = ${arcLength.toFixed(6)} units`);

    // Generate calculation string
    const calculation = `s = r × θ = ${r} × ${angleInRadians.toFixed(6)} = ${arcLength.toFixed(6)} units`;

    setResult({
      radius: r,
      centralAngle: angle,
      arcLength,
      calculation,
      explanation,
      steps,
      sectorArea,
      chordLength
    });
  };

  const getColorClasses = (color: string) => {
    const hexColor = color.startsWith('#') ? color : `#${color}`;
    
    return {
      button: '',
      result: '',
      resultBg: '',
      resultBorder: '',
      resultText: '',
      customStyles: {
        button: {
          backgroundColor: hexColor,
          '--hover-color': hexColor,
          '--focus-color': hexColor
        } as React.CSSProperties,
        result: {
          color: hexColor
        } as React.CSSProperties,
        resultBg: {
          backgroundColor: `${hexColor}10`,
          borderColor: `${hexColor}30`
        } as React.CSSProperties,
        resultText: {
          color: hexColor
        } as React.CSSProperties
      }
    };
  };

  const colors = getColorClasses(primaryColor);

  return (
    <div className="max-w-4xl mx-auto">
      {showTitle && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Arc Length Calculator</h2>
          <p className="text-lg text-gray-600">
            Calculate the length of an arc using radius and central angle
          </p>
        </div>
      )}
      
      <Card className="p-6">
        <div className="space-y-6">
          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Enter Circle Parameters</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter the radius and central angle to calculate the arc length.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Radius (r)"
                type="number"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                placeholder="Enter radius"
                step="any"
                min="0"
              />
              <Input
                label="Central Angle (θ)"
                type="number"
                value={centralAngle}
                onChange={(e) => setCentralAngle(e.target.value)}
                placeholder="Enter angle in degrees"
                step="any"
                min="0"
                max="360"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <div className="flex justify-center">
            <Button
              onClick={calculateArcLength}
              className="custom-color-button"
              style={colors.customStyles?.button}
            >
              Calculate Arc Length
            </Button>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Main Result */}
              <div 
                className="p-6 rounded-lg border-2"
                style={colors.customStyles?.resultBg}
              >
                <h3 className="text-xl font-bold mb-4" style={colors.customStyles?.result}>
                  Arc Length Result
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Radius</p>
                    <p className="text-lg font-semibold">{formatValue(result.radius)} units</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Central Angle</p>
                    <p className="text-lg font-semibold">{formatValue(result.centralAngle)}°</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Arc Length</p>
                    <p className="text-lg font-semibold">{formatValue(result.arcLength)} units</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded border">
                  <p className="font-mono text-sm">{result.calculation}</p>
                </div>
              </div>

              {/* Additional Properties */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Additional Properties</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Sector Area</p>
                    <p className="text-lg font-semibold">{formatValue(result.sectorArea)} square units</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Chord Length</p>
                    <p className="text-lg font-semibold">{formatValue(result.chordLength)} units</p>
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">Explanation</h4>
                <p className="text-blue-800">{result.explanation}</p>
              </div>

              {/* Step-by-Step Solution */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Step-by-Step Solution</h4>
                <ol className="space-y-2">
                  {result.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
