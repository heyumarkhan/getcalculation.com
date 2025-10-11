import PercentageCalculator from '../../../../_components/calculators/PercentageCalculator';

export default function EmbedPercentagePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12">
      <PercentageCalculator showTitle={false} />
    </div>
  );
}
