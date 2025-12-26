import MechanicalAdvantageCalculator from '../../../../_components/calculators/MechanicalAdvantageCalculator';

export default function MechanicalAdvantageCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <MechanicalAdvantageCalculator showTitle={false} />
      </div>
    </div>
  );
}

