'use client';

import { useState } from 'react';

export default function PerimeterCalculator() {
  const [side1, setSide1] = useState<string>('');
  const [side2, setSide2] = useState<string>('');
  const [side3, setSide3] = useState<string>('');
  const [side4, setSide4] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculatePerimeter = () => {
    const s1 = parseFloat(side1) || 0;
    const s2 = parseFloat(side2) || 0;
    const s3 = parseFloat(side3) || 0;
    const s4 = parseFloat(side4) || 0;

    // Calculate perimeter (sum of all sides)
    const perimeter = s1 + s2 + s3 + s4;
    setResult(perimeter);
  };

  const handleInputChange = (side: string, value: string) => {
    switch (side) {
      case 'side1':
        setSide1(value);
        break;
      case 'side2':
        setSide2(value);
        break;
      case 'side3':
        setSide3(value);
        break;
      case 'side4':
        setSide4(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h2>Perimeter Calculator</h2>
      <p>Enter the lengths of all four sides to calculate the perimeter:</p>
      
      <div>
        <label htmlFor="side1">Side 1:</label>
        <input
          id="side1"
          type="number"
          value={side1}
          onChange={(e) => handleInputChange('side1', e.target.value)}
          placeholder="Enter length"
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label htmlFor="side2">Side 2:</label>
        <input
          id="side2"
          type="number"
          value={side2}
          onChange={(e) => handleInputChange('side2', e.target.value)}
          placeholder="Enter length"
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label htmlFor="side3">Side 3:</label>
        <input
          id="side3"
          type="number"
          value={side3}
          onChange={(e) => handleInputChange('side3', e.target.value)}
          placeholder="Enter length"
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label htmlFor="side4">Side 4:</label>
        <input
          id="side4"
          type="number"
          value={side4}
          onChange={(e) => handleInputChange('side4', e.target.value)}
          placeholder="Enter length"
          min="0"
          step="0.01"
        />
      </div>

      <button onClick={calculatePerimeter}>
        Calculate Perimeter
      </button>

      {result !== null && (
        <h2>Result: {result} units</h2>
      )}
    </div>
  );
}
