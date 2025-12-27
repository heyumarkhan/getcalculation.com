import WattsToAmpsCalculator from '../../../../_components/calculators/WattsToAmpsCalculator';

export default function WattsToAmpsCalculatorEmbedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <WattsToAmpsCalculator showTitle={false} />
      </div>
    </div>
  );
}

