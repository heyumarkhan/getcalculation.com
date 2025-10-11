// Test runner script for all calculators
import { allTestSuites, ManualTestHelper } from '../testData';
import { CalculatorTestRunner, TestReportGenerator } from '../testUtils';

// Import all calculator components
import GreaterThanOrLessThanCalculator from '../../app/_components/calculators/GreaterThanOrLessThanCalculator';
import AreaCalculator from '../../app/_components/calculators/AreaCalculator';
import SlopeCalculator from '../../app/_components/calculators/SlopeCalculator';
import VolumeCalculator from '../../app/_components/calculators/VolumeCalculator';
import DiamondProblemCalculator from '../../app/_components/calculators/DiamondProblemCalculator';
import CrossMultiplicationCalculator from '../../app/_components/calculators/CrossMultiplicationCalculator';
import HeronsFormulaCalculator from '../../app/_components/calculators/HeronsFormulaCalculator';
import LeastSquaresRegressionCalculator from '../../app/_components/calculators/LeastSquaresRegressionCalculator';
import MidpointCalculator from '../../app/_components/calculators/MidpointCalculator';
import LineSegmentCalculator from '../../app/_components/calculators/LineSegmentCalculator';
import ParabolaCalculator from '../../app/_components/calculators/ParabolaCalculator';
import PerimeterCalculator from '../../app/_components/calculators/PerimeterCalculator';
import QuotientCalculator from '../../app/_components/calculators/QuotientCalculator';
import RoundToNearestCentCalculator from '../../app/_components/calculators/RoundToNearestCentCalculator';
import SimilarTrianglesCalculator from '../../app/_components/calculators/SimilarTrianglesCalculator';
import StandardFormToSlopeCalculator from '../../app/_components/calculators/StandardFormToSlopeCalculator';
import StandardNotationCalculator from '../../app/_components/calculators/StandardNotationCalculator';
import TriangularPrismCalculator from '../../app/_components/calculators/TriangularPrismCalculator';
import TriangularPyramidVolumeCalculator from '../../app/_components/calculators/TriangularPyramidVolumeCalculator';
import VolumeOfHemisphereCalculator from '../../app/_components/calculators/VolumeOfHemisphereCalculator';
import VelocityCalculator from '../../app/_components/calculators/VelocityCalculator';
import BinomialCoefficientCalculator from '../../app/_components/calculators/BinomialCoefficientCalculator';
import AverageRateOfChangeCalculator from '../../app/_components/calculators/AverageRateOfChangeCalculator';
import ExponentialFunctionCalculator from '../../app/_components/calculators/ExponentialFunctionCalculator';
import InverseModuloCalculator from '../../app/_components/calculators/InverseModuloCalculator';

// Calculator component mapping
const calculatorComponents: Record<string, React.ComponentType<any>> = {
  'greater-than-or-less-than': GreaterThanOrLessThanCalculator,
  'area': AreaCalculator,
  'slope': SlopeCalculator,
  'volume': VolumeCalculator,
  'diamond-problem': DiamondProblemCalculator,
  'cross-multiplication': CrossMultiplicationCalculator,
  'herons-formula': HeronsFormulaCalculator,
  'least-squares-regression': LeastSquaresRegressionCalculator,
  'midpoint': MidpointCalculator,
  'line-segment-length': LineSegmentCalculator,
  'parabola': ParabolaCalculator,
  'perimeter': PerimeterCalculator,
  'quotient': QuotientCalculator,
  'round-to-nearest-cent': RoundToNearestCentCalculator,
  'similar-triangles': SimilarTrianglesCalculator,
  'standard-form-to-slope-intercept': StandardFormToSlopeCalculator,
  'standard-notation': StandardNotationCalculator,
  'triangular-prism-surface-area': TriangularPrismCalculator,
  'triangular-pyramid-volume': TriangularPyramidVolumeCalculator,
  'volume-of-hemisphere': VolumeOfHemisphereCalculator,
  'velocity-calculator': VelocityCalculator,
  'binomial-coefficient': BinomialCoefficientCalculator,
  'average-rate-of-change': AverageRateOfChangeCalculator,
  'exponential-function': ExponentialFunctionCalculator,
  'inverse-modulo': InverseModuloCalculator,
};

/**
 * Run tests for all calculators
 */
