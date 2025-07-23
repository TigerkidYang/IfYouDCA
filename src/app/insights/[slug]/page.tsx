import { INSIGHTS_POSTS } from "@/lib/insights-data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import InsightClientPage from "./InsightClientPage";
import { InsightPost } from "@/types";
import Link from "next/link";

type InsightPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const post = INSIGHTS_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    return {};
  }
  return {
    title: `${post.title} | If You DCA`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url: `https://ifyoudca.com/insights/${post.slug}`,
    },
  };
}

export default function InsightPage({ params }: InsightPageProps) {
  const post = INSIGHTS_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <nav className="text-sm mb-8">
          <Link href="/" className="text-brand-gray-600 hover:text-brand-blue">
            Home
          </Link>
          <span className="mx-2 text-brand-gray-400">/</span>
          <Link
            href="/insights"
            className="text-brand-gray-600 hover:text-brand-blue"
          >
            Insights
          </Link>
          <span className="mx-2 text-brand-gray-400">/</span>
          <span className="text-brand-gray-800 font-medium">{post.title}</span>
        </nav>
        <InsightClientPage post={post} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return INSIGHTS_POSTS.map((post: InsightPost) => ({
    slug: post.slug,
  }));
}
