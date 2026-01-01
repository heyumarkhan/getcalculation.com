import ArithmeticSequenceCalculator from '@/app/_components/calculators/ArithmeticSequenceCalculator';

interface ArithmeticSequenceEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function ArithmeticSequenceEmbedPage({ searchParams }: ArithmeticSequenceEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <ArithmeticSequenceCalculator showTitle={false} primaryColor={color} />;
}

