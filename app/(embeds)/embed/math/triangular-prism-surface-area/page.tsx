import TriangularPrismCalculator from '@/app/_components/calculators/TriangularPrismCalculator';

interface TriangularPrismEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function TriangularPrismEmbedPage({ searchParams }: TriangularPrismEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#3399CC';
  
  return <TriangularPrismCalculator showTitle={false} primaryColor={color} />;
}
