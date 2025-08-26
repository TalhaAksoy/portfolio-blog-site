"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type NavbarProps = {
	title?: string;
};

export default function Navbar({ title = "Selim Talha Aksoy" }: NavbarProps) {
	const [atTop, setAtTop] = useState(true);

	useEffect(() => {
		const onScroll = () => setAtTop(window.scrollY === 0);
		// ilk yüklemede durumu ayarla
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<nav
			id="navbar"
			className={[
				"sticky top-0 z-50 w-full",
				"border-b border-white/30",
				"transition-all duration-300",
				atTop ? "h-20" : "h-16",
				atTop
					? "bg-gradient-to-r from-gray-900 via-black to-gray-900"
					: "bg-black",
				!atTop ? "shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]" : "",
			].join(" ")}
		>
			<div className="mx-auto max-w-6xl px-4 h-full flex items-center justify-between">
				<Link
					href="/"
					className="font-bold text-lg md:text-xl tracking-tight text-white"
				>
					{title}
				</Link>

				<div className="flex items-center gap-6 text-sm">
					<Link
						href="/blog"
						className="text-white/80 hover:text-white transition-colors"
					>
						Blog
					</Link>
					<Link
						href="/about"
						className="text-white/80 hover:text-white transition-colors"
					>
						Hakkımda
					</Link>
				</div>
			</div>
		</nav>
	);
}
