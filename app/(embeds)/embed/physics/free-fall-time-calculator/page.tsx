import { Metadata } from 'next';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';
import FreeFallTimeCalculator from '../../../../_components/calculators/FreeFallTimeCalculator';

export const metadata: Metadata = {
  title: 'Free Fall Time Calculator - Embed',
  robots: 'noindex, nofollow'
};

export default function FreeFallTimeCalculatorEmbed() {
  return (
    <EmbedLayout title="Free Fall Time Calculator">
      <FreeFallTimeCalculator showTitle={false} />
    </EmbedLayout>
  );
}
