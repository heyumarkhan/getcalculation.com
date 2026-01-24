import { Metadata } from 'next';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';
import AirPressureAtAltitudeCalculator from '../../../../_components/calculators/AirPressureAtAltitudeCalculator';

export const metadata: Metadata = {
  title: 'Air Pressure at Altitude Calculator - Embed',
  robots: 'noindex, nofollow'
};

export default function AirPressureAtAltitudeCalculatorEmbed() {
  return (
    <EmbedLayout title="Air Pressure at Altitude Calculator">
      <AirPressureAtAltitudeCalculator />
    </EmbedLayout>
  );
}
