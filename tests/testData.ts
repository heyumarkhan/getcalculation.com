// Test data for all calculators
// This file contains comprehensive test cases to validate calculator functionality

export interface TestCase {
  name: string;
  inputs: Record<string, any>;
  expectedOutput: any;
  description: string;
}

export interface CalculatorTestSuite {
  calculatorId: string;
  calculatorName: string;
  testCases: TestCase[];
}

// Test data for Greater Than Or Less Than Calculator
export const greaterThanOrLessThanTests: CalculatorTestSuite = {
  calculatorId: 'greater-than-or-less-than',
  calculatorName: 'Greater Than Or Less Than Calculator',
  testCases: [
    {
      name: 'Basic Greater Than',
      inputs: { firstNumber: '15', secondNumber: '8' },
      expectedOutput: {
        comparison: 'greater',
        symbol: '>',
        explanation: '15 is greater than 8'
      },
      description: 'Test basic greater than comparison with positive integers'
    },
    {
      name: 'Basic Less Than',
      inputs: { firstNumber: '5', secondNumber: '12' },
      expectedOutput: {
        comparison: 'less',
        symbol: '<',
        explanation: '5 is less than 12'
      },
      description: 'Test basic less than comparison with positive integers'
    },
    {
      name: 'Equal Numbers',
      inputs: { firstNumber: '7', secondNumber: '7' },
      expectedOutput: {
        comparison: 'equal',
        symbol: '=',
        explanation: '7 is equal to 7'
      },
      description: 'Test equal numbers comparison'
    },
    {
      name: 'Decimal Greater Than',
      inputs: { firstNumber: '3.7', secondNumber: '3.14' },
      expectedOutput: {
        comparison: 'greater',
        symbol: '>',
        explanation: '3.7 is greater than 3.14'
      },
      description: 'Test decimal number comparison'
    },
    {
      name: 'Negative Numbers',
      inputs: { firstNumber: '-5', secondNumber: '-10' },
      expectedOutput: {
        comparison: 'greater',
        symbol: '>',
        explanation: '-5 is greater than -10'
      },
      description: 'Test negative number comparison'
    },
    {
      name: 'Mixed Positive Negative',
      inputs: { firstNumber: '5', secondNumber: '-3' },
      expectedOutput: {
        comparison: 'greater',
        symbol: '>',
        explanation: '5 is greater than -3'
      },
      description: 'Test positive vs negative number comparison'
    },
    {
      name: 'Zero Comparison',
      inputs: { firstNumber: '0', secondNumber: '-1' },
      expectedOutput: {
        comparison: 'greater',
        symbol: '>',
        explanation: '0 is greater than -1'
      },
      description: 'Test zero vs negative number comparison'
    },
    {
      name: 'Large Numbers',
      inputs: { firstNumber: '999999', secondNumber: '999998' },
      expectedOutput: {
        comparison: 'greater',
        symbol: '>',
        explanation: '999999 is greater than 999998'
      },
      description: 'Test large number comparison'
    }
  ]
};

// Test data for Area Calculator
export const areaCalculatorTests: CalculatorTestSuite = {
  calculatorId: 'area',
  calculatorName: 'Area Calculator',
  testCases: [
    {
      name: 'Rectangle Area',
      inputs: { shape: 'rectangle', length: '10', width: '5' },
      expectedOutput: { area: 50 },
      description: 'Calculate area of rectangle: 10 × 5 = 50'
    },
    {
      name: 'Square Area',
      inputs: { shape: 'square', side: '6' },
      expectedOutput: { area: 36 },
      description: 'Calculate area of square: 6² = 36'
    },
    {
      name: 'Circle Area',
      inputs: { shape: 'circle', radius: '4' },
      expectedOutput: { area: 50.27 }, // π × 4² ≈ 50.27
      description: 'Calculate area of circle: π × 4² ≈ 50.27'
    },
    {
      name: 'Triangle Area',
      inputs: { shape: 'triangle', base: '8', height: '6' },
      expectedOutput: { area: 24 },
      description: 'Calculate area of triangle: (8 × 6) ÷ 2 = 24'
    }
  ]
};

