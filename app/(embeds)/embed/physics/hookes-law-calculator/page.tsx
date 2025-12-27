import HookesLawCalculator from '../../../../_components/calculators/HookesLawCalculator';

export default function HookesLawCalculatorEmbedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <HookesLawCalculator showTitle={true} />
      </div>
    </div>
  );
}

