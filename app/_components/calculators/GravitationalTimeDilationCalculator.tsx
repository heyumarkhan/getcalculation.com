'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'from-escape-velocity' | 'from-schwarzschild' | 'near-earth' | 'gravitational-factor';

type Result = {
  lines: string[];
};

export default function GravitationalTimeDilationCalculator() {
  const [method, setMethod] = useState<Method>('from-escape-velocity');

  // Inputs
  const [escapeVelocity, setEscapeVelocity] = useState('11186');
  const [escapeVelocityUnit, setEscapeVelocityUnit] = useState('m/s');
  const [mass, setMass] = useState('5.972e24');
  const [massUnit, setMassUnit] = useState('kg');
  const [radius, setRadius] = useState('6371000');
  const [radiusUnit, setRadiusUnit] = useState('m');
  const [altitude, setAltitude] = useState('0');
  const [altitudeUnit, setAltitudeUnit] = useState('m');
  const [gravitationalPotential, setGravitationalPotential] = useState('');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const SPEED_OF_LIGHT = 299_792_458; // m/s
  const GRAVITATIONAL_CONSTANT = 6.67430e-11; // m³ kg⁻¹ s⁻²

  const format = (val: number, digits = 4) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1e6 || (Math.abs(val) < 0.001 && val !== 0)) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  const escapeVelocityToMs = (val: number, unit: string) => {
    if (unit === 'm/s') return val;
    if (unit === 'km/s') return val * 1000;
    return val;
  };

  const massToKg = (val: number, unit: string) => {
    if (unit === 'kg') return val;
    if (unit === 'solar masses') return val * 1.989e30;
    return val;
  };

  const radiusToMeters = (val: number, unit: string) => {
    if (unit === 'm') return val;
    if (unit === 'km') return val * 1000;
    return val;
  };

  const parsePositive = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const handleCalculate = () => {
    setResult(null);
    setCalculation('');

    if (method === 'from-escape-velocity') {
      const vVal = parsePositive(escapeVelocity);
      if (isNaN(vVal)) {
        setCalculation('Please enter valid escape velocity.');
        return;
      }
      const vMs = escapeVelocityToMs(vVal, escapeVelocityUnit);
      if (vMs >= SPEED_OF_LIGHT) {
        setCalculation('Escape velocity must be less than speed of light.');
        return;
      }

      const beta = vMs / SPEED_OF_LIGHT;
      const timeDilationFactor = Math.sqrt(1 - beta * beta);
      const observerTime = 1; // 1 second for observer far from gravity
      const fallingTime = observerTime * timeDilationFactor;
      const slowdown = (1 - timeDilationFactor) * 100;

      setResult({
        lines: [
          `Escape velocity: ${format(vMs)} m/s (${format(beta * 100)}% of light speed)`,
          `Time dilation factor (√(1 - v_e²/c²)): ${format(timeDilationFactor)}`,
          `Per 1 second observed far away: ${format(fallingTime * 1000, 6)} ms passes near massive object`,
          `Time slowdown: ${format(slowdown)}%`,
          `For 1 year at surface: ~${format(slowdown * 365.25 / 100)} days slower`
        ]
      });
      setCalculation('Computed gravitational time dilation from escape velocity.');
      return;
    }

    if (method === 'from-schwarzschild') {
      const mVal = parsePositive(mass);
      const rVal = parsePositive(radius);
      if (isNaN(mVal) || isNaN(rVal)) {
        setCalculation('Please enter valid mass and radius.');
        return;
      }

      const mKg = massToKg(mVal, massUnit);
      const rMeters = radiusToMeters(rVal, radiusUnit);
      const schwarzschildRadius = (2 * GRAVITATIONAL_CONSTANT * mKg) / (SPEED_OF_LIGHT * SPEED_OF_LIGHT);

      if (rMeters <= schwarzschildRadius) {
        setCalculation('Radius must be larger than Schwarzschild radius (object would be a black hole).');
        return;
      }

      const timeDilationFactor = Math.sqrt(1 - schwarzschildRadius / rMeters);
      const observerTime = 1;
      const surfaceTime = observerTime * timeDilationFactor;
      const slowdown = (1 - timeDilationFactor) * 100;

      setResult({
        lines: [
          `Mass: ${format(mKg)} kg`,
          `Radius: ${format(rMeters)} m`,
          `Schwarzschild radius: ${format(schwarzschildRadius)} m`,
          `Time dilation factor (√(1 - R_s/r)): ${format(timeDilationFactor)}`,
          `Per 1 second observed at infinity: ${format(surfaceTime * 1000, 6)} ms passes at surface`,
          `Time slowdown: ${format(slowdown)}%`
        ]
      });
      setCalculation('Computed gravitational time dilation using Schwarzschild metric.');
      return;
    }

    if (method === 'near-earth') {
      const altVal = parsePositive(altitude);
      if (isNaN(altVal)) {
        setCalculation('Please enter valid altitude.');
        return;
      }

      // Earth parameters
      const earthMass = 5.972e24; // kg
      const earthRadius = 6371000; // m
      const altMeters = radiusToMeters(altVal, altitudeUnit);
      const r = earthRadius + altMeters;

      const schwarzschildRadius = (2 * GRAVITATIONAL_CONSTANT * earthMass) / (SPEED_OF_LIGHT * SPEED_OF_LIGHT);
      const timeDilationFactorSurface = Math.sqrt(1 - schwarzschildRadius / earthRadius);
      const timeDilationFactorAltitude = Math.sqrt(1 - schwarzschildRadius / r);

      // More accurate: compare surface to altitude
      const timeDifference = (timeDilationFactorAltitude / timeDilationFactorSurface - 1) * 100;
      const microsecondsPerDay = timeDifference * 86400 / 100;

      setResult({
        lines: [
          `Altitude: ${format(altMeters)} m`,
          `Surface dilation factor: ${format(timeDilationFactorSurface)}`,
          `Altitude dilation factor: ${format(timeDilationFactorAltitude)}`,
          `Clock at altitude runs ${format(timeDifference, 2)}% faster than surface clock`,
          `Per day: altitude clock gains ~${format(Math.abs(microsecondsPerDay))} microseconds`,
          `GPS satellites (~20,200 km) gain ~38 microseconds/day from gravity alone`
        ]
      });
      setCalculation('Computed gravitational time dilation for different altitudes on Earth.');
      return;
    }

    if (method === 'gravitational-factor') {
      const mVal = parsePositive(mass);
      const rVal = parsePositive(radius);
      if (isNaN(mVal) || isNaN(rVal)) {
        setCalculation('Please enter valid mass and radius.');
        return;
      }

      const mKg = massToKg(mVal, massUnit);
      const rMeters = radiusToMeters(rVal, radiusUnit);

      // Gravitational potential energy per unit mass
      const gravitationalPotentialPerMass = -(GRAVITATIONAL_CONSTANT * mKg) / rMeters;
      const timeDilationFactor = Math.sqrt(1 + (2 * gravitationalPotentialPerMass) / (SPEED_OF_LIGHT * SPEED_OF_LIGHT));
      const slowdown = (1 - timeDilationFactor) * 100;

      setResult({
        lines: [
          `Mass: ${format(mKg)} kg`,
          `Radius: ${format(rMeters)} m`,
          `Gravitational potential: ${format(gravitationalPotentialPerMass)} J/kg`,
          `Time dilation factor: ${format(timeDilationFactor)}`,
          `Relative slowdown: ${format(Math.abs(slowdown))}%`,
          `Weaker gravity → faster time; stronger gravity → slower time`
        ]
      });
      setCalculation('Computed gravitational time dilation from gravitational potential.');
      return;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">⌛</span>
          <h1 className="text-2xl font-bold text-gray-900">Gravitational Time Dilation Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate time dilation effects near massive objects using general relativity formulas.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'from-escape-velocity' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="from-escape-velocity" checked={method === 'from-escape-velocity'} onChange={() => setMethod('from-escape-velocity')} className="mr-2" />
              From escape velocity
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'from-schwarzschild' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="from-schwarzschild" checked={method === 'from-schwarzschild'} onChange={() => setMethod('from-schwarzschild')} className="mr-2" />
              From mass and radius
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'near-earth' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="near-earth" checked={method === 'near-earth'} onChange={() => setMethod('near-earth')} className="mr-2" />
              Earth altitudes
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'gravitational-factor' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="gravitational-factor" checked={method === 'gravitational-factor'} onChange={() => setMethod('gravitational-factor')} className="mr-2" />
              From gravitational potential
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {(method === 'from-escape-velocity') && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Escape Velocity" value={escapeVelocity} onChange={(e) => setEscapeVelocity(e.target.value)} type="number" placeholder="e.g., 11186" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={escapeVelocityUnit} onChange={(e) => setEscapeVelocityUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="m/s">m/s</option>
                  <option value="km/s">km/s</option>
                </select>
              </div>
            </div>
          )}

          {(method === 'from-schwarzschild' || method === 'gravitational-factor') && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input label="Mass" value={mass} onChange={(e) => setMass(e.target.value)} type="number" placeholder="e.g., 5.972e24" />
                </div>
                <div className="w-32">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={massUnit} onChange={(e) => setMassUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="kg">kg</option>
                    <option value="solar masses">Solar masses</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input label="Radius" value={radius} onChange={(e) => setRadius(e.target.value)} type="number" placeholder="e.g., 6371000" />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={radiusUnit} onChange={(e) => setRadiusUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="m">m</option>
                    <option value="km">km</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {method === 'near-earth' && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Altitude" value={altitude} onChange={(e) => setAltitude(e.target.value)} type="number" placeholder="e.g., 0" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={altitudeUnit} onChange={(e) => setAltitudeUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="m">m</option>
                  <option value="km">km</option>
                </select>
              </div>
            </div>
          )}

          <Button onClick={handleCalculate} className="w-full bg-[#820ECC] text-white font-semibold py-3 rounded-lg hover:bg-[#6b0aa6] transition">
            Calculate
          </Button>

          {result && (
            <div className="bg-[#820ECC]/10 border-l-4 border-[#820ECC] p-4 rounded">
              <p className="text-gray-600 text-sm mb-2">{calculation}</p>
              <ul className="list-disc list-inside space-y-1 text-gray-800">
                {result.lines.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
