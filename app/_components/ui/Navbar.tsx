import Link from 'next/link';
import Image from 'next/image';

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
              <div className="flex items-center gap-3">
                <Image
                  src="/logo-icon.png"
                  alt="GetCalculation Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                  priority
                />
                <div className="font-bold text-2xl">
                  <span style={{ color: '#820ecc' }}>Get</span>
                  <span style={{ color: '#820ecc' }}>Calculation</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
