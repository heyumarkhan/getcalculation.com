import DBGainCalculator from '../../../../_components/calculators/DBGainCalculator';

export default function DBGainCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <DBGainCalculator showTitle={false} />
      </div>
    </div>
  );
}

