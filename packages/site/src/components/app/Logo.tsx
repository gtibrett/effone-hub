import {Link} from '@/components/ui';
import {ComponentProps} from 'react';

type LogoProps = {
	href:    ComponentProps<typeof Link>['href'];
	size:    number;
	variant: 'light' | 'main' | 'dark';
};

export default function Logo({href, variant, size}: LogoProps) {
	// The three variants map onto the brand secondary stack. We expose them
	// as Tailwind utility classes that read the live `--secondary` token,
	// modulated with `brightness()` so light/dark variants stay in step with
	// the OS color scheme without a JS-time color read.
	const colorClass = (() => {
		switch (variant) {
			case 'light':
				return 'text-secondary brightness-150';
			case 'main':
				return 'text-secondary';
			case 'dark':
				return 'text-secondary brightness-75';
		}
		return '';
	})();

	return (
		<Link
			href={href}
			color="inherit"
			className="no-underline hover:no-underline [&_*]:font-[Anton]"
			style={{['--logo-size' as string]: `${size}px`}}
		>
			<h1 className="m-0 text-[length:var(--logo-size)] leading-none">
				EFF<span className={`px-1 ${colorClass}`}>ONE</span>HUB
			</h1>
		</Link>
	);
}
