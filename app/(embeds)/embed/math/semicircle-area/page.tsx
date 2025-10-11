import SemicircleAreaCalculator from '@/app/_components/calculators/SemicircleAreaCalculator';

interface SemicircleAreaEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function SemicircleAreaEmbedPage({ searchParams }: SemicircleAreaEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#3B82F6';
  
  return <SemicircleAreaCalculator showTitle={false} primaryColor={color} />;
}
