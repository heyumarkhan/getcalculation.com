import GreaterThanOrLessThanCalculator from '@/app/_components/calculators/GreaterThanOrLessThanCalculator';

interface GreaterThanOrLessThanEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function GreaterThanOrLessThanEmbedPage({ searchParams }: GreaterThanOrLessThanEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#3399CC';
  
  return <GreaterThanOrLessThanCalculator showTitle={false} primaryColor={color} />;
}
