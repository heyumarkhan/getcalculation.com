import EngineDisplacementCalculator from '../../../../_components/calculators/EngineDisplacementCalculator';

export default function EngineDisplacementCalculatorEmbedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <EngineDisplacementCalculator showTitle={false} />
      </div>
    </div>
  );
}

