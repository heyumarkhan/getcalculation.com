'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const angularVelocityUnits = {
  'rpm': { name: 'rpm (Revolutions per minute)', factor: 1 },
  'rps': { name: 'rps (Revolutions per second)', factor: 60 },
  'rad/s': { name: 'rad/s (Radians per second)', factor: 9.5493 },
  'deg/s': { name: 'deg/s (Degrees per second)', factor: 0.166667 }
};

type CalculationMode = 'teeth' | 'speed';

export default function GearRatioCalculator() {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('teeth');
  const [gearRatio, setGearRatio] = useState('');
  const [drivingTeeth, setDrivingTeeth] = useState('');
  const [drivenTeeth, setDrivenTeeth] = useState('');
  const [inputSpeed, setInputSpeed] = useState('');
  const [outputSpeed, setOutputSpeed] = useState('');
  const [speedUnit, setSpeedUnit] = useState('rpm');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'ratio' | 'drivingTeeth' | 'drivenTeeth' | 'inputSpeed' | 'outputSpeed' } | null>(null);
  const [calculation, setCalculation] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    if (Math.abs(value) >= 1000000) {
      return value.toExponential(4);
    }
    return value.toFixed(4).replace(/\.?0+$/, '');
  };

  const calculate = () => {
    if (calculationMode === 'teeth') {
      // Mode: Using number of teeth
      const ratio = gearRatio ? parseFloat(gearRatio) : NaN;
      const driving = drivingTeeth ? parseFloat(drivingTeeth) : NaN;
      const driven = drivenTeeth ? parseFloat(drivenTeeth) : NaN;

      const filledCount = [gearRatio, drivingTeeth, drivenTeeth].filter(val => val !== '').length;

      if (filledCount !== 2) {
        setResult(null);
        setCalculation('');
        return;
      }

      // Validate that filled values are valid numbers
      if (gearRatio && (isNaN(ratio) || ratio <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for gear ratio');
        return;
      }
      if (drivingTeeth && (isNaN(driving) || driving <= 0 || !Number.isInteger(driving))) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive integer for driving gear teeth');
        return;
      }
      if (drivenTeeth && (isNaN(driven) || driven <= 0 || !Number.isInteger(driven))) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive integer for driven gear teeth');
        return;
      }

      if (!gearRatio) {
        // Calculate gear ratio: GR = Driven teeth / Driving teeth
        const ratioResult = driven / driving;
        
        setResult({ value: ratioResult, unit: ':', type: 'ratio' });
        setCalculation(`Gear Ratio = Driven Teeth / Driving Teeth = ${Math.round(driven)} / ${Math.round(driving)} = ${formatValue(ratioResult)}:1`);
      } else if (!drivenTeeth) {
        // Calculate driven teeth: Driven = GR × Driving
        const drivenResult = ratio * driving;
        
        if (!Number.isInteger(drivenResult) || drivenResult <= 0) {
          setResult(null);
          setCalculation('Error: Calculated teeth must be a positive integer');
          return;
        }
        
        setResult({ value: drivenResult, unit: 'teeth', type: 'drivenTeeth' });
        setCalculation(`Driven Teeth = Gear Ratio × Driving Teeth = ${formatValue(ratio)} × ${Math.round(driving)} = ${Math.round(drivenResult)} teeth`);
      } else if (!drivingTeeth) {
        // Calculate driving teeth: Driving = Driven / GR
        const drivingResult = driven / ratio;
        
        if (!Number.isInteger(drivingResult) || drivingResult <= 0) {
          setResult(null);
          setCalculation('Error: Calculated teeth must be a positive integer');
          return;
        }
        
        setResult({ value: drivingResult, unit: 'teeth', type: 'drivingTeeth' });
        setCalculation(`Driving Teeth = Driven Teeth / Gear Ratio = ${Math.round(driven)} / ${formatValue(ratio)} = ${Math.round(drivingResult)} teeth`);
      }
    } else {
      // Mode: Using speeds
      const ratio = gearRatio ? parseFloat(gearRatio) : NaN;
      const input = inputSpeed ? parseFloat(inputSpeed) : NaN;
      const output = outputSpeed ? parseFloat(outputSpeed) : NaN;

      const filledCount = [gearRatio, inputSpeed, outputSpeed].filter(val => val !== '').length;

      if (filledCount !== 2) {
        setResult(null);
        setCalculation('');
        return;
      }

      // Validate that filled values are valid numbers
      if (gearRatio && (isNaN(ratio) || ratio <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for gear ratio');
        return;
      }
      if (inputSpeed && (isNaN(input) || input <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for input speed');
        return;
      }
      if (outputSpeed && (isNaN(output) || output <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for output speed');
        return;
      }

      if (!gearRatio) {
        // Calculate gear ratio: GR = Input speed / Output speed
        const ratioResult = input / output;
        
        setResult({ value: ratioResult, unit: ':', type: 'ratio' });
        setCalculation(`Gear Ratio = Input Speed / Output Speed = ${formatValue(input)} ${speedUnit} / ${formatValue(output)} ${speedUnit} = ${formatValue(ratioResult)}:1`);
      } else if (!outputSpeed) {
        // Calculate output speed: Output = Input / GR
        const outputResult = input / ratio;
        
        setResult({ value: outputResult, unit: speedUnit, type: 'outputSpeed' });
        setCalculation(`Output Speed = Input Speed / Gear Ratio = ${formatValue(input)} ${speedUnit} / ${formatValue(ratio)} = ${formatValue(outputResult)} ${speedUnit}`);
      } else if (!inputSpeed) {
        // Calculate input speed: Input = Output × GR
        const inputResult = output * ratio;
        
        setResult({ value: inputResult, unit: speedUnit, type: 'inputSpeed' });
        setCalculation(`Input Speed = Output Speed × Gear Ratio = ${formatValue(output)} ${speedUnit} × ${formatValue(ratio)} = ${formatValue(inputResult)} ${speedUnit}`);
      }
    }
  };

  const clearAll = () => {
    setGearRatio('');
    setDrivingTeeth('');
    setDrivenTeeth('');
    setInputSpeed('');
    setOutputSpeed('');
    setSpeedUnit('rpm');
    setResult(null);
    setCalculation('');
  };

  const getResultColor = () => {
    return 'bg-[#820ECC]/10 border-[#820ECC]/30';
  };

  const getResultTextColor = () => {
    return 'text-[#820ECC]';
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Gear Ratio Calculator</h2>
        <p className="text-gray-600">Calculate gear ratio from number of teeth or speeds</p>
      </div>

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Calculation Method
          </label>
          <select
            value={calculationMode}
            onChange={(e) => {
              setCalculationMode(e.target.value as CalculationMode);
              clearAll();
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="teeth">Using Number of Teeth</option>
            <option value="speed">Using Speeds (rpm, rad/s, etc.)</option>
          </select>
        </div>

        {/* Gear Ratio Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Gear Ratio (GR)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter gear ratio"
                value={gearRatio}
                onChange={(e) => setGearRatio(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-24">
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 text-sm flex items-center justify-center">
                :1
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Gear ratio is expressed as a ratio (e.g., 2:1 means 2 times speed reduction)</p>
        </div>

        {/* Teeth Mode Inputs */}
        {calculationMode === 'teeth' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Driving Gear Teeth (Input)
              </label>
              <Input
                type="text"
                placeholder="Enter number of teeth on driving gear"
                value={drivingTeeth}
                onChange={(e) => setDrivingTeeth(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Driven Gear Teeth (Output)
              </label>
              <Input
                type="text"
                placeholder="Enter number of teeth on driven gear"
                value={drivenTeeth}
                onChange={(e) => setDrivenTeeth(e.target.value)}
                className="w-full"
              />
            </div>
          </>
        )}

        {/* Speed Mode Inputs */}
        {calculationMode === 'speed' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Input Speed (Driving Gear)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter input speed"
                    value={inputSpeed}
                    onChange={(e) => setInputSpeed(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={speedUnit}
                    onChange={(e) => setSpeedUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                  >
                    {Object.entries(angularVelocityUnits).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Output Speed (Driven Gear)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter output speed"
                    value={outputSpeed}
                    onChange={(e) => setOutputSpeed(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={speedUnit}
                    onChange={(e) => setSpeedUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                  >
                    {Object.entries(angularVelocityUnits).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex gap-3 pt-2">
          <Button onClick={calculate} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className={`mt-6 p-4 ${getResultColor()} border rounded-lg`}>
            <h3 className={`text-lg font-semibold ${getResultTextColor()} mb-2`}>Result</h3>
            <p className={`text-2xl font-bold ${getResultTextColor()}`}>
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && (
              <p className={`text-sm ${getResultTextColor()}/80 mt-2 font-mono break-words`}>
                {calculation}
              </p>
            )}
          </div>
        )}

        {calculation && calculation.startsWith('Error:') && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-mono">{calculation}</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {calculationMode === 'teeth' ? (
              <>
                <li>• Enter any two values to calculate the third (Gear Ratio, Driving Teeth, or Driven Teeth)</li>
                <li>• Leave the value you want to calculate empty</li>
                <li>• Formula: Gear Ratio = Driven Teeth / Driving Teeth</li>
                <li>• A ratio greater than 1 means speed reduction (output slower than input)</li>
                <li>• A ratio less than 1 means speed increase (output faster than input)</li>
              </>
            ) : (
              <>
                <li>• Enter any two values to calculate the third (Gear Ratio, Input Speed, or Output Speed)</li>
                <li>• Leave the value you want to calculate empty</li>
                <li>• Formula: Gear Ratio = Input Speed / Output Speed</li>
                <li>• Select your preferred speed unit (rpm, rps, rad/s, deg/s)</li>
                <li>• The calculator automatically handles unit conversions</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </Card>
  );
}

