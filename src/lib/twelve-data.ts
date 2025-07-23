import twelvedata from "twelvedata";

// Use a singleton pattern to ensure the client is initialized only once.
let client: ReturnType<typeof twelvedata> | null = null;

function getTwelveDataClient() {
  // If the client is already initialized, return it.
  if (client) {
    return client;
  }

  // Read the API key from environment variables.
  // This will now happen at runtime when the function is first called.
  const apiKey = process.env.TWELVEDATA_API_KEY;

  if (!apiKey) {
    throw new Error(
      "TWELVEDATA_API_KEY is not set in the environment variables."
    );
  }

  const config = {
    key: apiKey,
  };

  // Initialize the client and store it for future use.
  client = twelvedata(config);
  return client;
}

export async function getMonthlyHistory(
  symbol: string
): Promise<{ date: string; price: number }[]> {
  // Get the initialized client. This will trigger initialization on the first call.
  const tdClient = getTwelveDataClient();

  console.log(
    `Fetching monthly historical data for ${symbol} from Twelve Data...`
  );
  try {
    const results = await tdClient.timeSeries({
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
