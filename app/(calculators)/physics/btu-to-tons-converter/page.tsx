import BTUToTonsConverter from '../../../_components/calculators/BTUToTonsConverter';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function BTUToTonsConverterPage() {
  return (
    <CalculatorPageTemplate
      title="BTU to Tons Converter: Convert Cooling Capacity Units Instantly"
      description="Convert BTU to tons of refrigeration and tons to BTU. Calculate HVAC cooling capacity with our free converter. Get instant, accurate results online."
      calculator={<BTUToTonsConverter />}
      slug="physics/btu-to-tons-converter"
      category="Physics"
      features={[
        "Convert BTU/hr to tons of refrigeration instantly",
        "Bidirectional conversion (BTU ↔ Tons)",
        "Standard formula: 1 ton = 12,000 BTU/hr",
        "Instant results with step-by-step calculations",
        "Free and no registration required"
      ]}
    >
      <SEOSection title="Understanding BTU to Tons Conversion in HVAC Systems">
        <p>
          BTU (British Thermal Unit) and tons of refrigeration are the two most common units for measuring cooling capacity in air conditioning and refrigeration systems. HVAC professionals, homeowners, and engineers need to convert between these units to properly size equipment, compare system specifications, and calculate energy requirements. Understanding this conversion is essential when selecting air conditioners, designing cooling systems, or evaluating {createInternalLink('electrical-power-calculator')} consumption for climate control applications.
        </p>
        <p>
          Whether you&apos;re installing a residential AC unit, designing commercial refrigeration, or comparing cooling equipment specifications, our BTU to Tons Converter makes these critical calculations instant and accurate, helping you make informed decisions about cooling capacity.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to convert between BTU and tons:</p>
        <ol>
          <li><strong>Step 1:</strong> Select conversion direction (BTU to Tons or Tons to BTU).</li>
          <li><strong>Step 2:</strong> Enter the cooling capacity value in your known unit (BTU/hr or tons of refrigeration).</li>
          <li><strong>Step 3:</strong> Click Convert to get the equivalent cooling capacity in the target unit instantly.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The BTU to Tons Conversion Formula">
        <p>
          The conversion between BTU per hour and tons of refrigeration is based on a standard relationship established in the refrigeration industry. One ton of refrigeration represents the cooling capacity needed to freeze one ton (2,000 pounds) of water in 24 hours at 32°F, which equals exactly 12,000 BTU per hour:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">Tons = BTU/hr ÷ 12,000</p>
          <p className="font-mono text-lg font-bold mt-2">BTU/hr = Tons × 12,000</p>
        </div>
        <p>
          Where: Tons = Tons of Refrigeration (cooling capacity), BTU/hr = British Thermal Units per hour (heat removal rate), 12,000 = Standard conversion factor (BTU/hr per ton)
        </p>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>
          Convert a 36,000 BTU/hr air conditioner to tons of refrigeration:
        </p>
        <ul>
          <li>Given: Cooling capacity = 36,000 BTU/hr</li>
          <li>Formula: Tons = BTU/hr ÷ 12,000</li>
          <li>Tons = 36,000 ÷ 12,000</li>
          <li>Tons = 3</li>
          <li>Result: A 36,000 BTU/hr air conditioner has a 3-ton cooling capacity</li>
          <li>Reverse calculation: 3 tons × 12,000 = 36,000 BTU/hr ✓</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications of BTU to Tons Conversion">
        <p>This conversion is essential across multiple HVAC and refrigeration applications:</p>
        <SEOList items={[
          "Residential Air Conditioning: Homeowners and contractors use this conversion to properly size AC units for homes. A typical home requires 1-5 tons (12,000-60,000 BTU/hr) depending on square footage, insulation, and climate zone.",
          "Commercial HVAC Design: Engineers convert between BTU and tons when designing cooling systems for offices, retail spaces, and industrial facilities. Large commercial systems often range from 10-100+ tons of cooling capacity.",
          "Refrigeration Equipment: Food service, grocery stores, and cold storage facilities specify refrigeration equipment in tons, requiring {createInternalLink('heat-transfer-calculator')} and BTU conversions for proper system sizing.",
          "Energy Efficiency Analysis: HVAC professionals calculate energy consumption and operating costs by converting between cooling capacity units and comparing Energy Efficiency Ratio (EER) or Seasonal Energy Efficiency Ratio (SEER) ratings.",
          "Equipment Specification Comparison: When comparing air conditioners from different manufacturers or regions, converting between BTU/hr (common in North America) and tons helps make apples-to-apples comparisons of cooling performance."
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ questions={[
          {
            question: "Why is it called a 'ton' of refrigeration?",
            answer: "The term 'ton of refrigeration' originated from the ice-making industry in the late 1800s. One ton of refrigeration represents the amount of cooling needed to freeze one short ton (2,000 pounds) of water at 32°F into ice over a 24-hour period. This requires removing 288,000 BTU in 24 hours, or 12,000 BTU per hour, which became the standard definition."
          },
          {
            question: "How many BTU is 1 ton of air conditioning?",
            answer: "One ton of air conditioning equals exactly 12,000 BTU per hour. This is the industry standard conversion factor used worldwide. For example, a 2-ton AC unit has a cooling capacity of 24,000 BTU/hr, a 3-ton unit provides 36,000 BTU/hr, and a 5-ton unit delivers 60,000 BTU/hr of cooling capacity."
          },
          {
            question: "What size air conditioner do I need in tons?",
            answer: "As a general rule, residential air conditioners require approximately 1 ton (12,000 BTU/hr) of cooling capacity per 400-600 square feet of living space, depending on climate, insulation, ceiling height, and sun exposure. For example, a 1,500 sq ft home typically needs a 2.5 to 3-ton AC unit. However, proper sizing requires a professional Manual J load calculation for accurate results."
          },
          {
            question: "Is a higher BTU or ton rating better for air conditioners?",
            answer: "Not necessarily. While higher BTU/ton ratings indicate greater cooling capacity, oversized air conditioners cycle on and off too frequently, reducing efficiency and humidity control. The ideal size matches your specific cooling load calculated using {createInternalLink('heat-calculator')} methods based on square footage, insulation, windows, occupancy, and climate. Proper sizing optimizes energy efficiency, comfort, and equipment lifespan."
          },
          {
            question: "How do BTU ratings relate to electrical power consumption?",
            answer: "BTU ratings measure cooling output (heat removal), while electrical power consumption is measured in watts or kilowatts. The efficiency of an AC unit is expressed as EER (Energy Efficiency Ratio = BTU/hr output per watt input) or SEER (Seasonal EER). For example, a 12,000 BTU/hr (1-ton) unit with EER 10 consumes 1,200 watts (1.2 kW) of electricity. Higher efficiency units provide the same BTU output with less electrical power consumption."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering BTU to tons conversion is essential for anyone working with air conditioning, refrigeration, or HVAC systems. The simple 12,000 BTU/hr per ton relationship enables quick equipment sizing, specification comparison, and capacity calculations for residential and commercial cooling applications.
        </p>
        <p>
          Explore more physics tools: Check out our {createInternalLink('energy-calculator')} to understand heat transfer and energy consumption, or use our {createInternalLink('density-calculator')} for fluid properties in refrigeration systems.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