// Test data for Slope Calculator
export const slopeCalculatorTests: CalculatorTestSuite = {
  calculatorId: 'slope',
  calculatorName: 'Slope Calculator',
  testCases: [
    {
      name: 'Positive Slope',
      inputs: { x1: '1', y1: '2', x2: '3', y2: '6' },
      expectedOutput: { slope: 2 },
      description: 'Calculate slope: (6-2)/(3-1) = 4/2 = 2'
    },
    {
      name: 'Negative Slope',
      inputs: { x1: '0', y1: '4', x2: '2', y2: '0' },
      expectedOutput: { slope: -2 },
      description: 'Calculate slope: (0-4)/(2-0) = -4/2 = -2'
    },
    {
      name: 'Zero Slope',
      inputs: { x1: '1', y1: '3', x2: '5', y2: '3' },
      expectedOutput: { slope: 0 },
      description: 'Calculate slope: (3-3)/(5-1) = 0/4 = 0'
    },
    {
      name: 'Undefined Slope',
      inputs: { x1: '2', y1: '1', x2: '2', y2: '5' },
      expectedOutput: { slope: 'undefined' },
      description: 'Calculate slope: (5-1)/(2-2) = 4/0 = undefined'
    }
  ]
};

// Test data for Volume Calculator
export const volumeCalculatorTests: CalculatorTestSuite = {
  calculatorId: 'volume',
  calculatorName: 'Volume Calculator',
  testCases: [
    {
      name: 'Rectangular Prism',
      inputs: { shape: 'rectangular-prism', length: '5', width: '3', height: '4' },
      expectedOutput: { volume: 60 },
      description: 'Calculate volume: 5 × 3 × 4 = 60'
    },
    {
      name: 'Triangular Pyramid',
      inputs: { shape: 'triangular-pyramid', baseArea: '12', height: '8' },
      expectedOutput: { volume: 32 },
      description: 'Calculate volume: (12 × 8) ÷ 3 = 32'
    },
    {
      name: 'Cylinder',
      inputs: { shape: 'cylinder', radius: '3', height: '7' },
      expectedOutput: { volume: 197.92 }, // π × 3² × 7 ≈ 197.92
      description: 'Calculate volume: π × 3² × 7 ≈ 197.92'
    }
  ]
};

// Test data for Diamond Problem Calculator
export const diamondProblemTests: CalculatorTestSuite = {
  calculatorId: 'diamond-problem',
  calculatorName: 'Diamond Problem Calculator',
  testCases: [
    {
      name: 'Basic Diamond Problem',
      inputs: { sum: '10', product: '21' },
      expectedOutput: { 
        number1: 7, 
        number2: 3, 
        isValid: true 
      },
      description: 'Find two numbers that add to 10 and multiply to 21'
    },
    {
      name: 'Negative Numbers',
      inputs: { sum: '-5', product: '6' },
      expectedOutput: { 
        number1: -2, 
        number2: -3, 
        isValid: true 
      },
      description: 'Find two numbers that add to -5 and multiply to 6'
    },
    {
      name: 'No Solution',
      inputs: { sum: '5', product: '20' },
      expectedOutput: { 
        isValid: false 
      },
      description: 'Test case with no real solutions'
    }
  ]
};

// Test data for Cross Multiplication Calculator
export const crossMultiplicationTests: CalculatorTestSuite = {
  calculatorId: 'cross-multiplication',
  calculatorName: 'Cross Multiplication Calculator',
  testCases: [
    {
      name: 'Basic Proportion',
      inputs: { a: '2', b: '3', c: '4', d: '6' },
      expectedOutput: { 
        isValid: true,
        result: '2/3 = 4/6'
      },
      description: 'Test basic proportion: 2/3 = 4/6'
    },
    {
      name: 'Find Missing Value',
      inputs: { a: '3', b: '4', c: 'x', d: '8' },
      expectedOutput: { 
        isValid: true,
        result: 'x = 6'
      },
      description: 'Find missing value: 3/4 = x/8'
    }
  ]
};

