'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Common wire materials and their resistivity at 20°C in Ω·mm²/m
const materials = {
  'copper': { name: 'Copper', resistivity: 0.0172, tempCoeff: 0.00393 },
  'aluminum': { name: 'Aluminum', resistivity: 0.0282, tempCoeff: 0.00391 },
  'silver': { name: 'Silver', resistivity: 0.0159, tempCoeff: 0.0038 },
  'gold': { name: 'Gold', resistivity: 0.0244, tempCoeff: 0.0034 },
  'nickel': { name: 'Nickel', resistivity: 0.0699, tempCoeff: 0.006 },
  'tungsten': { name: 'Tungsten', resistivity: 0.0533, tempCoeff: 0.0045 },
  'iron': { name: 'Iron', resistivity: 0.0974, tempCoeff: 0.0055 },
  'steel': { name: 'Steel (stainless)', resistivity: 0.72, tempCoeff: 0.0005 },
  'nichrome': { name: 'Nichrome', resistivity: 1.1, tempCoeff: 0.0004 },
  'constantan': { name: 'Constantan', resistivity: 0.49, tempCoeff: 0.000008 },
  'manganin': { name: 'Manganin', resistivity: 0.44, tempCoeff: 0.00001 },
  'custom': { name: 'Custom Resistivity', resistivity: 0.0172, tempCoeff: 0 }
};

