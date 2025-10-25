'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface ExtendedGCDResult {
  gcd: number;
  x: number;
  y: number;
  steps: string[];
}

export default function InverseModuloCalculator() {
  const [a, setA] = useState('');
  const [n, setN] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [calculation, setCalculation] = useState('');
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const extendedGCD = (a: number, b: number): ExtendedGCDResult => {
    const steps: string[] = [];
    let oldR = a, r = b;
    let oldS = 1, s = 0;
    let oldT = 0, t = 1;

    steps.push(`Initial: a = ${a}, b = ${b}`);
    steps.push(`r₀ = ${oldR}, r₁ = ${r}`);
    steps.push(`s₀ = ${oldS}, s₁ = ${s}`);
    steps.push(`t₀ = ${oldT}, t₁ = ${t}`);

    let step = 1;
    while (r !== 0) {
      const quotient = Math.floor(oldR / r);
      steps.push(`\nStep ${step}:`);
      steps.push(`q = ⌊${oldR}/${r}⌋ = ${quotient}`);
      
      const newR = oldR - quotient * r;
      const newS = oldS - quotient * s;
      const newT = oldT - quotient * t;
      
      steps.push(`r = ${oldR} - ${quotient} × ${r} = ${newR}`);
      steps.push(`s = ${oldS} - ${quotient} × ${s} = ${newS}`);
      steps.push(`t = ${oldT} - ${quotient} × ${t} = ${newT}`);
      
      oldR = r; r = newR;
      oldS = s; s = newS;
      oldT = t; t = newT;
      
      step++;
    }

    steps.push(`\nFinal: gcd(${a}, ${b}) = ${oldR}`);
    steps.push(`Coefficients: x = ${oldS}, y = ${oldT}`);
    steps.push(`Verification: ${a} × ${oldS} + ${b} × ${oldT} = ${a * oldS + b * oldT}`);

    return {
      gcd: oldR,
      x: oldS,
      y: oldT,
      steps
    };
  };

  const calculateInverse = () => {
    if (!a.trim() || !n.trim()) {
      setResult(null);
      setCalculation('');
      setSteps([]);
      setError('');
      return;
    }

    const numA = parseInt(a);
    const numN = parseInt(n);
    
    if (isNaN(numA) || isNaN(numN) || numN <= 0) {
      setError('Please enter valid positive integers');
      setResult(null);
      setCalculation('');
      setSteps([]);
      return;
    }

    if (numA < 0) {
      setError('Please enter a non-negative integer for a');
      setResult(null);
      setCalculation('');
      setSteps([]);
      return;
    }

    setError('');

    // Calculate extended GCD
    const gcdResult = extendedGCD(numA, numN);
    setSteps(gcdResult.steps);

    if (gcdResult.gcd !== 1) {
      setError(`No inverse exists: gcd(${numA}, ${numN}) = ${gcdResult.gcd} ≠ 1`);
      setResult(null);
      setCalculation('');
      return;
    }

    // The inverse is the coefficient x from extended GCD
    let inverse = gcdResult.x;
    
    // Ensure the inverse is positive and in the range [0, n-1]
    while (inverse < 0) {
      inverse += numN;
    }
    while (inverse >= numN) {
      inverse -= numN;
    }

    setResult(inverse.toString());
    setCalculation(`The modular inverse of ${numA} modulo ${numN} is ${inverse}`);
  };

  const clearAll = () => {
    setA('');
    setN('');
    setResult(null);
    setCalculation('');
    setSteps([]);
    setError('');
  };

  const getExamples = () => {
    return [
      { a: '3', n: '7', description: 'Find 3⁻¹ mod 7' },
      { a: '5', n: '11', description: 'Find 5⁻¹ mod 11' },
      { a: '7', n: '13', description: 'Find 7⁻¹ mod 13' },
      { a: '2', n: '9', description: 'Find 2⁻¹ mod 9' }
    ];
  };

  const examples = getExamples();

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Inverse Modulo Calculator</h2>
        <p className="text-gray-600">Calculate the modular multiplicative inverse using the extended Euclidean algorithm</p>
      </div>

      <div className="space-y-4">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number (a)
            </label>
            <Input
              type="number"
              placeholder="Enter number (e.g., 3)"
              value={a}
              onChange={(e) => setA(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modulus (n)
            </label>
            <Input
              type="number"
              placeholder="Enter modulus (e.g., 7)"
              value={n}
              onChange={(e) => setN(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={calculateInverse} className="flex-1">
            Calculate Inverse
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Error</h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Modular Inverse</h3>
            <p className="text-2xl font-bold text-blue-700">
              {a}⁻¹ mod {n} = {result}
            </p>
            {calculation && (
              <p className="text-sm text-blue-600 mt-2">
                {calculation}
              </p>
            )}
          </div>
        )}

        {steps.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Extended Euclidean Algorithm Steps</h3>
            <div className="text-sm text-gray-700 font-mono whitespace-pre-line max-h-64 overflow-y-auto">
              {steps.join('\n')}
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>Number (a):</strong> The number whose inverse you want to find</li>
            <li>• <strong>Modulus (n):</strong> The modulus (must be positive)</li>
            <li>• <strong>Condition:</strong> gcd(a, n) must equal 1 for an inverse to exist</li>
            <li>• <strong>Result:</strong> The inverse x such that (a × x) mod n = 1</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
            {examples.map((example, index) => (
              <div key={index} className="cursor-pointer hover:bg-blue-100 p-2 rounded" onClick={() => { setA(example.a); setN(example.n); }}>
                <strong>{example.description}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Applications</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• <strong>Cryptography:</strong> RSA encryption and decryption</li>
            <li>• <strong>Number Theory:</strong> Solving linear congruences</li>
            <li>• <strong>Computer Science:</strong> Hash functions and checksums</li>
            <li>• <strong>Mathematics:</strong> Group theory and abstract algebra</li>
            <li>• <strong>Engineering:</strong> Error detection and correction codes</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">Mathematical Background</h3>
          <div className="text-sm text-yellow-700 space-y-2">
            <p><strong>Definition:</strong> The modular inverse of a modulo n is a number x such that:</p>
            <p className="font-mono text-center">(a × x) ≡ 1 (mod n)</p>
            <p><strong>Existence:</strong> An inverse exists if and only if gcd(a, n) = 1</p>
            <p><strong>Algorithm:</strong> Extended Euclidean Algorithm finds both gcd and coefficients</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
