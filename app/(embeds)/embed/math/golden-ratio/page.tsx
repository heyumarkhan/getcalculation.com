import GoldenRatioCalculator from '@/app/_components/calculators/GoldenRatioCalculator';

interface GoldenRatioEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function GoldenRatioEmbedPage({ searchParams }: GoldenRatioEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <GoldenRatioCalculator showTitle={false} primaryColor={color} />;
}

