import { Metadata } from 'next';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';
import CapacitorsInSeriesCalculator from '../../../../_components/calculators/CapacitorsInSeriesCalculator';

export const metadata: Metadata = {
  title: 'Capacitors in Series Calculator - Embed',
  robots: 'noindex, nofollow'
};

export default function CapacitorsInSeriesCalculatorEmbed() {
  return (
    <EmbedLayout title="Capacitors in Series Calculator">
      <CapacitorsInSeriesCalculator />
    </EmbedLayout>
  );
}
