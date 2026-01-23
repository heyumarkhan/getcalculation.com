import MassMomentOfInertiaCalculator from '../../../../_components/calculators/MassMomentOfInertiaCalculator';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mass Moment of Inertia Calculator',
  description: 'Calculate rotational inertia for geometric shapes.',
  robots: 'noindex, nofollow',
};

export default function MassMomentOfInertiaEmbedPage() {
  return (
    <EmbedLayout title="Mass Moment of Inertia Calculator">
      <MassMomentOfInertiaCalculator />
    </EmbedLayout>
  );
}
