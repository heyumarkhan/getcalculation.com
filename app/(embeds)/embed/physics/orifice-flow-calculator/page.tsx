import OrificeFlowCalculator from '../../../../_components/calculators/OrificeFlowCalculator';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';

export default function OrificeFlowCalculatorEmbed() {
  return (
    <EmbedLayout 
      title="Orifice Flow Calculator"
      description="Calculate orifice flow rate, pressure drop, or diameter using the orifice equation with discharge coefficient."
    >
      <OrificeFlowCalculator />
    </EmbedLayout>
  );
}
