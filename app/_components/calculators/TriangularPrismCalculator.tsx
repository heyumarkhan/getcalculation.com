'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface TriangularPrismCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface TriangularPrismResult {
  baseArea: number;
  lateralArea: number;
  totalSurfaceArea: number;
  basePerimeter: number;
  volume: number;
}

export default function TriangularPrismCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: TriangularPrismCalculatorProps) {
  const [baseLength, setBaseLength] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [prismHeight, setPrismHeight] = useState<string>('');
  const [result, setResult] = useState<TriangularPrismResult | null>(null);

  const calculateSurfaceArea = () => {
    const base = parseFloat(baseLength) || 0;
    const h = parseFloat(height) || 0;
    const prismH = parseFloat(prismHeight) || 0;

    if (base <= 0 || h <= 0 || prismH <= 0) {
      alert('All dimensions must be greater than zero');
      return;
    }

    // Calculate base area (area of triangular base)
    const baseArea = (base * h) / 2;
    
    // Calculate base perimeter (assuming equilateral triangle for simplicity)
    // For a general triangle, we'd need all three sides, but we'll use base as approximation
    const basePerimeter = base * 3; // Assuming equilateral triangle
    
    // Calculate lateral surface area (perimeter of base × height of prism)
    const lateralArea = basePerimeter * prismH;
    
    // Calculate total surface area (2 × base area + lateral area)
    const totalSurfaceArea = (2 * baseArea) + lateralArea;
    
    // Calculate volume (base area × height of prism)
    const volume = baseArea * prismH;

    setResult({
      baseArea,
      lateralArea,
      totalSurfaceArea,
      basePerimeter,
      volume
    });
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'baseLength':
        setBaseLength(value);
        break;
      case 'height':
        setHeight(value);
        break;
      case 'prismHeight':
        setPrismHeight(value);
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
      <Card className="max-w-md mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Triangular Prism Surface Area Calculator</h2>
            <p className="text-gray-600 mb-6">Enter the dimensions of your triangular prism:</p>
          </>
        )}
      
      <div className="space-y-4">
        {/* Base Triangle Dimensions */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Base Triangle Dimensions</h3>
          <div className="space-y-3">
            <Input
              label="Base Length (b)"
              type="number"
              value={baseLength}
              onChange={(e) => handleInputChange('baseLength', e.target.value)}
              placeholder="Enter base length"
              min="0"
              step="0.01"
            />
            <Input
              label="Height (h)"
              type="number"
              value={height}
              onChange={(e) => handleInputChange('height', e.target.value)}
              placeholder="Enter triangle height"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {/* Prism Height */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Prism Dimensions</h3>
          <Input
            label="Prism Height (H)"
            type="number"
            value={prismHeight}
            onChange={(e) => handleInputChange('prismHeight', e.target.value)}
            placeholder="Enter prism height"
            min="0"
            step="0.01"
          />
        </div>

        <Button 
          onClick={calculateSurfaceArea}
          className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
          style={colors.customStyles?.button}
          size="lg"
        >
          Calculate Surface Area
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
              Surface Area Results
            </h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Base Area:</p>
                <p className="font-mono text-lg font-bold">{result.baseArea.toFixed(4)} square units</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Lateral Surface Area:</p>
                <p className="font-mono text-lg font-bold">{result.lateralArea.toFixed(4)} square units</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Total Surface Area:</p>
                <p className="font-mono text-xl font-bold">{result.totalSurfaceArea.toFixed(4)} square units</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Base Perimeter:</p>
                <p className="font-mono">{result.basePerimeter.toFixed(4)} units</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Volume (Bonus):</p>
                <p className="font-mono">{result.volume.toFixed(4)} cubic units</p>
              </div>
            </div>
          </div>
        )}
      </div>
      </Card>
    </>
  );
}
