import PneumaticCylinderForceCalculator from '../../../../_components/calculators/PneumaticCylinderForceCalculator';

export default function PneumaticCylinderForceCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <PneumaticCylinderForceCalculator showTitle={false} />
      </div>
    </div>
  );
}

