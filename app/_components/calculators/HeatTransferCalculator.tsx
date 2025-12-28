'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Stefan-Boltzmann constant (W/(m²·K⁴))
const STEFAN_BOLTZMANN = 5.670374419e-8;

// Unit conversion factors
const powerUnits = {
  'W': { name: 'W (Watts)', factor: 1 },
  'kW': { name: 'kW (Kilowatts)', factor: 1000 },
  'mW': { name: 'mW (Milliwatts)', factor: 0.001 },
  'BTU/h': { name: 'BTU/h (BTU per hour)', factor: 0.293071 },
  'cal/s': { name: 'cal/s (Calories per second)', factor: 4.184 },
  'kcal/h': { name: 'kcal/h (Kilocalories per hour)', factor: 1.163 }
};

const areaUnits = {
  'm²': { name: 'm² (Square meters)', factor: 1 },
  'cm²': { name: 'cm² (Square centimeters)', factor: 0.0001 },
  'mm²': { name: 'mm² (Square millimeters)', factor: 0.000001 },
  'ft²': { name: 'ft² (Square feet)', factor: 0.092903 },
  'in²': { name: 'in² (Square inches)', factor: 0.00064516 }
};

const lengthUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 }
};

const thermalConductivityUnits = {
  'W/(m·K)': { name: 'W/(m·K)', factor: 1 },
  'W/(m·°C)': { name: 'W/(m·°C)', factor: 1 },
  'kW/(m·K)': { name: 'kW/(m·K)', factor: 1000 },
  'cal/(s·cm·°C)': { name: 'cal/(s·cm·°C)', factor: 418.4 },
  'BTU/(h·ft·°F)': { name: 'BTU/(h·ft·°F)', factor: 1.73073 }
};

const convectionCoeffUnits = {
  'W/(m²·K)': { name: 'W/(m²·K)', factor: 1 },
  'W/(m²·°C)': { name: 'W/(m²·°C)', factor: 1 },
  'BTU/(h·ft²·°F)': { name: 'BTU/(h·ft²·°F)', factor: 5.67826 },
  'cal/(s·cm²·°C)': { name: 'cal/(s·cm²·°C)', factor: 41840 }
};

const temperatureUnits = {
  'K': { name: 'K (Kelvin)', factor: 1, offset: 0 },
  '°C': { name: '°C (Celsius)', factor: 1, offset: 273.15 },
  '°F': { name: '°F (Fahrenheit)', factor: 5/9, offset: 459.67 }
};

type TransferMode = 'conduction' | 'convection' | 'radiation';

