import SumOfSeriesCalculator from '@/app/_components/calculators/SumOfSeriesCalculator';

interface SumOfSeriesEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function SumOfSeriesEmbedPage({ searchParams }: SumOfSeriesEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#8B5CF6';
  
  return <SumOfSeriesCalculator showTitle={false} primaryColor={color} />;
}
