import { Metadata } from 'next';
import EmbedLayout from '@/app/(embeds)/layout';
import SkinDepthCalculator from '@/app/_components/calculators/SkinDepthCalculator';

export const metadata: Metadata = {
  title: 'Skin Depth Calculator - Embed',
  description: 'Embedded skin depth calculator for electromagnetic wave penetration in conductors.',
  robots: 'noindex, follow'
};

export default function SkinDepthEmbed() {
  return (
    <EmbedLayout>
      <SkinDepthCalculator showTitle={false} />
    </EmbedLayout>
  );
}
