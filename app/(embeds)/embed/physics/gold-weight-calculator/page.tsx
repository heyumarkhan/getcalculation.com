import { Metadata } from 'next';
import EmbedLayout from '@/app/(embeds)/layout';
import GoldWeightCalculator from '@/app/_components/calculators/GoldWeightCalculator';

export const metadata: Metadata = {
  title: 'Gold Weight Calculator - Embed',
  description: 'Embedded gold weight calculator with karat and unit conversions.',
  robots: 'noindex, follow'
};

export default function GoldWeightEmbed() {
  return (
    <EmbedLayout>
      <GoldWeightCalculator showTitle={false} />
    </EmbedLayout>
  );
}
