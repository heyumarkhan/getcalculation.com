'use client';

import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface YearOverYearGrowthCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function YearOverYearGrowthCalculator({ showTitle = true, primaryColor = '#820ECC' }: YearOverYearGrowthCalculatorProps) {
  const [priorYearValue, setPriorYearValue] = useState<string>('');
  const [currentYearValue, setCurrentYearValue] = useState<string>('');
  const [result, setResult] = useState<null | { growth: number; difference: number; growthPercentage: number }>(null);
  const [calculation, setCalculation] = useState('');

  const parse = (v: string) => parseFloat(v) || 0;

  const calculate = () => {
    const prior = parse(priorYearValue);
    const current = parse(currentYearValue);

    if (!prior || !current || prior <= 0) {
      setResult(null);
      setCalculation('');
      return;
    }

    const difference = current - prior;
    const growth = (difference / prior) * 100;

    setResult({ growth, difference, growthPercentage: growth });

    const steps = [];
    steps.push(`Prior Year Value: $${prior.toFixed(2)}`);
    steps.push(`Current Year Value: $${current.toFixed(2)}`);
    steps.push('');
    steps.push(`Year Over Year Growth = ((Current Year - Prior Year) / Prior Year) × 100`);
    steps.push(`= ((${current.toFixed(2)} - ${prior.toFixed(2)}) / ${prior.toFixed(2)}) × 100`);
    steps.push(`= (${difference.toFixed(2)} / ${prior.toFixed(2)}) × 100`);
    steps.push(`= ${growth.toFixed(4)}%`);
    steps.push('');
    steps.push(`Absolute Change: $${difference.toFixed(2)}`);
    steps.push(`Year Over Year Growth Rate: ${growth.toFixed(2)}%`);

    if (growth > 0) {
      steps.push(`Growth Status: Positive growth of ${growth.toFixed(2)}%`);
    } else if (growth < 0) {
      steps.push(`Growth Status: Decline of ${Math.abs(growth).toFixed(2)}%`);
    } else {
      steps.push(`Growth Status: No change (0%)`);
    }

    setCalculation(steps.join('\n'));
  };

  useEffect(() => {
    if (priorYearValue && currentYearValue) calculate();
  }, [priorYearValue, currentYearValue]);

  const getColorClasses = (color: string) => {
    const hexColor = color.startsWith('#') ? color : `#${color}`;
    return `bg-opacity-10 border-opacity-30`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <style>{`
        .yoy-growth-primary { color: ${primaryColor}; border-color: ${primaryColor}; }
        .yoy-growth-bg { background-color: ${primaryColor}; }
        .yoy-growth-bg-light { background-color: ${primaryColor}20; }
        .yoy-growth-border { border-color: ${primaryColor}; }
        .yoy-growth-text { color: ${primaryColor}; }
      `}</style>

      {showTitle && <h2 className="text-2xl font-bold mb-6 yoy-growth-primary">Year Over Year Growth Calculator</h2>}

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Prior Year Value ($)</label>
            <Input
              type="number"
              value={priorYearValue}
              onChange={(e) => setPriorYearValue(e.target.value)}
              placeholder="e.g., 100000"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Current Year Value ($)</label>
            <Input
              type="number"
              value={currentYearValue}
              onChange={(e) => setCurrentYearValue(e.target.value)}
              placeholder="e.g., 125000"
              className="w-full"
            />
          </div>
        </div>

        <Button
          onClick={calculate}
          className="w-full yoy-growth-bg text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
        >
          Calculate YoY Growth
        </Button>
      </div>

      {result && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4 yoy-growth-primary">Year Over Year Growth Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="yoy-growth-bg-light border-2 yoy-growth-border rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Absolute Change</p>
              <p className="text-2xl font-bold yoy-growth-text">${result.difference.toFixed(2)}</p>
            </div>
            <div className="yoy-growth-bg-light border-2 yoy-growth-border rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Growth Rate</p>
              <p className={`text-2xl font-bold ${result.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {result.growth >= 0 ? '+' : ''}{result.growth.toFixed(2)}%
              </p>
            </div>
            <div className="yoy-growth-bg-light border-2 yoy-growth-border rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <p className={`text-lg font-bold ${result.growth > 0 ? 'text-green-600' : result.growth < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                {result.growth > 0 ? '📈 Growth' : result.growth < 0 ? '📉 Decline' : '➡️ Flat'}
              </p>
            </div>
          </div>
        </div>
      )}

      {calculation && (
        <div className="bg-gray-50 rounded-lg border-2 yoy-growth-border p-6">
          <h3 className="text-lg font-bold mb-4 yoy-growth-primary">Calculation Steps</h3>
          <pre className="text-sm text-gray-700 overflow-x-auto whitespace-pre-wrap break-words">
            {calculation}
          </pre>
        </div>
      )}
    </div>
  );
}
