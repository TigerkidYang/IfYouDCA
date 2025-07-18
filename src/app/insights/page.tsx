import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Investment Insights & DCA Strategies | If You DCA",
  description:
    "Explore articles on long-term investing, dollar-cost averaging strategies, market analysis, and case studies backed by real historical data.",
  alternates: {
    canonical: "/insights",
  },
};

export default function InsightsPage() {
  return (
    <>
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Investment Insights & DCA Strategies
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Explore real case studies, market analysis, and data-driven
                insights about long-term investing and dollar-cost averaging
                strategies.
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon Content */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                📝 Content Coming Soon
              </h3>
              <p className="text-yellow-700 mb-4">
                We're currently working on publishing detailed case studies and
                analysis articles. In the meantime, you can use our calculator
                to explore historical DCA performance for yourself! Each
                calculation you run is essentially creating your own case study.
              </p>
              <Link
                href="/"
                className="inline-block text-yellow-800 font-semibold hover:text-yellow-900"
              >
                Try the Calculator →
              </Link>
            </div>
          </div>
        </section>

        {/* Planned Content Preview */}
        <section className="bg-brand-gray-50 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-gray-800 mb-8 text-center">
              Upcoming Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-brand-gray-800 mb-2">
                  S&P 500 vs NASDAQ: 20-Year Comparison
                </h3>
                <p className="text-brand-gray-600 text-sm">
                  Comprehensive analysis comparing dollar-cost averaging into
                  these two major indices over the past two decades.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-brand-gray-800 mb-2">
                  DCA Through Market Crashes
                </h3>
                <p className="text-brand-gray-600 text-sm">
                  How dollar-cost averaging performed during the 2008 financial
                  crisis and 2020 pandemic.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-brand-gray-800 mb-2">
                  The Power of Starting Early
                </h3>
                <p className="text-brand-gray-600 text-sm">
                  Mathematical proof of why starting your investment journey
                  earlier can mean exponentially more wealth.
                </p>
              </div>
            </div>
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
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
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
