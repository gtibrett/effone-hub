import {Link} from '@gtibrett/mui-additions';
import {lighten, LinkProps, Typography, useTheme} from '@mui/material';

type LogoProps = {
	href: LinkProps['href']
	size: number;
	variant: 'light' | 'main' | 'dark'
};

export default function Logo({href, variant, size}: LogoProps) {
	const theme = useTheme();
	const sx    = {
		textDecoration: 'none',
		'& *':          {
			fontFamily: 'Anton !important',
			fontSize:   `${size}px !important`
		}
	};
	
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
		<Link href={href} color="inherit" sx={sx}>
			<Typography component="h1">
				EFF<Typography component="span" sx={{opacity: 1, px: .5, color}}>ONE</Typography>HUB
			</Typography>
		</Link>
	);
}