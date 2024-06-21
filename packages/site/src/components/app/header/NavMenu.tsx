import {useAppState} from '@/components/app';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from '@gtibrett/mui-additions';
import {Grid, Hidden, IconButton, lighten, Menu, MenuItem, SxProps, useTheme} from '@mui/material';
import {usePathname, useRouter} from 'next/navigation';
import {MouseEvent, useState} from 'react';

type NavRoute = {
	path: string;
	label: string | number;
}

export const useNavLinks = () => {
	const [{currentSeason}] = useAppState();
	
	const navLinks: NavRoute[] = [
		{
			path:  `/${currentSeason}`,
			label: currentSeason
		},
		{
			path:  '/seasons',
			label: 'Past Seasons'
		},
		{
			path:  '/circuits',
			label: 'Circuits'
		},
		{
			path:  '/constructors',
			label: 'Constructors'
		},
		{
			path:  '/drivers',
			label: 'Drivers'
		},
		{
			path:  '/about',
			label: 'About'
		}
	];
	
	return navLinks;
};

export default function NavMenu() {
	const pathname                = usePathname() || '';
	const router                  = useRouter();
	const theme                   = useTheme();
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open                    = Boolean(anchorEl);
	const navLinks                = useNavLinks();
	
	const navLinkSx: SxProps = {
		fontFamily:           "'Titillium Web', sans-serif",
		fontWeight:           'bold',
		textDecoration:       'none',
		py:                   1,
		px:                   1.5,
		mx:                   .5,
		border:               '1px solid transparent',
		borderRadius:         1,
		'&:hover, &:focus':   {
			color:       lighten(theme.palette.secondary.light, .375),
			borderColor: lighten(theme.palette.secondary.light, .375)
		},
		'&:active, &.active': {
			color:       theme.palette.getContrastText(theme.palette.secondary.main),
			background:  theme.palette.secondary.main,
			borderColor: 'transparent !important'
		}
	};
	
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	
	const handleClose = () => {
		setAnchorEl(null);
	};
	
	const handleLink = (url: string) => () => {
		router.push(url);
		handleClose();
	};
	
	return <>
		<Hidden mdDown>
			{navLinks.map(({path, label}, i) => {
					const isActive = pathname.startsWith(path);
					return (
						<Grid item key={i}>
							<Link color="inherit" sx={navLinkSx} className={isActive ? 'active' : ''} href={path}>{label}</Link>
						</Grid>
					);
				}
			)}
		</Hidden>
		<Hidden mdUp>
			<Grid item>
				<div>
					<IconButton
						id="hamburger-button"
						aria-controls={open ? 'hamburger-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
					>
						<FontAwesomeIcon icon={faBars} title="toggle navigation menu" color={theme.palette.common.white}/>
					</IconButton>
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
						{navLinks.map(({path, label}) => {
								const isActive = pathname.startsWith(path);
								return <MenuItem selected={isActive} key={String(path)} onClick={handleLink(String(path))}>{label}</MenuItem>;
							}
						)}
					</Menu>
				</div>
			</Grid>
		</Hidden>
	</>;
}