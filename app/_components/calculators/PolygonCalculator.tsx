'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface PolygonCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

type CalculationType = 'area-from-side' | 'area-from-apothem' | 'perimeter' | 'interior-angle' | 'exterior-angle' | 'apothem' | 'side-from-area' | 'side-from-apothem' | 'sum-interior-angles';

interface PolygonResult {
  type: CalculationType;
  numberOfSides: number;
  sideLength: number;
  area: number;
  perimeter: number;
  apothem: number;
  interiorAngle: number;
  exteriorAngle: number;
  sumInteriorAngles: number;
  steps: string[];
}

export default function PolygonCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: PolygonCalculatorProps) {
  const [calculationType, setCalculationType] = useState<CalculationType>('area-from-side');
  const [numberOfSides, setNumberOfSides] = useState<string>('');
  const [sideLength, setSideLength] = useState<string>('');
  const [apothem, setApothem] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [result, setResult] = useState<PolygonResult | null>(null);

  const formatValue = (value: number, precision: number = 6): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    return value.toFixed(precision);
  };

  const calculatePolygon = () => {
    const n = parseInt(numberOfSides);
    if (isNaN(n) || n < 3) {
      alert('Please enter a valid number of sides (must be at least 3)');
      return;
    }

    const steps: string[] = [];
    let calculatedSide = 0;
    let calculatedArea = 0;
    let calculatedPerimeter = 0;
    let calculatedApothem = 0;
    const calculatedInteriorAngle = ((n - 2) * 180) / n;
    const calculatedExteriorAngle = 360 / n;
    const calculatedSumInteriorAngles = (n - 2) * 180;

    if (calculationType === 'area-from-side') {
      const s = parseFloat(sideLength);
      if (isNaN(s) || s <= 0) {
        alert('Please enter a valid side length (greater than 0)');
        return;
      }
      calculatedSide = s;
      calculatedPerimeter = n * s;
      
      // Apothem: a = s / (2 × tan(π/n))
      calculatedApothem = s / (2 * Math.tan(Math.PI / n));
      
      // Area: A = (1/2) × P × a = (1/2) × n × s × a
      calculatedArea = 0.5 * calculatedPerimeter * calculatedApothem;
      
      steps.push(`Given: Number of sides (n) = ${n}, Side length (s) = ${s}`);
      steps.push(`Step 1: Calculate perimeter: P = n × s = ${n} × ${s} = ${formatValue(calculatedPerimeter)} units`);
      steps.push(`Step 2: Calculate apothem: a = s / (2 × tan(π/n))`);
      steps.push(`  a = ${s} / (2 × tan(${formatValue(Math.PI / n, 6)}))`);
      steps.push(`  a = ${s} / (2 × ${formatValue(Math.tan(Math.PI / n), 6)})`);
      steps.push(`  a = ${formatValue(calculatedApothem)} units`);
      steps.push(`Step 3: Calculate area: A = (1/2) × P × a`);
      steps.push(`  A = (1/2) × ${formatValue(calculatedPerimeter)} × ${formatValue(calculatedApothem)}`);
      steps.push(`  A = ${formatValue(calculatedArea)} square units`);
    }
    else if (calculationType === 'area-from-apothem') {
      const a = parseFloat(apothem);
      if (isNaN(a) || a <= 0) {
        alert('Please enter a valid apothem (greater than 0)');
        return;
      }
      calculatedApothem = a;
      
      // From apothem: a = s / (2 × tan(π/n)), so s = 2a × tan(π/n)
      calculatedSide = 2 * a * Math.tan(Math.PI / n);
      calculatedPerimeter = n * calculatedSide;
      calculatedArea = 0.5 * calculatedPerimeter * calculatedApothem;
      
      steps.push(`Given: Number of sides (n) = ${n}, Apothem (a) = ${a}`);
      steps.push(`Step 1: Calculate side length: s = 2a × tan(π/n)`);
      steps.push(`  s = 2 × ${a} × tan(${formatValue(Math.PI / n, 6)})`);
      steps.push(`  s = ${2 * a} × ${formatValue(Math.tan(Math.PI / n), 6)}`);
      steps.push(`  s = ${formatValue(calculatedSide)} units`);
      steps.push(`Step 2: Calculate perimeter: P = n × s = ${n} × ${formatValue(calculatedSide)} = ${formatValue(calculatedPerimeter)} units`);
      steps.push(`Step 3: Calculate area: A = (1/2) × P × a`);
      steps.push(`  A = (1/2) × ${formatValue(calculatedPerimeter)} × ${a}`);
      steps.push(`  A = ${formatValue(calculatedArea)} square units`);
    }
    else if (calculationType === 'perimeter') {
      const s = parseFloat(sideLength);
      if (isNaN(s) || s <= 0) {
        alert('Please enter a valid side length (greater than 0)');
        return;
      }
      calculatedSide = s;
      calculatedPerimeter = n * s;
      calculatedApothem = s / (2 * Math.tan(Math.PI / n));
      calculatedArea = 0.5 * calculatedPerimeter * calculatedApothem;
      
      steps.push(`Given: Number of sides (n) = ${n}, Side length (s) = ${s}`);
      steps.push(`Perimeter formula: P = n × s`);
      steps.push(`P = ${n} × ${s}`);
      steps.push(`P = ${formatValue(calculatedPerimeter)} units`);
    }
    else if (calculationType === 'interior-angle') {
      const s = parseFloat(sideLength) || 1; // Default side length for display
      if (s <= 0) {
        alert('Please enter a valid side length (greater than 0)');
        return;
      }
      calculatedSide = s;
      calculatedPerimeter = n * s;
      calculatedApothem = s / (2 * Math.tan(Math.PI / n));
      calculatedArea = 0.5 * calculatedPerimeter * calculatedApothem;
      
      steps.push(`Given: Number of sides (n) = ${n}`);
      steps.push(`Interior angle formula: Interior Angle = (n - 2) × 180° / n`);
      steps.push(`Interior Angle = (${n} - 2) × 180° / ${n}`);
      steps.push(`Interior Angle = ${n - 2} × 180° / ${n}`);
      steps.push(`Interior Angle = ${formatValue(calculatedInteriorAngle, 2)}°`);
    }
    else if (calculationType === 'exterior-angle') {
      const s = parseFloat(sideLength) || 1;
      if (s <= 0) {
        alert('Please enter a valid side length (greater than 0)');
        return;
      }
      calculatedSide = s;
      calculatedPerimeter = n * s;
      calculatedApothem = s / (2 * Math.tan(Math.PI / n));
      calculatedArea = 0.5 * calculatedPerimeter * calculatedApothem;
      
      steps.push(`Given: Number of sides (n) = ${n}`);
      steps.push(`Exterior angle formula: Exterior Angle = 360° / n`);
      steps.push(`Exterior Angle = 360° / ${n}`);
      steps.push(`Exterior Angle = ${formatValue(calculatedExteriorAngle, 2)}°`);
    }
    else if (calculationType === 'apothem') {
      const s = parseFloat(sideLength);
      if (isNaN(s) || s <= 0) {
        alert('Please enter a valid side length (greater than 0)');
        return;
      }
      calculatedSide = s;
      calculatedApothem = s / (2 * Math.tan(Math.PI / n));
      calculatedPerimeter = n * s;
      calculatedArea = 0.5 * calculatedPerimeter * calculatedApothem;
      
      steps.push(`Given: Number of sides (n) = ${n}, Side length (s) = ${s}`);
      steps.push(`Apothem formula: a = s / (2 × tan(π/n))`);
      steps.push(`a = ${s} / (2 × tan(${formatValue(Math.PI / n, 6)}))`);
      steps.push(`a = ${s} / (2 × ${formatValue(Math.tan(Math.PI / n), 6)})`);
      steps.push(`a = ${formatValue(calculatedApothem)} units`);
    }
    else if (calculationType === 'side-from-area') {
      const a = parseFloat(area);
      if (isNaN(a) || a <= 0) {
        alert('Please enter a valid area (greater than 0)');
        return;
      }
      
      // From area: A = (1/2) × n × s × a, and a = s / (2 × tan(π/n))
      // Substituting: A = (1/2) × n × s² / (2 × tan(π/n)) = n × s² / (4 × tan(π/n))
      // Solving for s: s² = 4A × tan(π/n) / n, so s = √(4A × tan(π/n) / n)
      calculatedSide = Math.sqrt(4 * a * Math.tan(Math.PI / n) / n);
      calculatedApothem = calculatedSide / (2 * Math.tan(Math.PI / n));
      calculatedPerimeter = n * calculatedSide;
      calculatedArea = a;
      
      steps.push(`Given: Number of sides (n) = ${n}, Area (A) = ${a}`);
      steps.push(`From area formula: A = n × s² / (4 × tan(π/n))`);
      steps.push(`Solving for s: s = √(4A × tan(π/n) / n)`);
      steps.push(`s = √(4 × ${a} × tan(${formatValue(Math.PI / n, 6)}) / ${n})`);
      steps.push(`s = √(${4 * a} × ${formatValue(Math.tan(Math.PI / n), 6)} / ${n})`);
      steps.push(`s = √${formatValue(4 * a * Math.tan(Math.PI / n) / n, 6)}`);
      steps.push(`s = ${formatValue(calculatedSide)} units`);
    }
    else if (calculationType === 'side-from-apothem') {
      const a = parseFloat(apothem);
      if (isNaN(a) || a <= 0) {
        alert('Please enter a valid apothem (greater than 0)');
        return;
      }
      calculatedApothem = a;
      calculatedSide = 2 * a * Math.tan(Math.PI / n);
      calculatedPerimeter = n * calculatedSide;
      calculatedArea = 0.5 * calculatedPerimeter * calculatedApothem;
      
      steps.push(`Given: Number of sides (n) = ${n}, Apothem (a) = ${a}`);
      steps.push(`From apothem formula: a = s / (2 × tan(π/n))`);
      steps.push(`Solving for s: s = 2a × tan(π/n)`);
      steps.push(`s = 2 × ${a} × tan(${formatValue(Math.PI / n, 6)})`);
      steps.push(`s = ${2 * a} × ${formatValue(Math.tan(Math.PI / n), 6)}`);
      steps.push(`s = ${formatValue(calculatedSide)} units`);
    }
    else if (calculationType === 'sum-interior-angles') {
      const s = parseFloat(sideLength) || 1;
      if (s <= 0) {
        alert('Please enter a valid side length (greater than 0)');
        return;
      }
      calculatedSide = s;
      calculatedPerimeter = n * s;
      calculatedApothem = s / (2 * Math.tan(Math.PI / n));
      calculatedArea = 0.5 * calculatedPerimeter * calculatedApothem;
      
      steps.push(`Given: Number of sides (n) = ${n}`);
      steps.push(`Sum of interior angles formula: Sum = (n - 2) × 180°`);
      steps.push(`Sum = (${n} - 2) × 180°`);
      steps.push(`Sum = ${n - 2} × 180°`);
      steps.push(`Sum = ${formatValue(calculatedSumInteriorAngles, 2)}°`);
    }

    setResult({
      type: calculationType,
      numberOfSides: n,
      sideLength: calculatedSide,
      area: calculatedArea,
      perimeter: calculatedPerimeter,
      apothem: calculatedApothem,
      interiorAngle: calculatedInteriorAngle,
      exteriorAngle: calculatedExteriorAngle,
      sumInteriorAngles: calculatedSumInteriorAngles,
      steps
    });
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'numberOfSides':
        setNumberOfSides(value);
        break;
      case 'sideLength':
        setSideLength(value);
        break;
      case 'apothem':
        setApothem(value);
        break;
      case 'area':
        setArea(value);
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
    setNumberOfSides('');
    setSideLength('');
    setApothem('');
    setArea('');
    setResult(null);
  };

  const getCalculationTypeLabel = (type: CalculationType): string => {
    switch (type) {
      case 'area-from-side': return 'Area from Side Length';
      case 'area-from-apothem': return 'Area from Apothem';
      case 'perimeter': return 'Perimeter';
      case 'interior-angle': return 'Interior Angle';
      case 'exterior-angle': return 'Exterior Angle';
      case 'apothem': return 'Apothem';
      case 'side-from-area': return 'Side Length from Area';
      case 'side-from-apothem': return 'Side Length from Apothem';
      case 'sum-interior-angles': return 'Sum of Interior Angles';
      default: return '';
    }
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Polygon Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate area, perimeter, angles, apothem, and other properties of regular polygons with step-by-step solutions.</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Calculation Type Selection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Calculation Type</h3>
            <select
              value={calculationType}
              onChange={(e) => {
                setCalculationType(e.target.value as CalculationType);
                setResult(null);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              style={{ borderColor: primaryColor + '40' }}
            >
              <option value="area-from-side">Area from Side Length</option>
              <option value="area-from-apothem">Area from Apothem</option>
              <option value="perimeter">Perimeter</option>
              <option value="interior-angle">Interior Angle</option>
              <option value="exterior-angle">Exterior Angle</option>
              <option value="apothem">Apothem</option>
              <option value="side-from-area">Side Length from Area</option>
              <option value="side-from-apothem">Side Length from Apothem</option>
              <option value="sum-interior-angles">Sum of Interior Angles</option>
            </select>
          </div>

          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Polygon Dimensions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="Number of Sides (n)"
                type="number"
                value={numberOfSides}
                onChange={(e) => handleInputChange('numberOfSides', e.target.value)}
                placeholder="e.g., 3, 4, 5, 6..."
                min="3"
                autoFocus
              />
              {(calculationType === 'area-from-side' || calculationType === 'perimeter' || calculationType === 'apothem' || calculationType === 'interior-angle' || calculationType === 'exterior-angle' || calculationType === 'sum-interior-angles') && (
                <Input
                  label="Side Length (s)"
                  type="text"
                  value={sideLength}
                  onChange={(e) => handleInputChange('sideLength', e.target.value)}
                  placeholder="Enter side length"
                />
              )}
              {(calculationType === 'area-from-apothem' || calculationType === 'side-from-apothem') && (
                <Input
                  label="Apothem (a)"
                  type="text"
                  value={apothem}
                  onChange={(e) => handleInputChange('apothem', e.target.value)}
                  placeholder="Enter apothem"
                />
              )}
              {calculationType === 'side-from-area' && (
                <Input
                  label="Area (A)"
                  type="text"
                  value={area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  placeholder="Enter area"
                />
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={calculatePolygon}
              className={`flex-1 ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
              style={colors.customStyles?.button}
              size="lg"
            >
              Calculate {getCalculationTypeLabel(calculationType)}
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
                Calculation Results
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Number of Sides</p>
                  <p className={`text-xl font-bold ${colors.result}`} style={colors.customStyles?.result}>
                    {result.numberOfSides}
                  </p>
                </div>
                {result.sideLength > 0 && (
                  <div>
                    <p className="text-sm text-gray-600">Side Length</p>
                    <p className={`text-xl font-bold ${colors.result}`} style={colors.customStyles?.result}>
                      {formatValue(result.sideLength)} units
                    </p>
                  </div>
                )}
                {result.area > 0 && (
                  <div>
                    <p className="text-sm text-gray-600">Area</p>
                    <p className={`text-xl font-bold ${colors.result}`} style={colors.customStyles?.result}>
                      {formatValue(result.area)} sq units
                    </p>
                  </div>
                )}
                {result.perimeter > 0 && (
                  <div>
                    <p className="text-sm text-gray-600">Perimeter</p>
                    <p className={`text-xl font-bold ${colors.result}`} style={colors.customStyles?.result}>
                      {formatValue(result.perimeter)} units
                    </p>
                  </div>
                )}
                {result.apothem > 0 && (
                  <div>
                    <p className="text-sm text-gray-600">Apothem</p>
                    <p className={`text-xl font-bold ${colors.result}`} style={colors.customStyles?.result}>
                      {formatValue(result.apothem)} units
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Interior Angle</p>
                  <p className={`text-xl font-bold ${colors.result}`} style={colors.customStyles?.result}>
                    {formatValue(result.interiorAngle, 2)}°
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Exterior Angle</p>
                  <p className={`text-xl font-bold ${colors.result}`} style={colors.customStyles?.result}>
                    {formatValue(result.exteriorAngle, 2)}°
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Sum of Interior Angles</p>
                  <p className={`text-xl font-bold ${colors.result}`} style={colors.customStyles?.result}>
                    {formatValue(result.sumInteriorAngles, 2)}°
                  </p>
                </div>
              </div>
              
              {result.steps.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Step-by-Step Calculation:</h4>
                  <div className="space-y-1">
                    {result.steps.map((step, index) => (
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
            <h4 className="text-sm font-medium text-gray-700 mb-2">Key Formulas for Regular Polygons:</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>Area:</strong> A = (1/2) × P × a = (1/2) × n × s × a</p>
              <p><strong>Perimeter:</strong> P = n × s</p>
              <p><strong>Apothem:</strong> a = s / (2 × tan(π/n))</p>
              <p><strong>Interior Angle:</strong> (n - 2) × 180° / n</p>
              <p><strong>Exterior Angle:</strong> 360° / n</p>
              <p><strong>Sum of Interior Angles:</strong> (n - 2) × 180°</p>
              <p className="mt-2 text-xs"><strong>Where:</strong> n = number of sides, s = side length, a = apothem, P = perimeter</p>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

