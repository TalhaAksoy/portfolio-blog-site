import {GithubButton, GmailButton, LinkedinButton, YoutubeButton} from "@/components/SocialMediaBtn/socialMediaBtn";

type FooterProps = {
	name?: string;
	youtubeUrl?: string;
	linkedinUrl?: string;
	githubUrl?: string;
	gmailHref?: string; // mailto:...
};

export default function Footer({
	                               name = "Selim Talha Aksoy",
	                               youtubeUrl = "https://youtube.com/@kullanici",
	                               linkedinUrl = "https://linkedin.com/in/kullanici",
	                               githubUrl = "https://github.com/kullanici",
	                               gmailHref = "mailto:kullanici@gmail.com",
                               }: FooterProps) {
	return (
		<footer className="w-full border-t border-white/10 bg-black/60 backdrop-blur">
			<div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
				<p className="text-sm text-white/70">
					© {new Date().getFullYear()} {name}
				</p>

				<div className="flex items-center gap-4">
					<YoutubeButton title="YouTube" href={youtubeUrl} size={22} className="text-white/80 hover:text-red-500" />
					<LinkedinButton title="LinkedIn" href={linkedinUrl} size={22} className="text-white/80 hover:text-blue-500" />
					<GithubButton title="GitHub" href={githubUrl} size={22} className="text-white/80 hover:text-white" />
					<GmailButton title="Mail" href={gmailHref} size={22} className="text-white/80 hover:text-rose-400" />
				</div>
			</div>
		</footer>
	);
}
