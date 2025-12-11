import DiagonalOfRectangleCalculator from '@/app/_components/calculators/DiagonalOfRectangleCalculator';

interface DiagonalOfRectangleEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function DiagonalOfRectangleEmbedPage({ searchParams }: DiagonalOfRectangleEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <DiagonalOfRectangleCalculator showTitle={false} primaryColor={color} />;
}

