"use client";

import { useState } from "react";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function DistanceAttenuationCalculator() {
  const primaryColor = "#820ECC";
  const [levelDb, setLevelDb] = useState<string>("90");
  const [referenceDistance, setReferenceDistance] = useState<string>("1");
  const [targetDistance, setTargetDistance] = useState<string>("10");
  const [result, setResult] = useState<{ level: number; loss: number; steps: string } | null>(null);
  const [error, setError] = useState<string>("");

  const format = (val: number) => {
    if (!isFinite(val)) return "—";
    return val.toFixed(2).replace(/\.0+$/, "").replace(/(\.\d*?[1-9])0+$/, "$1");
  };

  const calculate = () => {
    setError("");
    setResult(null);

    const L1 = parseFloat(levelDb);
    const d1 = parseFloat(referenceDistance);
    const d2 = parseFloat(targetDistance);

    if ([L1, d1, d2].some((v) => isNaN(v))) {
      setError("Enter valid numeric values for level and distances.");
      return;
    }
    if (d1 <= 0 || d2 <= 0) {
      setError("Distances must be positive.");
      return;
    }

    const loss = 20 * Math.log10(d2 / d1);
    const L2 = L1 - loss;

    const steps = [
      "Inverse square law (sound level): L2 = L1 - 20 · log10(r2 / r1)",
      `L1 = ${format(L1)} dB, r1 = ${format(d1)} m, r2 = ${format(d2)} m`,
      `Loss = 20 · log10(${format(d2)} / ${format(d1)}) = ${format(loss)} dB`,
      `L2 = ${format(L1)} dB - ${format(loss)} dB = ${format(L2)} dB`
    ].join("\n");

    setResult({ level: L2, loss, steps });
  };

  const reset = () => {
    setLevelDb("90");
    setReferenceDistance("1");
    setTargetDistance("10");
    setResult(null);
    setError("");
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div
          className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4"
          style={{ borderColor: primaryColor }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Distance Attenuation Calculator</h2>
          <p className="text-gray-700">Compute sound level drop over distance using the inverse square law.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          label="Source Level (dB)"
          type="number"
          value={levelDb}
          onChange={(e) => setLevelDb(e.target.value)}
          placeholder="e.g., 90"
        />
        <Input
          label="Reference Distance (m)"
          type="number"
          value={referenceDistance}
          onChange={(e) => setReferenceDistance(e.target.value)}
          placeholder="e.g., 1"
        />
        <Input
          label="Target Distance (m)"
          type="number"
          value={targetDistance}
          onChange={(e) => setTargetDistance(e.target.value)}
          placeholder="e.g., 10"
        />
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-6">
        <Button onClick={calculate}>Calculate</Button>
        <Button variant="outline" onClick={reset}>Reset</Button>
      </div>

      {result && (
        <div
          className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4"
          style={{ borderColor: primaryColor }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Result</h3>
          <p className="text-2xl font-bold text-gray-900">{format(result.level)} dB</p>
          <p className="text-sm text-gray-700 mt-1">Loss: {format(result.loss)} dB</p>
          <p className="text-sm text-gray-700 whitespace-pre-wrap mt-2">{result.steps}</p>
        </div>
      )}
    </Card>
  );
}
