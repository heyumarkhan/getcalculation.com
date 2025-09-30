import LeastSquaresRegressionCalculator from '../../../../_components/calculators/LeastSquaresRegressionCalculator';

export default function LeastSquaresRegressionEmbedPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <LeastSquaresRegressionCalculator 
        showTitle={true}
        primaryColor="#3399CC"
      />
    </div>
  );
}
