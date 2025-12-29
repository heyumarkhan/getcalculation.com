import StandardCubicFeetPerMinuteCalculator from '../../../../_components/calculators/StandardCubicFeetPerMinuteCalculator';

export default function StandardCubicFeetPerMinuteCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <StandardCubicFeetPerMinuteCalculator showTitle={false} />
      </div>
    </div>
  );
}

