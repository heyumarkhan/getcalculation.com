import SinhCalculator from '@/app/_components/calculators/SinhCalculator';

interface SinhEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function SinhEmbedPage({ searchParams }: SinhEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <SinhCalculator showTitle={false} primaryColor={color} />;
}

