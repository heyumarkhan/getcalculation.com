import OrbitalPeriodCalculator from '../../../../_components/calculators/OrbitalPeriodCalculator';

export default function OrbitalPeriodCalculatorEmbedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <OrbitalPeriodCalculator showTitle={true} />
      </div>
    </div>
  );
}

