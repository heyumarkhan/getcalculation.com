'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors
const lengthUnits = {
  'm': { name: 'Meters (m)', factor: 1 },
  'cm': { name: 'Centimeters (cm)', factor: 0.01 },
  'mm': { name: 'Millimeters (mm)', factor: 0.001 },
  'in': { name: 'Inches (in)', factor: 0.0254 },
  'ft': { name: 'Feet (ft)', factor: 0.3048 }
};

const momentOfInertiaUnits = {
  'm⁴': { name: 'm⁴ (Meters⁴)', factor: 1 },
  'cm⁴': { name: 'cm⁴ (Centimeters⁴)', factor: 0.0001 },
  'mm⁴': { name: 'mm⁴ (Millimeters⁴)', factor: 0.000000000001 },
  'in⁴': { name: 'in⁴ (Inches⁴)', factor: 0.0004162314256 },
  'ft⁴': { name: 'ft⁴ (Feet⁴)', factor: 0.008630974841 }
};

interface PolarMomentOfInertiaCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function PolarMomentOfInertiaCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: PolarMomentOfInertiaCalculatorProps) {
  const [crossSectionType, setCrossSectionType] = useState<'solid' | 'hollow'>('solid');
  const [outerRadius, setOuterRadius] = useState('');
  const [innerRadius, setInnerRadius] = useState('');
  const [outerDiameter, setOuterDiameter] = useState('');
  const [innerDiameter, setInnerDiameter] = useState('');
  const [useDiameter, setUseDiameter] = useState(false);
  const [lengthUnit, setLengthUnit] = useState('mm');
  const [momentUnit, setMomentUnit] = useState('mm⁴');
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
  const [calculation, setCalculation] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    if (Math.abs(value) >= 1e12) {
      return value.toExponential(4);
    }
    return value.toFixed(4);
  };

  const convertToBaseUnits = (value: number, unit: string) => {
    return value * lengthUnits[unit as keyof typeof lengthUnits].factor;
  };

  const convertFromBaseUnits = (value: number, unit: string) => {
    return value / momentOfInertiaUnits[unit as keyof typeof momentOfInertiaUnits].factor;
  };

  const calculatePolarMomentOfInertia = () => {
    let rOuter: number;
    let rInner: number | undefined;

    if (useDiameter) {
      const dOuter = parseFloat(outerDiameter);
      let dInner: number | undefined;

      if (crossSectionType === 'hollow') {
        dInner = parseFloat(innerDiameter);
        if (isNaN(dInner) || dInner <= 0 || dInner >= dOuter) {
          setResult(null);
          setCalculation('For hollow cross-sections, inner diameter must be positive and less than outer diameter.');
          return;
        }
      }

      if (isNaN(dOuter) || dOuter <= 0) {
        setResult(null);
        setCalculation('Please enter a valid positive outer diameter value.');
        return;
      }

      rOuter = convertToBaseUnits(dOuter / 2, lengthUnit);
      rInner = crossSectionType === 'hollow' && dInner !== undefined ? convertToBaseUnits(dInner / 2, lengthUnit) : undefined;
    } else {
      rOuter = parseFloat(outerRadius);
      if (crossSectionType === 'hollow') {
        rInner = parseFloat(innerRadius);
        if (isNaN(rInner) || rInner <= 0 || rInner >= rOuter) {
          setResult(null);
          setCalculation('For hollow cross-sections, inner radius must be positive and less than outer radius.');
          return;
        }
      }

      if (isNaN(rOuter) || rOuter <= 0) {
        setResult(null);
        setCalculation('Please enter a valid positive outer radius value.');
        return;
      }

      rOuter = convertToBaseUnits(rOuter, lengthUnit);
      rInner = crossSectionType === 'hollow' && rInner !== undefined ? convertToBaseUnits(rInner, lengthUnit) : undefined;
    }

    // Calculate polar moment of inertia
    let J: number;
    let calcStr = '';

    if (crossSectionType === 'solid') {
      // J = π × r⁴ / 2
      J = (Math.PI * Math.pow(rOuter, 4)) / 2;
      calcStr = `J = π × r⁴ / 2\n`;
      calcStr += `J = π × (${formatValue(rOuter)} m)⁴ / 2\n`;
      calcStr += `J = π × ${formatValue(Math.pow(rOuter, 4))} m⁴ / 2\n`;
      calcStr += `J = ${formatValue(Math.PI * Math.pow(rOuter, 4))} m⁴ / 2\n`;
    } else {
      // J = π × (R⁴ - r⁴) / 2
      if (rInner === undefined) {
        setResult(null);
        setCalculation('Inner radius is required for hollow cross-sections.');
        return;
      }
      const rOuter4 = Math.pow(rOuter, 4);
      const rInner4 = Math.pow(rInner, 4);
      J = (Math.PI * (rOuter4 - rInner4)) / 2;
      calcStr = `J = π × (R⁴ - r⁴) / 2\n`;
      calcStr += `J = π × ((${formatValue(rOuter)} m)⁴ - (${formatValue(rInner)} m)⁴) / 2\n`;
      calcStr += `J = π × (${formatValue(rOuter4)} m⁴ - ${formatValue(rInner4)} m⁴) / 2\n`;
      calcStr += `J = π × ${formatValue(rOuter4 - rInner4)} m⁴ / 2\n`;
      calcStr += `J = ${formatValue(Math.PI * (rOuter4 - rInner4))} m⁴ / 2\n`;
    }

    calcStr += `J = ${formatValue(J)} m⁴`;

    const JInUnit = convertFromBaseUnits(J, momentUnit);
    calcStr += ` = ${formatValue(JInUnit)} ${momentUnit}`;

    setResult({
      value: JInUnit,
      unit: momentUnit
    });

    setCalculation(calcStr);
  };

  const clearAll = () => {
    setCrossSectionType('solid');
    setOuterRadius('');
    setInnerRadius('');
    setOuterDiameter('');
    setInnerDiameter('');
    setUseDiameter(false);
    setLengthUnit('mm');
    setMomentUnit('mm⁴');
    setResult(null);
    setCalculation('');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-color-button {
            background-color: ${primaryColor};
          }
          .custom-color-button:hover {
            background-color: ${primaryColor}dd !important;
          }
          .custom-color-button:focus {
            box-shadow: 0 0 0 3px ${primaryColor}40 !important;
          }
          .custom-outline-button {
            color: ${primaryColor};
            border-color: ${primaryColor};
          }
          .custom-outline-button:hover {
            background-color: ${primaryColor}10 !important;
          }
          .custom-outline-button:focus {
            box-shadow: 0 0 0 3px ${primaryColor}40 !important;
          }
        `
      }} />
      <Card className="p-6 max-w-xl mx-auto">
        {showTitle && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Polar Moment of Inertia Calculator</h2>
            <p className="text-gray-600">Calculate polar moment of inertia for circular cross-sections</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="crossSectionType" className="block text-sm font-medium text-gray-700 mb-3">
              Cross-Section Type
            </label>
            <select
              id="crossSectionType"
              value={crossSectionType}
              onChange={(e) => {
                setCrossSectionType(e.target.value as 'solid' | 'hollow');
                if (e.target.value === 'solid') {
                  setInnerRadius('');
                  setInnerDiameter('');
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="solid">Solid Circle</option>
              <option value="hollow">Hollow Circle (Annulus)</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="useDiameter"
              checked={useDiameter}
              onChange={(e) => setUseDiameter(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="useDiameter" className="text-sm font-medium text-gray-700">
              Use diameter instead of radius
            </label>
          </div>

          {!useDiameter ? (
            <>
              <div>
                <label htmlFor="outerRadius" className="block text-sm font-medium text-gray-700 mb-3">
                  Outer Radius (R)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="outerRadius"
                      type="number"
                      placeholder="Enter outer radius"
                      value={outerRadius}
                      onChange={(e) => setOuterRadius(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={lengthUnit}
                      onChange={(e) => setLengthUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(lengthUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {crossSectionType === 'hollow' && (
                <div>
                  <label htmlFor="innerRadius" className="block text-sm font-medium text-gray-700 mb-3">
                    Inner Radius (r)
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        id="innerRadius"
                        type="number"
                        placeholder="Enter inner radius"
                        value={innerRadius}
                        onChange={(e) => setInnerRadius(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="w-40">
                      <select
                        value={lengthUnit}
                        onChange={(e) => setLengthUnit(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {Object.entries(lengthUnits).map(([key, unit]) => (
                          <option key={key} value={key}>
                            {unit.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <label htmlFor="outerDiameter" className="block text-sm font-medium text-gray-700 mb-3">
                  Outer Diameter (D)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="outerDiameter"
                      type="number"
                      placeholder="Enter outer diameter"
                      value={outerDiameter}
                      onChange={(e) => setOuterDiameter(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={lengthUnit}
                      onChange={(e) => setLengthUnit(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(lengthUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {crossSectionType === 'hollow' && (
                <div>
                  <label htmlFor="innerDiameter" className="block text-sm font-medium text-gray-700 mb-3">
                    Inner Diameter (d)
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        id="innerDiameter"
                        type="number"
                        placeholder="Enter inner diameter"
                        value={innerDiameter}
                        onChange={(e) => setInnerDiameter(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="w-40">
                      <select
                        value={lengthUnit}
                        onChange={(e) => setLengthUnit(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {Object.entries(lengthUnits).map(([key, unit]) => (
                          <option key={key} value={key}>
                            {unit.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <div>
            <label htmlFor="momentUnit" className="block text-sm font-medium text-gray-700 mb-3">
              Result Polar Moment of Inertia Unit
            </label>
            <select
              id="momentUnit"
              value={momentUnit}
              onChange={(e) => setMomentUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {Object.entries(momentOfInertiaUnits).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={calculatePolarMomentOfInertia} className="flex-1 custom-color-button">
              Calculate
            </Button>
            <Button onClick={clearAll} variant="outline" className="flex-1 custom-outline-button">
              Clear
            </Button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-fadeIn">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Result</h3>
              <p className="text-2xl font-bold text-blue-700">
                Polar Moment of Inertia: {formatValue(result.value)} {result.unit}
              </p>
              {calculation && (
                <div className="text-sm text-blue-600 mt-2 font-mono whitespace-pre-line">
                  {calculation}
                </div>
              )}
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Select cross-section type: Solid Circle or Hollow Circle (Annulus)</li>
              <li>• Choose to use radius or diameter</li>
              <li>• Enter the outer radius/diameter (and inner for hollow sections)</li>
              <li>• Select appropriate units for length and polar moment of inertia</li>
              <li>• Click &quot;Calculate&quot; to get the result with step-by-step calculations</li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}

