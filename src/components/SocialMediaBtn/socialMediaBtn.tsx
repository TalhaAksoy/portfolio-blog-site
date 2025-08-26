import { FaYoutube, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import type { ComponentProps } from "react";

type IconProps = ComponentProps<"a"> & {
	size?: number;
};

/** YouTube */
export const YoutubeButton = ({ size = 24, ...props }: IconProps) => (
	<a
		{...props}
		target="_blank"
		rel="noopener noreferrer"
		className={`hover:text-red-600 transition-colors ${props.className ?? ""}`}
	>
		<FaYoutube size={size} />
	</a>
);

/** LinkedIn */
export const LinkedinButton = ({ size = 24, ...props }: IconProps) => (
	<a
		{...props}
		target="_blank"
		rel="noopener noreferrer"
		className={`hover:text-blue-600 transition-colors ${props.className ?? ""}`}
	>
		<FaLinkedin size={size} />
	</a>
);

/** GitHub */
export const GithubButton = ({ size = 24, ...props }: IconProps) => (
	<a
		{...props}
		target="_blank"
		rel="noopener noreferrer"
		className={`hover:text-black dark:hover:text-white transition-colors ${props.className ?? ""}`}
	>
		<FaGithub size={size} />
	</a>
);

/** Gmail (Envelope Icon) */
export const GmailButton = ({ size = 24, ...props }: IconProps) => (
	<a
		{...props}
		target="_blank"
		rel="noopener noreferrer"
		className={`hover:text-rose-500 transition-colors ${props.className ?? ""}`}
	>
		<FaEnvelope size={size} />
	</a>
);
