import WindLoadCalculator from '../../../../_components/calculators/WindLoadCalculator';

export default function WindLoadCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <WindLoadCalculator showTitle={false} />
      </div>
    </div>
  );
}

