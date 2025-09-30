import BinomialCoefficientCalculator from '../../../../_components/calculators/BinomialCoefficientCalculator';

export default function BinomialCoefficientEmbedPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <BinomialCoefficientCalculator 
        showTitle={true}
        primaryColor="#3399CC"
      />
    </div>
  );
}
