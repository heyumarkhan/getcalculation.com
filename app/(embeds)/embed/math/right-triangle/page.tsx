import RightTriangleCalculator from '@/app/_components/calculators/RightTriangleCalculator';

interface RightTriangleEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function RightTriangleEmbedPage({ searchParams }: RightTriangleEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#10B981';
  
  return <RightTriangleCalculator showTitle={false} primaryColor={color} />;
}
