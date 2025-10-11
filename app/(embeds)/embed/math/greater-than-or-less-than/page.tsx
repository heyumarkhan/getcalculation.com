import GreaterThanOrLessThanCalculator from '@/app/_components/calculators/GreaterThanOrLessThanCalculator';

interface GreaterThanOrLessThanCalculatorEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function GreaterThanOrLessThanCalculatorEmbedPage({ searchParams }: GreaterThanOrLessThanCalculatorEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#3399CC';
  
  return <GreaterThanOrLessThanCalculator showTitle={false} primaryColor={color} />;
}
