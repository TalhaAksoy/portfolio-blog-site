// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/footer";
import HotToaster from "@/components/Toaster/toaster"; // <- eski yol: ../styles/global.css ise buraya taşı: app/globals.css

// Varsayılan metadata (Astro'daki title/description karşılığı)
export const metadata: Metadata = {
  title: {
    default: "Portfolio",
    template: "%s | Portfolio",
  },
  description: "Kişisel site",
};

// (İsteğe bağlı) viewport meta
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="h-full">
    <body className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <Navbar title="Selim Talha Aksoy" />

    <main className="mx-auto">
      {children}
    </main>
    <HotToaster/>
    <Footer />
    </body>
    </html>
  );
}
