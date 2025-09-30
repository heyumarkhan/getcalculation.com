import ParabolaCalculator from '@/app/_components/calculators/ParabolaCalculator';

interface ParabolaEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function ParabolaEmbedPage({ searchParams }: ParabolaEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#3399CC';
  
  return <ParabolaCalculator showTitle={false} primaryColor={color} />;
}
