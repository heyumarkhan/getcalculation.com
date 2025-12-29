import LuminosityCalculator from '../../../../_components/calculators/LuminosityCalculator';

export default function LuminosityCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <LuminosityCalculator showTitle={false} />
      </div>
    </div>
  );
}

