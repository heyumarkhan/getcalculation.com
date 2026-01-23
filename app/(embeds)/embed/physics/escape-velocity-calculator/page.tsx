import EscapeVelocityCalculator from '../../../../_components/calculators/EscapeVelocityCalculator';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Escape Velocity Calculator',
  description: 'Calculate escape velocity for planets and celestial bodies.',
  robots: 'noindex, nofollow',
};

export default function EscapeVelocityEmbedPage() {
  return (
    <EmbedLayout title="Escape Velocity Calculator">
      <EscapeVelocityCalculator />
    </EmbedLayout>
  );
}
