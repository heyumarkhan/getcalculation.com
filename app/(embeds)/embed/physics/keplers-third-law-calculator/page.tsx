import KeplersThirdLawCalculator from '../../../../_components/calculators/KeplersThirdLawCalculator';

export default function KeplersThirdLawCalculatorEmbedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <KeplersThirdLawCalculator showTitle={false} />
      </div>
    </div>
  );
}

