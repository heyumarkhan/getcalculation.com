import BernoulliEquationCalculator from '../../../../_components/calculators/BernoulliEquationCalculator';
import EmbedLayout from '../../../../_components/layouts/EmbedLayout';

export const metadata = {
  title: 'Bernoulli Equation Calculator',
  description: 'Calculate pressure, velocity, and height using Bernoulli equation for fluid dynamics.',
};

export default function Page() {
  return (
    <EmbedLayout>
      <BernoulliEquationCalculator />
    </EmbedLayout>
  );
}
