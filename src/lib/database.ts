import { PrismaClient } from "@prisma/client";
import { HistoricalPrice } from "@/types";

const prisma = new PrismaClient();

// Get historical prices for a specific symbol and date range
export async function getHistoricalPrices(
  symbol: string,
  startDate: string,
  endDate: string
): Promise<HistoricalPrice[]> {
  try {
    const results = await prisma.historicalData.findMany({
      where: {
        assetSymbol: symbol,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    // Format the result to match the expected HistoricalPrice type
    return results.map((record) => ({
      date: record.date.toISOString().split("T")[0],
      adjustedClose: record.price,
    }));
  } catch (error) {
    console.error("Error fetching historical prices from Prisma:", error);
    throw new Error(`Failed to fetch historical prices for ${symbol}`);
  }
}

// Get metadata (including earliest date) for all supported assets
export async function getAssetsMetadata(
  symbols: string[]
): Promise<Array<{ symbol: string; earliestDate: string }>> {
  try {
    const results = await prisma.historicalData.groupBy({
      by: ["assetSymbol"],
      where: {
        assetSymbol: {
          in: symbols,
        },
      },
      _min: {
        date: true,
      },
    });

    return results.map((r) => ({
      symbol: r.assetSymbol,
      // Ensure date is not null and format it correctly
      earliestDate: r._min.date ? r._min.date.toISOString().split("T")[0] : "",
    }));
  } catch (error) {
    console.error("Error fetching assets metadata from Prisma:", error);
    throw new Error("Failed to fetch assets metadata");
  }
}

// Check database health
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    // A simple query to check if the database is responsive
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Database health check failed:", error);
    return false;
  }
}
