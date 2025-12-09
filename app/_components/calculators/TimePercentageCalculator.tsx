'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface TimePercentageCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function TimePercentageCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: TimePercentageCalculatorProps) {
  const [timePart, setTimePart] = useState<string>('');
  const [timeWhole, setTimeWhole] = useState<string>('');
  const [timeUnit, setTimeUnit] = useState<'hours' | 'minutes' | 'seconds'>('hours');
  const [result, setResult] = useState<number | null>(null);
  const [calculation, setCalculation] = useState<string>('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const convertToMinutes = (value: number, unit: string): number => {
    switch (unit) {
      case 'hours':
        return value * 60;
      case 'minutes':
        return value;
      case 'seconds':
        return value / 60;
      default:
        return value;
    }
  };

  const formatTime = (minutes: number, unit: string): string => {
    switch (unit) {
      case 'hours':
        return `${(minutes / 60).toFixed(2)} hours`;
      case 'minutes':
        return `${minutes.toFixed(2)} minutes`;
      case 'seconds':
        return `${(minutes * 60).toFixed(2)} seconds`;
      default:
        return `${minutes.toFixed(2)} minutes`;
    }
  };

  const calculateTimePercentage = () => {
    const part = parseFloat(timePart);
    const whole = parseFloat(timeWhole);

    if (isNaN(part) || isNaN(whole)) {
      alert('Please enter valid numbers for both time values.');
      setResult(null);
      setCalculation('');
      return;
    }

    if (whole <= 0) {
      alert('The total time must be greater than zero.');
      setResult(null);
      setCalculation('');
      return;
    }

    if (part < 0) {
      alert('The part time cannot be negative.');
      setResult(null);
      setCalculation('');
      return;
    }

    // Convert both to minutes for calculation
    const partMinutes = convertToMinutes(part, timeUnit);
    const wholeMinutes = convertToMinutes(whole, timeUnit);
    
    // Calculate percentage
    const percentage = (partMinutes / wholeMinutes) * 100;
    
    const calculationString = `Time Percentage = (${formatTime(partMinutes, timeUnit)} / ${formatTime(wholeMinutes, timeUnit)}) × 100 = (${formatValue(partMinutes)} / ${formatValue(wholeMinutes)}) × 100 = ${formatValue(percentage)}%`;
    
    setResult(percentage);
    setCalculation(calculationString);
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'part':
        setTimePart(value);
        break;
      case 'whole':
        setTimeWhole(value);
        break;
      default:
        break;
    }
  };

  const getColorClasses = (color: string) => {
    // Add # if it's missing
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
          backgroundColor: `${hexColor}10`, // 10% opacity
          borderColor: `${hexColor}30` // 30% opacity
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Time Percentage Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate what percentage one time period is of another:</p>
          </>
        )}
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
        {/* Calculator Form - Left Side */}
        <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
          {/* Time Unit Selection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Time Unit</h3>
            <div className="flex space-x-4">
              {['hours', 'minutes', 'seconds'].map((unit) => (
                <label key={unit} className="flex items-center">
                  <input
                    type="radio"
                    name="timeUnit"
                    value={unit}
                    checked={timeUnit === unit}
                    onChange={(e) => setTimeUnit(e.target.value as typeof timeUnit)}
                    className="mr-2"
                  />
                  <span className="capitalize">{unit}</span>
                </label>
              ))}
            </div>
          </div>

          <Input
            label="Part Time (the portion)"
            type="text"
            value={timePart}
            onChange={(e) => handleInputChange('part', e.target.value)}
            placeholder={`Enter time in ${timeUnit}`}
            autoFocus
          />

          <Input
            label="Total Time (the whole)"
            type="text"
            value={timeWhole}
            onChange={(e) => handleInputChange('whole', e.target.value)}
            placeholder={`Enter total time in ${timeUnit}`}
          />

          <Button 
            onClick={calculateTimePercentage}
            className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate Percentage
          </Button>
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
              Percentage Result
            </h3>
            
            {result !== null ? (
              <div className="animate-fadeIn">
                <div className="bg-white rounded-lg border p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700 text-lg">Percentage:</span>
                      <span className="font-mono font-bold text-xl text-gray-900">{formatValue(result)}%</span>
                    </div>
                    <div className="pt-4">
                      <span className="font-medium text-gray-700 text-sm block mb-2">Calculation:</span>
                      <span className="font-mono text-sm text-gray-800 break-all">{calculation}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">⏱️</div>
                  <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                  <p className="text-sm">Enter time values to calculate the percentage</p>
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

