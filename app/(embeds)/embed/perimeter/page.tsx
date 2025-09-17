import PerimeterCalculator from '@/app/_components/calculators/PerimeterCalculator';

interface PerimeterEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function PerimeterEmbedPage({ searchParams }: PerimeterEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || 'blue';
  
  return <PerimeterCalculator showTitle={false} primaryColor={color} />;
}
