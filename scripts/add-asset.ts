//npm run add-asset -- TSLA "Tesla, Inc." stock (for example)

// scripts/add-asset.ts
import fs from "fs";
import path from "path";
import { config } from "dotenv";
import { SUPPORTED_ASSETS } from "../src/lib/constants";
import { fetchFullHistoricalData } from "../src/lib/alpha-vantage-api";
import {
  initializeDatabase,
  batchInsertHistoricalPrices,
} from "../src/lib/database";

// --- Environment Variable Loading ---
// Load environment variables, prioritizing .env.development.local over .env.local
const envDevLocalPath = path.resolve(process.cwd(), ".env.development.local");
const envLocalPath = path.resolve(process.cwd(), ".env.local");
let loadedEnvFile = "";

if (fs.existsSync(envDevLocalPath)) {
  config({ path: envDevLocalPath });
  loadedEnvFile = path.basename(envDevLocalPath);
} else if (fs.existsSync(envLocalPath)) {
  config({ path: envLocalPath });
  loadedEnvFile = path.basename(envLocalPath);
}

// --- Pre-execution check for environment variables ---
const { DATABASE_URL, ALPHA_VANTAGE_API_KEY } = process.env;

if (!DATABASE_URL || !ALPHA_VANTAGE_API_KEY) {
  console.error("❌ Error: Missing required environment variables.");
  if (loadedEnvFile) {
    console.error(
      `   We loaded '${loadedEnvFile}', but it seems to be missing one or both of the following:`
    );
  } else {
    console.error(
      "   Could not find '.env.local' or '.env.development.local'. Please create one and add:"
    );
  }
  console.error("   - DATABASE_URL=<your_database_connection_string>");
  console.error("   - ALPHA_VANTAGE_API_KEY=<your_api_key>");
  process.exit(1);
}

if (loadedEnvFile) {
  console.log(
    `✅ Successfully loaded environment variables from '${loadedEnvFile}'.`
  );
}

const CONSTANTS_FILE_PATH = path.resolve(process.cwd(), "src/lib/constants.ts");
const CONSTANTS_BACKUP_PATH = `${CONSTANTS_FILE_PATH}.bak`;

/**
 * Main script execution function
 */
async function main() {
  // --- 1. Input Parsing & Validation ---
  const [symbol, name, type] = process.argv.slice(2);

  if (!symbol || !name || !type) {
    console.error(
      '❌ Error: Missing arguments. Usage: npm run add-asset -- <SYMBOL> "<Name>" <type>'
    );
    console.error('   Example: npm run add-asset -- TSLA "Tesla, Inc." stock');
    process.exit(1);
  }

  if (type !== "stock" && type !== "index") {
    console.error(
      `❌ Error: Invalid type '${type}'. Type must be 'stock' or 'index'.`
    );
    process.exit(1);
  }

  if (SUPPORTED_ASSETS.some((asset) => asset.symbol === symbol.toUpperCase())) {
    console.error(`❌ Error: Asset ${symbol.toUpperCase()} already exists.`);
    process.exit(1);
  }

  console.log(
    `🚀 Starting to add new asset: ${name} (${symbol.toUpperCase()})`
  );

  // --- 2. Frontend Code Modification ---
  try {
    console.log("   - Backing up constants.ts...");
    fs.copyFileSync(CONSTANTS_FILE_PATH, CONSTANTS_BACKUP_PATH);

    console.log("   - Modifying constants.ts to add new asset...");
    const constantsContent = fs.readFileSync(CONSTANTS_FILE_PATH, "utf8");

    // This regex is specifically designed to find the SUPPORTED_ASSETS array
    // and insert the new asset before its closing bracket.
    const assetArrayRegex =
      /(export const SUPPORTED_ASSETS: Asset\[] = \[)([\s\S]*?)(\];)/;

    if (!assetArrayRegex.test(constantsContent)) {
      throw new Error(
        "Could not find SUPPORTED_ASSETS array in constants.ts. The file structure might have changed, or it's malformed."
      );
    }

    const newAssetString = `  {
    symbol: "${symbol.toUpperCase()}",
    name: "${name}",
    type: "${type}",
  },\n`;

    const updatedContent = constantsContent.replace(
      assetArrayRegex,
      `$1$2${newAssetString}  $3`
    );

    fs.writeFileSync(CONSTANTS_FILE_PATH, updatedContent, "utf8");
    console.log("✅ constants.ts successfully modified.");
  } catch (error) {
    console.error("❌ Error modifying constants.ts:", error);
    process.exit(1); // Exit early, no rollback needed yet
  }

  // --- 3. Historical Data Backfilling ---
  try {
    console.log("\n⏳ Fetching historical data from Alpha Vantage...");
    const historicalData = await fetchFullHistoricalData(
      symbol.toUpperCase(),
      ALPHA_VANTAGE_API_KEY!
    );

    const dataToInsert = historicalData.map((price) => ({
      ...price,
      symbol: symbol.toUpperCase(),
    }));

    console.log("\n⏳ Connecting to database and backfilling data...");
    await initializeDatabase();
    await batchInsertHistoricalPrices(dataToInsert);
    console.log(
      `✅ Successfully backfilled ${
        historicalData.length
      } price records for ${symbol.toUpperCase()}.`
    );
  } catch (error) {
    console.error("\n❌ An error occurred during data backfilling:", error);
    console.log("\n🔄 Rolling back changes to constants.ts...");
    try {
      fs.copyFileSync(CONSTANTS_BACKUP_PATH, CONSTANTS_FILE_PATH);
      console.log("✅ Rollback successful.");
    } catch (rollbackError) {
      console.error("❌ CRITICAL: Rollback failed!", rollbackError);
      console.error(
        `   Your constants.ts file may be in an invalid state. Please restore it manually from ${CONSTANTS_BACKUP_PATH}`
      );
    }
    process.exit(1);
  }

  // --- 4. Confirmation & Cleanup ---
  try {
    fs.unlinkSync(CONSTANTS_BACKUP_PATH);
    console.log("\n   - Backup file cleaned up.");
  } catch (error) {
    console.warn("   - Warning: Could not delete backup file.", error);
  }

  console.log(`\n🎉 Successfully added new asset '${name}'!`);
  console.log("\nNext steps:");
  console.log("   1. Restart your Next.js dev server to see the changes.");
  console.log("   2. Commit the changes in 'src/lib/constants.ts' to Git.");
}

main().catch((error) => {
  console.error("An unexpected error occurred:", error);
  process.exit(1);
});
