import AreaCalculator from '../../_components/calculators/AreaCalculator';
import CopyIframeButton from '../../_components/ui/CopyIframeButton';

export default function AreaPage() {
  return (
    <main>
      <h1>Area Calculator - Calculate Rectangle & Square Areas</h1>
      
      <p>
        Calculate the area of rectangles and squares instantly with our free online area calculator. 
        Whether you&apos;re working on geometry homework, home improvement projects, or any task requiring 
        area calculations, our tool provides accurate results in seconds.
      </p>

      <p>
        The area of a rectangle or square is calculated by multiplying the length by the width. 
        This simple formula works for:
      </p>

      <ul>
        <li>Rectangles of any size</li>
        <li>Squares (where length equals width)</li>
        <li>Room measurements for flooring or painting</li>
        <li>Garden plots and landscaping</li>
      </ul>

      <p>
        Simply enter the length and width in the calculator below, and we&apos;ll instantly calculate 
        the total area for you. No registration required - completely free to use!
      </p>

      <div className="flex flex-col items-center space-y-4">
        <AreaCalculator />
        <CopyIframeButton slug="area" />
      </div>

      <section>
        <h2>How to Calculate Area</h2>
        <p>
          The formula for calculating the area of a rectangle or square is:
        </p>
        <p>
          <strong>Area = Length × Width</strong>
        </p>
        <p>
          For example, if you have a rectangle with length 8 and width 5 units, 
          the area would be 8 × 5 = 40 square units.
        </p>
      </section>

      <section>
        <h2>Common Area Calculations</h2>
        <p>
          <strong>Square:</strong> If both length and width are equal (let&apos;s say 6 units each), 
          the area is 6 × 6 = 36 square units.
        </p>
        <p>
          <strong>Rectangle:</strong> For a rectangle with length 10 and width 4, 
          the area is 10 × 4 = 40 square units.
        </p>
      </section>

      <section>
        <h2>Why Use Our Area Calculator?</h2>
        <ul>
          <li>Instant calculations with no math errors</li>
          <li>Works with any unit of measurement (inches, feet, meters, etc.)</li>
          <li>Handles decimal numbers for precise measurements</li>
          <li>Completely free and no registration required</li>
          <li>Mobile-friendly and easy to use</li>
        </ul>
      </section>
    </main>
  );
}
