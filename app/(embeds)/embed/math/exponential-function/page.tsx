import ExponentialFunctionCalculator from '@/app/_components/calculators/ExponentialFunctionCalculator';

interface ExponentialFunctionCalculatorEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function ExponentialFunctionCalculatorEmbedPage({ searchParams }: ExponentialFunctionCalculatorEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <ExponentialFunctionCalculator showTitle={false} primaryColor={color} />;
}
