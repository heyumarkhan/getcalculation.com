import CapacitanceCalculator from '../../../../_components/calculators/CapacitanceCalculator';

export default function CapacitanceCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <CapacitanceCalculator showTitle={false} />
      </div>
    </div>
  );
}

