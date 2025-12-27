import { Metadata } from 'next';
import CalculatorGrid from '../../_components/CalculatorGrid';

export const metadata: Metadata = {
  title: 'Physics Calculators - Free Online Physics Tools',
  description: 'Browse our collection of free online physics calculators for mechanics, thermodynamics, electromagnetism, optics, quantum mechanics, and more. Easy to use calculators with step-by-step solutions.',
  keywords: ['physics calculators', 'mechanics calculator', 'thermodynamics calculator', 'electromagnetism calculator', 'optics calculator', 'quantum mechanics calculator', 'online physics tools', 'free physics calculators'],
  openGraph: {
    title: 'Physics Calculators - Free Online Physics Tools',
    description: 'Browse our collection of free online physics calculators for mechanics, thermodynamics, electromagnetism, optics, quantum mechanics, and more.',
    type: 'website',
    url: 'https://getcalculation.com/physics',
  },
  alternates: {
    canonical: 'https://getcalculation.com/physics',
  },
};

export default function PhysicsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CalculatorGrid subject="physics" />
    </div>
  );
}
