"use client";

import React, { useState } from "react";

export default function GoldWeightCalculator({ showTitle = true }: { showTitle?: boolean }) {
  const [inputValue, setInputValue] = useState<number | "">(1);
  const [inputUnit, setInputUnit] = useState("g");
  const [purity, setPurity] = useState(24);

  const [results, setResults] = useState<Record<string, number> | null>(null);

  // Unit conversions to grams
  const unitConversions: Record<string, number> = {
    g: 1,
    mg: 0.001,
    kg: 1000,
    oz: 28.3495,
    "troy oz": 31.1035,
    lb: 453.592,
    grain: 0.06479891,
    ct: 0.2 // carat for gemstones
  };

  const calculate = () => {
    if (inputValue === "" || inputValue <= 0) {
      alert("Please enter a valid weight value");
      return;
    }

    // Convert input to grams
    const grams = (inputValue as number) * unitConversions[inputUnit];

    // Calculate pure gold content
    const pureGold = grams * (purity / 24);

    // Calculate results in all units
    const allResults: Record<string, number> = {
      grams: grams,
      milligrams: grams * 1000,
      kilograms: grams / 1000,
      ounces: grams / 28.3495,
      "troy_ounces": grams / 31.1035,
      pounds: grams / 453.592,
      grains: grams / 0.06479891,
      carats: grams * 5,
      pure_grams: pureGold,
      pure_oz: pureGold / 28.3495,
      pure_troy_oz: pureGold / 31.1035
    };

    setResults(allResults);
  };

  const reset = () => {
    setInputValue(1);
    setInputUnit("g");
    setPurity(24);
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {showTitle && <h1 className="text-3xl font-bold mb-6 text-gray-800">Gold Weight Calculator</h1>}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gold Weight</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value === "" ? "" : parseFloat(e.target.value))}
              min={0}
              step={0.01}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., 100"
            />
            <select
              value={inputUnit}
              onChange={(e) => setInputUnit(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="g">Grams (g)</option>
              <option value="mg">Milligrams (mg)</option>
              <option value="kg">Kilograms (kg)</option>
              <option value="oz">Ounces (oz)</option>
              <option value="troy oz">Troy Ounces (troy oz)</option>
              <option value="lb">Pounds (lb)</option>
              <option value="grain">Grains</option>
              <option value="ct">Carats (ct)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gold Purity (Fineness)</label>
          <div className="space-y-2">
            <select
              value={purity}
              onChange={(e) => setPurity(parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value={24}>24K (100% Pure Gold)</option>
              <option value={22}>22K (91.7% Pure Gold)</option>
              <option value={20}>20K (83.3% Pure Gold)</option>
              <option value={18}>18K (75% Pure Gold)</option>
              <option value={16}>16K (66.7% Pure Gold)</option>
              <option value={14}>14K (58.3% Pure Gold)</option>
              <option value={12}>12K (50% Pure Gold)</option>
              <option value={10}>10K (41.7% Pure Gold)</option>
              <option value={9}>9K (37.5% Pure Gold)</option>
            </select>
            <p className="text-xs text-gray-500">
              {purity}K contains {((purity / 24) * 100).toFixed(1)}% pure gold.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={calculate}
            className="flex-1 px-4 py-2 text-white font-medium rounded-lg transition"
            style={{ backgroundColor: "#820ECC" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#6a0b9e")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#820ECC")}
          >
            Calculate
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition"
          >
            Reset
          </button>
        </div>

        {results && (
          <div className="space-y-4 bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h2 className="text-lg font-semibold text-gray-800">Weight Conversions</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-xs text-gray-600">Grams</p>
                <p className="text-lg font-bold text-gray-900">{results.grams.toFixed(3)}</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-xs text-gray-600">Milligrams</p>
                <p className="text-lg font-bold text-gray-900">{results.milligrams.toFixed(1)}</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-xs text-gray-600">Kilograms</p>
                <p className="text-lg font-bold text-gray-900">{results.kilograms.toFixed(6)}</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-xs text-gray-600">Ounces</p>
                <p className="text-lg font-bold text-gray-900">{results.ounces.toFixed(3)}</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-xs text-gray-600">Troy Ounces</p>
                <p className="text-lg font-bold text-gray-900">{results.troy_ounces.toFixed(3)}</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-xs text-gray-600">Pounds</p>
                <p className="text-lg font-bold text-gray-900">{results.pounds.toFixed(4)}</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-xs text-gray-600">Grains</p>
                <p className="text-lg font-bold text-gray-900">{results.grains.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-xs text-gray-600">Carats</p>
                <p className="text-lg font-bold text-gray-900">{results.carats.toFixed(2)}</p>
              </div>
            </div>

            <div className="border-t border-purple-200 pt-4 mt-4">
              <h3 className="text-base font-semibold text-gray-800 mb-3">Pure Gold Content</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-600">Pure Gold (g)</p>
                  <p className="text-lg font-bold text-gray-900">{results.pure_grams.toFixed(3)}</p>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-600">Pure Gold (oz)</p>
                  <p className="text-lg font-bold text-gray-900">{results.pure_oz.toFixed(3)}</p>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-600">Pure Gold (troy oz)</p>
                  <p className="text-lg font-bold text-gray-900">{results.pure_troy_oz.toFixed(3)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-gray-100 text-sm text-gray-700">
              <p><strong>Note:</strong> Pure gold content = (Karat ÷ 24) × Total weight. Purity: {purity}K = {((purity / 24) * 100).toFixed(1)}%.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
