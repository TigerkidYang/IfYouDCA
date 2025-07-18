import { DCAInput, DCAResult, ChartDataPoint, HistoricalPrice } from "@/types";
import { getHistoricalPrices } from "./database";
import { eachMonthOfInterval, format, parseISO, endOfMonth } from "date-fns";

// Main DCA calculation function
export async function calculateDCA(input: DCAInput): Promise<DCAResult> {
  const { asset, initialInvestment, monthlyContribution, startDate, endDate } =
    input;

  // Validate input
  validateDCAInput(input);

  // 1. Fetch required price data from the database
  const prices = await getHistoricalPrices(
    asset,
    `${startDate}-01`,
    `${endDate}-28`
  );

  if (prices.length === 0) {
    throw new Error(
      `No price data available for ${asset} in the specified date range`
    );
  }

  // 2. Initialize variables
  let totalShares = 0;
  let totalCost = 0;
  const chartData: ChartDataPoint[] = [];

  // 3. Handle initial investment if provided
  if (initialInvestment > 0) {
    totalCost += initialInvestment;
    const firstDayPrice = prices[0].adjustedClose;
    totalShares += initialInvestment / firstDayPrice;
  }

  // 4. Generate list of months in the investment period
  const startDateObj = parseISO(`${startDate}-01`);
  const endDateObj = parseISO(`${endDate}-01`);
  const monthsInRange = eachMonthOfInterval({
    start: startDateObj,
    end: endDateObj,
  });

  // 5. Loop through each month in the date range
  for (const month of monthsInRange) {
    const monthStr = format(month, "yyyy-MM");

    // Find the price for this month
    const priceForMonth = getPriceForMonth(prices, monthStr);

    if (priceForMonth) {
      // Add monthly contribution
      totalCost += monthlyContribution;
      const newShares = monthlyContribution / priceForMonth.adjustedClose;
      totalShares += newShares;

      // Calculate current total value
      const currentTotalValue = totalShares * priceForMonth.adjustedClose;

      // Add data point for chart
      chartData.push({
        date: monthStr,
        totalValue: currentTotalValue,
        totalInvestment: totalCost,
        monthlyPrice: priceForMonth.adjustedClose,
        sharesOwned: totalShares,
      });
    }
  }

  // 6. Calculate final results
  const latestPrice = prices[prices.length - 1].adjustedClose;
  const finalValue = totalShares * latestPrice;
  const totalGain = finalValue - totalCost;

  // Calculate CAGR (Compound Annual Growth Rate)
  const investmentPeriodYears = monthsInRange.length / 12;
  const cagr = calculateCAGR(finalValue, totalCost, investmentPeriodYears);

  // 7. Prepare summary data
  const summary = {
    investmentPeriodMonths: monthsInRange.length,
    investmentPeriodYears,
    averagePurchasePrice: totalCost / totalShares,
    finalSharePrice: latestPrice,
    totalShares,
  };

  return {
    finalValue,
    totalInvestment: totalCost,
    totalGain,
    annualizedReturn: cagr,
    chartData,
    summary,
  };
}

// Helper function to find price data for a specific month
function getPriceForMonth(
  prices: HistoricalPrice[],
  monthStr: string
): HistoricalPrice | null {
  // Find the price closest to the end of the month
  const targetMonth = `${monthStr}-`;

  // Look for prices in this month, preferring later dates
  const monthPrices = prices.filter((price) =>
    price.date.startsWith(targetMonth)
  );

  if (monthPrices.length > 0) {
    // Return the last (most recent) price of the month
    return monthPrices[monthPrices.length - 1];
  }

  // If no exact month match, find the closest previous price
  const pricesBefore = prices.filter((price) => price.date < `${monthStr}-01`);
  if (pricesBefore.length > 0) {
    return pricesBefore[pricesBefore.length - 1];
  }

  // If no previous price, find the closest future price
  const pricesAfter = prices.filter((price) => price.date > `${monthStr}-28`);
  if (pricesAfter.length > 0) {
    return pricesAfter[0];
  }

  return null;
}

// Calculate Compound Annual Growth Rate (CAGR)
function calculateCAGR(
  finalValue: number,
  initialValue: number,
  years: number
): number {
  if (initialValue <= 0 || years <= 0) return 0;
  return (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
}

// Validate DCA input parameters
function validateDCAInput(input: DCAInput): void {
  const { asset, initialInvestment, monthlyContribution, startDate, endDate } =
    input;

  // Validate asset
  if (!asset || typeof asset !== "string") {
    throw new Error("Asset symbol is required");
  }

  // Validate investment amounts
  if (initialInvestment < 0) {
    throw new Error("Initial investment cannot be negative");
  }

  if (monthlyContribution < 0) {
    throw new Error("Monthly contribution cannot be negative");
  }

  if (initialInvestment === 0 && monthlyContribution === 0) {
    throw new Error(
      "Either initial investment or monthly contribution must be greater than 0"
    );
  }

  // Validate dates
  const startDateObj = parseISO(`${startDate}-01`);
  const endDateObj = parseISO(`${endDate}-01`);
  const now = new Date();

  if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
    throw new Error("Invalid date format. Use YYYY-MM format");
  }

  if (startDateObj >= endDateObj) {
    throw new Error("Start date must be before end date");
  }

  if (endDateObj > now) {
    throw new Error("End date cannot be in the future");
  }

  // Check minimum investment period (at least 1 month)
  const monthsDifference =
    (endDateObj.getFullYear() - startDateObj.getFullYear()) * 12 +
    (endDateObj.getMonth() - startDateObj.getMonth());

  if (monthsDifference < 1) {
    throw new Error("Investment period must be at least 1 month");
  }
}

// Format currency for display
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Format percentage for display
export function formatPercentage(percentage: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(percentage / 100);
}
