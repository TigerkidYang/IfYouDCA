import twelvedata from "twelvedata";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.development.local" });
dotenv.config({ path: "./.env.local" });
dotenv.config({ path: "./.env.development" });
dotenv.config({ path: "./.env" });

const apiKey = process.env.TWELVEDATA_API_KEY;

if (!apiKey) {
  throw new Error(
    "TWELVEDATA_API_KEY is not set in the environment variables."
  );
}

const config = {
  key: apiKey,
};

const client = twelvedata(config);

export async function getMonthlyHistory(
  symbol: string
): Promise<{ date: string; price: number }[]> {
  console.log(
    `Fetching monthly historical data for ${symbol} from Twelve Data...`
  );
  try {
    const results = await client.timeSeries({
      symbol,
      interval: "1month",
      outputsize: 5000,
      order: "asc",
      adjust: "all", // Ensure data is fully adjusted for splits and dividends
    });

    if (!results || !results.values || results.values.length === 0) {
      console.warn(`No data returned from Twelve Data for ${symbol}.`);
      return [];
    }

    return results.values.map((v: { datetime: string; close: string }) => ({
      date: v.datetime,
      price: parseFloat(v.close),
    }));
  } catch (error) {
    console.error(
      `An error occurred while fetching data for ${symbol}:`,
      error
    );
    // Return an empty array or re-throw the error, depending on desired error handling
    return [];
  }
}
