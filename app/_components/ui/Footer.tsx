import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F5] border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-600 text-sm">
            © {new Date().getFullYear()} GetCalculation. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <Link 
              href="/about-us" 
              className="text-gray-600 hover:text-[#820ECC] transition-colors"
            >
              About Us
            </Link>
            <Link 
              href="/privacy-policy" 
              className="text-gray-600 hover:text-[#820ECC] transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

