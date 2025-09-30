import CrossMultiplicationCalculator from '@/app/_components/calculators/CrossMultiplicationCalculator';

interface CrossMultiplicationEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function CrossMultiplicationEmbedPage({ searchParams }: CrossMultiplicationEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#3399CC';
  
  return <CrossMultiplicationCalculator showTitle={false} primaryColor={color} />;
}
