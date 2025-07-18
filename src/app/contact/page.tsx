import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us & Feedback | If You DCA",
  description:
    "Have questions about our calculator, data methodology, or suggestions for improvement? We'd love to hear from you.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Contact Us & Feedback
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Have questions about our calculator, data methodology, or
                suggestions for improvement? We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-gray-800 mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-brand-gray-600">
                We're here to help with any questions about our DCA calculator
                or methodology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Email Contact */}
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📧</span>
                </div>
                <h3 className="text-xl font-semibold text-brand-gray-800 mb-2">
                  Email Us
                </h3>
                <p className="text-brand-gray-600 mb-4">
                  For general inquiries, feature requests, or bug reports
                </p>
                <a
                  href="mailto:hello@ifyoudca.com"
                  className="text-brand-blue hover:text-blue-700 font-semibold"
                >
                  hello@ifyoudca.com
                </a>
              </div>

              {/* FAQ Reference */}
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">❓</span>
                </div>
                <h3 className="text-xl font-semibold text-brand-gray-800 mb-2">
                  Quick Answers
                </h3>
                <p className="text-brand-gray-600 mb-4">
                  Check our FAQ section for common questions about the
                  calculator
                </p>
                <Link
                  href="/faq"
                  className="text-brand-blue hover:text-blue-700 font-semibold"
                >
                  View FAQ →
                </Link>
              </div>
            </div>

            {/* Response Time Info */}
            <div className="mt-12 bg-brand-gray-50 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-brand-gray-800 mb-2">
                Response Time
              </h3>
              <p className="text-brand-gray-600">
                We typically respond to all inquiries within 24-48 hours during
                business days.
              </p>
            </div>
          </div>
        </section>

        {/* Common Topics */}
        <section className="bg-brand-gray-50 py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-gray-800 mb-8 text-center">
              Common Inquiry Topics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-brand-gray-800 mb-2">
                  Data & Methodology
                </h4>
                <p className="text-brand-gray-600 text-sm">
                  Questions about our data sources or calculation methods
                </p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-brand-gray-800 mb-2">
                  Feature Requests
                </h4>
                <p className="text-brand-gray-600 text-sm">
                  Suggestions for new features or improvements
                </p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-brand-gray-800 mb-2">
                  Bug Reports
                </h4>
                <p className="text-brand-gray-600 text-sm">
                  Found something that's not working correctly?
                </p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-brand-gray-800 mb-2">
                  Partnership
                </h4>
                <p className="text-brand-gray-600 text-sm">
                  Business or partnership opportunities
                </p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-brand-gray-800 mb-2">
                  Press Inquiry
                </h4>
                <p className="text-brand-gray-600 text-sm">
                  Media or press related questions
                </p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-brand-gray-800 mb-2">
                  General Support
                </h4>
                <p className="text-brand-gray-600 text-sm">
                  Any other questions about our platform
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-yellow-50 border-t border-yellow-200 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Important Notice
              </h3>
              <p className="text-yellow-700 text-sm">
                This website and calculator are for educational purposes only.
                We do not provide financial advice. Past performance does not
                guarantee future results. All investments carry risk, including
                potential loss of principal.
              </p>
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
                    href="/insights"
                    className="hover:text-white transition-colors"
                  >
                    Insights
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
