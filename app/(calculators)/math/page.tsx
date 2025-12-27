import { Metadata } from 'next';
import CalculatorGrid from '../../_components/CalculatorGrid';

export const metadata: Metadata = {
  title: 'Math Calculators - Free Online Math Tools',
  description: 'Browse our collection of free online math calculators for geometry, algebra, trigonometry, calculus, statistics, and more. Easy to use calculators with step-by-step solutions.',
  keywords: ['math calculators', 'geometry calculator', 'algebra calculator', 'trigonometry calculator', 'calculus calculator', 'statistics calculator', 'online math tools', 'free math calculators'],
  openGraph: {
    title: 'Math Calculators - Free Online Math Tools',
    description: 'Browse our collection of free online math calculators for geometry, algebra, trigonometry, calculus, statistics, and more.',
    type: 'website',
    url: 'https://getcalculation.com/math',
  },
  alternates: {
    canonical: 'https://getcalculation.com/math',
  },
};

export default function MathPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CalculatorGrid subject="math" />
    </div>
  );
}
