import Triangle454590Calculator from '@/app/_components/calculators/Triangle454590Calculator';

interface Triangle454590EmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function Triangle454590EmbedPage({ searchParams }: Triangle454590EmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <Triangle454590Calculator showTitle={false} primaryColor={color} />;
}
