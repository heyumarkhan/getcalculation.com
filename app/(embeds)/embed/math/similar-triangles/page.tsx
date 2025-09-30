import SimilarTrianglesCalculator from '@/app/_components/calculators/SimilarTrianglesCalculator';

interface SimilarTrianglesEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function SimilarTrianglesEmbedPage({ searchParams }: SimilarTrianglesEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#3399CC';
  
  return <SimilarTrianglesCalculator showTitle={false} primaryColor={color} />;
}
