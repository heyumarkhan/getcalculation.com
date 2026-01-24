import { Metadata } from 'next';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';
import CapacitorCalculator from '../../../../_components/calculators/CapacitorCalculator';

export const metadata: Metadata = {
  title: 'Capacitor Calculator - Embed',
  robots: 'noindex, nofollow'
};

export default function CapacitorCalculatorEmbed() {
  return (
    <EmbedLayout title="Capacitor Calculator">
      <CapacitorCalculator />
    </EmbedLayout>
  );
}
