import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | If You DCA",
  description:
    "Have questions? Find answers about how our DCA calculator works, our data accuracy, and the principles of dollar-cost averaging.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQPage() {
  const faqs = [
    {
      question: "What is dollar-cost averaging (DCA)?",
      answer:
        "Dollar-cost averaging is an investment strategy where you invest a fixed amount of money at regular intervals (like monthly), regardless of market conditions. This helps reduce the impact of market volatility by spreading your purchases over time, potentially lowering your average cost per share.",
    },
    {
      question: "Where does your historical data come from?",
      answer:
        "Our data comes from Twelve Data, a reliable financial data provider. We use adjusted closing prices that account for stock splits, dividends, and other corporate actions to ensure accurate historical returns. All data is updated regularly to maintain accuracy.",
    },
    {
      question: "Is this financial advice?",
      answer:
        "No, this tool is for educational purposes only. We provide historical data and calculations to help you understand how DCA strategies have performed in the past. Past performance does not guarantee future results. Always consult with a qualified financial advisor before making investment decisions.",
    },
    {
      question: "Why don't my results include fees and taxes?",
      answer:
        "To keep calculations simple and focused on the core DCA strategy, we don't include trading fees, taxes, or fund management fees. In reality, these costs would reduce your returns. Many modern brokerages offer commission-free trading, which minimizes transaction costs for DCA strategies.",
    },
    {
      question: "How accurate are the calculations?",
      answer:
        "Our calculations are based on actual historical adjusted closing prices and use a month-by-month simulation approach. This provides a realistic view of how DCA would have performed. However, the results don't account for fees, taxes, or the exact timing of when you might have made purchases within each month.",
    },
    {
      question: "What assets can I analyze?",
      answer:
        "Currently, we support major index ETFs (S&P 500 via SPY, NASDAQ 100 via QQQ) and popular large-cap stocks (Apple, Microsoft, Google, Amazon, NVIDIA). We're working to add more asset classes including international markets, bonds, and additional stocks.",
    },
    {
      question: "How far back does your data go?",
      answer:
        "Our historical data covers from 2000 to the present, giving you over 20 years of market history including major events like the dot-com crash, 2008 financial crisis, and 2020 pandemic. This allows you to see how DCA performed through various market cycles.",
    },
    {
      question: "Can I use this for retirement planning?",
      answer:
        "While our tool shows historical performance of DCA strategies, it shouldn't be your only retirement planning resource. Consider factors like inflation, taxes, changing income, and diversification across asset classes. Professional financial planning software and advisors can provide more comprehensive retirement analysis.",
    },
    {
      question: "Why might my actual results differ from the calculator?",
      answer:
        "Several factors could cause differences: transaction timing within months, fees and commissions, taxes on dividends and gains, fund expense ratios, and market conditions different from historical patterns. Our calculator provides a baseline for understanding DCA performance.",
    },
    {
      question: "How often is the data updated?",
      answer:
        "We update our price data daily to ensure calculations reflect the most current market information. The calculator automatically uses the most recent data available for your selected time period.",
    },
    {
      question: "Can I compare different investment strategies?",
      answer:
        "Yes! You can run multiple calculations with different assets, time periods, and contribution amounts to compare strategies. Try comparing lump-sum investing vs. DCA, different assets, or various contribution amounts to see how they would have performed historically.",
    },
    {
      question: "What if I want to analyze a longer time period?",
      answer:
        "Our data currently goes back to 2000, allowing for analysis periods up to about 24 years. For longer historical analysis, you might need specialized financial databases, though the principles of DCA tend to be consistent across longer time periods.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Navigation />

      <main className="flex-1">
        {/* Add JSON-LD script for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Have questions about our DCA calculator, data sources, or
                investment strategies? Find answers to the most common questions
                below.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  <summary className="p-6 cursor-pointer font-semibold text-brand-gray-800 hover:bg-gray-50 rounded-lg">
                    <span className="text-lg">{faq.question}</span>
                  </summary>
                  <div className="px-6 pb-6 text-brand-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            {/* Additional Resources */}
            <div className="mt-16 bg-brand-gray-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-brand-gray-800 mb-4 text-center">
                Still Have Questions?
              </h2>
              <p className="text-brand-gray-600 text-center mb-6">
                Can't find the answer you're looking for? We're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary text-center">
                  Contact Us
                </Link>
                <Link
                  href="/about"
                  className="inline-block bg-white text-brand-blue px-6 py-3 rounded-lg font-semibold border border-brand-blue hover:bg-blue-50 transition-colors text-center"
                >
                  Learn About Our Data
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start Guide */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-gray-800 mb-8 text-center">
              Quick Start Guide
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-brand-gray-800 mb-2">
                  Choose Your Asset
                </h3>
                <p className="text-brand-gray-600 text-sm">
                  Select from S&P 500, NASDAQ 100, or popular stocks like Apple
                  and Microsoft.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-brand-gray-800 mb-2">
                  Set Your Parameters
                </h3>
                <p className="text-brand-gray-600 text-sm">
                  Enter your monthly contribution amount and choose your
                  investment time period.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-brand-gray-800 mb-2">
                  Analyze Results
                </h3>
                <p className="text-brand-gray-600 text-sm">
                  View your potential returns, total investment, and detailed
                  growth chart.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="/" className="btn-primary">
                Try the Calculator Now
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
