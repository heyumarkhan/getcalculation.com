import OrificeFlowCalculator from '../../../../_components/calculators/OrificeFlowCalculator';
import EmbedLayout from '../../layout';

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
