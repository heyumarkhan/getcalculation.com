import ProportionCalculator from '@/app/_components/calculators/ProportionCalculator';

interface ProportionEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function ProportionEmbedPage({ searchParams }: ProportionEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#10B981';
  
  return <ProportionCalculator showTitle={false} primaryColor={color} />;
}
