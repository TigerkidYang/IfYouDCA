"use client";

import { DCAResult } from "@/types";
import { formatCurrency, formatPercentage } from "@/lib/dca-calculator";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import ResultCard from "./ResultCard";

export default function ResultCards({ result }: { result: DCAResult }) {
  const gainIsPositive = result.totalGain >= 0;
  const returnIsPositive = result.annualizedReturn >= 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
      <ResultCard
        label="Final Value"
        value={formatCurrency(result.finalValue)}
        subtitle="Total portfolio value today"
        color="text-brand-blue"
        bgColor="bg-blue-50"
        borderColor="border-blue-200"
      />
      <ResultCard
        label="Total Investment"
        value={formatCurrency(result.totalInvestment)}
        subtitle="Amount you invested"
        color="text-brand-gray-800"
        bgColor="bg-gray-50"
        borderColor="border-gray-200"
      />
      <ResultCard
        label="Total Gain"
        value={formatCurrency(Math.abs(result.totalGain))}
        subtitle={gainIsPositive ? "Profit earned" : "Loss incurred"}
        color={gainIsPositive ? "text-brand-green" : "text-brand-red"}
        bgColor={gainIsPositive ? "bg-green-50" : "bg-red-50"}
        borderColor={gainIsPositive ? "border-green-200" : "border-red-200"}
        icon={gainIsPositive ? ArrowUpIcon : ArrowDownIcon}
        prefix={gainIsPositive ? "+" : "-"}
      />
      <ResultCard
        label="Annualized Return"
        value={`${returnIsPositive ? "+" : ""}${result.annualizedReturn.toFixed(
          2
        )}%`}
        subtitle="Compound annual growth rate (CAGR)"
        color={returnIsPositive ? "text-brand-green" : "text-brand-red"}
        bgColor={returnIsPositive ? "bg-green-50" : "bg-red-50"}
        borderColor={returnIsPositive ? "border-green-200" : "border-red-200"}
        icon={returnIsPositive ? ArrowUpIcon : ArrowDownIcon}
      />
    </div>
  );
}
