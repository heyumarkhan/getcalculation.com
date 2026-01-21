'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Method = 'altitude-azimuth' | 'solar-noon' | 'sunrise-sunset' | 'solar-declination';

type Result = {
  lines: string[];
};

export default function SunAngleCalculator() {
  const [method, setMethod] = useState<Method>('altitude-azimuth');

  // Inputs
  const [latitude, setLatitude] = useState('40');
  const [longitude, setLongitude] = useState('74');
  const [month, setMonth] = useState('6');
  const [day, setDay] = useState('21');
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('0');
  const [timezone, setTimezone] = useState('-5');
  const [dayOfYear, setDayOfYear] = useState('');

  const [result, setResult] = useState<Result | null>(null);
  const [calculation, setCalculation] = useState('');

  const format = (val: number, digits = 2) => {
    if (!isFinite(val)) return 'Invalid';
    return val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  const getDayOfYear = (month: number, day: number): number => {
    const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let total = 0;
    for (let i = 0; i < month - 1; i++) {
      total += daysInMonths[i];
    }
    return total + day;
  };

  const calculateSolarDeclination = (dayOfYear: number): number => {
    return 23.44 * Math.sin((2 * Math.PI * (dayOfYear - 81)) / 365);
  };

  const calculateEquationOfTime = (dayOfYear: number): number => {
    const b = (2 * Math.PI * (dayOfYear - 1)) / 365;
    return (
      229.18 *
      (0.000075 +
        0.001868 * Math.cos(b) -
        0.032077 * Math.sin(b) -
        0.014615 * Math.cos(2 * b) -
        0.040849 * Math.sin(2 * b))
    );
  };

  const handleCalculate = () => {
    setResult(null);
    setCalculation('');

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);
    const hourNum = parseInt(hour);
    const minNum = parseInt(minute);
    const tzNum = parseInt(timezone);

    if (
      isNaN(lat) || isNaN(lon) || isNaN(monthNum) || isNaN(dayNum) ||
      isNaN(hourNum) || isNaN(minNum) || isNaN(tzNum) ||
      monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31 ||
      hourNum < 0 || hourNum > 23 || minNum < 0 || minNum > 59
    ) {
      setCalculation('Please enter valid latitude, longitude, date, time, and timezone.');
      return;
    }

    const n = getDayOfYear(monthNum, dayNum);
    const delta = calculateSolarDeclination(n);
    const eot = calculateEquationOfTime(n);

    if (method === 'altitude-azimuth') {
      const localTime = hourNum + minNum / 60;
      const solarTime = localTime + lon / 15 + eot / 60 - tzNum;
      const hourAngle = (solarTime - 12) * 15;

      const latRad = (lat * Math.PI) / 180;
      const deltaRad = (delta * Math.PI) / 180;
      const haRad = (hourAngle * Math.PI) / 180;

      const altSin = Math.sin(latRad) * Math.sin(deltaRad) + Math.cos(latRad) * Math.cos(deltaRad) * Math.cos(haRad);
      const altitude = Math.asin(altSin) * (180 / Math.PI);

      const azNum = Math.sin(haRad);
      const azDen = Math.cos(haRad) * Math.sin(latRad) - Math.tan(deltaRad) * Math.cos(latRad);
      let azimuth = Math.atan2(azNum, azDen) * (180 / Math.PI) + 180;

      setResult({
        lines: [
          `Day of year: ${n}`,
          `Solar declination: ${format(delta)}°`,
          `Equation of time: ${format(eot)} minutes`,
          `Solar time: ${format(solarTime, 2)} h`,
          `Hour angle: ${format(hourAngle)}°`,
          `Solar altitude: ${format(altitude)}°${altitude < 0 ? ' (below horizon)' : ''}`,
          `Solar azimuth: ${format(azimuth)}° (0° = North, 90° = East, 180° = South, 270° = West)`
        ]
      });
      setCalculation('Computed solar position (altitude and azimuth) for given location and time.');
      return;
    }

    if (method === 'solar-noon') {
      const solarNoonTime = 12 - lon / 15 - eot / 60 + tzNum;
      const altSolar = 90 - Math.abs(lat - delta);

      setResult({
        lines: [
          `Day of year: ${n}`,
          `Solar declination: ${format(delta)}°`,
          `Equation of time: ${format(eot)} minutes`,
          `Solar noon (local): ${format(solarNoonTime)}:00 (${Math.floor(solarNoonTime)}:${Math.round((solarNoonTime % 1) * 60).toString().padStart(2, '0')})`,
          `Maximum solar altitude at noon: ${format(altSolar)}°`
        ]
      });
      setCalculation('Computed solar noon and maximum solar altitude for given date and location.');
      return;
    }

    if (method === 'sunrise-sunset') {
      const latRad = (lat * Math.PI) / 180;
      const deltaRad = (delta * Math.PI) / 180;

      const cosHa = -Math.tan(latRad) * Math.tan(deltaRad);
      if (Math.abs(cosHa) > 1) {
        if (cosHa < -1) {
          setCalculation('Midnight sun (sun never sets) at this latitude and date.');
        } else {
          setCalculation('Polar night (sun never rises) at this latitude and date.');
        }
        setResult({
          lines: [`Latitude: ${format(lat)}°`, `Declination: ${format(delta)}°`]
        });
        return;
      }

      const haRad = Math.acos(cosHa);
      const ha = (haRad * 180) / Math.PI;
      const eot = calculateEquationOfTime(n);

      const sunriseTime = 12 - ha / 15 - lon / 15 - eot / 60 + tzNum;
      const sunsetTime = 12 + ha / 15 - lon / 15 - eot / 60 + tzNum;
      const dayLength = 2 * ha / 15;

      setResult({
        lines: [
          `Day of year: ${n}`,
          `Solar declination: ${format(delta)}°`,
          `Hour angle at sunrise/sunset: ${format(ha)}°`,
          `Sunrise: ${Math.floor(sunriseTime)}:${Math.round((sunriseTime % 1) * 60).toString().padStart(2, '0')}`,
          `Sunset: ${Math.floor(sunsetTime)}:${Math.round((sunsetTime % 1) * 60).toString().padStart(2, '0')}`,
          `Day length: ${format(dayLength)} hours`
        ]
      });
      setCalculation('Computed sunrise, sunset, and day length for given location and date.');
      return;
    }

    if (method === 'solar-declination') {
      setResult({
        lines: [
          `Day of year: ${n}`,
          `Solar declination δ: ${format(delta)}°`,
          `Declination range: -23.44° (winter solstice) to +23.44° (summer solstice)`,
          `Positive: Sun north of celestial equator; Negative: Sun south`,
          `Used in: solar altitude/azimuth, sunrise/sunset, solar energy calculations`
        ]
      });
      setCalculation('Computed solar declination using Spencer equation.');
      return;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">☀️</span>
          <h1 className="text-2xl font-bold text-gray-900">Sun Angle Calculator</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Calculate solar altitude, azimuth, sunrise, sunset, and declination for any location and time.
        </p>

        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Select method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'altitude-azimuth' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="altitude-azimuth" checked={method === 'altitude-azimuth'} onChange={() => setMethod('altitude-azimuth')} className="mr-2" />
              Solar altitude & azimuth
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'solar-noon' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="solar-noon" checked={method === 'solar-noon'} onChange={() => setMethod('solar-noon')} className="mr-2" />
              Solar noon & max altitude
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'sunrise-sunset' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="sunrise-sunset" checked={method === 'sunrise-sunset'} onChange={() => setMethod('sunrise-sunset')} className="mr-2" />
              Sunrise, sunset, day length
            </label>
            <label className={`p-3 rounded-lg border cursor-pointer ${method === 'solar-declination' ? 'border-[#820ECC] bg-[#820ECC]/10' : 'border-gray-200'}`}>
              <input type="radio" name="method" value="solar-declination" checked={method === 'solar-declination'} onChange={() => setMethod('solar-declination')} className="mr-2" />
              Solar declination (δ)
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input label="Latitude (°)" value={latitude} onChange={(e) => setLatitude(e.target.value)} type="number" placeholder="e.g., 40" />
            <Input label="Longitude (°)" value={longitude} onChange={(e) => setLongitude(e.target.value)} type="number" placeholder="e.g., -74" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Month</label>
              <select value={month} onChange={(e) => setMonth(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]">
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <Input label="Day" value={day} onChange={(e) => setDay(e.target.value)} type="number" placeholder="1-31" />
            <Input label="Hour (UTC)" value={hour} onChange={(e) => setHour(e.target.value)} type="number" placeholder="0-23" />
            <Input label="Minute" value={minute} onChange={(e) => setMinute(e.target.value)} type="number" placeholder="0-59" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input label="Timezone offset (hours from UTC)" value={timezone} onChange={(e) => setTimezone(e.target.value)} type="number" placeholder="e.g., -5" />
          </div>

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
