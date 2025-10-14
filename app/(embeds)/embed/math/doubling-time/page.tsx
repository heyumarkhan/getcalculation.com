import DoublingTimeCalculator from '@/app/_components/calculators/DoublingTimeCalculator';

interface DoublingTimeEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function DoublingTimeEmbedPage({ searchParams }: DoublingTimeEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#EF4444';
  
  return <DoublingTimeCalculator showTitle={false} primaryColor={color} />;
}
