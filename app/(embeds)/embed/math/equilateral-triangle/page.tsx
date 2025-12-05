import EquilateralTriangleCalculator from '@/app/_components/calculators/EquilateralTriangleCalculator';

interface EquilateralTriangleEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function EquilateralTriangleEmbedPage({ searchParams }: EquilateralTriangleEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <EquilateralTriangleCalculator showTitle={false} primaryColor={color} />;
}

