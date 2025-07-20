import { NextResponse } from "next/server";
import { SUPPORTED_ASSETS } from "@/lib/constants";
import { getAssetsMetadata } from "@/lib/database";
import { Asset, AssetWithMetadata } from "@/types";

export const revalidate = 3600; // Revalidate data at most once per hour

export async function GET() {
  try {
    // 1. Get base asset info from constants
    const baseAssets: Asset[] = SUPPORTED_ASSETS;
    const symbols = baseAssets.map((asset) => asset.symbol);

    // 2. Get earliest date metadata from database
    const metadata = await getAssetsMetadata(symbols);

    // Create a map for quick lookups
    const metadataMap = new Map(
      metadata.map((m) => [m.symbol, m.earliestDate])
    );

    // 3. Combine base info with metadata
    const assetsWithMetadata: AssetWithMetadata[] = baseAssets.map((asset) => ({
      ...asset,
      earliestDate: metadataMap.get(asset.symbol) || "2000-01-01", // Default if not found
    }));

    return NextResponse.json(
      {
        success: true,
        data: assetsWithMetadata,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
