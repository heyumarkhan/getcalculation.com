import SphereVolumeCalculator from '@/app/_components/calculators/SphereVolumeCalculator';

interface SphereVolumeEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function SphereVolumeEmbedPage({ searchParams }: SphereVolumeEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <SphereVolumeCalculator showTitle={false} primaryColor={color} />;
}

