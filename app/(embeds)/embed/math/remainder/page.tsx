import RemainderCalculator from '@/app/_components/calculators/RemainderCalculator';

interface RemainderEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function RemainderEmbedPage({ searchParams }: RemainderEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <RemainderCalculator showTitle={false} primaryColor={color} />;
}

