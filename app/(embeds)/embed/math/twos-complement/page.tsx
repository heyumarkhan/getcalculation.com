import TwosComplementCalculator from '../../../../_components/calculators/TwosComplementCalculator';

export default function TwosComplementEmbedPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <TwosComplementCalculator 
        showTitle={true}
        primaryColor="#820ECC"
      />
    </div>
  );
}

