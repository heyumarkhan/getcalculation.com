import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-[#F5F5F5] shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="GetCalculation Logo"
                  width={200}
                  height={50}
                  className="h-10 w-auto"
                  priority
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
