'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface TriangleAngleCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

type CalculationMethod = 'two-angles' | 'three-sides' | 'two-sides-angle' | 'side-two-angles';

interface TriangleAngleResult {
  method: CalculationMethod;
  angleA: number;
  angleB: number;
  angleC: number;
  sideA?: number;
  sideB?: number;
  sideC?: number;
  isValid: boolean;
  steps: string[];
}

export default function TriangleAngleCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: TriangleAngleCalculatorProps) {
  const [method, setMethod] = useState<CalculationMethod>('two-angles');
  const [angleA, setAngleA] = useState<string>('');
  const [angleB, setAngleB] = useState<string>('');
  const [angleC, setAngleC] = useState<string>('');
  const [sideA, setSideA] = useState<string>('');
  const [sideB, setSideB] = useState<string>('');
  const [sideC, setSideC] = useState<string>('');
  const [result, setResult] = useState<TriangleAngleResult | null>(null);

  const formatValue = (value: number, precision: number = 4): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (isNaN(value)) {
      return 'NaN';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(precision);
  };

  const toDegrees = (radians: number): number => {
    return radians * (180 / Math.PI);
  };

  const toRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180);
  };

  const calculateAngles = () => {
    const steps: string[] = [];
    let finalAngleA = 0;
    let finalAngleB = 0;
    let finalAngleC = 0;
    let finalSideA = 0;
    let finalSideB = 0;
    let finalSideC = 0;
    let isValid = true;

    if (method === 'two-angles') {
      const a = parseFloat(angleA);
      const b = parseFloat(angleB);
      
      if (isNaN(a) || isNaN(b)) {
        alert('Please enter valid angles for both Angle A and Angle B');
        return;
      }

      if (a <= 0 || b <= 0 || a >= 180 || b >= 180) {
        alert('Angles must be between 0° and 180°');
        return;
      }

      finalAngleA = a;
      finalAngleB = b;
      finalAngleC = 180 - a - b;

      if (finalAngleC <= 0) {
        isValid = false;
        alert('Invalid triangle: The sum of the two angles is 180° or more. The third angle must be greater than 0°');
        return;
      }

      steps.push(`Given: Angle A = ${a}°, Angle B = ${b}°`);
      steps.push(`Using the Triangle Angle Sum Theorem: A + B + C = 180°`);
      steps.push(`Solving for Angle C: C = 180° - A - B`);
      steps.push(`C = 180° - ${a}° - ${b}°`);
      steps.push(`C = ${finalAngleC}°`);
      steps.push(``);
      steps.push(`All angles: A = ${a}°, B = ${b}°, C = ${finalAngleC}°`);
      steps.push(`Verification: ${a}° + ${b}° + ${finalAngleC}° = 180°`);
    }
    else if (method === 'three-sides') {
      const a = parseFloat(sideA);
      const b = parseFloat(sideB);
      const c = parseFloat(sideC);
      
      if (isNaN(a) || isNaN(b) || isNaN(c)) {
        alert('Please enter valid lengths for all three sides');
        return;
      }

      if (a <= 0 || b <= 0 || c <= 0) {
        alert('All sides must be greater than zero');
        return;
      }

      // Check triangle inequality
      if (a + b <= c || a + c <= b || b + c <= a) {
        isValid = false;
        alert('Invalid triangle: The sum of any two sides must be greater than the third side');
        return;
      }

      finalSideA = a;
      finalSideB = b;
      finalSideC = c;

      // Law of Cosines: c² = a² + b² - 2ab cos(C)
      // cos(C) = (a² + b² - c²) / (2ab)
      const cosA = (b * b + c * c - a * a) / (2 * b * c);
      const cosB = (a * a + c * c - b * b) / (2 * a * c);
      const cosC = (a * a + b * b - c * c) / (2 * a * b);

      // Clamp values to [-1, 1] to avoid numerical errors
      const clampedCosA = Math.max(-1, Math.min(1, cosA));
      const clampedCosB = Math.max(-1, Math.min(1, cosB));
      const clampedCosC = Math.max(-1, Math.min(1, cosC));

      finalAngleA = toDegrees(Math.acos(clampedCosA));
      finalAngleB = toDegrees(Math.acos(clampedCosB));
      finalAngleC = toDegrees(Math.acos(clampedCosC));

      steps.push(`Given: Side a = ${a}, Side b = ${b}, Side c = ${c}`);
      steps.push(`Using Law of Cosines to find angles:`);
      steps.push(``);
      steps.push(`For Angle A: cos(A) = (b² + c² - a²) / (2bc)`);
      steps.push(`cos(A) = (${b}² + ${c}² - ${a}²) / (2 × ${b} × ${c})`);
      steps.push(`cos(A) = (${b * b} + ${c * c} - ${a * a}) / (${2 * b * c})`);
      steps.push(`cos(A) = ${formatValue(cosA, 6)}`);
      steps.push(`A = arccos(${formatValue(cosA, 6)}) = ${formatValue(finalAngleA)}°`);
      steps.push(``);
      steps.push(`For Angle B: cos(B) = (a² + c² - b²) / (2ac)`);
      steps.push(`cos(B) = (${a}² + ${c}² - ${b}²) / (2 × ${a} × ${c})`);
      steps.push(`cos(B) = (${a * a} + ${c * c} - ${b * b}) / (${2 * a * c})`);
      steps.push(`cos(B) = ${formatValue(cosB, 6)}`);
      steps.push(`B = arccos(${formatValue(cosB, 6)}) = ${formatValue(finalAngleB)}°`);
      steps.push(``);
      steps.push(`For Angle C: cos(C) = (a² + b² - c²) / (2ab)`);
      steps.push(`cos(C) = (${a}² + ${b}² - ${c}²) / (2 × ${a} × ${b})`);
      steps.push(`cos(C) = (${a * a} + ${b * b} - ${c * c}) / (${2 * a * b})`);
      steps.push(`cos(C) = ${formatValue(cosC, 6)}`);
      steps.push(`C = arccos(${formatValue(cosC, 6)}) = ${formatValue(finalAngleC)}°`);
      steps.push(``);
      steps.push(`Verification: A + B + C = ${formatValue(finalAngleA)}° + ${formatValue(finalAngleB)}° + ${formatValue(finalAngleC)}° = ${formatValue(finalAngleA + finalAngleB + finalAngleC)}°`);
    }
    else if (method === 'two-sides-angle') {
      const a = parseFloat(sideA);
      const b = parseFloat(sideB);
      const angleCValue = parseFloat(angleC);
      
      if (isNaN(a) || isNaN(b) || isNaN(angleCValue)) {
        alert('Please enter valid values for Side a, Side b, and Angle C');
        return;
      }

      if (a <= 0 || b <= 0) {
        alert('Sides must be greater than zero');
        return;
      }

      if (angleCValue <= 0 || angleCValue >= 180) {
        alert('Angle must be between 0° and 180°');
        return;
      }

      finalSideA = a;
      finalSideB = b;
      finalAngleC = angleCValue;

      // Law of Cosines to find side c
      const cSquared = a * a + b * b - 2 * a * b * Math.cos(toRadians(angleCValue));
      finalSideC = Math.sqrt(cSquared);

      if (isNaN(finalSideC) || finalSideC <= 0) {
        isValid = false;
        alert('Invalid triangle: Cannot calculate third side');
        return;
      }

      // Law of Cosines for remaining angles
      const cosA = (b * b + finalSideC * finalSideC - a * a) / (2 * b * finalSideC);
      const cosB = (a * a + finalSideC * finalSideC - b * b) / (2 * a * finalSideC);

      const clampedCosA = Math.max(-1, Math.min(1, cosA));
      const clampedCosB = Math.max(-1, Math.min(1, cosB));

      finalAngleA = toDegrees(Math.acos(clampedCosA));
      finalAngleB = toDegrees(Math.acos(clampedCosB));

      steps.push(`Given: Side a = ${a}, Side b = ${b}, Angle C = ${angleCValue}°`);
      steps.push(`Step 1: Find side c using Law of Cosines`);
      steps.push(`c² = a² + b² - 2ab cos(C)`);
      steps.push(`c² = ${a}² + ${b}² - 2 × ${a} × ${b} × cos(${angleCValue}°)`);
      steps.push(`c² = ${a * a} + ${b * b} - ${2 * a * b} × ${formatValue(Math.cos(toRadians(angleCValue)), 6)}`);
      steps.push(`c² = ${formatValue(cSquared, 6)}`);
      steps.push(`c = ${formatValue(finalSideC)}`);
      steps.push(``);
      steps.push(`Step 2: Find Angle A using Law of Cosines`);
      steps.push(`cos(A) = (b² + c² - a²) / (2bc)`);
      steps.push(`A = arccos(${formatValue(cosA, 6)}) = ${formatValue(finalAngleA)}°`);
      steps.push(``);
      steps.push(`Step 3: Find Angle B using Law of Cosines`);
      steps.push(`cos(B) = (a² + c² - b²) / (2ac)`);
      steps.push(`B = arccos(${formatValue(cosB, 6)}) = ${formatValue(finalAngleB)}°`);
      steps.push(``);
      steps.push(`All angles: A = ${formatValue(finalAngleA)}°, B = ${formatValue(finalAngleB)}°, C = ${angleCValue}°`);
      steps.push(`Verification: ${formatValue(finalAngleA)}° + ${formatValue(finalAngleB)}° + ${angleCValue}° = ${formatValue(finalAngleA + finalAngleB + finalAngleC)}°`);
    }
    else if (method === 'side-two-angles') {
      const a = parseFloat(sideA);
      const angleBValue = parseFloat(angleB);
      const angleCValue = parseFloat(angleC);
      
      if (isNaN(a) || isNaN(angleBValue) || isNaN(angleCValue)) {
        alert('Please enter valid values for Side a, Angle B, and Angle C');
        return;
      }

      if (a <= 0) {
        alert('Side must be greater than zero');
        return;
      }

      if (angleBValue <= 0 || angleBValue >= 180 || angleCValue <= 0 || angleCValue >= 180) {
        alert('Angles must be between 0° and 180°');
        return;
      }

      if (angleBValue + angleCValue >= 180) {
        isValid = false;
        alert('Invalid triangle: The sum of the two angles must be less than 180°');
        return;
      }

      finalSideA = a;
      finalAngleB = angleBValue;
      finalAngleC = angleCValue;
      finalAngleA = 180 - angleBValue - angleCValue;

      // Law of Sines: a/sin(A) = b/sin(B) = c/sin(C)
      const sinA = Math.sin(toRadians(finalAngleA));
      const sinB = Math.sin(toRadians(angleBValue));
      const sinC = Math.sin(toRadians(angleCValue));

      finalSideB = (a * sinB) / sinA;
      finalSideC = (a * sinC) / sinA;

      steps.push(`Given: Side a = ${a}, Angle B = ${angleBValue}°, Angle C = ${angleCValue}°`);
      steps.push(`Step 1: Find Angle A using Triangle Angle Sum Theorem`);
      steps.push(`A = 180° - B - C = 180° - ${angleBValue}° - ${angleCValue}° = ${finalAngleA}°`);
      steps.push(``);
      steps.push(`Step 2: Find side b using Law of Sines`);
      steps.push(`a/sin(A) = b/sin(B)`);
      steps.push(`b = (a × sin(B)) / sin(A)`);
      steps.push(`b = (${a} × sin(${angleBValue}°)) / sin(${finalAngleA}°)`);
      steps.push(`b = (${a} × ${formatValue(sinB, 6)}) / ${formatValue(sinA, 6)}`);
      steps.push(`b = ${formatValue(finalSideB)}`);
      steps.push(``);
      steps.push(`Step 3: Find side c using Law of Sines`);
      steps.push(`a/sin(A) = c/sin(C)`);
      steps.push(`c = (a × sin(C)) / sin(A)`);
      steps.push(`c = (${a} × sin(${angleCValue}°)) / sin(${finalAngleA}°)`);
      steps.push(`c = (${a} × ${formatValue(sinC, 6)}) / ${formatValue(sinA, 6)}`);
      steps.push(`c = ${formatValue(finalSideC)}`);
      steps.push(``);
      steps.push(`All angles: A = ${formatValue(finalAngleA)}°, B = ${angleBValue}°, C = ${angleCValue}°`);
      steps.push(`All sides: a = ${a}, b = ${formatValue(finalSideB)}, c = ${formatValue(finalSideC)}`);
    }

    setResult({
      method,
      angleA: finalAngleA,
      angleB: finalAngleB,
      angleC: finalAngleC,
      sideA: finalSideA || undefined,
      sideB: finalSideB || undefined,
      sideC: finalSideC || undefined,
      isValid,
      steps
    });
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'angleA':
        setAngleA(value);
        break;
      case 'angleB':
        setAngleB(value);
        break;
      case 'angleC':
        setAngleC(value);
        break;
      case 'sideA':
        setSideA(value);
        break;
      case 'sideB':
        setSideB(value);
        break;
      case 'sideC':
        setSideC(value);
        break;
      default:
        break;
    }
    if (result !== null) {
      setResult(null);
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
    setAngleA('');
    setAngleB('');
    setAngleC('');
    setSideA('');
    setSideB('');
    setSideC('');
    setResult(null);
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
      <Card className="max-w-2xl mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Triangle Angle Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate missing angles and sides of triangles using various methods including angle sum theorem, Law of Cosines, and Law of Sines with step-by-step solutions.</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Calculation Method Selection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Calculation Method</h3>
            <select
              value={method}
              onChange={(e) => {
                setMethod(e.target.value as CalculationMethod);
                setResult(null);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              style={{ borderColor: primaryColor + '40' }}
            >
              <option value="two-angles">Two Angles Given (Find Third Angle)</option>
              <option value="three-sides">Three Sides Given (SSS - Law of Cosines)</option>
              <option value="two-sides-angle">Two Sides and Included Angle (SAS - Law of Cosines)</option>
              <option value="side-two-angles">One Side and Two Angles (ASA/AAS - Law of Sines)</option>
            </select>
          </div>

          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Triangle Dimensions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(method === 'two-angles' || method === 'two-sides-angle' || method === 'side-two-angles') && (
                <>
                  {method !== 'two-sides-angle' && (
                    <Input
                      label="Angle A (degrees)"
                      type="text"
                      value={angleA}
                      onChange={(e) => handleInputChange('angleA', e.target.value)}
                      placeholder="Enter angle A"
                    />
                  )}
                  <Input
                    label="Angle B (degrees)"
                    type="text"
                    value={angleB}
                    onChange={(e) => handleInputChange('angleB', e.target.value)}
                    placeholder="Enter angle B"
                  />
                  {method === 'two-sides-angle' || method === 'side-two-angles' ? (
                    <Input
                      label="Angle C (degrees)"
                      type="text"
                      value={angleC}
                      onChange={(e) => handleInputChange('angleC', e.target.value)}
                      placeholder="Enter angle C"
                    />
                  ) : null}
                </>
              )}
              
              {(method === 'three-sides' || method === 'two-sides-angle' || method === 'side-two-angles') && (
                <>
                  <Input
                    label="Side a"
                    type="text"
                    value={sideA}
                    onChange={(e) => handleInputChange('sideA', e.target.value)}
                    placeholder="Enter side a"
                    autoFocus={method !== 'two-angles'}
                  />
                  {method !== 'side-two-angles' && (
                    <Input
                      label="Side b"
                      type="text"
                      value={sideB}
                      onChange={(e) => handleInputChange('sideB', e.target.value)}
                      placeholder="Enter side b"
                    />
                  )}
                  {method === 'three-sides' && (
                    <Input
                      label="Side c"
                      type="text"
                      value={sideC}
                      onChange={(e) => handleInputChange('sideC', e.target.value)}
                      placeholder="Enter side c"
                    />
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={calculateAngles}
              className={`flex-1 ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
              style={colors.customStyles?.button}
              size="lg"
            >
              Calculate Angles
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

          {result !== null && result.isValid && (
            <div 
              className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md animate-fadeIn`}
              style={colors.customStyles?.resultBg}
            >
              <h3 
                className={`text-lg font-semibold ${colors.resultText} mb-4`}
                style={colors.customStyles?.resultText}
              >
                Triangle Angles Result
              </h3>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-3 rounded border text-center">
                  <p className="text-sm text-gray-600 mb-1">Angle A</p>
                  <p className={`text-xl font-bold ${colors.result}`} style={colors.customStyles?.result}>
                    {formatValue(result.angleA)}°
                  </p>
                </div>
                <div className="bg-white p-3 rounded border text-center">
                  <p className="text-sm text-gray-600 mb-1">Angle B</p>
                  <p className={`text-xl font-bold ${colors.result}`} style={colors.customStyles?.result}>
                    {formatValue(result.angleB)}°
                  </p>
                </div>
                <div className="bg-white p-3 rounded border text-center">
                  <p className="text-sm text-gray-600 mb-1">Angle C</p>
                  <p className={`text-xl font-bold ${colors.result}`} style={colors.customStyles?.result}>
                    {formatValue(result.angleC)}°
                  </p>
                </div>
              </div>

              {(result.sideA || result.sideB || result.sideC) && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {result.sideA !== undefined && (
                    <div className="bg-white p-3 rounded border text-center">
                      <p className="text-sm text-gray-600 mb-1">Side a</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {formatValue(result.sideA)}
                      </p>
                    </div>
                  )}
                  {result.sideB !== undefined && (
                    <div className="bg-white p-3 rounded border text-center">
                      <p className="text-sm text-gray-600 mb-1">Side b</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {formatValue(result.sideB)}
                      </p>
                    </div>
                  )}
                  {result.sideC !== undefined && (
                    <div className="bg-white p-3 rounded border text-center">
                      <p className="text-sm text-gray-600 mb-1">Side c</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {formatValue(result.sideC)}
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {result.steps.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Step-by-Step Calculation:</h4>
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {result.steps.map((step, index) => (
                      <p key={index} className={`text-sm font-mono ${step === '' ? 'py-1' : 'text-gray-600'}`}>
                        {step || '\u00A0'}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Formula Reference */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Key Formulas:</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>Triangle Angle Sum:</strong> A + B + C = 180°</p>
              <p><strong>Law of Cosines:</strong> c² = a² + b² - 2ab cos(C)</p>
              <p><strong>Law of Sines:</strong> a/sin(A) = b/sin(B) = c/sin(C)</p>
              <p className="mt-2 text-xs"><strong>Methods:</strong></p>
              <p className="text-xs">• Two Angles: Use angle sum theorem</p>
              <p className="text-xs">• Three Sides (SSS): Use Law of Cosines</p>
              <p className="text-xs">• Two Sides and Angle (SAS): Use Law of Cosines</p>
              <p className="text-xs">• Side and Two Angles (ASA/AAS): Use Law of Sines</p>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

