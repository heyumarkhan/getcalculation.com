import VertexFormCalculator from '@/app/_components/calculators/VertexFormCalculator';

interface VertexFormCalculatorEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function VertexFormCalculatorEmbedPage({ searchParams }: VertexFormCalculatorEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <VertexFormCalculator showTitle={false} primaryColor={color} />;
}

