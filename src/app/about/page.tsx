// app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import AboutTabs from "./tabs";

export const metadata: Metadata = {
	title: "Hakkımda",
	description:
		"Selim Talha Aksoy — 23 yaşında web geliştirici. Modern web teknolojileri ve Flutter ile projeler geliştiriyorum.",
};

export default function AboutPage() {
	return (
		<section className="mx-auto max-w-3xl px-4 py-12">
			{/* Başlık */}
			<header className="mb-8">
				<h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">
					Hakkımda
				</h1>
				<p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
					23 yaşında web geliştirici • İstanbul • Açıköğretim öğrencisi
				</p>
			</header>

			{/* Üst kart */}
			<div className="mb-10 rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/40">
				<div className="flex items-center gap-4">
					<div>
						<h2 className="text-xl font-semibold">Selim Talha Aksoy</h2>
						<p className="text-sm text-slate-600 dark:text-slate-300">
							Aktif olarak modern web teknolojileriyle ürün geliştiriyorum. Boş
							zamanlarımda Flutter ile mobil geliştirmeyi keşfediyorum.
						</p>
					</div>
				</div>

				{/* Rozetler */}
				<div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Web Design → Backend
          </span>
					<span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            C/C++ (42 İstanbul)
          </span>
					<span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Flutter (yandan)
          </span>
					<span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Open University
          </span>
				</div>
			</div>

			{/* Sekmeli içerik (TR/EN) */}
			<AboutTabs />

			{/* Alt kısım: İletişim */}
			<div className="mt-10 flex flex-wrap items-center gap-3">
				<Link
					href="/blog"
					className="px-4 py-2 rounded-xl border border-slate-300 bg-white/70 hover:bg-white dark:border-slate-700 dark:bg-slate-900/60 dark:hover:bg-slate-900 transition"
				>
					Blog Yazılarım
				</Link>
				<a
					href="mailto:kullanici@gmail.com"
					className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-black dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition"
				>
					E-posta Gönder
				</a>
			</div>
		</section>
	);
}
