import { sql } from "@vercel/postgres";
import { HistoricalPrice } from "@/types";

// Helper function to safely extract error message
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

// Database schema initialization
export async function initializeDatabase() {
  try {
    // Create historical_prices table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS historical_prices (
        id SERIAL PRIMARY KEY,
        symbol VARCHAR(10) NOT NULL,
        date DATE NOT NULL,
        adjusted_close DECIMAL(10,4) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(symbol, date)
      )
    `;

    // Create indexes for better query performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_historical_prices_symbol_date 
      ON historical_prices(symbol, date)
    `;

    console.log("Database initialized successfully");
    return { success: true };
  } catch (error) {
    console.error("Database initialization failed:", error);
    return { success: false, error: getErrorMessage(error) };
  }
}

// Get historical prices for a specific symbol and date range
export async function getHistoricalPrices(
  symbol: string,
  startDate: string,
  endDate: string
): Promise<HistoricalPrice[]> {
  try {
    const result = await sql`
      SELECT id, symbol, date::text, adjusted_close as "adjustedClose"
      FROM historical_prices
      WHERE symbol = ${symbol}
        AND date >= ${startDate}::date
        AND date <= ${endDate}::date
      ORDER BY date ASC
    `;

    return result.rows as HistoricalPrice[];
  } catch (error) {
    console.error("Error fetching historical prices:", error);
    throw new Error(`Failed to fetch historical prices for ${symbol}`);
  }
}

// Insert or update historical price data
export async function upsertHistoricalPrice(
  symbol: string,
  date: string,
  adjustedClose: number
): Promise<void> {
  try {
    await sql`
      INSERT INTO historical_prices (symbol, date, adjusted_close)
      VALUES (${symbol}, ${date}::date, ${adjustedClose})
      ON CONFLICT (symbol, date) 
      DO UPDATE SET 
        adjusted_close = EXCLUDED.adjusted_close,
        created_at = CURRENT_TIMESTAMP
    `;
  } catch (error) {
    console.error("Error upserting historical price:", error);
    throw new Error(`Failed to upsert price for ${symbol} on ${date}`);
  }
}

// Batch insert historical prices (updated for new @vercel/postgres version)
export async function batchInsertHistoricalPrices(
  prices: Array<{
    symbol: string;
    date: string;
    adjustedClose: number;
  }>
): Promise<void> {
  try {
    // Process in batches of 50 to avoid overwhelming the database
    const batchSize = 50;

    for (let i = 0; i < prices.length; i += batchSize) {
      const batch = prices.slice(i, i + batchSize);

      // Use individual upserts for each item in the batch
      const promises = batch.map((price) =>
        upsertHistoricalPrice(price.symbol, price.date, price.adjustedClose)
      );

      await Promise.all(promises);

      // Small delay between batches to prevent overwhelming the database
      if (i + batchSize < prices.length) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
  } catch (error) {
    console.error("Error batch inserting historical prices:", error);
    throw new Error("Failed to batch insert historical prices");
  }
}

// Get the latest date for a specific symbol
export async function getLatestDateForSymbol(
  symbol: string
): Promise<string | null> {
  try {
    const result = await sql`
      SELECT MAX(date)::text as latest_date
      FROM historical_prices
      WHERE symbol = ${symbol}
    `;

    return result.rows[0]?.latest_date || null;
  } catch (error) {
    console.error("Error getting latest date:", error);
    return null;
  }
}

// Check database health
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await sql`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Database health check failed:", error);
    return false;
  }
}
