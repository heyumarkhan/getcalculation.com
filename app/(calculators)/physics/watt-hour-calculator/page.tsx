import WattHourCalculator from '../../../_components/calculators/WattHourCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function WattHourCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Watt-hour Calculator: Calculate Energy, Power & Time (E = P × t)"
      description="Calculate energy (watt-hours), power, or time using E = P × t. Free online energy calculator with support for multiple units including kWh, Wh, Joules, and BTU."
      calculator={<WattHourCalculator />}
      slug="physics/watt-hour-calculator"
      category="Electromagnetism"
      features={[
        "Calculate energy from power and time",
        "Calculate power from energy and time",
        "Calculate time from energy and power",
        "Comprehensive unit conversion",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Watt-hours: Essential Energy Calculations">
        <p>
          The watt-hour (Wh) is a fundamental unit of energy that represents the amount of energy consumed or produced when a power of one watt is used for one hour. Understanding watt-hours is essential for calculating energy consumption, battery capacity, and electrical costs. Our Watt-hour Calculator makes it easy to determine energy, power, or time using the simple yet powerful formula: <strong>E = P × t</strong>.
        </p>
        <p>
          Whether you&apos;re calculating how long a battery will last, determining energy consumption of appliances, or estimating electricity costs, the watt-hour calculator simplifies these essential energy calculations.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Watt-hour Calculator">
        <p>
          Our Watt-hour Calculator is designed for simplicity and accuracy. Follow these steps:
        </p>
        <ol>
          <li><strong>Enter Two Values:</strong> Input any two of the three values (energy, power, or time)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for each measurement</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value with step-by-step solutions</li>
        </ol>
        <p>
          The calculator uses the formula: <strong>E = P × t</strong>, where E is energy, P is power, and t is time.
        </p>
      </SEOSection>

      <SEOSection title="Understanding the Watt-hour Formula">
        <p>
          The watt-hour formula is expressed as:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">E = P × t</p>
          <p className="text-sm text-gray-600 mt-2">Where: E = Energy, P = Power, t = Time</p>
        </div>
        
        <h3>Rearranging the Formula</h3>
        <p>You can rearrange this formula to solve for any variable:</p>
        <ul>
          <li><strong>Energy:</strong> E = P × t</li>
          <li><strong>Power:</strong> P = E / t</li>
          <li><strong>Time:</strong> t = E / P</li>
        </ul>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Energy (E):</strong> The total amount of work done or energy consumed, measured in watt-hours (Wh) or kilowatt-hours (kWh)</li>
          <li><strong>Power (P):</strong> The rate at which energy is consumed or produced, measured in watts (W) or kilowatts (kW)</li>
          <li><strong>Time (t):</strong> The duration over which power is applied, measured in hours (h), minutes (min), or seconds (s)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Watt-hour calculations are used in countless real-world scenarios:
        </p>
        <SEOList items={[
          "Battery Capacity: Calculating how long batteries will last based on power consumption",
          "Energy Bills: Estimating electricity costs based on appliance power ratings and usage time",
          "Solar Power: Determining energy production from solar panels over time",
          "Electric Vehicles: Calculating range and charging requirements",
          "Home Appliances: Estimating energy consumption of refrigerators, air conditioners, and other devices",
          "Power Plants: Measuring energy generation and capacity",
          "Backup Power: Sizing UPS systems and generators for specific energy requirements",
          "Energy Efficiency: Comparing energy consumption of different devices and systems"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Conversions">
        <p>
          Understanding energy units is crucial for accurate calculations:
        </p>
        <ul>
          <li><strong>Energy Units:</strong>
            <ul className="ml-4 mt-1">
              <li>Watt-hour (Wh): Base unit, 1 Wh = 1 W × 1 h</li>
              <li>Kilowatt-hour (kWh): 1 kWh = 1,000 Wh (most common for electricity bills)</li>
              <li>Megawatt-hour (MWh): 1 MWh = 1,000,000 Wh</li>
              <li>Joule (J): 1 Wh = 3,600 J (SI unit of energy)</li>
              <li>BTU: 1 Wh ≈ 3.412 BTU (British Thermal Unit)</li>
            </ul>
          </li>
          <li><strong>Power Units:</strong>
            <ul className="ml-4 mt-1">
              <li>Watt (W): Base unit</li>
              <li>Kilowatt (kW): 1 kW = 1,000 W</li>
              <li>Megawatt (MW): 1 MW = 1,000,000 W</li>
              <li>Horsepower (hp): 1 hp ≈ 745.7 W</li>
            </ul>
          </li>
          <li><strong>Time Units:</strong>
            <ul className="ml-4 mt-1">
              <li>Hour (h): Base unit for watt-hours</li>
              <li>Minute (min): 1 h = 60 min</li>
              <li>Second (s): 1 h = 3,600 s</li>
              <li>Day: 1 day = 24 h</li>
            </ul>
          </li>
        </ul>
      </SEOSection>

      <SEOSection title="Common Watt-hour Calculations">
        <h3>Example 1: Calculating Energy Consumption</h3>
        <p>A 100 W light bulb runs for 5 hours. How much energy does it consume?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">E = P × t = 100 W × 5 h = 500 Wh = 0.5 kWh</p>
        </div>

        <h3>Example 2: Calculating Power from Energy</h3>
        <p>A device consumes 2.4 kWh in 8 hours. What is its power consumption?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">P = E / t = 2.4 kWh / 8 h = 0.3 kW = 300 W</p>
        </div>

        <h3>Example 3: Calculating Time from Energy</h3>
        <p>A 50 W device has a battery capacity of 100 Wh. How long will it run?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">t = E / P = 100 Wh / 50 W = 2 h</p>
        </div>

        <h3>Example 4: Monthly Energy Consumption</h3>
        <p>An air conditioner rated at 1.5 kW runs 8 hours per day for 30 days. What is the total energy consumption?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Daily: E = 1.5 kW × 8 h = 12 kWh</p>
          <p className="font-mono">Monthly: E = 12 kWh × 30 days = 360 kWh</p>
        </div>

        <h3>Example 5: Battery Capacity</h3>
        <p>A smartphone battery has a capacity of 3,000 mAh at 3.7 V. What is its energy capacity in Wh?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">First, convert mAh to Ah: 3,000 mAh = 3 Ah</p>
          <p className="font-mono">Energy = Voltage × Capacity = 3.7 V × 3 Ah = 11.1 Wh</p>
        </div>
      </SEOSection>

      <SEOSection title="Understanding Energy vs. Power">
        <p>
          It&apos;s important to distinguish between energy and power:
        </p>
        <ul>
          <li><strong>Power (W):</strong> The rate at which energy is used. It&apos;s an instantaneous measurement - like speed.</li>
          <li><strong>Energy (Wh):</strong> The total amount of energy consumed over time. It&apos;s like distance traveled.</li>
        </ul>
        <p>
          <strong>Analogy:</strong> Power is like the speed of a car (miles per hour), while energy is like the total distance traveled (miles). A high-power device uses energy quickly, while a low-power device uses energy slowly, but both can consume the same total energy over different time periods.
        </p>
      </SEOSection>

      <SEOSection title="Energy Efficiency and Cost Calculations">
        <p>
          Watt-hour calculations are essential for understanding energy costs:
        </p>
        <ul>
          <li><strong>Cost Calculation:</strong> Energy Cost = Energy (kWh) × Price per kWh</li>
          <li><strong>Example:</strong> If electricity costs $0.12 per kWh and you use 500 kWh per month, your monthly cost is $60</li>
          <li><strong>Energy Efficiency:</strong> Compare devices by calculating energy consumption for the same usage time</li>
          <li><strong>Payback Period:</strong> Calculate how long it takes for energy-efficient devices to pay for themselves through energy savings</li>
        </ul>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is a watt-hour and how is it calculated?",
            answer: "A watt-hour (Wh) is a unit of energy equal to one watt of power consumed for one hour. It's calculated using the formula E = P × t, where E is energy in watt-hours, P is power in watts, and t is time in hours. For example, a 100 W device running for 2 hours consumes 200 Wh of energy."
          },
          {
            question: "What's the difference between watts and watt-hours?",
            answer: "Watts (W) measure power - the rate at which energy is used. Watt-hours (Wh) measure energy - the total amount of energy consumed. Power is instantaneous (like speed), while energy is cumulative (like distance). A 100 W device uses 100 watts of power at any moment, and if it runs for 1 hour, it consumes 100 Wh of energy."
          },
          {
            question: "How do I convert watt-hours to kilowatt-hours?",
            answer: "To convert watt-hours to kilowatt-hours, divide by 1,000. For example, 5,000 Wh = 5 kWh. Kilowatt-hours are commonly used for electricity bills because they represent larger amounts of energy more conveniently."
          },
          {
            question: "How do I calculate how long a battery will last?",
            answer: "Use the formula t = E / P, where t is time in hours, E is battery capacity in watt-hours, and P is power consumption in watts. For example, a 50 Wh battery powering a 10 W device will last 50 / 10 = 5 hours. Note that actual battery life may vary due to efficiency losses and discharge characteristics."
          },
          {
            question: "What's the relationship between watt-hours and joules?",
            answer: "One watt-hour equals 3,600 joules. This comes from: 1 Wh = 1 W × 1 h = 1 W × 3,600 s = 3,600 J. Joules are the SI unit of energy, while watt-hours are more commonly used for electrical energy."
          },
          {
            question: "How do I calculate monthly energy consumption?",
            answer: "First calculate daily energy: E_daily = Power (kW) × Hours per day. Then multiply by the number of days: E_monthly = E_daily × Days per month. For example, a 1 kW device running 8 hours per day for 30 days consumes: 1 × 8 × 30 = 240 kWh per month."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding watt-hours and energy calculations is fundamental to managing electricity consumption, sizing batteries, and estimating costs. Our Watt-hour Calculator simplifies these calculations, making it easy to determine energy, power, or time for any electrical system.
        </p>
        <p>
          Ready to explore more electrical concepts? Check out our other calculators like the {createInternalLink('watt-calculator', 'Watt Calculator')} for power calculations, or the {createInternalLink('force-calculator', 'Force Calculator')} for mechanics calculations that often complement energy analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

