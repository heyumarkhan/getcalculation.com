import QuotientCalculator from '@/app/_components/calculators/QuotientCalculator';

interface QuotientEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function QuotientEmbedPage({ searchParams }: QuotientEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#3399CC';
  
  return <QuotientCalculator showTitle={false} primaryColor={color} />;
}
