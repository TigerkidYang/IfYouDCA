"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartDataPoint } from "@/types";
import { formatCurrency } from "@/lib/dca-calculator";
import { CHART_CONFIG } from "@/lib/constants";

interface DCAChartProps {
  data: ChartDataPoint[];
}

export default function DCAChart({ data }: DCAChartProps) {
  // Format data for chart display
  const chartData = data.map((point) => ({
    ...point,
    date: new Date(point.date + "-01").toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    }),
    totalValueFormatted: formatCurrency(point.totalValue),
    totalInvestmentFormatted: formatCurrency(point.totalInvestment),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-brand-gray-800 mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: CHART_CONFIG.colors.totalValue }}
              ></div>
              <span className="text-sm text-brand-gray-600">
                Portfolio Value:
              </span>
              <span className="text-sm font-semibold text-brand-green">
                {data.totalValueFormatted}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: CHART_CONFIG.colors.totalInvestment }}
              ></div>
              <span className="text-sm text-brand-gray-600">
                Total Invested:
              </span>
              <span className="text-sm font-semibold text-brand-blue">
                {data.totalInvestmentFormatted}
              </span>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-sm text-brand-gray-600">
                  Share Price:
                </span>
                <span className="text-sm font-semibold">
                  {formatCurrency(data.monthlyPrice)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-brand-gray-600">
                  Shares Owned:
                </span>
                <span className="text-sm font-semibold">
                  {data.sharesOwned.toFixed(4)}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-xl font-semibold text-brand-gray-800 mb-2 sm:mb-0">
          Portfolio Growth Over Time
        </h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: CHART_CONFIG.colors.totalValue }}
            ></div>
            <span className="text-brand-gray-600">Portfolio Value</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: CHART_CONFIG.colors.totalInvestment }}
            ></div>
            <span className="text-brand-gray-600">Total Invested</span>
          </div>
        </div>
      </div>

      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={CHART_CONFIG.margins}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={CHART_CONFIG.colors.grid}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: CHART_CONFIG.colors.text }}
              tickLine={{ stroke: CHART_CONFIG.colors.grid }}
              axisLine={{ stroke: CHART_CONFIG.colors.grid }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: CHART_CONFIG.colors.text }}
              tickLine={{ stroke: CHART_CONFIG.colors.grid }}
              axisLine={{ stroke: CHART_CONFIG.colors.grid }}
              tickFormatter={(value) => {
                if (value >= 1000000) {
                  return `$${(value / 1000000).toFixed(1)}M`;
                } else if (value >= 1000) {
                  return `$${(value / 1000).toFixed(0)}K`;
                } else {
                  return `$${value}`;
                }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="totalValue"
              stroke={CHART_CONFIG.colors.totalValue}
              strokeWidth={3}
              dot={{ r: 4, fill: CHART_CONFIG.colors.totalValue }}
              activeDot={{ r: 6, fill: CHART_CONFIG.colors.totalValue }}
              name="Portfolio Value"
            />
            <Line
              type="monotone"
              dataKey="totalInvestment"
              stroke={CHART_CONFIG.colors.totalInvestment}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3, fill: CHART_CONFIG.colors.totalInvestment }}
              activeDot={{ r: 5, fill: CHART_CONFIG.colors.totalInvestment }}
              name="Total Investment"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-brand-gray-500 text-center">
        The green line shows your portfolio value growth, while the blue dashed
        line shows your cumulative investments. The gap between them represents
        your gains or losses.
      </div>
    </div>
  );
}
