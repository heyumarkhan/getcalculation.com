import VolumeCalculator from '@/app/_components/calculators/VolumeCalculator';

interface VolumeEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function VolumeEmbedPage({ searchParams }: VolumeEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#3399CC';
  
  return <VolumeCalculator showTitle={false} primaryColor={color} />;
}
