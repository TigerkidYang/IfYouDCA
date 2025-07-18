import { Asset } from "@/types";

// Supported assets for DCA calculation
export const SUPPORTED_ASSETS: Asset[] = [
  {
    symbol: "SPY",
    name: "S&P 500 ETF",
    type: "index",
  },
  {
    symbol: "QQQ",
    name: "NASDAQ 100 ETF",
    type: "index",
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    type: "stock",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    type: "stock",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    type: "stock",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    type: "stock",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    type: "stock",
  },
];

// Default DCA calculation values
export const DEFAULT_DCA_VALUES = {
  asset: "SPY",
  initialInvestment: 0,
  monthlyContribution: 100,
  startDate: "2020-01",
  endDate: new Date().toISOString().slice(0, 7), // Current YYYY-MM
};

// Date limits
export const DATE_LIMITS = {
  earliestDate: "2000-01", // Earliest supported date
  latestDate: new Date().toISOString().slice(0, 7),
};

// API endpoints
export const API_ENDPOINTS = {
  calculateDCA: "/api/calculate-dca",
  updatePrices: "/api/update-prices",
  healthCheck: "/api/health",
};

// Alpha Vantage API configuration
export const ALPHA_VANTAGE_CONFIG = {
  baseUrl: "https://www.alphavantage.co/query",
  function: "TIME_SERIES_MONTHLY_ADJUSTED",
  outputSize: "full",
};

// Chart configuration
export const CHART_CONFIG = {
  colors: {
    totalValue: "#16a34a",
    totalInvestment: "#2563eb",
    grid: "#e5e7eb",
    text: "#374151",
  },
  height: 400,
  margins: {
    top: 20,
    right: 30,
    left: 40,
    bottom: 60,
  },
};

// SEO configuration
export const SEO_CONFIG = {
  siteName: "If You DCA",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://ifyoudca.com",
  defaultTitle:
    "Historical Dollar-Cost Averaging Calculator - See Your Investment Growth",
  defaultDescription:
    "Calculate the historical returns of your investments. See how dollar-cost averaging into S&P 500, NASDAQ, and top stocks would have performed.",
  ogImage: "/og-image.png",
};
