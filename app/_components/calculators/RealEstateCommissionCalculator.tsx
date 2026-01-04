"use client";

import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface Props {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function RealEstateCommissionCalculator({ showTitle = true, primaryColor = '#820ECC' }: Props) {
  const [salePrice, setSalePrice] = useState<string>('');
  const [commissionRate, setCommissionRate] = useState<string>('');
  const [commissionAmount, setCommissionAmount] = useState<number | null>(null);
  const [netProceeds, setNetProceeds] = useState<number | null>(null);
  const [calculation, setCalculation] = useState('');

  const parse = (v: string) => parseFloat(v) || 0;

  const calculate = () => {
    const price = parse(salePrice);
    const rate = parse(commissionRate);

    if (!price || price <= 0 || (!rate && rate !== 0)) {
      setCommissionAmount(null);
      setNetProceeds(null);
      setCalculation('');
      return;
    }

    const commission = (price * rate) / 100;
    const net = price - commission;

    setCommissionAmount(commission);
    setNetProceeds(net);

    const steps = [];
    steps.push(`Sale Price: $${price.toFixed(2)}`);
    steps.push(`Commission Rate: ${rate.toFixed(2)}%`);
    steps.push(`Commission = Sale Price × (Commission Rate ÷ 100)`);
    steps.push(`Commission = $${price.toFixed(2)} × (${rate.toFixed(2)} ÷ 100) = $${commission.toFixed(2)}`);
    steps.push(`Net Proceeds = Sale Price − Commission = $${price.toFixed(2)} − $${commission.toFixed(2)} = $${net.toFixed(2)}`);

    setCalculation(steps.join('\n'));
  };

  useEffect(() => {
    if (salePrice && commissionRate) calculate();
  }, [salePrice, commissionRate]);

  return (
    <div className="w-full">
      {showTitle && (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Real Estate Commission Calculator</h2>
          <p className="text-gray-600 mb-6">Quickly calculate agent commission and net proceeds from a property sale using the sale price and commission rate.</p>
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
        <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">Input Sale Details</label>
            <p className="text-xs text-gray-600">Enter the sale price and the commission rate (percentage) to compute the commission and net proceeds.</p>
          </div>

          <Input label="Sale Price ($)" type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="e.g., 350000" step="0.01" min="0" autoFocus />

          <Input label="Commission Rate (%)" type="number" value={commissionRate} onChange={(e) => setCommissionRate(e.target.value)} placeholder="e.g., 6" step="0.01" min="0" />

          <div className="flex gap-3 pt-2">
            <Button onClick={calculate} className="flex-1" size="lg" style={{ backgroundColor: primaryColor }}>Calculate</Button>
            <Button onClick={() => { setSalePrice(''); setCommissionRate(''); setCommissionAmount(null); setNetProceeds(null); setCalculation(''); }} variant="outline" size="lg">Clear</Button>
          </div>
        </div>

        <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>

        <div>
          <div className="p-4 rounded-md min-h-[300px] transition-all duration-300 bg-[#F8F9FA]">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Results</h3>

            {commissionAmount != null ? (
              <div className="bg-white rounded-lg border p-6 space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Commission:</span>
                  <span className="font-mono font-semibold text-gray-900">${commissionAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 mt-2">
                  <span className="font-bold text-lg text-gray-900">Net Proceeds:</span>
                  <span className="font-mono font-bold text-xl">${netProceeds != null ? netProceeds.toFixed(2) : '0.00'}</span>
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
                  <div className="text-4xl mb-4">🧾</div>
                  <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                  <p className="text-sm">Enter sale price and commission rate to calculate agent commission and net proceeds.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
