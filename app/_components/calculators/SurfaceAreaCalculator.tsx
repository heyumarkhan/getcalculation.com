'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface SurfaceAreaCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

type ShapeType = 'cube' | 'rectangular-prism' | 'cylinder' | 'sphere' | 'cone' | 'triangular-prism';

interface SurfaceAreaResult {
  surfaceArea: number;
  shape: string;
  formula: string;
  calculation: string;
  steps: string[];
}

export default function SurfaceAreaCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: SurfaceAreaCalculatorProps) {
  const [selectedShape, setSelectedShape] = useState<ShapeType>('cube');
  
  // Common inputs
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  
  // Cylinder inputs
  const [radius, setRadius] = useState<string>('');
  const [cylinderHeight, setCylinderHeight] = useState<string>('');
  
  // Sphere input
  const [sphereRadius, setSphereRadius] = useState<string>('');
  
  // Cone inputs
  const [coneRadius, setConeRadius] = useState<string>('');
  const [coneHeight, setConeHeight] = useState<string>('');
  const [slantHeight, setSlantHeight] = useState<string>('');
  
  // Triangular Prism inputs
  const [baseLength, setBaseLength] = useState<string>('');
  const [baseHeight, setBaseHeight] = useState<string>('');
  const [prismHeight, setPrismHeight] = useState<string>('');
  const [sideA, setSideA] = useState<string>('');
  const [sideB, setSideB] = useState<string>('');
  const [sideC, setSideC] = useState<string>('');
  
  const [result, setResult] = useState<SurfaceAreaResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const calculateSurfaceArea = () => {
    let surfaceArea = 0;
    let formula = '';
    let calculation = '';
    const steps: string[] = [];
    let shapeName = '';

    switch (selectedShape) {
      case 'cube': {
        const side = parseFloat(length) || 0;
        if (side <= 0) {
          alert('Side length must be greater than zero');
          return;
        }
        surfaceArea = 6 * side * side;
        formula = 'SA = 6 × s²';
        calculation = `6 × ${side}² = 6 × ${(side * side).toFixed(4)} = ${surfaceArea.toFixed(4)}`;
        shapeName = 'Cube';
        steps.push(`Given: Side length (s) = ${side}`);
        steps.push(`Formula: SA = 6 × s²`);
        steps.push(`SA = 6 × ${side}²`);
        steps.push(`SA = 6 × ${(side * side).toFixed(4)}`);
        steps.push(`SA = ${surfaceArea.toFixed(4)} square units`);
        break;
      }
      
      case 'rectangular-prism': {
        const l = parseFloat(length) || 0;
        const w = parseFloat(width) || 0;
        const h = parseFloat(height) || 0;
        if (l <= 0 || w <= 0 || h <= 0) {
          alert('All dimensions must be greater than zero');
          return;
        }
        surfaceArea = 2 * (l * w + l * h + w * h);
        formula = 'SA = 2(lw + lh + wh)';
        calculation = `2(${l}×${w} + ${l}×${h} + ${w}×${h}) = 2(${(l*w).toFixed(4)} + ${(l*h).toFixed(4)} + ${(w*h).toFixed(4)}) = ${surfaceArea.toFixed(4)}`;
        shapeName = 'Rectangular Prism';
        steps.push(`Given: Length (l) = ${l}, Width (w) = ${w}, Height (h) = ${h}`);
        steps.push(`Formula: SA = 2(lw + lh + wh)`);
        steps.push(`SA = 2(${l}×${w} + ${l}×${h} + ${w}×${h})`);
        steps.push(`SA = 2(${(l*w).toFixed(4)} + ${(l*h).toFixed(4)} + ${(w*h).toFixed(4)})`);
        steps.push(`SA = 2 × ${((l*w) + (l*h) + (w*h)).toFixed(4)}`);
        steps.push(`SA = ${surfaceArea.toFixed(4)} square units`);
        break;
      }
      
      case 'cylinder': {
        const r = parseFloat(radius) || 0;
        const h = parseFloat(cylinderHeight) || 0;
        if (r <= 0 || h <= 0) {
          alert('Radius and height must be greater than zero');
          return;
        }
        const baseArea = Math.PI * r * r;
        const lateralArea = 2 * Math.PI * r * h;
        surfaceArea = 2 * baseArea + lateralArea;
        formula = 'SA = 2πr² + 2πrh';
        calculation = `2π(${r})² + 2π(${r})(${h}) = ${(2*baseArea).toFixed(4)} + ${lateralArea.toFixed(4)} = ${surfaceArea.toFixed(4)}`;
        shapeName = 'Cylinder';
        steps.push(`Given: Radius (r) = ${r}, Height (h) = ${h}`);
        steps.push(`Formula: SA = 2πr² + 2πrh`);
        steps.push(`Base area = πr² = π × ${r}² = ${baseArea.toFixed(4)}`);
        steps.push(`Lateral area = 2πrh = 2π × ${r} × ${h} = ${lateralArea.toFixed(4)}`);
        steps.push(`SA = 2 × ${baseArea.toFixed(4)} + ${lateralArea.toFixed(4)}`);
        steps.push(`SA = ${surfaceArea.toFixed(4)} square units`);
        break;
      }
      
      case 'sphere': {
        const r = parseFloat(sphereRadius) || 0;
        if (r <= 0) {
          alert('Radius must be greater than zero');
          return;
        }
        surfaceArea = 4 * Math.PI * r * r;
        formula = 'SA = 4πr²';
        calculation = `4π(${r})² = 4π × ${(r*r).toFixed(4)} = ${surfaceArea.toFixed(4)}`;
        shapeName = 'Sphere';
        steps.push(`Given: Radius (r) = ${r}`);
        steps.push(`Formula: SA = 4πr²`);
        steps.push(`SA = 4π × ${r}²`);
        steps.push(`SA = 4π × ${(r*r).toFixed(4)}`);
        steps.push(`SA = ${surfaceArea.toFixed(4)} square units`);
        break;
      }
      
      case 'cone': {
        const r = parseFloat(coneRadius) || 0;
        const h = parseFloat(coneHeight) || 0;
        const s = parseFloat(slantHeight) || 0;
        
        if (r <= 0) {
          alert('Radius must be greater than zero');
          return;
        }
        
        if (s > 0) {
          // Using slant height
          const baseArea = Math.PI * r * r;
          const lateralArea = Math.PI * r * s;
          surfaceArea = baseArea + lateralArea;
          formula = 'SA = πr² + πrs';
          calculation = `π(${r})² + π(${r})(${s}) = ${baseArea.toFixed(4)} + ${lateralArea.toFixed(4)} = ${surfaceArea.toFixed(4)}`;
          shapeName = 'Cone (with slant height)';
          steps.push(`Given: Radius (r) = ${r}, Slant Height (s) = ${s}`);
          steps.push(`Formula: SA = πr² + πrs`);
          steps.push(`Base area = πr² = π × ${r}² = ${baseArea.toFixed(4)}`);
          steps.push(`Lateral area = πrs = π × ${r} × ${s} = ${lateralArea.toFixed(4)}`);
          steps.push(`SA = ${baseArea.toFixed(4)} + ${lateralArea.toFixed(4)}`);
          steps.push(`SA = ${surfaceArea.toFixed(4)} square units`);
        } else if (h > 0) {
          // Calculate slant height from height
          const s_calculated = Math.sqrt(r * r + h * h);
          const baseArea = Math.PI * r * r;
          const lateralArea = Math.PI * r * s_calculated;
          surfaceArea = baseArea + lateralArea;
          formula = 'SA = πr² + πrs (where s = √(r² + h²))';
          calculation = `π(${r})² + π(${r})(${s_calculated.toFixed(4)}) = ${baseArea.toFixed(4)} + ${lateralArea.toFixed(4)} = ${surfaceArea.toFixed(4)}`;
          shapeName = 'Cone (with height)';
          steps.push(`Given: Radius (r) = ${r}, Height (h) = ${h}`);
          steps.push(`First, calculate slant height: s = √(r² + h²)`);
          steps.push(`s = √(${r}² + ${h}²) = √(${(r*r).toFixed(4)} + ${(h*h).toFixed(4)}) = ${s_calculated.toFixed(4)}`);
          steps.push(`Formula: SA = πr² + πrs`);
          steps.push(`Base area = πr² = π × ${r}² = ${baseArea.toFixed(4)}`);
          steps.push(`Lateral area = πrs = π × ${r} × ${s_calculated.toFixed(4)} = ${lateralArea.toFixed(4)}`);
          steps.push(`SA = ${baseArea.toFixed(4)} + ${lateralArea.toFixed(4)}`);
          steps.push(`SA = ${surfaceArea.toFixed(4)} square units`);
        } else {
          alert('Please provide either height or slant height');
          return;
        }
        break;
      }
      
      case 'triangular-prism': {
        const base = parseFloat(baseLength) || 0;
        const baseH = parseFloat(baseHeight) || 0;
        const prismH = parseFloat(prismHeight) || 0;
        const a = parseFloat(sideA) || 0;
        const b = parseFloat(sideB) || 0;
        const c = parseFloat(sideC) || 0;
        
        if (base <= 0 || baseH <= 0 || prismH <= 0) {
          alert('Base length, base height, and prism height must be greater than zero');
          return;
        }
        
        // Calculate base area
        const baseArea = (base * baseH) / 2;
        
        // Calculate perimeter
        let perimeter = 0;
        if (a > 0 && b > 0 && c > 0) {
          perimeter = a + b + c;
        } else {
          // Estimate perimeter (assuming equilateral triangle)
          perimeter = base * 3;
        }
        
        // Lateral surface area
        const lateralArea = perimeter * prismH;
        
        // Total surface area
        surfaceArea = 2 * baseArea + lateralArea;
        formula = 'SA = 2 × Base Area + Lateral Area';
        calculation = `2 × ${baseArea.toFixed(4)} + ${lateralArea.toFixed(4)} = ${surfaceArea.toFixed(4)}`;
        shapeName = 'Triangular Prism';
        steps.push(`Given: Base length = ${base}, Base height = ${baseH}, Prism height = ${prismH}`);
        steps.push(`Base area = (1/2) × base × height = (1/2) × ${base} × ${baseH} = ${baseArea.toFixed(4)}`);
        steps.push(`Perimeter = ${perimeter.toFixed(4)}`);
        steps.push(`Lateral area = Perimeter × Prism height = ${perimeter.toFixed(4)} × ${prismH} = ${lateralArea.toFixed(4)}`);
        steps.push(`SA = 2 × Base Area + Lateral Area`);
        steps.push(`SA = 2 × ${baseArea.toFixed(4)} + ${lateralArea.toFixed(4)}`);
        steps.push(`SA = ${surfaceArea.toFixed(4)} square units`);
        break;
      }
    }

    setResult({
      surfaceArea,
      shape: shapeName,
      formula,
      calculation,
      steps
    });
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

  const renderInputs = () => {
    switch (selectedShape) {
      case 'cube':
        return (
          <Input
            label="Side Length (s)"
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="Enter side length"
            step="any"
            min="0"
          />
        );
      
      case 'rectangular-prism':
        return (
          <>
            <Input
              label="Length (l)"
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="Enter length"
              step="any"
              min="0"
            />
            <Input
              label="Width (w)"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Enter width"
              step="any"
              min="0"
            />
            <Input
              label="Height (h)"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height"
              step="any"
              min="0"
            />
          </>
        );
      
      case 'cylinder':
        return (
          <>
            <Input
              label="Radius (r)"
              type="number"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              placeholder="Enter radius"
              step="any"
              min="0"
            />
            <Input
              label="Height (h)"
              type="number"
              value={cylinderHeight}
              onChange={(e) => setCylinderHeight(e.target.value)}
              placeholder="Enter height"
              step="any"
              min="0"
            />
          </>
        );
      
      case 'sphere':
        return (
          <Input
            label="Radius (r)"
            type="number"
            value={sphereRadius}
            onChange={(e) => setSphereRadius(e.target.value)}
            placeholder="Enter radius"
            step="any"
            min="0"
          />
        );
      
      case 'cone':
        return (
          <>
            <Input
              label="Radius (r)"
              type="number"
              value={coneRadius}
              onChange={(e) => setConeRadius(e.target.value)}
              placeholder="Enter radius"
              step="any"
              min="0"
            />
            <Input
              label="Height (h)"
              type="number"
              value={coneHeight}
              onChange={(e) => setConeHeight(e.target.value)}
              placeholder="Enter height (optional if slant height provided)"
              step="any"
              min="0"
            />
            <Input
              label="Slant Height (s)"
              type="number"
              value={slantHeight}
              onChange={(e) => setSlantHeight(e.target.value)}
              placeholder="Enter slant height (optional if height provided)"
              step="any"
              min="0"
            />
          </>
        );
      
      case 'triangular-prism':
        return (
          <>
            <Input
              label="Base Length"
              type="number"
              value={baseLength}
              onChange={(e) => setBaseLength(e.target.value)}
              placeholder="Enter base length"
              step="any"
              min="0"
            />
            <Input
              label="Base Height"
              type="number"
              value={baseHeight}
              onChange={(e) => setBaseHeight(e.target.value)}
              placeholder="Enter base height"
              step="any"
              min="0"
            />
            <Input
              label="Prism Height"
              type="number"
              value={prismHeight}
              onChange={(e) => setPrismHeight(e.target.value)}
              placeholder="Enter prism height"
              step="any"
              min="0"
            />
            <div className="text-sm text-gray-600 mb-2">Optional: Enter all three sides for accurate perimeter</div>
            <Input
              label="Side A"
              type="number"
              value={sideA}
              onChange={(e) => setSideA(e.target.value)}
              placeholder="Enter side A (optional)"
              step="any"
              min="0"
            />
            <Input
              label="Side B"
              type="number"
              value={sideB}
              onChange={(e) => setSideB(e.target.value)}
              placeholder="Enter side B (optional)"
              step="any"
              min="0"
            />
            <Input
              label="Side C"
              type="number"
              value={sideC}
              onChange={(e) => setSideC(e.target.value)}
              placeholder="Enter side C (optional)"
              step="any"
              min="0"
            />
          </>
        );
    }
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
      <div className="w-full">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Surface Area Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the surface area of various 3D shapes with step-by-step solutions:</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Shape Selector */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Shape</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <Button
                onClick={() => setSelectedShape('cube')}
                variant={selectedShape === 'cube' ? 'primary' : 'outline'}
                className="w-full"
                style={selectedShape === 'cube' ? colors.customStyles?.button : undefined}
              >
                🧊 Cube
              </Button>
              <Button
                onClick={() => setSelectedShape('rectangular-prism')}
                variant={selectedShape === 'rectangular-prism' ? 'primary' : 'outline'}
                className="w-full"
                style={selectedShape === 'rectangular-prism' ? colors.customStyles?.button : undefined}
              >
                📦 Rectangular Prism
              </Button>
              <Button
                onClick={() => setSelectedShape('cylinder')}
                variant={selectedShape === 'cylinder' ? 'primary' : 'outline'}
                className="w-full"
                style={selectedShape === 'cylinder' ? colors.customStyles?.button : undefined}
              >
                🫙 Cylinder
              </Button>
              <Button
                onClick={() => setSelectedShape('sphere')}
                variant={selectedShape === 'sphere' ? 'primary' : 'outline'}
                className="w-full"
                style={selectedShape === 'sphere' ? colors.customStyles?.button : undefined}
              >
                ⚪ Sphere
              </Button>
              <Button
                onClick={() => setSelectedShape('cone')}
                variant={selectedShape === 'cone' ? 'primary' : 'outline'}
                className="w-full"
                style={selectedShape === 'cone' ? colors.customStyles?.button : undefined}
              >
                🍦 Cone
              </Button>
              <Button
                onClick={() => setSelectedShape('triangular-prism')}
                variant={selectedShape === 'triangular-prism' ? 'primary' : 'outline'}
                className="w-full"
                style={selectedShape === 'triangular-prism' ? colors.customStyles?.button : undefined}
              >
                🔺 Triangular Prism
              </Button>
            </div>
          </div>

          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              {selectedShape === 'cube' && 'Cube Dimensions'}
              {selectedShape === 'rectangular-prism' && 'Rectangular Prism Dimensions'}
              {selectedShape === 'cylinder' && 'Cylinder Dimensions'}
              {selectedShape === 'sphere' && 'Sphere Dimensions'}
              {selectedShape === 'cone' && 'Cone Dimensions'}
              {selectedShape === 'triangular-prism' && 'Triangular Prism Dimensions'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInputs()}
            </div>
          </div>

          {/* Calculate Button */}
          <div className="flex justify-center">
            <Button
              onClick={calculateSurfaceArea}
              className="custom-color-button"
              style={colors.customStyles?.button}
            >
              Calculate Surface Area
            </Button>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6 animate-fadeIn">
              {/* Main Result */}
              <div 
                className="p-6 rounded-lg border-2"
                style={colors.customStyles?.resultBg}
              >
                <h3 className="text-xl font-bold mb-4" style={colors.customStyles?.result}>
                  Surface Area Result
                </h3>
                
                <div className="bg-white p-4 rounded border mb-4">
                  <p className="font-semibold text-gray-700 mb-2">Shape:</p>
                  <p className="text-lg font-bold text-green-600">{result.shape}</p>
                </div>

                <div className="text-center bg-white p-4 rounded border mb-4">
                  <p className="text-sm text-gray-600">Surface Area</p>
                  <p className="text-3xl font-bold" style={colors.customStyles?.resultText}>
                    {formatValue(result.surfaceArea)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">square units</p>
                </div>

                <div className="bg-white p-4 rounded border mb-4">
                  <p className="font-semibold text-gray-700 mb-2">Formula Used:</p>
                  <p className="text-lg font-mono">{result.formula}</p>
                </div>

                <div className="bg-white p-4 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Calculation:</p>
                  <p className="text-sm font-mono">{result.calculation}</p>
                </div>
              </div>

              {/* Step-by-Step Solution */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Step-by-Step Solution</h4>
                <ol className="space-y-2">
                  {result.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

