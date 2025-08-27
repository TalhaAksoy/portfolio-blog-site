import { GithubButton, GmailButton, LinkedinButton, YoutubeButton } from "@/components/SocialMediaBtn/socialMediaBtn";
import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";
import cfg from '@/config/site.json'
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { shuffle } from "@/lib/utils";
import { PointerHighlight } from "@/components/ui/pointer-highlight";



export default async function HomePage() {
  // Son 4 yazıyı al
  const posts = (await getAllPostsMeta()).slice(0, 4);
  const images = [
    "/logos/Node.js_logo.png",
    "/logos/Flutter_logo.png",
    "/logos/Javascript_logo.png",
    "/logos/Typescript_logo.png",
    "/logos/Deno_logo.png",
    "/logos/Tailwind_logo.png",
    "/logos/Github_logo.png",
    "/logos/React_logo.png",
    "/logos/Next_logo.png",
    "/logos/Lua_logo.png",
    "/logos/C_logo.png",
    "/logos/Cpp_logo.png",
    "/logos/42_logo.png",
    "/logos/Node.js_logo.png",
    "/logos/Flutter_logo.png",
    "/logos/Javascript_logo.png",
    "/logos/Typescript_logo.png",
    "/logos/Deno_logo.png",
    "/logos/Tailwind_logo.png",
    "/logos/Github_logo.png",
    "/logos/React_logo.png",
    "/logos/Next_logo.png",
    "/logos/Lua_logo.png",
    "/logos/C_logo.png",
    "/logos/Cpp_logo.png",
    "/logos/42_logo.png",
    "/logos/Node.js_logo.png",
    "/logos/Flutter_logo.png",
    "/logos/Javascript_logo.png",
    "/logos/Typescript_logo.png",
    "/logos/Deno_logo.png",
    "/logos/Tailwind_logo.png",
    "/logos/Github_logo.png",
    "/logos/React_logo.png",
    "/logos/Next_logo.png",
    "/logos/Lua_logo.png",
    "/logos/C_logo.png",
    "/logos/Cpp_logo.png",
    "/logos/42_logo.png",
  ];


  return (
    <>
      {/* HERO */}
      <section className="relative w-full h-[calc(100dvh-5rem)] flex items-center">
        <div className={`absolute inset-0 -z-1 flex items-center justify-center`}>
          <ThreeDMarquee images={shuffle(images)} className={`w-full h-full`} />
        </div>
        {/* arkaplan gradyan */}
        <div className="pointer-events-none absolute inset-0 -z-10
                bg-gradient-to-b from-slate-50 to-white
                dark:from-slate-950 dark:to-slate-900"></div>

        <div className="mx-auto w-full max-w-6xl px-6 flex items-center justify-evenly">
          {/* sol: metin */}
          <div className="flex flex-col justify-center py-20 px-2 rounded-lg border border-slate-200/80 bg-white/60 backdrop-blur
                    dark:border-slate-800/60 dark:bg-slate-900/40">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest
                      text-slate-500 dark:text-slate-400">
              👋 Selam, ben
            </span>

            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight
                   bg-clip-text text-transparent
                   bg-gradient-to-r from-slate-800 via-slate-900 to-black
                   dark:from-white dark:via-slate-200 dark:to-slate-300">
              {cfg.profile.handle}
            </h1>

            <p className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl">
              Aktif bir <strong>web geliştiriciyim</strong>. Yandan <strong>Flutter</strong> öğrenerek mobil dünyayı da keşfediyorum.
              Bu sitede proje notlarımı ve kısa yazılarımı paylaşıyorum.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="px-4 py-2 rounded-xl border border-slate-300 bg-white/70 hover:bg-white
                    dark:border-slate-700 dark:bg-slate-900/60 dark:hover:bg-slate-900
                    transition-colors"
              >
                Hakkımda
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-black
                    dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200
                    transition-colors"
              >
                Blogu Aç
              </Link>
            </div>
          </div>

          {/* sağ: sosyal bar */}
          <aside className="md:sticky md:top-24 h-[320px] md:h-[70vh]">
            <div className="h-full w-full md:w-[120px] mx-auto
                    rounded-2xl border border-slate-200/80 bg-white/60 backdrop-blur
                    dark:border-slate-800/60 dark:bg-slate-900/40
                    shadow-[0_8px_40px_-12px_rgba(0,0,0,0.2)]
                    flex flex-col items-center justify-evenly p-4">
              <PointerHighlight offset={8} title="Youtube" color="#FF0000">
                <YoutubeButton title="YouTube" href={cfg.social.youtube} size={36} className="text-slate-700 dark:text-slate-200 group-hover:text-red-600" />
              </PointerHighlight>
              <PointerHighlight offset={8} title="LinkedIn">
                <LinkedinButton title="LinkedIn" href={cfg.social.linkedin} size={36} className="text-slate-700 dark:text-slate-200 group-hover:text-blue-600" />
              </PointerHighlight>
              <PointerHighlight offset={8} title="Github" color="#000000">
                <GithubButton title="GitHub" href={cfg.social.github} size={36} className="text-slate-700 dark:text-slate-200 group-hover:text-black dark:group-hover:text-white" />
              </PointerHighlight>
              <PointerHighlight color="#FF0000" offset={8} title="Gmail">
                <GmailButton title="Mail" href={cfg.social.gmail} size={36} className="text-slate-700 dark:text-slate-200 group-hover:text-rose-500" />
              </PointerHighlight>
            </div>
          </aside>
        </div>
      </section>

      {/* BLOG: Son yazılar */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold">📝 Son Yazılar</h2>
          <Link
            href="/blog"
            className="text-sm underline underline-offset-4 opacity-80 hover:opacity-100"
          >
            Tümünü gör →
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="mt-6 opacity-70">Henüz yazı yok.</p>
        ) : (
          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            {posts.map((p) => (
              <li
                key={p.slug}
                className="group rounded-2xl border border-slate-200 bg-white/70
                   dark:border-slate-800 dark:bg-slate-900/40
                   transition-all duration-300 hover:scale-[1.02]
                   hover:shadow-lg hover:bg-white dark:hover:bg-slate-900"
              >
                <a href={`/blog/${p.slug}`} className="block p-6 h-full">
                  {/* Tarih badge */}
                  <span className="inline-block text-xs px-2 py-1 rounded-full
                         bg-slate-100 text-slate-600
                         dark:bg-slate-800 dark:text-slate-300">
                    {p.date ? new Date(p.date).toLocaleDateString("tr-TR") : ""}
                  </span>

                  {/* Başlık */}
                  <h3 className="mt-3 text-lg font-bold
                       bg-clip-text text-transparent
                       bg-gradient-to-r from-slate-800 via-slate-900 to-black
                       dark:from-white dark:via-slate-200 dark:to-slate-400
                       group-hover:underline underline-offset-4">
                    {p.title}
                  </h3>

                  {/* Özet */}
                  {p.summary && (
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                      {p.summary}
                    </p>
                  )}

                  {/* Tag badge'leri */}
                  {p.tags!.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags!.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full
                                bg-slate-100 text-slate-600
                                dark:bg-slate-800 dark:text-slate-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
