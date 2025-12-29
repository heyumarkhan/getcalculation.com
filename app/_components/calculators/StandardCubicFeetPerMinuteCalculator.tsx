'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Standard conditions (commonly used)
const STANDARD_PRESSURE_PSIA = 14.7; // PSIA
const STANDARD_TEMP_F = 60; // °F
const STANDARD_TEMP_R = STANDARD_TEMP_F + 459.67; // Rankine

// Unit conversion factors
const flowRateUnits = {
  'scfm': { name: 'SCFM (Standard CFM)', factor: 1, isSCFM: true },
  'acfm': { name: 'ACFM (Actual CFM)', factor: 1, isSCFM: false },
  'cfm': { name: 'CFM (Cubic Feet/Min)', factor: 1, isSCFM: false },
  'lpm': { name: 'L/min (Liters/Min)', factor: 0.0353147, isSCFM: false },
  'm3pm': { name: 'm³/min (Cubic Meters/Min)', factor: 35.3147, isSCFM: false },
  'gpm': { name: 'GPM (Gallons/Min)', factor: 0.133681, isSCFM: false }
};

const pressureUnits = {
  'psia': { name: 'PSIA (Absolute)', factor: 1 },
  'psig': { name: 'PSIG (Gauge)', factor: 1, isGauge: true },
  'bar': { name: 'Bar (Absolute)', factor: 14.5038 },
  'barg': { name: 'Bar (Gauge)', factor: 14.5038, isGauge: true },
  'kPa': { name: 'kPa (Absolute)', factor: 0.145038 },
  'kPag': { name: 'kPa (Gauge)', factor: 0.145038, isGauge: true },
  'Pa': { name: 'Pa (Absolute)', factor: 0.000145038 },
  'Pag': { name: 'Pa (Gauge)', factor: 0.000145038, isGauge: true },
  'atm': { name: 'Atmosphere', factor: 14.6959 }
};

const temperatureUnits = {
  'F': { name: '°F (Fahrenheit)', factor: 1, offset: 0, toRankine: (t: number) => t + 459.67 },
  'C': { name: '°C (Celsius)', factor: 1, offset: 0, toRankine: (t: number) => (t + 273.15) * 9/5 },
  'K': { name: 'K (Kelvin)', factor: 1, offset: 0, toRankine: (t: number) => t * 9/5 },
  'R': { name: '°R (Rankine)', factor: 1, offset: 0, toRankine: (t: number) => t }
};

interface StandardCubicFeetPerMinuteCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function StandardCubicFeetPerMinuteCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: StandardCubicFeetPerMinuteCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'acfm-to-scfm' | 'scfm-to-acfm'>('acfm-to-scfm');
  const [flowRate, setFlowRate] = useState('');
  const [pressure, setPressure] = useState('');
  const [temperature, setTemperature] = useState('');
  const [flowRateUnit, setFlowRateUnit] = useState('acfm');
  const [pressureUnit, setPressureUnit] = useState('psig');
  const [temperatureUnit, setTemperatureUnit] = useState('F');
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
  const [calculation, setCalculation] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    return value.toFixed(4);
  };

  const convertFlowToCFM = (value: number, unit: string): number => {
    const unitData = flowRateUnits[unit as keyof typeof flowRateUnits];
    return value / unitData.factor;
  };

  const convertCFMToFlow = (value: number, unit: string): number => {
    const unitData = flowRateUnits[unit as keyof typeof flowRateUnits];
    return value * unitData.factor;
  };

  const convertPressureToPSIA = (value: number, unit: string): number => {
    const unitData = pressureUnits[unit as keyof typeof pressureUnits];
    const pressureInPSI = value * unitData.factor;
    // If gauge pressure, add atmospheric pressure
    if ('isGauge' in unitData && unitData.isGauge) {
      return pressureInPSI + STANDARD_PRESSURE_PSIA;
    }
    return pressureInPSI;
  };

  const convertTemperatureToRankine = (value: number, unit: string): number => {
    const unitData = temperatureUnits[unit as keyof typeof temperatureUnits];
    return unitData.toRankine(value);
  };

  const calculateSCFM = () => {
    const flow = parseFloat(flowRate);
    const p = parseFloat(pressure);
    const t = parseFloat(temperature);

    if (!flowRate || !pressure || !temperature || isNaN(flow) || isNaN(p) || isNaN(t) || flow <= 0 || p <= 0) {
      setResult(null);
      setCalculation('');
      return;
    }

    // Convert to base units
    const flowInCFM = convertFlowToCFM(flow, flowRateUnit);
    const pressureInPSIA = convertPressureToPSIA(p, pressureUnit);
    const tempInRankine = convertTemperatureToRankine(t, temperatureUnit);

    if (tempInRankine <= 0) {
      setResult(null);
      setCalculation('Temperature must be greater than absolute zero.');
      return;
    }

    let scfm: number;
    let calcStr: string;

    if (calculationType === 'acfm-to-scfm') {
      // SCFM = ACFM × (P_actual / P_standard) × (T_standard / T_actual)
      scfm = flowInCFM * (pressureInPSIA / STANDARD_PRESSURE_PSIA) * (STANDARD_TEMP_R / tempInRankine);
      calcStr = `SCFM = ACFM × (P_actual / P_standard) × (T_standard / T_actual)\n`;
      calcStr += `SCFM = ${formatValue(flowInCFM)} CFM × (${formatValue(pressureInPSIA)} PSIA / ${STANDARD_PRESSURE_PSIA} PSIA) × (${STANDARD_TEMP_R} °R / ${formatValue(tempInRankine)} °R)\n`;
      calcStr += `SCFM = ${formatValue(scfm)} SCFM`;
    } else {
      // ACFM = SCFM × (P_standard / P_actual) × (T_actual / T_standard)
      scfm = flowInCFM * (STANDARD_PRESSURE_PSIA / pressureInPSIA) * (tempInRankine / STANDARD_TEMP_R);
      calcStr = `ACFM = SCFM × (P_standard / P_actual) × (T_actual / T_standard)\n`;
      calcStr += `ACFM = ${formatValue(flowInCFM)} SCFM × (${STANDARD_PRESSURE_PSIA} PSIA / ${formatValue(pressureInPSIA)} PSIA) × (${formatValue(tempInRankine)} °R / ${STANDARD_TEMP_R} °R)\n`;
      calcStr += `ACFM = ${formatValue(scfm)} ACFM`;
    }

    // Convert result to selected unit
    const resultInSelectedUnit = convertCFMToFlow(scfm, calculationType === 'acfm-to-scfm' ? 'scfm' : 'acfm');
    const resultUnit = calculationType === 'acfm-to-scfm' ? 'scfm' : 'acfm';

    setResult({ value: resultInSelectedUnit, unit: resultUnit });
    setCalculation(calcStr);
  };

  const clearAll = () => {
    setCalculationType('acfm-to-scfm');
    setFlowRate('');
    setPressure('');
    setTemperature('');
    setFlowRateUnit('acfm');
    setPressureUnit('psig');
    setTemperatureUnit('F');
    setResult(null);
    setCalculation('');
  };

  const buttonStyle = {
    backgroundColor: primaryColor,
  } as React.CSSProperties;

  const outlineButtonStyle = {
    color: primaryColor,
    borderColor: primaryColor,
  } as React.CSSProperties;

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-color-button {
            background-color: ${primaryColor};
          }
          .custom-color-button:hover {
            background-color: ${primaryColor}dd !important;
          }
          .custom-color-button:focus {
            box-shadow: 0 0 0 3px ${primaryColor}40 !important;
          }
          .custom-outline-button {
            color: ${primaryColor};
            border-color: ${primaryColor};
          }
          .custom-outline-button:hover {
            background-color: ${primaryColor}10 !important;
          }
          .custom-outline-button:focus {
            box-shadow: 0 0 0 3px ${primaryColor}40 !important;
          }
        `
      }} />
      <Card className="p-6 max-w-xl mx-auto">
        {showTitle && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Standard Cubic Feet per Minute Calculator</h2>
            <p className="text-gray-600">Convert between SCFM and ACFM using pressure and temperature corrections</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="calculationType" className="block text-sm font-medium text-gray-700 mb-3">
              Calculation Type
            </label>
            <select
              id="calculationType"
              value={calculationType}
              onChange={(e) => {
                const newType = e.target.value as 'acfm-to-scfm' | 'scfm-to-acfm';
                setCalculationType(newType);
                // Set to a unit that will be available for the new calculation type
                if (newType === 'acfm-to-scfm') {
                  setFlowRateUnit('acfm');
                } else {
                  setFlowRateUnit('scfm');
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="acfm-to-scfm">ACFM to SCFM</option>
              <option value="scfm-to-acfm">SCFM to ACFM</option>
            </select>
          </div>

          <div>
            <label htmlFor="flowRate" className="block text-sm font-medium text-gray-700 mb-3">
              Flow Rate ({calculationType === 'acfm-to-scfm' ? 'ACFM' : 'SCFM'})
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  id="flowRate"
                  type="text"
                  placeholder={`Enter ${calculationType === 'acfm-to-scfm' ? 'ACFM' : 'SCFM'}`}
                  value={flowRate}
                  onChange={(e) => setFlowRate(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-40">
                <select
                  value={flowRateUnit}
                  onChange={(e) => setFlowRateUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(flowRateUnits).filter(([key]) => {
                    if (calculationType === 'acfm-to-scfm') {
                      return key !== 'scfm';
                    } else {
                      return key !== 'acfm';
                    }
                  }).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="pressure" className="block text-sm font-medium text-gray-700 mb-3">
              Pressure
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  id="pressure"
                  type="text"
                  placeholder="Enter pressure"
                  value={pressure}
                  onChange={(e) => setPressure(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-40">
                <select
                  value={pressureUnit}
                  onChange={(e) => setPressureUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(pressureUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-3">
              Temperature
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  id="temperature"
                  type="text"
                  placeholder="Enter temperature"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-40">
                <select
                  value={temperatureUnit}
                  onChange={(e) => setTemperatureUnit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(temperatureUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={calculateSCFM} className="flex-1 custom-color-button">
              Calculate
            </Button>
            <Button onClick={clearAll} variant="outline" className="flex-1 custom-outline-button">
              Clear
            </Button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-fadeIn">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Result</h3>
              <p className="text-2xl font-bold text-blue-700">
                {formatValue(result.value)} {result.unit.toUpperCase()}
              </p>
              {calculation && (
                <p className="text-sm text-blue-600 mt-2 font-mono whitespace-pre-line">
                  {calculation}
                </p>
              )}
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Select calculation type (ACFM to SCFM or SCFM to ACFM)</li>
              <li>• Enter the flow rate in the appropriate unit</li>
              <li>• Enter the actual operating pressure</li>
              <li>• Enter the actual operating temperature</li>
              <li>• Select appropriate units for each input</li>
              <li>• Click "Calculate" to convert between SCFM and ACFM</li>
              <li>• Standard conditions: 14.7 PSIA, 60°F (520°R)</li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}

