import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-[#820ECC]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-sm font-medium text-gray-500">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Helper function to generate breadcrumb for calculator pages
export function generateCalculatorBreadcrumb(calculatorName: string, category?: string) {
  const items: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ];
  
  // Determine the subject based on the category
  let subject = 'Math'; // Default to Math
  let subjectHref = '/math';
  
  if (category) {
    // Map categories to subjects - easily extensible for future categories
    const categoryToSubject: { [key: string]: { subject: string; href: string } } = {
      // Math Categories
      'Geometry': { subject: 'Math', href: '/math' },
      'Algebra': { subject: 'Math', href: '/math' },
      'Statistics': { subject: 'Math', href: '/math' },
      'Calculus': { subject: 'Math', href: '/math' },
      'Combinatorics': { subject: 'Math', href: '/math' },
      'Trigonometry': { subject: 'Math', href: '/math' },
      
      // Physics Categories
      'Kinematics': { subject: 'Physics', href: '/physics' },
      'Mechanics': { subject: 'Physics', href: '/physics' },
      'Thermodynamics': { subject: 'Physics', href: '/physics' },
      'Electromagnetism': { subject: 'Physics', href: '/physics' },
      'Optics': { subject: 'Physics', href: '/physics' },
      'Quantum Mechanics': { subject: 'Physics', href: '/physics' },
      'Waves': { subject: 'Physics', href: '/physics' },
      'Fluid Mechanics': { subject: 'Physics', href: '/physics' },
      
      // Future Categories - easily add new subjects here
      'Chemistry': { subject: 'Chemistry', href: '/chemistry' },
      'Biology': { subject: 'Biology', href: '/biology' },
      'Engineering': { subject: 'Engineering', href: '/engineering' },
      'Finance': { subject: 'Finance', href: '/finance' },
      'Computer Science': { subject: 'Computer Science', href: '/computer-science' }
    };
    
    const subjectInfo = categoryToSubject[category] || { subject: 'Math', href: '/math' };
    subject = subjectInfo.subject;
    subjectHref = subjectInfo.href;
  }
  
  items.push({ label: subject, href: subjectHref });
  items.push({ label: calculatorName });
  
  return items;
}
