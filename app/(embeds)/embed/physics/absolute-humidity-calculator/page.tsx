import AbsoluteHumidityCalculator from '../../../../_components/calculators/AbsoluteHumidityCalculator';

export default function AbsoluteHumidityCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <AbsoluteHumidityCalculator showTitle={false} />
      </div>
    </div>
  );
}

