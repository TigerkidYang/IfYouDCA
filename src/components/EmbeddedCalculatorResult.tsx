"use client";

import { useState, useEffect, useCallback } from "react";
import { DCAResult, DCAInput } from "@/types";
import ResultCards from "./ResultCards";
import DCAChart from "./DCAChart";
import { Switch } from "@headlessui/react";
import SkeletonLoader from "./SkeletonLoader";

interface EmbeddedCalculatorResultProps {
  initialScenarioId: string;
  comparisonScenarioId?: string;
  toggleLabels: [string, string];
}

async function fetchPrecalculatedResult(id: string): Promise<DCAResult> {
  const response = await fetch(`/api/get-insight-result?id=${id}`);
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || "Failed to fetch pre-calculated result.");
  }
  return data.data;
}

export default function EmbeddedCalculatorResult({
  initialScenarioId,
  comparisonScenarioId,
  toggleLabels,
}: EmbeddedCalculatorResultProps) {
  const [result, setResult] = useState<DCAResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isToggled, setIsToggled] = useState(false);

  const hasComparison = !!comparisonScenarioId;

  const loadResult = useCallback(async () => {
    setLoading(true);
    setError(null);
    const scenarioId =
      isToggled && comparisonScenarioId
        ? comparisonScenarioId
        : initialScenarioId;

    try {
      // Add a small artificial delay to make skeleton visible for fast connections
      await new Promise((resolve) => setTimeout(resolve, 300));
      const data = await fetchPrecalculatedResult(scenarioId);
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, [isToggled, initialScenarioId, comparisonScenarioId]);

  useEffect(() => {
    loadResult();
  }, [loadResult]);

  if (error) {
    return <div className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</div>;
  }

  if (loading || !result) {
    return <SkeletonLoader />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 overflow-hidden my-8 animate-fade-in-up">
      {hasComparison && (
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200/80 flex justify-center items-center gap-4">
          <span
            className={`font-medium ${
              !isToggled ? "text-brand-blue" : "text-gray-500"
            }`}
          >
            {toggleLabels[0]}
          </span>
          <Switch
            checked={isToggled}
            onChange={setIsToggled}
            className={`${
              isToggled ? "bg-brand-orange" : "bg-brand-blue"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span
              className={`${
                isToggled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
          <span
            className={`font-medium ${
              isToggled ? "text-brand-orange" : "text-gray-500"
            }`}
          >
            {toggleLabels[1]}
          </span>
        </div>
      )}
      <div className="p-4 sm:p-6">
        <ResultCards result={result} isEmbedded={true} />
        <div className="mt-6">
          <DCAChart data={result.chartData} />
        </div>
      </div>
    </div>
  );
}
