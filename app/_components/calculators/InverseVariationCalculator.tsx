'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Mode = 'solve-for-y' | 'solve-for-k' | 'solve-for-x';

export default function InverseVariationCalculator() {
  const [mode, setMode] = useState<Mode>('solve-for-y');
  const [k, setK] = useState<string>('');
  const [x, setX] = useState<string>('');
  const [y, setY] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setSteps([]);

    const kVal = parseFloat(k);
    const xVal = parseFloat(x);
    const yVal = parseFloat(y);

    if (mode === 'solve-for-y') {
      if (isNaN(kVal) || isNaN(xVal) || xVal === 0) {
        setError('Please enter valid numbers for k and x (x cannot be 0)');
        return;
      }

      const yRes = kVal / xVal;
      setResult(yRes.toString());
      setSteps([
        `Using inverse variation: y = k / x`,
        `k = ${kVal}, x = ${xVal}`,
        `y = ${kVal} / ${xVal} = ${yRes}`
      ]);
      setY(yRes.toString());
    }

    if (mode === 'solve-for-k') {
      if (isNaN(xVal) || isNaN(yVal)) {
        setError('Please enter valid numbers for x and y');
        return;
      }
      // k = x * y
      const kRes = xVal * yVal;
      setResult(kRes.toString());
      setSteps([
        `Using inverse variation: y = k / x`,
        `Rearrange: k = x * y`,
        `x = ${xVal}, y = ${yVal}`,
        `k = ${xVal} * ${yVal} = ${kRes}`
      ]);
      setK(kRes.toString());
    }

    if (mode === 'solve-for-x') {
      if (isNaN(kVal) || isNaN(yVal) || yVal === 0) {
        setError('Please enter valid numbers for k and y (y cannot be 0)');
        return;
      }
      // x = k / y
      const xRes = kVal / yVal;
      setResult(xRes.toString());
      setSteps([
        `Using inverse variation: y = k / x`,
        `Rearrange: x = k / y`,
        `k = ${kVal}, y = ${yVal}`,
        `x = ${kVal} / ${yVal} = ${xRes}`
      ]);
      setX(xRes.toString());
    }
  };

  const clearAll = () => {
    setK('');
    setX('');
    setY('');
    setResult(null);
    setSteps([]);
    setError('');
  };

  const examples = [
    { mode: 'solve-for-y', k: '10', x: '2', desc: 'y = k/x → k=10, x=2 => y=5' },
    { mode: 'solve-for-k', x: '4', y: '3', desc: 'k = x*y → x=4, y=3 => k=12' },
    { mode: 'solve-for-x', k: '15', y: '3', desc: 'x = k/y → k=15, y=3 => x=5' }
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Inverse Variation Calculator</h2>
        <p className="text-gray-600">Solve y = k / x (inverse variation). Solve for y, k, or x.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
        {/* Calculator Form - Left Side */}
        <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">

        <div className="grid grid-cols-3 gap-2">
          <button onClick={() => setMode('solve-for-y')} className={`p-2 rounded ${mode === 'solve-for-y' ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 border-gray-200'}`}>Solve for y</button>
          <button onClick={() => setMode('solve-for-k')} className={`p-2 rounded ${mode === 'solve-for-k' ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 border-gray-200'}`}>Solve for k</button>
          <button onClick={() => setMode('solve-for-x')} className={`p-2 rounded ${mode === 'solve-for-x' ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 border-gray-200'}`}>Solve for x</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="k" type="text" value={k} onChange={(e) => setK(e.target.value)} placeholder="Enter k" />
          <Input label="x" type="text" value={x} onChange={(e) => setX(e.target.value)} placeholder="Enter x" />
          <Input label="y" type="text" value={y} onChange={(e) => setY(e.target.value)} placeholder="Enter y" />
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1">Calculate</Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">Clear</Button>
        </div>

        {error && <div className="p-3 bg-red-50 border border-red-200 rounded"><p className="text-red-700">{error}</p></div>}

        {result && <div className="p-4 bg-blue-50 border border-blue-200 rounded"><h3 className="font-semibold text-blue-900">Result</h3><p className="text-2xl font-bold text-blue-700">{result}</p></div>}

        {steps.length > 0 && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded">
            <h4 className="font-semibold text-gray-900 mb-2">Steps</h4>
            <div className="font-mono text-sm text-gray-700 whitespace-pre-line">{steps.join('\n')}</div>
          </div>
        )}

        <div className="p-4 bg-gray-50 border border-gray-200 rounded">
          <h4 className="font-semibold text-gray-900 mb-2">Examples</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            {examples.map((ex, i) => (
              <div key={i} className="p-2 rounded hover:bg-blue-50 cursor-pointer" onClick={() => { setMode(ex.mode as Mode); setK(ex.k || ''); setX(ex.x || ''); setY(ex.y || ''); setResult(null); setSteps([]); setError(''); }}>{ex.desc}</div>
            ))}
          </div>
        </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>

        {/* Results Section - Right Side */}
        <div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md min-h-[400px] transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Inverse Variation Results
            </h3>
            
            {result !== null ? (
              <div className="animate-fadeIn">
                <div className="bg-white rounded-lg border p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700 text-lg">Result:</span>
                      <span className="font-mono font-bold text-xl text-gray-900">{result}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-gray-700 text-lg">Mode:</span>
                      <span className="font-mono font-bold text-xl text-gray-900">{mode.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                  <p className="text-sm">Enter values to solve inverse variation equation</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

