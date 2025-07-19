import { ChartDataPoint } from "@/types";
import { CHART_CONFIG } from "./constants";

/**
 * Aggregates chart data to a maximum number of points for better visualization.
 * If the data length exceeds the max points, it will sample the data.
 *
 * @param data The original array of chart data points.
 * @param maxPoints The maximum number of points to display on the chart.
 * @returns An array of aggregated chart data points.
 */
export function aggregateChartData(
  data: ChartDataPoint[],
  maxPoints: number = CHART_CONFIG.maxDataPoints
): ChartDataPoint[] {
  if (data.length <= maxPoints) {
    return data;
  }

  const aggregatedData: ChartDataPoint[] = [];
  const step = Math.ceil(data.length / maxPoints);

  for (let i = 0; i < data.length; i += step) {
    aggregatedData.push(data[i]);
  }

  // Always include the last data point for accuracy
  if (aggregatedData[aggregatedData.length - 1] !== data[data.length - 1]) {
    aggregatedData.push(data[data.length - 1]);
  }

  return aggregatedData;
}
