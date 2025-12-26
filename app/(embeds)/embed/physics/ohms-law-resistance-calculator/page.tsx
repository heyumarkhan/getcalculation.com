import OhmsLawResistanceCalculator from '../../../../_components/calculators/OhmsLawResistanceCalculator';

export default function OhmsLawResistanceCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <OhmsLawResistanceCalculator showTitle={false} />
      </div>
    </div>
  );
}

