import DecimalToPercentCalculator from '../../../../_components/calculators/DecimalToPercentCalculator';

export default function EmbedDecimalToPercentPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12">
      <DecimalToPercentCalculator showTitle={false} />
    </div>
  );
}
