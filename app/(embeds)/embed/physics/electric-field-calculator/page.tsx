import ElectricFieldCalculator from '@/_components/calculators/ElectricFieldCalculator';
import EmbedLayout from '@/(embeds)/layout';

export const metadata = {
  title: 'Electric Field Calculator',
  description: 'Calculate electric field strength using point charge, force, or voltage methods.',
};

export default function Page() {
  return (
    <EmbedLayout>
      <ElectricFieldCalculator />
    </EmbedLayout>
  );
}
