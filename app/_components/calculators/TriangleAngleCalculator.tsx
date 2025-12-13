'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface TriangleAngleCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface TriangleAngleResult {
  angleA: number;
  angleB: number;
  angleC: number;
  method: string;
  steps: string[];
}

export default function TriangleAngleCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: TriangleAngleCalculatorProps) {
  const [sideA, setSideA] = useState<string>('');
  const [sideB, setSideB] = useState<string>('');
  const [sideC, setSideC] = useState<string>('');
  const [angleA, setAngleA] = useState<string>('');
  const [angleB, setAngleB] = useState<string>('');
  const [angleC, setAngleC] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [x1, setX1] = useState<string>('');
  const [y1, setY1] = useState<string>('');
  const [x2, setX2] = useState<string>('');
  const [y2, setY2] = useState<string>('');
  const [x3, setX3] = useState<string>('');
  const [y3, setY3] = useState<string>('');
  const [inputMethod, setInputMethod] = useState<'sides-angles' | 'coordinates' | 'area'>('sides-angles');
  const [result, setResult] = useState<TriangleAngleResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(6);
  };

  const formatAngle = (value: number): string => {
    if (isNaN(value) || value < 0 || value > 180) {
      return 'Invalid';
    }
    return value.toFixed(6);
  };

  const calculateTriangleAngles = () => {
    // Method 1: Coordinate-based calculation
    if (inputMethod === 'coordinates') {
      const x1Val = parseFloat(x1);
      const y1Val = parseFloat(y1);
      const x2Val = parseFloat(x2);
      const y2Val = parseFloat(y2);
      const x3Val = parseFloat(x3);
      const y3Val = parseFloat(y3);

      if (isNaN(x1Val) || isNaN(y1Val) || isNaN(x2Val) || isNaN(y2Val) || isNaN(x3Val) || isNaN(y3Val)) {
        alert('Please enter all six coordinate values (x1, y1, x2, y2, x3, y3)');
        return;
      }

      // Check if points are collinear
      const area = Math.abs((x2Val - x1Val) * (y3Val - y1Val) - (x3Val - x1Val) * (y2Val - y1Val)) / 2;
      if (area < 0.0001) {
        alert('Invalid triangle: The three points are collinear (lie on the same line)');
        return;
      }

      // Calculate side lengths from coordinates
      const a = Math.sqrt((x2Val - x3Val) ** 2 + (y2Val - y3Val) ** 2); // side opposite vertex A
      const b = Math.sqrt((x1Val - x3Val) ** 2 + (y1Val - y3Val) ** 2); // side opposite vertex B
      const c = Math.sqrt((x1Val - x2Val) ** 2 + (y1Val - y2Val) ** 2); // side opposite vertex C

      // Now use Law of Cosines with calculated sides
      let method = 'Coordinates → Law of Cosines';
      const steps: string[] = [];

      steps.push(`Given coordinates: A(${x1Val}, ${y1Val}), B(${x2Val}, ${y2Val}), C(${x3Val}, ${y3Val})`);
      steps.push(`Step 1: Calculate side lengths from coordinates:`);
      steps.push(`  Side a (BC) = √[(x₂-x₃)² + (y₂-y₃)²] = √[(${x2Val}-${x3Val})² + (${y2Val}-${y3Val})²] = ${formatValue(a)}`);
      steps.push(`  Side b (AC) = √[(x₁-x₃)² + (y₁-y₃)²] = √[(${x1Val}-${x3Val})² + (${y1Val}-${y3Val})²] = ${formatValue(b)}`);
      steps.push(`  Side c (AB) = √[(x₁-x₂)² + (y₁-y₂)²] = √[(${x1Val}-${x2Val})² + (${y1Val}-${y2Val})²] = ${formatValue(c)}`);

      // Use Law of Cosines
      const cosA = (b * b + c * c - a * a) / (2 * b * c);
      const finalAngleA = Math.acos(Math.max(-1, Math.min(1, cosA))) * (180 / Math.PI);
      steps.push(`Step 2: Find Angle A using Law of Cosines`);
      steps.push(`  cos(A) = (b² + c² - a²) / (2bc) = ${cosA.toFixed(6)}`);
      steps.push(`  Angle A = arccos(${cosA.toFixed(6)}) = ${formatAngle(finalAngleA)}°`);

      const cosB = (a * a + c * c - b * b) / (2 * a * c);
      const finalAngleB = Math.acos(Math.max(-1, Math.min(1, cosB))) * (180 / Math.PI);
      steps.push(`Step 3: Find Angle B using Law of Cosines`);
      steps.push(`  cos(B) = (a² + c² - b²) / (2ac) = ${cosB.toFixed(6)}`);
      steps.push(`  Angle B = arccos(${cosB.toFixed(6)}) = ${formatAngle(finalAngleB)}°`);

      const finalAngleC = 180 - finalAngleA - finalAngleB;
      steps.push(`Step 4: Find Angle C`);
      steps.push(`  Angle C = 180° - A - B = ${formatAngle(finalAngleC)}°`);

      setResult({
        angleA: finalAngleA,
        angleB: finalAngleB,
        angleC: finalAngleC,
        method,
        steps
      });
      return;
    }

    // Method 2: Area-based calculation
    if (inputMethod === 'area') {
      const a = parseFloat(sideA) || 0;
      const b = parseFloat(sideB) || 0;
      const c = parseFloat(sideC) || 0;
      const areaVal = parseFloat(area) || 0;

      let method = '';
      const steps: string[] = [];

      // Case: Two sides and area (find included angle)
      if (a > 0 && b > 0 && areaVal > 0 && c === 0) {
        // Area = (1/2) * a * b * sin(C), so sin(C) = 2*Area/(a*b)
        method = 'Area Formula (Two Sides + Area)';
        steps.push(`Given: Side a = ${a}, Side b = ${b}, Area = ${areaVal}`);
        steps.push(`Using area formula: Area = (1/2) × a × b × sin(C)`);
        steps.push(`sin(C) = 2 × Area / (a × b) = 2 × ${areaVal} / (${a} × ${b})`);
        const sinC = (2 * areaVal) / (a * b);
        steps.push(`sin(C) = ${sinC.toFixed(6)}`);

        if (sinC > 1) {
          alert('Invalid triangle: Area is too large for the given sides');
          return;
        }

        const angleC1 = Math.asin(sinC) * (180 / Math.PI);
        const angleC2 = 180 - angleC1;

        // Use the acute angle (or both if valid)
        let finalAngleC = angleC1;
        if (angleC1 + angleC2 < 180 && angleC2 > 0) {
          // Both solutions possible
          steps.push(`Note: Two possible solutions exist (ambiguous case)`);
          steps.push(`  Solution 1: Angle C = ${formatAngle(angleC1)}° (acute)`);
          steps.push(`  Solution 2: Angle C = ${formatAngle(angleC2)}° (obtuse)`);
          steps.push(`Using Solution 1 (acute angle):`);
        }

        finalAngleC = angleC1;

        // Find side c using Law of Cosines
        const cSquared = a * a + b * b - 2 * a * b * Math.cos((finalAngleC * Math.PI) / 180);
        const calculatedC = Math.sqrt(cSquared);
        steps.push(`Step 2: Find side c using Law of Cosines`);
        steps.push(`  c² = a² + b² - 2ab cos(C) = ${cSquared.toFixed(6)}`);
        steps.push(`  c = ${formatValue(calculatedC)}`);

        // Find remaining angles
        const cosA = (b * b + calculatedC * calculatedC - a * a) / (2 * b * calculatedC);
        const finalAngleA = Math.acos(Math.max(-1, Math.min(1, cosA))) * (180 / Math.PI);
        steps.push(`Step 3: Find Angle A using Law of Cosines`);
        steps.push(`  Angle A = ${formatAngle(finalAngleA)}°`);

        const finalAngleB = 180 - finalAngleA - finalAngleC;
        steps.push(`Step 4: Find Angle B`);
        steps.push(`  Angle B = 180° - A - C = ${formatAngle(finalAngleB)}°`);

        setResult({
          angleA: finalAngleA,
          angleB: finalAngleB,
          angleC: finalAngleC,
          method,
          steps
        });
        return;
      } else if (a > 0 && b > 0 && c > 0 && areaVal > 0) {
        // All three sides and area given - verify and calculate
        method = 'Area Formula (Three Sides + Area)';
        steps.push(`Given: Side a = ${a}, Side b = ${b}, Side c = ${c}, Area = ${areaVal}`);
        
        // Verify area using Heron's formula
        const s = (a + b + c) / 2;
        const heronArea = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        steps.push(`Step 1: Verify area using Heron's formula`);
        steps.push(`  s = (a + b + c) / 2 = ${s.toFixed(6)}`);
        steps.push(`  Heron's Area = √[s(s-a)(s-b)(s-c)] = ${formatValue(heronArea)}`);
        
        if (Math.abs(heronArea - areaVal) > 0.01) {
          alert(`Warning: Given area (${areaVal}) doesn't match calculated area (${heronArea.toFixed(6)}). Using given area for calculations.`);
        }

        // Use Law of Cosines
        const cosA = (b * b + c * c - a * a) / (2 * b * c);
        const finalAngleA = Math.acos(Math.max(-1, Math.min(1, cosA))) * (180 / Math.PI);
        steps.push(`Step 2: Find angles using Law of Cosines`);
        steps.push(`  Angle A = ${formatAngle(finalAngleA)}°`);

        const cosB = (a * a + c * c - b * b) / (2 * a * c);
        const finalAngleB = Math.acos(Math.max(-1, Math.min(1, cosB))) * (180 / Math.PI);
        steps.push(`  Angle B = ${formatAngle(finalAngleB)}°`);

        const finalAngleC = 180 - finalAngleA - finalAngleB;
        steps.push(`  Angle C = ${formatAngle(finalAngleC)}°`);

        setResult({
          angleA: finalAngleA,
          angleB: finalAngleB,
          angleC: finalAngleC,
          method,
          steps
        });
        return;
      } else {
        alert('For area method, please provide:\n- Two sides (a, b) and area, OR\n- All three sides (a, b, c) and area');
        return;
      }
    }

    // Method 3: Standard sides/angles method (existing code)
    const a = parseFloat(sideA) || 0;
    const b = parseFloat(sideB) || 0;
    const c = parseFloat(sideC) || 0;
    const angleAVal = parseFloat(angleA) || 0;
    const angleBVal = parseFloat(angleB) || 0;
    const angleCVal = parseFloat(angleC) || 0;

    let finalAngleA = angleAVal;
    let finalAngleB = angleBVal;
    let finalAngleC = angleCVal;
    let method = '';
    const steps: string[] = [];

    const sidesProvided = [a, b, c].filter(val => val > 0).length;
    const anglesProvided = [angleAVal, angleBVal, angleCVal].filter(val => val > 0).length;

    // Validate triangle inequality
    if (sidesProvided === 3) {
      if (a + b <= c || a + c <= b || b + c <= a) {
        alert('Invalid triangle: The sum of any two sides must be greater than the third side');
        return;
      }
    }

    // Case 1: SSS (Side-Side-Side) - Law of Cosines
    if (sidesProvided === 3 && anglesProvided === 0) {
      method = 'Law of Cosines (SSS)';
      steps.push(`Given: Side a = ${a}, Side b = ${b}, Side c = ${c}`);
      steps.push(`Using Law of Cosines to find all angles:`);
      
      // Angle A: cos(A) = (b² + c² - a²) / (2bc)
      const cosA = (b * b + c * c - a * a) / (2 * b * c);
      finalAngleA = Math.acos(Math.max(-1, Math.min(1, cosA))) * (180 / Math.PI);
      steps.push(`Angle A: cos(A) = (b² + c² - a²) / (2bc)`);
      steps.push(`cos(A) = (${b}² + ${c}² - ${a}²) / (2 × ${b} × ${c})`);
      steps.push(`cos(A) = (${(b * b + c * c - a * a).toFixed(6)}) / (${(2 * b * c).toFixed(6)}) = ${cosA.toFixed(6)}`);
      steps.push(`Angle A = arccos(${cosA.toFixed(6)}) = ${formatAngle(finalAngleA)}°`);

      // Angle B: cos(B) = (a² + c² - b²) / (2ac)
      const cosB = (a * a + c * c - b * b) / (2 * a * c);
      finalAngleB = Math.acos(Math.max(-1, Math.min(1, cosB))) * (180 / Math.PI);
      steps.push(`Angle B: cos(B) = (a² + c² - b²) / (2ac)`);
      steps.push(`cos(B) = (${a}² + ${c}² - ${b}²) / (2 × ${a} × ${c})`);
      steps.push(`cos(B) = (${(a * a + c * c - b * b).toFixed(6)}) / (${(2 * a * c).toFixed(6)}) = ${cosB.toFixed(6)}`);
      steps.push(`Angle B = arccos(${cosB.toFixed(6)}) = ${formatAngle(finalAngleB)}°`);

      // Angle C: 180° - A - B
      finalAngleC = 180 - finalAngleA - finalAngleB;
      steps.push(`Angle C: 180° - A - B = 180° - ${formatAngle(finalAngleA)}° - ${formatAngle(finalAngleB)}° = ${formatAngle(finalAngleC)}°`);
    }
    // Case 2: SAS (Side-Angle-Side) - Law of Cosines
    else if (sidesProvided === 2 && anglesProvided === 1) {
      method = 'Law of Cosines (SAS)';
      
      if (a > 0 && b > 0 && angleCVal > 0) {
        // Given: sides a, b and angle C
        steps.push(`Given: Side a = ${a}, Side b = ${b}, Angle C = ${angleCVal}°`);
        finalAngleC = angleCVal;
        
        // Find side c using Law of Cosines
        const cSquared = a * a + b * b - 2 * a * b * Math.cos((angleCVal * Math.PI) / 180);
        const calculatedC = Math.sqrt(cSquared);
        steps.push(`Step 1: Find side c using Law of Cosines`);
        steps.push(`c² = a² + b² - 2ab cos(C)`);
        steps.push(`c² = ${a}² + ${b}² - 2 × ${a} × ${b} × cos(${angleCVal}°)`);
        steps.push(`c² = ${(a * a + b * b).toFixed(6)} - ${(2 * a * b * Math.cos((angleCVal * Math.PI) / 180)).toFixed(6)} = ${cSquared.toFixed(6)}`);
        steps.push(`c = √${cSquared.toFixed(6)} = ${calculatedC.toFixed(6)}`);
        
        // Now use Law of Cosines for other angles
        const cosA = (b * b + calculatedC * calculatedC - a * a) / (2 * b * calculatedC);
        finalAngleA = Math.acos(Math.max(-1, Math.min(1, cosA))) * (180 / Math.PI);
        steps.push(`Step 2: Find Angle A using Law of Cosines`);
        steps.push(`cos(A) = (b² + c² - a²) / (2bc) = ${cosA.toFixed(6)}`);
        steps.push(`Angle A = arccos(${cosA.toFixed(6)}) = ${formatAngle(finalAngleA)}°`);
        
        finalAngleB = 180 - finalAngleA - finalAngleC;
        steps.push(`Step 3: Angle B = 180° - A - C = 180° - ${formatAngle(finalAngleA)}° - ${formatAngle(finalAngleC)}° = ${formatAngle(finalAngleB)}°`);
      } else if (a > 0 && c > 0 && angleBVal > 0) {
        // Given: sides a, c and angle B
        steps.push(`Given: Side a = ${a}, Side c = ${c}, Angle B = ${angleBVal}°`);
        finalAngleB = angleBVal;
        
        const bSquared = a * a + c * c - 2 * a * c * Math.cos((angleBVal * Math.PI) / 180);
        const calculatedB = Math.sqrt(bSquared);
        steps.push(`Step 1: Find side b using Law of Cosines`);
        steps.push(`b² = a² + c² - 2ac cos(B) = ${bSquared.toFixed(6)}`);
        steps.push(`b = √${bSquared.toFixed(6)} = ${calculatedB.toFixed(6)}`);
        
        const cosA = (calculatedB * calculatedB + c * c - a * a) / (2 * calculatedB * c);
        finalAngleA = Math.acos(Math.max(-1, Math.min(1, cosA))) * (180 / Math.PI);
        steps.push(`Step 2: Find Angle A using Law of Cosines`);
        steps.push(`Angle A = arccos(${cosA.toFixed(6)}) = ${formatAngle(finalAngleA)}°`);
        
        finalAngleC = 180 - finalAngleA - finalAngleB;
        steps.push(`Step 3: Angle C = 180° - A - B = ${formatAngle(finalAngleC)}°`);
      } else if (b > 0 && c > 0 && angleAVal > 0) {
        // Given: sides b, c and angle A
        steps.push(`Given: Side b = ${b}, Side c = ${c}, Angle A = ${angleAVal}°`);
        finalAngleA = angleAVal;
        
        const aSquared = b * b + c * c - 2 * b * c * Math.cos((angleAVal * Math.PI) / 180);
        const calculatedA = Math.sqrt(aSquared);
        steps.push(`Step 1: Find side a using Law of Cosines`);
        steps.push(`a² = b² + c² - 2bc cos(A) = ${aSquared.toFixed(6)}`);
        steps.push(`a = √${aSquared.toFixed(6)} = ${calculatedA.toFixed(6)}`);
        
        const cosB = (calculatedA * calculatedA + c * c - b * b) / (2 * calculatedA * c);
        finalAngleB = Math.acos(Math.max(-1, Math.min(1, cosB))) * (180 / Math.PI);
        steps.push(`Step 2: Find Angle B using Law of Cosines`);
        steps.push(`Angle B = arccos(${cosB.toFixed(6)}) = ${formatAngle(finalAngleB)}°`);
        
        finalAngleC = 180 - finalAngleA - finalAngleB;
        steps.push(`Step 3: Angle C = 180° - A - B = ${formatAngle(finalAngleC)}°`);
      } else {
        alert('Please provide two sides and the included angle (SAS)');
        return;
      }
    }
    // Case 3: ASA/AAS (Angle-Side-Angle / Angle-Angle-Side) - Law of Sines
    else if (anglesProvided >= 2 && sidesProvided >= 1) {
      method = 'Law of Sines (ASA/AAS)';
      
      // Calculate the third angle first
      if (angleAVal > 0 && angleBVal > 0) {
        finalAngleA = angleAVal;
        finalAngleB = angleBVal;
        finalAngleC = 180 - angleAVal - angleBVal;
        steps.push(`Given: Angle A = ${angleAVal}°, Angle B = ${angleBVal}°`);
        steps.push(`Step 1: Find Angle C = 180° - A - B = 180° - ${angleAVal}° - ${angleBVal}° = ${formatAngle(finalAngleC)}°`);
      } else if (angleAVal > 0 && angleCVal > 0) {
        finalAngleA = angleAVal;
        finalAngleC = angleCVal;
        finalAngleB = 180 - angleAVal - angleCVal;
        steps.push(`Given: Angle A = ${angleAVal}°, Angle C = ${angleCVal}°`);
        steps.push(`Step 1: Find Angle B = 180° - A - C = ${formatAngle(finalAngleB)}°`);
      } else if (angleBVal > 0 && angleCVal > 0) {
        finalAngleB = angleBVal;
        finalAngleC = angleCVal;
        finalAngleA = 180 - angleBVal - angleCVal;
        steps.push(`Given: Angle B = ${angleBVal}°, Angle C = ${angleCVal}°`);
        steps.push(`Step 1: Find Angle A = 180° - B - C = ${formatAngle(finalAngleA)}°`);
      }

      if (finalAngleA <= 0 || finalAngleB <= 0 || finalAngleC <= 0) {
        alert('Invalid triangle: Sum of angles must equal 180°');
        return;
      }

      // Use Law of Sines to find missing sides and verify
      if (a > 0) {
        steps.push(`Given: Side a = ${a}`);
        steps.push(`Using Law of Sines: a/sin(A) = b/sin(B) = c/sin(C)`);
        const ratio = a / Math.sin((finalAngleA * Math.PI) / 180);
        steps.push(`a/sin(A) = ${a} / sin(${formatAngle(finalAngleA)}°) = ${ratio.toFixed(6)}`);
        if (b === 0) {
          const calculatedB = ratio * Math.sin((finalAngleB * Math.PI) / 180);
          steps.push(`b = ratio × sin(B) = ${calculatedB.toFixed(6)}`);
        }
        if (c === 0) {
          const calculatedC = ratio * Math.sin((finalAngleC * Math.PI) / 180);
          steps.push(`c = ratio × sin(C) = ${calculatedC.toFixed(6)}`);
        }
      } else if (b > 0) {
        steps.push(`Given: Side b = ${b}`);
        const ratio = b / Math.sin((finalAngleB * Math.PI) / 180);
        steps.push(`b/sin(B) = ${ratio.toFixed(6)}`);
      } else if (c > 0) {
        steps.push(`Given: Side c = ${c}`);
        const ratio = c / Math.sin((finalAngleC * Math.PI) / 180);
        steps.push(`c/sin(C) = ${ratio.toFixed(6)}`);
      }
    }
    // Case 4: SSA (Side-Side-Angle) - Law of Sines (ambiguous case)
    // This case handles when we have 2 sides and 1 angle, but the angle is NOT between the sides
    else if (sidesProvided === 2 && anglesProvided === 1) {
      method = 'Law of Sines (SSA - Ambiguous Case)';
      
      // SSA cases: angle is opposite one of the given sides (not between them)
      if (a > 0 && b > 0 && angleAVal > 0) {
        // Side a, side b, angle A (opposite side a)
        steps.push(`Given: Side a = ${a}, Side b = ${b}, Angle A = ${angleAVal}°`);
        finalAngleA = angleAVal;
        
        // Using Law of Sines: a/sin(A) = b/sin(B)
        const sinB = (b * Math.sin((angleAVal * Math.PI) / 180)) / a;
        steps.push(`Using Law of Sines: a/sin(A) = b/sin(B)`);
        steps.push(`sin(B) = (b × sin(A)) / a = (${b} × sin(${angleAVal}°)) / ${a}`);
        steps.push(`sin(B) = ${sinB.toFixed(6)}`);
        
        if (sinB > 1) {
          alert('Invalid triangle: No solution exists (sin(B) > 1)');
          return;
        }
        
        // Two possible solutions for SSA
        const angleB1 = Math.asin(sinB) * (180 / Math.PI);
        
        // Check which solution is valid
        if (angleB1 + angleAVal < 180) {
          finalAngleB = angleB1;
          finalAngleC = 180 - finalAngleA - finalAngleB;
          steps.push(`Angle B = arcsin(${sinB.toFixed(6)}) = ${formatAngle(finalAngleB)}°`);
          steps.push(`Angle C = 180° - A - B = ${formatAngle(finalAngleC)}°`);
        } else {
          alert('Invalid triangle: Angles exceed 180°');
          return;
        }
      } else if (a > 0 && b > 0 && angleBVal > 0) {
        // Side a, side b, angle B (opposite side b)
        steps.push(`Given: Side a = ${a}, Side b = ${b}, Angle B = ${angleBVal}°`);
        finalAngleB = angleBVal;
        
        const sinA = (a * Math.sin((angleBVal * Math.PI) / 180)) / b;
        steps.push(`Using Law of Sines: a/sin(A) = b/sin(B)`);
        steps.push(`sin(A) = (a × sin(B)) / b = ${sinA.toFixed(6)}`);
        
        if (sinA > 1) {
          alert('Invalid triangle: No solution exists');
          return;
        }
        
        const angleA1 = Math.asin(sinA) * (180 / Math.PI);
        if (angleA1 + angleBVal < 180) {
          finalAngleA = angleA1;
          finalAngleC = 180 - finalAngleA - finalAngleB;
          steps.push(`Angle A = ${formatAngle(finalAngleA)}°`);
          steps.push(`Angle C = ${formatAngle(finalAngleC)}°`);
        } else {
          alert('Invalid triangle: Angles exceed 180°');
          return;
        }
      } else if (a > 0 && c > 0 && angleAVal > 0) {
        // Side a, side c, angle A (opposite side a)
        steps.push(`Given: Side a = ${a}, Side c = ${c}, Angle A = ${angleAVal}°`);
        finalAngleA = angleAVal;
        
        const sinC = (c * Math.sin((angleAVal * Math.PI) / 180)) / a;
        steps.push(`Using Law of Sines: a/sin(A) = c/sin(C)`);
        steps.push(`sin(C) = (c × sin(A)) / a = ${sinC.toFixed(6)}`);
        
        if (sinC > 1) {
          alert('Invalid triangle: No solution exists');
          return;
        }
        
        const angleC1 = Math.asin(sinC) * (180 / Math.PI);
        if (angleC1 + angleAVal < 180) {
          finalAngleC = angleC1;
          finalAngleB = 180 - finalAngleA - finalAngleC;
          steps.push(`Angle C = ${formatAngle(finalAngleC)}°`);
          steps.push(`Angle B = ${formatAngle(finalAngleB)}°`);
        } else {
          alert('Invalid triangle: Angles exceed 180°');
          return;
        }
      } else if (a > 0 && c > 0 && angleCVal > 0) {
        // Side a, side c, angle C (opposite side c)
        steps.push(`Given: Side a = ${a}, Side c = ${c}, Angle C = ${angleCVal}°`);
        finalAngleC = angleCVal;
        
        const sinA = (a * Math.sin((angleCVal * Math.PI) / 180)) / c;
        steps.push(`Using Law of Sines: a/sin(A) = c/sin(C)`);
        steps.push(`sin(A) = (a × sin(C)) / c = ${sinA.toFixed(6)}`);
        
        if (sinA > 1) {
          alert('Invalid triangle: No solution exists');
          return;
        }
        
        const angleA1 = Math.asin(sinA) * (180 / Math.PI);
        if (angleA1 + angleCVal < 180) {
          finalAngleA = angleA1;
          finalAngleB = 180 - finalAngleA - finalAngleC;
          steps.push(`Angle A = ${formatAngle(finalAngleA)}°`);
          steps.push(`Angle B = ${formatAngle(finalAngleB)}°`);
        } else {
          alert('Invalid triangle: Angles exceed 180°');
          return;
        }
      } else if (b > 0 && c > 0 && angleBVal > 0) {
        // Side b, side c, angle B (opposite side b)
        steps.push(`Given: Side b = ${b}, Side c = ${c}, Angle B = ${angleBVal}°`);
        finalAngleB = angleBVal;
        
        const sinC = (c * Math.sin((angleBVal * Math.PI) / 180)) / b;
        steps.push(`Using Law of Sines: b/sin(B) = c/sin(C)`);
        steps.push(`sin(C) = (c × sin(B)) / b = ${sinC.toFixed(6)}`);
        
        if (sinC > 1) {
          alert('Invalid triangle: No solution exists');
          return;
        }
        
        const angleC1 = Math.asin(sinC) * (180 / Math.PI);
        if (angleC1 + angleBVal < 180) {
          finalAngleC = angleC1;
          finalAngleA = 180 - finalAngleB - finalAngleC;
          steps.push(`Angle C = ${formatAngle(finalAngleC)}°`);
          steps.push(`Angle A = ${formatAngle(finalAngleA)}°`);
        } else {
          alert('Invalid triangle: Angles exceed 180°');
          return;
        }
      } else if (b > 0 && c > 0 && angleCVal > 0) {
        // Side b, side c, angle C (opposite side c)
        steps.push(`Given: Side b = ${b}, Side c = ${c}, Angle C = ${angleCVal}°`);
        finalAngleC = angleCVal;
        
        const sinB = (b * Math.sin((angleCVal * Math.PI) / 180)) / c;
        steps.push(`Using Law of Sines: b/sin(B) = c/sin(C)`);
        steps.push(`sin(B) = (b × sin(C)) / c = ${sinB.toFixed(6)}`);
        
        if (sinB > 1) {
          alert('Invalid triangle: No solution exists');
          return;
        }
        
        const angleB1 = Math.asin(sinB) * (180 / Math.PI);
        if (angleB1 + angleCVal < 180) {
          finalAngleB = angleB1;
          finalAngleA = 180 - finalAngleB - finalAngleC;
          steps.push(`Angle B = ${formatAngle(finalAngleB)}°`);
          steps.push(`Angle A = ${formatAngle(finalAngleA)}°`);
        } else {
          alert('Invalid triangle: Angles exceed 180°');
          return;
        }
      } else {
        alert('Please provide two sides and a non-included angle (SSA)');
        return;
      }
    }
    else {
      alert('Please provide either:\n- Three sides (SSS)\n- Two sides and included angle (SAS)\n- Two sides and non-included angle (SSA)\n- Two angles and one side (ASA/AAS)');
      return;
    }

    // Validate final angles sum to 180°
    const sum = finalAngleA + finalAngleB + finalAngleC;
    if (Math.abs(sum - 180) > 0.01) {
      alert(`Warning: Angles sum to ${sum.toFixed(2)}° instead of 180°. Please check your inputs.`);
    }

    setResult({
      angleA: finalAngleA,
      angleB: finalAngleB,
      angleC: finalAngleC,
      method,
      steps
    });
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'sideA':
        setSideA(value);
        break;
      case 'sideB':
        setSideB(value);
        break;
      case 'sideC':
        setSideC(value);
        break;
      case 'angleA':
        setAngleA(value);
        break;
      case 'angleB':
        setAngleB(value);
        break;
      case 'angleC':
        setAngleC(value);
        break;
      case 'area':
        setArea(value);
        break;
      case 'x1':
        setX1(value);
        break;
      case 'y1':
        setY1(value);
        break;
      case 'x2':
        setX2(value);
        break;
      case 'y2':
        setY2(value);
        break;
      case 'x3':
        setX3(value);
        break;
      case 'y3':
        setY3(value);
        break;
    }
    if (result !== null) {
      setResult(null);
    }
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

  const clearAll = () => {
    setSideA('');
    setSideB('');
    setSideC('');
    setAngleA('');
    setAngleB('');
    setAngleC('');
    setArea('');
    setX1('');
    setY1('');
    setX2('');
    setY2('');
    setX3('');
    setY3('');
    setResult(null);
  };

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
      <Card className="max-w-md mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Triangle Angle Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate all angles of a triangle using Law of Cosines or Law of Sines with step-by-step solutions.</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Input Method Selector */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Input Method</h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setInputMethod('sides-angles')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  inputMethod === 'sides-angles'
                    ? 'bg-[#820ECC] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                Sides/Angles
              </button>
              <button
                onClick={() => setInputMethod('coordinates')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  inputMethod === 'coordinates'
                    ? 'bg-[#820ECC] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                Coordinates
              </button>
              <button
                onClick={() => setInputMethod('area')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  inputMethod === 'area'
                    ? 'bg-[#820ECC] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                Area
              </button>
            </div>
          </div>

          {/* Coordinate Input */}
          {inputMethod === 'coordinates' && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Triangle Vertices (Coordinates)</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Vertex A: x"
                    type="text"
                    value={x1}
                    onChange={(e) => handleInputChange('x1', e.target.value)}
                    placeholder="x₁"
                    autoFocus
                  />
                  <Input
                    label="y"
                    type="text"
                    value={y1}
                    onChange={(e) => handleInputChange('y1', e.target.value)}
                    placeholder="y₁"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Vertex B: x"
                    type="text"
                    value={x2}
                    onChange={(e) => handleInputChange('x2', e.target.value)}
                    placeholder="x₂"
                  />
                  <Input
                    label="y"
                    type="text"
                    value={y2}
                    onChange={(e) => handleInputChange('y2', e.target.value)}
                    placeholder="y₂"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Vertex C: x"
                    type="text"
                    value={x3}
                    onChange={(e) => handleInputChange('x3', e.target.value)}
                    placeholder="x₃"
                  />
                  <Input
                    label="y"
                    type="text"
                    value={y3}
                    onChange={(e) => handleInputChange('y3', e.target.value)}
                    placeholder="y₃"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Enter coordinates of three vertices</p>
            </div>
          )}

          {/* Area Input */}
          {inputMethod === 'area' && (
            <>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Triangle Sides</h3>
                <div className="grid grid-cols-3 gap-3">
                  <Input
                    label="Side a"
                    type="text"
                    value={sideA}
                    onChange={(e) => handleInputChange('sideA', e.target.value)}
                    placeholder="Enter side a"
                    autoFocus
                  />
                  <Input
                    label="Side b"
                    type="text"
                    value={sideB}
                    onChange={(e) => handleInputChange('sideB', e.target.value)}
                    placeholder="Enter side b"
                  />
                  <Input
                    label="Side c (optional)"
                    type="text"
                    value={sideC}
                    onChange={(e) => handleInputChange('sideC', e.target.value)}
                    placeholder="Enter side c"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Enter two sides (a, b) or all three sides</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Triangle Area</h3>
                <Input
                  label="Area"
                  type="text"
                  value={area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  placeholder="Enter area"
                />
                <p className="text-xs text-gray-500 mt-2">Enter the triangle area</p>
              </div>
            </>
          )}

          {/* Standard Sides/Angles Input */}
          {inputMethod === 'sides-angles' && (
            <>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Triangle Sides</h3>
                <div className="grid grid-cols-3 gap-3">
                  <Input
                    label="Side a"
                    type="text"
                    value={sideA}
                    onChange={(e) => handleInputChange('sideA', e.target.value)}
                    placeholder="Enter side a"
                    autoFocus
                  />
                  <Input
                    label="Side b"
                    type="text"
                    value={sideB}
                    onChange={(e) => handleInputChange('sideB', e.target.value)}
                    placeholder="Enter side b"
                  />
                  <Input
                    label="Side c"
                    type="text"
                    value={sideC}
                    onChange={(e) => handleInputChange('sideC', e.target.value)}
                    placeholder="Enter side c"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Enter known side lengths</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Triangle Angles</h3>
                <div className="grid grid-cols-3 gap-3">
                  <Input
                    label="Angle A (°)"
                    type="text"
                    value={angleA}
                    onChange={(e) => handleInputChange('angleA', e.target.value)}
                    placeholder="Enter angle A"
                  />
                  <Input
                    label="Angle B (°)"
                    type="text"
                    value={angleB}
                    onChange={(e) => handleInputChange('angleB', e.target.value)}
                    placeholder="Enter angle B"
                  />
                  <Input
                    label="Angle C (°)"
                    type="text"
                    value={angleC}
                    onChange={(e) => handleInputChange('angleC', e.target.value)}
                    placeholder="Enter angle C"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Enter known angles in degrees</p>
              </div>
            </>
          )}

          <div className="flex gap-3">
            <Button 
              onClick={calculateTriangleAngles}
              className={`flex-1 ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
              style={colors.customStyles?.button}
              size="lg"
            >
              Calculate Angles
            </Button>
            <Button 
              onClick={clearAll}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              Clear
            </Button>
          </div>

          {result !== null && (
            <div 
              className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md animate-fadeIn`}
              style={colors.customStyles?.resultBg}
            >
              <h3 
                className={`text-lg font-semibold ${colors.resultText} mb-3`}
                style={colors.customStyles?.resultText}
              >
                Triangle Angles Result
              </h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Method: {result.method}</p>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Angle A</p>
                    <p 
                      className={`text-2xl font-bold ${colors.result}`}
                      style={colors.customStyles?.result}
                    >
                      {formatAngle(result.angleA)}°
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Angle B</p>
                    <p 
                      className={`text-2xl font-bold ${colors.result}`}
                      style={colors.customStyles?.result}
                    >
                      {formatAngle(result.angleB)}°
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Angle C</p>
                    <p 
                      className={`text-2xl font-bold ${colors.result}`}
                      style={colors.customStyles?.result}
                    >
                      {formatAngle(result.angleC)}°
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-gray-300 text-center">
                  <p className="text-sm text-gray-600">
                    Sum: {formatAngle(result.angleA + result.angleB + result.angleC)}° (should be 180°)
                  </p>
                </div>
              </div>
              
              {result.steps.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Step-by-Step Calculation:</h4>
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {result.steps.map((step, index) => (
                      <p key={index} className="text-sm text-gray-600 font-mono">
                        {step}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Formula Reference */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Formulas Used:</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <div>
                <p className="font-mono text-center text-base font-bold mb-1">Law of Cosines:</p>
                <p className="text-center">a² = b² + c² - 2bc cos(A)</p>
                <p className="text-center">cos(A) = (b² + c² - a²) / (2bc)</p>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-300">
                <p className="font-mono text-center text-base font-bold mb-1">Law of Sines:</p>
                <p className="text-center">a/sin(A) = b/sin(B) = c/sin(C)</p>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-300">
                <p className="text-center text-xs">
                  <strong>Note:</strong> Sum of angles = 180°
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

