import StandardFormToSlopeCalculator from '@/app/_components/calculators/StandardFormToSlopeCalculator';

interface StandardFormToSlopeInterceptEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function StandardFormToSlopeInterceptEmbedPage({ searchParams }: StandardFormToSlopeInterceptEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#3399CC';
  
  return <StandardFormToSlopeCalculator showTitle={false} primaryColor={color} />;
}
