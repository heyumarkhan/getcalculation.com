import { Metadata } from 'next';
import EmbedLayout from '@/app/(embeds)/layout';
import ProjectileRangeCalculator from '@/app/_components/calculators/ProjectileRangeCalculator';

export const metadata: Metadata = {
  title: 'Projectile Range Calculator - Embed',
  description: 'Embedded projectile range calculator for distance, flight time, and peak height.',
  robots: 'noindex, follow'
};

export default function ProjectileRangeEmbed() {
  return (
    <EmbedLayout>
      <ProjectileRangeCalculator showTitle={false} />
    </EmbedLayout>
  );
}
