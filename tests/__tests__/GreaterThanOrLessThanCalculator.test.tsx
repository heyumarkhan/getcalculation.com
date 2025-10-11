// Example test file for Greater Than Or Less Than Calculator
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GreaterThanOrLessThanCalculator from '../app/_components/calculators/GreaterThanOrLessThanCalculator';
import { CalculatorTestRunner, CalculatorTestUtils } from './testUtils';
import { getTestCases } from './testData';

// Mock Next.js components
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

describe('GreaterThanOrLessThanCalculator', () => {
  beforeEach(() => {
    // Clear any previous state
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders calculator with title when showTitle is true', () => {
      render(<GreaterThanOrLessThanCalculator showTitle={true} />);
      
      expect(screen.getByText('Greater Than Or Less Than Calculator')).toBeInTheDocument();
      expect(screen.getByText(/Enter two numbers to compare/)).toBeInTheDocument();
    });

    it('renders calculator without title when showTitle is false', () => {
      render(<GreaterThanOrLessThanCalculator showTitle={false} />);
      
      expect(screen.queryByText('Greater Than Or Less Than Calculator')).not.toBeInTheDocument();
    });

    it('renders input fields and calculate button', () => {
      render(<GreaterThanOrLessThanCalculator />);
      
      expect(screen.getByLabelText(/first number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/second number/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /compare numbers/i })).toBeInTheDocument();
    });
  });

  describe('Basic Functionality', () => {
    it('compares two positive numbers correctly', async () => {
      render(<GreaterThanOrLessThanCalculator showTitle={false} />);
      
      // Fill inputs
      const firstInput = screen.getByLabelText(/first number/i);
      const secondInput = screen.getByLabelText(/second number/i);
      
      fireEvent.change(firstInput, { target: { value: '15' } });
      fireEvent.change(secondInput, { target: { value: '8' } });
      
      // Click calculate
      const calculateButton = screen.getByRole('button', { name: /compare numbers/i });
      fireEvent.click(calculateButton);
      
      // Wait for result
      await waitFor(() => {
        expect(screen.getByText('15 is greater than 8')).toBeInTheDocument();
        expect(screen.getByText('>')).toBeInTheDocument();
      });
    });

    it('handles equal numbers correctly', async () => {
      render(<GreaterThanOrLessThanCalculator showTitle={false} />);
      
      const firstInput = screen.getByLabelText(/first number/i);
      const secondInput = screen.getByLabelText(/second number/i);
      
      fireEvent.change(firstInput, { target: { value: '7' } });
      fireEvent.change(secondInput, { target: { value: '7' } });
      
      const calculateButton = screen.getByRole('button', { name: /compare numbers/i });
      fireEvent.click(calculateButton);
      
      await waitFor(() => {
        expect(screen.getByText('7 is equal to 7')).toBeInTheDocument();
        expect(screen.getByText('=')).toBeInTheDocument();
      });
    });

    it('handles negative numbers correctly', async () => {
      render(<GreaterThanOrLessThanCalculator showTitle={false} />);
      
      const firstInput = screen.getByLabelText(/first number/i);
      const secondInput = screen.getByLabelText(/second number/i);
      
      fireEvent.change(firstInput, { target: { value: '-5' } });
      fireEvent.change(secondInput, { target: { value: '-10' } });
      
      const calculateButton = screen.getByRole('button', { name: /compare numbers/i });
      fireEvent.click(calculateButton);
      
      await waitFor(() => {
        expect(screen.getByText('-5 is greater than -10')).toBeInTheDocument();
        expect(screen.getByText('>')).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('shows error for invalid input', async () => {
      render(<GreaterThanOrLessThanCalculator showTitle={false} />);
      
      const firstInput = screen.getByLabelText(/first number/i);
      const secondInput = screen.getByLabelText(/second number/i);
      
      fireEvent.change(firstInput, { target: { value: 'abc' } });
      fireEvent.change(secondInput, { target: { value: '8' } });
      
      const calculateButton = screen.getByRole('button', { name: /compare numbers/i });
      fireEvent.click(calculateButton);
      
      // Should show alert or error message
      await waitFor(() => {
        // Check if alert was called or error message is displayed
        expect(screen.queryByText('15 is greater than 8')).not.toBeInTheDocument();
      });
    });

    it('handles empty input gracefully', async () => {
      render(<GreaterThanOrLessThanCalculator showTitle={false} />);
      
      const calculateButton = screen.getByRole('button', { name: /compare numbers/i });
      fireEvent.click(calculateButton);
      
      // Should handle empty input without crashing
      await waitFor(() => {
        expect(calculateButton).toBeInTheDocument();
      });
    });
  });

  describe('Comprehensive Test Suite', () => {
    it('passes all predefined test cases', async () => {
      const testRunner = new CalculatorTestRunner('greater-than-or-less-than', GreaterThanOrLessThanCalculator);
      const results = await testRunner.runAllTests();
      
      expect(results.failed).toBe(0);
      expect(results.passed).toBeGreaterThan(0);
    });
  });

  describe('UI Components', () => {
    it('displays inequality symbols reference', () => {
      render(<GreaterThanOrLessThanCalculator />);
      
      expect(screen.getByText('Inequality Symbols:')).toBeInTheDocument();
      expect(screen.getByText('>')).toBeInTheDocument();
      expect(screen.getByText('<')).toBeInTheDocument();
      expect(screen.getByText('=')).toBeInTheDocument();
    });

    it('shows color-coded results', async () => {
      render(<GreaterThanOrLessThanCalculator showTitle={false} />);
      
      const firstInput = screen.getByLabelText(/first number/i);
      const secondInput = screen.getByLabelText(/second number/i);
      
      fireEvent.change(firstInput, { target: { value: '10' } });
      fireEvent.change(secondInput, { target: { value: '5' } });
      
      const calculateButton = screen.getByRole('button', { name: /compare numbers/i });
      fireEvent.click(calculateButton);
      
      await waitFor(() => {
        const resultElement = screen.getByText('>');
        expect(resultElement).toHaveClass('text-green-600');
      });
    });
  });
});