// Test data for Heron's Formula Calculator
export const heronsFormulaTests: CalculatorTestSuite = {
  calculatorId: 'herons-formula',
  calculatorName: 'Heron\'s Formula Calculator',
  testCases: [
    {
      name: 'Basic Triangle',
      inputs: { a: '3', b: '4', c: '5' },
      expectedOutput: { area: 6 },
      description: 'Calculate area of triangle with sides 3, 4, 5'
    },
    {
      name: 'Equilateral Triangle',
      inputs: { a: '6', b: '6', c: '6' },
      expectedOutput: { area: 15.59 }, // √(9×3×3×3) ≈ 15.59
      description: 'Calculate area of equilateral triangle with side 6'
    },
    {
      name: 'Invalid Triangle',
      inputs: { a: '1', b: '2', c: '5' },
      expectedOutput: { isValid: false },
      description: 'Test invalid triangle (sum of two sides less than third)'
    }
  ]
};

// Test data for Least Squares Regression Calculator
export const leastSquaresRegressionTests: CalculatorTestSuite = {
  calculatorId: 'least-squares-regression',
  calculatorName: 'Least Squares Regression Calculator',
  testCases: [
    {
      name: 'Perfect Linear Relationship',
      inputs: { 
        dataPoints: [
          { x: 1, y: 2 },
          { x: 2, y: 4 },
          { x: 3, y: 6 },
          { x: 4, y: 8 }
        ]
      },
      expectedOutput: { 
        slope: 2,
        intercept: 0,
        correlation: 1,
        equation: 'y = 2x'
      },
      description: 'Test perfect linear relationship with slope 2'
    },
    {
      name: 'No Correlation',
      inputs: { 
        dataPoints: [
          { x: 1, y: 1 },
          { x: 2, y: 1 },
          { x: 3, y: 1 },
          { x: 4, y: 1 }
        ]
      },
      expectedOutput: { 
        slope: 0,
        intercept: 1,
        correlation: 0,
        equation: 'y = 1'
      },
      description: 'Test no correlation (constant y values)'
    }
  ]
};

// Test data for Midpoint Calculator
export const midpointCalculatorTests: CalculatorTestSuite = {
  calculatorId: 'midpoint',
  calculatorName: 'Midpoint Calculator',
  testCases: [
    {
      name: 'Basic Midpoint',
      inputs: { x1: '0', y1: '0', x2: '4', y2: '6' },
      expectedOutput: { midpointX: 2, midpointY: 3 },
      description: 'Calculate midpoint: ((0+4)/2, (0+6)/2) = (2, 3)'
    },
    {
      name: 'Negative Coordinates',
      inputs: { x1: '-2', y1: '-3', x2: '2', y2: '1' },
      expectedOutput: { midpointX: 0, midpointY: -1 },
      description: 'Calculate midpoint with negative coordinates'
    },
    {
      name: 'Same Point',
      inputs: { x1: '3', y1: '4', x2: '3', y2: '4' },
      expectedOutput: { midpointX: 3, midpointY: 4 },
      description: 'Calculate midpoint when both points are the same'
    }
  ]
};

