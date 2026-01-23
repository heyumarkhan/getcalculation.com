import { Metadata } from 'next';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';
import WireSize220VoltCalculator from '../../../../_components/calculators/WireSize220VoltCalculator';

export const metadata: Metadata = {
  title: '220 Volt Wire Size Calculator - Embed',
  robots: 'noindex, nofollow'
};

export default function Page() {
  return (
    <EmbedLayout title="220 Volt Wire Size Calculator">
      <WireSize220VoltCalculator />
    </EmbedLayout>
  );
}
