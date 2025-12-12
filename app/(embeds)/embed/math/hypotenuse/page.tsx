import HypotenuseCalculator from '@/app/_components/calculators/HypotenuseCalculator';

interface HypotenuseEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function HypotenuseEmbedPage({ searchParams }: HypotenuseEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <HypotenuseCalculator showTitle={false} primaryColor={color} />;
}

