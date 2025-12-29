import SoundWavelengthCalculator from '../../../../_components/calculators/SoundWavelengthCalculator';

export default function SoundWavelengthCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <SoundWavelengthCalculator showTitle={false} />
      </div>
    </div>
  );
}

