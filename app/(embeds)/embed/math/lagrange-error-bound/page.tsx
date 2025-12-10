import LagrangeErrorBoundCalculator from '@/app/_components/calculators/LagrangeErrorBoundCalculator';

interface LagrangeErrorBoundEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function LagrangeErrorBoundEmbedPage({ searchParams }: LagrangeErrorBoundEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <LagrangeErrorBoundCalculator showTitle={false} primaryColor={color} />;
}

