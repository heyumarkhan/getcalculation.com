'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'index' | 'snell' | 'critical' | 'speed';

type Result = {
  lines: string[];
};

export default function IndexOfRefractionCalculator() {
  const [method, setMethod] = useState<Method>('index');

  // Method 1: Calculate Index of Refraction
  const [speedLight, setSpeedLight] = useState('299792458');
  const [speedMedium, setSpeedMedium] = useState('225000000');
  const [speedUnit, setSpeedUnit] = useState('m/s');

  // Method 2: Snell's Law - Find angle or index
  const [n1, setN1] = useState('1');
  const [theta1, setTheta1] = useState('30');
  const [n2, setN2] = useState('1.5');
  const [theta2, setTheta2] = useState('');
  const [angleUnit, setAngleUnit] = useState('deg');
  const [snellMode, setSnellMode] = useState('theta2'); // 'theta2', 'n2', 'theta1'

  // Method 3: Critical Angle
  const [n1Crit, setN1Crit] = useState('1.5');
  const [n2Crit, setN2Crit] = useState('1');
  const [critAngleUnit, setCritAngleUnit] = useState('deg');

  // Method 4: Speed of Light in Medium
  const [indexMedium, setIndexMedium] = useState('1.33');
  const [speedLightConst, setSpeedLightConst] = useState('299792458');
  const [speedResultUnit, setSpeedResultUnit] = useState('m/s');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const format = (val: number, digits = 4) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1e6 || (Math.abs(val) < 0.001 && val !== 0)) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  const speedToMs = (val: number, unit: string) => {
    switch (unit) {
      case 'm/s': return val;
      case 'km/s': return val * 1000;
      case 'km/h': return val / 3.6;
      case 'mph': return val * 0.44704;
      case 'ft/s': return val * 0.3048;
      default: return val;
    }
  };

  const msToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'm/s': return val;
      case 'km/s': return val / 1000;
      case 'km/h': return val * 3.6;
      case 'mph': return val / 0.44704;
      case 'ft/s': return val / 0.3048;
      default: return val;
    }
  };

  const angleToRad = (val: number, unit: string) => {
    return unit === 'deg' ? val * (Math.PI / 180) : val;
  };

  const radToUnit = (val: number, unit: string) => {
    return unit === 'deg' ? val * (180 / Math.PI) : val;
  };

  const parsePositive = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const parseNonNegative = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num < 0 ? NaN : num;
  };

  const handleCalculate = () => {
    try {
      if (method === 'index') {
        // n = c / v
        const c = parsePositive(speedLight);
        const v = parsePositive(speedMedium);

        if (isNaN(c) || isNaN(v)) {
          setResult({ lines: ['Error: Please enter valid positive values for both speeds.'] });
          setCalculation('');
          return;
        }

        const cMs = speedToMs(c, speedUnit);
        const vMs = speedToMs(v, speedUnit);

        if (vMs > cMs) {
          setResult({ lines: ['Error: Speed in medium cannot exceed speed of light in vacuum.'] });
          setCalculation('');
          return;
        }

        const n = cMs / vMs;

        const lines = [
          `<strong>Index of Refraction:</strong> n = ${format(n)}`,
          ``,
          `<strong>Input Values:</strong>`,
          `Speed of light (c): ${format(cMs)} m/s = ${format(cMs / 299792458)} × c₀`,
          `Speed in medium (v): ${format(vMs)} m/s`,
          ``,
          `<strong>Calculation:</strong>`,
          `n = c / v = ${format(cMs)} / ${format(vMs)} = ${format(n)}`,
          ``,
          `<strong>Light Speed Reduction:</strong>`,
          `Speed reduced to ${format((1 / n) * 100, 2)}% of c`,
          `Slowdown factor: ${format(n, 4)}×`
        ];

        setResult({ lines });
        setCalculation(`Index of Refraction: n = c/v = ${format(cMs)}/${format(vMs)} = ${format(n)}`);

      } else if (method === 'snell') {
        // Snell's Law: n₁sin(θ₁) = n₂sin(θ₂)
        if (snellMode === 'theta2') {
          const n1Val = parsePositive(n1);
          const theta1Val = parseNonNegative(theta1);
          const n2Val = parsePositive(n2);

          if (isNaN(n1Val) || isNaN(theta1Val) || isNaN(n2Val)) {
            setResult({ lines: ['Error: Please enter valid values.'] });
            setCalculation('');
            return;
          }

          const theta1Rad = angleToRad(theta1Val, angleUnit);
          
          if (theta1Rad > Math.PI / 2) {
            setResult({ lines: ['Error: Incident angle must be ≤ 90°.'] });
            setCalculation('');
            return;
          }

          const sinTheta2 = (n1Val * Math.sin(theta1Rad)) / n2Val;

          if (Math.abs(sinTheta2) > 1) {
            setResult({ lines: ['Error: Total internal reflection occurs. No refracted ray (critical angle exceeded).'] });
            setCalculation('');
            return;
          }

          const theta2Rad = Math.asin(sinTheta2);
          const theta2Val = radToUnit(theta2Rad, angleUnit);

          const lines = [
            `<strong>Refracted Angle:</strong> θ₂ = ${format(theta2Val)}${angleUnit === 'deg' ? '°' : ' rad'}`,
            ``,
            `<strong>Snell's Law:</strong>`,
            `n₁ sin(θ₁) = n₂ sin(θ₂)`,
            ``,
            `<strong>Given:</strong>`,
            `n₁ = ${format(n1Val)} (incident medium)`,
            `θ₁ = ${format(theta1Val)}${angleUnit === 'deg' ? '°' : ' rad'}`,
            `n₂ = ${format(n2Val)} (refracted medium)`,
            ``,
            `<strong>Calculation:</strong>`,
            `sin(θ₂) = (n₁/n₂) × sin(θ₁)`,
            `sin(θ₂) = (${format(n1Val)}/${format(n2Val)}) × sin(${format(theta1Val)}°)`,
            `sin(θ₂) = ${format(sinTheta2, 6)}`,
            `θ₂ = arcsin(${format(sinTheta2, 6)}) = ${format(theta2Val)}${angleUnit === 'deg' ? '°' : ' rad'}`,
            ``,
            `<strong>Bending:</strong> ${n1Val < n2Val ? 'Toward normal (entering denser medium)' : 'Away from normal (entering less dense medium)'}`
          ];

          setResult({ lines });
          setCalculation(`Refracted angle: θ₂ = ${format(theta2Val)}${angleUnit === 'deg' ? '°' : ' rad'}`);

        } else if (snellMode === 'n2') {
          const n1Val = parsePositive(n1);
          const theta1Val = parseNonNegative(theta1);
          const theta2Val = parseNonNegative(theta2);

          if (isNaN(n1Val) || isNaN(theta1Val) || isNaN(theta2Val)) {
            setResult({ lines: ['Error: Please enter valid values.'] });
            setCalculation('');
            return;
          }

          const theta1Rad = angleToRad(theta1Val, angleUnit);
          const theta2Rad = angleToRad(theta2Val, angleUnit);

          if (theta1Rad > Math.PI / 2 || theta2Rad > Math.PI / 2) {
            setResult({ lines: ['Error: Angles must be ≤ 90°.'] });
            setCalculation('');
            return;
          }

          const n2Val = (n1Val * Math.sin(theta1Rad)) / Math.sin(theta2Rad);

          const lines = [
            `<strong>Index of Refraction (n₂):</strong> ${format(n2Val)}`,
            ``,
            `<strong>Snell's Law:</strong>`,
            `n₁ sin(θ₁) = n₂ sin(θ₂)`,
            `n₂ = (n₁ × sin(θ₁)) / sin(θ₂)`,
            ``,
            `<strong>Given:</strong>`,
            `n₁ = ${format(n1Val)}`,
            `θ₁ = ${format(theta1Val)}${angleUnit === 'deg' ? '°' : ' rad'}`,
            `θ₂ = ${format(theta2Val)}${angleUnit === 'deg' ? '°' : ' rad'}`,
            ``,
            `<strong>Calculation:</strong>`,
            `n₂ = (${format(n1Val)} × sin(${format(theta1Val)}°)) / sin(${format(theta2Val)}°)`,
            `n₂ = (${format(n1Val)} × ${format(Math.sin(theta1Rad), 6)}) / ${format(Math.sin(theta2Rad), 6)}`,
            `n₂ = ${format(n2Val)}`
          ];

          setResult({ lines });
          setCalculation(`Index of refraction: n₂ = ${format(n2Val)}`);
        }

      } else if (method === 'critical') {
        // Critical angle: θc = arcsin(n₂/n₁) where n₁ > n₂
        const n1Val = parsePositive(n1Crit);
        const n2Val = parsePositive(n2Crit);

        if (isNaN(n1Val) || isNaN(n2Val)) {
          setResult({ lines: ['Error: Please enter valid positive values for indices.'] });
          setCalculation('');
          return;
        }

        if (n1Val <= n2Val) {
          setResult({ lines: ['Error: Critical angle only exists when n₁ > n₂ (light going from denser to less dense medium).'] });
          setCalculation('');
          return;
        }

        const ratio = n2Val / n1Val;
        const thetaCritRad = Math.asin(ratio);
        const thetaCrit = radToUnit(thetaCritRad, critAngleUnit);

        const lines = [
          `<strong>Critical Angle:</strong> θc = ${format(thetaCrit)}${critAngleUnit === 'deg' ? '°' : ' rad'}`,
          ``,
          `<strong>Definition:</strong>`,
          `Minimum incident angle for total internal reflection`,
          ``,
          `<strong>Formula:</strong>`,
          `θc = arcsin(n₂/n₁) where n₁ > n₂`,
          ``,
          `<strong>Given:</strong>`,
          `n₁ = ${format(n1Val)} (incident medium - denser)`,
          `n₂ = ${format(n2Val)} (transmitted medium - less dense)`,
          ``,
          `<strong>Calculation:</strong>`,
          `sin(θc) = n₂/n₁ = ${format(n2Val)}/${format(n1Val)} = ${format(ratio, 6)}`,
          `θc = arcsin(${format(ratio, 6)}) = ${format(thetaCrit)}${critAngleUnit === 'deg' ? '°' : ' rad'}`,
          ``,
          `<strong>Behavior:</strong>`,
          `• θ < ${format(thetaCrit)}°: Refraction occurs`,
          `• θ = ${format(thetaCrit)}°: Refracted ray along interface`,
          `• θ > ${format(thetaCrit)}°: Total internal reflection (no refraction)`
        ];

        setResult({ lines });
        setCalculation(`Critical angle: θc = ${format(thetaCrit)}${critAngleUnit === 'deg' ? '°' : ' rad'}`);

      } else if (method === 'speed') {
        // v = c / n
        const nVal = parsePositive(indexMedium);
        const cVal = parsePositive(speedLightConst);

        if (isNaN(nVal) || isNaN(cVal)) {
          setResult({ lines: ['Error: Please enter valid positive values.'] });
          setCalculation('');
          return;
        }

        const cMs = speedToMs(cVal, 'm/s');
        const vMs = cMs / nVal;
        const vResult = msToUnit(vMs, speedResultUnit);

        const lines = [
          `<strong>Speed of Light in Medium:</strong> v = ${format(vResult)} ${speedResultUnit}`,
          ``,
          `<strong>Formula:</strong>`,
          `v = c / n`,
          ``,
          `<strong>Given:</strong>`,
          `Speed of light in vacuum: c = ${format(cMs)} m/s`,
          `Index of refraction: n = ${format(nVal)}`,
          ``,
          `<strong>Calculation:</strong>`,
          `v = ${format(cMs)} / ${format(nVal)}`,
          `v = ${format(vMs)} m/s`,
          `v = ${format(vResult)} ${speedResultUnit}`,
          ``,
          `<strong>Speed Comparison:</strong>`,
          `Light travels at ${format((1 / nVal) * 100, 2)}% of vacuum speed`,
          `Slowdown factor: ${format(nVal)}×`,
          `Time to travel 1 meter: ${format((1 / vMs) * 1e9, 2)} nanoseconds`
        ];

        setResult({ lines });
        setCalculation(`Speed in medium: v = c/n = ${format(cMs)}/${format(nVal)} = ${format(vResult)} ${speedResultUnit}`);
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
          <span className="text-2xl">🌈</span>
          <h1 className="text-2xl font-bold text-gray-900">Index of Refraction Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate index of refraction, apply Snell&apos;s law, find critical angles, and determine light speed in different media.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select calculation method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'index' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="index" checked={method === 'index'} onChange={() => setMethod('index')} className="mr-2" />
              Index of Refraction (n = c/v)
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'snell' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="snell" checked={method === 'snell'} onChange={() => setMethod('snell')} className="mr-2" />
              Snell&apos;s Law
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'critical' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="critical" checked={method === 'critical'} onChange={() => setMethod('critical')} className="mr-2" />
              Critical Angle
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'speed' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="speed" checked={method === 'speed'} onChange={() => setMethod('speed')} className="mr-2" />
              Speed in Medium
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {method === 'index' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Speed of Light in Vacuum (c)" 
                    value={speedLight} 
                    onChange={(e) => setSpeedLight(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 299792458" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={speedUnit} onChange={(e) => setSpeedUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="m/s">m/s</option>
                    <option value="km/s">km/s</option>
                    <option value="km/h">km/h</option>
                    <option value="mph">mph</option>
                    <option value="ft/s">ft/s</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    label="Speed of Light in Medium (v)" 
                    value={speedMedium} 
                    onChange={(e) => setSpeedMedium(e.target.value)} 
                    type="number" 
                    placeholder="e.g., 225000000" 
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select value={speedUnit} onChange={(e) => setSpeedUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                    <option value="m/s">m/s</option>
                    <option value="km/s">km/s</option>
                    <option value="km/h">km/h</option>
                    <option value="mph">mph</option>
                    <option value="ft/s">ft/s</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {method === 'snell' && (
            <>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mb-3">
                <p className="text-sm font-semibold text-blue-900 mb-2">Select what to find:</p>
                <div className="flex gap-3">
                  <label className="flex items-center">
                    <input type="radio" name="snellMode" value="theta2" checked={snellMode === 'theta2'} onChange={() => setSnellMode('theta2')} className="mr-2" />
                    <span className="text-sm">Find θ₂ (refracted angle)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="snellMode" value="n2" checked={snellMode === 'n2'} onChange={() => setSnellMode('n2')} className="mr-2" />
                    <span className="text-sm">Find n₂ (index)</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input 
                  label="n₁ (Incident Medium Index)" 
                  value={n1} 
                  onChange={(e) => setN1(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 1" 
                />
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input 
                      label="θ₁ (Incident Angle)" 
                      value={theta1} 
                      onChange={(e) => setTheta1(e.target.value)} 
                      type="number" 
                      placeholder="e.g., 30" 
                    />
                  </div>
                  <div className="w-20">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                    <select value={angleUnit} onChange={(e) => setAngleUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                      <option value="deg">deg</option>
                      <option value="rad">rad</option>
                    </select>
                  </div>
                </div>
              </div>

              {snellMode === 'theta2' && (
                <Input 
                  label="n₂ (Refracted Medium Index)" 
                  value={n2} 
                  onChange={(e) => setN2(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 1.5" 
                />
              )}

              {snellMode === 'n2' && (
                <Input 
                  label="θ₂ (Refracted Angle)" 
                  value={theta2} 
                  onChange={(e) => setTheta2(e.target.value)} 
                  type="number" 
                  placeholder="e.g., 19.5" 
                />
              )}
            </>
          )}

          {method === 'critical' && (
            <>
              <Input 
                label="n₁ (Denser Medium Index)" 
                value={n1Crit} 
                onChange={(e) => setN1Crit(e.target.value)} 
                type="number" 
                placeholder="e.g., 1.5 (glass)" 
              />
              <Input 
                label="n₂ (Less Dense Medium Index)" 
                value={n2Crit} 
                onChange={(e) => setN2Crit(e.target.value)} 
                type="number" 
                placeholder="e.g., 1 (air)" 
              />
              <div className="w-32">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Angle Unit</label>
                <select value={critAngleUnit} onChange={(e) => setCritAngleUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="deg">degrees</option>
                  <option value="rad">radians</option>
                </select>
              </div>
            </>
          )}

          {method === 'speed' && (
            <>
              <Input 
                label="Index of Refraction (n)" 
                value={indexMedium} 
                onChange={(e) => setIndexMedium(e.target.value)} 
                type="number" 
                placeholder="e.g., 1.33 (water)" 
              />
              <Input 
                label="Speed of Light in Vacuum (c)" 
                value={speedLightConst} 
                onChange={(e) => setSpeedLightConst(e.target.value)} 
                type="number" 
                placeholder="299792458" 
              />
              <div className="w-32">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Result Unit</label>
                <select value={speedResultUnit} onChange={(e) => setSpeedResultUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="m/s">m/s</option>
                  <option value="km/s">km/s</option>
                  <option value="km/h">km/h</option>
                  <option value="mph">mph</option>
                  <option value="ft/s">ft/s</option>
                </select>
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
