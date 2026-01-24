import AngularFrequencyCalculator from '@/app/_components/calculators/AngularFrequencyCalculator';
import EmbedLayout from '@/app/(embeds)/layout';

export default function AngularFrequencyEmbedPage() {
  return (
    <EmbedLayout>
      <AngularFrequencyCalculator showTitle={false} />
    </EmbedLayout>
  );
}
