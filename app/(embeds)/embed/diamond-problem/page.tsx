import DiamondProblemCalculator from '@/app/_components/calculators/DiamondProblemCalculator';

interface DiamondProblemEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function DiamondProblemEmbedPage({ searchParams }: DiamondProblemEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#3399CC';
  
  return <DiamondProblemCalculator showTitle={false} primaryColor={color} />;
}
