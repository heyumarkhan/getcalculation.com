import HydraulicRadiusCalculator from '../../../../_components/calculators/HydraulicRadiusCalculator';

export default function HydraulicRadiusCalculatorEmbedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <HydraulicRadiusCalculator showTitle={true} />
      </div>
    </div>
  );
}

