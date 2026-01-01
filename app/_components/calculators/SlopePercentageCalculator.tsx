'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface SlopePercentageCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface SlopePercentageResult {
  slopePercentage: number;
  slope: number;
  rise: number;
  run: number;
  angle: number;
  interpretation: string;
  steps: string[];
  calculationMethod: string;
}

export default function SlopePercentageCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: SlopePercentageCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'rise-run' | 'two-points' | 'slope'>('rise-run');
  const [rise, setRise] = useState<string>('');
  const [run, setRun] = useState<string>('');
  const [x1, setX1] = useState<string>('');
  const [y1, setY1] = useState<string>('');
  const [x2, setX2] = useState<string>('');
  const [y2, setY2] = useState<string>('');
  const [slope, setSlope] = useState<string>('');
  const [result, setResult] = useState<SlopePercentageResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    // Check if it's a whole number
    if (Math.abs(value - Math.round(value)) < 0.0001) {
      return Math.round(value).toString();
    }
    return value.toFixed(4);
  };

  const calculateSlopePercentage = () => {
    let calculatedRise = 0;
    let calculatedRun = 0;
    let calculatedSlope = 0;
    let steps: string[] = [];
    let calculationMethod = '';

    if (calculationType === 'rise-run') {
      calculatedRise = parseFloat(rise) || 0;
      calculatedRun = parseFloat(run) || 0;

      if (calculatedRun === 0) {
        alert('Run cannot be zero. Please enter a valid run value.');
        return;
      }

      if (isNaN(calculatedRise) || isNaN(calculatedRun)) {
        alert('Please enter valid numbers for rise and run');
        return;
      }

      calculatedSlope = calculatedRise / calculatedRun;
      calculationMethod = 'Rise over Run';
      steps.push(`Given: Rise = ${formatValue(calculatedRise)}, Run = ${formatValue(calculatedRun)}`);
      steps.push(`Step 1: Calculate slope = Rise / Run`);
      steps.push(`Step 2: Slope = ${formatValue(calculatedRise)} / ${formatValue(calculatedRun)} = ${formatValue(calculatedSlope)}`);
      steps.push(`Step 3: Calculate slope percentage = Slope × 100`);
      steps.push(`Step 4: Slope Percentage = ${formatValue(calculatedSlope)} × 100 = ${formatValue(calculatedSlope * 100)}%`);

    } else if (calculationType === 'two-points') {
      const x1Val = parseFloat(x1) || 0;
      const y1Val = parseFloat(y1) || 0;
      const x2Val = parseFloat(x2) || 0;
      const y2Val = parseFloat(y2) || 0;

      if (x1Val === x2Val) {
        alert('Cannot calculate slope: x-coordinates are the same (vertical line)');
        return;
      }

      if (isNaN(x1Val) || isNaN(y1Val) || isNaN(x2Val) || isNaN(y2Val)) {
        alert('Please enter valid numbers for all coordinates');
        return;
      }

      calculatedRise = y2Val - y1Val;
      calculatedRun = x2Val - x1Val;
      calculatedSlope = calculatedRise / calculatedRun;
      calculationMethod = 'Two Points';
      steps.push(`Given: Point 1 = (${formatValue(x1Val)}, ${formatValue(y1Val)}), Point 2 = (${formatValue(x2Val)}, ${formatValue(y2Val)})`);
      steps.push(`Step 1: Calculate rise = y₂ - y₁`);
      steps.push(`Step 2: Rise = ${formatValue(y2Val)} - ${formatValue(y1Val)} = ${formatValue(calculatedRise)}`);
      steps.push(`Step 3: Calculate run = x₂ - x₁`);
      steps.push(`Step 4: Run = ${formatValue(x2Val)} - ${formatValue(x1Val)} = ${formatValue(calculatedRun)}`);
      steps.push(`Step 5: Calculate slope = Rise / Run`);
      steps.push(`Step 6: Slope = ${formatValue(calculatedRise)} / ${formatValue(calculatedRun)} = ${formatValue(calculatedSlope)}`);
      steps.push(`Step 7: Calculate slope percentage = Slope × 100`);
      steps.push(`Step 8: Slope Percentage = ${formatValue(calculatedSlope)} × 100 = ${formatValue(calculatedSlope * 100)}%`);

    } else {
      calculatedSlope = parseFloat(slope) || 0;

      if (isNaN(calculatedSlope)) {
        alert('Please enter a valid slope value');
        return;
      }

      // For display purposes, use a standard run of 100 to calculate rise
      calculatedRun = 100;
      calculatedRise = calculatedSlope * calculatedRun;
      calculationMethod = 'Slope Value';
      steps.push(`Given: Slope = ${formatValue(calculatedSlope)}`);
      steps.push(`Step 1: Calculate slope percentage = Slope × 100`);
      steps.push(`Step 2: Slope Percentage = ${formatValue(calculatedSlope)} × 100 = ${formatValue(calculatedSlope * 100)}%`);
      steps.push(`Step 3: For reference, with run = 100, rise = ${formatValue(calculatedSlope)} × 100 = ${formatValue(calculatedRise)}`);
    }

    const slopePercentage = calculatedSlope * 100;
    const angle = Math.atan(calculatedSlope) * (180 / Math.PI);

    let interpretation = '';
    if (Math.abs(slopePercentage) < 0.01) {
      interpretation = 'Essentially horizontal (0% slope)';
    } else if (Math.abs(slopePercentage) < 5) {
      interpretation = 'Very gentle slope - suitable for most purposes';
    } else if (Math.abs(slopePercentage) < 10) {
      interpretation = 'Gentle slope - common for roads and ramps';
    } else if (Math.abs(slopePercentage) < 25) {
      interpretation = 'Moderate slope - requires careful navigation';
    } else if (Math.abs(slopePercentage) < 50) {
      interpretation = 'Steep slope - challenging terrain';
    } else {
      interpretation = 'Very steep slope - difficult to navigate';
    }

    setResult({
      slopePercentage,
      slope: calculatedSlope,
      rise: calculatedRise,
      run: calculatedRun,
      angle,
      interpretation,
      steps,
      calculationMethod
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Slope Percentage Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate slope percentage from rise/run, two points, or slope value. Perfect for construction, engineering, and surveying applications.</p>
          </>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calculation Method
            </label>
            <select
              value={calculationType}
              onChange={(e) => {
                setCalculationType(e.target.value as 'rise-run' | 'two-points' | 'slope');
                setResult(null);
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="rise-run">Rise and Run</option>
              <option value="two-points">Two Points</option>
              <option value="slope">Slope Value</option>
            </select>
          </div>

          {calculationType === 'rise-run' && (
            <>
              <Input
                label="Rise (vertical change)"
                type="text"
                value={rise}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                    setRise(value);
                  }
                }}
                placeholder="Enter rise"
                autoFocus
              />
              <Input
                label="Run (horizontal change)"
                type="text"
                value={run}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                    setRun(value);
                  }
                }}
                placeholder="Enter run"
              />
            </>
          )}

          {calculationType === 'two-points' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Point 1: X"
                  type="text"
                  value={x1}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                      setX1(value);
                    }
                  }}
                  placeholder="x₁"
                  autoFocus
                />
                <Input
                  label="Point 1: Y"
                  type="text"
                  value={y1}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                      setY1(value);
                    }
                  }}
                  placeholder="y₁"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Point 2: X"
                  type="text"
                  value={x2}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                      setX2(value);
                    }
                  }}
                  placeholder="x₂"
                />
                <Input
                  label="Point 2: Y"
                  type="text"
                  value={y2}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                      setY2(value);
                    }
                  }}
                  placeholder="y₂"
                />
              </div>
            </>
          )}

          {calculationType === 'slope' && (
            <Input
              label="Slope"
              type="text"
              value={slope}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                  setSlope(value);
                }
              }}
              placeholder="Enter slope"
              autoFocus
            />
          )}

          <Button 
            onClick={calculateSlopePercentage}
            className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate Slope Percentage
          </Button>

          {result !== null && (
            <div 
              className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-lg animate-fadeIn`}
              style={colors.customStyles?.resultBg}
            >
              <h3 
                className={`text-lg font-semibold ${colors.resultText} mb-4`}
                style={colors.customStyles?.resultText}
              >
                Slope Percentage: {formatValue(result.slopePercentage)}%
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Results:</p>
                  <div className="space-y-1 font-mono">
                    <p>Slope Percentage: {formatValue(result.slopePercentage)}%</p>
                    <p>Slope: {formatValue(result.slope)}</p>
                    {calculationType !== 'slope' && (
                      <>
                        <p>Rise: {formatValue(result.rise)}</p>
                        <p>Run: {formatValue(result.run)}</p>
                      </>
                    )}
                    <p>Angle: {formatValue(result.angle)}°</p>
                  </div>
                </div>

                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Interpretation:</p>
                  <p className="text-gray-600">{result.interpretation}</p>
                </div>

                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Calculation Steps ({result.calculationMethod}):</p>
                  <ul className="list-disc list-inside space-y-1">
                    {result.steps.map((step, index) => (
                      <li key={index} className="text-gray-700 font-mono text-xs">{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}

