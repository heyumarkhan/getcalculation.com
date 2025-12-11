import AngleBetweenVectorsCalculator from '@/app/_components/calculators/AngleBetweenVectorsCalculator';

interface AngleBetweenVectorsEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function AngleBetweenVectorsEmbedPage({ searchParams }: AngleBetweenVectorsEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <AngleBetweenVectorsCalculator showTitle={false} primaryColor={color} />;
}

