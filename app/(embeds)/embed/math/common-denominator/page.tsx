import CommonDenominatorCalculator from '@/app/_components/calculators/CommonDenominatorCalculator';

interface CommonDenominatorEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function CommonDenominatorEmbedPage({ searchParams }: CommonDenominatorEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <CommonDenominatorCalculator showTitle={false} primaryColor={color} />;
}

