'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface AngleBetweenVectorsCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

type Dimension = '2D' | '3D';

export default function AngleBetweenVectorsCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: AngleBetweenVectorsCalculatorProps) {
  const [dimension, setDimension] = useState<Dimension>('2D');
  const [x1, setX1] = useState<string>('');
  const [y1, setY1] = useState<string>('');
  const [z1, setZ1] = useState<string>('');
  const [x2, setX2] = useState<string>('');
  const [y2, setY2] = useState<string>('');
  const [z2, setZ2] = useState<string>('');
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

  const toDegrees = (radians: number): number => {
    return radians * (180 / Math.PI);
  };

  const calculateAngle = () => {
    const x1Val = parseFloat(x1);
    const y1Val = parseFloat(y1);
    const z1Val = dimension === '3D' ? parseFloat(z1) : 0;
    const x2Val = parseFloat(x2);
    const y2Val = parseFloat(y2);
    const z2Val = dimension === '3D' ? parseFloat(z2) : 0;

    if (dimension === '2D') {
      if (isNaN(x1Val) || isNaN(y1Val) || isNaN(x2Val) || isNaN(y2Val)) {
        alert('Please enter valid numbers for all vector components');
        return;
      }
    } else {
      if (isNaN(x1Val) || isNaN(y1Val) || isNaN(z1Val) || isNaN(x2Val) || isNaN(y2Val) || isNaN(z2Val)) {
        alert('Please enter valid numbers for all vector components');
        return;
      }
    }

    const steps: string[] = [];
    
    // Display vectors
    if (dimension === '2D') {
      steps.push(`Given: Vector a = (${x1Val}, ${y1Val}), Vector b = (${x2Val}, ${y2Val})`);
    } else {
      steps.push(`Given: Vector a = (${x1Val}, ${y1Val}, ${z1Val}), Vector b = (${x2Val}, ${y2Val}, ${z2Val})`);
    }
    
    steps.push(`Using the formula: θ = arccos((a·b)/(|a||b|))`);
    
    // Calculate dot product: a·b
    const dotProduct = x1Val * x2Val + y1Val * y2Val + (dimension === '3D' ? z1Val * z2Val : 0);
    if (dimension === '2D') {
      steps.push(`Step 1: Calculate dot product a·b`);
      steps.push(`  a·b = (${x1Val}) × (${x2Val}) + (${y1Val}) × (${y2Val})`);
      steps.push(`  a·b = ${(x1Val * x2Val)} + ${(y1Val * y2Val)}`);
    } else {
      steps.push(`Step 1: Calculate dot product a·b`);
      steps.push(`  a·b = (${x1Val}) × (${x2Val}) + (${y1Val}) × (${y2Val}) + (${z1Val}) × (${z2Val})`);
      steps.push(`  a·b = ${(x1Val * x2Val)} + ${(y1Val * y2Val)} + ${(z1Val * z2Val)}`);
    }
    steps.push(`  a·b = ${dotProduct.toFixed(6)}`);
    
    // Calculate magnitude of vector a: |a|
    const magA = Math.sqrt(x1Val * x1Val + y1Val * y1Val + (dimension === '3D' ? z1Val * z1Val : 0));
    steps.push(`Step 2: Calculate magnitude of vector a`);
    if (dimension === '2D') {
      steps.push(`  |a| = √((${x1Val})² + (${y1Val})²)`);
      steps.push(`  |a| = √(${(x1Val * x1Val)} + ${(y1Val * y1Val)})`);
    } else {
      steps.push(`  |a| = √((${x1Val})² + (${y1Val})² + (${z1Val})²)`);
      steps.push(`  |a| = √(${(x1Val * x1Val)} + ${(y1Val * y1Val)} + ${(z1Val * z1Val)})`);
    }
    steps.push(`  |a| = √${(x1Val * x1Val + y1Val * y1Val + (dimension === '3D' ? z1Val * z1Val : 0)).toFixed(6)}`);
    steps.push(`  |a| = ${magA.toFixed(6)}`);
    
    // Calculate magnitude of vector b: |b|
    const magB = Math.sqrt(x2Val * x2Val + y2Val * y2Val + (dimension === '3D' ? z2Val * z2Val : 0));
    steps.push(`Step 3: Calculate magnitude of vector b`);
    if (dimension === '2D') {
      steps.push(`  |b| = √((${x2Val})² + (${y2Val})²)`);
      steps.push(`  |b| = √(${(x2Val * x2Val)} + ${(y2Val * y2Val)})`);
    } else {
      steps.push(`  |b| = √((${x2Val})² + (${y2Val})² + (${z2Val})²)`);
      steps.push(`  |b| = √(${(x2Val * x2Val)} + ${(y2Val * y2Val)} + ${(z2Val * z2Val)})`);
    }
    steps.push(`  |b| = √${(x2Val * x2Val + y2Val * y2Val + (dimension === '3D' ? z2Val * z2Val : 0)).toFixed(6)}`);
    steps.push(`  |b| = ${magB.toFixed(6)}`);
    
    // Calculate |a||b|
    const magProduct = magA * magB;
    steps.push(`Step 4: Calculate |a| × |b|`);
    steps.push(`  |a| × |b| = ${magA.toFixed(6)} × ${magB.toFixed(6)}`);
    steps.push(`  |a| × |b| = ${magProduct.toFixed(6)}`);
    
    // Check for zero vectors
    if (magProduct === 0) {
      alert('One or both vectors are zero vectors. The angle is undefined.');
      return;
    }
    
    // Calculate cos(θ) = (a·b)/(|a||b|)
    const cosTheta = dotProduct / magProduct;
    steps.push(`Step 5: Calculate cos(θ)`);
    steps.push(`  cos(θ) = (a·b)/(|a||b|)`);
    steps.push(`  cos(θ) = ${dotProduct.toFixed(6)} / ${magProduct.toFixed(6)}`);
    steps.push(`  cos(θ) = ${cosTheta.toFixed(6)}`);
    
    // Clamp cosTheta to [-1, 1] to avoid numerical errors
    const clampedCos = Math.max(-1, Math.min(1, cosTheta));
    if (clampedCos !== cosTheta) {
      steps.push(`  (Clamped to valid range: ${clampedCos.toFixed(6)})`);
    }
    
    // Calculate angle in radians
    const angleRadians = Math.acos(clampedCos);
    steps.push(`Step 6: Calculate angle θ = arccos(${clampedCos.toFixed(6)})`);
    steps.push(`  θ = ${angleRadians.toFixed(6)} radians`);
    
    // Convert to degrees
    const angleDegrees = toDegrees(angleRadians);
    steps.push(`Step 7: Convert to degrees`);
    steps.push(`  θ = ${angleRadians.toFixed(6)} × (180/π)`);
    steps.push(`  θ = ${angleDegrees.toFixed(6)}°`);
    
    setResult(angleDegrees);
    setCalculationSteps(steps);
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'x1':
        setX1(value);
        break;
      case 'y1':
        setY1(value);
        break;
      case 'z1':
        setZ1(value);
        break;
      case 'x2':
        setX2(value);
        break;
      case 'y2':
        setY2(value);
        break;
      case 'z2':
        setZ2(value);
        break;
      default:
        break;
    }
    // Clear results when input changes
    if (result !== null) {
      setResult(null);
      setCalculationSteps([]);
    }
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

  const clearAll = () => {
    setX1('');
    setY1('');
    setZ1('');
    setX2('');
    setY2('');
    setZ2('');
    setResult(null);
    setCalculationSteps([]);
  };

  return (
    <>
      {colors.customStyles && (
        <style dangerouslySetInnerHTML={{
          __html: `
            .custom-color-button:hover {
              background-color: ${primaryColor}dd !important;
            }
            .custom-color-button:focus {
              box-shadow: 0 0 0 3px ${primaryColor}40 !important;
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out;
            }
          `
        }} />
      )}
      <Card className="max-w-md mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Angle Between Two Vectors Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the angle between two vectors in 2D or 3D space using the dot product formula with step-by-step solutions.</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Dimension Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vector Dimension</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setDimension('2D');
                  setZ1('');
                  setZ2('');
                  setResult(null);
                  setCalculationSteps([]);
                }}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  dimension === '2D'
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                2D Vectors
              </button>
              <button
                onClick={() => {
                  setDimension('3D');
                  setResult(null);
                  setCalculationSteps([]);
                }}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  dimension === '3D'
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                3D Vectors
              </button>
            </div>
          </div>

          {/* Vector a */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Vector a</h3>
            <div className={`grid ${dimension === '2D' ? 'grid-cols-2' : 'grid-cols-3'} gap-3`}>
              <Input
                label="x₁"
                type="text"
                value={x1}
                onChange={(e) => handleInputChange('x1', e.target.value)}
                placeholder="x component"
                autoFocus
              />
              <Input
                label="y₁"
                type="text"
                value={y1}
                onChange={(e) => handleInputChange('y1', e.target.value)}
                placeholder="y component"
              />
              {dimension === '3D' && (
                <Input
                  label="z₁"
                  type="text"
                  value={z1}
                  onChange={(e) => handleInputChange('z1', e.target.value)}
                  placeholder="z component"
                />
              )}
            </div>
          </div>

          {/* Vector b */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Vector b</h3>
            <div className={`grid ${dimension === '2D' ? 'grid-cols-2' : 'grid-cols-3'} gap-3`}>
              <Input
                label="x₂"
                type="text"
                value={x2}
                onChange={(e) => handleInputChange('x2', e.target.value)}
                placeholder="x component"
              />
              <Input
                label="y₂"
                type="text"
                value={y2}
                onChange={(e) => handleInputChange('y2', e.target.value)}
                placeholder="y component"
              />
              {dimension === '3D' && (
                <Input
                  label="z₂"
                  type="text"
                  value={z2}
                  onChange={(e) => handleInputChange('z2', e.target.value)}
                  placeholder="z component"
                />
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={calculateAngle}
              className={`flex-1 ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
              style={colors.customStyles?.button}
              size="lg"
            >
              Calculate Angle
            </Button>
            <Button 
              onClick={clearAll}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              Clear
            </Button>
          </div>

          {result !== null && (
            <div 
              className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md animate-fadeIn`}
              style={colors.customStyles?.resultBg}
            >
              <h3 
                className={`text-lg font-semibold ${colors.resultText} mb-3`}
                style={colors.customStyles?.resultText}
              >
                Angle Result
              </h3>
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-2">The angle between the two vectors is:</p>
                <p 
                  className={`text-3xl font-bold ${colors.result}`}
                  style={colors.customStyles?.result}
                >
                  {formatValue(result)}°
                </p>
              </div>
              
              {calculationSteps.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Step-by-Step Calculation:</h4>
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {calculationSteps.map((step, index) => (
                      <p key={index} className="text-sm text-gray-600 font-mono">
                        {step}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Formula Reference */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Angle Formula:</h4>
            <div className="text-sm text-gray-600">
              <p className="font-mono text-center text-base font-bold mb-2">θ = arccos((a·b)/(|a||b|))</p>
              <div className="mt-2 space-y-1 text-xs">
                <p><strong>Where:</strong></p>
                <p>• a·b = dot product = a₁b₁ + a₂b₂ {dimension === '3D' ? '+ a₃b₃' : ''}</p>
                <p>• |a| = magnitude of a = √(a₁² + a₂²{dimension === '3D' ? ' + a₃²' : ''})</p>
                <p>• |b| = magnitude of b = √(b₁² + b₂²{dimension === '3D' ? ' + b₃²' : ''})</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

