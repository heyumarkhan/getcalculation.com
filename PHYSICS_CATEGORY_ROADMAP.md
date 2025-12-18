# Physics Category Implementation Roadmap

This document outlines all the changes needed to add a Physics category (similar to Math) and how to add dozens of physics calculator pages following the same structure.

## 📋 Overview

The goal is to:
1. Add Physics as a major category (like Math)
2. Update the home page to show major categories (Math, Physics) instead of subcategories
3. Make the site more generic as a calculator/tools website
4. Maintain the same structure, SEO, and patterns as Math calculators

## 🏗️ Current Structure

### File Structure
```
app/
├── (calculators)/
│   ├── math/
│   │   ├── page.tsx                    # Math category page
│   │   └── [calculator-id]/
│   │       └── page.tsx                # Individual calculator pages
│   └── physics/
│       ├── page.tsx                    # ✅ Already exists
│       └── velocity-calculator/
│           └── page.tsx                # ✅ Already exists
├── (embeds)/
│   └── embed/
│       ├── math/
│       │   └── [calculator-id]/
│       │       └── page.tsx            # Embed pages
│       └── physics/
│           └── velocity-calculator/
│               └── page.tsx            # ✅ Already exists
└── _components/
    ├── calculators/                    # Calculator components
    ├── data/
    │   └── calculators.ts              # Calculator configuration
    └── ui/
        └── Breadcrumb.tsx              # Breadcrumb navigation
```

## ✅ What's Already Done

1. ✅ Physics folder structure exists (`app/(calculators)/physics/`)
2. ✅ Physics page exists (`app/(calculators)/physics/page.tsx`)
3. ✅ Sample physics calculator exists (velocity-calculator)
4. ✅ Physics categories are mapped in `Breadcrumb.tsx`
5. ✅ `subjects` array includes 'Physics' in `calculators.ts`
6. ✅ `CalculatorGrid` supports subject filtering

## 🔧 Required Changes

### 1. Update Home Page to Show Major Categories

**File:** `app/_components/CalculatorGrid.tsx`

**Current Behavior:** Shows subcategories (Geometry, Algebra, etc.) under search bar

**New Behavior:** Show major categories (Math, Physics) when on home page, show subcategories when on subject pages

**Changes Needed:**
- Detect if we're on home page (no `subject` prop)
- Show major categories (Math, Physics) instead of subcategories
- Make categories clickable to navigate to `/math` or `/physics`
- Keep subcategory filtering for subject-specific pages

### 2. Update Categories List

**File:** `app/_components/data/calculators.ts`

**Current:** `categories` array includes all subcategories

**Action:** 
- Keep `categories` array for filtering on subject pages
- Add physics subcategories to the array (Mechanics, Thermodynamics, etc.)
- Ensure all physics categories are included

### 3. Add Physics Categories to Category Colors

**File:** `app/_components/CalculatorGrid.tsx`

**Action:** Add color mappings for physics categories in `getCategoryColor()` function

### 4. Update Sitemap (Automatic)

**File:** `app/sitemap.ts`

**Note:** The sitemap already includes physics, but you'll need to add new calculator slugs as you create them.

## 📝 How to Add Physics Calculators (Step-by-Step)

### Step 1: Add Calculator to Configuration

**File:** `app/_components/data/calculators.ts`

Add your calculator to the `calculators` array:

```typescript
{
  id: 'your-calculator-id',                    // Unique ID (kebab-case)
  name: 'Your Calculator Name',                // Display name
  description: 'Brief description',            // What it does
  category: 'Kinematics',                      // Physics subcategory
  subject: 'physics',                          // Always 'physics'
  keywords: ['keyword1', 'keyword2'],         // SEO keywords
  href: '/physics/your-calculator-id',         // URL path
  embedHref: '/embed/physics/your-calculator-id', // Embed URL
  icon: '⚡',                                  // Emoji icon
  color: 'blue'                                // Color theme
}
```

**Physics Categories Available:**
- `Kinematics` - Motion, velocity, acceleration
- `Mechanics` - Forces, work, energy
- `Thermodynamics` - Heat, temperature, entropy
- `Electromagnetism` - Electric fields, magnetic fields
- `Optics` - Light, lenses, mirrors
- `Quantum Mechanics` - Quantum physics
- `Waves` - Wave properties, frequency
- `Fluid Mechanics` - Fluids, pressure, flow

### Step 2: Create Calculator Component

**File:** `app/_components/calculators/YourCalculatorNameCalculator.tsx`

Create a new calculator component following the same pattern as math calculators:

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
    // Your calculation logic here
  };

  return (
    <Card className="p-6">
      {showTitle && <h2 className="text-2xl font-bold mb-4">Your Calculator</h2>}
      {/* Calculator UI */}
    </Card>
  );
}
```

### Step 3: Create Calculator Page

**File:** `app/(calculators)/physics/your-calculator-id/page.tsx`

Create the page following the exact structure of math calculators:

```typescript
import YourCalculator from '../../../../_components/calculators/YourCalculatorNameCalculator';
import CalculatorPageTemplate from '../../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../../_components/ui/SEOInternalLink';

