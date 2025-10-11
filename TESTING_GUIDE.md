# 🧪 Calculator Testing Guide

This guide explains how to test calculators before making them live, ensuring accuracy and reliability.

## 📋 **What We Have**

### ✅ **Complete Testing Infrastructure**
- **Test Data**: Comprehensive test cases for all 30+ calculators
- **Testing Framework**: Jest + React Testing Library
- **Test Utilities**: Automated testing helpers and validation
- **Manual Testing**: Step-by-step manual test cases
- **Coverage Reports**: Track which code is tested

### ✅ **Test Data Coverage**
Each calculator has **8-10 test cases** covering:
- ✅ **Basic functionality** - Normal use cases
- ✅ **Edge cases** - Boundary conditions
- ✅ **Error handling** - Invalid inputs
- ✅ **Different number types** - Integers, decimals, negatives
- ✅ **Special cases** - Zero, large numbers, edge values

## 🚀 **How to Test Calculators**

### **1. Automated Testing (Recommended)**

#### **Test All Calculators**
```bash
npm run test:all
```
This runs comprehensive tests for all calculators and generates a detailed report.

#### **Test Specific Calculator**
```bash
npm run test:single greater-than-or-less-than
```

#### **Run Tests with Coverage**
```bash
npm run test:coverage
```
Shows which parts of your code are tested.

#### **Watch Mode (Development)**
```bash
npm run test:watch
```
Automatically re-runs tests when files change.

### **2. Manual Testing**

#### **Generate Manual Test Cases**
```bash
npm run test:manual
```
Generates step-by-step manual test instructions for all calculators.

#### **Generate Manual Test for Specific Calculator**
```bash
npm run test:manual greater-than-or-less-than
```

### **3. Individual Test Files**

Each calculator has its own test file:
```
tests/__tests__/
├── GreaterThanOrLessThanCalculator.test.tsx
├── AreaCalculator.test.tsx
├── SlopeCalculator.test.tsx
└── ... (one for each calculator)
```

## 📊 **Test Data Examples**

### **Greater Than Or Less Than Calculator**
```typescript
// Test cases include:
- Basic Greater Than: 15 > 8
- Basic Less Than: 5 < 12  
- Equal Numbers: 7 = 7
- Decimal Comparison: 3.7 > 3.14
- Negative Numbers: -5 > -10
- Mixed Positive/Negative: 5 > -3
- Zero Comparison: 0 > -1
- Large Numbers: 999999 > 999998
```

### **Area Calculator**
```typescript
// Test cases include:
- Rectangle: 10 × 5 = 50
- Square: 6² = 36
- Circle: π × 4² ≈ 50.27
- Triangle: (8 × 6) ÷ 2 = 24
```

### **Slope Calculator**
```typescript
// Test cases include:
- Positive Slope: (1,2) to (3,6) = 2
- Negative Slope: (0,4) to (2,0) = -2
- Zero Slope: (1,3) to (5,3) = 0
- Undefined Slope: (2,1) to (2,5) = undefined
```

## 🔧 **Testing Workflow**

### **Before Adding New Calculator:**

1. **Create Test Data**
   ```typescript
   // Add to tests/testData.ts
   export const yourCalculatorTests: CalculatorTestSuite = {
     calculatorId: 'your-calculator',
     calculatorName: 'Your Calculator',
     testCases: [
       {
         name: 'Basic Test',
         inputs: { input1: '10', input2: '5' },
         expectedOutput: { result: 15 },
         description: 'Test basic functionality'
       }
       // ... more test cases
     ]
   };
   ```

2. **Create Test File**
   ```typescript
   // Create tests/__tests__/YourCalculator.test.tsx
   import YourCalculator from '../../app/_components/calculators/YourCalculator';
   
   describe('YourCalculator', () => {
     it('passes all test cases', async () => {
       const testRunner = new CalculatorTestRunner('your-calculator', YourCalculator);
       const results = await testRunner.runAllTests();
       expect(results.failed).toBe(0);
     });
   });
   ```

3. **Run Tests**
   ```bash
   npm run test:single your-calculator
   ```

### **Before Going Live:**

1. **Run Full Test Suite**
   ```bash
   npm run test:all
   ```

2. **Check Coverage**
   ```bash
   npm run test:coverage
   ```

3. **Manual Testing**
   ```bash
   npm run test:manual your-calculator
   ```

4. **Verify Results**
   - All automated tests pass
   - Coverage is above 80%
   - Manual tests completed successfully

## 📈 **Test Results Interpretation**

### **Automated Test Output**
```
🧮 Testing Greater Than Or Less Than Calculator...
  ✅ Passed: 8, ❌ Failed: 0

📊 Test Summary:
Total Tests: 240
Passed: 238
Failed: 2
Pass Rate: 99.17%
```

### **Coverage Report**
```
File                | % Stmts | % Branch | % Funcs | % Lines
--------------------|---------|----------|---------|--------
All files           |   85.2  |   78.9   |   92.1  |   84.7
 calculators/        |   89.1  |   82.3   |   95.2  |   88.9
  AreaCalculator.tsx |   92.3  |   85.7   |  100.0  |   91.8
  SlopeCalculator.tsx|  87.5  |   80.0   |   90.0  |   86.7
```

## 🛠 **Troubleshooting Tests**

### **Common Issues:**

1. **Test Fails with "Element not found"**
   - Check if input labels match test data
   - Verify component renders correctly

2. **Async Test Timeouts**
   - Increase timeout in test configuration
   - Check if calculation completes properly

3. **Mock Issues**
   - Ensure Next.js mocks are properly configured
   - Check if all dependencies are mocked

### **Debug Commands:**
```bash
# Run single test with verbose output
npm test -- --verbose tests/__tests__/YourCalculator.test.tsx

# Run tests with debug output
DEBUG=* npm run test:single your-calculator

# Run tests and keep output
npm run test:single your-calculator -- --verbose --no-coverage
```

## 📚 **Test Data Structure**

### **Test Case Format:**
```typescript
interface TestCase {
  name: string;                    // Test case name
  inputs: Record<string, any>;     // Input values
  expectedOutput: any;             // Expected result
  description: string;             // What this tests
}
```

### **Calculator Test Suite:**
```typescript
interface CalculatorTestSuite {
  calculatorId: string;            // Calculator identifier
  calculatorName: string;          // Display name
  testCases: TestCase[];          // Array of test cases
}
```

## 🎯 **Best Practices**

### **Writing Test Cases:**
1. **Cover Edge Cases** - Zero, negative, large numbers
2. **Test Error Handling** - Invalid inputs, division by zero
3. **Verify UI Elements** - Buttons, inputs, results display
4. **Check Accessibility** - Labels, ARIA attributes
5. **Test Responsiveness** - Mobile, tablet, desktop

### **Maintaining Tests:**
1. **Update Tests** when calculator logic changes
2. **Add New Test Cases** for new features
3. **Review Coverage** regularly
4. **Document Test Cases** clearly
5. **Run Tests** before every deployment

## 🚀 **Quick Start**

### **Test Your New Calculator:**

1. **Add test data** to `tests/testData.ts`
2. **Create test file** in `tests/__tests__/`
3. **Run tests**: `npm run test:single your-calculator`
4. **Fix any failures**
5. **Run full suite**: `npm run test:all`
6. **Deploy with confidence!**

---

**Your testing infrastructure is now complete and ready to ensure calculator accuracy before going live!** 🎉
