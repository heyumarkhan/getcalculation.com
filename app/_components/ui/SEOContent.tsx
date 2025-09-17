import React from 'react';

interface SEOContentProps {
  children: React.ReactNode;
  className?: string;
}

export function SEOContent({ children, className = '' }: SEOContentProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      {children}
    </div>
  );
}

export function SEOSection({ 
  title, 
  children, 
  className = '' 
}: { 
  title: string; 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <section className={`mb-8 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export function SEOList({ 
  items, 
  className = '' 
}: { 
  items: string[]; 
  className?: string; 
}) {
  return (
    <ul className={`list-disc list-inside space-y-2 text-gray-700 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function SEOFormula({ 
  formula, 
  description, 
  className = '' 
}: { 
  formula: string; 
  description?: string; 
  className?: string; 
}) {
  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-6 my-6 ${className}`}>
      <div className="text-center">
        <div className="text-2xl font-mono font-bold text-gray-900 mb-2">
          {formula}
        </div>
        {description && (
          <p className="text-gray-600 text-sm">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export function SEOExample({ 
  title, 
  description, 
  calculation, 
  result, 
  className = '' 
}: { 
  title: string; 
  description: string; 
  calculation: string; 
  result: string; 
  className?: string; 
}) {
  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-6 my-6 ${className}`}>
      <h4 className="text-lg font-semibold text-blue-900 mb-2">{title}</h4>
      <p className="text-blue-800 mb-3">{description}</p>
      <div className="bg-white rounded p-4 border border-blue-100">
        <div className="font-mono text-sm text-gray-700">
          <div className="mb-2"><strong>Calculation:</strong> {calculation}</div>
          <div><strong>Result:</strong> {result}</div>
        </div>
      </div>
    </div>
  );
}
