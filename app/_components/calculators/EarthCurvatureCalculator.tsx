'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Earth's radius in meters (mean radius)
const EARTH_RADIUS_M = 6371000; // meters
const EARTH_RADIUS_KM = 6371; // kilometers
const EARTH_RADIUS_MI = 3958.8; // miles
const EARTH_RADIUS_FT = 20902231; // feet

// Unit conversion factors (all relative to base unit: meters)
const distanceUnits = {
  'm': { name: 'Meters', factor: 1 },
  'km': { name: 'Kilometers', factor: 1000 },
  'mi': { name: 'Miles', factor: 1609.34 },
  'ft': { name: 'Feet', factor: 0.3048 },
  'yd': { name: 'Yards', factor: 0.9144 },
  'cm': { name: 'Centimeters', factor: 0.01 },
  'mm': { name: 'Millimeters', factor: 0.001 }
};

const heightUnits = {
  'm': { name: 'Meters', factor: 1 },
  'km': { name: 'Kilometers', factor: 1000 },
  'mi': { name: 'Miles', factor: 1609.34 },
  'ft': { name: 'Feet', factor: 0.3048 },
  'yd': { name: 'Yards', factor: 0.9144 },
  'cm': { name: 'Centimeters', factor: 0.01 },
  'mm': { name: 'Millimeters', factor: 0.001 }
};

