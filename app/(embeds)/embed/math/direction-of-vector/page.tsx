import DirectionOfVectorCalculator from '@/app/_components/calculators/DirectionOfVectorCalculator';

interface DirectionOfVectorEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function DirectionOfVectorEmbedPage({ searchParams }: DirectionOfVectorEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <DirectionOfVectorCalculator showTitle={false} primaryColor={color} />;
}

