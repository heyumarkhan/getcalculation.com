import ChineseRemainderTheoremCalculator from '@/app/_components/calculators/ChineseRemainderTheoremCalculator';

interface ChineseRemainderTheoremEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function ChineseRemainderTheoremEmbedPage({ searchParams }: ChineseRemainderTheoremEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <ChineseRemainderTheoremCalculator showTitle={false} primaryColor={color} />;
}

