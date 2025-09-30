import React from 'react';
import Link from 'next/link';

interface Calculator {
  title: string;
  description: string;
  slug: string;
  category: string;
}

interface RelatedCalculatorsProps {
  currentSlug: string;
  calculators: Calculator[];
  title?: string;
}

export default function RelatedCalculators({ 
  currentSlug, 
  calculators, 
  title = "Related Calculators" 
}: RelatedCalculatorsProps) {
  // Filter out the current calculator and limit to 6
  const relatedCalculators = calculators
    .filter(calc => calc.slug !== currentSlug)
    .slice(0, 6);

  if (relatedCalculators.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relatedCalculators.map((calculator) => (
          <Link
            key={calculator.slug}
            href={`/${calculator.slug}`}
            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200"
          >
            <h4 className="font-medium text-gray-900 mb-2 hover:text-blue-600">
              {calculator.title}
            </h4>
            <p className="text-sm text-gray-600 line-clamp-2">
              {calculator.description}
            </p>
            <span className="inline-block mt-2 text-xs text-blue-600 font-medium">
              {calculator.category}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Predefined calculator data for easy use
export const CALCULATOR_DATA: Calculator[] = [
  {
    title: "Area Calculator",
    description: "Calculate the area of various geometric shapes including rectangles, triangles, circles, and more.",
    slug: "math/area",
    category: "Geometry"
  },
  {
    title: "Volume Calculator",
    description: "Find the volume of 3D shapes like rectangular prisms, cylinders, spheres, and triangular prisms.",
    slug: "math/volume",
    category: "Geometry"
  },
  {
    title: "Perimeter Calculator",
    description: "Calculate the perimeter of polygons and other geometric shapes quickly and accurately.",
    slug: "math/perimeter",
    category: "Geometry"
  },
  {
    title: "Slope Calculator",
    description: "Find the slope of a line using two points or from a linear equation in various forms.",
    slug: "math/slope",
    category: "Algebra"
  },
  {
    title: "Parabola Calculator",
    description: "Calculate parabola properties including vertex, focus, directrix, and axis of symmetry.",
    slug: "math/parabola",
    category: "Algebra"
  },
  {
    title: "Diamond Problem Solver",
    description: "Solve the classic diamond problem to find two numbers from their sum and product.",
    slug: "math/diamond-problem",
    category: "Algebra"
  },
  {
    title: "Cross Multiplication Calculator",
    description: "Solve proportions and ratios instantly using cross multiplication method.",
    slug: "math/cross-multiplication",
    category: "Algebra"
  },
  {
    title: "Heron's Formula Calculator",
    description: "Calculate triangle area using Heron's formula when you know all three side lengths.",
    slug: "math/herons-formula",
    category: "Geometry"
  },
  {
    title: "Similar Triangles Calculator",
    description: "Find missing sides and angles in similar triangles using proportional relationships.",
    slug: "math/similar-triangles",
    category: "Geometry"
  },
  {
    title: "Line Segment Length Calculator",
    description: "Calculate the distance between two points in 2D or 3D space using the distance formula.",
    slug: "math/line-segment-length",
    category: "Geometry"
  },
  {
    title: "Midpoint Calculator",
    description: "Find the midpoint of a line segment between two points in 2D or 3D space.",
    slug: "math/midpoint",
    category: "Geometry"
  },
  {
    title: "Triangular Prism Surface Area Calculator",
    description: "Calculate the surface area of triangular prisms with different base types.",
    slug: "math/triangular-prism-surface-area",
    category: "Geometry"
  },
  {
    title: "Standard Form to Slope Intercept Calculator",
    description: "Convert linear equations from standard form to slope-intercept form instantly.",
    slug: "math/standard-form-to-slope-intercept",
    category: "Algebra"
  }
];

// Helper function to get related calculators by category
export function getRelatedCalculators(currentSlug: string, category?: string, limit: number = 6): Calculator[] {
  let filtered = CALCULATOR_DATA.filter(calc => calc.slug !== currentSlug);
  
  if (category) {
    filtered = filtered.filter(calc => calc.category === category);
  }
  
  return filtered.slice(0, limit);
}
