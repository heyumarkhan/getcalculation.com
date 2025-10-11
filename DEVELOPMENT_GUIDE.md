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

#### 🧭 **Important: Breadcrumb Category Mapping**

When setting the `category` field, ensure it maps correctly to the breadcrumb navigation system. The category determines which subject appears in the breadcrumb (e.g., "Home > Math > Calculator Name").

**Current Category Mappings:**

**Math Categories:**
- `Geometry` → "Home > Math > Calculator Name"
- `Algebra` → "Home > Math > Calculator Name"
- `Statistics` → "Home > Math > Calculator Name"
- `Calculus` → "Home > Math > Calculator Name"
- `Combinatorics` → "Home > Math > Calculator Name"
- `Trigonometry` → "Home > Math > Calculator Name"

**Physics Categories:**
- `Kinematics` → "Home > Physics > Calculator Name"
- `Mechanics` → "Home > Physics > Calculator Name"
- `Thermodynamics` → "Home > Physics > Calculator Name"
- `Electromagnetism` → "Home > Physics > Calculator Name"
- `Optics` → "Home > Physics > Calculator Name"
- `Quantum Mechanics` → "Home > Physics > Calculator Name"
- `Waves` → "Home > Physics > Calculator Name"
- `Fluid Mechanics` → "Home > Physics > Calculator Name"

**Adding New Categories:**

If you need to add a new category that doesn't exist, update the `categoryToSubject` mapping in `app/_components/ui/Breadcrumb.tsx`:

```typescript
// Add your new category mapping
'Your New Category': { subject: 'Your Subject', href: '/your-subject' }
```

**Examples:**
- For a Chemistry calculator: `category: 'Chemistry'` → "Home > Chemistry > Calculator Name"
- For a Finance calculator: `category: 'Finance'` → "Home > Finance > Calculator Name"

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

### JSX Entity Escaping

When writing JSX content, you must properly escape special characters to avoid build errors. This is a **CRITICAL** requirement that causes build failures if not handled correctly.

#### Required Escaping

**Apostrophes (`'`):**
```jsx
// ❌ Wrong - will cause build error
<p>Here's how to use the calculator</p>

// ✅ Correct - properly escaped
<p>Here&apos;s how to use the calculator</p>
```

**Quotes (`"`):**
```jsx
// ❌ Wrong - will cause build error
<p>Enter "2, 5, 8" in the field</p>

// ✅ Correct - properly escaped
<p>Enter &quot;2, 5, 8&quot; in the field</p>
```

**Less-than symbols (`<`):**
```jsx
// ❌ Wrong - will cause build error
<p>For values where r < 1</p>

// ✅ Correct - properly escaped
<p>For values where r &lt; 1</p>
```

**Greater-than symbols (`>`):**
```jsx
// ❌ Wrong - will cause build error
<p>For values where n > 10</p>

// ✅ Correct - properly escaped
<p>For values where n &gt; 10</p>
```

#### Common Entity Escapes

| Character | Entity Code | Usage | Common in Math |
|-----------|-------------|-------|----------------|
| `'` | `&apos;` | Apostrophes in contractions | "don't", "can't" |
| `"` | `&quot;` | Quotation marks in text | "Enter values" |
| `<` | `&lt;` | Less-than symbols | "r < 1", "x < 5" |
| `>` | `&gt;` | Greater-than symbols | "n > 10", "y > 0" |
| `&` | `&amp;` | Ampersands (when not in HTML entities) | "A & B" |

#### Mathematical Expression Escaping

**Common mathematical expressions that need escaping:**

```jsx
// ❌ Wrong - will cause build errors
<p>For |r| < 1, the series converges</p>
<p>When n > 0, the formula applies</p>
<p>If x < y, then z = x + y</p>
<p>For values where 0 < r < 1</p>

// ✅ Correct - properly escaped
<p>For |r| &lt; 1, the series converges</p>
<p>When n &gt; 0, the formula applies</p>
<p>If x &lt; y, then z = x + y</p>
<p>For values where 0 &lt; r &lt; 1</p>
```

#### Build Error Prevention

The linter will catch unescaped entities and fail the build with errors like:
```
Error: Expected '</', got 'numeric literal (1, 1)'
Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
```

**Always escape these characters in JSX content to ensure successful builds!**

#### Quick Reference for Calculator Development

When writing calculator pages, watch out for these common patterns:

```jsx
// ❌ Common mistakes in calculator content
<p>For values where r < 1</p>
<p>When n > 10</p>
<p>If x < y < z</p>
<p>Here's the formula</p>
<p>Enter "values" here</p>

// ✅ Correctly escaped
<p>For values where r &lt; 1</p>
<p>When n &gt; 10</p>
<p>If x &lt; y &lt; z</p>
<p>Here&apos;s the formula</p>
<p>Enter &quot;values&quot; here</p>
```

#### SEO Content Escaping Checklist

Before committing calculator pages, check for:

