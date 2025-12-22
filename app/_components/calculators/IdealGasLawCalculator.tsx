'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors
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
  'gal': { name: 'gal (US gallons)', factor: 0.00378541 }
};

const temperatureUnits = {
  'K': { name: 'K (Kelvin)', factor: 1, offset: 0 },
  '°C': { name: '°C (Celsius)', factor: 1, offset: 273.15 },
  '°F': { name: '°F (Fahrenheit)', factor: 5/9, offset: 459.67 }
};

// Gas constants in different unit combinations
// R = 8.314 J/(mol·K) = 0.0821 L·atm/(mol·K) = 62.364 L·torr/(mol·K)
const gasConstants = {
  'J/(mol·K)': 8.314, // J/(mol·K) - SI units
  'L·atm/(mol·K)': 0.0821, // L·atm/(mol·K) - common chemistry units
  'L·torr/(mol·K)': 62.364, // L·torr/(mol·K)
  'm³·Pa/(mol·K)': 8.314, // m³·Pa/(mol·K) - same as J/(mol·K)
  'cal/(mol·K)': 1.987 // cal/(mol·K)
};

export default function IdealGasLawCalculator() {
  const [pressure, setPressure] = useState('');
  const [volume, setVolume] = useState('');
  const [moles, setMoles] = useState('');
  const [temperature, setTemperature] = useState('');
  const [pressureUnit, setPressureUnit] = useState('atm');
  const [volumeUnit, setVolumeUnit] = useState('L');
  const [tempUnit, setTempUnit] = useState('K');
  const [gasConstant, setGasConstant] = useState('L·atm/(mol·K)');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'pressure' | 'volume' | 'moles' | 'temperature' } | null>(null);
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

  const convertTempToKelvin = (value: number, unit: string) => {
    const tempData = temperatureUnits[unit as keyof typeof temperatureUnits];
    return value * tempData.factor + tempData.offset;
  };

  const convertTempFromKelvin = (value: number, unit: string) => {
    const tempData = temperatureUnits[unit as keyof typeof temperatureUnits];
    return (value - tempData.offset) / tempData.factor;
  };

  const getGasConstant = (): number => {
    return gasConstants[gasConstant as keyof typeof gasConstants] || 0.0821;
  };

  const calculate = () => {
    const p = pressure ? parseFloat(pressure) : NaN;
    const v = volume ? parseFloat(volume) : NaN;
    const n = moles ? parseFloat(moles) : NaN;
    const t = temperature ? parseFloat(temperature) : NaN;

    const filledCount = [pressure, volume, moles, temperature].filter(val => val !== '').length;

    if (filledCount < 3) {
      setResult(null);
      setCalculation('');
      return;
    }
    
    if (filledCount > 3) {
      setResult(null);
      setCalculation('Error: Please enter exactly 3 values (leave one empty to calculate it)');
      return;
    }

    // Validate inputs
    if (pressure && (isNaN(p) || p <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for pressure');
      return;
    }
    if (volume && (isNaN(v) || v <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for volume');
      return;
    }
    if (moles && (isNaN(n) || n <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for moles');
      return;
    }
    if (temperature && isNaN(t)) {
      setResult(null);
      setCalculation('Error: Please enter a valid number for temperature');
      return;
    }

    // Convert temperature to Kelvin
    let tK: number;
    if (temperature) {
      tK = convertTempToKelvin(t, tempUnit);
      if (tK <= 0) {
        setResult(null);
        setCalculation('Error: Temperature must be greater than absolute zero (0 K, -273.15°C, -459.67°F)');
        return;
      }
    } else {
      tK = NaN;
    }

    // Get gas constant
    const R = getGasConstant();

    // Convert to appropriate base units based on gas constant choice
    // For L·atm/(mol·K), use L and atm
    // For J/(mol·K) or m³·Pa/(mol·K), use m³ and Pa
    let pBase: number, vBase: number;

    if (gasConstant === 'L·atm/(mol·K)') {
      // Use L and atm as base
      pBase = pressure ? (p * pressureUnits[pressureUnit as keyof typeof pressureUnits].factor / 101325) : NaN;
      vBase = volume ? (v * volumeUnits[volumeUnit as keyof typeof volumeUnits].factor / 0.001) : NaN; // Convert to L
    } else if (gasConstant === 'L·torr/(mol·K)') {
      // Use L and torr as base
      pBase = pressure ? (p * pressureUnits[pressureUnit as keyof typeof pressureUnits].factor / 133.322) : NaN;
      vBase = volume ? (v * volumeUnits[volumeUnit as keyof typeof volumeUnits].factor / 0.001) : NaN; // Convert to L
    } else {
      // Use SI units: m³ and Pa
      pBase = pressure ? convertPressureToBase(p, pressureUnit) : NaN;
      vBase = volume ? convertVolumeToBase(v, volumeUnit) : NaN;
    }

    // Ideal Gas Law: PV = nRT
    // Rearrange to solve for the missing variable

    if (!pressure) {
      // Calculate P: P = nRT / V
      if (vBase === 0 || isNaN(vBase)) {
        setResult(null);
        setCalculation('Error: Volume cannot be zero');
        return;
      }
      
      let pBaseResult: number;
      if (gasConstant === 'L·atm/(mol·K)') {
        pBaseResult = (n * R * tK) / vBase; // Result in atm
        const pResult = pBaseResult * (101325 / pressureUnits[pressureUnit as keyof typeof pressureUnits].factor);
        setResult({ value: pResult, unit: pressureUnit, type: 'pressure' });
        setCalculation(`P = nRT / V = (${formatValue(n)} mol × ${R} ${gasConstant} × ${formatValue(tK)} K) / ${formatValue(v)} ${volumeUnit} = ${formatValue(pResult)} ${pressureUnit}`);
      } else if (gasConstant === 'L·torr/(mol·K)') {
        pBaseResult = (n * R * tK) / vBase; // Result in torr
        const pResult = pBaseResult * (133.322 / pressureUnits[pressureUnit as keyof typeof pressureUnits].factor);
        setResult({ value: pResult, unit: pressureUnit, type: 'pressure' });
        setCalculation(`P = nRT / V = (${formatValue(n)} mol × ${R} ${gasConstant} × ${formatValue(tK)} K) / ${formatValue(v)} ${volumeUnit} = ${formatValue(pResult)} ${pressureUnit}`);
      } else {
        pBaseResult = (n * R * tK) / vBase; // Result in Pa
        const pResult = convertPressureFromBase(pBaseResult, pressureUnit);
        setResult({ value: pResult, unit: pressureUnit, type: 'pressure' });
        setCalculation(`P = nRT / V = (${formatValue(n)} mol × ${R} ${gasConstant} × ${formatValue(tK)} K) / ${formatValue(v)} ${volumeUnit} = ${formatValue(pResult)} ${pressureUnit}`);
      }
    } else if (!volume) {
      // Calculate V: V = nRT / P
      if (pBase === 0 || isNaN(pBase)) {
        setResult(null);
        setCalculation('Error: Pressure cannot be zero');
        return;
      }
      
      let vBaseResult: number;
      if (gasConstant === 'L·atm/(mol·K)') {
        vBaseResult = (n * R * tK) / pBase; // Result in L
        const vResult = vBaseResult * (0.001 / volumeUnits[volumeUnit as keyof typeof volumeUnits].factor);
        setResult({ value: vResult, unit: volumeUnit, type: 'volume' });
        setCalculation(`V = nRT / P = (${formatValue(n)} mol × ${R} ${gasConstant} × ${formatValue(tK)} K) / ${formatValue(p)} ${pressureUnit} = ${formatValue(vResult)} ${volumeUnit}`);
      } else if (gasConstant === 'L·torr/(mol·K)') {
        vBaseResult = (n * R * tK) / pBase; // Result in L
        const vResult = vBaseResult * (0.001 / volumeUnits[volumeUnit as keyof typeof volumeUnits].factor);
        setResult({ value: vResult, unit: volumeUnit, type: 'volume' });
        setCalculation(`V = nRT / P = (${formatValue(n)} mol × ${R} ${gasConstant} × ${formatValue(tK)} K) / ${formatValue(p)} ${pressureUnit} = ${formatValue(vResult)} ${volumeUnit}`);
      } else {
        vBaseResult = (n * R * tK) / pBase; // Result in m³
        const vResult = convertVolumeFromBase(vBaseResult, volumeUnit);
        setResult({ value: vResult, unit: volumeUnit, type: 'volume' });
        setCalculation(`V = nRT / P = (${formatValue(n)} mol × ${R} ${gasConstant} × ${formatValue(tK)} K) / ${formatValue(p)} ${pressureUnit} = ${formatValue(vResult)} ${volumeUnit}`);
      }
    } else if (!moles) {
      // Calculate n: n = PV / RT
      if (tK === 0 || isNaN(tK)) {
        setResult(null);
        setCalculation('Error: Temperature cannot be zero');
        return;
      }
      
      let nResult: number;
      if (gasConstant === 'L·atm/(mol·K)') {
        nResult = (pBase * vBase) / (R * tK);
      } else if (gasConstant === 'L·torr/(mol·K)') {
        nResult = (pBase * vBase) / (R * tK);
      } else {
        nResult = (pBase * vBase) / (R * tK);
      }
      
      if (nResult <= 0) {
        setResult(null);
        setCalculation('Error: Calculated moles must be positive');
        return;
      }
      
      setResult({ value: nResult, unit: 'mol', type: 'moles' });
      setCalculation(`n = PV / RT = (${formatValue(p)} ${pressureUnit} × ${formatValue(v)} ${volumeUnit}) / (${R} ${gasConstant} × ${formatValue(tK)} K) = ${formatValue(nResult)} mol`);
    } else if (!temperature) {
      // Calculate T: T = PV / nR
      if (n === 0 || isNaN(n)) {
        setResult(null);
        setCalculation('Error: Moles cannot be zero');
        return;
      }
      
      let tKResult: number;
      if (gasConstant === 'L·atm/(mol·K)') {
        tKResult = (pBase * vBase) / (n * R);
      } else if (gasConstant === 'L·torr/(mol·K)') {
        tKResult = (pBase * vBase) / (n * R);
      } else {
        tKResult = (pBase * vBase) / (n * R);
      }
      
      if (tKResult <= 0) {
        setResult(null);
        setCalculation('Error: Calculated temperature must be greater than absolute zero');
        return;
      }
      
      const tResult = convertTempFromKelvin(tKResult, tempUnit);
      setResult({ value: tResult, unit: tempUnit, type: 'temperature' });
      setCalculation(`T = PV / nR = (${formatValue(p)} ${pressureUnit} × ${formatValue(v)} ${volumeUnit}) / (${formatValue(n)} mol × ${R} ${gasConstant}) = ${formatValue(tKResult)} K = ${formatValue(tResult)} ${tempUnit}`);
    }
  };

  const clearAll = () => {
    setPressure('');
    setVolume('');
    setMoles('');
    setTemperature('');
    setPressureUnit('atm');
    setVolumeUnit('L');
    setTempUnit('K');
    setGasConstant('L·atm/(mol·K)');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ideal Gas Law Calculator</h2>
        <p className="text-gray-600">Calculate pressure, volume, moles, or temperature using PV = nRT</p>
      </div>

      <div className="space-y-6">
        {/* Gas Constant Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gas Constant (R)
          </label>
          <select
            value={gasConstant}
            onChange={(e) => {
              setGasConstant(e.target.value);
              // Auto-adjust units based on gas constant
              if (e.target.value === 'L·atm/(mol·K)') {
                setPressureUnit('atm');
                setVolumeUnit('L');
              } else if (e.target.value === 'L·torr/(mol·K)') {
                setPressureUnit('torr');
                setVolumeUnit('L');
              } else {
                setPressureUnit('Pa');
                setVolumeUnit('m³');
              }
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            {Object.entries(gasConstants).map(([key, value]) => (
              <option key={key} value={key}>
                {key} = {value}
              </option>
            ))}
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">PV = nRT</p>
        </div>

        {/* Pressure Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Pressure (P)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter pressure (leave empty to calculate)"
                value={pressure}
                onChange={(e) => setPressure(e.target.value)}
                className="w-full"
                autoFocus
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

        {/* Volume Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Volume (V)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter volume (leave empty to calculate)"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
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

        {/* Moles Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Number of Moles (n)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter moles (leave empty to calculate)"
                value={moles}
                onChange={(e) => setMoles(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-32">
              <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm">
                mol
              </div>
            </div>
          </div>
        </div>

        {/* Temperature Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Temperature (T)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter temperature (leave empty to calculate)"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">Result</h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <p className="text-sm text-[#820ECC]/80 mt-2 font-mono break-words">
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
            <li>• Enter any three values to calculate the fourth (Pressure, Volume, Moles, or Temperature)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: PV = nRT (Ideal Gas Law)</li>
            <li>• Select the appropriate gas constant (R) based on your unit preferences</li>
            <li>• Temperature must be greater than absolute zero (0 K, -273.15°C, -459.67°F)</li>
            <li>• All calculations use absolute temperature (Kelvin) internally</li>
            <li>• The ideal gas law applies to ideal gases at low pressure and high temperature</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

