import PercentageDifferenceCalculator from '@/app/_components/calculators/PercentageDifferenceCalculator';

interface PercentageDifferenceEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function PercentageDifferenceEmbedPage({ searchParams }: PercentageDifferenceEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <PercentageDifferenceCalculator showTitle={false} primaryColor={color} />;
}

