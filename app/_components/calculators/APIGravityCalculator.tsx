'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const densityUnits = {
  'kg/m³': { name: 'kg/m³', factor: 1 },
  'g/cm³': { name: 'g/cm³', factor: 1000 },
  'g/mL': { name: 'g/mL', factor: 1000 },
  'lb/ft³': { name: 'lb/ft³', factor: 16.0185 },
  'lb/gal': { name: 'lb/gal (US)', factor: 119.826 }
};

interface CalculationResult {
  apiGravity: number | null;
  specificGravity: number | null;
  density: number | null;
  densityUnit: string;
  steps: string[];
}

export default function APIGravityCalculator({
  primaryColor = '#820ECC'
}: {
  primaryColor?: string;
}) {
  const [apiGravity, setApiGravity] = useState('');
  const [specificGravity, setSpecificGravity] = useState('');
  const [density, setDensity] = useState('');
  const [densityUnit, setDensityUnit] = useState('kg/m³');

  const [result, setResult] = useState<CalculationResult | null>(null);

  const formatValue = (value: number): string => {
    if (!isFinite(value)) return 'Invalid';
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    return value.toFixed(6);
  };

  const calculate = () => {
    const apiVal = apiGravity ? parseFloat(apiGravity) : null;
    const sgVal = specificGravity ? parseFloat(specificGravity) : null;
    const densityVal = density ? parseFloat(density) : null;

    const steps: string[] = [];
    let filledCount = 0;

    if (apiVal !== null && !isNaN(apiVal)) filledCount++;
    if (sgVal !== null && !isNaN(sgVal) && sgVal > 0) filledCount++;
    if (densityVal !== null && !isNaN(densityVal) && densityVal > 0) filledCount++;

    if (filledCount < 1) {
      alert('Please enter at least one valid value');
      return;
    }

    try {
      let resultAPI: number | null = null;
      let resultSG: number | null = null;
      let resultDensity: number | null = null;

      // Convert density to base units (kg/m³)
      const densityBase = densityVal !== null && !isNaN(densityVal)
        ? densityVal * densityUnits[densityUnit as keyof typeof densityUnits].factor
        : null;

      // Reference density of water at 15°C (60°F)
      const waterDensityBase = 999.1; // kg/m³

      // If we have SG, calculate API and density
      if (sgVal !== null && !isNaN(sgVal) && sgVal > 0) {
        resultSG = sgVal;
        resultAPI = (141.5 / sgVal) - 131.5;
        resultDensity = sgVal * waterDensityBase;

        steps.push(`Specific Gravity (SG) = ${formatValue(resultSG)}`);
        steps.push(`API Gravity = (141.5 / SG) - 131.5`);
        steps.push(`API = (141.5 / ${formatValue(resultSG)}) - 131.5`);
        steps.push(`API = ${formatValue(141.5 / resultSG)} - 131.5`);
        steps.push(`API = ${formatValue(resultAPI)}°`);
        steps.push(`Density = SG × ρ_water = ${formatValue(resultSG)} × ${formatValue(waterDensityBase)}`);
        steps.push(`Density = ${formatValue(resultDensity)} kg/m³`);
      }
      // If we have API, calculate SG and density
      else if (apiVal !== null && !isNaN(apiVal)) {
        resultAPI = apiVal;
        resultSG = 141.5 / (apiVal + 131.5);
        resultDensity = resultSG * waterDensityBase;

        steps.push(`API Gravity = ${formatValue(resultAPI)}°`);
        steps.push(`SG = 141.5 / (API + 131.5)`);
        steps.push(`SG = 141.5 / (${formatValue(resultAPI)} + 131.5)`);
        steps.push(`SG = 141.5 / ${formatValue(resultAPI + 131.5)}`);
        steps.push(`SG = ${formatValue(resultSG)}`);
        steps.push(`Density = SG × ρ_water = ${formatValue(resultSG)} × ${formatValue(waterDensityBase)}`);
        steps.push(`Density = ${formatValue(resultDensity)} kg/m³`);
      }
      // If we have density, calculate API and SG
      else if (densityBase !== null && !isNaN(densityBase) && densityBase > 0) {
        resultDensity = densityBase;
        resultSG = densityBase / waterDensityBase;
        resultAPI = (141.5 / resultSG) - 131.5;

        steps.push(`Density = ${formatValue(densityBase)} kg/m³`);
        steps.push(`Water Density (reference, 15°C) = ${formatValue(waterDensityBase)} kg/m³`);
        steps.push(`Specific Gravity (SG) = Density / ρ_water`);
        steps.push(`SG = ${formatValue(densityBase)} / ${formatValue(waterDensityBase)}`);
        steps.push(`SG = ${formatValue(resultSG)}`);
        steps.push(`API Gravity = (141.5 / SG) - 131.5`);
        steps.push(`API = (141.5 / ${formatValue(resultSG)}) - 131.5`);
        steps.push(`API = ${formatValue(resultAPI)}°`);
      }

      // Classify oil type based on API gravity
      let oilType = '';
      if (resultAPI !== null) {
        if (resultAPI < 10) oilType = 'Extra Heavy Crude Oil';
        else if (resultAPI < 22) oilType = 'Heavy Crude Oil';
        else if (resultAPI < 32) oilType = 'Medium Crude Oil';
        else if (resultAPI < 45) oilType = 'Light Crude Oil';
        else oilType = 'Extra Light Crude Oil';
        steps.push(`Oil Classification: ${oilType}`);
      }

      setResult({
        apiGravity: resultAPI,
        specificGravity: resultSG,
        density: resultDensity,
        densityUnit: 'kg/m³',
        steps
      });
    } catch (error) {
      alert('Invalid input. Please check your values.');
      setResult(null);
    }
  };

  const clearAll = () => {
    setApiGravity('');
    setSpecificGravity('');
    setDensity('');
    setResult(null);
  };

  const resultDensity = result?.density ? result.density / densityUnits[densityUnit as keyof typeof densityUnits].factor : null;

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
          API Gravity Calculator
        </h2>

        <div className="space-y-4">
          {/* API Gravity Input */}
          <Input
            label="API Gravity (°API)"
            value={apiGravity}
            onChange={(e) => setApiGravity(e.target.value)}
            placeholder="Enter API gravity (typical range: -5 to 100)"
            type="number"
            inputMode="decimal"
          />

          {/* Specific Gravity Input */}
          <Input
            label="Specific Gravity (SG)"
            value={specificGravity}
            onChange={(e) => setSpecificGravity(e.target.value)}
            placeholder="Enter specific gravity (0.5 to 1.5 typical)"
            type="number"
            inputMode="decimal"
          />

          {/* Density Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Density (ρ)"
              value={density}
              onChange={(e) => setDensity(e.target.value)}
              placeholder="Enter density"
              type="number"
              inputMode="decimal"
            />
            <select
              value={densityUnit}
              onChange={(e) => setDensityUnit(e.target.value)}
              className="border border-gray-300 rounded p-2 bg-white"
            >
              {Object.entries(densityUnits).map(([key, val]) => (
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.apiGravity !== null && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, borderWidth: '1px' }}>
                  <p className="text-sm text-gray-600 mb-1">API Gravity</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                    {formatValue(result.apiGravity)}°
                  </p>
                </div>
              )}
              {result.specificGravity !== null && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, borderWidth: '1px' }}>
                  <p className="text-sm text-gray-600 mb-1">Specific Gravity</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                    {formatValue(result.specificGravity)}
                  </p>
                </div>
              )}
              {result.density !== null && resultDensity !== null && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, borderWidth: '1px' }}>
                  <p className="text-sm text-gray-600 mb-1">Density</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                    {formatValue(resultDensity)} {densityUnit}
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
