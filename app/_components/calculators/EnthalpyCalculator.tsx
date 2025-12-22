'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: J, J, Pa, m³)
const enthalpyUnits = {
  'J': { name: 'J (Joules)', factor: 1 },
  'kJ': { name: 'kJ (Kilojoules)', factor: 1000 },
  'cal': { name: 'cal (Calories)', factor: 4.184 },
  'kcal': { name: 'kcal (Kilocalories)', factor: 4184 },
  'BTU': { name: 'BTU', factor: 1055.06 },
  'Wh': { name: 'Wh (Watt-hours)', factor: 3600 }
};

const energyUnits = {
  'J': { name: 'J (Joules)', factor: 1 },
  'kJ': { name: 'kJ (Kilojoules)', factor: 1000 },
  'cal': { name: 'cal (Calories)', factor: 4.184 },
  'kcal': { name: 'kcal (Kilocalories)', factor: 4184 },
  'BTU': { name: 'BTU', factor: 1055.06 }
};

const pressureUnits = {
  'Pa': { name: 'Pa (Pascals)', factor: 1 },
  'kPa': { name: 'kPa (Kilopascals)', factor: 1000 },
  'MPa': { name: 'MPa (Megapascals)', factor: 1000000 },
  'bar': { name: 'bar', factor: 100000 },
  'atm': { name: 'atm (Atmospheres)', factor: 101325 },
  'psi': { name: 'psi (Pounds per sq in)', factor: 6894.76 },
  'torr': { name: 'torr', factor: 133.322 }
};

const volumeUnits = {
  'm³': { name: 'm³ (Cubic meters)', factor: 1 },
  'L': { name: 'L (Liters)', factor: 0.001 },
  'mL': { name: 'mL (Milliliters)', factor: 0.000001 },
  'cm³': { name: 'cm³ (Cubic centimeters)', factor: 0.000001 },
  'ft³': { name: 'ft³ (Cubic feet)', factor: 0.0283168 },
  'in³': { name: 'in³ (Cubic inches)', factor: 0.0000163871 },
  'gal': { name: 'gal (US Gallons)', factor: 0.00378541 }
};

