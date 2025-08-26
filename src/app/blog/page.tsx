// app/blog/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPostsMeta } from "@/lib/posts";

export const metadata: Metadata = { title: "Blog" };
export const revalidate = 60;

const fmt = new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium" });
const PAGE_SIZE = 10;

type PageProps = {
	searchParams: Promise<{ q?: string; page?: string }>;
};

export default async function BlogPage({ searchParams }: PageProps) {
	const { q = "", page: pageParam } = await searchParams; // Next 15: await!
	const query = q?.toString().trim() ?? "";

	// Tüm yazılar (zaten new->old sıralı geliyor)
	const all = await getAllPostsMeta();

	// Başlığa göre filtre (TR locale, küçük/büyük duyarsız)
	const qLower = query.toLocaleLowerCase("tr-TR");
	const filtered = query
		? all.filter((p) => p.title.toLocaleLowerCase("tr-TR").includes(qLower))
		: all;

	// Pagination
	const total = filtered.length;
	const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
	let page = Number.parseInt(pageParam ?? "1", 10);
	if (!Number.isFinite(page) || page < 1) page = 1;
	if (page > totalPages) page = totalPages;

	const start = (page - 1) * PAGE_SIZE;
	const items = filtered.slice(start, start + PAGE_SIZE);

	// URL builder (q'yu koru)
	const hrefWith = (pageNum: number) => {
		const sp = new URLSearchParams();
		if (query) sp.set("q", query);
		if (pageNum > 1) sp.set("page", String(pageNum));
		const qs = sp.toString();
		return `/blog${qs ? `?${qs}` : ""}`;
	};

	return (
		<section className="mx-auto max-w-3xl py-12 px-4">
			<h1 className="text-3xl md:text-4xl font-bold mb-8">📝 Blog</h1>

			{/* Search */}
			<form method="GET" action="/blog" className="mb-6 flex items-center gap-2">
				<input
					type="search"
					name="q"
					defaultValue={query}
					placeholder="Başlıkta ara…"
					className="w-full rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-slate-400
                     dark:border-slate-700 dark:bg-slate-900/60 dark:focus:ring-slate-600"
					aria-label="Başlığa göre ara"
				/>
				<button
					type="submit"
					className="rounded-lg px-3 py-2 text-sm bg-slate-900 text-white hover:bg-black
                     dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition"
				>
					Ara
				</button>
				{query && (
					<Link
						href="/blog"
						className="text-sm opacity-80 hover:opacity-100 underline underline-offset-4"
					>
						Temizle
					</Link>
				)}
			</form>

			{/* Results info */}
			<div className="mb-4 text-sm opacity-75">
				{query ? (
					<>
						“<span className="font-medium">{query}</span>” için {total} sonuç
						{total > 0 && ` • Sayfa ${page}/${totalPages}`}
					</>
				) : (
					<>
						Toplam {total} yazı{total > 0 && ` • Sayfa ${page}/${totalPages}`}
					</>
				)}
			</div>

			{/* List */}
			{items.length === 0 ? (
				<p className="opacity-70">Sonuç bulunamadı.</p>
			) : (
				<ul className="space-y-6">
					{items.map((p) => (
						<li
							key={p.slug}
							className="rounded-xl border border-slate-200 bg-white/70 dark:border-slate-800
                         dark:bg-slate-900/40 transition-all duration-300
                         hover:scale-[1.01] hover:shadow-md hover:bg-white dark:hover:bg-slate-900"
						>
							<Link href={`/blog/${p.slug}`} className="block p-5">
								<h2 className="text-xl font-semibold line-clamp-2">{p.title}</h2>

								{p.date && (
									<time
										dateTime={p.date}
										className="mt-2 inline-block text-xs px-2 py-1 rounded-full
                               bg-slate-100 text-slate-600
                               dark:bg-slate-800 dark:text-slate-300"
									>
										{fmt.format(new Date(p.date))}
									</time>
								)}

								{p.summary && (
									<p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
										{p.summary}
									</p>
								)}

								{!!p.tags?.length && (
									<div className="mt-3 flex flex-wrap gap-2">
										{p.tags.map((tag) => (
											<span
												key={tag}
												className="text-xs px-2 py-1 rounded-full
                                   bg-slate-100 text-slate-700
                                   dark:bg-slate-800 dark:text-slate-300"
											>
                        #{tag}
                      </span>
										))}
									</div>
								)}
							</Link>
						</li>
					))}
				</ul>
			)}

			{/* Pagination */}
			{totalPages > 1 && (
				<nav className="mt-8 flex items-center justify-between">
					{/* Prev */}
					{page > 1 ? (
						<Link
							href={hrefWith(page - 1)}
							className="px-3 py-2 rounded-lg text-sm border border-slate-300 bg-white/80 hover:bg-white
                         dark:border-slate-700 dark:bg-slate-900/60 dark:hover:bg-slate-900"
						>
							← Önceki
						</Link>
					) : (
						<span className="px-3 py-2 rounded-lg text-sm border border-transparent opacity-50 select-none">
              ← Önceki
            </span>
					)}

					<span className="text-sm opacity-80">
            Sayfa {page} / {totalPages}
          </span>

					{/* Next */}
					{page < totalPages ? (
						<Link
							href={hrefWith(page + 1)}
							className="px-3 py-2 rounded-lg text-sm border border-slate-300 bg-white/80 hover:bg-white
                         dark:border-slate-700 dark:bg-slate-900/60 dark:hover:bg-slate-900"
						>
							Sonraki →
						</Link>
					) : (
						<span className="px-3 py-2 rounded-lg text-sm border border-transparent opacity-50 select-none">
              Sonraki →
            </span>
					)}
				</nav>
			)}
		</section>
	);
}
