import MeanCalculator from '@/app/_components/calculators/MeanCalculator';

interface MeanEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function MeanEmbedPage({ searchParams }: MeanEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <MeanCalculator showTitle={false} primaryColor={color} />;
}

