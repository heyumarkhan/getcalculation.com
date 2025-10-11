// Testing utilities for calculator components
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { allTestSuites, TestCase, CalculatorTestSuite, validateCalculatorOutput } from './testData';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Test utilities for calculator components
export class CalculatorTestUtils {
  /**
   * Fill input fields with test data
   */
  static fillInputs(inputs: Record<string, any>) {
    Object.entries(inputs).forEach(([key, value]) => {
      const input = screen.getByLabelText(new RegExp(key, 'i')) || 
                   screen.getByDisplayValue('') ||
                   screen.getByPlaceholderText(new RegExp(key, 'i'));
      
      if (input) {
        fireEvent.change(input, { target: { value: value.toString() } });
      }
    });
  }

  /**
   * Click the calculate button
   */
  static clickCalculate() {
    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    fireEvent.click(calculateButton);
  }

  /**
   * Get the result from the calculator output
   */
  static getResult(): any {
    // Try to find result in various common patterns
    const resultElement = screen.queryByText(/result/i)?.closest('div') ||
                         screen.queryByText(/answer/i)?.closest('div') ||
                         screen.queryByText(/output/i)?.closest('div');
    
    if (resultElement) {
      return resultElement.textContent;
    }
    
    // Look for numeric results
    const numericResults = screen.getAllByText(/\d+\.?\d*/);
    return numericResults.map(el => el.textContent);
  }

  /**
   * Check if error message is displayed
   */
  static hasError(): boolean {
    return screen.queryByText(/error/i) !== null ||
           screen.queryByText(/invalid/i) !== null ||
           screen.queryByText(/please enter/i) !== null;
  }

  /**
   * Wait for calculation to complete
   */
  static async waitForCalculation() {
    await waitFor(() => {
      const result = this.getResult();
      expect(result).toBeDefined();
    }, { timeout: 3000 });
  }
}

// Test runner for individual calculators
export class CalculatorTestRunner {
  private calculatorId: string;
  private CalculatorComponent: React.ComponentType<any>;

  constructor(calculatorId: string, CalculatorComponent: React.ComponentType<any>) {
    this.calculatorId = calculatorId;
    this.CalculatorComponent = CalculatorComponent;
  }

  /**
   * Run all test cases for this calculator
   */
  async runAllTests(): Promise<{ passed: number; failed: number; results: any[] }> {
    const testSuite = allTestSuites.find(suite => suite.calculatorId === this.calculatorId);
    
    if (!testSuite) {
      throw new Error(`No test suite found for calculator: ${this.calculatorId}`);
    }

    const results: any[] = [];
    let passed = 0;
    let failed = 0;

    for (const testCase of testSuite.testCases) {
      try {
        const result = await this.runSingleTest(testCase);
        results.push({ ...result, testCase: testCase.name });
        
        if (result.passed) {
          passed++;
        } else {
          failed++;
        }
      } catch (error) {
        results.push({
          testCase: testCase.name,
          passed: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        failed++;
      }
    }

    return { passed, failed, results };
  }

  /**
   * Run a single test case
   */
  private async runSingleTest(testCase: TestCase): Promise<{ passed: boolean; error?: string }> {
    // Render the calculator component
    render(<this.CalculatorComponent showTitle={false} />);

    try {
      // Fill inputs with test data
      CalculatorTestUtils.fillInputs(testCase.inputs);

      // Click calculate button
      CalculatorTestUtils.clickCalculate();

      // Wait for calculation to complete
      await CalculatorTestUtils.waitForCalculation();

      // Get the actual result
      const actualOutput = CalculatorTestUtils.getResult();

      // Validate the output
      const validation = validateCalculatorOutput(this.calculatorId, testCase.name, actualOutput);

      if (validation.isValid) {
        return { passed: true };
      } else {
        return { passed: false, error: validation.errors.join(', ') };
      }
    } catch (error) {
      return { 
        passed: false, 
        error: error instanceof Error ? error.message : 'Test execution failed' 
      };
    }
  }
}

// Test configuration
export const testConfig = {
  // Timeout for individual tests
  testTimeout: 10000,
  
  // Retry configuration
  retries: 2,
  
  // Test data validation
  validateInputs: true,
  validateOutputs: true,
  
  // Error handling
  continueOnError: false,
  
  // Reporting
  verbose: true,
  generateReport: true
};

// Test report generator
export class TestReportGenerator {
  static generateReport(testResults: any[]): string {
    const totalTests = testResults.length;
    const passedTests = testResults.filter(r => r.passed).length;
    const failedTests = totalTests - passedTests;
    const passRate = (passedTests / totalTests * 100).toFixed(2);

    let report = `
# Calculator Test Report
Generated: ${new Date().toISOString()}

## Summary
- Total Tests: ${totalTests}
- Passed: ${passedTests}
- Failed: ${failedTests}
- Pass Rate: ${passRate}%

## Test Results
`;

    testResults.forEach(result => {
      const status = result.passed ? '✅ PASS' : '❌ FAIL';
      report += `
### ${result.testCase}
Status: ${status}
${result.error ? `Error: ${result.error}` : ''}
`;
    });

    return report;
  }
}

// Manual testing helper
export class ManualTestHelper {
  /**
   * Generate test cases for manual testing
   */
  static generateManualTestCases(calculatorId: string): string {
    const testSuite = allTestSuites.find(suite => suite.calculatorId === calculatorId);
    
    if (!testSuite) {
      return `No test cases found for calculator: ${calculatorId}`;
    }

    let manualTest = `
# Manual Test Cases for ${testSuite.calculatorName}

## Test Instructions
1. Navigate to the calculator page
2. For each test case below, enter the input values
3. Click calculate
4. Verify the output matches the expected result
5. Check for any error messages

## Test Cases
`;

    testSuite.testCases.forEach((testCase, index) => {
      manualTest += `
### Test Case ${index + 1}: ${testCase.name}
**Description:** ${testCase.description}

**Input Values:**
${Object.entries(testCase.inputs).map(([key, value]) => `- ${key}: ${value}`).join('\n')}

**Expected Output:**
${typeof testCase.expectedOutput === 'object' 
  ? Object.entries(testCase.expectedOutput).map(([key, value]) => `- ${key}: ${value}`).join('\n')
  : testCase.expectedOutput}

---
`;
    });

    return manualTest;
  }
}

// Export all utilities
export {
  CalculatorTestUtils,
  CalculatorTestRunner,
  TestReportGenerator,
  ManualTestHelper,
  testConfig
};
