import SignificantFiguresCalculator from '@/app/_components/calculators/SignificantFiguresCalculator';

interface SignificantFiguresEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function SignificantFiguresEmbedPage({ searchParams }: SignificantFiguresEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#F59E0B';
  
  return <SignificantFiguresCalculator showTitle={false} primaryColor={color} />;
}
