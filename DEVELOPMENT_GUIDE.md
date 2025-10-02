# Development Guide: Adding New Calculators to GetCalculation.com

This guide provides step-by-step instructions for adding new calculators to the platform, including SEO optimization and proper integration with the existing architecture.

## 📋 Prerequisites

- Familiarity with React/Next.js
- Understanding of TypeScript
- Basic knowledge of SEO principles
- Access to the codebase

## 🏗️ Architecture Overview

The calculator system follows a modular architecture:

```
app/
├── _components/
│   ├── calculators/           # Calculator components
│   ├── data/                 # Calculator configuration
│   ├── layouts/              # Page templates
│   └── ui/                   # Reusable UI components
├── (calculators)/            # Main calculator pages
└── (embeds)/                 # Embeddable calculator pages
```

## 🚀 Step-by-Step Guide

### Step 1: Add Calculator to Configuration

**File:** `app/_components/data/calculators.ts`

Add your calculator to the `calculators` array:

```typescript
{
  id: 'your-calculator-id',
  name: 'Your Calculator Name',
  description: 'Brief description of what the calculator does',
  category: 'Geometry', // or 'Algebra', 'Statistics', etc.
  subject: 'math', // or 'physics'
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  href: '/math/your-calculator-id',
  embedHref: '/embed/math/your-calculator-id',
  icon: '🔢', // Choose appropriate emoji
  color: 'blue' // Choose from: blue, green, orange, purple, pink
}
```

### Step 2: Create Calculator Component

**File:** `app/_components/calculators/YourCalculatorNameCalculator.tsx`

