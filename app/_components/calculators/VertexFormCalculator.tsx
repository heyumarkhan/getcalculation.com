'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface VertexFormCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface VertexFormResult {
  standardForm: string;
  vertexForm: string;
  vertex: { x: number; y: number };
  a: number;
  h: number;
  k: number;
  steps: string[];
  explanation: string;
}

export default function VertexFormCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: VertexFormCalculatorProps) {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [result, setResult] = useState<VertexFormResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001 && Math.abs(value) > 0) {
      return value.toFixed(6);
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

  const formatCoefficient = (value: number, variable: string = ''): string => {
    if (value === 1 && variable) {
      return variable;
    }
    if (value === -1 && variable) {
      return `-${variable}`;
    }
    return `${formatValue(value)}${variable}`;
  };

  const formatEquationTerm = (value: number, sign: string = ''): string => {
    if (Math.abs(value) < 0.0001) {
      return '';
    }
    const formatted = formatValue(Math.abs(value));
    if (sign === '') {
      return value >= 0 ? formatted : `-${formatted}`;
    }
    return value >= 0 ? ` + ${formatted}` : ` - ${formatted}`;
  };

  const calculateVertexForm = () => {
    const aVal = parseFloat(a);
    const bVal = parseFloat(b) || 0;
    const cVal = parseFloat(c) || 0;

    if (isNaN(aVal) || aVal === 0) {
      alert('Coefficient "a" must be a non-zero number for a quadratic equation');
      return;
    }

    // Standard form: y = ax² + bx + c
    let standardForm = '';
    if (aVal === 1) {
      standardForm = `y = x²${formatEquationTerm(bVal)}x${formatEquationTerm(cVal)}`;
    } else if (aVal === -1) {
      standardForm = `y = -x²${formatEquationTerm(bVal)}x${formatEquationTerm(cVal)}`;
    } else {
      standardForm = `y = ${formatValue(aVal)}x²${formatEquationTerm(bVal)}x${formatEquationTerm(cVal)}`;
    }
    
    // Calculate vertex coordinates: h = -b/(2a), k = c - b²/(4a)
    const h = -bVal / (2 * aVal);
    const k = cVal - (bVal * bVal) / (4 * aVal);

    // Build vertex form: y = a(x - h)² + k
    let vertexForm = '';
    const hFormatted = formatValue(h);
    const kFormatted = formatValue(k);
    
    if (aVal === 1) {
      if (h >= 0) {
        vertexForm = `y = (x - ${hFormatted})²${formatEquationTerm(k)}`;
      } else {
        vertexForm = `y = (x + ${Math.abs(h)})²${formatEquationTerm(k)}`;
      }
    } else if (aVal === -1) {
      if (h >= 0) {
        vertexForm = `y = -(x - ${hFormatted})²${formatEquationTerm(k)}`;
      } else {
        vertexForm = `y = -(x + ${Math.abs(h)})²${formatEquationTerm(k)}`;
      }
    } else {
      if (h >= 0) {
        vertexForm = `y = ${formatValue(aVal)}(x - ${hFormatted})²${formatEquationTerm(k)}`;
      } else {
        vertexForm = `y = ${formatValue(aVal)}(x + ${Math.abs(h)})²${formatEquationTerm(k)}`;
      }
    }

    // Generate steps for completing the square
    const steps: string[] = [];
    steps.push(`Starting with standard form: ${standardForm}`);
    steps.push(`Step 1: Identify coefficients: a = ${formatValue(aVal)}, b = ${formatValue(bVal)}, c = ${formatValue(cVal)}`);
    steps.push(`Step 2: Calculate h (x-coordinate of vertex): h = -b/(2a) = -(${formatValue(bVal)})/(2×${formatValue(aVal)}) = ${formatValue(h)}`);
    
    const bSquared = bVal * bVal;
    const fourA = 4 * aVal;
    steps.push(`Step 3: Calculate k (y-coordinate of vertex): k = c - b²/(4a) = ${formatValue(cVal)} - (${formatValue(bVal)})²/(4×${formatValue(aVal)})`);
    steps.push(`Step 4: Simplify: k = ${formatValue(cVal)} - ${formatValue(bSquared)}/${formatValue(fourA)} = ${formatValue(k)}`);
    steps.push(`Step 5: Vertex form: y = ${formatValue(aVal)}(x - ${formatValue(h)})² + ${formatValue(k)}`);
    steps.push(`Step 6: Final vertex form: ${vertexForm}`);

    let explanation = '';
    if (aVal > 0) {
      explanation = `The parabola opens upward with vertex at (${formatValue(h)}, ${formatValue(k)}).`;
    } else {
      explanation = `The parabola opens downward with vertex at (${formatValue(h)}, ${formatValue(k)}).`;
    }

    setResult({
      standardForm,
      vertexForm,
      vertex: { x: h, y: k },
      a: aVal,
      h,
      k,
      steps,
      explanation
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vertex Form Calculator</h2>
            <p className="text-gray-600 mb-6">Convert quadratic equations from standard form to vertex form:</p>
          </>
        )}
      
      <div className="space-y-4">
        {/* Standard Form Input */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Standard Form: y = ax² + bx + c</h3>
          <div className="space-y-3">
            <Input
              label="a (coefficient of x²)"
              type="text"
              value={a}
              onChange={(e) => setA(e.target.value)}
              placeholder="Enter coefficient a"
              autoFocus
            />
            <Input
              label="b (coefficient of x)"
              type="text"
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder="Enter coefficient b"
            />
            <Input
              label="c (constant term)"
              type="text"
              value={c}
              onChange={(e) => setC(e.target.value)}
              placeholder="Enter constant c"
            />
          </div>
        </div>

        <Button 
          onClick={calculateVertexForm}
          className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
          style={colors.customStyles?.button}
          size="lg"
        >
          Convert to Vertex Form
        </Button>

        {result !== null && (
          <div 
            className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md animate-fadeIn`}
            style={colors.customStyles?.resultBg}
          >
            <h3 
              className={`text-lg font-semibold ${colors.resultText} mb-4`}
              style={colors.customStyles?.resultText}
            >
              Conversion Results
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-2">Standard Form:</p>
                <p className="font-mono text-lg">{result.standardForm}</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-2">Vertex Form:</p>
                <p className="font-mono text-lg font-bold" style={colors.customStyles?.resultText}>{result.vertexForm}</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-2">Vertex (h, k):</p>
                <p className="font-mono text-xl">({formatValue(result.vertex.x)}, {formatValue(result.vertex.y)})</p>
                <p className="text-sm text-gray-600 mt-1">{result.explanation}</p>
              </div>

              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-2">Step-by-Step Conversion:</p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  {result.steps.map((step, index) => (
                    <li key={index} className="pl-2">{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
      </Card>
    </>
  );
}

