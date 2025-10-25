'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface SimilarTrianglesCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface SimilarTrianglesResult {
  missingSide: number;
  scaleFactor: number;
  proportion: string;
  calculation: string;
}

export default function SimilarTrianglesCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: SimilarTrianglesCalculatorProps) {
  const [triangle1Side1, setTriangle1Side1] = useState<string>('');
  const [triangle1Side2, setTriangle1Side2] = useState<string>('');
  const [triangle2Side1, setTriangle2Side1] = useState<string>('');
  const [triangle2Side2, setTriangle2Side2] = useState<string>('');
  const [result, setResult] = useState<SimilarTrianglesResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const calculateSimilarTriangles = () => {
    const t1s1 = parseFloat(triangle1Side1) || 0;
    const t1s2 = parseFloat(triangle1Side2) || 0;
    const t2s1 = parseFloat(triangle2Side1) || 0;
    const t2s2 = parseFloat(triangle2Side2) || 0;

    // Check if we have the minimum required inputs (3 out of 4)
    const inputs = [t1s1, t1s2, t2s1, t2s2];
    const validInputs = inputs.filter(val => val > 0);
    
    if (validInputs.length < 3) {
      alert('Please enter at least 3 sides (leave one empty to calculate)');
      return;
    }

    if (t1s1 <= 0 || t1s2 <= 0 || t2s1 <= 0) {
      alert('Triangle 1 sides and Triangle 2 Side A are required');
      return;
    }

    // Calculate scale factor from known corresponding sides
    const scaleFactor = t2s1 / t1s1;
    
    // Calculate missing side using proportion
    const missingSide = t1s2 * scaleFactor;
    
    // Create proportion string (correct format)
    const proportion = `${t1s1}/${t2s1} = ${t1s2}/${missingSide.toFixed(4)}`;
    
    // Create calculation string
    const calculation = `${t1s2} × (${t2s1}/${t1s1}) = ${missingSide.toFixed(4)}`;

    setResult({
      missingSide,
      scaleFactor,
      proportion,
      calculation
    });
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'triangle1Side1':
        setTriangle1Side1(value);
        break;
      case 'triangle1Side2':
        setTriangle1Side2(value);
        break;
      case 'triangle2Side1':
        setTriangle2Side1(value);
        break;
      case 'triangle2Side2':
        setTriangle2Side2(value);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Similar Triangles Calculator</h2>
            <p className="text-gray-600 mb-6">Find missing sides of similar triangles using proportions:</p>
          </>
        )}
      
      <div className="space-y-4">
        {/* Triangle 1 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Triangle 1 (Reference)</h3>
          <div className="space-y-3">
            <Input
              label="Side A"
              type="number"
              value={triangle1Side1}
              onChange={(e) => handleInputChange('triangle1Side1', e.target.value)}
              placeholder="Enter side A"
              min="0"
              step="0.01"
            />
            <Input
              label="Side B"
              type="number"
              value={triangle1Side2}
              onChange={(e) => handleInputChange('triangle1Side2', e.target.value)}
              placeholder="Enter side B"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {/* Triangle 2 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Triangle 2 (Similar)</h3>
          <div className="space-y-3">
            <Input
              label="Side A (corresponding to Triangle 1 Side A)"
              type="number"
              value={triangle2Side1}
              onChange={(e) => handleInputChange('triangle2Side1', e.target.value)}
              placeholder="Enter corresponding side A"
              min="0"
              step="0.01"
            />
            <Input
              label="Side B (leave empty to calculate)"
              type="number"
              value={triangle2Side2}
              onChange={(e) => handleInputChange('triangle2Side2', e.target.value)}
              placeholder="Leave empty to calculate missing side"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <Button 
          onClick={calculateSimilarTriangles}
          className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
          style={colors.customStyles?.button}
          size="lg"
        >
          Calculate Missing Side
        </Button>

        {result !== null && (
          <div 
            className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md`}
            style={colors.customStyles?.resultBg}
          >
            <h3 
              className={`text-lg font-semibold ${colors.resultText} mb-4`}
              style={colors.customStyles?.resultText}
            >
              Similar Triangles Result
            </h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Missing Side B:</p>
                <p className="font-mono text-2xl font-bold">{formatValue(result.missingSide)} units</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Scale Factor:</p>
                <p className="font-mono text-lg">{formatValue(result.scaleFactor)}</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Proportion:</p>
                <p className="font-mono text-lg">{result.proportion}</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Calculation:</p>
                <p className="font-mono text-sm">{result.calculation}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      </Card>
    </>
  );
}
