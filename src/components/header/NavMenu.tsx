import {useNavLinks} from '@effonehub/app';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from '@gtibrett/mui-additions';
import {Grid, Hidden, IconButton, lighten, Menu, MenuItem, SxProps, useTheme} from '@mui/material';
import {MouseEvent, useState} from 'react';
import {useLocation, useNavigate} from 'react-router';

const isActive = (pathname: string, path?: string, rootPath?: string) => (
	path === pathname || [path, rootPath].filter(p => p && Number(p?.length) > 1 && pathname.startsWith(p)).length > 0
);

export default function NavMenu() {
	const {pathname}              = useLocation();
	const navigate                = useNavigate();
	const theme                   = useTheme();
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open                    = Boolean(anchorEl);
	const navLinks                = useNavLinks().filter((l => !!l.label));
	
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
		navigate(url);
		handleClose();
	};
	
	return <>
		<Hidden mdDown>
			{navLinks.map(({path, rootPath, label}, i) => {
					const active = isActive(pathname, path, rootPath);
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
						{navLinks.map(({path, rootPath, label}) => {
								const active = isActive(pathname, path, rootPath);
								return <MenuItem selected={active} key={String(path)} onClick={handleLink(String(path))}>{label}</MenuItem>;
							}
						)}
					</Menu>
				</div>
			</Grid>
		</Hidden>
	</>;
}