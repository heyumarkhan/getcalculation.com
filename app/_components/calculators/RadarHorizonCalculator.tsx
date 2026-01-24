'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const heightUnits = {
  m: { name: 'Meters (m)', factor: 1 },
  ft: { name: 'Feet (ft)', factor: 0.3048 }
};

const distanceUnits = {
  km: { name: 'Kilometers (km)', factor: 1 },
  mi: { name: 'Miles (mi)', factor: 0.621371 },
  nm: { name: 'Nautical Miles (nm)', factor: 0.539957 }
};

interface RadarHorizonCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function RadarHorizonCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: RadarHorizonCalculatorProps) {
  const [radarHeight, setRadarHeight] = useState('');
  const [targetHeight, setTargetHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState<'m' | 'ft'>('m');
  const [distanceUnit, setDistanceUnit] = useState<'km' | 'mi' | 'nm'>('km');
  const [result, setResult] = useState<number | null>(null);
  const [calcSteps, setCalcSteps] = useState('');

  const convertHeightToMeters = (value: number, unit: keyof typeof heightUnits) =>
    value * heightUnits[unit].factor;

  const convertDistanceFromKm = (value: number, unit: keyof typeof distanceUnits) =>
    value * distanceUnits[unit].factor;

  const formatNumber = (value: number) => {
    if (!isFinite(value)) return 'Invalid';
    if (Math.abs(value) < 0.001) return value.toExponential(4);
    return value.toFixed(3);
  };

  const calculate = () => {
    const hRadar = parseFloat(radarHeight);
    const hTarget = parseFloat(targetHeight || '0');

    if (isNaN(hRadar) || hRadar < 0 || isNaN(hTarget) || hTarget < 0) {
      setResult(null);
      setCalcSteps('Enter valid non-negative heights for radar and target.');
      return;
    }

    const radarMeters = convertHeightToMeters(hRadar, heightUnit);
    const targetMeters = convertHeightToMeters(hTarget, heightUnit);

    // Standard radar horizon with 4/3 Earth radius model: d_km ≈ 4.12(√h1 + √h2)
    const distanceKm = 4.12 * (Math.sqrt(radarMeters) + Math.sqrt(targetMeters));
    const distanceOut = convertDistanceFromKm(distanceKm, distanceUnit);

    setResult(distanceOut);

    const steps = [
      `d = 4.12 × (√h_radar + √h_target)`,
      `h_radar = ${formatNumber(radarMeters)} m, h_target = ${formatNumber(targetMeters)} m`,
      `d = 4.12 × (√${formatNumber(radarMeters)} + √${formatNumber(targetMeters)}) km`,
      `d = ${formatNumber(distanceKm)} km = ${formatNumber(distanceOut)} ${distanceUnit}`
    ].join('\n');

    setCalcSteps(steps);
  };

  const reset = () => {
    setRadarHeight('');
    setTargetHeight('');
    setHeightUnit('m');
    setDistanceUnit('km');
    setResult(null);
    setCalcSteps('');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-color-button { background-color: ${primaryColor}; }
          .custom-color-button:hover { background-color: ${primaryColor}dd !important; }
          .custom-color-button:focus { box-shadow: 0 0 0 3px ${primaryColor}40 !important; }
          .custom-outline-button { color: ${primaryColor}; border-color: ${primaryColor}; }
          .custom-outline-button:hover { background-color: ${primaryColor}10 !important; }
          .custom-outline-button:focus { box-shadow: 0 0 0 3px ${primaryColor}40 !important; }
        `
      }} />

      <Card className="p-6 max-w-xl mx-auto">
        {showTitle && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Radar Horizon Calculator</h2>
            <p className="text-gray-600">
              Estimate radar line-of-sight range using the 4/3 Earth radius model.
            </p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Radar antenna height</label>
            <div className="flex gap-3">
              <Input
                type="number"
                min="0"
                placeholder="e.g., 30"
                value={radarHeight}
                onChange={(e) => setRadarHeight(e.target.value)}
                className="flex-1"
              />
              <select
                value={heightUnit}
                onChange={(e) => setHeightUnit(e.target.value as 'm' | 'ft')}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {Object.entries(heightUnits).map(([key, unit]) => (
                  <option key={key} value={key}>{unit.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target height (optional)</label>
            <div className="flex gap-3">
              <Input
                type="number"
                min="0"
                placeholder="e.g., 10"
                value={targetHeight}
                onChange={(e) => setTargetHeight(e.target.value)}
                className="flex-1"
              />
              <select
                value={heightUnit}
                onChange={(e) => setHeightUnit(e.target.value as 'm' | 'ft')}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {Object.entries(heightUnits).map(([key, unit]) => (
                  <option key={key} value={key}>{unit.name}</option>
                ))}
              </select>
            </div>
            <p className="text-xs text-gray-500 mt-1">Leave blank for ground target.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Output distance unit</label>
            <select
              value={distanceUnit}
              onChange={(e) => setDistanceUnit(e.target.value as 'km' | 'mi' | 'nm')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {Object.entries(distanceUnits).map(([key, unit]) => (
                <option key={key} value={key}>{unit.name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={calculate} className="flex-1 custom-color-button">Calculate</Button>
            <Button onClick={reset} variant="outline" className="flex-1 custom-outline-button">Reset</Button>
          </div>

          {result !== null && (
            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg animate-fadeIn">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Radar Horizon</h3>
              <p className="text-2xl font-bold text-purple-700 mb-3">
                {formatNumber(result)} {distanceUnit}
              </p>
              {calcSteps && (
                <div className="text-sm text-purple-700 font-mono whitespace-pre-line bg-white p-3 rounded border border-purple-100">
                  {calcSteps}
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
