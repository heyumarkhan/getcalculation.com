import { Metadata } from 'next';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';
import GasDensityCalculator from '../../../../_components/calculators/GasDensityCalculator';

export const metadata: Metadata = {
  title: 'Gas Density Calculator - Embed',
  robots: 'noindex, nofollow'
};

export default function GasDensityCalculatorEmbed() {
  return (
    <EmbedLayout title="Gas Density Calculator">
      <GasDensityCalculator showTitle={false} />
    </EmbedLayout>
  );
}