export default function EarthCurvatureCalculator() {
  const [calculationType, setCalculationType] = useState<'drop' | 'horizon' | 'hidden'>('drop');
  const [distance, setDistance] = useState('');
  const [observerHeight, setObserverHeight] = useState('');
  const [objectHeight, setObjectHeight] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('km');
  const [heightUnit, setHeightUnit] = useState('m');
  const [objectHeightUnit, setObjectHeightUnit] = useState('m');
  const [result, setResult] = useState<{ value: number; unit: string; type: string } | null>(null);
  const [calculation, setCalculation] = useState('');
  const [error, setError] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 0.000001 && value !== 0) {
      return value.toExponential(4);
    }
    if (Math.abs(value) >= 1000000) {
      return value.toExponential(4);
    }
    if (value < 0.01 && value > 0) {
      return value.toFixed(6).replace(/\.?0+$/, '');
    }
    return value.toFixed(4).replace(/\.?0+$/, '');
  };

  const convertToMeters = (value: number, unit: string): number => {
    return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertFromMeters = (value: number, unit: string): number => {
    return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertHeightToMeters = (value: number, unit: string): number => {
    return value * heightUnits[unit as keyof typeof heightUnits].factor;
  };

  const convertHeightFromMeters = (value: number, unit: string): number => {
    return value / heightUnits[unit as keyof typeof heightUnits].factor;
  };

  // Calculate curvature drop: h = R - √(R² - d²)
  const calculateDrop = (distanceM: number): number => {
    if (distanceM >= EARTH_RADIUS_M) {
      return EARTH_RADIUS_M; // Maximum drop equals Earth radius
    }
    const drop = EARTH_RADIUS_M - Math.sqrt(EARTH_RADIUS_M * EARTH_RADIUS_M - distanceM * distanceM);
    return drop;
  };

  // Calculate distance to horizon: d = √(2Rh + h²)
  const calculateHorizonDistance = (heightM: number): number => {
    if (heightM <= 0) return 0;
    const distance = Math.sqrt(2 * EARTH_RADIUS_M * heightM + heightM * heightM);
    return distance;
  };

  // Calculate hidden height of object
  const calculateHiddenHeight = (distanceM: number, objectHeightM: number, observerHeightM: number): number => {
    // Calculate horizon distance from observer
    const horizonDistance = calculateHorizonDistance(observerHeightM);
    
    if (distanceM <= horizonDistance) {
      return 0; // Object is within horizon, not hidden
    }

    // Distance beyond horizon
    const distanceBeyondHorizon = distanceM - horizonDistance;
    
    // Calculate drop at the object's position
    const dropAtObject = calculateDrop(distanceM);
    
    // Calculate how much is hidden
    // Simplified calculation: hidden height ≈ drop_at_distance - drop_at_horizon
    const dropAtHorizon = calculateDrop(horizonDistance);
    const curvatureEffect = dropAtObject - dropAtHorizon;
    
    // More accurate: use similar triangles and geometric relationships
    const hidden = (distanceBeyondHorizon * distanceBeyondHorizon) / (2 * EARTH_RADIUS_M);
    
    // Cap at object height
    return Math.min(hidden, objectHeightM);
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    if (calculationType === 'drop') {
      if (!distance || distance.trim() === '') {
        setError('Please enter a distance');
        return;
      }

      const distValue = parseFloat(distance);
      if (isNaN(distValue) || distValue < 0) {
        setError('Please enter a valid positive number for distance');
        return;
      }

      const distanceM = convertToMeters(distValue, distanceUnit);
      
      if (distanceM > EARTH_RADIUS_M * 2) {
        setError('Distance exceeds Earth diameter. Please enter a smaller distance.');
        return;
      }

      const dropM = calculateDrop(distanceM);
      const dropResult = convertHeightFromMeters(dropM, heightUnit);

      setResult({ value: dropResult, unit: heightUnit, type: 'drop' });
      
      // Calculate using approximation for comparison
      const approximateDrop = (distanceM * distanceM) / (2 * EARTH_RADIUS_M);
      const approximateDropResult = convertHeightFromMeters(approximateDrop, heightUnit);

      setCalculation(`Exact formula: h = R - √(R² - d²)\nh = ${formatValue(EARTH_RADIUS_M / 1000)} km - √((${formatValue(EARTH_RADIUS_M / 1000)} km)² - (${formatValue(distanceM / 1000)} km)²) = ${formatValue(dropM)} m\n\nApproximation (for small distances): h ≈ d² / (2R) ≈ ${formatValue(approximateDropResult)} ${heightUnit}\n\nResult: ${formatValue(dropResult)} ${heightUnit}`);
    } else if (calculationType === 'horizon') {
      if (!observerHeight || observerHeight.trim() === '') {
        setError('Please enter observer height');
        return;
      }

      const heightValue = parseFloat(observerHeight);
      if (isNaN(heightValue) || heightValue < 0) {
        setError('Please enter a valid positive number for observer height');
        return;
      }

      const heightM = convertHeightToMeters(heightValue, heightUnit);
      const horizonDistanceM = calculateHorizonDistance(heightM);
      const horizonDistanceResult = convertFromMeters(horizonDistanceM, distanceUnit);

      setResult({ value: horizonDistanceResult, unit: distanceUnit, type: 'horizon' });

      // Approximation for comparison
      const approximateDistance = Math.sqrt(2 * EARTH_RADIUS_M * heightM);
      const approximateDistanceResult = convertFromMeters(approximateDistance, distanceUnit);

      setCalculation(`Exact formula: d = √(2Rh + h²)\nd = √(2 × ${formatValue(EARTH_RADIUS_M / 1000)} km × ${formatValue(heightM)} m + (${formatValue(heightM)} m)²) = ${formatValue(horizonDistanceM / 1000)} km\n\nApproximation (for small heights): d ≈ √(2Rh) ≈ ${formatValue(approximateDistanceResult)} ${distanceUnit}\n\nResult: ${formatValue(horizonDistanceResult)} ${distanceUnit}`);
    } else if (calculationType === 'hidden') {
      if (!distance || !observerHeight || !objectHeight) {
        setError('Please enter distance, observer height, and object height');
        return;
      }

      const distValue = parseFloat(distance);
      const obsHeightValue = parseFloat(observerHeight);
      const objHeightValue = parseFloat(objectHeight);

      if (isNaN(distValue) || distValue < 0 || isNaN(obsHeightValue) || obsHeightValue < 0 || isNaN(objHeightValue) || objHeightValue < 0) {
        setError('Please enter valid positive numbers');
        return;
      }

      const distanceM = convertToMeters(distValue, distanceUnit);
      const observerHeightM = convertHeightToMeters(obsHeightValue, heightUnit);
      const objectHeightM = convertHeightToMeters(objHeightValue, objectHeightUnit);

      const hiddenHeightM = calculateHiddenHeight(distanceM, objectHeightM, observerHeightM);
      const hiddenHeightResult = convertHeightFromMeters(hiddenHeightM, heightUnit);

      const horizonDistanceM = calculateHorizonDistance(observerHeightM);
      const horizonDistanceResult = convertFromMeters(horizonDistanceM, distanceUnit);

      setResult({ value: hiddenHeightResult, unit: heightUnit, type: 'hidden' });

      setCalculation(`Horizon distance from observer: ${formatValue(horizonDistanceResult)} ${distanceUnit}\nDistance to object: ${formatValue(distValue)} ${distanceUnit}\n\nHidden height calculation:\nThe object is ${distanceM > horizonDistanceM ? `${formatValue((distanceM - horizonDistanceM) / 1000)} km beyond the horizon` : 'within the horizon'}.\n\nHidden height ≈ ${formatValue(hiddenHeightResult)} ${heightUnit} (out of ${formatValue(convertHeightFromMeters(objectHeightM, heightUnit))} ${heightUnit} total height)`);
    }
  };

  const clearAll = () => {
    setCalculationType('drop');
    setDistance('');
    setObserverHeight('');
    setObjectHeight('');
    setDistanceUnit('km');
    setHeightUnit('m');
    setObjectHeightUnit('m');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Earth Curvature Calculator</h2>
        <p className="text-gray-600">Calculate curvature drop, horizon distance, or hidden object height</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Calculation Type:</p>
          <select
            value={calculationType}
            onChange={(e) => setCalculationType(e.target.value as 'drop' | 'horizon' | 'hidden')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm font-medium"
          >
            <option value="drop">Curvature Drop at Distance</option>
            <option value="horizon">Distance to Horizon</option>
            <option value="hidden">Hidden Object Height</option>
          </select>
          <p className="text-xs text-gray-500 mt-2">
            {calculationType === 'drop' && 'Formula: h = R - √(R² - d²) where R = 6,371 km'}
            {calculationType === 'horizon' && 'Formula: d = √(2Rh + h²) where R = 6,371 km'}
            {calculationType === 'hidden' && 'Calculates how much of an object is hidden by Earth\'s curvature'}
          </p>
        </div>

        {/* Distance Input (for drop and hidden calculations) */}
        {(calculationType === 'drop' || calculationType === 'hidden') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Distance {calculationType === 'drop' ? 'from Observer' : 'to Object'}
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter distance"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="w-32">
                <select
                  value={distanceUnit}
                  onChange={(e) => setDistanceUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(distanceUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Observer Height Input (for horizon and hidden calculations) */}
        {(calculationType === 'horizon' || calculationType === 'hidden') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Observer Height
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter observer height"
                  value={observerHeight}
                  onChange={(e) => setObserverHeight(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
                <select
                  value={heightUnit}
                  onChange={(e) => setHeightUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(heightUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Object Height Input (for hidden calculation) */}
        {calculationType === 'hidden' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Object Height
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter object height"
                  value={objectHeight}
                  onChange={(e) => setObjectHeight(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
                <select
                  value={objectHeightUnit}
                  onChange={(e) => setObjectHeightUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(heightUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button onClick={calculate} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg">
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">
              {result.type === 'drop' && 'Curvature Drop'}
              {result.type === 'horizon' && 'Distance to Horizon'}
              {result.type === 'hidden' && 'Hidden Height'}
            </h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && (
              <div className="mt-4 pt-4 border-t border-[#820ECC]/30">
                <p className="text-xs text-gray-600 mb-2 font-semibold">Calculation Details:</p>
                <p className="text-sm text-[#820ECC]/80 font-mono whitespace-pre-line break-words">
                  {calculation}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {calculationType === 'drop' && (
              <>
                <li>• Enter the distance from the observer</li>
                <li>• The calculator shows how much the Earth curves (drops) at that distance</li>
                <li>• Formula: h = R - √(R² - d²) where R = 6,371 km</li>
                <li>• For small distances, approximation: h ≈ d² / (2R)</li>
              </>
            )}
            {calculationType === 'horizon' && (
              <>
                <li>• Enter the observer height (eye level above sea level)</li>
                <li>• The calculator shows the distance to the visible horizon</li>
                <li>• Formula: d = √(2Rh + h²) where R = 6,371 km</li>
                <li>• For small heights, approximation: d ≈ √(2Rh)</li>
              </>
            )}
            {calculationType === 'hidden' && (
              <>
                <li>• Enter distance to object, observer height, and object height</li>
                <li>• The calculator shows how much of the object is hidden by curvature</li>
                <li>• Accounts for observer height and Earth&apos;s curvature</li>
              </>
            )}
            <li>• Select your preferred units for each measurement</li>
            <li>• Earth radius used: 6,371 km (3,959 miles)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