// Test data for Line Segment Length Calculator
export const lineSegmentLengthTests: CalculatorTestSuite = {
  calculatorId: 'line-segment-length',
  calculatorName: 'Line Segment Length Calculator',
  testCases: [
    {
      name: 'Basic Distance',
      inputs: { x1: '0', y1: '0', x2: '3', y2: '4' },
      expectedOutput: { distance: 5 },
      description: 'Calculate distance: √((3-0)² + (4-0)²) = √(9+16) = 5'
    },
    {
      name: 'Horizontal Line',
      inputs: { x1: '1', y1: '2', x2: '5', y2: '2' },
      expectedOutput: { distance: 4 },
      description: 'Calculate distance of horizontal line: |5-1| = 4'
    },
    {
      name: 'Vertical Line',
      inputs: { x1: '3', y1: '1', x2: '3', y2: '6' },
      expectedOutput: { distance: 5 },
      description: 'Calculate distance of vertical line: |6-1| = 5'
    }
  ]
};

// Test data for Parabola Calculator
export const parabolaCalculatorTests: CalculatorTestSuite = {
  calculatorId: 'parabola',
  calculatorName: 'Parabola Calculator',
  testCases: [
    {
      name: 'Basic Parabola',
      inputs: { equation: 'y = x² - 4x + 3' },
      expectedOutput: { 
        vertex: { x: 2, y: -1 },
        focus: { x: 2, y: -0.75 },
        directrix: 'y = -1.25'
      },
      description: 'Calculate properties of parabola y = x² - 4x + 3'
    },
    {
      name: 'Standard Form',
      inputs: { equation: 'y = 2x² + 8x + 6' },
      expectedOutput: { 
        vertex: { x: -2, y: -2 },
        focus: { x: -2, y: -1.875 },
        directrix: 'y = -2.125'
      },
      description: 'Calculate properties of parabola y = 2x² + 8x + 6'
    }
  ]
};

// Test data for Perimeter Calculator
export const perimeterCalculatorTests: CalculatorTestSuite = {
  calculatorId: 'perimeter',
  calculatorName: 'Perimeter Calculator',
  testCases: [
    {
      name: 'Rectangle Perimeter',
      inputs: { shape: 'rectangle', length: '8', width: '5' },
      expectedOutput: { perimeter: 26 },
      description: 'Calculate perimeter: 2(8 + 5) = 26'
    },
    {
      name: 'Square Perimeter',
      inputs: { shape: 'square', side: '6' },
      expectedOutput: { perimeter: 24 },
      description: 'Calculate perimeter: 4 × 6 = 24'
    },
    {
      name: 'Triangle Perimeter',
      inputs: { shape: 'triangle', side1: '3', side2: '4', side3: '5' },
      expectedOutput: { perimeter: 12 },
      description: 'Calculate perimeter: 3 + 4 + 5 = 12'
    }
  ]
};

// Test data for Quotient Calculator
export const quotientCalculatorTests: CalculatorTestSuite = {
  calculatorId: 'quotient',
  calculatorName: 'Quotient Calculator',
  testCases: [
    {
      name: 'Basic Division',
      inputs: { dividend: '15', divisor: '4' },
      expectedOutput: { quotient: 3, remainder: 3 },
      description: 'Calculate quotient and remainder: 15 ÷ 4 = 3 remainder 3'
    },
    {
      name: 'Exact Division',
      inputs: { dividend: '20', divisor: '5' },
      expectedOutput: { quotient: 4, remainder: 0 },
      description: 'Calculate exact division: 20 ÷ 5 = 4 remainder 0'
    },
    {
      name: 'Division by Zero',
      inputs: { dividend: '10', divisor: '0' },
      expectedOutput: { error: 'Cannot divide by zero' },
      description: 'Test division by zero error handling'
    }
  ]
};

// Test data for Round to Nearest Cent Calculator
export const roundToNearestCentTests: CalculatorTestSuite = {
  calculatorId: 'round-to-nearest-cent',
  calculatorName: 'Round to Nearest Cent Calculator',
  testCases: [
    {
      name: 'Basic Rounding',
      inputs: { number: '3.456' },
      expectedOutput: { rounded: 3.46 },
      description: 'Round 3.456 to nearest cent: 3.46'
    },
    {
      name: 'Round Down',
      inputs: { number: '2.341' },
      expectedOutput: { rounded: 2.34 },
      description: 'Round 2.341 to nearest cent: 2.34'
    },
    {
      name: 'Round Up',
      inputs: { number: '5.675' },
      expectedOutput: { rounded: 5.68 },
      description: 'Round 5.675 to nearest cent: 5.68'
    },
    {
      name: 'Already Rounded',
      inputs: { number: '4.50' },
      expectedOutput: { rounded: 4.50 },
      description: 'Number already rounded to nearest cent'
    }
  ]
};

