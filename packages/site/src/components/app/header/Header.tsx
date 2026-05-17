import {useTheme} from '@/lib/theme';
import {Link, Typography} from '@/components/ui';

import {darken, lighten} from '@/lib/color';
import {AppBar, Toolbar} from '@mui/material';
import {blueGrey} from '@/lib/muiColors';
import NavMenu from './NavMenu';

export default function Header() {
	const theme    = useTheme();
	const lightRed = lighten(theme.palette.secondary.light, .375);
	
	return (
		<header role="banner">
			<AppBar
				component="nav"
				color="primary"
				aria-label="main navigation"
				sx={{
					background:   darken(blueGrey[900], .25),
					borderBottom: `4px solid ${theme.palette.secondary.main}`,
					py:           1,
					
					'&:before': {
						position:        'absolute',
						top:             0, bottom: 0,
						left:            0, right: 0,
						content:         '" "',
						backgroundImage: `url(/carbon-fiber-texture.png)`,
						backgroundSize:  'cover',
						opacity:         .25
					}
				}}>
				<Toolbar>
					<div className="flex flex-row flex-wrap gap-2 items-center w-full">
						<div>
							<Link href="/" color="inherit" className="no-underline hover:no-underline [&_*]:font-[Anton] [&_*]:text-[48px]">
								<Typography component="h1">
									EFF<Typography component="span" sx={{opacity: 1, px: .5, color: lightRed}}>ONE</Typography>HUB
								</Typography>
							</Link>
						</div>
						<div className="flex-1"/>
						<NavMenu/>
					</div>
				</Toolbar>
			</AppBar>
			<Toolbar sx={{my: 2}}/>
		</header>
	);
}