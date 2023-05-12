import {AppBar, Box, darken, Grid, Toolbar, Typography} from '@mui/material';
import {blueGrey} from '@mui/material/colors';
import Logo from './header/Logo';
import Link from './Link';
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
							<Link to="/" color="inherit" sx={{textDecoration: 'none'}}>
								<Typography variant="h3" component="h1" sx={{fontFamily: 'Racing Sans One', fontSize: 48}}>
									<Logo sx={{marginRight: 1}}/> effOne Hub</Typography>
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