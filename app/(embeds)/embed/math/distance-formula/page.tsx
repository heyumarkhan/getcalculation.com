import DistanceFormulaCalculator from '@/app/_components/calculators/DistanceFormulaCalculator';

interface DistanceFormulaEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function DistanceFormulaEmbedPage({ searchParams }: DistanceFormulaEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <DistanceFormulaCalculator showTitle={false} primaryColor={color} />;
}

