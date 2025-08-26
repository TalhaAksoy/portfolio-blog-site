import { ReactNode } from "react";

export type PostFrontmatter = {
	title: string;
	date?: string;        // ISO string (YYYY-MM-DD)
	tags?: string[];
	summary?: string;     // description
};

export default function PostLayout({
	                                   frontmatter,
	                                   children,
                                   }: {
	frontmatter: PostFrontmatter;
	children: ReactNode;
}) {
	const { title, date, tags, summary } = frontmatter ?? {};

	return (
		<article className="prose prose-slate dark:prose-invert max-w-3xl mx-auto py-12 md:px-0 px-2">
			{/* Başlık */}
			<header className="mb-8">
				<h1 className="!mb-2 text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">
					{title}
				</h1>

				{/* Tarih */}
				{date && (
					<p className="text-sm opacity-70">
						{new Date(date).toLocaleDateString("tr-TR", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
				)}

				{/* Etiketler */}
				{!!tags?.length && (
					<div className="mt-3 flex flex-wrap gap-2">
						{tags.map((tag) => (
							<span
								key={tag}
								className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
							>
                #{tag}
              </span>
						))}
					</div>
				)}

				{/* Özet */}
				{summary && (
					<p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
						{summary}
					</p>
				)}
			</header>

			{/* İçerik */}
			<div className="prose prose-slate dark:prose-invert max-w-none">
				{children}
			</div>
		</article>
	);
}
