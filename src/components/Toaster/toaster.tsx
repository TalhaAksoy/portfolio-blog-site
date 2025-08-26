// components/ui/Toaster.tsx
"use client";

import { Toaster } from "react-hot-toast";

export default function HotToaster() {
	return (
		<Toaster
			position="bottom-right"
			toastOptions={{
				duration: 2000,
				style: {
					borderRadius: "10px",
					background: "rgba(15, 23, 42, 0.95)", // slate-900/95
					color: "#fff",
					border: "1px solid rgba(51,65,85,.6)", // slate-700/60
					backdropFilter: "blur(6px)",
				},
			}}
		/>
	);
}
