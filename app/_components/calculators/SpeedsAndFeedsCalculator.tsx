'use client';

import { useState } from 'react';

type Mode = 'rpm' | 'feedRate' | 'chipLoad' | 'cuttingSpeed';

type UnitOption = { value: string; label: string; toBase: number };

const diameterUnits: UnitOption[] = [
  { value: 'mm', label: 'mm', toBase: 0.001 },
  { value: 'cm', label: 'cm', toBase: 0.01 },
  { value: 'm', label: 'm', toBase: 1 },
  { value: 'in', label: 'in', toBase: 0.0254 },
];

const cuttingSpeedUnits: UnitOption[] = [
  { value: 'm/min', label: 'm/min', toBase: 1 }, // base SI
  { value: 'SFM', label: 'SFM', toBase: 0.3048 }, // 1 SFM = 0.3048 m/min
];

const feedRateUnits: UnitOption[] = [
  { value: 'mm/min', label: 'mm/min', toBase: 0.001 },
  { value: 'm/min', label: 'm/min', toBase: 1 },
  { value: 'in/min', label: 'in/min', toBase: 0.0254 },
];

const chipLoadUnits: UnitOption[] = [
  { value: 'mm/tooth', label: 'mm/tooth', toBase: 0.001 },
  { value: 'in/tooth', label: 'in/tooth', toBase: 0.0254 },
];