export default function YourCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Your Calculator Title"
      description="Your calculator description for SEO"
      calculator={<YourCalculator />}
      slug="physics/your-calculator-id"
      category="Kinematics"  // Match the category from calculators.ts
      features={[
        'Feature 1',
        'Feature 2',
        'Feature 3'
      ]}
    >
      <SEOSection title="What is [Topic]?">
        <p>
          Explanation of the concept...
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Calculator">
        <SEOList items={[
          'Step 1',
          'Step 2',
          'Step 3'
        ]} />
      </SEOSection>

      <SEOSection title="Examples and Applications">
        <p>
          Real-world examples...
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ questions={[
          {
            question: 'Question 1?',
            answer: 'Answer 1'
          },
          {
            question: 'Question 2?',
            answer: 'Answer 2'
          }
        ]} />
      </SEOSection>

      <SEOSection title="Related Calculators">
        <p>
          You might also find these calculators useful:
        </p>
        <SEOList items={[
          `Use ${createInternalLink('velocity-calculator')} for velocity calculations`,
          `Try ${createInternalLink('area')} for area calculations`
        ]} />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
```

**Important Notes:**
- Use `&apos;` instead of `'` in JSX
- Use `&quot;` instead of `"` in JSX
- The `slug` must match the URL path
- The `category` must match the category in `calculators.ts`

### Step 4: Create Embed Page

**File:** `app/(embeds)/embed/physics/your-calculator-id/page.tsx`

Create the embed page:

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

### Step 5: Update Sitemap (Optional)

**File:** `app/sitemap.ts`

Add your new calculator to the sitemap:

```typescript
{ slug: 'physics/your-calculator-id', priority: 0.8 }
```

**Note:** For dozens of calculators, consider generating this automatically from `calculators.ts`.

## 🎯 Home Page Changes

### Update CalculatorGrid Component

**File:** `app/_components/CalculatorGrid.tsx`

**Changes:**
1. When `subject` is undefined (home page), show major categories (Math, Physics)
2. When `subject` is defined, show subcategories for that subject
3. Make major categories clickable to navigate to subject pages

**Implementation:**

```typescript
// Get available subjects from calculators
const availableSubjects = useMemo(() => {
  const subjects = new Set(calculators.map(c => c.subject));
  return Array.from(subjects).map(s => ({
    name: s.charAt(0).toUpperCase() + s.slice(1),
    value: s,
    href: `/${s}`
  }));
}, []);

// Determine what to show
const showMajorCategories = !subject; // On home page
const categoriesToShow = showMajorCategories 
  ? availableSubjects 
  : categories.filter(cat => {
      // Filter categories that belong to current subject
      return calculators.some(calc => 
        calc.category === cat && calc.subject === subject
      );
    });
```

## 📊 Checklist for Adding Each Physics Calculator

- [ ] Add calculator to `calculators.ts` with all required fields
- [ ] Create calculator component in `_components/calculators/`
- [ ] Create page in `app/(calculators)/physics/[id]/page.tsx`
- [ ] Create embed page in `app/(embeds)/embed/physics/[id]/page.tsx`
- [ ] Add SEO content sections (What is, How to use, Examples, FAQ, Related)
- [ ] Test calculator functionality
- [ ] Test embed functionality
- [ ] Verify breadcrumb navigation
- [ ] Check related calculators display
- [ ] Update sitemap (if manual)

## 🔄 Batch Adding Multiple Calculators

For adding dozens of calculators efficiently:

1. **Prepare a spreadsheet** with all calculator data:
   - ID, Name, Description, Category, Keywords, Icon, Color

2. **Create calculator components** in batches (5-10 at a time)

3. **Create pages** using a template:
   - Copy an existing physics calculator page
   - Replace content systematically
   - Update all references

4. **Automate sitemap generation** (optional):
   - Generate from `calculators.ts` instead of manual entry

## 🎨 Category Colors for Physics

Add these to `getCategoryColor()` in `CalculatorGrid.tsx`:

```typescript
'Kinematics': 'bg-cyan-100 text-cyan-800 border-cyan-200',
'Mechanics': 'bg-indigo-100 text-indigo-800 border-indigo-200',
'Thermodynamics': 'bg-red-100 text-red-800 border-red-200',
'Electromagnetism': 'bg-yellow-100 text-yellow-800 border-yellow-200',
'Optics': 'bg-purple-100 text-purple-800 border-purple-200',
'Quantum Mechanics': 'bg-pink-100 text-pink-800 border-pink-200',
'Waves': 'bg-teal-100 text-teal-800 border-teal-200',
'Fluid Mechanics': 'bg-blue-100 text-blue-800 border-blue-200'
```

## 📁 File Structure Summary

For each new physics calculator, you need:

1. **Calculator Component:** `app/_components/calculators/[Name]Calculator.tsx`
2. **Calculator Page:** `app/(calculators)/physics/[id]/page.tsx`
3. **Embed Page:** `app/(embeds)/embed/physics/[id]/page.tsx`
4. **Configuration:** Entry in `app/_components/data/calculators.ts`

## 🚀 Next Steps

1. **Update CalculatorGrid** to show major categories on home page
2. **Add physics category colors** to CalculatorGrid
3. **Add physics subcategories** to categories array
4. **Start adding physics calculators** following the 5-step process above
5. **Test navigation** between Math and Physics categories
6. **Verify SEO** for all new pages

## 📝 Notes

- All physics calculators follow the exact same structure as math calculators
- SEO content sections are required for each calculator
- Related calculators automatically show based on category
- Breadcrumbs automatically work based on category mapping
- Embed functionality works the same way
- The site is now becoming a generic calculator/tools website

---

**Ready to implement?** Start with updating the `CalculatorGrid` component to show major categories on the home page, then begin adding physics calculators one by one following the checklist above.
