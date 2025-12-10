'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface Congruence {
  remainder: string;
  modulus: string;
}

interface ChineseRemainderTheoremCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function ChineseRemainderTheoremCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: ChineseRemainderTheoremCalculatorProps) {
  const [congruences, setCongruences] = useState<Congruence[]>([
    { remainder: '', modulus: '' },
    { remainder: '', modulus: '' }
  ]);
  const [result, setResult] = useState<number | null>(null);
  const [modulo, setModulo] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [steps, setSteps] = useState<string[]>([]);

  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return Math.abs(a);
  };

  const extendedGCD = (a: number, b: number): { gcd: number; x: number; y: number } => {
    if (b === 0) {
      return { gcd: a, x: 1, y: 0 };
    }
    const result = extendedGCD(b, a % b);
    return {
      gcd: result.gcd,
      x: result.y,
      y: result.x - Math.floor(a / b) * result.y
    };
  };

  const modInverse = (a: number, m: number): number | null => {
    const result = extendedGCD(a, m);
    if (result.gcd !== 1) {
      return null;
    }
    return ((result.x % m) + m) % m;
  };

  const calculateCRT = () => {
    setError('');
    setResult(null);
    setModulo(null);
    setSteps([]);

    // Parse and validate inputs
    const parsed: Array<{ a: number; m: number }> = [];
    const stepList: string[] = [];

    for (let i = 0; i < congruences.length; i++) {
      const rem = parseInt(congruences[i].remainder.trim());
      const mod = parseInt(congruences[i].modulus.trim());

      if (isNaN(rem) || isNaN(mod)) {
        setError(`Please enter valid integers for congruence ${i + 1}`);
        return;
      }

      if (mod <= 0) {
        setError(`Modulus ${i + 1} must be positive`);
        return;
      }

      // Normalize remainder to be in range [0, m-1]
      const normalizedRem = ((rem % mod) + mod) % mod;
      parsed.push({ a: normalizedRem, m: mod });
      
      if (normalizedRem !== rem) {
        stepList.push(`Congruence ${i + 1}: x ≡ ${rem} (mod ${mod}) normalized to x ≡ ${normalizedRem} (mod ${mod})`);
      } else {
        stepList.push(`Congruence ${i + 1}: x ≡ ${normalizedRem} (mod ${mod})`);
      }
    }

    if (parsed.length < 2) {
      setError('Please enter at least 2 congruences');
      return;
    }

    // Check pairwise coprimality
    stepList.push('\nChecking pairwise coprimality of moduli:');
    for (let i = 0; i < parsed.length; i++) {
      for (let j = i + 1; j < parsed.length; j++) {
        const g = gcd(parsed[i].m, parsed[j].m);
        stepList.push(`gcd(${parsed[i].m}, ${parsed[j].m}) = ${g}`);
        if (g !== 1) {
          setError(`Moduli ${parsed[i].m} and ${parsed[j].m} are not coprime (gcd = ${g}). The Chinese Remainder Theorem requires all moduli to be pairwise coprime.`);
          return;
        }
      }
    }
    stepList.push('All moduli are pairwise coprime ✓\n');

    // Calculate product of all moduli
    const M = parsed.reduce((acc, c) => acc * c.m, 1);
    stepList.push(`Step 1: Calculate M = product of all moduli = ${parsed.map(c => c.m).join(' × ')} = ${M}`);

    // Calculate solution using CRT
    let solution = 0;
    stepList.push('\nStep 2: For each congruence, calculate:');
    
    for (let i = 0; i < parsed.length; i++) {
      const Mi = M / parsed[i].m;
      stepList.push(`\nFor congruence ${i + 1} (x ≡ ${parsed[i].a} mod ${parsed[i].m}):`);
      stepList.push(`  M${i + 1} = M / m${i + 1} = ${M} / ${parsed[i].m} = ${Mi}`);
      
      const yi = modInverse(Mi, parsed[i].m);
      if (yi === null) {
        setError(`Cannot find modular inverse of ${Mi} modulo ${parsed[i].m}`);
        return;
      }
      
      stepList.push(`  y${i + 1} = M${i + 1}⁻¹ mod m${i + 1} = ${Mi}⁻¹ mod ${parsed[i].m} = ${yi}`);
      stepList.push(`  Contribution: a${i + 1} × M${i + 1} × y${i + 1} = ${parsed[i].a} × ${Mi} × ${yi} = ${parsed[i].a * Mi * yi}`);
      
      solution += parsed[i].a * Mi * yi;
    }

    // Normalize solution modulo M
    solution = ((solution % M) + M) % M;
    stepList.push(`\nStep 3: Sum all contributions = ${solution % M === solution ? solution : `${solution} mod ${M}`}`);
    stepList.push(`Step 4: Normalize: x = ${solution} mod ${M} = ${solution}`);

    setResult(solution);
    setModulo(M);
    setSteps(stepList);
  };

  const addCongruence = () => {
    setCongruences([...congruences, { remainder: '', modulus: '' }]);
  };

  const removeCongruence = (index: number) => {
    if (congruences.length > 2) {
      setCongruences(congruences.filter((_, i) => i !== index));
    }
  };

  const updateCongruence = (index: number, field: 'remainder' | 'modulus', value: string) => {
    const updated = [...congruences];
    updated[index][field] = value;
    setCongruences(updated);
  };

  const clearAll = () => {
    setCongruences([
      { remainder: '', modulus: '' },
      { remainder: '', modulus: '' }
    ]);
    setResult(null);
    setModulo(null);
    setError('');
    setSteps([]);
  };

  const getColorClasses = (color: string) => {
    const hexColor = color.startsWith('#') ? color : `#${color}`;
    
    return {
      button: '',
      result: '',
      resultBg: '',
      resultBorder: '',
      resultText: '',
      customStyles: {
        button: {
          backgroundColor: hexColor,
          '--hover-color': hexColor,
          '--focus-color': hexColor
        } as React.CSSProperties,
        result: {
          color: hexColor
        } as React.CSSProperties,
        resultBg: {
          backgroundColor: `${hexColor}10`,
          borderColor: `${hexColor}30`
        } as React.CSSProperties,
        resultText: {
          color: hexColor
        } as React.CSSProperties
      }
    };
  };

  const colors = getColorClasses(primaryColor);

  return (
    <>
      {colors.customStyles && (
        <style dangerouslySetInnerHTML={{
          __html: `
            .custom-color-button:hover {
              background-color: ${primaryColor}dd !important;
            }
            .custom-color-button:focus {
              box-shadow: 0 0 0 3px ${primaryColor}40 !important;
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out;
            }
          `
        }} />
      )}
      <Card className="max-w-2xl mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Chinese Remainder Theorem Calculator</h2>
            <p className="text-gray-600 mb-6">Solve systems of simultaneous congruences using the Chinese Remainder Theorem:</p>
          </>
        )}
      
      <div className="space-y-4">
        {congruences.map((congruence, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Congruence {index + 1}</h3>
              {congruences.length > 2 && (
                <button
                  onClick={() => removeCongruence(index)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  x ≡ ? (mod m)
                </label>
                <Input
                  type="text"
                  value={congruence.remainder}
                  onChange={(e) => updateCongruence(index, 'remainder', e.target.value)}
                  placeholder="Remainder"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  mod ?
                </label>
                <Input
                  type="text"
                  value={congruence.modulus}
                  onChange={(e) => updateCongruence(index, 'modulus', e.target.value)}
                  placeholder="Modulus"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex gap-3">
          <Button 
            onClick={addCongruence}
            variant="outline"
            className="flex-1"
          >
            Add Congruence
          </Button>
          <Button 
            onClick={calculateCRT}
            className={`flex-1 ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate Solution
          </Button>
          <Button 
            onClick={clearAll}
            variant="outline"
            className="flex-1"
          >
            Clear All
          </Button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {result !== null && !error && (
          <div 
            className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md animate-fadeIn`}
            style={colors.customStyles?.resultBg}
          >
            <h3 
              className={`text-lg font-semibold ${colors.resultText} mb-3`}
              style={colors.customStyles?.resultText}
            >
              Solution
            </h3>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">x ≡</span>{' '}
                <span 
                  className={`text-2xl font-bold ${colors.result}`}
                  style={colors.customStyles?.result}
                >
                  {result}
                </span>
                {' '}
                <span className="font-medium">(mod {modulo})</span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                The solution is unique modulo {modulo}. All solutions are of the form: x = {result} + {modulo}k, where k is any integer.
              </p>
            </div>
          </div>
        )}

        {steps.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Step-by-Step Solution</h3>
            <div className="text-sm text-gray-700 font-mono whitespace-pre-line max-h-96 overflow-y-auto bg-white p-4 rounded border">
              {steps.join('\n')}
            </div>
          </div>
        )}
      </div>
      </Card>
    </>
  );
}

