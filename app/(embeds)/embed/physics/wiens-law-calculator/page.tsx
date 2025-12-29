import WiensLawCalculator from '../../../../_components/calculators/WiensLawCalculator';

export default function WiensLawCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <WiensLawCalculator showTitle={false} />
      </div>
    </div>
  );
}

