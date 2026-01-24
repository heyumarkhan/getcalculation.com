import { Metadata } from 'next';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';
import DistanceAttenuationCalculator from '../../../../_components/calculators/DistanceAttenuationCalculator';

export const metadata: Metadata = {
  title: 'Distance Attenuation Calculator - Embed',
  robots: 'noindex, nofollow'
};

export default function DistanceAttenuationCalculatorEmbed() {
  return (
    <EmbedLayout title="Distance Attenuation Calculator">
      <DistanceAttenuationCalculator />
    </EmbedLayout>
  );
}