```typescript
'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface YourCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function YourCalculator({ 
  showTitle = true, 
  primaryColor = '#3399CC' 
}: YourCalculatorProps) {
  // State management
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  // Calculation logic
  const calculate = () => {
    const val1 = parseFloat(input1) || 0;
    const val2 = parseFloat(input2) || 0;
    const calculatedResult = val1 + val2; // Replace with your formula
    setResult(calculatedResult);
  };

  // Color customization
  const getColorClasses = (color: string) => {
    const hexColor = color.startsWith('#') ? color : `#${color}`;
    
    return {
      customStyles: {
        button: {
          backgroundColor: hexColor,
          '--hover-color': hexColor,
          '--focus-color': hexColor
        } as React.CSSProperties,
        result: {
          color: hexColor
        } as React.CSSProperties,
        resultBg: {
          backgroundColor: `${hexColor}10`,
          borderColor: `${hexColor}30`
        } as React.CSSProperties
      }
    };
  };

  const colors = getColorClasses(primaryColor);

  return (
    <>
      {/* Custom color styles */}
      {colors.customStyles && (
        <style dangerouslySetInnerHTML={{
          __html: `
            .custom-color-button:hover {
              background-color: ${primaryColor}dd !important;
            }
            .custom-color-button:focus {
              box-shadow: 0 0 0 3px ${primaryColor}40 !important;
            }
          `
        }} />
      )}
      
      <Card className="max-w-md mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Calculator</h2>
            <p className="text-gray-600 mb-6">Enter values to calculate:</p>
          </>
        )}
      
        <div className="space-y-4">
          <Input
            label="Input 1"
            type="number"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            placeholder="Enter value"
            min="0"
            step="0.01"
          />

          <Input
            label="Input 2"
            type="number"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            placeholder="Enter value"
            min="0"
            step="0.01"
          />

          <Button 
            onClick={calculate}
            className={`w-full custom-color-button`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate
          </Button>

          {result !== null && (
            <div 
              className="mt-6 p-4 border rounded-md"
              style={colors.customStyles?.resultBg}
            >
              <h3 
                className="text-lg font-semibold"
                style={colors.customStyles?.result}
              >
                Result
              </h3>
              <p 
                className="text-2xl font-bold"
                style={colors.customStyles?.result}
              >
                {result}
              </p>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
```

### Step 3: Create Main Calculator Page

**File:** `app/(calculators)/math/your-calculator-id/page.tsx`

```typescript
import YourCalculator from '../../../_components/calculators/YourCalculatorNameCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function YourCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Your Calculator: Complete Guide with Examples"
      description="Learn how to use our calculator with step-by-step examples, formulas, and practical applications. Free online tool with instant results."
      calculator={<YourCalculator />}
      slug="math/your-calculator-id"
      category="Geometry" // Match your category
      features={[
        "Instant calculations",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "No registration required",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Your Calculator">
        <p>
          Your introduction paragraph explaining what the calculator does and why it's useful.
          Include your target keywords naturally throughout the content.
        </p>
        <p>
          Explain the practical applications and real-world use cases for this calculator.
        </p>
      </SEOSection>
      
      <SEOSection title="How to Use Our Calculator">
        <p>Follow these simple steps:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter your first value</li>
          <li><strong>Step 2:</strong> Enter your second value</li>
          <li><strong>Step 3:</strong> Click calculate for instant results</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Formula Behind the Calculation">
        <p>Here's the mathematical formula used:</p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">Formula = Input1 + Input2</p>
        </div>
        <p>Explain what each part of the formula represents.</p>
      </SEOSection>

      <SEOSection title="Practical Examples">
        <h3>Example 1: Basic Calculation</h3>
        <p>Let's say you have...</p>
        <ul>
          <li><strong>Input 1:</strong> 10</li>
          <li><strong>Input 2:</strong> 5</li>
          <li><strong>Result:</strong> 15</li>
        </ul>
      </SEOSection>

      <SEOSection title="Common Applications">
        <p>This calculator is useful for:</p>
        <SEOList items={[
          "Application 1: Brief description",
          "Application 2: Brief description",
          "Application 3: Brief description"
        ]} />
      </SEOSection>

      <SEOSection title="Related Calculators">
        <p>
          If you found this calculator helpful, you might also be interested in our{' '}
          {createInternalLink('related-calculator-1')} or{' '}
          {createInternalLink('related-calculator-2')}.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ questions={[
          {
            question: "What is the most common use case for this calculator?",
            answer: "The most common use case is..."
          },
          {
            question: "Can I use this calculator for complex calculations?",
            answer: "Yes, this calculator can handle..."
          },
          {
            question: "Is this calculator free to use?",
            answer: "Yes, all our calculators are completely free..."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Summarize the key benefits and encourage users to try the calculator.
          Include links to related calculators using {createInternalLink('calculator-id')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
```

### Step 4: Create Embed Page

**File:** `app/(embeds)/embed/math/your-calculator-id/page.tsx`

```typescript
import YourCalculator from '@/app/_components/calculators/YourCalculatorNameCalculator';

interface YourCalculatorEmbedPageProps {
  searchParams: Promise<{ color?: string }>;
}

export default async function YourCalculatorEmbedPage({ searchParams }: YourCalculatorEmbedPageProps) {
  const params = await searchParams;
  const color = params.color || '#3399CC';
  
  return <YourCalculator showTitle={false} primaryColor={color} />;
}
```

### Step 5: Update Sitemap

**File:** `app/sitemap.ts`

The sitemap automatically includes new calculators from the `calculators.ts` configuration, so no manual updates are needed.

## 📝 SEO Best Practices

### Content Guidelines

1. **Title Optimization**
   - Include primary keyword
   - Keep under 60 characters
   - Make it compelling and descriptive

2. **Description Optimization**
   - Include target keywords naturally
   - Keep under 160 characters
   - Include a call-to-action

3. **Content Structure**
   - Use proper heading hierarchy (H1, H2, H3)
   - Include target keywords in headings
   - Write comprehensive, helpful content
   - Add practical examples and use cases

4. **Internal Linking**
   - Link to related calculators using `createInternalLink()`
   - Include contextual links within content
   - Add links in FAQ answers

### Keyword Research

Before writing content, research keywords:
- Primary keyword: "your calculator type calculator"
- Secondary keywords: "how to calculate", "formula for", "online tool"
- Long-tail keywords: "free online calculator for", "step by step"

## 🧪 Testing Checklist

- [ ] Calculator functionality works correctly
- [ ] Embed version works without title
- [ ] Color customization works in embed
- [ ] SEO content renders properly
- [ ] Internal links work correctly
- [ ] Mobile responsiveness
- [ ] Page loading speed
- [ ] Structured data validation

## 🔧 Troubleshooting

### Common Issues

1. **Calculator not appearing in grid**
   - Check `calculators.ts` configuration
   - Verify `id` matches folder name

2. **Embed not working**
   - Ensure embed page exists
   - Check `embedHref` in configuration

3. **SEO content not showing**
   - Verify `CalculatorPageTemplate` usage
   - Check import statements

4. **Internal links broken**
   - Use `createInternalLink()` function
   - Verify calculator IDs exist

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [SEO Best Practices](https://developers.google.com/search/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🤝 Contributing

When adding new calculators:

1. Follow the established patterns
2. Include comprehensive SEO content
3. Test thoroughly
4. Update this guide if needed
5. Consider related calculators for internal linking

---

**Note:** This guide is maintained by the development team. If you find any issues or have suggestions for improvement, please update this document accordingly.
