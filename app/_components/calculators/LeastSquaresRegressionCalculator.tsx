'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface LeastSquaresRegressionCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface DataPoint {
  x: number;
  y: number;
}

interface RegressionResult {
  slope: number;
  intercept: number;
  correlation: number;
  rSquared: number;
  equation: string;
  interpretation: string;
  prediction?: number;
}

export default function LeastSquaresRegressionCalculator({ 
  showTitle = true, 
  primaryColor = '#3399CC' 
}: LeastSquaresRegressionCalculatorProps) {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 5 },
    { x: 4, y: 7 },
    { x: 5, y: 8 }
  ]);
  const [predictionX, setPredictionX] = useState<string>('');
  const [result, setResult] = useState<RegressionResult | null>(null);

  const calculateRegression = () => {
    if (dataPoints.length < 2) {
      alert('Please enter at least 2 data points');
      return;
    }

    const n = dataPoints.length;
    
    // Calculate means
    const meanX = dataPoints.reduce((sum, point) => sum + point.x, 0) / n;
    const meanY = dataPoints.reduce((sum, point) => sum + point.y, 0) / n;
    
    // Calculate slope (m) using least squares formula
    // m = Σ((x - x̄)(y - ȳ)) / Σ((x - x̄)²)
    const numerator = dataPoints.reduce((sum, point) => 
      sum + (point.x - meanX) * (point.y - meanY), 0);
    const denominator = dataPoints.reduce((sum, point) => 
      sum + Math.pow(point.x - meanX, 2), 0);
    
    if (denominator === 0) {
      alert('Cannot calculate regression: all x-values are the same');
      return;
    }
    
    const slope = numerator / denominator;
    
    // Calculate intercept (b) using y = mx + b
    // b = ȳ - m * x̄
    const intercept = meanY - slope * meanX;
    
    // Calculate correlation coefficient (r)
    const sumSquaredX = dataPoints.reduce((sum, point) => sum + Math.pow(point.x - meanX, 2), 0);
    const sumSquaredY = dataPoints.reduce((sum, point) => sum + Math.pow(point.y - meanY, 2), 0);
    const correlation = numerator / Math.sqrt(sumSquaredX * sumSquaredY);
    
    // Calculate R-squared
    const rSquared = Math.pow(correlation, 2);
    
    // Generate equation
    let equation: string;
    if (intercept === 0) {
      equation = `y = ${slope.toFixed(4)}x`;
    } else if (intercept > 0) {
      equation = `y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`;
    } else {
      equation = `y = ${slope.toFixed(4)}x - ${Math.abs(intercept).toFixed(4)}`;
    }
    
    // Interpretation
    let interpretation: string;
    if (Math.abs(correlation) >= 0.9) {
      interpretation = 'Very strong correlation';
    } else if (Math.abs(correlation) >= 0.7) {
      interpretation = 'Strong correlation';
    } else if (Math.abs(correlation) >= 0.5) {
      interpretation = 'Moderate correlation';
    } else if (Math.abs(correlation) >= 0.3) {
      interpretation = 'Weak correlation';
    } else {
      interpretation = 'Very weak correlation';
    }
    
    if (correlation > 0) {
      interpretation += ' (positive relationship)';
    } else if (correlation < 0) {
      interpretation += ' (negative relationship)';
    } else {
      interpretation += ' (no linear relationship)';
    }
    
    // Calculate prediction if x value is provided
    let prediction: number | undefined;
    if (predictionX && !isNaN(parseFloat(predictionX))) {
      prediction = slope * parseFloat(predictionX) + intercept;
    }
    
    setResult({
      slope,
      intercept,
      correlation,
      rSquared,
      equation,
      interpretation,
      prediction
    });
  };

  const handleDataPointChange = (index: number, field: 'x' | 'y', value: string) => {
    const newDataPoints = [...dataPoints];
    newDataPoints[index] = {
      ...newDataPoints[index],
      [field]: parseFloat(value) || 0
    };
    setDataPoints(newDataPoints);
  };

  const addDataPoint = () => {
    setDataPoints([...dataPoints, { x: 0, y: 0 }]);
  };

  const removeDataPoint = (index: number) => {
    if (dataPoints.length > 2) {
      const newDataPoints = dataPoints.filter((_, i) => i !== index);
      setDataPoints(newDataPoints);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Least Squares Regression Calculator</h2>
            <p className="text-gray-600 mb-6">Enter data points to find the best-fit line using least squares method:</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Data Points */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Data Points</h3>
              <Button 
                onClick={addDataPoint}
                size="sm"
                className="bg-green-500 hover:bg-green-600"
              >
                Add Point
              </Button>
            </div>
            
            <div className="space-y-3">
              {dataPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-3 rounded border">
                  <span className="text-sm font-medium text-gray-600 w-8">#{index + 1}</span>
                  <Input
                    label="x"
                    type="number"
                    value={point.x.toString()}
                    onChange={(e) => handleDataPointChange(index, 'x', e.target.value)}
                    placeholder="x value"
                    step="0.01"
                    className="flex-1"
                  />
                  <Input
                    label="y"
                    type="number"
                    value={point.y.toString()}
                    onChange={(e) => handleDataPointChange(index, 'y', e.target.value)}
                    placeholder="y value"
                    step="0.01"
                    className="flex-1"
                  />
                  {dataPoints.length > 2 && (
                    <Button 
                      onClick={() => removeDataPoint(index)}
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1"
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Prediction Input */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Prediction (Optional)</h3>
            <Input
              label="Predict y for x ="
              type="number"
              value={predictionX}
              onChange={(e) => setPredictionX(e.target.value)}
              placeholder="Enter x value to predict y"
              step="0.01"
            />
          </div>

          <Button 
            onClick={calculateRegression}
            className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate Regression
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
                Regression Analysis
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-1">Regression Equation:</p>
                  <p className="font-mono text-lg font-bold">{result.equation}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-gray-700 mb-1">Slope (m):</p>
                    <p className="font-mono text-xl font-bold">{result.slope.toFixed(6)}</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-gray-700 mb-1">Intercept (b):</p>
                    <p className="font-mono text-xl font-bold">{result.intercept.toFixed(6)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-gray-700 mb-1">Correlation (r):</p>
                    <p className="font-mono text-lg">{result.correlation.toFixed(6)}</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-gray-700 mb-1">R-squared (r²):</p>
                    <p className="font-mono text-lg">{(result.rSquared * 100).toFixed(2)}%</p>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-1">Interpretation:</p>
                  <p className="font-mono">{result.interpretation}</p>
                </div>
                
                {result.prediction !== undefined && (
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-gray-700 mb-1">
                      Prediction for x = {predictionX}:
                    </p>
                    <p className="font-mono text-lg font-bold">y = {result.prediction.toFixed(6)}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
