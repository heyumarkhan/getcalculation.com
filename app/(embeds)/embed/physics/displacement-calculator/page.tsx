import DisplacementCalculator from '../../../../_components/calculators/DisplacementCalculator';

export default function DisplacementCalculatorEmbedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <DisplacementCalculator showTitle={false} />
      </div>
    </div>
  );
}

