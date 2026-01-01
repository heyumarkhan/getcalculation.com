import SlopePercentageCalculator from '@/app/_components/calculators/SlopePercentageCalculator';

interface SlopePercentageEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function SlopePercentageEmbedPage({ searchParams }: SlopePercentageEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <SlopePercentageCalculator showTitle={false} primaryColor={color} />;
}

