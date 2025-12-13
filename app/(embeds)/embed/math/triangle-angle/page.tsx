import TriangleAngleCalculator from '@/app/_components/calculators/TriangleAngleCalculator';

interface TriangleAngleEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function TriangleAngleEmbedPage({ searchParams }: TriangleAngleEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <TriangleAngleCalculator showTitle={false} primaryColor={color} />;
}

