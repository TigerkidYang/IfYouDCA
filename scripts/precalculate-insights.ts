import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { calculateDCA } from "../src/lib/dca-calculator";
import { DCAInput } from "../src/types";

const prisma = new PrismaClient();

const INSIGHTS_SCENARIOS: { id: string; input: DCAInput }[] = [
  // --- Scenarios for "sp500-vs-nasdaq-backtest" ---
  {
    id: "spy-20y-from-2005",
    input: {
      asset: "SPY",
      initialInvestment: 0,
      monthlyContribution: 500,
      startDate: "2005-07",
      endDate: "2025-06",
    },
  },
  {
    id: "qqq-20y-from-2005",
    input: {
      asset: "QQQ",
      initialInvestment: 0,
      monthlyContribution: 500,
      startDate: "2005-07",
      endDate: "2025-06",
    },
  },
  // --- Scenarios for "power-of-starting-early" (Corrected Dates) ---
  {
    id: "spy-30y-from-1994",
    input: {
      asset: "SPY",
      initialInvestment: 100,
      monthlyContribution: 100,
      startDate: "1994-01",
      endDate: "2023-12",
    },
  },
  {
    id: "spy-20y-from-2004",
    input: {
      asset: "SPY",
      initialInvestment: 100,
      monthlyContribution: 100,
      startDate: "2004-01",
      endDate: "2023-12",
    },
  },
  // --- Scenarios for "dca-through-market-crashes" ---
  {
    id: "spy-crashes-from-2007",
    input: {
      asset: "SPY",
      initialInvestment: 0,
      monthlyContribution: 1000,
      startDate: "2007-01",
      endDate: "2025-06",
    },
  },
  {
    id: "nvda-crashes-from-2007",
    input: {
      asset: "NVDA",
      initialInvestment: 0,
      monthlyContribution: 1000,
      startDate: "2007-01",
      endDate: "2025-06",
    },
  },
];

async function precalculateInsights() {
  console.log("Starting to pre-calculate and cache insight scenarios...");

  for (const scenario of INSIGHTS_SCENARIOS) {
    const { id, input } = scenario;
    console.log(`\n--- Calculating scenario: ${id} ---`);

    try {
      // Small delay to avoid hitting rate limits if scenarios run close together
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const result = await calculateDCA(input);

      await prisma.precalculatedResult.upsert({
        where: { id },
        update: { result: result as any },
        create: { id, result: result as any },
      });

      console.log(`✅ Successfully calculated and cached result for ${id}.`);
      console.log(
        `   - Final Value: \$${result.finalValue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      );
      console.log(
        `   - Total Investment: \$${result.totalInvestment.toLocaleString(
          undefined,
          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
        )}`
      );
      console.log(
        `   - Total Gain: \$${result.totalGain.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      );
      console.log(
        `   - Annualized Return (CAGR): ${(
          result.annualizedReturn * 100
        ).toFixed(2)}%`
      );
      console.log(
        `   - Investment Period: ${result.summary.investmentPeriodYears.toFixed(
          1
        )} years`
      );
    } catch (error) {
      console.error(
        `❌ Failed to calculate or cache result for ${id}:`,
        (error as Error).message
      );
    }
  }

  console.log("\n🎉 Pre-calculation complete for all scenarios.");
}

async function main() {
  try {
    await precalculateInsights();
  } catch (error) {
    console.error(
      "An unexpected error occurred during pre-calculation:",
      error
    );
  } finally {
    await prisma.$disconnect();
  }
}

main();
