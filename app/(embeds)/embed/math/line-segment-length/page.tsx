import LineSegmentCalculator from '@/app/_components/calculators/LineSegmentCalculator';

interface LineSegmentEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function LineSegmentEmbedPage({ searchParams }: LineSegmentEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#3399CC';
  
  return <LineSegmentCalculator showTitle={false} primaryColor={color} />;
}
