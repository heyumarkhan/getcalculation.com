import BTUToTonsConverter from '../../../../_components/calculators/BTUToTonsConverter';

export default function BTUToTonsConverterEmbedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <BTUToTonsConverter showTitle={false} />
      </div>
    </div>
  );
}

