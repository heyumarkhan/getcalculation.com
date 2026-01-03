'use client';

import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface ExpenseRatioCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function ExpenseRatioCalculator({ showTitle = true, primaryColor = '#820ECC' }: ExpenseRatioCalculatorProps) {
  const [annualExpenses, setAnnualExpenses] = useState<string>('');
  const [fundValue, setFundValue] = useState<string>('');
  const [result, setResult] = useState<null | { expenseRatio: number; annualCost: number }>( null);
  const [calculation, setCalculation] = useState('');

  const parse = (v: string) => parseFloat(v) || 0;

  const calculate = () => {
    const expenses = parse(annualExpenses);
    const fValue = parse(fundValue);

    if (!expenses || !fValue || expenses <= 0 || fValue <= 0) {
      setResult(null);
      setCalculation('');
      return;
    }

    const ratio = (expenses / fValue) * 100;

    setResult({ expenseRatio: ratio, annualCost: expenses });

    const steps = [];
    steps.push(`Annual Expenses: ${expenses.toFixed(2)}`);
    steps.push(`Fund/Asset Value: ${fValue.toFixed(2)}`);
    steps.push('');
    steps.push(`Expense Ratio = (Annual Expenses / Fund Value) × 100`);
    steps.push(`= (${expenses.toFixed(2)} / ${fValue.toFixed(2)}) × 100`);
    steps.push(`= ${ratio.toFixed(4)}%`);

    setCalculation(steps.join('\n'));
  };

  useEffect(() => {
    if (annualExpenses && fundValue) calculate();
  }, [annualExpenses, fundValue]);

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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Expense Ratio Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the expense ratio of a fund or investment based on annual expenses and fund value.</p>
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
          <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Fund Parameters</h3>
              <div className="space-y-3">
                <Input label="Annual Expenses ($)" type="number" value={annualExpenses} onChange={(e) => setAnnualExpenses(e.target.value)} placeholder="e.g., 5000" step="0.01" min="0" autoFocus />
                <Input label="Fund/Asset Value ($)" type="number" value={fundValue} onChange={(e) => setFundValue(e.target.value)} placeholder="e.g., 500000" step="0.01" min="0" />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={calculate} className={`flex-1 ${colors.customStyles ? 'custom-color-button' : ''}`} style={colors.customStyles.button} size="lg">Calculate</Button>
              <Button onClick={() => { setAnnualExpenses(''); setFundValue(''); setResult(null); setCalculation(''); }} variant="outline" size="lg">Clear</Button>
            </div>
          </div>

          <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>

          <div>
            <div className="p-4 rounded-md min-h-[400px] transition-all duration-300" style={colors.customStyles.resultBg}>
              <h3 className="text-lg font-semibold mb-4" style={colors.customStyles.resultText}>Expense Ratio Results</h3>

              {result ? (
                <div className="animate-fadeIn">
                  <div className="bg-white rounded-lg border p-6 space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Annual Expenses:</span>
                      <span className="font-mono font-semibold text-gray-900">${result.annualCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Fund Value:</span>
                      <span className="font-mono font-semibold text-gray-900">${fundValue ? parse(fundValue).toFixed(2) : '0.00'}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 mt-2">
                      <span className="font-bold text-lg text-gray-900">Expense Ratio:</span>
                      <span className="font-mono font-bold text-xl" style={colors.customStyles.resultText}>{result.expenseRatio.toFixed(4)}%</span>
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
                    <p className="text-sm">Enter annual expenses and fund value to calculate expense ratio</p>
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
