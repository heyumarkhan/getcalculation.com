import PolygonCalculator from '@/app/_components/calculators/PolygonCalculator';

interface PolygonEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function PolygonEmbedPage({ searchParams }: PolygonEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <PolygonCalculator showTitle={false} primaryColor={color} />;
}

