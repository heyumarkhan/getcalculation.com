import HorizontalProjectileMotionCalculator from '../../../../_components/calculators/HorizontalProjectileMotionCalculator';

export default function HorizontalProjectileMotionCalculatorEmbedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <HorizontalProjectileMotionCalculator showTitle={true} />
      </div>
    </div>
  );
}

