import SlopeInterceptFormCalculator from '@/app/_components/calculators/SlopeInterceptFormCalculator';

interface SlopeInterceptFormEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function SlopeInterceptFormEmbedPage({ searchParams }: SlopeInterceptFormEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <SlopeInterceptFormCalculator showTitle={false} primaryColor={color} />;
}

