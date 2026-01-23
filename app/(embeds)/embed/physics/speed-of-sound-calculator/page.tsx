import SpeedOfSoundCalculator from '../../../../_components/calculators/SpeedOfSoundCalculator';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';

export const metadata = {
  title: 'Speed of Sound Calculator',
  description: 'Calculate speed of sound, Mach number, frequency, and wavelength in different mediums.',
};

export default function Page() {
  return (
    <EmbedLayout>
      <SpeedOfSoundCalculator />
    </EmbedLayout>
  );
}