// Test data for Similar Triangles Calculator
export const similarTrianglesTests: CalculatorTestSuite = {
  calculatorId: 'similar-triangles',
  calculatorName: 'Similar Triangles Calculator',
  testCases: [
    {
      name: 'Basic Similar Triangles',
      inputs: { 
        triangle1: { a: 3, b: 4, c: 5 },
        triangle2: { a: 6, b: 8, c: 10 }
      },
      expectedOutput: { 
        scaleFactor: 2,
        isSimilar: true
      },
      description: 'Test similar triangles with scale factor 2'
    },
    {
      name: 'Find Missing Side',
      inputs: { 
        triangle1: { a: 3, b: 4, c: 5 },
        triangle2: { a: 6, b: 8, c: 'x' }
      },
      expectedOutput: { 
        missingSide: 10,
        scaleFactor: 2
      },
      description: 'Find missing side in similar triangles'
    }
  ]
};

// Test data for Standard Form to Slope Intercept Calculator
export const standardFormToSlopeInterceptTests: CalculatorTestSuite = {
  calculatorId: 'standard-form-to-slope-intercept',
  calculatorName: 'Standard Form to Slope Intercept Calculator',
  testCases: [
    {
      name: 'Basic Conversion',
      inputs: { equation: '2x + 3y = 6' },
      expectedOutput: { 
        slopeInterceptForm: 'y = -0.67x + 2',
        slope: -0.67,
        yIntercept: 2
      },
      description: 'Convert 2x + 3y = 6 to slope-intercept form'
    },
    {
      name: 'Negative Coefficients',
      inputs: { equation: '-x + 2y = 4' },
      expectedOutput: { 
        slopeInterceptForm: 'y = 0.5x + 2',
        slope: 0.5,
        yIntercept: 2
      },
      description: 'Convert -x + 2y = 4 to slope-intercept form'
    }
  ]
};

// Test data for Standard Notation Calculator
export const standardNotationTests: CalculatorTestSuite = {
  calculatorId: 'standard-notation',
  calculatorName: 'Standard Notation Calculator',
  testCases: [
    {
      name: 'Scientific to Standard',
      inputs: { 
        inputType: 'scientific',
        number: '3.45e3'
      },
      expectedOutput: { 
        standardForm: '3450',
        scientificForm: '3.45 × 10³'
      },
      description: 'Convert 3.45e3 to standard notation: 3450'
    },
    {
      name: 'Standard to Scientific',
      inputs: { 
        inputType: 'standard',
        number: '0.000123'
      },
      expectedOutput: { 
        standardForm: '0.000123',
        scientificForm: '1.23 × 10⁻⁴'
      },
      description: 'Convert 0.000123 to scientific notation'
    }
  ]
};

// Test data for Triangular Prism Surface Area Calculator
export const triangularPrismSurfaceAreaTests: CalculatorTestSuite = {
  calculatorId: 'triangular-prism-surface-area',
  calculatorName: 'Triangular Prism Surface Area Calculator',
  testCases: [
    {
      name: 'Basic Triangular Prism',
      inputs: { 
        baseLength: 4,
        height: 3,
        prismHeight: 6
      },
      expectedOutput: { 
        surfaceArea: 84
      },
      description: 'Calculate surface area of triangular prism'
    }
  ]
};

