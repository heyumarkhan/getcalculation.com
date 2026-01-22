import RCFilterCalculator from '../../../../_components/calculators/RCFilterCalculator';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';

export const metadata = {
  title: 'RC Filter Calculator (Embed)',
  description: 'Embed-ready RC filter calculator for cutoff frequency, impedance, and time constant calculations.',
  keywords: 'RC filter calculator embed, cutoff frequency, low pass filter, capacitive reactance'
};

export default function EmbeddedRCFilterCalculatorPage() {
  return (
    <EmbedLayout title="RC Filter Calculator">
      <RCFilterCalculator />
    </EmbedLayout>
  );
}
