'use client';

import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface PayRaiseCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function PayRaiseCalculator({ showTitle = true, primaryColor = '#820ECC' }: PayRaiseCalculatorProps) {
  const [currentPay, setCurrentPay] = useState<string>('');
  const [isPercent, setIsPercent] = useState<boolean>(true);
  const [raiseValue, setRaiseValue] = useState<string>('');
  const [result, setResult] = useState<null | { newPay: number; raiseAmount: number; percent: number }>(null);
  const [calculation, setCalculation] = useState('');

  const parse = (v: string) => parseFloat(v) || 0;

  const calculate = () => {
    const curr = parse(currentPay);
    const rv = parse(raiseValue);

    if (!curr || curr <= 0) {
      setResult(null);
      setCalculation('');
      return;
    }

    let raiseAmount = 0;
    let percent = 0;

    if (isPercent) {
      percent = rv;
      raiseAmount = curr * (percent / 100);
    } else {
      raiseAmount = rv;
      percent = (raiseAmount / curr) * 100;
    }

    const newPay = curr + raiseAmount;

    setResult({ newPay, raiseAmount, percent });

    const steps = [];
    steps.push(`Current Pay: ${curr.toFixed(2)}`);
    if (isPercent) {
      steps.push(`Raise: ${percent.toFixed(2)}%`);
      steps.push(`Raise Amount = ${curr.toFixed(2)} × ${ (percent/100).toFixed(4) } = ${raiseAmount.toFixed(2)}`);
    } else {
      steps.push(`Raise Amount: ${raiseAmount.toFixed(2)}`);
      steps.push(`Percent Increase = (${raiseAmount.toFixed(2)} ÷ ${curr.toFixed(2)}) × 100 = ${percent.toFixed(2)}%`);
    }
    steps.push(`New Pay = ${curr.toFixed(2)} + ${raiseAmount.toFixed(2)} = ${newPay.toFixed(2)}`);

    setCalculation(steps.join('\n'));
  };

  useEffect(() => {
    if (currentPay && raiseValue) calculate();
  }, [currentPay, raiseValue, isPercent]);

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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pay Raise Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate your new salary or hourly pay after a raise.</p>
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
          <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-3">Raise Input Type</label>
              <div className="flex gap-2">
                <Button onClick={() => setIsPercent(true)} variant={isPercent ? 'primary' : 'outline'} className={isPercent ? '' : 'bg-white'} style={isPercent ? colors.customStyles.button : undefined}>Percent</Button>
                <Button onClick={() => setIsPercent(false)} variant={!isPercent ? 'primary' : 'outline'} className={!isPercent ? '' : 'bg-white'} style={!isPercent ? colors.customStyles.button : undefined}>Amount</Button>
              </div>
            </div>

            <Input label="Current Salary or Pay" type="number" value={currentPay} onChange={(e) => setCurrentPay(e.target.value)} placeholder="e.g., 50000" step="0.01" min="0" autoFocus />

            <Input label={isPercent ? 'Raise Percentage (%)' : 'Raise Amount'} type="number" value={raiseValue} onChange={(e) => setRaiseValue(e.target.value)} placeholder={isPercent ? 'e.g., 5' : 'e.g., 2500'} step="0.01" min="0" />

            <div className="flex gap-3 pt-2">
              <Button onClick={calculate} className={`flex-1 ${colors.customStyles ? 'custom-color-button' : ''}`} style={colors.customStyles.button} size="lg">Calculate</Button>
              <Button onClick={() => { setCurrentPay(''); setRaiseValue(''); setResult(null); setCalculation(''); setIsPercent(true); }} variant="outline" size="lg">Clear</Button>
            </div>
          </div>

          <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>

          <div>
            <div className="p-4 rounded-md min-h-[400px] transition-all duration-300" style={colors.customStyles.resultBg}>
              <h3 className="text-lg font-semibold mb-4" style={colors.customStyles.resultText}>Raise Breakdown</h3>

              {result ? (
                <div className="animate-fadeIn">
                  <div className="bg-white rounded-lg border p-6 space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Current Pay:</span>
                      <span className="font-mono font-semibold text-gray-900">{currentPay ? parse(currentPay).toFixed(2) : '0.00'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Raise Amount:</span>
                      <span className="font-mono font-semibold text-gray-900">{result.raiseAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Percent Increase:</span>
                      <span className="font-mono font-semibold text-gray-900">{result.percent.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 mt-2">
                      <span className="font-bold text-lg text-gray-900">New Pay:</span>
                      <span className="font-mono font-bold text-xl" style={colors.customStyles.resultText}>{result.newPay.toFixed(2)}</span>
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
                    <div className="text-4xl mb-4">💸</div>
                    <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                    <p className="text-sm">Enter current pay and raise to see your new salary or hourly pay</p>
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
