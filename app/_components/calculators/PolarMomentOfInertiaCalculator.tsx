'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: mm^4)
const inertiaUnits = {
  'mm^4': { name: 'mm⁴ (millimeters⁴)', factor: 1 },
  'cm^4': { name: 'cm⁴ (centimeters⁴)', factor: 10000 },
  'in^4': { name: 'in⁴ (inches⁴)', factor: 416231.425 },
  'm^4': { name: 'm⁴ (meters⁴)', factor: 1e12 },
  'dm^4': { name: 'dm⁴ (decimeters⁴)', factor: 1e8 }
};

const distanceUnits = {
  'mm': { name: 'mm (Millimeters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 10 },
  'm': { name: 'm (Meters)', factor: 1000 },
  'in': { name: 'in (Inches)', factor: 25.4 },
  'ft': { name: 'ft (Feet)', factor: 304.8 }
};

type ShapeType = 'circle' | 'rectangle' | 'hollow-circle' | 'ibeam';
type CalculationType = 'direct' | 'from-inertias';

export default function PolarMomentOfInertiaCalculator() {
  const [calculationType, setCalculationType] = useState<CalculationType>('direct');
  const [shapeType, setShapeType] = useState<ShapeType>('circle');
  
  // Direct calculation inputs
  const [diameter, setDiameter] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [outerDiameter, setOuterDiameter] = useState('');
  const [innerDiameter, setInnerDiameter] = useState('');
  const [webThickness, setWebThickness] = useState('');
  const [flangeWidth, setFlangeWidth] = useState('');
  const [flangeThickness, setFlangeThickness] = useState('');
  
  // From inertias inputs
  const [ix, setIx] = useState('');
  const [iy, setIy] = useState('');
  const [distanceUnit, setDistanceUnit] = useState<keyof typeof distanceUnits>('mm');
  const [inertiaUnit, setInertiaUnit] = useState<keyof typeof inertiaUnits>('mm^4');
  
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
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

  const convertToBase = (value: number, unit: keyof typeof distanceUnits) => {
    return value * distanceUnits[unit].factor;
  };

  const convertInertiaToBase = (value: number, unit: keyof typeof inertiaUnits) => {
    return value * inertiaUnits[unit].factor;
  };

  const convertInertiaFromBase = (value: number, unit: keyof typeof inertiaUnits) => {
    return value / inertiaUnits[unit].factor;
  };

  const calculateCircle = () => {
    const d = diameter ? parseFloat(diameter) : NaN;
    
    if (isNaN(d) || d <= 0) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive diameter');
      return;
    }

    const dBase = convertToBase(d, distanceUnit);
    const r = dBase / 2;
    
    // For a solid circle: J = π * d^4 / 32 = π * r^4 / 2
    const jBase = (Math.PI * Math.pow(dBase, 4)) / 32;
    const jResult = convertInertiaFromBase(jBase, inertiaUnit);
    
    setResult({ value: jResult, unit: inertiaUnit });
    setCalculation(`J = π × d⁴ / 32 = π × ${formatValue(d)}⁴ / 32 = ${formatValue(jResult)} ${inertiaUnit}`);
  };

  const calculateRectangle = () => {
    const w = width ? parseFloat(width) : NaN;
    const h = height ? parseFloat(height) : NaN;
    
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      setResult(null);
      setCalculation('Error: Please enter valid positive values for width and height');
      return;
    }

    const wBase = convertToBase(w, distanceUnit);
    const hBase = convertToBase(h, distanceUnit);
    
    // For a rectangle: J = (b*h/12) * (b^2 + h^2)
    // where b = width, h = height
    const jBase = (wBase * hBase / 12) * (Math.pow(wBase, 2) + Math.pow(hBase, 2));
    const jResult = convertInertiaFromBase(jBase, inertiaUnit);
    
    setResult({ value: jResult, unit: inertiaUnit });
    setCalculation(`J = (b×h/12) × (b² + h²) = (${formatValue(w)}×${formatValue(h)}/12) × (${formatValue(w)}² + ${formatValue(h)}²) = ${formatValue(jResult)} ${inertiaUnit}`);
  };

  const calculateHollowCircle = () => {
    const od = outerDiameter ? parseFloat(outerDiameter) : NaN;
    const id = innerDiameter ? parseFloat(innerDiameter) : NaN;
    
    if (isNaN(od) || isNaN(id) || od <= 0 || id <= 0) {
      setResult(null);
      setCalculation('Error: Please enter valid positive values for outer and inner diameter');
      return;
    }

    if (id >= od) {
      setResult(null);
      setCalculation('Error: Inner diameter must be less than outer diameter');
      return;
    }

    const odBase = convertToBase(od, distanceUnit);
    const idBase = convertToBase(id, distanceUnit);
    
    // For a hollow circle: J = π * (d_o^4 - d_i^4) / 32
    const jBase = (Math.PI * (Math.pow(odBase, 4) - Math.pow(idBase, 4))) / 32;
    const jResult = convertInertiaFromBase(jBase, inertiaUnit);
    
    setResult({ value: jResult, unit: inertiaUnit });
    setCalculation(`J = π × (d_o⁴ - d_i⁴) / 32 = π × (${formatValue(od)}⁴ - ${formatValue(id)}⁴) / 32 = ${formatValue(jResult)} ${inertiaUnit}`);
  };

  const calculateIBeam = () => {
    const wt = webThickness ? parseFloat(webThickness) : NaN;
    const h = height ? parseFloat(height) : NaN;
    const fw = flangeWidth ? parseFloat(flangeWidth) : NaN;
    const ft = flangeThickness ? parseFloat(flangeThickness) : NaN;
    
    if (isNaN(wt) || isNaN(h) || isNaN(fw) || isNaN(ft) || wt <= 0 || h <= 0 || fw <= 0 || ft <= 0) {
      setResult(null);
      setCalculation('Error: Please enter valid positive values for all dimensions');
      return;
    }

    const wtBase = convertToBase(wt, distanceUnit);
    const hBase = convertToBase(h, distanceUnit);
    const fwBase = convertToBase(fw, distanceUnit);
    const ftBase = convertToBase(ft, distanceUnit);

    // Calculate moment of inertia for web (vertical)
    const ix = (wtBase * Math.pow(hBase, 3)) / 12 + 2 * ((fwBase * Math.pow(ftBase, 3)) / 12 + (fwBase * ftBase * Math.pow((hBase - ftBase) / 2, 2)));
    
    // Calculate moment of inertia for flanges (horizontal)
    const iy = 2 * ((Math.pow(fwBase, 3) * ftBase) / 12 + (fwBase * ftBase * Math.pow(fwBase / 2, 2))) + (Math.pow(wtBase, 3) * (hBase - 2 * ftBase)) / 12;
    
    // Polar moment of inertia
    const jBase = ix + iy;
    const jResult = convertInertiaFromBase(jBase, inertiaUnit);
    
    setResult({ value: jResult, unit: inertiaUnit });
    setCalculation(`J = Ix + Iy = ${formatValue(convertInertiaFromBase(ix, inertiaUnit))} + ${formatValue(convertInertiaFromBase(iy, inertiaUnit))} = ${formatValue(jResult)} ${inertiaUnit}`);
  };

  const calculateFromInertias = () => {
    const ixVal = ix ? parseFloat(ix) : NaN;
    const iyVal = iy ? parseFloat(iy) : NaN;
    
    if (isNaN(ixVal) || isNaN(iyVal) || ixVal < 0 || iyVal < 0) {
      setResult(null);
      setCalculation('Error: Please enter valid non-negative values for Ix and Iy');
      return;
    }

    const ixBase = convertInertiaToBase(ixVal, inertiaUnit);
    const iyBase = convertInertiaToBase(iyVal, inertiaUnit);
    
    const jBase = ixBase + iyBase;
    const jResult = convertInertiaFromBase(jBase, inertiaUnit);
    
    setResult({ value: jResult, unit: inertiaUnit });
    setCalculation(`J = Ix + Iy = ${formatValue(ixVal)} + ${formatValue(iyVal)} = ${formatValue(jResult)} ${inertiaUnit}`);
  };

  const handleCalculate = () => {
    if (calculationType === 'from-inertias') {
      calculateFromInertias();
    } else {
      switch (shapeType) {
        case 'circle':
          calculateCircle();
          break;
        case 'rectangle':
          calculateRectangle();
          break;
        case 'hollow-circle':
          calculateHollowCircle();
          break;
        case 'ibeam':
          calculateIBeam();
          break;
      }
    }
  };

  const clearAll = () => {
    setDiameter('');
    setWidth('');
    setHeight('');
    setOuterDiameter('');
    setInnerDiameter('');
    setWebThickness('');
    setFlangeWidth('');
    setFlangeThickness('');
    setIx('');
    setIy('');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Polar Moment of Inertia Calculator</h2>
        <p className="text-gray-600">Calculate J = Ix + Iy for various cross-sections</p>
      </div>

      <div className="space-y-6">
        {/* Calculation Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Calculation Type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="calcType"
                value="direct"
                checked={calculationType === 'direct'}
                onChange={(e) => setCalculationType(e.target.value as CalculationType)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Calculate from Shape</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="calcType"
                value="from-inertias"
                checked={calculationType === 'from-inertias'}
                onChange={(e) => setCalculationType(e.target.value as CalculationType)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">From Inertias (Ix + Iy)</span>
            </label>
          </div>
        </div>

        {calculationType === 'direct' && (
          <>
            {/* Shape Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Cross-Section Shape
              </label>
              <select
                value={shapeType}
                onChange={(e) => setShapeType(e.target.value as ShapeType)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                <option value="circle">Solid Circle</option>
                <option value="rectangle">Rectangle</option>
                <option value="hollow-circle">Hollow Circle</option>
                <option value="ibeam">I-Beam</option>
              </select>
            </div>

            {/* Unit Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Distance Unit
              </label>
              <select
                value={distanceUnit}
                onChange={(e) => setDistanceUnit(e.target.value as keyof typeof distanceUnits)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(distanceUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Inertia Unit Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Inertia Unit
              </label>
              <select
                value={inertiaUnit}
                onChange={(e) => setInertiaUnit(e.target.value as keyof typeof inertiaUnits)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(inertiaUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Shape-specific inputs */}
            {shapeType === 'circle' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Diameter (d)
                </label>
                <Input
                  type="text"
                  placeholder="Enter diameter"
                  value={diameter}
                  onChange={(e) => setDiameter(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
            )}

            {shapeType === 'rectangle' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Width (b)
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Height (h)
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full"
                  />
                </div>
              </>
            )}

            {shapeType === 'hollow-circle' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Outer Diameter (d_o)
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter outer diameter"
                    value={outerDiameter}
                    onChange={(e) => setOuterDiameter(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Inner Diameter (d_i)
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter inner diameter"
                    value={innerDiameter}
                    onChange={(e) => setInnerDiameter(e.target.value)}
                    className="w-full"
                  />
                </div>
              </>
            )}

            {shapeType === 'ibeam' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Web Thickness (t_w)
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter web thickness"
                    value={webThickness}
                    onChange={(e) => setWebThickness(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Height (h)
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter total height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Flange Width (b)
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter flange width"
                    value={flangeWidth}
                    onChange={(e) => setFlangeWidth(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Flange Thickness (t_f)
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter flange thickness"
                    value={flangeThickness}
                    onChange={(e) => setFlangeThickness(e.target.value)}
                    className="w-full"
                  />
                </div>
              </>
            )}
          </>
        )}

        {calculationType === 'from-inertias' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Inertia Unit
              </label>
              <select
                value={inertiaUnit}
                onChange={(e) => setInertiaUnit(e.target.value as keyof typeof inertiaUnits)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(inertiaUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Moment of Inertia - X-axis (Ix)
              </label>
              <Input
                type="text"
                placeholder="Enter Ix value"
                value={ix}
                onChange={(e) => setIx(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Moment of Inertia - Y-axis (Iy)
              </label>
              <Input
                type="text"
                placeholder="Enter Iy value"
                value={iy}
                onChange={(e) => setIy(e.target.value)}
                className="w-full"
              />
            </div>
          </>
        )}

        <div className="flex gap-3 pt-2">
          <Button onClick={handleCalculate} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg">
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">Result</h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && (
              <p className="text-sm text-[#820ECC]/80 mt-2 font-mono">
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
            <li>• Choose between calculating from shape dimensions or from existing inertias</li>
            <li>• Select your cross-section shape (circle, rectangle, hollow circle, or I-beam)</li>
            <li>• Enter all required dimensions for the selected shape</li>
            <li>• Select your preferred units for distance and inertia</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• Formula: J = Ix + Iy (Polar Moment = Sum of principal moments of inertia)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
