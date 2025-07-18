import { NextRequest, NextResponse } from "next/server";
import { APIResponse } from "@/types";
import { SUPPORTED_ASSETS, ALPHA_VANTAGE_CONFIG } from "@/lib/constants";
import {
  initializeDatabase,
  upsertHistoricalPrice,
  getLatestDateForSymbol,
} from "@/lib/database";

// This route should be called by Vercel Cron Jobs
export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Vercel Cron (optional security measure)
    const authHeader = request.headers.get("authorization");
    if (
      process.env.CRON_SECRET &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" } as APIResponse,
        { status: 401 }
      );
    }

    // Check if API key is configured
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Alpha Vantage API key not configured",
        } as APIResponse,
        { status: 500 }
      );
    }

    // Initialize database
    await initializeDatabase();

    const results: string[] = [];
    const errors: string[] = [];

    // Update prices for each supported asset
    for (const asset of SUPPORTED_ASSETS) {
      try {
        console.log(`Updating prices for ${asset.symbol}...`);

        // Get the latest date we have for this symbol
        const latestDate = await getLatestDateForSymbol(asset.symbol);

        // Fetch data from Alpha Vantage
        const url = `${ALPHA_VANTAGE_CONFIG.baseUrl}?function=${ALPHA_VANTAGE_CONFIG.function}&symbol=${asset.symbol}&apikey=${apiKey}&outputsize=${ALPHA_VANTAGE_CONFIG.outputSize}`;

        const response = await fetch(url);
        const data = await response.json();

        // Check for API errors
        if (data["Error Message"]) {
          throw new Error(`API Error: ${data["Error Message"]}`);
        }

        if (data["Note"]) {
          throw new Error(`API Limit: ${data["Note"]}`);
        }

        // Parse the time series data
        const timeSeries = data["Monthly Adjusted Time Series"];
        if (!timeSeries) {
          throw new Error("No time series data returned");
        }

        let updatedCount = 0;

        // Process each data point
        for (const [date, priceData] of Object.entries(timeSeries)) {
          // Skip if we already have this date and it's not newer than our latest
          if (latestDate && date <= latestDate) {
            continue;
          }

          const adjustedClose = parseFloat(
            (priceData as any)["5. adjusted close"]
          );

          if (isNaN(adjustedClose)) {
            console.warn(`Invalid price data for ${asset.symbol} on ${date}`);
            continue;
          }

          // Insert/update the price data
          await upsertHistoricalPrice(asset.symbol, date, adjustedClose);
          updatedCount++;
        }

        results.push(`${asset.symbol}: ${updatedCount} records updated`);

        // Add delay to respect API rate limits (5 calls per minute for free tier)
        await new Promise((resolve) => setTimeout(resolve, 12000)); // 12 seconds between calls
      } catch (error) {
        const errorMsg = `${asset.symbol}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`;
        errors.push(errorMsg);
        console.error(errorMsg);
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          updated: results,
          errors: errors,
          timestamp: new Date().toISOString(),
        },
        message: `Price update completed. Updated ${results.length} assets, ${errors.length} errors.`,
      } as APIResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("Price update failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Price update failed",
      } as APIResponse,
      { status: 500 }
    );
  }
}

// Handle manual price update requests (with authentication)
export async function GET(request: NextRequest) {
  // Check for admin authentication
  const authHeader = request.headers.get("authorization");
  if (
    !process.env.ADMIN_SECRET ||
    authHeader !== `Bearer ${process.env.ADMIN_SECRET}`
  ) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" } as APIResponse,
      { status: 401 }
    );
  }

  // Forward to POST handler
  return POST(request);
}