// Test data for Triangular Pyramid Volume Calculator
export const triangularPyramidVolumeTests: CalculatorTestSuite = {
  calculatorId: 'triangular-pyramid-volume',
  calculatorName: 'Triangular Pyramid Volume Calculator',
  testCases: [
    {
      name: 'Basic Triangular Pyramid',
      inputs: { 
        baseArea: 12,
        height: 8
      },
      expectedOutput: { 
        volume: 32
      },
      description: 'Calculate volume: (12 × 8) ÷ 3 = 32'
    }
  ]
};

// Test data for Volume of Hemisphere Calculator
export const volumeOfHemisphereTests: CalculatorTestSuite = {
  calculatorId: 'volume-of-hemisphere',
  calculatorName: 'Volume of Hemisphere Calculator',
  testCases: [
    {
      name: 'Basic Hemisphere',
      inputs: { radius: 3 },
      expectedOutput: { 
        volume: 56.55 // (2/3)πr³ ≈ 56.55
      },
      description: 'Calculate volume of hemisphere with radius 3'
    }
  ]
};

// Test data for Velocity Calculator
export const velocityCalculatorTests: CalculatorTestSuite = {
  calculatorId: 'velocity-calculator',
  calculatorName: 'Velocity Calculator',
  testCases: [
    {
      name: 'Basic Velocity',
      inputs: { 
        distance: 100,
        time: 10
      },
      expectedOutput: { 
        velocity: 10,
        speed: 10
      },
      description: 'Calculate velocity: 100m ÷ 10s = 10 m/s'
    },
    {
      name: 'Find Distance',
      inputs: { 
        velocity: 15,
        time: 8
      },
      expectedOutput: { 
        distance: 120
      },
      description: 'Calculate distance: 15 m/s × 8s = 120m'
    },
    {
      name: 'Find Time',
      inputs: { 
        distance: 200,
        velocity: 25
      },
      expectedOutput: { 
        time: 8
      },
      description: 'Calculate time: 200m ÷ 25 m/s = 8s'
    }
  ]
};

// Test data for Binomial Coefficient Calculator
export const binomialCoefficientTests: CalculatorTestSuite = {
  calculatorId: 'binomial-coefficient',
  calculatorName: 'Binomial Coefficient Calculator',
  testCases: [
    {
      name: 'Basic Combination',
      inputs: { n: 5, k: 2 },
      expectedOutput: { 
        coefficient: 10,
        formula: 'C(5,2) = 5!/(2!(5-2)!) = 10'
      },
      description: 'Calculate C(5,2) = 10'
    },
    {
      name: 'Edge Case k=0',
      inputs: { n: 7, k: 0 },
      expectedOutput: { 
        coefficient: 1,
        formula: 'C(7,0) = 1'
      },
      description: 'Calculate C(7,0) = 1'
    },
    {
      name: 'Edge Case k=n',
      inputs: { n: 4, k: 4 },
      expectedOutput: { 
        coefficient: 1,
        formula: 'C(4,4) = 1'
      },
      description: 'Calculate C(4,4) = 1'
    }
  ]
};

// Test data for Average Rate of Change Calculator
export const averageRateOfChangeTests: CalculatorTestSuite = {
  calculatorId: 'average-rate-of-change',
  calculatorName: 'Average Rate of Change Calculator',
  testCases: [
    {
      name: 'Linear Function',
      inputs: { 
        function: '2x + 3',
        x1: 1,
        x2: 4
      },
      expectedOutput: { 
        rateOfChange: 2,
        explanation: 'Average rate of change is 2'
      },
      description: 'Calculate average rate of change for linear function'
    },
    {
      name: 'Quadratic Function',
      inputs: { 
        function: 'x²',
        x1: 1,
        x2: 3
      },
      expectedOutput: { 
        rateOfChange: 4,
        explanation: 'Average rate of change is 4'
      },
      description: 'Calculate average rate of change for quadratic function'
    }
  ]
};

