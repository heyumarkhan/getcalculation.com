import { Metadata } from 'next';
import EmbedLayout from '@/app/(embeds)/layout';
import CutoffFrequencyCalculator from '@/app/_components/calculators/CutoffFrequencyCalculator';

export const metadata: Metadata = {
  title: 'Cutoff Frequency Calculator - Embed',
  description: 'Embedded cutoff frequency calculator for RC and RL filters.',
  robots: 'noindex, follow'
};

export default function CutoffFrequencyEmbed() {
  return (
    <EmbedLayout>
      <CutoffFrequencyCalculator showTitle={false} />
    </EmbedLayout>
  );
}
