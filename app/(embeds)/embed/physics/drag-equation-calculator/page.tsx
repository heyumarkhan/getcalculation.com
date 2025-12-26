import DragEquationCalculator from '../../../../_components/calculators/DragEquationCalculator';

export default function DragEquationCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <DragEquationCalculator showTitle={false} />
      </div>
    </div>
  );
}