// Test data for Exponential Function Calculator
export const exponentialFunctionTests: CalculatorTestSuite = {
  calculatorId: 'exponential-function',
  calculatorName: 'Exponential Function Calculator',
  testCases: [
    {
      name: 'Basic Exponential',
      inputs: { 
        base: 2,
        exponent: 3
      },
      expectedOutput: { 
        result: 8,
        formula: '2³ = 8'
      },
      description: 'Calculate 2³ = 8'
    },
    {
      name: 'Natural Exponential',
      inputs: { 
        base: 'e',
        exponent: 1
      },
      expectedOutput: { 
        result: 2.718,
        formula: 'e¹ ≈ 2.718'
      },
      description: 'Calculate e¹ ≈ 2.718'
    }
  ]
};

// Test data for Inverse Modulo Calculator
export const inverseModuloTests: CalculatorTestSuite = {
  calculatorId: 'inverse-modulo',
  calculatorName: 'Inverse Modulo Calculator',
  testCases: [
    {
      name: 'Basic Inverse Modulo',
      inputs: { 
        number: 3,
        modulus: 7
      },
      expectedOutput: { 
        inverse: 5,
        explanation: '3 × 5 ≡ 1 (mod 7)'
      },
      description: 'Find modular inverse of 3 mod 7'
    },
    {
      name: 'No Inverse',
      inputs: { 
        number: 4,
        modulus: 8
      },
      expectedOutput: { 
        hasInverse: false,
        explanation: '4 and 8 are not coprime'
      },
      description: 'Test case where modular inverse does not exist'
    }
  ]
};

// All test suites
export const allTestSuites: CalculatorTestSuite[] = [
  greaterThanOrLessThanTests,
  areaCalculatorTests,
  slopeCalculatorTests,
  volumeCalculatorTests,
  diamondProblemTests,
  crossMultiplicationTests,
  heronsFormulaTests,
  leastSquaresRegressionTests,
  midpointCalculatorTests,
  lineSegmentLengthTests,
  parabolaCalculatorTests,
  perimeterCalculatorTests,
  quotientCalculatorTests,
  roundToNearestCentTests,
  similarTrianglesTests,
  standardFormToSlopeInterceptTests,
  standardNotationTests,
  triangularPrismSurfaceAreaTests,
  triangularPyramidVolumeTests,
  volumeOfHemisphereTests,
  velocityCalculatorTests,
  binomialCoefficientTests,
  averageRateOfChangeTests,
  exponentialFunctionTests,
  inverseModuloTests
];

// Helper function to get test suite by calculator ID
export function getTestSuite(calculatorId: string): CalculatorTestSuite | undefined {
  return allTestSuites.find(suite => suite.calculatorId === calculatorId);
}

// Helper function to get all test cases for a calculator
export function getTestCases(calculatorId: string): TestCase[] {
  const suite = getTestSuite(calculatorId);
  return suite ? suite.testCases : [];
}

// Helper function to validate calculator output
export function validateCalculatorOutput(
  calculatorId: string, 
  testCaseName: string, 
  actualOutput: any
): { isValid: boolean; errors: string[] } {
  const testCase = getTestCases(calculatorId).find(tc => tc.name === testCaseName);
  
  if (!testCase) {
    return { isValid: false, errors: [`Test case '${testCaseName}' not found`] };
  }

  const errors: string[] = [];
  
  // Basic validation - can be extended based on specific calculator needs
  if (typeof actualOutput !== typeof testCase.expectedOutput) {
    errors.push(`Output type mismatch. Expected ${typeof testCase.expectedOutput}, got ${typeof actualOutput}`);
  }

  // For numeric comparisons, allow small floating point differences
  if (typeof testCase.expectedOutput === 'number' && typeof actualOutput === 'number') {
    const tolerance = 0.01;
    if (Math.abs(actualOutput - testCase.expectedOutput) > tolerance) {
      errors.push(`Numeric value mismatch. Expected ${testCase.expectedOutput}, got ${actualOutput}`);
    }
  }

  return { isValid: errors.length === 0, errors };
}
