import CylinderVolumeCalculator from '@/app/_components/calculators/CylinderVolumeCalculator';

interface CylinderVolumeEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function CylinderVolumeEmbedPage({ searchParams }: CylinderVolumeEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <CylinderVolumeCalculator showTitle={false} primaryColor={color} />;
}

