import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <div className="font-bold text-2xl">
                <span className="text-blue-600">Get</span>
                <span className="text-green-600">Calculation</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
