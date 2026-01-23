import CubeDensityCalculator from '../../../../_components/calculators/CubeDensityCalculator';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';

export const metadata = {
  title: 'Cube Density Calculator',
  description: 'Calculate cube density, mass, or side length using ρ = m/s³ formula.',
};

export default function Page() {
  return (
    <EmbedLayout>
      <CubeDensityCalculator />
    </EmbedLayout>
  );
}
