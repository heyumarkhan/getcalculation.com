import LogCalculator from '@/app/_components/calculators/LogCalculator';

interface LogEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function LogEmbedPage({ searchParams }: LogEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <LogCalculator showTitle={false} primaryColor={color} />;
}

