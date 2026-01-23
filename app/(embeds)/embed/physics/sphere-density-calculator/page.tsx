import SphereDensityCalculator from '../../../../_components/calculators/SphereDensityCalculator';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';

export const metadata = {
  title: 'Sphere Density Calculator (Embed)',
  description: 'Embed-ready sphere density calculator for calculating sphere density, mass, radius, and volume.',
  keywords: 'sphere density calculator embed, density of sphere, sphere mass calculator, sphere volume calculator'
};

export default function EmbeddedSphereDensityCalculatorPage() {
  return (
    <EmbedLayout title="Sphere Density Calculator">
      <SphereDensityCalculator />
    </EmbedLayout>
  );
}
