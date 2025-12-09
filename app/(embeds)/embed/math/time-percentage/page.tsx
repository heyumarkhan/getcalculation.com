import TimePercentageCalculator from '@/app/_components/calculators/TimePercentageCalculator';

interface TimePercentageEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function TimePercentageEmbedPage({ searchParams }: TimePercentageEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <TimePercentageCalculator showTitle={false} primaryColor={color} />;
}

