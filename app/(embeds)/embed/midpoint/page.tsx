import MidpointCalculator from '@/app/_components/calculators/MidpointCalculator';

interface MidpointEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function MidpointEmbedPage({ searchParams }: MidpointEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#3399CC';
  
  return <MidpointCalculator showTitle={false} primaryColor={color} />;
}
