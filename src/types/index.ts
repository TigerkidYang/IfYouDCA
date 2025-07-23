// Asset types for the DCA calculator
export type AssetType = "index" | "stock";

export interface Asset {
  symbol: string;
  name: string;
  type: AssetType;
}

export interface AssetWithMetadata extends Asset {
  earliestDate: string;
}

// Blog post structure for insights
export interface InsightPost {
  slug: string;
  title: string;
  summary: string;
  publishDate: string;
  metaDescription: string;
  content: string;
  interactiveScenario?: DCAInput;
}

// DCA calculation input parameters
export interface DCAInput {
  asset: string;
  initialInvestment: number;
  monthlyContribution: number;
  startDate: string; // YYYY-MM format
  endDate: string; // YYYY-MM format
}

// Data shape for historical prices used in calculations
export interface HistoricalPrice {
  date: string; // YYYY-MM-DD format
  adjustedClose: number;
}

// DCA calculation results
export interface DCAResult {
  finalValue: number;
  totalInvestment: number;
  totalGain: number;
  annualizedReturn: number; // CAGR
  chartData: ChartDataPoint[];
  summary: DCAResultSummary;
}

export interface ChartDataPoint {
  date: string;
  totalValue: number;
  totalInvestment: number;
  monthlyPrice: number;
  sharesOwned: number;
}

export interface DCAResultSummary {
  investmentPeriodMonths: number;
  investmentPeriodYears: number;
  averagePurchasePrice: number;
  finalSharePrice: number;
  totalShares: number;
}

// API response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// SEO Meta data
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}
