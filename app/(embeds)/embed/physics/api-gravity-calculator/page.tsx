import APIGravityCalculator from '../../../../_components/calculators/APIGravityCalculator';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';

export const metadata = {
  title: 'API Gravity Calculator (Embed)',
  description: 'Embed-ready API gravity calculator for calculating oil gravity, specific gravity, and petroleum density.',
  keywords: 'API gravity calculator embed, oil gravity, specific gravity, petroleum density, crude oil'
};

export default function EmbeddedAPIGravityCalculatorPage() {
  return (
    <EmbedLayout title="API Gravity Calculator">
      <APIGravityCalculator />
    </EmbedLayout>
  );
}
