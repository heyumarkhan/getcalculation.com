'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface SumOfSeriesCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

type SeriesType = 'arithmetic' | 'geometric' | 'custom';

export default function SumOfSeriesCalculator({ 
  showTitle = true, 
  primaryColor = '#8B5CF6' 
}: SumOfSeriesCalculatorProps) {
  const [seriesType, setSeriesType] = useState<SeriesType>('arithmetic');
  const [firstTerm, setFirstTerm] = useState<string>('');
  const [commonDifference, setCommonDifference] = useState<string>('');
  const [commonRatio, setCommonRatio] = useState<string>('');
  const [numberOfTerms, setNumberOfTerms] = useState<string>('');
  const [lastTerm, setLastTerm] = useState<string>('');
  const [customTerms, setCustomTerms] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [calculationSteps, setCalculationSteps] = useState<string[]>([]);

  const calculateSum = () => {
    const a = parseFloat(firstTerm) || 0;
    const n = parseInt(numberOfTerms) || 0;
    const d = parseFloat(commonDifference) || 0;
    const r = parseFloat(commonRatio) || 0;
    
    let sum = 0;
    const steps: string[] = [];

    if (seriesType === 'arithmetic') {
      if (n > 0) {
        // Using formula: S = n/2 * (2a + (n-1)d)
        sum = (n / 2) * (2 * a + (n - 1) * d);
        steps.push(`Arithmetic series: a₁ = ${a}, d = ${d}, n = ${n}`);
        steps.push(`Formula: S = n/2 × (2a + (n-1)d)`);
        steps.push(`S = ${n}/2 × (2(${a}) + (${n}-1)(${d}))`);
        steps.push(`S = ${n}/2 × (${2 * a} + ${(n - 1) * d})`);
        steps.push(`S = ${n}/2 × ${2 * a + (n - 1) * d}`);
        steps.push(`S = ${n / 2} × ${2 * a + (n - 1) * d} = ${sum}`);
      }
    } else if (seriesType === 'geometric') {
      if (n > 0 && r !== 1) {
        // Using formula: S = a * (r^n - 1) / (r - 1)
        const rn = Math.pow(r, n);
        sum = a * (rn - 1) / (r - 1);
        steps.push(`Geometric series: a₁ = ${a}, r = ${r}, n = ${n}`);
        steps.push(`Formula: S = a × (rⁿ - 1) / (r - 1)`);
        steps.push(`S = ${a} × (${r}^${n} - 1) / (${r} - 1)`);
        steps.push(`S = ${a} × (${rn} - 1) / ${r - 1}`);
        steps.push(`S = ${a} × ${rn - 1} / ${r - 1}`);
        steps.push(`S = ${a * (rn - 1)} / ${r - 1} = ${sum}`);
      } else if (r === 1) {
        // Special case: r = 1
        sum = a * n;
        steps.push(`Geometric series with r = 1: a₁ = ${a}, n = ${n}`);
        steps.push(`When r = 1: S = a × n`);
        steps.push(`S = ${a} × ${n} = ${sum}`);
      }
    } else if (seriesType === 'custom') {
      const terms = customTerms.split(',').map(term => parseFloat(term.trim())).filter(term => !isNaN(term));
      if (terms.length > 0) {
        sum = terms.reduce((acc, term) => acc + term, 0);
        steps.push(`Custom series: ${terms.join(', ')}`);
        steps.push(`Sum = ${terms.join(' + ')}`);
        steps.push(`Sum = ${sum}`);
      }
    }

    setResult(sum);
    setCalculationSteps(steps);
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'firstTerm':
        setFirstTerm(value);
        break;
      case 'commonDifference':
        setCommonDifference(value);
        break;
      case 'commonRatio':
        setCommonRatio(value);
        break;
      case 'numberOfTerms':
        setNumberOfTerms(value);
        break;
      case 'lastTerm':
        setLastTerm(value);
        break;
      case 'customTerms':
        setCustomTerms(value);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sum of Series Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the sum of arithmetic, geometric, or custom series with step-by-step solutions.</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Series Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Series Type</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <button
                onClick={() => setSeriesType('arithmetic')}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  seriesType === 'arithmetic'
                    ? 'bg-purple-100 border-purple-300 text-purple-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Arithmetic
              </button>
              <button
                onClick={() => setSeriesType('geometric')}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  seriesType === 'geometric'
                    ? 'bg-purple-100 border-purple-300 text-purple-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Geometric
              </button>
              <button
                onClick={() => setSeriesType('custom')}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  seriesType === 'custom'
                    ? 'bg-purple-100 border-purple-300 text-purple-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Custom
              </button>
            </div>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            {seriesType === 'arithmetic' && (
              <>
                <Input
                  label="First Term (a₁)"
                  type="text"
                  value={firstTerm}
                  onChange={(e) => handleInputChange('firstTerm', e.target.value)}
                  placeholder="Enter first term"
                  autoFocus
                />
                <Input
                  label="Common Difference (d)"
                  type="text"
                  value={commonDifference}
                  onChange={(e) => handleInputChange('commonDifference', e.target.value)}
                  placeholder="Enter common difference"
                />
                <Input
                  label="Number of Terms (n)"
                  type="text"
                  value={numberOfTerms}
                  onChange={(e) => handleInputChange('numberOfTerms', e.target.value)}
                  placeholder="Enter number of terms"
                />
              </>
            )}

            {seriesType === 'geometric' && (
              <>
                <Input
                  label="First Term (a₁)"
                  type="text"
                  value={firstTerm}
                  onChange={(e) => handleInputChange('firstTerm', e.target.value)}
                  placeholder="Enter first term"
                  autoFocus
                />
                <Input
                  label="Common Ratio (r)"
                  type="text"
                  value={commonRatio}
                  onChange={(e) => handleInputChange('commonRatio', e.target.value)}
                  placeholder="Enter common ratio"
                />
                <Input
                  label="Number of Terms (n)"
                  type="text"
                  value={numberOfTerms}
                  onChange={(e) => handleInputChange('numberOfTerms', e.target.value)}
                  placeholder="Enter number of terms"
                />
              </>
            )}

            {seriesType === 'custom' && (
              <Input
                label="Terms (comma-separated)"
                type="text"
                value={customTerms}
                onChange={(e) => handleInputChange('customTerms', e.target.value)}
                placeholder="e.g., 1, 3, 5, 7, 9"
                autoFocus
              />
            )}
          </div>

          <Button 
            onClick={calculateSum}
            className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate Sum
          </Button>

          {result !== null && (
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
              <p 
                className={`text-2xl font-bold ${colors.result} mb-4`}
                style={colors.customStyles?.result}
              >
                Sum = {result}
              </p>
              
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
