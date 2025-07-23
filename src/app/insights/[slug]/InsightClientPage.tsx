"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { InsightPost } from "@/types";
import EmbeddedCalculatorResult from "@/components/EmbeddedCalculatorResult";

interface InsightClientPageProps {
  post: InsightPost;
}

export default function InsightClientPage({ post }: InsightClientPageProps) {
  // Split content to insert interactive component
  const contentParts = post.content.split("[INTERACTIVE_CALCULATOR_HERE]");
  const hasInteractiveComponent =
    contentParts.length > 1 && post.interactiveScenario;

  const embeddedCalculatorProps = useMemo(() => {
    if (!hasInteractiveComponent) return null;

    // The scenario from the blog post data is now mainly for toggle labels
    const scenario = post.interactiveScenario!;

    switch (post.slug) {
      case "sp500-vs-nasdaq-backtest":
        return {
          initialScenarioId: "spy-20y-from-2005",
          comparisonScenarioId: "qqq-20y-from-2005",
          toggleLabels: ["S&P 500 (SPY)", "NASDAQ 100 (QQQ)"],
        };
      case "power-of-starting-early":
        return {
          initialScenarioId: "spy-30y-from-1994",
          comparisonScenarioId: "spy-20y-from-2004",
          toggleLabels: [
            "Start in 1994 (30 years)",
            "Start in 2004 (20 years)",
          ],
        };
      case "dca-through-market-crashes":
        return {
          initialScenarioId: "spy-crashes-from-2007",
          comparisonScenarioId: "nvda-crashes-from-2007",
          toggleLabels: ["S&P 500 (SPY)", "NVIDIA (NVDA)"],
        };
      default:
        return null;
    }
  }, [post, hasInteractiveComponent]);

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article>
          <header className="mb-8">
            <div className="mb-6">
              <Link
                href="/insights"
                className="text-brand-blue hover:text-blue-700 inline-flex items-center"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to all insights
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              Published on{" "}
              {new Date(post.publishDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-gray-800 mt-2">
              {post.title}
            </h1>
          </header>

          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: contentParts[0] }} />

            {hasInteractiveComponent && embeddedCalculatorProps && (
              <EmbeddedCalculatorResult {...embeddedCalculatorProps} />
            )}

            {contentParts[1] && (
              <div dangerouslySetInnerHTML={{ __html: contentParts[1] }} />
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
