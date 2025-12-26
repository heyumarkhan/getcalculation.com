'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type ShapeType = 'rectangle' | 'circle';
type CalculationMode = 'sectionModulus' | 'width' | 'height' | 'diameter';

interface SectionModulusCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

const PI = Math.PI;

// Unit conversion factors (all relative to base units: m, m³)
const lengthUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 }
};

const volumeUnits = {
  'm³': { name: 'm³ (Cubic meters)', factor: 1 },
  'cm³': { name: 'cm³ (Cubic centimeters)', factor: 1e-6 },
  'mm³': { name: 'mm³ (Cubic millimeters)', factor: 1e-9 },
  'ft³': { name: 'ft³ (Cubic feet)', factor: 0.0283168 },
  'in³': { name: 'in³ (Cubic inches)', factor: 1.63871e-5 }
};

export default function SectionModulusCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: SectionModulusCalculatorProps) {
  const [shapeType, setShapeType] = useState<ShapeType>('rectangle');
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('sectionModulus');
  const [sectionModulus, setSectionModulus] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [diameter, setDiameter] = useState('');
  const [lengthUnit, setLengthUnit] = useState('mm');
  const [volumeUnit, setVolumeUnit] = useState('mm³');
  const [result, setResult] = useState<{ value: number; unit: string; label: string } | null>(null);
  const [calculation, setCalculation] = useState('');
  const [error, setError] = useState('');

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

  const convertLengthToBase = (value: number, unit: string): number => {
    return value * lengthUnits[unit as keyof typeof lengthUnits].factor;
  };

  const convertLengthFromBase = (value: number, unit: string): number => {
    return value / lengthUnits[unit as keyof typeof lengthUnits].factor;
  };

  const convertVolumeToBase = (value: number, unit: string): number => {
    return value * volumeUnits[unit as keyof typeof volumeUnits].factor;
  };

  const convertVolumeFromBase = (value: number, unit: string): number => {
    return value / volumeUnits[unit as keyof typeof volumeUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const Z = sectionModulus ? parseFloat(sectionModulus) : NaN;
    const b = width ? parseFloat(width) : NaN;
    const h = height ? parseFloat(height) : NaN;
    const d = diameter ? parseFloat(diameter) : NaN;

    if (shapeType === 'rectangle') {
      if (calculationMode === 'sectionModulus') {
        // Calculate section modulus: Z = (b × h²) / 6
        if (!width || !height) {
          setError('Please enter both width and height');
          return;
        }

        if (isNaN(b) || b <= 0) {
          setError('Width must be a valid positive number');
          return;
        }
        if (isNaN(h) || h <= 0) {
          setError('Height must be a valid positive number');
          return;
        }

        const bBase = convertLengthToBase(b, lengthUnit);
        const hBase = convertLengthToBase(h, lengthUnit);
        const ZBase = (bBase * hBase * hBase) / 6;
        const ZResult = convertVolumeFromBase(ZBase, volumeUnit);

        setResult({ value: ZResult, unit: volumeUnit, label: 'Section Modulus' });
        setCalculation(`Section Modulus (Z) = (b × h²) / 6\nZ = (b × h²) / 6\nb = ${formatValue(b)} ${lengthUnits[lengthUnit as keyof typeof lengthUnits].name} = ${formatValue(bBase)} m\nh = ${formatValue(h)} ${lengthUnits[lengthUnit as keyof typeof lengthUnits].name} = ${formatValue(hBase)} m\nZ = (${formatValue(bBase)} × ${formatValue(hBase)}²) / 6\nZ = (${formatValue(bBase)} × ${formatValue(hBase * hBase)}) / 6\nZ = ${formatValue(ZBase)} m³ = ${formatValue(ZResult)} ${volumeUnits[volumeUnit as keyof typeof volumeUnits].name}`);
      } else if (calculationMode === 'width') {
        // Calculate width: b = 6Z / h²
        if (!sectionModulus || !height) {
          setError('Please enter both section modulus and height');
          return;
        }

        if (isNaN(Z) || Z <= 0) {
          setError('Section modulus must be a valid positive number');
          return;
        }
        if (isNaN(h) || h <= 0) {
          setError('Height must be a valid positive number');
          return;
        }

        const ZBase = convertVolumeToBase(Z, volumeUnit);
        const hBase = convertLengthToBase(h, lengthUnit);
        const bBase = (6 * ZBase) / (hBase * hBase);
        const bResult = convertLengthFromBase(bBase, lengthUnit);

        setResult({ value: bResult, unit: lengthUnit, label: 'Width' });
        setCalculation(`Width (b) = 6Z / h²\nb = 6Z / h²\nZ = ${formatValue(Z)} ${volumeUnits[volumeUnit as keyof typeof volumeUnits].name} = ${formatValue(ZBase)} m³\nh = ${formatValue(h)} ${lengthUnits[lengthUnit as keyof typeof lengthUnits].name} = ${formatValue(hBase)} m\nb = (6 × ${formatValue(ZBase)}) / ${formatValue(hBase)}²\nb = ${formatValue(6 * ZBase)} / ${formatValue(hBase * hBase)}\nb = ${formatValue(bBase)} m = ${formatValue(bResult)} ${lengthUnits[lengthUnit as keyof typeof lengthUnits].name}`);
      } else if (calculationMode === 'height') {
        // Calculate height: h = √(6Z / b)
        if (!sectionModulus || !width) {
          setError('Please enter both section modulus and width');
          return;
        }

        if (isNaN(Z) || Z <= 0) {
          setError('Section modulus must be a valid positive number');
          return;
        }
        if (isNaN(b) || b <= 0) {
          setError('Width must be a valid positive number');
          return;
        }

        const ZBase = convertVolumeToBase(Z, volumeUnit);
        const bBase = convertLengthToBase(b, lengthUnit);
        const hBase = Math.sqrt((6 * ZBase) / bBase);
        const hResult = convertLengthFromBase(hBase, lengthUnit);

        setResult({ value: hResult, unit: lengthUnit, label: 'Height' });
        setCalculation(`Height (h) = √(6Z / b)\nh = √(6Z / b)\nZ = ${formatValue(Z)} ${volumeUnits[volumeUnit as keyof typeof volumeUnits].name} = ${formatValue(ZBase)} m³\nb = ${formatValue(b)} ${lengthUnits[lengthUnit as keyof typeof lengthUnits].name} = ${formatValue(bBase)} m\nh = √((6 × ${formatValue(ZBase)}) / ${formatValue(bBase)})\nh = √(${formatValue(6 * ZBase / bBase)})\nh = ${formatValue(hBase)} m = ${formatValue(hResult)} ${lengthUnits[lengthUnit as keyof typeof lengthUnits].name}`);
      }
    } else if (shapeType === 'circle') {
      if (calculationMode === 'sectionModulus') {
        // Calculate section modulus: Z = (π × d³) / 32
        if (!diameter) {
          setError('Please enter the diameter');
          return;
        }

        if (isNaN(d) || d <= 0) {
          setError('Diameter must be a valid positive number');
          return;
        }

        const dBase = convertLengthToBase(d, lengthUnit);
        const ZBase = (PI * dBase * dBase * dBase) / 32;
        const ZResult = convertVolumeFromBase(ZBase, volumeUnit);

        setResult({ value: ZResult, unit: volumeUnit, label: 'Section Modulus' });
        setCalculation(`Section Modulus (Z) = (π × d³) / 32\nZ = (π × d³) / 32\nπ = ${PI.toFixed(6)}\nd = ${formatValue(d)} ${lengthUnits[lengthUnit as keyof typeof lengthUnits].name} = ${formatValue(dBase)} m\nZ = (${PI.toFixed(6)} × ${formatValue(dBase)}³) / 32\nZ = (${PI.toFixed(6)} × ${formatValue(dBase * dBase * dBase)}) / 32\nZ = ${formatValue(ZBase)} m³ = ${formatValue(ZResult)} ${volumeUnits[volumeUnit as keyof typeof volumeUnits].name}`);
      } else if (calculationMode === 'diameter') {
        // Calculate diameter: d = ∛(32Z / π)
        if (!sectionModulus) {
          setError('Please enter the section modulus');
          return;
        }

        if (isNaN(Z) || Z <= 0) {
          setError('Section modulus must be a valid positive number');
          return;
        }

        const ZBase = convertVolumeToBase(Z, volumeUnit);
        const dBase = Math.cbrt((32 * ZBase) / PI);
        const dResult = convertLengthFromBase(dBase, lengthUnit);

        setResult({ value: dResult, unit: lengthUnit, label: 'Diameter' });
        setCalculation(`Diameter (d) = ∛(32Z / π)\nd = ∛(32Z / π)\nπ = ${PI.toFixed(6)}\nZ = ${formatValue(Z)} ${volumeUnits[volumeUnit as keyof typeof volumeUnits].name} = ${formatValue(ZBase)} m³\nd = ∛((32 × ${formatValue(ZBase)}) / ${PI.toFixed(6)})\nd = ∛(${formatValue(32 * ZBase / PI)})\nd = ${formatValue(dBase)} m = ${formatValue(dResult)} ${lengthUnits[lengthUnit as keyof typeof lengthUnits].name}`);
      }
    }
  };

  const clearAll = () => {
    setSectionModulus('');
    setWidth('');
    setHeight('');
    setDiameter('');
    setLengthUnit('mm');
    setVolumeUnit('mm³');
    setResult(null);
    setCalculation('');
    setError('');
  };

  const handleShapeChange = (newShape: ShapeType) => {
    setShapeType(newShape);
    clearAll();
    setCalculationMode('sectionModulus');
  };

  const handleModeChange = (newMode: CalculationMode) => {
    setCalculationMode(newMode);
    if (newMode === 'sectionModulus') {
      setSectionModulus('');
    } else if (newMode === 'width' || newMode === 'height') {
      setWidth('');
      setHeight('');
    } else if (newMode === 'diameter') {
      setDiameter('');
    }
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Section Modulus Calculator</h2>
          <p className="text-gray-600">Calculate section modulus or dimensions for rectangular and circular cross-sections</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Shape Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cross-Section Shape
          </label>
          <select
            value={shapeType}
            onChange={(e) => handleShapeChange(e.target.value as ShapeType)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
          </select>
        </div>

        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculate
          </label>
          <select
            value={calculationMode}
            onChange={(e) => handleModeChange(e.target.value as CalculationMode)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            {shapeType === 'rectangle' ? (
              <>
                <option value="sectionModulus">Section Modulus (Z)</option>
                <option value="width">Width (b)</option>
                <option value="height">Height (h)</option>
              </>
            ) : (
              <>
                <option value="sectionModulus">Section Modulus (Z)</option>
                <option value="diameter">Diameter (d)</option>
              </>
            )}
          </select>
        </div>

        {/* Input Fields */}
        {shapeType === 'rectangle' && (
          <>
            {calculationMode === 'width' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Section Modulus (Z)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Enter section modulus"
                      value={sectionModulus}
                      onChange={(e) => setSectionModulus(e.target.value)}
                      className="w-full"
                      autoFocus
                    />
                  </div>
                  <div className="w-32">
                    <select
                      value={volumeUnit}
                      onChange={(e) => setVolumeUnit(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                    >
                      {Object.entries(volumeUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {calculationMode === 'height' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Section Modulus (Z)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Enter section modulus"
                      value={sectionModulus}
                      onChange={(e) => setSectionModulus(e.target.value)}
                      className="w-full"
                      autoFocus
                    />
                  </div>
                  <div className="w-32">
                    <select
                      value={volumeUnit}
                      onChange={(e) => setVolumeUnit(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                    >
                      {Object.entries(volumeUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {calculationMode === 'sectionModulus' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Width (b)
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        type="text"
                        placeholder="Enter width"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="w-full"
                        autoFocus
                      />
                    </div>
                    <div className="w-32">
                      <select
                        value={lengthUnit}
                        onChange={(e) => setLengthUnit(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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
              </>
            )}

            {(calculationMode === 'sectionModulus' || calculationMode === 'width') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Height (h)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Enter height"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-32">
                    <select
                      value={lengthUnit}
                      onChange={(e) => setLengthUnit(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

            {calculationMode === 'height' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Width (b)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Enter width"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-32">
                    <select
                      value={lengthUnit}
                      onChange={(e) => setLengthUnit(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        {shapeType === 'circle' && (
          <>
            {calculationMode === 'sectionModulus' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Diameter (d)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Enter diameter"
                      value={diameter}
                      onChange={(e) => setDiameter(e.target.value)}
                      className="w-full"
                      autoFocus
                    />
                  </div>
                  <div className="w-32">
                    <select
                      value={lengthUnit}
                      onChange={(e) => setLengthUnit(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

            {calculationMode === 'diameter' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Section Modulus (Z)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Enter section modulus"
                      value={sectionModulus}
                      onChange={(e) => setSectionModulus(e.target.value)}
                      className="w-full"
                      autoFocus
                    />
                  </div>
                  <div className="w-32">
                    <select
                      value={volumeUnit}
                      onChange={(e) => setVolumeUnit(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                    >
                      {Object.entries(volumeUnits).map(([key, unit]) => (
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

        <div className="flex gap-3 pt-2">
          <Button
            onClick={calculate}
            className="flex-1"
            style={{ backgroundColor: primaryColor }}
          >
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}10`, borderColor: `${primaryColor}30`, borderWidth: '1px', borderStyle: 'solid' }}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>Result</h3>
            <p className="text-2xl font-bold" style={{ color: primaryColor }}>
              {formatValue(result.value)} {result.unit}
            </p>
            <p className="text-sm mt-1" style={{ color: `${primaryColor}CC` }}>
              {result.label}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <div className="text-sm mt-3 font-mono whitespace-pre-line" style={{ color: `${primaryColor}CC` }}>
                {calculation}
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-mono">{error}</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Select the cross-section shape (Rectangle or Circle).</li>
            <li>• Select what you want to calculate (Section Modulus or dimensions).</li>
            <li>• Enter the required values in their respective fields.</li>
            <li>• Ensure all inputs are valid positive numbers.</li>
            <li>• Select appropriate units for accurate calculations.</li>
            <li>• Formulas: Rectangle: Z = (b × h²) / 6, Circle: Z = (π × d³) / 32</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

