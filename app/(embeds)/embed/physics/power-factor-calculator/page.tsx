import PowerFactorCalculator from '../../../../_components/calculators/PowerFactorCalculator';

export default function PowerFactorCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <PowerFactorCalculator showTitle={false} />
      </div>
    </div>
  );
}

