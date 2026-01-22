import CloudBaseCalculator from '../../../../_components/calculators/CloudBaseCalculator';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';

export const metadata = {
  title: 'Cloud Base Calculator (Embed)',
  description: 'Embed-ready cloud base calculator using temperature, dew point, humidity, or target base with outputs in meters and feet.',
  keywords: 'cloud base calculator embed, convective condensation level, CCL, cloud height, aviation ceilings'
};

export default function EmbeddedCloudBaseCalculatorPage() {
  return (
    <EmbedLayout title="Cloud Base Calculator">
      <CloudBaseCalculator />
    </EmbedLayout>
  );
}
