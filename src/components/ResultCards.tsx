"use client";

import { DCAResult } from "@/types";
import { formatCurrency, formatPercentage } from "@/lib/dca-calculator";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

interface ResultCardsProps {
  result: DCAResult;
}

export default function ResultCards({ result }: ResultCardsProps) {
  const gainIsPositive = result.totalGain >= 0;
  const returnIsPositive = result.annualizedReturn >= 0;

  const cards = [
    {
      title: "Final Value",
      value: formatCurrency(result.finalValue),
      subtitle: "Total portfolio value today",
      color: "text-brand-blue",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Total Investment",
      value: formatCurrency(result.totalInvestment),
      subtitle: "Amount you invested",
      color: "text-brand-gray-800",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
    },
    {
      title: "Total Gain",
      value: formatCurrency(Math.abs(result.totalGain)),
      subtitle: gainIsPositive ? "Profit earned" : "Loss incurred",
      color: gainIsPositive ? "text-brand-green" : "text-brand-red",
      bgColor: gainIsPositive ? "bg-green-50" : "bg-red-50",
      borderColor: gainIsPositive ? "border-green-200" : "border-red-200",
      icon: gainIsPositive ? ArrowUpIcon : ArrowDownIcon,
      prefix: gainIsPositive ? "+" : "-",
    },
    {
      title: "Annualized Return",
      value: `${returnIsPositive ? "+" : ""}${result.annualizedReturn.toFixed(
        2
      )}%`,
      subtitle: "Compound annual growth rate (CAGR)",
      color: returnIsPositive ? "text-brand-green" : "text-brand-red",
      bgColor: returnIsPositive ? "bg-green-50" : "bg-red-50",
      borderColor: returnIsPositive ? "border-green-200" : "border-red-200",
      icon: returnIsPositive ? ArrowUpIcon : ArrowDownIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className={`
            relative overflow-hidden rounded-xl border p-6 transition-all duration-200 hover:shadow-lg
            ${card.bgColor} ${card.borderColor}
          `}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-brand-gray-600 mb-1">
                {card.title}
              </p>
              <div className="flex items-center gap-2">
                {card.icon && <card.icon className={`h-5 w-5 ${card.color}`} />}
                <p className={`text-2xl font-bold ${card.color}`}>
                  {card.prefix && (
                    <span className="text-lg">{card.prefix}</span>
                  )}
                  {card.value}
                </p>
              </div>
              <p className="text-xs text-brand-gray-500 mt-1">
                {card.subtitle}
              </p>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-white bg-opacity-20"></div>
          <div className="absolute bottom-0 left-0 -mb-6 -ml-6 h-12 w-12 rounded-full bg-white bg-opacity-10"></div>
        </div>
      ))}
    </div>
  );
}
