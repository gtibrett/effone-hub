import {Link} from '@/components/ui';
import {useAppState} from '@/components/app';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconButton, Menu, MenuItem} from '@/components/ui';
import useMediaQuery from '@/hooks/useMediaQuery';
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
	// Mirrors the old `theme.breakpoints.down('md')` (MUI's md breakpoint
	// was 900px; `.down(...)` returns `< 899.95`).
	const isMobile                = useMediaQuery('(max-width: 899.95px)');
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open                    = Boolean(anchorEl);
	const pathname                = usePathname() || '';
	const navLinks                = useNavLinks(pathname);

	// Replaces the old MUI navLinkSx — Tailwind classes hit the same
	// states (hover/focus/active) and lean on the shadcn `secondary`
	// token wired up in M2 to match the lighten(secondary.light) brand
	// stack.
	const navLinkClass = [
		'inline-block font-bold no-underline rounded-md',
		'px-3 py-2 mx-1 border border-transparent',
		'hover:text-secondary hover:border-secondary hover:no-underline',
		'focus:text-secondary focus:border-secondary',
		'aria-[current=page]:bg-secondary aria-[current=page]:text-secondary-foreground'
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

	if (isMobile) {
		return (
			<div>
				<IconButton
					id="hamburger-button"
					aria-label="toggle navigation menu"
					aria-controls={open ? 'hamburger-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
				>
					<FontAwesomeIcon icon={faBars} color="#fff"/>
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
		);
	}

	return <>
		{navLinks.map(({path, label, active}, i) => {
				return (
					<div key={i}>
						<Link color="inherit" className={`${navLinkClass} ${active ? 'bg-secondary text-secondary-foreground' : ''}`} href={path}>{label}</Link>
					</div>
				);
			}
		)}
	</>;
}
