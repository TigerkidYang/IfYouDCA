import { INSIGHTS_POSTS } from "@/lib/insights-data";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { InsightPost } from "@/types";

export default function InsightsPage() {
  const posts: InsightPost[] = INSIGHTS_POSTS;

  return (
    <div className="bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm mb-8">
          <Link href="/" className="text-brand-gray-600 hover:text-brand-blue">
            Home
          </Link>
          <span className="mx-2 text-brand-gray-400">/</span>
          <span className="text-brand-gray-800 font-medium">Insights</span>
        </nav>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-gray-800 mb-4 tracking-tight">
            Investment Insights & DCA Strategies
          </h1>
          <p className="text-lg text-brand-gray-600 max-w-2xl mx-auto">
            Data-driven analyses, backtesting case studies, and strategies
            powered by our Historical DCA Calculator.
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post: InsightPost) => (
            <Link
              href={`/insights/${post.slug}`}
              key={post.slug}
              className="block group"
            >
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 group-hover:shadow-md transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-brand-gray-800 mb-2 group-hover:text-brand-blue transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-brand-gray-600 mb-4">{post.summary}</p>
                <div className="flex items-center text-brand-blue font-semibold">
                  <span>Read Article</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link href="/" className="btn-primary">
            Back to the Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}
