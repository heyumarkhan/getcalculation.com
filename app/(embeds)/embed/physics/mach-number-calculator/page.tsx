import MachNumberCalculator from '../../../../_components/calculators/MachNumberCalculator';

export default function MachNumberCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <MachNumberCalculator showTitle={false} />
      </div>
    </div>
  );
}

