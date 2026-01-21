'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'ground-speed' | 'required-heading' | 'wind-components' | 'time-distance';

type Result = {
  lines: string[];
};

const degToRad = (deg: number) => (deg * Math.PI) / 180;
const radToDeg = (rad: number) => {
  const deg = (rad * 180) / Math.PI;
  return (deg + 360) % 360;
};

export default function GroundSpeedCalculator() {
  const [method, setMethod] = useState<Method>('ground-speed');

  const [trueAirspeed, setTrueAirspeed] = useState('120');
  const [tasUnit, setTasUnit] = useState('kt');
  const [windSpeed, setWindSpeed] = useState('20');
  const [windUnit, setWindUnit] = useState('kt');
  const [heading, setHeading] = useState('090');
  const [track, setTrack] = useState('090');
  const [windDirection, setWindDirection] = useState('045');
  const [distance, setDistance] = useState('100');
  const [distanceUnit, setDistanceUnit] = useState('nm');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const format = (val: number, digits = 3) => {
    if (!isFinite(val)) return 'Invalid';
    if (Math.abs(val) >= 1e6 || (Math.abs(val) < 0.001 && val !== 0)) return val.toExponential(4);
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  const speedToMps = (val: number, unit: string) => {
    switch (unit) {
      case 'kt':
        return val * 0.514444;
      case 'km/h':
        return val / 3.6;
      case 'mph':
        return val * 0.44704;
      case 'm/s':
        return val;
      default:
        return val;
    }
  };

  const mpsToUnit = (val: number, unit: string) => {
    switch (unit) {
      case 'kt':
        return val / 0.514444;
      case 'km/h':
        return val * 3.6;
      case 'mph':
        return val / 0.44704;
      case 'm/s':
        return val;
      default:
        return val;
    }
  };

  const distanceToMeters = (val: number, unit: string) => {
    switch (unit) {
      case 'nm':
        return val * 1852;
      case 'km':
        return val * 1000;
      case 'mi':
        return val * 1609.34;
      default:
        return val;
    }
  };

  const parsePositive = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num <= 0 ? NaN : num;
  };

  const getWindVector = (speedMps: number, windFromDeg: number) => {
    const toDeg = (windFromDeg + 180) % 360; // convert "from" to "to"
    const rad = degToRad(toDeg);
    return {
      x: speedMps * Math.sin(rad), // east
      y: speedMps * Math.cos(rad)  // north
    };
  };

  const getAircraftVector = (tasMps: number, headingDeg: number) => {
    const rad = degToRad(headingDeg);
    return {
      x: tasMps * Math.sin(rad),
      y: tasMps * Math.cos(rad)
    };
  };

  const computeGroundVector = (tasMps: number, headingDeg: number, windMps: number, windFromDeg: number) => {
    const a = getAircraftVector(tasMps, headingDeg);
    const w = getWindVector(windMps, windFromDeg);
    const gx = a.x + w.x;
    const gy = a.y + w.y;
    const gs = Math.sqrt(gx * gx + gy * gy);
    const trackDeg = radToDeg(Math.atan2(gx, gy));
    return { gs, trackDeg };
  };

  const handleCalculate = () => {
    setResult(null);
    setCalculation('');

    const tasVal = parsePositive(trueAirspeed);
    const windVal = parsePositive(windSpeed);
    const headingVal = parsePositive(heading);
    const trackVal = parsePositive(track);
    const windDirVal = parsePositive(windDirection);

    if (isNaN(tasVal) || isNaN(windVal) || isNaN(windDirVal)) {
      setCalculation('Please enter valid speed and direction values.');
      return;
    }

    const tasMps = speedToMps(tasVal, tasUnit);
    const windMps = speedToMps(windVal, windUnit);

    if (method === 'ground-speed') {
      if (isNaN(headingVal)) {
        setCalculation('Please enter valid heading.');
        return;
      }
      const { gs, trackDeg } = computeGroundVector(tasMps, headingVal, windMps, windDirVal);
      const gsOut = mpsToUnit(gs, tasUnit);
      const drift = headingVal - trackDeg;
      setResult({
        lines: [
          `True airspeed: ${format(tasVal)} ${tasUnit}`,
          `Wind: ${format(windVal)} ${windUnit} from ${format(windDirVal)}°`,
          `Ground speed: ${format(gsOut)} ${tasUnit}`,
          `Ground track: ${format(trackDeg)}°`,
          `Drift angle (heading - track): ${format(drift)}°`
        ]
      });
      setCalculation('Computed ground speed and track via vector wind correction.');
      return;
    }

    if (method === 'required-heading') {
      if (isNaN(trackVal)) {
        setCalculation('Please enter valid desired track.');
        return;
      }
      const windToRad = degToRad((windDirVal + 180) % 360);
      const desiredTrackRad = degToRad(trackVal);
      const windAngle = windToRad - desiredTrackRad;
      const windCross = windMps * Math.sin(windAngle);
      const windHead = windMps * Math.cos(windAngle);

      const ratio = windCross / tasMps;
      if (Math.abs(ratio) > 1) {
        setCalculation('Wind too strong to maintain track with given airspeed.');
        return;
      }
      const wcaRad = Math.asin(ratio); // wind correction angle
      const headingNeededDeg = radToDeg(desiredTrackRad + wcaRad);
      const groundSpeedMps = tasMps * Math.cos(wcaRad) + windHead;
      const groundSpeedOut = mpsToUnit(groundSpeedMps, tasUnit);

      setResult({
        lines: [
          `Desired track: ${format(trackVal)}°`,
          `Wind correction angle: ${format(radToDeg(wcaRad))}°`,
          `Required heading: ${format(headingNeededDeg)}°`,
          `Estimated ground speed: ${format(groundSpeedOut)} ${tasUnit}`
        ]
      });
      setCalculation('Computed required heading to stay on course with crosswind.');
      return;
    }

    if (method === 'wind-components') {
      if (isNaN(trackVal)) {
        setCalculation('Please enter valid runway or course heading.');
        return;
      }
      const angleDiffRad = degToRad((windDirVal - trackVal + 360) % 360);
      const head = windMps * Math.cos(angleDiffRad);
      const cross = windMps * Math.sin(angleDiffRad);
      const headOut = mpsToUnit(head, windUnit);
      const crossOut = mpsToUnit(Math.abs(cross), windUnit);
      setResult({
        lines: [
          `Runway/course heading: ${format(trackVal)}°`,
          `Wind: ${format(windVal)} ${windUnit} from ${format(windDirVal)}°`,
          head >= 0 ? `Headwind component: ${format(headOut)} ${windUnit}` : `Tailwind component: ${format(Math.abs(headOut))} ${windUnit}`,
          cross >= 0 ? `Crosswind from right: ${format(crossOut)} ${windUnit}` : `Crosswind from left: ${format(crossOut)} ${windUnit}`
        ]
      });
      setCalculation('Computed headwind/tailwind and crosswind components.');
      return;
    }

    if (method === 'time-distance') {
      const distVal = parsePositive(distance);
      if (isNaN(distVal) || isNaN(trackVal)) {
        setCalculation('Please enter valid distance and track.');
        return;
      }
      const distMeters = distanceToMeters(distVal, distanceUnit);
      const { gs } = computeGroundVector(tasMps, trackVal, windMps, windDirVal);
      if (gs <= 0) {
        setCalculation('Ground speed must be positive.');
        return;
      }
      const timeSeconds = distMeters / gs;
      const hours = timeSeconds / 3600;
      const gsOut = mpsToUnit(gs, tasUnit);
      setResult({
        lines: [
          `Ground speed: ${format(gsOut)} ${tasUnit}`,
          `Distance: ${format(distVal)} ${distanceUnit}`,
          `Estimated time: ${format(hours)} hours (${format(hours * 60)} minutes)`
        ]
      });
      setCalculation('Estimated travel time using ground speed with wind.');
      return;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🛫</span>
          <h1 className="text-2xl font-bold text-gray-900">Ground Speed Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate ground speed, wind components, required heading, and travel time considering wind.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'ground-speed' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="ground-speed" checked={method === 'ground-speed'} onChange={() => setMethod('ground-speed')} className="mr-2" />
              Ground speed & track
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'required-heading' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="required-heading" checked={method === 'required-heading'} onChange={() => setMethod('required-heading')} className="mr-2" />
              Required heading
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'wind-components' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="wind-components" checked={method === 'wind-components'} onChange={() => setMethod('wind-components')} className="mr-2" />
              Wind components
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'time-distance' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="time-distance" checked={method === 'time-distance'} onChange={() => setMethod('time-distance')} className="mr-2" />
              Time & distance
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {/* Common inputs */}
          <div className="flex gap-3">
            <div className="flex-1">
              <Input label="True Airspeed" value={trueAirspeed} onChange={(e) => setTrueAirspeed(e.target.value)} type="number" placeholder="e.g., 120" />
            </div>
            <div className="w-32">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
              <select value={tasUnit} onChange={(e) => setTasUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                <option value="kt">kt</option>
                <option value="km/h">km/h</option>
                <option value="mph">mph</option>
                <option value="m/s">m/s</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <Input label="Wind Speed" value={windSpeed} onChange={(e) => setWindSpeed(e.target.value)} type="number" placeholder="e.g., 20" />
            </div>
            <div className="w-32">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
              <select value={windUnit} onChange={(e) => setWindUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                <option value="kt">kt</option>
                <option value="km/h">km/h</option>
                <option value="mph">mph</option>
                <option value="m/s">m/s</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <Input label="Wind Direction (from)" value={windDirection} onChange={(e) => setWindDirection(e.target.value)} type="number" placeholder="e.g., 045" />
            </div>
            {(method === 'ground-speed' || method === 'required-heading' || method === 'time-distance') && (
              <div className="flex-1">
                <Input label="Heading / Course" value={method === 'required-heading' ? track : heading} onChange={(e) => method === 'required-heading' ? setTrack(e.target.value) : setHeading(e.target.value)} type="number" placeholder="e.g., 090" />
              </div>
            )}
            {method === 'wind-components' && (
              <div className="flex-1">
                <Input label="Runway / Track Heading" value={track} onChange={(e) => setTrack(e.target.value)} type="number" placeholder="e.g., 270" />
              </div>
            )}
          </div>

          {method === 'time-distance' && (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Distance" value={distance} onChange={(e) => setDistance(e.target.value)} type="number" placeholder="e.g., 100" />
              </div>
              <div className="w-28">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                <select value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                  <option value="nm">nm</option>
                  <option value="km">km</option>
                  <option value="mi">mi</option>
                </select>
              </div>
            </div>
          )}

          {method === 'required-heading' && (
            <p className="text-sm text-gray-600">Provide desired track (Course) in Heading / Course field.</p>
          )}

          <Button onClick={handleCalculate} className="w-full bg-[#820ECC] text-white font-semibold py-3 rounded-lg hover:bg-[#6b0aa6] transition">
            Calculate
          </Button>

          {result && (
            <div className="bg-[#820ECC]/10 border-l-4 border-[#820ECC] p-4 rounded">
              <p className="text-gray-600 text-sm mb-2">{calculation}</p>
              <ul className="list-disc list-inside space-y-1 text-gray-800">
                {result.lines.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