export default function EnthalpyCalculator() {
  const [calculationMode, setCalculationMode] = useState<'enthalpy' | 'heat' | 'specific'>('enthalpy');
  
  // Enthalpy mode: ΔH = ΔU + PΔV
  const [internalEnergyChange, setInternalEnergyChange] = useState('');
  const [pressure, setPressure] = useState('');
  const [volumeChange, setVolumeChange] = useState('');
  const [enthalpyChange, setEnthalpyChange] = useState('');
  
  // Heat mode: ΔH = Q (at constant pressure)
  const [heatTransfer, setHeatTransfer] = useState('');
  
  // Specific heat mode: ΔH = m × c × ΔT
  const [mass, setMass] = useState('');
  const [specificHeat, setSpecificHeat] = useState('');
  const [tempChange, setTempChange] = useState('');
  
  // Units
  const [enthalpyUnit, setEnthalpyUnit] = useState('J');
  const [energyUnit, setEnergyUnit] = useState('J');
  const [pressureUnit, setPressureUnit] = useState('Pa');
  const [volumeUnit, setVolumeUnit] = useState('m³');
  const [heatUnit, setHeatUnit] = useState('J');
  const [massUnit, setMassUnit] = useState('kg');
  const [specificHeatUnit, setSpecificHeatUnit] = useState('J/(kg·K)');
  const [tempUnit, setTempUnit] = useState('K');
  
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

  const convertEnthalpyToBase = (value: number, unit: string) => {
    return value * enthalpyUnits[unit as keyof typeof enthalpyUnits].factor;
  };

  const convertEnthalpyFromBase = (value: number, unit: string) => {
    return value / enthalpyUnits[unit as keyof typeof enthalpyUnits].factor;
  };

  const convertEnergyToBase = (value: number, unit: string) => {
    return value * energyUnits[unit as keyof typeof energyUnits].factor;
  };

  const convertEnergyFromBase = (value: number, unit: string) => {
    return value / energyUnits[unit as keyof typeof energyUnits].factor;
  };

  const convertPressureToBase = (value: number, unit: string) => {
    return value * pressureUnits[unit as keyof typeof pressureUnits].factor;
  };

  const convertPressureFromBase = (value: number, unit: string) => {
    return value / pressureUnits[unit as keyof typeof pressureUnits].factor;
  };

  const convertVolumeToBase = (value: number, unit: string) => {
    return value * volumeUnits[unit as keyof typeof volumeUnits].factor;
  };

  const convertVolumeFromBase = (value: number, unit: string) => {
    return value / volumeUnits[unit as keyof typeof volumeUnits].factor;
  };

  const calculateEnthalpy = () => {
    if (calculationMode === 'enthalpy') {
      const deltaU = internalEnergyChange ? parseFloat(internalEnergyChange) : NaN;
      const p = pressure ? parseFloat(pressure) : NaN;
      const deltaV = volumeChange ? parseFloat(volumeChange) : NaN;
      const deltaH = enthalpyChange ? parseFloat(enthalpyChange) : NaN;

      const filledCount = [internalEnergyChange, pressure, volumeChange, enthalpyChange].filter(val => val !== '').length;

      if (filledCount !== 3) {
        setResult(null);
        setCalculation('');
        return;
      }

      // Validate inputs
      if (internalEnergyChange && isNaN(deltaU)) {
        setResult(null);
        setCalculation('Error: Please enter a valid number for internal energy change');
        return;
      }
      if (pressure && (isNaN(p) || p < 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for pressure');
        return;
      }
      if (volumeChange && isNaN(deltaV)) {
        setResult(null);
        setCalculation('Error: Please enter a valid number for volume change');
        return;
      }
      if (enthalpyChange && isNaN(deltaH)) {
        setResult(null);
        setCalculation('Error: Please enter a valid number for enthalpy change');
        return;
      }

      // Convert to base units
      if (!enthalpyChange) {
        // Calculate ΔH = ΔU + PΔV
        const deltaUBase = convertEnergyToBase(deltaU, energyUnit);
        const pBase = convertPressureToBase(p, pressureUnit);
        const deltaVBase = convertVolumeToBase(deltaV, volumeUnit);
        
        const deltaHBase = deltaUBase + (pBase * deltaVBase);
        const deltaHResult = convertEnthalpyFromBase(deltaHBase, enthalpyUnit);
        
        setResult({ value: deltaHResult, unit: enthalpyUnit });
        setCalculation(`ΔH = ΔU + PΔV = ${formatValue(deltaU)} ${energyUnit} + (${formatValue(p)} ${pressureUnit} × ${formatValue(deltaV)} ${volumeUnit}) = ${formatValue(deltaHResult)} ${enthalpyUnit}`);
      } else if (!internalEnergyChange) {
        // Calculate ΔU = ΔH - PΔV
        const deltaHBase = convertEnthalpyToBase(deltaH, enthalpyUnit);
        const pBase = convertPressureToBase(p, pressureUnit);
        const deltaVBase = convertVolumeToBase(deltaV, volumeUnit);
        
        const deltaUBase = deltaHBase - (pBase * deltaVBase);
        const deltaUResult = convertEnergyFromBase(deltaUBase, energyUnit);
        
        setResult({ value: deltaUResult, unit: energyUnit });
        setCalculation(`ΔU = ΔH - PΔV = ${formatValue(deltaH)} ${enthalpyUnit} - (${formatValue(p)} ${pressureUnit} × ${formatValue(deltaV)} ${volumeUnit}) = ${formatValue(deltaUResult)} ${energyUnit}`);
      } else if (!pressure) {
        // Calculate P = (ΔH - ΔU) / ΔV
        const deltaHBase = convertEnthalpyToBase(deltaH, enthalpyUnit);
        const deltaUBase = convertEnergyToBase(deltaU, energyUnit);
        const deltaVBase = convertVolumeToBase(deltaV, volumeUnit);
        
        if (deltaVBase === 0) {
          setResult(null);
          setCalculation('Error: Volume change cannot be zero');
          return;
        }
        
        const pBase = (deltaHBase - deltaUBase) / deltaVBase;
        const pResult = convertPressureFromBase(pBase, pressureUnit);
        
        setResult({ value: pResult, unit: pressureUnit });
        setCalculation(`P = (ΔH - ΔU) / ΔV = (${formatValue(deltaH)} ${enthalpyUnit} - ${formatValue(deltaU)} ${energyUnit}) / ${formatValue(deltaV)} ${volumeUnit} = ${formatValue(pResult)} ${pressureUnit}`);
      } else if (!volumeChange) {
        // Calculate ΔV = (ΔH - ΔU) / P
        const deltaHBase = convertEnthalpyToBase(deltaH, enthalpyUnit);
        const deltaUBase = convertEnergyToBase(deltaU, energyUnit);
        const pBase = convertPressureToBase(p, pressureUnit);
        
        if (pBase === 0) {
          setResult(null);
          setCalculation('Error: Pressure cannot be zero');
          return;
        }
        
        const deltaVBase = (deltaHBase - deltaUBase) / pBase;
        const deltaVResult = convertVolumeFromBase(deltaVBase, volumeUnit);
        
        setResult({ value: deltaVResult, unit: volumeUnit });
        setCalculation(`ΔV = (ΔH - ΔU) / P = (${formatValue(deltaH)} ${enthalpyUnit} - ${formatValue(deltaU)} ${energyUnit}) / ${formatValue(p)} ${pressureUnit} = ${formatValue(deltaVResult)} ${volumeUnit}`);
      }
    } else if (calculationMode === 'heat') {
      // At constant pressure, ΔH = Q
      const q = heatTransfer ? parseFloat(heatTransfer) : NaN;
      
      if (isNaN(q)) {
        setResult(null);
        setCalculation('Error: Please enter a valid number for heat transfer');
        return;
      }
      
      const qBase = convertEnergyToBase(q, heatUnit);
      const deltaHBase = qBase; // At constant pressure, ΔH = Q
      const deltaHResult = convertEnthalpyFromBase(deltaHBase, enthalpyUnit);
      
      setResult({ value: deltaHResult, unit: enthalpyUnit });
      setCalculation(`ΔH = Q (at constant pressure) = ${formatValue(q)} ${heatUnit} = ${formatValue(deltaHResult)} ${enthalpyUnit}`);
    } else if (calculationMode === 'specific') {
      // ΔH = m × c × ΔT
      const m = mass ? parseFloat(mass) : NaN;
      const c = specificHeat ? parseFloat(specificHeat) : NaN;
      const deltaT = tempChange ? parseFloat(tempChange) : NaN;

      const filledCount = [mass, specificHeat, tempChange].filter(val => val !== '').length;

      if (filledCount !== 3) {
        setResult(null);
        setCalculation('');
        return;
      }

      // Validate inputs
      if (mass && (isNaN(m) || m <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for mass');
        return;
      }
      if (specificHeat && (isNaN(c) || c <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for specific heat');
        return;
      }
      if (tempChange && isNaN(deltaT)) {
        setResult(null);
        setCalculation('Error: Please enter a valid number for temperature change');
        return;
      }

      // Convert temperature change to Kelvin (for calculation, but display in original unit)
      // For specific heat calculations, we need consistent units
      // Assuming specific heat is in J/(kg·K), mass in kg, temp in K
      const mBase = massUnit === 'kg' ? m : (massUnit === 'g' ? m * 0.001 : (massUnit === 'lb' ? m * 0.453592 : m * 0.0283495));
      const cBase = specificHeatUnit === 'J/(kg·K)' ? c : (specificHeatUnit === 'kJ/(kg·K)' ? c * 1000 : c * 4184);
      const deltaTBase = tempUnit === 'K' ? deltaT : (tempUnit === '°C' ? deltaT : deltaT * 5/9);
      
      const deltaHBase = mBase * cBase * deltaTBase;
      const deltaHResult = convertEnthalpyFromBase(deltaHBase, enthalpyUnit);
      
      setResult({ value: deltaHResult, unit: enthalpyUnit });
      setCalculation(`ΔH = m × c × ΔT = ${formatValue(m)} ${massUnit} × ${formatValue(c)} ${specificHeatUnit} × ${formatValue(deltaT)} ${tempUnit} = ${formatValue(deltaHResult)} ${enthalpyUnit}`);
    }
  };

  const clearAll = () => {
    setInternalEnergyChange('');
    setPressure('');
    setVolumeChange('');
    setEnthalpyChange('');
    setHeatTransfer('');
    setMass('');
    setSpecificHeat('');
    setTempChange('');
    setEnthalpyUnit('J');
    setEnergyUnit('J');
    setPressureUnit('Pa');
    setVolumeUnit('m³');
    setHeatUnit('J');
    setMassUnit('kg');
    setSpecificHeatUnit('J/(kg·K)');
    setTempUnit('K');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enthalpy Calculator</h2>
        <p className="text-gray-600">Calculate enthalpy change using different methods: ΔH = ΔU + PΔV, ΔH = Q, or ΔH = m × c × ΔT</p>
      </div>

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Mode
          </label>
          <select
            value={calculationMode}
            onChange={(e) => {
              setCalculationMode(e.target.value as 'enthalpy' | 'heat' | 'specific');
              clearAll();
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="enthalpy">Enthalpy: ΔH = ΔU + PΔV</option>
            <option value="heat">Constant Pressure: ΔH = Q</option>
            <option value="specific">Specific Heat: ΔH = m × c × ΔT</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">
            {calculationMode === 'enthalpy' && 'ΔH = ΔU + PΔV'}
            {calculationMode === 'heat' && 'ΔH = Q (at constant pressure)'}
            {calculationMode === 'specific' && 'ΔH = m × c × ΔT'}
          </p>
        </div>

        {/* Enthalpy Mode Inputs */}
        {calculationMode === 'enthalpy' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Internal Energy Change (ΔU)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter internal energy change"
                    value={internalEnergyChange}
                    onChange={(e) => setInternalEnergyChange(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-40">
                  <select
                    value={energyUnit}
                    onChange={(e) => setEnergyUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(energyUnits).map(([key, unit]) => (
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
                Pressure (P)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Volume Change (ΔV)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter volume change"
                    value={volumeChange}
                    onChange={(e) => setVolumeChange(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-32">
                  <select
                    value={volumeUnit}
                    onChange={(e) => setVolumeUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Enthalpy Change (ΔH)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter enthalpy change (leave empty to calculate)"
                    value={enthalpyChange}
                    onChange={(e) => setEnthalpyChange(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={enthalpyUnit}
                    onChange={(e) => setEnthalpyUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(enthalpyUnits).map(([key, unit]) => (
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

        {/* Heat Mode Inputs */}
        {calculationMode === 'heat' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Heat Transfer (Q) at Constant Pressure
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter heat transfer"
                  value={heatTransfer}
                  onChange={(e) => setHeatTransfer(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="w-40">
                <select
                  value={heatUnit}
                  onChange={(e) => setHeatUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                >
                  {Object.entries(energyUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Enthalpy Change (ΔH) Result Unit
              </label>
              <select
                value={enthalpyUnit}
                onChange={(e) => setEnthalpyUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(enthalpyUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Specific Heat Mode Inputs */}
        {calculationMode === 'specific' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Mass (m)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter mass"
                    value={mass}
                    onChange={(e) => setMass(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-32">
                  <select
                    value={massUnit}
                    onChange={(e) => setMassUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="lb">lb</option>
                    <option value="oz">oz</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Specific Heat (c)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter specific heat"
                    value={specificHeat}
                    onChange={(e) => setSpecificHeat(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={specificHeatUnit}
                    onChange={(e) => setSpecificHeatUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                  >
                    <option value="J/(kg·K)">J/(kg·K)</option>
                    <option value="kJ/(kg·K)">kJ/(kg·K)</option>
                    <option value="cal/(g·°C)">cal/(g·°C)</option>
                    <option value="kcal/(kg·°C)">kcal/(kg·°C)</option>
                    <option value="BTU/(lb·°F)">BTU/(lb·°F)</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Temperature Change (ΔT)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter temperature change"
                    value={tempChange}
                    onChange={(e) => setTempChange(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-32">
                  <select
                    value={tempUnit}
                    onChange={(e) => setTempUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    <option value="K">K (Kelvin)</option>
                    <option value="°C">°C (Celsius)</option>
                    <option value="°F">°F (Fahrenheit)</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Enthalpy Change (ΔH) Result Unit
              </label>
              <select
                value={enthalpyUnit}
                onChange={(e) => setEnthalpyUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(enthalpyUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="flex gap-3 pt-2">
          <Button onClick={calculateEnthalpy} className="flex-1">
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
            {calculation && !calculation.startsWith('Error:') && (
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
            {calculationMode === 'enthalpy' && (
              <>
                <li>• Enter any three values to calculate the fourth</li>
                <li>• Leave the value you want to calculate empty</li>
                <li>• Formula: ΔH = ΔU + PΔV</li>
              </>
            )}
            {calculationMode === 'heat' && (
              <>
                <li>• Enter the heat transfer at constant pressure</li>
                <li>• At constant pressure, enthalpy change equals heat transfer: ΔH = Q</li>
              </>
            )}
            {calculationMode === 'specific' && (
              <>
                <li>• Enter mass, specific heat, and temperature change</li>
                <li>• Formula: ΔH = m × c × ΔT</li>
              </>
            )}
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

