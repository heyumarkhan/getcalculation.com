import ThermalExpansionCalculator from '../../../../_components/calculators/ThermalExpansionCalculator';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thermal Expansion Calculator',
  description: 'Calculate thermal expansion for solids and liquids.',
  robots: 'noindex, nofollow',
};

export default function ThermalExpansionEmbedPage() {
  return (
    <EmbedLayout title="Thermal Expansion Calculator">
      <ThermalExpansionCalculator />
    </EmbedLayout>
  );
}
