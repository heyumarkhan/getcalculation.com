import SlopeCalculator from '@/app/_components/calculators/SlopeCalculator';

interface SlopeEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function SlopeEmbedPage({ searchParams }: SlopeEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#3399CC';
  
  return <SlopeCalculator showTitle={false} primaryColor={color} />;
}
