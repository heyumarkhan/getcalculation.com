import SchwarzschildRadiusCalculator from '../../../../_components/calculators/SchwarzschildRadiusCalculator';

export default function SchwarzschildRadiusCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <SchwarzschildRadiusCalculator showTitle={false} />
      </div>
    </div>
  );
}

