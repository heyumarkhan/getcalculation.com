import HeightOfTriangleCalculator from '@/app/_components/calculators/HeightOfTriangleCalculator';

interface TriangleHeightEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function TriangleHeightEmbedPage({ searchParams }: TriangleHeightEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <HeightOfTriangleCalculator showTitle={false} primaryColor={color} />;
}

