import Navigation from "@/components/Navigation";
import DCACalculator from "@/components/DCACalculator";
import Link from "next/link";
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function HomePage() {
  return (
    <>
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 md:py-24">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
                Historical Dollar-Cost Averaging Calculator
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto animate-fade-in-up">
                See how much you would have earned by investing consistently in
                your favorite stocks and ETFs. Real historical data, not
                theoretical projections.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base animate-fade-in-up">
                <div className="flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-full">
                  <ChartBarIcon className="h-5 w-5" />
                  <span>Real Historical Data</span>
                </div>
                <div className="flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-full">
                  <ArrowTrendingUpIcon className="h-5 w-5" />
                  <span>Multiple Assets</span>
                </div>
                <div className="flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-full">
                  <ClockIcon className="h-5 w-5" />
                  <span>20+ Years of Data</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-800 mb-4">
                Start Your Calculation
              </h2>
              <p className="text-lg text-brand-gray-600 max-w-2xl mx-auto">
                Choose your investment asset, set your contribution amounts, and
                see how your wealth would have grown using the dollar-cost
                averaging strategy.
              </p>
            </div>

            <DCACalculator />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-800 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-brand-gray-600 max-w-2xl mx-auto">
                Our calculator uses real historical market data to show you
                exactly what would have happened if you had invested
                consistently over time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-brand-gray-800 mb-2">
                  Choose Your Asset
                </h3>
                <p className="text-brand-gray-600">
                  Select from popular index funds like S&P 500, NASDAQ 100, or
                  individual stocks like Apple, Microsoft, Google.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-brand-gray-800 mb-2">
                  Set Your Plan
                </h3>
                <p className="text-brand-gray-600">
                  Define your initial investment amount, monthly contribution,
                  and investment time period.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-brand-gray-800 mb-2">
                  See Results
                </h3>
                <p className="text-brand-gray-600">
                  View your final portfolio value, total returns, and a detailed
                  chart showing your wealth growth over time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Insights Section */}
        <section className="bg-brand-gray-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-800 mb-4">
                Investment Insights
              </h2>
              <p className="text-lg text-brand-gray-600 max-w-2xl mx-auto">
                Explore real case studies and insights about long-term investing
                and dollar-cost averaging strategies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-brand-gray-800 mb-2">
                    S&P 500 vs NASDAQ: 20-Year Comparison
                  </h3>
                  <p className="text-brand-gray-600 mb-4">
                    Discover how investing $500/month in these two major indices
                    would have performed over the last two decades.
                  </p>
                  <Link
                    href="/insights"
                    className="text-brand-blue font-medium hover:text-blue-700 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </article>

              <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-brand-gray-800 mb-2">
                    The Power of Starting Early
                  </h3>
                  <p className="text-brand-gray-600 mb-4">
                    See the dramatic difference between starting your DCA
                    strategy at 25 vs 35 years old.
                  </p>
                  <Link
                    href="/insights"
                    className="text-brand-blue font-medium hover:text-blue-700 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </article>

              <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-brand-gray-800 mb-2">
                    DCA Through Market Crashes
                  </h3>
                  <p className="text-brand-gray-600 mb-4">
                    Learn how dollar-cost averaging performed during the 2008
                    financial crisis and 2020 pandemic.
                  </p>
                  <Link
                    href="/insights"
                    className="text-brand-blue font-medium hover:text-blue-700 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            </div>

            <div className="text-center mt-8">
              <Link href="/insights" className="btn-primary">
                View All Insights
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Preview Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-800 mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              <details className="bg-white border border-gray-200 rounded-lg">
                <summary className="p-6 cursor-pointer font-semibold text-brand-gray-800 hover:bg-gray-50">
                  Where does the historical data come from?
                </summary>
                <div className="px-6 pb-6 text-brand-gray-600">
                  Our data comes from reliable financial APIs and includes
                  adjusted closing prices that account for stock splits and
                  dividends, ensuring accurate historical returns.
                </div>
              </details>

              <details className="bg-white border border-gray-200 rounded-lg">
                <summary className="p-6 cursor-pointer font-semibold text-brand-gray-800 hover:bg-gray-50">
                  Is this financial advice?
                </summary>
                <div className="px-6 pb-6 text-brand-gray-600">
                  No, this tool is for educational purposes only. Past
                  performance does not guarantee future results. Always consult
                  with a qualified financial advisor before making investment
                  decisions.
                </div>
              </details>

              <details className="bg-white border border-gray-200 rounded-lg">
                <summary className="p-6 cursor-pointer font-semibold text-brand-gray-800 hover:bg-gray-50">
                  What is dollar-cost averaging (DCA)?
                </summary>
                <div className="px-6 pb-6 text-brand-gray-600">
                  Dollar-cost averaging is an investment strategy where you
                  invest a fixed amount of money at regular intervals,
                  regardless of market conditions. This helps reduce the impact
                  of market volatility on your investments.
                </div>
              </details>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/faq"
                className="text-brand-blue font-medium hover:text-blue-700 transition-colors"
              >
                View All FAQ →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-brand-blue py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to See Your Potential?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start exploring different investment scenarios and discover the
              power of consistent investing.
            </p>
            <Link
              href="#calculator"
              className="inline-block bg-white text-brand-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Try the Calculator
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">If You DCA</h3>
              <p className="text-gray-300 mb-4">
                See your growth, backed by history. The simplest way to
                understand the power of Dollar-Cost Averaging.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/insights"
                    className="hover:text-white transition-colors"
                  >
                    Insights
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Disclaimer</h4>
              <p className="text-gray-300 text-sm">
                This tool is for educational purposes only. Past performance
                does not guarantee future results.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 If You DCA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
