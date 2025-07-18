#!/usr/bin/env node

/**
 * Data Seeding Script for If You DCA
 *
 * This script fetches initial historical data for all supported assets
 * and populates the database. Run this once after setting up your database.
 *
 * Usage: node scripts/seed-data.js
 */

const { neon } = require("@neondatabase/serverless");
require("dotenv").config({ path: ".env.development.local" });

// Initialize Neon connection
const sql = neon(process.env.DATABASE_URL);

const SUPPORTED_ASSETS = [
  { symbol: "SPY", name: "S&P 500 ETF" },
  { symbol: "QQQ", name: "NASDAQ 100 ETF" },
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "NVDA", name: "NVIDIA Corporation" },
];

async function initializeDatabase() {
  console.log("🔧 Initializing database schema...");

  try {
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

    await sql`
      CREATE INDEX IF NOT EXISTS idx_historical_prices_symbol_date 
      ON historical_prices(symbol, date)
    `;

    console.log("✅ Database schema initialized successfully");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    throw error;
  }
}

async function fetchHistoricalData(symbol) {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  if (!apiKey) {
    throw new Error("ALPHA_VANTAGE_API_KEY environment variable is required");
  }

  console.log(`📈 Fetching data for ${symbol}...`);

  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}&outputsize=full`;

  const response = await fetch(url);
  const data = await response.json();

  if (data["Error Message"]) {
    throw new Error(`API Error for ${symbol}: ${data["Error Message"]}`);
  }

  if (data["Note"]) {
    throw new Error(`API Limit for ${symbol}: ${data["Note"]}`);
  }

  const timeSeries = data["Monthly Adjusted Time Series"];
  if (!timeSeries) {
    throw new Error(`No time series data returned for ${symbol}`);
  }

  return timeSeries;
}

async function insertPriceData(symbol, timeSeries) {
  console.log(`💾 Inserting price data for ${symbol}...`);

  let insertCount = 0;
  const entries = Object.entries(timeSeries);

  // Process in smaller batches to avoid overwhelming the database
  const batchSize = 50;

  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);

    for (const [date, priceData] of batch) {
      try {
        const adjustedClose = parseFloat(priceData["5. adjusted close"]);

        if (isNaN(adjustedClose)) {
          console.warn(`⚠️  Invalid price data for ${symbol} on ${date}`);
          continue;
        }

        await sql`
          INSERT INTO historical_prices (symbol, date, adjusted_close)
          VALUES (${symbol}, ${date}::date, ${adjustedClose})
          ON CONFLICT (symbol, date) DO NOTHING
        `;

        insertCount++;
      } catch (error) {
        console.error(
          `❌ Error inserting ${symbol} data for ${date}:`,
          error.message
        );
      }
    }

    // Small delay between batches
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log(`✅ Inserted ${insertCount} records for ${symbol}`);
  return insertCount;
}

async function seedData() {
  console.log("🚀 Starting data seeding process...\n");

  try {
    // Initialize database
    await initializeDatabase();

    let totalRecords = 0;
    const results = [];

    // Process each asset
    for (let i = 0; i < SUPPORTED_ASSETS.length; i++) {
      const asset = SUPPORTED_ASSETS[i];

      try {
        // Fetch data
        const timeSeries = await fetchHistoricalData(asset.symbol);

        // Insert data
        const recordCount = await insertPriceData(asset.symbol, timeSeries);
        totalRecords += recordCount;

        results.push({
          symbol: asset.symbol,
          name: asset.name,
          records: recordCount,
          status: "success",
        });

        // Rate limiting: wait 12 seconds between API calls (Alpha Vantage free tier: 5 calls/minute)
        if (i < SUPPORTED_ASSETS.length - 1) {
          console.log(`⏳ Waiting 12 seconds before next API call...\n`);
          await new Promise((resolve) => setTimeout(resolve, 12000));
        }
      } catch (error) {
        console.error(`❌ Failed to process ${asset.symbol}:`, error.message);
        results.push({
          symbol: asset.symbol,
          name: asset.name,
          records: 0,
          status: "failed",
          error: error.message,
        });
      }
    }

    // Summary
    console.log("\n📊 Seeding Summary:");
    console.log("==================");
    results.forEach((result) => {
      const status = result.status === "success" ? "✅" : "❌";
      console.log(`${status} ${result.symbol}: ${result.records} records`);
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
    });

    console.log(`\n🎉 Total records inserted: ${totalRecords}`);
    console.log("✅ Data seeding completed successfully!");
  } catch (error) {
    console.error("❌ Data seeding failed:", error);
    process.exit(1);
  }
}

// Check if running directly
if (require.main === module) {
  seedData()
    .then(() => {
      console.log("\n🏁 Script completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n💥 Script failed:", error);
      process.exit(1);
    });
}

module.exports = { seedData, initializeDatabase };
