import { CSSProperties } from 'react';
import { Link, LinkProps, Typography, useTheme } from '@mui/material';

import { lighten } from '@/components/ui/colors';

type LogoProps = {
	href: LinkProps['href'];
	size: number;
	variant: 'light' | 'main' | 'dark';
};

export default function Logo({ href, variant, size }: LogoProps) {
	const theme = useTheme();

	const color = (() => {
		switch (variant) {
			case 'light':
				return lighten(theme.palette.secondary.light, 0.375);

			case 'main':
				return theme.palette.secondary.main;
			case 'dark':
				return theme.palette.secondary.dark;
		}

		return undefined;
	})();

	const linkStyle = {
		['--logo-size' as string]: `${size}px`
	} as CSSProperties;

	return (
		<Link
			href={href}
			color="inherit"
			className="no-underline [&_*]:!font-display [&_*]:!text-(length:--logo-size)"
			style={linkStyle}
		>
			<Typography component="h1">
				EFF
				<Typography component="span" className="opacity-100 px-1" style={{ color }}>
					ONE
				</Typography>
				HUB
			</Typography>
		</Link>
	);
}
