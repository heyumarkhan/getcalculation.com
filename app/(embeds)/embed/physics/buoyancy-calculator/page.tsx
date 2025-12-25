import BuoyancyCalculator from '../../../../_components/calculators/BuoyancyCalculator';

export default function BuoyancyCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <BuoyancyCalculator showTitle={false} />
      </div>
    </div>
  );
}

