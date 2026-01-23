import SpeedsAndFeedsCalculator from '../../../../_components/calculators/SpeedsAndFeedsCalculator';
import EmbedLayout from '../../layout';

export default function SpeedsAndFeedsEmbed() {
  return (
    <EmbedLayout 
      title="Speeds and Feeds Calculator"
      description="Compute RPM, feed rate, chip load, and cutting speed (metric & imperial)."
    >
      <SpeedsAndFeedsCalculator />
    </EmbedLayout>
  );
}
