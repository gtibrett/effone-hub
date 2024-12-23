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
	active: boolean;
}

export const useNavLinks = (pathname: string) => {
	const [{currentSeason}] = useAppState();
	const firstSegment      = pathname.split('/').filter(s => s.length)[0];
	
	const navLinks: NavRoute[] = [
		{
			path:   `/${currentSeason}`,
			label:  currentSeason,
			active: Number(firstSegment) === currentSeason
		},
		{
			path:   '/seasons',
			label:  'Past Seasons',
			active: firstSegment === 'seasons' || Number(firstSegment) < currentSeason
		},
		{
			path:   '/circuits',
			label:  'Circuits',
			active: firstSegment === 'circuits'
		},
		{
			path:   '/constructors',
			label:  'Constructors',
			active: firstSegment === 'constructors'
		},
		{
			path:   '/drivers',
			label:  'Drivers',
			active: firstSegment === 'drivers'
		},
		{
			path:   '/about',
			label:  'About',
			active: firstSegment === 'about'
		}
	];
	
	return navLinks;
};

export default function NavMenu() {
	const router                  = useRouter();
	const theme                   = useTheme();
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open                    = Boolean(anchorEl);
	const pathname                = usePathname() || '';
	const navLinks                = useNavLinks(pathname);
	
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
			{navLinks.map(({path, label, active}, i) => {
					return (
						<Grid item key={i}>
							<Link color="inherit" sx={navLinkSx} className={active ? 'active' : ''} href={path}>{label}</Link>
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
						{navLinks.map(({path, label, active}) => {
								return <MenuItem selected={active} key={String(path)} onClick={handleLink(String(path))}>{label}</MenuItem>;
							}
						)}
					</Menu>
				</div>
			</Grid>
		</Hidden>
	</>;
}