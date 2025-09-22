import React from 'react';
import Link from 'next/link';

interface SEOInternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export default function SEOInternalLink({ 
  href, 
  children, 
  className = "text-blue-600 hover:text-blue-800 underline",
  title 
}: SEOInternalLinkProps) {
  return (
    <Link 
      href={href} 
      className={className}
      title={title}
    >
      {children}
    </Link>
  );
}

// Predefined internal links for common calculator references
export const INTERNAL_LINKS = {
  area: { href: '/area', title: 'Area Calculator' },
  volume: { href: '/volume', title: 'Volume Calculator' },
  perimeter: { href: '/perimeter', title: 'Perimeter Calculator' },
  slope: { href: '/slope', title: 'Slope Calculator' },
  parabola: { href: '/parabola', title: 'Parabola Calculator' },
  diamondProblem: { href: '/diamond-problem', title: 'Diamond Problem Solver' },
  crossMultiplication: { href: '/cross-multiplication', title: 'Cross Multiplication Calculator' },
  heronsFormula: { href: '/herons-formula', title: 'Heron\'s Formula Calculator' },
  similarTriangles: { href: '/similar-triangles', title: 'Similar Triangles Calculator' },
  lineSegment: { href: '/line-segment-length', title: 'Line Segment Length Calculator' },
  midpoint: { href: '/midpoint', title: 'Midpoint Calculator' },
  triangularPrism: { href: '/triangular-prism-surface-area', title: 'Triangular Prism Surface Area Calculator' },
  standardForm: { href: '/standard-form-to-slope-intercept', title: 'Standard Form to Slope Intercept Calculator' }
} as const;

// Helper function to create internal links
export function createInternalLink(key: keyof typeof INTERNAL_LINKS, text?: string) {
  const link = INTERNAL_LINKS[key];
  return (
    <SEOInternalLink href={link.href} title={link.title}>
      {text || link.title}
    </SEOInternalLink>
  );
}
