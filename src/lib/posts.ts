// lib/posts.ts
import path from "node:path";
import { promises as fs } from "node:fs";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

export type PostMeta = {
	slug: string;
	title: string;
	date?: string;
	tags?: string[];
	summary?: string;
};

export type PostFile = {
	meta: PostMeta;
	body: string; // raw MDX
};

export async function getPostSlugs(): Promise<string[]> {
	const files = await fs.readdir(POSTS_DIR);
	return files
		.filter((f) => f.endsWith(".mdx"))
		.map((f) => f.replace(/\.mdx$/, ""));
}

export async function getPostSource(
	slug: string
): Promise<{ source: string; meta: PostMeta }> {
	const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
	const raw = await fs.readFile(filePath, "utf8");
	const { content, data } = matter(raw);
	const meta: PostMeta = {
		slug,
		title: (data.title as string) ?? slug,
		date: (data.date as string) || undefined,
		tags: (data.tags as string[]) || [],
		summary: (data.summary as string) || undefined,
	};
	return { source: content, meta };
}

export async function getPost(slug: string): Promise<PostFile> {
	const { source, meta } = await getPostSource(slug);
	return { meta, body: source };
}

export async function getAllPostsMeta(): Promise<PostMeta[]> {
	const slugs = await getPostSlugs();

	const ts = (d?: string) => {
		const t = d ? Date.parse(d) : NaN;
		return Number.isNaN(t) ? -Infinity : t;
	};

	const metas: PostMeta[] = await Promise.all(
		slugs.map(async (slug) => {
			const {meta} = await getPostSource(slug);
			return meta;
		})
	);


	metas.sort((a, b) => ts(b.date) - ts(a.date));
	return metas;
}

export async function getAllPostsWithBody(): Promise<PostFile[]> {
	const slugs = await getPostSlugs();
	const posts: PostFile[] = [];
	for (const slug of slugs) {
		posts.push(await getPost(slug));
	}
	return posts.sort(
		(a, b) =>
			Date.parse(a.meta.date ?? "1970-01-01") -
			Date.parse(b.meta.date ?? "1970-01-01")
	);
}
