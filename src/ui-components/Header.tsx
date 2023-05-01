import {AppBar, Box, darken, Grid, Hidden, SxProps, Toolbar, Typography, useTheme} from '@mui/material';
import {blueGrey} from '@mui/material/colors';
import {useLocation} from 'react-router';
import {LinkProps} from 'react-router-dom';
import Logo from './header/Logo';
import Link from './Link';

const background = require('./header/header.jpg');

export default function Header() {
	const theme      = useTheme();
	const {pathname} = useLocation();
	
	const navLinkSx: SxProps = {
		textDecoration:               'none',
		py:                           .5,
		px:                           .5,
		mx:                           2,
		borderBottom:                 '8px solid transparent',
		'&:hover, &:focus, &:active': {
			borderBottomColor: theme.palette.common.white
		}
	};
	
	const navLinks: Pick<LinkProps, 'to' | 'children'>[] = [
		{
			to:       '/drivers',
			children: 'Drivers'
		},
		{
			to:       '/about',
			children: 'About'
		}
	];
	
	return (
		<header>
			<AppBar component="nav" color="primary" sx={{
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
					<Grid container spacing={2} alignItems="center">
						<Hidden mdUp>
							<Grid item>
								<Link to="/" color="inherit" sx={{textDecoration: 'none'}}>
									<Logo/>
								</Link>
							</Grid>
						</Hidden>
						<Hidden mdDown>
							<Grid item>
								<Link to="/" color="inherit" sx={{textDecoration: 'none'}}>
									<Typography variant="h3" component="h1" sx={{fontFamily: 'Racing Sans One'}}>
										<Logo sx={{marginRight: 1}}/> effOne Hub</Typography>
								</Link>
							</Grid>
						</Hidden>
						<Grid item xs/>
						{navLinks.map((l, i) => <Grid item key={i}><Link color="inherit" sx={navLinkSx} className={pathname === l.to ? 'active' : ''} {...l}/></Grid>)}
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