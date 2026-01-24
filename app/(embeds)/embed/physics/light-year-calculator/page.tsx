import LightYearCalculator from '../../../../_components/calculators/LightYearCalculator';
import EmbedLayout from '../../layout';

export default function LightYearCalculatorEmbed() {
  return (
    <EmbedLayout>
      <LightYearCalculator showTitle={false} />
    </EmbedLayout>
  );
}
