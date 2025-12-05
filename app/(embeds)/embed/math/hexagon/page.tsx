import HexagonCalculator from '@/app/_components/calculators/HexagonCalculator';

interface HexagonEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function HexagonEmbedPage({ searchParams }: HexagonEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <HexagonCalculator showTitle={false} primaryColor={color} />;
}