export default function SpeedsAndFeedsCalculator() {
  const [mode, setMode] = useState<Mode>('rpm');

  const [diameter, setDiameter] = useState('');
  const [diameterUnit, setDiameterUnit] = useState('mm');

  const [cuttingSpeed, setCuttingSpeed] = useState('');
  const [cuttingSpeedUnit, setCuttingSpeedUnit] = useState('m/min');

  const [flutes, setFlutes] = useState('2');

  const [rpm, setRpm] = useState('');

  const [feedRate, setFeedRate] = useState('');
  const [feedRateUnit, setFeedRateUnit] = useState('mm/min');

  const [chipLoad, setChipLoad] = useState('');
  const [chipLoadUnit, setChipLoadUnit] = useState('mm/tooth');

  const [result, setResult] = useState<{ rpm?: number; feedRate?: number; chipLoad?: number; cuttingSpeed?: number } | null>(null);

  const toBase = (value: number, unit: string, units: UnitOption[]) => {
    const u = units.find(x => x.value === unit);
    return value * (u?.toBase ?? 1);
  };

  const fromBase = (value: number, unit: string, units: UnitOption[]) => {
    const u = units.find(x => x.value === unit);
    return value / (u?.toBase ?? 1);
  };

  const formatNumber = (v: number): string => {
    const a = Math.abs(v);
    if (a >= 1_000_000) return v.toExponential(4);
    if (a >= 1000) return v.toFixed(2);
    if (a >= 1) return v.toFixed(3);
    if (a >= 0.001) return v.toFixed(6);
    return v.toExponential(4);
  };

  const calculate = () => {
    try {
      const D_m = diameter ? toBase(parseFloat(diameter), diameterUnit, diameterUnits) : 0; // meters
      const V_mmin = cuttingSpeed ? toBase(parseFloat(cuttingSpeed), cuttingSpeedUnit, cuttingSpeedUnits) : 0; // m/min
      const nFlutes = parseInt(flutes || '0', 10);
      const rpmVal = rpm ? parseFloat(rpm) : 0;
      const F_mmin = feedRate ? toBase(parseFloat(feedRate), feedRateUnit, feedRateUnits) : 0; // m/min
      const f_m = chipLoad ? toBase(parseFloat(chipLoad), chipLoadUnit, chipLoadUnits) : 0; // m/tooth

      if (nFlutes <= 0) {
        alert('Number of flutes must be at least 1');
        return;
      }

      let out: { rpm?: number; feedRate?: number; chipLoad?: number; cuttingSpeed?: number } = {};

      // Core formulas (metric base):
      // RPM = (1000 * V) / (π * D_mm) since V is m/min; D_m in meters => RPM = (V / (π * D_m)) * 60
      // More precise: V [m/min] = π * D [m] * RPM / 60 => RPM = (60 * V) / (π * D)
      // FeedRate F [m/min] = RPM * nFlutes * chipLoad [m/tooth]

      if (mode === 'rpm') {
        if (!cuttingSpeed || !diameter) {
          alert('Please enter cutting speed and diameter');
          return;
        }
        if (D_m <= 0) { alert('Diameter must be greater than zero'); return; }
        const rpm_calc = (60 * V_mmin) / (Math.PI * D_m);
        out.rpm = rpm_calc;
        // Also compute typical feed if chip load provided
        if (f_m > 0) out.feedRate = rpm_calc * nFlutes * f_m;
      } else if (mode === 'feedRate') {
        if (!rpm || !chipLoad) {
          alert('Please enter RPM and chip load');
          return;
        }
        const F_calc = rpmVal * nFlutes * f_m; // m/min
        out.feedRate = F_calc;
      } else if (mode === 'chipLoad') {
        if (!rpm || !feedRate) {
          alert('Please enter RPM and feed rate');
          return;
        }
        if (nFlutes <= 0) { alert('Flutes must be >= 1'); return; }
        const f_calc = F_mmin / (rpmVal * nFlutes);
        out.chipLoad = f_calc;
      } else if (mode === 'cuttingSpeed') {
        if (!rpm || !diameter) {
          alert('Please enter RPM and diameter');
          return;
        }
        if (D_m <= 0) { alert('Diameter must be greater than zero'); return; }
        const V_calc = (Math.PI * D_m * rpmVal) / 60; // m/min
        out.cuttingSpeed = V_calc;
      }

      setResult(out);
    } catch (e) {
      alert('Invalid input. Please check values.');
    }
  };

  const reset = () => {
    setDiameter('');
    setCuttingSpeed('');
    setFlutes('2');
    setRpm('');
    setFeedRate('');
    setChipLoad('');
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-6">
        {/* Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Calculate</label>
          <select
            value={mode}
            onChange={(e) => { setMode(e.target.value as Mode); setResult(null); }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent"
          >
            <option value="rpm">Spindle Speed (RPM)</option>
            <option value="feedRate">Feed Rate</option>
            <option value="chipLoad">Chip Load</option>
            <option value="cuttingSpeed">Cutting Speed</option>
          </select>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Diameter */}
          {mode !== 'chipLoad' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tool Diameter *</label>
              <div className="flex gap-2">
                <input type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent" placeholder="Enter diameter" step="any" />
                <select value={diameterUnit} onChange={(e) => setDiameterUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent">
                  {diameterUnits.map(u => (<option key={u.value} value={u.value}>{u.label}</option>))}
                </select>
              </div>
            </div>
          )}

          {/* Cutting Speed */}
          {mode === 'rpm' || mode === 'cuttingSpeed' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cutting Speed *</label>
              <div className="flex gap-2">
                <input type="number" value={cuttingSpeed} onChange={(e) => setCuttingSpeed(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent" placeholder="Enter cutting speed" step="any" />
                <select value={cuttingSpeedUnit} onChange={(e) => setCuttingSpeedUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent">
                  {cuttingSpeedUnits.map(u => (<option key={u.value} value={u.value}>{u.label}</option>))}
                </select>
              </div>
            </div>
          ) : null}

          {/* Flutes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Flutes *</label>
            <input type="number" value={flutes} onChange={(e) => setFlutes(e.target.value)} min={1}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent" placeholder="Enter flutes" />
          </div>

          {/* RPM */}
          {mode !== 'rpm' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Spindle Speed (RPM) *</label>
              <input type="number" value={rpm} onChange={(e) => setRpm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent" placeholder="Enter RPM" />
            </div>
          )}

          {/* Feed Rate */}
          {mode !== 'feedRate' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Feed Rate *</label>
              <div className="flex gap-2">
                <input type="number" value={feedRate} onChange={(e) => setFeedRate(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent" placeholder="Enter feed rate" step="any" />
                <select value={feedRateUnit} onChange={(e) => setFeedRateUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent">
                  {feedRateUnits.map(u => (<option key={u.value} value={u.value}>{u.label}</option>))}
                </select>
              </div>
            </div>
          )}

          {/* Chip Load */}
          {mode !== 'chipLoad' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chip Load *</label>
              <div className="flex gap-2">
                <input type="number" value={chipLoad} onChange={(e) => setChipLoad(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent" placeholder="Enter chip load" step="any" />
                <select value={chipLoadUnit} onChange={(e) => setChipLoadUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#820ECC] focus:border-transparent">
                  {chipLoadUnits.map(u => (<option key={u.value} value={u.value}>{u.label}</option>))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button onClick={calculate} className="flex-1 bg-[#820ECC] text-white py-2 px-6 rounded-md hover:bg-[#6D0BB3] transition-colors font-medium">Calculate</button>
          <button onClick={reset} className="flex-1 bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-colors font-medium">Reset</button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-[#820ECC]">
            <h3 className="text-xl font-bold text-[#820ECC] mb-4">Results</h3>
            <div className="space-y-3">
              {result.rpm !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Spindle Speed (RPM):</span>
                  <span className="text-lg font-bold text-[#820ECC]">{formatNumber(result.rpm)} RPM</span>
                </div>
              )}
              {result.feedRate !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Feed Rate:</span>
                  <span className="text-lg font-bold text-[#820ECC]">{formatNumber(fromBase(result.feedRate, feedRateUnit, feedRateUnits))} {feedRateUnit}</span>
                </div>
              )}
              {result.chipLoad !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Chip Load:</span>
                  <span className="text-lg font-bold text-[#820ECC]">{formatNumber(fromBase(result.chipLoad, chipLoadUnit, chipLoadUnits))} {chipLoadUnit}</span>
                </div>
              )}
              {result.cuttingSpeed !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Cutting Speed:</span>
                  <span className="text-lg font-bold text-[#820ECC]">{formatNumber(fromBase(result.cuttingSpeed, cuttingSpeedUnit, cuttingSpeedUnits))} {cuttingSpeedUnit}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* References */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-700 mb-2">Formulas:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>RPM:</strong> RPM = (60 × V) / (π × D)</p>
            <p><strong>Feed Rate:</strong> F = RPM × flutes × chip load</p>
            <p><strong>Cutting Speed:</strong> V = (π × D × RPM) / 60</p>
            <p><strong>Chip Load:</strong> f = F / (RPM × flutes)</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-gray-700 mb-3">Typical Cutting Speeds (m/min):</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
            <div>Aluminum: 200 - 400</div>
            <div>Mild Steel: 30 - 100</div>
            <div>Stainless Steel: 20 - 60</div>
            <div>Brass: 80 - 200</div>
            <div>Plastics: 100 - 300</div>
            <div>Cast Iron: 20 - 80</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-gray-700 mb-3">Recommended Chip Load (mm/tooth):</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
            <div>1-3 mm end mills: 0.01 - 0.03</div>
            <div>4-6 mm end mills: 0.03 - 0.08</div>
            <div>8-12 mm end mills: 0.06 - 0.12</div>
            <div>Carbide drills (5-10 mm): 0.05 - 0.10</div>
            <div>High-speed steel drills: 0.03 - 0.08</div>
          </div>
        </div>
      </div>
    </div>
  );
}
