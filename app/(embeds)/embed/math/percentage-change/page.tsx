import PercentageChangeCalculator from '@/app/_components/calculators/PercentageChangeCalculator';

interface PercentageChangeEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function PercentageChangeEmbedPage({ searchParams }: PercentageChangeEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <PercentageChangeCalculator showTitle={false} primaryColor={color} />;
}

