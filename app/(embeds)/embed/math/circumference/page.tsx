import CircumferenceCalculator from '@/app/_components/calculators/CircumferenceCalculator';

interface CircumferenceEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function CircumferenceEmbedPage({ searchParams }: CircumferenceEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <CircumferenceCalculator showTitle={false} primaryColor={color} />;
}