export async function runAllCalculatorTests(): Promise<void> {
  console.log('🧮 Starting comprehensive calculator testing...\n');
  
  const allResults: any[] = [];
  let totalPassed = 0;
  let totalFailed = 0;

  for (const testSuite of allTestSuites) {
    const calculatorId = testSuite.calculatorId;
    const CalculatorComponent = calculatorComponents[calculatorId];
    
    if (!CalculatorComponent) {
      console.warn(`⚠️  No component found for calculator: ${calculatorId}`);
      continue;
    }

    console.log(`Testing ${testSuite.calculatorName}...`);
    
    try {
      const testRunner = new CalculatorTestRunner(calculatorId, CalculatorComponent);
      const results = await testRunner.runAllTests();
      
      allResults.push({
        calculatorId,
        calculatorName: testSuite.calculatorName,
        ...results
      });
      
      totalPassed += results.passed;
      totalFailed += results.failed;
      
      console.log(`  ✅ Passed: ${results.passed}, ❌ Failed: ${results.failed}`);
    } catch (error) {
      console.error(`  ❌ Error testing ${calculatorId}:`, error);
      totalFailed++;
    }
  }

  console.log('\n📊 Test Summary:');
  console.log(`Total Tests: ${totalPassed + totalFailed}`);
  console.log(`Passed: ${totalPassed}`);
  console.log(`Failed: ${totalFailed}`);
  console.log(`Pass Rate: ${((totalPassed / (totalPassed + totalFailed)) * 100).toFixed(2)}%`);

  // Generate detailed report
  const report = TestReportGenerator.generateReport(allResults);
  console.log('\n📋 Detailed Report:');
  console.log(report);
}

/**
 * Run tests for a specific calculator
 */
export async function runCalculatorTest(calculatorId: string): Promise<void> {
  const testSuite = allTestSuites.find(suite => suite.calculatorId === calculatorId);
  const CalculatorComponent = calculatorComponents[calculatorId];
  
  if (!testSuite) {
    console.error(`❌ No test suite found for calculator: ${calculatorId}`);
    return;
  }
  
  if (!CalculatorComponent) {
    console.error(`❌ No component found for calculator: ${calculatorId}`);
    return;
  }

  console.log(`🧮 Testing ${testSuite.calculatorName}...\n`);
  
  try {
    const testRunner = new CalculatorTestRunner(calculatorId, CalculatorComponent);
    const results = await testRunner.runAllTests();
    
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`❌ Failed: ${results.failed}`);
    
    if (results.failed > 0) {
      console.log('\nFailed Tests:');
      results.results
        .filter(r => !r.passed)
        .forEach(r => console.log(`  - ${r.testCase}: ${r.error}`));
    }
  } catch (error) {
    console.error(`❌ Error testing ${calculatorId}:`, error);
  }
}

/**
 * Generate manual test cases for all calculators
 */
export function generateAllManualTestCases(): void {
  console.log('📝 Generating manual test cases for all calculators...\n');
  
  allTestSuites.forEach(testSuite => {
    const manualTest = ManualTestHelper.generateManualTestCases(testSuite.calculatorId);
    
    console.log(`\n${manualTest}`);
    console.log('\n' + '='.repeat(80) + '\n');
  });
}

/**
 * Generate manual test cases for a specific calculator
 */
export function generateManualTestCases(calculatorId: string): void {
  const manualTest = ManualTestHelper.generateManualTestCases(calculatorId);
  console.log(manualTest);
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  const calculatorId = args[1];

  switch (command) {
    case 'all':
      runAllCalculatorTests();
      break;
    case 'single':
      if (calculatorId) {
        runCalculatorTest(calculatorId);
      } else {
        console.error('❌ Please provide calculator ID');
        console.log('Available calculators:', allTestSuites.map(s => s.calculatorId).join(', '));
      }
      break;
    case 'manual':
      if (calculatorId) {
        generateManualTestCases(calculatorId);
      } else {
        generateAllManualTestCases();
      }
      break;
    default:
      console.log(`
🧮 Calculator Test Runner

Usage:
  npm run test:all                    - Run all calculator tests
  npm run test:single <calculator-id> - Run tests for specific calculator
  npm run test:manual [calculator-id]  - Generate manual test cases

Available calculators:
${allTestSuites.map(s => `  - ${s.calculatorId}`).join('\n')}
      `);
  }
}
