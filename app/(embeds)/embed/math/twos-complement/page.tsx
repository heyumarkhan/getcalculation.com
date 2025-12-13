import TwosComplementCalculator from '@/app/_components/calculators/TwosComplementCalculator';

interface TwosComplementEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function TwosComplementEmbedPage({ searchParams }: TwosComplementEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <TwosComplementCalculator showTitle={false} primaryColor={color} />;
}

