import PercentErrorCalculator from '@/app/_components/calculators/PercentErrorCalculator';

interface PercentErrorEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function PercentErrorEmbedPage({ searchParams }: PercentErrorEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <PercentErrorCalculator showTitle={false} primaryColor={color} />;
}

