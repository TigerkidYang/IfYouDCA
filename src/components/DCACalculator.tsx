"use client";

import { useState } from "react";
import { DCAInput, DCAResult } from "@/types";
import {
  SUPPORTED_ASSETS,
  DEFAULT_DCA_VALUES,
  DATE_LIMITS,
} from "@/lib/constants";
import { formatCurrency, formatPercentage } from "@/lib/dca-calculator";
import DCAChart from "./DCAChart";
import ResultCards from "./ResultCards";

export default function DCACalculator() {
  const [input, setInput] = useState<DCAInput>(DEFAULT_DCA_VALUES);
  const [result, setResult] = useState<DCAResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof DCAInput, value: string | number) => {
    setInput((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/calculate-dca", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Calculation failed");
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Calculator Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Asset Selection */}
          <div>
            <label
              htmlFor="asset"
              className="block text-sm font-medium text-brand-gray-700 mb-2"
            >
              Investment Asset
            </label>
            <select
              id="asset"
              value={input.asset}
              onChange={(e) => handleInputChange("asset", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent text-gray-900 bg-white"
            >
              {SUPPORTED_ASSETS.map((asset) => (
                <option key={asset.symbol} value={asset.symbol}>
                  {asset.name} ({asset.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Initial Investment */}
          <div>
            <label
              htmlFor="initialInvestment"
              className="block text-sm font-medium text-brand-gray-700 mb-2"
            >
              Initial Investment (Optional)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-brand-gray-500">
                $
              </span>
              <input
                type="number"
                id="initialInvestment"
                min="0"
                step="100"
                value={input.initialInvestment}
                onChange={(e) =>
                  handleInputChange(
                    "initialInvestment",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent text-gray-900 bg-white"
                placeholder="0"
              />
            </div>
          </div>

          {/* Monthly Contribution */}
          <div>
            <label
              htmlFor="monthlyContribution"
              className="block text-sm font-medium text-brand-gray-700 mb-2"
            >
              Monthly Contribution
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-brand-gray-500">
                $
              </span>
              <input
                type="number"
                id="monthlyContribution"
                min="1"
                step="50"
                value={input.monthlyContribution}
                onChange={(e) =>
                  handleInputChange(
                    "monthlyContribution",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent text-gray-900 bg-white"
                placeholder="100"
                required
              />
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-brand-gray-700 mb-2"
            >
              Start Date
            </label>
            <input
              type="month"
              id="startDate"
              value={input.startDate}
              min={DATE_LIMITS.earliestDate}
              max={input.endDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent text-gray-900 bg-white"
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-brand-gray-700 mb-2"
            >
              End Date
            </label>
            <input
              type="month"
              id="endDate"
              value={input.endDate}
              min={input.startDate}
              max={DATE_LIMITS.latestDate}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent text-gray-900 bg-white"
              required
            />
          </div>

          {/* Calculate Button */}
          <div className="flex items-end">
            <button
              onClick={handleCalculate}
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="loading-spinner mr-2"></div>
                  Calculating...
                </>
              ) : (
                "Calculate"
              )}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="animate-fade-in-up">
          {/* Result Cards */}
          <ResultCards result={result} />

          {/* Chart */}
          <div className="mt-8">
            <DCAChart data={result.chartData} />
          </div>

          {/* Summary Details */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-xl font-semibold text-brand-gray-800 mb-4">
              Investment Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-brand-gray-600">Investment Period</p>
                <p className="text-lg font-semibold text-brand-gray-800">
                  {result.summary.investmentPeriodMonths} months (
                  {result.summary.investmentPeriodYears.toFixed(1)} years)
                </p>
              </div>
              <div>
                <p className="text-sm text-brand-gray-600">
                  Total Shares Owned
                </p>
                <p className="text-lg font-semibold text-brand-gray-800">
                  {result.summary.totalShares.toFixed(4)}
                </p>
              </div>
              <div>
                <p className="text-sm text-brand-gray-600">
                  Average Purchase Price
                </p>
                <p className="text-lg font-semibold text-brand-gray-800">
                  {formatCurrency(result.summary.averagePurchasePrice)}
                </p>
              </div>
              <div>
                <p className="text-sm text-brand-gray-600">Final Share Price</p>
                <p className="text-lg font-semibold text-brand-gray-800">
                  {formatCurrency(result.summary.finalSharePrice)}
                </p>
              </div>
              <div>
                <p className="text-sm text-brand-gray-600">
                  Price Appreciation
                </p>
                <p className="text-lg font-semibold text-brand-green">
                  {formatPercentage(
                    ((result.summary.finalSharePrice -
                      result.summary.averagePurchasePrice) /
                      result.summary.averagePurchasePrice) *
                      100
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
