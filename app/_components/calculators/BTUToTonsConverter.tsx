'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type ConversionMode = 'btuToTons' | 'tonsToBTU';

interface BTUToTonsConverterProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Conversion constant: 1 ton of refrigeration = 12,000 BTU/hour
const BTU_PER_TON = 12000;

export default function BTUToTonsConverter({
  showTitle = true,
  primaryColor = '#820ECC'
}: BTUToTonsConverterProps) {
  const [conversionMode, setConversionMode] = useState<ConversionMode>('btuToTons');
  const [btu, setBTU] = useState('');
  const [tons, setTons] = useState('');
  const [result, setResult] = useState<{ value: number; unit: string; label: string } | null>(null);
  const [calculation, setCalculation] = useState('');
  const [error, setError] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    if (Math.abs(value) >= 1000000) {
      return value.toExponential(4);
    }
    return value.toFixed(4).replace(/\.?0+$/, '');
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    if (conversionMode === 'btuToTons') {
      // Convert BTU to Tons
      if (!btu) {
        setError('Please enter the BTU value');
        return;
      }

      const btuValue = parseFloat(btu);
      if (isNaN(btuValue) || btuValue < 0) {
        setError('BTU must be a valid non-negative number');
        return;
      }

      const tonsValue = btuValue / BTU_PER_TON;
      setResult({ value: tonsValue, unit: 'tons', label: 'Tons of Refrigeration' });
      setCalculation(`Tons = BTU / ${BTU_PER_TON.toLocaleString()}\nTons = ${formatValue(btuValue)} BTU / ${BTU_PER_TON.toLocaleString()} BTU/ton\nTons = ${formatValue(tonsValue)} tons`);
    } else {
      // Convert Tons to BTU
      if (!tons) {
        setError('Please enter the tons value');
        return;
      }

      const tonsValue = parseFloat(tons);
      if (isNaN(tonsValue) || tonsValue < 0) {
        setError('Tons must be a valid non-negative number');
        return;
      }

      const btuValue = tonsValue * BTU_PER_TON;
      setResult({ value: btuValue, unit: 'BTU', label: 'BTU' });
      setCalculation(`BTU = Tons × ${BTU_PER_TON.toLocaleString()}\nBTU = ${formatValue(tonsValue)} tons × ${BTU_PER_TON.toLocaleString()} BTU/ton\nBTU = ${formatValue(btuValue)} BTU`);
    }
  };

  const clearAll = () => {
    setBTU('');
    setTons('');
    setResult(null);
    setCalculation('');
    setError('');
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string; focusRing: string; hover: string } } = {
      '#820ECC': {
        bg: 'bg-[#820ECC]',
        text: 'text-[#820ECC]',
        border: 'border-[#820ECC]',
        focusRing: 'focus:ring-[#820ECC]',
        hover: 'hover:bg-[#6a0cb3]'
      },
    };
    return colorMap[color] || colorMap['#820ECC'];
  };

  const { text, focusRing, hover } = getColorClasses(primaryColor);

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">BTU to Tons Converter</h2>
          <p className="text-gray-600">Convert between BTU (British Thermal Units) and Tons of Refrigeration</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Conversion Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conversion Direction
          </label>
          <select
            value={conversionMode}
            onChange={(e) => {
              setConversionMode(e.target.value as ConversionMode);
              clearAll();
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="btuToTons">BTU to Tons</option>
            <option value="tonsToBTU">Tons to BTU</option>
          </select>
        </div>

        {/* Input Field */}
        {conversionMode === 'btuToTons' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              BTU (British Thermal Units)
            </label>
            <Input
              type="text"
              placeholder="Enter BTU value"
              value={btu}
              onChange={(e) => setBTU(e.target.value)}
              className="w-full"
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-1">
              1 ton of refrigeration = {BTU_PER_TON.toLocaleString()} BTU/hour
            </p>
          </div>
        )}

        {conversionMode === 'tonsToBTU' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tons of Refrigeration
            </label>
            <Input
              type="text"
              placeholder="Enter tons value"
              value={tons}
              onChange={(e) => setTons(e.target.value)}
              className="w-full"
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-1">
              1 ton of refrigeration = {BTU_PER_TON.toLocaleString()} BTU/hour
            </p>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button onClick={calculate} className={`flex-1 ${hover}`} style={{ backgroundColor: primaryColor }}>
            Convert
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}10`, borderColor: `${primaryColor}30`, borderWidth: '1px', borderStyle: 'solid' }}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>Result</h3>
            <p className="text-2xl font-bold" style={{ color: primaryColor }}>
              {formatValue(result.value)} {result.unit}
            </p>
            <p className="text-sm mt-1" style={{ color: `${primaryColor}CC` }}>
              {result.label}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <div className="text-sm mt-3 font-mono whitespace-pre-line" style={{ color: `${primaryColor}CC` }}>
                {calculation}
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-mono">{error}</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Select the conversion direction (BTU to Tons or Tons to BTU).</li>
            <li>• Enter the value you want to convert in the input field.</li>
            <li>• Ensure the input is a valid non-negative number.</li>
            <li>• Click Convert to get the result with step-by-step calculation.</li>
            <li>• Conversion: 1 ton of refrigeration = {BTU_PER_TON.toLocaleString()} BTU/hour</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

