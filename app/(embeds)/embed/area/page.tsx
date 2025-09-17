import AreaCalculator from '@/app/_components/calculators/AreaCalculator';

interface AreaEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function AreaEmbedPage({ searchParams }: AreaEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || 'green';
  
  return <AreaCalculator showTitle={false} primaryColor={color} />;
}
