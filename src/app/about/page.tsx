import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "About Us | The Mission Behind If You DCA",
  description:
    "Learn about our mission to make investment data accessible and understandable. Find out about our data sources and methodology.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our Mission & Data Methodology
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Making investment data accessible, understandable, and
                actionable for everyone interested in long-term wealth building.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-brand-gray-800 mb-6">
                Our Mission
              </h2>

              <p className="text-lg text-brand-gray-600 mb-6">
                Traditional compound interest calculators show you theoretical
                returns based on fixed annual rates. While useful, they don't
                capture the reality of market volatility, economic cycles, and
                the emotional journey of long-term investing.
              </p>

              <p className="text-lg text-brand-gray-600 mb-6">
                <strong>If You DCA</strong> bridges this gap by using real
                historical market data to show you exactly what would have
                happened if you had invested consistently over any period in the
                past 20+ years. This isn't theory—it's history.
              </p>

              <h3 className="text-2xl font-semibold text-brand-gray-800 mb-4">
                Why This Matters
              </h3>

              <ul className="space-y-4 text-brand-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-brand-green mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Real Data Builds Confidence:</strong> Seeing how DCA
                    performed through actual market crashes, bull runs, and
                    recessions helps you understand what to expect.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-brand-green mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Visual Learning:</strong> Charts and data
                    visualizations make complex financial concepts immediately
                    understandable.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-brand-green mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Strategic Insights:</strong> Compare different
                    assets, time periods, and investment amounts to develop
                    informed investment strategies.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="bg-brand-gray-50 py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-gray-800 mb-8 text-center">
              Our Data Methodology
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <ShieldCheckIcon className="h-12 w-12 text-brand-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-brand-gray-800 mb-2">
                  Reliable Sources
                </h3>
                <p className="text-brand-gray-600">
                  We source our data from Twelve Data, a trusted financial data
                  provider used by thousands of applications worldwide.
                </p>
              </div>

              <div className="text-center">
                <ChartBarIcon className="h-12 w-12 text-brand-green mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-brand-gray-800 mb-2">
                  Adjusted Prices
                </h3>
                <p className="text-brand-gray-600">
                  We use adjusted closing prices that account for stock splits,
                  dividends, and other corporate actions for accurate returns.
                </p>
              </div>

              <div className="text-center">
                <CheckCircleIcon className="h-12 w-12 text-brand-red mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-brand-gray-800 mb-2">
                  Daily Updates
                </h3>
                <p className="text-brand-gray-600">
                  Our price data is updated daily to ensure calculations reflect
                  the most current market information available.
                </p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-semibold text-brand-gray-800 mb-4">
                Calculation Method
              </h3>

              <p className="text-brand-gray-600 mb-4">
                Our DCA calculator uses a month-by-month simulation approach
                rather than mathematical formulas. Here's how it works:
              </p>

              <ol className="space-y-3 text-brand-gray-600">
                <li>
                  <strong>Data Retrieval:</strong> We fetch historical adjusted
                  closing prices for your selected asset and time period.
                </li>
                <li>
                  <strong>Monthly Simulation:</strong> For each month in your
                  investment period, we calculate how many shares your monthly
                  contribution would have purchased at that month's price.
                </li>
                <li>
                  <strong>Accumulation:</strong> We track your total shares
                  owned and total amount invested over time.
                </li>
                <li>
                  <strong>Final Calculation:</strong> Your final portfolio value
                  is your total shares multiplied by the most recent price.
                </li>
                <li>
                  <strong>Performance Metrics:</strong> We calculate your total
                  return, annualized return (CAGR), and provide detailed
                  visualization of your wealth growth.
                </li>
              </ol>

              <h3 className="text-2xl font-semibold text-brand-gray-800 mb-4 mt-8">
                Data Coverage
              </h3>

              <p className="text-brand-gray-600 mb-4">
                Our historical data aims to be as comprehensive as possible:
              </p>

              <ul className="space-y-2 text-brand-gray-600">
                <li>
                  <strong>Time Range:</strong> We use the full available
                  historical data for each asset, which for some indices goes
                  back several decades.
                </li>
                <li>
                  <strong>Update Frequency:</strong> Monthly data points for
                  consistency with DCA strategies.
                </li>
                <li>
                  <strong>Assets Covered:</strong> Major index ETFs (SPY, QQQ)
                  and large-cap stocks (AAPL, MSFT, GOOGL, AMZN, NVDA).
                </li>
                <li>
                  <strong>Data Points:</strong> Adjusted closing prices that
                  account for all corporate actions like dividends and stock
                  splits.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Transparency Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-gray-800 mb-8 text-center">
              Transparency & Limitations
            </h2>

            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-semibold text-brand-gray-800 mb-4">
                What We Include
              </h3>
              <ul className="space-y-2 text-brand-gray-600 mb-6">
                <li>
                  • Historical price appreciation and dividends (through
                  adjusted prices)
                </li>
                <li>• Real market volatility and timing effects</li>
                <li>• Compound growth from reinvestment</li>
              </ul>

              <h3 className="text-2xl font-semibold text-brand-gray-800 mb-4">
                What We Don't Include
              </h3>
              <ul className="space-y-2 text-brand-gray-600 mb-6">
                <li>• Trading fees or brokerage commissions</li>
                <li>• Taxes on dividends or capital gains</li>
                <li>• Inflation adjustments</li>
                <li>• Management fees for ETFs or mutual funds</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8">
                <h4 className="text-lg font-semibold text-yellow-800 mb-2">
                  Important Disclaimer
                </h4>
                <p className="text-yellow-700">
                  This tool is for educational purposes only. Past performance
                  does not guarantee future results. All investments carry risk,
                  including the potential for loss of principal. Always consult
                  with a qualified financial advisor before making investment
                  decisions.
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-brand-gray-800 mb-4">
                Future Enhancements
              </h3>
              <p className="text-brand-gray-600 mb-4">
                We're continuously working to improve and expand our calculator.
                Planned features include:
              </p>
              <ul className="space-y-2 text-brand-gray-600">
                <li>
                  • More asset classes (international markets, bonds,
                  commodities)
                </li>
                <li>• Inflation-adjusted returns</li>
                <li>• Tax-consideration scenarios</li>
                <li>• Portfolio diversification analysis</li>
                <li>• Custom asset combinations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-brand-blue py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Questions About Our Methodology?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              We believe in complete transparency. If you have questions about
              our data sources, calculations, or methodology, we'd love to hear
              from you.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-brand-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
