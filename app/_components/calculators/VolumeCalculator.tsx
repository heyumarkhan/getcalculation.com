'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface VolumeCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface VolumeResult {
  volume: number;
  shape: string;
  formula: string;
  dimensions: string;
}

export default function VolumeCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: VolumeCalculatorProps) {
  const [selectedShape, setSelectedShape] = useState<'rectangular-prism' | 'triangular-pyramid'>('rectangular-prism');
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [baseLength, setBaseLength] = useState<string>('');
  const [baseHeight, setBaseHeight] = useState<string>('');
  const [pyramidHeight, setPyramidHeight] = useState<string>('');
  const [result, setResult] = useState<VolumeResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const calculateVolume = () => {
    let volume: number;
    let formula: string;
    let dimensions: string;

    if (selectedShape === 'rectangular-prism') {
      const l = parseFloat(length) || 0;
      const w = parseFloat(width) || 0;
      const h = parseFloat(height) || 0;

      if (l <= 0 || w <= 0 || h <= 0) {
        alert('All dimensions must be greater than zero');
        return;
      }

      volume = l * w * h;
      formula = 'V = l × w × h';
      dimensions = `${l} × ${w} × ${h}`;
    } else {
      const base = parseFloat(baseLength) || 0;
      const baseH = parseFloat(baseHeight) || 0;
      const pyramidH = parseFloat(pyramidHeight) || 0;

      if (base <= 0 || baseH <= 0 || pyramidH <= 0) {
        alert('All dimensions must be greater than zero');
        return;
      }

      const baseArea = (base * baseH) / 2;
      volume = (baseArea * pyramidH) / 3;
      formula = 'V = (1/3) × Base Area × Height';
      dimensions = `Base: ${base} × ${baseH}, Height: ${pyramidH}`;
    }

    setResult({
      volume,
      shape: selectedShape === 'rectangular-prism' ? 'Rectangular Prism' : 'Triangular Pyramid',
      formula,
      dimensions
    });
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'length':
        setLength(value);
        break;
      case 'width':
        setWidth(value);
        break;
      case 'height':
        setHeight(value);
        break;
      case 'baseLength':
        setBaseLength(value);
        break;
      case 'baseHeight':
        setBaseHeight(value);
        break;
      case 'pyramidHeight':
        setPyramidHeight(value);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Volume Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate volume for different 3D shapes:</p>
          </>
        )}
      
      <div className="space-y-4">
        {/* Shape Selector */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Shape</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => setSelectedShape('rectangular-prism')}
              variant={selectedShape === 'rectangular-prism' ? 'primary' : 'outline'}
              className="w-full"
            >
              📦 Rectangular Prism
            </Button>
            <Button
              onClick={() => setSelectedShape('triangular-pyramid')}
              variant={selectedShape === 'triangular-pyramid' ? 'primary' : 'outline'}
              className="w-full"
            >
              🔺 Triangular Pyramid
            </Button>
          </div>
        </div>

        {/* Input Fields */}
        {selectedShape === 'rectangular-prism' ? (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Rectangular Prism Dimensions</h3>
            <div className="space-y-3">
              <Input
                label="Length (l)"
                type="text"
                value={length}
                onChange={(e) => handleInputChange('length', e.target.value)}
                placeholder="Enter length"
                autoFocus
              />
              <Input
                label="Width (w)"
                type="text"
                value={width}
                onChange={(e) => handleInputChange('width', e.target.value)}
                placeholder="Enter width"
              />
              <Input
                label="Height (h)"
                type="text"
                value={height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                placeholder="Enter height"
              />
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Triangular Pyramid Dimensions</h3>
            <div className="space-y-3">
              <Input
                label="Base Length (b)"
                type="text"
                value={baseLength}
                onChange={(e) => handleInputChange('baseLength', e.target.value)}
                placeholder="Enter base length"
              />
              <Input
                label="Base Height (h)"
                type="text"
                value={baseHeight}
                onChange={(e) => handleInputChange('baseHeight', e.target.value)}
                placeholder="Enter base height"
              />
              <Input
                label="Pyramid Height (H)"
                type="text"
                value={pyramidHeight}
                onChange={(e) => handleInputChange('pyramidHeight', e.target.value)}
                placeholder="Enter pyramid height"
              />
            </div>
          </div>
        )}

        <Button 
          onClick={calculateVolume}
          className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
          style={colors.customStyles?.button}
          size="lg"
        >
          Calculate Volume
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
              Volume Result
            </h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Shape:</p>
                <p className="font-mono">{result.shape}</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Volume:</p>
                <p className="font-mono text-2xl font-bold">{formatValue(result.volume)} cubic units</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Formula Used:</p>
                <p className="font-mono text-lg">{result.formula}</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Dimensions:</p>
                <p className="font-mono">{result.dimensions}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      </Card>
    </>
  );
}