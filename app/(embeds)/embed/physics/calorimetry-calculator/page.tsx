import CalorimetryCalculator from '../../../../_components/calculators/CalorimetryCalculator';

export default function CalorimetryCalculatorEmbedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <CalorimetryCalculator showTitle={true} />
      </div>
    </div>
  );
}

