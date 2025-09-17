import VolumeCalculator from '../../_components/calculators/VolumeCalculator';
import CopyIframeButton from '../../_components/ui/CopyIframeButton';

export default function VolumePage() {
  return (
    <main>
      <h1>Volume Calculator - Calculate Box & Container Volumes</h1>
      
      <p>
        Calculate the volume of rectangular boxes and containers instantly with our free online volume calculator. 
        Whether you&apos;re working on shipping calculations, storage planning, or any task requiring 
        volume measurements, our tool provides accurate results in seconds.
      </p>

      <p>
        The volume of a rectangular box is calculated by multiplying length, width, and height. 
        This formula works for:
      </p>

      <ul>
        <li>Shipping boxes and containers</li>
        <li>Storage bins and crates</li>
        <li>Room volumes for HVAC calculations</li>
        <li>Aquarium and tank measurements</li>
      </ul>

      <p>
        Simply enter the length, width, and height in the calculator below, and we&apos;ll instantly calculate 
        the total volume for you. No registration required - completely free to use!
      </p>

      <div className="flex flex-col items-center space-y-4">
        <VolumeCalculator />
        <CopyIframeButton slug="volume" />
      </div>

      <section>
        <h2>How to Calculate Volume</h2>
        <p>
          The formula for calculating the volume of a rectangular box is:
        </p>
        <p>
          <strong>Volume = Length × Width × Height</strong>
        </p>
        <p>
          For example, if you have a box with length 10, width 5, and height 3 units, 
          the volume would be 10 × 5 × 3 = 150 cubic units.
        </p>
      </section>

      <section>
        <h2>Common Volume Calculations</h2>
        <p>
          <strong>Cube:</strong> If all three dimensions are equal (let&apos;s say 4 units each), 
          the volume is 4 × 4 × 4 = 64 cubic units.
        </p>
        <p>
          <strong>Box:</strong> For a box with length 8, width 6, and height 4, 
          the volume is 8 × 6 × 4 = 192 cubic units.
        </p>
      </section>

      <section>
        <h2>Why Use Our Volume Calculator?</h2>
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
