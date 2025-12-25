import CentrifugalForceCalculator from '../../../../_components/calculators/CentrifugalForceCalculator';

export default function CentrifugalForceCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <CentrifugalForceCalculator showTitle={false} />
      </div>
    </div>
  );
}

