import SpecialRightTrianglesCalculator from '@/app/_components/calculators/SpecialRightTrianglesCalculator';

interface SpecialRightTrianglesEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function SpecialRightTrianglesEmbedPage({ searchParams }: SpecialRightTrianglesEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <SpecialRightTrianglesCalculator showTitle={false} primaryColor={color} />;
}

