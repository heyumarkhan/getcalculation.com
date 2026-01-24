import BendAllowanceCalculator from '../../../../_components/calculators/BendAllowanceCalculator';
import EmbedLayout from '../../../../layout';

export default function BendAllowanceCalculatorEmbed() {
  return (
    <EmbedLayout>
      <BendAllowanceCalculator showTitle={false} />
    </EmbedLayout>
  );
}
