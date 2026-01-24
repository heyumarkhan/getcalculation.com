import { Metadata } from 'next';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';
import VoltToElectronVoltCalculator from '../../../../_components/calculators/VoltToElectronVoltCalculator';

export const metadata: Metadata = {
  title: 'Volt to Electron Volt Calculator - Embed',
  robots: 'noindex, nofollow'
};

export default function VoltToElectronVoltCalculatorEmbed() {
  return (
    <EmbedLayout title="Volt to Electron Volt Calculator">
      <VoltToElectronVoltCalculator showTitle={false} />
    </EmbedLayout>
  );
}
