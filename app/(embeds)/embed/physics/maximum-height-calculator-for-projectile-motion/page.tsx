import MaximumHeightProjectileCalculator from '../../../../_components/calculators/MaximumHeightProjectileCalculator';

export default function MaximumHeightProjectileMotionCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <MaximumHeightProjectileCalculator showTitle={false} />
      </div>
    </div>
  );
}

