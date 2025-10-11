'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface ProportionCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

type ProportionType = 'solve-for-x' | 'check-proportion' | 'scale-factor';

export default function ProportionCalculator({ 
  showTitle = true, 
  primaryColor = '#10B981' 
}: ProportionCalculatorProps) {
  const [proportionType, setProportionType] = useState<ProportionType>('solve-for-x');
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [d, setD] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [calculationSteps, setCalculationSteps] = useState<string[]>([]);
  const [isProportional, setIsProportional] = useState<boolean | null>(null);

  const calculateProportion = () => {
    const aVal = parseFloat(a) || 0;
    const bVal = parseFloat(b) || 0;
    const cVal = parseFloat(c) || 0;
    const dVal = parseFloat(d) || 0;
    
    const steps: string[] = [];
    let calculatedResult = 0;
    let proportional = false;

    if (proportionType === 'solve-for-x') {
      if (aVal !== 0 && bVal !== 0) {
        // Solve for x in a/b = c/x or a/b = x/c
        if (cVal !== 0) {
          // a/b = c/x, so x = (b * c) / a
          calculatedResult = (bVal * cVal) / aVal;
          steps.push(`Given proportion: ${a}/${b} = ${c}/x`);
          steps.push(`Cross multiply: ${a} × x = ${b} × ${c}`);
          steps.push(`${a} × x = ${bVal * cVal}`);
          steps.push(`x = ${bVal * cVal} ÷ ${a}`);
          steps.push(`x = ${calculatedResult}`);
        } else if (dVal !== 0) {
          // a/b = x/d, so x = (a * d) / b
          calculatedResult = (aVal * dVal) / bVal;
          steps.push(`Given proportion: ${a}/${b} = x/${d}`);
          steps.push(`Cross multiply: ${a} × ${d} = ${b} × x`);
          steps.push(`${aVal * dVal} = ${b} × x`);
          steps.push(`x = ${aVal * dVal} ÷ ${b}`);
          steps.push(`x = ${calculatedResult}`);
        }
      }
    } else if (proportionType === 'check-proportion') {
      if (aVal !== 0 && bVal !== 0 && cVal !== 0 && dVal !== 0) {
        // Check if a/b = c/d
        const leftRatio = aVal / bVal;
        const rightRatio = cVal / dVal;
        proportional = Math.abs(leftRatio - rightRatio) < 0.0001;
        
        steps.push(`Checking if ${a}/${b} = ${c}/${d}`);
        steps.push(`Left side: ${a} ÷ ${b} = ${leftRatio.toFixed(6)}`);
        steps.push(`Right side: ${c} ÷ ${d} = ${rightRatio.toFixed(6)}`);
        steps.push(`Difference: ${Math.abs(leftRatio - rightRatio).toFixed(6)}`);
        steps.push(`Proportional: ${proportional ? 'Yes' : 'No'}`);
      }
    } else if (proportionType === 'scale-factor') {
      if (aVal !== 0 && bVal !== 0) {
        // Calculate scale factor from a to b
        calculatedResult = bVal / aVal;
        steps.push(`Scale factor from ${a} to ${b}`);
        steps.push(`Scale factor = ${b} ÷ ${a}`);
        steps.push(`Scale factor = ${calculatedResult}`);
        
        if (cVal !== 0) {
          // Apply scale factor to c
          const scaledC = cVal * calculatedResult;
          steps.push(`Applying scale factor to ${c}:`);
          steps.push(`${c} × ${calculatedResult} = ${scaledC}`);
          calculatedResult = scaledC;
        }
      }
    }

    setResult(calculatedResult);
    setIsProportional(proportional);
    setCalculationSteps(steps);
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'a':
        setA(value);
        break;
      case 'b':
        setB(value);
        break;
      case 'c':
        setC(value);
        break;
      case 'd':
        setD(value);
        break;
      default:
        break;
    }
  };

  const getColorClasses = (color: string) => {
    // Add # if it's missing
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
          backgroundColor: `${hexColor}10`, // 10% opacity
          borderColor: `${hexColor}30` // 30% opacity
        } as React.CSSProperties,
        resultText: {
          color: hexColor
        } as React.CSSProperties
      }
    };
  };

  const colors = getColorClasses(primaryColor);

  const getInputLabels = () => {
    switch (proportionType) {
      case 'solve-for-x':
        return {
          a: 'a',
          b: 'b', 
          c: 'c',
          d: 'd (leave empty if solving for x in a/b = c/x)'
        };
      case 'check-proportion':
        return {
          a: 'a',
          b: 'b',
          c: 'c', 
          d: 'd'
        };
      case 'scale-factor':
        return {
          a: 'Original value',
          b: 'Scaled value',
          c: 'Value to scale (optional)',
          d: 'd (not used)'
        };
      default:
        return { a: 'a', b: 'b', c: 'c', d: 'd' };
    }
  };

  const labels = getInputLabels();

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
          `
        }} />
      )}
      <Card className="max-w-2xl mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Proportion Calculator</h2>
            <p className="text-gray-600 mb-6">Solve proportions, check if ratios are proportional, or calculate scale factors with step-by-step solutions.</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Proportion Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Type</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <button
                onClick={() => setProportionType('solve-for-x')}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  proportionType === 'solve-for-x'
                    ? 'bg-green-100 border-green-300 text-green-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Solve for x
              </button>
              <button
                onClick={() => setProportionType('check-proportion')}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  proportionType === 'check-proportion'
                    ? 'bg-green-100 border-green-300 text-green-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Check Proportion
              </button>
              <button
                onClick={() => setProportionType('scale-factor')}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  proportionType === 'scale-factor'
                    ? 'bg-green-100 border-green-300 text-green-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Scale Factor
              </button>
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={labels.a}
              type="text"
              value={a}
              onChange={(e) => handleInputChange('a', e.target.value)}
              placeholder="Enter value"
              autoFocus
            />

            <Input
              label={labels.b}
              type="text"
              value={b}
              onChange={(e) => handleInputChange('b', e.target.value)}
              placeholder="Enter value"
            />

            <Input
              label={labels.c}
              type="text"
              value={c}
              onChange={(e) => handleInputChange('c', e.target.value)}
              placeholder="Enter value"
            />

            <Input
              label={labels.d}
              type="text"
              value={d}
              onChange={(e) => handleInputChange('d', e.target.value)}
              placeholder="Enter value"
              disabled={proportionType === 'scale-factor'}
            />
          </div>

          <Button 
            onClick={calculateProportion}
            className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            {proportionType === 'solve-for-x' ? 'Solve for x' : 
             proportionType === 'check-proportion' ? 'Check Proportion' : 
             'Calculate Scale Factor'}
          </Button>

          {(result !== null || isProportional !== null) && (
            <div 
              className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md`}
              style={colors.customStyles?.resultBg}
            >
              <h3 
                className={`text-lg font-semibold ${colors.resultText} mb-3`}
                style={colors.customStyles?.resultText}
              >
                Result
              </h3>
              
              {proportionType === 'check-proportion' ? (
                <p 
                  className={`text-2xl font-bold ${colors.result} mb-4`}
                  style={colors.customStyles?.result}
                >
                  {isProportional ? '✓ Proportional' : '✗ Not Proportional'}
                </p>
              ) : (
                <p 
                  className={`text-2xl font-bold ${colors.result} mb-4`}
                  style={colors.customStyles?.result}
                >
                  {proportionType === 'solve-for-x' ? `x = ${result}` : 
                   proportionType === 'scale-factor' ? `Result = ${result}` : 
                   result}
                </p>
              )}
              
              {calculationSteps.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Calculation Steps:</h4>
                  <div className="space-y-1">
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
        </div>
      </Card>
    </>
  );
}
