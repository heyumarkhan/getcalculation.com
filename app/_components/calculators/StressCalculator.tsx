'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface StressCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function StressCalculator({
  showTitle = true,
  primaryColor = '#820ECC',
}: StressCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'stress' | 'force' | 'area' | 'conversion'>('stress');

  // Stress Mode
  const [force, setForce] = useState<string>('1000');
  const [forceUnit, setForceUnit] = useState<'N' | 'kN' | 'MN' | 'lbf'>('N');
  const [area, setArea] = useState<string>('100');
  const [areaUnit, setAreaUnit] = useState<'m²' | 'cm²' | 'mm²' | 'in²' | 'ft²'>('mm²');
  const [stressType, setStressType] = useState<'tensile' | 'compressive' | 'shear'>('tensile');

  // Force Mode
  const [stressValue, setStressValue] = useState<string>('10');
  const [stressUnit, setStressUnit] = useState<'Pa' | 'kPa' | 'MPa' | 'GPa' | 'psi' | 'atm'>('MPa');
  const [areaForceMode, setAreaForceMode] = useState<string>('100');
  const [areaForForceModeUnit, setAreaForForceModeUnit] = useState<'m²' | 'cm²' | 'mm²' | 'in²' | 'ft²'>('mm²');

  // Area Mode
  const [forceAreaMode, setForceAreaMode] = useState<string>('1000');
  const [forceAreaModeUnit, setForceAreaModeUnit] = useState<'N' | 'kN' | 'MN' | 'lbf'>('N');
  const [stressAreaMode, setStressAreaMode] = useState<string>('10');
  const [stressAreaModeUnit, setStressAreaModeUnit] = useState<'Pa' | 'kPa' | 'MPa' | 'GPa' | 'psi' | 'atm'>('MPa');

  // Conversion Mode
  const [pressureValue, setPressureValue] = useState<string>('100');
  const [pressureUnit, setPressureUnit] = useState<'Pa' | 'kPa' | 'MPa' | 'GPa' | 'psi' | 'atm'>('kPa');

  // Results state
  const [stressResult, setStressResult] = useState<ReturnType<typeof calculateStress> | null>(null);
  const [forceResult, setForceResult] = useState<ReturnType<typeof calculateForce> | null>(null);
  const [areaResult, setAreaResult] = useState<ReturnType<typeof calculateArea> | null>(null);
  const [conversionResult, setConversionResult] = useState<ReturnType<typeof convertStress> | null>(null);

  // Unit conversion factors to SI base units (Pa for pressure, N for force, m² for area)
  const forceUnits: Record<string, number> = {
    'N': 1,
    'kN': 1000,
    'MN': 1e6,
    'lbf': 4.44822,
  };

  const areaUnits: Record<string, number> = {
    'm²': 1,
    'cm²': 0.0001,
    'mm²': 1e-6,
    'in²': 0.00064516,
    'ft²': 0.092903,
  };

  const stressUnits: Record<string, number> = {
    'Pa': 1,
    'kPa': 1000,
    'MPa': 1e6,
    'GPa': 1e9,
    'psi': 6894.76,
    'atm': 101325,
  };

  // Calculate stress (σ = F/A)
  const calculateStress = () => {
    const forceN = parseFloat(force) * forceUnits[forceUnit];
    const areaM2 = parseFloat(area) * areaUnits[areaUnit];

    if (!forceN || !areaM2 || forceN <= 0 || areaM2 <= 0) {
      return null;
    }

    const stressPa = forceN / areaM2;

    return {
      stressPa,
      stressInMPa: stressPa / 1e6,
      stressInGPa: stressPa / 1e9,
      stressInPsi: stressPa / 6894.76,
      stressInKPa: stressPa / 1000,
      stressInPa: stressPa,
      stressInAtm: stressPa / 101325,
      forceN,
      areaM2,
      type: stressType,
    };
  };

  // Calculate force (F = σ × A)
  const calculateForce = () => {
    const stressPa = parseFloat(stressValue) * stressUnits[stressUnit];
    const areaM2 = parseFloat(areaForceMode) * areaUnits[areaForForceModeUnit];

    if (!stressPa || !areaM2 || stressPa <= 0 || areaM2 <= 0) {
      return null;
    }

    const forceN = stressPa * areaM2;

    return {
      forceN,
      forceInKN: forceN / 1000,
      forceInMN: forceN / 1e6,
      forceInLbf: forceN / 4.44822,
      stressPa,
      areaM2,
    };
  };

  // Calculate area (A = F/σ)
  const calculateArea = () => {
    const forceN = parseFloat(forceAreaMode) * forceUnits[forceAreaModeUnit];
    const stressPa = parseFloat(stressAreaMode) * stressUnits[stressAreaModeUnit];

    if (!forceN || !stressPa || forceN <= 0 || stressPa <= 0) {
      return null;
    }

    const areaM2 = forceN / stressPa;

    return {
      areaM2,
      areaInCm2: areaM2 / 0.0001,
      areaInMm2: areaM2 / 1e-6,
      areaInIn2: areaM2 / 0.00064516,
      areaInFt2: areaM2 / 0.092903,
      forceN,
      stressPa,
    };
  };

  // Convert pressure/stress
  const convertStress = () => {
    const stressPa = parseFloat(pressureValue) * stressUnits[pressureUnit];

    if (!stressPa || stressPa <= 0) {
      return null;
    }

    return {
      stressPa,
      stressInMPa: stressPa / 1e6,
      stressInGPa: stressPa / 1e9,
      stressInPsi: stressPa / 6894.76,
      stressInKPa: stressPa / 1000,
      stressInPa: stressPa,
      stressInAtm: stressPa / 101325,
    };
  };

  const calculate = () => {
    switch (calculationType) {
      case 'stress':
        setStressResult(calculateStress());
        setForceResult(null);
        setAreaResult(null);
        setConversionResult(null);
        break;
      case 'force':
        setForceResult(calculateForce());
        setStressResult(null);
        setAreaResult(null);
        setConversionResult(null);
        break;
      case 'area':
        setAreaResult(calculateArea());
        setStressResult(null);
        setForceResult(null);
        setConversionResult(null);
        break;
      case 'conversion':
        setConversionResult(convertStress());
        setStressResult(null);
        setForceResult(null);
        setAreaResult(null);
        break;
    }
  };

  const clearAll = () => {
    setStressResult(null);
    setForceResult(null);
    setAreaResult(null);
    setConversionResult(null);
    setForce('1000');
    setArea('100');
    setStressValue('10');
    setAreaForceMode('100');
    setForceAreaMode('1000');
    setStressAreaMode('10');
    setPressureValue('100');
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
      <div className="w-full max-w-4xl mx-auto p-4">
        {showTitle && (
          <h1 className="text-3xl font-bold mb-6" style={{ color: primaryColor }}>
            Stress Calculator
          </h1>
        )}

        <Card>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Select Calculation Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { value: 'stress', label: 'Stress' },
              { value: 'force', label: 'Force' },
              { value: 'area', label: 'Area' },
              { value: 'conversion', label: 'Convert' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setCalculationType(option.value as any)}
                className={`p-2 rounded border-2 transition ${
                  calculationType === option.value
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={
                  calculationType === option.value
                    ? { borderColor: primaryColor, backgroundColor: `${primaryColor}15` }
                    : {}
                }
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stress Calculation */}
        {calculationType === 'stress' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Calculate Stress (σ = F / A)</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Force</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={force}
                    onChange={(e) => setForce(e.target.value)}
                    placeholder="Enter force"
                    className="flex-1 border rounded px-3 py-2"
                  />
                  <select
                    value={forceUnit}
                    onChange={(e) => setForceUnit(e.target.value as any)}
                    className="border rounded px-3 py-2"
                  >
                    {Object.keys(forceUnits).map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cross-sectional Area</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Enter area"
                    className="flex-1 border rounded px-3 py-2"
                  />
                  <select
                    value={areaUnit}
                    onChange={(e) => setAreaUnit(e.target.value as any)}
                    className="border rounded px-3 py-2"
                  >
                    {Object.keys(areaUnits).map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Stress Type</label>
                <div className="flex gap-4">
                  {[
                    { value: 'tensile', label: 'Tensile (Pulling)' },
                    { value: 'compressive', label: 'Compressive (Pushing)' },
                    { value: 'shear', label: 'Shear (Sliding)' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={option.value}
                        checked={stressType === option.value}
                        onChange={(e) => setStressType(e.target.value as any)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button onClick={calculate} className="flex-1 custom-color-button">
                Calculate
              </Button>
              <Button onClick={clearAll} variant="outline" className="flex-1 custom-outline-button">
                Clear
              </Button>
            </div>

            {stressResult && (
              <div className="bg-blue-50 rounded p-4 mb-4">
                <h3 className="font-semibold mb-3">Results</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Stress</p>
                    <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                      {stressResult.stressInMPa.toFixed(4)} MPa
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Stress (alternative units)</p>
                    <p className="text-sm">
                      {stressResult.stressInGPa.toFixed(6)} GPa | {stressResult.stressInPsi.toFixed(2)} psi |{' '}
                      {stressResult.stressInKPa.toFixed(2)} kPa
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold mb-2">Step-by-Step Calculation</h4>
                  <p className="text-sm text-gray-700">
                    <strong>Formula:</strong> σ = F / A
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Step 1:</strong> Convert force to Newtons: {stressResult.forceN.toFixed(4)} N
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Step 2:</strong> Convert area to m²: {stressResult.areaM2.toFixed(8)} m²
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Step 3:</strong> Divide force by area: {stressResult.forceN.toFixed(4)} N ÷{' '}
                    {stressResult.areaM2.toFixed(8)} m² = {stressResult.stressPa.toFixed(2)} Pa
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Stress Type:</strong>{' '}
                    {stressResult.type === 'tensile'
                      ? 'Tensile (pulling/stretching)'
                      : stressResult.type === 'compressive'
                        ? 'Compressive (pushing/squeezing)'
                        : 'Shear (sliding/twisting)'}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Force Calculation */}
        {calculationType === 'force' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Calculate Force (F = σ × A)</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Stress</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={stressValue}
                    onChange={(e) => setStressValue(e.target.value)}
                    placeholder="Enter stress"
                    className="flex-1 border rounded px-3 py-2"
                  />
                  <select
                    value={stressUnit}
                    onChange={(e) => setStressUnit(e.target.value as any)}
                    className="border rounded px-3 py-2"
                  >
                    {Object.keys(stressUnits).map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cross-sectional Area</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={areaForceMode}
                    onChange={(e) => setAreaForceMode(e.target.value)}
                    placeholder="Enter area"
                    className="flex-1 border rounded px-3 py-2"
                  />
                  <select
                    value={areaForForceModeUnit}
                    onChange={(e) => setAreaForForceModeUnit(e.target.value as any)}
                    className="border rounded px-3 py-2"
                  >
                    {Object.keys(areaUnits).map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button onClick={calculate} className="flex-1 custom-color-button">
                Calculate
              </Button>
              <Button onClick={clearAll} variant="outline" className="flex-1 custom-outline-button">
                Clear
              </Button>
            </div>

            {forceResult && (
              <div className="bg-blue-50 rounded p-4 mb-4">
                <h3 className="font-semibold mb-3">Results</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Force</p>
                    <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                      {forceResult.forceN.toFixed(2)} N
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Force (alternative units)</p>
                    <p className="text-sm">
                      {forceResult.forceInKN.toFixed(4)} kN | {forceResult.forceInLbf.toFixed(2)} lbf
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold mb-2">Step-by-Step Calculation</h4>
                  <p className="text-sm text-gray-700">
                    <strong>Formula:</strong> F = σ × A
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Step 1:</strong> Convert stress to Pascals: {forceResult.stressPa.toFixed(2)} Pa
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Step 2:</strong> Convert area to m²: {forceResult.areaM2.toFixed(8)} m²
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Step 3:</strong> Multiply stress by area: {forceResult.stressPa.toFixed(2)} Pa ×{' '}
                    {forceResult.areaM2.toFixed(8)} m² = {forceResult.forceN.toFixed(2)} N
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Area Calculation */}
        {calculationType === 'area' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Calculate Area (A = F / σ)</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Force</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={forceAreaMode}
                    onChange={(e) => setForceAreaMode(e.target.value)}
                    placeholder="Enter force"
                    className="flex-1 border rounded px-3 py-2"
                  />
                  <select
                    value={forceAreaModeUnit}
                    onChange={(e) => setForceAreaModeUnit(e.target.value as any)}
                    className="border rounded px-3 py-2"
                  >
                    {Object.keys(forceUnits).map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Stress</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={stressAreaMode}
                    onChange={(e) => setStressAreaMode(e.target.value)}
                    placeholder="Enter stress"
                    className="flex-1 border rounded px-3 py-2"
                  />
                  <select
                    value={stressAreaModeUnit}
                    onChange={(e) => setStressAreaModeUnit(e.target.value as any)}
                    className="border rounded px-3 py-2"
                  >
                    {Object.keys(stressUnits).map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button onClick={calculate} className="flex-1 custom-color-button">
                Calculate
              </Button>
              <Button onClick={clearAll} variant="outline" className="flex-1 custom-outline-button">
                Clear
              </Button>
            </div>

            {areaResult && (
              <div className="bg-blue-50 rounded p-4 mb-4">
                <h3 className="font-semibold mb-3">Results</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Area</p>
                    <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                      {areaResult.areaM2.toFixed(8)} m²
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Area (alternative units)</p>
                    <p className="text-sm">
                      {areaResult.areaInMm2.toFixed(2)} mm² | {areaResult.areaInIn2.toFixed(4)} in²
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold mb-2">Step-by-Step Calculation</h4>
                  <p className="text-sm text-gray-700">
                    <strong>Formula:</strong> A = F / σ
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Step 1:</strong> Convert force to Newtons: {areaResult.forceN.toFixed(4)} N
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Step 2:</strong> Convert stress to Pascals: {areaResult.stressPa.toFixed(2)} Pa
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Step 3:</strong> Divide force by stress: {areaResult.forceN.toFixed(4)} N ÷{' '}
                    {areaResult.stressPa.toFixed(2)} Pa = {areaResult.areaM2.toFixed(8)} m²
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Conversion */}
        {calculationType === 'conversion' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Convert Stress / Pressure Units</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Stress Value</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={pressureValue}
                    onChange={(e) => setPressureValue(e.target.value)}
                    placeholder="Enter value"
                    className="flex-1 border rounded px-3 py-2"
                  />
                  <select
                    value={pressureUnit}
                    onChange={(e) => setPressureUnit(e.target.value as any)}
                    className="border rounded px-3 py-2"
                  >
                    {Object.keys(stressUnits).map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button onClick={calculate} className="flex-1 custom-color-button">
                Calculate
              </Button>
              <Button onClick={clearAll} variant="outline" className="flex-1 custom-outline-button">
                Clear
              </Button>
            </div>

            {conversionResult && (
              <div className="bg-blue-50 rounded p-4 mb-4">
                <h3 className="font-semibold mb-3">Conversion Results</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Pascal (Pa)</p>
                    <p className="text-lg font-semibold">{conversionResult.stressInPa.toFixed(2)} Pa</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Kilopascal (kPa)</p>
                    <p className="text-lg font-semibold">{conversionResult.stressInKPa.toFixed(4)} kPa</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Megapascal (MPa)</p>
                    <p className="text-lg font-semibold">{conversionResult.stressInMPa.toFixed(6)} MPa</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gigapascal (GPa)</p>
                    <p className="text-lg font-semibold">{conversionResult.stressInGPa.toFixed(8)} GPa</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">PSI</p>
                    <p className="text-lg font-semibold">{conversionResult.stressInPsi.toFixed(4)} psi</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Atmosphere (atm)</p>
                    <p className="text-lg font-semibold">{conversionResult.stressInAtm.toFixed(6)} atm</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

        <Card className="mt-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold mb-2">About Stress</h3>
          <p className="text-sm text-gray-700">
            Stress (σ) is the internal force per unit area that a material experiences under load. It is calculated as σ = F/A, 
            where F is the applied force and A is the cross-sectional area. Stress is measured in Pascals (Pa) and is critical 
            for determining material failure, deformation, and safety factors in engineering design.
          </p>
        </Card>
      </div>
    </>
  );
}
