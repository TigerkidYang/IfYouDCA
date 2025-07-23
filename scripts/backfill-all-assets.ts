import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { getMonthlyHistory } from "@/lib/twelve-data";
import { SUPPORTED_ASSETS } from "@/lib/constants";

const prisma = new PrismaClient();

async function backfillAllAssets() {
  console.log("Starting to backfill all assets from Twelve Data...");
  const BATCH_SIZE = 8; // Twelve Data free tier limit
  const DELAY_MS = 61 * 1000; // 61 seconds to be safe
  let callCount = 0;

  for (const asset of SUPPORTED_ASSETS) {
    const { symbol, name } = asset;

    // Pause before the next batch to respect rate limits
    if (callCount > 0 && callCount % BATCH_SIZE === 0) {
      console.log(
        `\n-- Rate limit batch reached. Pausing for ${
          DELAY_MS / 1000
        } seconds... --\n`
      );
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    }

    callCount++;
    console.log(
      `\n--- [${callCount}/${SUPPORTED_ASSETS.length}] Processing ${name} (${symbol}) ---`
    );

    // Step 1: Ensure the asset exists in the Asset table
    try {
      await prisma.asset.upsert({
        where: { symbol },
        update: { name },
        create: { symbol, name },
      });
      console.log(`✅ Ensured ${name} (${symbol}) exists in the Asset table.`);
    } catch (error) {
      console.error(`❌ Error upserting asset ${symbol}:`, error);
      continue; // Skip to the next asset
    }

    // Step 2: Fetch new historical data
    const historicalData = await getMonthlyHistory(symbol);

    if (historicalData.length === 0) {
      console.warn(`⚠️ No historical data found for ${symbol}. Skipping.`);
      continue;
    }
    console.log(`✅ Fetched ${historicalData.length} monthly data points.`);

    // Step 3: Clear existing historical data for the asset
    try {
      await prisma.historicalData.deleteMany({
        where: { assetSymbol: symbol },
      });
      console.log(`🗑️ Cleared old historical data.`);
    } catch (error) {
      console.error(`❌ Error clearing old data for ${symbol}:`, error);
      continue; // Skip to the next asset
    }

    // Step 4: Insert new historical data
    try {
      await prisma.historicalData.createMany({
        data: historicalData.map((record) => ({
          assetSymbol: symbol,
          date: new Date(record.date),
          price: record.price,
        })),
        skipDuplicates: true, // Just in case
      });
      console.log(`✅ Inserted new historical data.`);
    } catch (error) {
      console.error(`❌ Error inserting new data for ${symbol}:`, error);
    }
  }

  console.log("\n🎉 Backfill complete for all assets.");
}

async function main() {
  try {
    await backfillAllAssets();
  } catch (error) {
    console.error(
      "An unexpected error occurred during the backfill process:",
      error
    );
  } finally {
    await prisma.$disconnect();
  }
}

main();
