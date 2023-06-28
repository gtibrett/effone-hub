import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {AppBar, Box, darken, Grid, Hidden, IconButton, Menu, MenuItem, SxProps, Toolbar, Typography, useTheme} from '@mui/material';
import {blueGrey} from '@mui/material/colors';
import {MouseEvent, useState} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {LinkProps} from 'react-router-dom';
import Logo from './header/Logo';
import Link from './Link';

const background = require('./header/header.jpg');

const navLinks: Pick<LinkProps, 'to' | 'children'>[] = [
	{
		to:       '/circuits',
		children: 'Circuits'
	},
	{
		to:       '/constructors',
		children: 'Constructors'
	},
	{
		to:       '/drivers',
		children: 'Drivers'
	},
	{
		to:       '/about',
		children: 'About'
	}
];

const NavMenu = () => {
	const {pathname}              = useLocation();
	const navigate                = useNavigate();
	const theme                   = useTheme();
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open                    = Boolean(anchorEl);
	
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
	
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	
	const handleClose = () => {
		setAnchorEl(null);
	};
	
	const handleLink = (url: string) => () => {
		navigate(url);
		handleClose();
	};
	
	return <>
		<Hidden smDown>
			{navLinks.map((l, i) => <Grid item key={i}><Link color="inherit" sx={navLinkSx} className={pathname === l.to ? 'active' : ''} {...l}/></Grid>)}
		</Hidden>
		<Hidden smUp>
			<Grid item>
				<div>
					<IconButton
						id="hamburger-button"
						aria-controls={open ? 'hamburger-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
					><FontAwesomeIcon icon={faBars}/></IconButton>
					<Menu
						hideBackdrop
						id="hamburger-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'hamburger-button'
						}}
					>
						{navLinks.map((l) => <MenuItem key={String(l.to)} onClick={handleLink(String(l.to))}>{l.children}</MenuItem>)}
					</Menu>
				</div>
			</Grid>
		</Hidden>
	</>;
};

export default function Header() {
	return (
		<header>
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