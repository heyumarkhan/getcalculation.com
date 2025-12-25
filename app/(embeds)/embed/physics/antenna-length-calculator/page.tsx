import AntennaLengthCalculator from '../../../../_components/calculators/AntennaLengthCalculator';

export default function AntennaLengthCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <AntennaLengthCalculator showTitle={false} />
      </div>
    </div>
  );
}

