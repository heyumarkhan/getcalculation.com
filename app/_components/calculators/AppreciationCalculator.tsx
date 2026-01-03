'use client';

import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface AppreciationCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function AppreciationCalculator({ showTitle = true, primaryColor = '#820ECC' }: AppreciationCalculatorProps) {
  const [initialValue, setInitialValue] = useState<string>('');
  const [inputMode, setInputMode] = useState<'final' | 'rate'>('final');
  const [finalValue, setFinalValue] = useState<string>('');
  const [appreciationRate, setAppreciationRate] = useState<string>('');
  const [timePeriod, setTimePeriod] = useState<string>('');
  const [result, setResult] = useState<null | { appreciationAmount: number; appreciationRate: number; finalValue: number }>(null);
  const [calculation, setCalculation] = useState('');

  const parse = (v: string) => parseFloat(v) || 0;

  const calculate = () => {
    const initial = parse(initialValue);
    const period = parse(timePeriod);

    if (!initial || initial <= 0 || !period || period <= 0) {
      setResult(null);
      setCalculation('');
      return;
    }

    let appreciationAmt = 0;
    let appreciationPct = 0;
    let finalVal = 0;

    if (inputMode === 'final') {
      const final = parse(finalValue);
      appreciationAmt = final - initial;
      appreciationPct = (appreciationAmt / initial) * 100;
      finalVal = final;
    } else {
      const rate = parse(appreciationRate);
      appreciationAmt = initial * (rate / 100);
      appreciationPct = rate;
      finalVal = initial + appreciationAmt;
    }

    setResult({ appreciationAmount: appreciationAmt, appreciationRate: appreciationPct, finalValue: finalVal });

    const steps = [];
    steps.push(`Initial Value: ${initial.toFixed(2)}`);
    steps.push(`Time Period: ${period.toFixed(2)} years`);
    steps.push('');
    if (inputMode === 'final') {
      steps.push(`Final Value: ${finalVal.toFixed(2)}`);
      steps.push(`Appreciation Amount = Final Value - Initial Value`);
      steps.push(`= ${finalVal.toFixed(2)} - ${initial.toFixed(2)}`);
      steps.push(`= ${appreciationAmt.toFixed(2)}`);
      steps.push('');
      steps.push(`Appreciation Rate = (Appreciation Amount / Initial Value) × 100`);
      steps.push(`= (${appreciationAmt.toFixed(2)} / ${initial.toFixed(2)}) × 100`);
      steps.push(`= ${appreciationPct.toFixed(4)}%`);
    } else {
      steps.push(`Appreciation Rate: ${appreciationPct.toFixed(2)}%`);
      steps.push(`Appreciation Amount = Initial Value × (Rate / 100)`);
      steps.push(`= ${initial.toFixed(2)} × ${(appreciationPct / 100).toFixed(4)}`);
      steps.push(`= ${appreciationAmt.toFixed(2)}`);
      steps.push('');
      steps.push(`Final Value = Initial Value + Appreciation Amount`);
      steps.push(`= ${initial.toFixed(2)} + ${appreciationAmt.toFixed(2)}`);
      steps.push(`= ${finalVal.toFixed(2)}`);
    }

    setCalculation(steps.join('\n'));
  };

  useEffect(() => {
    if (initialValue && timePeriod && (inputMode === 'final' ? finalValue : appreciationRate)) calculate();
  }, [initialValue, finalValue, appreciationRate, timePeriod, inputMode]);

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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Appreciation Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate asset appreciation based on initial and final values or appreciation rate.</p>
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
          <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-3">Input Mode</label>
              <div className="flex gap-2">
                <Button onClick={() => setInputMode('final')} variant={inputMode === 'final' ? 'primary' : 'outline'} className={inputMode === 'final' ? '' : 'bg-white'} style={inputMode === 'final' ? colors.customStyles.button : undefined}>Final Value</Button>
                <Button onClick={() => setInputMode('rate')} variant={inputMode === 'rate' ? 'primary' : 'outline'} className={inputMode === 'rate' ? '' : 'bg-white'} style={inputMode === 'rate' ? colors.customStyles.button : undefined}>Rate</Button>
              </div>
            </div>

            <Input label="Initial Value ($)" type="number" value={initialValue} onChange={(e) => setInitialValue(e.target.value)} placeholder="e.g., 100000" step="0.01" min="0" autoFocus />

            {inputMode === 'final' ? (
              <Input label="Final Value ($)" type="number" value={finalValue} onChange={(e) => setFinalValue(e.target.value)} placeholder="e.g., 120000" step="0.01" min="0" />
            ) : (
              <Input label="Appreciation Rate (%)" type="number" value={appreciationRate} onChange={(e) => setAppreciationRate(e.target.value)} placeholder="e.g., 5" step="0.01" min="0" />
            )}

            <Input label="Time Period (years)" type="number" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} placeholder="e.g., 5" step="0.01" min="0" />

            <div className="flex gap-3 pt-2">
              <Button onClick={calculate} className={`flex-1 ${colors.customStyles ? 'custom-color-button' : ''}`} style={colors.customStyles.button} size="lg">Calculate</Button>
              <Button onClick={() => { setInitialValue(''); setFinalValue(''); setAppreciationRate(''); setTimePeriod(''); setResult(null); setCalculation(''); setInputMode('final'); }} variant="outline" size="lg">Clear</Button>
            </div>
          </div>

          <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>

          <div>
            <div className="p-4 rounded-md min-h-[400px] transition-all duration-300" style={colors.customStyles.resultBg}>
              <h3 className="text-lg font-semibold mb-4" style={colors.customStyles.resultText}>Appreciation Results</h3>

              {result ? (
                <div className="animate-fadeIn">
                  <div className="bg-white rounded-lg border p-6 space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Initial Value:</span>
                      <span className="font-mono font-semibold text-gray-900">${initialValue ? parse(initialValue).toFixed(2) : '0.00'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Appreciation Amount:</span>
                      <span className="font-mono font-semibold text-gray-900">${result.appreciationAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Appreciation Rate:</span>
                      <span className="font-mono font-semibold text-gray-900">{result.appreciationRate.toFixed(4)}%</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 mt-2">
                      <span className="font-bold text-lg text-gray-900">Final Value:</span>
                      <span className="font-mono font-bold text-xl" style={colors.customStyles.resultText}>${result.finalValue.toFixed(2)}</span>
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
                    <p className="text-sm">Enter initial value and either final value or appreciation rate</p>
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
