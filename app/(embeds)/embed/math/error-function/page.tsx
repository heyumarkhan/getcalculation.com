import ErrorFunctionCalculator from '@/app/_components/calculators/ErrorFunctionCalculator';

interface ErrorFunctionEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function ErrorFunctionEmbedPage({ searchParams }: ErrorFunctionEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#820ECC';
  
  return <ErrorFunctionCalculator showTitle={false} primaryColor={color} />;
}

