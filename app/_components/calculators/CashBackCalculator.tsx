"use client";

import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface Props {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function CashBackCalculator({ showTitle = true, primaryColor = '#820ECC' }: Props) {
  const [purchaseAmount, setPurchaseAmount] = useState<string>('');
  const [cashbackRate, setCashbackRate] = useState<string>('');
  const [cashbackAmount, setCashbackAmount] = useState<number | null>(null);
  const [effectiveReturn, setEffectiveReturn] = useState<number | null>(null);
  const [calculation, setCalculation] = useState('');

  const parse = (v: string) => parseFloat(v) || 0;

  const calculate = () => {
    const amount = parse(purchaseAmount);
    const rate = parse(cashbackRate);

    if (!amount || amount <= 0 || (!rate && rate !== 0)) {
      setCashbackAmount(null);
      setEffectiveReturn(null);
      setCalculation('');
      return;
    }

    const cashback = (amount * rate) / 100;
    const percentReturn = rate; // simple percent

    setCashbackAmount(cashback);
    setEffectiveReturn(percentReturn);

    const steps = [];
    steps.push(`Purchase Amount: $${amount.toFixed(2)}`);
    steps.push(`Cashback Rate: ${rate.toFixed(2)}%`);
    steps.push(`Cashback = Purchase Amount × (Cashback Rate ÷ 100)`);
    steps.push(`Cashback = $${amount.toFixed(2)} × (${rate.toFixed(2)} ÷ 100) = $${cashback.toFixed(2)}`);
    steps.push(`Effective Return = ${percentReturn.toFixed(2)}%`);

    setCalculation(steps.join('\n'));
  };

  useEffect(() => {
    if (purchaseAmount && cashbackRate) calculate();
  }, [purchaseAmount, cashbackRate]);

  return (
    <div className="w-full">
      {showTitle && (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cash Back Calculator</h2>
          <p className="text-gray-600 mb-6">Calculate cash back earned from purchases based on a percentage cashback rate. Useful for credit card rewards and promotional offers.</p>
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
        <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">Input Purchase Details</label>
            <p className="text-xs text-gray-600">Enter the purchase amount and your cashback percentage to compute cashback value and effective return.</p>
          </div>

          <Input label="Purchase Amount ($)" type="number" value={purchaseAmount} onChange={(e) => setPurchaseAmount(e.target.value)} placeholder="e.g., 120.50" step="0.01" min="0" autoFocus />

          <Input label="Cashback Rate (%)" type="number" value={cashbackRate} onChange={(e) => setCashbackRate(e.target.value)} placeholder="e.g., 2" step="0.01" min="0" />

          <div className="flex gap-3 pt-2">
            <Button onClick={calculate} className="flex-1" size="lg" style={{ backgroundColor: primaryColor }}>Calculate</Button>
            <Button onClick={() => { setPurchaseAmount(''); setCashbackRate(''); setCashbackAmount(null); setEffectiveReturn(null); setCalculation(''); }} variant="outline" size="lg">Clear</Button>
          </div>
        </div>

        <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>

        <div>
          <div className="p-4 rounded-md min-h-[300px] transition-all duration-300 bg-[#F8F9FA]">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Results</h3>

            {cashbackAmount != null ? (
              <div className="bg-white rounded-lg border p-6 space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Cashback Earned:</span>
                  <span className="font-mono font-semibold text-gray-900">${cashbackAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 mt-2">
                  <span className="font-bold text-lg text-gray-900">Effective Return:</span>
                  <span className="font-mono font-bold text-xl">{effectiveReturn != null ? `${effectiveReturn.toFixed(2)}%` : '0.00%'}</span>
                </div>

                {calculation && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm">Calculation Steps:</h4>
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono bg-gray-50 p-3 rounded">{calculation}</pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[200px]">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">💳</div>
                  <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                  <p className="text-sm">Enter purchase amount and cashback rate to calculate cashback earned.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
