import NewtonsLawOfCoolingCalculator from '../../../../_components/calculators/NewtonsLawOfCoolingCalculator';

export default function NewtonsLawOfCoolingCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <NewtonsLawOfCoolingCalculator showTitle={false} />
      </div>
    </div>
  );
}

