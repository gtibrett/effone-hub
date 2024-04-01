import {Link} from '@gtibrett/mui-additions';
import {AppBar, Box, darken, Grid, Toolbar, Typography} from '@mui/material';
import {blueGrey} from '@mui/material/colors';
import Logo from './header/Logo';
import NavMenu from './header/NavMenu';

const background = require('./header/header.jpg');

export default function Header() {
	return (
		<header role="banner">
			<AppBar
				component="nav"
				color="primary"
				aria-label="main navigation"
				sx={{
					background: darken(blueGrey[900], .25),
					
					'&:before': {
						position:        'absolute',
						width:           '100%',
						height:          '100%',
						content:         '" "',
						backgroundImage: `url(${background})`,
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
				<Box sx={{
					background:     'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 100%)',
					backgroundSize: 32,
					height:         1.5,
					opacity:        1
				}}/>
			</AppBar>
			<Toolbar/>
		</header>
	);
}