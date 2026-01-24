import { Metadata } from 'next';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';
import RadarHorizonCalculator from '../../../../_components/calculators/RadarHorizonCalculator';

export const metadata: Metadata = {
  title: 'Radar Horizon Calculator - Embed',
  robots: 'noindex, nofollow'
};

export default function RadarHorizonCalculatorEmbed() {
  return (
    <EmbedLayout title="Radar Horizon Calculator">
      <RadarHorizonCalculator showTitle={false} />
    </EmbedLayout>
  );
}
