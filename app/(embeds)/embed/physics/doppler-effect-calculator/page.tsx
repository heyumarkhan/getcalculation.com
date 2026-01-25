import DopplerEffectCalculator from '../../../../_components/calculators/DopplerEffectCalculator';
import EmbedLayout from '../../../layout';

export default function DopplerEffectCalculatorEmbed() {
  return (
    <EmbedLayout>
      <DopplerEffectCalculator showTitle={false} />
    </EmbedLayout>
  );
}
