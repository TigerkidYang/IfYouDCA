import { ALPHA_VANTAGE_CONFIG } from "./constants";

/**
 * Fetches the complete historical monthly adjusted data for a given symbol from Alpha Vantage.
 * This is intended for the one-time backfilling of data for a new asset.
 * @param symbol The stock/ETF symbol to fetch.
 * @param apiKey Your Alpha Vantage API key.
 * @returns A promise that resolves to an array of price data points.
 */
export async function fetchFullHistoricalData(
  symbol: string,
  apiKey: string
): Promise<Array<{ date: string; adjustedClose: number }>> {
  const url = `${ALPHA_VANTAGE_CONFIG.baseUrl}?function=${ALPHA_VANTAGE_CONFIG.function}&symbol=${symbol}&apikey=${apiKey}&outputsize=full`;

  console.log(`Fetching full history for ${symbol} from Alpha Vantage...`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();

  // Handle API-specific errors or informational messages
  if (data["Error Message"]) {
    throw new Error(`API Error: ${data["Error Message"]}`);
  }
  if (data["Note"]) {
    // This often indicates an API rate limit call.
    throw new Error(`API Limit Reached: ${data["Note"]}`);
  }

  const timeSeries = data["Monthly Adjusted Time Series"];
  if (!timeSeries) {
    throw new Error(
      "No time series data returned from API. The symbol may be invalid or not supported."
    );
  }

  const prices: Array<{ date: string; adjustedClose: number }> = [];

  // Parse the data into a structured array
  for (const [date, priceData] of Object.entries(timeSeries)) {
    const adjustedClose = parseFloat((priceData as any)["5. adjusted close"]);

    if (isNaN(adjustedClose)) {
      console.warn(`Invalid price data for ${symbol} on ${date}, skipping.`);
      continue;
    }

    prices.push({
      date,
      adjustedClose,
    });
  }

  if (prices.length === 0) {
    throw new Error(`No valid price points were found for ${symbol}.`);
  }

  console.log(
    `Successfully fetched ${prices.length} data points for ${symbol}.`
  );

  // The API returns data in descending order, so we sort it ascending.
  return prices.sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Fetches recent historical monthly adjusted data (last ~100 data points).
 * This is intended for regular, incremental updates.
 * @param symbol The stock/ETF symbol to fetch.
 * @param apiKey Your Alpha Vantage API key.
 * @returns A promise that resolves to the time series data object.
 */
export async function fetchRecentHistoricalData(
  symbol: string,
  apiKey: string
): Promise<any> {
  const url = `${ALPHA_VANTAGE_CONFIG.baseUrl}?function=${ALPHA_VANTAGE_CONFIG.function}&symbol=${symbol}&apikey=${apiKey}&outputsize=compact`;

  console.log(`Fetching recent history for ${symbol}...`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (data["Error Message"]) {
    throw new Error(`API Error: ${data["Error Message"]}`);
  }
  if (data["Note"]) {
    throw new Error(`API Limit Reached: ${data["Note"]}`);
  }

  const timeSeries = data["Monthly Adjusted Time Series"];
  if (!timeSeries) {
    throw new Error("No time series data returned from API.");
  }

  return timeSeries;
}
