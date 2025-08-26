// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { getPost, getPostSlugs } from "@/lib/posts";
import PostLayout from "@/components/PostLayout/postLayout";
import Pre from "@/components/Mdx/pre";
import rehypeExternalLinks from "rehype-external-links";
import cfg from '@/config/site.json'

export const runtime = "nodejs"; // Shiki için Node runtime
export const dynamicParams = false;

type PageProps = { params: Promise<{ slug: string }> }; // <-- Promise!


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const {slug} = await params;
	const {meta} = await getPost(slug);

	const canonical = `/blog/${slug}`;

	return {
		title: meta.title,                     // template ile "... | Selim Talha Aksoy"
		description: meta.summary,
		alternates: {canonical},
		openGraph: {
			type: "article",
			url: canonical,
			title: meta.title,
			description: meta.summary,
			siteName: cfg.site.title,
			publishedTime: meta.date,
			authors: [cfg.profile.name],
			tags: meta.tags,
		},
	};
}

export async function generateStaticParams() {
	const slugs = await getPostSlugs();
	return slugs.map((slug) => ({ slug }));
}

const prettyCodeOptions = {
	keepBackground: false,
};

export default async function BlogPostPage({ params }: PageProps) {
	const { slug } = await params;              // <-- await
	const { meta, body } = await getPost(slug);

	return (
		<PostLayout
			frontmatter={{ title: meta.title, date: meta.date, tags: meta.tags, summary: meta.summary }}
		>
			<MDXRemote
				source={body}
				components={{ pre: (p) => <Pre {...p} /> }}
				options={{
					mdxOptions: {
						remarkPlugins: [remarkGfm],
						rehypePlugins: [
							rehypeSlug,
							[rehypeAutolinkHeadings, { behavior: "wrap" }],
							[rehypePrettyCode, prettyCodeOptions],
							[rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
						],
					},
				}}
			/>
		</PostLayout>
	);
}
