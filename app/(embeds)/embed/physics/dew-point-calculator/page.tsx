import DewPointCalculator from '../../../../_components/calculators/DewPointCalculator';

export default function DewPointCalculatorEmbedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <DewPointCalculator showTitle={true} />
      </div>
    </div>
  );
}

