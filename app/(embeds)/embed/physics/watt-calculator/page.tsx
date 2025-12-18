import WattCalculator from '../../../../_components/calculators/WattCalculator';

interface WattCalculatorEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function WattCalculatorEmbedPage({ searchParams }: WattCalculatorEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <WattCalculator showTitle={false} primaryColor={color} />;
}
