import RelativeHumidityCalculator from '../../../../_components/calculators/RelativeHumidityCalculator';

export default function RelativeHumidityCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <RelativeHumidityCalculator />
      </div>
    </div>
  );
}

