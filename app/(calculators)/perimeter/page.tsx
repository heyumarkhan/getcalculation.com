import PerimeterCalculator from '../../_components/calculators/PerimeterCalculator';

export default function PerimeterPage() {
  return (
    <main>
      <h1>Perimeter Calculator - Calculate Rectangle, Square & Quadrilateral Perimeters</h1>
      
      <p>
        Calculate the perimeter of any four-sided shape instantly with our free online perimeter calculator. 
        Whether you&apos;re working with rectangles, squares, or any quadrilateral, our tool provides accurate 
        perimeter calculations in seconds.
      </p>

      <p>
        The perimeter of a shape is the total distance around its edges. For any four-sided figure, 
        you simply add up the lengths of all four sides. This calculator works for:
      </p>

      <ul>
        <li>Rectangles and squares</li>
        <li>Parallelograms and rhombuses</li>
        <li>Any quadrilateral shape</li>
        <li>Irregular four-sided polygons</li>
      </ul>

      <p>
        Simply enter the length of each side in the calculator below, and we&apos;ll instantly calculate 
        the total perimeter for you. No registration required - completely free to use!
      </p>

      <PerimeterCalculator />

      <section>
        <h2>How to Calculate Perimeter</h2>
        <p>
          The formula for calculating the perimeter of any four-sided shape is:
        </p>
        <p>
          <strong>Perimeter = Side 1 + Side 2 + Side 3 + Side 4</strong>
        </p>
        <p>
          For example, if you have a rectangle with sides of 5, 8, 5, and 8 units, 
          the perimeter would be 5 + 8 + 5 + 8 = 26 units.
        </p>
      </section>

      <section>
        <h2>Common Perimeter Calculations</h2>
        <p>
          <strong>Square:</strong> If all four sides are equal (let&apos;s say 6 units each), 
          the perimeter is 6 + 6 + 6 + 6 = 24 units, or simply 4 × 6 = 24 units.
        </p>
        <p>
          <strong>Rectangle:</strong> For a rectangle with length 10 and width 5, 
          the perimeter is 10 + 5 + 10 + 5 = 30 units, or 2 × (length + width) = 2 × (10 + 5) = 30 units.
        </p>
      </section>

      <section>
        <h2>Why Use Our Perimeter Calculator?</h2>
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