const lengthUnits = {
  'mm': { name: 'mm (Millimeters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 10 },
  'm': { name: 'm (Meters)', factor: 1000 },
  'km': { name: 'km (Kilometers)', factor: 1000000 },
  'ft': { name: 'ft (Feet)', factor: 304.8 },
  'in': { name: 'in (Inches)', factor: 25.4 }
};

const diameterUnits = {
  'mm': { name: 'mm (Millimeters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 10 },
  'in': { name: 'in (Inches)', factor: 25.4 }
};

const resistanceUnits = {
  'Ω': { name: 'Ω (Ohms)', factor: 1 },
  'mΩ': { name: 'mΩ (Milliohms)', factor: 0.001 },
  'kΩ': { name: 'kΩ (Kilohms)', factor: 1000 },
  'MΩ': { name: 'MΩ (Megaohms)', factor: 1000000 }
};

type CalculationType = 'resistance' | 'length' | 'diameter' | 'resistivity';

export default function WireResistanceCalculator() {
  const [calcType, setCalcType] = useState<CalculationType>('resistance');
  const [material, setMaterial] = useState<keyof typeof materials>('copper');
  
  // Input fields
  const [customResistivity, setCustomResistivity] = useState('');
  const [length, setLength] = useState('');
  const [diameter, setDiameter] = useState('');
  const [resistance, setResistance] = useState('');
  const [temperature, setTemperature] = useState('20');
  
  const [lengthUnit, setLengthUnit] = useState<keyof typeof lengthUnits>('m');
  const [diameterUnit, setDiameterUnit] = useState<keyof typeof diameterUnits>('mm');
  const [resistanceUnit, setResistanceUnit] = useState<keyof typeof resistanceUnits>('Ω');
  
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
    return value.toFixed(6).replace(/\.?0+$/, '');
  };

  const convertLengthToMm = (value: number, unit: keyof typeof lengthUnits) => {
    return value * lengthUnits[unit].factor;
  };

  const convertDiameterToMm = (value: number, unit: keyof typeof diameterUnits) => {
    return value * diameterUnits[unit].factor;
  };

  const convertResistanceToOhms = (value: number, unit: keyof typeof resistanceUnits) => {
    return value * resistanceUnits[unit].factor;
  };

  const convertResistanceFromOhms = (value: number, unit: keyof typeof resistanceUnits) => {
    return value / resistanceUnits[unit].factor;
  };

  const getResistivity = (temp: number) => {
    const baseResistivity = material === 'custom' ? parseFloat(customResistivity || '0') : materials[material].resistivity;
    const tempCoeff = materials[material].tempCoeff;
    
    if (tempCoeff === 0) return baseResistivity;
    
    // Temperature correction: ρ(T) = ρ₀ × [1 + α × (T - T₀)]
    return baseResistivity * (1 + tempCoeff * (temp - 20));
  };

  const calculateResistance = () => {
    const l = length ? parseFloat(length) : NaN;
    const d = diameter ? parseFloat(diameter) : NaN;
    const temp = temperature ? parseFloat(temperature) : 20;

    if (isNaN(l) || l <= 0) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive wire length');
      return;
    }

    if (isNaN(d) || d <= 0) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive wire diameter');
      return;
    }

    const lengthMm = convertLengthToMm(l, lengthUnit);
    const diameterMm = convertDiameterToMm(d, diameterUnit);
    const radiusMm = diameterMm / 2;
    const areaMm2 = Math.PI * radiusMm * radiusMm;

    const rho = getResistivity(temp);
    const resistanceOhms = (rho * lengthMm) / areaMm2;
    const resistanceResult = convertResistanceFromOhms(resistanceOhms, resistanceUnit);

    setResult({ value: resistanceResult, unit: resistanceUnit });
    
    let materialName = material === 'custom' ? `Custom (${customResistivity}Ω·mm²/m)` : materials[material].name;
    let tempInfo = temp !== 20 ? ` at ${temp}°C` : '';
    
    setCalculation(`R = ρ × L / A = ${formatValue(rho)} × ${formatValue(lengthMm)} / ${formatValue(areaMm2)} = ${formatValue(resistanceResult)} ${resistanceUnit} | ${materialName}${tempInfo}`);
  };

  const calculateLength = () => {
    const r = resistance ? parseFloat(resistance) : NaN;
    const d = diameter ? parseFloat(diameter) : NaN;
    const temp = temperature ? parseFloat(temperature) : 20;

    if (isNaN(r) || r <= 0) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive resistance');
      return;
    }

    if (isNaN(d) || d <= 0) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive wire diameter');
      return;
    }

    const resistanceOhms = convertResistanceToOhms(r, resistanceUnit);
    const diameterMm = convertDiameterToMm(d, diameterUnit);
    const radiusMm = diameterMm / 2;
    const areaMm2 = Math.PI * radiusMm * radiusMm;

    const rho = getResistivity(temp);
    const lengthMm = (resistanceOhms * areaMm2) / rho;
    
    // Convert to requested unit
    const conversionFactor = lengthUnits[lengthUnit].factor;
    const lengthResult = lengthMm / conversionFactor;

    setResult({ value: lengthResult, unit: lengthUnit });
    setCalculation(`L = R × A / ρ = ${formatValue(r)} × ${formatValue(areaMm2)} / ${formatValue(rho)} = ${formatValue(lengthResult)} ${lengthUnit}`);
  };

  const calculateDiameter = () => {
    const r = resistance ? parseFloat(resistance) : NaN;
    const l = length ? parseFloat(length) : NaN;
    const temp = temperature ? parseFloat(temperature) : 20;

    if (isNaN(r) || r <= 0) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive resistance');
      return;
    }

    if (isNaN(l) || l <= 0) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive wire length');
      return;
    }

    const resistanceOhms = convertResistanceToOhms(r, resistanceUnit);
    const lengthMm = convertLengthToMm(l, lengthUnit);

    const rho = getResistivity(temp);
    const areaMm2 = (rho * lengthMm) / resistanceOhms;
    
    if (areaMm2 <= 0) {
      setResult(null);
      setCalculation('Error: Invalid calculation result');
      return;
    }

    const radiusMm = Math.sqrt(areaMm2 / Math.PI);
    const diameterMm = radiusMm * 2;
    
    // Convert to requested unit
    const conversionFactor = diameterUnits[diameterUnit].factor;
    const diameterResult = diameterMm / conversionFactor;

    setResult({ value: diameterResult, unit: diameterUnit });
    setCalculation(`D = 2 × √(ρ × L / (π × R)) = 2 × √(${formatValue(rho)} × ${formatValue(lengthMm)} / (π × ${formatValue(resistanceOhms)})) = ${formatValue(diameterResult)} ${diameterUnit}`);
  };

  const calculateResistivity = () => {
    const r = resistance ? parseFloat(resistance) : NaN;
    const l = length ? parseFloat(length) : NaN;
    const d = diameter ? parseFloat(diameter) : NaN;

    if (isNaN(r) || r <= 0) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive resistance');
      return;
    }

    if (isNaN(l) || l <= 0) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive wire length');
      return;
    }

    if (isNaN(d) || d <= 0) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive wire diameter');
      return;
    }

    const resistanceOhms = convertResistanceToOhms(r, resistanceUnit);
    const lengthMm = convertLengthToMm(l, lengthUnit);
    const diameterMm = convertDiameterToMm(d, diameterUnit);
    const radiusMm = diameterMm / 2;
    const areaMm2 = Math.PI * radiusMm * radiusMm;

    const rho = (resistanceOhms * areaMm2) / lengthMm;

    setResult({ value: rho, unit: 'Ω·mm²/m' });
    setCalculation(`ρ = R × A / L = ${formatValue(r)} × ${formatValue(areaMm2)} / ${formatValue(lengthMm)} = ${formatValue(rho)} Ω·mm²/m`);
  };

  const handleCalculate = () => {
    switch (calcType) {
      case 'resistance':
        calculateResistance();
        break;
      case 'length':
        calculateLength();
        break;
      case 'diameter':
        calculateDiameter();
        break;
      case 'resistivity':
        calculateResistivity();
        break;
    }
  };

  const clearAll = () => {
    setLength('');
    setDiameter('');
    setResistance('');
    setTemperature('20');
    setCustomResistivity('');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Wire Resistance Calculator</h2>
        <p className="text-gray-600">Calculate resistance, length, diameter, or resistivity using R = ρ × L / A</p>
      </div>

      <div className="space-y-6">
        {/* Calculation Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What to Calculate
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="calcType"
                value="resistance"
                checked={calcType === 'resistance'}
                onChange={(e) => setCalcType(e.target.value as CalculationType)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Resistance (R)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="calcType"
                value="length"
                checked={calcType === 'length'}
                onChange={(e) => setCalcType(e.target.value as CalculationType)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Length (L)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="calcType"
                value="diameter"
                checked={calcType === 'diameter'}
                onChange={(e) => setCalcType(e.target.value as CalculationType)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Diameter (D)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="calcType"
                value="resistivity"
                checked={calcType === 'resistivity'}
                onChange={(e) => setCalcType(e.target.value as CalculationType)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Resistivity (ρ)</span>
            </label>
          </div>
        </div>

        {/* Material Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Wire Material
          </label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value as keyof typeof materials)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            {Object.entries(materials).map(([key, mat]) => (
              <option key={key} value={key}>
                {mat.name} ({mat.resistivity} Ω·mm²/m)
              </option>
            ))}
          </select>
        </div>

        {/* Custom Resistivity */}
        {material === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Custom Resistivity (Ω·mm²/m)
            </label>
            <Input
              type="text"
              placeholder="Enter resistivity value"
              value={customResistivity}
              onChange={(e) => setCustomResistivity(e.target.value)}
              className="w-full"
            />
          </div>
        )}

        {/* Temperature */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Temperature (°C)
          </label>
          <Input
            type="text"
            placeholder="Enter temperature (default: 20°C)"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Length Input */}
        {(calcType === 'resistance' || calcType === 'diameter' || calcType === 'resistivity') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Wire Length (L)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter wire length"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full"
                  autoFocus={calcType === 'resistance'}
                />
              </div>
              <div className="w-40">
                <select
                  value={lengthUnit}
                  onChange={(e) => setLengthUnit(e.target.value as keyof typeof lengthUnits)}
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

        {/* Diameter Input */}
        {(calcType === 'resistance' || calcType === 'length' || calcType === 'resistivity') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Wire Diameter (D)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter wire diameter"
                  value={diameter}
                  onChange={(e) => setDiameter(e.target.value)}
                  className="w-full"
                  autoFocus={calcType === 'length' || calcType === 'resistance'}
                />
              </div>
              <div className="w-40">
                <select
                  value={diameterUnit}
                  onChange={(e) => setDiameterUnit(e.target.value as keyof typeof diameterUnits)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        {/* Resistance Input */}
        {(calcType === 'length' || calcType === 'diameter' || calcType === 'resistivity') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Resistance (R)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter resistance"
                  value={resistance}
                  onChange={(e) => setResistance(e.target.value)}
                  className="w-full"
                  autoFocus={calcType === 'length' || calcType === 'diameter' || calcType === 'resistivity'}
                />
              </div>
              <div className="w-40">
                <select
                  value={resistanceUnit}
                  onChange={(e) => setResistanceUnit(e.target.value as keyof typeof resistanceUnits)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(resistanceUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
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
            <li>• Choose what you want to calculate (R, L, D, or ρ)</li>
            <li>• Select the wire material or enter custom resistivity</li>
            <li>• Set temperature if different from 20°C (optional)</li>
            <li>• Enter the known values in your preferred units</li>
            <li>• Click Calculate for instant results</li>
            <li>• Supports multiple length, diameter, and resistance units</li>
            <li>• Includes temperature correction for accurate results</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
