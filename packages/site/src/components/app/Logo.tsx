import {Link} from '@/components/ui';
import {lighten} from '@/lib/color';
import {useTheme} from '@mui/material';
import {ComponentProps} from 'react';

type LogoProps = {
	href:    ComponentProps<typeof Link>['href'];
	size:    number;
	variant: 'light' | 'main' | 'dark';
};

export default function Logo({href, variant, size}: LogoProps) {
	const theme = useTheme();

	const color = (() => {
		switch (variant) {
			case 'light':
				return lighten(theme.palette.secondary.light, .375);
			case 'main':
				return theme.palette.secondary.main;
			case 'dark':
				return theme.palette.secondary.dark;
		}
		return undefined;
	})();

	return (
		<Link
			href={href}
			color="inherit"
			className="no-underline hover:no-underline [&_*]:font-[Anton]"
			style={{['--logo-size' as string]: `${size}px`}}
		>
			<h1 className="m-0 text-[length:var(--logo-size)] leading-none">
				EFF<span className="px-1" style={{color}}>ONE</span>HUB
			</h1>
		</Link>
	);
}
