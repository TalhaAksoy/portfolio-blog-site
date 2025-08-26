// app/about/tabs.tsx
"use client";

import { useState } from "react";

export default function AboutTabs() {
	const [lang, setLang] = useState<"tr" | "en">("tr");
	const isTR = lang === "tr";

	return (
		<div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
			<div className="flex">
				<button
					onClick={() => setLang("tr")}
					className={[
						"flex-1 px-4 py-2 text-sm font-medium",
						isTR ? "bg-slate-100 dark:bg-slate-800" : "bg-white dark:bg-slate-900",
					].join(" ")}
				>
					Türkçe
				</button>
				<button
					onClick={() => setLang("en")}
					className={[
						"flex-1 px-4 py-2 text-sm font-medium",
						!isTR ? "bg-slate-100 dark:bg-slate-800" : "bg-white dark:bg-slate-900",
					].join(" ")}
				>
					English
				</button>
			</div>

			<div className="p-6 prose prose-slate dark:prose-invert max-w-none">
				{isTR ? (
					<article>
						<p>
							Merhaba, ben 23 yaşında bir web geliştiricisiyim. Kariyerime{" "}
							<strong>web tasarımı</strong> ile başladım, ardından{" "}
							<strong>backend development</strong> alanında tecrübeler edindim.
							42 İstanbul’da eğitim gördüğüm dönemde <strong>C/C++</strong> ile
							çalışarak yazılım temellerimi güçlendirdim.
						</p>
						<p>
							Şu anda aktif olarak <strong>web developer</strong> olarak
							çalışıyor, modern web teknolojileriyle projeler geliştiriyorum.
							Bunun yanında, kendimi geliştirmek için <strong>Flutter</strong>{" "}
							öğrenerek mobil geliştirme alanında da bilgi ve deneyim kazanmaya
							çalışıyorum. Eğitimime de <strong>Açıköğretim</strong> üzerinden
							devam ediyorum.
						</p>
						<p>
							Yazılım dünyasında farklı alanları keşfetmeyi seven, öğrenmeye
							açık biriyim. Hem profesyonel projelerimde hem de kişisel
							çalışmalarımda sürekli gelişmeyi ve yeni teknolojilerle üretmeyi
							hedefliyorum.
						</p>
					</article>
				) : (
					<article>
						<p>
							Hi, I’m a 23-year-old <strong>web developer</strong>. I started
							with <strong>web design</strong>, then gained experience in{" "}
							<strong>backend development</strong>. During my time at{" "}
							<strong>42 Istanbul</strong>, I worked with <strong>C/C++</strong>
							, strengthening my fundamentals.
						</p>
						<p>
							I currently work as a <strong>web developer</strong>, building
							projects with modern web technologies. On the side, I’m learning{" "}
							<strong>Flutter</strong> to explore mobile development. I’m also
							continuing my education through <strong>Open University</strong>.
						</p>
						<p>
							I enjoy exploring different areas of software and I’m always eager
							to learn. My goal is to keep improving through both professional
							projects and personal experiments with new technologies.
						</p>
					</article>
				)}
			</div>
		</div>
	);
}
