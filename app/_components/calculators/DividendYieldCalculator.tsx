'use client';

import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface Props {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function DividendYieldCalculator({ showTitle = true, primaryColor = '#820ECC' }: Props) {
  const [stockPrice, setStockPrice] = useState<string>('');
  const [annualDividend, setAnnualDividend] = useState<string>('');
  const [dividendYield, setDividendYield] = useState<number | null>(null);
  const [calculation, setCalculation] = useState('');

  const parse = (v: string) => parseFloat(v) || 0;

  const calculate = () => {
    const price = parse(stockPrice);
    const dividend = parse(annualDividend);

    if (!price || price <= 0 || dividend < 0) {
      setDividendYield(null);
      setCalculation('');
      return;
    }

    const yield_pct = (dividend / price) * 100;
    setDividendYield(yield_pct);

    const steps = [];
    steps.push(`Stock Price: $${price.toFixed(2)}`);
    steps.push(`Annual Dividend: $${dividend.toFixed(2)}`);
    steps.push(`Dividend Yield Formula: (Annual Dividend ÷ Stock Price) × 100`);
    steps.push(`Dividend Yield = ($${dividend.toFixed(2)} ÷ $${price.toFixed(2)}) × 100 = ${yield_pct.toFixed(2)}%`);

    setCalculation(steps.join('\n'));
  };

  useEffect(() => {
    if (stockPrice && annualDividend) calculate();
  }, [stockPrice, annualDividend]);

  return (
    <div className="w-full">
      {showTitle && (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Dividend Yield Calculator</h2>
          <p className="text-gray-600 mb-6">Calculate dividend yield percentage to evaluate the income return on your stock investments based on stock price and annual dividend.</p>
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
        <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">Input Investment Details</label>
            <p className="text-xs text-gray-600">Enter the stock price and annual dividend to calculate the dividend yield percentage.</p>
          </div>

          <Input label="Stock Price ($)" type="number" value={stockPrice} onChange={(e) => setStockPrice(e.target.value)} placeholder="e.g., 50" step="0.01" min="0" autoFocus />

          <Input label="Annual Dividend ($)" type="number" value={annualDividend} onChange={(e) => setAnnualDividend(e.target.value)} placeholder="e.g., 2.50" step="0.01" min="0" />

          <div className="flex gap-3 pt-2">
            <Button onClick={calculate} className="flex-1" size="lg" style={{ backgroundColor: primaryColor }}>Calculate</Button>
            <Button onClick={() => { setStockPrice(''); setAnnualDividend(''); setDividendYield(null); setCalculation(''); }} variant="outline" size="lg">Clear</Button>
          </div>
        </div>

        <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>

        <div>
          <div className="p-4 rounded-md min-h-[300px] transition-all duration-300 bg-[#F8F9FA]">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Results</h3>

            {dividendYield != null ? (
              <div className="bg-white rounded-lg border p-6 space-y-4">
                <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 mt-2">
                  <span className="font-bold text-lg text-gray-900">Dividend Yield:</span>
                  <span className="font-mono font-bold text-xl">{dividendYield.toFixed(2)}%</span>
                </div>

                <div className="bg-green-50 border border-green-200 rounded p-3 mt-4">
                  <p className="text-xs text-green-900">
                    <strong>Interpretation:</strong> Your stock yields {dividendYield.toFixed(2)}% annually.
                    {dividendYield > 5 && <span> This is a high dividend yield.</span>}
                    {dividendYield >= 3 && dividendYield <= 5 && <span> This is a moderate dividend yield.</span>}
                    {dividendYield < 3 && <span> This is a lower dividend yield.</span>}
                  </p>
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
                  <div className="text-4xl mb-4">💵</div>
                  <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                  <p className="text-sm">Enter stock price and annual dividend to calculate dividend yield.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
