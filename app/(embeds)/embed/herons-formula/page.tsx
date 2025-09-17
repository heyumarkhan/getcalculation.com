import HeronsFormulaCalculator from '@/app/_components/calculators/HeronsFormulaCalculator';

interface HeronsFormulaEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function HeronsFormulaEmbedPage({ searchParams }: HeronsFormulaEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#3399CC';
  
  return <HeronsFormulaCalculator showTitle={false} primaryColor={color} />;
}
