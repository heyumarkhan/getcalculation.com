import VonMisesStressCalculator from '../../../../_components/calculators/VonMisesStressCalculator';
import EmbedLayout from '../../../layout';

export default function VonMisesStressCalculatorEmbed() {
  return (
    <EmbedLayout>
      <VonMisesStressCalculator showTitle={false} />
    </EmbedLayout>
  );
}
