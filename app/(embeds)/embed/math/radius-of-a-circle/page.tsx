import RadiusCalculator from '@/app/_components/calculators/RadiusCalculator';

interface RadiusOfCircleEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function RadiusOfCircleEmbedPage({ searchParams }: RadiusOfCircleEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <RadiusCalculator showTitle={false} primaryColor={color} />;
}