- [ ] All apostrophes escaped with `&apos;`
- [ ] All quotation marks escaped with `&quot;`
- [ ] All less-than symbols escaped with `&lt;`
- [ ] All greater-than symbols escaped with `&gt;`
- [ ] Mathematical inequalities properly escaped
- [ ] No build errors when running `npm run build`

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
- [ ] **Breadcrumb navigation displays correctly** (e.g., "Home > Math > Calculator Name")
- [ ] Mobile responsiveness
- [ ] Page loading speed
- [ ] Structured data validation

## 🧭 Breadcrumb System Management

### Checking Existing Categories

Before adding a new calculator, check if your category already exists in the breadcrumb system:

1. **Check `app/_components/ui/Breadcrumb.tsx`** - Look at the `categoryToSubject` mapping
2. **Verify the mapping** - Ensure your category maps to the correct subject
3. **Test the breadcrumb** - Visit your calculator page to verify the breadcrumb displays correctly

### Adding New Categories

If you need to add a new category that doesn't exist in the breadcrumb system:

1. **Open `app/_components/ui/Breadcrumb.tsx`**
2. **Find the `categoryToSubject` object**
3. **Add your new category mapping:**

```typescript
const categoryToSubject: { [key: string]: { subject: string; href: string } } = {
  // ... existing categories ...
  
  // Add your new category
  'Your New Category': { subject: 'Your Subject', href: '/your-subject' }
};
```

4. **Update the calculator configuration** to use the new category
5. **Test the breadcrumb** to ensure it displays correctly

### Common Category Examples

**For Math Calculators:**
- Use existing categories: `Geometry`, `Algebra`, `Statistics`, `Calculus`, `Combinatorics`, `Trigonometry`
- All map to "Home > Math > Calculator Name"

**For Physics Calculators:**
- Use existing categories: `Kinematics`, `Mechanics`, `Thermodynamics`, `Electromagnetism`, `Optics`, `Quantum Mechanics`, `Waves`, `Fluid Mechanics`
- All map to "Home > Physics > Calculator Name"

**For New Subjects:**
- Add to both `calculators.ts` (category field) and `Breadcrumb.tsx` (categoryToSubject mapping)
- Ensure the subject page exists (e.g., `/chemistry`, `/finance`)

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

5. **Breadcrumb shows wrong subject**
   - Check `categoryToSubject` mapping in `Breadcrumb.tsx`
   - Verify category name matches exactly (case-sensitive)
   - Ensure the category exists in the mapping

6. **Breadcrumb shows "Home > Math" for physics calculator**
   - Add the category to `categoryToSubject` mapping
   - Map it to the correct subject (e.g., Physics)
   - Update the calculator configuration if needed

### Common Build Errors

#### JSX Entity Escaping Errors

**Error:** `Expected '</', got 'numeric literal (1, 1)'`
```bash
Error: Expected '</', got 'numeric literal (1, 1)'
./app/(calculators)/math/your-calculator/page.tsx
```

**Cause:** Unescaped `<` characters in mathematical expressions
**Solution:** Replace `<` with `&lt;` in JSX content

```jsx
// ❌ Wrong
<p>For values where r < 1</p>

// ✅ Correct
<p>For values where r &lt; 1</p>
```

**Error:** `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`
```bash
Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
```

**Cause:** Unescaped apostrophes in contractions
**Solution:** Replace `'` with `&apos;` in JSX content

```jsx
// ❌ Wrong
<p>Here's the formula</p>

// ✅ Correct
<p>Here&apos;s the formula</p>
```

#### Missing Internal Link Errors

**Error:** `Cannot read properties of undefined (reading 'href')`
```bash
Runtime TypeError
Cannot read properties of undefined (reading 'href')
app\_components\ui\SEOInternalLink.tsx (56:33) @ createInternalLink
```

**Cause:** Using `createInternalLink()` with a key that doesn't exist in `INTERNAL_LINKS`
**Solution:** Add the missing link to `app/_components/ui/SEOInternalLink.tsx`

```typescript
// Add missing link to INTERNAL_LINKS object
export const INTERNAL_LINKS = {
  // ... existing links ...
  'your-missing-link': { href: '/math/your-calculator', title: 'Your Calculator' }
} as const;
```

#### TypeScript Errors

**Error:** `Property 'X' does not exist on type 'Y'`
**Cause:** Type mismatches or missing type definitions
**Solution:** Check TypeScript interfaces and ensure proper typing

#### Import/Export Errors

**Error:** `Module not found: Can't resolve '@/app/_components/...'`
**Cause:** Incorrect import paths
**Solution:** Use relative imports instead of absolute paths

```typescript
// ❌ Wrong
import YourCalculator from '@/app/_components/calculators/YourCalculator';

// ✅ Correct
import YourCalculator from '../../../_components/calculators/YourCalculator';
```

### Build Error Prevention Checklist

Before committing any calculator changes:

- [ ] Run `npm run build` to check for build errors
- [ ] Check for unescaped characters in JSX content
- [ ] Verify all `createInternalLink()` keys exist in `INTERNAL_LINKS`
- [ ] Test calculator functionality manually
- [ ] Verify embed page works
- [ ] Check breadcrumb navigation
- [ ] Ensure mobile responsiveness

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
