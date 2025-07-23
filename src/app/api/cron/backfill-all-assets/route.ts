import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getMonthlyHistory } from "@/lib/twelve-data";
import { SUPPORTED_ASSETS } from "@/lib/constants";

const prisma = new PrismaClient();

async function backfillAllAssets() {
  console.log("Starting CRON job: backfill all assets from Twelve Data...");
  const BATCH_SIZE = 8; // Twelve Data free tier limit
  const DELAY_MS = 61 * 1000; // 61 seconds to be safe
  let callCount = 0;
  const summary = {
    processed: 0,
    succeeded: 0,
    failed: 0,
    skipped: 0,
  };

  for (const asset of SUPPORTED_ASSETS) {
    summary.processed++;
    const { symbol, name } = asset;

    if (callCount > 0 && callCount % BATCH_SIZE === 0) {
      console.log(
        `CRON: Rate limit batch reached. Pausing for ${DELAY_MS / 1000}s.`
      );
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    }

    callCount++;
    console.log(
      `CRON: [${callCount}/${SUPPORTED_ASSETS.length}] Processing ${name} (${symbol}).`
    );

    try {
      await prisma.asset.upsert({
        where: { symbol },
        update: { name },
        create: { symbol, name },
      });

      const historicalData = await getMonthlyHistory(symbol);

      if (historicalData.length === 0) {
        console.warn(`CRON: No historical data for ${symbol}. Skipping.`);
        summary.skipped++;
        continue;
      }

      await prisma.historicalData.deleteMany({
        where: { assetSymbol: symbol },
      });

      await prisma.historicalData.createMany({
        data: historicalData.map((record) => ({
          assetSymbol: symbol,
          date: new Date(record.date),
          price: record.price,
        })),
      });

      console.log(`CRON: Successfully backfilled ${symbol}.`);
      summary.succeeded++;
    } catch (error) {
      console.error(`CRON: Failed to backfill ${symbol}:`, error);
      summary.failed++;
    }
  }

  console.log("CRON job finished.", summary);
  return summary;
}

export async function GET(request: Request) {
  // Optional: Add a secret to protect this endpoint
  const authHeader = request.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const result = await backfillAllAssets();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
