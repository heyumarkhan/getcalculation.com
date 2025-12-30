import OvertimeCalculator from '../../../../_components/calculators/OvertimeCalculator';

interface OvertimeCalculatorEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function OvertimeCalculatorEmbedPage({ searchParams }: OvertimeCalculatorEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <OvertimeCalculator showTitle={false} primaryColor={color} />;
}

