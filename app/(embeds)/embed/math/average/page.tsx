import AverageCalculator from '../../../../_components/calculators/AverageCalculator';

export default function EmbedAveragePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12">
      <AverageCalculator showTitle={false} />
    </div>
  );
}
