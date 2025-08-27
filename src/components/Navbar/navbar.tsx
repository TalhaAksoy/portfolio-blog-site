// components/Navbar/navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/theme-toggle-btn";

type NavbarProps = { title?: string };

export default function Navbar({ title = "Selim Talha Aksoy" }: NavbarProps) {
	const [atTop, setAtTop] = useState(true);

	useEffect(() => {
		const onScroll = () => setAtTop(window.scrollY === 0);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<nav
			id="navbar"
			className={[
				"sticky top-0 z-50 w-full transition-all duration-300",
				"border-b border-slate-200 dark:border-white/20",
				atTop ? "h-20" : "h-16",
				// Light mode: açık gradyan • Dark mode: eski koyu gradyan
				atTop
					? "bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-black dark:to-gray-900"
					: "bg-white/80 dark:bg-black/90 supports-[backdrop-filter]:backdrop-blur",
				!atTop
					? "shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]"
					: "",
			].join(" ")}
		>
			<div className="mx-auto max-w-6xl px-4 h-full flex items-center justify-between">
				<Link
					href="/"
					className="font-bold text-lg md:text-xl tracking-tight text-slate-900 dark:text-white"
				>
					{title}
				</Link>

				<div className="flex items-center gap-6 text-sm">
					<Link
						href="/blog"
						className="text-slate-700 hover:text-slate-900 transition-colors dark:text-white/80 dark:hover:text-white"
					>
						Blog
					</Link>
					<Link
						href="/about"
						className="text-slate-700 hover:text-slate-900 transition-colors dark:text-white/80 dark:hover:text-white"
					>
						Hakkımda
					</Link>
					<ModeToggle />
				</div>
			</div>
		</nav>
	);
}
