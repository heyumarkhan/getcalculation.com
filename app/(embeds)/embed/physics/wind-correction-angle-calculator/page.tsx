import { Metadata } from 'next';
import EmbedLayout from '@/app/(embeds)/layout';
import WindCorrectionAngleCalculator from '@/app/_components/calculators/WindCorrectionAngleCalculator';

export const metadata: Metadata = {
  title: 'Wind Correction Angle Calculator - Embed',
  description: 'Embedded wind correction angle calculator with heading and ground speed.',
  robots: 'noindex, follow'
};

export default function WindCorrectionAngleEmbed() {
  return (
    <EmbedLayout>
      <WindCorrectionAngleCalculator showTitle={false} />
    </EmbedLayout>
  );
}
