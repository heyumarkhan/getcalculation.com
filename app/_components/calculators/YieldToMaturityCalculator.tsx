'use client';

import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface YTMCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function YieldToMaturityCalculator({ showTitle = true, primaryColor = '#820ECC' }: YTMCalculatorProps) {
  const [faceValue, setFaceValue] = useState<string>('1000');
  const [couponRate, setCouponRate] = useState<string>('');
  const [currentPrice, setCurrentPrice] = useState<string>('');
  const [yearsToMaturity, setYearsToMaturity] = useState<string>('');
  const [result, setResult] = useState<null | { ytm: number; annualCoupon: number; totalCoupons: number }>(null);
  const [calculation, setCalculation] = useState('');

  const parse = (v: string) => parseFloat(v) || 0;

  const calculateYTM = () => {
    const fv = parse(faceValue);
    const cr = parse(couponRate);
    const cp = parse(currentPrice);
    const ytm = parse(yearsToMaturity);

    if (!fv || !cr || !cp || !ytm || fv <= 0 || cp <= 0 || ytm <= 0) {
      setResult(null);
      setCalculation('');
      return;
    }

    const annualCoupon = fv * (cr / 100);
    const totalCoupons = annualCoupon * ytm;
    const totalReturn = (fv - cp) + totalCoupons;
    const avgInvestment = (fv + cp) / 2;
    const ytmApprox = (totalReturn / ytm) / avgInvestment;

    setResult({ ytm: ytmApprox * 100, annualCoupon, totalCoupons });

    const steps = [];
    steps.push(`Face Value: ${fv.toFixed(2)}`);
    steps.push(`Coupon Rate: ${cr.toFixed(2)}%`);
    steps.push(`Current Price: ${cp.toFixed(2)}`);
    steps.push(`Years to Maturity: ${ytm.toFixed(2)}`);
    steps.push('');
    steps.push(`Annual Coupon = Face Value × Coupon Rate`);
    steps.push(`= ${fv.toFixed(2)} × ${(cr / 100).toFixed(4)}`);
    steps.push(`= ${annualCoupon.toFixed(2)}`);
    steps.push('');
    steps.push(`Total Coupons = Annual Coupon × Years`);
    steps.push(`= ${annualCoupon.toFixed(2)} × ${ytm.toFixed(2)}`);
    steps.push(`= ${totalCoupons.toFixed(2)}`);
    steps.push('');
    steps.push(`Total Return = (Face Value - Current Price) + Total Coupons`);
    steps.push(`= (${fv.toFixed(2)} - ${cp.toFixed(2)}) + ${totalCoupons.toFixed(2)}`);
    steps.push(`= ${totalReturn.toFixed(2)}`);
    steps.push('');
    steps.push(`YTM (Approximation) = (Annual Return) / Average Investment`);
    steps.push(`= (${(totalReturn / ytm).toFixed(2)}) / ${avgInvestment.toFixed(2)}`);
    steps.push(`= ${(ytmApprox * 100).toFixed(4)}%`);

    setCalculation(steps.join('\n'));
  };

  useEffect(() => {
    if (faceValue && couponRate && currentPrice && yearsToMaturity) calculateYTM();
  }, [faceValue, couponRate, currentPrice, yearsToMaturity]);

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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Yield to Maturity Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the yield to maturity (YTM) of a bond based on face value, coupon rate, current price, and time to maturity.</p>
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
          <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Bond Parameters</h3>
              <div className="space-y-3">
                <Input label="Face Value ($)" type="number" value={faceValue} onChange={(e) => setFaceValue(e.target.value)} placeholder="e.g., 1000" step="0.01" min="0" />
                <Input label="Coupon Rate (%)" type="number" value={couponRate} onChange={(e) => setCouponRate(e.target.value)} placeholder="e.g., 5" step="0.01" min="0" />
                <Input label="Current Price ($)" type="number" value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} placeholder="e.g., 950" step="0.01" min="0" autoFocus />
                <Input label="Years to Maturity" type="number" value={yearsToMaturity} onChange={(e) => setYearsToMaturity(e.target.value)} placeholder="e.g., 10" step="0.01" min="0" />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={calculateYTM} className={`flex-1 ${colors.customStyles ? 'custom-color-button' : ''}`} style={colors.customStyles.button} size="lg">Calculate</Button>
              <Button onClick={() => { setFaceValue('1000'); setCouponRate(''); setCurrentPrice(''); setYearsToMaturity(''); setResult(null); setCalculation(''); }} variant="outline" size="lg">Clear</Button>
            </div>
          </div>

          <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>

          <div>
            <div className="p-4 rounded-md min-h-[400px] transition-all duration-300" style={colors.customStyles.resultBg}>
              <h3 className="text-lg font-semibold mb-4" style={colors.customStyles.resultText}>YTM Results</h3>

              {result ? (
                <div className="animate-fadeIn">
                  <div className="bg-white rounded-lg border p-6 space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Annual Coupon:</span>
                      <span className="font-mono font-semibold text-gray-900">${result.annualCoupon.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Total Coupons:</span>
                      <span className="font-mono font-semibold text-gray-900">${result.totalCoupons.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 mt-2">
                      <span className="font-bold text-lg text-gray-900">Yield to Maturity:</span>
                      <span className="font-mono font-bold text-xl" style={colors.customStyles.resultText}>{result.ytm.toFixed(4)}%</span>
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
                    <p className="text-sm">Enter bond parameters to calculate yield to maturity</p>
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
