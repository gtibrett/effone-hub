import {Link} from '@gtibrett/mui-additions';
import {AppBar, darken, Grid, lighten, Toolbar, Typography, useTheme} from '@mui/material';
import {blueGrey} from '@mui/material/colors';
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
					<Grid container spacing={1} alignItems="center">
						<Grid item>
							<Link href="/" color="inherit" sx={{textDecoration: 'none', '& *': {fontFamily: 'Anton !important', fontSize: '48px !important'}}}>
								<Typography component="h1">
									EFF<Typography component="span" sx={{opacity: 1, px: .5, color: lightRed}}>ONE</Typography>HUB
								</Typography>
							</Link>
						</Grid>
						<Grid item xs/>
						<NavMenu/>
					</Grid>
				</Toolbar>
			</AppBar>
			<Toolbar sx={{my: 2}}/>
		</header>
	);
}