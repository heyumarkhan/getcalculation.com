'use client';

import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface ROASCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function ROASCalculator({ showTitle = true, primaryColor = '#820ECC' }: ROASCalculatorProps) {
  const [revenue, setRevenue] = useState<string>('');
  const [adSpend, setAdSpend] = useState<string>('');
  const [result, setResult] = useState<null | { roas: number }>(null);
  const [calculation, setCalculation] = useState('');

  const parse = (v: string) => parseFloat(v) || 0;

  const calculate = () => {
    const totalRevenue = parse(revenue);
    const totalAdSpend = parse(adSpend);

    if (!totalRevenue || totalRevenue < 0 || !totalAdSpend || totalAdSpend <= 0) {
      setResult(null);
      setCalculation('');
      return;
    }

    const roas = totalRevenue / totalAdSpend;
    setResult({ roas });

    const steps = [];
    steps.push(`Revenue Generated: $${totalRevenue.toFixed(2)}`);
    steps.push(`Ad Spend: $${totalAdSpend.toFixed(2)}`);
    steps.push(`ROAS Formula: Revenue ÷ Ad Spend`);
    steps.push(`ROAS = $${totalRevenue.toFixed(2)} ÷ $${totalAdSpend.toFixed(2)}`);
    steps.push(`ROAS = $${roas.toFixed(2)}`);

    setCalculation(steps.join('\n'));
  };

  useEffect(() => {
    if (revenue && adSpend) calculate();
  }, [revenue, adSpend]);

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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ROAS Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate return on ad spend (ROAS) by dividing total revenue by advertising costs. Essential for evaluating digital marketing campaign profitability and ROI.</p>
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
          <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">Input Campaign Metrics</label>
              <p className="text-xs text-gray-600">Enter the total revenue generated and total ad spend for your campaign to calculate ROAS.</p>
            </div>

            <Input label="Revenue Generated ($)" type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} placeholder="e.g., 50000" step="0.01" min="0" autoFocus />

            <Input label="Ad Spend ($)" type="number" value={adSpend} onChange={(e) => setAdSpend(e.target.value)} placeholder="e.g., 10000" step="0.01" min="0" />

            <div className="flex gap-3 pt-2">
              <Button onClick={calculate} className={`flex-1 ${colors.customStyles ? 'custom-color-button' : ''}`} style={colors.customStyles.button} size="lg">Calculate</Button>
              <Button onClick={() => { setRevenue(''); setAdSpend(''); setResult(null); setCalculation(''); }} variant="outline" size="lg">Clear</Button>
            </div>
          </div>

          <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>

          <div>
            <div className="p-4 rounded-md min-h-[400px] transition-all duration-300" style={colors.customStyles.resultBg}>
              <h3 className="text-lg font-semibold mb-4" style={colors.customStyles.resultText}>ROAS Results</h3>

              {result ? (
                <div className="animate-fadeIn">
                  <div className="bg-white rounded-lg border p-6 space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Revenue Generated:</span>
                      <span className="font-mono font-semibold text-gray-900">${revenue ? parse(revenue).toFixed(2) : '0.00'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Ad Spend:</span>
                      <span className="font-mono font-semibold text-gray-900">${adSpend ? parse(adSpend).toFixed(2) : '0.00'}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 mt-2">
                      <span className="font-bold text-lg text-gray-900">Return on Ad Spend:</span>
                      <span className="font-mono font-bold text-xl" style={colors.customStyles.resultText}>${result.roas.toFixed(2)}</span>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-4">
                      <p className="text-xs text-blue-900">
                        <strong>Interpretation:</strong> For every $1 spent on ads, you generated ${result.roas.toFixed(2)} in revenue.
                        {result.roas >= 3 && <span> Excellent ROAS performance!</span>}
                        {result.roas >= 2 && result.roas < 3 && <span> Good ROAS performance.</span>}
                        {result.roas >= 1 && result.roas < 2 && <span> Break-even to moderate ROAS.</span>}
                        {result.roas < 1 && <span> Consider optimizing your campaign strategy.</span>}
                      </p>
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
                    <div className="text-4xl mb-4">💰</div>
                    <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                    <p className="text-sm">Enter revenue and ad spend to see your ROAS</p>
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
