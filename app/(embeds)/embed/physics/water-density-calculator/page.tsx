import WaterDensityCalculator from '../../../../_components/calculators/WaterDensityCalculator';

export default function WaterDensityCalculatorEmbedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <WaterDensityCalculator showTitle={false} />
      </div>
    </div>
  );
}

