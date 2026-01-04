'use client';

import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface CTRCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function CTRCalculator({ showTitle = true, primaryColor = '#820ECC' }: CTRCalculatorProps) {
  const [clicks, setClicks] = useState<string>('');
  const [impressions, setImpressions] = useState<string>('');
  const [result, setResult] = useState<null | { ctr: number }>(null);
  const [calculation, setCalculation] = useState('');

  const parse = (v: string) => parseFloat(v) || 0;

  const calculate = () => {
    const clickCount = parse(clicks);
    const impressionCount = parse(impressions);

    if (!clickCount || clickCount < 0 || !impressionCount || impressionCount <= 0) {
      setResult(null);
      setCalculation('');
      return;
    }

    if (clickCount > impressionCount) {
      setResult(null);
      setCalculation('Error: Clicks cannot exceed impressions');
      return;
    }

    const ctr = (clickCount / impressionCount) * 100;
    setResult({ ctr });

    const steps = [];
    steps.push(`Clicks: ${clickCount.toFixed(0)}`);
    steps.push(`Impressions: ${impressionCount.toFixed(0)}`);
    steps.push(`CTR Formula: (Clicks ÷ Impressions) × 100`);
    steps.push(`CTR = (${clickCount.toFixed(0)} ÷ ${impressionCount.toFixed(0)}) × 100`);
    steps.push(`CTR = ${ctr.toFixed(4)}%`);

    setCalculation(steps.join('\n'));
  };

  useEffect(() => {
    if (clicks && impressions) calculate();
  }, [clicks, impressions]);

  const getColorClasses = (color: string) => {
    const hexColor = color.startsWith('#') ? color : `#${color}`;
    return {
      customStyles: {
        button: { backgroundColor: hexColor, '--hover-color': hexColor, '--focus-color': hexColor } as React.CSSProperties,
        resultBg: { backgroundColor: `${hexColor}10`, borderColor: `${hexColor}30` } as React.CSSProperties,
        resultText: { color: hexColor } as React.CSSProperties
      }
    };
  };

  const colors = getColorClasses(primaryColor);

  return (
    <>
      {colors.customStyles && (
        <style dangerouslySetInnerHTML={{
          __html: `
            .custom-color-button:hover { background-color: ${primaryColor}dd !important; }
            .custom-color-button:focus { box-shadow: 0 0 0 3px ${primaryColor}40 !important; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: translateY(0);} }
            .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
          `
        }} />
      )}

      <div className="w-full">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">CTR Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate click-through rate (CTR) by dividing total clicks by impressions. Essential for digital marketing analysis and campaign performance evaluation.</p>
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
          <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">Input Campaign Data</label>
              <p className="text-xs text-gray-600">Enter the number of clicks and impressions from your digital marketing campaign to calculate CTR.</p>
            </div>

            <Input label="Clicks" type="number" value={clicks} onChange={(e) => setClicks(e.target.value)} placeholder="e.g., 1500" step="1" min="0" autoFocus />

            <Input label="Impressions" type="number" value={impressions} onChange={(e) => setImpressions(e.target.value)} placeholder="e.g., 50000" step="1" min="0" />

            <div className="flex gap-3 pt-2">
              <Button onClick={calculate} className={`flex-1 ${colors.customStyles ? 'custom-color-button' : ''}`} style={colors.customStyles.button} size="lg">Calculate</Button>
              <Button onClick={() => { setClicks(''); setImpressions(''); setResult(null); setCalculation(''); }} variant="outline" size="lg">Clear</Button>
            </div>
          </div>

          <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>

          <div>
            <div className="p-4 rounded-md min-h-[400px] transition-all duration-300" style={colors.customStyles.resultBg}>
              <h3 className="text-lg font-semibold mb-4" style={colors.customStyles.resultText}>CTR Results</h3>

              {result ? (
                <div className="animate-fadeIn">
                  <div className="bg-white rounded-lg border p-6 space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Clicks:</span>
                      <span className="font-mono font-semibold text-gray-900">{clicks ? parse(clicks).toFixed(0) : '0'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Impressions:</span>
                      <span className="font-mono font-semibold text-gray-900">{impressions ? parse(impressions).toFixed(0) : '0'}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 mt-2">
                      <span className="font-bold text-lg text-gray-900">Click-Through Rate (CTR):</span>
                      <span className="font-mono font-bold text-xl" style={colors.customStyles.resultText}>{result.ctr.toFixed(4)}%</span>
                    </div>

                    {calculation && (
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-2 text-sm">Calculation Steps:</h4>
                        <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono bg-gray-50 p-3 rounded">{calculation}</pre>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-4">📊</div>
                    <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                    <p className="text-sm">Enter clicks and impressions to calculate your CTR percentage</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
