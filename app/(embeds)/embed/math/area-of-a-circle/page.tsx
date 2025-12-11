import AreaOfCircleCalculator from '@/app/_components/calculators/AreaOfCircleCalculator';

interface AreaOfCircleEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function AreaOfCircleEmbedPage({ searchParams }: AreaOfCircleEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <AreaOfCircleCalculator showTitle={false} primaryColor={color} />;
}

