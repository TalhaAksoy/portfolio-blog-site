// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/footer";
import HotToaster from "@/components/Toaster/toaster"; // <- eski yol: ../styles/global.css ise buraya taşı: app/globals.css
import cfg from '@/config/site.json'

// Varsayılan metadata (Astro'daki title/description karşılığı)

export const metadata: Metadata = {
  // Site kök URL'in (mutlaka https absolute önerilir)
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),

  title: {
    // JSON'dan
    default: cfg.site.title,                 // "Mustangtr — Portfolyo"
    template: `%s | ${cfg.profile.name}`,    // Sayfa başlığı | Selim Talha Aksoy
  },
  description: cfg.site.description,         // "Kişisel site"
  applicationName: cfg.profile.title ?? cfg.site.title,
  authors: [{ name: cfg.profile.name, url: cfg.social.github }],
  creator: cfg.profile.name,
  publisher: cfg.profile.name,
  keywords: [
    "blog", "portfolio", "frontend", "react", "next.js", "tailwind",
    cfg.profile.name, cfg.profile.handle
  ],

  alternates: {
    canonical: "/",                          // kök için canonical
    languages: { "tr-TR": "/" },             // dil varyantları varsa ekle
  },

  openGraph: {
    type: "website",
    url: "/",
    siteName: cfg.site.title,
    title: cfg.site.title,
    description: cfg.site.description,
    locale: "tr_TR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: cfg.site.title }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#0ea5e9" }],
  },
  manifest: "/site.webmanifest",
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
    <Navbar title={cfg.profile.name} />

    <main className="mx-auto">
      {children}
    </main>
    <HotToaster/>
    <Footer
      name={cfg.profile.name}
      youtubeUrl={cfg.social.youtube}
      linkedinUrl={cfg.social.linkedin}
      githubUrl={cfg.social.github}
      gmailHref={cfg.social.gmail}
    />
    </body>
    </html>
  );
}
