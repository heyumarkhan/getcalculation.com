'use client';

import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface OvertimeCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function OvertimeCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: OvertimeCalculatorProps) {
  const [regularHours, setRegularHours] = useState<string>('');
  const [overtimeHours, setOvertimeHours] = useState<string>('');
  const [totalHours, setTotalHours] = useState<string>('');
  const [regularRate, setRegularRate] = useState<string>('');
  const [overtimeMultiplier, setOvertimeMultiplier] = useState<string>('1.5');
  const [overtimeThreshold, setOvertimeThreshold] = useState<string>('40');
  const [calculationMode, setCalculationMode] = useState<'separate' | 'total'>('total');
  const [result, setResult] = useState<{
    regularHours: number;
    overtimeHours: number;
    regularPay: number;
    overtimePay: number;
    totalPay: number;
  } | null>(null);
  const [calculation, setCalculation] = useState('');

  const formatCurrency = (value: number): string => {
    if (isNaN(value) || !isFinite(value)) {
      return '$0.00';
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatHours = (value: number): string => {
    if (isNaN(value) || !isFinite(value)) {
      return '0.00';
    }
    return value.toFixed(2);
  };

  const calculateOvertime = () => {
    const rate = parseFloat(regularRate);
    const multiplier = parseFloat(overtimeMultiplier);
    const threshold = parseFloat(overtimeThreshold);

    if (!rate || rate <= 0) {
      setResult(null);
      setCalculation('');
      return;
    }

    let regHours = 0;
    let otHours = 0;

    if (calculationMode === 'total') {
      const total = parseFloat(totalHours) || 0;
      if (total > threshold) {
        regHours = threshold;
        otHours = total - threshold;
      } else {
        regHours = total;
        otHours = 0;
      }
    } else {
      regHours = parseFloat(regularHours) || 0;
      otHours = parseFloat(overtimeHours) || 0;
    }

    const regularPay = regHours * rate;
    const overtimeRate = rate * multiplier;
    const overtimePay = otHours * overtimeRate;
    const totalPay = regularPay + overtimePay;

    setResult({
      regularHours: regHours,
      overtimeHours: otHours,
      regularPay,
      overtimePay,
      totalPay
    });

    // Build calculation string
    let calcSteps = [];
    if (calculationMode === 'total') {
      calcSteps.push(`Total Hours: ${formatHours(parseFloat(totalHours) || 0)}`);
      if (parseFloat(totalHours) > threshold) {
        calcSteps.push(`Regular Hours: ${formatHours(regHours)} (up to ${threshold} hours)`);
        calcSteps.push(`Overtime Hours: ${formatHours(otHours)} (hours over ${threshold})`);
      } else {
        calcSteps.push(`Regular Hours: ${formatHours(regHours)}`);
        calcSteps.push(`Overtime Hours: ${formatHours(otHours)}`);
      }
    } else {
      calcSteps.push(`Regular Hours: ${formatHours(regHours)}`);
      calcSteps.push(`Overtime Hours: ${formatHours(otHours)}`);
    }
    calcSteps.push(`Regular Pay: ${formatHours(regHours)} × ${formatCurrency(rate)} = ${formatCurrency(regularPay)}`);
    if (otHours > 0) {
      calcSteps.push(`Overtime Rate: ${formatCurrency(rate)} × ${multiplier} = ${formatCurrency(overtimeRate)}`);
      calcSteps.push(`Overtime Pay: ${formatHours(otHours)} × ${formatCurrency(overtimeRate)} = ${formatCurrency(overtimePay)}`);
    }
    calcSteps.push(`Total Gross Pay: ${formatCurrency(regularPay)} + ${formatCurrency(overtimePay)} = ${formatCurrency(totalPay)}`);

    setCalculation(calcSteps.join('\n'));
  };

  useEffect(() => {
    if (regularRate && (calculationMode === 'total' ? totalHours : (regularHours || overtimeHours))) {
      calculateOvertime();
    }
  }, [regularHours, overtimeHours, totalHours, regularRate, overtimeMultiplier, overtimeThreshold, calculationMode]);

  const clearAll = () => {
    setRegularHours('');
    setOvertimeHours('');
    setTotalHours('');
    setRegularRate('');
    setOvertimeMultiplier('1.5');
    setOvertimeThreshold('40');
    setResult(null);
    setCalculation('');
  };

  const getColorClasses = (color: string) => {
    const hexColor = color.startsWith('#') ? color : `#${color}`;
    
    return {
      button: '',
      result: '',
      resultBg: '',
      resultBorder: '',
      resultText: '',
      customStyles: {
        button: {
          backgroundColor: hexColor,
          '--hover-color': hexColor,
          '--focus-color': hexColor
        } as React.CSSProperties,
        result: {
          color: hexColor
        } as React.CSSProperties,
        resultBg: {
          backgroundColor: `${hexColor}10`,
          borderColor: `${hexColor}30`
        } as React.CSSProperties,
        resultText: {
          color: hexColor
        } as React.CSSProperties
      }
    };
  };

  const colors = getColorClasses(primaryColor);

  return (
    <>
      {colors.customStyles && (
        <style dangerouslySetInnerHTML={{
          __html: `
            .custom-color-button:hover {
              background-color: ${primaryColor}dd !important;
            }
            .custom-color-button:focus {
              box-shadow: 0 0 0 3px ${primaryColor}40 !important;
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out;
            }
          `
        }} />
      )}
      <div className="w-full">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overtime Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate your overtime pay based on hours worked and pay rate</p>
          </>
        )}
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
        {/* Calculator Form - Left Side */}
        <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Calculation Mode
            </label>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setCalculationMode('total');
                  setRegularHours('');
                  setOvertimeHours('');
                }}
                variant={calculationMode === 'total' ? 'primary' : 'outline'}
                className={`flex-1 ${calculationMode === 'total' ? '' : 'bg-white'}`}
                style={calculationMode === 'total' ? colors.customStyles?.button : undefined}
              >
                Total Hours
              </Button>
              <Button
                onClick={() => {
                  setCalculationMode('separate');
                  setTotalHours('');
                }}
                variant={calculationMode === 'separate' ? 'primary' : 'outline'}
                className={`flex-1 ${calculationMode === 'separate' ? '' : 'bg-white'}`}
                style={calculationMode === 'separate' ? colors.customStyles?.button : undefined}
              >
                Separate
              </Button>
            </div>
          </div>

          {calculationMode === 'total' ? (
            <Input
              label="Total Hours Worked"
              type="number"
              value={totalHours}
              onChange={(e) => setTotalHours(e.target.value)}
              placeholder="e.g., 45"
              step="0.01"
              min="0"
              autoFocus
            />
          ) : (
            <>
              <Input
                label="Regular Hours"
                type="number"
                value={regularHours}
                onChange={(e) => setRegularHours(e.target.value)}
                placeholder="e.g., 40"
                step="0.01"
                min="0"
                autoFocus
              />
              <Input
                label="Overtime Hours"
                type="number"
                value={overtimeHours}
                onChange={(e) => setOvertimeHours(e.target.value)}
                placeholder="e.g., 5"
                step="0.01"
                min="0"
              />
            </>
          )}

          <Input
            label="Regular Pay Rate (per hour)"
            type="number"
            value={regularRate}
            onChange={(e) => setRegularRate(e.target.value)}
            placeholder="e.g., 25.00"
            step="0.01"
            min="0"
          />

          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <Input
              label="Overtime Threshold (hours)"
              type="number"
              value={overtimeThreshold}
              onChange={(e) => setOvertimeThreshold(e.target.value)}
              placeholder="e.g., 40"
              step="0.01"
              min="0"
            />
            <Input
              label="Overtime Multiplier"
              type="number"
              value={overtimeMultiplier}
              onChange={(e) => setOvertimeMultiplier(e.target.value)}
              placeholder="e.g., 1.5"
              step="0.1"
              min="1"
            />
            <p className="text-xs text-gray-500">
              Standard overtime is 1.5x (time and a half). Some employers offer 2x (double time) for holidays or weekends.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button 
              onClick={calculateOvertime}
              className={`flex-1 ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
              style={colors.customStyles?.button}
              size="lg"
            >
              Calculate
            </Button>
            <Button 
              onClick={clearAll}
              variant="outline"
              size="lg"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>

        {/* Results Section - Right Side */}
        <div>
          <div 
            className={`p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md min-h-[400px] transition-all duration-300`}
            style={colors.customStyles?.resultBg}
          >
            <h3 
              className={`text-lg font-semibold ${colors.resultText} mb-4`}
              style={colors.customStyles?.resultText}
            >
              Pay Breakdown
            </h3>
            
            {result !== null ? (
              <div className="animate-fadeIn">
                <div className="bg-white rounded-lg border p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Regular Hours:</span>
                      <span className="font-mono font-semibold text-gray-900">{formatHours(result.regularHours)} hrs</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Overtime Hours:</span>
                      <span className="font-mono font-semibold text-gray-900">{formatHours(result.overtimeHours)} hrs</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Regular Pay:</span>
                      <span className="font-mono font-semibold text-gray-900">{formatCurrency(result.regularPay)}</span>
                    </div>
                    {result.overtimeHours > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Overtime Pay:</span>
                        <span className="font-mono font-semibold text-gray-900">{formatCurrency(result.overtimePay)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 mt-2">
                      <span className="font-bold text-lg text-gray-900">Total Gross Pay:</span>
                      <span className="font-mono font-bold text-xl" style={colors.customStyles?.resultText}>
                        {formatCurrency(result.totalPay)}
                      </span>
                    </div>
                  </div>
                  
                  {calculation && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-2 text-sm">Calculation Steps:</h4>
                      <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono bg-gray-50 p-3 rounded">
                        {calculation}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">💰</div>
                  <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                  <p className="text-sm">Enter your hours and pay rate to calculate overtime pay</p>
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

