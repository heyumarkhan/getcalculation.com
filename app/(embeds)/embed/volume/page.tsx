import VolumeCalculator from '@/app/_components/calculators/VolumeCalculator';

interface VolumeEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function VolumeEmbedPage({ searchParams }: VolumeEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || 'purple';
  
  return <VolumeCalculator showTitle={false} primaryColor={color} />;
}
