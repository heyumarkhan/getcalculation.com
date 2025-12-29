import PolarMomentOfInertiaCalculator from '../../../../_components/calculators/PolarMomentOfInertiaCalculator';

export default function PolarMomentOfInertiaCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <PolarMomentOfInertiaCalculator showTitle={false} />
      </div>
    </div>
  );
}

