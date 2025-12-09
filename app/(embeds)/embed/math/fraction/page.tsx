import FractionCalculator from '@/app/_components/calculators/FractionCalculator';

interface FractionEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function FractionEmbedPage({ searchParams }: FractionEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <FractionCalculator showTitle={false} primaryColor={color} />;
}

