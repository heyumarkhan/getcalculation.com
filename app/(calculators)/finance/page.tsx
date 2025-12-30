import { Metadata } from 'next';
import CalculatorGrid from '../../_components/CalculatorGrid';

export const metadata: Metadata = {
  title: 'Finance Calculators - Free Online Finance Tools',
  description: 'Browse our collection of free online finance calculators for loans, investments, savings, mortgages, retirement planning, and more. Easy to use calculators with step-by-step solutions.',
  keywords: ['finance calculators', 'loan calculator', 'investment calculator', 'mortgage calculator', 'retirement calculator', 'savings calculator', 'online finance tools', 'free finance calculators'],
  openGraph: {
    title: 'Finance Calculators - Free Online Finance Tools',
    description: 'Browse our collection of free online finance calculators for loans, investments, savings, mortgages, retirement planning, and more.',
    type: 'website',
    url: 'https://getcalculation.com/finance',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GetCalculation - Free Online Finance Calculators',
      },
    ],
  },
  alternates: {
    canonical: 'https://getcalculation.com/finance',
  },
};

export default function FinancePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CalculatorGrid subject="finance" />
    </div>
  );
}

