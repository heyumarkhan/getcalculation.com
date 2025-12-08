import OctagonCalculator from '@/app/_components/calculators/OctagonCalculator';

interface OctagonEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function OctagonEmbedPage({ searchParams }: OctagonEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <OctagonCalculator showTitle={false} primaryColor={color} />;
}

