import ACWattageCalculator from '../../../../_components/calculators/ACWattageCalculator';
import EmbedLayout from '../../layout';

export default function ACWattageCalculatorEmbed() {
  return (
    <EmbedLayout 
      title="AC Wattage Calculator"
      description="Calculate AC wattage, voltage, current, and power factor for single-phase and three-phase systems."
    >
      <ACWattageCalculator />
    </EmbedLayout>
  );
}
