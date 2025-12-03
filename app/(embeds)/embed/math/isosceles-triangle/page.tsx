import IsoscelesTriangleCalculator from '@/app/_components/calculators/IsoscelesTriangleCalculator';

interface IsoscelesTriangleEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function IsoscelesTriangleEmbedPage({ searchParams }: IsoscelesTriangleEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <IsoscelesTriangleCalculator showTitle={false} primaryColor={color} />;
}
