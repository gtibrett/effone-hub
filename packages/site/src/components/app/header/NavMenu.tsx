import { type MouseEvent, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Grid, IconButton, Link, Menu, MenuItem, useTheme } from '@mui/material';

import { useAppState } from '@/components/app';

type NavRoute = {
	path: string;
	label: string | number;
	active: boolean;
};

export const useNavLinks = (pathname: string) => {
	const [{ currentSeason }] = useAppState();
	const firstSegment = pathname.split('/').filter(s => s.length)[0];

	const navLinks: NavRoute[] = [
		{
			path: `/${currentSeason}`,
			label: currentSeason,
			active: Number(firstSegment) === currentSeason
		},
		{
			path: '/seasons',
			label: 'Past Seasons',
			active: firstSegment === 'seasons' || Number(firstSegment) < currentSeason
		},
		{
			path: '/circuits',
			label: 'Circuits',
			active: firstSegment === 'circuits'
		},
		{
			path: '/constructors',
			label: 'Constructors',
			active: firstSegment === 'constructors'
		},
		{
			path: '/drivers',
			label: 'Drivers',
			active: firstSegment === 'drivers'
		},
		{
			path: '/about',
			label: 'About',
			active: firstSegment === 'about'
		}
	];

	return navLinks;
};

export default function NavMenu() {
	const router = useRouter();
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open = Boolean(anchorEl);
	const pathname = usePathname() || '';
	const navLinks = useNavLinks(pathname);

	const navLinkClass = [
		"font-['Titillium_Web',sans-serif] font-bold no-underline",
		'py-2 px-3 mx-1 border border-transparent rounded',
		'hover:text-[color-mix(in_oklch,_var(--color-primary-light),_white_37.5%)] hover:border-[color-mix(in_oklch,_var(--color-primary-light),_white_37.5%)]',
		'focus:text-[color-mix(in_oklch,_var(--color-primary-light),_white_37.5%)] focus:border-[color-mix(in_oklch,_var(--color-primary-light),_white_37.5%)]',
		'active:text-primary active:bg-primary active:!border-transparent',
		'[&.active]:text-black [&.active]:bg-primary [&.active]:!border-transparent'
	].join(' ');

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

	return (
		<>
			<Box className="hidden md:contents">
				{navLinks.map(({ path, label, active }) => {
					return (
						<Grid key={path}>
							<Link
								color="inherit"
								className={`${navLinkClass}${active ? ' active' : ''}`}
								href={path}
							>
								{label}
							</Link>
						</Grid>
					);
				})}
			</Box>
			<Grid className="block md:hidden">
				<div>
					<IconButton
						id="hamburger-button"
						aria-label="toggle navigation menu"
						aria-controls={open ? 'hamburger-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
					>
						<FontAwesomeIcon icon={faBars} color={theme.palette.common.white} />
					</IconButton>
					<Menu
						hideBackdrop
						id="hamburger-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						slotProps={{
							list: {
								'aria-labelledby': 'hamburger-button'
							}
						}}
					>
						{navLinks.map(({ path, label, active }) => {
							return (
								<MenuItem
									selected={active}
									key={String(path)}
									onClick={handleLink(String(path))}
								>
									{label}
								</MenuItem>
							);
						})}
					</Menu>
				</div>
			</Grid>
		</>
	);
}
