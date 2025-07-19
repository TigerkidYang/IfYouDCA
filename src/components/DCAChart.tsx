"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Range, getTrackBackground } from "react-range";
import { useState, useMemo } from "react";
import { ChartDataPoint } from "@/types";
import { formatCurrency } from "@/lib/dca-calculator";
import { CHART_CONFIG } from "@/lib/constants";
import { aggregateChartData } from "@/lib/chart-utils";

interface DCAChartProps {
  data: ChartDataPoint[];
}

export default function DCAChart({ data }: DCAChartProps) {
  const [rangeValues, setRangeValues] = useState([0, data.length - 1]);

  const chartDisplayData = useMemo(() => {
    const [start, end] = rangeValues;
    return data.slice(start, end + 1).map((point) => ({
      ...point,
      date: new Date(point.date + "-01").toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      }),
      totalValueFormatted: formatCurrency(point.totalValue),
      totalInvestmentFormatted: formatCurrency(point.totalInvestment),
    }));
  }, [data, rangeValues]);

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
            <div className="pt-2 mt-2 border-t border-gray-200">
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
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
      <h3 className="text-xl font-semibold text-brand-gray-800 mb-4 text-center">
        Portfolio Growth Over Time
      </h3>

      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartDisplayData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={CHART_CONFIG.colors.grid}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: CHART_CONFIG.colors.text }}
            />
            <YAxis
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              tick={{ fontSize: 12, fill: CHART_CONFIG.colors.text }}
              domain={["dataMin", "auto"]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="totalValue"
              stroke={CHART_CONFIG.colors.totalValue}
              strokeWidth={2.5}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="totalInvestment"
              stroke={CHART_CONFIG.colors.totalInvestment}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {data.length > 1 && (
        <div className="px-4 md:px-8 mt-6">
          <div className="flex justify-between text-sm text-brand-gray-600 mb-2">
            <span>
              {new Date(data[rangeValues[0]].date + "-02").toLocaleDateString(
                "en-US",
                { year: "numeric", month: "short" }
              )}
            </span>
            <span>
              {new Date(data[rangeValues[1]].date + "-02").toLocaleDateString(
                "en-US",
                { year: "numeric", month: "short" }
              )}
            </span>
          </div>
          <Range
            step={1}
            min={0}
            max={data.length - 1}
            values={rangeValues}
            onChange={(values) => setRangeValues(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 w-full rounded-full"
                style={{
                  ...props.style,
                  background: getTrackBackground({
                    values: rangeValues,
                    colors: ["#ccc", CHART_CONFIG.colors.totalValue, "#ccc"],
                    min: 0,
                    max: data.length - 1,
                  }),
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="h-5 w-5 bg-white rounded-full shadow-md border-2 border-solid"
                style={{
                  ...props.style,
                  borderColor: CHART_CONFIG.colors.totalValue,
                }}
              />
            )}
          />
        </div>
      )}
    </div>
  );
}
