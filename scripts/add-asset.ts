//npm run add-asset -- TSLA "Tesla, Inc." stock (for example)

// scripts/add-asset.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { getMonthlyHistory } from "@/lib/twelve-data";
import { SUPPORTED_ASSETS } from "@/lib/constants";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function addAsset(symbol: string, name: string) {
  console.log(`Starting to add asset: ${name} (${symbol})`);

  // Step 1: Check if the asset already exists in the database
  const existingAsset = await prisma.asset.findUnique({
    where: { symbol },
  });

  if (existingAsset) {
    console.warn(
      `Asset ${name} (${symbol}) already exists in the database. Skipping database insertion.`
    );
  } else {
    // Add to database
    await prisma.asset.create({
      data: {
        symbol,
        name,
      },
    });
    console.log(`✅ Added ${name} (${symbol}) to the database.`);
  }

  // Step 2: Fetch historical data
  const historicalData = await getMonthlyHistory(symbol);

  if (historicalData.length === 0) {
    console.error(
      `❌ Could not fetch historical data for ${symbol}. Please check the symbol and API key.`
    );
    // Optional: Clean up the created asset if no historical data is found
    // await prisma.asset.delete({ where: { symbol } });
    return;
  }
  console.log(
    `✅ Fetched ${historicalData.length} monthly data points for ${symbol}.`
  );

  // Step 3: Backfill the database with historical data
  for (const record of historicalData) {
    await prisma.historicalData.create({
      data: {
        assetSymbol: symbol,
        date: new Date(record.date),
        price: record.price,
      },
    });
  }
  console.log(`✅ Backfilled historical data for ${symbol} into the database.`);

  // Step 4: Update the frontend constants file
  const constantsFilePath = path.resolve(
    process.cwd(),
    "src",
    "lib",
    "constants.ts"
  );

  // Check if asset is already in the constants file
  const isAlreadyInConstants = SUPPORTED_ASSETS.some(
    (asset) => asset.symbol === symbol
  );

  if (isAlreadyInConstants) {
    console.warn(
      `Asset ${name} (${symbol}) already exists in the constants file. Skipping file modification.`
    );
  } else {
    const newAssetEntry = `{ symbol: '${symbol}', name: '${name}' }`;
    const newAssetsArray = [...SUPPORTED_ASSETS, { symbol, name }];

    const newFileContent = `import { Asset } from '@/types/Asset';

export const SUPPORTED_ASSETS: Asset[] = [
${newAssetsArray
  .map((a) => `  { symbol: '${a.symbol}', name: '${a.name}' }`)
  .join(",\n")}
];
`;

    fs.writeFileSync(constantsFilePath, newFileContent, "utf-8");
    console.log(`✅ Updated ${constantsFilePath} with the new asset.`);
  }

  console.log(
    `\n🎉 Successfully added and backfilled asset: ${name} (${symbol})`
  );
}

async function main() {
  const symbol = process.argv[2];
  const name = process.argv[3];

  if (!symbol || !name) {
    console.error("Please provide a symbol and a name for the asset.");
    console.log("Usage: npx ts-node scripts/add-asset.ts <SYMBOL> <NAME>");
    process.exit(1);
  }

  try {
    await addAsset(symbol.toUpperCase(), name);
  } catch (error) {
    console.error("An error occurred during the script execution:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
