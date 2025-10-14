import TrigonometryCalculator from '@/app/_components/calculators/TrigonometryCalculator';

interface TrigonometryEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function TrigonometryEmbedPage({ searchParams }: TrigonometryEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#8B5CF6';
  
  return <TrigonometryCalculator showTitle={false} primaryColor={color} />;
}
