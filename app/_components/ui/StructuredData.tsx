import React from 'react';

interface StructuredDataProps {
  type: 'calculator' | 'howto' | 'faq';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'calculator':
        return {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": data.name,
          "description": data.description,
          "url": data.url,
          "applicationCategory": "CalculatorApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": data.features || [],
          "screenshot": data.screenshot || "",
          "author": {
            "@type": "Organization",
            "name": "GetCalculation.com"
          }
        };
      
      case 'howto':
        return {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": data.name,
          "description": data.description,
          "image": data.image || "",
          "totalTime": data.totalTime || "",
          "supply": data.supplies || [],
          "tool": data.tools || [],
          "step": data.steps || []
        };
      
      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.questions?.map((q: any) => ({
            "@type": "Question",
            "name": q.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": q.answer
            }
          })) || []
        };
      
      default:
        return {};
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData(), null, 2)
      }}
    />
  );
}

// Helper function to generate calculator structured data
export function generateCalculatorStructuredData({
  name,
  description,
  url,
  features = [],
  screenshot = ""
}: {
  name: string;
  description: string;
  url: string;
  features?: string[];
  screenshot?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": "CalculatorApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": features,
    "screenshot": screenshot,
    "author": {
      "@type": "Organization",
      "name": "GetCalculation.com"
    }
  };
}

// Helper function to generate FAQ structured data
export function generateFAQStructuredData(questions: Array<{question: string, answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };
}