export default function HeatTransferCalculator() {
  const [mode, setMode] = useState<TransferMode>('conduction');
  const [heatTransferRate, setHeatTransferRate] = useState('');
  const [area, setArea] = useState('');
  const [temp1, setTemp1] = useState('');
  const [temp2, setTemp2] = useState('');
  const [thickness, setThickness] = useState('');
  const [thermalConductivity, setThermalConductivity] = useState('');
  const [convectionCoeff, setConvectionCoeff] = useState('');
  const [emissivity, setEmissivity] = useState('');
  const [powerUnit, setPowerUnit] = useState('W');
  const [areaUnit, setAreaUnit] = useState('m²');
  const [lengthUnit, setLengthUnit] = useState('m');
  const [tempUnit, setTempUnit] = useState('°C');
  const [thermalCondUnit, setThermalCondUnit] = useState('W/(m·K)');
  const [convectionCoeffUnit, setConvectionCoeffUnit] = useState('W/(m²·K)');
  const [result, setResult] = useState<{ value: number; unit: string; type: string } | null>(null);
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
    return value.toLocaleString('en-US', { maximumFractionDigits: 6, useGrouping: true });
  };

  const convertPowerToBase = (value: number, unit: string) => {
    return value * powerUnits[unit as keyof typeof powerUnits].factor;
  };

  const convertPowerFromBase = (value: number, unit: string) => {
    return value / powerUnits[unit as keyof typeof powerUnits].factor;
  };

  const convertAreaToBase = (value: number, unit: string) => {
    return value * areaUnits[unit as keyof typeof areaUnits].factor;
  };

  const convertLengthToBase = (value: number, unit: string) => {
    return value * lengthUnits[unit as keyof typeof lengthUnits].factor;
  };

  const convertTempToKelvin = (value: number, unit: string) => {
    const tempData = temperatureUnits[unit as keyof typeof temperatureUnits];
    return value * tempData.factor + tempData.offset;
  };

  const convertTempFromKelvin = (value: number, unit: string) => {
    const tempData = temperatureUnits[unit as keyof typeof temperatureUnits];
    return (value - tempData.offset) / tempData.factor;
  };

  const calculate = () => {
    const Q = heatTransferRate ? parseFloat(heatTransferRate) : NaN;
    const A = area ? parseFloat(area) : NaN;
    const T1 = temp1 ? parseFloat(temp1) : NaN;
    const T2 = temp2 ? parseFloat(temp2) : NaN;
    const d = thickness ? parseFloat(thickness) : NaN;
    const k = thermalConductivity ? parseFloat(thermalConductivity) : NaN;
    const h = convectionCoeff ? parseFloat(convectionCoeff) : NaN;
    const ε = emissivity ? parseFloat(emissivity) : NaN;

    if (mode === 'conduction') {
      // Conduction: Q = k × A × (T1 - T2) / d
      const filledCount = [heatTransferRate, thermalConductivity, area, temp1, temp2, thickness].filter(val => val !== '').length;
      
      if (filledCount !== 5) {
        setResult(null);
        setCalculation('');
        return;
      }

      // Validate inputs
      if (heatTransferRate && (isNaN(Q) || Q <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for heat transfer rate');
        return;
      }
      if (thermalConductivity && (isNaN(k) || k <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for thermal conductivity');
        return;
      }
      if (area && (isNaN(A) || A <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for area');
        return;
      }
      if (temp1 && isNaN(T1)) {
        setResult(null);
        setCalculation('Error: Please enter a valid number for temperature 1');
        return;
      }
      if (temp2 && isNaN(T2)) {
        setResult(null);
        setCalculation('Error: Please enter a valid number for temperature 2');
        return;
      }
      if (thickness && (isNaN(d) || d <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for thickness');
        return;
      }

      if (!heatTransferRate) {
        // Calculate Q = k × A × (T1 - T2) / d
        // Convert k to base units W/(m·K)
        let kBase: number;
        if (thermalCondUnit === 'W/(m·K)' || thermalCondUnit === 'W/(m·°C)') {
          kBase = k;
        } else if (thermalCondUnit === 'kW/(m·K)') {
          kBase = k * 1000;
        } else if (thermalCondUnit === 'cal/(s·cm·°C)') {
          kBase = k * 418.4;
        } else if (thermalCondUnit === 'BTU/(h·ft·°F)') {
          kBase = k * 1.73073;
        } else {
          kBase = k;
        }
        
        const ABase = convertAreaToBase(A, areaUnit);
        const T1Base = convertTempToKelvin(T1, tempUnit);
        const T2Base = convertTempToKelvin(T2, tempUnit);
        const dBase = convertLengthToBase(d, lengthUnit);
        const QBase = kBase * ABase * (T1Base - T2Base) / dBase;
        const QResult = convertPowerFromBase(QBase, powerUnit);
        
        setResult({ value: QResult, unit: powerUnit, type: 'heat transfer rate' });
        setCalculation(`Q = k × A × (T₁ - T₂) / d\nQ = ${formatValue(k)} ${thermalCondUnit} × ${formatValue(A)} ${areaUnit} × (${formatValue(T1)} ${tempUnit} - ${formatValue(T2)} ${tempUnit}) / ${formatValue(d)} ${lengthUnit}\nQ = ${formatValue(QResult)} ${powerUnit}`);
      } else if (!thermalConductivity) {
        // Calculate k = Q × d / (A × (T1 - T2))
        const QBase = convertPowerToBase(Q, powerUnit);
        const ABase = convertAreaToBase(A, areaUnit);
        const T1Base = convertTempToKelvin(T1, tempUnit);
        const T2Base = convertTempToKelvin(T2, tempUnit);
        const dBase = convertLengthToBase(d, lengthUnit);
        
        if (ABase === 0 || (T1Base - T2Base) === 0) {
          setResult(null);
          setCalculation('Error: Area and temperature difference cannot be zero');
          return;
        }
        
        const kBase = (QBase * dBase) / (ABase * (T1Base - T2Base));
        
        // Convert kBase to selected unit
        let kResult: number;
        if (thermalCondUnit === 'W/(m·K)' || thermalCondUnit === 'W/(m·°C)') {
          kResult = kBase;
        } else if (thermalCondUnit === 'kW/(m·K)') {
          kResult = kBase / 1000;
        } else if (thermalCondUnit === 'cal/(s·cm·°C)') {
          kResult = kBase / 418.4;
        } else if (thermalCondUnit === 'BTU/(h·ft·°F)') {
          kResult = kBase / 1.73073;
        } else {
          kResult = kBase;
        }
        
        setResult({ value: kResult, unit: thermalCondUnit, type: 'thermal conductivity' });
        setCalculation(`k = Q × d / (A × (T₁ - T₂))\nk = ${formatValue(Q)} ${powerUnit} × ${formatValue(d)} ${lengthUnit} / (${formatValue(A)} ${areaUnit} × (${formatValue(T1)} ${tempUnit} - ${formatValue(T2)} ${tempUnit}))\nk = ${formatValue(kResult)} ${thermalCondUnit}`);
      }
    } else if (mode === 'convection') {
      // Convection: Q = h × A × (T_surface - T_fluid)
      const filledCount = [heatTransferRate, convectionCoeff, area, temp1, temp2].filter(val => val !== '').length;
      
      if (filledCount !== 4) {
        setResult(null);
        setCalculation('');
        return;
      }

      // Validate inputs
      if (heatTransferRate && (isNaN(Q) || Q <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for heat transfer rate');
        return;
      }
      if (convectionCoeff && (isNaN(h) || h <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for convection coefficient');
        return;
      }
      if (area && (isNaN(A) || A <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for area');
        return;
      }
      if (temp1 && isNaN(T1)) {
        setResult(null);
        setCalculation('Error: Please enter a valid number for surface temperature');
        return;
      }
      if (temp2 && isNaN(T2)) {
        setResult(null);
        setCalculation('Error: Please enter a valid number for fluid temperature');
        return;
      }

      if (!heatTransferRate) {
        // Calculate Q = h × A × (T_surface - T_fluid)
        // Convert h to base units W/(m²·K)
        let hBase: number;
        if (convectionCoeffUnit === 'W/(m²·K)' || convectionCoeffUnit === 'W/(m²·°C)') {
          hBase = h;
        } else if (convectionCoeffUnit === 'BTU/(h·ft²·°F)') {
          hBase = h * 5.67826;
        } else if (convectionCoeffUnit === 'cal/(s·cm²·°C)') {
          hBase = h * 41840;
        } else {
          hBase = h;
        }
        
        const ABase = convertAreaToBase(A, areaUnit);
        const T1Base = convertTempToKelvin(T1, tempUnit);
        const T2Base = convertTempToKelvin(T2, tempUnit);
        const QBase = hBase * ABase * (T1Base - T2Base);
        const QResult = convertPowerFromBase(QBase, powerUnit);
        
        setResult({ value: QResult, unit: powerUnit, type: 'heat transfer rate' });
        setCalculation(`Q = h × A × (T_surface - T_fluid)\nQ = ${formatValue(h)} ${convectionCoeffUnit} × ${formatValue(A)} ${areaUnit} × (${formatValue(T1)} ${tempUnit} - ${formatValue(T2)} ${tempUnit})\nQ = ${formatValue(QResult)} ${powerUnit}`);
      } else if (!convectionCoeff) {
        // Calculate h = Q / (A × (T_surface - T_fluid))
        const QBase = convertPowerToBase(Q, powerUnit);
        const ABase = convertAreaToBase(A, areaUnit);
        const T1Base = convertTempToKelvin(T1, tempUnit);
        const T2Base = convertTempToKelvin(T2, tempUnit);
        
        if (ABase === 0 || (T1Base - T2Base) === 0) {
          setResult(null);
          setCalculation('Error: Area and temperature difference cannot be zero');
          return;
        }
        
        const hBase = QBase / (ABase * (T1Base - T2Base));
        
        // Convert hBase to selected unit
        let hResult: number;
        if (convectionCoeffUnit === 'W/(m²·K)' || convectionCoeffUnit === 'W/(m²·°C)') {
          hResult = hBase;
        } else if (convectionCoeffUnit === 'BTU/(h·ft²·°F)') {
          hResult = hBase / 5.67826;
        } else if (convectionCoeffUnit === 'cal/(s·cm²·°C)') {
          hResult = hBase / 41840;
        } else {
          hResult = hBase;
        }
        
        setResult({ value: hResult, unit: convectionCoeffUnit, type: 'convection coefficient' });
        setCalculation(`h = Q / (A × (T_surface - T_fluid))\nh = ${formatValue(Q)} ${powerUnit} / (${formatValue(A)} ${areaUnit} × (${formatValue(T1)} ${tempUnit} - ${formatValue(T2)} ${tempUnit}))\nh = ${formatValue(hResult)} ${convectionCoeffUnit}`);
      }
    } else if (mode === 'radiation') {
      // Radiation: Q = ε × σ × A × (T1⁴ - T2⁴)
      const filledCount = [heatTransferRate, emissivity, area, temp1, temp2].filter(val => val !== '').length;
      
      if (filledCount !== 4) {
        setResult(null);
        setCalculation('');
        return;
      }

      // Validate inputs
      if (heatTransferRate && (isNaN(Q) || Q <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for heat transfer rate');
        return;
      }
      if (emissivity && (isNaN(ε) || ε < 0 || ε > 1)) {
        setResult(null);
        setCalculation('Error: Please enter a valid emissivity between 0 and 1');
        return;
      }
      if (area && (isNaN(A) || A <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for area');
        return;
      }
      if (temp1 && (isNaN(T1) || T1 < 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid non-negative number for temperature 1');
        return;
      }
      if (temp2 && (isNaN(T2) || T2 < 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid non-negative number for temperature 2');
        return;
      }

      if (!heatTransferRate) {
        // Calculate Q = ε × σ × A × (T1⁴ - T2⁴)
        const ABase = convertAreaToBase(A, areaUnit);
        const T1Base = convertTempToKelvin(T1, tempUnit);
        const T2Base = convertTempToKelvin(T2, tempUnit);
        const QBase = ε * STEFAN_BOLTZMANN * ABase * (Math.pow(T1Base, 4) - Math.pow(T2Base, 4));
        const QResult = convertPowerFromBase(QBase, powerUnit);
        
        setResult({ value: QResult, unit: powerUnit, type: 'heat transfer rate' });
        setCalculation(`Q = ε × σ × A × (T₁⁴ - T₂⁴)\nQ = ${formatValue(ε)} × ${STEFAN_BOLTZMANN.toExponential(3)} W/(m²·K⁴) × ${formatValue(A)} ${areaUnit} × (${formatValue(T1)} ${tempUnit}⁴ - ${formatValue(T2)} ${tempUnit}⁴)\nQ = ${formatValue(QResult)} ${powerUnit}`);
      } else if (!emissivity) {
        // Calculate ε = Q / (σ × A × (T1⁴ - T2⁴))
        const QBase = convertPowerToBase(Q, powerUnit);
        const ABase = convertAreaToBase(A, areaUnit);
        const T1Base = convertTempToKelvin(T1, tempUnit);
        const T2Base = convertTempToKelvin(T2, tempUnit);
        const tempDiff = Math.pow(T1Base, 4) - Math.pow(T2Base, 4);
        
        if (ABase === 0 || tempDiff === 0) {
          setResult(null);
          setCalculation('Error: Area and temperature difference cannot be zero');
          return;
        }
        
        const εResult = QBase / (STEFAN_BOLTZMANN * ABase * tempDiff);
        
        if (εResult < 0 || εResult > 1) {
          setResult(null);
          setCalculation('Error: Calculated emissivity must be between 0 and 1');
          return;
        }
        
        setResult({ value: εResult, unit: '', type: 'emissivity' });
        setCalculation(`ε = Q / (σ × A × (T₁⁴ - T₂⁴))\nε = ${formatValue(Q)} ${powerUnit} / (${STEFAN_BOLTZMANN.toExponential(3)} W/(m²·K⁴) × ${formatValue(A)} ${areaUnit} × (${formatValue(T1)} ${tempUnit}⁴ - ${formatValue(T2)} ${tempUnit}⁴))\nε = ${formatValue(εResult)}`);
      }
    }
  };

  const clearAll = () => {
    setHeatTransferRate('');
    setArea('');
    setTemp1('');
    setTemp2('');
    setThickness('');
    setThermalConductivity('');
    setConvectionCoeff('');
    setEmissivity('');
    setPowerUnit('W');
    setAreaUnit('m²');
    setLengthUnit('m');
    setTempUnit('°C');
    setThermalCondUnit('W/(m·K)');
    setConvectionCoeffUnit('W/(m²·K)');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Heat Transfer Calculator</h2>
        <p className="text-gray-600">Calculate heat transfer rate for conduction, convection, or radiation</p>
      </div>

      <div className="space-y-6">
        {/* Mode Selection */}
        <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
          <label className="flex items-center gap-2 cursor-pointer flex-1">
            <input
              type="radio"
              name="mode"
              checked={mode === 'conduction'}
              onChange={() => {
                setMode('conduction');
                setResult(null);
                setCalculation('');
              }}
              className="w-4 h-4 text-[#820ECC] focus:ring-[#820ECC]"
            />
            <span className="text-sm font-medium text-gray-700">Conduction</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer flex-1">
            <input
              type="radio"
              name="mode"
              checked={mode === 'convection'}
              onChange={() => {
                setMode('convection');
                setResult(null);
                setCalculation('');
              }}
              className="w-4 h-4 text-[#820ECC] focus:ring-[#820ECC]"
            />
            <span className="text-sm font-medium text-gray-700">Convection</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer flex-1">
            <input
              type="radio"
              name="mode"
              checked={mode === 'radiation'}
              onChange={() => {
                setMode('radiation');
                setResult(null);
                setCalculation('');
              }}
              className="w-4 h-4 text-[#820ECC] focus:ring-[#820ECC]"
            />
            <span className="text-sm font-medium text-gray-700">Radiation</span>
          </label>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">
            {mode === 'conduction' && 'Q = k × A × (T₁ - T₂) / d'}
            {mode === 'convection' && 'Q = h × A × (T_surface - T_fluid)'}
            {mode === 'radiation' && 'Q = ε × σ × A × (T₁⁴ - T₂⁴)'}
          </p>
        </div>

        {/* Heat Transfer Rate Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Heat Transfer Rate (Q)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter heat transfer rate (leave empty to calculate)"
                value={heatTransferRate}
                onChange={(e) => setHeatTransferRate(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={powerUnit}
                onChange={(e) => setPowerUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(powerUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Area Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Area (A)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={areaUnit}
                onChange={(e) => setAreaUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(areaUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Temperature Inputs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {mode === 'convection' ? 'Surface Temperature (T_surface)' : 'Temperature 1 (T₁)'}
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter temperature"
                value={temp1}
                onChange={(e) => setTemp1(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(temperatureUnits).map(([key, unit]) => (
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
            {mode === 'convection' ? 'Fluid Temperature (T_fluid)' : 'Temperature 2 (T₂)'}
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter temperature"
                value={temp2}
                onChange={(e) => setTemp2(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(temperatureUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Conduction-specific inputs */}
        {mode === 'conduction' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Thickness (d)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter thickness"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={lengthUnit}
                    onChange={(e) => setLengthUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Thermal Conductivity (k)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter thermal conductivity (leave empty to calculate)"
                    value={thermalConductivity}
                    onChange={(e) => setThermalConductivity(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={thermalCondUnit}
                    onChange={(e) => setThermalCondUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(thermalConductivityUnits).map(([key, unit]) => (
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

        {/* Convection-specific inputs */}
        {mode === 'convection' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Convection Coefficient (h)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter convection coefficient (leave empty to calculate)"
                  value={convectionCoeff}
                  onChange={(e) => setConvectionCoeff(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-40">
                <select
                  value={convectionCoeffUnit}
                  onChange={(e) => setConvectionCoeffUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                >
                  {Object.entries(convectionCoeffUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Radiation-specific inputs */}
        {mode === 'radiation' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Emissivity (ε)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter emissivity (0-1, leave empty to calculate)"
                  value={emissivity}
                  onChange={(e) => setEmissivity(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-40 flex items-center justify-center">
                <span className="text-sm text-gray-500">(dimensionless)</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Emissivity ranges from 0 (perfect reflector) to 1 (perfect blackbody)
            </p>
          </div>
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
          <div className="mt-6 p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg">
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">
              {result.type}
            </h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <div className="mt-3 p-3 bg-white rounded border border-[#820ECC]/20">
                <p className="text-sm text-gray-700 font-mono whitespace-pre-line">
                  {calculation}
                </p>
              </div>
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
            <li>• Select heat transfer mode: Conduction, Convection, or Radiation</li>
            <li>• For conduction: Enter 5 of 6 values (Q, k, A, T₁, T₂, d) - leave one empty to calculate</li>
            <li>• For convection: Enter 4 of 5 values (Q, h, A, T_surface, T_fluid) - leave one empty to calculate</li>
            <li>• For radiation: Enter 4 of 5 values (Q, ε, A, T₁, T₂) - leave one empty to calculate</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• All area, length, and coefficient values should be positive</li>
            <li>• Emissivity must be between 0 and 1</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

