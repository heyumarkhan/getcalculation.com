'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const lengthUnits = {
  'm': { name: 'm', factor: 1 },
  'cm': { name: 'cm', factor: 0.01 },
  'mm': { name: 'mm', factor: 0.001 },
  'in': { name: 'in', factor: 0.0254 },
  'ft': { name: 'ft', factor: 0.3048 }
};

interface CalculationResult {
  elongation: number | null;
  elongationUnit: string;
  strain: number | null;
  percentageElongation: number | null;
  originalLength: number | null;
  originalLengthUnit: string;
  finalLength: number | null;
  steps: string[];
}

export default function ElongationCalculator({
  primaryColor = '#820ECC'
}: {
  primaryColor?: string;
}) {
  const [originalLength, setOriginalLength] = useState('');
  const [finalLength, setFinalLength] = useState('');
  const [elongation, setElongation] = useState('');

  const [originalLengthUnit, setOriginalLengthUnit] = useState('m');
  const [finalLengthUnit, setFinalLengthUnit] = useState('m');
  const [elongationUnit, setElongationUnit] = useState('m');

  const [result, setResult] = useState<CalculationResult | null>(null);

  const formatValue = (value: number): string => {
    if (!isFinite(value)) return 'Invalid';
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    return value.toFixed(6);
  };

  const calculate = () => {
    const originalLengthVal = originalLength ? parseFloat(originalLength) : null;
    const finalLengthVal = finalLength ? parseFloat(finalLength) : null;
    const elongationVal = elongation ? parseFloat(elongation) : null;

    const steps: string[] = [];
    let filledCount = 0;

    if (originalLengthVal !== null && !isNaN(originalLengthVal) && originalLengthVal > 0) filledCount++;
    if (finalLengthVal !== null && !isNaN(finalLengthVal) && finalLengthVal > 0) filledCount++;
    if (elongationVal !== null && !isNaN(elongationVal)) filledCount++;

    if (filledCount < 2) {
      alert('Please enter at least 2 valid values');
      return;
    }

    try {
      // Convert to base units (meters)
      const originalLengthBase = originalLengthVal !== null && !isNaN(originalLengthVal) 
        ? originalLengthVal * lengthUnits[originalLengthUnit as keyof typeof lengthUnits].factor 
        : null;
      
      const finalLengthBase = finalLengthVal !== null && !isNaN(finalLengthVal) 
        ? finalLengthVal * lengthUnits[finalLengthUnit as keyof typeof lengthUnits].factor 
        : null;
      
      const elongationBase = elongationVal !== null && !isNaN(elongationVal) 
        ? elongationVal * lengthUnits[elongationUnit as keyof typeof lengthUnits].factor 
        : null;

      let resultElongation: number | null = null;
      let resultOriginalLength: number | null = null;
      let resultFinalLength: number | null = null;
      let resultStrain: number | null = null;
      let resultPercentageElongation: number | null = null;

      // Calculate based on what we have
      if (originalLengthBase !== null && finalLengthBase !== null) {
        // We have both lengths
        resultElongation = finalLengthBase - originalLengthBase;
        resultOriginalLength = originalLengthBase;
        resultFinalLength = finalLengthBase;
        
        steps.push(`Original Length (L₀) = ${formatValue(originalLengthBase)} m`);
        steps.push(`Final Length (L) = ${formatValue(finalLengthBase)} m`);
        steps.push(`Elongation (ΔL) = L - L₀ = ${formatValue(finalLengthBase)} - ${formatValue(originalLengthBase)}`);
        steps.push(`Elongation (ΔL) = ${formatValue(resultElongation)} m`);
      } else if (originalLengthBase !== null && elongationBase !== null) {
        // We have original length and elongation
        resultElongation = elongationBase;
        resultOriginalLength = originalLengthBase;
        resultFinalLength = originalLengthBase + elongationBase;
        
        steps.push(`Original Length (L₀) = ${formatValue(originalLengthBase)} m`);
        steps.push(`Elongation (ΔL) = ${formatValue(elongationBase)} m`);
        steps.push(`Final Length (L) = L₀ + ΔL = ${formatValue(originalLengthBase)} + ${formatValue(elongationBase)}`);
        steps.push(`Final Length (L) = ${formatValue(resultFinalLength)} m`);
      } else if (finalLengthBase !== null && elongationBase !== null) {
        // We have final length and elongation
        resultElongation = elongationBase;
        resultFinalLength = finalLengthBase;
        resultOriginalLength = finalLengthBase - elongationBase;
        
        steps.push(`Final Length (L) = ${formatValue(finalLengthBase)} m`);
        steps.push(`Elongation (ΔL) = ${formatValue(elongationBase)} m`);
        steps.push(`Original Length (L₀) = L - ΔL = ${formatValue(finalLengthBase)} - ${formatValue(elongationBase)}`);
        steps.push(`Original Length (L₀) = ${formatValue(resultOriginalLength)} m`);
      }

      // Calculate strain and percentage elongation if we have original length
      if (resultOriginalLength !== null && resultElongation !== null) {
        resultStrain = resultElongation / resultOriginalLength;
        resultPercentageElongation = resultStrain * 100;
        
        steps.push(`Strain (ε) = ΔL / L₀ = ${formatValue(resultElongation)} / ${formatValue(resultOriginalLength)}`);
        steps.push(`Strain (ε) = ${formatValue(resultStrain)}`);
        steps.push(`Percentage Elongation = ε × 100% = ${formatValue(resultPercentageElongation)}%`);
      }

      setResult({
        elongation: resultElongation,
        elongationUnit,
        strain: resultStrain,
        percentageElongation: resultPercentageElongation,
        originalLength: resultOriginalLength,
        originalLengthUnit,
        finalLength: resultFinalLength,
        steps
      });
    } catch (error) {
      alert('Invalid input. Please check your values.');
      setResult(null);
    }
  };

  const clearAll = () => {
    setOriginalLength('');
    setFinalLength('');
    setElongation('');
    setResult(null);
  };

  const resultElongation = result?.elongation ? result.elongation / lengthUnits[elongationUnit as keyof typeof lengthUnits].factor : null;
  const resultOriginalLength = result?.originalLength ? result.originalLength / lengthUnits[originalLengthUnit as keyof typeof lengthUnits].factor : null;
  const resultFinalLength = result?.finalLength ? result.finalLength / lengthUnits[finalLengthUnit as keyof typeof lengthUnits].factor : null;

  return (
    <div className="w-full space-y-6">
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-btn:hover {
            background-color: ${primaryColor}dd !important;
          }
          .custom-btn:focus {
            box-shadow: 0 0 0 3px ${primaryColor}40 !important;
          }
        `
      }} />

      <Card>
        <h2 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
          Elongation Calculator
        </h2>

        <div className="space-y-4">
          {/* Original Length Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Original Length (L₀)"
              value={originalLength}
              onChange={(e) => setOriginalLength(e.target.value)}
              placeholder="Enter original length"
              type="number"
              inputMode="decimal"
            />
            <select
              value={originalLengthUnit}
              onChange={(e) => setOriginalLengthUnit(e.target.value)}
              className="border border-gray-300 rounded p-2 bg-white"
            >
              {Object.entries(lengthUnits).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.name}
                </option>
              ))}
            </select>
          </div>

          {/* Final Length Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Final Length (L)"
              value={finalLength}
              onChange={(e) => setFinalLength(e.target.value)}
              placeholder="Enter final length"
              type="number"
              inputMode="decimal"
            />
            <select
              value={finalLengthUnit}
              onChange={(e) => setFinalLengthUnit(e.target.value)}
              className="border border-gray-300 rounded p-2 bg-white"
            >
              {Object.entries(lengthUnits).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.name}
                </option>
              ))}
            </select>
          </div>

          {/* Elongation Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Elongation (ΔL)"
              value={elongation}
              onChange={(e) => setElongation(e.target.value)}
              placeholder="Enter elongation"
              type="number"
              inputMode="decimal"
            />
            <select
              value={elongationUnit}
              onChange={(e) => setElongationUnit(e.target.value)}
              className="border border-gray-300 rounded p-2 bg-white"
            >
              {Object.entries(lengthUnits).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              onClick={calculate}
              className="custom-btn flex-1"
              style={{ backgroundColor: primaryColor }}
            >
              Calculate
            </Button>
            <Button onClick={clearAll} variant="secondary" className="flex-1">
              Clear
            </Button>
          </div>
        </div>
      </Card>

      {result && (
        <div className="space-y-4">
          {/* Results */}
          <Card>
            <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
              Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resultOriginalLength !== null && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, borderWidth: '1px' }}>
                  <p className="text-sm text-gray-600 mb-1">Original Length</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                    {formatValue(resultOriginalLength)} {originalLengthUnit}
                  </p>
                </div>
              )}
              {resultFinalLength !== null && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, borderWidth: '1px' }}>
                  <p className="text-sm text-gray-600 mb-1">Final Length</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                    {formatValue(resultFinalLength)} {finalLengthUnit}
                  </p>
                </div>
              )}
              {resultElongation !== null && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, borderWidth: '1px' }}>
                  <p className="text-sm text-gray-600 mb-1">Elongation</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                    {formatValue(resultElongation)} {elongationUnit}
                  </p>
                </div>
              )}
              {result.strain !== null && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, borderWidth: '1px' }}>
                  <p className="text-sm text-gray-600 mb-1">Strain (ε)</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                    {formatValue(result.strain)}
                  </p>
                </div>
              )}
              {result.percentageElongation !== null && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, borderWidth: '1px' }}>
                  <p className="text-sm text-gray-600 mb-1">Percentage Elongation</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                    {formatValue(result.percentageElongation)}%
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Calculation Steps */}
          <Card>
            <h3 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>
              Calculation Steps
            </h3>
            <ol className="space-y-2 list-decimal list-inside">
              {result.steps.map((step, idx) => (
                <li key={idx} className="text-gray-700">
                  {step}
                </li>
              ))}
            </ol>
          </Card>
        </div>
      )}
    </div>
  );
}
