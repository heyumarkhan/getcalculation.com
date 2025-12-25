import VolumeToMassCalculator from '../../../../_components/calculators/VolumeToMassCalculator';

export default function VolumeToMassCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <VolumeToMassCalculator showTitle={false} />
      </div>
    </div>
  );
}

