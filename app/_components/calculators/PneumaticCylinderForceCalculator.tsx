'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors
const pressureUnits = {
  'Pa': { name: 'Pascal (Pa)', factor: 1 },
  'kPa': { name: 'Kilopascal (kPa)', factor: 1000 },
  'MPa': { name: 'Megapascal (MPa)', factor: 1e6 },
  'bar': { name: 'Bar', factor: 100000 },
  'psi': { name: 'PSI (lb/in²)', factor: 6894.76 },
  'atm': { name: 'Atmosphere (atm)', factor: 101325 }
};

const diameterUnits = {
  'mm': { name: 'Millimeters (mm)', factor: 0.001 },
  'cm': { name: 'Centimeters (cm)', factor: 0.01 },
  'm': { name: 'Meters (m)', factor: 1 },
  'in': { name: 'Inches (in)', factor: 0.0254 },
  'ft': { name: 'Feet (ft)', factor: 0.3048 }
};

const forceUnits = {
  'N': { name: 'Newtons (N)', factor: 1 },
  'kN': { name: 'Kilonewtons (kN)', factor: 1000 },
  'lbf': { name: 'Pounds-force (lbf)', factor: 4.44822 },
  'kgf': { name: 'Kilogram-force (kgf)', factor: 9.80665 }
};

