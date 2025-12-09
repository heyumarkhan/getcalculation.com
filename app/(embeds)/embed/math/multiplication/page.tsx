import MultiplicationCalculator from '@/app/_components/calculators/MultiplicationCalculator';

interface MultiplicationEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function MultiplicationEmbedPage({ searchParams }: MultiplicationEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <MultiplicationCalculator showTitle={false} primaryColor={color} />;
}

