'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: kg/m³)
const densityUnits = {
  'kg/m³': { name: 'kg/m³', factor: 1 },
  'g/cm³': { name: 'g/cm³', factor: 1000 },
  'g/mL': { name: 'g/mL', factor: 1000 },
  'lb/ft³': { name: 'lb/ft³', factor: 16.0185 },
  'lb/in³': { name: 'lb/in³', factor: 27679.9 },
  'oz/in³': { name: 'oz/in³', factor: 1729.99 }
};

// Standard reference densities (water at different temperatures)
const referenceDensities = {
  'water_4c': { name: 'Water at 4°C (Standard)', density: 1000 }, // kg/m³
  'water_20c': { name: 'Water at 20°C', density: 998.2 },
  'water_25c': { name: 'Water at 25°C', density: 997.0 },
  'water_room': { name: 'Water at Room Temperature (~20°C)', density: 998.2 },
  'custom': { name: 'Custom Reference', density: 1000 }
};

export default function SpecificGravityCalculator() {
  const [specificGravity, setSpecificGravity] = useState('');
  const [substanceDensity, setSubstanceDensity] = useState('');
  const [referenceDensity, setReferenceDensity] = useState('');
  const [substanceDensityUnit, setSubstanceDensityUnit] = useState('kg/m³');
  const [referenceDensityUnit, setReferenceDensityUnit] = useState('kg/m³');
  const [referenceType, setReferenceType] = useState<keyof typeof referenceDensities>('water_4c');
  const [customReferenceDensity, setCustomReferenceDensity] = useState('');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'specificGravity' | 'substanceDensity' | 'referenceDensity' } | null>(null);
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

  const convertDensityToBase = (value: number, unit: string) => {
    return value * densityUnits[unit as keyof typeof densityUnits].factor;
  };

  const convertDensityFromBase = (value: number, unit: string) => {
    return value / densityUnits[unit as keyof typeof densityUnits].factor;
  };

  const getReferenceDensityValue = (): number => {
    if (referenceType === 'custom') {
      const custom = parseFloat(customReferenceDensity);
      if (isNaN(custom) || custom <= 0) {
        return 1000; // Default to water
      }
      return convertDensityToBase(custom, referenceDensityUnit);
    }
    return referenceDensities[referenceType].density;
  };

  const calculate = () => {
    const sg = specificGravity ? parseFloat(specificGravity) : NaN;
    const ρ_sub = substanceDensity ? parseFloat(substanceDensity) : NaN;
    const ρ_ref = getReferenceDensityValue();

    const filledCount = [specificGravity, substanceDensity].filter(val => val !== '').length;

    if (filledCount !== 1) {
      setResult(null);
      setCalculation('Error: Please enter either specific gravity or substance density (leave one empty to calculate)');
      return;
    }

    // Validate inputs
    if (specificGravity && (isNaN(sg) || sg <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for specific gravity');
      return;
    }
    if (substanceDensity && (isNaN(ρ_sub) || ρ_sub <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for substance density');
      return;
    }

    if (!specificGravity) {
      // Calculate specific gravity: SG = ρ_substance / ρ_reference
      const substanceDensityInBase = convertDensityToBase(ρ_sub, substanceDensityUnit);
      const calculatedSG = substanceDensityInBase / ρ_ref;
      
      setResult({ value: calculatedSG, unit: '', type: 'specificGravity' });
      setCalculation(`SG = ρ_substance / ρ_reference = ${formatValue(ρ_sub)} ${substanceDensityUnit} / ${formatValue(convertDensityFromBase(ρ_ref, substanceDensityUnit))} ${substanceDensityUnit} = ${formatValue(calculatedSG)}`);
    } else if (!substanceDensity) {
      // Calculate substance density: ρ_substance = SG × ρ_reference
      const calculatedSubstanceDensityInBase = sg * ρ_ref;
      const calculatedSubstanceDensity = convertDensityFromBase(calculatedSubstanceDensityInBase, substanceDensityUnit);
      
      setResult({ value: calculatedSubstanceDensity, unit: substanceDensityUnit, type: 'substanceDensity' });
      setCalculation(`ρ_substance = SG × ρ_reference = ${formatValue(sg)} × ${formatValue(convertDensityFromBase(ρ_ref, substanceDensityUnit))} ${substanceDensityUnit} = ${formatValue(calculatedSubstanceDensity)} ${substanceDensityUnit}`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setSpecificGravity('');
    setSubstanceDensity('');
    setReferenceDensity('');
    setSubstanceDensityUnit('kg/m³');
    setReferenceDensityUnit('kg/m³');
    setReferenceType('water_4c');
    setCustomReferenceDensity('');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Specific Gravity Calculator</h2>
        <p className="text-gray-600">Calculate specific gravity or density using the formula: SG = ρ_substance / ρ_reference</p>
      </div>

      <div className="space-y-6">
        {/* Reference Density Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Reference Substance
          </label>
          <select
            value={referenceType}
            onChange={(e) => {
              setReferenceType(e.target.value as keyof typeof referenceDensities);
              if (e.target.value !== 'custom') {
                setCustomReferenceDensity('');
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            {Object.entries(referenceDensities).map(([key, ref]) => (
              <option key={key} value={key}>
                {ref.name} ({ref.density} kg/m³)
              </option>
            ))}
          </select>
        </div>

        {/* Custom Reference Density */}
        {referenceType === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Custom Reference Density
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter reference density"
                  value={customReferenceDensity}
                  onChange={(e) => setCustomReferenceDensity(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
                <select
                  value={referenceDensityUnit}
                  onChange={(e) => setReferenceDensityUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                >
                  {Object.entries(densityUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Specific Gravity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Specific Gravity (SG)
          </label>
          <Input
            type="text"
            placeholder="Enter specific gravity (leave empty to calculate)"
            value={specificGravity}
            onChange={(e) => setSpecificGravity(e.target.value)}
            className="w-full"
            autoFocus
          />
          <p className="text-xs text-gray-500 mt-1">Specific gravity is dimensionless (no units)</p>
        </div>

        {/* Substance Density Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Substance Density (ρ_substance)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter substance density (leave empty to calculate)"
                value={substanceDensity}
                onChange={(e) => setSubstanceDensity(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-32">
              <select
                value={substanceDensityUnit}
                onChange={(e) => setSubstanceDensityUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(densityUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

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
            {calculation && !calculation.startsWith('Error:') && (
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
            <li>• Select a reference substance (typically water at 4°C)</li>
            <li>• Enter either specific gravity or substance density (leave one empty to calculate)</li>
            <li>• Formula: SG = ρ_substance / ρ_reference</li>
            <li>• Specific gravity is dimensionless (no units)</li>
            <li>• Select your preferred units for density</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• Standard reference: Water at 4°C = 1000 kg/m³ = 1 g/cm³</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

