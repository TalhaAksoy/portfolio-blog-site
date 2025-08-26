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

export const runtime = "nodejs"; // Shiki için Node runtime
export const dynamicParams = false;

type PageProps = { params: Promise<{ slug: string }> }; // <-- Promise!

export async function generateStaticParams() {
	const slugs = await getPostSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;              // <-- await
	const { meta } = await getPost(slug);
	return { title: meta.title, description: meta.summary };
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
