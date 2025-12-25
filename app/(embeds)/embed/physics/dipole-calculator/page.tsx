import DipoleCalculator from '../../../../_components/calculators/DipoleCalculator';

export default function DipoleCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <DipoleCalculator showTitle={false} />
      </div>
    </div>
  );
}

