import { Metadata } from 'next';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';
import EEqualsMc2Calculator from '../../../../_components/calculators/EEqualsMc2Calculator';

export const metadata: Metadata = {
  title: 'E = mc^2 Calculator - Embed',
  robots: 'noindex, nofollow'
};

export default function EMC2CalculatorEmbed() {
  return (
    <EmbedLayout title="E = mc^2 Calculator">
      <EEqualsMc2Calculator showTitle={false} />
    </EmbedLayout>
  );
}
