'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'tempDewpoint' | 'spread' | 'humidity' | 'targetBase';

type Result = {
  lines: string[];
};

export default function CloudBaseCalculator() {
  const [method, setMethod] = useState<Method>('tempDewpoint');

  // Method 1: Temperature & Dew Point
  const [temp, setTemp] = useState('25');
  const [dewpoint, setDewpoint] = useState('18');
  const [tempUnit, setTempUnit] = useState('C');

  // Method 2: Spread only
  const [spread, setSpread] = useState('7');
  const [spreadUnit, setSpreadUnit] = useState('C');

  // Method 3: Temperature + Relative Humidity
  const [tempHumidity, setTempHumidity] = useState('25');
  const [humidity, setHumidity] = useState('60');
  const [humidityTempUnit, setHumidityTempUnit] = useState('C');

  // Method 4: Target base height and surface temperature
  const [targetBase, setTargetBase] = useState('1200');
  const [baseUnit, setBaseUnit] = useState('m');
  const [surfaceTemp, setSurfaceTemp] = useState('25');
  const [surfaceTempUnit, setSurfaceTempUnit] = useState('C');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const format = (val: number, digits = 4) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1e6 || (Math.abs(val) < 0.001 && val !== 0)) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  const toCelsius = (t: number, unit: string) => {
    switch (unit) {
      case 'C':
        return t;
      case 'F':
        return (t - 32) * (5 / 9);
      default:
        return t;
    }
  };

  const fromCelsius = (t: number, unit: string) => {
    switch (unit) {
      case 'C':
        return t;
      case 'F':
        return t * (9 / 5) + 32;
      default:
        return t;
    }
  };

  const deltaToC = (delta: number, unit: string) => {
    switch (unit) {
      case 'C':
        return delta;
      case 'F':
        return delta * (5 / 9);
      default:
        return delta;
    }
  };

  const baseFromSpreadC = (spreadC: number) => {
    // Standard approximation: 125 m per °C, ≈ 400 ft per °C, ≈ 222 ft per °F
    const baseM = spreadC * 125;
    const baseFt = baseM * 3.28084;
    return { baseM, baseFt };
  };

  const dewpointFromRH = (tC: number, rh: number) => {
    // Magnus formula for dew point (Celsius)
    const a = 17.625;
    const b = 243.04;
    const gamma = Math.log(rh / 100) + (a * tC) / (b + tC);
    const td = (b * gamma) / (a - gamma);
    return td;
  };

  const parsePositive = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const parseAny = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) ? NaN : num;
  };

  const handleCalculate = () => {
    try {
      if (method === 'tempDewpoint') {
        const tVal = parseAny(temp);
        const tdVal = parseAny(dewpoint);
        if (isNaN(tVal) || isNaN(tdVal)) {
          setResult({ lines: ['Error: Please enter valid temperature and dew point.'] });
          setCalculation('');
          return;
        }

        const tC = toCelsius(tVal, tempUnit);
        const tdC = toCelsius(tdVal, tempUnit);
        const spreadC = tC - tdC;
        const { baseM, baseFt } = baseFromSpreadC(spreadC);

        const lines = [
          `<strong>Cloud Base Height:</strong> ${format(baseM)} m (${format(baseFt)} ft)`,
          ``,
          `<strong>Formula:</strong> Base ≈ (T - Td) × 125 m/°C`,
          ``,
          `<strong>Given:</strong>`,
          `Temperature: ${format(tC)} °C (${format(fromCelsius(tC, 'F'))} °F)`,
          `Dew Point: ${format(tdC)} °C (${format(fromCelsius(tdC, 'F'))} °F)`,
          `Spread: ${format(spreadC)} °C`,
          ``,
          `<strong>Calculation:</strong>`,
          `Base = ${format(spreadC)} × 125 = ${format(baseM)} m`,
          `Base = ${format(baseFt)} ft (using 222 ft/°F equivalent)`,
          ``,
          `<strong>Notes:</strong>`,
          `Rule-of-thumb approximation; assumes well-mixed surface layer and dry adiabatic lifting.`,
          `Higher spread → higher cloud base; smaller spread → lower cloud base.`,
        ];

        setResult({ lines });
        setCalculation(`Cloud base ≈ (T - Td) × 125 = ${format(spreadC)} × 125 = ${format(baseM)} m`);
      } else if (method === 'spread') {
        const spreadVal = parsePositive(spread);
        if (isNaN(spreadVal)) {
          setResult({ lines: ['Error: Please enter a valid positive temperature-dewpoint spread.'] });
          setCalculation('');
          return;
        }
        const spreadC = deltaToC(spreadVal, spreadUnit);
        const { baseM, baseFt } = baseFromSpreadC(spreadC);

        const lines = [
          `<strong>Cloud Base Height:</strong> ${format(baseM)} m (${format(baseFt)} ft)`,
          ``,
          `<strong>Formula:</strong> Base ≈ Spread × 125 m/°C`,
          ``,
          `<strong>Given:</strong>`,
          `Spread: ${format(spreadVal)} °${spreadUnit}`,
          `Spread (C): ${format(spreadC)} °C`,
          ``,
          `<strong>Calculation:</strong>`,
          `Base = ${format(spreadC)} × 125 = ${format(baseM)} m`,
          `Base = ${format(baseFt)} ft`,
          ``,
          `<strong>Tip:</strong> Use spread in °C for 125 m/°C, or spread in °F with 222 ft/°F.`,
        ];

        setResult({ lines });
        setCalculation(`Cloud base from spread: ${format(spreadC)} × 125 = ${format(baseM)} m`);
      } else if (method === 'humidity') {
        const tVal = parseAny(tempHumidity);
        const rhVal = parsePositive(humidity);
        if (isNaN(tVal) || isNaN(rhVal) || rhVal > 100) {
          setResult({ lines: ['Error: Please enter valid temperature and relative humidity (0-100%).'] });
          setCalculation('');
          return;
        }

        const tC = toCelsius(tVal, humidityTempUnit);
        const tdC = dewpointFromRH(tC, rhVal);
        const spreadC = tC - tdC;
        const { baseM, baseFt } = baseFromSpreadC(spreadC);

        const lines = [
          `<strong>Cloud Base Height:</strong> ${format(baseM)} m (${format(baseFt)} ft)`,
          ``,
          `<strong>Derived Dew Point (Magnus formula):</strong> Td = ${format(tdC)} °C (${format(fromCelsius(tdC, 'F'))} °F)`,
          `Spread: ${format(spreadC)} °C`,
          ``,
          `<strong>Calculation:</strong>`,
          `Base = ${format(spreadC)} × 125 = ${format(baseM)} m`,
          `Base = ${format(baseFt)} ft`,
          ``,
          `<strong>Inputs:</strong>`,
          `Temperature: ${format(tC)} °C (${format(fromCelsius(tC, 'F'))} °F)`,
          `Relative Humidity: ${format(rhVal)}%`,
          ``,
          `<strong>Note:</strong> RH-derived dew point assumes surface layer is representative and air is well-mixed.`,
        ];

        setResult({ lines });
        setCalculation(`Cloud base from RH: spread ${format(spreadC)} °C → ${format(baseM)} m`);
      } else if (method === 'targetBase') {
        const baseVal = parsePositive(targetBase);
        const tVal = parseAny(surfaceTemp);
        if (isNaN(baseVal) || isNaN(tVal)) {
          setResult({ lines: ['Error: Please enter valid base height and surface temperature.'] });
          setCalculation('');
          return;
        }

        const baseM = baseUnit === 'm' ? baseVal : baseVal / 3.28084;
        const baseFt = baseUnit === 'ft' ? baseVal : baseVal * 3.28084;
        const tC = toCelsius(tVal, surfaceTempUnit);

        const requiredSpreadC = baseM / 125;
        const requiredTdC = tC - requiredSpreadC;
        const requiredTdF = fromCelsius(requiredTdC, 'F');

        const lines = [
          `<strong>Required Dew Point for Target Base:</strong> Td = ${format(requiredTdC)} °C (${format(requiredTdF)} °F)`,
          ``,
          `<strong>Formula:</strong> Spread = Base / 125 (m/°C)`,
          ``,
          `<strong>Given:</strong>`,
          `Target Cloud Base: ${format(baseM)} m (${format(baseFt)} ft)`,
          `Surface Temperature: ${format(tC)} °C (${format(fromCelsius(tC, 'F'))} °F)`,
          ``,
          `<strong>Calculation:</strong>`,
          `Required spread: ${format(baseM)} / 125 = ${format(requiredSpreadC)} °C`,
          `Td = T - spread = ${format(tC)} - ${format(requiredSpreadC)} = ${format(requiredTdC)} °C`,
          ``,
          `<strong>Interpretation:</strong> If Td is much lower than current dew point, cloud base will be higher than target until moisture increases.`,
        ];

        setResult({ lines });
        setCalculation(`Required dew point: Td = T - Base/125 = ${format(requiredTdC)} °C`);
      }
    } catch (error) {
      setResult({ lines: ['Error: Calculation failed. Please check your inputs.'] });
      setCalculation('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">☁️</span>
          <h1 className="text-2xl font-bold text-gray-900">Cloud Base Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Estimate cloud base height from temperature, dew point, humidity, or target base requirements.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select calculation method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'tempDewpoint' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="tempDewpoint" checked={method === 'tempDewpoint'} onChange={() => setMethod('tempDewpoint')} className="mr-2" />
              Temperature & Dew Point
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'spread' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="spread" checked={method === 'spread'} onChange={() => setMethod('spread')} className="mr-2" />
              Spread Only
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'humidity' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="humidity" checked={method === 'humidity'} onChange={() => setMethod('humidity')} className="mr-2" />
              Temp + Relative Humidity
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'targetBase' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="targetBase" checked={method === 'targetBase'} onChange={() => setMethod('targetBase')} className="mr-2" />
              Target Base → Dew Point
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {method === 'tempDewpoint' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Surface Temperature"
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    type="number"
                    placeholder="e.g., 25"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={tempUnit} onChange={(e) => setTempUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="C">°C</option>
                    <option value="F">°F</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Surface Dew Point"
                    value={dewpoint}
                    onChange={(e) => setDewpoint(e.target.value)}
                    type="number"
                    placeholder="e.g., 18"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={tempUnit} onChange={(e) => setTempUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="C">°C</option>
                    <option value="F">°F</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {method === 'spread' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Temperature-Dew Point Spread"
                    value={spread}
                    onChange={(e) => setSpread(e.target.value)}
                    type="number"
                    placeholder="e.g., 7"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={spreadUnit} onChange={(e) => setSpreadUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="C">°C</option>
                    <option value="F">°F</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {method === 'humidity' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Surface Temperature"
                    value={tempHumidity}
                    onChange={(e) => setTempHumidity(e.target.value)}
                    type="number"
                    placeholder="e.g., 25"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={humidityTempUnit} onChange={(e) => setHumidityTempUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="C">°C</option>
                    <option value="F">°F</option>
                  </select>
                </div>
              </div>
              <Input
                label="Relative Humidity (%)"
                value={humidity}
                onChange={(e) => setHumidity(e.target.value)}
                type="number"
                placeholder="e.g., 60"
              />
            </>
          )}

          {method === 'targetBase' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Target Cloud Base Height"
                    value={targetBase}
                    onChange={(e) => setTargetBase(e.target.value)}
                    type="number"
                    placeholder="e.g., 1200"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={baseUnit} onChange={(e) => setBaseUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="m">m</option>
                    <option value="ft">ft</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Surface Temperature"
                    value={surfaceTemp}
                    onChange={(e) => setSurfaceTemp(e.target.value)}
                    type="number"
                    placeholder="e.g., 25"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={surfaceTempUnit} onChange={(e) => setSurfaceTempUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="C">°C</option>
                    <option value="F">°F</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>

        <Button onClick={handleCalculate} className="w-full bg-[#820ECC] text-white font-semibold py-3 rounded-lg hover:bg-[#6b0aa6] transition mt-6">
          Calculate
        </Button>

        {result && (
          <div className="bg-[#820ECC]/10 border-l-4 border-[#820ECC] p-4 rounded mt-6">
            {calculation && <p className="text-gray-600 text-sm mb-2">{calculation}</p>}
            <div className="space-y-1 text-sm text-gray-800">
              {result.lines.map((line, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: line }} />
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
