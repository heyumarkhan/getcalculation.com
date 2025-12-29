import PressureCalculator from '../../../../_components/calculators/PressureCalculator';

export default function PressureCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <PressureCalculator showTitle={false} />
      </div>
    </div>
  );
}

