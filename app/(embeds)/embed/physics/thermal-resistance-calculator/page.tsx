import ThermalResistanceCalculator from '../../../../_components/calculators/ThermalResistanceCalculator';
import EmbedLayout from '../../../layout';

export default function ThermalResistanceCalculatorEmbed() {
  return (
    <EmbedLayout>
      <ThermalResistanceCalculator showTitle={false} />
    </EmbedLayout>
  );
}
