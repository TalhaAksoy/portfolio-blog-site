// components/mdx/Pre.tsx
"use client";
import { useRef } from "react";
import { toast } from "react-hot-toast";

export default function Pre(props: React.HTMLAttributes<HTMLPreElement>) {
	const ref = useRef<HTMLPreElement>(null);

	const onCopy = async () => {
		const code = ref.current?.querySelector("code")?.textContent ?? "";
		try {
			await navigator.clipboard.writeText(code);
			toast.success("Kopyalandı");
		} catch {
			toast.error("Kopyalanamadı");
		}
	};

	return (
		<div className="relative group">
			<pre ref={ref} {...props} />
			<button
				onClick={onCopy}
				className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition text-xs px-2 py-1 rounded bg-slate-800 text-white"
			>
				Copy
			</button>
		</div>
	);
}