interface PneumaticCylinderForceCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function PneumaticCylinderForceCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: PneumaticCylinderForceCalculatorProps) {
  const [cylinderType, setCylinderType] = useState<'single' | 'double'>('single');
  const [pressure, setPressure] = useState('');
  const [pistonDiameter, setPistonDiameter] = useState('');
  const [rodDiameter, setRodDiameter] = useState('');
  const [pressureUnit, setPressureUnit] = useState('psi');
  const [diameterUnit, setDiameterUnit] = useState('mm');
  const [forceUnit, setForceUnit] = useState('N');
  const [result, setResult] = useState<{ extension: number; retraction?: number; unit: string } | null>(null);
  const [calculation, setCalculation] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    return value.toFixed(4);
  };

  const convertToBaseUnits = (value: number, unit: string, type: 'pressure' | 'diameter' | 'force') => {
    if (type === 'pressure') {
      return value * pressureUnits[unit as keyof typeof pressureUnits].factor;
    } else if (type === 'diameter') {
      return value * diameterUnits[unit as keyof typeof diameterUnits].factor;
    } else {
      return value * forceUnits[unit as keyof typeof forceUnits].factor;
    }
  };

  const convertFromBaseUnits = (value: number, unit: string) => {
    return value / forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const calculateForce = () => {
    const p = parseFloat(pressure);
    const dPiston = parseFloat(pistonDiameter);
    const dRod = parseFloat(rodDiameter);

    if (!pressure || !pistonDiameter || isNaN(p) || isNaN(dPiston) || p <= 0 || dPiston <= 0) {
      setResult(null);
      setCalculation('');
      return;
    }

    if (cylinderType === 'double' && (!rodDiameter || isNaN(dRod) || dRod <= 0 || dRod >= dPiston)) {
      setResult(null);
      setCalculation('For double-acting cylinders, rod diameter must be greater than 0 and less than piston diameter.');
      return;
    }

    // Convert to base units (Pa, m)
    const pressureInPa = convertToBaseUnits(p, pressureUnit, 'pressure');
    const pistonDiamInM = convertToBaseUnits(dPiston, diameterUnit, 'diameter');
    const rodDiamInM = cylinderType === 'double' ? convertToBaseUnits(dRod, diameterUnit, 'diameter') : 0;

    // Calculate areas (m²)
    const pistonArea = Math.PI * Math.pow(pistonDiamInM / 2, 2);
    const rodArea = cylinderType === 'double' ? Math.PI * Math.pow(rodDiamInM / 2, 2) : 0;
    const effectiveArea = cylinderType === 'double' ? pistonArea - rodArea : pistonArea;

    // Calculate forces (N)
    const extensionForce = pressureInPa * pistonArea;
    const retractionForce = cylinderType === 'double' ? pressureInPa * effectiveArea : undefined;

    // Convert to selected force unit
    const extensionForceInUnit = convertFromBaseUnits(extensionForce, forceUnit);
    const retractionForceInUnit = retractionForce ? convertFromBaseUnits(retractionForce, forceUnit) : undefined;

    setResult({
      extension: extensionForceInUnit,
      retraction: retractionForceInUnit,
      unit: forceUnit
    });

    // Build calculation string
    let calcStr = `F = P × A\n`;
    calcStr += `Extension: F = ${formatValue(pressureInPa)} Pa × ${formatValue(pistonArea)} m² = ${formatValue(extensionForce)} N = ${formatValue(extensionForceInUnit)} ${forceUnit}`;
    
    if (cylinderType === 'double' && retractionForce !== undefined && retractionForceInUnit !== undefined) {
      calcStr += `\nRetraction: F = ${formatValue(pressureInPa)} Pa × ${formatValue(effectiveArea)} m² = ${formatValue(retractionForce)} N = ${formatValue(retractionForceInUnit)} ${forceUnit}`;
    }

    setCalculation(calcStr);
  };

  const clearAll = () => {
    setCylinderType('single');
    setPressure('');
    setPistonDiameter('');
    setRodDiameter('');
    setPressureUnit('psi');
    setDiameterUnit('mm');
    setForceUnit('N');
    setResult(null);
    setCalculation('');
  };

  const buttonStyle = {
    backgroundColor: primaryColor,
  } as React.CSSProperties;

  const outlineButtonStyle = {
    color: primaryColor,
    borderColor: primaryColor,
  } as React.CSSProperties;

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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Pneumatic Cylinder Force Calculator</h2>
            <p className="text-gray-600">Calculate extension and retraction force using F = P × A</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="cylinderType" className="block text-sm font-medium text-gray-700 mb-3">
              Cylinder Type
            </label>
            <select
              id="cylinderType"
              value={cylinderType}
              onChange={(e) => {
                setCylinderType(e.target.value as 'single' | 'double');
                if (e.target.value === 'single') {
                  setRodDiameter('');
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="single">Single-Acting</option>
              <option value="double">Double-Acting</option>
            </select>
          </div>

          <div>
            <label htmlFor="pressure" className="block text-sm font-medium text-gray-700 mb-3">
              Pressure (P)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  id="pressure"
                  type="text"
                  placeholder="Enter pressure"
                  value={pressure}
                  onChange={(e) => setPressure(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-40">
                <select
                  value={pressureUnit}
                  onChange={(e) => setPressureUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(pressureUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="pistonDiameter" className="block text-sm font-medium text-gray-700 mb-3">
              Piston Diameter
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  id="pistonDiameter"
                  type="text"
                  placeholder="Enter piston diameter"
                  value={pistonDiameter}
                  onChange={(e) => setPistonDiameter(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-40">
                <select
                  value={diameterUnit}
                  onChange={(e) => setDiameterUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(diameterUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {cylinderType === 'double' && (
            <div>
              <label htmlFor="rodDiameter" className="block text-sm font-medium text-gray-700 mb-3">
                Rod Diameter
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    id="rodDiameter"
                    type="text"
                    placeholder="Enter rod diameter"
                    value={rodDiameter}
                    onChange={(e) => setRodDiameter(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={diameterUnit}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  >
                    {Object.entries(diameterUnits).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="forceUnit" className="block text-sm font-medium text-gray-700 mb-3">
              Result Unit
            </label>
            <select
              id="forceUnit"
              value={forceUnit}
              onChange={(e) => setForceUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {Object.entries(forceUnits).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={calculateForce} className="flex-1 custom-color-button">
              Calculate
            </Button>
            <Button onClick={clearAll} variant="outline" className="flex-1 custom-outline-button">
              Clear
            </Button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-fadeIn">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Result</h3>
              <p className="text-xl font-bold text-blue-700 mb-1">
                Extension Force: {formatValue(result.extension)} {result.unit}
              </p>
              {result.retraction !== undefined && (
                <p className="text-xl font-bold text-blue-700">
                  Retraction Force: {formatValue(result.retraction)} {result.unit}
                </p>
              )}
              {calculation && (
                <p className="text-sm text-blue-600 mt-2 font-mono whitespace-pre-line">
                  {calculation}
                </p>
              )}
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Select cylinder type (single-acting or double-acting)</li>
              <li>• Enter the operating pressure</li>
              <li>• Enter the piston diameter</li>
              <li>• For double-acting cylinders, enter the rod diameter</li>
              <li>• Select appropriate units for pressure, diameter, and force</li>
              <li>• Click "Calculate" to find the extension and retraction forces</li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}

