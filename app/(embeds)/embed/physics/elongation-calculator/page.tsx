import ElongationCalculator from '../../../../_components/calculators/ElongationCalculator';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';

export const metadata = {
  title: 'Elongation Calculator (Embed)',
  description: 'Embed-ready elongation calculator for calculating strain, elongation, and material deformation.',
  keywords: 'elongation calculator embed, strain calculator, material elongation, elongation percentage'
};

export default function EmbeddedElongationCalculatorPage() {
  return (
    <EmbedLayout title="Elongation Calculator">
      <ElongationCalculator />
    </EmbedLayout>
  );
}
