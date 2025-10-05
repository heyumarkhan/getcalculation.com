import React from 'react';
import CopyIframeButton from '../ui/CopyIframeButton';
import { generateCalculatorStructuredData } from '../ui/StructuredData';
import RelatedCalculators, { getRelatedCalculators } from '../ui/RelatedCalculators';
import Breadcrumb, { generateCalculatorBreadcrumb } from '../ui/Breadcrumb';

interface CalculatorPageTemplateProps {
  title: string;
  description: string;
  calculator: React.ReactNode;
  slug: string;
  children: React.ReactNode; // SEO content sections
  category?: string; // For related calculators
  features?: string[]; // For structured data
  showRelatedCalculators?: boolean;
}

export default function CalculatorPageTemplate({
  title,
  description,
  calculator,
  slug,
  children,
  category,
  features = [],
  showRelatedCalculators = true
}: CalculatorPageTemplateProps) {
  // Generate structured data
  const structuredData = generateCalculatorStructuredData({
    name: title,
    description: description,
    url: `https://getcalculation.com/${slug}`,
    features: features.length > 0 ? features : [
      "Instant calculations",
      "Step-by-step solutions", 
      "Mobile-friendly interface",
      "No registration required",
      "Free to use"
    ]
  });

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2)
        }}
      />
      
      <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={generateCalculatorBreadcrumb(title, category)} />
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Section - Full Width */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto">
            {calculator}
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Embed This Calculator
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Copy the code below to embed this calculator on your website
                </p>
                <CopyIframeButton slug={slug} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          {children}
          
          {/* Related Calculators */}
          {showRelatedCalculators && (
            <RelatedCalculators
              currentSlug={slug}
              calculators={getRelatedCalculators(slug, category, 6)}
              title="Related Calculators"
            />
          )}
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Why Choose Our Calculator?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                <p className="text-gray-600">Get instant results with our optimized calculation engine</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Accurate</h3>
                <p className="text-gray-600">Precise calculations you can trust for any project</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
                <p className="text-gray-600">Works perfectly on all devices and screen sizes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}





