import SectionModulusCalculator from '../../../../_components/calculators/SectionModulusCalculator';

export default function SectionModulusCalculatorEmbedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <SectionModulusCalculator showTitle={false} />
      </div>
    </div>
  );
}

