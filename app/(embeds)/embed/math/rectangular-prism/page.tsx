import RectangularPrismCalculator from '@/app/_components/calculators/RectangularPrismCalculator';

interface RectangularPrismEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function RectangularPrismEmbedPage({ searchParams }: RectangularPrismEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <RectangularPrismCalculator showTitle={false} primaryColor={color} />;
}

