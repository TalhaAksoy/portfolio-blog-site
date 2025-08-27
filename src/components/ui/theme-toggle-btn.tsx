"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
	const { theme, setTheme } = useTheme()

	return (
		<div className={`flex gap-x-1 items-center justify-center w-fit`}>
			<Button onClick={() => {
				if (theme === "dark") {
					setTheme("light");
				}else if (theme === "light") {
					setTheme("dark");
				}
			}}>
				<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
				<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />

			</Button>
		</div>

	)
}
