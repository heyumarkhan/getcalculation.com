import WattCalculator from '../../../../_components/calculators/WattCalculator';

export default function WattCalculatorEmbedPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <WattCalculator 
        showTitle={true}
        primaryColor="#820ECC"
      />
    </div>
  );
}
