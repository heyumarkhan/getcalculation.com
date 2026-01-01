import RoundToNearestThousandCalculator from '@/app/_components/calculators/RoundToNearestThousandCalculator';

interface RoundToNearestThousandEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function RoundToNearestThousandEmbedPage({ searchParams }: RoundToNearestThousandEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <RoundToNearestThousandCalculator showTitle={false} primaryColor={color} />;
}

