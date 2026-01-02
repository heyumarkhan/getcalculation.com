import SurfaceAreaCalculator from '@/app/_components/calculators/SurfaceAreaCalculator';

interface SurfaceAreaEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function SurfaceAreaEmbedPage({ searchParams }: SurfaceAreaEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <SurfaceAreaCalculator showTitle={false} primaryColor={color} />;
}

