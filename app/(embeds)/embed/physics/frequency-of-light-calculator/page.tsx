import FrequencyOfLightCalculator from '@/app/_components/calculators/FrequencyOfLightCalculator';
import EmbedLayout from '@/app/(embeds)/layout';

export default function FrequencyOfLightEmbedPage() {
  return (
    <EmbedLayout>
      <FrequencyOfLightCalculator showTitle={false} />
    </EmbedLayout>
  );
}
