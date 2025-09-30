import VolumeOfHemisphereCalculator from '@/app/_components/calculators/VolumeOfHemisphereCalculator';

interface VolumeOfHemisphereEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function VolumeOfHemisphereEmbedPage({ searchParams }: VolumeOfHemisphereEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#3399CC';
  
  return <VolumeOfHemisphereCalculator showTitle={false} primaryColor={color} />;
}
